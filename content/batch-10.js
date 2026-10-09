'use strict';
(() => {
const lessons = [
  {
    "id": "s3-g5-t0",
    "batch": "10",
    "title": "Route filtering",
    "subtitle": "Separate inbound candidate admission from outbound route advertisement.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "interactive": "route-filtering",
    "definition": "Route filtering decides which routing information may pass a specified control-plane boundary. That boundary can be an inbound neighbor policy, an outbound advertisement policy or a protocol-specific redistribution attachment. This lesson fixes a single ordinary IPv4 unicast BGP route, 198.51.100.0/24, and supplies independent import and export decisions. It does not interpret a universal filter language or treat route policy as a packet access list. The observer and direction are part of every statement about a route being denied.",
    "purpose": "Use filtering to admit intended destinations, prevent unintended advertisements and explain visibility before changing selection preferences. A missing route and a failed session are different observations. An export denial can preserve a local BGP choice while suppressing its advertisement to one peer. An import denial removes the supplied incoming candidate from this worksheet without claiming that every other locally sourced route vanished. The distinction prevents repairing a route-policy fault by resetting a healthy transport connection.",
    "mental": "Draw two doors around one local route notebook. The incoming door decides whether this peer candidate reaches the notebook. The outgoing door decides whether the selected BGP information may be sent to the specified peer. Closing the outgoing door does not erase the notebook. A third page records system route selection, and a fourth records the original packet exchange. This drawing has one supplied source only; it deliberately omits alternative routes and cached update history.",
    "components": [
      "Import direction and observer: identify the receiving speaker, peer, address family and exact prefix.",
      "Export direction and observer: identify the transmitting speaker and intended receiving peer independently.",
      "Session state: declared Established is a control prerequisite, not an all-prefix policy permit.",
      "Eligibility and selection: import admission precedes the supplied NEXT_HOP and BGP selection declarations.",
      "Local BGP versus system source: an export-permitted protocol choice can still be displaced locally.",
      "Original service: forwarding and opposite-direction readiness are separate declarations, not measured traffic."
    ],
    "mechanism": [
      "Fix the peer, IPv4 unicast family, prefix and table before reading policy. The worksheet uses one exact route and a declared established session; it has no alternative import sources, withdrawals, route refresh or cache. On an actual speaker, record where the candidate came from and whether the displayed table is postpolicy rather than calling every view an unfiltered Adj-RIB-In.",
      "Apply the independent import gate to the supplied candidate. An established session with importPermit false produces no admitted incoming candidate in this scope. The session declaration remains true. This says nothing about a connected, static or other BGP candidate for the same prefix, which is absent from the fixed scenario. Filtering routing information is also distinct from denying packets to that prefix.",
      "Resolve the admitted candidate NEXT_HOP and apply the supplied BGP choice gate. Candidate visibility alone cannot prove eligibility. A candidate may pass import but remain unresolved or lose a later selection stage. This model exposes those supplied states without running the full BGP decision process or inventing a replacement path.",
      "Apply exportPermit to the local selected BGP candidate for the specified established session. With export denied, the local choice is preserved while the supplied advertisement is false. This default teaching scope does not model FIB-dependent advertisement suppression. System source displacement is therefore independent of the outbound policy decision; inspect any additional platform features separately.",
      "Read system selection and original forward/return readiness after the protocol decision. A locally selected BGP candidate does not guarantee system installation, resolved neighbors, hardware programming or the remote reply. The worksheet reports conjunctions of declarations only. Preserve the actual source, destination, family, table and application transaction when collecting real evidence.",
      "Investigate policy attachments and matching objects before considering a change. A correct permit in an unattached list has no effect at this peer boundary. Preserve the exact original attachment, relevant postpolicy route and intended receiving observer, then use an isolated owned change and restore the prior intent. The read-only command groups are guided references; no target command is executed here."
    ],
    "flow": [
      [
        "Identify the import or export boundary",
        "Record the observer, address family and received route; import and export are separate policy directions."
      ],
      [
        "Evaluate that policy decision",
        "Apply the supplied import permission to admission and the separate export permission to advertisement eligibility."
      ],
      [
        "Follow route selection and installation",
        "Check next-hop resolution, BGP choice and system selection independently; policy permission alone installs no route."
      ],
      [
        "Verify the original exchange",
        "Check forwarding and return readiness with the original source and destination; a permitted advertisement is not delivery."
      ]
    ],
    "comparison": [
      [
        "Import / export",
        "Receiving candidate / outgoing advertisement",
        "An export denial can preserve the local eligible BGP choice."
      ],
      [
        "Route filter / packet ACL",
        "Routing information / packet headers",
        "Keep consuming feature, observer and direction explicit."
      ],
      [
        "Policy definition / attachment",
        "Named object / activated consumer",
        "An unattached list does not govern the selected peer."
      ]
    ],
    "example": "Keep the baseline session Established and deny export only. The local BGP choice stays true and the advertisement becomes false. Restore export and deny import only: the supplied incoming candidate disappears before resolution and selection, while the session stays Established. Finally preserve admission and BGP choice but displace system selection, then remove return readiness in a separate case. These changes answer four different questions.",
    "ports": "These route-policy decisions are control-plane processing and introduce no new data service port. BGP context conventionally uses TCP 179; OSPF context uses IP protocol 89. The worksheet opens neither and proves no transport or adjacency state.",
    "commands": [
      {
        "code": "show running-config",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Preserve relevant peer/family/table attachment and policy baseline; handle sensitive output securely.",
        "expected": "Configuration is intended behavior, not proof of a matching route or measured service."
      },
      {
        "code": "show bgp ipv4 unicast json",
        "platform": "Prepared FRR8.4 declared observer; GUIDED NOT EXECUTED",
        "explanation": "Inspect postpolicy candidate attributes and BGP choice in the correct family/table.",
        "expected": "Do not call every view an unfiltered received-route history."
      },
      {
        "code": "show bgp ipv4 unicast summary json",
        "platform": "Prepared FRR8.4 declared observer; GUIDED NOT EXECUTED",
        "explanation": "Read peer/session state independently of one prefix admission or advertisement.",
        "expected": "An established session can coexist with denied import or export."
      },
      {
        "code": "show ip route 198.51.100.0/24",
        "platform": "Prepared FRR8.4 actual table context; GUIDED NOT EXECUTED",
        "explanation": "Compare exact-prefix system source selection with route-policy output.",
        "expected": "Selected system state must be supplemented by actual FIB/adjacency and original exchange evidence."
      }
    ],
    "configuration": "These controls are declarations, not device configuration. Any optional actual exercise needs a separately prepared isolated owned target, reviewed consuming attachment and independent management access. Preserve exact original rules, sequence order, relevant attributes and baseline observation before one authorized change. Restore the precise prior attachment and original exchange before deleting exclusively owned unused objects. Avoid broad clears, reloads, saves or unrelated host-routing changes as diagnostic shortcuts. The four command groups are read-only guided references and have not been executed on a target for this lesson.",
    "production": "Write allow boundaries for the exact family and neighbor role, including default and more-specific handling where intended. Review alternate route sources before describing a denial as deleting a local route. Make export ownership explicit and validate at the intended receiving observer; local configuration alone does not establish remote visibility. Preserve management reachability and rollback while investigating policy.",
    "troubleshooting": [
      [
        "Peer established but prefix absent",
        "Inspect applicable family import policy and whether the displayed view is postpolicy; do not reset transport merely to test a policy hypothesis."
      ],
      [
        "Local route present but remote prefix absent",
        "Trace export attachment, selected BGP information and receiving-side policy at the intended observer."
      ],
      [
        "Imported route unusable",
        "Separate NEXT_HOP resolution and full protocol selection from admission."
      ],
      [
        "Export denied assumed local withdrawal",
        "Review alternate source and local selected route before claiming local deletion."
      ]
    ],
    "security": "Import and export filters are control-plane containment mechanisms, not endpoint firewalls or cryptographic route authorization. A permitted prefix can still be unauthorized or have malicious attributes. Use allocation, business policy, route validation and transport protections as separate evidence. Avoid sharing whole configurations when a scoped relevant attachment is sufficient.",
    "performance": "Filtering can reduce route visibility and update work, but the worksheet measures neither memory nor convergence. A strict import boundary can remove useful alternatives; an export boundary can affect remote decisions without changing local data-plane capacity. Do not interpret fewer admitted routes as automatically faster traffic or greater availability.",
    "mistakes": [
      "Transferring matching semantics between unrelated consuming features.",
      "Assuming a configured policy is attached and effective.",
      "Ignoring the first matching entry or declared admission boundary.",
      "Treating a permit, tag or attribute set as measured forwarding success.",
      "Inferring original return readiness from the forward logical decision."
    ],
    "prerequisites": [
      "s3-g3-t0",
      "s3-g3-t1",
      "s3-g3-t3",
      "s3-g4-t0"
    ],
    "related": [
      "s3-g5-t1",
      "s3-g5-t2",
      "s3-g5-t3",
      "s3-g5-t4"
    ],
    "lab": {
      "objective": "Explain route filtering with fixed scoped decisions, then distinguish logical policy outcome from original exchange prerequisites.",
      "requirements": "Browser only. Optional guided target observations require separately prepared owned supported devices, actual family/table/interface/feature scope and independent management access. No routing or packet process is executed here.",
      "topologyKind": "shared",
      "topology": [
        "Declared route/source → fixed policy boundary",
        "Exact observer and IPv4 table context",
        "Policy result → supplied system selection → original forward and return"
      ],
      "steps": [
        "Keep the session Established and compare baseline, export denied and import denied. Record candidate admission, local BGP choice and outgoing advertisement separately.",
        "Restore admission and export, then remove only NEXT_HOP resolution, system selection or return readiness in turn. Identify the first failed prerequisite without calling it a failed session.",
        "Explain why an export denial can retain the local BGP choice, and name the receiving observer needed to verify a real advertisement.",
        "Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.",
        "Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately."
      ],
      "verification": "The browser reports fixed logical policy and supplied outcome declarations. It does not establish actual protocol selection, device convergence, packet captures, hardware forwarding or application success. Confirm the original transaction at the actual observer when investigating a prepared target.",
      "troubleshooting": "Identify malformed context, matching/nonmatching conditions, explicit or implicit denial and independent outcome gates as different causes. Preserve evidence before changing owned policy and do not invent a success result from a configured permit.",
      "challenge": "Explain why an export denial can retain the local BGP choice, and name the receiving observer needed to verify a real advertisement.",
      "cleanup": "Reset restores only browser declarations without modifying a device or learner progress. Optional owned target work must restore exact prior policy attachment/order and verify baseline observation and original exchange before deleting exclusively owned unused resources."
    },
    "glossary": {
      "Import": "Route-information admission at a receiving control boundary.",
      "Export": "Route advertisement policy toward a named receiver.",
      "Postpolicy": "A view after applicable routing policy has been applied.",
      "Attachment": "The actual peer/family reference that activates a policy object."
    },
    "exams": [
      {
        "testedConcept": "Inbound scope",
        "question": "Does denying this imported candidate prove the BGP session failed?",
        "answer": "No; session state is independent.",
        "explanation": "Import admission applies to one candidate; it does not change the independent session declaration.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; session state is independent.",
          "Yes; every import denial closes TCP.",
          "Only if the prefix is a /24.",
          "Yes; route policy and session state are identical."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q01"
      },
      {
        "testedConcept": "Export scope",
        "question": "What can remain when exportPermit is false?",
        "answer": "The local BGP choice.",
        "explanation": "Export policy suppresses the advertisement while the eligible selected local BGP candidate can remain.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The export advertisement remains guaranteed.",
          "The local BGP choice.",
          "Every local source route must disappear.",
          "NEXT_HOP resolution becomes automatic."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q02"
      },
      {
        "testedConcept": "Eligibility",
        "question": "What must an admitted candidate still satisfy?",
        "answer": "Usable NEXT_HOP and applicable selection prerequisites.",
        "explanation": "Import is one gate; unresolved NEXT_HOP or failed selection still prevents the supplied choice.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Only a short AS_PATH.",
          "Only a live peer socket.",
          "Usable NEXT_HOP and applicable selection prerequisites.",
          "Nothing; admission proves installation."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q03"
      },
      {
        "testedConcept": "Source scope",
        "question": "Does import denial automatically delete every source for the prefix?",
        "answer": "No; other route sources require separate inspection.",
        "explanation": "The worksheet supplies one imported source; connected, static and other candidates require independent evidence.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; policy removes connected and static routes too.",
          "Yes; all sources share one imported record.",
          "Only a more-specific route survives by definition.",
          "No; other route sources require separate inspection."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q04"
      },
      {
        "testedConcept": "Attachment",
        "question": "Does an unattached permit list govern the supplied peer?",
        "answer": "No; the actual attachment matters.",
        "explanation": "The consuming peer/family attachment activates policy; an object definition alone does not.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; the actual attachment matters.",
          "Yes; every configured list affects every neighbor.",
          "Yes; names activate policies globally.",
          "Only the sequence number activates it."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q05"
      },
      {
        "testedConcept": "Policy direction",
        "question": "Which gate controls advertisement toward the peer?",
        "answer": "The independent export gate.",
        "explanation": "Export policy controls the supplied outgoing advertisement, separate from import and packet forwarding.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The local system source distance.",
          "The independent export gate.",
          "The original reply packet.",
          "The unrelated inbound packet ACL."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q06"
      },
      {
        "testedConcept": "System source",
        "question": "Can system displacement coexist with a local BGP choice?",
        "answer": "Yes, in this scoped default advertisement design.",
        "explanation": "This scope keeps protocol choice and system source selection separate and excludes extra advertisement-suppression features.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; system displacement always suppresses all BGP advertisements.",
          "No; BGP and system source are the same gate.",
          "Yes, in this scoped default advertisement design.",
          "Only when return traffic is measured."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q07"
      },
      {
        "testedConcept": "Packet distinction",
        "question": "Is route filtering the same decision as a packet ACL?",
        "answer": "No; routing information and packets have different contexts.",
        "explanation": "Route filtering evaluates routing information; the packet ACL lesson evaluates declared packet headers.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; both decisions inspect the same fields universally.",
          "Yes; a routing prefix is always a packet source.",
          "Only TCP route filtering is a packet ACL.",
          "No; routing information and packets have different contexts."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q08"
      },
      {
        "testedConcept": "Observation",
        "question": "What supports remote advertisement visibility?",
        "answer": "Evidence at the intended receiving observer.",
        "explanation": "A receiver observation can establish the intended advertisement visibility; a sender configuration alone cannot.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Evidence at the intended receiving observer.",
          "Only local configured intent.",
          "Only a local Established summary.",
          "Only system route distance."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q09"
      },
      {
        "testedConcept": "Return",
        "question": "Does admitted and selected BGP information prove the reply works?",
        "answer": "No; original return evidence is independent.",
        "explanation": "BGP choice supplies no opposite-direction route, packet-policy or service evidence.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; selected BGP information creates reply routes.",
          "No; original return evidence is independent.",
          "Yes; admission implies application success.",
          "Only a default route makes return automatic."
        ],
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-Q10"
      }
    ],
    "quick": [
      {
        "question": "Import denial with Established still declared: what fails?",
        "answer": "This imported candidate, while the independent session declaration can remain Established.",
        "explanation": "The filter applies to the supplied route rather than the TCP relationship.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-QC1"
      },
      {
        "question": "What remains when only exportPermit becomes false?",
        "answer": "The eligible selected local BGP candidate can remain; this outgoing advertisement is denied.",
        "explanation": "Outgoing policy is a separate boundary from local choice.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-QC2"
      },
      {
        "question": "Why is a postpolicy BGP view not a complete unfiltered received-route history?",
        "answer": "It reflects its declared observer/store and policy scope, not every original UPDATE or rejected candidate.",
        "explanation": "Name the actual view before interpreting absent information.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t0",
        "questionId": "s3-g5-t0-QC3"
      }
    ],
    "sources": [
      {
        "title": "FRR stable8.4 Filtering: prefix length ranges and ordered matching",
        "url": "https://docs.frrouting.org/en/stable-8.4/filter.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Route Maps: match, permit, deny and set semantics",
        "url": "https://docs.frrouting.org/en/stable-8.4/routemap.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 BGP: family-scoped policy and route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g5-t1",
    "batch": "10",
    "title": "Route redistribution",
    "subtitle": "Translate owned source reachability into a deliberately bounded target candidate.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "interactive": "route-redistribution",
    "definition": "Redistribution presents routes selected from one routing source to a different routing process under an explicit policy boundary. The source route, target family, admitted prefixes, seed metric and feedback controls are separate parts of that boundary. This worksheet fixes a selected source-RIB route as the starting declaration, IPv4 exact 198.51.100.0/24 admission, a supplied OSPF external seed and target tag 100. It is a postpolicy preparation model, not a running OSPF, BGP or multi-protocol network.",
    "purpose": "Use redistribution only when the target domain needs the owned source destinations and the translation has a reviewed scope. Broad mutual redistribution can reintroduce information at another boundary and create unintended choices. This lesson isolates source selection, exact family/prefix admission, an explicit target metric requirement and a declared tag feedback guard. It does not convert source metrics by numerical comparison or certify every multi-domain topology loop-free.",
    "mental": "Imagine an editor copying selected entries from one catalog into another. The editor checks ownership and destination scope, writes a new catalog-specific score and marks the copy. A later gate rejects copies carrying the designated mark to avoid this declared feedback case. The mark is an administrative label; someone can remove or forge it. Copying an entry does not prove the recipient selected it or that a reader can travel there and return.",
    "components": [
      "Source selected RIB route: configuration or protocol visibility alone is not the starting eligibility declaration.",
      "Target family: the worksheet admits only its explicit IPv4 target context.",
      "Exact prefix filter: /24 passes while a /25 inside it is a different candidate and fails.",
      "Explicit seed: the scoped OSPF external metric is an integer 0–16777214; absent seed is blocked by design.",
      "Target tag 100 and source tag 100 rejection: a declared guard against one identified feedback case.",
      "Target choice, system source and original forward/return: independent post-admission gates."
    ],
    "mechanism": [
      "Name source table, source owner, selected route and target routing process before configuring redistribution. The worksheet supplies sourceSelected rather than running source protocol selection. A configured static statement that never installed is not automatically a selected source route. Likewise, a route visible in a source protocol table may lose the system source choice used by an actual redistribution implementation.",
      "Require the declared target family and exact route prefix. The teaching filter admits IPv4 198.51.100.0/24 only; 198.51.100.0/25 does not pass despite containment. family ipv6 is a boundary failure even though the entered fixture prefix remains an IPv4 string for comparison. That enum tests target context and is not a functioning IPv6 parser or AF conversion.",
      "Check the source tag before admitting a translated candidate. A supplied source tag 100 is blocked as feedback; any other valid tag is not rejected by this particular guard. Accepted candidates receive target tag 100. This rule does not claim that arbitrary tags describe original provenance or survive every protocol boundary. Review all redistribution points and tag preservation in the actual design.",
      "Require an explicit seed declaration. The worksheet uses the documented OSPF metric range 0 through 16777214 and writes the supplied value into the prepared target candidate. Absence is a teaching boundary requirement, not a claim that all real protocols require explicitly configured seeds or lack defaults. Source-protocol metrics are not translated by comparing unrelated numeric scales.",
      "Separate admitted target candidate from target selection and system installation. Admission with a seed and tag does not execute external LSA generation, SPF, route advertisement or hardware programming. targetSelected and systemSelected are supplied independent gates. Removing either can preserve the translated candidate while preventing the original forwarding prerequisite conjunction.",
      "Inspect exact source and target observations around the boundary before changing scope. Preserve route-map attachments, metric/type/tag intent and baseline routes at both ends. Use a separately prepared isolated topology for any actual experiment, introduce one owned change and restore exact prior policy. The worksheet has no routing daemons, convergence history, redistribution loops or packet capture."
    ],
    "flow": [
      [
        "Fix the source and destination protocols",
        "Record the selected source route and intended redistribution destination in this one-way worksheet."
      ],
      [
        "Test the redistribution guards",
        "Require an accepted prefix, selected source, supplied seed metric and a source tag that is not the protected return tag."
      ],
      [
        "Inspect the target candidate and tag",
        "An admitted candidate receives tag 100 in this local design; admission does not run the destination protocol or prove loop freedom."
      ],
      [
        "Verify propagation and rollback",
        "Compare real destination protocol state and the original service test, then restore only owned changes."
      ]
    ],
    "comparison": [
      [
        "Source protocol view / selected source RIB",
        "Visible alternative / source selected for this boundary",
        "A configured or visible route is not automatically redistributed."
      ],
      [
        "Seed metric / administrative distance",
        "Target protocol cost / local source preference",
        "Neither is a universal conversion of the source metric."
      ],
      [
        "Route tag / authenticated provenance",
        "Administrative marker / independently established origin",
        "A tag 100 guard covers one declared feedback case only."
      ]
    ],
    "example": "The baseline source route is selected, exact-family admission passes, sourceTag is 0 and an explicit seed 20 is present; the prepared target candidate receives tag 100. Change sourceTag to 100 and it is blocked before translation. Change only prefix to 198.51.100.0/25 to expose exact-prefix rejection. Restore both and remove seedPresent: the scoped admission stops without pretending the source metric supplies the missing target declaration.",
    "ports": "These route-policy decisions are control-plane processing and introduce no new data service port. BGP context conventionally uses TCP 179; OSPF context uses IP protocol 89. The worksheet opens neither and proves no transport or adjacency state.",
    "commands": [
      {
        "code": "show running-config",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Preserve relevant peer/family/table attachment and policy baseline; handle sensitive output securely.",
        "expected": "Configuration is intended behavior, not proof of a matching route or measured service."
      },
      {
        "code": "show ip route 198.51.100.0/24",
        "platform": "Prepared FRR8.4 actual table context; GUIDED NOT EXECUTED",
        "explanation": "Compare exact-prefix system source selection with route-policy output.",
        "expected": "Selected system state must be supplemented by actual FIB/adjacency and original exchange evidence."
      },
      {
        "code": "show route-map json",
        "platform": "Prepared FRR8.4 source/target boundary; GUIDED NOT EXECUTED",
        "explanation": "Inspect relevant redistribution matching/set policy and tag intent.",
        "expected": "A label is a policy marker, not authenticated provenance or universal loop proof."
      },
      {
        "code": "show ip ospf database external",
        "platform": "Prepared FRR8.4 OSPFv2 target; GUIDED NOT EXECUTED",
        "explanation": "Inspect actual external target information only when a supported isolated topology exists.",
        "expected": "No OSPF LSA or convergence result is produced by the browser."
      }
    ],
    "configuration": "These controls are declarations, not device configuration. Any optional actual exercise needs a separately prepared isolated owned target, reviewed consuming attachment and independent management access. Preserve exact original rules, sequence order, relevant attributes and baseline observation before one authorized change. Restore the precise prior attachment and original exchange before deleting exclusively owned unused objects. Avoid broad clears, reloads, saves or unrelated host-routing changes as diagnostic shortcuts. The four command groups are read-only guided references and have not been executed on a target for this lesson.",
    "production": "Minimize redistribution points and imported destination scope. Document source selection semantics, external metric/type, tag lifecycle and each possible feedback boundary. Repeated redistribution can change source preference and visibility even when filters appear symmetric. Inspect selected RIBs and advertised target information on actual observers, then evaluate failure and rollback with independent management access.",
    "troubleshooting": [
      [
        "Configured source absent from target",
        "Confirm source selected RIB eligibility before debugging target policy."
      ],
      [
        "More-specific unexpectedly blocked",
        "Read exact-prefix admission; a /25 does not equal the admitted /24."
      ],
      [
        "Tagged route reappears",
        "Trace every boundary and actual tag preservation rather than assuming labels are immutable."
      ],
      [
        "Target candidate exists but service fails",
        "Inspect target/system selection, actual forwarding and original return path independently."
      ]
    ],
    "security": "A route tag is a policy label, not authentication or a globally trustworthy origin identity. Another process or operator can rewrite it, and an unreviewed boundary can remove it. Prefix ownership, authorization, tag preservation and admission controls therefore need independent evidence. A blocked tag 100 case demonstrates one guard, not universal loop prevention.",
    "performance": "Redistribution can add external routes and processing work to the target domain. The browser does not measure LSA volume, SPF cost, convergence or memory. A seed metric expresses target routing preference under its own semantics; matching a source numeric value does not establish comparable performance. Track source changes and target visibility separately from packet throughput.",
    "mistakes": [
      "Transferring matching semantics between unrelated consuming features.",
      "Assuming a configured policy is attached and effective.",
      "Ignoring the first matching entry or declared admission boundary.",
      "Treating a permit, tag or attribute set as measured forwarding success.",
      "Inferring original return readiness from the forward logical decision."
    ],
    "prerequisites": [
      "s3-g5-t0",
      "s3-g0-t0",
      "s3-g1-t0"
    ],
    "related": [
      "s3-g5-t0",
      "s3-g5-t2",
      "s3-g5-t3",
      "s3-g5-t4"
    ],
    "lab": {
      "objective": "Explain route redistribution with fixed scoped decisions, then distinguish logical policy outcome from original exchange prerequisites.",
      "requirements": "Browser only. Optional guided target observations require separately prepared owned supported devices, actual family/table/interface/feature scope and independent management access. No routing or packet process is executed here.",
      "topologyKind": "shared",
      "topology": [
        "Declared route/source → fixed policy boundary",
        "Exact observer and IPv4 table context",
        "Policy result → supplied system selection → original forward and return"
      ],
      "steps": [
        "Record the baseline selected source route, IPv4 exact /24 admission, seed 20 and target tag 100.",
        "Compare sourceTag 100, a contained /25 and missing seed presence separately. Identify feedback rejection, exact-prefix rejection and the explicit worksheet seed requirement.",
        "Restore admission and remove target selection, system selection or return readiness separately. Explain why an admitted translated candidate need not be installed.",
        "Explain why the tag guard does not authenticate provenance or prevent every possible redistribution loop.",
        "Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.",
        "Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately."
      ],
      "verification": "The browser reports fixed logical policy and supplied outcome declarations. It does not establish actual protocol selection, device convergence, packet captures, hardware forwarding or application success. Confirm the original transaction at the actual observer when investigating a prepared target.",
      "troubleshooting": "Identify malformed context, matching/nonmatching conditions, explicit or implicit denial and independent outcome gates as different causes. Preserve evidence before changing owned policy and do not invent a success result from a configured permit.",
      "challenge": "Explain why the tag guard does not authenticate provenance or prevent every possible redistribution loop.",
      "cleanup": "Reset restores only browser declarations without modifying a device or learner progress. Optional owned target work must restore exact prior policy attachment/order and verify baseline observation and original exchange before deleting exclusively owned unused resources."
    },
    "glossary": {
      "Redistribution": "Import of owned source reachability into another routing process.",
      "Seed": "An explicit initial metric in the target process context.",
      "Feedback": "Reintroduced routing information at a later boundary.",
      "Tag": "Administrative route label used by a scoped policy guard."
    },
    "exams": [
      {
        "testedConcept": "Source eligibility",
        "question": "Which starting source state does this worksheet require?",
        "answer": "A selected source-RIB route.",
        "explanation": "The starting declaration is source-RIB selection, not merely configured or protocol-visible intent.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A selected source-RIB route.",
          "A configured line regardless of installation.",
          "Any visible source protocol alternative.",
          "A successful source-interface ping only."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q01"
      },
      {
        "testedConcept": "Prefix boundary",
        "question": "Does the admitted /24 automatically admit a contained /25?",
        "answer": "No; the filter is exact-prefix.",
        "explanation": "The owned admission filter compares exact 198.51.100.0/24; a /25 is a different route.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; containment is sufficient for the exact filter.",
          "No; the filter is exact-prefix.",
          "Yes; more-specifics inherit exact admission.",
          "Only a /32 is automatically admitted."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q02"
      },
      {
        "testedConcept": "Family boundary",
        "question": "Does target family ipv6 pass this IPv4 admission?",
        "answer": "No.",
        "explanation": "The target family gate requires ipv4 and does not translate the supplied route into another AF.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; the family name is decorative.",
          "Yes; IPv4 automatically becomes IPv6.",
          "No.",
          "Only if the source tag is 100."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q03"
      },
      {
        "testedConcept": "Seed scope",
        "question": "What happens if seedPresent is false?",
        "answer": "The scoped target preparation is blocked.",
        "explanation": "Explicit seed presence is a requirement of this worksheet, independent of possible real protocol defaults.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The source numeric metric is copied automatically.",
          "The model invents the target default seed.",
          "The candidate is admitted without metric context.",
          "The scoped target preparation is blocked."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q04"
      },
      {
        "testedConcept": "Metric semantics",
        "question": "Can source and target metrics be converted by comparing their numbers?",
        "answer": "No; their protocol semantics differ.",
        "explanation": "A metric number has meaning inside its protocol; equal integers do not establish an equivalent target metric.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; their protocol semantics differ.",
          "Yes; lower numbers always describe a better route across protocols.",
          "Yes; all metrics measure bandwidth.",
          "Only matching integer sizes are needed."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q05"
      },
      {
        "testedConcept": "Feedback guard",
        "question": "Which supplied source tag is blocked?",
        "answer": "Tag 100.",
        "explanation": "The fixed feedback guard rejects sourceTag100 before preparing the target candidate.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Every nonzero tag.",
          "Tag 100.",
          "Tag 200 only.",
          "An unmarked source only."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q06"
      },
      {
        "testedConcept": "Target label",
        "question": "Which tag is placed on an admitted target candidate?",
        "answer": "Tag 100.",
        "explanation": "Every admitted target candidate receives the supplied administrative tag 100.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The source metric as a tag.",
          "No tag because translation erases labels.",
          "Tag 100.",
          "The current source tag unchanged in every case."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q07"
      },
      {
        "testedConcept": "Trust",
        "question": "Does tag 100 authenticate original provenance?",
        "answer": "No; it is a declared policy label.",
        "explanation": "Tags can be changed or lost at boundaries and are not cryptographic origin proof.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; tags are cryptographic signatures.",
          "Yes; tag 100 proves allocation ownership.",
          "Only when its number is below 256.",
          "No; it is a declared policy label."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q08"
      },
      {
        "testedConcept": "Target choice",
        "question": "Does admission guarantee target/system selection?",
        "answer": "No; those gates are independent.",
        "explanation": "Target candidate preparation precedes independent target and system selection gates.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; those gates are independent.",
          "Yes; preparation forces target installation.",
          "Only source metric comparison determines selection.",
          "Return readiness forces target selection."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q09"
      },
      {
        "testedConcept": "Execution",
        "question": "Does the worksheet generate actual external LSAs?",
        "answer": "No; it evaluates supplied declarations.",
        "explanation": "No daemon runs and no protocol advertisement is emitted by the worksheet.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; changing the browser starts OSPF.",
          "No; it evaluates supplied declarations.",
          "Yes; tag assignment emits a live LSA.",
          "Only the baseline runs a daemon."
        ],
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-Q10"
      }
    ],
    "quick": [
      {
        "question": "Why does a configured but unselected source route fail this boundary?",
        "answer": "The worksheet starts from a selected source-RIB route.",
        "explanation": "Configuration and protocol visibility are weaker than the required selection declaration.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-QC1"
      },
      {
        "question": "Why is an equal source and target metric number not a conversion rule?",
        "answer": "Each metric has protocol-specific meaning; the target requires its own seed design.",
        "explanation": "Identical integers do not make different protocol metrics equivalent.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-QC2"
      },
      {
        "question": "What is the exact scope of rejecting source tag 100?",
        "answer": "It blocks this identified feedback marker, without proving universal loop prevention.",
        "explanation": "Tags can be rewritten or lost at other boundaries.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t1",
        "questionId": "s3-g5-t1-QC3"
      }
    ],
    "sources": [
      {
        "title": "FRR stable8.4 Filtering: prefix length ranges and ordered matching",
        "url": "https://docs.frrouting.org/en/stable-8.4/filter.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Route Maps: match, permit, deny and set semantics",
        "url": "https://docs.frrouting.org/en/stable-8.4/routemap.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 BGP: family-scoped policy and route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 OSPFv2: redistribution metric/type/filter scope",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g5-t2",
    "batch": "10",
    "title": "Route maps",
    "subtitle": "Distinguish entry matching from the permit or deny action that follows.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "interactive": "route-maps",
    "definition": "A route map is an ordered policy program whose matching entry applies a permit or deny action and optional set operations in its attached context. Its semantics depend on the consuming feature. This lesson uses fixed ordinary FRR8.4 routing-policy entries with simple prefix-list matches and a declared set LOCAL_PREF 200 on permit. Prefix-list permit means the entry match succeeds; prefix-list deny means that entry does not match. It is not itself an automatic route-map denial.",
    "purpose": "Use route maps to combine intended selection criteria with explicit actions while keeping ordering and attachment visible. They can match route information and set attributes, but a route map used for routing policy does not automatically implement packet forwarding policy. The bounded worksheet demonstrates explicit matching denial, permitted attribute setting and implicit final denial. It excludes calls, continuation, goto and general combinations of match conditions.",
    "mental": "Read an ordered checklist with two separate columns: whether this entry recognizes the route, and what this entry does when it recognizes it. A referenced list can refuse recognition without ordering the route to be denied. When recognition succeeds, the entry action matters. Under the fixed default exit behavior, the first recognized entry finishes the worksheet; if none recognizes the route, the final result is implicit deny.",
    "components": [
      "Ordered entries: sequence 10 is examined before sequence 20 under the fixed default exit behavior.",
      "Referenced prefix-list match: permit returns true; deny or no match returns false for this route-map entry.",
      "Explicit deny: a route is denied only when the deny entry matching condition succeeds.",
      "Permit set: a matching permit writes declared LOCAL_PREF 200 and returns permit.",
      "Implicit final denial: the fixed nonempty route map rejects when no entry matches.",
      "Outcome gates: permit and attribute setting do not by themselves establish system installation or original service."
    ],
    "mechanism": [
      "Fix the consuming route-policy context, observer, family, route prefix and attachment. The worksheet accepts canonical aligned IPv4 route prefixes and selected fixed entry sets. It does not execute a route-map text string or import arbitrary statements. On a real target, the same policy name can be consumed by different features; verify the actual attachment before transferring an explanation between contexts.",
      "Evaluate sequence 10 first. In the bounded ruleset it is a deny entry referencing an exact permit list for 198.51.100.0/24. That prefix-list permit makes the entry match true, so the explicit route-map deny terminates processing. The result is denial because the entry action is deny, not because the referenced list contained a deny line.",
      "If sequence 10 does not match, evaluate sequence 20. It is a permit entry using containment within 198.51.100.0/24 with lengths 25 through 28. A matching route receives the supplied LOCAL_PREF 200 set result and processing ends. A /29 in the same address block fails the length condition, and a /25 outside the block fails containment despite having an admitted length.",
      "Compare the list-deny ruleset. Sequence 10 is a route-map deny entry whose referenced list denies the exact /24. Therefore its match condition is false and processing continues. Sequence 20 uses a permit-all prefix list and permits the route with LOCAL_PREF 200. This demonstrates why deny inside a referenced match list is not equivalent to a matching route-map deny.",
      "When no fixed entry matches, return implicit deny. An explicit unconditional final permit would change that behavior, but it is not an excuse to assume every route map has one. This model has only the specified simple matches and default exits. FRR supports additional call and exit policies; this worksheet deliberately does not simulate them or generalize AND/OR semantics across arbitrary match types.",
      "Treat permitted set output as a policy result rather than complete best-path selection. The worksheet holds no candidate competition and does not run BGP updates. Its independent system and forwarding/return controls show that setting LOCAL_PREF does not create a route or service. Investigate actual before/after attributes at the consuming speaker and restore exact original attachments in any separately authorized isolated change."
    ],
    "flow": [
      [
        "Read sequence 10 first",
        "Evaluate the fixed ordered deny sequence against the referenced prefix-list result."
      ],
      [
        "Distinguish a match from a list denial",
        "A denied prefix-list entry makes that match condition false; it does not itself terminate this route-map."
      ],
      [
        "Continue to sequence 20",
        "A matching permit sequence admits the candidate and assigns local preference 200; no matching sequence reaches implicit deny."
      ],
      [
        "Verify the consuming feature",
        "Confirm the route-map attachment and resulting policy state; this worksheet has no call, goto or route installation engine."
      ]
    ],
    "comparison": [
      [
        "Referenced-list deny / route-map deny",
        "Entry nonmatch / matching entry rejection",
        "Continue after nonmatch; reject after the fixed matching deny entry."
      ],
      [
        "Match / set",
        "Condition / attribute action",
        "A set clause does not make a nonmatching entry match."
      ],
      [
        "Simple default exits / advanced control",
        "First matching permit or deny / call, goto or continue",
        "This worksheet implements the simple fixed entry sets only."
      ]
    ],
    "example": "For 198.51.100.0/24 under bounded rules, sequence 10 recognizes the exact prefix and explicitly denies it. Switch to list-deny rules: the deny inside the referenced prefix list causes sequence 10 nonmatch, then sequence 20 permits and supplies LOCAL_PREF 200. Switch back with 198.51.100.240/28 and sequence 20 matches. A contained /29 reaches implicit deny because no entry recognizes the required length.",
    "ports": "These route-policy decisions are control-plane processing and introduce no new data service port. BGP context conventionally uses TCP 179; OSPF context uses IP protocol 89. The worksheet opens neither and proves no transport or adjacency state.",
    "commands": [
      {
        "code": "show running-config",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Preserve relevant peer/family/table attachment and policy baseline; handle sensitive output securely.",
        "expected": "Configuration is intended behavior, not proof of a matching route or measured service."
      },
      {
        "code": "show route-map json",
        "platform": "Prepared FRR8.4 consuming speaker; GUIDED NOT EXECUTED",
        "explanation": "Inspect ordered entries and actual referenced matching objects.",
        "expected": "Separate list match result, entry action and consuming-feature semantics."
      },
      {
        "code": "show ip prefix-list json",
        "platform": "Prepared FRR8.4 consuming speaker; GUIDED NOT EXECUTED",
        "explanation": "Read the referenced prefix-list permit/deny and length conditions.",
        "expected": "A referenced deny means nonmatch in the fixed route-map match context."
      },
      {
        "code": "show ip route 198.51.100.0/24",
        "platform": "Prepared FRR8.4 actual table context; GUIDED NOT EXECUTED",
        "explanation": "Compare exact-prefix system source selection with route-policy output.",
        "expected": "Selected system state must be supplemented by actual FIB/adjacency and original exchange evidence."
      }
    ],
    "configuration": "These controls are declarations, not device configuration. Any optional actual exercise needs a separately prepared isolated owned target, reviewed consuming attachment and independent management access. Preserve exact original rules, sequence order, relevant attributes and baseline observation before one authorized change. Restore the precise prior attachment and original exchange before deleting exclusively owned unused objects. Avoid broad clears, reloads, saves or unrelated host-routing changes as diagnostic shortcuts. The four command groups are read-only guided references and have not been executed on a target for this lesson.",
    "production": "Keep entry order, referenced object contents, consuming feature and default exit behavior in a single review. A route-map permit entry with no applicable match has broad consequences, while a route map without a final permit may reject unintended destinations. Confirm real object existence and attachment; empty or missing-policy behavior requires release and feature investigation rather than extending this fixed model.",
    "troubleshooting": [
      [
        "Deny entry unexpectedly skipped",
        "Read the referenced prefix-list result: list deny is entry nonmatch in this scope."
      ],
      [
        "Route denied after many entries",
        "Check whether any entry actually matched; unmatched fixed maps end with implicit deny."
      ],
      [
        "LOCAL_PREF unchanged",
        "Confirm matching permit, set statement, correct consuming attachment and real observed candidate."
      ],
      [
        "Expected continuation absent",
        "This worksheet uses default exit; call/continue/goto require separate supported policy interpretation."
      ]
    ],
    "security": "Attribute policy can steer routes widely inside a routing domain. Protect route-map ownership and review referenced-object changes because modifying a list can change several consuming policies at once. A matching permit is not proof of authorized prefix origin. Avoid interpreting a control-plane route map as endpoint access control without the correct packet-policy attachment and feature semantics.",
    "performance": "Policy evaluation and optimization are implementation concerns separate from the logical ordered result. FRR documents route-map optimization, but the worksheet does not benchmark it. A logically early match can affect attribute distribution and route visibility, yet neither the sequence number nor set LOCAL_PREF is a measure of packet latency or bandwidth.",
    "mistakes": [
      "Transferring matching semantics between unrelated consuming features.",
      "Assuming a configured policy is attached and effective.",
      "Ignoring the first matching entry or declared admission boundary.",
      "Treating a permit, tag or attribute set as measured forwarding success.",
      "Inferring original return readiness from the forward logical decision."
    ],
    "prerequisites": [
      "s3-g5-t0",
      "s3-g5-t1",
      "s3-g4-t0"
    ],
    "related": [
      "s3-g5-t0",
      "s3-g5-t1",
      "s3-g5-t3",
      "s3-g5-t4"
    ],
    "lab": {
      "objective": "Explain route maps with fixed scoped decisions, then distinguish logical policy outcome from original exchange prerequisites.",
      "requirements": "Browser only. Optional guided target observations require separately prepared owned supported devices, actual family/table/interface/feature scope and independent management access. No routing or packet process is executed here.",
      "topologyKind": "shared",
      "topology": [
        "Declared route/source → fixed policy boundary",
        "Exact observer and IPv4 table context",
        "Policy result → supplied system selection → original forward and return"
      ],
      "steps": [
        "Under bounded rules, test 198.51.100.0/24, 198.51.100.240/28 and 198.51.100.248/29. Record sequence 10 explicit deny, sequence 20 permit/set and implicit denial respectively.",
        "Switch the exact /24 to list-deny rules. Explain why a deny inside the referenced prefix list is a nonmatch, allowing the later permit entry to act.",
        "Keep a permitted set result while removing only system selection or return readiness. Explain why LOCAL_PREF 200 proves neither installation nor the original exchange.",
        "Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.",
        "Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately."
      ],
      "verification": "The browser reports fixed logical policy and supplied outcome declarations. It does not establish actual protocol selection, device convergence, packet captures, hardware forwarding or application success. Confirm the original transaction at the actual observer when investigating a prepared target.",
      "troubleshooting": "Identify malformed context, matching/nonmatching conditions, explicit or implicit denial and independent outcome gates as different causes. Preserve evidence before changing owned policy and do not invent a success result from a configured permit.",
      "challenge": "Keep a permitted set result while removing only system selection or return readiness. Explain why LOCAL_PREF 200 proves neither installation nor the original exchange.",
      "cleanup": "Reset restores only browser declarations without modifying a device or learner progress. Optional owned target work must restore exact prior policy attachment/order and verify baseline observation and original exchange before deleting exclusively owned unused resources."
    },
    "glossary": {
      "Entry": "Ordered match condition plus permit/deny action and optional set.",
      "Match": "The condition that recognizes the candidate at this entry.",
      "Set": "A declared attribute change after a matching permit.",
      "Implicit deny": "Final rejection when none of the fixed entries matches."
    },
    "exams": [
      {
        "testedConcept": "Referenced deny",
        "question": "What does a prefix-list deny mean for this entry match?",
        "answer": "The route-map entry does not match.",
        "explanation": "A referenced prefix-list permit is match true; list deny or no match is match false for this entry.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The route-map entry does not match.",
          "The route-map immediately denies the route.",
          "The route-map automatically permits the route.",
          "The set action runs before any match."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q01"
      },
      {
        "testedConcept": "Explicit deny",
        "question": "When does a route-map deny entry reject the route?",
        "answer": "When its matching conditions succeed.",
        "explanation": "The entry action deny applies only after its condition recognizes the candidate.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Whenever its referenced list contains any deny.",
          "When its matching conditions succeed.",
          "Before any matching condition is checked.",
          "Only when no later permit exists."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q02"
      },
      {
        "testedConcept": "Ordering",
        "question": "Which fixed sequence is evaluated first?",
        "answer": "Sequence 10.",
        "explanation": "The fixed ordinary entry order is ascending sequence 10, then 20, with default exit behavior.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Sequence 20 because it permits.",
          "The lowest route prefix length first.",
          "Sequence 10.",
          "All entries are evaluated simultaneously."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q03"
      },
      {
        "testedConcept": "Set operation",
        "question": "What does a matching scoped permit set?",
        "answer": "LOCAL_PREF 200.",
        "explanation": "The permitted fixed entry supplies LOCAL_PREF 200; it does not set system source distance or measure performance.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A new source address.",
          "A measured latency value200.",
          "A system distance200 in all protocols.",
          "LOCAL_PREF 200."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q04"
      },
      {
        "testedConcept": "Implicit result",
        "question": "What happens when no fixed route-map entry matches?",
        "answer": "Implicit deny.",
        "explanation": "With no matching entry, the nonempty fixed route map reaches its implicit final deny.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Implicit deny.",
          "Automatic permit.",
          "The last entry action regardless of match.",
          "A random earlier permit."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q05"
      },
      {
        "testedConcept": "Prefix boundary",
        "question": "Does the bounded permit entry admit /29?",
        "answer": "No; its maximum length is 28.",
        "explanation": "The bounded permit uses ge 25 le 28; a /29 fails the maximum length even when contained.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; containment alone overrides length.",
          "No; its maximum length is 28.",
          "Yes; every more-specific child is admitted.",
          "Only if the route-map action is deny."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q06"
      },
      {
        "testedConcept": "List-deny case",
        "question": "What follows a nonmatching deny entry in list-deny rules?",
        "answer": "Evaluation continues to sequence 20.",
        "explanation": "In list-deny rules, sequence 10 nonmatch allows sequence 20 evaluation; its permit-all list recognizes the route.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Immediate route denial.",
          "Immediate set LOCAL_PREF without permit.",
          "Evaluation continues to sequence 20.",
          "The entire map is skipped."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q07"
      },
      {
        "testedConcept": "Unsupported control flow",
        "question": "Does this model execute call or goto?",
        "answer": "No; only default fixed entry exits are modeled.",
        "explanation": "Only simple list matches and normal exits are implemented; call, continue and goto are excluded.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; every FRR control-flow extension is implemented.",
          "Only recursive call is automatic.",
          "Goto is inferred from sequence gaps.",
          "No; only default fixed entry exits are modeled."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q08"
      },
      {
        "testedConcept": "Attachment",
        "question": "What must be identified before interpreting a route map?",
        "answer": "Its actual consuming feature and attachment.",
        "explanation": "Feature and attachment determine how policy is consumed; a shared name alone does not prove equivalent behavior.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Its actual consuming feature and attachment.",
          "Only the policy object name.",
          "Only the prefix length.",
          "Only the entry count."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q09"
      },
      {
        "testedConcept": "Service distinction",
        "question": "Does a permitted set operation prove the original service works?",
        "answer": "No; forwarding and return need separate evidence.",
        "explanation": "Attribute setting is a control-policy result, separate from system selection and original exchange evidence.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; LOCAL_PREF 200 authenticates service.",
          "No; forwarding and return need separate evidence.",
          "Yes; a set action creates the reply path.",
          "Only when the matching entry is sequence 20."
        ],
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-Q10"
      }
    ],
    "quick": [
      {
        "question": "A referenced prefix-list denies the route: does that route-map entry match?",
        "answer": "No; this fixed prefix-list match condition returns nonmatch.",
        "explanation": "The model continues to another entry rather than applying the entry action.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-QC1"
      },
      {
        "question": "A matching route-map deny precedes a later permit: which acts?",
        "answer": "The matching deny rejects the route in this simple default-exit ruleset.",
        "explanation": "Later entries are not consulted after that match.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-QC2"
      },
      {
        "question": "Does set LOCAL_PREF200 make a nonmatching entry match?",
        "answer": "No; the match condition is independent of its set action.",
        "explanation": "Actions apply only under the consuming feature and matched entry semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t2",
        "questionId": "s3-g5-t2-QC3"
      }
    ],
    "sources": [
      {
        "title": "FRR stable8.4 Filtering: prefix length ranges and ordered matching",
        "url": "https://docs.frrouting.org/en/stable-8.4/filter.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Route Maps: match, permit, deny and set semantics",
        "url": "https://docs.frrouting.org/en/stable-8.4/routemap.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 BGP: family-scoped policy and route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g5-t3",
    "batch": "10",
    "title": "Prefix lists",
    "subtitle": "Match both destination containment and allowed route-prefix length.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "interactive": "prefix-lists",
    "definition": "An IPv4 prefix list matches route prefixes by ordered address containment and optional prefix-length bounds. It describes destination route information rather than packet source/destination fields. Without ge or le, the route length must equal the entry base length. The first matching entry returns its permit or deny action; this worksheet uses nonempty fixed lists with an implicit final deny. It accepts only canonical aligned IPv4 route prefixes and deliberately separates a default-only entry from a permit-all lengths entry.",
    "purpose": "Use prefix lists when intended destination scope includes both an address block and the specificity of routes permitted within it. Exact198.51.100.0/24, contained /25 and contained /29 are different policy questions. ge 25 le 28 can permit intended child routes while rejecting overly specific announcements. A length check alone is insufficient: a /25 outside the base block must not pass merely because25 lies inside the range.",
    "mental": "Draw a box around the allowed address block, then put a ruler beside it for permitted prefix lengths. A route must fit inside the box and pass the ruler. Read boxes in sequence order and stop at the first match. A broad box labeled0.0.0.0/0 still has a length rule; without a le 32 extension it recognizes the default route only, not every route inside the IPv4 address space.",
    "components": [
      "Canonical route prefix: dotted IPv4, integer length 0–32 and no host bits set.",
      "Containment: candidate network lies within the base entry network.",
      "Exact length: an entry with no ge/le matches the base length only.",
      "Length range: the fixed children list admits lengths 25–28 inside198.51.100.0/24.",
      "Order: an earlier /25 deny can shadow a later broader permit.",
      "Policy and outcome separation: list permit is a match/action result, not automatic installation or traffic proof."
    ],
    "mechanism": [
      "Validate the route prefix before matching. The worksheet rejects malformed octets, leading-zero noncanonical addresses, exponent syntax, bad lengths and misaligned bases such as 198.51.100.1/24. A route prefix is not a host address with a decorative mask. Its canonical base and length establish the address interval used by containment. This parser supports IPv4 only and accepts no arbitrary CLI policy text.",
      "Read the exact fixed list. Sequence 10 permits 198.51.100.0/24 with no range modifiers, so the /24 matches while a contained /25 does not. Address containment alone does not imply permission. This distinction is useful when a receiver should accept an aggregate but not its more-specific children, or vice versa under a different explicit list.",
      "Read the children list as two tests. The candidate must be contained in 198.51.100.0/24 and its length must be at least 25 and at most 28. The aligned upper child 198.51.100.240/28 passes. The aligned 198.51.100.248/29 is contained but too specific. The neighboring 198.51.101.0/25 has a permitted length but is outside the base block.",
      "Compare the two default-related lists. A permit entry for 0.0.0.0/0 with no range matches only default length 0. An entry 0.0.0.0/0 le 32 accepts all aligned IPv4 prefixes from length 0 through 32. The difference is explicit length policy, not a special interpretation that every bare default prefix-list entry means permit any route.",
      "Evaluate entries in ascending supplied sequence order and stop on the first match. In ordered rules, sequence 10 denies 198.51.100.128/25, while sequence 20 permits children of the /24 at lengths 25–28. That exact /25 is denied immediately and never rescued by the later permit. A /26 within that denied /25 is not an exact match to sequence 10 and may match sequence 20.",
      "Return implicit deny when no entry matches the nonempty fixed list. Then report system and original exchange declarations separately. Actual missing, empty, unattached or differently consumed objects require platform-specific review; this worksheet does not assign them universal defaults. Inspect the real list and consuming attachment before any isolated edit, restore exact original entries and recheck the original observation."
    ],
    "flow": [
      [
        "Read the network and length",
        "Use a canonical IPv4 prefix and its exact prefix length, with the consuming policy boundary recorded."
      ],
      [
        "Check containment and ge/le",
        "A base prefix constrains the network; ge and le bound the accepted prefix lengths rather than host addresses."
      ],
      [
        "Apply first-match ordering",
        "Stop at the first matching entry; a prior /25 deny can override a later child-prefix permit."
      ],
      [
        "Check the final unmatched result",
        "Unmatched candidates hit implicit deny; 0.0.0.0/0 without le 32 matches only the default route."
      ]
    ],
    "comparison": [
      [
        "Containment / prefix length",
        "Address interval / route specificity",
        "Both must satisfy the selected entry."
      ],
      [
        "Bare 0/0 / 0/0 le 32",
        "Default route only / all IPv4 route lengths",
        "The same base prefix does not imply the same policy scope."
      ],
      [
        "Exact entry / ge-le range",
        "One route length / inclusive length bounds",
        "A contained child needs an explicit permitted length range."
      ]
    ],
    "example": "Choose exact /24 and then its /25 child to see why the bare entry permits only one length. Compare /25, /28 and /29 under children rules, followed by a /25 in the neighboring /24. Select all with 203.0.113.7/32 to test 0/0 le 32, then choose default-only with a non-default route. Finally select ordered rules and explain the specific /25 denial before the broader permit.",
    "ports": "These route-policy decisions are control-plane processing and introduce no new data service port. BGP context conventionally uses TCP 179; OSPF context uses IP protocol 89. The worksheet opens neither and proves no transport or adjacency state.",
    "commands": [
      {
        "code": "show ip prefix-list json",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Read base prefixes, ge/le bounds and sequence order.",
        "expected": "Default-only and all-lengths entries have different specificity scope."
      },
      {
        "code": "show ip prefix-list detail json",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Inspect detailed list and counter information without clearing it.",
        "expected": "Preserve observations before editing; counters do not prove an entire original exchange."
      },
      {
        "code": "show running-config",
        "platform": "Prepared FRR8.4 owned speaker; GUIDED NOT EXECUTED",
        "explanation": "Preserve relevant peer/family/table attachment and policy baseline; handle sensitive output securely.",
        "expected": "Configuration is intended behavior, not proof of a matching route or measured service."
      },
      {
        "code": "show ip route 198.51.100.0/24",
        "platform": "Prepared FRR8.4 actual table context; GUIDED NOT EXECUTED",
        "explanation": "Compare exact-prefix system source selection with route-policy output.",
        "expected": "Selected system state must be supplemented by actual FIB/adjacency and original exchange evidence."
      }
    ],
    "configuration": "These controls are declarations, not device configuration. Any optional actual exercise needs a separately prepared isolated owned target, reviewed consuming attachment and independent management access. Preserve exact original rules, sequence order, relevant attributes and baseline observation before one authorized change. Restore the precise prior attachment and original exchange before deleting exclusively owned unused objects. Avoid broad clears, reloads, saves or unrelated host-routing changes as diagnostic shortcuts. The four command groups are read-only guided references and have not been executed on a target for this lesson.",
    "production": "Review permitted address containment and length ranges together against actual route ownership. Permit-all lengths entries are powerful and should be deliberate. Preserve sequence order during maintenance, including overlaps that are intentional. Observe the correct incoming or outgoing route-policy attachment; a prefix list does not activate merely because its configuration exists.",
    "troubleshooting": [
      [
        "Contained child denied",
        "Check exact length versus explicit ge/le bounds."
      ],
      [
        "Outside block admitted by expectation",
        "Containment and length are conjunctive; matching the ruler alone is insufficient."
      ],
      [
        "Later permit ignored",
        "Locate the first matching earlier entry and its action."
      ],
      [
        "Host bits accepted elsewhere",
        "This teaching parser requires canonical aligned route prefixes; inspect actual target normalization separately."
      ]
    ],
    "security": "Prefix boundaries can reduce unintended routing announcements, but admission is not cryptographic ownership validation or a packet firewall. A too-broad length range can admit unauthorized more-specific destinations inside an otherwise intended block. Document exceptions and change ownership. Evaluate default-route handling separately because permitting default can redirect large portions of traffic under actual installed routing.",
    "performance": "Prefix-list implementation can use optimized structures; the worksheet presents logical order rather than lookup benchmarks. Restricting specificity changes route visibility and possible longest-prefix outcomes downstream, not physical capacity. Keep control-plane memory, update processing and packet forwarding measurements separate from a simple count of permitted entries.",
    "mistakes": [
      "Transferring matching semantics between unrelated consuming features.",
      "Assuming a configured policy is attached and effective.",
      "Ignoring the first matching entry or declared admission boundary.",
      "Treating a permit, tag or attribute set as measured forwarding success.",
      "Inferring original return readiness from the forward logical decision."
    ],
    "prerequisites": [
      "s3-g5-t0",
      "s3-g5-t2"
    ],
    "related": [
      "s3-g5-t0",
      "s3-g5-t1",
      "s3-g5-t2",
      "s3-g5-t4"
    ],
    "lab": {
      "objective": "Explain prefix lists with fixed scoped decisions, then distinguish logical policy outcome from original exchange prerequisites.",
      "requirements": "Browser only. Optional guided target observations require separately prepared owned supported devices, actual family/table/interface/feature scope and independent management access. No routing or packet process is executed here.",
      "topologyKind": "shared",
      "topology": [
        "Declared route/source → fixed policy boundary",
        "Exact observer and IPv4 table context",
        "Policy result → supplied system selection → original forward and return"
      ],
      "steps": [
        "Compare a bare /24 with its /25 child, then test contained /25, /28 and /29 under ge 25 le 28. Check containment and inclusive length bounds independently.",
        "Compare default-only 0.0.0.0/0 with 0.0.0.0/0 le 32. Test both the default and a /32 host prefix.",
        "Under ordered rules, compare the denied exact 198.51.100.128/25 with a contained /26 that can reach the later permit. Explain why the later permit cannot rescue the exact denied /25.",
        "Enter a misaligned prefix such as 198.51.100.1/24. Explain why validation failure is different from a valid route receiving implicit denial.",
        "Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.",
        "Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately."
      ],
      "verification": "The browser reports fixed logical policy and supplied outcome declarations. It does not establish actual protocol selection, device convergence, packet captures, hardware forwarding or application success. Confirm the original transaction at the actual observer when investigating a prepared target.",
      "troubleshooting": "Identify malformed context, matching/nonmatching conditions, explicit or implicit denial and independent outcome gates as different causes. Preserve evidence before changing owned policy and do not invent a success result from a configured permit.",
      "challenge": "Enter a misaligned prefix such as 198.51.100.1/24. Explain why validation failure is different from a valid route receiving implicit denial.",
      "cleanup": "Reset restores only browser declarations without modifying a device or learner progress. Optional owned target work must restore exact prior policy attachment/order and verify baseline observation and original exchange before deleting exclusively owned unused resources."
    },
    "glossary": {
      "Containment": "The route network falls inside the entry base network.",
      "ge": "Minimum allowed candidate prefix length.",
      "le": "Maximum allowed candidate prefix length.",
      "Alignment": "A route prefix base has no host bits set."
    },
    "exams": [
      {
        "testedConcept": "Exact matching",
        "question": "Does bare 198.51.100.0/24 permit its /25 child?",
        "answer": "No; the route length must match exactly.",
        "explanation": "Without ge/le, candidate length must equal the entry base length, so /25 does not match bare /24.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; the route length must match exactly.",
          "Yes; all contained more-specifics inherit permit.",
          "Yes; a /25 is shorter in address count.",
          "Only if it is the upper half."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q01"
      },
      {
        "testedConcept": "Lower boundary",
        "question": "Does ge 25 le 28 admit a contained /25?",
        "answer": "Yes.",
        "explanation": "The lower bound is inclusive: a contained aligned /25 meets ge 25.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; ge 25 excludes 25.",
          "Yes.",
          "Only /28 matches.",
          "Only exact /24 matches."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q02"
      },
      {
        "testedConcept": "Upper boundary",
        "question": "Does ge 25 le 28 admit a contained /28?",
        "answer": "Yes.",
        "explanation": "The upper bound is inclusive: a contained aligned /28 meets le 28.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; le 28 excludes 28.",
          "Only /25 matches.",
          "Yes.",
          "Every /29 also matches."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q03"
      },
      {
        "testedConcept": "Beyond boundary",
        "question": "Does ge 25 le 28 admit a contained /29?",
        "answer": "No.",
        "explanation": "Length 29 exceeds le 28 even though the address block is contained.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; it remains contained.",
          "Yes; le 28 means at least 28.",
          "Only if its address is aligned.",
          "No."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q04"
      },
      {
        "testedConcept": "Containment",
        "question": "Does a neighboring /25 pass just because its length is 25?",
        "answer": "No; address containment must also pass.",
        "explanation": "Containment and length are both required; neighboring 198.51.101.0/25 is outside the base block.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; address containment must also pass.",
          "Yes; the length test is the only test.",
          "Yes; neighboring blocks are equivalent.",
          "Only its LOCAL_PREF matters."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q05"
      },
      {
        "testedConcept": "Default-only",
        "question": "What does bare permit 0.0.0.0/0 match?",
        "answer": "Only the default route.",
        "explanation": "A bare /0 entry has exact length 0 and recognizes only the default route.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Every IPv4 route prefix.",
          "Only the default route.",
          "Every non-default route only.",
          "Every /32 host route only."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q06"
      },
      {
        "testedConcept": "All lengths",
        "question": "What does permit 0.0.0.0/0 le 32 match in this scope?",
        "answer": "All aligned IPv4 route prefixes.",
        "explanation": "Base /0 contains IPv4 space and le 32 permits candidate lengths 0 through 32.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Only the default route.",
          "Only prefixes exactly /32.",
          "All aligned IPv4 route prefixes.",
          "Only non-default prefixes."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q07"
      },
      {
        "testedConcept": "Ordered deny",
        "question": "Can a later permit rescue an earlier matching deny?",
        "answer": "No; first match stops processing.",
        "explanation": "Processing stops at the first matching entry; a later permit is not examined after matching deny.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; permit overrides deny independently of order.",
          "Yes; the last matching entry wins.",
          "Only a default permit rescues it.",
          "No; first match stops processing."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q08"
      },
      {
        "testedConcept": "Alignment",
        "question": "Is 198.51.100.1/24 a valid worksheet route prefix?",
        "answer": "No; it has host bits set.",
        "explanation": "A /24 base must have zero host bits; .1 is a host address inside that network, not its canonical base.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; it has host bits set.",
          "Yes; host bits are ignored automatically here.",
          "Yes; every dotted address with /24 is canonical.",
          "Only if the list has a ge condition."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q09"
      },
      {
        "testedConcept": "Implicit result",
        "question": "What happens if no fixed list entry matches?",
        "answer": "Implicit deny.",
        "explanation": "No match in the fixed nonempty prefix list yields implicit deny, not a cached prior result.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Implicit permit.",
          "Implicit deny.",
          "Reuse the previous matching result.",
          "Select the shortest listed prefix."
        ],
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-Q10"
      }
    ],
    "quick": [
      {
        "question": "Does bare 198.51.100.0/24 match 198.51.100.128/25?",
        "answer": "No; without length qualifiers the route must have the exact /24 length.",
        "explanation": "Containment alone does not satisfy an exact entry.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-QC1"
      },
      {
        "question": "Which child lengths pass ge 25 le 28 under the /24 base?",
        "answer": "Contained aligned children /25 through /28 inclusive.",
        "explanation": "Both containment and inclusive lower/upper length bounds must agree.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-QC2"
      },
      {
        "question": "How does bare 0/0 differ from 0/0 le 32?",
        "answer": "Bare 0/0 matches only the default; le 32 admits every aligned IPv4 route prefix.",
        "explanation": "Adding the upper qualifier changes specificity scope.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t3",
        "questionId": "s3-g5-t3-QC3"
      }
    ],
    "sources": [
      {
        "title": "FRR stable8.4 Filtering: prefix length ranges and ordered matching",
        "url": "https://docs.frrouting.org/en/stable-8.4/filter.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Route Maps: match, permit, deny and set semantics",
        "url": "https://docs.frrouting.org/en/stable-8.4/routemap.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 BGP: family-scoped policy and route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE Network as Code prefix-list examples: ge/le and default-only",
        "url": "https://netascode.cisco.com/docs/data_models/iosxe/device/prefix_list/",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra: exact-prefix system route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g5-t4",
    "batch": "10",
    "title": "Access lists",
    "subtitle": "Evaluate declared IPv4 packets with ordered rules and precise wildcard bits.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "interactive": "access-lists",
    "definition": "An access list can be consumed by several Cisco IOS XE features. This lesson fixes the IPv4 packet-filter context: a standard rule checks declared packet source, while the supplied extended rules check source, destination, protocol and TCP destination port. It uses ordered nonempty fixed rules and an implicit final deny. Route ACL matching is a different consuming context with different address meanings and is not modeled here. No packet, Cisco device or application is executed.",
    "purpose": "Use packet ACLs to express intended traffic boundaries at a specified interface and direction, then verify the original exchange independently. The worksheet demonstrates a host-specific deny before a broader permit, an extended TCP 443 allow and noncontiguous wildcard matching. It does not implement a stateful firewall, infer attachment from configuration or treat a packet permit as proof of route availability, reverse permission or an established application session.",
    "mental": "Pass one declared packet through an ordered sieve. Each rule checks only its stated bits and fields. Zero wildcard bits must match; one bits are ignored. The first matching rule decides permit or deny. After permit, the packet still needs the actual forwarding path and a separately permitted/reachable reply. The sieve is stateless and does not remember a prior TCP handshake or infer the fields of the return packet.",
    "components": [
      "Packet scope: canonical IPv4 source and destination plus tcp, udp or icmp declarations.",
      "Standard fixed rules: source address only; destination and port do not affect their matching.",
      "Extended fixed rules: source, exact destination 198.51.100.10, TCP and destination port 443.",
      "Wildcard mask: zero means compare and one means ignore; noncontiguous ignored bits are valid.",
      "Ordering: a deny for source 192.0.2.66 precedes the permit for the /24 source block.",
      "Independent outcomes: permitted packet, forward readiness and return readiness are separate declarations."
    ],
    "mechanism": [
      "Identify the actual consuming feature, interface and direction before reading an ACL. The worksheet uses a packet-filter decision with supplied headers only. A route-policy ACL, VTY access class or other consumer can interpret addresses differently. The existence of a configured ACL is not proof of attachment, and missing or empty actual list behavior requires target-specific investigation. This model uses nonempty known rulesets only.",
      "Parse canonical dotted IPv4 source and destination strings strictly. Octets are0–255 without leading zeros; malformed, numeric-coerced or negative values are rejected. The declared protocol must be tcp, udp or icmp. TCP/UDP port declarations are integers 0–65535; ICMP uses zero placeholders because this worksheet does not model ICMP type/code. It contains no fragments, flags, connection state, time ranges, object groups or IPv6.",
      "Evaluate standard rules by packet source. Sequence 10 denies the exact 192.0.2.66 source, and sequence 20 permits 192.0.2.0 with wildcard 0.0.0.255. A packet from 192.0.2.10 can therefore pass regardless of its declared destination or protocol in this fixed standard context. That broad result may be inappropriate for a service-specific policy, motivating a correctly attached extended ACL.",
      "Evaluate extended rules by the stated combination. The first rule denies TCP destination 443 to 198.51.100.10 from source 192.0.2.66; the second permits the same protocol, destination and port from 192.0.2.0/24. Different destination ports, UDP or a different destination do not match the permit. Source port is preserved in the declarations but is not tested by these fixed rules; no unstated restriction is invented.",
      "Use exact bitmask matching for wildcard entries rather than assuming every wildcard is an inverse contiguous subnet mask. The noncontiguous rule has base 10.1.2.0 and wildcard 0.0.254.255. It compares the first two octets and the low bit of the third, while ignoring other third-octet bits and all last-octet bits. Thus 10.1.254.77 matches and 10.1.3.77 fails. Noncontiguous wildcard bits are valid Cisco-style matching syntax.",
      "Stop on the first matching entry and return its action. If no fixed entry matches, return implicit deny. A permit does not prove routing, adjacency, interface status, remote service readiness or reply handling. Keep the original return packet and actual interface direction independent. Any separately prepared target investigation should preserve attachments and counters before a reviewed isolated change, then restore the exact prior ACL order and original exchange."
    ],
    "flow": [
      [
        "Declare the packet fields and direction",
        "Record source, destination, protocol and ports for the attached stateless packet policy."
      ],
      [
        "Evaluate the correct ACL form",
        "The standard example uses source only; the extended example also requires the stated protocol, destination and port."
      ],
      [
        "Apply wildcard and rule order",
        "Zero wildcard bits must match and one bits are ignored, including the noncontiguous example; stop at the first match."
      ],
      [
        "Verify traffic and the return path",
        "An ACL permit is one policy result, not a connection tracker, installed route or proof of a complete exchange."
      ]
    ],
    "comparison": [
      [
        "Wildcard / subnet mask",
        "One means ignore / one means network significance",
        "A noncontiguous wildcard cannot be replaced by a CIDR assumption."
      ],
      [
        "Standard / extended packet ACL",
        "Source only / source, destination and protocol-specific fields",
        "The fixed TCP443 rule checks destination port as well as both addresses."
      ],
      [
        "Stateless permit / established transaction",
        "One header decision / application and reply state",
        "A permit creates no route, reply policy or session state."
      ]
    ],
    "example": "The extended baseline packet 192.0.2.10 to 198.51.100.10 TCP 443 reaches sequence 20 permit. Change only source to 192.0.2.66 and sequence 10 denies before the broad permit. Change only destination port to 80 and both entries miss, giving implicit deny. Under standard rules, an ICMP packet from 192.0.2.10 can pass despite a different destination. Under noncontiguous rules, compare even and odd third octets to see which wildcard bit is actually checked.",
    "ports": "The extended fixed example checks TCP destination 443; this does not validate TLS or a complete session. Standard and noncontiguous source-only examples do not test ports. No packets or sockets are created.",
    "commands": [
      {
        "code": "show ip access-lists",
        "platform": "Prepared Cisco IOS XE17.x device; GUIDED NOT EXECUTED",
        "explanation": "Inspect ordered nonempty ACL rules and counters in the actual packet consumer.",
        "expected": "Counters and order support policy investigation; they do not reconstruct a complete transaction."
      },
      {
        "code": "show ip interface",
        "platform": "Prepared Cisco IOS XE17.x device; GUIDED NOT EXECUTED",
        "explanation": "Inspect actual inbound/outbound ACL attachment and interface context.",
        "expected": "An ACL definition alone does not activate interface packet filtering."
      },
      {
        "code": "show running-config",
        "platform": "Prepared Cisco IOS XE17.x device; GUIDED NOT EXECUTED",
        "explanation": "Preserve exact relevant rule order and attachment before a separately authorized change.",
        "expected": "Configuration can contain sensitive information; retain only scoped owned evidence securely."
      },
      {
        "code": "show ip route 198.51.100.10",
        "platform": "Prepared Cisco IOS XE17.x device; GUIDED NOT EXECUTED",
        "explanation": "Inspect destination routing separately from the declared packet ACL result.",
        "expected": "This routing observation is not an application or return-path test."
      }
    ],
    "configuration": "These controls are declarations, not device configuration. Any optional actual exercise needs a separately prepared isolated owned target, reviewed consuming attachment and independent management access. Preserve exact original rules, sequence order, relevant attributes and baseline observation before one authorized change. Restore the precise prior attachment and original exchange before deleting exclusively owned unused objects. Avoid broad clears, reloads, saves or unrelated host-routing changes as diagnostic shortcuts. The four command groups are read-only guided references and have not been executed on a target for this lesson.",
    "production": "Record interface, direction, feature and packet fields for the original traffic before editing. Use a narrowly scoped management-safe policy and preserve independent access. Standard source-only rules can be too broad for destination/service intent; extended rules need the actual return direction reviewed separately. Check target hardware capabilities and fragment handling rather than extending this simple worksheet to every device path.",
    "troubleshooting": [
      [
        "Expected TCP permit misses",
        "Preserve actual source, destination, protocol and destination port at the observed direction."
      ],
      [
        "Specific host still allowed by expectation",
        "Read the earlier deny before the broader source-block permit."
      ],
      [
        "Wildcard treated as subnet mask",
        "Compute checked bits directly; noncontiguous one bits are allowed."
      ],
      [
        "Permit but application fails",
        "Inspect real route/adjacency and the independent return packet policy and service state."
      ]
    ],
    "security": "Packet ACLs provide a stateless traffic boundary in this scope. A TCP 443 destination permit does not authenticate the client, validate TLS or establish connection state. Noncontiguous masks are exact bit rules and can be difficult to review; document the intended address set explicitly. Protect management and control traffic with the correct consumer and direction instead of assuming a routing filter blocks packets.",
    "performance": "ACL processing may occur in software or hardware with target-specific capacity and feature limits. Rule counters and logging have different overheads, and packets denied before forwarding can change observed load. The browser computes a logical fixed-rule result only; it measures no throughput, TCAM use, CPU cost, logging rate or application latency. Sequence number is order, not a performance metric.",
    "mistakes": [
      "Transferring matching semantics between unrelated consuming features.",
      "Assuming a configured policy is attached and effective.",
      "Ignoring the first matching entry or declared admission boundary.",
      "Treating a permit, tag or attribute set as measured forwarding success.",
      "Inferring original return readiness from the forward logical decision."
    ],
    "prerequisites": [
      "s3-g5-t0",
      "s3-g5-t3"
    ],
    "related": [
      "s3-g5-t0",
      "s3-g5-t1",
      "s3-g5-t2",
      "s3-g5-t3"
    ],
    "lab": {
      "objective": "Explain access lists with fixed scoped decisions, then distinguish logical policy outcome from original exchange prerequisites.",
      "requirements": "Browser only. Optional guided target observations require separately prepared owned supported devices, actual family/table/interface/feature scope and independent management access. No routing or packet process is executed here.",
      "topologyKind": "shared",
      "topology": [
        "Declared IPv4 packet source → fixed standard or extended ordered ACL",
        "Optional noncontiguous source wildcard case",
        "Permit result → independent forward and return declarations"
      ],
      "steps": [
        "Under extended rules, compare TCP/443 from 192.0.2.10 and 192.0.2.66 to 198.51.100.10, then change destination port to 80. Identify permit, explicit deny and implicit deny.",
        "Switch to standard rules and change destination and protocol while preserving an allowed source. Explain why this fixed standard list tests source only.",
        "Under the noncontiguous wildcard 0.0.254.255 at base 10.1.2.0, compare 10.1.254.77 and 10.1.3.77. Identify the significant low bit in the third octet.",
        "Keep a forward packet permit while removing return readiness. Explain why the stateless header decision does not establish a complete exchange.",
        "Keyboard-focus the named result table, inspect each decisive row and activate Reset to restore the baseline.",
        "Optional prepared-target observation uses only the four guided read-only command groups in the correct family, table, interface and direction. Record actual output and original forward/return evidence separately."
      ],
      "verification": "The browser reports fixed logical policy and supplied outcome declarations. It does not establish actual protocol selection, device convergence, packet captures, hardware forwarding or application success. Confirm the original transaction at the actual observer when investigating a prepared target.",
      "troubleshooting": "Identify malformed context, matching/nonmatching conditions, explicit or implicit denial and independent outcome gates as different causes. Preserve evidence before changing owned policy and do not invent a success result from a configured permit.",
      "challenge": "Keep a forward packet permit while removing return readiness. Explain why the stateless header decision does not establish a complete exchange.",
      "cleanup": "Reset restores only browser declarations without modifying a device or learner progress. Optional owned target work must restore exact prior policy attachment/order and verify baseline observation and original exchange before deleting exclusively owned unused resources."
    },
    "glossary": {
      "Wildcard": "A one bit is ignored and a zero bit must match the corresponding address bit.",
      "Stateless": "The decision does not remember prior connection state.",
      "Standard ACL": "The fixed packet context checks source address only.",
      "Extended ACL": "The fixed packet context checks explicit source, destination, protocol and port."
    },
    "exams": [
      {
        "testedConcept": "Standard scope",
        "question": "What does the standard packet ruleset test?",
        "answer": "Packet source address only.",
        "explanation": "The fixed standard packet list ignores destination, protocol and ports when deciding its source match.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Packet source address only.",
          "Destination address only.",
          "TCP destination port only.",
          "Every IP and transport field."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q01"
      },
      {
        "testedConcept": "Extended scope",
        "question": "Which fields must the scoped extended permit match?",
        "answer": "Source, destination, TCP and destination port 443.",
        "explanation": "The extended permit is a conjunction of its supplied source block, exact destination, TCP and destination port 443.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Only source address.",
          "Source, destination, TCP and destination port 443.",
          "Only destination port regardless of protocol.",
          "Only an earlier Established declaration."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q02"
      },
      {
        "testedConcept": "Order",
        "question": "Which rule decides the 192.0.2.66 TCP 443 packet first?",
        "answer": "Sequence 10 explicit deny.",
        "explanation": "The host-specific deny matches before the broader source-block permit is considered.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Sequence 20 broad permit.",
          "The implicit rule before explicit entries.",
          "Sequence 10 explicit deny.",
          "Both explicit entries simultaneously."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q03"
      },
      {
        "testedConcept": "Wildcard zero",
        "question": "What does a zero wildcard bit mean?",
        "answer": "Compare the corresponding address bit.",
        "explanation": "Zero wildcard bits are checked for equality against the corresponding base address bits.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Ignore the corresponding bit.",
          "Require that bit to be zero in the packet.",
          "Compare only if all mask bits are zero.",
          "Compare the corresponding address bit."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q04"
      },
      {
        "testedConcept": "Wildcard one",
        "question": "What does a one wildcard bit mean?",
        "answer": "Ignore the corresponding address bit.",
        "explanation": "One wildcard bits remove those address bits from the equality test.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Ignore the corresponding address bit.",
          "Require that bit to be one in the packet.",
          "Compare the corresponding bit.",
          "Deny any address containing that bit."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q05"
      },
      {
        "testedConcept": "Noncontiguous masks",
        "question": "Are noncontiguous wildcard bits valid in this context?",
        "answer": "Yes; matching uses exact bit masks.",
        "explanation": "Cisco-style wildcard masks specify ignored bits and need not have contiguous ones.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; wildcards must be contiguous subnet masks.",
          "Yes; matching uses exact bit masks.",
          "Only for IPv6.",
          "Only when every bit is ignored."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q06"
      },
      {
        "testedConcept": "Even third octet",
        "question": "Does 10.1.254.77 match base 10.1.2.0 wildcard 0.0.254.255?",
        "answer": "Yes.",
        "explanation": "Wildcard 0.0.254.255 preserves the third-octet low bit;254 is even and the last octet is ignored.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; the third octet must equal2 exactly.",
          "No; the last octet must be zero.",
          "Yes.",
          "Only TCP 443 can make the wildcard match."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q07"
      },
      {
        "testedConcept": "Odd third octet",
        "question": "Does 10.1.3.77 match that noncontiguous rule?",
        "answer": "No.",
        "explanation": "The low bit of third octet3 is one, while base third octet2 has a zero low bit, so it fails.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; all third-octet bits are ignored.",
          "Yes;3 is adjacent to 2.",
          "Only a standard list forces a match.",
          "No."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q08"
      },
      {
        "testedConcept": "Different consumer",
        "question": "Are route-ACL source/destination semantics modeled here?",
        "answer": "No; this scope is IPv4 packets.",
        "explanation": "Route-policy and other ACL consumers can assign different meanings to address fields; only packet headers are modeled.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; this scope is IPv4 packets.",
          "Yes; all ACL consumers interpret fields identically.",
          "Yes; routes are treated as ICMP packets.",
          "Only source semantics are universal."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q09"
      },
      {
        "testedConcept": "Reply",
        "question": "Does a forward packet permit prove its reply succeeds?",
        "answer": "No; return policy and reachability need separate evidence.",
        "explanation": "The stateless forward permit creates neither a remote return route nor reverse ACL permission or service state.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; packet permit creates the remote reply route.",
          "No; return policy and reachability need separate evidence.",
          "Yes; TCP 443 implies established state.",
          "Only the broader permit guarantees return."
        ],
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-Q10"
      }
    ],
    "quick": [
      {
        "question": "Why does wildcard 0.0.254.255 match an even third octet?",
        "answer": "Its third-octet least significant bit is significant while the other third-octet bits are ignored.",
        "explanation": "Wildcard bit zero requires equality; the base third octet2 has low bit zero.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-QC1"
      },
      {
        "question": "Does the fixed standard ACL inspect TCP destination port 443?",
        "answer": "No; it tests packet source only.",
        "explanation": "Extended rules can include transport fields, but this standard list does not.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-QC2"
      },
      {
        "question": "Does a TCP443 packet permit create a return session?",
        "answer": "No; this ACL is stateless and return/forwarding prerequisites are separate.",
        "explanation": "A single allowed header decision proves no complete application exchange.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Topic-specific boundary",
        "topicId": "s3-g5-t4",
        "questionId": "s3-g5-t4-QC3"
      }
    ],
    "sources": [
      {
        "title": "Cisco IOS XE17.x IP Access List Overview: ordered packet rules, source/extended scope and wildcard bits",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE Gibraltar16.12.x: ACL inspection and interface attachment commands",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_data_acl/configuration/xe-16-12/sec-data-acl-xe-16-12-book/sec-create-ip-apply.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS Security Command Reference: show ip access-lists and show ip interface",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s4.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17 protocol-independent command reference: show ip route",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g6-t0",
    "batch": "10",
    "title": "VRF",
    "subtitle": "Choose the routing context before interpreting the destination address.",
    "level": "Intermediate → Production",
    "minutes": 75,
    "interactive": "vrf",
    "definition": "A Virtual Routing and Forwarding context gives a device a distinct routing and forwarding domain with its own interface and route ownership. The same IPv4 prefix can exist in BLUE and RED while naming different destinations and next hops. The address alone is insufficient: ingress attachment or an explicitly scoped locally originated operation identifies the context before the destination lookup. This lesson uses three declared contexts, BLUE, RED and default, with two fixed exact-prefix queries. It is a routing-context worksheet, not a universal Linux, Cisco, VPN or policy-routing engine.",
    "purpose": "Use a VRF to keep tenant, service or operational route ownership explicit on shared infrastructure. Start every observation with device, table/VRF, interface, family, source and destination. A route visible in BLUE is not automatically available in RED, and a query run without its intended scope can find a different route for the same numeric address. Shared infrastructure and route separation do not replace authentication, encryption, firewall policy or an owned service boundary. Controlled shared-service access requires deliberate route and policy design, including return paths.",
    "mental": "Imagine three separate address books on one desk. BLUE and RED both list 10.10.0.42, but each entry belongs to a different book and a different gateway owner. The attachment tells you which book applies; the destination tells you which entry to read within it. A blank page in BLUE does not authorize you to open RED. A documented shared-service exception can add one entry to RED, but the imported entry still needs a usable next hop, selected source and a return design. A wrong attachment may select the wrong book on a real router; the worksheet flags that disagreement without enforcing security.",
    "components": [
      "Contexts and ownership: BLUE, RED and default each have an independent 10.10.0.0/24 candidate, declared next hop and selected-source gate. BLUE and RED endpoints can each use numeric gateway 10.10.0.1 because the gateway owner and attachment differ; this is not one shared neighbor identity.",
      "Ingress and local queries: blue-lan expects BLUE, red-lan expects RED and default-port expects default. The declared actual L3 binding selects the diagnostic table. The intended endpoint context and gateway owner must agree for the worksheet to apply an intended-exchange lookup.",
      "Routes and recursion: a candidate must exist in the selected context, its next hop must resolve there, and its source must be selected for declared installation. Resolution is not ARP success, packet delivery or proof that a numeric next hop in another VRF can be reused.",
      "Explicit chosen-prefix sharing: BLUE owns service 203.0.113.0/24. The fixture can declare only that candidate imported into RED. Permission depends on the source candidate existing and is separate from RED next-hop resolution and source selection. It never imports BLUE's overlapping tenant /24 or installs a reverse route automatically.",
      "Platform mapping: Linux VRF devices plus l3mdev/routing-policy rules associate traffic with tables in a network namespace. FRR 8.4 normally maps that Linux VRF backend, while Zebra -n selects a network-namespace backend. Cisco interface/VRF command semantics are target-specific; a name shared across products does not make their mechanisms interchangeable.",
      "Rule and default boundaries: the worksheet's no-fallback behavior is a declared policy. Real Linux rule processing can continue to another table on a miss without an appropriate terminal route. Inspect rules and the selected table's default before claiming isolation. The routing context named default and an IPv4 0.0.0.0/0 route are different concepts.",
      "Original service: selected-source, forward-ready, return-ready and policy/NAT-ready declarations describe different dependencies. Route separation does not configure a listener, authentication, firewall or address translation, and all-green declarations are not measured traffic."
    ],
    "mechanism": [
      "Fix the observer and context before reading addresses. Record the original endpoint's tenant, attached interface and owned gateway, then the actual routing-context binding. A destination shared numerically across VRFs is expected in this fixture; the question is which ownership domain the original exchange belongs to.",
      "Check attachment availability and agreement. A declared RED binding does not become BLUE because the endpoint was intended to be BLUE. The tool reports the bound context and blocks its intended-exchange calculation on disagreement. Real equipment may forward into the incorrectly assigned context; this diagnostic flag is not an ACL or security enforcement function.",
      "Perform only the fixed query within the agreed context. The overlapping query 10.10.0.42 maps to a supplied exact 10.10.0.0/24 candidate. The service query maps to 203.0.113.0/24. No longest-prefix, default-route or policy-routing algorithm is computed; a native candidate absent in BLUE stays absent despite matching prefixes in RED or default.",
      "For shared service, inspect the explicit BLUE-to-RED declaration and original source candidate. A permitted candidate can exist in RED without target next-hop resolution or selected installation. The worksheet's independent RED import gates explain this sequence but do not implement FRR import vrf, VPN RIB processing, route-target policy or any vendor leak syntax.",
      "Keep the selected source distinct from candidate visibility. A candidate can be present and resolvable yet displaced by another source. That competitor is outside the fixed inventory; the model only shows no installation of this declared candidate, not that the entire real table has no usable route.",
      "Inspect the actual Linux boundary if using a prepared Linux lab. Record VRF-device table IDs, enslaved interfaces, routing-policy rules, appropriate terminal/default routes and a scoped route-get result. Higher-priority rules and missing terminal routes can change lookup behavior outside this model. Do not transplant table identifiers from the worksheet to the host.",
      "If observing FRR, identify Zebra's backend first. In the ordinary backend, a VRF maps to a Linux table in the same namespace; in the namespace backend, namespace ownership changes the meaning of route-table views. A show command omitting VRF scope can inspect default rather than the intended tenant. No backend switch or namespace creation is performed here.",
      "Verify the actual original exchange and its reply separately when operating an authorized prepared target. Correlate installed source, neighbor and forwarding state with policy/NAT, host/service and both direction scopes. Preserve evidence before any separately authorized change and restore exact owned attachments and dependencies afterward. This page provides only read-only observer examples."
    ],
    "flow": [
      [
        "Identify attachment and owner",
        "Record intended endpoint, actual binding, gateway and routing context."
      ],
      [
        "Query that context",
        "Use the fixed destination only within the agreed table; no borrowed table on a miss."
      ],
      [
        "Admit and install the candidate",
        "Explicit sharing, target resolution and selected-source declarations are distinct."
      ],
      [
        "Verify the exchange",
        "Inspect original policy/forward/return evidence; a routing table is not a service test."
      ]
    ],
    "comparison": [
      [
        "VRF context / destination prefix",
        "Which table / which entry inside it",
        "Overlapping prefixes cannot identify the correct tenant by themselves."
      ],
      [
        "Default context / default route",
        "An independent routing domain / least-specific prefix",
        "A named context is not automatic fallback on a lookup miss."
      ],
      [
        "Linux VRF / network namespace",
        "Layer 3 table/rule scope / broader network-object scope",
        "FRR backend selection changes the operational mapping."
      ],
      [
        "Route import / next-hop resolution",
        "Candidate introduction / target usability",
        "A permitted import need not install or forward."
      ],
      [
        "Candidate displaced / empty real table",
        "This source not selected / no alternatives",
        "The worksheet does not compute the competing source."
      ],
      [
        "Route separation / security",
        "Routing ownership / enforced access and protection",
        "Authentication, encryption and service policy remain independent."
      ]
    ],
    "example": "Load overlap-blue: 10.10.0.42 uses the declared BLUE /24 via BLUE next hop 192.0.2.2. Load overlap-red: the same address uses RED's independent /24 via 192.0.2.6. Load missing-route: removing BLUE's candidate does not borrow the existing RED/default rows. For service 203.0.113.42 in RED, leak-denied has no candidate; leak-permitted introduces BLUE's service candidate; leak-unresolved shows why RED target resolution still matters. Finally return-missing keeps declared BLUE installation while exchange prerequisites fail. These are authored states, not packets or actual imported routes.",
    "ports": "A VRF is a routing context and has no new TCP or UDP service port. Protocol sessions and management/application sockets have their own context and transport. Linux applications can require explicit VRF binding; a local default-context lookup or listener cannot be assumed to represent tenant forwarding. The worksheet opens no socket and tests no listener.",
    "commands": [
      {
        "code": "ip -d link show type vrf\nip link show master BLUE\nip link show master RED",
        "platform": "Prepared Linux kernel 6.6 / iproute2 6.6.0 VRF-device lab · guided read-only, not executed",
        "explanation": "Record actual VRF device/table identifiers and interface membership before interpreting an overlapping destination.",
        "expected": "BLUE and RED must already be owned VRF-device names in this observer namespace. The -d view exposes table IDs. This is not a command for an unprepared host or proof of FRR namespace-backend mapping."
      },
      {
        "code": "ip rule show\nip route show vrf BLUE\nip route show vrf RED",
        "platform": "Prepared Linux kernel 6.6 / iproute2 6.6.0 VRF-device lab · guided read-only, not executed",
        "explanation": "Inspect routing-policy/l3mdev rule context and the actual route/default boundaries in each named table.",
        "expected": "Retain rule priorities and each selected table's intended terminal/default behavior. A table miss can continue to another applicable rule; do not claim universal no-fallback from a VRF name. No rule or default route is added by these commands."
      },
      {
        "code": "ip route get 10.10.0.42 vrf BLUE\nip route get 10.10.0.42 vrf RED",
        "platform": "Prepared Linux kernel 6.6 / iproute2 6.6.0 VRF-device lab · guided read-only, not executed",
        "explanation": "Compare two explicitly scoped local diagnostic lookups of the same numeric destination.",
        "expected": "Record table, selected source and egress from the actual output. A local route-get result is a lookup diagnostic, not a forwarded original-packet trace or service measurement; rules, source and ingress context need their own actual evidence."
      },
      {
        "code": "show ip route vrf BLUE\nshow ip route vrf RED\nshow ip nht vrf BLUE\nshow ip nht vrf RED",
        "platform": "Prepared FRR stable 8.4 Zebra CLI · guided read-only, not executed",
        "explanation": "Compare each VRF's candidate/source/installation and target next-hop tracking context after identifying the configured backend.",
        "expected": "Scope names must match actual FRR VRFs. In the ordinary backend route views map to associated Linux tables; with Zebra -n they map to network-namespace routing context. Candidate/next-hop metadata is independent of FIB, neighbor and original traffic proof."
      }
    ],
    "configuration": "The browser supplies declarations and configures nothing. An optional prepared Linux observer must already own BLUE/RED devices, associated tables, enslaved Layer 3 attachments and reviewed l3mdev/routing-policy and terminal/default behavior. Names and IDs must be discovered from its actual state. An optional FRR observer requires a documented Zebra backend, actual namespace/table mapping and existing route ownership; Zebra's VRF configuration stanza is not a universal command to create the underlying Linux object. This page never changes a master binding, backend, rule, route, socket sysctl or namespace. Any separately authorized change must record and restore addresses, dependent routes, source/rule context and exact prior ownership; interface rebinding can affect those dependencies on the target.",
    "production": "Make every route observation and incident record context-complete: observer, family, VRF/table, interface, source/destination, gateway owner and original service. Shared services need a precise prefix/direction contract and return design. Overlapping tenant addresses can make shared access ambiguous; route import alone does not solve identity, NAT, firewall, application or return requirements. Distinguish configuration intent from the effective Linux policy rules, FRR routing source and actual dataplane. Default-table reachability observed from management is not proof a tenant can reach the same destination.",
    "troubleshooting": [
      [
        "Same IP reaches the wrong endpoint",
        "Compare actual ingress/interface binding and intended tenant before changing the route. Numeric address equality does not validate ownership."
      ],
      [
        "BLUE route missing but RED route present",
        "Inspect BLUE candidates and dependencies. The fixture never searches RED/default as a substitute; separately inspect actual Linux RPDB continuation and terminal routes."
      ],
      [
        "Imported service present but not installed",
        "Check source prefix existence, deliberate import scope, target next-hop resolution and selected source. Presence alone does not establish forwarding."
      ],
      [
        "Local command succeeds, tenant fails",
        "Record the command's socket/table/source scope and original ingress path. A default management operation may query a different context."
      ],
      [
        "VRF names map unexpectedly",
        "Identify Linux table IDs and namespace ownership plus FRR backend; a shared name is not evidence the same table was queried."
      ],
      [
        "Route installed, application fails",
        "Inspect neighbor/FIB, original policy/NAT, host/service and return context. A missing reply dependency does not delete the forward route."
      ],
      [
        "Isolation claim unsupported",
        "Inspect route sharing, rule priorities, terminal/default behavior, socket policy and real access controls; do not infer authentication or encryption from separate tables."
      ]
    ],
    "security": "Routing separation reduces accidental route mixing when attachments and policy are correct, but it is not cryptographic isolation or authorization. Misbound interfaces, deliberate sharing, higher-priority Linux rules, socket settings and service policy can cross intended boundaries. Preserve management independence and exact ownership during any separate change. The diagnostic readiness gates in this worksheet do not enforce an ACL on real packets.",
    "performance": "VRFs share physical interfaces, processing and platform forwarding resources. Separate tables do not create extra bandwidth or remove common failure domains. Table count, routes, recursion, neighbor state and platform offload consume different resources; limits depend on release and hardware. The fixed six-row inventory calculates declarations and provides no throughput, scale, FIB programming or convergence measurements.",
    "mistakes": [
      "Looking up the destination before identifying routing context.",
      "Treating matching BLUE and RED IPs as one shared route or gateway.",
      "Calling the default routing context an automatic fallback.",
      "Equating a Linux VRF device with a network namespace.",
      "Treating a permitted import as usable installed forwarding.",
      "Assuming route distinguisher or route target labels alone forward packets.",
      "Calling declared agreement a measured service or security test."
    ],
    "prerequisites": [
      "s1-g4-t0",
      "s1-g4-t1",
      "s1-g4-t2",
      "s3-g0-t0"
    ],
    "related": [
      "s3-g6-t1",
      "s3-g5-t1"
    ],
    "artifacts": [],
    "lab": {
      "objective": "Trace a fixed destination through declared attachment ownership, one selected routing context and independent candidate/installation/service prerequisites.",
      "requirements": "Browser tabletop requires no device or privilege. Optional read-only Linux/FRR observation requires the exact prepared owned contexts and supported versions printed with the commands; no live setup is supplied.",
      "topologyKind": "shared",
      "topology": [
        "BLUE endpoint10.10.0.42 / owned gateway 10.10.0.1 / blue-lan",
        "RED independent endpoint10.10.0.42 / owned gateway 10.10.0.1 / red-lan",
        "BLUE next hop192.0.2.2 · RED next hop192.0.2.6 · default next hop192.0.2.10",
        "BLUE service 203.0.113.0/24 → explicit chosen-prefix RED candidate declaration"
      ],
      "steps": [
        "Compare overlap-blue and overlap-red. Write context, exact prefix, gateway owner and distinct target next hop before reading readiness.",
        "Select wrong-attachment and wrong-binding. Record the bound table and explain why the intended endpoint disagreement cannot be repaired by matching IP addresses.",
        "Select missing-route and default-separate. Explain the fixture's no-borrow policy, then distinguish real Linux rule continuation and terminal defaults.",
        "Compare leak-denied, leak-permitted, leak-unresolved, leak-source-absent and leak-displaced; identify which explicit gate changes.",
        "Select return-missing, source-displaced and policy-missing; separate installation from original exchange declarations.",
        "Use keyboard controls, inspect the named locally scrollable table and reset. Enter an unlisted declaration through a test context and confirm stale results remain hidden.",
        "If separately prepared, collect only the four scoped read-only command groups and explain which actual observations support or contradict each declaration. Do not fill unknown target data from the tabletop baseline."
      ],
      "verification": "Record expected table before each destination query, source/candidate ownership, target next-hop resolution, selected-source installation and independent original policy/forward/return prerequisites. Independently authored model tests verify declared outcomes and strict invalid-input hiding; live target, browser layout, FIB and service evidence must be separately reported.",
      "troubleshooting": "Start with observer and attachment ownership, then candidate/target resolution/source gates. A diagnostic mismatch is not real-router enforcement. Stop at unknown target context rather than silently querying default.",
      "challenge": "BLUE and RED both own 10.10.0.0/24 and gateway 10.10.0.1. Why can a default-context lookup never identify the intended tenant by destination alone? Then explain why importing only BLUE's service prefix into RED neither imports BLUE's tenant prefix nor supplies the reply path.",
      "cleanup": "Reset only restores local declarations. Read-only commands add no device, route, rule or namespace. Close optional observer sessions according to ownership. Separately authorized configuration changes require their own exact prior-state restoration and original-service evidence."
    },
    "glossary": {
      "VRF": "A distinct routing and forwarding context with explicit route/interface ownership.",
      "Ingress binding": "Declared association of an incoming Layer 3 attachment with its routing context.",
      "Overlapping prefix": "Same numeric prefix in separate contexts with independent ownership.",
      "l3mdev": "Linux Layer 3 master-device rule context directing lookups to associated tables.",
      "RPDB": "Linux routing-policy database whose rules can direct table lookups.",
      "Terminal route": "A deliberate route action that terminates applicable lookup rather than leaving a table on a miss.",
      "Route import declaration": "The worksheet's explicit chosen-prefix candidate introduction, not an implemented leak engine.",
      "Gateway owner": "The routing/attachment context in which the endpoint's gateway identity exists."
    },
    "exams": [
      {
        "testedConcept": "Context before address",
        "question": "BLUE and RED both contain 10.10.0.0/24. What should be identified before a destination lookup?",
        "answer": "The actual ingress or explicitly scoped local routing context.",
        "explanation": "The destination can name different owners in separate tables.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "The actual ingress or explicitly scoped local routing context.",
          "Search every VRF for the most specific matching prefix.",
          "Use the numeric gateway address to infer the tenant.",
          "Use only the default table because the router is shared."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q01"
      },
      {
        "testedConcept": "Independent matching prefix",
        "question": "BLUE's overlapping candidate is absent while RED's matching candidate remains. What does this fixture do for an agreed BLUE query?",
        "answer": "Reports no BLUE candidate without borrowing RED.",
        "explanation": "The model's no-fallback table policy is explicit.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Uses RED because the destination prefix matches.",
          "Reports no BLUE candidate without borrowing RED.",
          "Continues into default automatically on every missing BLUE route.",
          "Imports BLUE and RED tenant prefixes whenever service-leak permission is enabled."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q02"
      },
      {
        "testedConcept": "Gateway ownership",
        "question": "Both tenants use gateway 10.10.0.1. Does the equal numeric address prove a shared gateway identity?",
        "answer": "No; gateway context and attachment ownership still differ.",
        "explanation": "An address is interpreted in its ownership context.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; identical gateway IPs automatically share one ARP entry.",
          "Yes; a shared physical router forces both gateway addresses to use one identity.",
          "No; gateway context and attachment ownership still differ.",
          "No; gateway IP addresses must be globally unique across every VRF."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q03"
      },
      {
        "testedConcept": "Permitted candidate",
        "question": "A BLUE service prefix is explicitly permitted into RED, but its RED target next hop is unresolved. What is supported?",
        "answer": "The candidate can exist without declared installation.",
        "explanation": "Import permission and target usability are different gates.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The permit automatically copies BLUE next-hop resolution into RED.",
          "The imported route is installed because import permission replaces target usability.",
          "The service prefix must be rejected because no route can be shared across VRFs.",
          "The candidate can exist without declared installation."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q04"
      },
      {
        "testedConcept": "Source displacement",
        "question": "A candidate exists and resolves in BLUE, but blueSelected is false. What does the tool claim?",
        "answer": "This declared source is not installed; the competitor is outside scope.",
        "explanation": "It does not compute every other real routing source.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "This declared source is not installed; the competitor is outside scope.",
          "The entire real BLUE table necessarily has no usable alternatives.",
          "Candidate visibility proves installation despite the selected-source declaration.",
          "The candidate becomes selected in default whenever it is displaced in BLUE."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q05"
      },
      {
        "testedConcept": "Linux boundary",
        "question": "Which statement correctly describes the worksheet's no-fallback result and real Linux behavior?",
        "answer": "No fallback is declared here; actual rule and terminal-route design must be inspected.",
        "explanation": "Linux policy rules can continue beyond a table miss.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The VRF device name alone blocks table fallback under any rule set.",
          "No fallback is declared here; actual rule and terminal-route design must be inspected.",
          "Linux VRF devices create namespace boundaries, so routing-policy rules are irrelevant.",
          "The l3mdev rule always outranks every separately configured policy rule."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q06"
      },
      {
        "testedConcept": "Backend distinction",
        "question": "In FRR 8.4, what does Zebra -n select?",
        "answer": "The Linux network-namespace VRF backend.",
        "explanation": "The ordinary backend instead maps Linux VRF devices/tables.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "A new table ID in the same namespace, without selecting a namespace backend.",
          "A separate routing daemon process required for every VRF.",
          "The Linux network-namespace VRF backend.",
          "Automatic terminal default routes for all tenant tables."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q07"
      },
      {
        "testedConcept": "Default meaning",
        "question": "Is the context named default identical to an IPv4 0.0.0.0/0 route?",
        "answer": "No; one names a routing context and the other a prefix.",
        "explanation": "A context can have or lack its own default route.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; the default context always contains an installed default route.",
          "Yes; one default route is shared by all named contexts.",
          "No; the default context can contain only a default route and no specific prefixes.",
          "No; one names a routing context and the other a prefix."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q08"
      },
      {
        "testedConcept": "Wrong attachment",
        "question": "An intended BLUE endpoint has a known attachment declared bound to RED. Does the destination IP correct the binding?",
        "answer": "No; the tool reports the bound RED context and intended-owner disagreement.",
        "explanation": "A real misbinding can steer traffic incorrectly; the tool's flag is diagnostic.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; the tool reports the bound RED context and intended-owner disagreement.",
          "Yes; the overlapping destination prefix identifies the intended BLUE context.",
          "Yes; the equal gateway IP overrides the actual RED interface binding.",
          "Both tables are queried because the same prefix exists in BLUE and RED."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q09"
      },
      {
        "testedConcept": "Service evidence",
        "question": "All declarations agree in the VRF worksheet. What actual measurement has it performed?",
        "answer": "None; it reports supplied prerequisite agreement.",
        "explanation": "No packet, FIB or authentication test runs.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Installed hardware forwarding was verified because source-selected is true.",
          "None; it reports supplied prerequisite agreement.",
          "A round trip was observed because return-ready is true.",
          "The original application succeeded because a route exists in the named context."
        ],
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Lookup scope",
        "question": "Which comes first here: attachment/context agreement or destination query?",
        "answer": "Attachment/context agreement.",
        "explanation": "The route is interpreted within the selected context.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-QC1"
      },
      {
        "testedConcept": "Explicit sharing gates",
        "question": "What remains after permission introduces a RED service candidate?",
        "answer": "Target next-hop resolution, selected-source installation and original policy/forward/return requirements.",
        "explanation": "Permission does not manufacture these dependencies.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-QC2"
      },
      {
        "testedConcept": "Security limit",
        "question": "Does separate route ownership prove authentication or encryption?",
        "answer": "No.",
        "explanation": "Security controls and measurements remain independent.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "s3-g6-t0",
        "questionId": "s3-g6-t0-QC3"
      }
    ],
    "sources": [
      {
        "title": "Linux kernel 6.6 VRF device, l3mdev rules and scoped inspection",
        "url": "https://www.kernel.org/doc/html/v6.6/networking/vrf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 6.6.0 ip-rule manual: read-only rule show",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/ip-rule.8",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 Zebra VRF backends, table-miss warning and show commands",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html#virtual-routing-and-forwarding",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 BGP VRF route leaking: explicit configured mechanism outside worksheet",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html#vrf-route-leaking",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g6-t1",
    "batch": "10",
    "title": "VRF-Lite",
    "subtitle": "Share a physical trunk while keeping logical attachment and route ownership explicit.",
    "level": "Intermediate → Production",
    "minutes": 75,
    "interactive": "vrf-lite",
    "definition": "VRF-Lite uses separate routing contexts and Layer 3 interface ownership without requiring an MPLS transport for the local design. Logical attachments can carry distinct tenants over a shared physical link. In this tabletop, BLUE VLAN10 and RED VLAN20 travel on one declared trunk but terminate in separate logical Layer 3 attachments and routing tables. The terms blue-dot10 and red-dot20 are abstract worksheet labels; an actual supported router might use subinterfaces, while the cited Catalyst guide uses VLAN SVIs/routed interfaces. They are not interchangeable provisioning commands.",
    "purpose": "Use this lesson to connect Layer 2 attachment classification with Layer 3 context ownership. A cable, trunk or physical router can be shared while BLUE and RED still have separate route and gateway identities. Successful trunk carriage does not populate a VRF, select an installed route or supply the original return path. Conversely, separate routes can remain present while a shared trunk failure prevents either tenant's original ingress exchange. Verify both sides' VLAN intent and logical interface binding before interpreting the same overlapping destination address.",
    "mental": "Think of one cable carrying two separately labeled parcels. Label10 goes to BLUE's desk and label20 to RED's desk; each desk reads its own address book. The shared conveyor does not merge those books. If the parcel reaches the wrong desk, its numeric destination cannot infer the intended tenant. If the conveyor stops, the books can remain intact while deliveries fail. A shared-service entry is a deliberate exception in the receiving book and still needs a usable onward action and reply instructions.",
    "components": [
      "Fixed transport and attachments: one declared physical trunk carries BLUE VLAN10 and RED VLAN20. blue-dot10 expects BLUE and packetVlan10; red-dot20 expects RED and packetVlan20. The separate default-port is untagged, represented by fixture value0; zero is an untagged sentinel, not an IEEE VLAN identifier or the trunk's automatic native VLAN.",
      "Endpoint and gateway ownership: BLUE and RED can each use 10.10.0.0/24 and gateway 10.10.0.1 with distinct ownership. The attachment, incoming VLAN, actual VRF binding, intended endpoint and gateway context must agree for intended-exchange readiness.",
      "Table inventory: BLUE, RED and default have independent overlapping-prefix candidates and native target next-hop/source gates. BLUE's next hop is192.0.2.2, RED's192.0.2.6 and default's192.0.2.10. Shared physical transport does not share these routing decisions automatically.",
      "Explicit service exception: only BLUE service 203.0.113.0/24 can be declared introduced into RED. Source presence, permission, RED next-hop resolution and selected source remain distinct. It is not a BGP/VPN/MPLS leak implementation or a route-target authorization system.",
      "Target-specific mechanisms: a Cisco Catalyst IOS XE17.17 lab can use supported SVIs and Layer 3 VRF bindings; a router subinterface design needs its own platform support and interface mapping. Linux VRF devices/l3mdev rules and FRR namespace backends implement different operational scope. Commands identify their exact target and do not build either design.",
      "Rule/default context: declared no-fallback applies to this worksheet. Linux policy rules can continue beyond a missing VRF-table match without an appropriate terminal route. Default-port is an explicit third attachment, not where invalid VLANs or unknown VRF names are silently sent.",
      "Service dependencies: trunk carriage and routing are distinct from endpoint access controls, NAT, neighbor state, application identity and original return design. VRF-Lite does not encrypt the shared link or authenticate a tenant label."
    ],
    "mechanism": [
      "Map physical and logical ownership on both ends. Record the one shared trunk, BLUE VLAN10, RED VLAN20 and the actual supported Layer 3 attachments that terminate them. A switchport trunk is Layer 2 transport; the cited Catalyst VRF binding applies to a Layer 3 interface such as an SVI. A router's subinterface is a separate supported design, not inferred from the switch CLI.",
      "Verify the declared trunk and attachment are available. The trunkReady flag is a supplied selected-tenant carriage prerequisite, not a link protocol or STP/VLAN simulator. Disabling it leaves route inventory declarations visible but blocks the original tenant ingress calculation. The separately attached default-port is outside this shared tenant trunk.",
      "Compare incoming VLAN with the fixed logical attachment and intended endpoint. VLAN20 at blue-dot10 is a diagnostic disagreement. Real native-VLAN, access/trunk, allowed/active/STP and subinterface encapsulation behavior needs actual platform inspection; the model does not parse frames, remap VLANs or fall invalid input into default.",
      "Choose context from the declared Layer 3 binding before reading the destination. A known BLUE attachment bound to RED reports RED as the bound context and an ownership mismatch; matching10.10.0.42 cannot repair the intended endpoint. This tool's mismatch result is readiness analysis, not an automatically deployed packet filter.",
      "Query the fixed exact prefix in the agreed context. BLUE and RED overlapping routes have independent native next hops and selected sources. If BLUE's candidate disappears, RED/default rows are not borrowed in this declared policy. An actual Linux analogy requires reviewing higher-priority rules and terminal/default behavior rather than assuming identical Cisco and Linux lookup semantics.",
      "Introduce shared service only through the explicit chosen-prefix declaration. When BLUE service exists and leakPermit is true, RED may have a candidate but still requires RED target resolution and selected installation. The local design does not require MPLS; the cited Cisco guide also discusses an optional provider MPLS backbone, which is a separate transport architecture outside this tabletop.",
      "Keep labels and forwarding mechanisms separate. RD/RT may identify VPN routes or express import/export policy in an actual supported VPN control plane; their presence alone does not provide the intended Layer 2 attachment, target next hop, dataplane path or authorization. The worksheet has no RD, RT, BGP or MPLS label processing.",
      "Inspect original traffic policy and reply scope independently after route readiness. Shared cable or shared box failures can affect both tenants; a per-tenant route or return failure may affect one. Retain actual scoped neighbor/forwarding and original-service evidence in any separately authorized target exercise. No physical link, VLAN, route or namespace is changed by this page."
    ],
    "flow": [
      [
        "Map the shared transport",
        "Record trunk, each VLAN and the supported logical Layer 3 attachment."
      ],
      [
        "Agree on context ownership",
        "Check incoming VLAN, actual binding, intended endpoint and gateway."
      ],
      [
        "Select the per-context route",
        "Native/imported candidate, target next hop and source selection remain separate."
      ],
      [
        "Verify original service",
        "Inspect policy/NAT and both directions; shared infrastructure is not a merged RIB."
      ]
    ],
    "comparison": [
      [
        "Trunk / VRF",
        "Layer 2 carriage / Layer 3 routing context",
        "A trunk can carry two VLANs whose L3 interfaces use separate VRFs."
      ],
      [
        "SVI / router subinterface",
        "Switch VLAN Layer 3 attachment / tagged router attachment",
        "Use target-supported mapping; worksheet labels are not universal CLI objects."
      ],
      [
        "Shared cable / shared table",
        "Physical resource / route ownership",
        "One cable does not automatically combine BLUE and RED RIBs."
      ],
      [
        "VRF-Lite / provider MPLS VPN",
        "Local contexts without required MPLS / separate labeled transport architecture",
        "An optional provider backbone does not make MPLS a prerequisite of this tabletop."
      ],
      [
        "Packet VLAN / tenant authorization",
        "Carriage/classification label / access decision",
        "A VLAN identifier does not authenticate the sender."
      ],
      [
        "Untagged sentinel0 / native VLAN",
        "Worksheet default-port marker / configured trunk behavior",
        "Invalid tenant VLANs do not automatically become the default context."
      ],
      [
        "RD or RT / packet delivery",
        "VPN control identity/policy / realized dataplane and service",
        "No label alone supplies forwarding, permission or return routing."
      ]
    ],
    "example": "BLUE10.10.0.42 and RED10.10.0.42 traverse the same declared trunk under VLAN10 and 20. The first uses BLUE's candidate via192.0.2.2; the second RED's via192.0.2.6. Set packetVlan20 on blue-dot10: intended attachment agreement fails without changing route inventory. Set trunkReady false: original tenant ingress becomes unavailable although declared BLUE/RED routes remain present. Reset, select RED service with leakPermit true and leakResolved false: the import candidate exists but cannot be installed under its target resolution declaration. Finally turn returnReady off on a working BLUE state; the route remains declared installed while original exchange prerequisites fail. No frame, label or packet was sent.",
    "ports": "VRF-Lite introduces no new TCP/UDP service port and requires no MPLS transport in this fixed local design. VLAN tags classify Layer 2 carriage rather than an application port. Actual management and application sessions keep their own source, table, transport and security scope. The worksheet tests no listener, ARP exchange or routing session.",
    "commands": [
      {
        "code": "show interfaces GigabitEthernet1/0/2 trunk\nshow vrf definition interfaces",
        "platform": "Prepared Catalyst9600 IOS XE17.17.x switch lab · guided read-only, not executed",
        "explanation": "Correlate a reviewed example physical trunk with actual logical Layer 3 VRF ownership on the switch.",
        "expected": "GigabitEthernet1/0/2 is a replaceable owned example interface that must exist on the prepared target. Record allowed/active/forwarding VLAN context and actual SVI/routed-interface bindings. This is not router-subinterface syntax and does not configure a switchport or attach a VRF."
      },
      {
        "code": "show ip route vrf BLUE\nshow ip route vrf RED",
        "platform": "Prepared Catalyst9600 IOS XE17.17.x switch lab · guided read-only, not executed",
        "explanation": "Compare the independent exact-prefix/source/next-hop records in the two existing tenant VRFs.",
        "expected": "Record BLUE/RED ownership even when the numeric prefixes overlap. A missing route in one context is not evidence that the other table is a substitute. Routing output alone does not prove hardware programming or original service."
      },
      {
        "code": "show ip arp vrf BLUE\nshow ip arp vrf RED",
        "platform": "Prepared Catalyst9600 IOS XE17.17.x switch lab · guided read-only, not executed",
        "explanation": "Inspect actual IPv4 neighbor identity in each existing VRF independently of matching numeric gateway addresses.",
        "expected": "Record context, neighbor MAC/interface and state where supplied. ARP evidence differs from route recursion and does not establish the far-side reply/application path. No static ARP entry or probe is created."
      },
      {
        "code": "ip rule show\nip route show vrf BLUE\nip route show vrf RED\nip route get 10.10.0.42 vrf BLUE",
        "platform": "Separate prepared Linux kernel6.6 / iproute2 6.6.0 VRF-device analogy · guided read-only, not executed",
        "explanation": "Inspect the Linux rule/default and explicitly scoped lookup boundary when comparing implementations.",
        "expected": "These are Linux commands on a separately prepared observer, not commands for the Cisco switch. BLUE/RED must be actual VRF-device names in that namespace. Inspect applicable rule priorities and terminal/default actions; Linux can continue beyond a table miss. A route-get is diagnostic and sends no original-service probe."
      }
    ],
    "configuration": "No trunk, VLAN, SVI, subinterface or VRF is provisioned here. The optional Cisco observer must already have reviewed VLAN10/20 carriage and supported Layer 3 tenant attachments, exact BLUE/RED route ownership and independent management. The one-interface trunk command is an owned example requiring actual port mapping; Catalyst SVI/routed-interface VRF syntax does not establish support for a router subinterface design. A separate Linux comparison requires its own VRF devices, table IDs, rules and terminal/default routes; a FRR -n namespace backend is a different mapping. Any separately authorized change needs recorded VLAN/native/allowed and endpoint intent, actual addresses/routes/policy, exact prior bindings and rollback. No persistent host or switch change is a consequence of a checkbox.",
    "production": "Maintain an attachment contract across both ends: physical path, VLAN, tag/native assumptions, logical L3 interface, VRF, endpoint/gateway identity, route scope and original reply path. A shared trunk is a common failure and capacity domain even while RIBs are separate. Shared services and overlapping addressing need deliberate direction, identity/NAT and policy review; importing a route does not remove that ambiguity automatically. Keep local VRF-Lite operations separate from any optional provider MPLS/VPN control plane. Target platform support and release, rather than generic terminology, determine which interface and show/configuration forms are valid.",
    "troubleshooting": [
      [
        "Both tenants fail together",
        "Inspect shared trunk availability and actual allowed/active/forwarding VLANs before erasing per-VRF routes. Route inventory can remain intact while ingress carriage fails."
      ],
      [
        "One tenant fails",
        "Compare that VLAN's logical attachment and VRF binding, native route/next hop/source and original return scope. Shared physical link state alone cannot close the incident."
      ],
      [
        "Same IP reaches another tenant",
        "Trace ingress classification and Layer 3 binding. A numeric destination does not correct a VLAN or VRF misattachment."
      ],
      [
        "VLAN exists but VRF route absent",
        "Distinguish Layer 2 carriage from supported Layer 3 attachment/addressing and per-context route ownership. A trunk's VLAN list is not a VRF routing table."
      ],
      [
        "Service import unresolved",
        "Keep source existence, explicit candidate permission and RED target next-hop/source gates separate. RD/RT labels are not a packet-forwarding or authorization test."
      ],
      [
        "Linux comparison falls through",
        "Inspect actual RPDB priorities and terminal/default route behavior; no-fallback in this worksheet is declared, not a universal Linux guarantee."
      ],
      [
        "Installed route but failed application",
        "Inspect scoped neighbor/FIB, policy/NAT, endpoint and original return/service evidence; readiness declarations are not traffic measurements."
      ]
    ],
    "security": "VRF-Lite and VLAN separation are routing/attachment controls, not cryptographic protection. A wrong port, native/tag interpretation, logical binding, route exception or service policy can violate intent. Review authorization and explicit access controls for the actual tenant relationship. The model blocks its intended-exchange calculation on mismatch but installs no ACL and makes no claim that a real misbound packet would be dropped.",
    "performance": "BLUE and RED share the trunk's physical capacity and failure domain. Separate routing tables can share hardware forwarding resources, processing, buffers and neighbor capacity. The cited Catalyst guide describes shared forwarding resources; support and limits depend on release/hardware. This six-row inventory performs no throughput, QoS, scale, hardware-offload, label or convergence test, and cannot infer a production capacity target from boolean agreement.",
    "mistakes": [
      "Treating one physical cable as one routing table.",
      "Assuming VLAN membership automatically assigns the correct Layer 3 VRF.",
      "Copying switch SVI commands into a router subinterface design.",
      "Using matching tenant gateway IPs as proof of shared identity.",
      "Treating untagged sentinel0 as a real VLAN or automatic native fallback.",
      "Assuming MPLS is required for local VRF-Lite.",
      "Calling route targets, route distinguishers or VLAN labels authentication.",
      "Reporting all-green declarations as a packet or FIB measurement."
    ],
    "prerequisites": [
      "s3-g6-t0",
      "s1-g3-t1",
      "s3-g0-t0"
    ],
    "related": [
      "s3-g5-t1"
    ],
    "artifacts": [],
    "lab": {
      "objective": "Connect declared trunk/VLAN attachment ownership to one routing context, while separating route and original-service dependencies.",
      "requirements": "Browser tabletop requires no device. Optional read-only Cisco observer requires supported Catalyst9600 IOS XE17.17.x and actual owned trunk/VRF mapping; optional Linux analogy is a separately prepared6.6 VRF-device observer. No setup or live provision is supplied.",
      "topologyKind": "shared",
      "topology": [
        "One shared physical trunk: BLUE VLAN10 | RED VLAN20",
        "BLUE logical attachment / independent 10.10.0.0/24 and gateway 10.10.0.1",
        "RED logical attachment / independent 10.10.0.0/24 and gateway 10.10.0.1",
        "Separate default-port; explicit BLUE service 203.0.113.0/24 candidate may be permitted into RED"
      ],
      "steps": [
        "Compare overlap-blue and overlap-red. Draw the common cable and separate logical L3 attachments/tables, recording each owned gateway and next hop.",
        "Select vlan-mismatch, wrong-binding and wrong-attachment. Explain the declared bound context and why the intended exchange is blocked diagnostically rather than repaired by the address.",
        "Select trunk-absent and attachment-absent. Confirm route inventory remains separate while original tenant ingress prerequisites fail.",
        "Compare missing-route and default-separate. State the no-borrow fixture policy and separately explain actual Linux rule/default caveats.",
        "Compare leak-denied, leak-permitted, leak-unresolved, leak-source-absent and leak-displaced. Identify the exact candidate/resolution/source gate at each stage.",
        "Select source-displaced, return-missing and policy-missing; keep route readiness distinct from original service.",
        "Use keyboard reset and the named local scroll region. Confirm invalid scenario or unknown context hides the outcome through subsequent control changes.",
        "Optionally collect only the scoped read-only Cisco groups and separate Linux analogy in their prepared targets. Retain actual port/VRF/version mapping and uncertain facts; no tabletop result is a measured frame or packet test."
      ],
      "verification": "Write trunk/VLAN availability and classification, actual attachment binding, intended endpoint/gateway agreement, selected table and native/imported route prerequisites. Then state original policy/forward/return requirements independently. Model tests verify declarations; browser layout, real CLI parser, frame carriage, forwarding and service need separately reported observation.",
      "troubleshooting": "Locate the first disagreement in transport, classification or routing ownership before route candidate and service checks. A worksheet diagnostic is not deployed security enforcement and is not proof of a target's drop behavior.",
      "challenge": "Why can the shared trunk fail both tenants while both VRF route tables stay populated? Then explain why a permitted RED shared-service candidate with unresolved target next hop cannot be rescued merely by BLUE having the same numeric next hop resolved.",
      "cleanup": "Reset changes only local inputs. Read-only observer commands create no VLANs, routes, rules or namespaces. Close optional sessions per lab ownership. A separately authorized configuration experiment must restore exact physical/logical bindings and prior route/policy/service context using its own reviewed rollback."
    },
    "glossary": {
      "VRF-Lite": "Local separate routing contexts without a required MPLS transport in this design.",
      "Trunk": "Shared Layer 2 link carrying multiple declared VLANs.",
      "Logical L3 attachment": "Supported SVI/routed interface or platform-specific subinterface that supplies a routing-context binding.",
      "VLAN mismatch": "Disagreement between declared incoming tag, fixed attachment and intended endpoint.",
      "SVI": "A switch virtual Layer 3 interface associated with a VLAN on a supported switch.",
      "Subinterface": "A supported logical router interface; its encapsulation and VRF binding are platform-specific.",
      "Shared failure domain": "A physical dependency that can affect several otherwise separate contexts.",
      "Untagged sentinel": "Fixture value0 for separate default-port, not an on-wire VLAN number or native-VLAN simulator."
    },
    "exams": [
      {
        "testedConcept": "Physical versus logical",
        "question": "BLUE VLAN10 and RED VLAN20 share one physical trunk. What happens to their routing tables in this design?",
        "answer": "They remain separate through their Layer 3 attachment bindings.",
        "explanation": "Physical sharing does not automatically merge route ownership.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "They remain separate through their Layer 3 attachment bindings.",
          "They merge because the cable and physical router are shared.",
          "The router compares BLUE and RED matching routes in one combined best-route contest.",
          "The overlapping prefix is rejected because all VRFs must use unique addresses."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q01"
      },
      {
        "testedConcept": "VLAN mismatch",
        "question": "packetVlan20 is declared at blue-dot10 for a BLUE endpoint. What does this worksheet report?",
        "answer": "A VLAN/attachment disagreement without applying the intended-exchange lookup.",
        "explanation": "The diagnostic does not infer intended tenant from the destination.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The destination automatically corrects VLAN20 to the intended BLUE VLAN10.",
          "A VLAN/attachment disagreement without applying the intended-exchange lookup.",
          "The mismatched tag is treated as untagged and sent into default.",
          "The destination address alone selects BLUE regardless of the attachment and tag."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q02"
      },
      {
        "testedConcept": "Shared transport fault",
        "question": "trunkReady is false while BLUE/RED route declarations remain present. Which conclusion is supported?",
        "answer": "Tenant ingress prerequisites fail while route inventory may remain populated.",
        "explanation": "Shared carriage and per-context route inventory are different layers.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Both routing tables necessarily disappear when the trunk becomes unavailable.",
          "The intended endpoint can use the other tenant VLAN as an automatic ingress backup.",
          "Tenant ingress prerequisites fail while route inventory may remain populated.",
          "Separate VRFs protect each tenant from failure of the shared physical trunk."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q03"
      },
      {
        "testedConcept": "Local MPLS requirement",
        "question": "Does this fixed local VRF-Lite design require an MPLS transport?",
        "answer": "No; separate local contexts and attachments are sufficient for its scope.",
        "explanation": "An optional provider MPLS backbone is a different architecture.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes; every local VRF packet must carry an MPLS label.",
          "Yes; local routing contexts require provider MP-BGP peering before any route lookup.",
          "Yes; an RD must be serialized in each local packet to distinguish BLUE from RED.",
          "No; separate local contexts and attachments are sufficient for its scope."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q04"
      },
      {
        "testedConcept": "Platform attachment form",
        "question": "Can a Catalyst SVI example prove that the same provisioning syntax supports a router subinterface?",
        "answer": "No; use each target's supported attachment and syntax.",
        "explanation": "The worksheet labels are abstract and commands specify their target.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; use each target's supported attachment and syntax.",
          "Yes; all Layer 3 logical interfaces share the same provisioning syntax.",
          "Yes; an SVI VLAN binding supplies identical encapsulation commands on a router subinterface.",
          "Yes; the VRF name determines attachment syntax independently of platform and interface type."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q05"
      },
      {
        "testedConcept": "Explicit import usability",
        "question": "RED has a permitted BLUE service candidate, but leakResolved is false. What can the model establish?",
        "answer": "Candidate presence without target-resolved installation.",
        "explanation": "A source next hop resolved in BLUE does not satisfy the separate target RED declaration.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "BLUE resolution of the same numeric next hop automatically satisfies RED resolution.",
          "Candidate presence without target-resolved installation.",
          "The imported prefix is installed because candidate presence means selected source.",
          "RED receives an automatic reverse route as soon as BLUE service import is permitted."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q06"
      },
      {
        "testedConcept": "RD/RT limit",
        "question": "Do an RD or RT value alone provide packet delivery or tenant authorization?",
        "answer": "No; actual attachment, control/data-plane and policy requirements remain.",
        "explanation": "Control identity or import policy labels are not an entire forwarding/security system.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The RD creates the required dataplane path even when attachment binding is missing.",
          "An RT value authenticates the tenant independently of access policy.",
          "No; actual attachment, control/data-plane and policy requirements remain.",
          "Matching RT values guarantee a usable next hop and original return path."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q07"
      },
      {
        "testedConcept": "Untagged sentinel",
        "question": "What does packetVlan0 mean in this fixture?",
        "answer": "Untagged separate default-port, not an IEEE VLAN ID or automatic trunk fallback.",
        "explanation": "The worksheet deliberately excludes native-VLAN processing.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "A real VLAN assigned to every untagged frame by this worksheet.",
          "The shared trunk native VLAN, inferred without reading target configuration.",
          "Permission to put unknown tenant VLANs into the default routing context.",
          "Untagged separate default-port, not an IEEE VLAN ID or automatic trunk fallback."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q08"
      },
      {
        "testedConcept": "Implementation comparison",
        "question": "How should the separate Linux analogy's table-miss behavior be assessed?",
        "answer": "Inspect actual rule priorities and terminal/default routes rather than assume the fixture's no-fallback policy.",
        "explanation": "Linux RPDB behavior is target-specific and outside the declared algorithm.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Inspect actual rule priorities and terminal/default routes rather than assume the fixture's no-fallback policy.",
          "Assume a named Linux VRF can never continue to a later routing-policy rule.",
          "Treat the Cisco table behavior and FRR Linux backend as identical implementations.",
          "Use a local route-get result as proof of the original forwarded exchange."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q09"
      },
      {
        "testedConcept": "Independent return",
        "question": "BLUE route prerequisites agree but returnReady is false. What changes?",
        "answer": "Original exchange prerequisites fail while the declared route installation remains.",
        "explanation": "The reply declaration does not remove the forward candidate.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "RED becomes the route source when the BLUE reply path is absent.",
          "Original exchange prerequisites fail while the declared route installation remains.",
          "A selected forward route guarantees a working original reply path.",
          "The shared trunk automatically supplies the reply route because forward readiness is true."
        ],
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Separate ownership",
        "question": "Does sharing a trunk combine BLUE and RED route tables?",
        "answer": "No.",
        "explanation": "Logical Layer 3 bindings preserve distinct context ownership.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-QC1"
      },
      {
        "testedConcept": "Attachment agreement",
        "question": "Which declarations establish intended tenant ingress readiness?",
        "answer": "Available trunk/attachment and agreement among VLAN, logical attachment, actual VRF binding, intended endpoint and gateway owner.",
        "explanation": "The destination IP does not repair a mismatch.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-QC2"
      },
      {
        "testedConcept": "Evidence limit",
        "question": "All VRF-Lite declarations agree. What actual frame or service observation did the tool make?",
        "answer": "None.",
        "explanation": "The tabletop evaluates supplied prerequisites only.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "s3-g6-t1",
        "questionId": "s3-g6-t1-QC3"
      }
    ],
    "sources": [
      {
        "title": "Cisco Catalyst9600 IOS XE17.17.x VRF-Lite: ingress context, overlapping routes and read-only VRF/ARP views",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/rtng/b_1717_rtng_9600_cg/configuring_vrf_lite.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Catalyst9600 IOS XE17.17.x VLAN trunk inspection and native/tag context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/vlan/b_1717_vlan_9600_cg/configuring_vlan_trunks.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux kernel6.6 VRF device and explicitly scoped inspection",
        "url": "https://www.kernel.org/doc/html/v6.6/networking/vrf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 6.6.0 ip-rule manual: read-only show",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/ip-rule.8",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 Zebra backend and rule/default caveats",
        "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html#virtual-routing-and-forwarding",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable8.4 BGP explicit VRF route leaking, outside model",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html#vrf-route-leaking",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "configuration": "Browser declarations require no router configuration. Optional inspection requires two exclusively owned, already prepared routers on a mapped isolated broadcast LAN, known VIP/group/version, working management and documented upstream/return intent. No interface shutdown, role priority change, peer reset, ARP clear, save or persistent service is supplied. Record exact prior configuration before any separately authorized target experiment.",
    "performance": "This tabletop uses settled declarations and boolean path prerequisites. It measures no timer interval, failure detection, convergence, lost packets, capacity or latency. A virtual gateway role is not a throughput promise; upstream route and system forwarding readiness can differ from control participation. Shorter protocol timers need actual platform and failure-scenario testing.",
    "security": "Protect the shared LAN and control-plane participation against unauthorized gateway advertisements and address conflicts. Verify applicable authentication and control-plane safeguards on the exact supported release; this worksheet does not configure or test them. Preserve sensitive configuration privately and keep independent management. A valid role or ARP entry does not authenticate upstream route ownership or prove endpoint service. Scoped IOS XE documentation distinguishes text and MD5 authentication; text is not encrypted, and authentication is not encryption of routed application traffic. Actual target support and safe key handling require separate review.",
    "id": "s3-g7-t0",
    "title": "HSRP",
    "subtitle": "Keep the virtual gateway identity separate from active history, tracking and upstream readiness.",
    "interactive": "hsrp",
    "definition": "Hot Standby Router Protocol is Cisco first-hop redundancy for hosts using a virtual default gateway on a shared LAN. One active router serves the group while a standby can assume that responsibility. The host retains its virtual gateway address rather than selecting a new physical router address. This original topic scopes IPv4 HSRP version 2 group 10 and a supplied settled checkpoint; it is not a timer-driven simulator or an upstream routing protocol.",
    "purpose": "Use HSRP to reduce dependence on one first-hop router while preserving a stable host gateway identity. Explain which router owns the role now and why, then verify its actual route and return path separately. LAN control participation can survive an upstream outage, so role redundancy alone cannot establish end-to-end recovery. Separate groups can support planned traffic sharing, but one group in this worksheet has one active owner.",
    "mental": "A host writes one virtual gateway address on its envelope. A and B coordinate who handles that gateway, but the current owner has history: a stronger returning router does not automatically take over when preemption is disabled. Upstream and return readiness are separate checklists. The browser reads those declarations; it sends no hello, ARP or data packet.",
    "components": [
      "Virtual identity: VIP 192.0.2.1 on one broadcast LAN, A real IPv4 192.0.2.2 and B 192.0.2.3. Group 10 in version 2 maps to virtual MAC 0000.0c9f.f00a. The VIP is the host default gateway; router management uses independently mapped real addresses.",
      "Active and standby: the active handles the virtual gateway; the available alternate is the backup in this two-router scope. Both routers need consistent group, VIP, version, LAN and supported intent. A failed LAN/control declaration is separate from a router with a working LAN but failed uplink.",
      "Priority and history: default priority is 100. Initial selection favors higher priority, with higher real interface IPv4 breaking the supplied equal-priority tie. A currently available active is retained unless an available higher-priority challenger is configured to preempt. Equal priority does not displace the existing active.",
      "Preemption and failure: HSRP preemption is disabled by default in the scoped IOS XE guidance. Recovery of a higher-priority router and takeover after active failure are different cases. After a declared failure/hold-expiry checkpoint, an available backup can become active without preemption; this model does not run timers.",
      "Tracking: only configured tracking decrements priority for a declared down object. This model computes max(0, supplied priority minus configured decrement); inputs are checkpoint values from 0 to 255, while scoped IOS XE configuration guidance uses 1 to 255. An uplink failure alone does not imply tracking is configured, and a lower priority still needs challenger preemption for a live-owner displacement.",
      "Version scope: v1 uses 224.0.0.2, groups 0–255 and virtual MAC 0000.0c07.acXX; v2 uses 224.0.0.102, groups 0–4095 and 0000.0c9f.fXXX. Both IPv4 versions use UDP 1985. They do not interoperate in the same group; changing versions changes identity and reinitializes groups. Only v2 group 10 is modeled."
    ],
    "mechanism": [
      "Record the host subnet/default gateway, both physical router addresses and group/version before interpreting state. The fixed LAN is assumed coherent; VLAN partitions, mismatched authentication and dual-active history are excluded rather than silently resolved.",
      "Read current active history and participant availability. With no previous active, choose the highest available supplied priority; equal defaults elect B because .3 exceeds .2. This is one settled selection contract, not a startup FSM trace.",
      "Apply configured tracking only. A supplied priority 110 and configured down-object decrement 20 yield 90. No tracking declaration leaves 110 even when the upstream-path checkbox is false.",
      "For an available existing active, require the higher-priority challenger’s preemption setting to change ownership. A higher-priority A returning while B serves can stay backup. Enabling A preemption changes the settled choice; no minimum/reload/synchronization delay is calculated.",
      "For an unavailable existing active, distinguish pending detection from a declared completed failure/expiry. Pending retains the previous unavailable role and forwarding is false; a completed declaration permits the available backup to take over. Reject expiry paired with an available active or no previous active.",
      "Check selected active availability, system forwarding and upstream path together, then add original return readiness. Report only whether these declarations agree. Actual ARP/switch learning and the original endpoint transaction remain separately observed evidence."
    ],
    "flow": [
      [
        "Map the virtual gateway",
        "Record LAN, host default, real addresses, group and version."
      ],
      [
        "Review active history",
        "Compare available priorities, configured tracking and preemption."
      ],
      [
        "Check the selected path",
        "Separate active role from system forwarding and upstream readiness."
      ],
      [
        "Verify the original exchange",
        "Inspect actual host ARP, both directions and exact recovery."
      ]
    ],
    "comparison": [
      [
        "VIP / real router IP",
        "Stable host gateway / physical identity",
        "Do not make the host track whichever router currently wins."
      ],
      [
        "Priority / preemption",
        "Preference / permission to displace a live active",
        "Higher returning priority alone need not change ownership."
      ],
      [
        "Failure takeover / preemption",
        "Unavailable active / live active replacement",
        "Declared expiry takeover can occur without preempt."
      ],
      [
        "Tracking / uplink failure",
        "Configured priority dependency / path observation",
        "A failed path does not automatically change priority."
      ],
      [
        "v1 / v2",
        "Different group/address/format scope",
        "They do not interoperate within the same group."
      ]
    ],
    "example": "Start with A active at 110 and B at 100. Select A uplink failed without tracking: A remains active but original exchange prerequisites fail. Select configured tracking and B preemption: A’s effective priority becomes 90 and B takes the settled active role. Remove only B preemption and A remains active despite priority 90. Compare that live-owner displacement with A unavailable after declared expiry, where B can take over without preemption. The browser computes declarations, not a measured outage.",
    "ports": "Scoped IPv4 HSRP v2 hellos use UDP port 1985 and destination 224.0.0.102; v1 uses the same UDP port with 224.0.0.2. Routed endpoint traffic is separate. No socket or control packet is emitted here.",
    "commands": [
      {
        "code": "show standby brief",
        "explanation": "Read both observers’ current group roles and virtual gateway summary.",
        "expected": "GUIDED, NOT EXECUTED: Record interface, group, version context, priority and active/standby identities from actual output; a row is not service evidence.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show standby\nshow track",
        "explanation": "Inspect detailed HSRP/preemption/tracking context.",
        "expected": "GUIDED, NOT EXECUTED: Compare configured and effective priority, track-object state and supported delays; preserve actual output instead of assuming tracking exists.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip arp",
        "explanation": "Inspect ARP context at the actual observer.",
        "expected": "GUIDED, NOT EXECUTED: Correlate virtual versus real identities and separately inspect the original host cache. Router ARP alone does not prove host learning or packet delivery.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip route\nshow running-config",
        "explanation": "Read upstream route and original intent privately.",
        "expected": "GUIDED, NOT EXECUTED: Scope table/VRF and intended destination/return routes. Configuration can be sensitive; neither record certifies hardware forwarding or service.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      }
    ],
    "production": "Choose and document a supported HSRP version/group, VIP ownership, active preference, recovery/preemption delay and meaningful tracked dependencies. Check that both gateways have independent usable upstream and return paths, matching LAN/security intent and operational monitoring. Review failure, recovery, maintenance and VLAN-partition scenarios on owned equipment before rollout. The worksheet excludes dual-active protection and stateful NAT/firewall/session synchronization.",
    "troubleshooting": [
      [
        "Higher-priority return stays backup",
        "Check current history and the returning router’s preemption setting."
      ],
      [
        "Active remains after upstream failure",
        "Check whether appropriate tracking is actually configured and whether the alternate can preempt."
      ],
      [
        "Active dead but backup not selected in worksheet",
        "Distinguish pending detection from declared completed expiry."
      ],
      [
        "Both actual routers claim active",
        "Inspect LAN connectivity, group/version/VIP/authentication and both observers; the model excludes partition history."
      ],
      [
        "Virtual gateway reachable, service fails",
        "Continue to routes, system forwarding, policy and return path."
      ]
    ],
    "mistakes": [
      "Calling the VIP a physical interface address of both routers.",
      "Assuming highest priority always displaces a working active.",
      "Enabling tracking in the explanation when it is absent in the configuration.",
      "Requiring preemption for failure takeover.",
      "Copying HSRP v1 MAC/group rules into HSRP v2.",
      "Calling a supplied checkpoint measured convergence."
    ],
    "prerequisites": [
      "s2-g2-t0",
      "s1-g4-t2",
      "s1-g1-t1"
    ],
    "related": [
      "s3-g7-t1",
      "s3-g7-t2",
      "s3-g0-t0"
    ],
    "lab": {
      "objective": "Explain active history, preemption, tracking and independent path prerequisites in one fixed HSRP v2 group.",
      "requirements": "Browser only for the supplied worksheet. Optional guided inspection needs separately prepared isolated supported routers and a mapped host/peer/table context. No Cisco runtime, packets or live failover is executed by this topic.",
      "topologyKind": "shared",
      "topology": [
        "Host → VIP 192.0.2.1 on one LAN",
        "A .2 ↔ B .3, v2 group 10",
        "Active virtual MAC → system/upstream declaration",
        "Original destination → separate return declaration"
      ],
      "steps": [
        "Compare current A with initial equal default priorities.",
        "Compare A return with preemption disabled and enabled.",
        "Compare pending active failure with completed expiry.",
        "Compare upstream failure with no tracking, configured decrement without preemption, and decrement plus B preemption.",
        "Remove only return and only system readiness while retaining the active role.",
        "Test invalid range/history inputs, keyboard-scroll the named table and Reset."
      ],
      "verification": "Independent model tests exercise supplied scenarios, role/preemption/availability cases, invalid types/ranges/context, mounted output hiding and Reset. Structural checks cover a named keyboard-focusable scroll region. These contract checks are separate from primary real-browser acceptance and prove no device execution or packet delivery.",
      "troubleshooting": "Separate control role, LAN availability, system forwarding, upstream route and original return declarations. For actual investigation preserve both observers and original host context; do not diagnose every missing exchange by changing the election priority.",
      "challenge": "Why can B take over after declared active failure without preempt yet remain backup when a live A’s configured tracking lowers its priority?",
      "cleanup": "Reset restores the initial supplied scenario without device or learner-progress mutation. This worksheet owns no routers, namespaces, daemons or ARP changes. Any separately authorized target experiment must reconcile its own exact baseline and exclusive resources."
    },
    "glossary": {
      "Hot Standby Router Protocol (HSRP)": "Cisco first-hop redundancy coordinating a virtual gateway.",
      "Virtual IP address (VIP)": "Host-facing virtual default gateway IPv4 identity.",
      "Active router": "Router currently serving the scoped virtual gateway.",
      "Standby router": "Available primary backup in this two-router group.",
      "Preemption": "Configured permission for higher-priority replacement of an available active.",
      "Configured tracking": "Explicit dependency that can decrement gateway priority.",
      "Completed failure/expiry declaration": "Supplied completed failure-detection checkpoint, not an elapsed simulation.",
      "Virtual MAC address": "Group/version identity used for the virtual gateway at Layer 2."
    },
    "exams": [
      {
        "testedConcept": "Host gateway",
        "question": "What default gateway does the fixed host use while A and B change roles?",
        "answer": "192.0.2.1, the virtual gateway.",
        "explanation": "HSRP preserves a virtual host gateway identity.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "192.0.2.1, the virtual gateway.",
          "192.0.2.2, A’s real interface address.",
          "192.0.2.3, B’s real interface address.",
          "224.0.0.102, the hello multicast destination."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q01"
      },
      {
        "testedConcept": "Initial tie",
        "question": "No previous active exists; A and B are available at priority 100. Which router wins this fixed initial selection?",
        "answer": "B because its real IPv4 .3 is higher than A .2.",
        "explanation": "The supplied equal-priority initial tie uses real interface IPv4.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A because the lower real interface IPv4 wins a tie.",
          "B because its real IPv4 .3 is higher than A .2.",
          "A because the virtual gateway address is lower than both real addresses.",
          "Neither until preemption is enabled for the initial election."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q02"
      },
      {
        "testedConcept": "Recovery history",
        "question": "B is serving; higher-priority A returns with A preemption disabled. What does this settled worksheet select?",
        "answer": "B retains the available active role.",
        "explanation": "Highest returning priority does not override disabled preemption.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A takes over solely because 110 exceeds 100.",
          "B retains the role only if B’s own preemption is enabled.",
          "B retains the available active role.",
          "A and B share the active role for this one group."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q03"
      },
      {
        "testedConcept": "Failure takeover",
        "question": "A is unavailable and completed failure/expiry is declared. Can available B take over without preemption?",
        "answer": "Yes, failure takeover differs from displacing a live active.",
        "explanation": "Failure takeover is a different case from recovery preemption.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; B needs preemption even after active failure.",
          "No; failure takeover requires B to have higher priority than A had.",
          "Yes, but B must replace the virtual IP with its own real address.",
          "Yes, failure takeover differs from displacing a live active."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q04"
      },
      {
        "testedConcept": "Configured tracking",
        "question": "A priority 110 has configured down-object decrement 20; B is 100 with preempt enabled. What is the scoped result?",
        "answer": "A becomes 90 and B can take over.",
        "explanation": "Only configured tracking changes A’s effective priority.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A becomes 90 and B can take over.",
          "A stays 110 because tracking changes only the hello timer.",
          "A becomes 90 but remains active even though B can preempt at 100.",
          "B becomes 80 because the tracked failure lowers both routers’ priorities."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q05"
      },
      {
        "testedConcept": "No tracking",
        "question": "A’s uplink declaration fails but tracking is absent. What can remain true?",
        "answer": "A can remain active at its supplied priority while path readiness fails.",
        "explanation": "Control availability and upstream dependency are separate.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "B becomes active because any uplink failure implicitly configures tracking.",
          "A can remain active at its supplied priority while path readiness fails.",
          "A’s priority automatically drops by the default decrement despite absent tracking.",
          "B must have a higher group number to take over."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q06"
      },
      {
        "testedConcept": "Version 2 identity",
        "question": "What is the fixed HSRP v2 group 10 virtual MAC?",
        "answer": "0000.0c9f.f00a.",
        "explanation": "The v2 group number is represented in its three-hex-digit suffix.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0000.5e00.010a.",
          "0000.0c07.ac0a.",
          "0000.0c9f.f00a.",
          "0000.0c9f.f010."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q07"
      },
      {
        "testedConcept": "Protocol transport",
        "question": "Which control destination is scoped for IPv4 HSRP v2?",
        "answer": "UDP 1985 to 224.0.0.102.",
        "explanation": "HSRP and GLBP share a multicast destination but use different UDP ports.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "UDP 1985 to 224.0.0.2.",
          "IP protocol 112 to 224.0.0.18.",
          "UDP 3222 to 224.0.0.102.",
          "UDP 1985 to 224.0.0.102."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q08"
      },
      {
        "testedConcept": "History consistency",
        "question": "Which declaration pair does the worksheet reject?",
        "answer": "Completed expiry while the previous active is still declared available.",
        "explanation": "Expiry is scoped to a previous active now unavailable.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Completed expiry while the previous active is still declared available.",
          "Previous active A unavailable and expiry complete.",
          "No previous active and both routers unavailable with no expiry declaration.",
          "Current B available with higher-priority A preemption disabled."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q09"
      },
      {
        "testedConcept": "Proof limit",
        "question": "A is active and upstream/system declarations are ready, but returnReady is false. What follows?",
        "answer": "Original exchange prerequisites do not agree.",
        "explanation": "The return path remains an independent original-transaction requirement.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The active role must automatically move to the standby.",
          "Original exchange prerequisites do not agree.",
          "HSRP priority must be decremented because the return checkbox is false.",
          "Changing the virtual MAC is required before checking the return path."
        ],
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Default priority",
        "question": "What is the scoped default HSRP priority?",
        "answer": "100.",
        "explanation": "Initial preference is separate from existing-role history.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-QC1"
      },
      {
        "testedConcept": "Equal recovery",
        "question": "Does equal priority displace an available active in this model?",
        "answer": "No.",
        "explanation": "Initial ties and live-owner replacement are distinct.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-QC2"
      },
      {
        "testedConcept": "Execution scope",
        "question": "Does selecting completed expiry measure the hold interval?",
        "answer": "No; it is a supplied checkpoint.",
        "explanation": "The worksheet has no timers or packets.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "s3-g7-t0",
        "questionId": "s3-g7-t0-QC3"
      }
    ],
    "sources": [
      {
        "title": "Cisco IOS XE17: HSRP roles, preemption, tracking and inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17: HSRP v2 identities and interoperability",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-v2.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco HSRP FAQ: equal-priority initial selection and tracking",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/9281-3.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco HSRP troubleshooting: both IPv4 versions use UDP 1985",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/10583-62.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17: ARP read-only inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_arp-config-arp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS protocol-independent command reference: show ip route syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "configuration": "Browser declarations require no router configuration. Optional inspection requires two exclusively owned, already prepared routers on a mapped isolated broadcast LAN, known VIP/group/version, working management and documented upstream/return intent. No interface shutdown, role priority change, peer reset, ARP clear, save or persistent service is supplied. Record exact prior configuration before any separately authorized target experiment.",
    "performance": "This tabletop uses settled declarations and boolean path prerequisites. It measures no timer interval, failure detection, convergence, lost packets, capacity or latency. A virtual gateway role is not a throughput promise; upstream route and system forwarding readiness can differ from control participation. Shorter protocol timers need actual platform and failure-scenario testing.",
    "security": "Protect the shared LAN and control-plane participation against unauthorized gateway advertisements and address conflicts. Verify applicable authentication and control-plane safeguards on the exact supported release; this worksheet does not configure or test them. Preserve sensitive configuration privately and keep independent management. A valid role or ARP entry does not authenticate upstream route ownership or prove endpoint service. RFC 9568 does not define an authentication mechanism for VRRP packets. TTL 255 checking helps bound packet origin to the link; it does not authenticate a participating host or protect against every on-link attack. This worksheet validates no packets.",
    "id": "s3-g7-t1",
    "title": "VRRP",
    "subtitle": "Apply current VRRP v3 owner and preemption rules before judging the usable gateway path.",
    "interactive": "vrrp",
    "definition": "Virtual Router Redundancy Protocol elects one router to take forwarding responsibility for a virtual router on a multiaccess LAN. RFC 9568 is the current VRRP v3 specification for IPv4 and IPv6 and obsoletes RFC 5798. This lesson scopes IPv4 VRID 10 and uses current Active/Backup terminology; some Cisco displays still say MASTER. It models one supplied selection checkpoint, not protocol packet validation or a timed state machine.",
    "purpose": "Use a standard virtual gateway protocol when supported routers must share first-hop responsibility. Understand ordinary preemption, the special IPv4 address owner and physical versus virtual identity before comparing implementations. VRRP does not install upstream routes or synchronize application state. A winning role still needs system forwarding, an upstream path and the original return path.",
    "mental": "Two routers share responsibility for one virtual gateway address. A router that actually owns that address has a reserved precedence; an ordinary backup has a configurable preference and default-enabled preemption. Keep the owner’s actual primary address distinct from an ordinary router borrowing forwarding responsibility. The role card and original-service card require separate evidence.",
    "components": [
      "Fixed identities: VIP 192.0.2.1 and VRID 10 on one broadcast LAN. Normally A primary is .2 and B .3. If A is explicitly declared address owner, its primary becomes .1 and its priority must be 255. B is never owner in this bounded model; there is no double-owner input.",
      "Priority: nonowner values are 1–254, default 100. Priority 255 is reserved for the IPvX address owner. Zero is a special relinquishing advertisement, not an ordinary configured backup priority; this worksheet rejects zero rather than simulating a shutdown packet.",
      "Active and Backup: current RFC terminology separates the serving router from available alternates. Ordinary starting/restarting higher-priority backup preemption is enabled by default; disabling it can retain a lower-priority available active. The address owner takes precedence regardless of the ordinary preemption flag.",
      "Tie/history: an initial supplied equal-priority choice selects the higher real IPv4, B .3. Equal priority does not force an ordinary returning backup to displace a currently available active in this contract. Full competing-active packet history and partition recovery are excluded.",
      "Wire identity: IPv4 VRRP v3 uses IP protocol number 112, multicast 224.0.0.18 and TTL 255. VRID 10 maps to MAC 0000.5e00.010a. VRRP is not UDP HSRP/GLBP or BGP TCP 179. Packet type, checksum, version and TTL validation are source-described and unmodeled.",
      "Scope of address use: the owner’s VIP is a real address on that router; a nonowner active can forward transit frames to the virtual MAC. Acceptance of traffic addressed to the VIP itself involves owner/Accept_Mode rules. A ping of the VIP is therefore not a universal transit-service test."
    ],
    "mechanism": [
      "Record version, family, VRID, protected address, primary addresses and the actual owner declaration. Match the current standard to the implementation’s supported behavior; older Cisco guide text and MASTER output are not evidence of RFC 9568 feature compliance.",
      "Validate strict ownership: A owner requires priority 255 and primary .1; ordinary A/B need 1–254. The model derives A’s primary from that owner declaration, so an inconsistent owner/priority pair cannot silently become valid.",
      "With no previous active, select the highest available priority, using higher real IPv4 for a supplied initial tie. An available owner wins. These settled rules do not calculate advertisement or Active_Down intervals.",
      "With an available ordinary active, a higher-priority available challenger needs its own preemption enabled. Owner A takes precedence on return even if its ordinary preemption checkbox is false. Equal-priority recovery retains the existing ordinary active in the scoped contract.",
      "With the previous active unavailable, keep a pending-declaration view until failure/expiry is explicitly complete; then the available backup may take over regardless of ordinary preemption. No priority-zero packet, shutdown or skew-time acceleration is executed.",
      "Inspect active availability and independent system/upstream readiness, then original return. The worksheet reports supplied prerequisite agreement. Actual virtual-MAC learning, packet validation and the endpoint exchange require their own observation."
    ],
    "flow": [
      [
        "Map VRID and ownership",
        "Record protected address, primary IPs, version and owner."
      ],
      [
        "Review settled selection",
        "Apply owner precedence, available priorities and ordinary preemption."
      ],
      [
        "Check forwarding dependencies",
        "Separate active role from system and upstream state."
      ],
      [
        "Verify actual service",
        "Inspect host/virtual-MAC context and the original return exchange."
      ]
    ],
    "comparison": [
      [
        "Owner / nonowner",
        "Real protected address / backup forwarding responsibility",
        "Only the owner uses reserved priority 255."
      ],
      [
        "VRRP / HSRP default preempt",
        "Enabled / disabled in scoped guidance",
        "Recovery behavior must not be copied between them."
      ],
      [
        "Initial tie / existing role",
        "Higher real IP / retained available role at equal priority",
        "The worksheet does not invent advertisement race history."
      ],
      [
        "Priority zero / configurable backup",
        "Relinquishing advertisement / values 1–254",
        "Zero is not a normal configured priority here."
      ],
      [
        "VIP reachability / transit service",
        "Address acceptance / routed original exchange",
        "Owner and Accept_Mode matter for traffic to the VIP."
      ]
    ],
    "example": "B currently serves at 100 and A returns at 110. Default-enabled A preemption selects A in the settled ordinary case; disabling it retains B. Now declare A the actual .1 address owner and priority 255: owner precedence selects A even with ordinary preempt disabled. If owner A becomes unavailable and expiry is declared complete, B can serve the same VIP as a nonowner; that does not make B priority 255 or owner. Remove returnReady and the role remains while exchange prerequisites fail.",
    "ports": "IPv4 VRRP v3 is IP protocol 112 to 224.0.0.18 with TTL 255. It does not use a TCP or UDP service port. The fixed virtual MAC is0000.5e00.010a for VRID 10. No advertisements or checksum checks run in the browser.",
    "commands": [
      {
        "code": "show vrrp brief",
        "explanation": "Read both prepared observers’ VRRP group summaries.",
        "expected": "GUIDED, NOT EXECUTED: Record version/family/VRID, priority, ownership, preemption and displayed MASTER/BACKUP scope. Map MASTER to the current RFC Active concept without claiming exact current-standard implementation compliance.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show vrrp detail",
        "explanation": "Inspect supported detailed VRRP configuration/status.",
        "expected": "GUIDED, NOT EXECUTED: Record the actual platform parser, advertised intervals and ownership context; no timer behavior or packet validation is inferred from a worksheet.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip arp",
        "explanation": "Read actual scoped Layer 2 address context.",
        "expected": "GUIDED, NOT EXECUTED: Correlate virtual MAC and host gateway cache separately. A VIP echo result or router cache alone is not a transit/application result.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip route\nshow running-config",
        "explanation": "Preserve route and owner/preemption intent separately.",
        "expected": "GUIDED, NOT EXECUTED: Inspect original destination and return context in the applicable table. Keep configuration private; no mutation or save is supplied.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS XE 17 context · read-only inspection; exact platform/support required"
      }
    ],
    "production": "Choose a supported VRRP version/family and document owner versus nonowner semantics, default or changed preemption, group/address mapping and peer compatibility. RFC 9568 covers more validation and behavior than this worksheet. Review actual release compliance, Accept_Mode, address conflicts, tracking extensions and failure/recovery policy in an owned test. First-hop redundancy does not synchronize NAT/firewall sessions or create independent upstream paths.",
    "troubleshooting": [
      [
        "Owner checkbox rejected",
        "Set A priority 255 only with owner declaration; nonowners must remain1–254."
      ],
      [
        "Higher-priority return stays backup",
        "Check ordinary preemption and whether the returning router is an actual address owner."
      ],
      [
        "Actual MASTER differs from predicted declaration",
        "Preserve both peers’ version/address/priority history and actual packets; the model excludes race and partition history."
      ],
      [
        "VIP ping differs from transit",
        "Inspect owner/Accept_Mode and test the original routed destination separately."
      ],
      [
        "Active available, traffic fails",
        "Check upstream/system and original return evidence."
      ]
    ],
    "mistakes": [
      "Using obsolete RFC 5798 as the current specification without noting RFC 9568.",
      "Configuring priority 255 for an ordinary nonowner.",
      "Treating priority 0 as a normal configured backup preference.",
      "Copying HSRP default preemption to VRRP.",
      "Describing VRRP as UDP 112 or TCP 179.",
      "Calling a declared expiry a measured Active_Down interval."
    ],
    "prerequisites": [
      "s3-g7-t0",
      "s2-g2-t0",
      "s1-g4-t2"
    ],
    "related": [
      "s3-g7-t2",
      "s1-g1-t1",
      "s3-g0-t0"
    ],
    "lab": {
      "objective": "Apply ordinary recovery versus address-owner precedence in fixed IPv4 VRRP v3 and separate the selected role from original exchange readiness.",
      "requirements": "Browser only for the supplied worksheet. Optional guided inspection needs separately prepared isolated supported routers and a mapped host/peer/table context. No Cisco runtime, packets or live failover is executed by this topic.",
      "topologyKind": "shared",
      "topology": [
        "One LAN, VIP 192.0.2.1, VRID 10",
        "A .2 or actual owner .1 ↔ B .3",
        "Virtual MAC 0000.5e00.010a",
        "Active path → system/upstream → independent return"
      ],
      "steps": [
        "Compare initial equal defaults with current A history.",
        "Compare ordinary A recovery with default preempt enabled and then disabled.",
        "Select owner recovery; explain A primary .1, priority 255 and precedence despite ordinary preempt off.",
        "Compare owner failure, ordinary failure after expiry and pending detection.",
        "Remove upstream, system and return gates separately.",
        "Reject zero, nonowner255, owner-without255 and inconsistent expiry; keyboard-scroll and Reset."
      ],
      "verification": "Independent model tests exercise supplied scenarios, role/preemption/availability cases, invalid types/ranges/context, mounted output hiding and Reset. Structural checks cover a named keyboard-focusable scroll region. These contract checks are separate from primary real-browser acceptance and prove no device execution or packet delivery.",
      "troubleshooting": "Separate control role, LAN availability, system forwarding, upstream route and original return declarations. For actual investigation preserve both observers and original host context; do not diagnose every missing exchange by changing the election priority.",
      "challenge": "Why can owner A preempt with ordinary preempt disabled while nonowner A at 110 cannot? After owner failure, why does B retain a nonowner priority while serving the protected gateway?",
      "cleanup": "Reset restores the initial supplied scenario without device or learner-progress mutation. This worksheet owns no routers, namespaces, daemons or ARP changes. Any separately authorized target experiment must reconcile its own exact baseline and exclusive resources."
    },
    "glossary": {
      "Virtual Router Redundancy Protocol (VRRP)": "Standard first-hop election protocol.",
      "Virtual Router Identifier (VRID)": "Virtual Router Identifier, scoped here to 10.",
      "Active router": "Current RFC serving-router term; some CLI output says MASTER.",
      "Backup router": "Router available to assume forwarding responsibility.",
      "IPv4 address owner": "Router with the protected IPv4 as an actual interface address.",
      "Preempt_Mode": "Ordinary backup recovery permission, default true.",
      "Priority 255": "Reserved address-owner precedence.",
      "Priority zero advertisement": "Relinquishing advertisement value, not modeled configuration.",
      "Accept_Mode": "Defined behavior for packets addressed to the protected address; outside this worksheet."
    },
    "exams": [
      {
        "testedConcept": "Current specification",
        "question": "Which document currently specifies VRRP v3 for IPv4 and IPv6?",
        "answer": "RFC 9568, which obsoletes RFC 5798.",
        "explanation": "The lesson uses the current RFC 9568.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "RFC 9568, which obsoletes RFC 5798.",
          "RFC 5798, with RFC 9568 applying only toIPv6.",
          "RFC 3768, with version3 using its unchanged IPv4-only specification.",
          "RFC 2281, the HSRP specification used by VRRP v3."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q01"
      },
      {
        "testedConcept": "Ordinary default",
        "question": "What is the VRRP ordinary preemption default in RFC 9568?",
        "answer": "Enabled.",
        "explanation": "Preempt_Mode defaults to True.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Disabled, matching the scoped HSRP default.",
          "Enabled.",
          "Enabled only for routers at the default priority 100.",
          "Disabled for nonowners and configurable only on the owner."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q02"
      },
      {
        "testedConcept": "Reserved owner",
        "question": "A declares VIP .1 as its actual primary address. What priority must the scoped owner use?",
        "answer": "255.",
        "explanation": "The owner has reserved priority 255.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "100, the nonowner default.",
          "254, the highest configurable nonowner value.",
          "255.",
          "0, the relinquishing advertisement value."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q03"
      },
      {
        "testedConcept": "Owner recovery",
        "question": "B is active, owner A returns with ordinary preempt disabled. Which settled result follows?",
        "answer": "A takes precedence as the address owner.",
        "explanation": "Owner precedence is independent of the ordinary preemption flag.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "B retains the role because A’s ordinary preemption is disabled.",
          "A must wait for B to fail before its ownership takes effect.",
          "B must first increase its own priority to 255.",
          "A takes precedence as the address owner."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q04"
      },
      {
        "testedConcept": "Nonowner priority",
        "question": "Which configured input is rejected for nonowner B?",
        "answer": "255.",
        "explanation": "255 is reserved for the sole modeled owner A.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "255.",
          "254.",
          "100.",
          "1."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q05"
      },
      {
        "testedConcept": "Priority zero",
        "question": "What does priority 0 mean in the specification?",
        "answer": "An Active relinquishing advertisement, not a normal backup configuration.",
        "explanation": "The worksheet rejects 0 instead of simulating shutdown advertisements.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The default configured backup priority.",
          "An Active relinquishing advertisement, not a normal backup configuration.",
          "The reserved address-owner priority.",
          "The tie-break value for the lower interface IPv4 address."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q06"
      },
      {
        "testedConcept": "Wire transport",
        "question": "Which IPv4 transport identity is correct?",
        "answer": "IP protocol 112 to 224.0.0.18, TTL 255.",
        "explanation": "VRRP is carried directly over IP.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "UDP 112 to 224.0.0.18, TTL 255.",
          "UDP 1985 to 224.0.0.102, TTL 255.",
          "IP protocol 112 to 224.0.0.18, TTL 255.",
          "IP protocol 112 to 224.0.0.102, TTL 1."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q07"
      },
      {
        "testedConcept": "Virtual MAC",
        "question": "What MAC maps to fixed IPv4 VRID 10?",
        "answer": "0000.5e00.010a.",
        "explanation": "VRID 10 is hexadecimal 0a in the IPv4 VRRP MAC block.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0000.0c9f.f00a.",
          "0000.5e00.020a.",
          "0000.5e00.0110.",
          "0000.5e00.010a."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q08"
      },
      {
        "testedConcept": "VIP versus service",
        "question": "Why is pinging the VIP not a universal transit-service acceptance test?",
        "answer": "Owner/Accept_Mode address acceptance and original transit forwarding are different scopes.",
        "explanation": "Inspect the original routed destination and return separately.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Owner/Accept_Mode address acceptance and original transit forwarding are different scopes.",
          "The virtual MAC is used only for router management rather than transit.",
          "An ordinary backup answers all VIP ARP requests even while another router is active.",
          "Reaching the VIP establishes the destination server’s independent return route."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q09"
      },
      {
        "testedConcept": "Failure takeover",
        "question": "Owner A is unavailable after declared expiry; B is available at 100. What can B do?",
        "answer": "Serve the virtual router as a nonowner without acquiring ownership.",
        "explanation": "Role takeover does not change physical address ownership.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Become owner at 255 automatically.",
          "Serve the virtual router as a nonowner without acquiring ownership.",
          "Take over only after making the VIP its actual primary address.",
          "Remain backup because disabled ordinary preemption forbids failure takeover."
        ],
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Nonowner default",
        "question": "What is the default nonowner priority?",
        "answer": "100.",
        "explanation": "The legal nonowner range is1–254.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-QC1"
      },
      {
        "testedConcept": "Terminology",
        "question": "How does older CLI MASTER relate to current RFC Active?",
        "answer": "It names the serving role in that display context.",
        "explanation": "Do not infer full current-standard compliance from a label.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-QC2"
      },
      {
        "testedConcept": "Wire scope",
        "question": "Does this worksheet validate TTL, checksum or priority-zero packets?",
        "answer": "No.",
        "explanation": "It computes supplied role/readiness declarations only.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "s3-g7-t1",
        "questionId": "s3-g7-t1-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 9568: current VRRP v3, owner, preemption, packet and MAC rules",
        "url": "https://www.rfc-editor.org/rfc/rfc9568",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17: show vrrp brief inspection syntax; implementation scoped",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-vrrp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17 FHRP VRRP guide: show vrrp detail",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/fhrp/fhrp-configuration-guide/vrrp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17: ARP inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_arp-config-arp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS protocol-independent command reference: show ip route syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "configuration": "Browser declarations require no router configuration. Optional inspection requires two exclusively owned, already prepared routers on a mapped isolated broadcast LAN, known VIP/group/version, working management and documented upstream/return intent. No interface shutdown, role priority change, peer reset, ARP clear, save or persistent service is supplied. Record exact prior configuration before any separately authorized target experiment.",
    "performance": "This tabletop uses settled declarations and boolean path prerequisites. It measures no timer interval, failure detection, convergence, lost packets, capacity or latency. A virtual gateway role is not a throughput promise; upstream route and system forwarding readiness can differ from control participation. Shorter protocol timers need actual platform and failure-scenario testing.",
    "security": "Protect the shared LAN and control-plane participation against unauthorized gateway advertisements and address conflicts. Verify applicable authentication and control-plane safeguards on the exact supported release; this worksheet does not configure or test them. Preserve sensitive configuration privately and keep independent management. A valid role or ARP entry does not authenticate upstream route ownership or prove endpoint service. The scoped GLBP guide provides text and MD5 authentication configuration; do not interpret a text string as encrypted control traffic. Actual authentication/version compatibility and key handling remain target-specific and are not exercised here.",
    "id": "s3-g7-t2",
    "title": "GLBP",
    "subtitle": "Separate the ARP-answering gateway from the forwarder serving each supplied virtual MAC.",
    "interactive": "glbp",
    "definition": "Gateway Load Balancing Protocol is Cisco first-hop redundancy that combines one virtual gateway IPv4 address with multiple virtual MAC forwarders. The Active Virtual Gateway (AVG) coordinates the group and answers host ARP requests; Active Virtual Forwarders (AVFs) forward traffic addressed to their virtual MACs. This lesson scopes Cisco IOS 15M&T documentation and a fixed two-host IPv4 tabletop. It consumes supplied assignments and settled ownership rather than implementing Cisco load balancing or timed handoff.",
    "purpose": "Use GLBP where a supported Cisco platform and reviewed design need first-hop forwarding distributed among group members while hosts share one default gateway IP. Inspect which MAC each host learned and which router now serves that MAC. Losing or recovering the AVG and losing an AVF are different operations. Host distribution does not prove equal traffic, independent upstream paths or session continuity.",
    "mental": "One receptionist answers the shared gateway address and hands different hosts different virtual desk numbers. Each desk number has a current forwarding owner. The receptionist can change without changing every supplied cached desk assignment, and one surviving router can serve more than one desk. The worksheet records those assignments and owners; it does not schedule packets or simulate the receptionist’s allocation algorithm.",
    "components": [
      "Fixed group and host view: group 10, VIP 192.0.2.1, routers A/B on one LAN and two supplied hosts. Host 1 and Host 2 carry explicit cached assignments to symbolic V-MAC-A, V-MAC-B or none. These symbols are identities in this model, not generated literal GLBP MAC bytes.",
      "AVG role: one active virtual gateway coordinates virtual MAC assignment and answers ARP for the virtual IP. Its settled owner, LAN availability and ARP-answer readiness are independent supplied declarations. It can also serve a forwarder, but AVG is not synonymous with all forwarding.",
      "AVF role: each supplied virtual MAC has settled owner A, B or none. A host’s existing cached MAC selects that forwarder in this tabletop; ownership can be declared handed off so B serves both MACs. Control availability, system forwarding and upstream readiness determine separate prerequisite gates.",
      "Load sharing: supported vendor modes include round-robin, weighted and host-dependent assignment behavior. This model implements none of those algorithms; it only compares supplied host ARP entries. One VIP leading hosts to different MACs is not per-packet ECMP, a fairness measurement or proof that each application flow is balanced.",
      "Preemption and weighting: the scoped IOS 15M&T guide disables AVG preemption by default but enables forwarder preemption with a default 30-second delay. Gateway priority influences AVG preference; weighting and tracked thresholds govern forwarding capacity/eligibility. They are separate quantities, not interchangeable preference fields. No delay or threshold engine runs here.",
      "Handoff history: actual GLBP forwarder redundancy includes redirect and forwarder-timeout behavior for virtual MACs. A supplied settled owner is not proof of that process or cache refresh. The worksheet explicitly excludes failed-gateway timer history, host ARP expiry and partition/dual-AVG reconciliation."
    ],
    "mechanism": [
      "Record supported platform/release, LAN, group, VIP and both roles from both routers. The guide source is IOS 15M&T; inspect support on the actual target rather than assuming all IOS XE 17 switches implement GLBP.",
      "Read the supplied settled AVG separately from per-MAC owners. AVG B with V-MAC-A still owned by A is a valid tabletop checkpoint. The model does not elect AVG from priority or infer AVF ownership from that election.",
      "For new ARP answering, require a supplied AVG that participates on the LAN and an ARP-answer-ready declaration. This gate says nothing about whether a host already has a cached assignment or whether that assignment has a usable forwarder.",
      "For each cached host assignment, find its supplied MAC owner; none yields no forwarder. Require that owner to participate, have system forwarding and have an upstream path. Add the original return gate separately. Existing cached-host forwarding does not depend on a fresh ARP-answer gate in this fixed no-cache-expiry contract.",
      "Compare declared handoff B owning both virtual MACs with A failed while V-MAC-A still assigned to A. The first changes the owner declaration; the second leaves that host’s forward prerequisite false. Neither predicts how long a real takeover or redirect lasts.",
      "Correlate actual host cache, AVG/forwarder records, route and original exchange for separate target investigation. Preserve weighted/host-dependent settings and tracking intent without deriving packet distribution from the two supplied records."
    ],
    "flow": [
      [
        "Map one VIP and both roles",
        "Record group, AVG, virtual MACs and per-MAC owners."
      ],
      [
        "Read host assignments",
        "Compare the two supplied cached ARP MACs."
      ],
      [
        "Check each forwarder path",
        "Resolve its declared owner and independent forwarding/upstream gates."
      ],
      [
        "Verify both transactions",
        "Inspect actual ARP, return and original service separately."
      ]
    ],
    "comparison": [
      [
        "AVG / AVF",
        "ARP/assignment coordination / per-MAC forwarding",
        "A router can fill both roles; role names are not interchangeable."
      ],
      [
        "VIP / virtual MAC",
        "Shared Layer 3 gateway / host-assigned Layer 2 identity",
        "Different hosts can use different MACs for the same VIP."
      ],
      [
        "Gateway priority / weighting",
        "AVG preference / forwarding capacity and thresholds",
        "Changing one is not the same as changing the other."
      ],
      [
        "New ARP / cached forwarding",
        "Answer function / existing host assignment",
        "A cached host can retain prerequisites while new ARP answering fails."
      ],
      [
        "Declared handoff / timed process",
        "Supplied settled owner / real redirect/timeout history",
        "This model computes no timing or vendor allocation."
      ]
    ],
    "example": "Baseline assigns Host 1 V-MAC-A served by A and Host 2 V-MAC-B served by B while AVG is A. Both hosts use VIP .1. Select no AVG: new ARP answering is false, but the supplied cached hosts can retain forwarding prerequisites. Select failed A with MAC ownership still on A: Host 1’s prerequisite fails while Host 2’s can remain. Select settled handoff: B is AVG and owns both MACs, so both cached hosts use B under the supplied readiness gates. This comparison measures no packets and does not calculate a redirect timer.",
    "ports": "The scoped IPv4 GLBP guide uses UDP 3222 to 224.0.0.102 for multicast hello exchange; assignment request/reply messages have their own defined unicast exchange. HSRP v2 uses the same multicast address but UDP 1985. No control message or ARP request is emitted here.",
    "commands": [
      {
        "code": "show glbp brief",
        "explanation": "Read supplied target gateway and forwarder summaries from both observers.",
        "expected": "GUIDED, NOT EXECUTED: Record interface/group, AVG and forwarder rows rather than collapsing all Active labels into one role. Actual syntax/support must match the prepared platform.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS 15M&T GLBP-supported context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show glbp",
        "explanation": "Inspect detailed gateway, forwarder, weighting and preemption context.",
        "expected": "GUIDED, NOT EXECUTED: Preserve actual virtual MAC owner, priority, weighting/threshold and redirect/timeout fields. They are observations, not worksheet-computed delays.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS 15M&T GLBP-supported context · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip arp",
        "explanation": "Read actual address-resolution context separately from roles.",
        "expected": "GUIDED, NOT EXECUTED: Record each original host’s actual VIP cache through its own supported host tool; router ARP alone does not establish both host assignments.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS 15M&T; ARP syntax cross-checked with IOS XE 17 guide · read-only inspection; exact platform/support required"
      },
      {
        "code": "show ip route\nshow running-config",
        "explanation": "Read upstream route and original GLBP intent privately.",
        "expected": "GUIDED, NOT EXECUTED: Inspect each selected forwarder’s applicable destination and return scope. The record does not prove traffic fairness, state synchronization or original service.",
        "filename": "ios",
        "platform": "Prepared isolated Cisco IOS 15M&T; base inspection syntax also documented in IOS XE 17 · read-only inspection; exact platform/support required"
      }
    ],
    "production": "Confirm GLBP support and operational limits on the actual Cisco platform before design. Choose assignment mode, AVG priority/recovery policy, AVF weighting/tracked dependencies and redirect/forwarder behavior deliberately. Monitor host assignment and per-forwarder path health independently. Test uneven host traffic, failure and recovery with actual caches and original applications. A two-host worksheet is not an upstream ECMP or stateful firewall/NAT distribution design.",
    "troubleshooting": [
      [
        "One host fails but another works",
        "Compare actual cached MAC and its settled forwarder owner/path."
      ],
      [
        "AVG changes, traffic owner unchanged",
        "AVG coordinates ARP; per-MAC forwarding is separate."
      ],
      [
        "New hosts fail while cached hosts continue",
        "Investigate AVG/ARP-answer availability separately from existing forwarding."
      ],
      [
        "Weighting mistaken for gateway priority",
        "Inspect the configured quantity and tracked thresholds; AVG and AVF roles differ."
      ],
      [
        "Handoff timing claimed from declarations",
        "Preserve actual redirect/timeout/capture records; this model has no timing evidence."
      ]
    ],
    "mistakes": [
      "Calling every Active row the AVG.",
      "Treating one VIP as necessarily one forwarding MAC.",
      "Describing supplied ARP assignments as per-packet ECMP.",
      "Assuming AVG election changes every AVF owner.",
      "Using gateway priority as forwarding weighting.",
      "Copying AVG preemption defaults to AVF.",
      "Claiming a settled handoff proves30-second observed failover."
    ],
    "prerequisites": [
      "s3-g7-t0",
      "s1-g1-t1",
      "s2-g2-t0"
    ],
    "related": [
      "s3-g7-t1",
      "s3-g0-t0",
      "s1-g4-t2"
    ],
    "lab": {
      "objective": "Trace two supplied cached host MAC assignments to independent settled forwarder owners and distinguish new ARP answering from existing forwarding.",
      "requirements": "Browser only for the supplied worksheet. Optional guided inspection needs separately prepared isolated supported routers and a mapped host/peer/table context. No Cisco runtime, packets or live failover is executed by this topic.",
      "topologyKind": "shared",
      "topology": [
        "Host 1 and Host 2 share VIP 192.0.2.1",
        "AVG A or B or none → new ARP-answer gate",
        "V-MAC-A/B → separately supplied A/B/none owner",
        "Per-owner system/upstream → original return"
      ],
      "steps": [
        "Read split assignments and then both hosts assigned V-MAC-A.",
        "Select supplied AVG B with unchanged MAC owners.",
        "Compare no AVG and failed ARP-answer readiness with unchanged cached host forwarding.",
        "Compare A unavailable without handoff with declared B ownership of both MACs.",
        "Remove one MAC owner, one host cache, one owner uplink and return readiness separately.",
        "Reject invalid role/MAC/boolean declarations; keyboard-scroll and Reset."
      ],
      "verification": "Independent model tests exercise supplied scenarios, role/preemption/availability cases, invalid types/ranges/context, mounted output hiding and Reset. Structural checks cover a named keyboard-focusable scroll region. These contract checks are separate from primary real-browser acceptance and prove no device execution or packet delivery.",
      "troubleshooting": "Separate control role, LAN availability, system forwarding, upstream route and original return declarations. For actual investigation preserve both observers and original host context; do not diagnose every missing exchange by changing the election priority.",
      "challenge": "Why can cached Host 2 retain forwarding prerequisites without an available AVG, and why can B serving two virtual MACs coexist with one shared gateway IP?",
      "cleanup": "Reset restores the initial supplied scenario without device or learner-progress mutation. This worksheet owns no routers, namespaces, daemons or ARP changes. Any separately authorized target experiment must reconcile its own exact baseline and exclusive resources."
    },
    "glossary": {
      "Gateway Load Balancing Protocol (GLBP)": "Cisco gateway redundancy with virtual-MAC load sharing.",
      "Active Virtual Gateway (AVG)": "Active Virtual Gateway coordinating assignment and ARP.",
      "Active Virtual Forwarder (AVF)": "Active Virtual Forwarder serving traffic for a virtual MAC.",
      "Virtual MAC address": "Layer 2 identity assigned to a host for the shared gateway.",
      "Forwarder weighting": "Forwarding capacity/eligibility quantity with tracked thresholds.",
      "Gateway priority": "Preference used for AVG selection, distinct from weighting.",
      "Redirect time": "Actual protocol handoff parameter, not calculated here.",
      "Cached host assignment": "Supplied host ARP mapping, with no expiry simulation."
    },
    "exams": [
      {
        "testedConcept": "AVG purpose",
        "question": "Which role coordinates virtual MAC assignment and answers ARP for the shared VIP?",
        "answer": "AVG.",
        "explanation": "AVG responsibility differs from per-MAC forwarding.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "AVG.",
          "The AVF serving Host 1’s cached MAC, irrespective of the AVG.",
          "The standby virtual gateway before it becomes AVG.",
          "Each AVF independently assigning all of the group’s virtual MACs."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q01"
      },
      {
        "testedConcept": "AVF purpose",
        "question": "What selects the forwarding owner for an existing supplied host entry?",
        "answer": "Its cached virtual MAC and that MAC’s settled owner.",
        "explanation": "The worksheet resolves supplied MAC ownership per host.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The current AVG identity, regardless of the cached MAC.",
          "Its cached virtual MAC and that MAC’s settled owner.",
          "The highest gateway priority, regardless of the MAC owner.",
          "The highest weighting value, without checking the supplied owner."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q02"
      },
      {
        "testedConcept": "Shared VIP",
        "question": "Can two hosts use the same GLBP gateway IP but different supplied MACs?",
        "answer": "Yes, the AVG can provide different virtual MAC assignments.",
        "explanation": "GLBP separates shared VIP from individual host MAC assignment.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "No; one VIP requires one shared virtual MAC for all hosts.",
          "Yes, but only by configuring different virtual IPs on the hosts.",
          "Yes, the AVG can provide different virtual MAC assignments.",
          "Yes, because GLBP alternates the next-hop MAC for each packet."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q03"
      },
      {
        "testedConcept": "AVG default",
        "question": "Which preemption default is documented in the scoped IOS 15M&T guide?",
        "answer": "AVG disabled; AVF enabled with default 30-second delay.",
        "explanation": "Gateway and forwarder preemption have different defaults.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "AVG enabled and AVF disabled.",
          "Both enabled with the same 30-second delay.",
          "Both disabled until gateway priority exceeds 100.",
          "AVG disabled; AVF enabled with default 30-second delay."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q04"
      },
      {
        "testedConcept": "Weighting distinction",
        "question": "Which distinction is correct?",
        "answer": "Gateway priority concerns AVG preference; weighting concerns forwarding capacity/thresholds.",
        "explanation": "Do not exchange those independent policy quantities.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Gateway priority concerns AVG preference; weighting concerns forwarding capacity/thresholds.",
          "Weighting selects AVG and gateway priority selects the host-assigned MAC.",
          "Gateway priority and weighting are the same advertised quantity.",
          "Tracking gateway priority automatically changes every host’s cached MAC."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q05"
      },
      {
        "testedConcept": "Cached versus new",
        "question": "No AVG is supplied, but both cached MAC owners and their paths are ready. What can the model report?",
        "answer": "Cached host prerequisites can agree while new ARP answering is false.",
        "explanation": "The contract excludes cache expiry and distinguishes the gates.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "New ARP answering remains true because any AVF is necessarily the AVG.",
          "Cached host prerequisites can agree while new ARP answering is false.",
          "Every cached assignment is automatically cleared when the AVG is unavailable.",
          "Existing host forwarding requires a fresh AVG ARP answer for each packet."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q06"
      },
      {
        "testedConcept": "Settled handoff",
        "question": "B is declared owner of both virtual MACs after handoff. What does this prove?",
        "answer": "Only the supplied settled ownership and resulting readiness predicates.",
        "explanation": "The worksheet does not execute handoff timers or packets.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A measured zero-loss transfer between forwarders.",
          "An observed 30-second takeover matching the documented default.",
          "Only the supplied settled ownership and resulting readiness predicates.",
          "A computed weighted allocation placing both hosts on B."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q07"
      },
      {
        "testedConcept": "Uneven host failure",
        "question": "A is unavailable but still declared V-MAC-A owner; B serves V-MAC-B. Which host lacks forward prerequisites in the baseline assignments?",
        "answer": "Host 1, whose supplied cache selects V-MAC-A.",
        "explanation": "Failure follows the supplied MAC owner and its availability.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Both because only the AVG can forward traffic.",
          "Only Host 2 because its MAC differs from the original AVG’s MAC.",
          "Neither because another live member automatically owns all failed MACs in this model.",
          "Host 1, whose supplied cache selects V-MAC-A."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q08"
      },
      {
        "testedConcept": "Protocol identity",
        "question": "Which IPv4 multicast hello transport is scoped for GLBP?",
        "answer": "UDP 3222 to 224.0.0.102.",
        "explanation": "Do not conflate it with HSRP or VRRP.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "UDP 3222 to 224.0.0.102.",
          "UDP 1985 to 224.0.0.102.",
          "UDP 3222 to 224.0.0.2.",
          "IP protocol 112 to 224.0.0.18."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q09"
      },
      {
        "testedConcept": "Algorithm limit",
        "question": "Does the worksheet derive Cisco round-robin or weighted assignments from traffic?",
        "answer": "No; both host assignments are supplied explicitly.",
        "explanation": "The model deliberately does not implement vendor allocation or packet scheduling.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes, the order of the two host rows runs round-robin assignment.",
          "No; both host assignments are supplied explicitly.",
          "Yes, changing AVG computes a new weighted allocation.",
          "Yes, the two ownership declarations implement per-packet ECMP."
        ],
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Role separation",
        "question": "Does AVG necessarily own every virtual MAC?",
        "answer": "No.",
        "explanation": "Per-MAC AVF ownership is separate.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-QC1"
      },
      {
        "testedConcept": "Packet distribution",
        "question": "Do different supplied host MACs prove per-packet ECMP?",
        "answer": "No.",
        "explanation": "The assignments say nothing about measured flow or packet distribution.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-QC2"
      },
      {
        "testedConcept": "Timer scope",
        "question": "Does declaring a handoff run redirect or forwarder-timeout timers?",
        "answer": "No.",
        "explanation": "They are source-described limitations, not executable history.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "s3-g7-t2",
        "questionId": "s3-g7-t2-QC3"
      }
    ],
    "sources": [
      {
        "title": "Cisco IOS 15M&T: GLBP roles, ARP sharing, preemption, weighting and show syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipapp_fhrp/configuration/15-mt/fhp-15-mt-book/Configuring-GLBP.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE 17: base ARP inspection syntax only",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_arp-config-arp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS protocol-independent command reference: show ip route syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g8-t0",
    "batch": "10",
    "title": "Multicast fundamentals",
    "subtitle": "Separate receiver demand, ingress validation and downstream replication from actual delivery.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "definition": "IPv4 multicast identifies a receiver group rather than one destination host. A sender produces datagrams addressed to a multicast group, while interested receivers request reception locally. Routers can replicate a received datagram onto multiple selected downstream interfaces instead of requiring the sender to transmit a separate unicast copy to every receiver. The general IPv4 multicast destination range is 224.0.0.0 through 239.255.255.255. Group address choice, scope, source identity and receiver state all matter; simply assigning an address in that range does not create a functioning routed service.",
    "purpose": "Use multicast when the application and network support distribution of the same information to multiple receivers and the operational cost is justified. The purpose of this lesson is to reason about one supplied router hop, not to promise efficiency for every workload. First identify the original source and receiver demand, then validate the incoming interface and outgoing choices. Keep control-plane membership and routing observations separate from evidence that a source actually transmits and an application consumes the intended content. That separation makes a failed receiver easier to diagnose without changing unrelated routing policy.",
    "mental": "Draw a single incoming arrow into a router and two possible outgoing arrows. Label the incoming arrow with its actual interface, the expected interface toward the selected reverse-path target and the datagram TTL at this router. Label each outgoing arrow with supplied OIL membership, settled local receiver demand and downstream readiness. Only arrows whose declarations agree become hypothetical copies. The drawing does not cause a source to send, establish a PIM tree, install a kernel route or authorize an application. A green receiver label belongs to a different page from a packet capture.",
    "components": [
      "Source and group form different pieces of identity. This worksheet fixes the original source to 192.0.2.10. ASM uses demonstration group 239.1.1.1; SSM uses 232.1.1.1. ASM names a group that can receive from multiple sources under the applicable service and filtering policy, whereas SSM identifies the requested channel by both source and group. Documentation addresses and groups are teaching context, not automatically authorized production allocation.",
      "Administrative scope and hop lifetime answer different questions. The example ASM group falls inside 239/8, the administratively scoped range. Scope boundaries require an explicit network design and enforcement; the address alone is not an access-control rule. TTL limits how many routed hops a datagram can traverse. The worksheet uses the TTL already present at this router, and requires it to be greater than one for this routed forwarding step.",
      "Reverse Path Forwarding validates arrival against a selected reverse-path context. It is not an ordinary destination lookup for group G and is not the receiver return route. A supplied source-tree context points toward source 192.0.2.10; a supplied shared-tree context points toward RP 192.0.2.254. The worksheet takes the expected ingress as evidence supplied by the learner rather than deriving it from a unicast table or simulating the multicast routing information base.",
      "An outgoing interface list, or OIL, describes potential replication interfaces. This fixed topology uses down-a and down-b, each serving local attached receivers. It requires the corresponding local settled demand and downstream readiness as well as OIL membership. A real transit interface can instead have downstream PIM demand; requiring a local host on every transit interface would be wrong. The worksheet deliberately avoids that topology and makes its local-receiver assumption explicit.",
      "IGMP communicates receiver interest on an attached IPv4 LAN; PIM distributes multicast routing state between routers. Neither protocol is the application payload. A PIM neighbor can be present while a particular group lacks usable downstream state. A local membership record can be present while the source is silent. Switch IGMP snooping is another independent Layer 2 forwarding mechanism and is not modeled by this two-interface router worksheet.",
      "Multicast delivery is not made reliable simply because replication is possible. The application chooses its transport and recovery behavior. UDP is common but multicast itself does not define a UDP port, acknowledgments or authentication. Receiver socket binding, host filtering, source transmission, policy boundaries and actual loss can all matter. The sourceReady and applicationReady controls are supplied prerequisites only and do not measure any of those systems.",
      "Replication can save upstream bandwidth while increasing aggregate downstream work. A single received packet with two permitted downstream copies still consumes capacity on both downstream links. A route entry or membership line does not establish actual packet rate, hardware programming or a successful media session. Observe per-interface counters and the original receiver transaction in a controlled target context before concluding that the service is healthy."
    ],
    "mechanism": [
      "Bound the exercise to one router, source, group, VRF and two attached receiver LANs. Record ASM or SSM explicitly. Select the supplied source or shared context before choosing the expected reverse-path ingress. SSM accepts only a source-tree context in this worksheet; an incompatible shared SSM selection is invalid input, not a silently repaired topology.",
      "Declare whether the RPF route exists and which interface the datagram actually arrives on. A missing route or a different actual ingress fails the modeled RPF check. The expected interface must be up-a or up-b; the actual ingress can also name either downstream interface to expose a wrong-arrival case. No routing lookup is performed by the browser.",
      "Read the TTL at this hop as an unsigned eight-bit integer. Zero and one are accepted boundary inputs but cannot pass the routed forwarding gate. Values from two through 255 pass that gate; a hypothetical forwarded copy would have TTL decremented by one. This limited check does not implement per-interface TTL thresholds, tunnel behavior or every multicast scope rule.",
      "For each local downstream independently, require OIL membership, settled receiver demand and readiness. Combine those with successful RPF and the TTL gate to count hypothetical copies. A failing downstream does not automatically remove the other downstream copy. The model never sends a packet back onto its incoming interface and does not infer how a real routing protocol produced the OIL.",
      "Finally record original source and receiver application readiness separately. Toggling either changes the scoped readiness conclusion without fabricating a packet or changing the hypothetical replication rules. On a prepared target, inspect multicast state, RPF and counters, then verify the original source/receiver exchange with actual evidence. Label a browser declaration as a declaration throughout the report."
    ],
    "flow": [
      [
        "Identify the channel",
        "Fix source, group and supplied reverse-path context."
      ],
      [
        "Validate ingress and TTL",
        "Use declared RPF route/ingress and require TTL greater than one."
      ],
      [
        "Evaluate each downstream",
        "Combine supplied OIL, local demand and readiness independently."
      ],
      [
        "Verify the original service",
        "Observe source transmission and receiver behavior separately from the worksheet."
      ]
    ],
    "comparison": [
      [
        "Unicast / multicast",
        "One destination host / a group of interested receivers",
        "Replication still requires usable forwarding state."
      ],
      [
        "RPF / destination lookup",
        "Validate the incoming reverse-path context / choose a unicast destination next hop",
        "Do not look up G as an ordinary host route to derive RPF."
      ],
      [
        "ASM / SSM",
        "Group service / source-and-group channel",
        "SSM requires an identified source."
      ],
      [
        "Membership / source traffic",
        "Receiver interest / emitted application datagrams",
        "Interest cannot create a sender."
      ],
      [
        "OIL / actual copies",
        "Declared outgoing set / measured forwarding",
        "A state line is not a packet capture."
      ]
    ],
    "example": "In the baseline, source 192.0.2.10 and ASM group 239.1.1.1 arrive on up-a, matching the supplied expected ingress. TTL is eight. Both downstreams have OIL membership, local demand and readiness, so the worksheet declares two hypothetical copies. Removing only oilB leaves one. Changing the actual ingress to up-b leaves zero, even if both receiver LANs remain interested. Setting sourceReady false leaves the hypothetical forwarding calculation unchanged while marking service prerequisites incomplete: no receiver declaration proves that a source sent any datagram.",
    "commands": [
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip multicast'",
        "explanation": "Inspect multicast interface context.",
        "expected": "GUIDED, NOT EXECUTED: Record the actual interfaces and target VRF; do not infer a particular channel solely from global readiness."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip pim rpf'",
        "explanation": "Inspect RPF information for currently used channel state.",
        "expected": "GUIDED, NOT EXECUTED: Record actual source/group and RPF interface; confirm the selected reverse-path context separately."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip mroute'",
        "explanation": "Inspect installed kernel multicast route state.",
        "expected": "GUIDED, NOT EXECUTED: Record actual channel ingress and outgoing interfaces without asserting sample output or hardware delivery."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip multicast count'",
        "explanation": "Inspect actual multicast packet counts per interface.",
        "expected": "GUIDED, NOT EXECUTED: Record counters and observation interval; counts need correlation with the exact source and receiver transaction."
      }
    ],
    "configuration": "For a prepared isolated FRR stable 8.4 target, plan which interfaces support multicast routing, which LANs need IGMP and whether the group is ASM or SSM. FRR documents separate ip pim and ip igmp interface controls; enabling PIM alone is not evidence that IGMP reports are processed on a receiver LAN. Capture baseline interface, RPF and route state before reviewing a change. Apply only an owned target-specific configuration through normal change control, then repeat exact-channel observations. This lesson executes no daemon, join, configuration update or packet generator.",
    "ports": "Multicast data uses the application-selected transport and port. PIM is IP protocol 103, and its link-local multicast control messages use 224.0.0.13; some PIM messages are unicast. IGMP is IP protocol 2 rather than a TCP or UDP service. The worksheet opens no socket and transmits no control or application traffic.",
    "production": "Document source ownership, group allocation, receiver networks, service model and multicast boundaries before deployment. Keep routing and receiver evidence within the same VRF and address family. Collect a baseline at the first-hop, transit and last-hop routers rather than extrapolating one router view to the whole tree. Correlate source packet rate with downstream and receiver observations. For resilience, document the intended RPF changes and tree convergence separately; the static worksheet has no failure history or convergence timer.",
    "troubleshooting": [
      [
        "Symptom",
        "One or both receiver LANs lack the intended stream."
      ],
      [
        "Hypotheses",
        "The source is silent, ingress fails RPF, TTL expires, OIL demand is absent or a downstream/app declaration is incomplete."
      ],
      [
        "Test",
        "Read multicast interfaces, channel RPF, installed multicast state and real counters on the prepared target."
      ],
      [
        "Observation",
        "Record exact source/group and each interface rather than using one healthy neighbor as proof."
      ],
      [
        "Conclusion / next test",
        "Identify the first unmet prerequisite and inspect that layer with actual evidence."
      ],
      [
        "Fix and verify",
        "Change only the owned boundary or forwarding dependency, then repeat the original source-to-receiver transaction."
      ]
    ],
    "security": "A multicast group address is not a credential. Bound permitted sources and receiver networks, filter inappropriate control traffic and enforce group scope at the intended boundaries. Receiver requests can consume network resources; require policy and resource limits appropriate to the service. Avoid exposing sensitive content solely because a host joined a group. The browser controls represent no authorization, and a supplied accepted source does not prove its identity against spoofing.",
    "performance": "Measure the stream rate, number of downstream copies, link capacity, loss and application buffering independently. Two copies can double downstream aggregate work without doubling upstream source traffic. Evaluate multicast route and membership scale, hardware support and control-plane load on the actual platform. A positive worksheet result only says the supplied gates agree for this hop; it establishes no throughput, jitter, convergence time or receiver quality.",
    "mistakes": [
      "Treating receiver membership as proof that the source transmits.",
      "Using a destination lookup for the group as the RPF test.",
      "Assuming an OIL line proves packets or a complete PIM tree.",
      "Forwarding a TTL-one input through another routed hop.",
      "Requiring local hosts on every real PIM transit interface.",
      "Treating administratively scoped group addressing as application authentication."
    ],
    "interactive": "multicast-fundamentals",
    "lab": {
      "objective": "Explain one-hop declared replication and separate it from the original service prerequisites.",
      "requirements": "Browser-local supplied-state tabletop. Optional FRR 8.4 show observations require an authorized prepared target with known source, group and VRF. No target commands have been executed.",
      "topology": [
        "192.0.2.10 → up-a/up-b → one router",
        "ASM 239.1.1.1 or SSM 232.1.1.1",
        "down-a → local receiver LAN A",
        "down-b → local receiver LAN B"
      ],
      "steps": [
        "Load baseline and record the source, group, selected RPF target, actual/expected ingress and TTL. Explain both downstream gates rather than treating two copies as a universal property of multicast.",
        "Load one-oil and downstream-down. Identify the interface whose declaration changed and explain why the other interface remains independent.",
        "Compare wrong-ingress with no-rpf-route. Both produce zero hypothetical copies, but the failed declarations are different and would require different target evidence.",
        "Compare ttl-zero, ttl-one and max-ttl. State the accepted numeric boundary and the stricter forwarding requirement.",
        "Load no-members, source-silent and app-not-ready. Separate local interest, hypothetical replication and service readiness in the written result.",
        "Load shared and ssm. Identify the supplied reverse-path target without claiming the browser builds either routing tree.",
        "On a prepared target only, inspect the four guided show groups and record actual observations. Correlate with the original source and each receiver using independent traffic evidence."
      ],
      "verification": "Report each supplied gate, the hypothetical copy count and source/application readiness separately. Cite actual target evidence for any live result. Do not generalize this local-receiver topology to transit-interface demand.",
      "troubleshooting": "If the result is zero, identify RPF, TTL and downstream conditions individually. Invalid source, incompatible SSM/shared context or numeric input hides stale results until corrected. Use keyboard reset to restore the supplied baseline.",
      "challenge": "Can receiver A remain interested while the source is silent? Can downstream B lose its OIL membership without removing the A copy? Explain both using the declared gates.",
      "cleanup": "Reset changes only local worksheet controls. Guided commands are read-only. No router, packet, membership report, learner progress or persistent network state is changed.",
      "topologyKind": "shared"
    },
    "quick": [
      {
        "testedConcept": "RPF",
        "question": "Does RPF here use an ordinary destination lookup for G?",
        "answer": "No; it validates the supplied selected reverse-path ingress.",
        "explanation": "The selected target is the source or supplied RP context.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-QC1"
      },
      {
        "testedConcept": "TTL",
        "question": "Can TTL one pass this routed forwarding hop?",
        "answer": "No.",
        "explanation": "A routed copy needs TTL greater than one.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-QC2"
      },
      {
        "testedConcept": "Readiness",
        "question": "Does local receiver demand prove source traffic?",
        "answer": "No.",
        "explanation": "Source transmission is an independent declaration and needs actual evidence.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-QC3"
      }
    ],
    "exams": [
      {
        "testedConcept": "Replication",
        "question": "RPF passes, TTL is eight, and both downstreams meet all declared gates. How many hypothetical copies?",
        "answer": "Two",
        "options": [
          "Two",
          "One because multicast cannot replicate",
          "Zero unless TCP acknowledges",
          "An observed packet rate of two per second"
        ],
        "explanation": "Each supplied downstream independently qualifies.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q01"
      },
      {
        "testedConcept": "Independent OIL",
        "question": "Only oilB becomes false in the baseline. What changes?",
        "answer": "Only A remains a hypothetical copy",
        "options": [
          "Source traffic is proven stopped",
          "Only A remains a hypothetical copy",
          "Both copies necessarily disappear",
          "B remains because its name is second"
        ],
        "explanation": "The downstream declarations are independent.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q02"
      },
      {
        "testedConcept": "Wrong ingress",
        "question": "Expected ingress is up-a but actual arrival is up-b. What does the model declare?",
        "answer": "RPF fails and no hypothetical routed copy passes",
        "options": [
          "Every receiver must leave the group",
          "The application socket is closed",
          "RPF fails and no hypothetical routed copy passes",
          "A destination route to G always overrides RPF"
        ],
        "explanation": "The supplied ingress does not match the expectation.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q03"
      },
      {
        "testedConcept": "TTL boundary",
        "question": "Which supplied TTL first permits this routed hop?",
        "answer": "Two",
        "options": [
          "Zero",
          "One",
          "256",
          "Two"
        ],
        "explanation": "Values greater than one pass this limited hop gate.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q04"
      },
      {
        "testedConcept": "Source readiness",
        "question": "Source readiness is false while all forwarding declarations pass. What follows?",
        "answer": "Hypothetical copies remain, but service prerequisites are incomplete",
        "options": [
          "Hypothetical copies remain, but service prerequisites are incomplete",
          "The source necessarily transmitted",
          "Membership creates source packets",
          "The OIL must become empty"
        ],
        "explanation": "Source readiness is separate from hypothetical forwarding.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q05"
      },
      {
        "testedConcept": "SSM identity",
        "question": "What identifies the SSM channel in this lesson?",
        "answer": "Source 192.0.2.10 and group 232.1.1.1",
        "options": [
          "The router MAC address",
          "Source 192.0.2.10 and group 232.1.1.1",
          "Only an application UDP port",
          "Only group 239.1.1.1"
        ],
        "explanation": "SSM identifies source and group together.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q06"
      },
      {
        "testedConcept": "Local topology",
        "question": "Why does this worksheet require memberA for down-a?",
        "answer": "Down-a serves a local attached receiver LAN in this fixed topology",
        "options": [
          "PIM uses no downstream routing state",
          "A local member proves hardware programming",
          "Down-a serves a local attached receiver LAN in this fixed topology",
          "Every transit interface universally needs a local IGMP host"
        ],
        "explanation": "Real transit demand can instead come from downstream PIM state.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q07"
      },
      {
        "testedConcept": "Scope",
        "question": "What does using 239.1.1.1 establish by itself?",
        "answer": "It is an administratively scoped demonstration group, not an access credential",
        "options": [
          "Every host is authenticated",
          "Every router must forward it outside the domain",
          "The group automatically creates policy boundaries",
          "It is an administratively scoped demonstration group, not an access credential"
        ],
        "explanation": "Boundary enforcement and authorization need separate controls.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q08"
      },
      {
        "testedConcept": "Evidence",
        "question": "Which evidence most directly distinguishes installed multicast state from actual traffic?",
        "answer": "State observations correlated with counters and the original receiver transaction",
        "options": [
          "State observations correlated with counters and the original receiver transaction",
          "Only the group address",
          "Only a PIM neighbor name",
          "Only the worksheet reset button"
        ],
        "explanation": "State and actual forwarding answer different questions.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q09"
      },
      {
        "testedConcept": "Transport",
        "question": "Which statement describes multicast application transport?",
        "answer": "The application chooses transport and ports; multicast itself supplies no UDP port",
        "options": [
          "PIM is TCP 103",
          "The application chooses transport and ports; multicast itself supplies no UDP port",
          "Every stream uses TCP 179",
          "IGMP is a UDP application on port two"
        ],
        "explanation": "IP protocol numbers differ from transport ports.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t0",
        "questionId": "s3-g8-t0-Q10"
      }
    ],
    "glossary": {
      "RPF": "Reverse Path Forwarding: validate the selected incoming reverse-path context.",
      "OIL": "Outgoing interface list used for potential replication.",
      "ASM": "Any-Source Multicast group service under applicable policy.",
      "SSM": "Source-Specific Multicast channel identified by source and group.",
      "TTL": "IPv4 hop lifetime field; this hop requires a value greater than one."
    },
    "prerequisites": [
      "s1-g2-t0",
      "s1-g4-t0",
      "s1-g1-t0"
    ],
    "related": [
      "s3-g8-t1",
      "s3-g8-t2"
    ],
    "sources": [
      {
        "title": "RFC 1112: host extensions for IPv4 multicast",
        "url": "https://www.rfc-editor.org/rfc/rfc1112.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2365: administratively scoped IP multicast",
        "url": "https://www.rfc-editor.org/rfc/rfc2365.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 1812: router TTL behavior",
        "url": "https://www.rfc-editor.org/rfc/rfc1812.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4607: Source-Specific Multicast for IP",
        "url": "https://www.rfc-editor.org/rfc/rfc4607.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRRouting stable 8.4: PIM and IGMP operational show commands",
        "url": "https://docs.frrouting.org/en/stable-8.4/pim.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g8-t1",
    "batch": "10",
    "title": "PIM",
    "subtitle": "Read selected ASM and SSM tree context before checking RPF and downstream state.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "definition": "Protocol Independent Multicast coordinates multicast routing between routers. This lesson focuses on PIM Sparse Mode and the source-specific subset used for SSM. Protocol independent means PIM can use underlying unicast routing information or a separate multicast-capable routing information base; it does not mean routing information is unnecessary. ASM can use a shared tree rooted at a rendezvous point and a source tree toward a particular sender. SSM uses source-specific reception and source-tree state without the shared-tree RP requirement.",
    "purpose": "Use PIM to distribute multicast routing demand between routers while keeping local receiver signaling and application traffic distinct. The practical goal is to identify which selected tree a particular observation describes and which reverse-path target follows from that context. A route to a source, an RP mapping, a PIM neighbor and an outgoing interface are different observations. Record them together for the exact channel and router role before diagnosing a failure. This worksheet consumes a supplied selected-tree snapshot rather than implementing PIM protocol exchanges.",
    "mental": "Imagine two possible upstream compass targets. In the supplied ASM shared-tree context the compass points toward RP 192.0.2.254. In a supplied source-tree context it points toward source 192.0.2.10. Pick the context before comparing actual ingress with the expected reverse-path interface. Then check the selected tree declaration and downstream demands. For SSM there is only the source channel: a source-specific receiver declaration matters, while the RP readiness checkbox has no effect. None of these labels establish when a real router would switch trees.",
    "components": [
      "An ASM shared tree groups reception around an RP for the group. Its notation is commonly (*,G), distinct from a source-specific (S,G) tree. A learner inspecting only a destination group must still identify which state and router role the output describes. The browser fixes group 239.1.1.1 and RP 192.0.2.254 for its supplied shared context; it does not discover an RP, choose among mappings or prove the RP is reachable.",
      "A source-tree context points reverse-path checks toward the particular source. The example source is 192.0.2.10. ASM can have source-specific state as well as shared-tree state, and real forwarding behavior includes state interactions that this worksheet excludes. Selecting source here means the relevant context has already been supplied. It does not trigger a shortest-path-tree switchover, send a Join, suppress a Register or compute an implementation threshold.",
      "SSM identifies the channel by source and group and removes the shared RP tree from that channel. The example group 232.1.1.1 is in the IPv4 SSM range. The supplied source-specific receiver gate is required, and the selected context must be a source tree. The worksheet rejects a shared SSM selection rather than treating it as an alternate valid service. A missing RP readiness declaration does not block an otherwise ready SSM channel.",
      "RPF depends on the route information used for the selected context. FRR documents configurable lookup behavior involving the multicast and unicast RIBs. A useful target investigation therefore includes the selected RPF source of information and expected interface, not merely a destination route toward G. Here rpfRoute is an explicit boolean and expectedIngress is supplied as up-a or up-b. Actual ingress must match it for the limited hop calculation.",
      "Selected tree state, downstream interest and interface readiness are independent. This fixed two-LAN example requires local settled membership at each downstream as well as OIL membership. A routed transit interface can have PIM downstream demand without directly attached IGMP listeners; the example does not model that topology. TreeState is also supplied independently, so healthy receiver declarations cannot create missing upstream state automatically.",
      "PIM neighbors and local receiver membership have different origins and scopes. Hello processing discovers neighboring routers; receiver IGMP state can cause local demand that informs routing. PIM Register, Register-Stop, Join/Prune and Assert behavior require protocol state and timers. The worksheet models none of those message sequences, DR elections, RP discovery procedures or loop-prevention history. It represents a bounded explanation of declared state rather than a protocol emulator.",
      "RFC 7761 is the PIM-SM base specification. Its update history includes RFC 8736 and RFC 9436; RFC 9436 supersedes RFC 8736 and updates message type space and reserved/flag bits. This lesson does not parse those headers. Operational documentation is pinned to FRR stable 8.4, while source references distinguish specification history from the target implementation. Do not assume every current feature or default exists in that older prepared target."
    ],
    "mechanism": [
      "Identify the source, group, VRF, router role and selected state. For ASM, choose shared or source context deliberately. For SSM, choose source context and document how receivers identify the desired source. Keep the selected-tree snapshot separate from how a real router learned or transitioned to it.",
      "Apply the independent selected-context gates. TreeState must be true in every PIM case. RP readiness is required only for the selected ASM shared context. SourceSpecific is required for SSM. Changing the unused RP gate on a source-tree scenario must not invent an RP dependency.",
      "Determine the selected reverse-path target, declare route presence and compare actual with expected ingress. Then read TTL at this router. Matching ingress with a route present and TTL greater than one permits this limited hop stage, provided the selected-context gates also hold. A group membership checkbox cannot bypass those checks.",
      "Evaluate OIL membership, local settled receiver demand and downstream readiness independently for down-a and down-b. Count hypothetical copies whose supplied gates pass. The browser does not calculate the OIL from PIM messages, Assert winners, pruning or a kernel multicast forwarding cache, and it does not claim hardware has programmed an entry.",
      "Record original source transmission and receiver application readiness separately. Inspect actual target neighbor, RP, RPF and installed multicast state as different evidence sources. Correlate them with traffic only in an authorized prepared environment. If the target lacks a command or expected state, record its version and exact error instead of substituting fabricated output."
    ],
    "flow": [
      [
        "Select the tree context",
        "ASM shared points toward RP; source tree and SSM point toward source."
      ],
      [
        "Check independent tree gates",
        "Require declared tree state and the context-specific RP or source-specific gate."
      ],
      [
        "Validate ingress and downstreams",
        "Combine RPF, TTL and supplied OIL/local demand/readiness."
      ],
      [
        "Observe actual operation",
        "Inspect target state and original traffic separately; the worksheet sends no PIM message."
      ]
    ],
    "comparison": [
      [
        "ASM shared / source tree",
        "RPF toward supplied RP / RPF toward supplied source",
        "Selecting context does not simulate a transition."
      ],
      [
        "ASM / SSM",
        "May use RP shared and source state / source-specific channel without RP tree",
        "SSM needs the receiver to identify S."
      ],
      [
        "PIM / IGMP",
        "Router routing coordination / attached-LAN receiver signaling",
        "A neighbor is not a host membership record."
      ],
      [
        "Tree state / forwarding",
        "Selected control context / actual data movement",
        "A supplied ready tree does not prove source packets."
      ],
      [
        "RPF route / route to G",
        "Selected reverse-path information / ordinary destination interpretation",
        "The group is not an ordinary unicast host destination."
      ]
    ],
    "example": "The ASM shared baseline declares tree state and RP readiness, matches ingress up-a to the expected up-a, and has TTL eight plus two downstream demands. It yields two hypothetical copies toward the local receiver LANs. On source-tree, changing rpReady to false does not remove the copies because that selected context points toward source 192.0.2.10. The SSM preset also ignores RP readiness but requires source-specific demand. If sourceSpecific is false, its selected-context gate fails despite an otherwise matching RPF declaration. These outcomes explain supplied contexts and establish no live switchover or transmission.",
    "commands": [
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip pim neighbor'",
        "explanation": "Inspect observed PIM neighbors.",
        "expected": "GUIDED, NOT EXECUTED: Record real neighbors per interface; a neighbor line does not prove this channel has a tree."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip pim rp-info'",
        "explanation": "Inspect target RP mappings.",
        "expected": "GUIDED, NOT EXECUTED: Record actual group mapping and context; this is an ASM/shared investigation, not an SSM RP requirement."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip pim rpf'",
        "explanation": "Inspect actual RPF information for used channels.",
        "expected": "GUIDED, NOT EXECUTED: Record source/group, selected lookup information and interface without deriving RPF from a destination group lookup."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip mroute'",
        "explanation": "Inspect installed kernel multicast route state.",
        "expected": "GUIDED, NOT EXECUTED: Record actual incoming and outgoing interfaces and correlate with exact-channel evidence; no live packet result is asserted."
      }
    ],
    "configuration": "For a prepared FRR stable 8.4 lab, review interface PIM participation, underlying route availability, group classification and receiver IGMP separately. ASM requires a consistent reviewed RP design for the relevant shared group range; SSM should be classified with the intended source-specific range and receiver source subscription. Do not copy an ASM RP requirement into SSM as a generic fix. Preserve existing mappings, routing context and baseline state before change control. The four supplied command groups are read-only, and the worksheet executes no configuration, Join, Register or routing daemon operation.",
    "ports": "All PIM control messages use IP protocol number 103. Link-local multicast messages, including Hello and Join/Prune, use IPv4 all-PIM-routers 224.0.0.13 with local hop scope; Register and Register-Stop are examples of unicast PIM messages. Protocol 103 is not TCP or UDP port 103. The actual multicast payload uses the protocol and port chosen by the application.",
    "production": "Maintain a source/group and RP map for ASM alongside the permitted SSM channel list. Document first-hop, transit and last-hop roles, route sources used for RPF, group boundaries and target versions. Capture state before a routing change and correlate changes across routers after it. Review control-plane scale, neighbor dependencies and failure recovery with actual timed observations. This static declaration exercise cannot estimate convergence, duplicate suppression or the interval during which a switchover affects receiver traffic.",
    "troubleshooting": [
      [
        "Symptom",
        "Receivers request the group, but the expected routed stream is absent."
      ],
      [
        "Hypotheses",
        "Wrong selected tree context, missing RP dependency for shared ASM, missing SSM source-specific request, failed RPF, missing tree/OIL or a silent source."
      ],
      [
        "Test",
        "Inspect actual PIM neighbors, RP mapping, channel RPF and installed multicast routes in the same VRF."
      ],
      [
        "Observation",
        "Record which output proves each layer and whether it describes shared or source state."
      ],
      [
        "Conclusion / next test",
        "Isolate the failed dependency and correlate source traffic before treating membership as routing proof."
      ],
      [
        "Fix and verify",
        "Apply an owned target-specific change, repeat state observations and verify the original receiver service."
      ]
    ],
    "security": "Protect the router control plane and multicast boundaries from unauthorized joins, source injection and excessive state creation. A source-specific subscription identifies a requested source but does not cryptographically authenticate datagrams. Review RP ownership and group-range policy, constrain permitted control traffic and redact topology evidence when sharing. The worksheet never grants application access; its declaration fields are not credentials or a substitute for source identity and content security.",
    "performance": "Measure channel scale, OIL fanout, control-plane state and actual downstream packet rates on the target. Separate routing convergence from application buffering and loss recovery. RP and source-tree context can have different operational paths, but this worksheet does not rank their latency or decide a switchover policy. A selected-context ready result is only a logical combination of supplied gates; no throughput, packet duplication, CPU cost or live convergence metric is produced.",
    "mistakes": [
      "Interpreting protocol independent as independent of all route information.",
      "Looking up the group as a unicast destination to determine RPF.",
      "Requiring RP readiness for every SSM channel.",
      "Treating selected source context as a simulated SPT transition.",
      "Assuming an IGMP host record proves a PIM neighbor or installed tree.",
      "Calling a declaration worksheet a live multicast test."
    ],
    "interactive": "pim",
    "lab": {
      "objective": "Explain selected ASM shared, ASM source and SSM source contexts and their independent declared gates.",
      "requirements": "Browser-local selected-state tabletop only. Optional FRR 8.4 observations require a prepared authorized router, known VRF and exact source/group. No PIM message or target command was executed.",
      "topology": [
        "Source 192.0.2.10",
        "ASM RP context 192.0.2.254 for 239.1.1.1",
        "SSM channel (192.0.2.10,232.1.1.1)",
        "One router with up-a/up-b and two local receiver LANs"
      ],
      "steps": [
        "Load baseline, record the selected shared context and explain why its RPF target is the supplied RP. Name the independent tree and RP readiness declarations.",
        "Compare source-tree and source-no-rp. Explain why the selected source context retains its copies without using the RP gate; do not describe this selection as a live tree switch.",
        "Load ssm and no-source-specific. Identify the source and group and explain the source-specific receiver requirement without inventing an RP dependency.",
        "Load no-tree, no-rpf-route and wrong-rpf. Separate the supplied selected state, route availability and actual ingress comparison, even when their copy counts are identical.",
        "Load ttl-one, empty-oil and no-member. Identify the precise hop or downstream gate behind each result and explain the fixed local-receiver topology.",
        "Compare source-silent and app-not-ready with baseline. Keep hypothetical forwarding separate from original service readiness.",
        "On a prepared target only, use the four guided read-only groups. Record target context, actual observations and any missing evidence. Then correlate the original stream with independent source and receiver measurements."
      ],
      "verification": "Report the selected tree, RPF target, context gates, RPF ingress/route, TTL and downstream declarations separately. A live claim requires actual output and traffic evidence. No FSM, transition or routing installation is simulated.",
      "troubleshooting": "If the tree context is incompatible with SSM, output hides until corrected. Check context-specific dependencies before treating an RP or source route as universally required. Unknown scenario IDs remain invalid after later field changes; reset returns to baseline.",
      "challenge": "Why can rpReady false block selected ASM shared context yet leave SSM and an ASM source context unchanged? What real evidence would establish when a router switched from a shared tree to a source tree?",
      "cleanup": "Reset affects local controls only. Guided show commands change no PIM state. No Join, Prune, Assert, Register, daemon, packet stream or learner progress was created.",
      "topologyKind": "shared"
    },
    "quick": [
      {
        "testedConcept": "Context",
        "question": "Where does RPF point in this selected ASM shared context?",
        "answer": "Toward supplied RP 192.0.2.254.",
        "explanation": "The selected context determines the reverse-path target.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-QC1"
      },
      {
        "testedConcept": "SSM",
        "question": "Does an SSM source tree need this RP readiness gate?",
        "answer": "No.",
        "explanation": "It requires source-specific receiver demand and source context.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-QC2"
      },
      {
        "testedConcept": "Model limits",
        "question": "Does selecting source context simulate a PIM switchover?",
        "answer": "No.",
        "explanation": "Tree selection is supplied settled context, not an FSM.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-QC3"
      }
    ],
    "exams": [
      {
        "testedConcept": "Protocol independence",
        "question": "What does protocol independent mean in PIM?",
        "answer": "It can use underlying route information without requiring one particular unicast routing protocol",
        "options": [
          "It can use underlying route information without requiring one particular unicast routing protocol",
          "It needs no RPF route information",
          "It forwards independently of all interfaces",
          "It authenticates every source"
        ],
        "explanation": "Route information remains a dependency.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q01"
      },
      {
        "testedConcept": "Shared RPF",
        "question": "The worksheet selects ASM shared context. Which target is used?",
        "answer": "Supplied RP 192.0.2.254",
        "options": [
          "The receiver application port",
          "Supplied RP 192.0.2.254",
          "The multicast destination as an ordinary unicast host",
          "Always source 192.0.2.10"
        ],
        "explanation": "The supplied shared context points toward RP.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q02"
      },
      {
        "testedConcept": "Source RPF",
        "question": "The worksheet selects ASM source context. Which target is used?",
        "answer": "Source 192.0.2.10",
        "options": [
          "The group MAC address",
          "The IGMP querier election winner",
          "Source 192.0.2.10",
          "Always the RP"
        ],
        "explanation": "The selected source context points toward S.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q03"
      },
      {
        "testedConcept": "SSM RP",
        "question": "SSM source context is ready and source-specific demand is true, but rpReady is false. What follows?",
        "answer": "The unused RP gate does not block this context",
        "options": [
          "Every SSM route requires an RP",
          "The group changes to ASM automatically",
          "A live Register was transmitted",
          "The unused RP gate does not block this context"
        ],
        "explanation": "SSM does not use a shared RP tree.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q04"
      },
      {
        "testedConcept": "SSM receiver",
        "question": "Which missing declaration blocks the SSM selected-context gate?",
        "answer": "Source-specific receiver demand",
        "options": [
          "Source-specific receiver demand",
          "Unused RP readiness",
          "An ASM shared-tree mapping",
          "A TCP 103 session"
        ],
        "explanation": "SSM reception identifies a source.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q05"
      },
      {
        "testedConcept": "Tree state",
        "question": "Both local receiver LANs are interested but treeState is false. What follows?",
        "answer": "The supplied selected-context gate fails",
        "options": [
          "The RP number becomes zero",
          "The supplied selected-context gate fails",
          "IGMP creates tree state automatically in this model",
          "The application is guaranteed to receive"
        ],
        "explanation": "Demand and selected tree state remain independent.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q06"
      },
      {
        "testedConcept": "Ingress",
        "question": "RPF route exists but actual ingress differs from expected. What does the limited model declare?",
        "answer": "No hypothetical routed copy passes RPF",
        "options": [
          "The source changes address",
          "Every router globally withdraws the group",
          "No hypothetical routed copy passes RPF",
          "The OIL bypasses all ingress checks"
        ],
        "explanation": "RPF checks selected incoming context.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q07"
      },
      {
        "testedConcept": "Control protocol",
        "question": "Which statement about PIM control is correct?",
        "answer": "PIM uses IP protocol 103; link-local multicast control uses 224.0.0.13",
        "options": [
          "PIM uses TCP port 103 for every message",
          "Every PIM message is multicast to the group payload address",
          "PIM is a UDP application on port 179",
          "PIM uses IP protocol 103; link-local multicast control uses 224.0.0.13"
        ],
        "explanation": "Some PIM messages are unicast, and protocol numbers are not transport ports.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q08"
      },
      {
        "testedConcept": "Selected snapshot",
        "question": "What does the source-tree selector establish in this worksheet?",
        "answer": "A supplied selected context, without computing a tree transition",
        "options": [
          "A supplied selected context, without computing a tree transition",
          "Observed SPT switchover timing",
          "A transmitted Join/Prune sequence",
          "A kernel installation result"
        ],
        "explanation": "No PIM FSM is implemented.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q09"
      },
      {
        "testedConcept": "Current references",
        "question": "Which reference relationship is accurate?",
        "answer": "RFC 9436 updates PIM specifications and obsoletes RFC 8736",
        "options": [
          "FRR 8.4 proves all future PIM defaults",
          "RFC 9436 updates PIM specifications and obsoletes RFC 8736",
          "RFC 8736 obsoletes RFC 9436",
          "RFC 7761 is an IGMPv3 specification"
        ],
        "explanation": "The lesson preserves the actual update history.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t1",
        "questionId": "s3-g8-t1-Q10"
      }
    ],
    "glossary": {
      "PIM": "Protocol Independent Multicast, router coordination using routing information.",
      "RP": "Rendezvous Point used for ASM shared-tree context.",
      "RPF": "Selected reverse-path ingress validation.",
      "OIL": "Outgoing interface list for potential replication.",
      "SSM": "Source-specific channel without the shared RP tree."
    },
    "prerequisites": [
      "s3-g8-t0",
      "s1-g4-t0",
      "s3-g1-t0"
    ],
    "related": [
      "s3-g8-t2",
      "s3-g8-t0"
    ],
    "sources": [
      {
        "title": "RFC 7761: PIM-SM base specification",
        "url": "https://www.rfc-editor.org/rfc/rfc7761",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8736: historical PIM update superseded by RFC 9436",
        "url": "https://www.rfc-editor.org/rfc/rfc8736",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9436: current message type/flag update, obsoletes RFC 8736",
        "url": "https://www.rfc-editor.org/rfc/rfc9436",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4607: Source-Specific Multicast for IP",
        "url": "https://www.rfc-editor.org/rfc/rfc4607.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRRouting stable 8.4: PIM and IGMP operational show commands",
        "url": "https://docs.frrouting.org/en/stable-8.4/pim.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g8-t2",
    "batch": "10",
    "title": "IGMP",
    "subtitle": "Combine settled local receiver filters without inventing report, timer or querier behavior.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "definition": "Internet Group Management Protocol communicates IPv4 receiver membership information between systems and multicast routers on an attached network. IGMPv3 adds source filtering so a receiver can request traffic from a listed source set or from all sources except a listed set. RFC 9776 is the current IGMPv3 specification used here: it obsoletes RFC 3376 and updates RFC 2236. This lesson treats two already-settled host filters as supplied state; it does not implement how reports, queries, compatibility modes or timers produce that state.",
    "purpose": "Use IGMP to explain local receiver demand while keeping multicast routing, source transmission and application authorization separate. A receiver can be interested in group G without any source currently sending, and a source filter can request one channel without proving that the router has a usable path. The goal is to read INCLUDE and EXCLUDE accurately, combine multiple receivers on one LAN, and identify the evidence still needed for a live service. A report capture, router record and receiver application observation answer different questions and should not be collapsed into one healthy label.",
    "mental": "Give each of two hosts a card naming the same group and its settled filter. INCLUDE lists wanted sources. EXCLUDE lists unwanted sources, so an empty EXCLUDE list requests every source in the worksheet universe. For each source, ask whether at least one usable host card requests it; that is the attached LAN demand union. Check the card validity and explicitly declared timer liveness before using it. A missing querier observation does not erase the cards instantly. The source still needs to transmit, and the receiver application still needs separate evidence.",
    "components": [
      "The local scope is one attached receiver LAN and two supplied host records, A and B. Both records describe the selected demonstration group: 239.1.1.1 for ASM or 232.1.1.1 for SSM. The worksheet universe contains only sources 192.0.2.10 and 192.0.2.20. Restricting the universe makes settled acceptance visible, but it is not a statement that IGMP permits only two source addresses or that these documentation addresses identify assigned production senders.",
      "INCLUDE mode requests only the listed sources. An empty INCLUDE set requests none of the worksheet sources. EXCLUDE mode requests sources absent from the listed set. An empty EXCLUDE set therefore requests both worksheet sources. EXCLUDE containing .10 requests .20 in this bounded universe. These are receiver filter meanings, not firewall rules, source authentication or complete router forwarding decisions.",
      "Receiver demand on the attached LAN is a union of usable host acceptance. If host A excludes .10 but host B includes .10, the LAN still has demand for .10 because B wants it. Do not intersect every host request and thereby silence a receiver that remains interested. A real multicast router maintains aggregate group and source records with protocol rules; the worksheet compares supplied settled host demand rather than synthesizing those router records.",
      "Each host card has recordValid and timerLive declarations. Both must hold before that card contributes to the local union. Declaring timerLive false removes that supplied host demand in this exercise; it does not model a particular source timer or group timer transition. IGMP router timers have different meanings in INCLUDE and EXCLUDE state. There is no clock, report arrival, leave-processing sequence or automatic expiry calculation in this worksheet.",
      "QuerierPresent records whether a querier is currently observed. It does not itself decide whether a supplied settled record is live. Real queries and timer procedures refresh and age protocol state over time; absence of one observed query is not evidence that every record expired immediately. The no-querier scenario deliberately retains explicit live records to expose this distinction. A live investigation must measure the target timer and protocol history rather than infer time from a checkbox.",
      "SSM requires source-specific reception. For an SSM group this worksheet allows only INCLUDE host reporting to contribute demand, following source-specific guidance; an EXCLUDE card is shown as incompatible with that reporting requirement and contributes none. The mode is an explicit service constraint, not an application authentication step. Group-only reception does not identify an SSM channel, and an RP dependency should not be added as a substitute for an identified source.",
      "IGMP and switch snooping are related but separate. A switch may inspect membership exchanges to constrain Layer 2 replication, while a router uses receiver information alongside multicast routing state. This exercise simulates neither snooping tables nor unknown-multicast behavior, router ports or fast-leave policy. It also does not compute compatibility with older queriers. Evidence about local host demand must be kept distinct from evidence about a switch path or a routed multicast tree."
    ],
    "mechanism": [
      "Select the group service model and record both supplied settled host filters. Choose INCLUDE or EXCLUDE explicitly and list only exact worksheet source addresses. Source duplicates collapse into sets and input order has no effect. The local limit of eight supplied entries per host before deduplication bounds this teaching input; it is not an IGMP packet or network protocol maximum.",
      "Validate each host card separately. Strict booleans are required for record validity and timer liveness, and malformed source lists or unknown modes hide output. An invalid record is a supplied declaration rather than a parser error; it is displayed but contributes no accepted sources. Sparse arrays, extra fields and coerced values are rejected at the model API boundary.",
      "Apply the selected service constraint. In ASM, valid live INCLUDE and EXCLUDE cards use their respective settled filter meanings. In SSM, only a valid live INCLUDE card contributes to demand. The output explicitly names EXCLUDE incompatibility instead of pretending it created an ASM-like SSM request or silently changing the group.",
      "Compute acceptance for .10 and .20 on each usable card, then combine acceptance with OR across hosts. This local union answers whether someone on the attached LAN requests a source. It does not establish a PIM join, an outgoing routed interface, a multicast forwarding cache or an application socket actually receiving content.",
      "Keep querier observation, original source readiness and application readiness in their own output. The scoped source-.10 readiness conclusion requires local demand for .10 plus the two readiness declarations. It measures nothing. On a prepared FRR target, inspect IGMP interfaces, groups, sources and statistics, then correlate actual reports and timer state with source traffic and the original receiver transaction."
    ],
    "flow": [
      [
        "Read settled host cards",
        "Choose INCLUDE/EXCLUDE and exact source sets for the selected group."
      ],
      [
        "Check explicit record gates",
        "Require validity and timer liveness; SSM demand requires INCLUDE reporting."
      ],
      [
        "Combine local acceptance",
        "OR the usable host acceptance independently for each worksheet source."
      ],
      [
        "Collect actual evidence",
        "Inspect IGMP state and original source/application behavior separately."
      ]
    ],
    "comparison": [
      [
        "INCLUDE / EXCLUDE",
        "Request listed sources / request sources not listed",
        "Empty lists have opposite meanings."
      ],
      [
        "Host acceptance / LAN demand",
        "One host filter / union across usable hosts",
        "One host exclusion does not cancel another host request."
      ],
      [
        "Querier observation / timer liveness",
        "Observed control role / supplied settled record condition",
        "No querier does not imply instant expiry."
      ],
      [
        "IGMP / PIM",
        "Attached-LAN receiver signaling / routing between routers",
        "A group record does not prove a routed tree."
      ],
      [
        "Membership / authorization",
        "Receiver interest / permission to consume content",
        "IGMP is not an application credential."
      ]
    ],
    "example": "In baseline ASM, host A is valid and live with INCLUDE {.10}; host B is valid and live with INCLUDE {.20}. The attached LAN therefore requests both worksheet sources. If A changes to EXCLUDE {.10} and B requests no sources, only .20 remains requested. If B instead includes .10, its interest restores .10 to the union despite A excluding it. Turning querierPresent off preserves this supplied settled demand while leaving timer liveness explicit. In SSM, EXCLUDE does not contribute to this modeled source-specific receiver demand. None of those calculations proves a source emitted a datagram.",
    "commands": [
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip igmp interface'",
        "explanation": "Inspect IGMP interface/version and operational context.",
        "expected": "GUIDED, NOT EXECUTED: Record actual attached LAN and target state, including observed querier context where shown; no timer history is invented."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip igmp groups'",
        "explanation": "Inspect actual router group records.",
        "expected": "GUIDED, NOT EXECUTED: Record exact group and actual state/timers; these aggregate router records are not the worksheet host cards."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip igmp sources'",
        "explanation": "Inspect actual IGMP source records.",
        "expected": "GUIDED, NOT EXECUTED: Correlate exact group/source and displayed state with target version; do not infer acceptance from one list without its mode/context."
      },
      {
        "platform": "FRRouting stable 8.4 · read-only guided command; not executed here",
        "code": "vtysh -c 'show ip igmp statistics'",
        "explanation": "Inspect IGMP protocol statistics.",
        "expected": "GUIDED, NOT EXECUTED: Record counters and observation interval; report counts do not establish source traffic or application authorization."
      }
    ],
    "configuration": "On a prepared isolated FRR stable 8.4 receiver LAN, review ip igmp interface participation and the intended version alongside PIM and group classification. FRR documents v2/v3 controls and a v3 default for that target version, but the actual effective interface configuration must be inspected. Static join configuration represents an explicit local join and must not be confused with an observed host report. Preserve baseline group/source/timer observations before changing anything. This lesson does not configure a join, generate a query, force a leave or alter report compatibility.",
    "ports": "IGMP is IP protocol number 2, not TCP or UDP port 2. General Queries use IPv4 all-systems 224.0.0.1; group-specific and group-and-source-specific queries use the group of interest. IGMPv3 Reports use 224.0.0.22. Historically IGMPv2 membership reports are sent to the reported group and v2 Leave Group messages to 224.0.0.2; those are version-specific behavior, not the destination for every current report. The worksheet sends none of these messages.",
    "production": "Document receiver LANs, effective IGMP version, querier ownership, group model and intended source filters. Keep host socket interest, router aggregate state and switch snooping observations distinct. During a receiver outage, record actual timer values and timestamps before concluding state aged out. Include source selection and authorization for the original application in the service runbook. For SSM, make source discovery or configuration explicit at the application layer; IGMP receiver demand does not discover a trusted sender automatically.",
    "troubleshooting": [
      [
        "Symptom",
        "A receiver requests a group but receives no intended source, or a LAN receives an unwanted source."
      ],
      [
        "Hypotheses",
        "Wrong INCLUDE/EXCLUDE interpretation, another receiver demand, missing validity/liveness, incompatible SSM reporting, absent source traffic or a separate routing/snooping/application issue."
      ],
      [
        "Test",
        "Inspect actual IGMP interface, group, source and statistic observations on the prepared target."
      ],
      [
        "Observation",
        "Record mode, source set, group, timer and timestamp together; one missing query is not instant-expiry evidence."
      ],
      [
        "Conclusion / next test",
        "Separate local demand from routed delivery, then inspect the first unproven dependency."
      ],
      [
        "Fix and verify",
        "Change only the owned host/filter or network dependency through change control and verify the original receiver service."
      ]
    ],
    "security": "Receiver membership requests generally do not authenticate a user or source. Enforce application access, source integrity and multicast boundaries independently. Consider resource exhaustion from excessive group or source state and apply supported target policy limits. Treat reported source addresses as requested identities, not cryptographic evidence. The browser source lists contain documentation addresses and confer no permission; a positive local demand union establishes neither authorized content access nor actual packet origin.",
    "performance": "Measure host and router group/source scale, report/query load and actual receiver loss under the intended workload. Membership records can exist while traffic rate is zero. Timer choices affect protocol responsiveness and state maintenance, but this settled worksheet cannot estimate timer convergence or compatibility-mode delays. Switch replication and application buffering need separate measurements. The union calculation over two sources is an explanatory bounded result, not a throughput, snooping efficiency or router capacity model.",
    "mistakes": [
      "Treating INCLUDE empty and EXCLUDE empty as the same request.",
      "Intersecting all host requests instead of keeping demand from any usable receiver.",
      "Assuming no querier instantly expires every settled record.",
      "Treating router EXCLUDE timers as a simple host timer simulation.",
      "Using group-only or EXCLUDE reporting to invent SSM source-specific demand.",
      "Calling membership an application credential or proof of source packets."
    ],
    "interactive": "igmp",
    "lab": {
      "objective": "Explain settled receiver filter acceptance and attached-LAN union over two fixed sources while preserving explicit record and service declarations.",
      "requirements": "Browser-local two-host tabletop. Optional FRR 8.4 observations require a prepared authorized receiver LAN and known group/VRF. No query, report, leave or target command was executed.",
      "topology": [
        "One attached receiver LAN",
        "Host A settled INCLUDE/EXCLUDE record",
        "Host B settled INCLUDE/EXCLUDE record",
        "Sources 192.0.2.10 and 192.0.2.20; ASM 239.1.1.1 or SSM 232.1.1.1"
      ],
      "steps": [
        "Load baseline and explain each host request before computing the union. Record that the source addresses name requested senders rather than packets observed at the receiver.",
        "Compare include-empty and exclude-empty. Write the meaning of each empty set explicitly so a visual empty input is not mistaken for identical demand.",
        "Load exclude-one and union. Explain why a second host can request a source that the first excludes; this is local demand, not a computed router filter-mode transition.",
        "Load record-invalid and timer-expired. Identify the explicit host gate that removes A demand and keep protocol parser errors separate from these supplied states.",
        "Compare no-querier with baseline. Demand remains because timer liveness was supplied; describe the target evidence needed to conclude an actual record expired.",
        "Compare ssm and ssm-exclude. Explain the source-specific INCLUDE reporting requirement and identify which card is incompatible.",
        "Load source-silent and app-not-ready, then enter a malformed source list. Observe independent readiness and immediate hiding of stale results; use keyboard reset to restore baseline.",
        "On a prepared target only, inspect the four show groups and correlate actual IGMP state with host reports, timestamps and original traffic. Do not replace missing output with the worksheet result."
      ],
      "verification": "Report usable host cards, their accepted source sets and attached-LAN union separately from querier observation and source/application readiness. Label every timer assertion as supplied or measured. Actual service claims need independent evidence.",
      "troubleshooting": "If a source is missing from demand, check mode/set, validity, liveness and SSM compatibility per host. If demand exists but service fails, investigate source, routing, switching and application evidence outside this model. Unknown scenario selections remain invalid after later edits.",
      "challenge": "Can one host exclude .10 while the LAN still requests .10? Can no querier be observed while settled records remain live? Explain both without inventing protocol timing.",
      "cleanup": "Reset affects local controls only. Guided show commands are read-only. No query, report, leave, source stream, snooping table or learner progress was changed.",
      "topologyKind": "shared"
    },
    "quick": [
      {
        "testedConcept": "Empty filters",
        "question": "What does INCLUDE empty request?",
        "answer": "None of the worksheet sources.",
        "explanation": "INCLUDE requests only listed sources.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-QC1"
      },
      {
        "testedConcept": "Union",
        "question": "A excludes .10 but B includes .10. Is there LAN demand for .10?",
        "answer": "Yes, if B is valid and live.",
        "explanation": "Any usable host request contributes to the union.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-QC2"
      },
      {
        "testedConcept": "Timer scope",
        "question": "Does observing no querier instantly expire these supplied records?",
        "answer": "No.",
        "explanation": "Timer liveness is explicit; no timer or querier FSM is simulated.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-QC3"
      }
    ],
    "exams": [
      {
        "testedConcept": "INCLUDE",
        "question": "A usable host has INCLUDE {.10}. Which worksheet source does it request?",
        "answer": "Only 192.0.2.10",
        "options": [
          "Only 192.0.2.10",
          "Only 192.0.2.20",
          "Both because INCLUDE means every source",
          "Neither because IGMP cannot filter sources"
        ],
        "explanation": "Only listed sources are requested.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q01"
      },
      {
        "testedConcept": "INCLUDE empty",
        "question": "What does a valid live INCLUDE {} card accept?",
        "answer": "Neither worksheet source",
        "options": [
          "Every source except .20",
          "Neither worksheet source",
          "Both sources",
          "Only whichever source arrived last"
        ],
        "explanation": "An empty wanted list requests none.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q02"
      },
      {
        "testedConcept": "EXCLUDE empty",
        "question": "What does a valid live ASM EXCLUDE {} card accept?",
        "answer": "Both worksheet sources",
        "options": [
          "Only .10",
          "Only the querier address",
          "Both worksheet sources",
          "Neither source"
        ],
        "explanation": "No sources are excluded in this bounded universe.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q03"
      },
      {
        "testedConcept": "Union",
        "question": "A excludes .10 and B includes .10; both cards are usable in ASM. What is LAN demand for .10?",
        "answer": "Present because B requests it",
        "options": [
          "Absent because any host exclusion is global",
          "Unknown until an RP authenticates the source",
          "An observed source packet rate",
          "Present because B requests it"
        ],
        "explanation": "The settled local demand is a union.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q04"
      },
      {
        "testedConcept": "Validity",
        "question": "Host A requests .10 but recordValid is false; B requests only .20. Which demand remains?",
        "answer": "Only .20",
        "options": [
          "Only .20",
          "Both because the invalid record wins",
          "Only .10 because it is listed first",
          "No source can be requested by B"
        ],
        "explanation": "Only usable records contribute.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q05"
      },
      {
        "testedConcept": "Explicit timer",
        "question": "What does timerLive false mean here?",
        "answer": "That supplied host card contributes no demand; no expiry sequence is simulated",
        "options": [
          "A querier election completed",
          "That supplied host card contributes no demand; no expiry sequence is simulated",
          "A live target timer was measured",
          "Every LAN group is globally deleted"
        ],
        "explanation": "This is an explicit settled declaration.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q06"
      },
      {
        "testedConcept": "Querier",
        "question": "QuerierPresent becomes false while both supplied records remain valid and live. What happens to demand?",
        "answer": "It remains unchanged in this settled worksheet",
        "options": [
          "The router switches to PIM shared tree",
          "The application is authorized",
          "It remains unchanged in this settled worksheet",
          "All records expire immediately"
        ],
        "explanation": "Querier observation does not infer time.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q07"
      },
      {
        "testedConcept": "SSM reporting",
        "question": "Which host filter contributes source-specific demand for the worksheet SSM group?",
        "answer": "A valid live INCLUDE record identifying sources",
        "options": [
          "EXCLUDE empty as an all-source SSM subscription",
          "Only a group-only IGMPv2 leave",
          "An RP mapping without a source",
          "A valid live INCLUDE record identifying sources"
        ],
        "explanation": "SSM demand identifies S and G.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q08"
      },
      {
        "testedConcept": "Protocol scope",
        "question": "Which destination is used for IGMPv3 Reports?",
        "answer": "224.0.0.22",
        "options": [
          "224.0.0.22",
          "224.0.0.13 for all reports",
          "The RP unicast address for every report",
          "TCP port 2"
        ],
        "explanation": "IGMP is IP protocol 2 and current v3 reports use the router-listener group.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q09"
      },
      {
        "testedConcept": "Current specification",
        "question": "Which statement reflects the current IGMPv3 source used here?",
        "answer": "RFC 9776 obsoletes RFC 3376 and updates RFC 2236",
        "options": [
          "RFC 9776 is only a switch snooping algorithm",
          "RFC 9776 obsoletes RFC 3376 and updates RFC 2236",
          "RFC 3376 obsoletes RFC 9776",
          "RFC 7761 is the IGMPv3 specification"
        ],
        "explanation": "The lesson uses the current specification and labels older behavior historically.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "topicId": "s3-g8-t2",
        "questionId": "s3-g8-t2-Q10"
      }
    ],
    "glossary": {
      "IGMP": "Attached-network IPv4 receiver membership signaling.",
      "INCLUDE": "Request reception only from listed sources.",
      "EXCLUDE": "Request reception from sources not listed.",
      "Querier": "Router control role issuing membership queries on an attached network.",
      "SettledRecord": "Supplied host filter with explicit validity/liveness, without report/timer processing."
    },
    "prerequisites": [
      "s3-g8-t0",
      "s1-g1-t0",
      "s1-g2-t0"
    ],
    "related": [
      "s3-g8-t1",
      "s3-g8-t0"
    ],
    "sources": [
      {
        "title": "RFC 9776: current IGMPv3 specification; obsoletes RFC 3376 and updates RFC 2236",
        "url": "https://www.rfc-editor.org/rfc/rfc9776",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4604: IGMPv3 source-specific reporting and SSM-aware host/router guidance",
        "url": "https://www.rfc-editor.org/rfc/rfc4604",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2236: historical IGMPv2 reports and Leave Group behavior",
        "url": "https://www.rfc-editor.org/rfc/rfc2236",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4607: Source-Specific Multicast for IP",
        "url": "https://www.rfc-editor.org/rfc/rfc4607.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRRouting stable 8.4: PIM and IGMP operational show commands",
        "url": "https://docs.frrouting.org/en/stable-8.4/pim.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "commands": [
      {
        "code": "tc -s qdisc show dev \"$QOS_DEV\"",
        "explanation": "Set QOS_DEV separately to the exact interface of an exclusively owned, already prepared context. Inspect qdisc identity and statistics without changing policy.",
        "expected": "GUIDED, NOT EXECUTED: Preserve the actual root/child handles, qdisc types and counters. A counter snapshot is not a measured original application result.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -s class show dev \"$QOS_DEV\"",
        "explanation": "Inspect existing classes and their available statistics on the same mapped interface. An empty class listing can be valid for a classless qdisc.",
        "expected": "GUIDED, NOT EXECUTED: Correlate class handles with the qdisc hierarchy and actual configured rates; do not manufacture a class for every worksheet row.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc filter show dev \"$QOS_DEV\"",
        "explanation": "Inspect filters in this mapped context. Additional parent or ingress context may be needed for the actual deployment.",
        "expected": "GUIDED, NOT EXECUTED: Record what the command actually lists and identify the hook/hierarchy before interpreting a missing filter. This command does not create classification or marking.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -d -s qdisc show dev \"$QOS_DEV\"\ntc -d -s class show dev \"$QOS_DEV\"",
        "explanation": "Use the documented detail and statistics options for a second read-only view. Compare the same interface, namespace and observer context.",
        "expected": "GUIDED, NOT EXECUTED: Inspect actual parameter details and cumulative counters. No supplied output, kernel scheduling trace or packet capture is claimed.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      }
    ],
    "configuration": "Use the browser for the tabletop calculations. Optional command inspection requires an exclusively owned, already configured Linux context, a mapped interface name, correct network namespace and a known traffic-control hierarchy. Set QOS_DEV outside the supplied commands to that exact interface. The iproute2 v6.6.0 manual is a pinned syntax reference; installed binaries, kernel support, hardware offload and distribution packaging must be checked at the actual target. No qdisc add, change, replace, delete, filter mutation, packet generator or namespace creation is supplied. Record the existing policy and observer context before any separately authorized experiment. A browser preset is an input declaration and cannot configure a Linux interface.",
    "production": "Place each observation at a named interface and direction. The local egress device, an ingress redirect target, an upstream switch and a remote provider can have different congestion points. Confirm which resource is constrained before choosing a rate or scheduler. Preserve the original application, endpoint, route, return path and observation interval when comparing results. A favorable local worksheet result does not establish receiver performance or an SLA. Deployments also need ownership, change control, independent management and a recovery baseline. The optional read-only commands describe an existing object; absent objects, offloaded counters or a different namespace need investigation rather than an assumed default policy.",
    "security": "Treat class and marking declarations as policy inputs, not proof of trusted traffic. An endpoint can request a preferred DSCP without being entitled to it. Establish a trust boundary and validate or remark traffic according to the actual administrative policy. Limit changes to authorized interfaces and protect management traffic independently. Packet or counter evidence can expose endpoint identities and workload patterns, so preserve only necessary context. This worksheet accepts bounded numeric declarations and inert text; it does not authenticate a flow, configure a filter or protect a device. A priority label alone is not a security boundary.",
    "performance": "The calculations use exact declared units and ideal local arithmetic. They omit framing overhead, interpacket gaps, segmentation, retransmissions, clock granularity, driver queues, device offload and competing unlisted traffic. These omissions are explicit scope limits, not estimates of zero cost. Fractional milliseconds are retained internally and rounded only for display. Serialization concerns one selected link; propagation and application response time remain separate. Compare actual counters and application evidence over a known interval before drawing a performance conclusion. The independent application-readiness checkbox expresses context only and cannot turn model arithmetic into an observed service result.",
    "id": "s3-g9-t0",
    "title": "QoS fundamentals",
    "subtitle": "Compare declared demand and local link capacity before choosing a policy.",
    "interactive": "qos-fundamentals",
    "definition": "Quality of Service is a collection of mechanisms for handling traffic according to an administrative policy when resources are shared. Classification identifies traffic, marking communicates treatment intent, metering compares traffic with a profile, and queues and schedulers organize service. RFC 3290 describes a conceptual differentiated-services model rather than a universal device implementation. This topic begins with a smaller question: how do three declared aggregate rates compare with one supplied local capacity, and how long would one packet take to serialize on that ideal link?",
    "purpose": "Use a capacity comparison to make the constraint visible before debating priority, policing or shaping. Voice, interactive and bulk are workload labels here; none automatically receives a queue or a reservation. A supplied demand below capacity is arithmetic headroom, not evidence that the application succeeds. A supplied demand above capacity identifies an aggregate excess under this declaration, not which packet will be dropped. The later worksheets introduce explicit action and scheduling contracts. Keeping those questions separate prevents a traffic label from silently becoming a service guarantee.",
    "mental": "Think of a link as a service resource with a declared bit budget per second. Add the three offered budgets and compare the total with capacity. Next, place one packet on an otherwise ideal serializer and calculate its bit count divided by the same rate. These are two distinct calculations: offered demand is an aggregate rate, while serialization is the duration of one packet. Neither calculation contains a queue, a classifier implementation, a route lookup or an end-to-end transaction.",
    "components": [
      "Capacity C is supplied in bits per second and must be a positive integer. It is not inferred from interface names, negotiated speed or counters. The relevant bottleneck might be somewhere else in a real network. This local worksheet chooses one capacity explicitly so the arithmetic has a known denominator. It does not sum separate physical links or model an oversubscribed fabric.",
      "Voice, interactive and bulk demand are nonnegative integer bits per second. Their sum is the declared total. These labels do not imply packet sizes, burst distributions, admission limits, DSCP values or a preferred service class. A zero declaration means zero modeled offered demand for that label, not a discovery that no actual traffic exists. Traffic outside the three declarations is excluded.",
      "Utilization is total demand divided by capacity. The displayed percentage can exceed 100 percent because the input represents offered demand rather than measured transmitted throughput. At 120 percent, a 10 Mb/s link has 12 Mb/s of supplied demand; it cannot continuously transmit that demand at the stated capacity. This worksheet does not decide how the excess is delayed or discarded.",
      "Overload is max(0, total demand minus capacity), in bits per second. Equal demand and capacity give zero overload but no arithmetic headroom. That equality does not erase bursts, packet overhead or variation in a real application. An overload value is a deficit in the declared budget, not a byte counter, queue occupancy or count of failed voice calls.",
      "One packet size is supplied in bytes. Serialization milliseconds equal packet bytes times 8000 divided by capacity in bits per second. The factor includes eight bits per byte and one thousand milliseconds per second. Changing packet size changes this duration even when aggregate utilization stays fixed. Changing capacity changes both utilization and the serializer duration.",
      "The original application-readiness declaration is independent of all arithmetic. Changing it must not alter demand, overload or serialization. It is a reminder that addressing, routing, return path, transport behavior and endpoint readiness require their own evidence. A checked box is a supplied assumption; the browser performs no probe, voice call, TCP transfer or admission decision."
    ],
    "mechanism": [
      "Validate every supplied field without coercing strings, fractional numbers, NaN or booleans into rates. All demands are integers within the declared bounds, capacity is positive and packet size is positive. There is no fallback to a hidden interface speed when an input is invalid.",
      "Add voice, interactive and bulk demand using their common bits-per-second unit. Record the total before calculating a ratio. For 1,000,000 plus 2,000,000 plus 3,000,000 bits per second, the total is 6,000,000 bits per second regardless of the descriptive workload names.",
      "Divide total by C to obtain utilization and subtract C only when total exceeds it. At C = 10,000,000, the baseline utilization is 0.6 and overload is zero. Increasing bulk to 9,000,000 raises total to 12,000,000, utilization to 1.2 and overload to 2,000,000.",
      "Compute serialization separately from offered demand. A 1500-byte packet contains 12,000 bits and takes 1.2 milliseconds at 10,000,000 bits per second. At 1,000,000 bits per second it takes 12 milliseconds. Those values exclude wait, propagation, framing and any unlisted bottleneck.",
      "Compare below-capacity, equality, overload, idle, slow-link and small-packet presets. The idle preset still has a nonzero serialization duration for the supplied hypothetical packet: zero offered aggregate demand does not mean a physical packet has zero bits.",
      "Interpret the result as a local accounting statement. Classification, DSCP/ECN handling, policing, shaping and scheduling need separate policy definitions. RFC 2474 defines the six-bit DSCP; RFC 3168 defines the remaining two IP DS-field bits for ECN. Neither field increases the local link capacity."
    ],
    "flow": [
      [
        "Declare one local resource",
        "Supply C and three aggregate demands in bits per second."
      ],
      [
        "Compare aggregate budgets",
        "Calculate total, utilization and overload without a scheduling assumption."
      ],
      [
        "Time one packet",
        "Convert bytes to bits and divide by C for serialization only."
      ],
      [
        "Check original context",
        "Keep application readiness and actual performance evidence independent."
      ]
    ],
    "comparison": [
      [
        "Offered demand / transmitted rate",
        "Requested aggregate service / actual observed transmission",
        "An offered utilization above 100 percent does not create extra capacity."
      ],
      [
        "Serialization / queue wait",
        "Time occupying a link / time awaiting service",
        "Only serialization is computed here."
      ],
      [
        "DSCP / ECN",
        "Six-bit treatment codepoint / two-bit congestion signaling field",
        "A mark neither reserves capacity nor proves service."
      ],
      [
        "Arithmetic headroom / application readiness",
        "Local declared budget / original end-to-end context",
        "Neither substitutes for the other."
      ]
    ],
    "example": "With voice 1 Mb/s, interactive 2 Mb/s and bulk 3 Mb/s on a 10 Mb/s link, total demand is 6 Mb/s and utilization is 60 percent. A 1500-byte packet takes 1.2 ms to serialize under the ideal link calculation. Raise bulk to 9 Mb/s and overload becomes 2 Mb/s. The worksheet still cannot say which application loses packets because no packet sequence, queue or action has been supplied. Toggle original application readiness and observe that the numeric results stay the same.",
    "ports": "QoS is not one transport service or port. Applications can use different transports; local classification may inspect fields supported at its actual hook. DSCP and ECN are IP header fields. No socket, classifier or packet is created by this worksheet.",
    "troubleshooting": [
      [
        "Utilization seems impossibly high",
        "Check whether the input is offered demand rather than observed link throughput, and confirm bits versus bytes."
      ],
      [
        "Zero overload but poor application behavior",
        "Inspect bursts, actual bottleneck, route/return context and endpoint evidence; the model computes no queue delay."
      ],
      [
        "Serialization is eight times too small",
        "Verify the bytes-to-bits factor before converting seconds to milliseconds."
      ],
      [
        "A named voice class receives no special result",
        "The label supplies demand only; no service priority is configured by this worksheet."
      ]
    ],
    "mistakes": [
      "Treating six-bit DSCP as a reservation of bandwidth.",
      "Reading offered utilization as measured throughput.",
      "Adding bytes per second to bits per second without conversion.",
      "Combining serialization, propagation and queue wait into one unexplained number."
    ],
    "prerequisites": [
      "s0-g2-t8",
      "s0-g2-t9",
      "s1-g4-t0"
    ],
    "related": [
      "s3-g9-t1",
      "s3-g9-t2",
      "s3-g9-t3",
      "s3-g9-t4",
      "s3-g9-t5"
    ],
    "lab": {
      "objective": "Explain the declared aggregate budget and one packet serialization without inventing a service policy.",
      "requirements": "Browser only for the supplied exercise. Optional guided inspection needs an exclusively owned, already prepared Linux interface with known namespace and policy. There is no live Linux traffic-control execution in this lesson.",
      "topologyKind": "shared",
      "topology": [
        "Declared finite workload → local worksheet → computed rows",
        "Original application readiness: supplied independently",
        "Optional existing Linux interface: inspect only, outside browser calculations"
      ],
      "steps": [
        "Select the baseline and independently sum its three demand rates.",
        "Use the equality and overload presets; explain why utilization can exceed 100 percent.",
        "Compare the slow-link and small-packet presets while holding the other declarations fixed.",
        "Select idle and explain why the hypothetical packet still has a serialization duration.",
        "Toggle application readiness and verify the arithmetic stays unchanged.",
        "Enter an invalid integer and confirm stale output hides until the input is valid again. Separately, select an unknown scenario in a test harness; output must stay hidden through other field edits until a valid scenario or Reset is selected.",
        "Keyboard-focus the named result region and use Reset. Optional inspection is read-only and requires a mapped prepared Linux context."
      ],
      "verification": "Verify the supplied arithmetic row by row, including the units and the exact contract. Independent model tests cover meaningful presets, strict input rejection, unchanged source input, boundary decisions and manually derived timelines. Primary browser review is separate. No test here demonstrates a kernel queue, packet delivery, latency improvement or a live target result.",
      "troubleshooting": "Reset if the selected scenario is invalid. Read the field error and check integer units, packet order and exact enum values. A valid numeric declaration can still describe a poor policy. For optional actual inspection, check interface, namespace, direction and parent hierarchy before interpreting an empty listing.",
      "challenge": "What additional workload and policy declarations would be needed to decide whether the 2 Mb/s excess is queued, shaped or dropped?",
      "cleanup": "Reset restores the first supplied scenario without changing device state or learner progress. The worksheet owns no interface, process, namespace or qdisc. Any separately authorized device experiment must recover its own exact prior baseline."
    },
    "glossary": {
      "Quality of Service": "Administrative mechanisms for traffic treatment on shared resources.",
      "Offered demand": "Traffic service requested by the supplied aggregate rates.",
      "Link capacity": "Declared local service rate in bits per second.",
      "Utilization": "Offered demand divided by declared capacity.",
      "Overload": "Positive amount by which declared demand exceeds capacity.",
      "Serialization": "Time needed to place one packet’s bits on the supplied ideal link.",
      "Differentiated Services Code Point": "Six-bit IP codepoint selecting a per-hop behavior according to policy.",
      "Explicit Congestion Notification": "IP congestion signaling using the two ECN bits with transport participation."
    },
    "exams": [
      {
        "testedConcept": "Aggregate demand",
        "question": "Voice is 1 Mb/s, interactive 2 Mb/s and bulk 3 Mb/s. What is the declared total?",
        "answer": "6 Mb/s.",
        "explanation": "Add the three rates with the same unit; the capacity is not included in the sum.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "3 Mb/s.",
          "6 Mb/s.",
          "10 Mb/s.",
          "12 Mb/s."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q01"
      },
      {
        "testedConcept": "Offered utilization",
        "question": "What does 120 percent utilization mean in this worksheet?",
        "answer": "Declared demand is 1.2 times supplied capacity.",
        "explanation": "The numerator is supplied offered demand, so it can exceed available service.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The link has negotiated 20 percent more speed.",
          "ECN has expanded the serializer rate.",
          "Declared demand is 1.2 times supplied capacity.",
          "The application throughput was measured at 120 percent."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q02"
      },
      {
        "testedConcept": "Overload arithmetic",
        "question": "Total demand is 12 Mb/s and C is 10 Mb/s. What is overload?",
        "answer": "2 Mb/s.",
        "explanation": "Only the positive demand minus capacity difference is overload.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "2 Mb/s.",
          "10 Mb/s.",
          "12 Mb/s.",
          "22 Mb/s."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q03"
      },
      {
        "testedConcept": "Serialization units",
        "question": "A 1500-byte packet on ideal C = 10 Mb/s takes how long to serialize?",
        "answer": "1.2 ms.",
        "explanation": "1500 × 8 / 10,000,000 seconds is 1.2 milliseconds.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0.15 ms.",
          "12 ms.",
          "120 ms.",
          "1.2 ms."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q04"
      },
      {
        "testedConcept": "Equal demand",
        "question": "Total demand equals C. What follows from the supplied arithmetic?",
        "answer": "Overload is zero and arithmetic headroom is zero.",
        "explanation": "Equality removes the arithmetic deficit but supplies no burst or service guarantee.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "There is a one-packet reserved queue.",
          "Overload is zero and arithmetic headroom is zero.",
          "The original application meets its latency target.",
          "Every class receives equal scheduling turns."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q05"
      },
      {
        "testedConcept": "Idle declaration",
        "question": "All demand fields are zero but packetBytes is 1500. Why is serialization nonzero?",
        "answer": "The hypothetical packet still contains bits.",
        "explanation": "The individual hypothetical packet calculation is separate from aggregate offered rates.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The hypothetical packet still contains bits.",
          "A hidden queue adds a minimum delay.",
          "The model assumes background TCP traffic.",
          "DSCP inserts an extra packet."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q06"
      },
      {
        "testedConcept": "DS field",
        "question": "Which division reflects RFC 2474 with RFC 3168 ECN use?",
        "answer": "Six DSCP bits and two ECN bits.",
        "explanation": "The treatment codepoint and ECN occupy different portions of the IP DS field.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Eight DSCP bits and no ECN bits.",
          "Three DSCP bits and five ECN bits.",
          "Six DSCP bits and two ECN bits.",
          "Two DSCP bits and six ECN bits."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q07"
      },
      {
        "testedConcept": "Application context",
        "question": "Changing only applicationReady from true to false should change which result?",
        "answer": "The independent readiness declaration.",
        "explanation": "The declaration does not alter local arithmetic or measure the application.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Total demand.",
          "Packet serialization.",
          "Capacity.",
          "The independent readiness declaration."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q08"
      },
      {
        "testedConcept": "Policy boundary",
        "question": "Which additional model is needed to decide which waiting packet gets service next?",
        "answer": "A scheduler with an explicit selection rule.",
        "explanation": "An aggregate budget contains no packet-selection rule.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "A scheduler with an explicit selection rule.",
          "A DSCP width calculation alone.",
          "The aggregate sum alone.",
          "A TCP port number alone."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q09"
      },
      {
        "testedConcept": "Capacity location",
        "question": "Why map the actual resource before interpreting production QoS?",
        "answer": "Different interfaces and directions may have different congestion points.",
        "explanation": "The local worksheet capacity is declared; actual congestion placement needs evidence.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Every route uses the same egress capacity.",
          "Different interfaces and directions may have different congestion points.",
          "The DSCP value identifies the physical bottleneck.",
          "An interface name determines its actual offered workload."
        ],
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Calculation",
        "question": "For 250,000 + 750,000 + 2,000,000 bps on C = 2,000,000 bps, give total and overload.",
        "answer": "Total 3,000,000 bps; overload 1,000,000 bps.",
        "explanation": "Aggregate rates share a unit; subtract C only for positive excess.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-QC1"
      },
      {
        "testedConcept": "Serialization",
        "question": "Calculate ideal serialization of 200 bytes at C = 1,000,000 bps.",
        "answer": "1.6 milliseconds.",
        "explanation": "200 × 8000 / 1,000,000 = 1.6 ms.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-QC2"
      },
      {
        "testedConcept": "Scope",
        "question": "Name two quantities this worksheet does not calculate.",
        "answer": "Queue wait and end-to-end application response time.",
        "explanation": "A one-link serializer and aggregate demand do not supply either quantity.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t0",
        "questionId": "s3-g9-t0-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 3290 — differentiated services conceptual model",
        "url": "https://www.rfc-editor.org/rfc/rfc3290",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2474 — differentiated services field",
        "url": "https://www.rfc-editor.org/rfc/rfc2474",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3168 — ECN IP field",
        "url": "https://www.rfc-editor.org/rfc/rfc3168",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc manual",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc.8",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g9-t1",
    "batch": "10",
    "title": "Traffic Classification",
    "subtitle": "Apply an explicit header contract to place packets into local traffic classes.",
    "level": "Intermediate → Production",
    "minutes": 40,
    "definition": "Traffic classification is the local decision that associates a packet with a class according to configured match criteria. The differentiated-services field is an eight-bit IPv4 or IPv6 header field. Its upper six bits encode DSCP and lower two bits encode ECN. This lesson models a fixed ordered IPv4/IPv6 transport-header contract supplied by the learner: UDP destination ports 16384–32767 map to voice; TCP destination port 443 maps to interactive; otherwise the class is default. Classification returns a local class and matching rule while leaving incoming DSCP and ECN unchanged.",
    "purpose": "Classification groups traffic so that a later marking or forwarding policy can act on a known local class. The worksheet’s small contract makes rule order and inclusive boundaries visible. It is useful for understanding how a local classifier consumes a protocol and port declaration, but it does not identify an application from a port number alone. A port range is a chosen policy input, not proof that a packet carries a particular application or deserves special treatment.",
    "mental": "Treat the classifier as a short ordered checklist applied to supplied header fields. First, if protocol is UDP and destination port is within the inclusive voice range, return voice. Otherwise, if protocol is TCP and destination port is 443, return interactive. If neither rule matches, return default. The source port is recorded but does not affect these rules. Classification produces a local label. It does not rewrite DSCP or ECN, authenticate an endpoint, inspect payload or schedule a packet.",
    "components": [
      "Protocol: accept exactly tcp, udp or icmp. TCP and UDP port values are integers from 0 through 65535. ICMP has no transport ports, so this worksheet requires source and destination port values of zero for its fixed input contract.",
      "Voice rule: UDP destination ports 16384 through 32767 inclusive map to voice. The explicit endpoints matter: 16383 and 32768 are outside the rule. Source port does not alter the match.",
      "Interactive rule: TCP destination port 443 maps to interactive only after the earlier UDP test fails. A UDP packet to port 443 does not match this rule because protocol is part of the predicate.",
      "Default rule: every valid supplied header that matches neither earlier rule maps to default. This is a local example, not a requirement that production policies use this same class.",
      "DSCP and ECN: the DS field byte is split into six DSCP bits and two ECN bits. The model reports them separately and calculates the byte as DSCP × 4 + ECN. Classification copies both values unchanged.",
      "Application identity: software may reuse ports, encapsulation may hide inner headers, and translation may change observed values. A header match cannot verify payload, user, endpoint identity, application, or business importance.",
      "Rule order: this example’s two predicates are disjoint, but the published order remains explicit so later changes can be reviewed. Production policy may contain overlapping classifiers, exclusions, fragments, tunnels, hardware offload or earlier/later actions not represented here."
    ],
    "mechanism": [
      "Name protocol, source port, destination port, input DSCP and input ECN. Use zero for both ports with ICMP in this worksheet. Reject strings, fractions, out-of-range integers and unknown protocol values; never silently coerce them.",
      "Validate DSCP as integer 0–63 and ECN as integer 0–3. These are independent bit fields, not one shared priority number.",
      "Apply the voice rule first. Only UDP with destination port between 16384 and 32767 inclusive matches. Record the rule identifier with the resulting class.",
      "If voice did not match, test TCP with destination 443. UDP/443 remains outside this rule. If neither predicate matches, return the default class and default rule identifier.",
      "Return class, match rule, original protocol and ports, and separate before/after DS field values. This classifier leaves both incoming DSCP and ECN unchanged; marking is a later, independent policy.",
      "On a real system, inspect the exact configured classifier and its attachment point before claiming that it matched live traffic. A show command may expose configuration, while counters may be absent or aggregate unrelated traffic. Neither a configuration line nor this worksheet proves a packet arrived, matched, or received service."
    ],
    "flow": [
      [
        "Validate supplied header",
        "Check protocol, integer ports, ICMP zero-port convention, DSCP and ECN bounds."
      ],
      [
        "Apply UDP voice rule",
        "Match UDP destination ports 16384–32767 inclusive."
      ],
      [
        "Apply TCP interactive rule",
        "If voice did not match, test TCP destination port 443."
      ],
      [
        "Default and report",
        "Return class and matching rule; preserve DSCP and ECN."
      ]
    ],
    "comparison": [
      [
        "Classification / marking",
        "Assign local class / change a codepoint by policy",
        "Classification alone leaves DSCP and ECN unchanged."
      ],
      [
        "Destination / source port",
        "Rule input / recorded but ignored by these rules",
        "Another policy may inspect other fields."
      ],
      [
        "DSCP / ECN",
        "Six-bit behavior aggregate codepoint / two-bit congestion field",
        "Separate values share one byte."
      ],
      [
        "Port match / identity",
        "Header predicate / authenticated identity",
        "A match does not prove an application."
      ],
      [
        "Classifier / scheduler",
        "Local label / queue service mechanism",
        "No scheduler or bandwidth allocation is modeled."
      ]
    ],
    "example": "A supplied IPv4 header declares UDP, source port 53000, destination port 16384, DSCP 12 and ECN 2. It maps to voice because destination 16384 is the inclusive lower boundary. The rule identifier is udp-destination-16384-32767. DSCP stays 12 and ECN stays 2, so the DS-field byte stays 50. A UDP packet to 443 falls through to default; a TCP packet to 443 becomes interactive. The source port does not affect this result. These declarations do not establish that the payload is voice or HTTPS. No real packet is processed.",
    "commands": [
      {
        "code": "ip -s -s link show",
        "explanation": "Inspect link identity and available interface counters before attributing a live observation to one interface.",
        "expected": "GUIDED, NOT EXECUTED: record interface, link state and counters shown. Counters are platform/driver evidence and do not prove this worksheet rule matched a packet.",
        "platform": "Linux iproute2 · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s qdisc show dev DEV",
        "explanation": "Inspect traffic-control queueing disciplines on the selected interface; replace DEV with the confirmed device name.",
        "expected": "GUIDED, NOT EXECUTED: record attached qdisc and any statistics. An absent qdisc or counter does not prove a classifier result.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s class show dev DEV",
        "explanation": "Inspect traffic-control classes on the selected interface; replace DEV after confirming target context.",
        "expected": "GUIDED, NOT EXECUTED: record the actual class tree and counters if available. A class name is not a queue-service guarantee.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s filter show dev DEV",
        "explanation": "Inspect filters attached to the selected interface; replace DEV with the confirmed device name.",
        "expected": "GUIDED, NOT EXECUTED: compare actual filter keys and actions with intended contract. Counter availability and scope are target-specific; no live match is claimed.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      }
    ],
    "configuration": "The worksheet has a fixed contract and supplies no configuration commands. A real classifier depends on operating system/network OS and release, ingress or egress attachment, address family, encapsulation, offload, match syntax, fragments, and existing policy. Record those facts and review the active configuration baseline before planning a change. Do not replace a production classifier based on this lesson’s ports. This page owns no interface, rule, class, filter or device state.",
    "ports": "The worksheet reads declared TCP/UDP port fields and creates no socket. TCP and UDP ports are 16-bit values. ICMP has no transport ports; the model represents that absence with zero in each port field.",
    "production": "Document ownership of every class, the trust boundary, the interface direction, and the later policy that consumes the class. Validate rule order against the complete target policy, including exclusions, tunnel headers, fragments, hardware offload and any existing classifier. A service may classify encrypted traffic from headers but cannot prove application identity from a port alone. Use target counters or packet evidence for a production claim. Keep configuration review, matched-packet evidence, queue treatment and measured service as separate questions.",
    "troubleshooting": [
      [
        "Symptom",
        "Expected traffic appears as default."
      ],
      [
        "Hypotheses",
        "Wrong protocol, destination outside inclusive range, policy attachment mismatch, different header after encapsulation, or live rule differs from worksheet."
      ],
      [
        "Test",
        "Observe actual protocol/ports at the policy attachment, then inspect the installed classifier and available counters."
      ],
      [
        "Observation",
        "Compare protocol and destination with the ordered local contract. Keep source port, input DSCP and ECN visible but separate."
      ],
      [
        "Conclusion / next test",
        "A worksheet result establishes only its supplied predicate. For a live difference, inspect release, interface direction, fragmentation, offload and enclosing policy."
      ],
      [
        "Fix and verify",
        "After owner review, change only the intended policy. Repeat the same traffic observation and compare actual match counters; a config display alone is not packet proof."
      ]
    ],
    "security": "A port-based classifier is not authentication. Source addresses and ports may be spoofed, shared or translated. Trust decisions require an explicit boundary and appropriate ingress controls. Avoid using a class label as user identity. Sanitize interface names, addresses, tenant labels, counters and policy output before sharing.",
    "performance": "This page evaluates one short rule chain and makes no latency or throughput prediction. Real classification cost and available counters depend on hardware, offload, policy structure, packet path and workload. Measure the target with representative traffic before making capacity claims. A local class may be ignored or mapped differently downstream.",
    "mistakes": [
      "Treating UDP and TCP port 443 as the same match.",
      "Assuming source port participates when this contract tests destination only.",
      "Treating 16384 and 32767 as exclusive or accepting 16383 and 32768.",
      "Calling a header match authenticated application identity.",
      "Assuming classification changes DSCP, ECN, queues or packet treatment.",
      "Reading a configured rule or counter as proof that the original packet matched."
    ],
    "interactive": "classification",
    "artifacts": [],
    "lab": {
      "topologyKind": "shared",
      "objective": "Apply a fixed two-rule header contract and explain inclusive boundary behavior while tracking DSCP and ECN unchanged.",
      "requirements": "The worksheet needs no equipment. Linux inspection commands are guided, read-only examples and were not executed. Use a prepared authorized target and replace DEV only after identifying the actual interface.",
      "topology": [
        "Supplied packet header: protocol, source port, destination port, DSCP and ECN",
        "Fixed ordered classifier: UDP voice range, then TCP/443 interactive, then default",
        "Independent target inspection of interface, qdisc, classes, filters and actual counters"
      ],
      "steps": [
        "Load baseline voice and record protocol, source/destination ports, DSCP, ECN, rule and class.",
        "Compare UDP destination ports 16383, 16384, 32767 and 32768. Explain which values fall inside the inclusive range.",
        "Compare TCP/443 with UDP/443 and identify why only the TCP header reaches interactive.",
        "Change only source port while keeping UDP destination inside range; explain why class remains voice under this contract.",
        "Use TCP-other, ICMP and ECN presets. Explain the default rule, ICMP zero-port convention and unchanged DS field.",
        "On a prepared Linux target, inspect link/qdisc/class/filter state with the guided commands. Record only output actually returned; do not edit policy or generate traffic."
      ],
      "verification": "For each supplied case, identify first match or default. State that output DSCP equals input DSCP and output ECN equals input ECN. 16384 and 32767 match the UDP range; 16383 and 32768 do not. Target commands remain guided/not executed unless independently run by an authorized operator.",
      "troubleshooting": "If a class surprises you, verify protocol first, apply the ordered predicates, then confirm the inspected interface sees the same headers. The worksheet cannot represent fragments, tunnels, payload inspection, authentication, hardware counters or target configuration. Record uncertainty instead of fabricating output.",
      "challenge": "Why does TCP/443 become interactive while UDP/443 falls through to default? What live evidence would show that a real device classified an actual packet under this rule?",
      "cleanup": "The worksheet changes only browser-local declarations. Guided commands are read-only. No rules, classes, qdiscs, interfaces, packets, counters, routes or learner state are created or changed."
    },
    "quick": [
      {
        "testedConcept": "Protocol match",
        "question": "Does UDP destination 443 match the TCP/443 interactive rule?",
        "answer": "No.",
        "explanation": "The rule requires TCP.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-QC1"
      },
      {
        "testedConcept": "Inclusive range",
        "question": "Does UDP destination 32768 match the voice range?",
        "answer": "No.",
        "explanation": "The upper bound is 32767.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-QC2"
      },
      {
        "testedConcept": "DS field",
        "question": "Does classification change input DSCP here?",
        "answer": "No.",
        "explanation": "The class is local; the model preserves DSCP and ECN.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-QC3"
      }
    ],
    "exams": [
      {
        "testedConcept": "Voice lower boundary",
        "question": "Which class matches UDP destination 16384?",
        "answer": "voice",
        "explanation": "16384 is included in the UDP voice range.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "invalid because source port is missing"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q01"
      },
      {
        "testedConcept": "Voice upper boundary",
        "question": "Which class matches UDP destination 32767?",
        "answer": "voice",
        "explanation": "32767 is the inclusive upper boundary.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "ICMP"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q02"
      },
      {
        "testedConcept": "Below range",
        "question": "Which class matches UDP destination 16383?",
        "answer": "default",
        "explanation": "It is below the voice range and matches no later rule.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "trusted-preserve"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q03"
      },
      {
        "testedConcept": "Above range",
        "question": "Which class matches UDP destination 32768?",
        "answer": "default",
        "explanation": "It is one above the inclusive range.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "malformed DSCP"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q04"
      },
      {
        "testedConcept": "Transport distinction",
        "question": "A packet declares UDP destination 443. Which class matches?",
        "answer": "default",
        "explanation": "Interactive requires TCP; UDP/443 is outside voice range.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "TCP/443 rule"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q05"
      },
      {
        "testedConcept": "HTTPS rule",
        "question": "A packet declares TCP destination 443. Which class is selected?",
        "answer": "interactive",
        "explanation": "The TCP/443 rule maps to interactive.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "voice",
          "interactive",
          "default",
          "untrusted-zero"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q06"
      },
      {
        "testedConcept": "Source port",
        "question": "What happens if source port changes but UDP destination remains 20000?",
        "answer": "The class remains voice",
        "explanation": "This voice rule checks protocol and destination only.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The class remains voice",
          "The class becomes default",
          "The class becomes interactive",
          "Input DSCP is rewritten"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q07"
      },
      {
        "testedConcept": "ICMP contract",
        "question": "Which port values does this worksheet require for ICMP?",
        "answer": "Source and destination ports both equal zero",
        "explanation": "Zero represents no transport port in this fixed schema.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Source and destination ports both equal zero",
          "Destination port 443",
          "Any integer ports",
          "Ports 16384 and 32767"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q08"
      },
      {
        "testedConcept": "DSCP/ECN preservation",
        "question": "Input DSCP is 12 and ECN is 2. What output pair does classification produce?",
        "answer": "DSCP 12 and ECN 2",
        "explanation": "Classification does not alter DS field in this model.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "DSCP 12 and ECN 2",
          "DSCP 46 and ECN 0",
          "DSCP 18 and ECN 2",
          "DSCP 0 and ECN 3"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q09"
      },
      {
        "testedConcept": "Identity boundary",
        "question": "A UDP header matches the voice range. What has this worksheet established?",
        "answer": "Only that the declared headers match the local voice rule",
        "explanation": "A port match does not authenticate an application or user.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Only that the declared headers match the local voice rule",
          "That payload is a voice call",
          "That sender is authenticated",
          "That a queue guarantees bandwidth"
        ],
        "topicId": "s3-g9-t1",
        "questionId": "s3-g9-t1-Q10"
      }
    ],
    "glossary": {
      "Classification": "Configured decision assigning a packet or supplied header to a local class.",
      "DS field": "Eight-bit IPv4/IPv6 field containing DSCP and ECN.",
      "DSCP": "Six-bit differentiated services codepoint used to identify a behavior aggregate.",
      "ECN": "Two-bit Explicit Congestion Notification field, separate from DSCP.",
      "Classifier": "Entity selecting packets by defined header criteria.",
      "Default class": "Class assigned here when neither ordered rule matches.",
      "DPI": "Deep packet inspection of payload or deeper protocol context; outside this model.",
      "Ingress boundary": "Point where traffic enters a policy domain and local classification may apply."
    },
    "prerequisites": [
      "s3-g9-t0"
    ],
    "related": [
      "s3-g9-t2"
    ],
    "sources": [
      {
        "title": "RFC 2474: Differentiated Services Field",
        "url": "https://www.rfc-editor.org/rfc/rfc2474",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3168: Explicit Congestion Notification",
        "url": "https://www.rfc-editor.org/rfc/rfc3168",
        "checked": "2026-10-09"
      },
      {
        "title": "tc(8): Linux traffic-control inspection commands",
        "url": "https://man7.org/linux/man-pages/man8/tc.8.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux kernel interface statistics documentation",
        "url": "https://www.kernel.org/doc/html/latest/networking/statistics.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g9-t2",
    "batch": "10",
    "title": "Traffic Marking",
    "subtitle": "Apply a local trust and class policy to DSCP while preserving ECN.",
    "level": "Intermediate → Production",
    "minutes": 45,
    "definition": "Traffic marking is an action that changes a packet marking under administrative policy. IPv4 and IPv6 each carry an eight-bit DS field: six bits encode DSCP and two encode ECN. This lesson models a policy over a supplied class, input DSCP, input ECN and trust-boundary declaration. It supports trusted-preserve, untrusted-zero and class-map. The local map assigns voice 46, interactive 18 and default 0. All policies preserve supplied ECN. The model calculates a displayed DS field as DSCP × 4 + ECN; it never edits a real packet.",
    "purpose": "Marking communicates a locally chosen behavior aggregate to downstream nodes configured to use that codepoint. A trust boundary helps decide whether to retain a marking from another domain or reset it under local policy. A class map can overwrite DSCP based on a local class. These are policy choices, not universal priority rankings or guarantees that a queue, route or application receives particular service.",
    "mental": "Treat the DS field as two adjacent labels sharing one byte. Six upper bits carry DSCP and two lower bits carry ECN. First declare whether the incoming DSCP is trusted at this boundary. Then select one policy: preserve only when trust is true, clear DSCP to zero under untrusted-zero, or select a fixed class-map value. In every branch preserve the supplied ECN codepoint. The displayed result is arithmetic on inputs; it is not a rewritten packet or a scheduler decision.",
    "components": [
      "DSCP: a six-bit codepoint from 0 through 63. It selects a configured per-hop behavior at a differentiated-services node; it is not itself a queue or bandwidth allocation.",
      "ECN: a separate two-bit field from 0 through 3. Its values represent Not-ECT, ECT(1), ECT(0) and CE. This worksheet preserves the exact input and does not run a congestion engine.",
      "Trust boundary: an explicit boolean declaration about whether input DSCP may be retained under local policy. It is an operator input, not an authentication protocol or inferred fact.",
      "trusted-preserve: output DSCP equals input DSCP only when trustBoundary is true. A mismatch is rejected as inconsistent rather than silently preserving a declared-untrusted value.",
      "untrusted-zero: output DSCP is 0. ECN remains as supplied, so clearing DSCP does not erase the ECN codepoint.",
      "class-map: voice maps to local value 46, interactive to 18, and default to 0. RFCs recommend EF codepoint 46 and AF21 codepoint 18 for those behaviors; these local class labels do not define a universal order or priority.",
      "DS field arithmetic: byte value is output DSCP multiplied by four plus input ECN. DSCP 46 and ECN 3 produce byte 187. The six high bits and two low bits remain visually distinct.",
      "Layer 2 marking: IEEE 802.1Q PCP is a separate three-bit field. This lesson does not map DSCP to PCP or invent automatic CoS behavior.",
      "Boundary and trust: domains can use different policies. A marking accepted inside one domain may be overwritten at another boundary. Determine administrative ownership and contract rather than trusting arbitrary inbound bits."
    ],
    "mechanism": [
      "Validate class voice, interactive or default; integer input DSCP 0–63; integer ECN 0–3; policy enum and trustBoundary boolean. Reject extra or missing fields, coercible strings, fractions and out-of-range values.",
      "For trusted-preserve, require trustBoundary=true and retain input DSCP. If the declaration says false, show a validation error rather than pretending the input is trusted.",
      "For untrusted-zero, set output DSCP to zero. Keep the ECN number unchanged. This policy is independent of class map and trust declaration.",
      "For class-map, select voice 46, interactive 18 or default 0. These fixed local examples align with RFC-recommended EF and AF21 codepoint numbers for those PHBs, but do not assert a universal priority relationship.",
      "Compute input DS field as inputDSCP × 4 + inputECN and output field as outputDSCP × 4 + inputECN. Display decimal byte and binary DSCP/ECN sections.",
      "On a live target, inspect policy attachment and target counters with the correct interface and direction. A marking command or displayed config does not prove a packet traversed the policy or that a downstream scheduler honored the codepoint."
    ],
    "flow": [
      [
        "Validate declarations",
        "Check class, policy, trust boundary and DSCP/ECN integer bounds."
      ],
      [
        "Apply trust gate",
        "Preserve only for trusted-preserve with trustBoundary=true; otherwise follow selected reset or map policy."
      ],
      [
        "Choose output DSCP",
        "Retain input, clear to zero, or map the supplied class locally."
      ],
      [
        "Rebuild displayed byte",
        "Preserve ECN and calculate before/after DS field without claiming a packet edit."
      ]
    ],
    "comparison": [
      [
        "DSCP / ECN",
        "Six-bit behavior codepoint / two-bit congestion notification",
        "Different semantics share one octet."
      ],
      [
        "Trusted-preserve / class-map",
        "Retain trusted input / overwrite by local class",
        "Both preserve ECN here."
      ],
      [
        "Untrusted-zero / class-map",
        "Reset DSCP to 0 / apply fixed local value",
        "Choose according to reviewed domain policy."
      ],
      [
        "EF 46 / local voice",
        "RFC-recommended EF codepoint / example class-map label",
        "No EF scheduler or voice identity is implemented."
      ],
      [
        "AF21 18 / local interactive",
        "RFC-recommended AF21 codepoint / example class label",
        "No universal ranking is implied."
      ],
      [
        "PCP / DSCP",
        "Three-bit 802.1Q VLAN field / six-bit IP field",
        "No automatic conversion is specified."
      ],
      [
        "Marking / scheduling",
        "Set a codepoint / service packets in queues",
        "Marking alone does not create forwarding treatment."
      ]
    ],
    "example": "At a declared trusted boundary, input DSCP 12 and ECN 2 under trusted-preserve remain 12 and 2; both DS-field bytes equal 50. If the same input is treated with untrusted-zero, output DSCP becomes 0 while ECN remains 2, so output byte is 2. With class interactive and class-map, output DSCP is 18, ECN remains 2 and byte is 74. No branch updates checksum or sends packets. RFC references identify recommended codepoints for defined PHBs, not a universal service priority or guarantee.",
    "commands": [
      {
        "code": "ip -s -s link show",
        "explanation": "Inspect interface identity and available packet counters before examining a live marking result.",
        "expected": "GUIDED, NOT EXECUTED: record actual interface and counters. Broad counters alone do not prove this policy marked a packet.",
        "platform": "Linux iproute2 · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s qdisc show dev DEV",
        "explanation": "Inspect qdisc attachments and statistics; replace DEV with confirmed interface.",
        "expected": "GUIDED, NOT EXECUTED: note qdisc and actual stats. Queue presence is not proof that a DSCP received treatment.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s class show dev DEV",
        "explanation": "Inspect classes and reported counters on the selected device.",
        "expected": "GUIDED, NOT EXECUTED: record actual class IDs and counters if present. A class name does not establish a DSCP mapping without filter and qdisc context.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      },
      {
        "code": "tc -s filter show dev DEV",
        "explanation": "Inspect filters that may classify or mark packets on the selected interface.",
        "expected": "GUIDED, NOT EXECUTED: verify actual match keys, action, direction and counters. No target configuration or output is asserted.",
        "platform": "Linux iproute2 tc · read-only example; target/version not inspected"
      }
    ],
    "configuration": "This lesson supplies no device configuration commands. Real marking depends on platform/release, ingress or egress direction, interface, trust boundary, IPv4/IPv6 handling, rule order, ECN treatment, encapsulation and hardware offload. Preserve active policy before a reviewed change. The example values 46, 18 and 0 do not define a deployable service contract; no 802.1p PCP or CoS mapping is inferred.",
    "ports": "The marking model consumes a class and DS field integers. It creates no sockets and does not classify transport ports; classification is a preceding, separate decision.",
    "production": "Define trust policy at each administrative boundary and document how local classes map to DSCP. Check whether target policy copies, overwrites or remarks fields at ingress, egress, tunnel edges or hardware offload points. Verify DSCP and ECN independently, then inspect downstream behavior and service objectives with real measurements. Apply policing or shaping if contract requires it; do not infer congestion control or priority from a marking alone.",
    "troubleshooting": [
      [
        "Symptom",
        "Observed output marking differs from intended policy."
      ],
      [
        "Hypotheses",
        "Trust gate differs, another action runs later, class map differs, direction is wrong, or encapsulation/offload changes observation."
      ],
      [
        "Test",
        "Inspect actual policy attachment, action order, counters and observation point on the target interface."
      ],
      [
        "Observation",
        "Record input/output DSCP, input/output ECN, direction, policy revision and counter scope."
      ],
      [
        "Conclusion / next test",
        "Separate policy mismatch from observation point or tunnel difference. This worksheet does not model checksum, tunnel propagation or device behavior."
      ],
      [
        "Fix and verify",
        "After owner review, change only intended local policy. Repeat the same header observation and service measurement."
      ]
    ],
    "security": "Untrusted DSCP can be used to request resources or disrupt local policy. A marking is not a user identity. Set trust only at reviewed boundaries, apply local policy to untrusted sources, and protect configuration/counter evidence from disclosure.",
    "performance": "The worksheet computes one byte; it implements no scheduler, queue, policer or congestion algorithm. RFC PHBs require node behavior and capacity conditions. Measure per-interface loss, delay, ECN marking and throughput under load before describing service quality. Higher-looking codepoint numbers do not imply better service.",
    "mistakes": [
      "Treating 46 or 18 as universally higher priority than other codepoints.",
      "Assuming DSCP automatically maps to 802.1p PCP or CoS.",
      "Preserving untrusted input without an explicit trust declaration.",
      "Resetting ECN when only DSCP is set to zero.",
      "Claiming checksum update, tunnel copy or packet rewrite from this worksheet.",
      "Treating DSCP as a queue, scheduler, bandwidth or service guarantee.",
      "Confusing an ECN CE value with a TCP congestion response; no transport endpoint acts here."
    ],
    "interactive": "marking",
    "artifacts": [],
    "lab": {
      "topologyKind": "shared",
      "objective": "Compare trust-preserve, untrusted-zero and class-map marking while tracking DSCP and ECN separately.",
      "requirements": "Worksheet uses supplied values. Linux inspections are guided, read-only examples and were not executed. Confirm target, device, policy direction and release before any use.",
      "topology": [
        "Declared trust boundary and incoming DSCP/ECN",
        "Class supplied by the separate classifier",
        "One chosen local marking policy",
        "Before/after DS field arithmetic; separate target policy/qdisc evidence"
      ],
      "steps": [
        "Load trusted-preserve and confirm trustBoundary=true. Record input/output DSCP/ECN and byte values.",
        "Load trust-mismatch. Observe validation error and hidden result. Change unrelated ECN and verify invalid output remains hidden; set trust true or reset to recover.",
        "Load untrusted-zero with ECN 3. Confirm DSCP becomes zero and ECN remains three.",
        "Load each class map. Record voice 46, interactive 18 and default 0; do not infer universal ranking.",
        "Compare ECN 00, 01, 10 and 11 presets. Each is preserved unchanged by class-map.",
        "Calculate one case manually as outputDSField=(outputDSCP×4)+inputECN; compare decimal byte and bit split.",
        "On a prepared Linux target, inspect qdisc/class/filter/interface state. Record only actual returned evidence; do not change configuration."
      ],
      "verification": "For each valid policy output ECN equals input ECN and output byte equals outputDSCP×4+inputECN. trusted-preserve is accepted only when trustBoundary=true; untrusted-zero outputs DSCP 0; class-map uses 46/18/0. These are supplied declarations, not packets or service treatment.",
      "troubleshooting": "If preserve is rejected, check explicit trust declaration. If ECN appears to change, verify inputs and formula independently. If live output differs, inspect the exact policy and observation point, including encapsulation and offload. Do not claim checksum, congestion-control or scheduler behavior from the worksheet.",
      "challenge": "Why must the trust boundary be explicit when an inbound DSCP happens to equal a local class value? Explain how to reset untrusted DSCP while retaining ECN.",
      "cleanup": "The worksheet changes only browser-local controls. Guided commands are read-only. No device configuration, packet, qdisc, class, filter, interface or learner state is created or changed."
    },
    "quick": [
      {
        "testedConcept": "Field widths",
        "question": "How many DSCP bits and ECN bits are represented here?",
        "answer": "Six DSCP bits and two ECN bits.",
        "explanation": "Both fields share one octet but retain separate meanings.",
        "difficulty": "Beginner",
        "type": "short-answer",
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-QC1"
      },
      {
        "testedConcept": "Trust gate",
        "question": "May trusted-preserve run when trustBoundary is false?",
        "answer": "No.",
        "explanation": "The model rejects that inconsistent declaration.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-QC2"
      },
      {
        "testedConcept": "ECN preservation",
        "question": "Under untrusted-zero, what happens to input ECN?",
        "answer": "It remains unchanged.",
        "explanation": "Only DSCP is reset under this policy.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-QC3"
      }
    ],
    "exams": [
      {
        "testedConcept": "Trusted preserve",
        "question": "Input DSCP 12 and ECN 2 use trusted-preserve with trustBoundary=true. What is output DSCP?",
        "answer": "12",
        "explanation": "The trusted policy retains the supplied DSCP.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "0",
          "12",
          "18",
          "46"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q01"
      },
      {
        "testedConcept": "Trust consistency",
        "question": "What happens when trusted-preserve is selected with trustBoundary=false?",
        "answer": "The worksheet rejects the inconsistent declaration",
        "explanation": "It does not silently preserve a declared-untrusted marking.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The worksheet rejects the inconsistent declaration",
          "Output DSCP is always 46",
          "ECN is forced to 0",
          "Class changes to default"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q02"
      },
      {
        "testedConcept": "Untrusted zero",
        "question": "Input DSCP is 46 and ECN is 3 under untrusted-zero. What output pair is shown?",
        "answer": "DSCP 0 and ECN 3",
        "explanation": "The local policy clears DSCP and preserves ECN.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "DSCP 0 and ECN 3",
          "DSCP 0 and ECN 0",
          "DSCP 46 and ECN 3",
          "DSCP 63 and ECN 1"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q03"
      },
      {
        "testedConcept": "Voice map",
        "question": "Which local DSCP value does class-map assign to voice?",
        "answer": "46",
        "explanation": "This is the local example mapping and the EF codepoint number.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0",
          "18",
          "46",
          "63"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q04"
      },
      {
        "testedConcept": "Interactive map",
        "question": "Which local DSCP value does class-map assign to interactive?",
        "answer": "18",
        "explanation": "18 is the chosen local value and the AF21 codepoint number.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0",
          "18",
          "46",
          "48"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q05"
      },
      {
        "testedConcept": "Default map",
        "question": "What DSCP does the fixed class map assign to default?",
        "answer": "0",
        "explanation": "The supplied local map assigns default to zero.",
        "difficulty": "Beginner",
        "type": "multiple-choice",
        "options": [
          "0",
          "1",
          "18",
          "46"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q06"
      },
      {
        "testedConcept": "DS field calculation",
        "question": "For output DSCP 18 and ECN 2, what decimal DS-field byte is displayed?",
        "answer": "74",
        "explanation": "18×4+2 equals 74.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "20",
          "72",
          "74",
          "182"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q07"
      },
      {
        "testedConcept": "ECN split",
        "question": "Which integer represents ECN bit pattern 11?",
        "answer": "3",
        "explanation": "Two bits encode values zero through three.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q08"
      },
      {
        "testedConcept": "Codepoint semantics",
        "question": "Do 46 and 18 define a universal priority order between voice and interactive?",
        "answer": "No; they are local examples and do not define universal class ordering",
        "explanation": "Codepoint definitions do not establish a universal policy ranking.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; 46 always receives more service",
          "No; they are local examples and do not define universal class ordering",
          "Yes; every device queues 46 first",
          "No; DSCP is the ECN field"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q09"
      },
      {
        "testedConcept": "Layer 2 marking",
        "question": "What does this lesson specify about 802.1Q PCP?",
        "answer": "It is a separate three-bit field and no automatic mapping is modeled",
        "explanation": "PCP is distinct from DSCP and this lesson invents no CoS mapping.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "It is a separate three-bit field and no automatic mapping is modeled",
          "It is identical to six-bit DSCP",
          "It always equals ECN",
          "It is automatically set to 46"
        ],
        "topicId": "s3-g9-t2",
        "questionId": "s3-g9-t2-Q10"
      }
    ],
    "glossary": {
      "Traffic marking": "Local traffic-conditioning policy that sets a marking according to declared rules.",
      "DSCP": "Six-bit differentiated services codepoint used to select configured behavior.",
      "ECN": "Two-bit Explicit Congestion Notification field preserved by this model.",
      "Trust boundary": "Declared administrative point where policy decides whether input marking may be retained.",
      "Class map": "Fixed local mapping from voice, interactive, default to 46, 18, 0.",
      "EF": "Expedited Forwarding PHB; RFC 3246 recommends DSCP 46 for this PHB.",
      "AF21": "Assured Forwarding class 2, low drop precedence; RFC 2597 gives codepoint 18.",
      "PCP": "Three-bit 802.1Q Priority Code Point; separate from IP DSCP.",
      "DS field": "Eight-bit IPv4/IPv6 field composed of DSCP and ECN."
    },
    "prerequisites": [
      "s3-g9-t1"
    ],
    "related": [
      "s3-g9-t1"
    ],
    "sources": [
      {
        "title": "RFC 2474: Differentiated Services Field",
        "url": "https://www.rfc-editor.org/rfc/rfc2474",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3168: Explicit Congestion Notification",
        "url": "https://www.rfc-editor.org/rfc/rfc3168",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3246: Expedited Forwarding PHB and recommended codepoint",
        "url": "https://www.rfc-editor.org/rfc/rfc3246",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2597: Assured Forwarding PHB Group codepoints",
        "url": "https://www.rfc-editor.org/rfc/rfc2597",
        "checked": "2026-10-09"
      },
      {
        "title": "tc(8): Linux traffic-control inspection commands",
        "url": "https://man7.org/linux/man-pages/man8/tc.8.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux kernel interface statistics documentation",
        "url": "https://www.kernel.org/doc/html/latest/networking/statistics.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "commands": [
      {
        "code": "tc -s qdisc show dev \"$QOS_DEV\"",
        "explanation": "Set QOS_DEV separately to the exact interface of an exclusively owned, already prepared context. Inspect qdisc identity and statistics without changing policy.",
        "expected": "GUIDED, NOT EXECUTED: Preserve the actual root/child handles, qdisc types and counters. A counter snapshot is not a measured original application result.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -s class show dev \"$QOS_DEV\"",
        "explanation": "Inspect existing classes and their available statistics on the same mapped interface. An empty class listing can be valid for a classless qdisc.",
        "expected": "GUIDED, NOT EXECUTED: Correlate class handles with the qdisc hierarchy and actual configured rates; do not manufacture a class for every worksheet row.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc filter show dev \"$QOS_DEV\"",
        "explanation": "Inspect filters in this mapped context. Additional parent or ingress context may be needed for the actual deployment.",
        "expected": "GUIDED, NOT EXECUTED: Record what the command actually lists and identify the hook/hierarchy before interpreting a missing filter. This command does not create classification or marking.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -d -s qdisc show dev \"$QOS_DEV\"\ntc -d -s class show dev \"$QOS_DEV\"",
        "explanation": "Use the documented detail and statistics options for a second read-only view. Compare the same interface, namespace and observer context.",
        "expected": "GUIDED, NOT EXECUTED: Inspect actual parameter details and cumulative counters. No supplied output, kernel scheduling trace or packet capture is claimed.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      }
    ],
    "configuration": "Use the browser for the tabletop calculations. Optional command inspection requires an exclusively owned, already configured Linux context, a mapped interface name, correct network namespace and a known traffic-control hierarchy. Set QOS_DEV outside the supplied commands to that exact interface. The iproute2 v6.6.0 manual is a pinned syntax reference; installed binaries, kernel support, hardware offload and distribution packaging must be checked at the actual target. No qdisc add, change, replace, delete, filter mutation, packet generator or namespace creation is supplied. Record the existing policy and observer context before any separately authorized experiment. A browser preset is an input declaration and cannot configure a Linux interface.",
    "production": "Place each observation at a named interface and direction. The local egress device, an ingress redirect target, an upstream switch and a remote provider can have different congestion points. Confirm which resource is constrained before choosing a rate or scheduler. Preserve the original application, endpoint, route, return path and observation interval when comparing results. A favorable local worksheet result does not establish receiver performance or an SLA. Deployments also need ownership, change control, independent management and a recovery baseline. The optional read-only commands describe an existing object; absent objects, offloaded counters or a different namespace need investigation rather than an assumed default policy.",
    "security": "Treat class and marking declarations as policy inputs, not proof of trusted traffic. An endpoint can request a preferred DSCP without being entitled to it. Establish a trust boundary and validate or remark traffic according to the actual administrative policy. Limit changes to authorized interfaces and protect management traffic independently. Packet or counter evidence can expose endpoint identities and workload patterns, so preserve only necessary context. This worksheet accepts bounded numeric declarations and inert text; it does not authenticate a flow, configure a filter or protect a device. A priority label alone is not a security boundary.",
    "performance": "The calculations use exact declared units and ideal local arithmetic. They omit framing overhead, interpacket gaps, segmentation, retransmissions, clock granularity, driver queues, device offload and competing unlisted traffic. These omissions are explicit scope limits, not estimates of zero cost. Fractional milliseconds are retained internally and rounded only for display. Serialization concerns one selected link; propagation and application response time remain separate. Compare actual counters and application evidence over a known interval before drawing a performance conclusion. The independent application-readiness checkbox expresses context only and cannot turn model arithmetic into an observed service result.",
    "id": "s3-g9-t3",
    "title": "Policing",
    "subtitle": "Apply one explicit full-bucket conformance contract without inventing a queue.",
    "interactive": "policing",
    "definition": "Policing meters traffic against a declared profile and applies an action to traffic outside it. This worksheet chooses a single initially full token bucket, one rate, one bucket size and two outcomes: conform or drop excess. Tokens represent bytes, refill continuously under ideal arithmetic, and are consumed only by conforming packets. This chosen teaching contract is not the complete RFC 2697 single-rate three-color marker, which has two buckets and green, yellow and red outcomes. Nor does it stand for every vendor policer.",
    "purpose": "Use the packet-by-packet meter to distinguish a permitted burst from a long-term refill rate. A packet can conform at time zero because the bucket begins full; that does not require prior idle time in the declared input. A later packet can fail even when a coarse average rate appears modest because token availability is checked at its arrival. Policing here discards excess rather than delaying it. Actual deployments may use different actions, color awareness or algorithms, so the local decision must be tied to this exact contract.",
    "mental": "Imagine a byte-credit wallet that starts with B credits. Time earns credits at R divided by eight bytes per second, but the wallet never holds more than B. A packet asks for its entire size at arrival. If enough credit exists, the wallet pays and the packet conforms. If not, this policy drops the packet and leaves the credit unchanged. There is no waiting room, partial packet payment or borrowing from a future refill.",
    "components": [
      "R is a positive integer bits-per-second refill rate. In this worksheet one millisecond earns R divided by 8000 bytes, so a rate of 8000 bits per second earns exactly one byte per millisecond. Rates that are not multiples of 8000 generate fractional token balances. Fractional tokens are retained internally; the integer constraint applies to input rates and packet sizes, not to every computed balance.",
      "B is a positive integer bucket capacity in bytes. Initial credit is exactly B at time zero. Refill is capped at B regardless of how long the input is idle. A large idle interval therefore cannot grant unbounded future burst credit. B controls a stored allowance, while R controls how quickly consumed allowance returns. They have different units and cannot substitute for one another.",
      "The finite packet sequence contains one to twelve entries. Each has an integer arrival time in milliseconds and a positive integer size in bytes. Arrival times are nondecreasing; equal times preserve the supplied input order. Each packet sees the token balance left by the preceding decision, so changing the order of different-size packets at one timestamp can change which packets conform.",
      "The refill step adds elapsed milliseconds times R divided by 8000, capped by the remaining space in the bucket. The row reports the actual capped refill, the balance before decision and the balance afterward. A reported zero refill at a full bucket does not mean the rate was zero; the capacity cap prevented additional stored credit.",
      "A packet conforms only when its size is no greater than B and its size is no greater than available tokens. Equality conforms and consumes the entire remaining balance if equal to it. An excess packet drops and consumes no tokens. A packet larger than B is always nonconforming in this fixed contract, even after a long idle refill, because the bucket can never contain enough credit.",
      "The action is a declared local drop. It is not ECN marking, DSCP remarking, a three-color result or a transport response. The browser emits no packet and predicts no TCP recovery. Independent application readiness does not affect conformance arithmetic. Linux filter policing, hardware meters and RFC-defined markers must be investigated with their own supported configuration and implementation scope."
    ],
    "mechanism": [
      "Validate the exact state shape, integer rate and bucket bounds, boolean context and ordered packet fields. Reject strings, NaN, negative time, zero-byte packets, unknown fields and too many entries. Invalid data cannot be silently repaired by sorting or converting it.",
      "Initialize tokens to B and previous arrival to zero. For each packet, calculate elapsed time from the previous packet arrival. Even a dropped packet advances the observation time, so subsequent refill counts each interval once rather than reusing time.",
      "Refill to min(B, old tokens plus elapsed milliseconds times R/8000). Report the capped amount actually added. For R = 8000, B = 1000 and a first 600-byte packet at zero, the first before balance is 1000 and the after balance is 400.",
      "Check the next same-arrival 600-byte packet. It sees 400 tokens, so it drops and leaves 400. At 200 ms, another 200 tokens become available; a 500-byte packet sees 600, conforms and leaves 100. That sequence differs from both a queue and an unconditional average-rate comparison.",
      "Compare exact-capacity, same-arrival, idle-cap, oversized and fractional-refill presets. At R = 3000, one millisecond earns 0.375 bytes. A one-byte packet immediately after an empty bucket drops; it does not round the refill upward or consume a fractional part of its size.",
      "Interpret each row as a profile decision under the chosen action. RFC 3290 separates meter results from actions, and RFC 2697 provides a useful comparison with a different two-bucket marker. Do not relabel this single-bucket result green/yellow/red or claim it is a complete srTCM implementation."
    ],
    "flow": [
      [
        "Declare profile",
        "Supply R in bits per second and B in bytes, initially full."
      ],
      [
        "Refill at arrival",
        "Add elapsed ideal credit and cap it at B."
      ],
      [
        "Apply atomic packet decision",
        "Conform and consume all size, or drop excess without consuming."
      ],
      [
        "Interpret within scope",
        "Separate this chosen action from coloring, queuing and actual service."
      ]
    ],
    "comparison": [
      [
        "Rate / bucket capacity",
        "Refill speed / maximum stored burst allowance",
        "Changing one need not change the other."
      ],
      [
        "Policing / shaping",
        "Drop excess at arrival / delay eligible packets",
        "Only policing’s chosen drop action is modeled here."
      ],
      [
        "Chosen bucket / RFC 2697 srTCM",
        "One bucket and two outcomes / two buckets and three colors",
        "Do not substitute this worksheet for the RFC algorithm."
      ],
      [
        "Conformance / application result",
        "Local profile decision / actual original exchange",
        "A conforming row is not a delivered-packet observation."
      ]
    ],
    "example": "Begin with 1000 tokens at R = 8000 bps. Packet 1 is 600 bytes at 0 ms and conforms, leaving 400. Packet 2 is also 600 bytes at 0 ms and drops, still leaving 400. Packet 3 is 500 bytes at 200 ms; refill adds 200, it conforms and leaves 100. If Packet 2 consumed tokens despite dropping, the later result would be wrong for this contract. If it waited until 200 ms, the result would be a shaping behavior instead.",
    "ports": "The meter has no protocol port. An actual classifier can select traffic by supported packet fields, but these entries contain only arrival and size. No Linux filter, ECN mark, DSCP write or packet emission occurs.",
    "troubleshooting": [
      [
        "A first burst exceeds the steady rate yet conforms",
        "Check the initially full B allowance and packet size before treating it as a violation."
      ],
      [
        "A dropped packet seems to reduce future credit",
        "Confirm the chosen excess action consumes no tokens."
      ],
      [
        "Long idle admits an oversized packet in a proposed explanation",
        "Recheck the B cap; size greater than B cannot conform."
      ],
      [
        "Fractional refill produces an unexpected decision",
        "Keep full arithmetic precision and compare tokens against the complete integer packet size."
      ]
    ],
    "mistakes": [
      "Calling this one-bucket drop contract RFC 2697 srTCM.",
      "Confusing R bits per second with B bytes.",
      "Assuming drop excess waits for later credit.",
      "Allowing an idle interval to store more than B."
    ],
    "prerequisites": [
      "s3-g9-t0",
      "s3-g9-t1",
      "s3-g9-t2"
    ],
    "related": [
      "s3-g9-t4",
      "s3-g9-t5"
    ],
    "lab": {
      "objective": "Derive conformance and token balances for a bounded packet sequence.",
      "requirements": "Browser only for the supplied exercise. Optional guided inspection needs an exclusively owned, already prepared Linux interface with known namespace and policy. There is no live Linux traffic-control execution in this lesson.",
      "topologyKind": "shared",
      "topology": [
        "Declared finite workload → local worksheet → computed rows",
        "Original application readiness: supplied independently",
        "Optional existing Linux interface: inspect only, outside browser calculations"
      ],
      "steps": [
        "Calculate the burst preset without looking at the output; record all before and after balances.",
        "Compare exact and same-arrival presets to test equality and input order.",
        "Use idle to show that refill stops at B.",
        "Use oversize to show that a dropped packet does not consume initial tokens.",
        "Use fractional refill and keep 0.375-byte precision before the decision.",
        "Toggle application context, reject malformed packet text and verify invalid scenario output remains hidden through edits.",
        "Keyboard-scroll the result table and Reset; optional commands inspect an existing prepared context only."
      ],
      "verification": "Verify the supplied arithmetic row by row, including the units and the exact contract. Independent model tests cover meaningful presets, strict input rejection, unchanged source input, boundary decisions and manually derived timelines. Primary browser review is separate. No test here demonstrates a kernel queue, packet delivery, latency improvement or a live target result.",
      "troubleshooting": "Reset if the selected scenario is invalid. Read the field error and check integer units, packet order and exact enum values. A valid numeric declaration can still describe a poor policy. For optional actual inspection, check interface, namespace, direction and parent hierarchy before interpreting an empty listing.",
      "challenge": "At R = 8000 and B = 1000, compare two same-arrival sequences [600,400,500] and [500,600,400]. Which entries conform and why?",
      "cleanup": "Reset restores the first supplied scenario without changing device state or learner progress. The worksheet owns no interface, process, namespace or qdisc. Any separately authorized device experiment must recover its own exact prior baseline."
    },
    "glossary": {
      "Policer": "Meter plus action handling traffic outside a declared profile.",
      "Token bucket": "Stored byte credit capped at B and refilled at a declared rate.",
      "Conforming packet": "Packet with sufficient complete byte credit under this contract.",
      "Excess packet": "Packet dropped by the chosen insufficient-credit action.",
      "Burst allowance": "Stored credit available independently of the next refill interval.",
      "Capped refill": "Actual new credit limited by the bucket’s remaining capacity.",
      "Single-rate three-color marker": "RFC 2697 algorithm with two buckets and green/yellow/red outcomes.",
      "Atomic packet decision": "Complete packet admission or rejection without partial size consumption."
    },
    "exams": [
      {
        "testedConcept": "Rate conversion",
        "question": "R = 8000 bps supplies how many token bytes per millisecond?",
        "answer": "1 byte.",
        "explanation": "8000 bits/second divided by eight and by 1000 gives one byte/ms.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "1 byte.",
          "8 bytes.",
          "1000 bytes.",
          "0.125 byte."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q01"
      },
      {
        "testedConcept": "Initial credit",
        "question": "What balance exists before the first packet at 0 ms when B = 1000?",
        "answer": "1000 bytes.",
        "explanation": "The chosen teaching contract initializes the bucket full.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0 bytes.",
          "1000 bytes.",
          "8000 bytes.",
          "The first packet’s size."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q02"
      },
      {
        "testedConcept": "Excess action",
        "question": "A 600-byte packet sees 400 tokens. What follows?",
        "answer": "It drops and leaves 400 tokens.",
        "explanation": "Excess is dropped atomically without consuming credit.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "It waits 200 ms.",
          "It consumes the 400 and drops the remainder.",
          "It drops and leaves 400 tokens.",
          "It borrows 200 from the next refill."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q03"
      },
      {
        "testedConcept": "Equality",
        "question": "A 1000-byte packet sees exactly 1000 tokens. What is the result?",
        "answer": "Conform and leave zero tokens.",
        "explanation": "The comparison uses tokens greater than or equal to packet size.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Drop because one extra token is required.",
          "Yellow with 1000 tokens retained.",
          "Wait for one refill interval.",
          "Conform and leave zero tokens."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q04"
      },
      {
        "testedConcept": "Idle cap",
        "question": "An empty B = 1000 bucket at R = 8000 idles for 10 seconds. How much can it hold?",
        "answer": "1000 bytes.",
        "explanation": "The stored balance is capped at B regardless of idle duration.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "1000 bytes.",
          "10,000 bytes.",
          "80,000 bytes.",
          "Unlimited credit until another packet arrives."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q05"
      },
      {
        "testedConcept": "Oversized packet",
        "question": "A 1001-byte packet arrives with a full B = 1000 bucket. Which outcome applies?",
        "answer": "Drop because size exceeds the maximum credit.",
        "explanation": "This contract includes no fragmentation or oversized exception.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Conform using the next millisecond’s token.",
          "Drop because size exceeds the maximum credit.",
          "Fragment into two conforming packets.",
          "Expand B temporarily to 1001."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q06"
      },
      {
        "testedConcept": "RFC comparison",
        "question": "What distinguishes RFC 2697 srTCM from this worksheet?",
        "answer": "It uses two buckets and three colors.",
        "explanation": "RFC 2697 is a different marker, not this single-bucket drop action.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "It replaces bytes with DSCP bit counts.",
          "It uses one unlimited bucket.",
          "It uses two buckets and three colors.",
          "It schedules high-priority packets before low packets."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q07"
      },
      {
        "testedConcept": "Fractional balance",
        "question": "At R = 3000, an empty bucket refills for 1 ms. Can a 1-byte packet conform?",
        "answer": "No; only 0.375 bytes are available.",
        "explanation": "The model retains fractional credit and needs the whole packet size.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Yes, refill rounds to one byte.",
          "Yes, packet size is divided by eight again.",
          "Yes, the first fraction is borrowed.",
          "No; only 0.375 bytes are available."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q08"
      },
      {
        "testedConcept": "Same-arrival order",
        "question": "B = 1000; packets of 600 then 600 arrive at 0 ms. What are the outcomes?",
        "answer": "First conforms; second drops with 400 tokens retained.",
        "explanation": "The first consumes 600; no time passes before the second.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "First conforms; second drops with 400 tokens retained.",
          "Both conform because rate is checked over one second.",
          "Both wait until the bucket refills.",
          "First drops; second conforms from unused credit."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q09"
      },
      {
        "testedConcept": "Production observation",
        "question": "What does a conforming worksheet row establish?",
        "answer": "Conformance under the supplied local contract.",
        "explanation": "The browser performs a profile calculation, not target execution or delivery.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The receiver acknowledged that packet.",
          "Conformance under the supplied local contract.",
          "The device has an installed filter policer.",
          "The original application met its SLA."
        ],
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Sequence",
        "question": "R = 8000, B = 1000: packets (0 ms,600 B),(0 ms,600 B),(200 ms,500 B). Give outcomes and final tokens.",
        "answer": "Conform, drop, conform; final tokens 100 bytes.",
        "explanation": "The drop leaves 400; 200 ms adds 200; the last consumes 500.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-QC1"
      },
      {
        "testedConcept": "Rate units",
        "question": "What is the refill formula in bytes for elapsed milliseconds?",
        "answer": "elapsedMs × R / 8000, capped by remaining bucket space.",
        "explanation": "Eight bits per byte and 1000 milliseconds per second give the denominator.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-QC2"
      },
      {
        "testedConcept": "Algorithm distinction",
        "question": "Why is this not RFC 2697 srTCM?",
        "answer": "It has one bucket and two outcomes instead of the RFC’s two buckets and three colors.",
        "explanation": "Meter algorithm and action scope must stay explicit.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t3",
        "questionId": "s3-g9-t3-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 3290 — meters and actions",
        "url": "https://www.rfc-editor.org/rfc/rfc3290",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2697 — comparison: single-rate three-color marker",
        "url": "https://www.rfc-editor.org/rfc/rfc2697",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc inspection syntax",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc.8",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "commands": [
      {
        "code": "tc -s qdisc show dev \"$QOS_DEV\"",
        "explanation": "Set QOS_DEV separately to the exact interface of an exclusively owned, already prepared context. Inspect qdisc identity and statistics without changing policy.",
        "expected": "GUIDED, NOT EXECUTED: Preserve the actual root/child handles, qdisc types and counters. A counter snapshot is not a measured original application result.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -s class show dev \"$QOS_DEV\"",
        "explanation": "Inspect existing classes and their available statistics on the same mapped interface. An empty class listing can be valid for a classless qdisc.",
        "expected": "GUIDED, NOT EXECUTED: Correlate class handles with the qdisc hierarchy and actual configured rates; do not manufacture a class for every worksheet row.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc filter show dev \"$QOS_DEV\"",
        "explanation": "Inspect filters in this mapped context. Additional parent or ingress context may be needed for the actual deployment.",
        "expected": "GUIDED, NOT EXECUTED: Record what the command actually lists and identify the hook/hierarchy before interpreting a missing filter. This command does not create classification or marking.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -d -s qdisc show dev \"$QOS_DEV\"\ntc -d -s class show dev \"$QOS_DEV\"",
        "explanation": "Use the documented detail and statistics options for a second read-only view. Compare the same interface, namespace and observer context.",
        "expected": "GUIDED, NOT EXECUTED: Inspect actual parameter details and cumulative counters. No supplied output, kernel scheduling trace or packet capture is claimed.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      }
    ],
    "configuration": "Use the browser for the tabletop calculations. Optional command inspection requires an exclusively owned, already configured Linux context, a mapped interface name, correct network namespace and a known traffic-control hierarchy. Set QOS_DEV outside the supplied commands to that exact interface. The iproute2 v6.6.0 manual is a pinned syntax reference; installed binaries, kernel support, hardware offload and distribution packaging must be checked at the actual target. No qdisc add, change, replace, delete, filter mutation, packet generator or namespace creation is supplied. Record the existing policy and observer context before any separately authorized experiment. A browser preset is an input declaration and cannot configure a Linux interface.",
    "production": "Place each observation at a named interface and direction. The local egress device, an ingress redirect target, an upstream switch and a remote provider can have different congestion points. Confirm which resource is constrained before choosing a rate or scheduler. Preserve the original application, endpoint, route, return path and observation interval when comparing results. A favorable local worksheet result does not establish receiver performance or an SLA. Deployments also need ownership, change control, independent management and a recovery baseline. The optional read-only commands describe an existing object; absent objects, offloaded counters or a different namespace need investigation rather than an assumed default policy.",
    "security": "Treat class and marking declarations as policy inputs, not proof of trusted traffic. An endpoint can request a preferred DSCP without being entitled to it. Establish a trust boundary and validate or remark traffic according to the actual administrative policy. Limit changes to authorized interfaces and protect management traffic independently. Packet or counter evidence can expose endpoint identities and workload patterns, so preserve only necessary context. This worksheet accepts bounded numeric declarations and inert text; it does not authenticate a flow, configure a filter or protect a device. A priority label alone is not a security boundary.",
    "performance": "The calculations use exact declared units and ideal local arithmetic. They omit framing overhead, interpacket gaps, segmentation, retransmissions, clock granularity, driver queues, device offload and competing unlisted traffic. These omissions are explicit scope limits, not estimates of zero cost. Fractional milliseconds are retained internally and rounded only for display. Serialization concerns one selected link; propagation and application response time remain separate. Compare actual counters and application evidence over a known interval before drawing a performance conclusion. The independent application-readiness checkbox expresses context only and cannot turn model arithmetic into an observed service result.",
    "id": "s3-g9-t4",
    "title": "Shaping",
    "subtitle": "Delay a finite FIFO workload until byte credit is available.",
    "interactive": "shaping",
    "definition": "Shaping delays traffic to make its release conform to a supplied profile. This worksheet uses an initially full single token bucket, ideal continuous refill and FIFO storage for a finite input. It reports the earliest token-eligible release time of each admissible packet. It does not claim that release is a physical serialized departure, an observed kernel timestamp or a measured application delay. A separately declared link capacity supplies each packet’s standalone serialization duration without adding it to the token-release timeline.",
    "purpose": "Compare delaying a packet with dropping it when credit is missing. The same burst that loses an excess packet in the policing worksheet can wait here until enough tokens return. That delay must be visible rather than hidden behind an average-rate statement. A shaper can move congestion into its own queue; it does not eliminate the cost of constrained service. This lesson deliberately isolates token eligibility from physical service so a learner can identify which timing quantity has actually been calculated.",
    "mental": "Packets enter one FIFO waiting line beside the byte-credit wallet. An admissible packet checks the wallet at the later of its own arrival and the previous release. If credit is missing, time advances exactly enough to earn the deficit, then the whole packet consumes credit and becomes eligible. The next packet cannot pass it. The worksheet stops at this eligibility boundary. A downstream serializer, driver or hardware queue can impose additional delay after that boundary.",
    "components": [
      "Rate R is a positive integer in bits per second. Ideal refill is R/8000 bytes per millisecond. Bucket capacity B is a positive integer in bytes and starts full. These fields use the same unit meanings as policing, but the missing-credit action changes from drop to wait. Continuous arithmetic permits fractional eligibility times even though supplied arrival timestamps are integer milliseconds.",
      "Input contains one to twelve packets with nondecreasing integer arrivals and positive integer sizes. Equal timestamps retain input order. The buffer is declared infinite for this finite workload, so there is no queue-length admission limit or buffer-overflow action. This does not describe a real infinite memory device or permit conclusions about a production queue’s safe size.",
      "Eligibility base time is max(packet arrival, previous eligible release). A packet arriving while an earlier packet waits cannot overtake it. At the base time, replenish the bucket by elapsed time since its prior accounting checkpoint, capped at B. A packet arriving after a long idle can start with a full bucket, but that stored allowance remains bounded.",
      "If tokens before the decision are insufficient, deficit is packet size minus tokens. Waiting milliseconds equal deficit times 8000 divided by R. Tokens generated during this wait exactly pay the deficit. Once the whole packet consumes its credit, remaining tokens are zero in a positive-wait case. If no wait is needed, subtract its size from the available balance.",
      "A packet larger than B cannot ever collect enough credit under this fixed no-fragment, no-oversized-exception contract. It is explicitly dropped as impossible rather than scheduled at an invented future time. That choice is a teaching boundary, not a claim that every shaper or hardware meter handles large packets this way. The dropped packet consumes no credit and does not move the eligible-release checkpoint.",
      "Link capacity C is independent of token rate R. The output shows packet bytes times 8000/C milliseconds as separate standalone serialization. Several packets can have the same token-eligible time when the initial burst credit covers them; their physical bits still cannot occupy one link simultaneously. The browser does not combine these columns into a downstream schedule or promise a wire departure time."
    ],
    "mechanism": [
      "Validate exact fields, arrival order, packet size limits and integer rates before calculation. The UI accepts one arrival and size per line and displays invalid input immediately. It does not coerce a string API value, reorder packets or treat malformed lines as missing traffic.",
      "Initialize the bucket to B and its last eligibility checkpoint to zero. For each size no greater than B, choose the later of arrival and the previous checkpoint, then refill from the last checkpoint to that base. Report actual capped refill and before balance.",
      "For the baseline R = 8000 and B = 1000, a 600-byte packet at 0 ms releases at 0 and leaves 400. The next 600-byte packet at 0 sees a 200-byte deficit and releases at 200 ms with zero tokens. Its queue wait is 200 ms.",
      "A following 500-byte packet arriving at 200 ms begins at 200, has no tokens and waits another 500 ms. It releases at 700 ms and its wait from arrival is 500 ms. The model uses FIFO token accounting; it does not reset the bucket independently for each packet.",
      "Keep fractional times when R is 3000 bps. After a 1000-byte packet consumes the full initial bucket, a one-byte packet at the same arrival releases at 8/3 ms, and the following two-byte packet releases at 8 ms. Display rounding must not become the next packet’s accounting time.",
      "Compare the line-capacity preset with the baseline. Changing C changes the separate serialization column but leaves token-release times unchanged. The pinned tc-tbf manual describes a Linux token-bucket qdisc with additional parameters and implementation considerations; this ideal worksheet does not emulate its clock, buffer limit, peakrate or oversized-packet behavior."
    ],
    "flow": [
      [
        "Declare ordered workload",
        "Supply arrival times, bytes, token rate and capacity."
      ],
      [
        "Maintain FIFO credit history",
        "Refill at the later of arrival and previous token release."
      ],
      [
        "Wait for the complete deficit",
        "Release eligible packets; explicitly reject size greater than B."
      ],
      [
        "Separate timing boundaries",
        "Show token eligibility, queue wait and standalone serialization distinctly."
      ]
    ],
    "comparison": [
      [
        "Policer excess / shaper deficit",
        "Chosen drop action / delayed eligible release",
        "Missing tokens need not mean the same action."
      ],
      [
        "Token release / wire departure",
        "Profile eligibility / physical serialization completion",
        "Only the first is scheduled here."
      ],
      [
        "Token rate R / link rate C",
        "Credit supply / standalone serializer capacity",
        "Changing C does not change this token timeline."
      ],
      [
        "Infinite worksheet buffer / real queue",
        "Finite-input teaching assumption / bounded implementation",
        "No kernel buffer or latency limit is tested."
      ]
    ],
    "example": "The baseline packets are 600 B at 0 ms, 600 B at 0 ms and 500 B at 200 ms with R = 8000 bps and B = 1000 B. Eligible releases are 0, 200 and 700 ms. At C = 1,000,000 bps their separate serialization durations are 4.8, 4.8 and 4 ms. Those durations are not added to release times in this worksheet. They illustrate why a token release column alone cannot be reported as physical departure or application latency.",
    "ports": "The shaper contract has no port or packet classification rule. Actual egress traffic control depends on the mapped hook and hierarchy. This browser emits no traffic and installs no Linux TBF qdisc.",
    "troubleshooting": [
      [
        "Two rows release at the same time",
        "Check initial burst credit; eligible release is not serialized physical departure."
      ],
      [
        "A packet waits after arriving later than its predecessor",
        "Review remaining credit and FIFO base time rather than resetting the bucket."
      ],
      [
        "Changing C changes the claimed shaper release",
        "Keep standalone serialization separate from token-rate eligibility."
      ],
      [
        "An oversized packet has an enormous invented wait",
        "Use the explicit impossible-packet drop contract; B cannot accumulate its full size."
      ]
    ],
    "mistakes": [
      "Calling eligible release a measured wire departure.",
      "Adding serialization into eligibility without changing the declared model.",
      "Allowing a later FIFO packet to pass an earlier waiting packet.",
      "Treating the ideal buffer as actual unlimited device memory."
    ],
    "prerequisites": [
      "s3-g9-t0",
      "s3-g9-t1",
      "s3-g9-t2",
      "s3-g9-t3"
    ],
    "related": [
      "s3-g9-t5"
    ],
    "lab": {
      "objective": "Derive FIFO token-eligible release and wait without conflating them with physical departures.",
      "requirements": "Browser only for the supplied exercise. Optional guided inspection needs an exclusively owned, already prepared Linux interface with known namespace and policy. There is no live Linux traffic-control execution in this lesson.",
      "topologyKind": "shared",
      "topology": [
        "Declared finite workload → local worksheet → computed rows",
        "Original application readiness: supplied independently",
        "Optional existing Linux interface: inspect only, outside browser calculations"
      ],
      "steps": [
        "Calculate baseline release times 0, 200 and 700 ms from the credit history.",
        "Compare the same-arrival preset and explain simultaneous eligibility.",
        "Use fractional rate and derive 8/3 ms before reading rounded display.",
        "Use the idle preset to verify the cap and future one-byte wait.",
        "Use oversize to confirm explicit drop and unchanged credit for the next admissible packet.",
        "Change only C and compare the separate serialization values with unchanged release times.",
        "Toggle readiness, test invalid packet order and invalid scenario persistence, then keyboard-scroll and Reset."
      ],
      "verification": "Verify the supplied arithmetic row by row, including the units and the exact contract. Independent model tests cover meaningful presets, strict input rejection, unchanged source input, boundary decisions and manually derived timelines. Primary browser review is separate. No test here demonstrates a kernel queue, packet delivery, latency improvement or a live target result.",
      "troubleshooting": "Reset if the selected scenario is invalid. Read the field error and check integer units, packet order and exact enum values. A valid numeric declaration can still describe a poor policy. For optional actual inspection, check interface, namespace, direction and parent hierarchy before interpreting an empty listing.",
      "challenge": "What additional nonpreemptive serializer model would be required to turn token-eligible releases into one-link physical finish times?",
      "cleanup": "Reset restores the first supplied scenario without changing device state or learner progress. The worksheet owns no interface, process, namespace or qdisc. Any separately authorized device experiment must recover its own exact prior baseline."
    },
    "glossary": {
      "Shaper": "Mechanism delaying traffic to conform to a supplied profile.",
      "Token-eligible release": "Earliest modeled time the complete packet has sufficient byte credit.",
      "FIFO": "First-in, first-out ordering of the supplied finite sequence.",
      "Deficit": "Positive difference between packet bytes and currently available tokens.",
      "Queue wait": "Modeled eligible-release time minus original packet arrival time.",
      "Eligibility checkpoint": "Previous admitted packet’s modeled release time used for refill accounting.",
      "Standalone serialization": "Per-packet link duration shown separately from eligibility.",
      "Oversized-packet contract": "Explicit local rejection of a packet larger than B without fragmentation or exception."
    },
    "exams": [
      {
        "testedConcept": "Missing credit",
        "question": "How does this shaper handle a packet no larger than B when tokens are missing?",
        "answer": "Wait until the full deficit refills.",
        "explanation": "Admissible packets are delayed for complete token credit.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Drop immediately like the chosen policer.",
          "Wait until the full deficit refills.",
          "Mark it yellow and transmit immediately.",
          "Consume only its available fraction."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q01"
      },
      {
        "testedConcept": "Baseline release",
        "question": "After 600 B releases at 0 ms from B = 1000, another 600 B at 0 with R = 8000 releases when?",
        "answer": "200 ms.",
        "explanation": "Only 200 bytes are missing and refill is one byte/ms.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0 ms.",
          "600 ms.",
          "200 ms.",
          "1000 ms."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q02"
      },
      {
        "testedConcept": "FIFO continuation",
        "question": "The previous packet releases at 200 ms leaving zero. A 500 B packet arrives at 200 ms, R = 8000. Its release is?",
        "answer": "700 ms.",
        "explanation": "Its 500-byte deficit requires 500 ms after the 200-ms checkpoint.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "200 ms.",
          "500 ms.",
          "600 ms.",
          "700 ms."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q03"
      },
      {
        "testedConcept": "Output boundary",
        "question": "What is a token-eligible release in this lesson?",
        "answer": "Profile eligibility, before any separately modeled physical serializer.",
        "explanation": "Eligibility is the specific modeled timing boundary.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Profile eligibility, before any separately modeled physical serializer.",
          "The last bit reaching the receiver.",
          "A measured Linux dequeue timestamp.",
          "The application acknowledgement arrival."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q04"
      },
      {
        "testedConcept": "Oversized packet",
        "question": "What does size greater than B do here?",
        "answer": "Drop explicitly as impossible under the chosen contract.",
        "explanation": "This model has no fragmentation or oversized exception.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Wait indefinitely with a computed finite release.",
          "Drop explicitly as impossible under the chosen contract.",
          "Increase B for that packet.",
          "Fragment automatically before shaping."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q05"
      },
      {
        "testedConcept": "Independent C",
        "question": "Changing only C affects which output?",
        "answer": "Standalone serialization duration.",
        "explanation": "Token release uses R and B; C supplies a separate serializer duration.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The token deficit.",
          "The FIFO ordering.",
          "Standalone serialization duration.",
          "The initial bucket balance."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q06"
      },
      {
        "testedConcept": "Fractional eligibility",
        "question": "After emptying the bucket, one byte at R = 3000 becomes eligible after what delay?",
        "answer": "8/3 ms.",
        "explanation": "One byte requires 8000/3000 milliseconds of refill.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0.375 ms.",
          "1 ms.",
          "8 ms.",
          "8/3 ms."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q07"
      },
      {
        "testedConcept": "Same-time release",
        "question": "Why can two packets have identical eligible release timestamps?",
        "answer": "Initial tokens can pay both without advancing time.",
        "explanation": "Burst credit can create simultaneous eligibility but not simultaneous wire service.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Initial tokens can pay both without advancing time.",
          "The link physically serializes both simultaneously.",
          "FIFO is disabled for same-arrival packets.",
          "Their packet sizes were ignored."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q08"
      },
      {
        "testedConcept": "Buffer scope",
        "question": "Which buffer assumption is declared?",
        "answer": "Infinite queue for this finite workload only.",
        "explanation": "This is a bounded teaching workload with an explicit ideal storage assumption.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Linux’s installed TBF limit was discovered.",
          "Infinite queue for this finite workload only.",
          "One packet maximum on all devices.",
          "No waiting storage because shaping drops every excess."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q09"
      },
      {
        "testedConcept": "Kernel distinction",
        "question": "Why does the pinned tc-tbf manual not make this a TBF emulator?",
        "answer": "Actual TBF has additional parameters and implementation behavior absent here.",
        "explanation": "The lesson isolates continuous token eligibility rather than claiming kernel equivalence.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "The manual describes only DSCP.",
          "TBF cannot use a rate parameter.",
          "Actual TBF has additional parameters and implementation behavior absent here.",
          "TBF is the same two-class scheduler used in queuing."
        ],
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Timeline",
        "question": "Give eligible releases for baseline (0,600),(0,600),(200,500), R = 8000, B = 1000.",
        "answer": "0, 200 and 700 milliseconds.",
        "explanation": "Initial tokens pay the first; later deficits require 200 and 500 ms.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-QC1"
      },
      {
        "testedConcept": "Scope",
        "question": "Does changing line capacity C change token-release times here?",
        "answer": "No; it changes only the separate serialization column.",
        "explanation": "R supplies tokens and C supplies the separate link duration.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-QC2"
      },
      {
        "testedConcept": "Impossible packet",
        "question": "Why is size greater than B dropped in this contract?",
        "answer": "The capped bucket can never hold the full packet credit and no oversized exception is modeled.",
        "explanation": "This is an explicit local choice, not a universal hardware rule.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t4",
        "questionId": "s3-g9-t4-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 3290 — shapers and token-bucket discussion",
        "url": "https://www.rfc-editor.org/rfc/rfc3290",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc-tbf manual, comparison only",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-tbf.8",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc inspection syntax",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc.8",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "batch": "10",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "commands": [
      {
        "code": "tc -s qdisc show dev \"$QOS_DEV\"",
        "explanation": "Set QOS_DEV separately to the exact interface of an exclusively owned, already prepared context. Inspect qdisc identity and statistics without changing policy.",
        "expected": "GUIDED, NOT EXECUTED: Preserve the actual root/child handles, qdisc types and counters. A counter snapshot is not a measured original application result.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -s class show dev \"$QOS_DEV\"",
        "explanation": "Inspect existing classes and their available statistics on the same mapped interface. An empty class listing can be valid for a classless qdisc.",
        "expected": "GUIDED, NOT EXECUTED: Correlate class handles with the qdisc hierarchy and actual configured rates; do not manufacture a class for every worksheet row.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc filter show dev \"$QOS_DEV\"",
        "explanation": "Inspect filters in this mapped context. Additional parent or ingress context may be needed for the actual deployment.",
        "expected": "GUIDED, NOT EXECUTED: Record what the command actually lists and identify the hook/hierarchy before interpreting a missing filter. This command does not create classification or marking.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      },
      {
        "code": "tc -d -s qdisc show dev \"$QOS_DEV\"\ntc -d -s class show dev \"$QOS_DEV\"",
        "explanation": "Use the documented detail and statistics options for a second read-only view. Compare the same interface, namespace and observer context.",
        "expected": "GUIDED, NOT EXECUTED: Inspect actual parameter details and cumulative counters. No supplied output, kernel scheduling trace or packet capture is claimed.",
        "filename": "bash",
        "platform": "Linux iproute2 v6.6.0 manual scope; read-only, mapped owned interface required"
      }
    ],
    "configuration": "Use the browser for the tabletop calculations. Optional command inspection requires an exclusively owned, already configured Linux context, a mapped interface name, correct network namespace and a known traffic-control hierarchy. Set QOS_DEV outside the supplied commands to that exact interface. The iproute2 v6.6.0 manual is a pinned syntax reference; installed binaries, kernel support, hardware offload and distribution packaging must be checked at the actual target. No qdisc add, change, replace, delete, filter mutation, packet generator or namespace creation is supplied. Record the existing policy and observer context before any separately authorized experiment. A browser preset is an input declaration and cannot configure a Linux interface.",
    "production": "Place each observation at a named interface and direction. The local egress device, an ingress redirect target, an upstream switch and a remote provider can have different congestion points. Confirm which resource is constrained before choosing a rate or scheduler. Preserve the original application, endpoint, route, return path and observation interval when comparing results. A favorable local worksheet result does not establish receiver performance or an SLA. Deployments also need ownership, change control, independent management and a recovery baseline. The optional read-only commands describe an existing object; absent objects, offloaded counters or a different namespace need investigation rather than an assumed default policy.",
    "security": "Treat class and marking declarations as policy inputs, not proof of trusted traffic. An endpoint can request a preferred DSCP without being entitled to it. Establish a trust boundary and validate or remark traffic according to the actual administrative policy. Limit changes to authorized interfaces and protect management traffic independently. Packet or counter evidence can expose endpoint identities and workload patterns, so preserve only necessary context. This worksheet accepts bounded numeric declarations and inert text; it does not authenticate a flow, configure a filter or protect a device. A priority label alone is not a security boundary.",
    "performance": "The calculations use exact declared units and ideal local arithmetic. They omit framing overhead, interpacket gaps, segmentation, retransmissions, clock granularity, driver queues, device offload and competing unlisted traffic. These omissions are explicit scope limits, not estimates of zero cost. Fractional milliseconds are retained internally and rounded only for display. Serialization concerns one selected link; propagation and application response time remain separate. Compare actual counters and application evidence over a known interval before drawing a performance conclusion. The independent application-readiness checkbox expresses context only and cannot turn model arithmetic into an observed service result.",
    "id": "s3-g9-t5",
    "title": "Queuing",
    "subtitle": "Compare FIFO with nonpreemptive strict priority on one ideal link.",
    "interactive": "queuing",
    "definition": "Queuing stores packets awaiting service, while a scheduler chooses the next eligible packet when the resource is free. This worksheet supplies a finite workload of at most eight packets and one ideal link server. It compares FIFO with strict priority between supplied H and L classes. Service is nonpreemptive: a packet already on the link finishes before another begins. The calculated start, finish, wait and sojourn times belong to this explicit local schedule, not to a measured Linux queue or an end-to-end application transaction.",
    "purpose": "Use a complete small timeline to understand how selection rules change waiting time without changing packet serialization. Priority matters only among packets that have already arrived and are waiting at the moment the server becomes free. A high-priority packet arriving during a low-priority transmission still waits for that transmission to finish. The finite model demonstrates individual outcomes and tie handling. It cannot measure starvation from unbounded future high-priority arrivals or reproduce every weighted or vendor-specific scheduler.",
    "mental": "Picture one checkout desk that serves complete packets. FIFO chooses the oldest waiting arrival, using input order when times tie. Strict priority first looks for any waiting H packet; if one exists it selects the oldest H, otherwise the oldest L. Once a packet begins, the desk stays occupied for bytes times 8000/C milliseconds. No class can interrupt those already-started bits. A silent interval leaves the desk idle until the next declared arrival.",
    "components": [
      "C is a positive integer bits-per-second capacity. Each packet’s service duration is bytes times 8000 divided by C milliseconds. The finite workload supplies integer sizes and nondecreasing integer arrivals; computed times can be fractional. Packet sizes determine how long the server remains busy, so equal packet counts need not mean equal transmitted bytes or equal service time.",
      "Class H or L is an exact supplied enum. It is not derived from DSCP, transport port, payload or authenticated application identity. Under FIFO the label does not alter selection. Under strict priority H takes precedence only over L packets that are already waiting. The lesson supplies no classification implementation and does not equate H with a configured Cisco low-latency queue.",
      "The waiting queue is infinite for this finite input. There are no buffer drops, admission limits, ECN marks or tail-drop decisions. Every valid packet eventually completes because the listed workload ends and each service duration is finite. This termination fact is a consequence of bounded input, not a claim that low-priority traffic avoids starvation under continuous future high-priority load.",
      "Input order resolves equal arrival times within a selected priority class or across all classes under FIFO. This deterministic rule is part of the teaching contract. At initial time zero, all entries with arrival zero are already available; strict priority can choose a later-listed H ahead of an earlier-listed L. It must not choose a future H before that packet has arrived.",
      "Start time is when the selected packet begins occupying the link. Finish time is start plus serialization. Wait is start minus arrival. Sojourn is finish minus arrival and therefore wait plus serialization. These columns expose different boundaries. Propagation to a remote endpoint, driver buffering and application acknowledgement are outside this local one-server timeline.",
      "The scheduler is work-conserving under the declared input: if any packet is waiting when the link becomes free, service starts immediately. If none is waiting, time advances to the earliest pending arrival. Strict priority can disadvantage L when H remains continuously backlogged. Fairer byte-based methods such as DRR or WFQ involve additional state and weights; none is implemented by assigning equal packet turns here."
    ],
    "mechanism": [
      "Validate one to eight exact packet objects with ordered arrival, bounded integer byte size and class H or L. Validate capacity, policy enum and independent readiness boolean without coercion. Do not silently accept lowercase class names, unknown policy text, extra packet properties or unsorted arrivals.",
      "Begin with a free server at time zero. Gather only packets with arrival no later than the current free instant. If this set is empty, move the server clock to the earliest remaining arrival, preserving an explicit idle interval rather than inventing service before arrival.",
      "For FIFO, select the waiting packet with the earliest arrival and then earliest input index. For strict priority, select waiting H before waiting L, then apply the same arrival/index rule within that class. Selection is repeated only when the current complete packet finishes.",
      "At C = 8000, the baseline 1000-byte L packet at 0 starts immediately and finishes at 1000 ms. A 100-byte L arrives at 100 ms and a 100-byte H at 200 ms. Neither can interrupt the first packet. At the 1000-ms free instant FIFO serves the waiting L first, while strict priority serves H first.",
      "Under FIFO baseline finishes are 1000, 1100 and 1200 ms in input order. Under strict priority the H packet finishes at 1100 and the second L at 1200. The H wait changes from 900 to 800 ms; the second L wait changes from 900 to 1000 ms. Total listed byte service remains the same.",
      "Compare simultaneous arrival and fractional capacity cases. With C = 3000, a one-byte service duration is 8/3 ms and two bytes take 16/3 ms. Retain full precision through successive finishes. The pinned tc-prio guide describes a specific Linux priority-band hierarchy, but this two-class abstract scheduler does not reproduce that qdisc’s filters, child disciplines or kernel runtime."
    ],
    "flow": [
      [
        "Declare finite workload",
        "Provide ordered arrivals, packet bytes, H/L class and link capacity."
      ],
      [
        "Wait for a free server",
        "Gather arrived packets or advance to the next actual arrival."
      ],
      [
        "Select and finish one packet",
        "Apply FIFO or H-first selection without interrupting service."
      ],
      [
        "Compare timing boundaries",
        "Read start, finish, wait and sojourn; keep application context independent."
      ]
    ],
    "comparison": [
      [
        "FIFO / strict priority",
        "Oldest waiting packet / oldest waiting H before L",
        "Selection changes only at server-free instants."
      ],
      [
        "Waiting priority / preemption",
        "Choice of next packet / interruption of current service",
        "This scheduler offers priority without packet interruption."
      ],
      [
        "Wait / sojourn",
        "Arrival to start / arrival to finish",
        "Sojourn includes serialization as well as wait."
      ],
      [
        "Packet WRR / byte fairness",
        "Turns counted in packets / service accounting in bytes",
        "Unequal sizes make equal packet turns unequal byte service."
      ],
      [
        "Finite completion / starvation risk",
        "All listed packets finish / sustained future H can delay L",
        "A bounded input cannot measure unbounded starvation."
      ]
    ],
    "example": "The nonpreemptive preset sends a 1000-byte L at 0 ms and introduces a 100-byte H at 1 ms on C = 8000 bps. L occupies the server until 1000 ms. H starts then, finishes at 1100 ms and waits 999 ms. Raising H’s preference does not remove the already-started packet’s serialization. To compare FIFO and strict priority, use the baseline with two waiting packets of different classes at the next free instant.",
    "ports": "The H/L labels contain no transport port or actual classifier. Linux PRIO selection requires a supported mapped hierarchy and classification behavior. No qdisc is installed, no packet is transmitted and no capture is produced by the browser.",
    "troubleshooting": [
      [
        "H starts before its arrival in a proposed trace",
        "Restrict candidates to arrived waiting packets at the server-free instant."
      ],
      [
        "H interrupts L mid-packet",
        "Apply nonpreemptive service; priority selects the next packet only."
      ],
      [
        "Equal packet turns are called equal bandwidth",
        "Compare byte sizes and total serialization time, not just packet counts."
      ],
      [
        "All finite packets finish, so starvation is dismissed",
        "Separate this ending workload from sustained future high-priority arrivals."
      ]
    ],
    "mistakes": [
      "Giving priority to a future packet that has not arrived.",
      "Treating strict priority as preemption of bits already in service.",
      "Calling FIFO versus H/L priority a WFQ, DRR or vendor LLQ implementation.",
      "Using local sojourn as a receiver or application latency measurement."
    ],
    "prerequisites": [
      "s3-g9-t0",
      "s3-g9-t1",
      "s3-g9-t2"
    ],
    "related": [
      "s3-g9-t3",
      "s3-g9-t4"
    ],
    "lab": {
      "objective": "Build and compare complete finite FIFO and strict-priority schedules.",
      "requirements": "Browser only for the supplied exercise. Optional guided inspection needs an exclusively owned, already prepared Linux interface with known namespace and policy. There is no live Linux traffic-control execution in this lesson.",
      "topologyKind": "shared",
      "topology": [
        "Declared finite workload → local worksheet → computed rows",
        "Original application readiness: supplied independently",
        "Optional existing Linux interface: inspect only, outside browser calculations"
      ],
      "steps": [
        "Derive the baseline FIFO order, starts and finishes at C = 8000.",
        "Switch to strict priority and compare each packet’s wait, not only final completion time.",
        "Use nonpreemptive to show that H arriving at 1 ms cannot interrupt L.",
        "Compare same-arrival presets and state the input-order tie rule.",
        "Use idle to preserve the gap before the next arrival.",
        "Use fractional capacity to derive 8/3 and 8 ms finishes without rounding intermediate time.",
        "Toggle readiness, reject unknown policies/classes and unsorted input, confirm invalid scenario persistence, then keyboard-scroll and Reset."
      ],
      "verification": "Verify the supplied arithmetic row by row, including the units and the exact contract. Independent model tests cover meaningful presets, strict input rejection, unchanged source input, boundary decisions and manually derived timelines. Primary browser review is separate. No test here demonstrates a kernel queue, packet delivery, latency improvement or a live target result.",
      "troubleshooting": "Reset if the selected scenario is invalid. Read the field error and check integer units, packet order and exact enum values. A valid numeric declaration can still describe a poor policy. For optional actual inspection, check interface, namespace, direction and parent hierarchy before interpreting an empty listing.",
      "challenge": "Can a finite eight-packet worksheet establish a lower-priority starvation bound when arbitrary future high-priority arrivals are unknown? Explain the missing information.",
      "cleanup": "Reset restores the first supplied scenario without changing device state or learner progress. The worksheet owns no interface, process, namespace or qdisc. Any separately authorized device experiment must recover its own exact prior baseline."
    },
    "glossary": {
      "Queue": "Storage for arrived packets awaiting service.",
      "Scheduler": "Rule selecting the next waiting packet at a free resource.",
      "FIFO": "Selection by earliest arrival, with input order resolving equal times.",
      "Strict priority": "Selection of waiting H before waiting L in this two-class model.",
      "Nonpreemptive service": "A packet already started completes before another begins.",
      "Wait time": "Packet start time minus its original arrival time.",
      "Sojourn time": "Packet finish time minus its original arrival time.",
      "Work-conserving scheduler": "Server begins work whenever a packet is waiting.",
      "Starvation": "Persistent lack of service for a class under continuing competing workload.",
      "Deficit round robin": "Scheduling method using byte-based deficit accounting rather than equal packet turns."
    },
    "exams": [
      {
        "testedConcept": "Nonpreemption",
        "question": "L of 1000 B starts at 0 on C = 8000; H arrives at 1 ms. When can H start?",
        "answer": "1000 ms.",
        "explanation": "The current L service lasts 1000 ms and cannot be interrupted.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "1 ms.",
          "1000 ms.",
          "100 ms.",
          "After half the L packet."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q01"
      },
      {
        "testedConcept": "Eligible candidates",
        "question": "At server-free time 100 ms, H arrives at 101 and L is already waiting. Strict priority selects?",
        "answer": "The waiting L now.",
        "explanation": "Only already-arrived waiting packets are candidates.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Future H before it arrives.",
          "Neither until every class is populated.",
          "The waiting L now.",
          "H at time zero retroactively."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q02"
      },
      {
        "testedConcept": "FIFO tie",
        "question": "Two packets arrive at 0: listed L then H. FIFO chooses which first?",
        "answer": "The first-listed L.",
        "explanation": "FIFO ignores H/L for selection and uses input order for equal arrivals.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "H because it has a preferred class.",
          "The smaller real IP.",
          "The longest packet.",
          "The first-listed L."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q03"
      },
      {
        "testedConcept": "Priority tie",
        "question": "Listed L,H,H all arrive at 0. Strict priority chooses what order?",
        "answer": "First H, second H, then L.",
        "explanation": "H precedes L, and input order resolves the tie between H packets.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "First H, second H, then L.",
          "L, first H, second H.",
          "Second H, L, first H.",
          "All three start simultaneously."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q04"
      },
      {
        "testedConcept": "Sojourn",
        "question": "Arrival is 100 ms, start 1000 and finish 1100. What is sojourn?",
        "answer": "1000 ms.",
        "explanation": "Sojourn is finish minus arrival; wait is 900 and service is 100.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "900 ms.",
          "1000 ms.",
          "100 ms.",
          "1100 ms."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q05"
      },
      {
        "testedConcept": "Fractional service",
        "question": "One byte at C = 3000 requires what service duration?",
        "answer": "8/3 ms.",
        "explanation": "One byte is eight bits, giving 8000/3000 milliseconds.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "0.375 ms.",
          "3 ms.",
          "8/3 ms.",
          "8000 ms."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q06"
      },
      {
        "testedConcept": "Idle server",
        "question": "No packet is waiting and the next arrival is at 500 ms. What does the scheduler do?",
        "answer": "Remain idle until 500 ms.",
        "explanation": "The server advances only to an actual next arrival.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Transmit a placeholder packet.",
          "Start the future packet at the prior finish.",
          "Set wait to negative time.",
          "Remain idle until 500 ms."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q07"
      },
      {
        "testedConcept": "Finite starvation scope",
        "question": "What can this finite workload establish about starvation?",
        "answer": "Listed packets complete; unbounded future starvation is not measured.",
        "explanation": "The finite input ends; sustained unlisted arrivals require a separate argument.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Listed packets complete; unbounded future starvation is not measured.",
          "L can never starve under continuous H traffic.",
          "All strict-priority systems guarantee equal class wait.",
          "The final timestamp is a universal starvation bound."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q08"
      },
      {
        "testedConcept": "Packet versus byte fairness",
        "question": "Why are equal packet turns not necessarily equal byte bandwidth?",
        "answer": "Packet sizes can differ, so turns consume different byte totals.",
        "explanation": "Service consumption depends on bytes, not only packet counts.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "DSCP changes packet length to one byte.",
          "Packet sizes can differ, so turns consume different byte totals.",
          "FIFO removes serialization.",
          "Every H packet is the same size as every L packet."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q09"
      },
      {
        "testedConcept": "Policy boundary",
        "question": "Which algorithm is implemented by this worksheet?",
        "answer": "Two-class FIFO or strict priority on one ideal server.",
        "explanation": "The declared model excludes kernel hierarchy and weighted/vendor algorithms.",
        "difficulty": "Intermediate",
        "type": "multiple-choice",
        "options": [
          "Linux’s full three-band PRIO hierarchy.",
          "Cisco LLQ with its policer.",
          "Two-class FIFO or strict priority on one ideal server.",
          "Weighted fair queuing with inferred weights."
        ],
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Baseline priority",
        "question": "At C = 8000, baseline packets are (0,1000,L),(100,100,L),(200,100,H). Give strict-priority service order.",
        "answer": "Packet 1, packet 3, packet 2.",
        "explanation": "Packet 1 has already begun; at 1000 ms both others wait and H wins.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-QC1"
      },
      {
        "testedConcept": "Wait arithmetic",
        "question": "H arrives at 1 ms, starts at 1000 and finishes at 1100. Give wait and sojourn.",
        "answer": "Wait 999 ms; sojourn 1099 ms.",
        "explanation": "Subtract arrival from start and finish respectively.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-QC2"
      },
      {
        "testedConcept": "Fairness distinction",
        "question": "Why should byte-based DRR/WFQ not be described as equal packet turns?",
        "answer": "Unequal packet sizes require byte/service accounting rather than packet-count equality.",
        "explanation": "Those algorithms have additional accounting and are not implemented here.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "s3-g9-t5",
        "questionId": "s3-g9-t5-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 3290 — queues and schedulers",
        "url": "https://www.rfc-editor.org/rfc/rfc3290",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc-prio manual, scoped comparison",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-prio.8",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc inspection syntax",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc.8",
        "checked": "2026-10-09"
      },
      {
        "title": "iproute2 v6.6.0 — tc-drr byte deficit accounting, prose comparison only",
        "url": "https://github.com/iproute2/iproute2/blob/v6.6.0/man/man8/tc-drr.8",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "lab-3",
    "batch": "10",
    "title": "Advanced Routing & Switching Lab",
    "subtitle": "Trace one owned campus exchange across VLAN, virtual gateway, underlay, external route and return boundaries.",
    "level": "Advanced → Production",
    "minutes": 150,
    "interactive": "advanced-lab",
    "definition": "This integrated lab combines two distribution switches, two campus routers, VLAN segmentation, HSRPv2, OSPFv2 and an explicitly bounded BGP route-policy boundary. D1 and D2 share campus VLAN10 and VLAN20 broadcast domains; routed links connect D1–R1, D2–R2 and R1–R2. R1 and R2 are AS65001 speakers, and a separately owned external AS65002 peer supplies remote 198.51.100.0/24 outside the four-device campus. The browser evaluates supplied selected-path declarations only. The downloadable workbook defines optional prepared-target observations and a timestamped failure exercise; no Cisco image, router process or packet experiment is executed by the worksheet.",
    "purpose": "Build a defensible explanation for an original source-to-service exchange and its behavior during one owned failure. Preserve the original roadmap exercise: prepare two distribution switches and two routers, use HSRP with OSPF/BGP and VLAN/route-policy boundaries, then record failure observations. Distinguish a selected gateway from usable upstream routing, an OSPF adjacency from its required selected route, a BGP session from an admitted destination and a route from a working application. The goal is a reproducible evidence record, not a claim that green checkboxes measured convergence.",
    "mental": "Follow one packet's required evidence pages without assuming the preceding page proves the next. First identify the campus endpoint's VLAN and virtual gateway. Then inspect the selected gateway uplink, actual shared routing context and underlay route. Next inspect the admitted remote BGP prefix and system choice, followed by packet policy, the original opposite direction and service state. Redundancy supplies possible resources, not an automatic proof that another path took over. A separate observation notebook records timestamps and packet results when real prepared equipment is available.",
    "components": [
      "Campus devices: D1/D2 are supported IOS XE17 L3 switches and R1/R2 are supported IOS XE17 routers in the optional target plan. Real interface names and feature/license support must be mapped before any command.",
      "VLAN10:172.16.10.0/24 with VIP 172.16.10.1, D1 SVI172.16.10.2 and D2 SVI172.16.10.3. Prepared HSRPv2 group 10 declares D1 active priority 110 and D2 standby priority 100 with preempt enabled. These are supplied baseline observations, not a browser election.",
      "VLAN20:172.16.20.0/24 with independent group 20 and VIP 172.16.20.1. It is a separate broadcast scope; the worksheet models VLAN10 only. Both VLANs use the prepared shared campus routing table unless a separately designed VRF boundary exists.",
      "OSPFv2 area 0: routed links10.0.1.0/30,10.0.2.0/30 and 10.0.3.0/30. Endpoint SVI networks are advertised passively in the prepared plan; passive advertisement does not create neighbors on the endpoint VLAN.",
      "BGP and route policy: both campus routers use AS65001; an owned outside peer is AS65002. Exact import/export scope, usable NEXT_HOP, BGP choice and system installation are independent evidence questions. The worksheet checks supplied remote import prerequisites and does not calculate full internal distribution or best path.",
      "Original outcome and measurement: packet policy, opposite-direction reachability and application readiness are independent. Actual observation requires timed original probes before, during and after one owned fault with a declared continuous-restoration criterion."
    ],
    "mechanism": [
      "Bound the original exchange and observers before drawing failure conclusions. Record the campus source, remote service endpoint, family, routing table, packet protocol/port and actual ingress attachment. The VLAN declarations compare the campus endpoint's expected and actual VLAN membership; the remote AS65002 endpoint is outside the campus and is not being assigned to VLAN10 by this check. The browser accepts numeric VLAN10/20 and selectedGateway A/B/none, with A mapping to D1 and B to D2.",
      "Establish the two campus broadcast scopes and shared routing context deliberately. VLAN10 and VLAN20 isolate Layer2 broadcast membership, but their SVIs in one ordinary routing table can route between those networks. VLAN segmentation alone creates neither a VRF nor an IP access-control boundary. Record any intended inter-VLAN packet policy separately, and preserve the trunk/access allowed VLANs and host masks. The worksheet's wrong-VLAN case fails its supplied VLAN10 path without claiming that VLAN20 can never communicate in a different valid design.",
      "Verify the prepared VLAN10 HSRPv2 observations. D1 priority 110 is supplied active and D2 priority 100 is supplied standby with preempt enabled. Availability of the virtual gateway is a separate declaration from which device is selected. The model never computes priority ties, timers, roles or preemption. VLAN20 group 20 is independent and must be observed on the actual target; it is not evidence that group 10 has identical state. Use the exact group and interface before interpreting active/standby output.",
      "Inspect the selected gateway uplink independently of its HSRP role. An active D1 with an unusable D1–R1 link can still own a usable VLAN10 virtual gateway if the prepared baseline has no effective upstream tracking. D2's lower priority and configured preempt do not themselves detect every upstream failure or guarantee takeover. A reviewed tracking design can change priorities, but this exercise does not silently add it. The selectedGateway control supplies an observed choice rather than predicting the alternate path after a fault.",
      "Check the underlay's actual table, required adjacency and required selected route. Area0 on the three routed links does not imply that every expected network exists at every observer. Passive SVI advertisements contribute campus destinations without forming endpoint adjacencies. Preserve OSPF interface, neighbor and route evidence separately. The worksheet intentionally distinguishes ospfAdjacencyReady from ospfRouteSelected; adjacency alone is insufficient for the chosen original path. It does not calculate LSAs, SPF or reconvergence.",
      "Inspect the remote destination at the relevant BGP speaker. Session readiness, exact 198.51.100.0/24 import admission, usable NEXT_HOP and selected BGP choice all must agree. R1/R2 internal distribution and R1's outside peer are explicit prepared-target design, not a browser mesh simulator. Export toward the external peer is a separate observation, especially for campus return reachability; denying one export does not inherently delete a local route. Record the correct observer, family and peer before comparing local and remote visibility.",
      "Compare protocol choice with the actual system route used by the original source path. A BGP selected candidate can coexist with system displacement, while a distribution switch can require its deliberately prepared exact-prefix forwarding route toward its local router. The workbook separates D1/D2 remote forwarding intent from router BGP information rather than pretending that OSPF automatically imports BGP destinations. The browser uses systemSelected as a declaration and does not implement source-distance competition, recursive route lookup or hardware programming.",
      "Read original packet policy and return evidence after routing. A route filter admits control-plane information; an ACL can deny packets even while that route remains selected. Preserve the remote endpoint's return route toward172.16.10.0/24, reverse packet policy and endpoint service state independently. A ping to a gateway or next hop is a supporting observation rather than proof of the original remote application. The applicationReady declaration is another gate; it does not execute or authenticate the service.",
      "Record actual failure observations only when the separately prepared target exists. Run the original probe sequence before injection, continue without restarting it through the fault and restoration, and preserve sample times, interval, loss and observer context. Note injection time, last successful observation before injection, first observed failure, first subsequent success and the start of a declared sustained-success window. An observed post-injection first-success gap is a sampled end-to-end observation; it is not pure protocol convergence, an exact detection timestamp or proof of zero loss between samples.",
      "Restore exact original ownership and dependencies. The optional workbook fault is a single reviewed mapped D1–R1 interface shutdown followed by exact no shutdown restoration; it requires an isolated owned target, preserved baseline and independent management access. Keep changes unsaved, do not use reload or broad clears as rollback, and stop if ownership or control is lost. Recollect gateway, underlay, BGP/system, packet and original service evidence before claiming baseline restoration. Browser reset changes declarations only and records no device result."
    ],
    "flow": [
      [
        "Map the original campus exchange",
        "Fix endpoint VLAN, virtual gateway, address plan, table and independent management."
      ],
      [
        "Trace control and forwarding prerequisites",
        "Inspect selected uplink, underlay route, exact BGP prefix and system choice separately."
      ],
      [
        "Observe one owned failure",
        "Keep timestamped original probes and control-plane evidence before, during and after the mapped fault."
      ],
      [
        "Restore and assess the evidence",
        "Restore the exact interface baseline and verify sustained original service without inventing protocol timing."
      ]
    ],
    "comparison": [
      [
        "VLAN separation / routing isolation",
        "Broadcast membership / deliberately distinct routing context",
        "Two SVIs in the shared campus RIB can route between VLANs unless explicit policy says otherwise."
      ],
      [
        "HSRP selected role / upstream usability",
        "Virtual-gateway ownership / selected routed uplink health",
        "An active role can persist during an upstream-only failure without effective tracking."
      ],
      [
        "OSPF neighbor / selected route",
        "Control adjacency / required forwarding information",
        "A live neighbor does not establish every destination route."
      ],
      [
        "BGP session / destination admission",
        "Peer control state / exact-prefix policy and NEXT_HOP eligibility",
        "Established does not mean every remote prefix is usable."
      ],
      [
        "Sampled recovery observation / protocol convergence",
        "Original exchange timestamps / internal protocol completion timing",
        "Probe interval and multiple layers limit the conclusion."
      ],
      [
        "Declared agreement / actual service",
        "Supplied worksheet inputs / observed original transaction",
        "Green gates measure no packets and certify no application."
      ]
    ],
    "example": "Begin with selected gatewayA/D1 and all independent declarations true. Remove only selectedGatewayUplinkReady: virtual-gateway selection remains supplied D1, while the trace stops at uplink. Do not infer D2 takeover. Restore it and remove ospfRouteSelected while leaving adjacency ready, then deny BGP import while leaving session ready. Finally preserve all network gates and remove returnReady or applicationReady separately. These cases isolate mechanism boundaries; real failure timing requires the workbook's continuous timestamped original probes.",
    "ports": "The prepared HSRPv2 IPv4 group uses multicast 224.0.0.102 and UDP 1985; inspect the exact version rather than using HSRPv1 multicast 224.0.0.2 assumptions. OSPFv2 uses IP protocol 89, and BGP conventionally uses TCP 179. These are distinct control mechanisms. The original application's actual protocol/port must be recorded separately. The worksheet opens no socket, sends no hello/update or application request, and models no timers.",
    "commands": [
      {
        "code": "show standby brief\nshow vlan brief\nshow interfaces trunk",
        "platform": "Prepared supported IOS XE17 D1/D2 campus switches; GUIDED NOT EXECUTED",
        "explanation": "Preserve exact VLAN10/group 10 gateway state, source/access membership and trunk VLAN carriage on both observers.",
        "expected": "An active/standby role and VLAN listing are control/configuration observations, not proof of upstream routing or the original remote exchange. Inspect detailed group state when the brief view is insufficient."
      },
      {
        "code": "show ip ospf neighbor\nshow ip ospf interface\nshow ip route ospf",
        "platform": "Prepared supported IOS XE17 area 0 D1/D2/R1/R2; GUIDED NOT EXECUTED",
        "explanation": "Read routed-link adjacency, passive SVI context and selected OSPF information separately in the actual campus table.",
        "expected": "A neighbor can exist while the required selected underlay or return route is absent. No OSPF database, SPF or convergence event was executed by the browser."
      },
      {
        "code": "show ip bgp summary\nshow ip bgp 198.51.100.0 255.255.255.0\nshow ip bgp neighbors 203.0.113.2 advertised-routes",
        "platform": "Prepared supported IOS XE17 R1 with mapped owned AS65002 peer 203.0.113.2; GUIDED NOT EXECUTED",
        "explanation": "Separate session, exact remote candidate attributes and the independent return-prefix advertisement toward the outside peer.",
        "expected": "Use R1's actual peer mapping; R2 has different internal-peer context. An advertisement view does not bypass receiving-side policy or prove actual return traffic."
      },
      {
        "code": "show ip route 198.51.100.10\nshow ip arp\nshow ip interface\nshow running-config",
        "platform": "Prepared supported IOS XE17 mapped original-path observer; GUIDED NOT EXECUTED",
        "explanation": "Compare system lookup, local neighbor context, actual interface packet-policy attachment and precise relevant baseline intent.",
        "expected": "Preserve sensitive configuration securely. Route and ARP observations do not measure the original application; repeat the timed original exchange in both directions on a separately prepared target."
      }
    ],
    "configuration": "This lesson does not deploy a topology. Prepare exclusively owned supported IOS XE17 targets and map real interfaces, feature support, address ownership, endpoint tests and independent management before any exercise. The workbook records the intended VLAN/SVI, HSRP groups, area 0 links and explicit external peer. Review exact route-filter and forwarding attachments with source/return context. Only the workbook's separately prepared fault procedure contains a mapped interface shutdown/no shutdown example, labeled GUIDED NOT EXECUTED. Preserve the exact prior admin state and relevant configuration outside the device, keep the exercise change unsaved and restore that baseline. Do not reload, save changes or broadly clear routing processes as a substitute for controlled rollback.",
    "production": "Campus redundancy needs complete control, forwarding and operating designs. Two distribution switches do not guarantee useful gateway failover if selected upstream health is not tied to a reviewed tracking policy. Two routers do not automatically share external prefix visibility or next-hop reachability. VLAN placement, shared-table inter-VLAN policy, OSPF endpoint advertisement, internal BGP distribution, external import/export and reverse service all require explicit ownership. Maintain management independence and preserve each observer's evidence. This four-device exercise is a bounded integration lesson; its declarations are not a production architecture, zero-loss guarantee or recommendation to copy addressing and priorities into another network.",
    "troubleshooting": [
      [
        "VLAN10 host cannot use virtual gateway",
        "Check actual access/trunk membership, host mask, SVI and exact HSRP group before changing routing protocols."
      ],
      [
        "D1 active during upstream failure",
        "Inspect mapped uplink and effective tracking/preemption intent; selected role alone does not prove remote reachability."
      ],
      [
        "OSPF neighbor present but remote dependency missing",
        "Read required underlay/system route and actual table; passive campus advertisements and routed-link adjacency answer different questions."
      ],
      [
        "BGP session established but destination unavailable",
        "Inspect exact-prefix admission, received/selected attributes and usable NEXT_HOP separately from the peer summary."
      ],
      [
        "System route selected yet original service fails",
        "Preserve packet-policy attachment, real FIB/neighbor observations, remote return and endpoint application evidence."
      ],
      [
        "One probe succeeds after failure",
        "Apply the declared sustained-restoration criterion and retain subsequent samples; an isolated success is not continuous recovery."
      ],
      [
        "Measured gap called protocol convergence",
        "State observer, probe interval, loss and layered scope. Internal HSRP/OSPF/BGP event timestamps need their own evidence."
      ],
      [
        "Restore command issued but baseline not recovered",
        "Recheck interface admin/oper state and exact original gateway/route/service observations; a command acknowledgement is insufficient."
      ]
    ],
    "security": "Segmentation and route filtering constrain different scopes. VLAN10/VLAN20 membership does not automatically isolate their IP routing or authorize remote prefixes. Route import/export policy is not packet ACL enforcement, and a label or selected BGP path is not authenticated provenance. Protect management, peer and endpoint ownership, keep independent access during a fault and handle baseline configuration/captures securely. Review the actual service's authentication separately from reachability. The workbook authorizes no production change or unknown interface fault; its guided procedure depends on exact exclusive ownership and a prepared supported target.",
    "performance": "Observed recovery includes sampling, gateway availability, underlay and BGP/system behavior, packet-policy state and the application itself. A one-second probe interval cannot prove an exact subsecond event or zero loss between samples. Preserve continuous samples and control-plane observations without equating their timestamps. The worksheet computes only gate conjunctions; it measures no CPU, queue, traffic load, hardware FIB programming, throughput or convergence. Report sample count, losses, outage observation bounds and sustained-restoration criteria from actual target evidence, including measurement uncertainty and the observer's clock.",
    "mistakes": [
      "Treating VLAN broadcast separation as an automatic VRF or IP security boundary.",
      "Inferring upstream health or failover from HSRP active state alone.",
      "Treating OSPF adjacency as proof of a selected destination route.",
      "Treating BGP Established as exact-prefix admission and installation.",
      "Assuming the worksheet predicts an alternate path or protocol convergence.",
      "Calling the first isolated successful probe sustained recovery.",
      "Saving, reloading or broadly clearing unrelated processes during a one-interface fault.",
      "Claiming real service from all-green supplied declarations."
    ],
    "prerequisites": [
      "s3-g7-t0",
      "s3-g1-t0",
      "s3-g3-t0",
      "s3-g5-t0",
      "s2-g2-t0"
    ],
    "related": [
      "s3-g8-t0",
      "s3-g9-t0"
    ],
    "lab": {
      "objective": "Integrate the original two-switch/two-router HSRP/OSPF/BGP/VLAN/filtering exercise while separating declared path dependencies from actual timestamped failure and sustained recovery evidence.",
      "requirements": "Browser for the tabletop worksheet. Optional actual execution requires exclusively owned supported IOS XE17 L3 switches/routers, mapped interfaces/address plan, outside AS65002 peer and remote service, clocked original probes, preserved baseline and independent management. No Cisco runtime or actual target is provided here.",
      "topologyKind": "shared",
      "topology": [
        "VLAN10 and VLAN20 shared across D1/D2; independent HSRPv2 groups10/20",
        "D1–R1:10.0.1.0/30 and D2–R2:10.0.2.0/30",
        "R1–R2:10.0.3.0/30 OSPFv2 area 0; campus endpoints advertised passively",
        "R1/R2 AS65001 → separately owned outside AS65002 peer → remote 198.51.100.0/24"
      ],
      "steps": [
        "Use the workbook to fill exclusive ownership, exact device/interface mapping and baseline observations; do not substitute an unknown host or production table.",
        "Record source VLAN10, VIP and chosen gateway, actual area 0 adjacency/route, BGP candidate/system route and original forward/return application baseline.",
        "Compare all supplied missing-dependency cases in the browser; keep the chosen gateway supplied rather than predicting a new election.",
        "For a separately prepared target, run continuous timestamped original probes before, during and after one reviewed mapped uplink fault, preserving control-plane snapshots independently.",
        "Restore exact original interface state with the mapped no shutdown only when the baseline was administratively up; keep changes unsaved and stop if ownership or independent management is lost.",
        "Apply the declared sustained-success criterion, report interval/loss/observation bounds and verify baseline gateway/route/service restoration.",
        "Reset the browser and reconcile optional target evidence. Delete only exclusively owned unused lab resources after exact restoration and independent baseline verification."
      ],
      "verification": "Tabletop output reports supplied gate agreement only. Actual original transaction, control-plane changes, failure timestamps and recovery observations require the prepared target/workbook evidence. There is no router, election, SPF, full best-path, packet or convergence result from browser controls.",
      "troubleshooting": "Start with the first missing declaration but preserve later independent states; do not assume an earlier failure changes every later observation. On a real target, collect the actual owned scope before changing one demonstrated fault and restore exact intent.",
      "challenge": "Hold D1 active and virtual gateway usable while its uplink is unavailable; explain why D2 preempt alone does not prove takeover. Then leave OSPF adjacency present while removing its selected underlay route, and leave BGP session present while denying exact import. Contrast those cases with a missing original return or application.",
      "cleanup": "Reset restores browser declarations only. Optional target work restores the exact prior mapped interface admin state and relevant policy attachments, verifies baseline original service and independent management, then removes exclusively owned unused resources. No save, reload, broad peer clear or automatic protocol repair is performed."
    },
    "glossary": {
      "Selected gateway": "Supplied observed D1/D2 choice for VLAN10; no browser election.",
      "Shared campus RIB": "Prepared ordinary routing table containing campus SVIs and routed underlay routes.",
      "Passive SVI": "Campus network advertisement without forming OSPF neighbors on the endpoint VLAN.",
      "Observed recovery": "Timestamped original probe evidence of restored operation under a declared criterion.",
      "Sampling interval": "Time between observations, limiting event timing and unobserved-loss claims.",
      "Sustained success": "Declared consecutive-success window used to distinguish recovery from one isolated reply."
    },
    "exams": [
      {
        "testedConcept": "VLAN scope",
        "question": "Do VLAN10 and VLAN20 alone create separate IP routing tables?",
        "answer": "No; the prepared campus uses a shared RIB unless a separate design says otherwise.",
        "explanation": "Broadcast separation does not create a VRF or automatically deny inter-VLAN routing.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; every VLAN is automatically a VRF.",
          "No; the prepared campus uses a shared RIB unless a separate design says otherwise.",
          "Only HSRP group 20 creates routing isolation.",
          "OSPF area 0 forces all VLAN traffic to be denied."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q01"
      },
      {
        "testedConcept": "Gateway versus uplink",
        "question": "D1 remains supplied active while its routed uplink is unavailable. What can this worksheet conclude?",
        "answer": "The original path fails the uplink gate; no alternate takeover is predicted.",
        "explanation": "HSRP role and selected upstream health are separate supplied inputs.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "D2 must take over instantly.",
          "Remote traffic must remain lossless.",
          "The original path fails the uplink gate; no alternate takeover is predicted.",
          "OSPF automatically changes HSRP priorities."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q02"
      },
      {
        "testedConcept": "Preemption scope",
        "question": "Does lower-priority D2 preempt configuration alone detect every D1 upstream failure?",
        "answer": "No; effective tracking and actual role conditions require separate evidence.",
        "explanation": "Preemption permits a qualifying priority-driven takeover; it is not universal upstream-health detection.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; preempt monitors every remote application.",
          "Yes; priority 100 is always higher than110.",
          "Only VLAN20 availability matters.",
          "No; effective tracking and actual role conditions require separate evidence."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q03"
      },
      {
        "testedConcept": "OSPF layers",
        "question": "Which can be ready while the required OSPF underlay route is absent?",
        "answer": "The OSPF adjacency declaration.",
        "explanation": "Neighbor state and the required selected route are independent evidence layers.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The OSPF adjacency declaration.",
          "Every remote application necessarily works.",
          "The worksheet invents the missing route.",
          "Passive SVI advertisement creates endpoint neighbors automatically."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q04"
      },
      {
        "testedConcept": "BGP layers",
        "question": "A required BGP session is ready but exact remote import is denied. What fails?",
        "answer": "The supplied remote BGP prefix gate.",
        "explanation": "Peer control state does not bypass exact-prefix admission policy.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "The session is necessarily reset by the worksheet.",
          "The supplied remote BGP prefix gate.",
          "Every local source route is deleted.",
          "The return route is automatically created."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q05"
      },
      {
        "testedConcept": "System source",
        "question": "Can a selected BGP candidate be displaced from the actual system route choice?",
        "answer": "Yes; protocol choice and system selection are separate.",
        "explanation": "The worksheet exposes systemSelected independently after the supplied BGP choice.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "No; all BGP selected paths must be installed.",
          "Only if the selected gateway changes VLAN.",
          "Yes; protocol choice and system selection are separate.",
          "HSRP preempt prevents system displacement."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q06"
      },
      {
        "testedConcept": "Policy context",
        "question": "Does admitting a BGP route automatically permit the original packet through an ACL?",
        "answer": "No; control-plane admission and packet policy are distinct.",
        "explanation": "A selected route can coexist with a packet denial at the original interface/direction.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Yes; a route filter overrides every ACL.",
          "Yes; TCP 179 policy permits every application.",
          "Only a shorter AS_PATH creates packet permission.",
          "No; control-plane admission and packet policy are distinct."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q07"
      },
      {
        "testedConcept": "Measurements",
        "question": "What does the browser's all-green trace establish?",
        "answer": "Agreement of the supplied declarations only.",
        "explanation": "No packet, timer, protocol transition or original application was measured.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Agreement of the supplied declarations only.",
          "Measured zero-loss convergence.",
          "Authenticated end-to-end service success.",
          "An exact hardware failover timestamp."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q08"
      },
      {
        "testedConcept": "Probe uncertainty",
        "question": "What is justified by firstSuccessAfter minus failureInjection from actual sampled original probes?",
        "answer": "An observed post-injection first-success gap with sampling and layered scope limits.",
        "explanation": "It does not isolate pure protocol convergence or prove that no unobserved loss occurred.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "An exact HSRP election duration.",
          "An observed post-injection first-success gap with sampling and layered scope limits.",
          "Guaranteed zero loss between probes.",
          "The OSPF SPF runtime alone."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q09"
      },
      {
        "testedConcept": "Rollback",
        "question": "What restores the workbook's isolated D1 uplink fault when the recorded baseline was administratively up?",
        "answer": "Exact mapped no shutdown followed by baseline and original-service verification.",
        "explanation": "Keep the exercise change unsaved and restore exact owned state; a reload or broad clear is not the procedure.",
        "difficulty": "Advanced",
        "type": "multiple-choice",
        "options": [
          "Save the fault then reload all devices.",
          "Clear every BGP and OSPF process.",
          "Exact mapped no shutdown followed by baseline and original-service verification.",
          "Assume browser reset changed the router."
        ],
        "topicId": "lab-3",
        "questionId": "lab-3-Q10"
      }
    ],
    "quick": [
      {
        "testedConcept": "Original return",
        "question": "Can all forward path declarations agree while the original return is missing?",
        "answer": "Yes; returnReady is an independent gate.",
        "explanation": "Forward routing and policy do not establish remote reply reachability.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "lab-3",
        "questionId": "lab-3-QC1"
      },
      {
        "testedConcept": "Protocol scope",
        "question": "Does changing selectedGateway run a real HSRP election?",
        "answer": "No; it supplies an observed selected-role declaration.",
        "explanation": "The model computes no timers, tracking or alternate-path transition.",
        "difficulty": "Intermediate",
        "type": "short-answer",
        "topicId": "lab-3",
        "questionId": "lab-3-QC2"
      },
      {
        "testedConcept": "Recovery evidence",
        "question": "Why record a sustained-success criterion instead of only the first restored reply?",
        "answer": "An isolated success may be followed by failure and does not establish continuous restoration.",
        "explanation": "Preserve subsequent timestamped samples and report the declared criterion and measurement uncertainty.",
        "difficulty": "Advanced",
        "type": "short-answer",
        "topicId": "lab-3",
        "questionId": "lab-3-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Advanced routing and switching evidence workbook",
        "path": "labs/advanced-routing-switching-workbook.md",
        "description": "Owned topology mapping, exact address plan, timestamped one-fault observations and baseline restoration; guided target procedure, not executed evidence."
      }
    ],
    "sources": [
      {
        "title": "Cisco IOS XE17.x HSRP: group/version, priority, preemption and inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.x HSRP preempt and track: upstream object and role distinctions",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/hot-standby-router-protocol-hsrp/13780-6.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.x OSPF: passive interface and neighbor/interface inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iro-cfg-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.x basic BGP: route, summary and advertisement inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_irg-basic-net-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17 BGP switch configuration: route-policy and prefix-list context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/bgp/bgp-configuration-guide/routing-bgp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17 protocol-independent command reference: system route inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.x HSRP version2: IPv4 multicast distinction",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-v2.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.12 VLAN inspection and broadcast membership",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-12/configuration_guide/vlan/b_1712_vlan_9500_cg/configuring_vlans.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.12 VLAN trunk allowed scope and inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-12/configuration_guide/vlan/b_1712_vlan_9500_cg/configuring_vlan_trunks.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE17.17 system route, ARP and IP interface inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/rtng/b_1717_rtng_9600_cg/configuring_ip_unicast_routing.html",
        "checked": "2026-10-09"
      }
    ]
  }
];
for(const l of lessons){l.exams.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-Q${String(i+1).padStart(2,'0')}`}));l.quick.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-QC${i+1}`}));}
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['10']=lessons;
})();
