(function(){'use strict';
const lessons=[
  {
    "id": "s3-g0-t0",
    "batch": "09",
    "title": "Static Routing",
    "subtitle": "Separate configured intent, installed routes and the packet lookup that follows.",
    "level": "Intermediate → Production",
    "minutes": 65,
    "definition": "Static routing supplies explicitly configured destination-prefix and next-hop/interface or discard intent. A configuration line is a candidate instruction, not a promise of operational installation, neighbor reachability or successful service. This advanced roadmap node builds on the earlier Static routes foundation: it separates same-prefix source preference during route installation from longest-prefix matching during forwarding, then tests a two-router static path and two different scoped failures. A configured route can remain in configuration while being unavailable or unselected in the routing information base.",
    "purpose": "Use a static route when its ownership, scope and dependencies are understood: a small stable path, an intentionally selected remote prefix, a default boundary or an explicit discard are examples. Static does not mean self-verifying or always present. An apparently simple route can depend on interface state, recursive next-hop resolution, source preference and the opposite direction. The goal is to explain why this packet uses this installed prefix, then collect evidence for the actual exchange. Floating backup routes and Policy-Based Routing are following separate original topics, not substitutes for these installation and lookup distinctions.",
    "mental": "Keep three pages: written intent, admitted route choices and the forwarding lookup. On the intent page, a route names a destination and action. On the admitted page, usable candidates compete for the same exact prefix; source preference helps determine which is installed. On the lookup page, several different installed prefixes can match one destination, and the longest prefix wins. Next draw the reply path on a separate page. A route toward a server does not write the server-side return instructions automatically.",
    "components": [
      "Destination scope: distinguish a network prefix, host route and default. In IPv4 /32 names one address and /0 is least specific; in IPv6 the corresponding lengths are /128 and /0. Masks must align with intended scope. A broader route can unintentionally attract other traffic, while an overly narrow route can leave expected hosts uncovered.",
      "Next hop and interface: a next-hop IP can require recursive route resolution to a usable egress. A fully specified route includes both interface and next hop. On multiaccess Ethernet, an interface-only remote route can cause resolution for remote destination addresses and depend on proxy behavior; it is not a generic replacement for a reviewed next-hop design.",
      "Configured versus installed: inspect active/saved configuration separately from the routing table. Ordinary interface/next-hop availability can prevent an IOS route from installation or remove its active entry without deleting its configured intent. Optional tracking/permanent behavior is outside this exercise; inspect the exact command instead of generalizing every static route.",
      "Source preference: Cisco-style administrative distance is local source preference for candidates covering the exact same prefix, not a universal vendor metric or bandwidth figure. The fixture uses connected 0, static 1 and a declared OSPF candidate 110. Protocol-specific metrics and best-path rules belong to the applicable routing process; do not compare unrelated metric scales numerically.",
      "Forwarding evidence: the RIB records routing choices, while the FIB/adjacency context implements forwarding. A route-table line does not prove hardware programming or resolved neighbor state. Longest-prefix lookup operates on installed forwarding choices; AD is not reevaluated for each packet across different prefix lengths.",
      "Return and service scope: the far-side route, host address/mask, actual forwarding, policy and original transaction all matter. IPv4 ARP and IPv6 Neighbor Discovery are separate from route recursion. A ping of a directly connected gateway does not establish a routed application or return path."
    ],
    "mechanism": [
      "Bound the actual router/host, address family, routing table/VRF, destination, source and traffic question. Ordinary destination routing is the starting scope here; policy routing, ECMP and protocol best-path computation are not modeled.",
      "Read configured intent and validate prefix/action and required next-hop/interface context. Resolve an indirect next hop to its supporting route and usable attachment. Do not confuse that route lookup with an ARP response, a probe result or downstream health.",
      "For the same exact prefix, admit usable candidates and choose according to applicable source preference and routing-process rules. The fixture has one declared static /24 and one declared OSPF /24 with different ADs; it does not run an adjacency or simulate dynamic-protocol learning.",
      "Keep different installed prefixes simultaneously. For destination 198.51.100.200, an installed /25 covers more bits than the installed /24 or default, even though its authored AD is 200. That /25 is not a floating backup for a different /24 prefix.",
      "Apply the selected forwarding or discard action. A matching discard is the result, not an invitation to retry the default. Then inspect actual egress/neighbor/packet/policy evidence and trace the reply path independently.",
      "Repair only the demonstrated owned intent or dependency and repeat the original exchange. Preserve evidence before clearing or changing anything, reconcile active/saved state deliberately and restore exact prior context during cleanup."
    ],
    "flow": [
      [
        "Inspect configured intent",
        "Name prefix, action, table/VRF and next-hop/interface dependencies."
      ],
      [
        "Review route installation",
        "Compare usable candidates for the exact same prefix."
      ],
      [
        "Apply longest-prefix lookup",
        "Choose the most specific installed match; honor discard."
      ],
      [
        "Verify the full exchange",
        "Inspect neighbor/forwarding and return path, then repeat the original service."
      ]
    ],
    "comparison": [
      [
        "Configured / installed",
        "Candidate intent / active routing choice",
        "The configuration may survive an operational dependency failure."
      ],
      [
        "Administrative distance / metric",
        "Local source preference / routing-process path measure",
        "Different protocol metric scales are not interchangeable."
      ],
      [
        "Same-prefix preference / longest match",
        "Route installation / packet forwarding",
        "A lower-AD /24 does not defeat an installed /25."
      ],
      [
        "Recursive / fully specified",
        "Resolve a next hop / name interface and next hop",
        "Validate the actual egress and multiaccess neighbor context."
      ],
      [
        "Default / discard",
        "Least-specific destination match / explicit selected action",
        "A more-specific discard does not fall through to default."
      ],
      [
        "Gateway reachable / service recovered",
        "A local probe / the original routed exchange",
        "A missing return route can leave the gateway reachable."
      ],
      [
        "IPv4 / IPv6 next-hop scope",
        "ARP and masks / ND and prefix lengths",
        "A link-local IPv6 next hop requires its interface scope."
      ]
    ],
    "example": "The browser supplies six candidate records. S24 is a static 198.51.100.0/24 with AD 1 and symbolic recursive next hop N1; its resolving route is intentionally outside the fixture and represented by a declaration. O24 is a declared OSPF route for that same /24 with AD 110. With both eligible, S24 is installed and O24 is not. The installed static 198.51.100.128/25 has authored AD 200, so destination .200 selects it by longest match despite the lower-AD /24. Destination .42 is outside that /25 and selects S24. Remove only the N1 resolver declaration: O24 can become the installed /24 under the supplied assumptions. This is not an actual resolver algorithm or packet test. Separately, the real Linux experiment sends between client 192.0.2.10 and server 198.51.100.20 through R1/R2 with a 203.0.113.0/30 transit. A /32 blackhole at R1 defeats its working /24 until removed. Removing only R2’s return route breaks the remote exchange while the client gateway and R1 forward lookup remain available; restoring that exact route recovers both directions.",
    "commands": [
      {
        "code": "show running-config\nshow startup-config\nshow ip route\nshow ip cef",
        "explanation": "Collect actual configured/saved intent, active route choices and forwarding context before optional target changes.",
        "expected": "GUIDED, NOT EXECUTED: record platform, table/VRF, interface and source/destination scope. Show output alone is not service or hardware performance evidence. Prepared routing enable, addressing and independent management are prerequisites, not changes made by this page.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2\nend\nshow ip route",
        "explanation": "R1-only guided fully specified IPv4 route through its prepared transit attachment.",
        "expected": "GUIDED, NOT EXECUTED: the owned unused /24 must be intended, R1 transit must already be a reviewed Layer 3 interface on 203.0.113.0/30 and R2 .2 must be the verified next hop. Source guidance covers interface plus next-hop syntax; actual target parser/support remains required. Do not replace an existing unrelated route or convert a live switchport from this example.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip route 192.0.2.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.1\nend\nshow ip route",
        "explanation": "R2-only guided return route through its prepared transit attachment.",
        "expected": "GUIDED, NOT EXECUTED: R2 uses its independently mapped interface of the same example name. Confirm R1 .1 and original source-prefix scope. Prepare corresponding host/LAN paths and policy separately; neither router command configures host addresses or validates the application.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno ip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2\nend\nshow ip route",
        "explanation": "R1-only cleanup of the confirmed owned temporary route from the immediately recorded lab baseline.",
        "expected": "GUIDED, NOT EXECUTED: use the exact recorded route form and restore any previous intended configuration/dependencies separately. On R2, reconcile its distinct owned return route against its own baseline. No broad routing-table clear, routing disable, reload or whole-device save is supplied.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nipv6 route 2001:db8:20::/64 GigabitEthernet1/0/1 fe80::2\nend\nshow ipv6 route",
        "explanation": "Optional separate IPv6 link-local next-hop example on a prepared isolated routed interface.",
        "expected": "GUIDED, NOT EXECUTED: fe80::2 must be the actual adjacent peer on this interface; the interface is mandatory because the link-local address is scoped. Existing supported IPv6 forwarding, addressing, neighbor and return intent must be reviewed. IPv4 route success does not install this IPv6 route.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno ipv6 route 2001:db8:20::/64 GigabitEthernet1/0/1 fe80::2\nend\nshow ipv6 route",
        "explanation": "Remove only the confirmed owned temporary IPv6 route in its optional branch.",
        "expected": "GUIDED, NOT EXECUTED: restore exact prior address-family/table/interface/route intent. Do not disable IPv6 forwarding or delete unrelated addresses as route cleanup.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "bash labs/static-routing.sh\nsudo bash labs/static-routing.sh --run",
        "filename": "bash",
        "platform": "Ubuntu 24.04 / WSL2 · iproute2 6.1.0 · isolated owned IPv4 namespaces",
        "explanation": "The first invocation shows inert help. The explicit root --run builds four owned namespaces, performs bounded actual probes and exits with cleanup.",
        "expected": "ACTUAL LINUX VERIFIED: both directions traverse explicit static next hops; an unresolved supplied gateway is rejected, a /32 discard overrides /24 until exact removal, and a missing R2 return route breaks remote exchange while the gateway remains reachable. Exact repair restores service. Normal and early-failure cleanup preserve host routes/interfaces/forwarding and pre-existing namespaces. No Cisco behavior is inferred."
      },
      {
        "code": "bash labs/dual-stack-routing.sh\nsudo bash labs/dual-stack-routing.sh --run",
        "filename": "bash",
        "platform": "Ubuntu 24.04 / WSL2 · unchanged isolated IPv4/IPv6 companion",
        "explanation": "Revisit the earlier foundation runner to compare the address-family scopes using actual virtual hosts/router.",
        "expected": "ACTUAL LINUX RE-VERIFIED: both IPv4/IPv6 directions work, removing the owned IPv4 return route breaks IPv4 while IPv6 remains working, repair restores both and cleanup preserves host state. This companion is not the new two-router topology or a Cisco parser test."
      }
    ],
    "configuration": "Begin an optional target branch from two prepared supported isolated Layer 3 devices and their mapped LAN/transit attachments, independent management, authorized table/VRF and actual original-service baseline. Record interface addressing, routing enable, active/saved configuration, destination and next-hop dependencies, existing route ownership, policy and return path before adding anything. The example uses R1 .1/R2 .2 on 203.0.113.0/30; the identical interface spelling on each device is an example, not proof of physical mapping. A next-hop-only route permits recursive resolution, while an interface-only remote route on Ethernet can have very different neighbor behavior; the selected IPv4 guided branch explicitly names both. The IPv6 branch uses a verified adjacent link-local peer plus its interface and requires separate address-family readiness. The Linux runners configure forwarding only inside owned router namespaces, never the host namespace; script default is inert and explicit --run removes owned resources on exit. Linux gateway-add rejection is observed Linux behavior, not a reproduction of Cisco accepting configured intent but withholding an active route. For rollback remove only owned new routes and restore actual prior configuration/host/table dependencies. Active/saved route intent, original service and retained evidence need separate reconciliation. No automatic global forwarding change, routing-table flush or save occurs in the browser.",
    "ports": "Static routing is a control/configuration choice and does not introduce a TCP/UDP application port. Ordinary forwarding and route recursion differ from link-layer neighbor resolution: IPv4 uses ARP on the selected attachment, while IPv6 uses Neighbor Discovery with ICMPv6. The actual Linux tests use bounded ICMP echo rather than an application listener; their success proves the tested exchanges within the isolated scope, not an unrelated TCP/UDP service. Device management has its own actual authorized transport. A router’s local management default-gateway setting is not interchangeable with a /0 route in an enabled routed forwarding design.",
    "production": "Treat a static route as owned infrastructure intent with a documented destination scope, next-hop dependencies, return design, failure behavior and change/rollback record. Less-specific routes and defaults can make a missing intended route look superficially reachable through the wrong path. A discard route may be intentional containment or aggregation behavior; removing it blindly can attract traffic elsewhere. Static configuration is local intent; propagation depends on actual redistribution/protocol/interface context and is not assumed here. Record actual route-source preferences on the supported platform rather than importing an entire AD table from another product. The worksheet uses the supported Cisco-style 0/1/110 values and an explicitly chosen static distance 200; that value does not describe measured path quality. Modern platform/VRF/license/forwarding behavior needs the actual target context. The next floating-static lesson will examine backup eligibility without equating mere installation with downstream health.",
    "troubleshooting": [
      "Configured route missing from the active table: inspect exact prefix/table/VRF, ordinary next-hop/interface dependencies and same-prefix source preference. Preserve the configuration line and active evidence separately rather than deleting intent as the first diagnostic action.",
      "A higher-AD route forwards the packet: compare installed prefix lengths first. Different prefixes can coexist; an installed /25 can match more specifically than a /24 regardless of the displayed AD values.",
      "A route is active but service fails: inspect actual egress/neighbor state, forwarding/policy and downstream/return path. Route recursion can succeed while ARP or the far-side path fails. A symbolic resolved flag or local ping is insufficient.",
      "A more-specific discard matches: verify ownership and intended containment before changing it. The selected action does not retry the shorter prefix/default just because the application wanted connectivity.",
      "The local gateway works but the remote echo fails: inspect the router and remote-source return scope as well as original forwarding. The two-router Linux experiment changes only R2’s return route and records the forward lookup still present; it does not retain a packet capture proving every intermediate arrival.",
      "An IPv6 link-local next hop is ambiguous: inspect the adjacent peer and interface scope. Multiple links can use the same link-local spelling. IPv4 success and a valid IPv6 prefix do not establish IPv6 neighbor or return readiness.",
      "The CLI route-add is rejected: distinguish an actual syntax/scope/gateway validation error from an accepted configuration that is absent or unselected operationally. The Linux runner’s gateway rejection is not interchangeable with Cisco RIB installation semantics."
    ],
    "security": "A broad or misdirected static route can redirect authorized traffic to an unintended attachment, discard valid traffic or expose traffic across a different administrative boundary. Restrict change ownership, document prefix scope and actual policy, preserve backups and validate the return path with authorized probes. Static routing alone supplies no payload encryption or endpoint authentication. A default is forwarding scope, not a complete security boundary. A discard may support a reviewed containment policy but needs explicit ownership and cleanup intent. The runners use reserved documentation addresses and temporary virtual links only; they neither send Internet traffic nor create persistent services. User input stays in strict IPv4 parsing and text-rendered results, never executable commands or raw HTML.",
    "performance": "Administrative distance is preference, not latency, bandwidth or a measured path-quality score. Static routes avoid a dynamic protocol exchange for their own configuration source but do not guarantee greater forwarding throughput; actual lookup/adjacency/hardware context determines performance. Recursive resolution and changes to supporting routes can affect operational installation; downstream failures may leave a route installed unless the supported design detects them. This browser supplies no ECMP, protocol convergence, recursion timer or throughput prediction. The Linux tests prove bounded virtual ICMP exchanges and scoped fault/repair, not physical router forwarding capacity or recovery timing. An Ethernet interface-only remote route can increase neighbor-resolution work for many destinations; inspect the actual design instead of using it as an unqualified shortcut.",
    "mistakes": [
      "Sorting every matching route by AD before checking installed prefix length.",
      "Comparing OSPF and another protocol metric as one universal cost scale.",
      "Treating configured intent as active forwarding or neighbor evidence.",
      "Equating next-hop route recursion with a successful ping.",
      "Assuming a different more-specific prefix is a floating backup for /24.",
      "Letting a default hide the absent intended route without inspecting the selected path.",
      "Retrying a default after a selected discard.",
      "Adding a link-local IPv6 next hop without interface scope.",
      "Removing broad routing state instead of the exact owned fault."
    ],
    "interactive": "static-route-selection",
    "artifacts": [
      {
        "title": "Two-router IPv4 static-route lab · Bash",
        "path": "labs/static-routing.sh"
      },
      {
        "title": "IPv4/IPv6 foundation companion · Bash",
        "path": "labs/dual-stack-routing.sh"
      }
    ],
    "lab": {
      "objective": "Explain installation versus longest-prefix selection, then verify static forwarding, a more-specific discard and a return-route repair in actual isolated Linux namespaces.",
      "requirements": "Browser worksheet requires no equipment and admits six declared candidates only. Linux runner requires ip/ping/sysctl and explicit root namespace capability; default is inert help. New IPv4 topology owns four namespaces, while the unchanged dual-stack companion owns three. Optional Cisco branch requires prepared supported isolated targets; no Cisco execution is performed.",
      "topology": [
        "Client 192.0.2.10",
        "R1 left .1 → transit 203.0.113.1",
        "R2 transit .2 → right 198.51.100.1",
        "Server 198.51.100.20",
        "Independent return and service evidence"
      ],
      "steps": [
        "Browser: compare .42 and .200. Record which exact-prefix candidate is installed and which installed prefix forwards; explain why S25 AD 200 can defeat S24 AD 1 for .200 without being a /24 backup.",
        "Disable only the symbolic N1 resolver declaration in the equal-prefix case. Observe the declared OSPF /24 installation. The actual N1 resolving route is outside the worksheet and no protocol adjacency/recursion packet executes.",
        "Try default-only, no-match, discard, connected and connected-link-unavailable scenarios. Confirm a matching discard stays selected despite default and malformed/blank IPv4 input hides any previous valid output.",
        "Inspect/download labs/static-routing.sh before optional execution. Run inert help, then explicit root --run in the supported isolated Linux environment. Record actual forward/return lookup JSON, both-direction baseline and Linux gateway validation; do not interpret the latter as Cisco configuration acceptance.",
        "Observe the owned R1 /32 blackhole coexisting with its working /24. Record failed remote echo, exact /32 removal and recovered exchange; the runner does not claim packet capture or application throughput.",
        "Observe the removed R2 return route: the remote echo fails while the client gateway and R1 forward lookup remain available. Record exact return-route repair and both-direction success, then verify four owned namespaces are absent.",
        "Run the unchanged dual-stack companion if address-family comparison is needed. Record IPv4 return-route failure with IPv6 still working, then both-family recovery and cleanup. This is a separate three-namespace topology.",
        "Optional Cisco work: collect configured/active/forwarding and original transaction evidence before adding only the reviewed owned route pair. Validate actual table/VRF/neighbor/return behavior, remove only owned temporary intent and restore exact prior active/saved/interface/host state."
      ],
      "verification": "Model baseline .200 selects S25 with S24 also installed; .42 selects S24 while eligible O24 is not installed. Unresolved symbolic N1 admits O24; default-only selects DEF; discard selects DROP and never retries DEF. Actual Linux two-router baseline/repair succeeds both directions, /32 discard blocks its destination despite /24, and missing R2 return route breaks remote exchange with local gateway/R1 forward lookup still available. Default help, normal and injected early-failure cleanup preserve host routes/interfaces/forwarding and existing namespaces. Actual dual-stack companion preserves IPv6 during its IPv4 fault. No Cisco output, live protocol preference, capture arrival or performance is fabricated.",
      "troubleshooting": "Keep the browser declaration, actual Linux kernel observation and optional Cisco branch distinct. The six candidates are not a full router table or N1 recursion-chain simulation. An active route can coexist with unresolved adjacency/downstream/return service. Default and discard results are forwarding choices, not application guarantees. If runner prerequisites fail, inspect the explicit error rather than changing host routes or relaxing isolation.",
      "challenge": "Write a before/fault/repair evidence record distinguishing missing installed route, more-specific discard and missing return route. Name a counterexample where the active forward route stays present but the original transaction fails. Explain which source/table/next-hop/interface/neighbor/return observations would establish the actual cause before a scoped repair.",
      "cleanup": "Reset restores worksheet declarations only. Each Linux runner removes only its created namespaces and virtual links/routes on normal/error exit; it creates no persistent daemon. The test also checks pre-existing host and namespace state. For optional target work remove only owned new routes and restore exact prior table/interface/address-family/host and active/saved intent, then repeat the original service. Do not flush routing tables, disable forwarding or reload as route cleanup."
    },
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Installation",
        "question": "Does a configured route line prove the route is installed?",
        "answer": "No.",
        "explanation": "Operational dependencies and same-prefix source choice are separate.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Lookup",
        "question": "Can an installed AD 200 /25 beat an AD 1 /24 for a covered address?",
        "answer": "Yes.",
        "explanation": "Forwarding uses longest matching installed prefix rather than reevaluating AD across different prefixes.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Return evidence",
        "question": "Can a reachable gateway coexist with failed routed echo due to a missing return route?",
        "answer": "Yes.",
        "explanation": "Local gateway evidence does not establish the far-side reply path.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Control versus forwarding",
        "question": "Which order correctly separates route selection and packet forwarding in this lesson?",
        "answer": "Review usable same-prefix candidates for installation, then apply longest-prefix lookup among installed choices.",
        "explanation": "AD is local installation preference; it does not override a more-specific installed prefix.",
        "type": "multiple-choice",
        "options": [
          "Review usable same-prefix candidates for installation, then apply longest-prefix lookup among installed choices.",
          "Always pick the lowest AD across every matching prefix.",
          "Forward by the largest displayed metric.",
          "Use the default before every more-specific prefix."
        ],
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Longest match",
        "question": "Both S24 AD 1 and S25 AD 200 are installed. Which selects destination 198.51.100.200 in the fixed worksheet?",
        "answer": "S25, 198.51.100.128/25.",
        "explanation": "Its longer prefix covers .200. It is not a floating backup for the different /24.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q02"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Operational absence",
        "question": "A static route remains configured but is absent from the active table. Which evidence should be compared first?",
        "answer": "Exact prefix/table/VRF, next-hop/interface dependencies and competing same-prefix candidates.",
        "explanation": "Do not infer that configuration retention proves active route installation.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q03"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Resolver versus neighbor",
        "question": "Why does declared next-hop route resolution not prove neighbor or remote-service success?",
        "answer": "Route recursion identifies a route/egress dependency; neighbor, downstream and return service are separate.",
        "explanation": "The symbolic N1 declaration runs no actual recursion or ARP.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q04"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Ethernet next hop",
        "question": "Why is an interface-only static route to a remote Ethernet destination not a generic equivalent of an interface-plus-next-hop route?",
        "answer": "It can make remote destinations appear directly reachable and require per-destination neighbor/proxy behavior.",
        "explanation": "Review the multiaccess next-hop design and actual platform rather than relying on a shorthand interface route.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q05"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Discard priority",
        "question": "The new Linux lab adds a /32 blackhole for .20 while the working /24 remains. Why does echo fail until exact /32 removal?",
        "answer": "The more-specific installed discard is selected instead of the /24 forwarding route.",
        "explanation": "Discard does not retry a less-specific route just to obtain connectivity.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q06"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Return-path fault",
        "question": "R2 return route is removed; client gateway and R1 forward lookup remain available. What does failed remote echo demonstrate within the controlled lab?",
        "answer": "The tested exchange depends on the removed return route despite the remaining local/forward observations.",
        "explanation": "No retained packet capture or unrelated application result is implied.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q07"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "IPv6 scope",
        "question": "What additional scope must accompany the guided IPv6 next hop fe80::2?",
        "answer": "The actual adjacent interface.",
        "explanation": "A link-local address is not globally unique across the router's links.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q08"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Platform distinction",
        "question": "Does Linux rejecting the supplied unresolved gateway prove Cisco would reject the same configuration form before RIB review?",
        "answer": "No; actual Linux validation and Cisco configuration/installation semantics must be distinguished.",
        "explanation": "The kernel experiment is actual Linux evidence, not a vendor parser simulation.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q09"
      },
      {
        "difficulty": "Security",
        "testedConcept": "Targeted repair",
        "question": "Why is a routing-table flush unsuitable cleanup for this lesson's owned static-route experiment?",
        "answer": "It can remove unrelated routes rather than only the demonstrated owned intent.",
        "explanation": "Restore exact prior context, preserve independent management and verify the original exchange.",
        "type": "short-answer",
        "topicId": "s3-g0-t0",
        "questionId": "s3-g0-t0-Q10"
      }
    ],
    "glossary": {
      "Static candidate": "Explicit route intent considered for operational use.",
      "RIB": "Routing information base containing active routing choices.",
      "FIB": "Forwarding information used for packet lookup/action.",
      "Administrative distance": "Local route-source preference, not a universal metric.",
      "Recursive next hop": "An indirect next hop resolved through supporting routing information.",
      "Fully specified route": "Route naming both outgoing interface and next hop.",
      "Discard route": "An installed selected action that drops instead of forwarding.",
      "Return path": "Routing and service prerequisites for the opposite direction."
    },
    "prerequisites": [
      "s1-g4-t0",
      "s1-g4-t2",
      "s2-g0-t0"
    ],
    "related": [
      "s3-g0-t1",
      "s3-g0-t2",
      "s3-g1-t0",
      "s1-g5-t0"
    ],
    "sources": [
      {
        "title": "Catalyst 9300 17.15 static configuration, ordinary next-hop/interface dependencies and forwarding context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/protocol_independent_features.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco AD: same-prefix installation versus longest-prefix forwarding; compare actual platform defaults",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco next-hop/interface static-route design and multiaccess caveats",
        "url": "https://www.cisco.com/c/en/us/support/docs/dial-access/floating-static-route/118263-technote-nexthop-00.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE basic routing: interface plus next-hop static syntax and monitoring",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_iri-iprouting.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 17.15 IPv6 static routes and link-local next-hop interface scope",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ipv6_unicast_routing.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g0-t1",
    "batch": "09",
    "title": "Floating Static Routes",
    "subtitle": "Make standby preference explicit, then inspect what actually withdraws the primary.",
    "level": "Intermediate → Production",
    "minutes": 65,
    "definition": "A floating static route is explicit static intent with a higher administrative distance than the intended primary route for the same destination prefix. It can become the selected route when the preferred candidate is no longer usable, provided the backup itself is eligible. The larger distance expresses standby preference; it is not a health detector, a delay or an instruction to rescue every failed packet. Backup selection and a working original transaction are separate observations.",
    "purpose": "Provide a small, owned alternative when a preferred static or dynamically supplied route disappears. The engineering question is not merely whether a backup line exists: identify the failure that removes the primary from selection, the backup next-hop dependencies, the opposite-direction routes and the original service evidence. A reachable directly attached gateway can coexist with a failed path beyond it. If that failure leaves the primary installed, a floating route alone does not move traffic. Detection and withdrawal must match the failure you intend to handle.",
    "mental": "Imagine two instructions for the exact same destination: prefer P; admit B only when no better eligible instruction remains. The distance determines order, not whether the road beyond the sign is open. Write a separate list of operational dependencies and a third list of service observations. Optional tracking supplies one input to the first list; it does not make the router omniscient. The browser uses declarations to expose these distinctions and sends no probe or router command.",
    "components": [
      "Exact prefix and routing context: primary and intended standby must cover the same prefix in the relevant table/address family. An AD 200 /25 and AD 1 /24 are different installed forwarding scopes, not an ordinary same-prefix floating pair. Check a default backup against the intended default, not against every remote subnet. Policy and more-specific matches can change actual forwarding.",
      "Primary preference: record the actual route source and distance. A default static primary can use AD 1; a declared OSPF primary is illustrated with AD 110. Do not silently assume every dynamic route or vendor uses the same value. If the backup distance is smaller, it can win while the intended primary remains available.",
      "Backup candidate: the static route needs usable next-hop/interface dependencies and a higher admissible distance. In the Cisco-style scope here, AD 255 is excluded from installation; it is not the safest last-resort standby. Equal distances do not establish the intended primary-before-backup order and require actual platform tie/ECMP review.",
      "Withdrawal dependency: link/interface loss, loss of supporting next-hop reachability or a supported tracking client can change eligibility. A next-hop-only route can remain recursively resolvable by an unintended alternate route. Inspect the actual resolution chain; a failed physical primary attachment does not universally imply its route was withdrawn.",
      "Tracking and observation: a supported tracked static route can be gated by an object derived from an IP SLA operation or another tracked condition. The object state, probe destination/source/path and original application outcome are different evidence. A probe may fail due to target policy or succeed while the application fails. The browser gates only its static-primary case, not its declared OSPF route.",
      "Independent backup service: neighbor resolution, downstream path, return routing, policy and application requirements remain necessary. A backup route can be installed while its path or reply direction is unusable. A second link does not establish independence if power, provider, remote endpoint or policy is shared."
    ],
    "mechanism": [
      "Record destination prefix, table/VRF, source, interface mapping, current primary selection and intended standby distance before any change. Preserve configured and operational evidence separately.",
      "Review which candidates are eligible under the actual platform. Compare distance for this exact prefix; do not turn AD into a cross-prefix forwarding rule or a universal dynamic metric.",
      "Identify the observation that could withdraw the primary. Route dependency loss differs from downstream loss with the interface and next-hop route still available. In the worksheet, downstream health never withdraws an untracked route by itself.",
      "For an optional supported tracked static design, inspect the object and how the probe or tracked dependency establishes its state. A down declaration in this browser is supplied manually; no IP SLA scheduling, polling, delay or packet is executed.",
      "When the primary becomes ineligible, select the eligible backup for this prefix. Then inspect actual forwarding and the reply/service requirements. Neither admission nor a configured standby line proves that exchange.",
      "When the preferred primary becomes eligible again, the fixed preference model selects it again. Actual restoration depends on supported tracking/protocol/timer and forwarding behavior. Preserve before/fault/restore evidence and validate both directions and the original service; do not invent a recovery interval."
    ],
    "flow": [
      [
        "Establish the floating pair",
        "Use one exact prefix and a strictly higher usable backup distance."
      ],
      [
        "Inspect primary eligibility",
        "Dependency or supported tracking withdrawal differs from downstream loss."
      ],
      [
        "Review backup installation",
        "The backup needs its own usable next-hop/interface dependencies."
      ],
      [
        "Verify recovery and return",
        "Check the original exchange and restoration, not only the selected route."
      ]
    ],
    "comparison": [
      [
        "Higher AD / healthier path",
        "Standby source preference / independent service evidence",
        "AD cannot detect or measure health."
      ],
      [
        "Primary withdrawn / remote path failed",
        "No longer eligible / can remain installed",
        "Only eligible candidate changes cause the fixed preference change."
      ],
      [
        "Same-prefix standby / more-specific route",
        "Preference alternatives / different forwarding scopes",
        "A longer installed prefix can win regardless of AD."
      ],
      [
        "Object up / service up",
        "Tracked condition / original transaction",
        "Probe scope and application scope can differ."
      ],
      [
        "Backup installed / backup usable",
        "Active choice / complete exchange",
        "Downstream, policy or return faults can still break service."
      ],
      [
        "Restore primary / preserve sessions",
        "Preference can return / application-dependent continuity",
        "Address changes, NAT and stateful paths can disrupt sessions."
      ],
      [
        "AD 254 / AD 255",
        "Potentially usable preference / excluded in this Cisco scope",
        "Choose a justified value above the actual primary, not the largest number blindly."
      ]
    ],
    "example": "The fixed worksheet supplies P and B for 198.51.100.0/24. P is initially static AD 1 and B static AD 200. Both route dependencies are available, so P is selected. Mark only the primary downstream path unusable: P stays selected and the declared original exchange becomes impossible. Next gate the static primary with tracking and supply track-down: P becomes ineligible and usable B is selected. That declaration is not a measured probe. Separately, remove the return prerequisite: B stays installed but the exchange remains impossible. Restore the primary eligibility and preference returns to P. Choose a declared OSPF primary AD 110 and backup AD 1 to demonstrate wrong preference; B wins even though P is available. AD 255 removes B from consideration, and equal AD reports selection outside this teaching model rather than inventing a tie rule.",
    "commands": [
      {
        "code": "show running-config\nshow startup-config\nshow ip route\nshow ip cef",
        "explanation": "Collect actual intent, selected routes and forwarding context before a prepared isolated experiment.",
        "expected": "GUIDED, NOT EXECUTED: record exact prefix/table/VRF and route source, transit interfaces, host addressing, next-hop/neighbor/return context and the original transaction. The example does not enable routing, convert switchports, configure hosts or infer hardware/service success from show output.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2 1\nip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/2 203.0.113.6 200\nend\nshow ip route",
        "explanation": "R1-only guided same-prefix primary and floating static candidates across two prepared transit attachments.",
        "expected": "GUIDED, NOT EXECUTED: R1 primary is .1/30 on 203.0.113.0/30 and backup .5/30 on 203.0.113.4/30; R2 peers are .2 and .6. Map the actual interface names and prove ownership of these unused lab routes. Both next-hop/interface prerequisites must already be ready. No Internet, NAT or dynamic routing is configured.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip route 192.0.2.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.1 1\nip route 192.0.2.0 255.255.255.0 GigabitEthernet1/0/2 203.0.113.5 200\nend\nshow ip route",
        "explanation": "R2-only guided independent return intent for the client LAN through the prepared parallel transits.",
        "expected": "GUIDED, NOT EXECUTED: R2 has its own mapped interfaces of these example names. The return pair is separate from R1 selection. The controlled R1 route-removal fault below can produce an asymmetric exchange because both physical transits remain available; inspect actual policies that might reject that asymmetry.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno ip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2 1\nend\nshow ip route",
        "explanation": "R1-only controlled removal of the confirmed owned primary candidate, after baseline evidence.",
        "expected": "GUIDED, NOT EXECUTED: expected eligible B selection must be observed on the target. This is manual intent withdrawal, not a physical failure, remote-failure detector or IP SLA test. Preserve the independently available R2 return and original exchange; do not remove unrelated routes or shut down management.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2 1\nend\nshow ip route",
        "explanation": "R1-only exact restoration of the owned primary route after the controlled candidate-removal fault.",
        "expected": "GUIDED, NOT EXECUTED: confirm renewed primary selection, forward/return context and the original exchange. Route preference restoration does not guarantee session preservation, stable timings or throughput.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno ip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.2 1\nno ip route 198.51.100.0 255.255.255.0 GigabitEthernet1/0/2 203.0.113.6 200\nend\nshow ip route",
        "explanation": "R1-only cleanup of both confirmed owned new temporary routes.",
        "expected": "GUIDED, NOT EXECUTED: cleanup is appropriate only after completing the lab and confirming neither route pre-existed. Restore exact prior configuration/dependencies separately. Do not clear tables, disable routing, reload or save unrelated active changes.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno ip route 192.0.2.0 255.255.255.0 GigabitEthernet1/0/1 203.0.113.1 1\nno ip route 192.0.2.0 255.255.255.0 GigabitEthernet1/0/2 203.0.113.5 200\nend\nshow ip route",
        "explanation": "R2-only cleanup of its distinct owned return pair.",
        "expected": "GUIDED, NOT EXECUTED: reconcile against R2 baseline and restore exact prior addressing/table/host/service intent. R1 cleanup is not a substitute for R2 cleanup.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "show track\nshow ip sla statistics",
        "explanation": "Optional read-only investigation when the actual prepared IOS XE target already supports and uses tracked static routing.",
        "expected": "GUIDED, NOT EXECUTED: correlate object, operation, destination/source, route dependency, time and original-service outcome. This lesson does not create or schedule an IP SLA operation. A checkbox is neither a live operation nor a measured object state.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      }
    ],
    "configuration": "The optional device exercise uses two prepared isolated routers and two parallel IPv4 transits, with client 192.0.2.10/24 via R1 LAN .1 and server 198.51.100.20/24 via R2 LAN .1. R1/R2 primary addresses are 203.0.113.1/.2 on /30 and backup .5/.6 on 203.0.113.4/30. Both routers must already have supported routed interfaces, forwarding, independent management, known table/VRF and reviewed host/neighbor/policy context. Record active/saved intent and verify that all four temporary route forms are unused and owned before adding them. R1 owns the destination pair; R2 owns the client return pair. The controlled fault deletes only R1 primary intent and leaves both physical paths available, so the forward backup can coexist with primary return: verify actual asymmetry and the original exchange rather than assuming symmetry. Exact restoration is a separate step before scoped cleanup of both router pairs. Tracking is an optional separate design topic: choose an authorized probe and path, prove the object/client binding and consider how probes can continue testing the intended primary while production traffic is on backup. Do not attach a failed application observation directly to a track object by assumption, or treat a supplied down flag as a configured detector. No browser action changes a route, interface, saved state or probe schedule.",
    "ports": "Floating static preference has no intrinsic TCP/UDP port. Management, neighbor resolution and a selected health probe have their own transports and policy. An ICMP echo tracking operation uses ICMP rather than a TCP application check. A probe response can establish only that chosen exchange at that time; it does not authenticate endpoints or establish every application dependency. Actual probe type/source/destination and supported platform operations must be reviewed.",
    "production": "A branch may retain one preferred static boundary and a standby path, or use a static backup for an owned dynamically supplied prefix. Document exactly which primary route and failures it backs up, then test selection, original service and restoration separately. Both paths need return routing and authorized security policy; shared provider/power/remote dependencies can defeat intended independence. WAN address/NAT or stateful middlebox changes can disrupt established sessions even after new transactions succeed. Do not promise session continuity from route preference alone. Monitor route selection, tracking events and service observations separately so a silent remote failure is visible when the primary remains installed. Choose probe targets and path constraints to avoid testing the backup while claiming the primary is healthy; include recovery observations and justified delays in a supported design. Audit intentional failback behavior instead of guessing that a high distance creates a hold-down timer.",
    "troubleshooting": [
      "Backup never installs: compare the exact prefix/table and actual primary presence first, then backup distance and its own dependencies. A next-hop-only primary can remain recursively resolvable through another supporting route even after an intended link failure.",
      "Backup unexpectedly wins at baseline: compare actual distances for the same prefix. A static backup AD 1 can outrank a declared OSPF primary AD 110; a name or description saying backup does not change preference.",
      "Backup AD 255 never appears: it is excluded from installation in this Cisco-style scope. Use a supported distance strictly above the primary but below the excluded value, after reviewing other competing sources.",
      "Primary route remains active while service fails: inspect actual next-hop/interface and downstream/policy/application/return evidence. An untracked floating pair does not withdraw a primary simply because a far-side application failed.",
      "Tracked route withdraws unexpectedly: inspect the actual object, probe source/destination/path, scheduling and replies before changing routing. A nonresponsive probe target or policy can differ from production reachability.",
      "Backup installs but service is still unavailable: confirm backup next-hop/neighbor, downstream and opposite-direction routes plus actual policy/application state. The worksheet return-fault case intentionally leaves B installed.",
      "Selection oscillates or restoration surprises operators: correlate timestamped object and route changes, reviewed delays and the original service. The browser has no timer or convergence prediction and its reset is not a device repair."
    ],
    "security": "A standby path must meet the same reviewed trust, authorization and policy requirements as the primary. Routing preference does not encrypt traffic or preserve a stateful firewall session. A lower-distance mistake can redirect ordinary traffic to an unintended boundary before any fault. Limit probe destinations and operations to the owned experiment; rate and scope matter, and a forged or blocked probe response can distort health evidence. Preserve independent management and route ownership before fault injection. The worksheet accepts bounded numeric/boolean declarations and renders text only; it executes no shell, CLI or network action.",
    "performance": "Distance is source preference, not a failover interval or throughput measurement. Actual recovery can include detection, object delay, route/forwarding updates, neighbor readiness and application retry; the arithmetic or timing of those stages is not simulated here. A standby path can have less capacity or greater delay and still be the selected route. Test the original workload and approved performance requirements on the actual design before promising capacity. Excessive or poorly scoped probes can burden devices or targets, while a very slow detection strategy can prolong an outage. Stability and rapid reaction trade off according to observed fault behavior; do not copy an arbitrary timer as a universal optimum.",
    "mistakes": [
      "Calling any high-AD route a working backup without checking the primary distance and exact prefix.",
      "Using AD 255 as an installable last resort.",
      "Treating a more-specific prefix as a same-prefix standby.",
      "Equating downstream failure with automatic primary withdrawal.",
      "Ignoring alternate recursive resolution that leaves primary intent eligible.",
      "Treating IP SLA object state as the original application outcome.",
      "Forgetting the backup return path or stateful asymmetry.",
      "Assuming preference failback preserves every session.",
      "Retaining old service observations after changing the worksheet declarations."
    ],
    "interactive": "floating-route",
    "lab": {
      "objective": "Explain backup eligibility, distinguish a remote failure from route withdrawal, and keep route preference, return readiness and original-service evidence separate.",
      "requirements": "The browser worksheet is the required scoped exercise and needs no router. An optional device branch needs two prepared supported isolated IOS XE routers, two parallel routed transits, correctly addressed hosts, independent management and ownership of all four unused temporary route forms. No Cisco or IP SLA execution is performed by this resource.",
      "topology": [
        "Client 192.0.2.10 → R1 LAN .1",
        "R1 chooses P or B",
        "Parallel transits: .1/.2 primary OR .5/.6 backup",
        "R2 LAN .1 → server 198.51.100.20",
        "Separate return and original-service evidence"
      ],
      "steps": [
        "Browser: keep P AD 1 and B AD 200, record P installed and B eligible but less preferred. Explain the exact-prefix requirement and distinguish available route dependencies from successful service.",
        "Choose remote failure: P remains installed but the declared exchange is unavailable. Choose tracked withdrawal: a supplied down object gates only the static primary and permits eligible B. Compare the two cases without claiming a real health probe.",
        "Choose missing return: B remains installed while the declared exchange fails. Independently disable backup health or backup route availability; record service-only failure versus no selected candidate.",
        "Change primary to declared OSPF AD 110; set backup AD 1, 110, 111 and 255. Record wrong preference, explicitly unmodeled equal-AD choice, proper standby ordering and excluded backup. Static tracking controls do not gate the OSPF declaration.",
        "Enter reported pass/fail separately. Explain a contradiction or failure despite possible declarations, then change a candidate input and confirm the old observation is cleared. Invalid distances must hide stale predictions; keyboard reset restores the fixture.",
        "Optional targets: record prepared interface/host/policy/active/saved/route baseline and actual original exchange. Add only the owned R1 forward and R2 return pairs in their separate commands. Confirm actual primary selection and standby intent before the controlled change.",
        "Optional targets: remove only R1 owned primary route, inspect eligible backup selection and original forward/return transaction with both physical links still up. Preserve the possibility of asymmetric return. Restore the exact primary form and repeat the same observations; this is manual withdrawal, not automatic failure detection.",
        "Complete evidence before cleanup. Reset the browser worksheet. If optional target work was performed, remove only the two new owned forms from each router, restore exact prior state and verify baseline management/table/host/original-service intent."
      ],
      "verification": "Normal selects P; unavailable primary selects eligible B; untracked remote failure retains P with unavailable exchange; supplied static track-down permits B. Missing return or backup downstream health can leave B selected but service unavailable. Backup distance 1 beats declared primary 110; equal eligible distances report outside scope; 255 is excluded. Restored preferred eligibility returns selection to P. Changed input clears prior entered observation. Optional actual target observations require separate recorded evidence; no fabricated Cisco output or service timings are supplied.",
      "troubleshooting": "Check exact prefix/table, actual installed primary, candidate preference/dependencies and tracking binding before diagnosing failed standby. Separate actual device evidence from the browser declarations. Equal-AD platform selection, recursive path computation, probe scheduling and session preservation are outside the worksheet; do not invent them from its labels.",
      "challenge": "Write a before/fault/restoration matrix for three distinct failures: removed primary eligibility, remote failure with the route still installed, and backup return failure. For each, state selected candidate, what the browser declares, what actual observation would prove the original exchange, and the smallest justified repair. Include a probe-path mistake that could report primary health through the backup.",
      "cleanup": "Browser reset restores declarations and clears entered observation; it does not repair a target. Optional target cleanup removes only the four confirmed new owned route forms using each device baseline. Restore any separately changed exact intent and reconcile active/saved/host/policy state. No routing-table flush, routing disable, global save, scheduled operation deletion or reload is appropriate unless it was an explicitly owned, recorded part of a separate experiment."
    },
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Standby ordering",
        "question": "For a primary AD 110, is backup static AD 1 a floating standby for the same prefix?",
        "answer": "No.",
        "explanation": "It is more preferred and can win while the intended primary remains available.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Health versus withdrawal",
        "question": "Does an untracked primary automatically disappear because its downstream service fails?",
        "answer": "No.",
        "explanation": "Its route dependencies can remain available; inspect actual eligibility and independent service evidence.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Return requirement",
        "question": "Can a floating backup be installed while the original exchange still fails?",
        "answer": "Yes.",
        "explanation": "Backup downstream, policy, return or application prerequisites can still be missing.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Floating definition",
        "question": "Which configuration relationship establishes the intended floating preference for the same exact prefix?",
        "answer": "A usable backup distance strictly higher than the actual primary distance.",
        "explanation": "Preference requires eligibility and a known primary source; it does not prove path health.",
        "type": "multiple-choice",
        "options": [
          "A usable backup distance strictly higher than the actual primary distance.",
          "A backup description regardless of distance.",
          "A longer prefix with a larger distance.",
          "Distance 255 because it is the largest value."
        ],
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Wrong source preference",
        "question": "A declared OSPF /24 primary is AD 110 and static /24 backup is AD 1. Both are eligible. What is wrong with the intended standby design?",
        "answer": "The static candidate is more preferred and can replace the intended primary at baseline.",
        "explanation": "Choose supported same-prefix preference deliberately rather than trusting a backup label.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q02"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Silent remote failure",
        "question": "The primary interface and next-hop route remain usable, but the far-side service fails. Why might the floating route remain unselected?",
        "answer": "The primary route can remain eligible and preferred despite the service failure.",
        "explanation": "Downstream health is independent unless a supported detection/client design changes eligibility.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q03"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recursion trap",
        "question": "Why can a next-hop-only primary remain installed after the intended attachment fails?",
        "answer": "Another supporting route can still resolve its next hop.",
        "explanation": "Inspect the actual resolution chain and intended interface context; failure does not universally imply withdrawal.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q04"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Excluded preference",
        "question": "Why does a backup static route with Cisco-style AD 255 not provide the last-resort installation intended here?",
        "answer": "Distance 255 is excluded from installation.",
        "explanation": "A high number is not automatically a usable standby value.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q05"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Installed versus recovered",
        "question": "B is installed but its independent return prerequisite is missing. What must be established before claiming service recovery?",
        "answer": "Actual forward, return, policy and original-transaction success in the intended scope.",
        "explanation": "Installation alone does not prove the complete exchange.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q06"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Tracking scope",
        "question": "Why must an IP SLA probe source, destination and path be reviewed when it gates a static primary?",
        "answer": "It must observe the intended condition; success through a backup or an unrelated target can misrepresent primary health.",
        "explanation": "Object state and application state are separate evidence, and the browser runs neither.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Equal AD limit",
        "question": "Both eligible candidates have equal distance. What does this worksheet establish about the winning path?",
        "answer": "It does not determine the winner; actual platform tie/ECMP behavior requires separate evidence.",
        "explanation": "It does establish that a strictly ordered floating preference has not been supplied.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q08"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Failback versus sessions",
        "question": "After the preferred primary is restored, why is new route selection insufficient proof that existing sessions survive?",
        "answer": "Address/NAT, stateful policy and application state can differ across paths.",
        "explanation": "Preference restoration and session continuity are separate requirements.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q09"
      },
      {
        "difficulty": "Security",
        "testedConcept": "Owned failure scope",
        "question": "Why does the optional device exercise remove only R1 owned primary intent rather than clearing the routing table?",
        "answer": "It isolates the intended candidate-withdrawal test while preserving unrelated routes and management.",
        "explanation": "It does not claim a physical fault or automatic IP SLA detection; exact restoration and per-device cleanup follow.",
        "type": "short-answer",
        "topicId": "s3-g0-t1",
        "questionId": "s3-g0-t1-Q10"
      }
    ],
    "glossary": {
      "Floating static route": "A usable static candidate with higher preference distance than the intended primary for the same prefix.",
      "Eligibility": "Whether a route candidate can participate under its actual dependencies.",
      "Primary withdrawal": "Removal from usable selection; distinct from deletion of every configuration line.",
      "IP SLA": "A supported device operation that observes a specified exchange or condition.",
      "Tracking object": "A state supplied to an interested client according to its configured condition.",
      "Silent failure": "Service failure that may not change local route dependencies.",
      "Failback": "Return of preferred selection after its eligibility is restored.",
      "Asymmetric routing": "Forward and reply traffic traverse different paths."
    },
    "prerequisites": [
      "s3-g0-t0",
      "s1-g4-t3",
      "s1-g5-t0"
    ],
    "related": [
      "s3-g0-t2",
      "s3-g1-t0",
      "s1-g5-t2"
    ],
    "sources": [
      {
        "title": "Cisco same-prefix preference and floating route context",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco floating route recursion failure and multiaccess next-hop design",
        "url": "https://www.cisco.com/c/en/us/support/docs/dial-access/floating-static-route/118263-technote-nexthop-00.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE interface/next-hop/distance static syntax and operational dependencies",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_iri-iprouting.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco supported IP SLA/static tracking context and WAN policy considerations",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/ip-routing/200785-ISP-Failover-with-default-routes-using-I.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 IP SLA operation monitoring and statistics",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/nmgmt/b_1715_nmgmt_9300_cg/configuring_service_level_agreements.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 enhanced object tracking, state delay and static client",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/ip/b_1715_ip_9300_cg/configuring_enhanced___object_tracking.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g0-t2",
    "batch": "09",
    "title": "Policy-Based Routing",
    "subtitle": "Classify an ingress packet, trace ordered policy decisions, then verify its actual path.",
    "level": "Intermediate → Production",
    "minutes": 70,
    "definition": "Policy-Based Routing (PBR) applies a defined packet policy that can select a forwarding next hop using criteria beyond the ordinary destination lookup. In the scoped IOS XE example, an ingress route map uses ACL packet classification and ordered sequences to choose an adjacent next hop or return to normal routing. PBR does not become a new routing protocol or automatically alter the destination routes in the RIB. Its ACL and route-map permit/deny meanings depend on their policy role; they are not interchangeable with a packet-filter decision.",
    "purpose": "Use PBR for a justified source-sensitive or traffic-sensitive forwarding requirement, such as an owned client class taking a particular adjacent path while other packets use ordinary routing. First explain why destination routes alone cannot express the requirement. Then bound ingress attachment, packet class, policy sequence, selected next hop and normal fallback scope. A policy that looks plausible in configuration can affect the wrong traffic, bypass an intended path or leave the reverse direction unchanged. The lesson teaches that decision boundary before any target change.",
    "mental": "Place a classification desk at one ingress interface. Its route-map pages are examined in sequence order. An ACL permit makes that page match; an ACL deny says this page does not match and the desk can examine the next page. A matched route-map permit applies its set action. A matched route-map deny ends policy processing and hands the packet to ordinary routing. The desk does not authenticate the packet, repair the downstream path or write return routes. These meanings describe PBR, not every other consumer of an ACL or route map.",
    "components": [
      "Attachment and traffic scope: the example policy is attached to a prepared Layer 3 ingress interface. A transit packet arriving there differs from a locally generated router transaction. No local policy is configured in this exercise. Do not use a locally sourced router test as the only proof that an ingress policy works, or assume it applies on an egress attachment.",
      "Packet match: standard ACLs classify source addresses; extended ACLs can include source, destination and protocol/transport criteria. This fixture uses IPv4 source/destination pairs and ip protocol matching, with host entries and /24 wildcard masks. ACL first-match order matters within the referenced list; implicit deny means no match in this PBR classifier.",
      "Route-map order: sequences 10, 20 and 30 form one named map. A denied ACL match at sequence 10 proceeds to the next route-map sequence. A satisfied route-map deny at sequence 20 returns to ordinary routing and does not evaluate the later permit. A description or later entry does not override a prior terminal decision.",
      "Action: set ip next-hop names a policy-selected next hop for matching packets. The chosen Catalyst 9300 IOS XE 17.15 scope requires adjacent next hops and excludes recursive/verify-availability actions documented as unavailable there. Normal destination route preference is a separate decision, not an AD value that automatically defeats a matching PBR action.",
      "Ordinary routing and service: unmatched, excluded or explicitly exempted traffic follows normal destination routing. That routing still needs an installed match and actual forwarding/neighbor/downstream/return requirements. A policy deny can therefore lead to working ordinary forwarding or no ordinary route; it is not a firewall discard instruction.",
      "Target restrictions and evidence: inspect platform, release, license, routed-interface/SVI role, packet type and hardware resources. The 17.15 guide specifies unicast scope, fragmentation behavior and feature coexistence restrictions. Avoid matching local/control traffic indiscriminately; those restrictions are not a universal promise about every router or IPv6 design."
    ],
    "mechanism": [
      "Identify the actual source/destination, packet type, ingress and routing table/VRF. Verify which map is attached there and whether the traffic is in the supported policy scope. This worksheet bypasses policy for locally generated packets with no local policy and for fragmented traffic in its target-specific scope.",
      "Evaluate the first enabled sequence and its match ACL. For .99 to the server /24, the first ACL entry explicitly denies that classifier match; the later permit in the same ACL does not override it. Route-map processing proceeds to the next sequence instead of dropping the packet.",
      "If sequence 20 is present, its separate ACL permits .99 to the server /24, satisfying a route-map deny. Stop policy processing and use ordinary routing. Do not continue to sequence 30 after that matched deny.",
      "If sequence 20 is absent in the worksheet, .99 can match sequence 30 permit and select its declared adjacent next hop. Priority .10 matches sequence 10 permit and stops there. Other packet fixtures match no page and use normal destination routing.",
      "Inspect the selected actual forwarding action, neighbor and downstream path, then trace the reverse direction and original transaction separately. An untracked action can remain selected despite a downstream failure; this fixture assumes all policy next hops are prepared and adjacent and does not compute unavailable-next-hop fallback.",
      "Detach only the owned ingress policy for the controlled normal-routing comparison, preserve configuration/evidence, then restore exact attachment if required. For cleanup detach first and delete only confirmed newly owned unreferenced map/ACL objects. Reconcile the actual original service and prior active/saved state."
    ],
    "flow": [
      [
        "Confirm packet and ingress",
        "Distinguish transit, local and target-specific excluded packets."
      ],
      [
        "Walk ACL and map sequence",
        "ACL deny skips a match; matched route-map deny returns to normal routing."
      ],
      [
        "Select the scoped action",
        "Apply a matching adjacent next hop or use ordinary destination routing."
      ],
      [
        "Verify original exchange",
        "Inspect actual forward/return/service evidence and exact rollback."
      ]
    ],
    "comparison": [
      [
        "Destination routing / PBR",
        "Installed destination lookup / packet policy at its attachment",
        "PBR does not learn or advertise a routing protocol."
      ],
      [
        "ACL deny in match / filter deny",
        "No match for this route-map page / filtering role may drop",
        "Interpret the ACL by its actual consumer."
      ],
      [
        "Route-map deny in PBR / redistribution",
        "Ordinary packet routing / different routing-policy consumer",
        "Do not import route-update deny semantics into packet forwarding."
      ],
      [
        "Ingress policy / local policy",
        "Arriving traffic / router-generated traffic",
        "No local policy is configured in this example."
      ],
      [
        "Set next-hop / set default next-hop",
        "Policy action / different fallback semantics",
        "Default and recursive/verified actions are excluded from this target fixture."
      ],
      [
        "Selected policy action / service success",
        "A forwarding instruction / complete original exchange",
        "Adjacency, downstream, policy and return readiness stay independent."
      ],
      [
        "Attachment removal / object deletion",
        "Disable owned ingress effect / delete owned map and classifiers",
        "Detach before removing newly created objects; preserve shared references."
      ]
    ],
    "example": "All packet fixtures use a prepared policy ingress. Sequence 10 permit matches FB-PBR-SELECT: its ACL first denies .99 to server 198.51.100.0/24, then permits client 192.0.2.0/24 to that server prefix. Priority .10 to .20 is permitted and selects P, adjacent next hop 203.0.113.2. Exception .99 fails the sequence-10 match; sequence 20 deny uses another ACL that permits .99 to server /24, so it returns the packet to normal routing via declared N, 203.0.113.6. A later sequence 30 permit cannot override that terminal deny. Disable only sequence 20 in the worksheet: the same .99 reaches sequence 30 and selects L, 203.0.113.10. None of those decisions drops the packet as a classifier/filter action. If normal routing has no installed match, ordinary fallback has no forwarding choice. If a selected policy path is unhealthy or return prerequisites are missing, that selected next hop does not prove a successful exchange.",
    "commands": [
      {
        "code": "show running-config\nshow startup-config\nshow ip policy\nshow ip local policy\nshow route-map\nshow ip access-lists\nshow ip route\nshow ip cef",
        "explanation": "Record configured policy/classifiers, ingress and local attachments, normal routes and forwarding context before optional target work.",
        "expected": "GUIDED, NOT EXECUTED: record actual platform/release/license, ingress, next-hop neighbors, routing table and source/destination scope. Existing original-service observations and mapped return paths are separate. Counter or configuration output alone does not prove a specific packet reached its intended service.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nip access-list extended FB-PBR-SELECT\ndeny ip host 192.0.2.99 198.51.100.0 0.0.0.255\npermit ip 192.0.2.0 0.0.0.255 198.51.100.0 0.0.0.255\nexit\nip access-list extended FB-PBR-EXEMPT\npermit ip host 192.0.2.99 198.51.100.0 0.0.0.255\nexit\nip access-list extended FB-PBR-LATE\npermit ip host 192.0.2.99 198.51.100.0 0.0.0.255\nexit\nend",
        "explanation": "Create only three reviewed, previously unused named packet classifiers for the isolated PBR experiment.",
        "expected": "GUIDED, NOT EXECUTED: confirm no existing objects or consumers use these names. 0.0.0.255 is the /24 wildcard, not a subnet-mask field. The explicit deny skips this PBR match; do not attach these lists as interface packet filters. Prepared ingress/client/server addressing is required.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nroute-map FB-PBR permit 10\nmatch ip address FB-PBR-SELECT\nset ip next-hop 203.0.113.2\nexit\nroute-map FB-PBR deny 20\nmatch ip address FB-PBR-EXEMPT\nexit\nroute-map FB-PBR permit 30\nmatch ip address FB-PBR-LATE\nset ip next-hop 203.0.113.10\nexit\nend\nshow route-map FB-PBR",
        "explanation": "Create the three ordered sequences of the confirmed newly owned map before attaching it.",
        "expected": "GUIDED, NOT EXECUTED: all policy next hops must already be adjacent and usable in the supported target context. Sequence 20 is a PBR exemption to ordinary routing, not a traffic drop. Sequence 30 illustrates ordering but is not reached for .99 while sequence 20 matches. No default/recursive/verified next-hop or redistribution command is supplied.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/3\nip policy route-map FB-PBR\nend\nshow ip policy",
        "explanation": "Attach the reviewed map only to the prepared isolated client-side routed ingress.",
        "expected": "GUIDED, NOT EXECUTED: map this actual interface before changing it, preserve prior attachment and independent management, and confirm the chosen target supports the feature/license/interface role. Do not convert a live switchport or replace a pre-existing shared policy blindly. Test actual transit .10/.99 and unaffected traffic with source/destination evidence.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/3\nno ip policy route-map\nend\nshow ip policy\nshow ip route",
        "explanation": "Controlled detachment of only the owned ingress attachment for comparison with normal destination routing.",
        "expected": "GUIDED, NOT EXECUTED: this fault changes attachment, not route eligibility or a physical link. Compare the same actual transit transaction and normal path before/after. Normal route/return/service readiness must already exist; detachment alone is not universal connectivity recovery.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/3\nip policy route-map FB-PBR\nend\nshow ip policy\nshow route-map FB-PBR",
        "explanation": "Restore the same owned attachment after the controlled detachment comparison.",
        "expected": "GUIDED, NOT EXECUTED: repeat the original transit scope and relevant exception/unmatched transactions. Check exact active/saved intent independently. Router-local tests do not exercise this ingress attachment by default.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/3\nno ip policy route-map\nexit\nno route-map FB-PBR\nno ip access-list extended FB-PBR-SELECT\nno ip access-list extended FB-PBR-EXEMPT\nno ip access-list extended FB-PBR-LATE\nend\nshow ip policy\nshow route-map\nshow ip access-lists",
        "explanation": "Detach first, then delete only the confirmed newly created, unreferenced owned policy and classifiers at the end of the optional lab.",
        "expected": "GUIDED, NOT EXECUTED: verify all named objects were absent at baseline and have no unrelated consumers. Restore exact prior ingress/local/route/table/host/service configuration separately. Do not delete a shared map or ACL, clear tables/counters, disable forwarding or save unrelated changes.",
        "filename": "ios",
        "platform": "Prepared isolated IOS XE 17.15 routing lab · guided, not executed here"
      }
    ],
    "configuration": "The optional target branch starts from a prepared isolated ingress R1 and remote router/path context, client .10 and exception .99 on 192.0.2.0/24, and server .20 on 198.51.100.0/24. R1 client-side ingress example is GigabitEthernet1/0/3 with LAN .1; policy P uses adjacent .2 on 203.0.113.0/30, ordinary N uses adjacent .6 on 203.0.113.4/30, and later-policy L uses adjacent .10 on 203.0.113.8/30. R1 peers are .1/.5/.9 on those respective transits. Map every actual attachment and return route before adding policy. Ordinary destination routing through N, all policy next-hop attachments, hosts, unicast forwarding, security policy and independent management must already work; the commands do not build them or convert interface roles. Record existing maps/classifiers/attachments, active/saved intent and reference ownership, then create the three unused ACL names and map before attaching it. A wildcard mask is a match field, not interface addressing. The controlled fault detaches only the newly owned ingress map while preserving normal routes; restore exact attachment and repeat the same original transactions before final cleanup. No local policy, track/IP SLA action, route redistribution, VRF change, NAT or packet-filter attachment is created. The 17.15 guide has target-specific unsupported actions and coexistence restrictions; do not copy a generic router feature example into this switch design without checking support.",
    "ports": "PBR itself does not introduce a transport port. Packet classification can include IP protocol and supported TCP/UDP fields, but this fixture matches ip source/destination scope rather than an application port. Device management, ARP/neighbor resolution, control traffic and the original application have separate protocol requirements. Matching a port number does not authenticate an application or prove payload identity. Fragmentation and control/local traffic require actual target-specific handling, not an assumption derived from a source/destination-only model.",
    "production": "A source-sensitive path can be useful when ordinary destination routes cannot express an owned business requirement. Keep the policy minimal, describe which ingress and traffic it affects, document normal fallback and excluded/control traffic, and inspect the actual reverse direction. Route maps can also be consumed by redistribution or other features with different meanings, so keep consumer and ownership explicit. Avoid broad any-to-any matches that redirect management or signaling traffic. Validate target support and resource use before deployment; a software guide is not hardware programming evidence. For this documented Catalyst release, fragmented traffic uses normal routing, next hops must be adjacent, recursive/verify-availability actions are unavailable and NAT/WCCP/GRE combinations have restrictions. Test those actual design requirements rather than promising the generic IOS feature set. Traffic steering supplies neither encryption nor automatic application health detection, and path asymmetry can affect stateful devices.",
    "troubleshooting": [
      "Map is configured but traffic ignores it: inspect actual ingress attachment, interface role, traffic origin and supported packet scope. A router-local ping with no local policy is not the same as a host transit test through the attached ingress.",
      "ACL deny is mistaken for dropped traffic: identify whether the ACL is a PBR match classifier or an actual filter. Here .99 fails sequence 10 and can continue; inspect the next map sequence and ordinary routing rather than rewriting a filter blindly.",
      "Later permit appears ineffective: inspect the first terminal matching sequence. A matched route-map deny 20 returns to ordinary routing, so later permit 30 cannot override it. An earlier permit can likewise stop evaluation.",
      "Normal destination route points elsewhere but selected traffic takes P: inspect the PBR action and ingress match before changing AD. PBR and the RIB are distinct; the presence of an ordinary route does not disprove a matched policy action.",
      "Selected policy next hop remains while service fails: inspect actual neighbor, supported next-hop readiness, downstream/policy and reverse/application evidence. This untracked fixture assumes prepared adjacency and does not decide unavailable-next-hop fallback or detect remote health.",
      "Exception or unmatched traffic has no path: check the ordinary destination route and return/policy scope. A PBR deny is not a traffic-filter drop, but ordinary lookup can still lack a usable route.",
      "Specific packets behave differently: review fragmentation, multicast/local/control scope and release-specific restrictions. Do not infer every platform capability from this fixed IPv4 unicast fixture."
    ],
    "security": "Steering can cross a different trust or inspection boundary even when addresses and the ordinary RIB stay unchanged. Review source/destination classification, expected path policy and control/management exclusions; packets can carry spoofed source information unless the actual access design validates it. ACL deny used as a PBR match does not provide a firewall block, and a route-map deny is not access control. Keep classifiers separate from packet filters and shared routing-policy consumers. Own and review each temporary name and attachment before change, preserve independent management, and detach before deleting newly created objects. Browser controls are bounded fixture enums/booleans with text-rendered trace; they execute no CLI, external packet or raw user HTML.",
    "performance": "The number and order of classifiers/actions can affect target hardware resources and forwarding behavior; measure the actual supported design rather than assuming every route map is programmed identically. This worksheet walks three declared rows and predicts no CPU, TCAM, latency or throughput. PBR is not dynamic convergence or a health detector. An operational next hop can lead to a slow or unavailable service, and an alternate path can create asymmetry or application-state costs. Preserve normal routing and original-service baselines so troubleshooting compares like traffic instead of using an unrelated local test or clearing counters before retaining evidence.",
    "mistakes": [
      "Using ACL deny in a PBR classifier as a firewall drop.",
      "Assuming matched route-map deny continues to a later permit.",
      "Applying a policy on the wrong ingress or testing it only with router-generated traffic.",
      "Treating PBR as a routing protocol that advertises or changes RIB routes.",
      "Changing AD before inspecting a matched policy action.",
      "Using unsupported default/recursive/verified actions from another product guide.",
      "Matching local/control traffic indiscriminately.",
      "Assuming selected next hop proves neighbor, downstream, reverse or application health.",
      "Deleting a shared ACL/map or deleting owned objects before detaching the policy."
    ],
    "interactive": "policy-routing",
    "lab": {
      "objective": "Trace ordered packet policy, distinguish ACL match denial from route-map exemption, and verify the original ingress transaction separately from route or configuration evidence.",
      "requirements": "The browser fixture needs no device and is the scoped exercise. Optional Cisco work requires prepared supported isolated Catalyst 9300 IOS XE 17.15 context, mapped routed ingress and adjacent P/N/L paths, normal destination and return routes, hosts .10/.99/server .20, independent management and exclusive ownership of unused object names. No Cisco execution is performed.",
      "topology": [
        "Client .10 or exception .99",
        "R1 ingress policy sequences 10 → 20 → 30",
        "One selected path: P OR normal N OR later L",
        "Server .20 via prepared remote context",
        "Independent return and original-service evidence"
      ],
      "steps": [
        "Browser: choose priority .10 to server. Record sequence 10 ACL permit, terminal map permit and selected P. The ordinary N route can remain declared installed; PBR does not rewrite it.",
        "Choose .99 exception. Record explicit ACL deny at sequence 10, then ACL permit satisfying map deny 20. Explain normal N selection and why sequence 30 is not evaluated.",
        "Disable only exemption sequence 20 in the worksheet. The same .99 now reaches sequence 30 permit and selects L. Explain why this demonstrates ACL denial continuing rather than dropping.",
        "Compare no match, detached ingress, locally generated and fragmented cases. Record normal N and the specific target scope. Remove normal-route declaration in an ordinary case to observe no choice; keep it absent in priority case to observe policy action with prepared adjacency.",
        "Independently change selected downstream or return health. Selection can remain P/L/N while the declared exchange becomes unavailable. These are declarations, not a live transaction or unavailable-next-hop algorithm. Keyboard reset restores all fixture values.",
        "Optional target: retain configured/operational/original-service baseline, exclusive names and exact interface/path mapping. Create classifiers and ordered map, inspect them, then attach only to the mapped routed client ingress. Test actual transit .10/.99 and unrelated traffic separately.",
        "Optional target: detach only owned ingress policy, compare the same original transit exchange/path with ordinary routing, restore exact attachment and repeat observations. Do not classify that detachment as a link fault or health detector test.",
        "After evidence, reset the worksheet. For optional targets detach before deleting only owned unreferenced map/ACL names, restore exact prior attachment/configuration/host/route/service context and verify management plus baseline."
      ],
      "verification": "Priority selects P after sequence 10. Exception skips 10 through explicit ACL deny; matching map deny 20 selects ordinary N and stops. With 20 disabled, exception reaches 30 and selects L. No match, detached, local-without-policy and target-specific fragmentation use ordinary routing. Missing ordinary route gives no ordinary choice, while a matched policy action can still select its assumed adjacent next hop. Selected path can coexist with failed downstream/return declaration. Actual device/original-service results require separate evidence; no synthetic Cisco output is supplied.",
      "troubleshooting": "Read packet origin/ingress, first-match ACL result and route-map sequence as separate observations. The table always shows three rows, including not-evaluated terminal successors. The fixture assumes prepared policy adjacency and does not decide unavailable-next-hop fallback, hardware programming, recursive/default/verified actions, VRF, local policy configuration or live packet arrival.",
      "challenge": "Write a four-row evidence comparison for priority permit, ACL skip plus map deny, ACL skip plus later permit, and local test with no local policy. Name the selected path, the first terminal sequence, whether the ordinary RIB changed, and what actual forward/return/transaction observations would verify the result. Include the smallest safe rollback for a wrong ingress attachment.",
      "cleanup": "Reset changes only worksheet declarations. For optional work detach the newly owned ingress map first, confirm no other references, delete only the newly owned map/ACL names and restore exact prior intent and service baseline. Shared names must not be removed. Do not flush routes, clear unretained counters, disable routing, convert interface roles, remove unrelated local policy, reload or save unrelated active changes."
    },
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "PBR classification",
        "question": "Does an ACL deny used by match ip address drop the packet in this PBR fixture?",
        "answer": "No.",
        "explanation": "It does not match that route-map page and processing can continue.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Route-map exemption",
        "question": "Does matched route-map deny 20 let permit 30 override it?",
        "answer": "No.",
        "explanation": "Matched PBR deny stops policy processing and uses ordinary routing.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Ingress evidence",
        "question": "Does a router-local test prove an ingress host-transit policy with no local policy configured?",
        "answer": "No.",
        "explanation": "Traffic origin and attachment differ; test the actual ingress transaction.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Policy purpose",
        "question": "What requirement can this scoped PBR policy express beyond an ordinary destination-only lookup?",
        "answer": "A specific ingress source/destination class taking a declared adjacent next hop.",
        "explanation": "It is packet steering, not a new routing protocol or proof of path health.",
        "type": "multiple-choice",
        "options": [
          "A specific ingress source/destination class taking a declared adjacent next hop.",
          "Automatic application authentication.",
          "Advertising a new routing protocol.",
          "Guaranteed reverse-path session continuity."
        ],
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "RIB versus action",
        "question": "The ordinary destination route points to N, but the priority fixture selects P. Must PBR have changed the ordinary RIB?",
        "answer": "No; a matched packet policy action is separate from the ordinary destination route.",
        "explanation": "Inspect ingress classification and set action instead of assuming an AD change.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q02"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "ACL denial",
        "question": "Why does .99 continue beyond sequence 10 despite its explicit ACL deny?",
        "answer": "That deny means no match for the PBR page, not a packet-filter drop.",
        "explanation": "The next route-map sequence can then match a different ACL.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Map denial",
        "question": "Sequence 20 deny matches .99 and sequence 30 permit also could match it. Which processing occurs?",
        "answer": "Stop PBR at 20 and use ordinary routing; 30 is not evaluated.",
        "explanation": "A matched map deny differs from an ACL deny inside a match classifier.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q04"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Later match",
        "question": "In the same .99 fixture, what changes when only sequence 20 is disabled in the worksheet?",
        "answer": "The packet can reach sequence 30 permit and select L.",
        "explanation": "Sequence 10 still does not match, so the later eligible policy page now supplies the action.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q05"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Silent path failure",
        "question": "P remains selected while its declared downstream health becomes false. Does this prove the policy automatically moved to N?",
        "answer": "No; the untracked fixture keeps P selected and the declared exchange is unavailable.",
        "explanation": "Actual next-hop availability and supported fallback/detection behavior are separate target evidence.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q06"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Local versus transit",
        "question": "Why can a locally generated router test follow N while the host ingress priority fixture follows P?",
        "answer": "No local policy is configured, so the ingress attachment does not govern that local test.",
        "explanation": "Use the original traffic origin and supported target scope when validating policy.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Target scope",
        "question": "Why must fragmented traffic behavior and recursive/verified next-hop support be checked for the actual target?",
        "answer": "The Catalyst 9300 17.15 documented scope has specific exclusions that are not universal router behavior.",
        "explanation": "This worksheet sends fragmented traffic to normal routing and assumes adjacent policy next hops.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q08"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Return evidence",
        "question": "Why is selected P or L insufficient evidence that the original exchange recovered?",
        "answer": "Neighbor, downstream, policy, reverse route and application prerequisites can still fail.",
        "explanation": "Retain actual original-service evidence rather than substituting configuration output.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q09"
      },
      {
        "difficulty": "Security",
        "testedConcept": "Owned rollback",
        "question": "What is the safe order for removing the optional newly owned PBR experiment?",
        "answer": "Detach its ingress policy, confirm references, then delete only owned map/ACL objects and restore the exact baseline.",
        "explanation": "Deleting shared policy objects or changing unrelated routing state can affect other traffic.",
        "type": "short-answer",
        "topicId": "s3-g0-t2",
        "questionId": "s3-g0-t2-Q10"
      }
    ],
    "glossary": {
      "PBR": "Packet forwarding policy at its supported attachment and scope.",
      "Match ACL": "A classifier whose permitted packets satisfy a PBR page match.",
      "Route-map sequence": "Ordered page containing match criteria and policy action or exemption.",
      "Policy exemption": "Matched PBR deny returning traffic to ordinary routing.",
      "Adjacent next hop": "A directly attached router used by this target-scoped action.",
      "Ingress attachment": "Interface where arriving traffic is subject to a policy.",
      "Local policy": "A separate policy for supported router-generated traffic.",
      "Consumer context": "The feature interpreting a classifier or route-map result."
    },
    "prerequisites": [
      "s3-g0-t0",
      "s3-g0-t1",
      "s2-g0-t0"
    ],
    "related": [
      "s3-g1-t0",
      "s3-g4-t0",
      "s1-g5-t1"
    ],
    "sources": [
      {
        "title": "Catalyst 9300 IOS XE 17.15 PBR behavior, attachment, target restrictions and inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/protocol_independent_features.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 17.15 route-map consumer semantics and scoped deletion",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 17.15 named extended IPv4 ACL syntax and first-match classification",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/sec/b_1715_sec_9300_cg/configuring_ipv4_acls.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE command reference: ingress policy attachment and no-form detachment",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-a1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 17.15 ACL inspection and named-list removal syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/security_commands.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g1-t0",
    "batch": "09",
    "title": "OSPF",
    "subtitle": "Build a topology view, compute local paths, then verify actual forwarding.",
    "level": "Intermediate → Production",
    "minutes": 75,
    "definition": "Open Shortest Path First is an interior routing protocol that uses link-state information to calculate paths. This lesson focuses on OSPFv2 for IPv4 in a prepared single area. Routers discover neighbors, form appropriate adjacencies, exchange and flood link-state advertisements, maintain an area database and calculate paths from their own position. A calculated route remains distinct from a selected installed routing-table entry, forwarding implementation and a working original service. Areas, DR/BDR, LSA basics and deeper troubleshooting are following original nodes; this exercise does not replace them.",
    "purpose": "Use OSPF to distribute owned internal reachability as the topology changes instead of maintaining every remote prefix manually. It does not configure hosts, authenticate applications, encrypt traffic or repair a broken return path automatically. Answer five separate questions: who is adjacent, what is in the database, which path is calculated, which route is installed, and whether the original exchange succeeds.",
    "mental": "Each router maintains a map and places its own starting pin on it. Sharing the map does not mean choosing the same first step: R1 and R3 compute from their own roots. Labels are outgoing interface costs, so the opposite direction can cost something different. An itinerary is a routing candidate, not a delivery receipt. Compare the map, itinerary, installed forwarding instructions and observed exchange separately. The browser receives a complete supplied graph; the FRR lab actually forms adjacency and learns routes.",
    "components": [
      "Router identity and local process: the router ID is a domain-unique 32-bit identifier written in dotted notation. It need not be an interface address carrying user traffic. A Cisco process number selects local configuration; peers need not use the same number. Optional examples use R1 process 109 and R2 process 209, with distinct IDs 1.1.1.1 and 2.2.2.2.",
      "Interface and area: enable the intended routed attachment in the correct process/address-family/table context. A network statement selects interfaces by their addresses; it does not create arbitrary remote routes or redistribute every matching prefix. Explicit interface-area activation makes scope visible here. Area 0 is used; area hierarchy, ABRs and inter-area route types follow next.",
      "Hello and adjacency: compatible peers discover each other and recognize bidirectional communication. Check area, Hello/dead intervals, compatible area capabilities/authentication and addressing/network-type scope. Router IDs must be distinct, not identical. Interface cost need not match between peers. An enabled passive LAN can still be advertised while forming no neighbors.",
      "Neighbor states: Down/Init/2-Way describe discovery and recognition; ExStart/Exchange negotiate and exchange database descriptions; Loading requests missing information; Full indicates synchronized adjacency. Not every state must be visible in each observation. Broadcast DROther pairs can remain 2-Way by design; the prepared point-to-point peers should reach Full with no DR/BDR election.",
      "LSAs and database: advertisements describe OSPF information, not merely installed destination routes. Database Description, Request, Update and Acknowledgment packets support synchronization and flooding. Topology router/network LSAs are area-scoped. One update can carry multiple LSAs, so packet count is not advertisement count. Types, age, sequence and flooding scope are expanded later.",
      "SPF and metric: this intra-area calculation sums outgoing costs and includes the destination LAN stub cost. Reference-bandwidth policy or manual interface costs determine metric values; actual defaults depend on implementation/configuration. Several different physical speeds can map to the same cost when the reference is too low.",
      "Installation and service: compare the OSPF calculation with selected RIB routes, FIB and next-hop evidence. A preferred connected or other same-prefix source can prevent OSPF selection. Cisco-style default OSPF AD 110 is local source preference, not the SPF cost or an RFC-wide constant. Longest-prefix forwarding and independent return/policy/service checks still apply."
    ],
    "mechanism": [
      "Identify IPv4 process/table, interface, area, unique router ID and intended peer. Record configuration and original-service baseline, with independent management.",
      "Exchange compatible Hellos on the non-passive transit and establish bidirectional recognition. Decide whether adjacency is required by network type and role; a broadcast DROther 2-Way relationship is not automatically broken.",
      "For required adjacencies, negotiate database exchange, describe advertisements, request missing information and acknowledge updates. Inspect actual database and neighbor state. Hello capture alone does not prove Full.",
      "Calculate intra-area shortest paths from each router using outgoing costs, then add the advertised destination-network cost. Equal-cost paths can exist; actual maximum paths, RIB selection and hardware programming require target evidence. The browser begins after convergence and runs no flooding/timers.",
      "Compare candidates with installed RIB/FIB and next-hop state. Test both directions and the original service. The actual FRR lab separately records Full neighbors, router LSAs, installed learned routes, bounded ICMP and protocol headers.",
      "Inject one owned fault, retain each evidence layer, restore the exact setting and repeat the same exchange. Clean only owned resources; do not flush unrelated state."
    ],
    "flow": [
      [
        "Discover the intended peer",
        "Compatible Hellos and network role determine whether adjacency is required."
      ],
      [
        "Synchronize topology information",
        "Inspect Full adjacency and area database; Hello is only one evidence layer."
      ],
      [
        "Compute and admit routes",
        "SPF creates a candidate; local RIB/FIB selection remains separate."
      ],
      [
        "Verify exchange and recover",
        "Check both directions, apply one owned fault and restore exact baseline."
      ]
    ],
    "example": "The browser graph has R1–R2–R3 and a direct R1–R3 link. With outgoing costs R1→R2 10 and R2→R3 10, direct R1→R3 30 and R3 LAN stub cost 10, the via-R2 prefix candidate costs 30 and the direct alternative 40. Set direct cost to 20: both paths give prefix cost 30. Set R1→R3 to 5 while R3→R1 is 50: forward uses direct with prefix cost 15; reverse uses R2 with prefix cost 30. Peer costs need not match for adjacency. Remove R2–R3 from the supplied graph: direct still works. Remove R1–R3 too: R3 is partitioned. Withhold both LAN advertisements: router paths can remain without prefix candidates. Clear RIB selection or forward/return readiness: an SPF candidate can remain while the declared exchange is not established. These are supplied declarations, not OSPF packets. The separate two-router FRR lab actually observes learned remote LAN metric 20, comprising transit and destination LAN costs observed as ten each in that environment.",
    "configuration": "The actual Linux artifact prepares client 192.0.2.10/24, R1 LAN .1, R1 transit 203.0.113.1/30, R2 transit .2/30, R2 LAN 198.51.100.1/24 and server .20. Host routes point to local routers; routers learn opposite LANs through FRR without static remote routes. The transit is point-to-point, LANs enabled but passive, and explicit 1/4-second Hello/dead values apply only to the disposable experiment. Optional Cisco work instead starts with those already prepared routed attachments, mapped Gi1/0/1 transit and Gi1/0/2 LAN on each router. It adds only unused owned processes 109/209, unique IDs, explicit area activation, costs ten and passive-default with active transit. It does not enable global routing, change addresses/interface roles, add host routes, redistribute routes, change VRFs, install authentication or save unrelated configuration. Verify actual parser/license/features and ownership first. For cleanup remove owned interface activation before deleting the exclusive process. Another network statement can still activate an interface, so exclude that conflict at baseline. Default network-type/cost restorations assume those overrides were absent before the lab; otherwise restore exact prior intent.",
    "ports": "OSPFv2 runs directly over IP protocol number 89, not TCP or UDP port 89. IPv4 multicast 224.0.0.5 is AllSPFRouters; 224.0.0.6 is AllDRouters. Use depends on network type and purpose, and there are unicast cases. This actual point-to-point capture checks Hellos to 224.0.0.5 from both peers, not every exchange. Security rules must handle IP protocol/destination scope: a transport-port-89 rule does not permit OSPF automatically. OSPFv3 is a separate version with different packet/address-family context; this is not an IPv6 OSPF implementation.",
    "production": "Plan stable unique router IDs, area boundaries and explicit participation. Keep access LANs passive when neighbors are not intended while advertising owned reachability as appropriate. Standardize reference-bandwidth/cost policy and inspect actual interface costs; configuration does not measure throughput. If redistribution is required, bound prefixes and review feedback/loop controls rather than redistributing everything to fix an omitted LAN activation. Record neighbor roles, advertisements and selected routes with timestamps. During changes correlate database/route evidence with the original transaction, including asymmetry and stateful devices. Avoid process resets and table clears as initial diagnostics: they destroy evidence and introduce further disruption.",
    "troubleshooting": [
      "No peer: inspect interface participation, process/area/table, passive setting, addressing, carrier and protocol-89 control-plane/policy reachability at both ends. Directly connected ping does not prove OSPF exchange is permitted.",
      "Init or no bidirectional recognition: inspect owned transit Hellos and whether each peer lists the other router ID. Check one-way filtering/addressing before metrics; cost cannot repair Hello reachability.",
      "2-Way: distinguish broadcast DROther role from point-to-point. DROther pairs can stay 2-Way normally. The prepared point-to-point pair has a Full expectation; a persistent non-Full state needs further inspection.",
      "ExStart/Exchange: compare MTU, network type, router identity and actual database-description exchange. MTU mismatch can block synchronization; blindly enabling mtu-ignore can conceal the problem rather than establishing its cause.",
      "Full but missing LAN: inspect advertising-router interface-area/passive/prefix intent, database information and calculated route. Full does not mean every expected prefix is advertised or selected.",
      "Calculated route not active: inspect exact prefix/table, competing sources and FIB/next-hop evidence. AD and interface cost answer different questions; not every LSDB entry becomes an installed route.",
      "Routes look correct but service fails: inspect both directions, host gateway/mask, forwarding/neighbor state, filtering, MTU and original application requirements. Successful lab ICMP proves those probes, not every application.",
      "Passive-transit fault: carrier remains up while adjacency and learned remote LANs disappear; local client gateway remains reachable. Reverse only the introduced passive setting, then verify Full, installed routes and the same bidirectional probes."
    ],
    "security": "Advertise intended prefixes and permit adjacency only on reviewed transits. Passive interfaces reduce unnecessary protocol exposure, but do not encrypt user traffic or replace filtering. Authentication needs supported algorithms and key lifecycle on the actual release. None is configured in this fully isolated lab; old clear-text/MD5 examples are not a current universal recommendation. Authentication also cannot guarantee an authorized peer advertises correct reachability. Collect only owned traffic and restrict management/control-plane access. The artifact disables TCP VTY, uses owned UNIX sockets and supplies group/configuration views only in private mount namespaces. It neither edits host groups nor starts a system FRR service. Do not copy root lab permissions or its unauthenticated transit into production.",
    "performance": "OSPF spends resources maintaining neighbors, flooding changes, retaining databases and computing routes. Unstable links can drive repeated work; area/cost/timer/throttle design needs topology and platform evidence. Shorter Hello/dead values or BFD alter detection behavior, but configured detection is not measured recovery or guaranteed session continuity. The worksheet changes a completed graph instantly, with no convergence timeline. FRR bounded waits check eventual state within a test budget; they are not benchmarks. WSL virtual links/shared kernel supply no physical line-rate, ASIC, scale, throughput or production timer-sizing evidence.",
    "mistakes": [
      "Using TCP/UDP port 89 instead of IP protocol 89.",
      "Duplicating router IDs or requiring matching local process numbers.",
      "Calling every 2-Way peer broken without checking network role.",
      "Confusing passive LAN advertisement with an active transit.",
      "Expecting network statements to create arbitrary remote prefixes.",
      "Omitting the destination stub cost or assuming symmetric costs/paths.",
      "Equating LSDB/SPF presence with installed forwarding and service.",
      "Treating browser graph toggles as measured protocol convergence.",
      "Clearing processes/tables or bypassing MTU checks before preserving evidence."
    ],
    "comparison": [
      [
        "Neighbor / adjacency",
        "Discovery and recognition / required database synchronization",
        "Full is expected on this point-to-point transit, not every broadcast pair."
      ],
      [
        "LSA / update packet",
        "Advertisement object / carrier of advertisement information",
        "Several LSAs can be in one update."
      ],
      [
        "LSDB / RIB / FIB",
        "Topology information / chosen routes / forwarding implementation",
        "Inspect each evidence layer independently."
      ],
      [
        "Router ID / process ID",
        "Domain identity / local configuration selector",
        "Router IDs distinct; local process numbers can differ."
      ],
      [
        "Cost / AD",
        "OSPF path metric / local source preference",
        "Do not sum AD; include outgoing and destination LAN costs."
      ],
      [
        "Passive LAN / passive transit",
        "Advertised attachment without neighbors / suppress intended adjacency",
        "Interface role determines whether passive is desired."
      ],
      [
        "Browser / FRR lab",
        "Converged three-router graph / actual two-router protocol",
        "Graph controls emit no packets or timers."
      ]
    ],
    "interactive": "ospf-spf",
    "artifacts": [
      {
        "title": "Actual isolated OSPFv2 lab · Bash",
        "path": "labs/ospf-routing.sh"
      },
      {
        "title": "Pinned Ubuntu FRR runtime preparation · Bash",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Explain directed shortest-path candidates, inspect actual OSPF neighbor/database/route/packet/forwarding evidence and recover one passive-transit fault.",
      "requirements": "The browser needs no device. Optional Linux execution needs root namespace/mount capability, Ubuntu 24.04 amd64, pinned extracted FRR and dependencies including TShark. Preparation downloads packages without installing a service. Optional Cisco work needs supported isolated mapped routed interfaces, prepared hosts/routing/policy, exclusive unused processes/IDs and independent management; vendor commands remain unexecuted.",
      "topology": [
        "Actual client 192.0.2.10/24",
        "R1 LAN .1 / RID 1.1.1.1",
        "Point-to-point 203.0.113.1 ↔ .2 / area 0",
        "R2 RID 2.2.2.2 / LAN .1",
        "Actual server 198.51.100.20/24"
      ],
      "steps": [
        "Browser: compute via-R2 prefix cost 30 versus direct 40. Explain the destination LAN contribution.",
        "Choose tie and asymmetric cases; record shortest forward paths and separate reverse paths. Do not predict installed hardware ECMP or sessions.",
        "Remove graph links, partition R3, withhold LAN prefixes and clear RIB/forward/return declarations independently. Identify the affected evidence layer without inventing neighbor states or timing.",
        "Optional Linux: read both downloaded scripts and inert help. Prepare pinned runtime, use its printed FRR_ROOT and explicitly run the root lab. Retain output and actual observations.",
        "Actual baseline: Full both ways, two area-0 router LSAs, installed learned remote LANs, Linux OSPF routes and bidirectional ICMP. Identify actual protocol-89 Hellos captured only on the owned transit.",
        "Runner makes R1 transit passive, waits for learned routes to withdraw and records empty neighbors with carrier up. Compare failed remote probes with working client gateway. Exact reversal restores Full/routes/both directions and cleans resources.",
        "Optional Cisco: preserve baseline, create only owned process/interface settings, inspect protocol/route/forwarding/original host evidence, then apply and reverse R1 transit passive. Linux output is not Cisco proof.",
        "Reset graph. Verify Linux cleanup even on error, or remove only owned vendor activation/overrides/processes and restore exact prior host/interface/routing/service baseline."
      ],
      "verification": "Graph baseline prefix cost is 30; direct outgoing cost twenty yields two shortest forward paths. Asymmetric case has different directions. Prefix/RIB/data-plane/return controls affect distinct layers. Actual FRR must show Full both ways, two router LSAs, installed learned LANs, protocol-89 headers and both probes; fault/restore must show withdrawal/recovery. No Cisco or application/hardware/convergence result is fabricated.",
      "troubleshooting": "For runtime failure inspect dependencies, namespace/mount capability and owned zebra/ospfd logs without altering system services. Zebra starts first. Actual JSON is required even if vtysh returns exit zero. For protocol trouble classify interface/Hello/database/prefix/RIB/FIB/service layer before editing state.",
      "challenge": "Compare passive transit, missing advertised LAN and valid OSPF candidate losing same-prefix RIB selection. Name neighbor/database/route/transaction evidence, smallest correction and a contradicting observation for each. Explain direct forward/via-R2 reverse costs without promising application success.",
      "cleanup": "Browser reset affects declarations only. Linux traps stop owned processes, delete owned namespaces and remove temporary runtime paths. Extracted packages stay cached. Host routes, forwarding, groups, PAM and system FRR configuration are untouched. Optional Cisco cleanup removes owned interface activation, added overrides and exclusive processes while preserving addressing/roles/host routes/unrelated configuration. Restore prior settings exactly; do not clear all routes/neighbors, disable routing, reload or save unrelated changes."
    },
    "glossary": {
      "OSPFv2": "IPv4-focused interior protocol using link-state information.",
      "Router ID": "Domain-unique 32-bit speaker identifier.",
      "Adjacency": "Neighbor relationship used for synchronized database exchange.",
      "LSA": "Link-state advertisement object.",
      "LSDB": "Area information database for routing calculations.",
      "SPF": "Shortest-path-first calculation from a router root.",
      "Interface cost": "Outgoing metric, distinct from administrative distance.",
      "Passive interface": "Enabled advertised attachment without Hello-speaking adjacency.",
      "RIB": "Routing information containing candidates and selected routes.",
      "FIB": "Forwarding information implementing packet paths."
    },
    "prerequisites": [
      "s3-g0-t0",
      "s1-g4-t0",
      "s2-g0-t0"
    ],
    "related": [
      "s3-g1-t1",
      "s3-g1-t2",
      "s3-g1-t3",
      "s3-g1-t4",
      "s3-g0-t1"
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Protocol transport",
        "question": "Is OSPFv2 carried over TCP or UDP port 89?",
        "answer": "No; it uses IP protocol number 89.",
        "explanation": "A transport-port rule does not select the same IP protocol.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Passive advertisement",
        "question": "Can an OSPF-enabled passive LAN be advertised without forming neighbors on that LAN?",
        "answer": "Yes.",
        "explanation": "The LAN can be described while Hello/adjacency on that attachment is suppressed.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Directed cost",
        "question": "Must R1 and R3 choose the same router path in opposite directions?",
        "answer": "No.",
        "explanation": "They calculate from different roots with outgoing costs that can differ.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Evidence layers",
        "question": "Which sequence distinguishes OSPF topology calculation from a working routed exchange?",
        "answer": "Inspect adjacency/database, calculate a candidate, check RIB/FIB selection, then verify both directions.",
        "explanation": "Each stage answers a separate question; topology information alone does not prove delivered service.",
        "type": "multiple-choice",
        "options": [
          "Inspect adjacency/database, calculate a candidate, check RIB/FIB selection, then verify both directions.",
          "Treat any Hello as proof the application recovered.",
          "Compare administrative distance to accumulated interface cost.",
          "Require peers to share the same router ID."
        ],
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Local identifier",
        "question": "R1 uses Cisco OSPF process 109 and R2 uses 209. Is that difference itself a neighbor failure?",
        "answer": "No; process IDs are local, while router IDs must be unique and actual peer parameters compatible.",
        "explanation": "Do not repair a local identifier difference by duplicating router identity.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q02"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Neighbor role",
        "question": "A broadcast DROther pair remains 2-Way while its DR adjacencies are Full. Must that pair be reset?",
        "answer": "No; 2-Way can be expected between broadcast DROther peers.",
        "explanation": "Inspect network type and role first; the prepared point-to-point pair has a different Full expectation.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Prefix metric",
        "question": "In the graph, R1→R2 costs 10, R2→R3 costs 10 and the R3 LAN stub costs 10. What is the via-R2 prefix cost?",
        "answer": "30.",
        "explanation": "Add both outgoing router edges and the destination LAN; stopping at R3 would omit ten.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q04"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Equal costs",
        "question": "With via-R2 costs ten plus ten, direct R1→R3 cost twenty and the same destination LAN, how many mathematical shortest router paths exist?",
        "answer": "Two: direct and via R2, each giving prefix cost 30.",
        "explanation": "Actual installed ECMP membership and hardware limits are separate observations.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q05"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Asymmetric metric",
        "question": "Why can R1→R3 direct cost 5 and R3→R1 cost 50 produce different directional paths?",
        "answer": "Costs belong to outgoing interfaces and each router computes from its own root.",
        "explanation": "Forward can use direct while reverse uses R2 when the reverse via-R2 cost is twenty.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q06"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Passive transit",
        "question": "Carrier stays up, both learned remote LANs disappear and the client gateway responds after R1 transit becomes passive. What should be reversed first?",
        "answer": "Only the introduced R1 transit passive setting, then verify neighbors, routes and the same bidirectional probes.",
        "explanation": "The fault suppresses intended adjacency without changing the link or local LAN.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "RIB competition",
        "question": "An OSPF prefix candidate remains calculable but a preferred same-prefix source is installed. Does a valid database guarantee OSPF selection?",
        "answer": "No; SPF calculation and local RIB selection are separate.",
        "explanation": "Inspect exact-prefix competition and forwarding instead of assuming every candidate is installed.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q08"
      },
      {
        "difficulty": "Security",
        "testedConcept": "Protocol evidence",
        "question": "What can observed Hellos from both peers to 224.0.0.5 with IP protocol 89 prove by themselves?",
        "answer": "Those observed protocol packets, not Full synchronization or application recovery.",
        "explanation": "Correlate headers with independent neighbor, database, route and exchange evidence.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q09"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "MTU boundary",
        "question": "Why is blindly enabling mtu-ignore a poor first response to an OSPF ExStart/Exchange problem?",
        "answer": "It can hide an MTU or exchange problem before the actual cause and scope are established.",
        "explanation": "Compare MTUs, roles/identity and database-exchange evidence before a scoped correction.",
        "type": "short-answer",
        "topicId": "s3-g1-t0",
        "questionId": "s3-g1-t0-Q10"
      }
    ],
    "sources": [
      {
        "title": "Cisco neighbor states, expected 2-Way roles and database-exchange troubleshooting",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13699-29.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2328 OSPFv2 protocol and directed SPF framework",
        "url": "https://www.rfc-editor.org/rfc/rfc2328",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 interface, passive, cost and operational inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 OSPF target configuration and verification",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS OSPF area activation and cost syntax including checked no-forms",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-a1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS OSPF network type, local process and router-ID syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-i1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 default passive interfaces and explicit active exceptions",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iri-default-passive-interface.html",
        "checked": "2026-10-09"
      }
    ],
    "commands": [
      {
        "code": "show running-config\nshow startup-config\nshow ip interface brief\nshow ip protocols\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip ospf database\nshow ip route\nshow ip cef",
        "explanation": "Record actual interface/process/area, neighbor, database and forwarding baseline on both optional routers.",
        "expected": "GUIDED, NOT EXECUTED: Prepared routing, addresses, hosts, routes/policy and independent management are prerequisites. Confirm no existing OSPF process, activation, network statement or cost/network-type override is replaced. Record actual target support/license and original host directions.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 109\nrouter-id 1.1.1.1\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface GigabitEthernet1/0/1\nip ospf 109 area 0\nip ospf network point-to-point\nip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nip ospf 109 area 0\nip ospf cost 10\nend",
        "explanation": "R1 only: enable area 0 on two prepared interfaces with passive LAN and active point-to-point transit.",
        "expected": "GUIDED, NOT EXECUTED: Use exclusively new process 109 and unique ID 1.1.1.1. Map actual interfaces/transit/LAN independently. Exclude conflicting OSPF activation or overrides. Addresses, roles, hosts, routing enable and authentication are not created. Costs ten are explicit lab choices, not hardware defaults.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 209\nrouter-id 2.2.2.2\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface GigabitEthernet1/0/1\nip ospf 209 area 0\nip ospf network point-to-point\nip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nip ospf 209 area 0\nip ospf cost 10\nend",
        "explanation": "R2 only: enable area 0 on two prepared interfaces with passive LAN and active point-to-point transit.",
        "expected": "GUIDED, NOT EXECUTED: Use exclusively new process 209 and unique ID 2.2.2.2. Map actual interfaces/transit/LAN independently. Exclude conflicting OSPF activation or overrides. Addresses, roles, hosts, routing enable and authentication are not created. Costs ten are explicit lab choices, not hardware defaults.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "show ip ospf neighbor\nshow ip ospf interface\nshow ip ospf database router\nshow ip route ospf\nshow ip cef",
        "explanation": "Inspect adjacency, router LSAs and forwarding evidence after both optional routers are configured.",
        "expected": "GUIDED, NOT EXECUTED: Point-to-point Full and remote LAN installation require actual observations, not copied output. Compare configured/operational cost, area and passive state and perform original host exchange in both directions. No convergence deadline is supplied.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 109\npassive-interface GigabitEthernet1/0/1\nend\nshow ip ospf neighbor\nshow ip route ospf",
        "explanation": "R1 only: controlled passive-transit fault on the newly owned process/interface.",
        "expected": "GUIDED, NOT EXECUTED: Retain baseline first. Do not change carrier, addressing, R2, hosts or routing enable. After actual neighbor/dead changes check both remote LANs, local gateway and original probes. This is not a cable or packet-filter fault.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 109\nno passive-interface GigabitEthernet1/0/1\nend\nshow ip ospf neighbor\nshow ip route ospf",
        "explanation": "R1 only: restore the same active transit exception.",
        "expected": "GUIDED, NOT EXECUTED: Repeat Full, database, installed remote routes and original bidirectional host exchange. A restored configuration line alone is not recovery evidence.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 109 area\nno ip ospf network\nno ip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nno ip ospf 109 area\nno ip ospf cost 10\nexit\nno router ospf 109\nend\nshow running-config\nshow ip ospf interface",
        "explanation": "R1 only: remove owned interface activation before deleting the exclusive process.",
        "expected": "GUIDED, NOT EXECUTED: Checked no-form area activation omits area ID; cost removal uses added value ten. Default restoration is valid only when overrides were absent at baseline. Preserve addresses, roles, hosts, management and unrelated processes. Exclude other network-statement activation and reconcile exact baseline. No broad clear/reload/save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 209 area\nno ip ospf network\nno ip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nno ip ospf 209 area\nno ip ospf cost 10\nexit\nno router ospf 209\nend\nshow running-config\nshow ip ospf interface",
        "explanation": "R2 only: remove owned interface activation before deleting the exclusive process.",
        "expected": "GUIDED, NOT EXECUTED: Checked no-form area activation omits area ID; cost removal uses added value ten. Default restoration is valid only when overrides were absent at baseline. Preserve addresses, roles, hosts, management and unrelated processes. Exclude other network-statement activation and reconcile exact baseline. No broad clear/reload/save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPFv2 lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Extract pinned Ubuntu 24.04 amd64 FRR 8.4.4/libyang packages into the invoking user cache without installing a service.",
        "expected": "ACTUAL PACKAGE PREPARATION, NOT CISCO: executed on local WSL Ubuntu. Needs configured APT indexes/repositories and supporting libraries. Output gives extracted root path; checksums are recorded in the private cache. Missing pinned versions fail instead of silently upgrading. Default invocation is inert.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction; no system installation"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-routing.sh --run",
        "explanation": "Run actual isolated two-router OSPFv2 as root, using the printed extracted path.",
        "expected": "ACTUAL ISOLATED FRR/LINUX: root-prepared cache path shown for this host; substitute the printed path for another account. Full neighbors, database, installed learned routes, Linux routes, actual Hello headers, passive-transit fault/recovery and bidirectional ICMP are retained. Default help is inert. Traps remove owned processes/namespaces/runtime; packages stay cached. No Cisco parser, application transaction, hardware throughput or convergence benchmark is asserted.",
        "filename": "bash",
        "platform": "Root Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ]
  },
  {
    "id": "s3-g1-t1",
    "batch": "09",
    "title": "OSPF Areas",
    "subtitle": "Keep topology local; carry reachability through the backbone.",
    "level": "Intermediate → Advanced",
    "minutes": 48,
    "definition": "An OSPF area is a scope for topology information and route calculation within an OSPF domain. In this OSPFv2 lesson, R1 belongs to backbone area 0, R3 belongs to area 1 and the intervening area border router (ABR) participates in both. It keeps a separate topology database for each area and describes reachability between them. An area ID is a 32-bit identifier: decimal 1 and dotted 0.0.0.1 identify the same area; neither notation assigns an interface IP address.",
    "purpose": "Areas let a design contain detailed topology and associated flooding/SPF work while retaining routes to destinations elsewhere. They also create dependencies: a healthy local adjacency is insufficient if the boundary or backbone cannot supply usable reachability. Learn to identify which area owns an interface, what an internal router should know, what an ABR adds and which evidence proves recovery. The goal is a working failure boundary, not adding area numbers merely to make the diagram look hierarchical.",
    "mental": "Think of two local street maps joined by a gateway. Each internal router sees its own local topology. The gateway tells the other side which destination network it can reach and at what cost; it does not send a copy of every street in the remote map. The ABR itself needs both maps. This analogy concerns route information, not tunneling, encryption or traffic inspection. In the lab, R1 reaches the server LAN using an ABR-originated type-3 summary, without receiving R3’s area-1 router LSA in its area-0 database.",
    "components": [
      [
        "Area 0 / backbone",
        "The common inter-area routing structure. In the normal hierarchy, nonbackbone areas connect to it through ABRs. Backbone continuity matters; a disconnected area number does not create a working backbone."
      ],
      [
        "Internal router",
        "All its OSPF attachments belong to one area. R1 is both internal to area 0 and a backbone router; roles overlap. R3 is internal to area 1."
      ],
      [
        "Area border router",
        "Participates in multiple areas, retaining their separate databases and route calculations. Our ABR has area-0 and area-1 transits and advertises reachability between them. Actual ABR behavior depends on implementation/mode."
      ],
      [
        "Autonomous-system boundary router",
        "Imports external routing information into OSPF. This role differs from crossing area boundaries and can overlap with ABR/backbone roles. The lab performs no redistribution."
      ],
      [
        "Topology versus summary",
        "Type-1 router and type-2 network LSAs describe area-local topology. Type-3 network summaries describe inter-area destination reachability. A type-3 LSA can carry one unchanged /24; aggregation is optional separate configuration."
      ],
      [
        "Candidate / RIB / forwarding",
        "A valid summary and reachable ABR can produce an OSPF candidate. Check route class, cost, selected installed RIB entry, forwarding next hop and actual exchange separately."
      ]
    ],
    "mechanism": [
      "Assign each prepared attachment to its intended area. Peer area IDs must agree on the shared transit, together with the other compatibility requirements from the OSPF lesson. One router can have interfaces in different areas; one ordinary interface attachment does not simultaneously belong to both. In the normal lab the ABR backbone interface is area 0 and its branch interface is area 1.",
      "Build area-local topology and calculate intra-area reachability. R1 and the ABR describe area 0; the ABR and R3 describe area 1. Point-to-point transits avoid DR/network-LSA election in this exercise. Passive endpoint LANs still contribute prefixes and cost ten. Two area-local router LSAs at each internal router do not constitute a complete domain-wide topology map.",
      "The ABR can describe a destination from one area to the other with a type-3 summary. It is the advertising router for that summary. A receiving internal router needs a usable intra-area path to that advertising ABR; it then adds that path cost to the summary’s advertised cost. Detailed foreign router links do not cross the area boundary as type-1 LSAs.",
      "R1’s cost to the ABR is ten. The ABR’s cost to the server LAN is its outgoing branch ten plus the LAN stub ten, giving a summary cost twenty. R1’s inter-area candidate is 10 + 20 = 30. The ABR’s own server-LAN candidate is intra-area cost twenty. Reverse calculation uses R3’s outgoing cost to the ABR and the ABR’s cost toward the client; do not assume symmetry.",
      "Route classes matter independently of a simple global cost comparison. For the same destination, OSPF generally prefers an intra-area path over an inter-area path, before comparing costs within that preference class. Ordinary local source preference and longest-prefix forwarding still apply at their own stages. The fixed worksheet supplies no competing same-prefix route or alternate ABR, so it does not choose among those cases.",
      "Verify actual state instead of inferring it from configuration intent. The actual FRR experiment records process areas/mode, interface/passive/cost/timers, neighbors, each area database, protocol route calculation, selected installed RIB entries, kernel gateways and two ICMP directions. A browser checkbox supplies a completed graph condition; it cannot measure database synchronization, LSA aging or recovery time."
    ],
    "flow": [
      [
        "Keep each topology local",
        "Area-0 and area-1 router topology remain separate; the ABR retains both."
      ],
      [
        "Describe opposite-area reachability",
        "The ABR originates a type-3 destination summary; no range aggregation is configured."
      ],
      [
        "Calculate the receiving candidate",
        "Reach the advertising ABR and add its destination cost; preserve the route class."
      ],
      [
        "Verify fault and recovery",
        "Inspect installed paths and both directions; reverse only the introduced mismatch."
      ]
    ],
    "example": "Client 192.0.2.10/24 uses R1’s LAN .1. R1 203.0.113.1/30 meets ABR .2 in area 0; ABR 203.0.113.5/30 meets R3 .6 in area 1. Server 198.51.100.20/24 uses R3’s LAN .1. Router IDs are 1.1.1.1, 2.2.2.2 and 3.3.3.3. With cost ten on all enabled interfaces, R1 and R3 have opposite-LAN inter-area cost thirty, while the ABR has each LAN intra-area cost twenty. Change only R3’s branch to area 2: its peer remains area 1, carrier stays up and the backbone pair remains Full, but the branch adjacency and opposite-LAN routes fail. Restoring area 1 recovers the actual exchange. No application/session or elapsed convergence measurement follows from ICMP.",
    "configuration": "Use two separate branches. The downloadable Linux runner performs an actual disposable FRR 8.4.4 experiment with five owned namespaces and an extracted pinned runtime. It explicitly selects Standard RFC2328 ABR mode; FRR 8.4 documents alternative default behavior, which this lab does not test. The optional Catalyst 9300 IOS XE 17.15 branch below is guided and unexecuted. Prepare addresses, routed interface roles, host/return routes, forwarding/policy and independent management first. Map R1/R3 Gi1/0/1 to transit and Gi1/0/2 to LAN; map ABR Gi1/0/1 to backbone and Gi1/0/2 to branch. Create only exclusively new processes 119/219/319 and baseline-absent overrides. Domain router IDs must be unique even though the three local process numbers differ. Do not reuse an active production process or apply these root/unauthenticated lab assumptions there.",
    "ports": [
      [
        "OSPFv2",
        "IP protocol 89; no TCP/UDP transport port. Area identity is in protocol context, not a transport-port number."
      ],
      [
        "Area IDs",
        "0 equals 0.0.0.0; 1 equals 0.0.0.1. These are identifiers, not the interface subnet or a forwarding VRF."
      ],
      [
        "Lab transits",
        "203.0.113.0/30 in area 0 and 203.0.113.4/30 in area 1; passive LANs retain 192.0.2.0/24 and 198.51.100.0/24."
      ],
      [
        "Inspection context",
        "Record router, area, LSA type/advertising router, prefix/mask, route class, cost and table before comparing observations."
      ]
    ],
    "production": "Choose boundaries around topology churn, addressing and operations ownership, while preserving resilient backbone and ABR reachability. An ABR concentrates multiple databases and calculations, so moving a large network behind one small ABR is not automatically a scale improvement. Plan redundant paths and failure tests on the actual topology rather than promising redundancy from two drawn boxes. Contiguous addressing can permit deliberate aggregation at an ABR, but summary coverage can include unused or failed more-specific destinations; prove constituent reachability and discard/blackhole behavior on the target before introducing a range. Area design is not a VRF, tenant security boundary or application failover guarantee. Virtual links are protocol mechanisms for backbone connectivity through a transit area, not arbitrary user-data tunnels or a replacement for repairing a sound backbone; this lab does not configure one.",
    "troubleshooting": [
      "One adjacency is missing: compare the two actual interface area IDs and area capability/type, alongside IP/network type, passive state, timers, authentication, identity and MTU evidence. A matching process number is not the requirement. Preserve the configuration and operational baseline before edits.",
      "Local Full but remote LAN missing: inspect the ABR’s two attached areas and actual backbone reachability. Confirm the originating LAN is enabled/advertised and the type-3 destination prefix/mask and advertising ABR in the receiving area. Then inspect reachability/cost to that ABR and calculated route class.",
      "A foreign type-1 router LSA is absent from an internal router: that can be the correct area boundary. In this baseline R1 should not receive R3’s area-1 router LSA in area 0. Look for the appropriate type-3 server-LAN summary rather than forcing domain-wide router-LSA flooding.",
      "After neighbor loss, old LSAs can remain until protocol aging/flushing rules remove them. An LSA still present is not proof of a usable route. Correlate actual route calculation, selected installation, next hop and probes; do not assert instantaneous deletion of every stale advertisement.",
      "Candidate exists but traffic fails: check exact-prefix/table/source selection, forwarding/neighbor resolution, both directions, host gateways, filtering, MTU and original-service requirements. Linux kernel route priority is not the OSPF accumulated cost.",
      "For the authored fault, change only R3’s branch area and restore exactly that setting. In FRR remove the previous area before adding the new one. In the guided Cisco branch use its checked process-scoped no-form. Keep carrier, ABR and endpoint addressing untouched, then repeat baseline evidence and both probes."
    ],
    "security": "Area-local topology reduces which details are distributed; it does not encrypt user traffic or enforce tenant isolation. Adjacent peers and control-plane access need reviewed authentication, allowed interfaces and key lifecycle on the actual release. A permitted peer can still advertise harmful reachability. Passive LANs suppress unintended adjacency while retaining intended advertisement, but are not a traffic-filter policy. The isolated lab deliberately has no authentication or external traffic. Its private mount/group and VTY configuration is for disposable local root execution only; TCP VTY listeners are disabled and owned UNIX sockets are used. Keep captured and configuration evidence within the authorized lab scope.",
    "performance": "Area boundaries can reduce the local topology/SPF work seen by internal routers, but prefix summaries still cause inter-area work and the ABR participates in multiple areas. Count neighbors, LSAs, prefixes, churn and recovery observations on representative hardware before sizing. Range aggregation can reduce advertised entries at the expense of visibility and failure granularity; simply creating an area does not aggregate routes. This worksheet instantly recalculates supplied candidates. The runner’s bounded waits test eventual expected state within an execution budget; configured 1/4-second transit timers and WSL virtual probes are not convergence, throughput, CPU, session continuity or ASIC benchmarks.",
    "mistakes": [
      "Treating the area ID as an interface address, IP subnet or local process number.",
      "Calling an ABR an ASBR merely because it connects two areas.",
      "Expecting every internal router to retain the entire domain’s router-LSA topology.",
      "Assuming the word summary means several prefixes were aggregated.",
      "Comparing intra-area and inter-area costs without route-class preference.",
      "Configuring a disconnected area 0 and assuming a working backbone exists.",
      "Changing area type on only one peer or copying vendor stub/NSSA extensions as universal RFC behavior.",
      "Equating Full, a summary entry or a candidate with installed forwarding and application recovery.",
      "Deleting stale LSAs or clearing all processes before testing the smallest owned correction."
    ],
    "comparison": [
      [
        "Normal area / backbone",
        "Normal areas retain ordinary inter-area/external information; area 0 has the backbone role.",
        "The exercise uses normal areas only, with no external advertisements."
      ],
      [
        "Internal / backbone / ABR / ASBR",
        "One-area attachments / backbone participation / multiple-area boundary / external import.",
        "Roles overlap; R1 is internal and backbone, while the ABR is also a backbone router."
      ],
      [
        "Type-1 / type-3",
        "Area-local router links / ABR-originated network reachability.",
        "R1 receives the server /24 summary without R3’s foreign router LSA."
      ],
      [
        "Summary LSA / range aggregation",
        "Reachability object / deliberate prefix consolidation.",
        "Unchanged /24 type-3 entries in the lab do not demonstrate aggregation."
      ],
      [
        "Intra-area / inter-area",
        "Path within an area / path using opposite-area reachability.",
        "ABR server LAN cost 20 is intra-area; R1 cost 30 is inter-area."
      ],
      [
        "Stub / NSSA",
        "Stub excludes type-5 external LSAs; NSSA permits local external import through type 7, with translation under defined rules.",
        "Stub default reachability is type-3, not a type-5 external default. NSSA default/translation needs actual design; it is not simulated here."
      ],
      [
        "Totally stubby / no-summary extensions",
        "Vendor-supported suppression of ordinary inter-area summaries in addition to stub behavior.",
        "Retain intended default reachability and verify peer configuration/support. Do not label vendor extensions as a separate universal RFC2328 area type."
      ],
      [
        "Area / security domain",
        "Routing-information boundary / access-control and isolation design.",
        "Topology hiding is not encryption, traffic policy or a VRF."
      ]
    ],
    "interactive": "ospf-areas",
    "artifacts": [
      {
        "title": "Download actual three-router OSPF Areas lab",
        "path": "labs/ospf-areas.sh"
      },
      {
        "title": "Download pinned private FRR preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Compare area-local topology, ABR-originated reachability and route classes; reproduce a controlled branch area mismatch and verify exact recovery.",
      "requirements": "Browser exercise needs no router. Actual Linux work needs root network/mount namespaces, Ubuntu 24.04 amd64, the pinned extracted FRR runtime and existing ip/ping/sysctl/python3/unshare/mount/getent. Prepare the private runtime with the downloadable script; no system service is installed. Optional Cisco work needs exclusively owned mapped routed interfaces/processes, prepared host/return paths and independent management.",
      "topology": [
        "Client 192.0.2.10/24 → R1 LAN .1",
        "R1 RID 1.1.1.1 → area 0 transit .1/.2",
        "ABR RID 2.2.2.2 → separate area 0 + 1",
        "Area 1 transit .5/.6 → R3 RID 3.3.3.3",
        "R3 LAN .1 → server 198.51.100.20/24"
      ],
      "steps": [
        "Browser baseline: choose R1, ABR and R3 views. Identify the one/two/one area scopes, remote router excluded from each topology and unchanged opposite /24 reachability. These are structural templates, not live protocol snapshots.",
        "Read all four candidates. Explain ABR intra-area twenty and endpoint inter-area thirty, including the destination LAN contribution. Raise ABR→R3 cost to forty; record forward sixty and reverse thirty. Try the asymmetric case separately.",
        "Withhold each LAN advertisement independently. Then clear backbone, branch, area compatibility, RIB, forward and return declarations separately. Identify which candidates remain and avoid claiming Full/timing or instantaneous LSA flushing from the browser.",
        "Read/download both scripts and inert help. Prepare pinned FRR, use the printed extracted root path and explicitly run the namespace lab. Retain the actual output; a prepared root cache path is shown below for this host.",
        "Baseline actual: inspect ABR Standard mode/two areas, Full backbone/branch, type-1 area membership, type-3 advertising ABR/opposite /24, inter/intra route classes, installed RIB and kernel next hops. Verify both ICMP directions.",
        "Runner removes R3 branch area 1 and adds area 2. Compare branch neighbor loss and remote route withdrawal with preserved backbone Full, branch carrier and local probes. Old LSAs may persist; do not use immediate disappearance as the test.",
        "Runner removes area 2 and restores area 1. Verify the same protocol/route/forwarding/probe evidence, then confirm owned cleanup. Optional Cisco branch must collect its own observations; Linux results do not prove Cisco syntax or behavior.",
        "Reset the browser; reconcile exact original host/interface/route/process state after optional work. Do not save, reload, clear all neighbors or change global routing merely to clean this lab."
      ],
      "verification": "Baseline structural scopes have R1+ABR in area 0 and ABR+R3 in area 1, with no foreign router-LSA crossover. Candidate costs are 30/20/20/30; asymmetric controls affect the corresponding directions. Actual FRR evidence must show the configured mode, both area databases, Full peers, opposite /24 summaries and installed learned paths. Fault/restore probes and independent cleanup snapshots are required, not configuration intent alone.",
      "troubleshooting": "If extraction or startup fails, inspect pinned-package availability, root capabilities and owned logs; never silently install a global service or substitute another FRR release. Parse operational JSON because CLI exit status alone can miss an authentication error. For missing routes distinguish interface/area compatibility, source advertisement, ABR reachability, candidate calculation, RIB and service layers.",
      "challenge": "Design an evidence record for: branch area mismatch, withheld server prefix, and an OSPF candidate losing RIB selection. Name one observation that distinguishes each from a backbone fault. Explain why the actual unaggregated /24 type-3 entry is insufficient proof of an area-range aggregation policy. Identify the risk of summarizing destinations whose specifics can fail independently.",
      "cleanup": "Default scripts print help only. Explicit Linux execution tracks owned daemon PIDs, verifies runtime ownership before signaling, deletes only created namespaces and temporary paths, and preserves host routes/forwarding/groups/mounts/PAM/FRR configuration. Private extracted packages stay cached. Optional Cisco cleanup removes only previously absent owned interface area/network/cost settings and exclusive processes, preserving addressing, routed roles, host routes and unrelated configuration. Exact baseline wins over generic defaults."
    },
    "glossary": {
      "Area": "Scope for local topology and route calculation.",
      "Backbone": "Area 0 inter-area routing structure.",
      "ABR": "Router participating in multiple area databases.",
      "ASBR": "Router importing external routing information.",
      "Type-3 summary": "ABR-originated network reachability between areas.",
      "Aggregation": "Deliberate consolidation of several prefix advertisements.",
      "Intra-area": "Reachability calculated within one area.",
      "Inter-area": "Reachability using information about a destination in another area.",
      "Stub area": "Area excluding ordinary AS-external type-5 information.",
      "NSSA": "Area supporting local external import via type-7 information.",
      "Virtual link": "OSPF backbone connection through a supported transit area."
    },
    "prerequisites": [
      "s3-g1-t0",
      "s3-g0-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s3-g1-t2",
      "s3-g1-t3",
      "s3-g1-t4",
      "s3-g0-t1"
    ],
    "sources": [
      {
        "title": "RFC 2328: area scope, backbone, router roles, summary calculation and stub areas",
        "url": "https://www.rfc-editor.org/rfc/rfc2328",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3101: NSSA type-7 external information and translation",
        "url": "https://www.rfc-editor.org/rfc/rfc3101",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4: explicit ABR modes, interface areas, operational inspection and range configuration",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR 8.4.4 source: remove previous interface area before changing it",
        "url": "https://github.com/FRRouting/frr/blob/frr-8.4.4/ospfd/ospf_vty.c",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15: target OSPF configuration, area parameters and verification",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS command reference: interface activation/cost and matching no-forms",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-a1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS command reference: point-to-point network type, local process and router ID",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-i1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17: passive default and active interface exceptions",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iri-default-passive-interface.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Area notation",
        "question": "Do area IDs 1 and 0.0.0.1 identify different areas?",
        "answer": "No; they encode the same 32-bit identifier.",
        "explanation": "Neither value is an interface address.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Boundary role",
        "question": "Does connecting area 0 and area 1 automatically make a router an ASBR?",
        "answer": "No; external route import defines the ASBR role.",
        "explanation": "Area-boundary participation is the ABR role, which can overlap separately.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Summary versus aggregation",
        "question": "An ABR advertises 198.51.100.0/24 as type 3 unchanged. Is aggregation demonstrated?",
        "answer": "No.",
        "explanation": "The reachability summary preserves the prefix; range consolidation is a separate policy.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Intermediate",
        "testedConcept": "Area topology scope",
        "question": "R1 is internal to area 0 and R3 to area 1. What should R1 expect for the remote server LAN?",
        "answer": "Expect the opposite-LAN type-3 summary, not R3’s foreign router LSA in area 0.",
        "explanation": "The ABR advertises destination reachability while type-1 topology remains area-local.",
        "type": "multiple-choice",
        "options": [
          "Expect the opposite-LAN type-3 summary, not R3’s foreign router LSA in area 0.",
          "Receive R3’s type-1 topology unchanged across the area boundary.",
          "Require a type-5 external LSA because the destination is in another area.",
          "Require the unchanged /24 to be replaced by an aggregated /16 type-3 prefix."
        ],
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Inter-area cost",
        "question": "R1→ABR costs 12 and the ABR advertises server-LAN cost 28. What inter-area candidate cost does R1 calculate?",
        "answer": "40.",
        "explanation": "Add the intra-area cost to the advertising ABR and its destination cost; do not add administrative distance.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q02"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Route-class preference",
        "question": "For the same OSPF destination prefix, an intra-area path costs 60 and an inter-area path costs 25. Which class normally takes preference?",
        "answer": "The intra-area path.",
        "explanation": "OSPF route-class preference precedes a cost comparison across those classes; this is not a global cheapest-edge choice.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q03"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Area mismatch isolation",
        "question": "Only R3 branch changes from area 1 to area 2 while its ABR peer stays area 1. Backbone peers remain Full and branch carrier stays up. What is the first scoped correction?",
        "answer": "Restore only R3 branch to its recorded area 1, then verify adjacency, routes and both directions.",
        "explanation": "Do not change addressing or reset the healthy backbone; remove the previous FRR area setting before adding its replacement.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q04"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Overlapping roles",
        "question": "R1’s OSPF interfaces all belong to area 0. Can it be both internal and backbone without being an ABR?",
        "answer": "Yes.",
        "explanation": "Internal means one-area attachments; backbone means area-0 participation. Multiple-area participation defines the ABR role.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Summary advertising router",
        "question": "Why does R1 add its cost to ABR 2.2.2.2 for an opposite-LAN type-3 summary?",
        "answer": "The summary is advertised by that ABR and its destination cost is measured from the ABR.",
        "explanation": "The internal router uses reachable local-area ABR information, not the remote router’s full topology.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q06"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Stale LSAs",
        "question": "A branch neighbor is gone but an old router LSA remains. Does that entry alone prove a usable remote route?",
        "answer": "No; inspect calculated routes, selected installation, next hops and probes.",
        "explanation": "Retained LSAs can be stale; aging/flushing is not instantaneous and the worksheet does not simulate it.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q07"
      },
      {
        "difficulty": "Design",
        "testedConcept": "Aggregation failure granularity",
        "question": "Why can a broad area-range advertisement remain a poor proof that every more-specific application destination works?",
        "answer": "The aggregate can cover failed or unused specifics, so individual paths and target discard/forwarding behavior still need verification.",
        "explanation": "Consolidating prefixes reduces visibility; the lab’s unchanged /24 summaries do not configure that policy.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Stub default classification",
        "question": "Is the normal default supplied by an ABR into an RFC2328 stub area a type-5 external LSA?",
        "answer": "No; stub default reachability is supplied as a type-3 summary.",
        "explanation": "Stub areas exclude ordinary type-5 AS-external information; NSSA local external import instead uses type 7 under its own rules.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q09"
      },
      {
        "difficulty": "Troubleshooting",
        "testedConcept": "Independent reverse advertisement",
        "question": "In the worksheet, only the client LAN advertisement is withheld. Can R1 still calculate the server candidate while original exchange is not established?",
        "answer": "Yes; the server candidate remains, but the reverse client-prefix candidate is absent.",
        "explanation": "Forward destination knowledge does not guarantee the return direction; the two advertisements are independent.",
        "type": "short-answer",
        "topicId": "s3-g1-t1",
        "questionId": "s3-g1-t1-Q10"
      }
    ],
    "commands": [
      {
        "code": "show running-config\nshow startup-config\nshow ip interface brief\nshow ip protocols\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip ospf database\nshow ip route\nshow ip cef",
        "explanation": "Record actual baseline on all three optional routers.",
        "expected": "GUIDED, NOT EXECUTED: Prepared routing/interfaces/addresses/hosts/return paths and independent management are prerequisites. Confirm supported target/license and no existing processes 119/219/319, activation/network statements or overrides will be replaced. Record each mapped interface and exact prior state.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 119\nrouter-id 1.1.1.1\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface GigabitEthernet1/0/1\nip ospf 119 area 0\nip ospf network point-to-point\nip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nip ospf 119 area 0\nip ospf cost 10\nexit\nend",
        "explanation": "R1 only: create the exclusive process and mapped area attachments.",
        "expected": "GUIDED, NOT EXECUTED: Map and prepare roles/addresses first. Use domain-unique router ID and only baseline-absent owned process/activation/cost/network settings. Passive LAN where present, active point-to-point transits. No addresses, global routing, authentication, host routes or area ranges are created.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 219\nrouter-id 2.2.2.2\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nno passive-interface GigabitEthernet1/0/2\nexit\ninterface GigabitEthernet1/0/1\nip ospf 219 area 0\nip ospf network point-to-point\nip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nip ospf 219 area 1\nip ospf network point-to-point\nip ospf cost 10\nexit\nend",
        "explanation": "ABR only: create the exclusive process and mapped area attachments.",
        "expected": "GUIDED, NOT EXECUTED: Map and prepare roles/addresses first. Use domain-unique router ID and only baseline-absent owned process/activation/cost/network settings. Passive LAN where present, active point-to-point transits. No addresses, global routing, authentication, host routes or area ranges are created.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 319\nrouter-id 3.3.3.3\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface GigabitEthernet1/0/1\nip ospf 319 area 1\nip ospf network point-to-point\nip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nip ospf 319 area 1\nip ospf cost 10\nexit\nend",
        "explanation": "R3 only: create the exclusive process and mapped area attachments.",
        "expected": "GUIDED, NOT EXECUTED: Map and prepare roles/addresses first. Use domain-unique router ID and only baseline-absent owned process/activation/cost/network settings. Passive LAN where present, active point-to-point transits. No addresses, global routing, authentication, host routes or area ranges are created.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "show ip ospf\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip ospf database router\nshow ip ospf database summary\nshow ip route ospf\nshow ip cef",
        "explanation": "Compare actual areas, topology, summary advertiser, route classes and forwarding on each router.",
        "expected": "GUIDED, NOT EXECUTED: ABR participates in area 0 and 1. Record actual opposite /24 summaries and inter/intra candidate costs, selected RIB/FIB and original bidirectional host probes. No copied output or elapsed recovery guarantee is supplied.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 319 area\nip ospf 319 area 2\nend\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip route ospf",
        "explanation": "R3 only: change the newly owned branch activation to mismatched area 2.",
        "expected": "GUIDED, NOT EXECUTED: Use only the mapped R3 branch; ABR remains area 1. Checked Cisco no-form omits area ID. Preserve carrier/addressing/process/hosts. Observe actual branch withdrawal, healthy backbone and failed remote exchange; do not require immediate stale-LSA deletion.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 319 area\nip ospf 319 area 1\nend\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip route ospf",
        "explanation": "R3 only: restore the exact original area-1 activation.",
        "expected": "GUIDED, NOT EXECUTED: Recheck actual Full, area database, summaries, selected installed remote LANs, forwarding and both original directions. A restored configuration line alone is not recovery.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 119 area\nno ip ospf network\nno ip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nno ip ospf 119 area\nno ip ospf cost 10\nexit\nno router ospf 119\nend\nshow running-config\nshow ip ospf interface",
        "explanation": "R1 only: remove owned activation/overrides before the exclusive process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent owned settings may return to defaults. Exclude other network-statement activation. Preserve addresses, roles, host routes, routing enable, management and unrelated processes; reconcile exact recorded baseline. No broad clear/reload/save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 219 area\nno ip ospf network\nno ip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nno ip ospf 219 area\nno ip ospf network\nno ip ospf cost 10\nexit\nno router ospf 219\nend\nshow running-config\nshow ip ospf interface",
        "explanation": "ABR only: remove owned activation/overrides before the exclusive process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent owned settings may return to defaults. Exclude other network-statement activation. Preserve addresses, roles, host routes, routing enable, management and unrelated processes; reconcile exact recorded baseline. No broad clear/reload/save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 319 area\nno ip ospf network\nno ip ospf cost 10\nexit\ninterface GigabitEthernet1/0/2\nno ip ospf 319 area\nno ip ospf cost 10\nexit\nno router ospf 319\nend\nshow running-config\nshow ip ospf interface",
        "explanation": "R3 only: remove owned activation/overrides before the exclusive process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent owned settings may return to defaults. Exclude other network-statement activation. Preserve addresses, roles, host routes, routing enable, management and unrelated processes; reconcile exact recorded baseline. No broad clear/reload/save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 multi-area lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Extract pinned FRR 8.4.4/libyang packages into a private cache without system installation.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured APT indexes/repositories and supporting libraries. Use the printed root path; missing pinned versions fail. Default help is inert. No maintainer scripts or system routing service are installed.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-areas.sh --run",
        "explanation": "Run the actual three-router OSPFv2 multi-area lab with root namespace/mount capability.",
        "expected": "ACTUAL FRR/LINUX: substitute the extracted path printed by preparation if another account prepared the cache. Standard ABR mode, area-local router LSAs, opposite /24 summaries, inter/intra classes/costs, selected installed RIB/kernel gateways and bidirectional ICMP are recorded. Runner faults/restores only R3 branch area and cleans owned state. No Cisco execution, external/stub/NSSA/range/virtual-link behavior, application transaction, hardware or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ]
  },
  {
    "id": "s3-g1-t2",
    "batch": "09",
    "title": "DR/BDR",
    "subtitle": "Election history shapes adjacency; it does not dictate every packet path.",
    "level": "Intermediate → Advanced",
    "minutes": 52,
    "definition": "On an OSPFv2 broadcast segment, the designated router (DR) and backup designated router (BDR) organize adjacency and database synchronization. They are roles on that particular interface/network, not permanent titles for an entire router. Other participating routers are DROthers. A router can be DR on one LAN and have another role elsewhere. Priority ranks eligible candidates, but established roles and arrival history matter: a higher-priority late arrival does not simply replace a healthy incumbent.",
    "purpose": "A shared LAN can have many OSPF participants. Requiring every pair to synchronize as a Full adjacency creates more relationships and flooding work than necessary. DR and BDR provide common synchronization points and a prepared successor. Learn which peer pairs should become Full, why two DROthers can normally remain 2-Way, who describes the transit network in the area database, and how to test failure and recovery without mistaking a routing role for a forwarding gateway.",
    "mental": "Think of a meeting with a chair and a prepared deputy. A late participant with a stronger nomination does not interrupt the established chair. If the chair leaves, the existing deputy takes over before choosing a new deputy. Ordinary participants still communicate with one another; their discussion does not all need to pass through the chair. This analogy describes a stable election history, not authentication, physical topology, complete Hello timing or the rules for conflicting declarations after a partition.",
    "components": [
      [
        "DR",
        "Elected role on this broadcast network. Forms Full adjacencies with participating peers and originates its current type-2 network LSA when fully adjacent to at least one other router."
      ],
      [
        "BDR",
        "Also forms Full adjacencies with participating peers. A prepared successor to the DR; its existence does not mean it originates the current DR’s network LSA."
      ],
      [
        "DROther",
        "Participant that is neither DR nor BDR on this segment. Normally Full with DR/BDR, but only 2-Way with another DROther."
      ],
      [
        "Interface priority",
        "Integer 0–255 for this attachment. Zero excludes the router from both roles; it does not disable OSPF adjacency to eligible DR/BDR peers."
      ],
      [
        "Router ID versus LAN address",
        "Unique 32-bit router identity breaks equal-priority candidate ties. Hello DR/BDR fields and the type-2 link-state ID identify interface addresses, not those router IDs."
      ],
      [
        "Established declarations",
        "Current DR/BDR identity announced through protocol state. Election is not a stateless sorting operation each time a router appears."
      ]
    ],
    "mechanism": [
      "First establish the correct network context. The lab explicitly uses one broadcast LAN in area 0. Participants need compatible addressing, area, network behavior, timers, authentication and unique identities, with bidirectional discovery. The election algorithm considers eligible routers with at least 2-Way communication plus the calculating router itself. A disconnected high-priority router cannot win merely because its configuration looks preferred.",
      "When the supplied initial candidate set has no incumbents, higher positive priority wins the role opportunity; equal priorities use the numerically higher router ID. Priority zero is ineligible for both DR and BDR. Real startup can discover different peers at different times, so a candidate ranking alone does not predict every boot race. The no-incumbent browser case assumes all supplied participants are available before its settled calculation.",
      "Established declarations matter. The RFC algorithm calculates BDR before DR, considers existing declarations and can repeat its calculation after a local role change. Our bounded settled-segment explorer preserves healthy eligible incumbents and fills vacancies. It does not implement the full interface/neighbor FSM, conflicting DR declarations, partitions, Hello/dead/wait races or live priority changes.",
      "Staged actual lab: R1 priority 100 establishes DR before another router starts. R2 priority 50 arrives and becomes BDR; R3 priority zero becomes a DROther. R4 priority 200 arrives only after these roles exist. R1 and R2 retain their roles. R4 is a DROther despite its greater priority. Setting a preferred priority is design intent, not evidence that an incumbent has been displaced.",
      "On the four-router late-arrival segment, R1/R2 are Full with every other participant and with each other. R3/R4 are 2-Way with each other: both see bidirectional Hellos, but neither is DR/BDR. Five unique pairs are Full and one pair is 2-Way. A display is local: Full/DR describes the neighbor’s role from the observing router. Do not interpret every 2-Way entry as a synchronization failure.",
      "The current DR represents the transit network with a type-2 LSA scoped to its area. In this actual late baseline the link-state ID is 192.0.2.1, advertising router is 1.1.1.1, mask is /24 and attached router IDs are 1.1.1.1 through 4.4.4.4. The list includes the DR and its Full peers. A DR alone with no Full neighbor does not originate a network LSA. BDR Full state does not make it a second current network-LSA originator.",
      "The fault brings down only R1’s owned LAN attachment, resetting its election state. Existing BDR R2 promotes to DR even though R4 has greater priority. R4 fills the BDR vacancy; R3 remains ineligible. The current network-LSA identity moves to interface 192.0.2.2 / advertising RID 2.2.2.2. Restoring R1’s attachment lets it join as a DROther: configuration/carrier recover, while elected roles follow their new history. R1/R3 are now the normal 2-Way pair.",
      "Check forwarding separately. Actual R3↔R4 peer-loopback routes select each other’s LAN IP as next hop; kernel lookup and captured Ethernet MACs corroborate direct peer forwarding without a DR/BDR relay. The runner verifies settled bidirectional ICMP after baseline, failover and return. It does not prove zero packet loss, application continuity or measured convergence. A retained passive-return trial kept an old R1 DR declaration and is excluded from this clean-reset fixture."
    ],
    "flow": [
      [
        "Discover eligible participants",
        "Use the actual broadcast attachment, compatible peers and positive priority; distinguish RID from interface IP."
      ],
      [
        "Keep established roles",
        "Late priority-200 R4 joins R1 DR/R2 BDR without preemption; two DROthers remain 2-Way."
      ],
      [
        "Promote the prepared backup",
        "R1 attachment down/reset promotes R2; R4 fills BDR and the current network-LSA identity changes."
      ],
      [
        "Verify the new stable state",
        "R1 rejoins as DROther. Inspect roles, Full/2-Way, current LSAs, installed next hops and both probe directions."
      ]
    ],
    "example": "Four routers share 192.0.2.0/24 with LAN addresses .1–.4 and fixed RIDs 1.1.1.1–4.4.4.4. Priorities are 100, 50, 0 and 200. Sequentially starting R1, R2 and R3 establishes R1 DR/R2 BDR. Late R4 is a DROther. Removing R1’s attachment yields R2 DR/R4 BDR; restoring R1 preserves R2/R4. In contrast, the browser’s all-participants/no-incumbents case ranks R4 DR/R1 BDR; equal priority one ranks R4 DR/R3 BDR. These are different histories, not inconsistent answers. The actual runner executes the staged reset sequence; it does not measure simultaneous startup or tie-breaking.",
    "configuration": "Choose one path: browser exercise, actual isolated Linux runner, or the optional guided Cisco lab. The latter requires four owned mapped routed LAN attachments (shown as GigabitEthernet1/0/1), already prepared 192.0.2.i/24 addressing/admin-up state, unique owned Loopback0 addresses 198.51.100.i/32, routing support and independent management. Record complete configuration and operational baselines first. Processes 129/229/329/429 must be absent and exclusively reserved; no other process/network statement may activate these attachments. All added priority/network/cost/timer/area settings must be absent at baseline. Do not convert a switchport, enable global routing, alter addressing or create a loopback by blindly pasting these blocks. Activate R1 and wait for its DR state before R2; wait for R2 BDR before R3; start R4 last. Observe roles and routes after each stage. Only R1’s mapped attachment is administratively cycled during the fault; originally admin-up is a requirement. Restore that exact attachment, then remove only owned activation/overrides/processes and reconcile the recorded baseline. No broad clear, reload or save is part of the experiment. Cisco syntax/output remains guided, not actually executed here.",
    "ports": [
      [
        "OSPFv2",
        "IP protocol 89, not TCP/UDP port 89. The actual capture decodes this protocol."
      ],
      [
        "AllSPFRouters 224.0.0.5",
        "Link-local multicast used by broadcast Hellos and relevant flooding. Actual late-baseline Hellos from all four routers use this destination."
      ],
      [
        "AllDRouters 224.0.0.6",
        "Link-local multicast for DR/BDR-directed protocol traffic on appropriate multiaccess interfaces. The bounded capture does not prove every flooding exchange."
      ],
      [
        "Hello DR/BDR fields",
        "Elected interface addresses: late .1/.2, after reset/rejoin .2/.4. These fields are distinct from RIDs and process numbers."
      ],
      [
        "Lab addresses",
        "192.0.2.i/24 LAN and 198.51.100.i/32 passive loopback. Documentation address space is used only in owned isolated namespaces."
      ]
    ],
    "production": "Choose DR/BDR candidates based on dependable operation, capacity and failure boundaries for the actual LAN. Priority intent needs operational confirmation and planned transitions; changing a value is not a reason to clear every OSPF process. Inventory segment membership, compatible network types, multicast delivery and backup adjacency readiness. A single router can carry different interface roles across multiple segments. Avoid treating an elected DR as an HSRP/VRRP virtual gateway or the forced next hop for every destination. DR/BDR organize one part of the control plane; they do not solve a failed switch, shared power domain, missing installed route or application policy. Keep change evidence tied to a specific router, interface, area and time.",
    "troubleshooting": [
      "Unexpected DR: inspect arrival/change history and every actual interface priority, role, elected address and RID. A greater priority on a late arrival is consistent with a retained incumbent. Verify positive eligibility and actual bidirectional discovery before blaming the ranking.",
      "Two DROthers show 2-Way: on this compatible broadcast segment that is expected. Identify both local and neighbor roles and confirm each has Full adjacency to the DR/BDR. Init, ExStart or Exchange are different conditions and require their own discovery/MTU/database evidence.",
      "A DR/BDR pair is not Full: check actual area, network type, IP/mask, Hello/dead values, authentication, unique identities, passive state, multicast reachability and MTU/DB exchange. A route or a ping alone cannot certify the required neighbor synchronization.",
      "No DR/BDR: verify that at least one discovered participant has positive interface priority. All-zero priority permits discovery but provides no eligible role holder; do not disable OSPF wholesale to fix intended election eligibility.",
      "Network-LSA confusion: correlate the current DR interface IP with link-state ID and its RID with advertising router. Select the current advertiser’s entry and inspect mask/Full-peer membership. Previous-DR LSAs can remain during change; the presence of an old entry does not prove a usable current path.",
      "Fault return gives unexpected roles: identify exactly which event reset or preserved interface state. The retained FRR passive trial preserved an old declaration and is not equivalent to this attachment-down fixture. Record observed declarations rather than forcing a generic priority-sort answer.",
      "Roles and routes look healthy but traffic fails: inspect selected installed prefixes, actual forwarding lookup/ARP or neighbor resolution, both directions, filters, MTU and original service. A normal DROther 2-Way pair can forward directly if routing/data-plane prerequisites exist.",
      "Recovery: reverse only the introduced owned attachment change, then repeat role, adjacency, current network-LSA, route and bidirectional probe evidence. Expect the new stable R2 DR/R4 BDR history, not automatic restoration of R1 DR/R2 BDR. Reconcile exact host state during cleanup."
    ],
    "security": "Any admitted routing peer can influence topology and elections. Priority is not authentication, an access-control list or proof of trust. Use actual release-supported peer authentication, interface restrictions, control-plane protection and key lifecycle in a reviewed production design; this lesson configures no security key or cipher. Passive loopbacks in the lab advertise intended prefixes without forming unintended neighbors there. They do not filter user traffic. The actual runner has no uplink/external peer, uses private configuration/socket paths and disables TCP VTY listeners. Captures are bounded to its owned LAN. No general permission to capture another network or modify host routing is implied.",
    "performance": "For n participating routers with both DR and BDR, the stable broadcast pattern has 2n−3 unique Full pairs rather than n(n−1)/2 pairwise Full relationships. At n=4 this is five versus six; the one remaining pair is normally 2-Way. The formula assumes distinct DR/BDR and completed compatible adjacencies, not a measured packet/CPU rate. DR/BDR still exchange protocol information with many peers; traffic volume, LSA churn and control-plane capacity depend on the actual design. Faster configured Hello/dead values add control traffic and detection sensitivity. The runner’s 1/4-second values and bounded eventual-state waits are lab settings, not a throughput, ASIC, recovery-time or service-continuity benchmark.",
    "mistakes": [
      "Sorting priority after every arrival and ignoring established DR/BDR declarations.",
      "Promoting the highest remaining priority ahead of the existing eligible BDR.",
      "Treating priority zero as disabling every adjacency or preventing data forwarding.",
      "Calling all 2-Way entries broken, including a normal pair of DROthers.",
      "Confusing the neighbor’s displayed role with the observing router’s local role.",
      "Using router ID as the network-LSA link-state ID instead of the DR interface IP.",
      "Expecting the BDR to originate a duplicate current DR network LSA.",
      "Assuming restoration of configuration also restores the original elected roles.",
      "Using a passive toggle as equivalent evidence to an interface-down/reset event.",
      "Treating DR as a virtual default gateway or forcing user packets through it.",
      "Equating settled probe success with zero loss, application recovery or convergence timing."
    ],
    "comparison": [
      [
        "DR / BDR / DROther",
        "Current synchronization role / prepared successor / other participant.",
        "Roles belong to a specific broadcast attachment, not the whole router."
      ],
      [
        "Priority / cost",
        "Election eligibility and ranking / route metric contribution.",
        "Increasing priority does not lower a route’s OSPF cost."
      ],
      [
        "Router ID / interface IP",
        "Peer identity and tie-break / address on this LAN.",
        "Type-2 advertising router uses RID; link-state ID uses current DR interface IP."
      ],
      [
        "Full / 2-Way",
        "Database-synchronized adjacency / bidirectional discovery.",
        "Two DROthers normally remain 2-Way; their direct data path can still work."
      ],
      [
        "Broadcast / point-to-point",
        "Multiaccess election / no DR/BDR election on the point-to-point network type.",
        "A physical Ethernet attachment can be configured with a different OSPF type; inspect actual behavior."
      ],
      [
        "Broadcast / NBMA",
        "Multicast-capable shared network / nonbroadcast multiaccess.",
        "Both use DR/BDR concepts, but discovery/reachability/configuration differ. NBMA is outside this lab."
      ],
      [
        "DR/BDR / first-hop redundancy",
        "OSPF adjacency organization / virtual gateway availability.",
        "Do not substitute an election role for HSRP/VRRP or an installed forwarding next hop."
      ],
      [
        "Attachment restore / role history",
        "Return exact interface configuration/carrier / keep current stable incumbents.",
        "Recovered R1 is DROther in this clean-reset experiment."
      ]
    ],
    "interactive": "ospf-dr-bdr",
    "artifacts": [
      {
        "title": "Download actual four-router broadcast DR/BDR lab",
        "path": "labs/ospf-dr-bdr.sh"
      },
      {
        "title": "Download pinned private FRR preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "topologyKind": "shared",
      "objective": "Explain staged nonpreemption, BDR promotion, expected Full/2-Way pairs and current network-LSA identity; prove packet forwarding separately and recover only an owned attachment.",
      "requirements": "Browser exercise needs no router. Actual runner needs Ubuntu 24.04 amd64, root network/mount capabilities, pinned privately extracted FRR 8.4.4, and existing ip/ping/sysctl/python3/unshare/mount/getent/TShark. No system service is installed. Optional Cisco work requires the prepared owned four-router baseline described above and independent management.",
      "topology": [
        "Owned fabric bridge · broadcast 192.0.2.0/24 · area 0",
        "R1 .1 · RID 1.1.1.1 · priority 100",
        "R2 .2 · RID 2.2.2.2 · priority 50",
        "R3 .3 · RID 3.3.3.3 · priority 0",
        "R4 .4 · RID 4.4.4.4 · priority 200 · joins last",
        "Each passive loopback: 198.51.100.i/32"
      ],
      "steps": [
        "Browser: compare established, late, failover and recovered histories. Record DR/BDR and the unique 2-Way pair. Explain why late R4 does not take over and why R2 promotes before R4.",
        "Choose all-participants/no-incumbents, equal-priority, all-zero, single-eligible and lone-router cases. Identify when a BDR or current network-LSA template is absent. Change priorities only as a replay input, not a predicted live configuration change.",
        "Clear RIB/forward/return declarations separately and confirm role history is unchanged. Templates do not measure traffic; compare direct peer next-hop evidence from the separate actual lab.",
        "Read both downloaded scripts and their inert default help. Prepare the pinned private runtime, then explicitly run the actual lab using the printed extracted root path. Retain the actual records and host-isolation checks.",
        "Baseline actual: R1 establishes DR, R2 BDR and R3 priority-zero DROther; R4 starts last. Inspect interface JSON, Full/2-Way matrix, current type-2 identity/membership, selected installed FRR RIB, kernel routes/lookup and bidirectional loopback ICMP.",
        "Inspect bounded R3-LAN capture: protocol-89 Hellos carry DR/BDR interface addresses; ICMP Ethernet headers identify direct R3/R4 peer forwarding. Do not label this a complete flooding history or an application test.",
        "Runner brings down only R1’s owned LAN attachment. Record R2 DR/R4 BDR, three current attached router IDs and settled peer probes. Restore R1’s attachment and confirm R1 DROther, R1/R3 2-Way, four current attached IDs and both probe directions.",
        "Confirm cleanup after actual execution. Optional Cisco path must stage its own activation, fault and baseline reconciliation and retain its own output. It remains guided; FRR evidence does not prove Cisco parser acceptance or hardware behavior."
      ],
      "verification": "Separate actual local interface role/elected addresses, peer Full/2-Way, current DR LSA identity/membership, selected installed RIB, forwarding next hops and bidirectional ICMP. Existing lab results include independent host snapshots after normal and four partial-start/capture failure paths. No continuous-delivery or application conclusion follows from settled ICMP.",
      "troubleshooting": "For the intended fault inspect R1’s actual attachment/admin state before comparing the surviving role history. For missing expected Full, compare compatibility and discovery/MTU evidence. For absent probes, inspect both selected routes and direct peer resolution. Preserve rejected-trial evidence instead of changing expected roles until it passes.",
      "challenge": "Explain both results for priorities 100/50/0/200: staged R1→R2→R3→R4 versus all candidates initially available. Then show how failure of BDR R2 differs from failure of DR R1. Identify the type-2 advertiser and normal 2-Way pair after R1 returns.",
      "cleanup": "Actual runner removes only its five namespaces, eight daemons, owned capture subprocesses and temporary paths, with independent isolation verification. Browser reset restores the authored established case. Optional Cisco cleanup detaches only owned OSPF activation/overrides before deleting exclusive processes; preserves prepared IPs, loopbacks, routing support, management and originally admin-up attachment state. Reconcile the exact recorded baseline and do not save/reload/clear unrelated state."
    },
    "glossary": {
      "DR": "Designated router on one multiaccess network.",
      "BDR": "Backup designated router prepared to succeed the DR.",
      "DROther": "Participant without either designated role on this network.",
      "Priority": "Per-interface integer eligibility/ranking value; zero excludes both roles.",
      "Nonpreemption": "A late preferred candidate does not automatically displace a healthy incumbent.",
      "2-Way": "Bidirectional discovery; not necessarily Full database synchronization.",
      "Full": "Neighbor adjacency with synchronized database state.",
      "Network-LSA": "Area-scoped type-2 transit-network description originated by the current DR.",
      "Link-state ID": "Type-dependent identity; current DR interface IP for a network LSA.",
      "Advertising router": "RID of the LSA originator.",
      "InterfaceDown": "State transition used here to reset a departed attachment before return."
    },
    "prerequisites": [
      "s3-g1-t0",
      "s3-g1-t1"
    ],
    "related": [
      "s3-g1-t3",
      "s3-g1-t4",
      "s1-g4-t2"
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Eligibility",
        "question": "R3 has interface priority zero. Must it be absent from all OSPF neighbor relationships?",
        "answer": "No; it is ineligible for DR/BDR but can be Full with those peers.",
        "explanation": "Eligibility and adjacency are distinct.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Identity",
        "question": "The current DR has RID 2.2.2.2 and LAN IP 192.0.2.2. Which value is its type-2 link-state ID?",
        "answer": "192.0.2.2.",
        "explanation": "The advertising router field instead contains 2.2.2.2.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recovery history",
        "question": "After this owned R1 attachment reset and rejoin, must R1 regain its original DR role?",
        "answer": "No; it rejoins as DROther while R2 DR/R4 BDR remain established.",
        "explanation": "Restoring configuration does not undo the surviving election history.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Late arrival",
        "question": "R1 priority 100 is DR and R2 priority 50 is BDR. Compatible R4 priority 200 joins after those roles are stable. What is the expected settled result in this fixture?",
        "answer": "R1 remains DR, R2 remains BDR and R4 is DROther.",
        "explanation": "A healthy established role is not replaced merely by a higher-priority arrival.",
        "type": "multiple-choice",
        "options": [
          "R1 remains DR, R2 remains BDR and R4 is DROther.",
          "R4 immediately becomes DR and R1 becomes BDR.",
          "R4 becomes BDR and R2 loses all neighbor relationships.",
          "All four must restart their OSPF processes."
        ],
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q01"
      },
      {
        "difficulty": "Beginner",
        "testedConcept": "Priority-zero participation",
        "question": "R3 priority zero shares the compatible broadcast LAN with a DR and BDR. Which neighbor outcome is expected after synchronization?",
        "answer": "Full with DR and BDR; 2-Way with another DROther.",
        "explanation": "Zero excludes elected roles without suppressing protocol participation.",
        "type": "multiple-choice",
        "options": [
          "Full with DR and BDR; 2-Way with another DROther.",
          "No Hello transmission and no neighbor discovery.",
          "DR because zero is the numerically preferred priority.",
          "Full with every DROther solely because the LAN is Ethernet."
        ],
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "BDR succession",
        "question": "In the late baseline, R1 DR fails through the authored attachment-down/reset event. R2 BDR has priority 50; R4 DROther has priority 200. Who becomes DR and BDR?",
        "answer": "R2 becomes DR and R4 becomes BDR.",
        "explanation": "The existing eligible BDR promotes before the new backup vacancy is filled; R3 priority zero is excluded.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Router-ID tie",
        "question": "All four routers are supplied initially available with no incumbents and priority one. Their fixed RIDs are 1.1.1.1 through 4.4.4.4. Which settled ranking follows?",
        "answer": "R4 is DR and R3 is BDR.",
        "explanation": "Numerically higher RID breaks the equal-priority candidate tie. This case assumes the initial discovery set, rather than measuring a boot race.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q04"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Local display interpretation",
        "question": "R3’s broadcast neighbor output lists R1 as Full/DR and R4 as 2-Way/DROther. What does this establish about R3 and those relationships?",
        "answer": "R3 is a DROther here; it is Full with the neighbor DR and normally 2-Way with the other DROther.",
        "explanation": "The slash role belongs to the displayed neighbor. The two-DROther 2-Way relationship is expected and does not itself prove traffic failure.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Network-LSA identity",
        "question": "After R2 promotes, a current type-2 entry has link-state ID 192.0.2.2, advertising router 2.2.2.2 and attached RIDs 2.2.2.2/3.3.3.3/4.4.4.4. Interpret the two identity fields and R1’s omission.",
        "answer": "The link-state ID is R2’s LAN IP; the advertising router is R2’s RID. R1’s attachment is down and it is not a current Full participant.",
        "explanation": "This identifies the current DR’s transit-network description. An old R1 entry may still be retained during protocol change; its presence would not reverse this interpretation.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Adjacency scaling",
        "question": "A healthy broadcast segment has six participants, distinct DR/BDR and all expected adjacencies settled. How many unique Full pairs exist, and how many would an all-pairs Full design have?",
        "answer": "Nine expected Full pairs versus fifteen all-pairs pairs.",
        "explanation": "DR contributes five; BDR adds four new pairs, totaling 2n−3=9. All pairs are n(n−1)/2=15. This is a relationship count, not a throughput measurement.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Control/data distinction",
        "question": "R3/R4 are both DROthers and 2-Way with one another, yet selected peer-loopback routes use each other’s LAN IP and captured ICMP MACs identify direct peer delivery. Is that contradictory?",
        "answer": "No; their direct forwarding path does not require a Full adjacency with each other or a DR forwarding relay.",
        "explanation": "They synchronize through DR/BDR, while installed routes and data-plane prerequisites determine the packet path. The bounded ICMP evidence does not prove an application session.",
        "type": "multiple-choice",
        "options": [
          "No; their direct forwarding path does not require a Full adjacency with each other or a DR forwarding relay.",
          "Yes; every packet must traverse the elected DR.",
          "Yes; a 2-Way entry means both LAN attachments are down.",
          "No; 2-Way alone certifies every application and return path."
        ],
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Fault scope",
        "question": "An earlier passive-interface return trial retained R1’s old DR declaration and violated the proposed return-role assertion. Which response is justified?",
        "answer": "Keep that trial separate and use the documented attachment-down/reset fixture for clean rejoining evidence.",
        "explanation": "The passive event and interface-down event are not equivalent state transitions in the observed FRR build. Do not silently rerank, discard the failed observation or claim a universal passive-interface rule.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Lone DR and independent proof",
        "question": "R1 alone is DR with no Full neighbor. An operator expects a network LSA and treats local role state as proof of original-service recovery. What is wrong with both expectations?",
        "answer": "A lone DR without a Full neighbor does not originate a network LSA; role state does not prove installed routes, packet delivery, return or service.",
        "explanation": "Check the actual required layers independently. The explorer’s structural output and readiness declarations are not emitted protocol output or a measured transaction.",
        "type": "short-answer",
        "topicId": "s3-g1-t2",
        "questionId": "s3-g1-t2-Q10"
      }
    ],
    "sources": [
      {
        "title": "RFC 2328: election, adjacency, interface state and network-LSA identity",
        "url": "https://www.rfc-editor.org/rfc/rfc2328",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4: priorities, network type, timers and operational JSON",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15: OSPF configuration and target scope",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco neighbor troubleshooting: broadcast 2-Way and distinct failure states",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13699-29.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS reference: priority/network/router-ID and matching no-forms",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-i1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS reference: interface activation, cost and dead interval",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-a1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS reference: interface, neighbor and network database inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17: passive default and active interface exception",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iri-default-passive-interface.html",
        "checked": "2026-10-09"
      }
    ],
    "commands": [
      {
        "code": "show running-config\nshow ip interface brief\nshow ip protocols\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip ospf database network",
        "explanation": "On each optional Cisco router, record baseline before creating any owned OSPF process.",
        "expected": "GUIDED, NOT EXECUTED: Confirm mapped prepared IPs, admin-up routed LAN and owned loopback, absent processes 129/229/329/429, absent added overrides, no other activation and independent management. Stop this optional branch if ownership/baseline requirements are not true. Do not alter global routing, switchport roles or addressing.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 129\nrouter-id 1.1.1.1\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface Loopback0\nip ospf 129 area 0\nexit\ninterface GigabitEthernet1/0/1\nip ospf network broadcast\nip ospf priority 100\nip ospf cost 10\nip ospf hello-interval 1\nip ospf dead-interval 4\nip ospf 129 area 0\nend\nshow ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor",
        "explanation": "R1 only: activate first, then wait for local DR before continuing.",
        "expected": "GUIDED, NOT EXECUTED: Prepared exclusively owned process/interface baseline required. Area/network/timers must agree across the LAN. 1/4 seconds and cost ten are configured lab values. Passive loopback advertises its prepared /32. Inspect the actual platform’s loopback cost and route totals rather than assuming FRR’s observed zero loopback cost applies here. No clear/reload is needed for the new inactive process’s fixed RID.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 229\nrouter-id 2.2.2.2\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface Loopback0\nip ospf 229 area 0\nexit\ninterface GigabitEthernet1/0/1\nip ospf network broadcast\nip ospf priority 50\nip ospf cost 10\nip ospf hello-interval 1\nip ospf dead-interval 4\nip ospf 229 area 0\nend\nshow ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor",
        "explanation": "R2 only: activate after R1 DR is observed; wait for R2 BDR and Full with R1.",
        "expected": "GUIDED, NOT EXECUTED: Prepared exclusively owned process/interface baseline required. Area/network/timers must agree across the LAN. 1/4 seconds and cost ten are configured lab values. Passive loopback advertises its prepared /32. Inspect the actual platform’s loopback cost and route totals rather than assuming FRR’s observed zero loopback cost applies here. No clear/reload is needed for the new inactive process’s fixed RID.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 329\nrouter-id 3.3.3.3\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface Loopback0\nip ospf 329 area 0\nexit\ninterface GigabitEthernet1/0/1\nip ospf network broadcast\nip ospf priority 0\nip ospf cost 10\nip ospf hello-interval 1\nip ospf dead-interval 4\nip ospf 329 area 0\nend\nshow ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor",
        "explanation": "R3 only: activate after DR/BDR are stable; confirm priority-zero DROther and Full with both.",
        "expected": "GUIDED, NOT EXECUTED: Prepared exclusively owned process/interface baseline required. Area/network/timers must agree across the LAN. 1/4 seconds and cost ten are configured lab values. Passive loopback advertises its prepared /32. Inspect the actual platform’s loopback cost and route totals rather than assuming FRR’s observed zero loopback cost applies here. No clear/reload is needed for the new inactive process’s fixed RID.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter ospf 429\nrouter-id 4.4.4.4\npassive-interface default\nno passive-interface GigabitEthernet1/0/1\nexit\ninterface Loopback0\nip ospf 429 area 0\nexit\ninterface GigabitEthernet1/0/1\nip ospf network broadcast\nip ospf priority 200\nip ospf cost 10\nip ospf hello-interval 1\nip ospf dead-interval 4\nip ospf 429 area 0\nend\nshow ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor",
        "explanation": "R4 only: activate last; confirm the greater-priority late router is DROther and normal R3/R4 2-Way.",
        "expected": "GUIDED, NOT EXECUTED: Prepared exclusively owned process/interface baseline required. Area/network/timers must agree across the LAN. 1/4 seconds and cost ten are configured lab values. Passive loopback advertises its prepared /32. Inspect the actual platform’s loopback cost and route totals rather than assuming FRR’s observed zero loopback cost applies here. No clear/reload is needed for the new inactive process’s fixed RID.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "show ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor\nshow ip ospf database network\nshow ip route",
        "explanation": "On each router after each settled stage, correlate roles, peer states, current network-LSA and actual selected routes.",
        "expected": "GUIDED, NOT EXECUTED: Record router/interface/area/time. Late baseline R1 DR/R2 BDR; R3/R4 2-Way with each other and Full with DR/BDR. Interpret link-state ID as current DR interface IP and advertiser as its RID. Collect both-direction lab loopback probes and forwarding/capture evidence with separately reviewed target-specific commands; these show commands alone do not prove data or application delivery.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nshutdown\nend\nshow ip interface brief",
        "explanation": "R1 only: bring down the exclusively owned, originally admin-up lab LAN attachment.",
        "expected": "GUIDED, NOT EXECUTED: This affects all R1 traffic on that attachment; the separate management path must remain available. Wait and inspect survivors with the previous block: R2 promotes DR, R4 becomes BDR, R3 remains DROther. Do not change priority, area or other attachments. Do not use a passive toggle as equivalent evidence.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno shutdown\nend\nshow ip ospf interface GigabitEthernet1/0/1\nshow ip ospf neighbor",
        "explanation": "R1 only: reverse the introduced attachment shutdown and verify the new stable history.",
        "expected": "GUIDED, NOT EXECUTED: R1 rejoins as DROther under the documented clean-reset history. R2 DR/R4 BDR remain established; R1/R3 normally 2-Way. Repeat all routers’ current network-LSA, selected routes, forwarding and both probes. This restores original admin-up configuration, not the original elected role labels.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 129 area\nno ip ospf network\nno ip ospf priority\nno ip ospf cost 10\nno ip ospf hello-interval\nno ip ospf dead-interval\nexit\ninterface Loopback0\nno ip ospf 129 area\nexit\nno router ospf 129\nend\nshow running-config\nshow ip interface brief\nshow ip ospf interface",
        "explanation": "R1 only: detach owned activation/overrides, then remove the exclusive new process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent settings added above may be removed. Exclude any alternate activation by network statements. Preserve IPs, prepared loopback, interface roles, original admin-up state, global routing, management and unrelated processes. Reconcile the exact baseline; no interface deletion, broad clear, save or reload.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 229 area\nno ip ospf network\nno ip ospf priority\nno ip ospf cost 10\nno ip ospf hello-interval\nno ip ospf dead-interval\nexit\ninterface Loopback0\nno ip ospf 229 area\nexit\nno router ospf 229\nend\nshow running-config\nshow ip interface brief\nshow ip ospf interface",
        "explanation": "R2 only: detach owned activation/overrides, then remove the exclusive new process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent settings added above may be removed. Exclude any alternate activation by network statements. Preserve IPs, prepared loopback, interface roles, original admin-up state, global routing, management and unrelated processes. Reconcile the exact baseline; no interface deletion, broad clear, save or reload.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 329 area\nno ip ospf network\nno ip ospf priority\nno ip ospf cost 10\nno ip ospf hello-interval\nno ip ospf dead-interval\nexit\ninterface Loopback0\nno ip ospf 329 area\nexit\nno router ospf 329\nend\nshow running-config\nshow ip interface brief\nshow ip ospf interface",
        "explanation": "R3 only: detach owned activation/overrides, then remove the exclusive new process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent settings added above may be removed. Exclude any alternate activation by network statements. Preserve IPs, prepared loopback, interface roles, original admin-up state, global routing, management and unrelated processes. Reconcile the exact baseline; no interface deletion, broad clear, save or reload.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\nno ip ospf 429 area\nno ip ospf network\nno ip ospf priority\nno ip ospf cost 10\nno ip ospf hello-interval\nno ip ospf dead-interval\nexit\ninterface Loopback0\nno ip ospf 429 area\nexit\nno router ospf 429\nend\nshow running-config\nshow ip interface brief\nshow ip ospf interface",
        "explanation": "R4 only: detach owned activation/overrides, then remove the exclusive new process.",
        "expected": "GUIDED, NOT EXECUTED: Only baseline-absent settings added above may be removed. Exclude any alternate activation by network statements. Preserve IPs, prepared loopback, interface roles, original admin-up state, global routing, management and unrelated processes. Reconcile the exact baseline; no interface deletion, broad clear, save or reload.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 broadcast lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Extract pinned FRR 8.4.4/libyang into a private cache without installing a routing service.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured APT indexes/repositories and supporting libraries. Use the printed extracted root. Missing pinned packages fail; no maintainer scripts/system services are installed. This is a shared runtime preparation reference, not a distinct new environment.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-dr-bdr.sh --run",
        "explanation": "Run the actual four-router broadcast experiment with root namespace/mount capabilities.",
        "expected": "ACTUAL FRR/LINUX: Substitute the cache root printed by preparation for another account. Explicit run stages roles, records Full/2-Way/current LSA/RIB/kernel/probes, captures owned LAN headers, resets/restores R1 attachment and cleans owned resources. Default script invocation is inert help. No actual Cisco, boot-race/tie experiment, NBMA, application, zero-loss, hardware or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ]
  },
  {
    "id": "s3-g1-t3",
    "batch": "09",
    "title": "OSPF LSA basics",
    "subtitle": "Identify the object, understand its scope, then compare its copies.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "definition": "A link-state advertisement (LSA) is an OSPF database object describing topology or reachability. It is not a complete routing table, an ordinary application packet or an OSPF neighbor state. In OSPFv2 its fixed twenty-byte header identifies the LSA type, link-state ID and advertising router, with sequence, checksum, age, options and length. The body meaning depends on the type. Compare copies only in the correct OSPF process and flooding/database scope: the same router ID can originate distinct router LSAs in different areas.",
    "purpose": "LSAs let routers exchange a shared description from which they calculate routes. Reading an LSA correctly helps distinguish absent topology, missing inter-area reachability, stale or withdrawn information, and an installed-path problem. Learn what each core type represents, which router originates it, how its identity differs from a prefix, and why a seemingly younger copy is not always newer. Then corroborate database evidence with calculated routes, selected installation and both traffic directions.",
    "mental": "Think of versioned map records with a publisher and an object key. Two copies are comparable only if they describe the same record in the same map. Version comes before secondary tie rules; the receipt time on your screen is not its version. A retirement record can be the newest information while telling you not to use the old path. Different maps can contain records with the same publisher name. This analogy does not validate a checksum, implement reliable flooding or guarantee that a destination is reachable.",
    "components": [
      [
        "Object identity",
        "LS type, link-state ID and advertising router identify the object within its applicable database scope. Record router/process/VRF and area before comparing captures."
      ],
      [
        "Type-dependent body",
        "Router links, transit membership, inter-area network reachability, ASBR reachability or external destination information. An LSA header type is distinct from link descriptors inside a router-LSA body."
      ],
      [
        "Sequence number",
        "Signed 32-bit ordering. Initial 80000001 is the lowest usable sequence; 80000000 is reserved, and 7FFFFFFF is the maximum. Hexadecimal appearance alone is not numeric freshness."
      ],
      [
        "Checksum",
        "Sixteen-bit unsigned comparison when sequences tie. The LSA checksum excludes LS age so ordinary aging does not require recalculation; checksum validation is separate from ranking its supplied field."
      ],
      [
        "Age and lifecycle",
        "Ordinary OSPFv2 age is seconds, bounded by MaxAge 3600. Refresh and flushing use protocol rules; age is neither the Hello interval nor a route uptime."
      ],
      [
        "Database versus forwarding",
        "An LSA can be retained without providing a usable installed route. Identify the current topology and calculated path, selected RIB entry, forwarding resolution and original service independently."
      ]
    ],
    "mechanism": [
      "Begin with type and context. A type-1 router LSA describes one router’s topology within an area; the router originates one per attached area, with its RID as both link-state ID and advertiser. A type-2 network LSA represents a transit multiaccess network: the current DR originates it when Full with another peer, using its interface IP as link-state ID and RID as advertiser. Point-to-point topology is represented without a DR network LSA.",
      "Type 3 is an ABR-originated network-reachability summary into an area. In the actual Areas lab, R1 sees the opposite 198.51.100.0/24 advertised by ABR 2.2.2.2 without receiving R3’s foreign router LSA. Summary does not necessarily mean aggregation. For network destinations, inspect the body mask as well as link-state ID; overlapping-prefix rules can use host bits in an ID, so the ID alone is not a universal prefix parser.",
      "Type 4 is an ABR-originated description of reachability to an ASBR in another area, with the described ASBR RID as link-state ID and the originating ABR RID as advertiser. Type 5 is an ASBR-originated external destination LSA with domain scope in type-5-capable areas; stub/NSSA flooding restrictions matter. Type 7 describes external information within its originating NSSA; selected translation produces separate type-5 information under NSSA rules. The supplied actual labs observe types 1/2/3, not execution of types 4/5/7.",
      "Neighbor synchronization and reliable flooding exchange database information. Database Description packets carry LSA headers for comparison; Link State Requests ask for needed objects; Link State Updates carry complete LSAs and can carry several; Link State Acknowledgments carry headers acknowledging received information. Retransmission and explicit/implied acknowledgment rules manage reliability. OSPF packet type 4 means Link State Update, while an enclosed LSA type 4 means ASBR summary: these are different fields.",
      "Before comparing copies, match type/link-state ID/advertiser and the database context. In this single-process worksheet, area-specific types must also match area; type 5 uses domain scope rather than a separate object per observing area. A type-7 copy from a different NSSA is a different object. The seven read-only snapshot views come from two separate actual experiments; matching RIDs across those experiments do not create one shared process/database.",
      "For the same otherwise valid object, compare sequence as signed 32-bit. If equal, compare checksum as unsigned 16-bit. If still equal and exactly one age is MaxAge, that MaxAge copy is more recent. Otherwise, if ages differ by more than MaxAgeDiff 900 seconds, the younger copy is more recent; differences of 900 or less are equivalent freshness. Stop at the first decisive rule. A MaxAge copy with an older sequence does not override a higher-sequence copy.",
      "Under ordinary RFC2328 aging, the originator refreshes an unchanged self-originated LSA at LSRefreshTime 1800 seconds by originating a new instance. MaxAge 3600 is used to flush information and is excluded from routing calculations. Removal follows flooding/retransmission/database-exchange conditions rather than an invented instant disappearance. At maximum sequence the originator must follow flushing/acknowledgment rules before restarting at the initial sequence; a simple arithmetic wrap is wrong. DoNotAge/opaque extensions and OSPFv3 are outside this comparator.",
      "Corroborate the actual records. The Areas ABR has separate area-0 and area-1 router LSAs with RID 2.2.2.2, while each internal router sees only its own area topology plus appropriate summaries. The broadcast snapshots show the current type-2 identity changing from DR .1/RID 1.1.1.1 to .2/RID 2.2.2.2 after the controlled R1 reset. Older network headers may remain. Selected routes, kernel next hops and settled bidirectional ICMP remain separate evidence from header presence or recency."
    ],
    "flow": [
      [
        "Find the object and scope",
        "Record process/area, type, link-state ID and advertiser; do not compare unrelated records."
      ],
      [
        "Read the header and body meaning",
        "Distinguish topology, summary and external information, and hexadecimal sequence/checksum from seconds."
      ],
      [
        "Apply freshness rules in order",
        "Signed sequence, unsigned checksum, MaxAge special case, then age dispersion greater than 900 seconds."
      ],
      [
        "Verify the resulting path separately",
        "A newer or retained LSA is not an installed route or measured exchange; inspect calculations and forwarding in both directions."
      ]
    ],
    "example": "Two area-0 type-1 copies have ID/advertiser 1.1.1.1. A sequence 80000001, checksum 1234, age 3600 loses to B sequence 80000002, checksum 1234, age 20: sequence decides before the MaxAge rule. If sequences and checksums both match and only A is MaxAge, A is the newer flushing information. For equal sequence/checksum with ages 900 and zero, neither is newer by age; at 901 versus zero, the zero-age copy is newer. FFFFFFFF is minus one as a signed sequence and is older than 00000000. These are authored header cases, not transmitted packets or validated checksums.",
    "configuration": "The browser and preserved snapshot inspector are read-only calculations. Editing a header does not originate an LSA, change a router, recalculate a real checksum or prove protocol acceptance. Use only the supplied fields/types in the same assumed process; scope and identity must match first. For actual work, read the previously verified Areas and DR/BDR runners, their inert help and private-runtime preparation. Explicit execution needs root network/mount capabilities and uses only owned namespaces/configuration. The optional Cisco commands inspect a prepared isolated lab; record the specific process, area, table and observer. They do not create redistribution, change area types, inject MaxAge advertisements or clear a live database. If examining types 4/5/7 in another authorized topology, first document its supported configuration and area capabilities; absence from these nonexternal labs is expected. Repeat only the runners’ documented owned fault/reversal and baseline verification, then reconcile exact cleanup. Preserve raw observations and source hashes before comparing copies.",
    "ports": [
      [
        "OSPFv2 transport",
        "IP protocol 89, with no TCP/UDP port. A checksum field here is not TCP flow state."
      ],
      [
        "Packet versus LSA type",
        "Hello 1, Database Description 2, Link State Request 3, Link State Update 4, Link State Acknowledgment 5 are packet type values. They do not number the LSA body types."
      ],
      [
        "Twenty-byte LSA header",
        "Age 2 bytes, options 1, type 1, LSID 4, advertiser 4, sequence 4, checksum 2, length 2; type-specific body follows."
      ],
      [
        "Ordinary aging constants",
        "LSRefreshTime 1800 s, MaxAge 3600 s, MaxAgeDiff 900 s. These are distinct from the disposable labs’ configured 1/4-second Hello/dead values."
      ],
      [
        "Snapshot context",
        "Separate actual Areas and broadcast experiments; copied hexadecimal sequence/checksum, seconds age and original area/observer/source labels."
      ]
    ],
    "production": "Tie a database observation to router/process/VRF, area, type, object identity and time. Compare neighboring views in the same scope before escalating suspected inconsistency; a small age difference is normal and a router LSA repeated in two areas is not automatically a duplicate fault. Check whether the relevant prefix is locally described, summarized or imported externally. Keep summaries, policy and area capability decisions deliberate. Do not clear all OSPF processes or redistribute every connected route merely because an expected entry is absent. Capture control-plane records and route/forwarding/service evidence at the same change boundary. The comparison rules help identify a copy; they do not rank route administrative distance or make a lower-cost path decision.",
    "troubleshooting": [
      "Apparently conflicting copies: match process/VRF, applicable scope, type, LSID and advertiser first. Different advertisers can describe the same destination without being two versions of one LSA. ABR router LSAs in different areas are separate objects even when their RID fields match.",
      "Hexadecimal sequence looks larger: decode signed ordering. 80000001 is the lowest usable sequence, while 7FFFFFFF is the maximum. FFFFFFFF means minus one, below zero. Reserved 80000000 is not an acceptable ordinary instance; never repair a router by manually wrapping a header.",
      "Sequence matches but checksum differs: the greater unsigned checksum determines header recency. This comparison does not prove either checksum was correctly computed or that the body is trustworthy. Inspect actual protocol validation/logs and retained evidence separately.",
      "Age differs: first rule out differing sequence/checksum. Exactly one MaxAge copy wins only after those tie. Otherwise age must differ by more than 900 seconds to decide; a one-second or exactly-900-second difference does not by itself identify a newer instance.",
      "Type-2 entry looks unexpected after DR change: inspect current interface role/address and advertising RID, then the current network-LSA membership. An older retained entry does not mean the old DR is currently active or its graph edge remains usable.",
      "Remote router LSA absent: an area boundary may be correct. In the Areas lab R1 should receive ABR-originated type-3 server reachability, not R3’s foreign area-1 type-1 topology. Type-4/5/7 absence is expected in these nonexternal experiments.",
      "Present LSA but no working route: inspect body mask/metric and relevant topology/ASBR or forwarding-address reachability where applicable, calculated route class, competing sources, selected installed RIB, forwarding resolution, both directions, filters/MTU and the original service. Do not call retained MaxAge information a usable candidate.",
      "Unexpected flooding/DB exchange: inspect actual adjacency state, request/retransmission lists, acknowledgments, compatibility/MTU and change rate. This comparator cannot diagnose a live neighbor FSM from two invented headers. Correct only the demonstrated owned mismatch and verify the full evidence chain again."
    ],
    "security": "An LSA is control-plane information, not encryption or access control. A valid checksum detects certain corruption; it is not peer authentication or proof that a route is safe. Authorized peers can advertise harmful topology/reachability, and untrusted serialized records must be treated as data. The snapshot builder reads only current passing local reports, validates header formats and records source hashes; the browser renders dynamic values as text. Production peer admission/authentication and control-plane protections require the supported release and key lifecycle. The isolated labs have no external peer/uplink and install no system routing service. Do not inject manufactured freshness/MaxAge data into a network to test the teaching comparator.",
    "performance": "LSA count, body size, topology churn, flooding/retransmission work and route-calculation frequency all affect control-plane load. Header freshness ordering is not a performance benchmark. Stable self-originated refresh is distinct from a topology-triggered update; implementation throttles/pacing and platform capacity need actual validation. Areas limit topology scope but summaries/external routes still add work, and an ABR retains multiple databases. The comparator evaluates supplied headers immediately. Its exhaustive boundary tests do not establish live convergence, CPU, packet loss, throughput or hardware forwarding. Snapshot ages are observations at collection time, not a measured aging trace.",
    "mistakes": [
      "Comparing different types, advertisers, areas or processes as versions of one object.",
      "Treating LSID alone as a destination prefix without the body mask/type.",
      "Confusing OSPF packet type, LSA header type, router-body link type and external metric type.",
      "Reading sequence as unsigned hexadecimal or using simple wrap at its maximum.",
      "Choosing the younger age before comparing sequence and checksum.",
      "Treating exactly 900 seconds as greater than MaxAgeDiff.",
      "Treating MaxAge newer-for-flushing information as a usable routing path.",
      "Using a checksum as authentication or treating a supplied checksum field as validated.",
      "Expecting foreign-area router topology instead of appropriate summary reachability.",
      "Merging snapshots from separate labs because their fixed router IDs match.",
      "Claiming type-4/5/7 execution, reliable flooding or application recovery from the supplied type-1/2/3 headers."
    ],
    "comparison": [
      [
        "Type 1 / type 2",
        "Router’s area topology / DR-described transit network.",
        "RID identity versus DR interface-IP link-state ID; type 2 needs a DR with a Full peer."
      ],
      [
        "Type 3 / type 4",
        "Inter-area network destination / reachability to an ASBR.",
        "Both originate at an ABR; the described destination identity differs."
      ],
      [
        "Type 5 / type 7",
        "Domain-scoped external destination / NSSA-scoped external destination.",
        "Type-5-capable area restrictions and selected NSSA translation matter; not executed by these labs."
      ],
      [
        "Sequence / checksum / age",
        "Ordered instance version / checksum tie breaker / lifecycle and dispersion.",
        "Apply in the defined order; checksum validation remains separate."
      ],
      [
        "LSA / Link State Update",
        "Database object / protocol packet carrying one or more complete LSAs.",
        "Packet type 4 is not the same field as LSA type 4."
      ],
      [
        "Refresh / flush",
        "Reoriginate an unchanged object / retire information through MaxAge rules.",
        "1800-second ordinary refresh differs from 3600-second MaxAge and neighbor dead timing."
      ],
      [
        "Equivalent freshness / equal bytes",
        "No more-recent copy by header rules / literal byte equality.",
        "Small permitted age differences do not mean the entire encoded records are byte-identical."
      ],
      [
        "LSDB / RIB / forwarding",
        "Protocol information / selected routes / packet next-hop behavior.",
        "Each needs its own evidence; an LSA alone proves none of the later layers."
      ]
    ],
    "interactive": "ospf-lsa",
    "artifacts": [
      {
        "title": "Download actual multi-area LSA lab",
        "path": "labs/ospf-areas.sh"
      },
      {
        "title": "Download actual broadcast network-LSA lab",
        "path": "labs/ospf-dr-bdr.sh"
      },
      {
        "title": "Download pinned private FRR preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Read actual router/network/summary headers in their own scope, compare authored copies correctly and correlate controlled faults with current topology, route and probe evidence.",
      "requirements": "Browser needs no router. Actual work reuses the owned Areas and broadcast runners: Ubuntu 24.04 amd64, root network/mount capabilities, pinned privately extracted FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/getent; broadcast also requires TShark. Optional Cisco inspection requires a prepared authorized isolated topology and the actual supported release.",
      "topologyKind": "shared",
      "topology": [
        "Experiment A: R1 area 0 ↔ ABR areas 0/1 ↔ R3 area 1",
        "Experiment B: four routers on owned area-0 broadcast fabric",
        "Each view retains experiment / observer / phase / area",
        "Same fixed RID across experiments is not one shared database"
      ],
      "steps": [
        "Compare all eighteen authored cases. Record the first decisive stage and explain why later stages are skipped. Pay particular attention to signed sequences, older-sequence MaxAge, equal checksum, exactly 900/901 seconds and maximum versus initial sequence.",
        "Change type/LSID/advertiser/area independently. Explain why type 5’s domain object differs from type 7’s NSSA object. Invalid or reserved values must suppress stale output; do not interpret a format-valid field as a valid computed checksum.",
        "Inspect the seven preserved actual views. Find area-local router LSAs, ABR-originated opposite-LAN summary IDs and the current broadcast network-LSA ID/advertiser. Keep experiment boundaries explicit; small observed ages are not a wall-clock reconstruction of flooding.",
        "Read/download both actual runners and preparation. Default runner invocation shows inert help. Prepare the private runtime and explicitly run each lab sequentially using the printed extracted root; retain raw records and confirm cleanup between experiments.",
        "Actual Areas: compare R1 area 0, ABR’s two areas and R3 area 1. Identify repeated ABR RID in separate area objects, excluded foreign router topology and unchanged opposite /24 summaries. Correlate calculations, selected RIB/kernel routes and both ICMP directions.",
        "Areas runner changes only R3 branch area then restores it. Observe preserved backbone/carrier alongside branch/remote-path loss and recovery; old LSAs need not vanish instantly. Repeat exact baseline evidence, not merely an LSDB entry count.",
        "Actual broadcast: inspect staged DR/BDR and the current DR’s network-LSA identity before R1 attachment down/reset, after promotion and after R1 rejoin. Do not confuse a retained old header with the current DR or require user traffic to relay through it.",
        "Confirm owned cleanup. Optional Cisco show commands inspect their own prepared lab; no external redistribution or LSA injection is part of this procedure. Reset the browser independently. The packaged snapshots are rebuilt from verified local reports during project validation, not updated live by a learner changing a header."
      ],
      "verification": "Record actual experiment/process/area/type/LSID/advertiser/sequence/checksum/age; corroborate selected current network identity with detailed DR evidence and summary destination masks with route evidence. Fixture tests independently verify report hashes and every copied header field. The reusable lab verifiers separately prove protocol state, selected RIB/kernel routes, settled ICMP and normal/partial-start isolation.",
      "troubleshooting": "If a view appears inconsistent, first verify source report and experiment/area context. If current route recovery differs, inspect the owned fault and required topology/candidate/installation/forwarding layers. The comparator has no live packet, checksum computation or neighbor FSM; do not repair a network from its synthetic result.",
      "challenge": "Explain why ABR RID 2.2.2.2 in area 0 and area 1 represents separate type-1 objects. Then compare two copies with equal sequence/checksum and ages 3600/20, 900/0 and 901/0. State what each outcome does and does not imply about installed routes.",
      "cleanup": "Browser reset restores the authored equal-freshness case. Actual runners remove only their owned namespaces, daemons, capture subprocesses and temporary/private configuration paths; independent normal and partial-start snapshots corroborate host state. No Cisco configuration is changed by the guided show commands. Preserve raw evidence and do not clear/reload/save unrelated state."
    },
    "glossary": {
      "LSA": "Type-dependent topology/reachability database object.",
      "LSDB": "Link-state database in its protocol/scope context.",
      "LSID": "Link-state ID whose meaning depends on LSA type.",
      "Advertiser": "Router ID of the object originator.",
      "Sequence": "Signed 32-bit ordered instance number.",
      "Checksum": "LSA integrity field, excluding age; not authentication.",
      "MaxAge": "Ordinary 3600-second lifecycle/flush age.",
      "MaxAgeDiff": "900-second age dispersion threshold used after earlier recency ties.",
      "LSRefreshTime": "Ordinary 1800-second unchanged self-originated refresh interval.",
      "Flooding": "Reliable protocol propagation using adjacencies and acknowledgment/retransmission rules.",
      "Type-7 translation": "Selected NSSA external information represented separately as type 5.",
      "RIB": "Routing information base; separate from LSDB and packet forwarding."
    },
    "prerequisites": [
      "s3-g1-t0",
      "s3-g1-t1",
      "s3-g1-t2"
    ],
    "related": [
      "s3-g1-t4",
      "s3-g3-t0",
      "s1-g4-t2"
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Identity first",
        "question": "Can two LSAs with different advertising router IDs be compared as two versions of one object merely because their link-state IDs match?",
        "answer": "No.",
        "explanation": "Type, ID, advertiser and applicable database context must match first.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Signed sequence",
        "question": "Between FFFFFFFF and 00000000, which is the newer signed OSPF sequence?",
        "answer": "00000000.",
        "explanation": "FFFFFFFF represents minus one; zero is greater.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Independent path proof",
        "question": "Does a comparator result of newer establish that the LSA provides a selected installed route or a successful service exchange?",
        "answer": "No.",
        "explanation": "Recency, lifecycle validity, route calculation/installation, forwarding, return and service evidence are separate.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "LSA versus packet",
        "question": "A Link State Update packet carries a router LSA. Which interpretation is correct?",
        "answer": "The packet type is 4 while the enclosed LSA type is 1.",
        "explanation": "OSPF packet and LSA header types are distinct fields.",
        "type": "multiple-choice",
        "options": [
          "The packet type is 4 while the enclosed LSA type is 1.",
          "The LSA must be type 4 because its carrier is an update.",
          "The packet must be TCP port 89.",
          "Every update can carry only one LSA."
        ],
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q01"
      },
      {
        "difficulty": "Beginner",
        "testedConcept": "Area object identity",
        "question": "The ABR has type-1 LSAs with ID/advertiser 2.2.2.2 in both area 0 and area 1. Are these necessarily duplicate copies of one object?",
        "answer": "No; they belong to separate area databases.",
        "explanation": "A router describes its topology separately in each attached area; the applicable scope is part of lookup context.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Type-specific identity",
        "question": "In the broadcast lab a type-2 entry uses link-state ID 192.0.2.2 and advertiser 2.2.2.2. What does each field identify?",
        "answer": "The DR’s interface IP and the originating DR’s router ID respectively.",
        "explanation": "The mask/body gives transit network context and attached RIDs. It is not an ABR summary or a user-packet source address.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Sequence precedence",
        "question": "Same object: A has sequence 80000001, checksum 1234, age 3600; B has sequence 80000002, checksum 1234, age 20. Which copy is newer under the recency rules?",
        "answer": "B; its signed sequence is greater.",
        "explanation": "Sequence decides before MaxAge. A lower-sequence MaxAge copy does not override B.",
        "type": "multiple-choice",
        "options": [
          "B; its signed sequence is greater.",
          "A; MaxAge always overrides every sequence.",
          "A; 3600 is the larger ordinary age.",
          "Neither; ages must always match before sequence comparison."
        ],
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q04"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Age boundary",
        "question": "Two copies have equal sequence and checksum. A age is 900 seconds; B age is zero. Neither is MaxAge. Does B win by the age-dispersion rule?",
        "answer": "No; the difference must be greater than 900 seconds.",
        "explanation": "Exactly MaxAgeDiff is equivalent freshness by these rules, although encoded age bytes differ.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Checksum versus age",
        "question": "Same object and equal sequence: A checksum 1234 age 3600; B checksum 1235 age 30. Which rule decides?",
        "answer": "Unsigned checksum comparison selects B before the MaxAge rule is reached.",
        "explanation": "Checksum is the next precedence stage after equal sequences. This does not compute or validate either checksum.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Maximum sequence lifecycle",
        "question": "Why is restarting directly from sequence 7FFFFFFF to 80000001 an incorrect simple-wrap recovery model?",
        "answer": "The originator must flush the maximum-sequence instance and follow acknowledgment rules before restarting at the initial sequence.",
        "explanation": "The initial sequence is lower in the signed order and would otherwise appear older. The worksheet does not simulate that protocol transition.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Summary interpretation",
        "question": "R1’s area-0 database has a type-3 198.51.100.0/24 summary advertised by 2.2.2.2 but no type-1 from R3 RID 3.3.3.3. What is the appropriate conclusion in the actual Areas baseline?",
        "answer": "The area boundary preserves local topology while the ABR supplies opposite-area network reachability.",
        "explanation": "Type-3 summary is not proof of prefix aggregation; no foreign area-1 router LSA is expected in R1’s area-0 topology.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "NSSA scope",
        "question": "Same type-7 LSID and advertiser are presented from two different NSSAs in one assumed process. Why should the comparator refuse to rank them as copies?",
        "answer": "Their originating NSSA databases differ; type 7 has area scope.",
        "explanation": "Type-5 domain-scoped external information is a different object/scope, and selected translation requires its own rules. These actual labs do not execute type-7 translation.",
        "type": "short-answer",
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "MaxAge and installed paths",
        "question": "Equal sequence/checksum copies have ages 3600 and 20. The MaxAge copy wins freshness. Does that establish a newer usable route?",
        "answer": "No; MaxAge is flushing information and is excluded from route calculation.",
        "explanation": "Retained database information is not a selected installed route. Inspect other topology/candidates and actual forwarding/return/service evidence separately.",
        "type": "multiple-choice",
        "options": [
          "No; MaxAge is flushing information and is excluded from route calculation.",
          "Yes; the winner necessarily supplies the best installed path.",
          "Yes; the older numerical age guarantees the lowest cost.",
          "No; this means the interface Hello timer is 3600 seconds."
        ],
        "topicId": "s3-g1-t3",
        "questionId": "s3-g1-t3-Q10"
      }
    ],
    "sources": [
      {
        "title": "RFC 2328: header/type/body, signed sequence, reliable flooding, recency and aging",
        "url": "https://www.rfc-editor.org/rfc/rfc2328",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3101: NSSA type-7 scope and selected type-5 translation",
        "url": "https://www.rfc-editor.org/rfc/rfc3101",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4: scoped database and route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS command reference: router/network/summary/ASBR/external/NSSA database views",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15: OSPF configuration/area capability and target scope",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html",
        "checked": "2026-10-09"
      }
    ],
    "commands": [
      {
        "code": "show running-config\nshow ip protocols\nshow ip ospf\nshow ip ospf interface\nshow ip ospf neighbor\nshow ip ospf database\nshow ip route",
        "explanation": "Record observer/process/area, configured versus actual protocol state, database and selected routes.",
        "expected": "GUIDED, NOT EXECUTED: Read only in a prepared isolated topology. Preserve the complete process/area/VRF metadata in output. Identify LSAs separately from Full state or selected routes; these commands do not certify packet, return or service delivery.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf database router 2.2.2.2",
        "explanation": "On the prepared Areas ABR, inspect its router-LSA detail in the reported area contexts.",
        "expected": "GUIDED, NOT EXECUTED: The same ABR ID/advertiser can appear as distinct type-1 objects in separate areas. Read the actual output’s process/area header and router-body link meanings; do not call a router-body link type an LSA header type.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf database network",
        "explanation": "On the prepared broadcast lab, inspect network-LSA detail and the current DR context.",
        "expected": "GUIDED, NOT EXECUTED: Compare LSID to the current DR interface IP and advertiser to its RID, with body mask/attached routers. Older entries can remain during change. No network LSA is expected merely because an interface is Ethernet configured as point-to-point.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf database summary 198.51.100.0",
        "explanation": "On the prepared Areas R1, inspect opposite server-LAN summary detail.",
        "expected": "GUIDED, NOT EXECUTED: Read body mask, advertising ABR and metric in the actual area/process. Summary reachability does not require aggregation or foreign router topology. Verify calculated/selected routes and actual exchange independently.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf database asbr-summary\nshow ip ospf database external\nshow ip ospf database nssa-external",
        "explanation": "Inspect type-4/5/7 categories only in an authorized supported topology; do not create redistribution or change area types here.",
        "expected": "GUIDED, NOT EXECUTED: These categories are absent in the supplied nonexternal Areas/broadcast labs. The commands are inspection context, not executed external/NSSA evidence. Actual area capabilities, originator, forwarding address/metric and translation policy require their own design and observations.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Extract the pinned shared FRR 8.4.4 runtime privately.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured APT indexes/repositories and supporting libraries. Use the printed extracted root; missing pinned versions fail. No maintainer scripts/system service are installed. This is another reference to the same prepared environment, not a distinct installer.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-areas.sh --run",
        "explanation": "Execute the already scoped owned experiment sequentially, after reading inert help and requirements.",
        "expected": "ACTUAL FRR/LINUX: Actual normal two-area router/summary scope, mismatch/recovery, selected paths and ICMP. Substitute the cache root printed by preparation for another account. Root network/mount capability is required; broadcast also needs TShark. Only owned state is changed and cleaned. No type-4/5/7 origination/translation, MaxAge/sequence event, checksum computation, actual Cisco, hardware, application or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-dr-bdr.sh --run",
        "explanation": "Execute the already scoped owned experiment sequentially, after reading inert help and requirements.",
        "expected": "ACTUAL FRR/LINUX: Actual broadcast router/network scope, current DR identity through reset/rejoin, direct forwarding and bounded capture. Substitute the cache root printed by preparation for another account. Root network/mount capability is required; broadcast also needs TShark. Only owned state is changed and cleaned. No type-4/5/7 origination/translation, MaxAge/sequence event, checksum computation, actual Cisco, hardware, application or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ]
  },
  {
    "id": "s3-g1-t4",
    "batch": "09",
    "title": "OSPF troubleshooting",
    "subtitle": "Find the first unsupported claim in the path, then collect the evidence that resolves it.",
    "level": "Intermediate → Advanced",
    "minutes": 65,
    "definition": "OSPF troubleshooting is the disciplined separation of packet scope, interface compatibility, neighbor exchange, area database, calculated reachability, selected installed routes and actual forwarding in both directions. A neighbor state is evidence about one relationship, not a unique root-cause label or a service guarantee. Start with the original source, destination, router/process/VRF, area, interface and observation time. Compare actual behavior to the intended topology before deciding whether anything is faulty.",
    "purpose": "A route incident can look like an OSPF problem even when every required adjacency is Full. Conversely, an expected broadcast DROther pair can remain 2-Way while useful paths work normally. This lesson teaches how to narrow the fault domain without clearing a healthy protocol, changing priorities blindly, bypassing compatibility checks or confusing a router-sourced ping with the user’s transaction. Preserve evidence, change only the demonstrated owned condition and prove recovery with the original traffic and an exact baseline comparison.",
    "mental": "Treat the investigation as a chain of evidence receipts. The interface receipt says the attachment exists; the neighbor receipt says what that pair has exchanged; the route receipt says which path was selected; the probe receipt says what a specific source/destination exchange achieved. A receipt from one desk cannot certify the next desk. Find a missing or conflicting receipt and collect that evidence. This analogy does not impose a strict execution order on every incident, model protocol timers or turn one observed symptom into a unique cause.",
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
      "Define the incident before touching the protocol. Write the original endpoint pair, failing operation, expected route/table and last known working boundary. Separate a router’s transit-address ping, a router’s LAN-source ping and an actual client/server exchange: they use different sources and return requirements. Compare both routers and relevant endpoints at the same change boundary. Preserve platform/version, current roles and logs, and avoid treating a short transient snapshot as a persistent failure.",
      "Check the intended attachment. Link UP does not prove correct VLAN/subnet, bidirectional IP transport, protocol-89 acceptance or OSPF activation. Inspect both interface views, actual addresses and area membership, passive settings, supported authentication/key context, Hello/dead values, area capability and network type. Process numbers are local identifiers and need not match between routers; area compatibility and domain-unique RIDs do matter. Ordinary broadcast mask checks and point-to-point/virtual-link exceptions must follow the actual network type rather than a universal mask-equality rule.",
      "No neighbor entry means no retained valid relationship in that observer’s view. Possible branches include absent Hellos, failed acceptance, passive/disabled OSPF, wrong attachment/area, timer or authentication mismatch and traffic filtering. A unicast ICMP reply confirms that bounded exchange, not Hello transmission or protocol-89 acceptance. A dynamically learned neighbor can disappear after expiration; a configured NBMA neighbor can remain Down. These labels are implementation/context observations, not proof that a cable is broken.",
      "Init indicates that a valid neighbor Hello has been heard but bidirectional discovery has not been established. Inspect whether the local RID appears in received neighbor Hello fields and compare each direction’s receive/acceptance evidence. Investigate asymmetric filtering/transport or peer acceptance without assuming MTU is the sole cause. Authentication errors and area/options/timer incompatibility require actual configuration/log evidence; do not infer secret key values from state labels.",
      "At 2-Way, check whether this pair is supposed to become adjacent. In the actual broadcast lab, R3 and R4 are both DROthers and remain 2-Way with each other while each is Full with DR/BDR. Their direct peer loopback traffic works. A point-to-point pair is expected to proceed toward Full; two priority-zero routers on a broadcast segment without an eligible DR have a different topology problem. Do not force every broadcast pair Full or assume DR/BDR must relay user traffic.",
      "ExStart establishes database-exchange roles and sequencing; Exchange carries Database Description information; Loading requests missing advertisements before completion. Persistent ExStart/Exchange can involve advertised interface MTU, negotiation/sequence problems or packet transport/acceptance. Compare actual MTUs and DBD evidence on both sides. A small successful ping does not establish larger packet viability. Persistent Loading calls for request/retransmission/LSU/acknowledgment evidence and logs. These are investigation branches; this lab does not execute an MTU, Init or exchange fault. Blind mtu-ignore or repeated process clears can conceal the defect and add churn.",
      "With required pairs Full, inspect the correct database and calculated prefix. Foreign-area router LSAs should not cross a normal area boundary; appropriate ABR summaries may supply reachability instead. Type-3 summary does not require aggregation. Identify the LSA by type/ID/advertiser and applicable scope, body mask/metric and lifecycle. A retained old network LSA after DR change is not proof that the old DR is still current. Use the LSA lesson’s recency rules without treating a newer or MaxAge copy as an installed usable route.",
      "Compare OSPF calculations with installation and destination lookup. A calculated candidate can lose same-prefix selection to another source; administrative distance is local installation preference, not an OSPF link cost or replacement for longest-prefix forwarding. Confirm the table/VRF, exact prefix and selected installed RIB, then actual next-hop/interface and forwarding lookup. Do not change OSPF cost or redistribute all connected networks merely because the preferred calculated route is absent from the selected table. External/stub/NSSA/forwarding-address cases require their own configured scope; the supplied actual labs are nonexternal.",
      "Prove forwarding and return separately. In the single-area actual fixture, disabling R2 namespace IPv4 forwarding preserves Full neighbors and selected installed OSPF/kernel routes but breaks both endpoint ICMP exchanges. Connected transit/gateway controls still succeed. Restoring its forwarding flag recovers the probes. Changing Linux ip_forward also resets namespace IPv4 host/router defaults; this disposable fixture verifies the stated flag/protocol/route/probe conditions, not arbitrary custom sysctl restoration.",
      "In a second actual fixture, removing only the server endpoint’s introduced route to 192.0.2.0/24 breaks both endpoint exchanges while router Full state, selected paths and R2 forwarding remain. That endpoint has no default route. Local gateways and R2-to-server-LAN controls work. Restoring the exact route reproduces its kernel baseline and recovers both probes. Failed request/reply alone does not prove the request reached the server; this fixture retains no packet-arrival capture for that fault. Review endpoint selection, return routing, filters/MTU and original service using the correct sources.",
      "The actual Areas mismatch changes only R3 branch membership from area 1 to area 2. Branch adjacency and opposite-LAN calculation/kernel paths disappear while the backbone stays Full and branch carrier remains up. Exact area restoration recovers the required evidence. Keep this experiment separate from the single-area and broadcast records; their repeated fixed RIDs are not a combined topology or chronology. The preview answer keys use known controlled interventions plus records, not a general live root-cause engine.",
      "Close the change with its evidence boundary. Correct or reverse only the demonstrated authorized condition; preserve management and unrelated baseline settings. Recheck intended adjacencies, applicable database/calculations, selected routes/lookup and both original traffic directions. Confirm original application behavior when that is the incident, and remove only introduced lab resources. Record remaining uncertainty, especially uncollected captures, hardware counters or application transactions. Successful ICMP and a clean route display are bounded observations, not zero-loss, convergence or production-capacity certification."
    ],
    "flow": [
      [
        "Scope the failing exchange",
        "Record original endpoints, table/process/area, observer and time; distinguish router controls from endpoint traffic."
      ],
      [
        "Interpret the required neighbor pair",
        "Compare attachment/compatibility and expected adjacency; choose the next state-specific evidence."
      ],
      [
        "Trace calculation through actual traffic",
        "Match LSDB/calculated prefix, selected RIB/lookup, forwarding and endpoint return with independent observations."
      ],
      [
        "Correct the demonstrated condition and recheck",
        "Use bounded owned changes, exact reversal and original-source verification; preserve baseline and cleanup evidence."
      ]
    ],
    "example": "R1 and R2 both show Full/- and selected installed remote LAN routes with OSPF cost 20. R2 kernel next hops remain present, yet the client-to-server and server-to-client pings fail. The actual R2 namespace forwarding value is zero; both local gateways and the transit control respond. Clearing OSPF would disturb a working control plane. Restoring the owned forwarding flag recovers both bounded exchanges. A different checkpoint has the same healthy router records but a missing server remote route and forwarding value one; its exact endpoint route restoration recovers traffic. Similar symptoms need the distinguishing records, and neither checkpoint proves an application transaction.",
    "configuration": "The browser is read-only: selecting a checkpoint or checking a focus does not run a router or apply a fault. For actual work, inspect each downloaded runner and its inert help, prepare the pinned private FRR runtime and execute experiments sequentially with the printed cache root. Root network/mount capability and the documented tools are required; packet capture is limited to owned interfaces. The single-area script changes only owned passive-transit configuration, owned router forwarding mode and an owned endpoint route, reversing each before the next fault. Separate Areas and broadcast runners retain their own mutation and cleanup boundaries. The guided Cisco blocks only inspect a prepared isolated topology; substitute its real authorized interface/process/table context and retain supported release metadata. No clear, reload, debug, save, area-type change, redistribution or mtu-ignore command is introduced. Source-described compatibility branches are not new fault injection instructions.",
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
    "production": "Build a before/after evidence bundle around the exact change boundary and affected table/prefix/traffic. Distinguish a stable intended 2-Way pair from a persistent unexpected exchange state, a branch outage from a backbone outage, and a candidate route from an installed lookup. Keep retry/capture/debug work bounded and justified; noisy global debugging can consume control-plane resources or disclose topology and authentication metadata. Preserve independent management, authentication lifecycle and authorization. Correct only the demonstrated condition and validate the original transaction from its actual source. Record a residual application or hardware failure honestly when protocol recovery is complete but service proof is missing.",
    "troubleshooting": [
      "Absent/Down: compare both interface activation/passive views, attachment, area/capability, Hello/dead, RID uniqueness, supported authentication and packet acceptance. Separate dynamic expiration from a manually configured NBMA neighbor. A working unicast ping is only one control probe.",
      "Init: collect both directions of Hello acceptance and local-RID inclusion, along with relevant filters and logs. The state suggests incomplete bidirectional discovery; it does not uniquely identify the rejecting device or a specific configuration error.",
      "2-Way: identify network type and both current roles first. Healthy broadcast DROther pairs remain 2-Way. Required Full relationships to DR/BDR or a point-to-point neighbor need separate verification; do not convert healthy expected pairs into faults.",
      "ExStart/Exchange: compare interface and advertised DBD MTU, exchange roles/sequence, packet transport and logs. Align the demonstrated supported path/MTU design. Do not use mtu-ignore as a universal repair or infer large-packet viability from a small ping.",
      "Loading: inspect outstanding requests, updates/retransmissions, acknowledgments, validation/log errors and actual peer/database context. A state label alone does not prove a malformed LSA, checksum failure or a unique missing object.",
      "Full but prefix absent: identify local versus inter-area/external reachability, type/body mask/lifecycle and required ABR/ASBR or forwarding-address dependencies. Then compare calculation, installation, competing same-prefix sources, table/VRF and longest-prefix lookup. The supplied fixtures execute only nonexternal cases.",
      "Full and installed but traffic fails: inspect actual forwarding enable, next-hop/neighbor resolution, filters, packet size/MTU, endpoint gateway/return selection and original service. Use connected controls and original endpoints; a router-sourced probe can bypass an endpoint return requirement.",
      "After correction: repeat the baseline evidence and original two-direction exchange, reconcile exact restored settings/endpoint routes and owned cleanup. Do not call app recovery from ICMP alone, infer request arrival from a failed exchange or measure convergence from unrelated snapshot ages."
    ],
    "security": "Treat control-plane admission and key lifecycle as real design inputs, not a reason to disable authentication during diagnosis. A checksum is not peer authentication. Preserve only necessary authorized packet/log metadata and handle running configuration as potentially sensitive. The preview reads bounded trusted local evidence, validates its schema/source metadata and renders dynamic records as text; injected markup cannot become a browser command. It performs no network mutation. Actual lab daemons use owned private paths and UNIX sockets, with TCP VTY disabled, and cleanup verifies owned process/runtime identity. None of the runners installs a global routing service or exposes an Internet peer.",
    "performance": "Frequent adjacency resets, LSA churn, retransmissions and repeated calculations can amplify an incident. Observe change rate and relevant counters before altering timers or clearing processes; capacity and throttling choices require actual platform evidence. The browser compares ten retained checkpoints immediately, not a running protocol. The actual lab waits for bounded settled conditions and retains traffic results; it does not measure elapsed convergence, sustained loss, throughput, CPU scale or physical forwarding. Snapshot neighbor uptime, route age and ping round-trip fields are context for those observations, not a general incident performance benchmark.",
    "mistakes": [
      "Using neighbor state as a unique root-cause answer.",
      "Calling every broadcast 2-Way relationship faulty.",
      "Treating local process numbers as a required cross-router match.",
      "Reading link UP or unicast ping as proof of valid OSPF Hello acceptance.",
      "Blindly applying mtu-ignore or repeatedly clearing a healthy process.",
      "Expecting foreign-area router topology where summaries are appropriate.",
      "Treating an LSDB record or calculated candidate as a selected installed route.",
      "Changing OSPF cost to repair a non-OSPF forwarding or endpoint return fault.",
      "Using a router-sourced ping as the original client application proof.",
      "Claiming packet arrival from a failed request/reply without a capture.",
      "Merging repeated RIDs across separate lab experiments.",
      "Calling forwarding-flag reversal a universal restoration of custom Linux sysctls.",
      "Declaring application, hardware, zero-loss or convergence success from bounded ICMP."
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
    "interactive": "ospf-troubleshooting",
    "artifacts": [
      {
        "title": "Download expanded single-area troubleshooting lab",
        "path": "labs/ospf-routing.sh"
      },
      {
        "title": "Download actual branch-area mismatch lab",
        "path": "labs/ospf-areas.sh"
      },
      {
        "title": "Download actual broadcast adjacency lab",
        "path": "labs/ospf-dr-bdr.sh"
      },
      {
        "title": "Download pinned private FRR preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Distinguish healthy and faulty neighbor relationships, compare control-plane versus forwarding/endpoint evidence, and verify exact scoped restoration without inventing a live diagnosis.",
      "requirements": "Browser requires no router. Actual work reuses Ubuntu 24.04 amd64, root network/mount capabilities, pinned privately extracted FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/getent; single-area/broadcast capture requires TShark. Optional Cisco inspection needs the prepared authorized topology and supported IOS XE release.",
      "topologyKind": "shared",
      "topology": [
        "Experiment A: Client ↔ R1 ↔ R2 ↔ Server, area 0 point-to-point transit",
        "Experiment B: R1 area 0 ↔ ABR areas 0/1 ↔ R3 area 1",
        "Experiment C: four routers on owned broadcast fabric, R3/R4 DROthers",
        "Retain separate experiment / observer / checkpoint / source hash"
      ],
      "steps": [
        "Select all ten preserved checkpoints. Identify original scope, the controlled intervention, expected versus observed neighbor pairs, selected paths and which additional records are actually available. Inspect raw record keys and source hashes before choosing a focus.",
        "Try all five focus choices for the forwarding-disabled and endpoint-return checkpoints. Explain why the known intervention and distinguishing observations justify each answer, while Full state alone cannot. Invalid views must hide stale output and reset must remain usable.",
        "Compare passive transit with adjacency restored. Carrier remains up during the passive fault. Distinguish passive LAN intent from accidental passive transit; the exact setting reversal must recover intended neighbors/routes and original traffic.",
        "Read/download the single-area runner and its inert help. Prepare the shared private runtime using its printed root, explicitly execute it in owned namespaces and retain all sixteen verification categories. Do not manually mutate a host forwarding setting or unrelated endpoint route.",
        "Forwarding fault: record both Full neighbors, selected installed OSPF routes, kernel next hops, R2 namespace forwarding zero, failed raw endpoint probes and successful connected controls. Verify flag one and successful endpoint probes after exact restoration, without claiming every custom sysctl or an application transaction.",
        "Endpoint-return fault: confirm R2 forwarding one and healthy router paths, the owned endpoint remote/default route absence, failed raw endpoint probes and successful local/R2-to-server controls. Compare the entire endpoint kernel route baseline after exact route restoration and both successful probes.",
        "Run Areas and broadcast experiments sequentially after confirming cleanup. Areas mismatch leaves backbone Full but loses branch/remote reachability; healthy broadcast R3/R4 remain 2-Way with Full DR/BDR peers and direct peer traffic. Preserve experiment boundaries.",
        "Confirm normal cleanup and four interrupted boundaries in the independent single-area verifier; existing Areas/broadcast verifiers have their own failure scopes. Optional Cisco blocks are read-only inspection of their prepared lab. Source-described Init/MTU/Loading/authentication cases are not new injected-fault claims."
      ],
      "verification": "Retain process/area/interface/peer, exact prefix/table, selected installed routes/kernel next hops, namespace forwarding state, endpoint baseline route list and raw probe target/exit/output. Independent verifiers check source hashes and each copied record, normal and partial-failure isolation. Recheck original endpoint directions and the application only when it has actually been tested.",
      "troubleshooting": "If a record seems contradictory, first verify experiment/observer/time and what that command measures. Do not combine source reports or turn absent uncollected data into a pass. Inspect the demonstrated owned condition and use its exact reversal; keep unknown application, packet-arrival or hardware evidence unknown.",
      "challenge": "Explain how two faults can preserve identical Full and router route displays yet break traffic for different reasons. Name the distinguishing namespace/endpoint observations. Then explain why the healthy R3/R4 2-Way pair is not repaired by the same actions.",
      "cleanup": "Browser reset restores the forwarding-disabled checkpoint and clears feedback/raw expansion without touching learner progress. Actual runners delete only owned namespaces/processes/capture/private temporary paths; independent snapshots verify host state and existing resources. Cisco show commands introduce no configuration. Preserve evidence and do not clear/reload/save unrelated state."
    },
    "glossary": {
      "Fault domain": "A bounded part of the path to investigate, supported by evidence rather than one symptom.",
      "Control probe": "A scoped comparison exchange that helps separate local attachment from original end-to-end behavior.",
      "Expected adjacency": "The pair relationship required by the configured network type and roles.",
      "DBD": "Database Description packet used in database exchange, including interface MTU context.",
      "Candidate versus installed": "A protocol-calculated possibility versus the locally selected installed route.",
      "Original source": "The actual incident endpoint, whose return and service requirements can differ from a router probe.",
      "Verified reversal": "Restoration of the specific introduced condition plus comparison of the documented baseline observations."
    },
    "prerequisites": [
      "s3-g1-t0",
      "s3-g1-t1",
      "s3-g1-t2",
      "s3-g1-t3"
    ],
    "related": [
      "s3-g0-t0",
      "s3-g0-t2",
      "s1-g5-t0"
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Transport identity",
        "question": "Does permitting TCP port 89 demonstrate that OSPFv2 control packets are admitted?",
        "answer": "No.",
        "explanation": "OSPFv2 uses IP protocol 89, not a TCP/UDP port; actual packet admission still needs context.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Process versus area",
        "question": "Must the local OSPF process numbers match between two directly connected routers?",
        "answer": "No.",
        "explanation": "They are local identifiers; compatible area/Hello/authentication/network context and unique domain RIDs matter.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Source-specific probe",
        "question": "Why can a router-to-server ping succeed while the original client-to-server exchange still lacks proof?",
        "answer": "It can use a different source and return selection and it does not test the original application.",
        "explanation": "Test the actual incident endpoints and operation rather than promoting a control probe into service evidence.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Incident scope",
        "question": "A user reports one failed client-to-server transaction. Which initial record best prevents a misleading router-only diagnosis?",
        "answer": "Original endpoints/source, operation, table/VRF, observers, time and affected scope.",
        "explanation": "Router-sourced control probes can use different source/return requirements; record the actual incident before narrowing it.",
        "type": "multiple-choice",
        "options": [
          "Original endpoints/source, operation, table/VRF, observers, time and affected scope.",
          "Only the DR priority on one router.",
          "Only a screenshot showing one Full neighbor.",
          "Only the local OSPF process number."
        ],
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q01"
      },
      {
        "difficulty": "Beginner",
        "testedConcept": "Unicast versus OSPF acceptance",
        "question": "Two interface addresses answer a unicast ping, but no OSPF neighbor appears. What does that ping fail to establish?",
        "answer": "It does not prove valid OSPF Hello transmission/acceptance or protocol-89 admission.",
        "explanation": "Inspect enabled/passive state, attachment, compatibility and actual packet/acceptance evidence on both sides.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Init interpretation",
        "question": "A persistent Init view receives a peer Hello. Which additional Hello evidence is relevant to bidirectional discovery?",
        "answer": "Whether the local RID appears in received peer Hello neighbor fields, with acceptance evidence in both directions.",
        "explanation": "Init is not a unique root-cause diagnosis and does not by itself prove an MTU mismatch.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Expected pair",
        "question": "R3 and R4 are DROthers, 2-Way with one another and Full with DR/BDR; their direct peer probes work. Which action fits the retained broadcast checkpoint?",
        "answer": "Keep the expected pair and verify the original service separately; no adjacency fault is demonstrated.",
        "explanation": "Broadcast DROthers do not need Full with every other DROther to use a direct installed path.",
        "type": "multiple-choice",
        "options": [
          "Keep the expected pair and verify the original service separately; no adjacency fault is demonstrated.",
          "Clear every OSPF process until all six pairs are Full.",
          "Make DR the next hop for all user traffic.",
          "Raise R3 priority to force an immediate preemptive election."
        ],
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q04"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Exchange evidence",
        "question": "Why should a persistent ExStart/Exchange state and a small successful ping lead to MTU/DBD/transport investigation rather than an automatic mtu-ignore command?",
        "answer": "The state is not a unique cause, and the small probe does not prove larger exchange-packet viability.",
        "explanation": "Compare actual interface/advertised DBD MTU, negotiation/sequence and acceptance evidence; preserve the supported path design.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Branch versus backbone",
        "question": "ABR branch area is 1, R3 branch area is 2, backbone remains Full and opposite-LAN calculations vanish. What is the bounded demonstrated correction in this owned fixture?",
        "answer": "Restore only R3 branch membership to its documented area 1, then recheck branch/backbone state, routes and both endpoint directions.",
        "explanation": "Carrier and backbone health do not make the incompatible branch areas valid. Do not change the entire backbone or unrelated area types.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Independent forwarding",
        "question": "Both neighbors remain Full and remote router routes are installed, but owned R2 forwarding is zero and endpoint probes fail. Which verified recovery fits this fixture?",
        "answer": "Restore the owned forwarding flag and verify the documented protocol/route/probe conditions.",
        "explanation": "Clearing OSPF does not fix the disabled forwarding mode; Linux flag reversal is not proof that every custom sysctl or application was restored.",
        "type": "multiple-choice",
        "options": [
          "Restore the owned forwarding flag and verify the documented protocol/route/probe conditions.",
          "Clear OSPF and declare recovery from the next Full display.",
          "Lower OSPF cost until the endpoint route becomes a connected route.",
          "Redistribute every connected interface and skip the endpoint probes."
        ],
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Return and packet-arrival limits",
        "question": "The server remote route is absent and a client request/reply probe fails. Does this retained fault evidence prove the request packet reached the server?",
        "answer": "No; failed request/reply and route records do not supply an arrival capture.",
        "explanation": "The known endpoint-route intervention and exact restoration explain the fixture without inventing observed packet arrival.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Calculation versus installation",
        "question": "OSPF calculates a prefix, but another source is selected for that exact prefix. Which evidence should be reviewed before changing OSPF link cost?",
        "answer": "The actual table/VRF, same-prefix competing candidates and local installation preference, then destination longest-prefix lookup.",
        "explanation": "OSPF path cost and administrative distance serve different decisions; a calculated candidate is not automatically installed.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recovery closure",
        "question": "After a fault reversal, Full neighbors return. What additional closure evidence is needed for an original endpoint traffic incident?",
        "answer": "Relevant calculated/selected paths and lookup, endpoint return/forwarding conditions, original two-direction exchange and the original service when tested, plus baseline/cleanup comparison.",
        "explanation": "Full alone cannot certify forwarding, application recovery or preservation of unrelated state. Record untested conditions honestly.",
        "type": "short-answer",
        "topicId": "s3-g1-t4",
        "questionId": "s3-g1-t4-Q10"
      }
    ],
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
    "commands": [
      {
        "code": "show version\nshow running-config\nshow logging",
        "explanation": "Preserve release, intended configuration and time-related logs before any correction.",
        "expected": "GUIDED, NOT EXECUTED: Read only in the prepared authorized lab; configuration/logs can contain sensitive metadata. Retain router/process/table/observer context and the incident boundary. No debug, reload, save or global clear is requested.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip protocols\nshow ip ospf\nshow ip ospf interface\nshow ip ospf neighbor",
        "explanation": "Compare intended activation and actual neighbor/interface context on both peers.",
        "expected": "GUIDED, NOT EXECUTED: Record local process, RID, area, enabled/passive state, timers, intended network type and current roles. Local process numbers need not match between routers. Interpret required versus expected 2-Way pairs rather than counting every non-Full as a fault.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show interfaces GigabitEthernet1/0/1\nshow ip ospf interface GigabitEthernet1/0/1",
        "explanation": "Inspect the prepared lab transit attachment and actual MTU/OSPF parameters.",
        "expected": "GUIDED, NOT EXECUTED: Substitute the real authorized transit interface if the prepared topology uses another name. Carrier/counters/MTU and OSPF parameters narrow the next check; they do not identify a unique cause or prove DBD acceptance. No mtu-ignore or interface configuration is applied.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf database router\nshow ip ospf database network\nshow ip ospf database summary",
        "explanation": "Inspect applicable local-area topology and summary reachability.",
        "expected": "GUIDED, NOT EXECUTED: Keep process/area/type/ID/advertiser and body mask/lifecycle context. Point-to-point topology has no DR network LSA; foreign-area router LSAs need not appear. Presence or newer headers do not prove usable calculated/installed paths.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip route 198.51.100.20\nshow ip route 192.0.2.10\nshow ip cef 198.51.100.20\nshow ip cef 192.0.2.10",
        "explanation": "Compare destination installation/lookup and both direction requirements in the prepared routing table.",
        "expected": "GUIDED, NOT EXECUTED: Record the observer/table and actual matched prefix, source, next hop and interface. Compare calculated OSPF candidates separately; table/CEF displays are not an original-source packet capture, hardware or service guarantee. Prepared endpoint routes and original traffic still need inspection.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "show ip ospf neighbor detail",
        "explanation": "Inspect the relevant peer state, adjacency duration and detailed exchange context after scoping the pair.",
        "expected": "GUIDED, NOT EXECUTED: Inspect on both peers and compare the intended relationship. Persistent exchange/loading branches require supported request/retransmission/packet/log evidence beyond this display. No state-specific fault was injected on Cisco and no automatic diagnosis is claimed.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Prepare the same pinned private FRR runtime used by the actual experiments.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured APT indexes/repositories and supporting libraries. Use the printed extracted root; missing pinned packages fail. No maintainer scripts or system service are installed. This is another reference to the same prepared environment.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-routing.sh --run",
        "explanation": "Run the reviewed owned experiment sequentially after reading inert help and requirements.",
        "expected": "ACTUAL FRR/LINUX: Actual passive-transit, owned forwarding-disabled and endpoint-return-route faults, exact restoration, raw probes and normal/four interrupted cleanup boundaries. Substitute the cache root printed by preparation for another account. Root network/mount capability and documented capture tools are required. Only owned resources are changed/removed. No actual Cisco, MTU/Init/Loading/authentication fault injection, application transaction, hardware, zero-loss or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-areas.sh --run",
        "explanation": "Run the reviewed owned experiment sequentially after reading inert help and requirements.",
        "expected": "ACTUAL FRR/LINUX: Actual branch area mismatch with preserved backbone/carrier and exact recovery of scoped routes/traffic. Substitute the cache root printed by preparation for another account. Root network/mount capability and documented capture tools are required. Only owned resources are changed/removed. No actual Cisco, MTU/Init/Loading/authentication fault injection, application transaction, hardware, zero-loss or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      },
      {
        "code": "FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-dr-bdr.sh --run",
        "explanation": "Run the reviewed owned experiment sequentially after reading inert help and requirements.",
        "expected": "ACTUAL FRR/LINUX: Actual healthy DROther 2-Way, staged role/reset/rejoin history, current network LSA and independent direct forwarding/capture. Substitute the cache root printed by preparation for another account. Root network/mount capability and documented capture tools are required. Only owned resources are changed/removed. No actual Cisco, MTU/Init/Loading/authentication fault injection, application transaction, hardware, zero-loss or convergence benchmark is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ]
  },
  {
    "id": "s3-g2-t0",
    "batch": "09",
    "title": "EIGRP",
    "subtitle": "Follow neighbor advertisements through feasible choices, installed routes and the original exchange.",
    "level": "Intermediate → Advanced",
    "minutes": 70,
    "definition": "Enhanced Interior Gateway Routing Protocol is an interior distance-vector routing protocol whose route computation uses DUAL, the Diffusing Update Algorithm. Routers exchange reachability and metric information with compatible neighbors; they do not flood an OSPF-style area link-state database or run the lesson’s earlier SPF graph. RFC 7868 describes the design as an informational Independent Submission, not an Internet Standards Track specification. Publication of the design is not proof of feature parity or interoperability across every implementation. This lesson joins protocol reasoning to actual isolated IPv4 FRR observations, while keeping supplied-distance exercises and guided Cisco configuration distinct.",
    "purpose": "EIGRP can distribute internal reachability across a supported routing domain, react to changed paths and maintain alternate information. Use it when its platform support, address-family design, operational ownership and route-policy boundaries fit the network. An established neighbor is one control-plane relationship; a computed successor is one protocol choice; an installed route is a local forwarding candidate; successful service still depends on the full path and return. Learn those boundaries before adjusting metrics, adding redistribution or clearing sessions. The following original metrics, neighbors and topology nodes deepen these subjects without replacing this protocol overview.",
    "mental": "Imagine neighbors sending distance quotations for one destination. Your local path calculation includes reaching the neighbor; their quotation describes the remaining distance. A historical threshold lets the router recognize some immediately safe choices without asking the entire dependency chain to reconsider. A quotation that fails the threshold is not automatically fraudulent or looping; it needs further coordinated computation before use under that rule. The quotation analogy does not compute real interface metrics, emulate DUAL queries/replies, advance feasible-distance history or prove a physical forwarding path.",
    "components": [
      "Routing scope: Address family, AS, local instance/mode, table/VRF and intended interfaces. EIGRP AS compatibility is unlike OSPF’s purely local process number; do not import the OSPF rule here.",
      "Neighbor discovery and transport: Hellos, advertised hold time, compatible metric coefficients and supported authentication/packet admission. Reliable exchanges have sequence/acknowledgment state; discovery Hellos are not TCP sessions.",
      "Per-prefix topology information: Reachability and distances learned from neighbors, local successors and eligible feasible alternatives. This is not a shared area-wide OSPF LSDB.",
      "DUAL state and distance history: PASSIVE is a settled route-computation state; ACTIVE waits on a coordinated computation. RD, current total distance and historical FD answer different questions.",
      "Installation and data plane: Protocol choices compete for the exact prefix in a local RIB; installed lookup, next-hop resolution, forwarding enable and policy must be checked separately.",
      "Original endpoint exchange: Client/server addresses, source-specific routes, return path and actual operation. Bounded ICMP proves only the tested request/reply, not an application transaction."
    ],
    "mechanism": [
      "Start with one intended routing domain and address family. The classic IPv4 configuration selects local interfaces by matching their addresses with network statements; it is not a BGP-style instruction that merely originates any matching route from the table. The included local network can then be advertised under the process’s routing rules. Network selection does not configure an interface address, enable host forwarding everywhere, or redistribute arbitrary static and external routes. Confirm actual interface activation and prefix scope from both configuration and operational evidence.",
      "Compatible peers need an operational shared attachment, appropriate address-family context, matching EIGRP AS and metric coefficients, plus supported compatible authentication and packet admission when configured. AS alone is not authorization. A named Cisco virtual-instance label is local configuration organization; its address-family AS still defines the relevant peering scope. Do not demand identical local instance names or copy OSPF area/DR concepts into EIGRP. Review unique router identities and supported mode before bringing up an owned process.",
      "A discovery Hello advertises metric coefficients and the sender’s hold time. The receiver maintains neighbor liveness from accepted traffic. Hello/hold values are not an OSPF-style pair that must be equal on both peers to form a relationship. Different values can still create poor or asymmetric detection behavior, so inspect both sides and design them deliberately. The actual lab does not certify requested custom timers: a rejected trial failed to demonstrate them in retained configuration/interface output. Defaults and display fields must be verified for the particular implementation.",
      "EIGRP uses its own reliable transport over IP. Updates and coordinated queries/replies use sequencing and acknowledgments; retransmissions and queue information help investigate delivery. Periodic discovery Hellos are unsequenced and unacknowledged. An ACK uses the Hello-format opcode with an acknowledgment field, so opcode 5 alone is not proof of a periodic discovery Hello. Startup exchange differs from steady-state incremental updates: after initialization, changes are propagated as needed rather than repeatedly sending an entire table on a periodic schedule. The retained lab headers corroborate Hellos, sequenced updates and ACK-bearing packets, not every reliable-transport branch.",
      "For one ordinary internal destination, reported distance RD is the neighbor’s advertised distance. The local total is the path measure through that neighbor including local attachment effects. Feasible distance FD retains the least-known total since the most recent ACTIVE-to-PASSIVE transition; it is not necessarily the currently selected total. It can decrease when a lower total is learned while settled. Do not overwrite history with a more expensive successor’s current total. Actual classic/wide metrics and their units need implementation-specific interpretation; worksheet numbers are supplied distances, not calculated bandwidth/delay measurements.",
      "The feasibility condition compares the neighbor’s RD strictly below the local historical FD. Equality fails. Within a settled computation this sufficient condition supports immediately safe local choices, including eligible alternate successors. It is sufficient, not necessary: a route that fails the condition may still be loop-free. A successor is a chosen best next hop under the applicable algorithm; a feasible successor is a qualifying alternative, not a promise that it has already been installed or that traffic can never be lost. The worksheet first checks feasibility then ranks eligible supplied totals for its explicitly bounded local decision.",
      "If the current successor is lost and an eligible feasible alternative exists, a local replacement can avoid a new diffusing computation for that destination. If no feasible alternative is available, DUAL may enter ACTIVE and query dependencies, await replies and eventually settle into PASSIVE with updated history. ACTIVE does not mean the route is healthy or actively forwarding; PASSIVE does not disable the interface. Stuck-in-active investigation requires reply/dependency, transport and resource evidence, not a blind process clear. The worksheet stops at computation-needed; it sends no queries, models no timers and does not claim unreachable solely from a failed feasibility check.",
      "Interpret protocol and routing records independently. Neighbor tables describe peer relationships. The EIGRP topology table retains per-prefix calculations and alternatives; all-links views can show paths failing feasibility. A local connected EIGRP candidate may appear there while the connected route remains the selected RIB/kernel path. The actual remote internal paths have administrative distance 90 and active FIB next hops. That observed local source preference is not the EIGRP metric, a cross-protocol quality score or a per-packet longest-prefix rule. Compare exact prefixes during installation and longest matching installed prefixes during forwarding.",
      "The actual lab uses two AS 100 routers with one transit path. R1 advertises its 192.0.2.0/24 LAN and R2 its 198.51.100.0/24 LAN through the 203.0.113.0/30 transit. Each remote prefix is PASSIVE with one successor. Both EIGRP RIB and independent kernel records show installed remote next hops, and the original client/server ICMP exchanges work in both directions. There are no endpoint EIGRP peers, but that absence does not prove the LAN interfaces are passive. This fixture does not perform redistribution, multipath or an alternate-successor switchover.",
      "Setting only R1’s owned transit attachment down removes established peer entries and remote installed kernel paths after bounded waiting. Local gateways still respond while both remote endpoint exchanges fail. An inactive protocol candidate can remain in the RIB or topology; its presence does not mean forwarding remains installed. Restoration has two explicit steps: link up, then reinitialization of both owned eigrpd children using unchanged configurations. The runner records link-restored separately from recovered. A retained link-only trial did not complete recovery, so the passing combined procedure cannot prove link restoration alone was sufficient.",
      "Close with the original traffic and owned baseline. Confirm both established peer views, remote topology, selected installed paths, kernel next hops and source-specific request/reply after the documented repair. The independent verifier compares recovered running configurations exactly to baseline and checks normal plus five interrupted cleanup paths against host state. It does not benchmark convergence, certify zero packet loss, inspect production hardware or prove a TCP/TLS/application operation. A read-only browser choice does not run this lab or mutate a router."
    ],
    "flow": [
      [
        "Bound the domain and establish peers",
        "Check family/table, AS, interface activation, compatible coefficients and actual accepted exchange."
      ],
      [
        "Compare distance information",
        "Keep neighbor RD, supplied/current total and historical FD separate; apply strict RD < FD."
      ],
      [
        "Choose locally or coordinate",
        "Use a qualified local alternative when available; otherwise ACTIVE query/reply work is outside the worksheet."
      ],
      [
        "Verify installation and the original exchange",
        "Compare topology, selected RIB, independent forwarding path and return before declaring the tested traffic recovered."
      ]
    ],
    "comparison": [
      [
        "EIGRP / OSPF",
        "Distance-vector with DUAL / link-state with SPF",
        "No EIGRP OSPF area LSDB or broadcast DR election."
      ],
      [
        "AS / named instance label",
        "Relevant peering scope / local configuration label",
        "AS must match; local instance labels need not."
      ],
      [
        "RD / local total / FD",
        "Neighbor quotation / current path measure / historical lower bound",
        "A new current total does not automatically raise FD."
      ],
      [
        "PASSIVE route / passive interface",
        "Settled DUAL computation / suppressed neighbor exchange on an attachment",
        "Do not infer one from the other."
      ],
      [
        "Feasible alternative / installed path",
        "Qualifying algorithm information / selected usable lookup",
        "Eligibility and retained topology are not forwarding proof."
      ],
      [
        "Reliable UPDATE / discovery Hello",
        "Sequenced acknowledged exchange / unsequenced liveness discovery",
        "ACK also uses Hello-format opcode; inspect header fields."
      ],
      [
        "Classic / named configuration",
        "AS router context / local instance plus address-family context",
        "Confirm target syntax, capabilities and metric mode."
      ],
      [
        "Worksheet / actual lab",
        "Supplied three-neighbor distances / single-transit FRR observations",
        "Neither evidence set validates the other’s unexecuted behavior."
      ]
    ],
    "example": "The authored worksheet declares completed historical FD 100. A reports RD 80 with supplied total 100, B reports 90 with total 140, and C reports 100 with total 120. A is the baseline local choice. Remove only A’s availability: B qualifies because 90 < 100; C fails because 100 is not below 100, despite its cheaper total. Selecting B does not change the supplied FD to 140. If only C remains, the result is computation-needed, not proven looping or unreachable. A separate completed-history case supplies FD 120 and then C can qualify. Those arbitrary units and alternate paths are not measurements from the actual two-router lab, whose single remote successor has observed metric 30720 in this build. The real attachment fault and combined link/restart recovery supply separate peer/route/probe evidence.",
    "commands": [
      {
        "code": "show version\nshow running-config\nshow startup-config\nshow ip protocols",
        "explanation": "Preserve release, active/saved intent, AS and routing policy before optional changes.",
        "expected": "GUIDED, NOT EXECUTED: prepared isolated supported devices with independent management and authorized scope. Inspect feature/license/mode and actual addresses before using AS 100; configuration may contain sensitive metadata. No global save, debug or clear is requested.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp neighbors\nshow ip eigrp interfaces\nshow ip eigrp topology all-links",
        "explanation": "Compare peer/interface activation with per-prefix topology, including nonfeasible retained information.",
        "expected": "GUIDED, NOT EXECUTED: read both prepared devices and retain observer, AS/family/table, prefix, next hop, route state and distances. PASSIVE refers to the route, not an interface setting. Queue/hold output is a snapshot, not a measured convergence guarantee.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip route 198.51.100.20\nshow ip route 192.0.2.10\nshow ip cef 198.51.100.20\nshow ip cef 192.0.2.10",
        "explanation": "Trace original destinations through selected routing and forwarding lookup in the prepared table.",
        "expected": "GUIDED, NOT EXECUTED: destination lookup can select a more-specific prefix than the expected EIGRP LAN route. Record actual source preference, matched prefix, gateway/interface and return scope. Table/CEF output alone does not prove endpoint or application traffic.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter eigrp 100\nnetwork 203.0.113.1 0.0.0.0\nnetwork 192.0.2.1 0.0.0.0\nend\nshow ip eigrp interfaces",
        "explanation": "R1-only classic IPv4 activation for its prepared transit and LAN addresses.",
        "expected": "GUIDED, NOT EXECUTED: AS 100 must be absent and reserved for this disposable branch; Layer 3 routing, actual interface addresses, supported classic mode and policy must already be prepared. Exact-host wildcard matching selects the local interface; it does not advertise a /32 instead of the interface subnet. LAN is active in this basic branch, so isolate it from untrusted peers; reviewed supported passive-LAN policy is required before a production design.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter eigrp 100\nnetwork 203.0.113.2 0.0.0.0\nnetwork 198.51.100.1 0.0.0.0\nend\nshow ip eigrp neighbors",
        "explanation": "R2-only companion activation with the same prepared AS and its distinct local addresses.",
        "expected": "GUIDED, NOT EXECUTED: match intended AS, metric coefficients and supported authentication/admission; confirm exact address/interface ownership on R2. Network commands do not configure host routes or redistribute static routes. This branch changes neither metrics nor timer values and does not certify passive LANs.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nno router eigrp 100\nend\nshow ip protocols\nshow ip route",
        "explanation": "Remove the entire newly introduced classic process only in the recorded disposable branch.",
        "expected": "GUIDED, NOT EXECUTED: apply separately on R1 and R2 only if their baseline proved AS 100 absent and no unrelated configuration was added under it. Otherwise reconcile exact owned statements against the recorded prior process instead. Recheck original nonlab management and route state; no global routing disable, table flush, reload or save.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction",
        "explanation": "Prepare the shared pinned FRR runtime without installing a global routing service.",
        "expected": "ACTUAL PACKAGE PREPARATION: use the printed private extracted root. The configured authenticated APT indexes and supporting libraries must be available; pinned missing packages fail. No maintainer scripts or system service are installed. This is a reference to the shared previously verified extraction."
      },
      {
        "code": "bash labs/eigrp-routing.sh\nFRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/eigrp-routing.sh --run",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution",
        "explanation": "Read inert help first; explicitly run the owned two-router experiment with the cache root printed by preparation.",
        "expected": "ACTUAL FRR/LINUX: both AS 100 peers, remote PASSIVE topology, selected RIB/kernel paths, raw bidirectional endpoint probes and startup Hello/UPDATE/ACK headers. Owned transit-down fault withdraws installed paths; recovery explicitly restores the link and restarts both owned eigrpd children with unchanged configuration. Normal/five interrupted cleanup paths preserve independent host baseline. No alternate successor, custom metric/timer/passive configuration, active/query/SIA, Cisco, IPv6, application, hardware, zero-loss or convergence execution is claimed."
      }
    ],
    "configuration": "Keep classic and named configuration contexts separate. The guided branch selects two local interface addresses per router in an owned new classic AS 100; a Cisco named instance instead has its own address-family AS and interface/topology submodes. Do not paste classic commands into those submodes or assume the local instance name must match remotely. Confirm actual license/release, table/VRF, address family, unique identities, endpoint addressing/routes, forwarding, packet admission and independent management. Review supported passive-LAN policy and authentication before any production activation. The isolated basic guided branch has active LANs and is not a production security template. The FRR script uses explicit unique RIDs and CIDR network selection, not Cisco wildcard syntax; Linux and Cisco command forms are not interchangeable. Record baseline before mutation. Whole-process rollback is appropriate only for the explicitly new owned absent-AS branch; preserve and restore existing process configuration statement by statement otherwise. Actual cleanup removes introduced namespaces/processes/private mounts and paths after bounded owned shutdown, preserving the independent host baseline. The browser never runs commands or saves device configuration.",
    "ports": "EIGRP transport: IP protocol number 88 for IPv4/IPv6 context, not TCP or UDP port 88. Actual control-plane admission and supported packet format are separate from ICMP reachability. Discovery multicast: 224.0.0.10 for IPv4 and FF02::A for IPv6 on applicable enabled attachments. Reliable exchanges can also use unicast; multicast alone is not every EIGRP destination. Header interpretation: Observed opcode 5 with sequence 0/ack 0 is discovery Hello; opcode 1 with nonzero sequence is UPDATE; opcode 5 with nonzero ack carries acknowledgment. Captured AS is 100. Address-family boundary: The actual runner and guided configuration here are IPv4. IPv6 activation, link-local scope, router identity and target mode require separate supported configuration and verification; IPv4 success proves none of them. Timing and probes: Inspect actual advertised hold and effective configuration rather than importing OSPF timer equality. The owned lab retains numeric bounded IPv4 ICMP ping exit/output; it provides no application-port test or timer benchmark.",
    "production": "Document where EIGRP is intended to form peers, which prefixes cross boundaries and who owns the domain. Constrain neighbor-facing attachments and route policy; review passive LANs, supported authentication/key lifecycle, summaries, stub/query boundaries and redistribution as explicit designs. Defaults and licensing vary by product/release. A summary can alter query scope and create a local discard dependency, so design covered reachability and failure behavior before deploying it. Redistribution needs loop/policy and metric planning rather than adding every connected route. Classic/named modes and metric precision can affect operational interpretation; publication of RFC 7868 does not certify FRR/Cisco feature parity. Use the next dedicated original topics for detailed metric, neighbor and topology work. During incidents preserve actual observer/time, topology history, route selection and original traffic rather than repeatedly clearing peers.",
    "troubleshooting": [
      [
        "No expected peer",
        "Compare both AS/family/table and effective interface activation, physical/IP attachment, supported coefficient/authentication settings and protocol-88 packet admission. Check actual accepted Hello/update exchange; a successful unicast ping or matching AS alone is insufficient."
      ],
      [
        "Flapping peer or persistent queue",
        "Correlate hold/uptime, retransmission/queue, link counters, acceptance and logs from both observers. Investigate transport/resource/policy before lowering timers or clearing the process; one snapshot is not a diagnosis."
      ],
      [
        "Topology exists but selected route is absent",
        "Inspect the exact prefix, route state, usable neighbor and competing local sources, policy and next-hop context. Retained inactive/nonfeasible information is not an installed path; do not confuse kernel priority with the EIGRP metric."
      ],
      [
        "No feasible alternate",
        "Reconstruct current RD, local total and actual historical FD. Equality fails the strict sufficient condition. Coordinated ACTIVE query/reply work may be needed; absence of a feasible successor does not prove a physical loop."
      ],
      [
        "Installed routes but original traffic fails",
        "Check longest matching lookup, namespace/device forwarding, resolution/policy, actual endpoint routes and return traffic. Repeat the original operation using the original source; connected gateways and router-sourced probes are controls."
      ],
      [
        "Owned attachment restoration incomplete",
        "In this FRR build the passing procedure includes both owned daemon restarts after link restoration. Retain the separate link-restored checkpoint and rejected trial; do not silently rebrand the intervention as automatic link-only convergence."
      ],
      [
        "ACTIVE or stuck-in-active",
        "Identify the destination and outstanding dependency/reply context using supported topology/log/transport evidence. Query scope, lost replies, slow links or CPU/policy issues are branches, not automatic root causes. This lab does not inject or certify an SIA recovery."
      ]
    ],
    "security": "EIGRP control messages can influence routing intent, so constrain intended neighbor attachments and supported control-plane admission. AS numbers and named labels are not secrets or authentication. Use supported compatible authentication/key rollover with actual release evidence; authentication protects protocol acceptance and does not encrypt user payloads. Passive-LAN configuration can limit neighbor formation while retaining intended network advertisement under the supported implementation, but zero peers alone is not proof it is applied. Protect management and evidence containing topology/configuration metadata. The packet capture here is limited to owned virtual transit; no production traffic, key material or untrusted LAN activation is implied. The browser uses bounded values and text-only dynamic output; invalid input hides stale results.",
    "performance": "Separate protocol work from payload forwarding. Local feasible replacement can avoid diffusing queries for that destination; missing feasible alternatives can expand query/reply dependencies and expose slow or unstable links. Churn, table size, queue/retransmissions and CPU matter, as do actual forwarding capacity and service latency. Carefully designed query boundaries, summaries and supported stubs can reduce scope; they are not proven by this two-router fixture. Classic bandwidth/delay metrics are path-selection inputs, not measured application throughput, and changing bandwidth metadata does not physically upgrade a link. No metric formula, variance/unequal-cost installation, packet-loss-free switchover or convergence-duration benchmark runs in the worksheet. Both path ties and conditional declarations stop before hardware/service claims.",
    "mistakes": [
      "Calling EIGRP an OSPF-like link-state protocol or treating informational RFC publication as an Internet Standard/feature certification.",
      "Treating AS as a purely local OSPF process number, or requiring named instance labels to match.",
      "Opening TCP/UDP port 88 instead of examining IP protocol 88 admission.",
      "Reading every opcode-5 packet as discovery Hello without its acknowledgment field.",
      "Replacing historical FD with the current more expensive successor total, or accepting RD equal to FD.",
      "Calling every nonfeasible path looping/unreachable, or calling ACTIVE a desirable forwarding state.",
      "Confusing PASSIVE topology with a passive interface, or inferring passive LANs from zero peers.",
      "Promoting retained topology/RIB candidates or route-table output into actual endpoint/application proof.",
      "Presenting the combined link/restart repair as automatic link-only convergence or a universal production workaround.",
      "Pasting Cisco wildcard/named/interface commands into FRR, claiming rejected timer/metric settings were applied, or broadly deleting an existing process."
    ],
    "prerequisites": [
      "s1-g4-t0",
      "s3-g0-t0",
      "s3-g1-t0"
    ],
    "related": [
      "s3-g2-t1",
      "s3-g2-t2",
      "s3-g2-t3",
      "s3-g1-t4",
      "s3-g3-t0"
    ],
    "interactive": "eigrp",
    "artifacts": [
      {
        "title": "Owned EIGRP runner",
        "path": "labs/eigrp-routing.sh"
      },
      {
        "title": "Pinned private FRR preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Separate supplied feasibility decisions from actual single-path peer/route/traffic evidence, explain the owned fault and explicit combined recovery, and retain cleanup evidence.",
      "requirements": "Browser worksheet needs no router. Actual work needs Ubuntu 24.04 amd64, root network/mount capabilities, privately extracted pinned FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/timeout/getent/TShark. Guided Cisco branch requires two prepared supported isolated Layer 3 devices, unused AS 100 and independent management.",
      "topologyKind": "shared",
      "topology": [
        "Client 192.0.2.10/24 ↔ R1 LAN 192.0.2.1",
        "R1 203.0.113.1/30 ↔ R2 203.0.113.2/30 · AS 100",
        "R2 LAN 198.51.100.1 ↔ Server 198.51.100.20/24",
        "Separate worksheet: A/B/C supplied distances for one prefix"
      ],
      "steps": [
        "Select baseline, successor-lost and equality cases. Explain each RD/total/FD comparison before reading the trace. Keep FD 100 while B becomes the local choice with total 140; do not invent an FD reset.",
        "Try no-path, tie and separately supplied new-history cases. Distinguish no available advertisement, computation-needed and tied candidate choices. No case executes coordinated queries or verifies installed ECMP.",
        "Toggle RIB, forwarding and return declarations separately. Explain why an eligible local candidate does not make the conditional chain complete; reset restores baseline without affecting learner progress.",
        "Read/download both scripts and inert runner help. Prepare the pinned private runtime, substitute its printed root, execute the explicit owned --run branch sequentially and retain actual baseline records.",
        "Compare both peer/interface/configuration views, remote PASSIVE successor entries, selected active RIB/FIB and independent kernel gateways. Retain original endpoint raw ping targets, exits and output in both directions.",
        "Inspect startup capture fields: both multicast Hellos, sequenced UPDATE and acknowledgment-bearing Hello-format records with IP protocol 88/AS 100. Do not infer an active/query or authentication experiment from these headers.",
        "At owned transit-down checkpoint verify lost peer entries, absent remote kernel paths, failed endpoint exchanges and working local gateways. Explain why an inactive RIB candidate is not installation proof.",
        "Separate link-restored from recovered. The latter follows explicit restart of both owned eigrpd children with unchanged configuration; verify recovered peer/route/probe records and exact baseline configuration comparison.",
        "Confirm normal cleanup and five interruption cases against independent host links/routes/forwarding/group/mount/process/temp/namespace/service baseline. Optional Cisco changes follow only the recorded absent-AS branch and are guided/unexecuted here."
      ],
      "verification": "Expected evidence is actual peers and AS, per-prefix route state/distances, selected active RIB paths and independent kernel next hops, raw original-source ICMP both directions, startup packet headers and exact configuration before/after. Twelve actual categories plus five interruption boundaries, 34,816 independently evaluated supplied-distance/declaration combinations and nine authored cases have separate reports. Actual fixture has one transit path and proves no alternate switchover or application operation.",
      "troubleshooting": "If observations disagree, first compare experiment, observer, phase and what the field measures. Effective running configuration outranks requested settings. Preserve rejected passive/timer and link-only trials; do not repeat unsupported configuration or manually restart unrelated system routers. Invalid worksheet input must hide stale output and keyboard reset must work.",
      "challenge": "With FD 100 and only C=(RD 100,total 120) available, explain why coordinated computation is needed without proving a loop. Then identify exactly which recovered actual records demonstrate the combined repair and which missing observations prevent a link-only, IPv6 or application claim.",
      "cleanup": "Reset returns supplied worksheet baseline; it does not change router state or learner progress. Actual runner reaps only tracked owned daemons/capture and removes owned namespace/mount/temp paths after bounded identity-checked shutdown. Optional whole-process Cisco removal requires the recorded absent-AS/new-owned-process baseline on each device; preserve unrelated state and management."
    },
    "glossary": {
      "AS": "Autonomous-system identifier relevant to EIGRP peering/routing scope; not an authentication secret.",
      "DUAL": "Diffusing Update Algorithm for distance-vector route computation with local feasibility and coordinated dependency work.",
      "RD": "Neighbor-reported distance to the destination.",
      "Current total": "Local path distance through a particular neighbor including attachment effects.",
      "FD": "Historical least-known total since the latest ACTIVE-to-PASSIVE transition; not necessarily today’s best total.",
      "Successor": "Chosen best next-hop path under the applicable EIGRP calculation.",
      "Feasible successor": "Qualifying alternate satisfying the strict local feasibility condition under the relevant settled context.",
      "PASSIVE": "Route state with no diffusing computation in progress; unrelated to passive-interface intent.",
      "ACTIVE": "Route state involving an outstanding coordinated computation.",
      "RTP": "EIGRP reliable transport with sequencing/acknowledgment; not TCP.",
      "SIA": "Stuck-in-active condition requiring dependency/reply and transport/resource investigation.",
      "Named instance": "Local configuration organization containing address-family AS and supported interface/topology contexts."
    },
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Transport",
        "question": "Would permitting UDP port 88 admit EIGRP control packets by itself?",
        "answer": "No.",
        "explanation": "EIGRP uses IP protocol 88; the UDP port field is a different identifier.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Route versus interface",
        "question": "Does a PASSIVE EIGRP topology entry mean the router stopped Hellos on that attachment?",
        "answer": "No.",
        "explanation": "PASSIVE is settled route computation; passive interface is a separate configuration.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Historical threshold",
        "question": "If B becomes the worksheet choice with total 140 after A fails, does the supplied historical FD 100 automatically become 140?",
        "answer": "No.",
        "explanation": "This frozen exercise does not advance history; a more expensive current choice does not automatically raise historical FD.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Classification and publication",
        "question": "Which description fits EIGRP and RFC 7868?",
        "answer": "Distance-vector with DUAL; an informational RFC, not an Internet Standards Track specification.",
        "explanation": "A published design does not certify implementation feature parity.",
        "type": "multiple-choice",
        "options": [
          "Distance-vector with DUAL; an informational RFC, not an Internet Standards Track specification.",
          "An OSPF area link-state protocol running SPF with a Standards Track RFC.",
          "A TCP application whose AS is its destination port.",
          "A protocol that must periodically flood the entire route table to every network."
        ],
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "AS and local label",
        "question": "Two intended peers use AS 100 in their address families but different local named instance labels. Is label equality the missing EIGRP compatibility requirement?",
        "answer": "No; the local labels need not match, while the relevant AS and other compatibility/admission conditions must.",
        "explanation": "Matching AS alone is not enough; verify family, activation, coefficients, supported authentication and packet acceptance.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Interface selection",
        "question": "In R1’s guided classic branch, what does network 203.0.113.1 0.0.0.0 select?",
        "answer": "The local interface whose address matches 203.0.113.1, not a requirement to advertise that interface subnet as a /32.",
        "explanation": "The wildcard selects interface participation; it does not assign addresses or redistribute arbitrary routes.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "ACK identity",
        "question": "An actual packet has IP protocol 88, opcode 5, sequence 0 and a nonzero acknowledgment. Why is calling it a periodic discovery Hello incomplete?",
        "answer": "It carries an acknowledgment using Hello-format opcode; the acknowledgment field distinguishes it from the unacknowledged discovery record.",
        "explanation": "Opcode alone omits the reliable-exchange context retained by the capture.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q04"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Feasible local choice",
        "question": "FD is 100; A is unavailable, B has RD 90/total 140 and C RD 100/total 120. Which immediate choice does the bounded worksheet permit?",
        "answer": "B, because RD 90 is strictly below FD 100; C fails equality.",
        "explanation": "Feasibility is checked before ranking supplied totals; a cheaper nonfeasible path is not accepted by this local rule.",
        "type": "multiple-choice",
        "options": [
          "B, because RD 90 is strictly below FD 100; C fails equality.",
          "C, because the cheapest total always overrides feasibility.",
          "C, because equality satisfies RD < FD.",
          "Neither, because replacing A must immediately set FD to infinity."
        ],
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Sufficient condition",
        "question": "Only C remains advertised with RD 100 and FD 100. Does the failed feasibility condition prove C loops or the destination is physically unreachable?",
        "answer": "No; the worksheet requires coordinated computation outside its scope and proves neither claim.",
        "explanation": "The strict condition is sufficient, not necessary, for loop-free eligibility under the relevant algorithm context.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Route state",
        "question": "What is wrong with describing ACTIVE as healthy forwarding and PASSIVE as an interface that sends no Hellos?",
        "answer": "Those labels describe DUAL route-computation state; ACTIVE involves outstanding computation and PASSIVE is settled, while passive-interface intent is separate.",
        "explanation": "Neither topology state alone certifies a successful original exchange.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Retained versus installed",
        "question": "After the owned transit-down fault, an inactive EIGRP RIB candidate remains but the remote kernel path is absent. What claim is supported?",
        "answer": "The retained candidate is not an installed remote forwarding path in this checkpoint.",
        "explanation": "Inspect selected/installed and active FIB flags with independent kernel evidence; presence alone is insufficient.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recovery intervention",
        "question": "The passing actual repair restores the link then restarts both owned eigrpd children. Which recovery claim fits?",
        "answer": "The combined procedure restored the tested peer/route/ICMP evidence with unchanged configuration.",
        "explanation": "The separate rejected link-only trial prevents promoting this result to automatic link-only convergence.",
        "type": "multiple-choice",
        "options": [
          "The combined procedure restored the tested peer/route/ICMP evidence with unchanged configuration.",
          "Link up alone is proven sufficient on all EIGRP implementations.",
          "The browser performed a production process clear.",
          "A three-neighbor feasible-successor switchover ran on the single-transit topology."
        ],
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Evidence and closure",
        "question": "Both recovered EIGRP neighbors, kernel paths and endpoint pings pass. What additional evidence is needed before claiming recovery of an original TCP/TLS application incident?",
        "answer": "The original application transaction from its actual endpoints/source, with its return, policy and service context.",
        "explanation": "The owned lab tests bounded IPv4 ICMP and no application listener, production hardware or zero-loss/convergence timing.",
        "type": "short-answer",
        "topicId": "s3-g2-t0",
        "questionId": "s3-g2-t0-Q10"
      }
    ],
    "sources": [
      {
        "title": "RFC 7868: protocol design, terminology, DUAL, transport and packet fields",
        "url": "https://www.rfc-editor.org/rfc/rfc7868",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Catalyst 9300 IOS XE 17.15: EIGRP scope and configuration context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_eigrp.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Catalyst 9300 IOS XE 17.15 IP commands: router/network and EIGRP operational views",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 EIGRP: daemon preparation and implementation scope",
        "url": "https://docs.frrouting.org/en/stable-8.4/eigrpd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 EIGRP operational CLI source",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_vty.c",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 EIGRP configuration CLI source",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_cli.c",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco show ip cef command reference: destination forwarding inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch/command/isw-cr-book/isw-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g2-t1",
    "batch": "09",
    "title": "EIGRP metrics",
    "subtitle": "Keep units, vector aggregation, rounding and routing evidence on separate lines.",
    "level": "Intermediate → Advanced",
    "minutes": 70,
    "definition": "An EIGRP metric turns path-vector information into a scalar cost for the applicable routing calculation. With the common default classic coefficients, the calculation uses an inverse of the path’s minimum configured bandwidth plus accumulated outgoing interface delay, scaled by 256. These are routing metadata, not a measured application speed or round-trip time. Interpret the address family, classic/wide mode, coefficients, units, implementation rounding and route scope before comparing values. This original metrics node builds on EIGRP’s neighbor/DUAL overview; it does not replace the following dedicated neighbor and topology topics.",
    "purpose": "Metrics let a routing process distinguish paths using a shared cost convention. They are useful for explaining why a current protocol path is cheaper and for planning a bounded metric-policy change. A number alone cannot explain whether a peer is compatible, an alternate is feasible, a candidate is installed, an original endpoint has a return path or a service meets its objective. A route metric can change while physical link capacity stays fixed. Learn to reconstruct the vector and arithmetic, then compare actual routing and original traffic evidence rather than trusting a single route-table line.",
    "mental": "Use a worksheet with separate columns for the narrowest stated pipe, the sum of outgoing-link delay metadata, the neighbor’s remaining vector and the local path’s complete vector. Convert each column into the declared metric units before producing the cost. One faster pipe does not widen a different narrow pipe; two declared delays accumulate. The pipe analogy does not measure queueing, goodput or RTT, and a lower cost is not a proof that the link is actually faster. Historical FD belongs to a separate history record; the calculator does not fill it from today’s total.",
    "components": [
      "Scope and mode: one internal destination, observer, AS/address family/table and effective classic or wide calculation. Compare like units and coefficients, not unrelated protocol metrics.",
      "Bandwidth vector: the minimum configured outgoing-link bandwidth along the modeled path, in kbps. It is not the sum of capacities or the result of a throughput test.",
      "Delay vector: cumulative outgoing interface delay metadata. Classic input units are ten microseconds; operational interface output can display microseconds, so retain the unit label.",
      "Coefficient branch: K1 and K3 commonly equal 1, with K2/K4/K5 zero. The K5-zero reliability multiplier is 1; naively multiplying the default metric by zero is wrong.",
      "Neighbor RD and local total: apply the same declared convention to the neighbor’s remaining path and the complete local vector. Neither arithmetic result reconstructs historical FD.",
      "Implementation and installation: integer quantization, wide precision, saturation/sentinel context, RIB scaling and selected/installed routes are separate questions. The browser shows ordinary bounded arithmetic only."
    ],
    "mechanism": [
      "Name the actual observer, destination, AS/family/table and metric mode before reading numbers. Preserve coefficients and actual interface/topology output. For ordinary internal routes, the advertised vector supplies the neighbor’s path information; local extension adds the applicable outgoing attachment effects. External routes and seed/redistribution policy require their own context. Administrative distance is local same-prefix source preference, not this composite cost or an alternative to longest-prefix forwarding. A Linux kernel priority field is also not the EIGRP metric.",
      "Aggregate bandwidth as a bottleneck. In the authored two-link path with configured bandwidths 100000 and 100000 kbps, the minimum is 100000. Making only the local link 1000000 kbps leaves the downstream 100000-kbps bottleneck, so the source-defined classic inverse term remains 100. Increasing both links to 1000000 changes that term to 10. Sum is wrong: 100000 + 100000 does not describe a 200000-kbps routed path. Parallel member capacity, per-flow hashing and actual traffic need a separate supported interface/vector design.",
      "Accumulate outgoing delay values in one unit. Two values of 10 classic units each produce 20 units, or 200 microseconds. They do not produce 20 microseconds and do not represent a measured 200-microsecond RTT. A Cisco delay command argument of 20 represents 200 microseconds, while an interface display can show a DLY value in microseconds. The worksheet permits delay zero as declared arithmetic to expose quantization boundaries; that input is not certification that an actual Cisco delay-zero configuration is supported.",
      "Under fixed default classic weights, use M = 256 × (inverseBandwidth + sumDelayUnits). The RFC conversion note truncates 10000000/minimumKbps before the final scaling. For 100000 kbps and delay sum 20, the inverse is 100 and M = 256 × 120 = 30720. A neighbor with only the final link in the supplied vector has delay 10 and the same bandwidth, so its RD is 256 × 110 = 28160. These numbers match the retained uniform-default FRR example; the calculator is still arithmetic, not a new router configuration experiment.",
      "Keep rounding order explicit. For a supplied 1544-kbps bottleneck and delay sum 2000, truncating the inverse first gives 6476 and cost 2169856. Scaling the inverse before truncation gives a bandwidth contribution of 1658031; adding delay contribution 512000 gives 2170031, a difference of 175. The comparison uses the same complete minimum-bandwidth/summed-delay vector in both columns. The pinned FRR bandwidth helper scales before division, but its complete vector aggregation and nondefault/saturation branches are not reproduced here. Do not call the comparison a complete FRR emulator or assume any Cisco platform has identical rounding.",
      "Understand the general coefficient structure without changing it casually. In classic notation, a base combines K1 times the inverse bandwidth, K2 times the bandwidth/load term, and K3 times delay. When K5 is nonzero, the reliability factor depends on K5/(reliability+K4); when K5 is zero, the factor is defined as 1. Default K2/K4/K5 zero excludes load and reliability from the ordinary default result. The vector carries MTU but MTU is not a composite-cost term. K values must be compatible between intended peers; target coefficient ranges/modes come from the release command reference. The calculator fixes the defaults and never accepts arbitrary K weights or load/reliability inputs.",
      "Classic resolution can collapse different high-speed vectors into the same inverse term. Under the declared truncate-first arithmetic, 50000000 and 100000000 kbps both produce inverse zero. If each two-link path has delay sum 20, both costs become 5120. This illustrates lost discrimination under this convention; it does not establish a physically zero-cost link, universal implementation saturation behavior or installed equal-cost multipath. A scale-first comparison retains smaller fractional contributions as integer scaled values. Check the actual implementation’s limits, floors and encoded unreachable sentinels separately.",
      "Wide metrics require their own units and context. The Cisco IOS XE feature guide describes 64-bit calculation in supported named configurations, a wide scale of 65536 and higher-resolution latency handling. Below the documented 1-Gbps boundary, a declared 100000-kbps bottleneck and total delay 200 microseconds give throughput term 6553600 and latency term 1310720; their default sum is 7864320. With an explicitly assumed supported RIB scale 128, the arithmetic RIB value is 61440. Those are source-defined examples, not observed named-mode output in this lab. Faster-link latency conversion and mixed/legacy neighbors need their own supported context; do not universally substitute classic delay times 256 with a different multiplier.",
      "RIB scaling is a local representation step for supported wide metrics, not a path-capacity change or administrative distance. A topology cost and its scaled routing-table value can legitimately differ. Check the actual scale and metric mode before diagnosing that difference. Cisco documents that changing metric rib-scale clears and replaces EIGRP RIB entries; this page supplies no such mutation. A numeric equality after scaling is not proof that all protocol paths or installed forwarding objects are identical.",
      "The lowest current calculated cost is not automatically the successor. DUAL eligibility and historical FD, usable peer information, policy and actual route selection still apply. For the uniform example, changing only local delay from 10 to 20 units raises the current total from 30720 to 33280 while the supplied neighbor RD remains 28160. Do not automatically raise historical FD to 33280; its least-known history can remain lower while settled. Use the previous lesson’s strict reported-distance-versus-historical-FD comparison to explain an alternate, and preserve actual historical context rather than inventing it from one snapshot.",
      "Treat optional target tuning as a bounded policy experiment. The guided branch requires an already prepared supported classic AS 100, a mapped owned transit, matching default coefficients and independently recorded bandwidth/delay/topology/service baseline. Its delay-20 command changes metadata only. Under the declared uniform-vector assumptions it predicts a 2560 increase in current cost, not a new physical latency or throughput measurement. Verify effective configuration, current topology, selected lookup and original traffic, then restore the exact recorded delay-10 value only when that was truly the prior value. No global K, metric mode, RIB scale, process reset or save is applied.",
      "The actual companion stays unchanged: two pinned FRR 8.4.4 routers exchange IPv4 internal reachability across one transit, retain interface/topology/RIB/kernel records and test both endpoint ICMP directions. The 100000/10 values and 30720/28160 topology support uniform arithmetic reconciliation. Requested metric/timer/passive settings in an earlier trial were not demonstrated and remain rejected. The owned attachment fault and explicit link-plus-both-daemon restart recovery are separate runtime evidence, not a delay-change experiment, alternate-path switchover or wide-mode execution. Cleanup evidence remains independently checked."
    ],
    "flow": [
      [
        "Collect scoped vector inputs",
        "Record family/mode/weights and outgoing bandwidth/delay metadata with units."
      ],
      [
        "Aggregate the path",
        "Choose minimum bandwidth and sum outgoing delays; keep the neighbor suffix separate."
      ],
      [
        "Apply the declared arithmetic",
        "Show inverse, rounding order, coefficient branch and scale before comparing current costs."
      ],
      [
        "Check routing and original traffic",
        "Keep historical FD, selected lookup, return path and service evidence separate from the scalar."
      ]
    ],
    "comparison": [
      [
        "Minimum bandwidth / bandwidth sum",
        "Bottleneck vector / incorrect routed-path aggregate",
        "A faster local link can leave another bottleneck unchanged."
      ],
      [
        "Delay command / displayed DLY / RTT",
        "Ten-microsecond metadata argument / labeled operational value / measured exchange",
        "Convert units explicitly; none is automatically the other."
      ],
      [
        "Default K branch / arbitrary weights",
        "Bandwidth plus delay / changed cost and peer-compatibility context",
        "K5 zero means reliability factor one, not cost zero."
      ],
      [
        "MTU / cost inputs",
        "Carried path information / applicable coefficient calculation",
        "MTU is not a composite metric term."
      ],
      [
        "Truncate-first / scale-first",
        "Integer inverse before ×256 / scaled inverse before division truncation",
        "Nondivisible inputs can differ; specify the convention."
      ],
      [
        "Classic / wide",
        "32-bit context / supported named 64-bit and higher-resolution context",
        "Units, quantization and RIB representation require separate interpretation."
      ],
      [
        "Current total / RD / historical FD",
        "Local current vector / neighbor remaining vector / least-known history",
        "The calculator produces the first two, not FD."
      ],
      [
        "Lower scalar / installed service path",
        "Arithmetic ordering / eligibility, lookup and actual original exchange",
        "A tie is not ECMP or application proof."
      ]
    ],
    "example": "A uses two 100000-kbps outgoing links with delay 10 units each: minimum 100000, delay sum 20, current classic cost 30720 and neighbor suffix RD 28160. B has the same bandwidths but delay 20 units each, giving 35840. Making only A’s first link 1000000 kbps leaves A at 30720; making both faster gives 7680. Raising only A’s local delay to 20 instead gives 33280 with neighbor RD still 28160. Lower B’s delays to 5 each and its current cost becomes 28160, lower than A, under the declared arithmetic. This comparison does not execute DUAL or certify B’s peer, feasibility or installation. In the nondivisible case, A’s 1544-kbps/2000-delay-unit vector produces 2169856 versus 2170031 depending on rounding order. The alternate authored path and these edits are not live router changes.",
    "commands": [
      {
        "code": "show version\nshow running-config\nshow ip protocols",
        "explanation": "Preserve target release, metric mode, coefficients and original policy before any optional change.",
        "expected": "GUIDED, NOT EXECUTED: prepared supported IOS XE IPv4 EIGRP topology, authorized AS/table and independent management. Inspect the effective default classic branch; source syntax/support must match the actual target parser. Configuration can contain sensitive metadata. No coefficient or mode change is requested.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show interfaces GigabitEthernet1/0/1\nshow ip eigrp interfaces detail\nshow ip eigrp topology all-links",
        "explanation": "Read outgoing bandwidth/delay metadata and the actual peer/prefix vector on both observers.",
        "expected": "GUIDED, NOT EXECUTED: substitute the real owned transit mapping. Retain units, AS/family, prefix and current total/RD/history context. Show interfaces DLY can be microseconds while delay command arguments are tens of microseconds. Neither counters nor a metric line is an application benchmark.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip route 198.51.100.20\nshow ip cef 198.51.100.20\nshow ip route 192.0.2.10\nshow ip cef 192.0.2.10",
        "explanation": "Compare selected destination lookup and both source/return requirements after reading protocol vectors.",
        "expected": "GUIDED, NOT EXECUTED: record actual matched prefix, local source preference, metric representation, next hop/interface and table. A wide topology value can differ from a scaled RIB value. Installed route/CEF displays alone do not prove original endpoint traffic or hardware programming.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\ndelay 20\nend\nshow interfaces GigabitEthernet1/0/1\nshow ip eigrp topology all-links",
        "explanation": "Optional R1-only change of the prepared owned transit delay metadata from recorded 10 to 20 ten-microsecond units.",
        "expected": "GUIDED, NOT EXECUTED: baseline must explicitly show the owned transit delay 10, uniform 100000-kbps bottleneck, compatible default classic coefficients and working original traffic in this disposable branch. Delay 20 means 200 microseconds of metadata, not physical packet delay injection. Under the source-defined uniform vector, current total prediction is 33280 while neighbor RD is 28160; verify actual target results and preserve historical FD separately. Do not use this example on an unrecorded live interface.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\ninterface GigabitEthernet1/0/1\ndelay 10\nend\nshow interfaces GigabitEthernet1/0/1\nshow ip eigrp topology all-links",
        "explanation": "Restore only the explicitly recorded prior delay value in the optional owned branch.",
        "expected": "GUIDED, NOT EXECUTED: delay 10 is an example baseline, not a universal interface default. If the prior value or configuration form differs, restore that actual intent instead. Recheck effective configuration, scoped peer/topology/selected paths and the original exchange in both directions. No process removal, metric weights, RIB scale, reload or save is requested.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Prepare the shared pinned private runtime for the unchanged actual companion.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured authenticated APT indexes and supporting libraries; use the printed extracted root. Missing pinned packages fail. No maintainer scripts or global service are installed. This is another reference to the same private prepared environment.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "bash labs/eigrp-routing.sh\nFRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/eigrp-routing.sh --run",
        "explanation": "Read inert help and explicitly run the unchanged owned IPv4 EIGRP companion; substitute the root printed by preparation.",
        "expected": "ACTUAL FRR/LINUX: observed uniform interface values and current total/RD reconcile to 30720/28160; peers, selected RIB/kernel paths, raw endpoint ICMP and startup Hello/UPDATE/ACK evidence have separate verification. Owned transit fault and recovery explicitly restoring the link plus both eigrpd restarts remain included. Normal/five interrupted cleanup paths preserve independent host baseline. No actual delay/bandwidth/weight change, arbitrary FRR metric parity, alternate successor, named/wide, authentication, IPv6, application, hardware, zero-loss or convergence execution is claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ],
    "configuration": "Use an already prepared authorized isolated IPv4 classic EIGRP topology; this topic does not create a process or enable routing globally. Record exact active/saved configuration, family/table/AS, release/license/support, real owned interface mapping, coefficients, bandwidth and displayed delay units, topology/current RD/total, selected routing and original service baseline. The optional guided delay branch assumes prior delay 10 and the stated uniform vector; substitute actual context rather than inventing a baseline. Inspect supported delay-command semantics and read back effective configuration after delay 20, then restore the exact prior intent. The command changes informational metadata, not measured path latency. Do not use no delay as a universal restoration of a prior explicit value. K-weight, classic/named conversion, wide latency and metric rib-scale changes are separate designs and not commands supplied here. Bandwidth metadata changes can also affect control-traffic pacing and other features, so a metric worksheet is not permission to alter a shared interface. Actual Linux work reuses the pinned runner with root network/mount capability, documented tools and owned temporary resources; browser calculation changes none of that state.",
    "ports": "EIGRP retains IP protocol 88, not TCP/UDP port 88, with IPv4 discovery multicast 224.0.0.10 and applicable IPv6 FF02::A context. Changing delay metadata or calculating a cost adds no new TCP/UDP listener. The actual companion captures owned IPv4 startup headers and uses numeric bounded ICMP echo in both endpoint directions. Its displayed interface timers are not newly configured metrics or convergence measurements. Supported IPv6/wide/authentication context requires separate target configuration and verification; this calculator has no packet exchange.",
    "production": "Retain a metric-intent record alongside original service objectives. Use scoped design changes when an intended path policy needs adjustment, and verify the entire prefix/peer/forwarding/return boundary afterward. Default coefficients keep metric interpretation consistent; arbitrary weights can disturb peer compatibility and route behavior. Minimum configured bandwidth and accumulated delay are control-plane inputs, not service-level latency/goodput indicators. Correct metadata for supported interface/tunnel/port-channel behavior rather than declaring a link physically upgraded by a command. Classic precision can obscure high-speed differences; supported wide calculation may improve representation, but actual mode/neighbor/legacy and local RIB-scale behavior must be reviewed. Avoid tuning RIB scale merely to make two displays numerically equal: Cisco documents route replacement on that change. Monitor the original application separately from the protocol cost.",
    "troubleshooting": [
      [
        "Cost does not match a hand calculation",
        "First match observer/prefix/family/mode/K values, units and which outgoing links form the vector. Compare rounding order and actual encoded/operational values, then scale/representation; do not immediately change the router to fit a spreadsheet."
      ],
      [
        "One faster interface changed nothing",
        "Look for another minimum-bandwidth link. The local-faster authored case leaves its remote bottleneck intact; counters and negotiated speed are not the same as configured metric metadata."
      ],
      [
        "Tenfold delay error",
        "Distinguish command units of 10 microseconds, interface DLY units and cumulative path sum. Read back target output; do not interpret a delay command as physical delay injection or measured RTT."
      ],
      [
        "Peers vanished after a cost experiment",
        "Compare effective K values, AS/family/activation, authentication/admission and logs on both peers. A coefficient mismatch can be a compatibility problem, but the calculator does not inject one or uniquely diagnose a missing neighbor."
      ],
      [
        "Topology and routing-table numbers differ",
        "Inspect classic/wide mode, actual RIB scale and exact prefix/source selection. Historical FD, current total and displayed RIB metric need not be identical. Do not perform a broad metric-rib-scale change to hide the distinction."
      ],
      [
        "Cheapest scalar is not the observed next hop",
        "Check usable peers, route history/strict feasibility, policy, same-prefix RIB selection, more-specific lookup and actual return traffic. The worksheet ranks current arithmetic only and proves no DUAL or installed-path choice."
      ],
      [
        "Pinned FRR result differs on a new vector",
        "Keep the exact version/source, effective settings and recorded observations. The two rounding columns share a mathematical vector, while the pinned implementation has different aggregation/nondefault/saturation branches. Uniform-default agreement does not establish arbitrary feature parity or demonstrate rejected metric configuration."
      ]
    ],
    "security": "Metric metadata and coefficient changes can alter traffic placement or destabilize neighbor compatibility. Restrict configuration and routing policy to authorized operators, preserve independent management and use supported authentication/control-plane boundaries for intended peers. AS and an apparently sensible cost are not authentication. Record change ownership and read back actual settings; do not widen untrusted peer exposure to make a worksheet result appear. Configuration/evidence can disclose topology and policy. Browser numeric values are bounded, mode/case IDs are fixed and dynamic results use text nodes; invalid input hides stale output and reset remains available. No injected markup or worksheet choice executes device commands.",
    "performance": "Configured bandwidth/delay cost, physical capacity, achieved goodput, one-way latency, RTT and application response time are different measures. The classic bottleneck term does not count every slow link, while cumulative delay metadata does increase with the modeled segments. Increasing a nonbottleneck bandwidth may leave cost unchanged; lowering a metric cannot create real capacity. Coarse classic inverse/delay quantization can create arithmetic ties on high-speed paths; a tie does not imply installed ECMP or double per-flow throughput. Supported wide precision and local RIB scaling need their own operational evidence. Control-plane pacing, route churn, peer queues and data-plane utilization still matter. The browser performs bounded integer arithmetic, not throughput, latency, capacity or convergence benchmarking.",
    "mistakes": [
      "Adding link bandwidths instead of selecting the minimum.",
      "Treating kbps as Mbps, delay command units as microseconds, or configured delay as ping RTT.",
      "Multiplying the default cost by zero because K5 is zero.",
      "Including MTU, measured load or reliability as default composite terms without the applicable coefficient branch.",
      "Ignoring truncation order or calling the comparison a full FRR emulator.",
      "Multiplying a classic cost by a constant and claiming a universal wide-mode conversion.",
      "Comparing wide topology cost, scaled RIB value, historical FD and current total as interchangeable fields.",
      "Declaring the lowest calculated scalar an installed successor, ECMP path or successful original service.",
      "Raising historical FD automatically when the current path becomes more expensive.",
      "Restoring delay 10 as a universal default, using no delay without the real baseline, or broadly changing weights/mode/RIB scale to repair a worksheet disagreement."
    ],
    "prerequisites": [
      "s3-g2-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s3-g2-t2",
      "s3-g2-t3",
      "s3-g0-t1",
      "s3-g1-t4"
    ],
    "interactive": "eigrp-metrics",
    "artifacts": [
      {
        "title": "Actual unchanged EIGRP companion",
        "path": "labs/eigrp-routing.sh"
      },
      {
        "title": "Pinned private preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Reconstruct default-classic cost from correctly labeled vectors, compare rounding conventions and neighbor/current values, then keep actual runtime evidence and optional target tuning separate.",
      "requirements": "Browser needs no router. Actual companion requires Ubuntu 24.04 amd64, root network/mount capability, privately extracted FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/timeout/getent/TShark. Optional Cisco branch needs prepared supported isolated classic EIGRP devices, an owned mapped interface, real baseline and independent management.",
      "topologyKind": "shared",
      "topology": [
        "Authored path A: local outgoing link → neighbor outgoing link → one prefix",
        "Authored path B: separate supplied vector for the same prefix",
        "Actual companion: Client → R1 → R2 → Server · one transit only",
        "Record convention / units / observer / table / source evidence"
      ],
      "steps": [
        "Baseline: calculate both vectors and the neighbor suffix before reading output. Explain 100000 kbps, 20 ×10 microseconds, current 30720 and RD 28160 under the truncate-first convention.",
        "Select local-faster, both-faster and bottleneck. Identify the minimum link and predict whether the inverse term changes. Do not sum bandwidth or claim a traffic measurement.",
        "Select delay and lower-delay. Reconstruct sums and explain why current cost changes while the neighbor suffix can stay unchanged. Keep historical FD outside the calculator.",
        "Select nondivisible and switch conventions. Verify 2169856 versus 2170031, difference 175, and distinguish the shared mathematical vector from full implementation parity.",
        "Select tie and high-speed. Explain arithmetic equality and inverse quantization without claiming installed ECMP, a zero physical cost or a production capacity test.",
        "Try zero delay arithmetic, invalid/fractional/out-of-range values and unknown cases. Stale output must disappear; keyboard reset restores baseline and never changes learner progress.",
        "Read/download inert help and the private preparation. Explicitly run the unchanged actual companion sequentially with the printed root; retain 100000/10 interface and 30720/28160 remote topology records. Its fault/recovery includes link restoration and both owned daemon restarts.",
        "Compare actual RIB/kernel/ICMP/startup/cleanup evidence with the separate arithmetic. Verify normal/five interrupted cleanup baseline checks; retain rejected metric settings instead of claiming they were applied.",
        "Optional supported Cisco branch: record the exact prior delay and original service, apply only owned delay-20 metadata under the stated prepared assumptions, inspect actual scoped records/traffic, then restore the exact prior intent and recheck. This branch was not executed here."
      ],
      "verification": "Retain input kbps and 10-microsecond units, bottleneck, sum, explicit rounding convention, neighbor suffix RD and current total. Independent BigInt checks cover 19,600 combinations and nine cases. Actual records must remain source/observer-scoped; uniform-default numeric agreement is arithmetic reconciliation, not executed metric tuning. Guided rollback requires effective configuration and original traffic against its actual baseline.",
      "troubleshooting": "If the cost differs, locate the first mismatch in mode, coefficients, vector, units, rounding or representation. Do not overwrite FD/history or change a router to make a hand calculation match. Unsupported effective settings, missing traffic evidence and unexecuted wide/alternate paths stay unproven.",
      "challenge": "Why does a tenfold local-bandwidth increase leave the baseline cost unchanged? Then explain why the nondivisible case differs by 175 and why neither column proves a complete pinned FRR result. Finally compare declared wide total 7864320 and assumed scaled RIB 61440 without calling either AD or measured throughput.",
      "cleanup": "Worksheet reset restores baseline inputs/convention and hides errors without router mutation or learner-progress changes. The actual runner removes only owned namespaces/daemons/capture/private paths and verifies host baseline. Optional target delay restoration uses the recorded prior value/configuration form; do not remove the existing EIGRP process, change unrelated interfaces or save/reload globally."
    },
    "glossary": {
      "Metric vector": "Per-path attributes used by the applicable EIGRP cost calculation.",
      "Bottleneck bandwidth": "Minimum configured outgoing-link bandwidth in the modeled vector, not the sum.",
      "Classic delay unit": "Ten microseconds of interface-delay metadata; 10 units equal 100 microseconds.",
      "Coefficient": "K value weighting/branching the applicable cost terms and relevant to peer compatibility.",
      "Truncation": "Discarding a fractional part at a specified arithmetic step.",
      "Scale-first comparison": "The browser’s alternate inverse-bandwidth rounding order on the same vector; not a full implementation emulator.",
      "Current total": "Cost of the complete local outgoing vector for this snapshot/convention.",
      "Neighbor RD": "Cost of the supplied neighbor’s remaining outgoing vector; historical FD is separate.",
      "Wide metric": "Supported higher-resolution 64-bit EIGRP calculation with different conversion/representation context.",
      "RIB scale": "Local supported representation factor for offering wide cost to the routing table.",
      "Quantization": "Different inputs producing the same finite-resolution value.",
      "Arithmetic reconciliation": "Matching recorded numeric fields with a declared calculation without claiming a new applied setting or traffic experiment."
    },
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Bottleneck",
        "question": "Should the two-link EIGRP bandwidth input be the sum of both configured bandwidth values?",
        "answer": "No.",
        "explanation": "Use the minimum configured outgoing-link bandwidth under the declared vector model.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Delay units",
        "question": "In the guided command delay 20, is the metadata value 20 microseconds?",
        "answer": "No; it is 200 microseconds.",
        "explanation": "The argument uses tens of microseconds; it does not inject measured packet delay.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "History",
        "question": "Does the calculator’s current total reconstruct historical FD?",
        "answer": "No.",
        "explanation": "RD/current arithmetic and historical least-known FD remain distinct; this worksheet advances no DUAL history.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-QC3"
      }
    ],
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Default metric branch",
        "question": "Which values contribute to the ordinary default classic result with K1=K3=1 and K2=K4=K5=0?",
        "answer": "Inverse minimum configured bandwidth and accumulated outgoing delay.",
        "explanation": "The K5-zero reliability multiplier is defined as one; MTU/load/reliability do not become default composite terms.",
        "type": "multiple-choice",
        "options": [
          "Inverse minimum configured bandwidth and accumulated outgoing delay.",
          "Summed measured throughput and measured ping RTT.",
          "MTU multiplied by administrative distance.",
          "Reliability multiplied by zero, giving a zero-cost route."
        ],
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Bottleneck invariance",
        "question": "Path A has outgoing bandwidths 100000/100000 kbps. Only the first becomes 1000000 kbps. Why does its source-defined inverse term remain 100?",
        "answer": "The second 100000-kbps link remains the path minimum.",
        "explanation": "Increasing a nonbottleneck configured bandwidth does not change the modeled minimum or physically upgrade the remaining link.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Classic units",
        "question": "Two outgoing delays each equal 10 classic units. What delay sum and microsecond value belong in this worksheet?",
        "answer": "20 ten-microsecond units, equal to 200 microseconds.",
        "explanation": "Use one labeled unit consistently; this metadata sum is not a measured RTT.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "RD and total",
        "question": "With uniform 100000-kbps links and delay 10 units each, what are the truncate-first neighbor suffix RD and local current total?",
        "answer": "RD 28160 and current total 30720.",
        "explanation": "The neighbor suffix has one outgoing delay contribution; the complete local path has two. Neither number reconstructs historical FD.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q04"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Rounding order",
        "question": "Why do the authored 1544-kbps, 2000-delay-unit results differ by 175 between 2169856 and 2170031?",
        "answer": "One convention truncates the inverse before scaling, while the other scales the inverse before truncation.",
        "explanation": "Both columns use the same path vector; a rounding comparison alone is not full FRR aggregation/nondefault parity.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "K5 exception",
        "question": "What prevents the common default K5=0 from reducing the entire classic cost to zero?",
        "answer": "The reliability multiplier is explicitly defined as one when K5 is zero.",
        "explanation": "Do not substitute zero blindly into a formula whose reliability branch is conditional.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Wide representation",
        "question": "A declared supported below-1-Gbps wide example has total cost 7864320 and an assumed RIB scale 128. Which statement fits the arithmetic 61440?",
        "answer": "61440 is the example’s scaled RIB representation, not administrative distance or measured bandwidth.",
        "explanation": "Actual scale/mode and target output must be inspected; changing RIB scale has documented route-replacement effects.",
        "type": "multiple-choice",
        "options": [
          "61440 is the example’s scaled RIB representation, not administrative distance or measured bandwidth.",
          "61440 is a universal administrative distance for named EIGRP.",
          "The link was physically upgraded to 61440 Mbps.",
          "Changing the scale is always a read-only display operation."
        ],
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Current versus history",
        "question": "Increasing only local delay raises the authored current cost from 30720 to 33280 with neighbor RD 28160. Must historical FD immediately become 33280?",
        "answer": "No; the higher current total does not automatically raise the historical least-known FD.",
        "explanation": "The calculator does not advance route history or execute DUAL; collect actual historical context.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Tie and installation",
        "question": "Both high-speed truncate-first paths produce cost 5120. What claim is supported by this worksheet?",
        "answer": "Their declared current arithmetic ties; installed ECMP and original service still need independent evidence.",
        "explanation": "Finite-resolution equality does not prove peer eligibility, RIB/FIB installation or doubled per-flow throughput.",
        "type": "multiple-choice",
        "options": [
          "Their declared current arithmetic ties; installed ECMP and original service still need independent evidence.",
          "Both paths are proven installed in the kernel.",
          "The two virtual inputs guarantee twice the throughput for one flow.",
          "The tied cost proves both historical FDs are 5120."
        ],
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recorded versus applied settings",
        "question": "Retained FRR output shows 100000/10 and 30720/28160, while an earlier requested metric-setting trial was rejected. What does matching worksheet arithmetic establish?",
        "answer": "Uniform-default numeric reconciliation only; it does not establish that the requested metric changes were applied.",
        "explanation": "Read effective configuration and scoped runtime observations. This build’s rounding/vector/nondefault branches and actual traffic have separate evidence.",
        "type": "short-answer",
        "topicId": "s3-g2-t1",
        "questionId": "s3-g2-t1-Q10"
      }
    ],
    "sources": [
      {
        "title": "RFC 7868: default/classic/wide vectors, coefficients and conversion conventions",
        "url": "https://www.rfc-editor.org/rfc/rfc7868",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Catalyst 9300 IOS XE 17.15 IP commands: metric weights and scoped topology views",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS XE EIGRP wide-metric feature guide: units, scale and representation limits",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_ire-wid-met.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS EIGRP metric rib-scale reference: default factor and replacement effect",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_eigrp/command/ire-cr-book/ire-i1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco IOS interface delay command: informational ten-microsecond argument",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/interface/command/ir-cr-book/ir-d1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 metric implementation: distinguish helper arithmetic from full aggregation",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_metric.c",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 EIGRP: actual companion daemon context",
        "url": "https://docs.frrouting.org/en/stable-8.4/eigrpd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco show ip cef destination reference: installed lookup inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch/command/isw-cr-book/isw-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g2-t2",
    "batch": "09",
    "title": "EIGRP neighbors",
    "subtitle": "Follow discovery, accepted traffic and reliable exchange before trusting a peer table.",
    "level": "Intermediate → Advanced",
    "minutes": 75,
    "definition": "An EIGRP neighbor is a peer with which the applicable routing instance maintains local relationship and transport state on an attachment. A neighbor row identifies an observer, peer address and interface; it is not a selected destination route or a successful application exchange. Discovery, compatibility, initialization, liveness and reliable delivery are related checks with different evidence. This original node builds on EIGRP and its metrics lesson, then prepares the dedicated topology lesson. The retained lab is IPv4 AS 100 on one transit, not an OSPF area or DR election.",
    "purpose": "Neighbor relationships carry routing information and provide the peer context used when paths change. Operators need to distinguish no intended peer, an initializing relationship, a stable relationship with missing prefixes and a flapping transport. Each suggests a different next observation. A screen full of addresses does not show whether the original source can reach its service. This lesson teaches scoped comparison of both ends, meaningful interpretation of hold/uptime/SRTT/RTO/queue fields, and closure through routing and original traffic. It also prevents broad process clears from hiding the evidence that explains a failure.",
    "mental": "Think of two colleagues exchanging numbered envelopes over a corridor. Seeing a greeting establishes that something arrived from one side; receiving the reply and acknowledging numbered work gives different evidence about the return corridor. A local roster is one observer’s record, not a shared global truth. The hold window describes how long accepted silence can be tolerated. The retransmission deadline concerns a particular reliable envelope, not the same clock. This analogy explains the separation but does not reproduce EIGRP packet scheduling, queueing, INIT negotiation or DUAL. Inspect actual fields and packet context rather than inferring every transition from the analogy.",
    "components": [
      "Scope: observer, address family, AS, routing table/VRF, active interface and intended peer set. Local instance or VRF labels need not be textually identical on two devices.",
      "Discovery/admission: correctly addressed accepted control packets, compatible effective coefficients and supported authentication, plus actual interface activation and source reachability.",
      "Neighbor table: local peer address/interface, relationship age, liveness countdown and transport fields; a snapshot does not contain all state history.",
      "Reliable transport: sequenced UPDATE/QUERY/REPLY family traffic and acknowledgment fields. Discovery Hellos are not a TCP or UDP conversation.",
      "Independent clocks: sender Hello cadence, peer-advertised hold window, reliable retransmission timing and route ACTIVE/SIA context are distinct.",
      "Evidence chain: raw neighbor/interface/configuration, topology, selected RIB, kernel/forwarding and original endpoint exchange. Preserve each observer and checkpoint separately."
    ],
    "mechanism": [
      "Start with the intended pair and the actual family/table/AS on both ends. An interface-selecting network statement is not an arbitrary route redistribution command. In the owned baseline, R1 transit 203.0.113.1 and R2 transit 203.0.113.2 exchange AS 100 traffic. Their domain-unique router IDs are 1.1.1.1 and 2.2.2.2; those IDs are distinct from the peer addresses shown in the neighbor table. A different local named process label is not automatically a compatibility failure. A matching AS alone does not establish activation, authentication or usable packet delivery.",
      "Trace packet admission before explaining a missing row. On the ordinary IPv4 branch, check the actual local interface, source addressing/common-subnet context, tenant table, effective K values, authentication and control-plane policy. IPv4 discovery normally uses destination 224.0.0.10 with IP protocol 88; the number is not UDP port 88. Supported static-neighbor configurations alter discovery/delivery behavior and require their own bilateral design; adding one is not a harmless generic repair. IPv6 uses its own address-family and link-local scope, not these IPv4 addresses. No IPv6 or static-neighbor execution is claimed here.",
      "Separate discovery from completed initialization. A received Hello can create preliminary peer information, while reliable startup exchange verifies more. The protocol description includes unicast initialization UPDATEs and acknowledgments; exact behavior and graceful-restart branches depend on supported implementation. Do not import OSPF Down/Init/2-Way/Full terminology as EIGRP state names. This lab retains seven decoded header fields, but not flags or complete TLVs: opcode 1 proves UPDATE, not INIT. Even an acknowledgment-bearing header does not by itself certify the whole startup handshake or all route bodies.",
      "Interpret timer direction. A sender advertises its hold duration, and the receiving peer uses that duration for its local liveness record. Accepted EIGRP traffic can refresh the hold window; absence of Hellos alone is an incomplete packet diagnosis. Hello and hold settings are not an OSPF-style mandatory equality check. Unequal settings can be compatible, yet an unsuitable relationship between transmission cadence and the advertised tolerance can make the relationship unstable. Determine actual accepted traffic and effective settings on both observers. No fixed timer ratio is a universal guarantee against loss, scheduler delay or congestion.",
      "Do not infer hold expiration from any neighbor disappearance. Interface failure, administrative suppression, authentication changes, reliable-delivery failure, peer termination or restart can remove a relationship through different paths. The actual owned fault takes a transit interface down; its empty tables are link-interruption evidence, not a timed hold-expiry experiment. The retained display shows interface Hello/Hold columns and also a contradictory additional Hello-interval line in this pinned build. Preserve that discrepancy rather than declaring a configured timer from whichever line suits a prediction. Requested timer/passive settings in rejected trials were not demonstrated.",
      "Read the peer row field by field with the command and platform beside it. Address/interface identify the local relationship. Hold is a remaining tolerance display, not a measured transmission period. Uptime is the implementation’s displayed relationship age; the pinned FRR row retains raw 0 rather than Cisco’s hours:minutes:seconds presentation. SRTT refers to control packet/acknowledgment timing, not application RTT, one-way delay or the interface metric delay. RTO is retransmission timing, not the hold timer. Queue and sequence describe transport context, not the size of a TCP send buffer or the number of learned prefixes.",
      "Look for trends before diagnosing a queue. A settled Q value of zero is useful at that observation, but it is not proof of no prior drops, no future retransmission or complete prefix exchange. A nonzero queue during startup can be transient. Persistent queueing, repeated reliable sequence/retry detail and relationship-age resets deserve correlated two-ended inspection. Small discovery packets and larger route exchanges can encounter different loss or MTU paths; multicast success alone does not establish unicast reliable delivery. Zero or tiny SRTT/RTO fields in the retained FRR display are preserved raw values, not a claim of zero physical latency or universal timer defaults.",
      "Keep passive-interface configuration separate from PASSIVE route computation. On the supported Cisco branch, making an interface passive prevents EIGRP neighbor operation there while the connected network may still be advertised through other active attachments. A topology P entry means settled DUAL computation, not an interface that stopped Hellos. This distinction matters when a host LAN should be advertised without admitting peers. An empty LAN peer count is not proof that passive configuration was effective: the owned lab has no LAN router peer, and its requested passive trial remains rejected. Preserve actual effective configuration and packet behavior.",
      "Compare both observers at each checkpoint. The inspector contains baseline, owned transit-down, link-restored-before-restart and combined-recovery views for R1 and R2. The intermediate view retains what happened after link restoration; no endpoint probes were stored at that point. Do not fill that gap with recovered-phase probes. Combined recovery explicitly restarts both identity-checked owned eigrpd children with unchanged configuration, then verifies peers, selected routes, kernel paths and bounded original endpoint ICMP. The separate rejected link-only trial prevents promoting this to automatic link-only convergence.",
      "Read startup headers as a separate evidence collection. Discovery filtering requires Hello-format opcode 5 with sequence and acknowledgment zero. UPDATE filtering uses opcode 1. Acknowledgment filtering selects a nonzero acknowledgment and can include UPDATEs carrying acknowledgments, so the filters overlap. A Hello-format acknowledgment is not simply another periodic discovery greeting. The retained fields omit flags, timestamps, checksums, authentication/parameter TLVs and route bodies. Filter counts are decoded header counts within that startup capture, not protocol rates, an exhaustive packet census or the transport retry history of the selected later checkpoint.",
      "Close a neighbor incident through the actual affected destination. A stable peer can coexist with filtered prefixes, unexpected summarization, source preference, a more-specific lookup, disabled forwarding, a missing return route or an unavailable service. A route learned from one peer is a topology candidate before independent selection and installation. The actual companion verifies remote selected EIGRP routes and Linux kernel next hops and probes both original endpoints. This establishes bounded IPv4 ICMP in the owned topology; it does not establish a TCP/TLS application, hardware programming, alternate successor or zero-loss/convergence objective.",
      "Use one bounded intervention with exact restoration. The guided Cisco passive-transit exercise requires an existing prepared classic AS 100, a recorded nonpassive owned interface, working original service and independent management. It changes only that process’s interface participation. Restore only the introduced setting, inspect actual effective configuration and compare both-end neighbor/routing/traffic evidence to the baseline. Do not tune K values, extend timers blindly, add static peers or clear the entire routing process to make a row appear. Configuration restoration and service restoration are separate acceptance checks."
    ],
    "flow": [
      [
        "Scope the intended pair",
        "Record observer, family/table/AS, attachment, activation and admission."
      ],
      [
        "Separate discovery and reliable exchange",
        "Compare both directions, control headers and initialization/queue context."
      ],
      [
        "Interpret clocks and history",
        "Hold, uptime, SRTT, RTO, queue and route state require distinct evidence."
      ],
      [
        "Verify the original exchange",
        "Compare topology, selected routing, forwarding, return and service after exact restoration."
      ]
    ],
    "comparison": [
      [
        "Peer address / router ID",
        "Attachment endpoint / routing identity",
        "The owned R1 peer is 203.0.113.2, not its 2.2.2.2 router ID."
      ],
      [
        "AS / local label",
        "Relevant routing scope / local instance name",
        "A matching label cannot replace compatibility/admission checks."
      ],
      [
        "Discovery Hello / acknowledgment-bearing header",
        "Sequence-zero greeting / acknowledgment context",
        "Opcode 5 alone is insufficient; UPDATE can also carry an ACK."
      ],
      [
        "Hello cadence / advertised hold / RTO",
        "Sending interval / receiver liveness window / retransmit deadline",
        "Different clocks; equality is not an OSPF-style EIGRP prerequisite."
      ],
      [
        "SRTT / metric delay / application RTT",
        "Reliable-control timing / cost metadata / original transaction measurement",
        "Do not use one as evidence of another."
      ],
      [
        "Transient queue / persistent reliable blockage",
        "One observation / correlated trend and detail",
        "Q zero is not a loss-history or service guarantee."
      ],
      [
        "Passive interface / PASSIVE topology",
        "Neighbor suppression intent / settled route computation",
        "An empty host-LAN peer count proves neither intent nor packet suppression."
      ],
      [
        "Link restored / verified service recovery",
        "One intervention / independent neighbor, route and endpoint evidence",
        "The passing owned repair also restarts both owned daemons."
      ]
    ],
    "example": "At the retained R1 baseline, peer 203.0.113.2 is on transit, with a raw hold countdown and Q 0. R2 sees 203.0.113.1. Their remote prefixes are independently selected and installed, and both original endpoint ICMP probes succeed. Taking R1 transit down leaves no peer rows and no remote kernel path; remote probes fail while local gateways still work. Restoring the link yields an intermediate snapshot whose observations must be read directly, with no stored endpoint probe. The documented passing combined repair additionally restarts both owned eigrpd children, preserving configuration, and rechecks both original probes. Startup headers show discovery Hello-format records, sequenced UPDATEs and nonzero acknowledgments. Some UPDATEs carry acknowledgments, so adding the filter counts would double-count headers. None of these seven fields records INIT flags or elapsed convergence time.",
    "commands": [
      {
        "code": "show version\nshow running-config\nshow ip protocols",
        "explanation": "Preserve actual release, routing context, interface participation, coefficients and authentication intent.",
        "expected": "GUIDED, NOT EXECUTED: prepared supported target, correct table/family/AS and independent management. Read both observers; configuration can contain sensitive metadata. A matching process label or AS alone is not completed peering.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp neighbors\nshow ip eigrp neighbors detail",
        "explanation": "Read peer address/interface, hold/age and reliable transport details with units.",
        "expected": "GUIDED, NOT EXECUTED: default table example; substitute supported scoped family/VRF commands when needed. Compare repeated observations and both ends. SRTT is control acknowledgment timing, Q is transport queue context and Seq is not a prefix count.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp interfaces detail\nshow ip eigrp traffic",
        "explanation": "Correlate active attachments, effective interface context and packet counters.",
        "expected": "GUIDED, NOT EXECUTED: counters require baseline and time scope; process-wide totals do not uniquely identify an interface or prove packet acceptance at the far end. Inspect real timer/authentication/passive configuration and supported output, not inferred defaults.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show interfaces GigabitEthernet1/0/1\nshow logging",
        "explanation": "Read owned interface/carrier/error context and retained neighbor-change reasons.",
        "expected": "GUIDED, NOT EXECUTED: map the actual owned transit and preserve both observers and timestamps. A down reason is a clue, not a universal root cause; old graceful-shutdown behavior can resemble a K mismatch. No unrestricted debug, multicast-ping proof or new routing protocol is requested.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp topology all-links\nshow ip route 198.51.100.20\nshow ip cef 198.51.100.20\nshow ip route 192.0.2.10\nshow ip cef 192.0.2.10",
        "explanation": "Continue from neighbor state to destination-specific protocol, selected lookup and return evidence.",
        "expected": "GUIDED, NOT EXECUTED: inspect correct source/table, actual matched prefix, source preference and active next hop. PASSIVE topology is not passive interface; route/CEF presence is not original service or hardware proof. Recheck the original bounded transaction from its real endpoints.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter eigrp 100\npassive-interface GigabitEthernet1/0/1\nend\nshow ip eigrp neighbors\nshow ip eigrp interfaces detail",
        "explanation": "Optional owned-transit neighbor suppression in an already prepared disposable classic branch.",
        "expected": "GUIDED, NOT EXECUTED: baseline must explicitly show existing AS 100, owned mapped transit nonpassive, working peers and original traffic; independent management remains available. Change only the existing process’s transit participation. Predict neighbor/routing impact but inspect actual target behavior; no actual Cisco or pinned FRR passive fault is claimed.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "configure terminal\nrouter eigrp 100\nno passive-interface GigabitEthernet1/0/1\nend\nshow running-config\nshow ip eigrp neighbors\nshow ip eigrp topology all-links",
        "explanation": "Remove only the introduced passive setting and compare actual recovered evidence against baseline.",
        "expected": "GUIDED, NOT EXECUTED: valid only for the explicitly recorded prior nonpassive owned interface in the existing classic process. Restore actual prior intent if different. Recheck both-end peers, exact destination lookup and original traffic. Do not remove the process, enable unrelated interfaces, alter authentication/K/timers, clear globally or save/reload.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 classic EIGRP lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Use the shared privately extracted pinned runtime for the unchanged actual companion.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured authenticated APT indexes and supporting libraries. Use the printed extracted root; missing pinned packages fail. No maintainer scripts or system service installation. This references the same verified private environment.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "bash labs/eigrp-routing.sh\nFRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/eigrp-routing.sh --run",
        "explanation": "Read inert help, then explicitly execute the unchanged owned neighbor/fault/recovery companion.",
        "expected": "ACTUAL FRR/LINUX: two IPv4 AS 100 observers, peer/interface/configuration/topology/selected RIB/kernel records and original endpoint ICMP. Owned transit-down fault and intermediate link-restored snapshot are separate from combined recovery with both owned daemon restarts and unchanged configurations. Startup seven-field headers support Hello/UPDATE/ACK distinctions, not INIT flags, timer expiry, authentication, retry-limit or convergence timing. Normal/five interrupted cleanup paths preserve host baseline. No Cisco, passive/timer mutation, IPv6, alternate successor, application, hardware or zero-loss execution claimed.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ],
    "configuration": "Work from an existing prepared authorized classic branch; this page does not establish a new global process. Record release/support, both tables/families/AS values, primary/secondary source addressing, network matching, exact owned interface mapping, effective K values, supported authentication/key lifetimes, static-neighbor intent and control-plane admission. Record actual Hello/hold values and packet acceptance direction rather than copying a universal default. Preserve original source/destination/return and service baseline. Optional passive suppression requires a previously nonpassive owned transit and independent management; restoration removes only that introduced setting. Supported named/IPv6 configurations need their own command context. Avoid static-neighbor, broad timer/weight, authentication or process-clear changes as generic repairs; this lesson supplies no such mutation.",
    "production": "Maintain an intended peer inventory with observer/table/family/interface context and approved change ownership. Correlate relationship changes, reliable queue/retry trends and prefix availability with source-specific traffic symptoms. During maintenance, record whether a peer gracefully restarts, is administratively suppressed or loses its attachment; do not mistake one for another or assume nonstop forwarding support. Preserve prior configuration and independent management before changing interface participation. Authentication and admission define trust; matching AS and an apparently stable queue do not. A successful control-plane recovery must still meet the original service objective, including policy, return and application checks. The owned experiment is a learning baseline, not a production scalability or convergence certification.",
    "troubleshooting": [
      [
        "No intended peer row",
        "Check observer/table/family/AS, real activation, nonpassive intent, source addressing, carrier and admitted protocol-88 traffic in both directions. Keep static-neighbor behavior and authentication context explicit."
      ],
      [
        "Hello seen, initialization incomplete",
        "Inspect reliable unicast delivery, actual INIT/ACK detail, retransmissions, MTU path and packet acceptance at both ends. A small multicast greeting does not establish all route exchange."
      ],
      [
        "Hold expires or relationship flaps",
        "Compare advertised tolerance, actual accepted packets, interface/log changes and scheduler/loss context. Do not demand literal timer equality or blindly increase tolerance."
      ],
      [
        "Queue remains nonzero",
        "Correlate repeated observations, same reliable sequence/retry detail, both directions and actual prefix progress. A single nonzero sample is not a unique diagnosis."
      ],
      [
        "K mismatch logged",
        "Compare actual coefficients and supported graceful-termination context; older implementations can report intentional goodbye behavior as mismatch. Do not change weights from one log line."
      ],
      [
        "Peer present, prefix absent",
        "Continue to advertised policy, topology/current path, historical eligibility, exact-prefix selection and actual destination lookup. The relationship is not a guarantee of every route."
      ],
      [
        "Topology says PASSIVE",
        "Read route computation state; inspect separate interface passive configuration and actual packet behavior. Empty LAN peer count proves no configuration by itself."
      ],
      [
        "Link up, service still failing",
        "Compare retained intermediate and combined-recovery checkpoints. Do not borrow later probes or claim automatic recovery from a restored carrier. Verify original endpoints after the actual intervention."
      ]
    ],
    "security": "EIGRP peer state is not identity assurance. Use supported authentication and carefully scoped control-plane/interface admission for intended peers, preserve key-lifetime and clock context, and restrict configuration access. Do not enable discovery on an untrusted host segment to create a desired row. AS, local names, sequence fields and zero queue are not cryptographic proofs. Collect only authorized interface/process captures and handle topology/configuration metadata carefully. The inspector accepts fixed checkpoint/filter identities, validates retained shape and renders dynamic data as text; selecting a view cannot execute a device command. No injected markup, authentication attack or production credential operation is performed.",
    "performance": "Neighbor liveness and reliable exchange compete for control-plane resources, while the data plane has its own throughput/latency constraints. Persistent transport queueing needs trend and loss/path evidence, not a universal one-sample threshold. Increasing a hold window can delay detection; an aggressive cadence can increase work and sensitivity, without guaranteeing recovery. SRTT is a control acknowledgment estimate, distinct from configured metric delay, ICMP RTT or application response time. The pinned zero SRTT display is not a zero-latency result. Capture filter counts have no retained duration and cannot become packet rates. The owned tests measure bounded ICMP success/failure and cleanup, not scale, loss-free failover, capacity or an elapsed convergence objective.",
    "mistakes": [
      "Permitting UDP port 88 instead of IP protocol 88.",
      "Equating peer address with router ID or requiring identical local instance labels.",
      "Treating a received Hello as complete reliable initialization or original service proof.",
      "Importing OSPF Full/DR/area or timer-equality rules into EIGRP.",
      "Using the local hold setting as if it directly describes the countdown for the remote sender.",
      "Confusing SRTT, retransmission timeout, hold time, metric delay and application RTT.",
      "Diagnosing permanent failure from one nonzero queue or declaring no loss history from Q zero.",
      "Calling a PASSIVE route a passive interface, or inferring passive LAN configuration from no peer.",
      "Treating every opcode-5 packet as discovery or every UPDATE as INIT.",
      "Adding overlapping UPDATE/ACK filter counts as though they partition the capture.",
      "Borrowing recovered probes for an intermediate phase with no retained endpoint observation.",
      "Claiming automatic link-only convergence when the passing repair includes both owned daemon restarts."
    ],
    "prerequisites": [
      "s3-g2-t0",
      "s3-g2-t1"
    ],
    "related": [
      "s3-g2-t3",
      "s3-g1-t4",
      "s3-g0-t0",
      "s1-g4-t0"
    ],
    "interactive": "eigrp-neighbors",
    "ports": "IPv4 EIGRP uses IP protocol 88, not TCP/UDP port 88; ordinary discovery destination is 224.0.0.10. Supported IPv6 uses separate scoped family/link-local behavior. Static-neighbor and admission policy can alter packet delivery; inspect actual target context.",
    "artifacts": [
      {
        "title": "Actual unchanged EIGRP neighbor companion",
        "path": "labs/eigrp-routing.sh"
      },
      {
        "title": "Pinned private preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Read both-end peer/transport evidence at four actual checkpoints, separate startup headers from later phases, and verify where neighbor observations stop proving recovery.",
      "requirements": "Browser inspector needs no router. Actual companion requires Ubuntu 24.04 amd64, root network/mount capability, private FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/timeout/getent/TShark. Optional vendor branch needs supported prepared isolated classic devices, exact baseline and independent management.",
      "topologyKind": "shared",
      "topology": [
        "Client 192.0.2.10 → R1 LAN 192.0.2.1",
        "R1 transit 203.0.113.1 ↔ R2 transit 203.0.113.2 · AS 100",
        "R2 LAN 198.51.100.1 → Server 198.51.100.20",
        "Two observers / four checkpoints / separate startup headers"
      ],
      "steps": [
        "Inspect baseline R1/R2, identify actual peer/interface and raw hold/age/SRTT/RTO/queue/sequence units. Correlate selected route, kernel and both endpoint probes.",
        "Select both fault observers. Explain the known owned link-down intervention without inventing hold expiration, authentication failure or passive suppression.",
        "Read both link-restored views directly. Locate the absence of retained endpoint probes; do not substitute later recovered observations.",
        "Compare both combined-recovery views. Preserve the explicit owned-daemon restarts and unchanged configuration, then explain the independent original ICMP recheck.",
        "Filter startup headers as discovery, UPDATE and acknowledgment. Find UPDATEs carrying an ACK and explain why categories overlap.",
        "Answer the INIT question from the retained seven fields. Identify missing flags, TLVs, timestamps and capture-completeness evidence.",
        "Inspect raw source keys and SHA-256, then test unknown view/filter IDs and keyboard reset; stale records must disappear without changing learner progress.",
        "Download inert help and private preparation, then run the unchanged actual companion sequentially using its printed root. Retain normal/five interrupted cleanup checks against the independent baseline.",
        "Optional prepared Cisco branch: record nonpassive owned transit and original service; introduce only its passive setting, observe actual effects, remove only that setting and compare both-end configuration/routing/original service against baseline. This guided branch was not executed here."
      ],
      "verification": "Eight views and four overlapping capture filters are independently compared against source-hashed actual records. Peer address/interface and queue, selected RIB/kernel, phase-specific probes and packet fields remain exact. No live diagnosis, INIT handshake, timer expiry, full retry history or application/convergence certification is inferred. Optional rollback requires actual effective configuration and original traffic evidence.",
      "troubleshooting": "Investigate the first missing evidence layer and both directions. Keep empty table, initialization transport, liveness, selected routing and original transaction distinct. Preserve display discrepancies and rejected settings; do not repair a worksheet by changing a router broadly.",
      "challenge": "Why can discovery appear while reliable initialization fails? Then explain why Q zero and opcode 1 do not respectively prove no loss or INIT. Finally compare link-restored and combined recovery without assigning unrecorded probes to the earlier phase.",
      "cleanup": "Inspector reset returns baseline R1/all headers and clears feedback/raw expansion without router or learner-progress mutation. Actual runner removes only owned namespaces/daemons/capture/private paths and verifies the independent host baseline. Optional target restoration removes only the introduced passive setting for the explicitly prior nonpassive interface; no process deletion, unrelated configuration or save/reload."
    },
    "glossary": {
      "Neighbor": "Local peer relationship in the applicable family/table/AS and interface context.",
      "Advertised hold": "Sender-declared tolerance used by the receiving peer for liveness.",
      "SRTT": "Smoothed control packet/acknowledgment timing estimate, distinct from application RTT.",
      "RTO": "Reliable retransmission timeout, distinct from hold time.",
      "Transport queue": "Outstanding protocol transmission context; not a learned-prefix count.",
      "Initialization": "Startup reliable exchange whose flags/completeness require more than opcode.",
      "Acknowledgment-bearing header": "Nonzero acknowledgment field, which may accompany an UPDATE.",
      "Passive interface": "Configuration suppressing neighbor operation on a supported attachment.",
      "PASSIVE route": "Settled DUAL route computation, distinct from interface suppression.",
      "Observer scope": "Device/family/table/AS/interface and checkpoint retained with its records.",
      "Intermediate checkpoint": "Link-restored snapshot before the additional owned-daemon restart procedure.",
      "Evidence gap": "A field or observation not retained, which cannot be filled by another phase."
    },
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Protocol admission",
        "question": "Which identifier should an IPv4 admission rule examine for ordinary EIGRP control packets?",
        "answer": "IP protocol 88.",
        "explanation": "The protocol field differs from a TCP/UDP port; destination and interface scope still matter.",
        "type": "multiple-choice",
        "options": [
          "UDP destination port 88.",
          "IP protocol 88.",
          "TCP destination port 179.",
          "OSPF area number 88."
        ],
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q01"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Observer identity",
        "question": "R1 sees peer 203.0.113.2 while R2 has router ID 2.2.2.2. Which value is the neighbor attachment address in this retained row?",
        "answer": "203.0.113.2.",
        "explanation": "Peer endpoint and routing identity are separate fields.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q02"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Timer direction",
        "question": "R2 advertises a 15-second hold duration. Which observer applies that value when deciding how long to tolerate accepted silence from R2?",
        "answer": "R1, as the receiver of R2’s advertised hold.",
        "explanation": "The local countdown concerns the remote sender; inspect actual accepted traffic and context.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q03"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Transport timing",
        "question": "Why is the neighbor SRTT field unsuitable as a direct application RTT or interface metric-delay measurement?",
        "answer": "It concerns EIGRP control packet and acknowledgment timing, which is a different measurement.",
        "explanation": "The retained value and units do not measure the original application or configured cost metadata.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q04"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Incomplete startup",
        "question": "Small multicast Hellos arrive, but reliable startup exchange repeatedly stalls. What next investigation fits?",
        "answer": "Inspect two-ended reliable unicast/ACK delivery, initialization detail and applicable MTU/loss/admission evidence.",
        "explanation": "Discovery success alone does not establish delivery of larger or reliable exchange packets.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q05"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Route versus interface",
        "question": "A topology entry is P while the transit has a neighbor. Is that a contradiction proving passive-interface failed?",
        "answer": "No; P describes settled route computation, not interface neighbor suppression.",
        "explanation": "Inspect actual interface configuration separately.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q06"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Snapshot scope",
        "question": "The retained baseline Q value is zero. Which conclusion follows?",
        "answer": "No outstanding queue is displayed at that snapshot; prior loss and original service require separate evidence.",
        "explanation": "A single queue field is not a complete reliable history or data-plane test.",
        "type": "multiple-choice",
        "options": [
          "No EIGRP packet was ever lost.",
          "Every advertised prefix is installed in the kernel.",
          "The original TLS service has been tested successfully.",
          "No outstanding queue is displayed at that snapshot; prior loss and original service require separate evidence."
        ],
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q07"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Overlapping packet filters",
        "question": "Why can adding the UPDATE filter count and acknowledgment filter count exceed the number of distinct matching startup headers?",
        "answer": "A retained UPDATE can carry a nonzero acknowledgment, so the filters overlap.",
        "explanation": "Classify both opcode and acknowledgment context; these are not disjoint packet categories.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q08"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "INIT evidence",
        "question": "What do the retained opcode-1 startup headers prove about INIT?",
        "answer": "They identify UPDATE; INIT flags and complete startup handshake are not retained.",
        "explanation": "The seven fields omit flags/TLVs/timestamps and completeness.",
        "type": "multiple-choice",
        "options": [
          "Every UPDATE is proven to carry INIT.",
          "Opcode 1 proves both peers have installed every prefix.",
          "They identify UPDATE; INIT flags and complete startup handshake are not retained.",
          "The capture certifies elapsed convergence time."
        ],
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q09"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Recovery intervention",
        "question": "Why can the passing recovered neighbor and ICMP observations not prove automatic link-up-only recovery?",
        "answer": "The documented repair additionally restarts both owned eigrpd children; the earlier link-restored phase has separate observations.",
        "explanation": "Preserve intervention and phase-specific probe evidence; rejected link-only evidence remains retained.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Local labels",
        "question": "Must local named EIGRP instance labels be textually equal for this lesson’s compatibility reasoning?",
        "answer": "No.",
        "explanation": "Relevant family/AS/admission and supported configuration context still must be compatible.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-QC1"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Clocks",
        "question": "Is RTO the same clock as the neighbor hold countdown?",
        "answer": "No.",
        "explanation": "Reliable retransmission and peer liveness are distinct.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-QC2"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Phase evidence",
        "question": "Can recovered endpoint probes be assigned to the intermediate link-restored view when that phase retained no endpoint probe?",
        "answer": "No.",
        "explanation": "Each observation belongs to its actual checkpoint; absence remains an evidence gap.",
        "type": "short-answer",
        "topicId": "s3-g2-t2",
        "questionId": "s3-g2-t2-QC3"
      }
    ],
    "sources": [
      {
        "title": "RFC 7868: discovery, hold direction and reliable initialization",
        "url": "https://www.rfc-editor.org/rfc/rfc7868",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 IP command reference: scoped peer/interface/traffic views",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco EIGRP troubleshooting: reliable exchange, admission and interpretation limits",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/118974-technote-eigrp-00.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco EIGRP passive interface behavior",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13675-16.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco EIGRP neighbor command fields and units",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_eigrp/command/ire-cr-book/ire-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 neighbor implementation",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_neighbor.c",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 topology CLI entry points",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_vty.c",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 EIGRP daemon context",
        "url": "https://docs.frrouting.org/en/stable-8.4/eigrpd.html",
        "checked": "2026-10-09"
      }
    ]
  },
  {
    "id": "s3-g2-t3",
    "batch": "09",
    "title": "EIGRP topology",
    "subtitle": "Corroborate reported paths, distance history and installation at one observer and prefix.",
    "level": "Intermediate → Advanced",
    "minutes": 75,
    "definition": "The EIGRP topology table is the routing process’s per-destination working information: locally known networks, neighbor-reported paths, metric vectors and route-computation context. It is not a global physical map, an OSPF link-state database or the selected system routing table. A path can be retained without being locally feasible, selected, installed or usable for an original endpoint. Interpret the command, observer, family/table/AS, destination and implementation before reading successor and distance fields. This original topology node brings the previous protocol, metrics and neighbor lessons together.",
    "purpose": "A topology view helps explain what the process knows and why it might choose or investigate a path. Operators use it to distinguish a missing advertisement, a candidate that fails immediate feasibility, coordinated route computation, a selected EIGRP path displaced by another source and a forwarding or service problem after installation. The important skill is correlating separate layers without treating one table as all of them. The actual inspector contrasts remote, local and transit prefixes across two observers and four phases, including display discrepancies that would be missed by simply trusting a successor count.",
    "mental": "Use four ledgers: what peers reported, what the protocol’s computation permits, what the system selected and installed, and what the original endpoint exchange actually did. A retained line in the first ledger is not an approval stamp on the last. Distance history is another record attached to one destination; today’s complete cost does not rewrite it automatically. The topology analogy is a set of candidate cards rather than a full street map. Preserve observer and phase on every card. When records disagree, investigate the disagreement instead of repainting every ledger to match one convenient display.",
    "components": [
      "Destination scope: observer, IPv4/IPv6 family, table/VRF, AS and exact prefix. A local LAN and the remote LAN have different selection/forwarding context.",
      "Path information: neighbor or Connected source, applicable interface, advertised vector and local complete metric. External/summary/redistributed paths require their own origin context.",
      "Historical feasibility: one destination FD history and each usable peer’s reported distance; strict RD < FD is sufficient local feasibility, not a proof from any literal display line.",
      "Route-computation state: PASSIVE is settled; ACTIVE is coordinated work with reply obligations. It is unrelated to interface passive configuration or physical activity.",
      "Selection/installation: protocol candidates, selected exact-prefix RIB and actual forwarding objects have separate flags and source preferences.",
      "Evidence boundaries: command filtering, implementation display, independent kernel records, original endpoint probes and missing measurements remain explicit."
    ],
    "mechanism": [
      "Name one observer and destination first. The actual R1 local LAN is 192.0.2.0/24 and its remote endpoint LAN is 198.51.100.0/24; R2 reverses those roles. Their shared transit is 203.0.113.0/30. Keep table/family/AS and source interface with the record. A topology table does not distribute an OSPF-style common link-state graph. Knowing the local candidates does not reveal every router’s database, physical fault domain or return policy. A command scoped to a different VRF or a covering prefix can answer a different question.",
      "Read destination and path fields separately. An entry can display state, successor count and an FD-labelled value, followed by per-path via/interface and current-total/reported-distance pairs. Under the retained uniform default example, the remote path shows (30720/28160): current complete cost first, neighbor’s remaining cost second. They are not bandwidth/latency or AD/metric. A Connected line in this pinned output has no such pair; do not fill its missing total/RD from the destination FD field. Retain actual vector mode and units from the metrics lesson before comparing other platforms.",
      "Treat historical feasible distance as history, not a synonym for today’s best path. In the protocol definition it is the least-known complete metric since the last ACTIVE-to-PASSIVE transition, so a higher current cost need not raise it. A newly lower total can lower that record. One literal CLI field cannot reconstruct the full history or certify an implementation’s behavior. The inspector labels its value displayed FD and advances no history. If an incident depends on a past threshold, preserve prior observations and supported detailed computation context rather than inventing that threshold from a current route line.",
      "Apply strict feasibility before ranking an immediate alternative. With supplied completed FD 100, candidate B with RD 90/total 140 satisfies 90 < 100; candidate C with RD 100/total 120 fails equality despite its lower total. Failure of this sufficient test does not prove C physically loops or is permanently unreachable. The previous protocol worksheet handles this frozen local comparison; it does not perform coordinated DUAL computation or advance history. A usable successor or alternative also needs the relevant peer, vector and policy context, not just a two-number comparison typed into a browser.",
      "Separate successor, feasible successor and every retained candidate. A selected protocol path is associated with the least applicable complete distance after algorithm and policy context; a feasible alternative can provide a loop-free local replacement without waiting for coordinated computation. A topology command that includes all links can show paths that fail immediate feasibility. Absence from a filtered display is not proof no advertisement ever existed. Conversely, mere presence in an all-links output does not promote a candidate into the selected RIB. Supported equal/unequal-cost installation, variance and path limits require their own design and target evidence; no actual alternate successor or multipath is exercised here.",
      "Read PASSIVE and ACTIVE as route-computation context. PASSIVE means no coordinated recomputation is underway in the protocol model, not that an interface sends no Hellos. ACTIVE involves outstanding computation/reply obligations, not healthy data-plane activity. QUERY, REPLY and SIA exchange are control messages, not OSPF LSAs. Missing replies require supported peer, transport, dependency and query-boundary investigation. Timers or a broad process clear do not explain every ACTIVE symptom. The retained companion contains no verified ACTIVE/query/SIA trace, so the static lesson explains those mechanisms without pretending the fault capture demonstrates them.",
      "Keep advertisement and query boundaries in the analysis. Split horizon, summarization, redistribution and stub/query design can affect information propagation and dependencies under the supported topology. They are not universal toggles to make any alternate feasible, and a summary also changes what exact prefixes are available downstream. Internal and external routes have different origin context; compare relevant source preference only after identifying the exact prefix/table. This lesson supplies no split-horizon, summary, redistribution, stub, variance or query-boundary configuration mutation. Evaluate those later route-control designs with actual platform and original traffic requirements.",
      "Continue to the system routing table. The process can retain a directly attached network and offer an EIGRP candidate while the system prefers a connected route. In the owned baseline, local LAN EIGRP candidate objects lack selected/installed true flags while the independent kernel has a direct kernel route. A lower administrative distance from another same-prefix source can similarly displace an EIGRP candidate; longest-prefix forwarding then operates among installed prefixes. Protocol metric, administrative distance, scaled wide representation and Linux kernel priority are not interchangeable. A route line can be selected yet still fail the original transaction for a different reason.",
      "Preserve discrepancies in the actual fault display. After the owned transit goes down, the pinned topology output can retain a P header, a displayed successor and its old distance pair even though peers and installed remote forwarding are gone. Some raw via tokens in fault/intermediate snapshots do not match the intended 203.0.113 peer. The inspector keeps those strings visible but requires separate peer, selected/installed active-FIB RIB next hop and kernel match before reporting agreement. It does not treat those tokens as valid peers, repair the captured text, infer full DUAL history or diagnose a software root cause from one display.",
      "Do not interpret duplicate Connected lines as physical redundancy. The retained baseline can show the same Connected/transit path more than once and a corresponding displayed successor count. Its candidate next-hop metadata can include a duplicate flag, while the owned topology still has one logical transit and one peer. Direct kernel entry presence is recorded separately from EIGRP selection or real usability. The inspector preserves duplicates and literal counts without claiming two physical paths, installed EIGRP ECMP or doubled per-flow throughput. Check unique interface/next-hop and independent hardware/traffic context before describing multipath.",
      "Compare phases without borrowing evidence. Baseline and combined recovery retain successful original endpoint ICMP in both directions; the known transit-down phase retains remote failures and working local gateways. The intermediate link-restored phase has neighbor/topology/RIB/kernel records but no stored endpoint probe. The passing repair explicitly restores the link and restarts both identity-checked owned eigrpd children with unchanged configuration. Rejected link-only and requested-setting trials remain separate. This experiment verifies its bounded intervention, not automatic link-only convergence, alternate-path failover, application recovery or elapsed convergence time.",
      "Build a scoped investigation and exact restoration plan. Preserve version, configuration, peer, interface/vector and original-source baseline, then read all-links/detail/active and exact destination selection using supported target syntax. Compare both observers and repeat only the relevant evidence after the known intervention. If display and installation disagree, retain raw records and version rather than issuing broad clears or guessing a metric change. Original service closure requires correct return, policy, source/table and application behavior. The actual companion’s cleanup independently preserves the host; the browser only selects saved evidence and never runs a device command."
    ],
    "flow": [
      [
        "Scope one prefix and observer",
        "Record family/table/AS, command filter, origin and phase."
      ],
      [
        "Read protocol path and history context",
        "Separate displayed total/RD/FD, state and candidate feasibility."
      ],
      [
        "Corroborate selected installation",
        "Compare peer, RIB flags/next hop and independent kernel entry."
      ],
      [
        "Verify original traffic and restore",
        "Keep original endpoint/return/service and intervention evidence in its own phase."
      ]
    ],
    "comparison": [
      [
        "Topology / system RIB / forwarding",
        "Protocol working candidates / source selection / actual path programming",
        "A retained line does not prove installed or usable forwarding."
      ],
      [
        "Current total / reported distance / FD history",
        "Complete local cost / neighbor remaining cost / least-known history",
        "Displayed FD cannot reconstruct every transition."
      ],
      [
        "Successor / feasible alternative / all-links candidate",
        "Applicable protocol choice / strict sufficient local alternative / retained path",
        "A cheaper total can still fail RD < FD."
      ],
      [
        "PASSIVE / passive interface",
        "Settled route computation / interface neighbor suppression",
        "Neither term proves original service by itself."
      ],
      [
        "Local Connected candidate / selected connected route",
        "Protocol offer / independently preferred direct source",
        "The owned EIGRP candidate is not selected over the kernel direct route."
      ],
      [
        "Displayed successor / corroborated remote path",
        "Literal command field / peer + selected RIB + kernel agreement",
        "Fault output retains fields even after remote withdrawal."
      ],
      [
        "Duplicate Connected lines / real multipath",
        "Retained implementation display / independently verified distinct usable paths",
        "No doubled throughput or physical redundancy is inferred."
      ],
      [
        "Intermediate link restoration / combined recovery",
        "Earlier saved records without endpoint probes / link plus both daemon restarts and tested ICMP",
        "Later observations cannot fill an earlier evidence gap."
      ]
    ],
    "example": "Read R1 baseline for 198.51.100.0/24: topology P, one displayed successor, displayed FD 30720 and via 203.0.113.2 (30720/28160), transit. The neighbor row, selected/installed active-FIB RIB next hop and independent kernel gateway agree, while both original endpoint ICMP probes succeed. Change to the known fault phase: raw topology can still display P/one successor and the distance pair, but the remote EIGRP candidate lacks selected/installed flags, the peer is absent and the remote kernel path is gone. An unexpected raw via token is preserved, not endorsed. Now select local LAN: its retained EIGRP candidate is unselected while a direct kernel route remains. Select transit at baseline to inspect any duplicate Connected lines without inventing a second physical path. Finally read combined recovery and retain the explicit link-plus-daemon intervention. None of these snapshots derives a full FD history or application result.",
    "commands": [
      {
        "code": "show version\nshow running-config\nshow ip protocols",
        "explanation": "Preserve supported release, observer/table/family/AS, metric mode and original policy.",
        "expected": "GUIDED, NOT EXECUTED: prepared supported isolated target and authorized context. Record real interface/vector/peer/source baseline on both observers; configuration can contain sensitive topology metadata. No global configuration change.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp neighbors detail\nshow ip eigrp interfaces detail",
        "explanation": "Correlate usable peer and effective attachment/vector context before trusting via fields.",
        "expected": "GUIDED, NOT EXECUTED: substitute supported scoped family/VRF syntax when needed. Peer address/interface and transport state are independent from a topology successor count. Preserve actual timer/display discrepancies rather than assuming defaults.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp topology all-links\nshow ip eigrp topology detail-links\nshow ip eigrp topology 198.51.100.0/24",
        "explanation": "Read command-filter semantics and one exact destination’s paths/vector/context.",
        "expected": "GUIDED, NOT EXECUTED: the release reference supports these views; actual target output/mode and table must match. All-links can retain nonfeasible sources; Connected/summary/external entries need their own context. A literal FD-labelled field is not full historical evidence.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip eigrp topology active\nshow logging",
        "explanation": "Investigate actual coordinated computation/reply context and retained events without a broad reset.",
        "expected": "GUIDED, NOT EXECUTED: absence of an ACTIVE row in one snapshot is not a full history. Correlate supported query/reply/peer detail and timestamps; no actual ACTIVE/query/SIA, unrestricted debugging, timer change or process clear is claimed.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "show ip route 198.51.100.20\nshow ip cef 198.51.100.20\nshow ip route 192.0.2.10\nshow ip cef 192.0.2.10",
        "explanation": "Continue to selected exact destination/return lookup and original traffic evidence.",
        "expected": "GUIDED, NOT EXECUTED: verify original source/table, matched prefix, selected source/representation and next hop. Route/CEF presence alone is not hardware programming, correct return or an application transaction. Use the actual original bounded service test and restore prior intent for any separately authorized change.",
        "filename": "ios",
        "platform": "Prepared supported isolated IOS XE IPv4 EIGRP lab · guided, not executed here"
      },
      {
        "code": "bash labs/prepare-frr-runtime.sh --prepare",
        "explanation": "Use the shared privately extracted pinned runtime for the unchanged actual companion.",
        "expected": "ACTUAL PACKAGE PREPARATION: Ubuntu 24.04 amd64 with configured authenticated APT indexes and supporting libraries. Use the printed extracted root; missing pinned packages fail. No maintainer scripts or global service installation. Reference to the same verified private preparation.",
        "filename": "bash",
        "platform": "Ubuntu 24.04 amd64 · actual private package extraction"
      },
      {
        "code": "bash labs/eigrp-routing.sh\nFRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/eigrp-routing.sh --run",
        "explanation": "Read inert help and explicitly execute the unchanged owned topology/selection/fault/recovery experiment.",
        "expected": "ACTUAL FRR/LINUX: two IPv4 AS 100 observers, raw topology/interface/neighbor/configuration, selected RIB/kernel and original bounded ICMP. Known transit-down and intermediate link-restored records remain distinct from combined recovery including both owned daemon restarts with unchanged configurations. Fault display discrepancies/duplicate Connected records are retained without valid-peer/multipath endorsement. Normal/five interrupted cleanup paths preserve host baseline. No actual FD-history reconstruction, alternate successor, ACTIVE/query/SIA, Cisco, custom metric/timer/passive settings, IPv6, authentication, application, hardware, zero-loss or convergence benchmark.",
        "filename": "bash",
        "platform": "Root isolated Linux namespace/mount lab · FRR 8.4.4 actual execution"
      }
    ],
    "configuration": "This lesson uses inspection and the existing actual owned companion; it supplies no topology-tuning configuration mutation. Record actual release/support, family/table/AS, instance, peer/attachment mapping, metric mode/weights/vector and existing advertisement/source/return policy. Use supported exact-prefix/all-links/detail/active views rather than importing syntax from a different platform. Preserve original configuration and original-source service baseline before any separately authorized intervention. Summary/redistribution/stub/query, split-horizon, variance/path-limit and wide representation changes are separate designs. Do not change them, clear all routes or restart a production process to force one display to match a hand calculation. The actual runner’s owned link and daemon intervention is isolated and explicit, not a universal production procedure.",
    "production": "Use a destination-specific evidence timeline with both observers, relevant command filtering, peer readiness, protocol candidate/history context, selected source, programmed forwarding and original endpoint closure. Keep raw records when software output is inconsistent; retain version and implementation context for further diagnosis rather than converting suspect fields into a topology fact. Evaluate summaries and query boundaries alongside failure domains and original traffic requirements. A stable neighbor does not guarantee every prefix, and a PASSIVE label does not guarantee service. Restoration means exact prior intent plus observed recovery of the actual affected transaction. The companion’s Linux kernel/ICMP evidence is useful but does not certify hardware, scale, application health or recovery objectives.",
    "troubleshooting": [
      [
        "Prefix absent in normal topology view",
        "Inspect correct observer/family/table/AS, command filters, actual advertisement and supported all-links/detail context. Absence from a filtered view is not proof no candidate exists."
      ],
      [
        "Cheap alternate not immediately chosen",
        "Compare usable peer, reported distance and actual historical FD before total ranking; equality fails the strict sufficient condition. Do not assert that a failed condition proves a physical loop."
      ],
      [
        "Current metric changed, FD explanation unclear",
        "Preserve actual mode/vector and prior route-computation history. A higher current cost need not raise least-known history; a display alone cannot reconstruct it."
      ],
      [
        "Topology looks healthy, remote traffic fails",
        "Continue to selected/installed flags, active-FIB next hop, exact destination lookup, independent forwarding/return and original application. The actual fault demonstrates this discrepancy."
      ],
      [
        "Unexpected next-hop token",
        "Preserve the literal raw output and version. Compare intended/current peer, selected RIB gateway and kernel path; do not treat an uncorroborated token as a valid peer or diagnose a memory/software root cause from this snapshot."
      ],
      [
        "Two Connected lines on one transit",
        "Inspect duplicate next-hop metadata, unique interface and independent kernel entry. Displayed count is not physical redundancy or installed multipath proof."
      ],
      [
        "Route remains ACTIVE",
        "Inspect supported reply obligations, peer/transport health, dependencies and query boundaries with timestamps. No actual ACTIVE/SIA trace is retained here; avoid unscoped timer/reset changes."
      ],
      [
        "Link restored but recovery unclear",
        "Keep intermediate records and missing endpoint probe separate from the later combined link/daemon repair. Recheck original service after the actual intervention and exact restoration."
      ]
    ],
    "security": "Candidate routes and topology output can reveal addresses, policy and origin information; collect and share only authorized evidence. Protect intended peer admission and supported authentication, and restrict who can alter route policy or metric/query boundaries. AS, a plausible metric and a displayed successor are not identity or path-validity proofs. Unexpected display tokens are treated as uncorroborated evidence, not a certified software exploit or vulnerability. The inspector uses fixed checkpoint/prefix selections, bounded parsing of the retained format, fresh values and text-only dynamic rendering. Selection and reset never execute commands or change routing configuration. No production credential or authentication experiment is performed.",
    "performance": "Protocol choice, kernel programming, physical path diversity and original per-flow throughput/latency are different outcomes. Equal costs or duplicate display lines do not establish installed ECMP or doubled per-flow capacity. Metric/RIB-scale values and kernel priority are not performance measurements. Query fan-out, dependency boundaries, transport loss and route churn can affect computation, but this companion does not benchmark them. A retained fault topology label does not override independent withdrawal and failed original ICMP. Successful recovered ICMP is bounded traffic evidence without an application listener, hardware proof, zero-loss claim or elapsed convergence objective. The inspector performs read-only snapshot parsing, not a live routing calculation.",
    "mistakes": [
      "Treating EIGRP topology as a globally shared OSPF link-state database.",
      "Confusing current total/RD, historical FD, administrative distance and kernel priority.",
      "Deriving a missing Connected path pair from an FD-labelled header.",
      "Ranking total before strict feasibility or treating equality as RD < FD.",
      "Declaring a nonfeasible candidate a proven loop or permanently unreachable network.",
      "Reading PASSIVE as passive-interface or ACTIVE as healthy forwarding.",
      "Treating all-links presence as selected/installed status.",
      "Assuming an EIGRP connected candidate displaced the preferred direct system route.",
      "Endorsing an unexpected raw via token without peer/RIB/kernel corroboration.",
      "Converting duplicate Connected lines into physical redundancy or throughput proof.",
      "Borrowing recovered endpoint probes for the intermediate link-restored phase.",
      "Claiming automatic link-only recovery, full DUAL history or application convergence from the owned combined repair."
    ],
    "prerequisites": [
      "s3-g2-t0",
      "s3-g2-t1",
      "s3-g2-t2"
    ],
    "related": [
      "s3-g0-t0",
      "s3-g0-t1",
      "s3-g1-t4",
      "s1-g4-t0"
    ],
    "interactive": "eigrp-topology",
    "ports": "EIGRP IPv4 control uses IP protocol 88, not TCP/UDP port 88. QUERY/REPLY and acknowledgments belong to EIGRP control/transport context, not application ports or OSPF flooding. This topology experiment is IPv4; supported IPv6/family/table scope needs separate evidence.",
    "artifacts": [
      {
        "title": "Actual unchanged EIGRP topology companion",
        "path": "labs/eigrp-routing.sh"
      },
      {
        "title": "Pinned private preparation",
        "path": "labs/prepare-frr-runtime.sh"
      }
    ],
    "lab": {
      "objective": "Separate literal topology fields from peer/selected-RIB/kernel corroboration for remote, local and transit prefixes, then verify original phase-specific traffic and evidence limits.",
      "requirements": "Browser inspector requires no router. Actual companion needs Ubuntu 24.04 amd64, root network/mount capability, private FRR 8.4.4 and existing ip/ping/sysctl/python3/unshare/mount/timeout/getent/TShark. Vendor inspection needs authorized supported prepared devices and actual table/family/release context.",
      "topologyKind": "shared",
      "topology": [
        "Client 192.0.2.10 → R1 local LAN",
        "R1 203.0.113.1 ↔ R2 203.0.113.2 · one transit / AS 100",
        "R2 remote LAN → Server 198.51.100.20",
        "Candidate display → selected RIB → kernel → original exchange"
      ],
      "steps": [
        "Read R1/R2 baseline remote prefixes. Interpret displayed total/RD and corroborate actual peer, selected/installed active-FIB next hop and kernel gateway.",
        "Compare both fault remote prefixes. Retain displayed successor/state/distance and unexpected via strings without treating them as valid paths; correlate absent peer, withdrawn selection/kernel and failed original probes.",
        "Select local LAN on both observers. Distinguish retained unselected EIGRP candidate from direct kernel route; do not invent missing Connected total/RD.",
        "Select shared transit. Inspect any duplicate Connected lines and metadata; compare unique interface and direct kernel entry without claiming physical multipath.",
        "Compare intermediate link-restored and combined recovery. Keep missing intermediate endpoint probes and explicit both-daemon restart intervention visible.",
        "Revisit the previous protocol worksheet’s supplied FD 100, B RD90/total140 and C RD100/total120. Explain strict sufficient feasibility and why no full DUAL history/computation is run here.",
        "Inspect source hashes and raw records; unknown checkpoint/prefix input must hide stale evidence, and keyboard reset must preserve learner progress.",
        "Download inert help and shared preparation, then explicitly run the unchanged actual companion sequentially with the printed root. Retain normal/five interrupted cleanup verification against the independent host baseline.",
        "Use guided supported inspection to preserve actual prefix/peer/vector/computation/selection/original-service evidence. This page supplies no production topology-policy or broad reset mutation."
      ],
      "verification": "Twenty-four observer/checkpoint/prefix combinations are independently compared with exact retained source blocks, RIB flags and kernel entries. Remote baseline/recovered agreement and fault noncorroboration are checked; connected pairs remain absent, duplicate raw lines preserved and intermediate probes unfilled. Parser supports only the pinned retained format, not arbitrary Cisco output or a full routing algorithm.",
      "troubleshooting": "Investigate the first disagreement between scoped advertisement, route computation, selection, forwarding and original traffic. Preserve suspect display text/version and source phase rather than guessing missing history or changing configuration broadly.",
      "challenge": "Why can the fault still display one successor while remote traffic fails? Then explain the unselected local Connected EIGRP candidate and any duplicate transit records. Finally contrast strict FD100/RD90 versus equality100 without calling the snapshot a full DUAL execution.",
      "cleanup": "Reset returns fault R1/remote prefix and clears feedback/raw expansion without router or learner-progress mutation. Actual companion removes only owned namespaces/daemons/capture/private paths and verifies host baseline. No new vendor mutation is supplied; restore actual prior intent and original service for any separately authorized experiment."
    },
    "glossary": {
      "Topology table": "Protocol working destination/path information, distinct from a global physical map or selected system RIB.",
      "Displayed FD": "Literal retained FD-labelled field; not reconstruction of full historical state.",
      "Current total": "Complete local path cost for the applicable vector and snapshot.",
      "Reported distance": "Neighbor-advertised remaining destination cost.",
      "Feasibility condition": "Strict sufficient RD < historical FD comparison in its valid algorithm context.",
      "Successor": "Applicable least-cost protocol path choice under algorithm/policy context.",
      "Feasible alternative": "Usable peer path satisfying the strict local sufficient condition.",
      "All-links view": "Supported command exposing retained paths including nonfeasible sources.",
      "Corroborated remote snapshot": "Matching recorded peer, selected/installed active-FIB RIB next hop and kernel gateway.",
      "Unselected candidate": "Retained protocol offer without selected/installed true flags.",
      "Duplicate display": "Repeated literal path record, not independently verified physical diversity.",
      "Evidence discrepancy": "Records disagree; preserve and investigate rather than endorsing one display."
    },
    "exams": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Table boundaries",
        "question": "What does an EIGRP topology table primarily contain?",
        "answer": "The local process’s destination/path and computation information.",
        "explanation": "It is distinct from selected system routing and a globally shared OSPF link-state graph.",
        "type": "multiple-choice",
        "options": [
          "Every router’s identical OSPF link-state database.",
          "The local process’s destination/path and computation information.",
          "Measured application transaction results.",
          "Only hardware-programmed forwarding entries."
        ]
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Metric pair",
        "question": "In the retained remote path (30720/28160), which value is current complete cost and which is neighbor reported distance?",
        "answer": "Current total 30720; RD 28160.",
        "explanation": "These are metric fields, not administrative distance or measured bandwidth/latency.",
        "type": "short-answer"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Historical FD",
        "question": "A current path becomes more expensive while the route remains settled. Must the least-known historical FD immediately increase to the new total?",
        "answer": "No.",
        "explanation": "Historical least-known cost and current total are distinct; preserve actual history rather than deriving it from one display.",
        "type": "short-answer"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Strict feasibility",
        "question": "With supplied completed FD100, B RD90/total140 and C RD100/total120, which path passes the strict sufficient local condition?",
        "answer": "B; 90 < 100, while C fails equality.",
        "explanation": "Ranking the cheaper total first would incorrectly admit C; failed sufficiency does not prove a physical loop.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Filtering",
        "question": "Why can a supported all-links topology view contain a path absent from the ordinary filtered view?",
        "answer": "All-links can expose retained nonfeasible sources that the ordinary view omits.",
        "explanation": "Command-filter scope is not the same as RIB selection or advertisement history.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Actual discrepancy",
        "question": "The owned fault displays P and one successor, yet the remote candidate is unselected/uninstalled and absent from the kernel. Which conclusion is supported?",
        "answer": "The literal topology display does not establish an installed remote forwarding path.",
        "explanation": "Independent selection/kernel/probe evidence contradicts promoting that display to usable forwarding.",
        "type": "multiple-choice",
        "options": [
          "The remote path is proven installed because successor count is one.",
          "P proves that the transit was configured passive.",
          "The literal topology display does not establish an installed remote forwarding path.",
          "The unexpected via token is necessarily a valid current peer."
        ]
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Connected selection",
        "question": "Why can the local LAN remain in the EIGRP topology/candidate output while its EIGRP selected/installed flags are absent?",
        "answer": "The system can prefer the directly connected route; protocol candidate presence is separate from selection.",
        "explanation": "The owned direct kernel entry corroborates that distinction, not missing reachability.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Duplicate display",
        "question": "Two identical Connected/transit display lines appear on the owned single transit. What should be established before claiming real multipath?",
        "answer": "Distinct usable installed paths and independent interface/forwarding/traffic evidence.",
        "explanation": "Display duplication or count alone is not physical redundancy or doubled per-flow throughput.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Unexpected token",
        "question": "What is the appropriate treatment of an unexpected raw fault via token that does not match intended peer/RIB/kernel context?",
        "answer": "Preserve it as uncorroborated display evidence and investigate the exact version/records.",
        "explanation": "Do not endorse it as a valid peer or infer a specific software vulnerability/root cause from this snapshot.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "Phase and intervention",
        "question": "What prevents the combined recovered topology/RIB/kernel/ICMP snapshot from proving automatic link-up-only convergence?",
        "answer": "The passing procedure additionally restarts both owned daemons, and the intermediate phase has no retained endpoint probe.",
        "explanation": "Each intervention and observation belongs to its actual phase.",
        "type": "multiple-choice",
        "options": [
          "Every recovered P label contains an elapsed convergence timestamp.",
          "Topology state certifies the original TCP/TLS transaction.",
          "An intermediate evidence gap can be filled by later probes.",
          "The passing procedure additionally restarts both owned daemons, and the intermediate phase has no retained endpoint probe."
        ]
      }
    ],
    "quick": [
      {
        "difficulty": "Beginner",
        "testedConcept": "Route state",
        "question": "Does topology PASSIVE mean that its interface suppresses EIGRP neighbors?",
        "answer": "No.",
        "explanation": "Settled route computation and passive-interface configuration are separate.",
        "type": "short-answer"
      },
      {
        "difficulty": "Intermediate",
        "testedConcept": "Missing pair",
        "question": "Should the inspector invent total/RD values for a Connected line that retains no metric pair?",
        "answer": "No.",
        "explanation": "The displayed FD field is separate; keep missing per-path fields explicit.",
        "type": "short-answer"
      },
      {
        "difficulty": "Advanced",
        "testedConcept": "ACTIVE evidence",
        "question": "Does this actual link-down topology snapshot prove a complete ACTIVE/query/SIA sequence?",
        "answer": "No.",
        "explanation": "No verified ACTIVE/query/SIA trace or complete FD history was retained.",
        "type": "short-answer"
      }
    ],
    "sources": [
      {
        "title": "RFC 7868: topology, DUAL history and strict sufficient feasibility",
        "url": "https://www.rfc-editor.org/rfc/rfc7868",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 topology filters and path/context fields",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco EIGRP introduction: candidate and path concepts",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13669-1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco EIGRP troubleshooting: ACTIVE/reliable/query context",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/118974-technote-eigrp-00.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 topology CLI entry points",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_vty.c",
        "checked": "2026-10-09"
      },
      {
        "title": "Exact FRR 8.4.4 FSM implementation",
        "url": "https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_fsm.c",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4 EIGRP daemon context",
        "url": "https://docs.frrouting.org/en/stable-8.4/eigrpd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco destination CEF command reference",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch/command/isw-cr-book/isw-s1.html",
        "checked": "2026-10-09"
      }
    ]
  },
{
  "id": "s3-g3-t0",
  "batch": "09",
  "title": "BGP fundamentals",
  "subtitle": "Follow policy-controlled reachability from a live session to the original exchange.",
  "level": "Intermediate → Advanced",
  "minutes": 75,
  "interactive": "bgp",
  "definition": "Border Gateway Protocol exchanges IP-prefix reachability and path attributes between configured speakers. Its path-vector information includes the autonomous systems traversed by a route; local policy determines which routes are admitted, preferred and advertised. BGP is not a shortest-link graph algorithm or a traffic probe. A live session carries control information, while usable forwarding additionally needs an eligible destination, resolvable next hop, selected installation and an appropriate return path. This original topic introduces those layers before the separate eBGP, iBGP, attributes and policy lessons.",
  "purpose": "Use BGP when administrative boundaries, multiple external paths or controlled route distribution require explicit policy. A private enterprise can also use BGP internally; an Internet connection is not a prerequisite. The operational question is which speaker advertises this exact prefix to which peer and under which family/table/policy, followed by how actual packets travel. The accompanying owned two-AS lab deliberately withdraws one origin without dropping the session, making the difference between control connectivity and destination reachability observable.",
  "mental": "Think of speakers exchanging destination cards. Each card names a prefix and carries path attributes; import policy decides whether to consider it, local selection chooses a usable card, and export policy decides which card another peer may receive. The cards are instructions, not delivery receipts. Keep a separate system routing ledger, a forwarding ledger and an original endpoint transaction record. This analogy omits protocol encoding, timers, complete best-path competition and hardware behavior; a browser choice reads preserved evidence rather than sending an UPDATE.",
  "components": [
    "Speaker context: router identity, local/remote AS, peer address, address family and routing table/VRF. External and internal sessions differ by AS relationship, not physical distance.",
    "Transport and negotiation: BGP uses TCP with service port 179. OPEN exchanges protocol identity and parameters/capabilities; KEEPALIVE maintains protocol liveness, UPDATE carries reachability changes, and NOTIFICATION reports a protocol error before closing. Route refresh is a negotiated extension, not a fifth base RFC 4271 message.",
    "Prefix and attributes: NLRI names reachable prefixes. AS_PATH, NEXT_HOP and ORIGIN describe route context; LOCAL_PREF, MED and communities support later policy decisions. Attribute meaning is distinct from an IP forwarding header.",
    "Admission and dissemination: explicitly scoped import/export policy protects each enabled eBGP family. A permitted prefix still requires an origin and applicable advertisement; a configured session does not create routes automatically.",
    "Conceptual stores: Adj-RIB-In represents received route information, Loc-RIB the BGP decision result, and Adj-RIB-Out selected peer advertisements. Implementations need not maintain three physically separate copies, and an ordinary table dump is not necessarily an unfiltered received-route history.",
    "Independent proof: session state, BGP path eligibility, system route selection, forwarding next hop and original service/return observations answer different questions. Preserve observer and phase on each record."
  ],
  "mechanism": [
    "Scope one observer, family, table, peer and destination. In the owned IPv4 example, R1 uses AS 65001 and LAN 192.0.2.0/24; R2 uses AS 65002 and LAN 198.51.100.0/24. Their transit is 203.0.113.0/30. These documentation prefixes and private ASNs are local laboratory identities, not Internet allocations. BGP router ID, peer interface address and AS number are separate identifiers.",
    "Establish transport and protocol agreement. TCP reachability is necessary but not sufficient: local/remote AS intent, address-family activation and negotiated parameters also matter. Base states include Idle, Connect, Active, OpenSent, OpenConfirm and Established. Active is not a success label. Established permits UPDATE exchange; it does not certify a prefix count, installed destination, complete application exchange or stable future session. Preserve the actual error and observer rather than diagnosing every Active session as an ACL fault.",
    "Supply origination deliberately. The pinned FRR lab explicitly enables network import-check and uses network statements matching direct installed LAN prefixes. Merely typing an arbitrary network statement does not establish that it is originated under this preparation. Do not confuse the BGP network command with an OSPF/EIGRP interface selector. Connected/static/redistributed origin methods and aggregate behavior require their own supported design; indiscriminate redistribution is not used here.",
    "Apply policy on each boundary. The owned speakers require eBGP policy and import only the peer LAN while exporting only their own LAN. RFC 8212 specifies that absent explicit import/export policies, routes are not eligible/advertised on external sessions; implementations can expose configuration options that differ, so inspect the exact release and active settings. Turning off protection to make a prefix appear does not resolve incorrect origin, direction or policy intent. A permit-all statement is explicit but can still be unsafe.",
    "Interpret route attributes before choosing a path. AS_PATH records traversed AS context and supports AS-loop rejection; ordinary external propagation adds local-AS context. NEXT_HOP must be recursively resolvable in the applicable table and supported forwarding context. ORIGIN values IGP, EGP and INCOMPLETE describe how the route entered BGP, not the current routing protocol delivering it. The retained local-origin display has empty AS path and next hop 0.0.0.0: this is a local sentinel, not an Ethernet gateway or an instruction to forward packets to the unspecified address.",
    "Separate local BGP choice from installation and dissemination. Conceptual Loc-RIB holds the decision result, but the system RIB can prefer another same-prefix source. Different installed prefix lengths then participate in longest-prefix forwarding. The next-hop route, adjacency and actual forwarding object need their own evidence. A best BGP marker alone is not a hardware FIB or service result. This lab has one remote candidate per observed destination and does not establish a complete vendor best-path ranking, ECMP policy or multi-exit decision.",
    "Correlate the two baseline observers. R1 receives 198.51.100.0/24 with path 65002 and transit peer next hop; R2 receives 192.0.2.0/24 with path 65001. Remote candidates are valid/best, the selected installed eBGP RIB and active/FIB next hop agree, and independent Linux kernel gateway entries corroborate them. Both original endpoint ICMP round trips pass. The local direct kernel entry is a different source from a BGP-origin display. Neither the pinned distance 20 nor a kernel priority is an RFC-wide BGP path metric.",
    "Read the known origin-withdrawal phase. Remove only R2's owned network 198.51.100.0/24 statement. Both observed sessions remain Established and their session counters do not indicate a restart. R1 loses the remote prefix from BGP, selected RIB and kernel, while R2 retains the opposite remote prefix. Both original round trips fail even though local gateways pass: the transaction needs both directions. No endpoint-arrival capture proves the precise location of every failed packet, so retain the known intervention and measured results without inventing a full packet trace.",
    "Restore exactly and repeat the original evidence. Reinsert only the removed owned R2 network statement; the retained baseline configurations return exactly, remote installation and both original probes recover. No broad clear, daemon restart, save, reload or host-interface mutation is part of this repair. Startup capture separately contains OPEN, UPDATE and KEEPALIVE type lists in both directions, sometimes multiple PDUs in one frame. It does not retain phase-specific NLRI/attributes, complete TCP/FSM history or elapsed convergence. Later recovered probes cannot fill missing earlier observations."
  ],
  "flow": [
    [
      "Scope the peer and session",
      "Record observer, AS, family/table and TCP/protocol state."
    ],
    [
      "Admit and advertise the prefix",
      "Check origin and explicit import/export intent."
    ],
    [
      "Corroborate route installation",
      "Separate BGP candidate, selected RIB, next hop and kernel."
    ],
    [
      "Verify the original exchange",
      "Inspect both directions, restore exact intent and repeat probes."
    ]
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
  "example": "Select R1 baseline / remote LAN: compare Established with prefix 198.51.100.0/24, path 65002, next hop 203.0.113.2, selected installation, independent kernel and successful endpoint probes. Select R1 fault / remote: session remains Established but that destination has no retained candidate or installed path. Select R2 fault / remote: its opposite prefix still exists while both original round trips fail. Now inspect local LAN, where an empty path and 0.0.0.0 are local-origin displays, then recovered views. The result explains the known origin withdrawal and exact restoration, not unknown live fault diagnosis or a measured convergence target.",
  "ports": "BGP uses TCP service port 179. One endpoint can use an ephemeral port; both source and destination need not be 179. BGP control transport is distinct from routed endpoint ICMP or application traffic. This companion is IPv4 unicast, not IPv6, VPN or EVPN validation.",
  "commands": [
    {
      "code": "bash labs/bgp-routing.sh --help",
      "explanation": "Read the companion's inert default/help and preparation requirements.",
      "expected": "Help only; no namespace, daemon or configuration is created."
    },
    {
      "code": "sudo env FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/bgp-routing.sh --run",
      "explanation": "Explicitly execute the existing isolated owned FRR 8.4.4 experiment after its private preparation; requires the printed prerequisites.",
      "expected": "Actual separate lab evidence covers Established, prefix/RIB/kernel, bounded endpoint probes, known origin fault, exact repair and owned cleanup. This page does not execute the command."
    },
    {
      "code": "show bgp ipv4 unicast summary json\nshow bgp neighbors json\nshow bgp ipv4 unicast json",
      "explanation": "GUIDED FRR 8.4 inspection in the prepared owned router CLI; match observer/family/table and preserve raw attributes.",
      "expected": "Session, peer AF policy metadata and candidate table are separate records. These exact inspection families are retained by the companion; running them on a new target is not claimed here."
    },
    {
      "code": "show ip route bgp json\nshow running-config",
      "explanation": "GUIDED prepared FRR CLI: compare selected/installed source with original configuration and policy intent.",
      "expected": "Exact-prefix selection is distinct from the BGP table. Handle configuration as sensitive data. No mutation or broad clear is supplied."
    },
    {
      "code": "ip -j route show",
      "explanation": "GUIDED read-only command inside the owned router namespace; a host default table answers a different question.",
      "expected": "Independent destination/gateway/protocol records. A kernel entry does not prove physical hardware forwarding or application success."
    }
  ],
  "configuration": "Use the existing privately extracted runtime and exclusively owned namespaces; never apply the lab AS/prefix/policy to a host or production peer. Record both configurations, AF activation, explicit ebgp-requires-policy, exact-prefix import/export and network import-check before changing anything. In the prepared R2 router BGP 65002 / IPv4-unicast context the sole fault is no network 198.51.100.0/24, and the exact inverse is network 198.51.100.0/24. The companion already performs this scoped pair and configuration comparison. It does not change global forwarding, install a persistent routing service, clear peers or save a new startup configuration. A separately prepared target must reconcile actual prior ownership and supported syntax before any mutation.",
  "production": "Start with the routing relationship and permitted prefixes in each direction, then choose peer/family/table context and supported safeguards. Document origin dependencies, maximum-prefix behavior, monitoring, next-hop recursion, return intent and exact rollback. Test policy changes on an isolated mapped topology before a reviewed rollout; a session dashboard is only one evidence layer. iBGP propagation, reflection, attributes, communities and redistribution follow in their own original topics. This small lab validates one explicit-policy transit and origin fault; it is not an Internet peering design, route-server guide or full multi-exit acceptance.",
  "troubleshooting": [
    [
      "Session not Established",
      "Preserve state/error, local/remote AS, source/peer reachability, TCP access and negotiated family. Active alone does not identify a unique cause; do not begin with a broad clear."
    ],
    [
      "Established but missing destination",
      "Check exact origin and family, export at the sender, import at the receiver and applicable policy defaults. Compare both observers; the owned fault intentionally removes origin while sessions survive."
    ],
    [
      "Candidate retained, route not installed",
      "Inspect eligibility/best context, next-hop resolution and competing exact-prefix system sources. Continue to actual forwarding instead of equating a table row with FIB success."
    ],
    [
      "One direction has a route, original probe fails",
      "Trace opposite source/destination, endpoint routes, policy and original traffic. R2 retains its remote path during the fault but round trips still fail."
    ],
    [
      "IGP origin interpreted as OSPF evidence",
      "Read ORIGIN as a BGP classification and inspect independent origin/configuration. The owned local network statements do not run OSPF."
    ],
    [
      "Capture seems to prove withdrawal details",
      "Keep startup message types separate from phase records. No retained phase NLRI/attributes or timestamps support a full withdrawal wire trace or convergence measure."
    ],
    [
      "Repair succeeded, cleanup uncertain",
      "Compare exact restored configurations and host baseline, owned process/namespace identity and interrupted cleanup evidence. A passing probe does not excuse leaked lab resources."
    ]
  ],
  "security": "Explicit prefix ownership and direction reduce accidental leaks; RFC 8212 default rejection does not protect against an incorrect explicit permit. Review origin validation, session protection, control-plane limits and maximum-prefix behavior for the actual peer/release; none is newly configured or tested by this lab. Route Origin Validation does not validate a whole AS path or every business policy. Keep configuration/capture data private, avoid production AS/prefix impersonation, and preserve an independent management path for authorized changes.",
  "performance": "Selection policy can prefer a longer AS path; AS count is not link bandwidth, router hop count or measured delay. Large tables and updates consume control-plane memory/CPU, while recursion/FIB capacity and data-plane behavior have separate limits. Shorter timers can increase churn and do not guarantee application continuity. The companion records settled outcomes and bounded ICMP, without elapsed convergence, throughput, ECMP or zero-loss measurements. Do not turn a successful isolated round trip into a hardware capacity claim.",
  "mistakes": [
    "Calling Established proof that every prefix is usable.",
    "Confusing ORIGIN IGP with receipt through an IGP.",
    "Treating local 0.0.0.0 NEXT_HOP as a wire gateway.",
    "Equating BGP best with cross-source installation and original service.",
    "Disabling eBGP policy instead of checking origin and direction.",
    "Copying startup frame types into an invented phase withdrawal trace.",
    "Using an unscoped clear or production peer for a one-statement lab fault."
  ],
  "prerequisites": [
    "s3-g0-t0",
    "s3-g2-t3",
    "s1-g2-t0"
  ],
  "related": [
    "s3-g3-t1",
    "s3-g3-t2",
    "s3-g3-t3",
    "s3-g4-t0"
  ],
  "artifacts": [
    {
      "title": "Actual isolated BGP companion",
      "path": "labs/bgp-routing.sh"
    },
    {
      "title": "Pinned private FRR preparation",
      "path": "labs/prepare-frr-runtime.sh"
    }
  ],
  "lab": {
    "objective": "Distinguish session, admitted destination, installed forwarding and original round trip across an owned origin withdrawal and exact repair.",
    "requirements": "Browser selection needs no router. Actual companion needs Ubuntu 24.04 amd64, root network/mount capability, private FRR 8.4.4 and the existing tools listed by --help. Use only the owned namespaces; no host uplink or persistent daemon.",
    "topologyKind": "shared",
    "topology": [
      "Client 192.0.2.10 → R1 AS65001 LAN",
      "R1 203.0.113.1 ↔ R2 203.0.113.2 / one transit",
      "R2 AS65002 LAN → Server 198.51.100.20",
      "Session → prefix → RIB/kernel → original exchange"
    ],
    "steps": [
      "Read both baseline remote views and compare AS/peer/attributes with selected installation, kernel gateway and both probes.",
      "Compare both local views; explain empty path, ORIGIN IGP and local next-hop sentinel without inventing a remote gateway.",
      "Read both fault views. Track which prefix vanished and which remains while the sessions persist and both original round trips fail.",
      "Read both recovered views and retain the single-statement restoration with unchanged session history and exact configuration reconciliation.",
      "Use the named table and raw-record regions with keyboard scrolling; choose invalid context only through test tooling and confirm stale output is hidden.",
      "Read inert help, privately prepare the pinned runtime, explicitly run the isolated companion sequentially, then retain normal and interrupted cleanup evidence.",
      "Separate startup frame type lists from phase-specific route/probe records. Record missing convergence/application/phase packet observations instead of filling them."
    ],
    "verification": "Twelve observer/phase/prefix combinations reconcile retained BGP attributes, selected RIB, independent kernel and actual phase probes. The actual runner independently checks host links/routes/forwarding, groups/mounts, daemon inventory, namespaces and temporary resources after normal plus five interrupted boundaries. Browser choices are evidence inspection only.",
    "troubleshooting": "Find the first scoped disagreement from peer transport through origin/import/export, candidate, installation and original return-service. Preserve raw version/context before changing only demonstrated owned intent.",
    "challenge": "Explain why R2's retained remote route and two Established sessions do not make the fault's original round trips work. Then explain why IGP/0.0.0.0 in a local-origin display proves neither OSPF nor a wire next hop.",
    "cleanup": "Browser reset restores fault R1/remote selection and clears feedback without device or learner-progress mutation. The companion restores exact owned origin intent and removes only identity-checked lab namespaces/daemons/capture/private paths; compare independent host baseline. Do not clear, reload, save or delete unrelated targets."
  },
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
    "Established": "Protocol session state permitting route exchange, not destination/service certification."
  },
  "exams": [
    {
      "testedConcept": "Protocol purpose",
      "question": "What information does BGP primarily exchange?",
      "answer": "Prefix reachability with path attributes.",
      "explanation": "Local routing policy controls admission, preference and dissemination.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "Measured application response times.",
        "Prefix reachability with path attributes.",
        "Every router's identical physical link-state graph.",
        "Ethernet MAC learning entries only."
      ]
    },
    {
      "testedConcept": "Session versus prefix",
      "question": "Both owned sessions are Established, but R1 has no 198.51.100.0/24 entry during the fault. What is demonstrated?",
      "answer": "A live session does not guarantee that destination's admitted route.",
      "explanation": "The known intervention removes R2's origin while session records remain live.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Original return direction",
      "question": "R2 retains 192.0.2.0/24 during the fault. Why can its original endpoint round trip still fail?",
      "answer": "The complete exchange also needs the other direction; R1 lost the server LAN route.",
      "explanation": "A one-direction route cannot certify request and reply completion.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "ORIGIN classification",
      "question": "The owned local BGP origin displays IGP. Does this prove it was learned using OSPF?",
      "answer": "No; IGP is the ORIGIN attribute classification.",
      "explanation": "The prepared network origination and independent source evidence must be read separately.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Yes; every IGP origin is an OSPF LSA.",
        "Yes; it proves EIGRP instead.",
        "No; IGP is the ORIGIN attribute classification.",
        "No; it proves that BGP transport failed."
      ]
    },
    {
      "testedConcept": "Local sentinel",
      "question": "How should the retained empty path and 0.0.0.0 next hop on a local LAN origin be interpreted?",
      "answer": "As local-origin display context, not a usable remote wire gateway.",
      "explanation": "Compare the independent direct kernel route instead of sending packets to the sentinel.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Policy boundary",
      "question": "Under RFC 8212, what happens to an external peer's routes when no explicit import policy is applied?",
      "answer": "They are not eligible in the decision process.",
      "explanation": "Inspect implementation configuration options too; explicit policy can still be incorrect.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "They become eligible only when the AS path is short.",
        "They are not eligible in the decision process.",
        "They automatically replace all connected routes.",
        "The TCP session must always close."
      ]
    },
    {
      "testedConcept": "Table layers",
      "question": "A valid/best BGP candidate is visible. Which additional evidence is needed before declaring the original transaction successful?",
      "answer": "Selected installation, appropriate forwarding/next-hop and both-direction original traffic/service evidence.",
      "explanation": "BGP selection is distinct from system source selection, forwarding and service.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Known origin fault",
      "question": "Which precise intervention produced the retained missing-prefix fault, and which intervention repaired it?",
      "answer": "Remove only R2 network 198.51.100.0/24, then restore that exact statement.",
      "explanation": "No peer clear or daemon restart belongs to the accepted repair.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Capture limits",
      "question": "Startup capture has comma-separated BGP message types in a frame. What cannot be inferred from those fields?",
      "answer": "A complete phase-specific withdrawal NLRI/attribute trace or elapsed convergence time.",
      "explanation": "Multiple PDUs can share a frame; startup types are separate from later route/probe snapshots.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Safe restoration",
      "question": "After the scoped origin fault, which closure best matches the companion?",
      "answer": "Restore exact origin intent, reconcile baseline configuration, repeat both probes and verify owned cleanup.",
      "explanation": "A broad reset or successful local gateway ping alone does not close the experiment.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Clear every BGP session and save immediately.",
        "Delete all route maps to permit every route.",
        "Accept the local gateway ping as complete service proof.",
        "Restore exact origin intent, reconcile baseline configuration, repeat both probes and verify owned cleanup."
      ]
    }
  ],
  "quick": [
    {
      "testedConcept": "Transport",
      "question": "Which transport and service port does ordinary BGP use?",
      "answer": "TCP port 179.",
      "explanation": "One peer endpoint can use an ephemeral port; routed payload is separate.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Conceptual local selection",
      "question": "Which conceptual BGP store holds the local decision result?",
      "answer": "Loc-RIB.",
      "explanation": "It is not synonymous with every system routing or forwarding table.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Measurement boundary",
      "question": "Do the retained settled ICMP and startup records prove application continuity or measured convergence?",
      "answer": "No.",
      "explanation": "Those require independently scoped application and timing measurements.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
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
  ]
},
{
  "id": "s3-g3-t1",
  "batch": "09",
  "title": "eBGP",
  "subtitle": "Make each external prefix crossing an intentional policy decision.",
  "level": "Intermediate → Advanced",
  "minutes": 75,
  "interactive": "ebgp-policy",
  "definition": "External BGP is a BGP session between speakers in different autonomous systems. The relationship is defined by AS identity, not whether a cable crosses a building boundary or the peer belongs to an ISP. Each external boundary needs explicit prefix and attribute policy, appropriate next-hop behavior and independent forwarding/return verification. The same underlying BGP messages and TCP transport introduced in fundamentals apply. This topic develops the boundary decisions with one ordinary IPv4 candidate; route servers, confederation exceptions and specialized address families require their own design.",
  "purpose": "Use eBGP to exchange deliberately bounded reachability between separately identified routing domains: customer/provider, peer, private interconnect or parts of a documented enterprise fabric. A private ASN does not make a session internal BGP, and physical adjacency does not make equal-AS speakers external. Decide which exact prefixes each side may originate, receive and propagate before creating a peer. An Established session is only the control channel; it is not permission to become an unintended transit network or proof of the original application path.",
  "mental": "Imagine two organizations with separately numbered shipping offices. One office supplies a destination card, its export desk allows the card across the boundary, and the receiver checks admission and path history before finding a usable onward action. A card blocked at export never reaches the import desk; a card admitted at import can still have an unresolved onward address. This is an ordered prerequisite worksheet, not a simulation of TCP/FSM timing, cached route history or complete BGP selection. Physical packet paths and the reverse journey stay in separate records.",
  "components": [
    "Local and remote AS: record actual configured identities and supported peer mode. Ordinary different-AS sessions are external even when both speakers are privately operated.",
    "Transport source and peer: the configured neighbor address, source address/interface, direct or multihop design, family and table must agree with independent reachability. An IGP is not automatically running just because BGP needs an underlying route.",
    "Origin and export: the sender needs the actual prefix and an intentional permitted advertisement. Export scope includes destination and applicable attributes, not simply session status.",
    "Import and path-loop protection: receiver policy admits expected prefixes and ordinary own-AS rejection prevents accepting a path containing local AS. Exception knobs change this boundary and are excluded from the worksheet.",
    "NEXT_HOP and system installation: an admitted route still needs resolution and applicable selection before forwarding. Usable neighbor/forwarding and original return/service are further requirements.",
    "Evidence ownership: distinguish a supplied boolean gate, a retained actual observer snapshot and a new target observation. The browser never configures a peer or proves a measured traffic result."
  ],
  "mechanism": [
    "Start with AS relationship and ownership. R1 AS65001 and R2 AS65002 are ordinary external peers in the separate actual companion, although they share one owned virtual transit. Private ASN use belongs in isolated or agreed private relationships; it does not grant Internet prefix ownership. Confederation member-AS relationships and route-server behavior complicate simple AS and attribute shortcuts; they are explicitly outside this one-candidate model.",
    "Map transport and protocol scope. The actual peers use directly attached 203.0.113.1 and .2, with IPv4-unicast activation. A loopback-sourced or nonadjacent session needs supported source selection and underlay reachability in both directions, plus appropriate multihop/TTL security design. FRR documents ebgp-multihop for non-direct peers and separate update-source control. Neither setting creates the missing underlying route or a valid import policy. No multihop or source-address mutation is executed by the companion.",
    "Review origin before export. R2 originates its directly installed 198.51.100.0/24 under explicit network import-check; its exact-prefix export permits that LAN only. Removing the network statement stops that origin without dropping the session. In the declared worksheet, origin=false blocks the candidate before later gates are evaluated. This ordered display explains prerequisites rather than reconstructing real event order or every cached route retained after a failure.",
    "Apply external export and import deliberately. With RFC8212-style policy enforcement, absent export admits no advertisement and absent import admits no route into local decision eligibility. The actual preparation explicitly enables this enforcement rather than relying on profile defaults. Export and import are distinct directions and objects: sender export permission does not imply receiver import permission. Inspect the applicable family and exact object attachment; a broad permit-all can still cause a route leak despite being explicit.",
    "Interpret ordinary AS path handling. A local origin initially has no traversed external AS in its displayed path. Ordinary eBGP advertisement prepends the sender AS, so the actual R1 remote prefix has path 65002. A receiver ordinarily rejects a path containing its own AS. The worksheet supplies either 65002 or 65002 65001 and models only ordinary AS_SEQUENCE with no allowas-in, local-as rewrites, route-server or confederation exceptions. AS_PATH is not cryptographic proof or a count of routers/latency; an accepted short path can still be unauthorized.",
    "Check NEXT_HOP in the destination routing context. Direct external advertisements commonly identify the advertising peer as next hop, as the actual companion shows, but shared-subnet third-party behavior and explicit attribute policy mean this is not a universal rewrite rule. FRR next-hop-self and attribute-unchanged are deliberate design knobs, not default fixes for every incident. Resolution must find usable underlay context in the appropriate table; resolving a route is not an ARP reply, remote endpoint probe or proof of symmetric service.",
    "Keep admission, eligibility and installation distinct. The worksheet calls the candidate received only when origin/export/session declarations agree; admitted additionally requires import and the ordinary loop check; eligible additionally requires NEXT_HOP resolution. The supplied systemSelect gate represents cross-source installation intent, not a computed best-path contest or hardware action. A competing exact-prefix source can displace BGP even when its candidate is valid. Forwarding then uses the installed destination lookup and separate neighbor/policy context.",
    "Do not borrow forwarding health to change route policy. The independent forwardReady and returnReady declarations only affect whether the supplied exchange prerequisites agree. Turning either off leaves admission and selection declarations intact. Thus an installed route can coexist with a broken downstream or return dependency. The browser reports no traffic was tested, even when all declarations are true. Real closure needs actual original source/destination/family/table/application and opposite-direction evidence.",
    "Correlate the actual external relationship separately. In baseline both observers retain one-AS remote paths, peer next hops, selected installed eBGP routes and matching kernel gateways; both original ICMP round trips pass. During the known R2 origin withdrawal, both sessions remain Established, R1 loses its remote LAN destination and R2 keeps the opposite path, yet both round trips fail. Restoration reintroduces the exact statement and returns configuration/probes without session clear. This actual intervention is origin withdrawal, not an executed export-deny, import-deny, loop injection, multihop or next-hop fault.",
    "Choose a scoped operational change and rollback. Preserve both ends before altering exclusive objects, verify the intended family/policy attachment and original traffic, then reconcile exact baseline configuration afterward. A policy change may require supported route refresh or re-evaluation; capabilities and target behavior matter. Do not assume every change requires a destructive peer reset, or that every refresh request proves traffic recovery. Maximum-prefix, session protection and upstream coordination belong to the actual relationship, not a universal copy-paste recipe."
  ],
  "flow": [
    [
      "Identify the external boundary",
      "Record both AS identities, source/peer and family/table."
    ],
    [
      "Review origin and crossing policy",
      "Separate sender origination/export from receiver import and ordinary loop checks."
    ],
    [
      "Resolve and select the route",
      "Check NEXT_HOP and independent system installation context."
    ],
    [
      "Verify both traffic directions",
      "Collect original service evidence and restore exact owned intent."
    ]
  ],
  "comparison": [
    [
      "External / physically distant",
      "Different AS relationship / location",
      "A direct private fabric link can still use eBGP."
    ],
    [
      "Export / import",
      "Sender advertisement / receiver admission",
      "Policy attached on one side does not authorize the other."
    ],
    [
      "Ordinary AS-loop rejection / exceptions",
      "Local AS in received path / explicit alternate design",
      "The worksheet excludes allowas-in, confederations and route servers."
    ],
    [
      "Direct peer / multihop peer",
      "Prepared adjacent transport / supported remote source design",
      "Multihop cannot manufacture an underlay route."
    ],
    [
      "Admitted / eligible / installed",
      "Policy-loop gates / next-hop usability / system selection",
      "These are separate supplied snapshot predicates."
    ],
    [
      "Declared readiness / actual transaction",
      "Entered prerequisites / measured traffic",
      "An all-green worksheet is not a successful service measurement."
    ]
  ],
  "example": "Start the baseline worksheet, then select export rejection: later receiver gates are marked Not evaluated. Select import rejection: the supplied candidate is received but not admitted. Select the local-AS path case and explain rejection of 65002 65001 at R1 without declaring the path forged or measured. Select unresolved next hop: admission survives but eligibility fails. Finally toggle return readiness in baseline: selected installation remains Yes while original exchange prerequisites become No. Compare the actual companion separately; its known fault withdraws R2 origin rather than executing every worksheet scenario.",
  "ports": "The external AS relationship does not change BGP TCP service port 179. Source-address choice and transport access must match the prepared peer design. The actual experiment is IPv4 unicast and bounded ICMP payload; it does not validate IPv6, EVPN, authentication or every multihop/GTSM combination.",
  "commands": [
    {
      "code": "show bgp ipv4 unicast summary json\nshow bgp neighbors json",
      "platform": "Prepared FRR8.4 CLI; guided read-only",
      "explanation": "Preserve observer, both AS identities, peer source/family, session state and attached policy metadata.",
      "expected": "Compare actual peer and AF context; session state does not prove advertisement or import. These families are retained in the separate companion, with no new target execution claimed."
    },
    {
      "code": "show bgp ipv4 unicast json\nshow ip route bgp json",
      "platform": "Prepared FRR8.4 CLI; guided read-only",
      "explanation": "Compare remote path/attributes with selected installed system source and active/FIB next hop.",
      "expected": "Own-AS/next-hop/policy and cross-source context must be interpreted separately. This command does not execute an import/export fault or original probe."
    },
    {
      "code": "show running-config",
      "platform": "Prepared FRR8.4 CLI; guided read-only",
      "explanation": "Record exact origin, policy objects and neighbor AF attachments on both speakers.",
      "expected": "Baseline/restored intent can be compared without changing enforcement or clearing the peer. Treat configuration as sensitive."
    },
    {
      "code": "sudo env FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/bgp-routing.sh --run",
      "platform": "Owned Ubuntu24.04 namespaces; explicit actual companion",
      "explanation": "After private preparation and inert help, reproduce the existing single-transit origin-withdrawal experiment.",
      "expected": "Actual origin/route/session/probe/repair/cleanup evidence only; no execution of the nine other declared worksheet scenarios is claimed."
    }
  ],
  "configuration": "The existing companion prepares exact-prefix import/export on both IPv4 external peers with explicit ebgp-requires-policy and network import-check. Do not replace that preparation with a no-policy sample. In its exclusively owned R2 BGP65002 IPv4-unicast context, no network 198.51.100.0/24 is the known fault and network 198.51.100.0/24 its exact inverse. On a separately mapped target, record source/peer/family/table and all original object attachments first. Create only exclusive intended filters, attach in the verified direction, observe prefix and original service, then restore exact baseline attachments before removing unused exclusive objects. This page does not configure multihop, next-hop-self, allowas-in, a production peer or persistent host routing.",
  "production": "Choose explicit import/export by the customer/provider/peer/private relationship rather than copying a neighbor template. Document who owns each advertised prefix, whether transit is permitted, origin dependencies, source reachability, maximum-prefix response and original service/return intent. Preserve an independent management route for authorized changes and review rollback with both owners. Multi-exit local selection and external inbound influence are different problems developed in later policy lessons. This one ordinary external candidate and one actual virtual transit do not establish a full Internet edge or route-server architecture.",
  "troubleshooting": [
    [
      "No Established external session",
      "Check actual local/remote AS, source/peer transport route, TCP access, direct/multihop context and negotiated family. Preserve errors; do not infer one cause from state Active."
    ],
    [
      "Sender has prefix but receiver does not",
      "Compare sender origin/export and receiver family/import independently. Read actual policy attachment and supported received/advertised views; absence from a filtered table is not proof no UPDATE ever arrived."
    ],
    [
      "Own-AS appears in received path",
      "Confirm actual AS identity and intended relationship before considering exception knobs. The ordinary worksheet rejects local-AS inclusion; specialized designs require separate loop-safety review."
    ],
    [
      "Admitted candidate is unusable",
      "Inspect NEXT_HOP resolution in the correct table and independent next-hop/neighbor state before selection and forwarding. Multihop peer transport and route NEXT_HOP resolution are different dependencies."
    ],
    [
      "Selected route yet original traffic fails",
      "Keep source/destination, downstream policy/host and return route with original service evidence. Forward/return declarations do not change the worksheet admission gates."
    ],
    [
      "Policy change has not taken effect",
      "Inspect exact direction/AF/object and supported capability/re-evaluation behavior. Do not equate route refresh or a broad clear with successful original-service recovery."
    ],
    [
      "Lab repair or cleanup ambiguous",
      "Retain known origin intervention and exact recovered configurations/probes, then compare owned resources and independent host baseline. No production or global host mutation is appropriate."
    ]
  ],
  "security": "Reject unintended prefixes and propagation directions; do not equate a private peer or explicit permit-all with trusted route ownership. Maximum-prefix limits, source/session protection, origin validation and administrative controls need supported release and relationship review. AS-loop checking is not authentication, and Route Origin Validation does not validate every transit AS or business agreement. Actual lab execution stays in owned namespaces and private runtime; new security knobs are source-described rather than claimed configured or tested.",
  "performance": "External path attributes express policy, not measured path speed. One route crossing fewer ASes can use more routers or a slower link. Session timers, updates, table size, next-hop recursion and FIB resources consume different budgets; route refresh/re-evaluation has control-plane cost independent of the original packet workload. The companion records settled ICMP and cleanup without elapsed convergence, failover loss, multipath distribution or hardware throughput. Do not infer a production capacity target from nine green prerequisite declarations.",
  "mistakes": [
    "Defining eBGP by physical distance or Internet access.",
    "Assuming a private ASN means iBGP.",
    "Treating export permission as receiver import permission.",
    "Disabling external policy enforcement to conceal a wrong origin or direction.",
    "Using multihop or next-hop-self as an unscoped universal repair.",
    "Treating ordinary AS-loop rejection as cryptographic path validation.",
    "Calling declared readiness a measured original-service result."
  ],
  "prerequisites": [
    "s3-g3-t0",
    "s3-g0-t0"
  ],
  "related": [
    "s3-g3-t2",
    "s3-g3-t3",
    "s3-g4-t2",
    "s3-g5-t0"
  ],
  "artifacts": [
    {
      "title": "Separate actual eBGP origin-withdrawal companion",
      "path": "labs/bgp-routing.sh"
    },
    {
      "title": "Pinned private preparation",
      "path": "labs/prepare-frr-runtime.sh"
    }
  ],
  "lab": {
    "objective": "Trace one declared external prefix across boundary admission and independent service prerequisites, then correlate the separate actual origin fault.",
    "requirements": "Browser worksheet requires no device. Actual companion requires its printed Ubuntu24.04/root/private-FRR prerequisites and exclusive namespaces; optional real-target inspection requires supported authorized family/table/context.",
    "topologyKind": "shared",
    "topology": [
      "R2 AS65002 / origin198.51.100.0/24",
      "Export → external peer → import / R1 AS65001",
      "Ordinary AS path → next-hop resolution → system selection",
      "Original forward direction ↔ independent return direction"
    ],
    "steps": [
      "Start baseline and record every declared gate; all Yes is prerequisite agreement only.",
      "Select origin/export/session failures; explain why subsequent admission checks are marked Not evaluated.",
      "Select import and ordinary local-AS path rejection, then unresolved NEXT_HOP; distinguish received, admitted and eligible.",
      "Select system-source displacement, forward failure and reverse failure; identify which independent layer changes.",
      "Toggle declarations manually, reset with keyboard, and compare the ten supplied scenarios without interpreting them as live peer events.",
      "Inspect the separate BGP baseline/fault/recovered raw views on both observers and state exactly which known intervention occurred.",
      "Optionally reproduce the existing owned companion sequentially after private preparation, retain exact repair and normal/interrupted cleanup, and repeat bounded original probes."
    ],
    "verification": "Ten independent scenario truth tables and all512 prerequisite masks verify the declared gates and terminal trace; browser controls separately verify invalid-context hiding, reset, four widths/both themes and keyboard scrolling. Actual companion corroborates only its single ordinary transit and origin-withdrawal intervention, not every declared scenario.",
    "troubleshooting": "Find the first scoped prerequisite disagreement and keep actual observations separate from entered declarations. Do not alter a live peer because a worksheet checkbox changes.",
    "challenge": "Why can import-permitted still fail ordinary loop eligibility? Then explain why turning return readiness off leaves the route selected yet breaks the supplied exchange prerequisites. Correlate the real origin fault without calling it an executed import-policy fault.",
    "cleanup": "Reset restores baseline declarations only, preserving learner and router state. Actual companion reconciles exact configuration and removes identity-checked owned namespaces/daemons/capture/private paths. Restore prior attachments before deleting exclusive unused objects in any separately authorized target experiment."
  },
  "glossary": {
    "eBGP": "BGP relationship between ordinary different-AS speakers.",
    "Export policy": "Sender selection of routes for a particular peer/family advertisement.",
    "Import policy": "Receiver admission of peer routes into decision eligibility.",
    "AS-loop check": "Ordinary rejection when local AS occurs in a received path; exceptions need separate design.",
    "Multihop peer": "Supported transport relationship to a non-direct peer with underlying reachability.",
    "NEXT_HOP resolution": "Finding usable routing context for a route attribute, separate from peer transport and traffic proof.",
    "Declared prerequisite": "A supplied worksheet assumption, not a live observation.",
    "Exact rollback": "Restoration of the actual prior owned configuration and original service evidence."
  },
  "exams": [
    {
      "testedConcept": "AS relationship",
      "question": "R1 AS65001 and R2 AS65002 share one physical rack and a direct cable. What is their ordinary BGP relationship?",
      "answer": "eBGP.",
      "explanation": "Different AS identities define the ordinary external relationship.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "iBGP because the cable is short.",
        "eBGP.",
        "OSPF because the ASNs are private.",
        "No BGP relationship is possible."
      ]
    },
    {
      "testedConcept": "Private AS",
      "question": "Does using private AS65001 by itself make a peer session iBGP?",
      "answer": "No; compare local and remote AS identities.",
      "explanation": "ASN allocation and session relationship are distinct.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Policy direction",
      "question": "R2 export permits198.51.100.0/24 but R1 import rejects it. Which supplied layer can be true while admission is false?",
      "answer": "Received candidate.",
      "explanation": "The receiver import gate is independent of sender export.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Ordinary loop",
      "question": "At R1 AS65001, which supplied path is rejected by the ordinary own-AS check?",
      "answer": "65002 65001.",
      "explanation": "It includes local AS; exception designs are outside this worksheet.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "65002.",
        "An empty local-origin path only.",
        "65002 65001.",
        "Every path from private AS65002."
      ]
    },
    {
      "testedConcept": "Multihop dependency",
      "question": "Why does enabling a supported eBGP multihop setting not repair a missing route to the peer source?",
      "answer": "It does not create underlying bidirectional transport reachability.",
      "explanation": "Source/address/table routing and multihop admission are separate.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Next hop versus transport",
      "question": "A session is Established and import/loop checks pass, but route NEXT_HOP cannot be resolved. What distinction matters?",
      "answer": "Peer transport is live while that route lacks usable next-hop resolution.",
      "explanation": "The peer socket destination and route forwarding next hop answer different questions.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "System selection",
      "question": "The worksheet admits and resolves the route but systemSelect is false. Which result is supported?",
      "answer": "Eligible candidate without selected BGP installation declaration.",
      "explanation": "A separate source can be preferred; no full best-path or FIB algorithm is run.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "The import policy must have rejected the route.",
        "The AS path necessarily contains the local AS.",
        "Every original application is guaranteed.",
        "Eligible candidate without selected BGP installation declaration."
      ]
    },
    {
      "testedConcept": "Independent reverse path",
      "question": "In baseline, only returnReady is turned off. What changes and what stays true?",
      "answer": "Exchange prerequisites become No; candidate admission and selected installation remain Yes.",
      "explanation": "Downstream/return assumptions do not modify policy selection.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Actual intervention scope",
      "question": "Do the ten declared scenarios mean the companion actually injected import denial, AS-loop and multihop faults?",
      "answer": "No; its actual known intervention is R2 origin withdrawal and exact restoration.",
      "explanation": "Declared teaching cases are separate from retained actual execution.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Rollback ownership",
      "question": "What must precede deletion of an exclusively created policy object during a separately authorized rollback?",
      "answer": "Restore verified prior attachments and confirm the exclusive object is unreferenced.",
      "explanation": "Do not remove shared or referenced objects or replace exact rollback with a broad reset.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "quick": [
    {
      "testedConcept": "Boundary identity",
      "question": "Which two identifiers primarily establish the ordinary external-AS relationship?",
      "answer": "Local and remote AS numbers.",
      "explanation": "Physical location and private/public allocation are separate.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Post-admission requirement",
      "question": "Which worksheet gate separates admitted from eligible for the supplied candidate?",
      "answer": "NEXT_HOP resolution.",
      "explanation": "Policy and ordinary loop admission precede usable resolution.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Unmeasured service",
      "question": "The worksheet shows all exchange prerequisites agree. What service observation did it measure?",
      "answer": "None.",
      "explanation": "The outcome is declared prerequisite agreement, not transmitted traffic.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "sources": [
    {
      "title": "RFC4271: external peers, attributes, route eligibility and dissemination",
      "url": "https://www.rfc-editor.org/rfc/rfc4271",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC8212: external import/export default rejection",
      "url": "https://www.rfc-editor.org/rfc/rfc8212",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable8.4: external policy, multihop, update-source and next-hop behavior",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g3-t2",
  "batch": "09",
  "title": "iBGP",
  "subtitle": "Separate internal route distribution from the underlay that resolves its next hop.",
  "level": "Intermediate → Advanced",
  "minutes": 80,
  "interactive": "ibgp",
  "definition": "Internal BGP is a BGP relationship between speakers in the same autonomous system. It distributes BGP reachability and policy context inside that AS; it is distinct from an interior gateway protocol such as OSPF or EIGRP. An iBGP session can use a routed underlay between nonadjacent speakers. Ordinary iBGP does not re-advertise an iBGP-learned route to another internal peer, so a chain of live sessions does not replace the required distribution design. Route reflection provides a defined exception with client and loop-protection rules. Usable NEXT_HOP and original forwarding/return remain separate from route distribution.",
  "purpose": "Use iBGP to let internal speakers apply consistent BGP information and select appropriate external exits without treating every internal link as a new AS boundary. Decide which speakers require the routes, how those routes reach them, what addresses support the sessions and next hops, and which intervening forwarding devices need destination knowledge. The declared three-speaker worksheet exposes missing direct distribution, reflector roles, unreachable next hop and source displacement independently. It is a teaching model, not an executed iBGP/route-reflector lab or evidence of live convergence.",
  "mental": "A department receives an external destination card and sends copies to its authorized internal offices. An ordinary recipient cannot simply pass an internal copy to another ordinary recipient. Direct distribution to every relevant office, or a designated reflector with explicit roles, changes that rule. Separately, the card names an onward address that each office must know how to reach. The correspondence connections are control-plane relationships, not the physical packet path. This analogy omits cached route history, timing, full path competition and reflector loop computation; the worksheet supplies settled assumptions only.",
  "components": [
    "AS relationship: internal peers have the same ordinary AS identity; an internal BGP route is not automatically a route learned from an IGP.",
    "Transport underlay: peer loopbacks or interface addresses require actual source-to-peer reachability and supported source/family/table context; a TCP session does not resolve every advertised NEXT_HOP.",
    "Distribution: ordinary full mesh or an intentionally designed reflection/confederation topology. Physical redundancy alone does not create the missing advertisements.",
    "Attributes: AS_PATH is not prepended for ordinary internal propagation; NEXT_HOP normally remains unless explicitly changed. LOCAL_PREF distributes internal degree-of-preference policy; later topics develop selection details.",
    "Reflection context: client/non-client roles, selected BGP path, ORIGINATOR_ID and CLUSTER_LIST prevent uncontrolled ordinary re-advertisement. A simplified role table is not full reflector history.",
    "Independent outcome layers: received route, next-hop eligibility, BGP choice, system installation, physical forwarding and original opposite-direction/service evidence."
  ],
  "mechanism": [
    "Fix the scope before drawing a topology. E, A and B in the worksheet are AS 65001 speakers, while E supplies a selected external route 198.51.100.0/24 with AS_PATH 65002. E–A, E–B and A–B controls are declared Established sessions, not physical cables or an OSPF graph. The external candidate and all policies are supplied prerequisites; the model never creates an UPDATE, configures a router or verifies that those sessions really exist.",
    "Understand ordinary propagation. E may advertise its eligible selected external route directly to A and B when their sessions and applicable advertisements are permitted. A receiving it through iBGP cannot ordinarily relay it to B through another iBGP session. Thus E–A and A–B being live, with E–B absent, can leave B without this route. This is a distribution rule, not a claim that E cannot reach B physically or that A cannot forward actual packets.",
    "Plan a complete ordinary mesh when appropriate. For n relevant ordinary speakers, the logical session count is n(n−1)/2, with each speaker having n−1 peers. Three speakers require three sessions; twenty require 190, not 190 physical links or 190 sessions per router. Routing through an IGP underlay can carry these sessions across many physical layouts. Separate address families, scale limits and required forwarding knowledge must still be reviewed; a numerical session count alone is not a complete architecture.",
    "Interpret internal attributes. Ordinary internal propagation preserves the supplied AS_PATH 65002 rather than adding 65001 at every internal hop. NEXT_HOP is not automatically replaced just because a route crosses an internal session. LOCAL_PREF supports a shared internal degree of preference, distinct from local system source distance and underlay path cost. Do not read the iBGP classification, ORIGIN IGP or path length as proof that OSPF has learned or installed the destination.",
    "Resolve the advertised NEXT_HOP separately from peer transport. In the worksheet, unchanged external next hop is 203.0.113.2. E next-hop-self instead supplies 10.255.0.1. A and B have independent resolution declarations for each address, so changing the attribute cannot invent a missing underlay route. FRR documents next-hop-self for eBGP-learned advertisements and force for additionally rewriting iBGP-learned routes. The worksheet changes only the external route at E; it does not model an RR rewrite, route leaks, recursive cycles, ARP/ND or hardware forwarding.",
    "Introduce the defined reflector exception. A can reflect a selected eligible BGP route learned from client E to another client or non-client B. If E is a non-client, A may reflect that route to client B; it cannot use reflection to relay a non-client route to another non-client. The worksheet uses one fixed source and target and exposes A reflector, E client and B client declarations. It does not reflect to the source or compute every multi-cluster topology. Changing a client checkbox is not a real device configuration.",
    "Keep reflector loop protection and route visibility explicit. RFC4456 defines ORIGINATOR_ID and CLUSTER_LIST for reflected-route loop prevention. Original-speaker and prior-cluster checks must be understood alongside AS_PATH because internal propagation does not repeatedly add the local AS. The fixed worksheet has no originator/cluster-loop history and excludes confederations and add-path. Ordinary reflection generally distributes selected best-path information rather than every possible alternative, so redundant reflector sessions alone do not prove identical route visibility or optimal exit choice.",
    "Separate BGP choice from system RIB choice. A must have an eligible selected BGP candidate before the model permits reflection. Its independent aSystemSelect declaration can be false while that BGP choice remains available for advertisement in the scoped default design; other target features such as FIB-dependent suppression need separate review. B can receive direct and reflected declarations simultaneously, but their ranking is not computed. Its supplied BGP-selection and system-selection gates are checked only after resolution. A best-path or RIB line does not prove hardware programming or original traffic.",
    "Trace the data plane independently. A reflector need not sit on the physical forwarding path: retaining E as next hop does not direct packets through A simply because A sent the UPDATE. Actual intervening forwarding devices must have the required destination/next-hop/tunnel design; distributing BGP only at the edges is not by itself proof that a transit core can deliver packets. The worksheet does not choose a physical path. B forwardReady and returnReady affect only declared original-exchange prerequisites, leaving received and installed route predicates intact.",
    "Investigate and restore one demonstrated dependency. Preserve peer/family/table/source context, relevant advertisements, exact route attributes, NEXT_HOP lookup and independent installed forwarding on each observer. Fix missing distribution and unresolved next hop as different faults. In a separately prepared isolated topology, change only owned session/role/attribute intent, restore exact original attachments and recheck the original service. No actual iBGP or route-reflector mutation is executed here. The preceding actual eBGP origin-withdrawal companion remains separate and cannot serve as proof of these internal scenarios."
  ],
  "flow": [
    [
      "Map same-AS distribution",
      "Record required speakers, sessions and ordinary or reflector roles."
    ],
    [
      "Trace permitted advertisement",
      "Separate direct E route from defined client/non-client reflection."
    ],
    [
      "Resolve NEXT_HOP and select",
      "Compare received candidate, underlay resolution, BGP choice and system source."
    ],
    [
      "Verify original forwarding and return",
      "Keep the physical path, application observation and exact restoration separate."
    ]
  ],
  "comparison": [
    [
      "iBGP / IGP",
      "Same-AS BGP reachability distribution / interior routing protocol",
      "One can depend on the other without being the same mechanism."
    ],
    [
      "Logical session / physical link",
      "Control connection / underlying forwarding attachment",
      "Full mesh does not require a physical cable for every peer pair."
    ],
    [
      "Ordinary relay / route reflection",
      "Forbidden iBGP-to-iBGP re-advertisement / defined role exception",
      "A live session chain is not sufficient ordinary distribution."
    ],
    [
      "Client-origin / non-client-origin at RR",
      "Reflect to other clients and non-clients / reflect to clients",
      "Non-client to non-client is excluded."
    ],
    [
      "Session address / route NEXT_HOP",
      "Transport endpoint / advertised forwarding dependency",
      "One can be reachable while the other is unresolved."
    ],
    [
      "BGP selected / system selected",
      "Protocol choice / cross-source installed preference",
      "System displacement need not suppress default BGP advertisement."
    ],
    [
      "Reflector control role / forwarding hop",
      "Advertised route source / actual packet path",
      "An UPDATE via A does not imply data packets via A."
    ]
  ],
  "example": "Select Ordinary chain: A receives and selects E’s supplied route, but B has neither direct nor reflected advertisement. Select client-origin reflection or non-client-to-client reflection to expose the defined exception, then select non-client-to-non-client and explain its absence. In full mesh, disable B resolution of 203.0.113.2: B still receives but is not eligible. Select E next-hop-self with a reachable 10.255.0.1, then remove that address’s resolution to show why an attribute rewrite is not an underlay repair. Finally displace A’s system BGP route while keeping its eligible BGP choice, or remove B’s return readiness without changing its installation declaration. None of these browser changes runs a router.",
  "ports": "Ordinary internal BGP uses the same TCP service port179 as external BGP. A peer source address and underlay return route belong to the actual transport design; advertised NEXT_HOP resolution is another question. The worksheet is IPv4 unicast and contains no actual socket, IPv6, VPN/EVPN or application execution.",
  "commands": [
    {
      "code": "show bgp ipv4 unicast summary json\nshow bgp neighbors json",
      "platform": "Prepared FRR8.4 internal-speaker context; guided not executed",
      "explanation": "Preserve local/remote AS, peer source, address-family and role context at each mapped speaker.",
      "expected": "Supported actual output can distinguish configured same-AS peers and session state. No iBGP/RR target is executed in this worksheet."
    },
    {
      "code": "show bgp ipv4 unicast json\nshow ip route bgp json",
      "platform": "Prepared FRR8.4 context; guided not executed",
      "explanation": "Read received/selected BGP attributes separately from selected installed system source.",
      "expected": "Compare AS_PATH, NEXT_HOP and available reflector attributes; do not interpret every CLI table as unfiltered Adj-RIB-In history."
    },
    {
      "code": "show running-config",
      "platform": "Prepared FRR8.4 context; guided not executed",
      "explanation": "Preserve actual source/peer/family, next-hop policy and client/reflector intent before a separately authorized change.",
      "expected": "Configuration can be sensitive. No broad clear, save, reload or reflector-role mutation is executed here."
    },
    {
      "code": "ip -j route get 10.255.0.1\nip -j route get 203.0.113.2",
      "platform": "Prepared owned Linux router/table context; guided not executed",
      "explanation": "Compare lookups toward the two supplied next-hop addresses in the actual applicable namespace/table.",
      "expected": "A route lookup reports that scoped routing decision, not live adjacency, BGP eligibility or measured service. Do not run in a host table and call it router evidence."
    }
  ],
  "configuration": "The browser controls are supplied declarations only. For a separately prepared isolated FRR8.4 design, record one AS, mapped peer source addresses and underlay routes before building ordinary distribution or reflector roles. Confirm exact neighbor/family syntax and prerequisites against the release documentation. A next-hop-self choice at the external edge requires a usable route to that chosen address at recipients; reflector client roles are asymmetric configuration intent, not a replacement for underlay reachability. Preserve baseline attachments and exclusive ownership, make one reviewed change, inspect attributes/selection/original service, then restore exact original role/source/attribute policy before deleting exclusive unused objects. No production, host routing, global peer clear or actual iBGP configuration is performed here.",
  "production": "Decide which speakers require BGP destinations and how forwarding works through every transit device. Choose mesh, reflection or confederation deliberately for scale, route visibility, exit policy and failure domains. Review reflector placement/redundancy, cluster design, underlay source reachability, recursive next hops and management independence; two reflectors do not automatically prove diverse forwarding or identical optimal path visibility. Session scale, policy consistency and observability matter separately from packet throughput. The supplied three-speaker worksheet is a bounded mechanism lesson, not a full multi-cluster or Internet-edge architecture.",
  "troubleshooting": [
    [
      "Sessions live but B lacks prefix",
      "Trace direct advertisements and ordinary no-relay rule before changing underlay metrics. Identify actual required mesh/reflector relationship and peer/family policy."
    ],
    [
      "Reflected route absent",
      "Inspect selected eligible BGP path at RR, source/target client roles, applicable advertisement policy and loop-protection attributes. Non-client-to-non-client is not permitted by ordinary reflection."
    ],
    [
      "Received candidate unresolved",
      "Look up the actual advertised NEXT_HOP in the appropriate table; peer socket reachability does not resolve it automatically."
    ],
    [
      "Next-hop-self did not repair forwarding",
      "Verify the rewritten address and its real underlay resolution at every recipient, then adjacency/physical path/return. Do not assume the knob creates a route."
    ],
    [
      "RR UPDATE assumed physical transit",
      "Trace actual NEXT_HOP and packet forwarding. A reflector can be outside the data path."
    ],
    [
      "Best BGP path differs from system route",
      "Compare eligible protocol choice with competing exact-prefix source and actual forwarding; inspect any release-specific advertisement suppression settings separately."
    ],
    [
      "Multiple reflectors yet path visibility incomplete",
      "Preserve selected/advertised attributes and actual role/cluster context; ordinary reflection need not distribute every alternative. No full path-ranking or multi-cluster history is computed here."
    ],
    [
      "Original traffic fails after control-plane repair",
      "Repeat original source/destination/family/table/service in both directions and restore exact baseline intent. Declared route agreement is not service certification."
    ]
  ],
  "security": "Internal ownership does not remove the need for prefix/attribute policy, access control, session protection and change review. A misconfigured reflector can distribute an unintended route widely, while transport authentication alone does not validate prefix ownership or business policy. Protect configuration and management context, preserve independent access, and review role/cluster/underlay changes on isolated mapped targets. This lesson source-describes safeguards but configures or tests none on live iBGP devices.",
  "performance": "Logical full-mesh sessions grow quadratically, while reflection changes session scale and route visibility rather than creating data-plane capacity. Update processing, memory, route refresh, recursion and FIB programming have distinct costs. AS_PATH length is not underlay latency, and a reflector’s chosen path can differ from another speaker’s best exit under its local view. The worksheet computes supplied snapshot predicates without timers, convergence, throughput, ECMP/add-path, hardware or application continuity measurements.",
  "mistakes": [
    "Calling iBGP an interior gateway protocol.",
    "Replacing ordinary full distribution with a chain of sessions.",
    "Assuming each logical peer requires a physical cable.",
    "Assuming internal propagation prepends local AS or rewrites NEXT_HOP automatically.",
    "Treating client/non-client reflection as unrestricted internal flooding.",
    "Inferring the data path from the reflector that sent an UPDATE.",
    "Treating a next-hop-self checkbox as an actual underlay route or measured repair."
  ],
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g1-t0"
  ],
  "related": [
    "s3-g3-t3",
    "s3-g4-t0",
    "s3-g5-t0",
    "s3-g6-t0"
  ],
  "lab": {
    "objective": "Distinguish ordinary distribution, defined reflection, chosen NEXT_HOP and independent system/original-service predicates in one fixed internal-AS scenario.",
    "requirements": "Browser only; no router/root/runtime needed. Optional guided target work requires separately prepared supported isolated speakers and exact source/family/table/role/underlay ownership.",
    "topologyKind": "shared",
    "topology": [
      "AS 65001: E external candidate → A internal receiver",
      "E ↔ B direct session declaration",
      "A ↔ B ordinary session or defined reflector relationship",
      "NEXT_HOP 203.0.113.2 or 10.255.0.1 → independent resolution"
    ],
    "steps": [
      "Start full mesh and record direct advertisements at A/B with unchanged supplied AS_PATH.",
      "Select ordinary chain and explain why A cannot relay its iBGP-learned route to B.",
      "Compare client-origin, non-client-to-client and non-client-to-non-client reflector cases.",
      "Compare B missing external-next-hop resolution, E next-hop-self and rewritten-address resolution failure.",
      "Select A unresolved route and source displacement separately; identify why eligibility/BGP choice affects reflection while default system-source displacement alone does not.",
      "Remove only B return readiness and keep its received/selected installation declarations separate from original-exchange prerequisites.",
      "Use table keyboard scrolling, invalid-context tests and reset; read excluded loop/history/selection/timing behavior explicitly.",
      "For optional prepared target investigation, preserve actual peer/attribute/next-hop/system/forwarding/original-service context; change only reviewed exclusive intent and reconcile exact baseline afterward."
    ],
    "verification": "Twelve independent scenario truth tables, all 256 role/session combinations and 32 target/resolution combinations check the fixed distribution contract. Browser tests validate per-observer outputs, unknown-context hiding, independent return gate, four widths/both themes and named keyboard scrolling. No actual iBGP or reflector experiment, packet capture or measured service result exists.",
    "troubleshooting": "Locate missing distribution versus unresolved next hop versus source displacement before changing anything. Keep supplied controls separate from actual observations and avoid borrowing the external companion as internal-protocol evidence.",
    "challenge": "With E–B absent and A–B live, compare ordinary A, reflector A with client E, reflector A with client B only, and reflector A with neither client. Then explain why a distributed prefix with unreachable NEXT_HOP is still unusable.",
    "cleanup": "Reset restores full-mesh declarations without device or learner-progress mutation. Any separately authorized isolated configuration experiment must restore exact prior source/role/attribute/underlay intent and original service before deleting exclusive unused resources. This worksheet owns no actual namespaces or daemons."
  },
  "glossary": {
    "iBGP": "Ordinary same-AS BGP relationship, distinct from an IGP.",
    "Full mesh": "Logical peer relationship between every pair of required ordinary speakers.",
    "Underlay": "Underlying routing/forwarding context supporting sessions and next-hop reachability.",
    "Route reflector": "Speaker applying defined iBGP re-advertisement and loop-protection rules.",
    "Client": "RR-relative peer role permitting defined reflection behavior.",
    "Non-client": "RR-relative ordinary peer role; non-client routes reflect to clients.",
    "ORIGINATOR_ID": "Reflected-route original-speaker context used for loop prevention.",
    "CLUSTER_LIST": "Reflected-route cluster history used for loop prevention.",
    "Next-hop-self": "Explicit attribute rewrite requiring independently usable chosen address.",
    "System displacement": "Another same-prefix system routing source selected despite retained BGP choice."
  },
  "exams": [
    {
      "testedConcept": "Same-AS identity",
      "question": "E AS 65001 peers with A AS 65001 across several underlay routers. What is the ordinary BGP relationship?",
      "answer": "iBGP.",
      "explanation": "AS relationship is independent of physical hop count.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "eBGP because there are multiple routers.",
        "iBGP.",
        "OSPF because the peers are internal.",
        "No BGP session can use routed transport."
      ]
    },
    {
      "testedConcept": "No ordinary relay",
      "question": "E–A and A–B are Established, E–B is absent, and A is ordinary. Why can B lack E’s external prefix?",
      "answer": "A does not ordinarily re-advertise an iBGP-learned route to another internal peer.",
      "explanation": "A live chain is not full ordinary distribution.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Mesh count",
      "question": "How many logical pair sessions does an ordinary full mesh of twenty speakers require, and how many peers per speaker?",
      "answer": "190 sessions total and 19 peers per speaker.",
      "explanation": "n(n−1)/2 counts pairs; it does not count physical cables.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Unchanged attributes",
      "question": "Which supplied AS_PATH is distributed internally for E’s external route in this worksheet?",
      "answer": "65002.",
      "explanation": "Ordinary internal propagation does not add 65001 at each internal hop.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "65001 65001 65002.",
        "An empty path because all peers are internal.",
        "65002.",
        "The sequence of underlay router IDs."
      ]
    },
    {
      "testedConcept": "RR client source",
      "question": "A is an RR receiving its selected route from client E. May it reflect to non-client B under the scoped role rule?",
      "answer": "Yes, subject to the remaining applicable prerequisites.",
      "explanation": "A client-origin route can reflect to other clients and non-clients.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "RR nonclient source",
      "question": "A is an RR; both E and B are non-clients. Does the scoped reflection rule allow E’s internal route to be reflected from A to B?",
      "answer": "No.",
      "explanation": "Non-client-origin internal routes reflect to clients, not another non-client.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Underlay separation",
      "question": "B’s iBGP session is live, but the advertised 203.0.113.2 NEXT_HOP is unresolved. Which layer can be true while eligibility fails?",
      "answer": "Received route distribution.",
      "explanation": "Peer transport and route next-hop resolution are separate.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Every original service is guaranteed.",
        "The system necessarily installs BGP.",
        "The path must contain local-AS loops.",
        "Received route distribution."
      ]
    },
    {
      "testedConcept": "Next-hop-self dependency",
      "question": "E rewrites NEXT_HOP to 10.255.0.1, but B has no usable resolution for that address. What is still missing?",
      "answer": "The independently usable underlay route/context to the chosen next hop.",
      "explanation": "An attribute rewrite does not create recipient reachability.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Control versus forwarding",
      "question": "Must original data packets traverse reflector A merely because A sent B the UPDATE?",
      "answer": "No; follow actual NEXT_HOP and independent physical forwarding context.",
      "explanation": "Control-plane distribution and data-plane path are separate.",
      "difficulty": "Advanced",
      "type": "short-answer"
    },
    {
      "testedConcept": "Loop and execution scope",
      "question": "Does the worksheet execute ORIGINATOR_ID/CLUSTER_LIST loop history or prove a live reflector repair?",
      "answer": "No.",
      "explanation": "Those mechanisms are source-described; the model only checks fixed supplied role/distribution/resolution predicates.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "quick": [
    {
      "testedConcept": "Protocol distinction",
      "question": "Is iBGP the same routing mechanism as OSPF?",
      "answer": "No.",
      "explanation": "Internal BGP distribution and an interior gateway protocol are distinct.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Reflector path prerequisite",
      "question": "What does A need before the worksheet permits reflecting E’s supplied route?",
      "answer": "An eligible selected BGP candidate plus applicable session/policy/client prerequisites.",
      "explanation": "Independent system-source selection is a separate default-design gate.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Original return",
      "question": "If B’s returnReady is false while installation remains true, what does the worksheet report?",
      "answer": "Original exchange prerequisites do not agree.",
      "explanation": "It reports declarations only, without measuring packets.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "sources": [
    {
      "title": "RFC4271: internal peer propagation, attributes and route resolution",
      "url": "https://www.rfc-editor.org/rfc/rfc4271",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC4456: reflection roles and loop-protection attributes",
      "url": "https://www.rfc-editor.org/rfc/rfc4456",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable8.4: internal peers, next-hop-self and reflection context",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g3-t3",
  "batch": "09",
  "title": "BGP attributes",
  "subtitle": "Read each attribute's class, FLAGS byte and propagation scope before interpreting policy.",
  "level": "Intermediate → Advanced",
  "minutes": 70,
  "interactive": "bgp-attributes",
  "definition": "BGP path attributes describe a route's origin, AS-level path, next-hop context and policy information. Their wire type and FLAGS octet answer different questions: the type identifies the defined attribute, while flags identify broad handling and length-field properties. A local routing display can also contain implementation values such as Weight that are not wire attributes. This lesson classifies attributes and decodes one supplied byte; it does not rank complete candidate paths or parse UPDATE messages.",
  "purpose": "Use attribute literacy to distinguish what a peer actually advertised, what local policy changed and what a router merely displays locally. A route can carry sensible labels while its next hop remains unresolved or its export policy rejects it. Accurate classification helps inspect such evidence without assuming every familiar preference appears on the wire or every transitive attribute is sent unchanged to every peer. The following policy topics apply these ideas to prefix lists, route maps, communities and redistribution.",
  "mental": "Read a route card's label and handling instructions separately. The label says ORIGIN, MED or COMMUNITY; the handling byte says well-known or optional, optional transitive or nontransitive, partial information and length-field width. Mandatory versus discretionary is written in the attribute specification, not encoded as another FLAGS bit. Keep the recipient's policy and forwarding evidence on separate cards. This analogy does not validate attribute contents, legal UPDATE structure or actual delivery.",
  "components": [
    "Well-known mandatory: type 1 ORIGIN, type 2 AS_PATH and type 3 NEXT_HOP in the scoped base IPv4-unicast model. ORIGIN's IGP/EGP/INCOMPLETE values classify entry into BGP, not the protocol currently supplying an update. Multiprotocol NLRI uses additional attributes and changes NEXT_HOP presence context; this page does not generalize the base list to every family.",
    "Well-known discretionary: type 5 LOCAL_PREF and type 6 ATOMIC_AGGREGATE. All well-known attributes must be recognized, but discretion/presence follows each specification. LOCAL_PREF expresses internal preference, is required in applicable internal reachability updates and is ordinarily not advertised to external peers. Its discretionary class does not mean it may be omitted in every context. ATOMIC_AGGREGATE signals aggregation context rather than identifying every contributing AS.",
    "Optional nontransitive: type 4 MULTI_EXIT_DISC (MED), type 9 ORIGINATOR_ID and type 10 CLUSTER_LIST. MED conveys a neighboring-AS exit hint with specific comparison and propagation scope. The latter two support route-reflection loop protection, as introduced in iBGP; this byte worksheet does not execute that loop history.",
    "Optional transitive: type 7 AGGREGATOR, type 8 COMMUNITIES and type 32 LARGE_COMMUNITIES. AGGREGATOR identifies aggregation origin context. Standard community values occupy four octets; large community values occupy twelve and display as three unsigned decimal fields. Their operational labels need a policy agreement; this classification does not match or rewrite them.",
    "FLAGS octet: 0x80 Optional, 0x40 Transitive, 0x20 Partial and 0x10 Extended Length. A well-known attribute requires Transitive set, and Partial must be zero for well-known or optional nontransitive attributes. The low four bits must be zero when sent and must be ignored when received; display a nonzero value without inventing a receive-side reset.",
    "Local display values: Weight is a local implementation preference, not a BGP path attribute transmitted in an UPDATE. Administrative distance, system-route markers and forwarding state also answer separate questions. A peer cannot receive a Weight wire type merely because the local CLI has a Weight column."
  ],
  "mechanism": [
    "Scope the observer, peer, address family, table/VRF and exact prefix. Preserve whether a record is a BGP route display, configuration, peer advertisement or decoded capture; these sources are not interchangeable. The model supplies one declared type and numeric FLAGS value rather than extracting them from a packet.",
    "Read the attribute type and its defined classification. Compare ORIGIN with LOCAL_PREF: both normally have Optional zero and Transitive one, yet one is mandatory and the other discretionary. There is no flag bit that determines the distinction. Required presence and peer propagation must be checked against the actual attribute and family rules.",
    "Decompose the FLAGS byte with masks. Decimal 208 is hexadecimal 0xD0 and binary 11010000: Optional and Transitive are one, Partial is zero, Extended Length is one and reserved bits are zero. The length field therefore occupies two octets. This says nothing about the actual attribute value length or negotiated maximum BGP message size.",
    "Compare defined Optional/Transitive bits with the declared known type and report discrepancies without pretending to parse a complete UPDATE. RFC 7606 revises error handling: specified flag conflicts generally use treat-as-withdraw unless that attribute mandates different handling. Other errors can require attribute discard, family disable or session reset. A numeric byte cannot select all these outcomes.",
    "For the explicit hypothetical unrecognized type, read its optional class. RFC 4271 recommends accepting paths carrying unrecognized optional transitive attributes; when an accepted path is passed onward, retain the attribute and set Partial. An unrecognized optional nontransitive attribute is quietly ignored and not propagated. Neither statement bypasses route policy or complete validation, and ignoring an attribute does not itself reject its entire route.",
    "Keep AS_PATH segment guidance current. RFC 9774 deprecates AS_SET and AS_CONFED_SET: absent explicit operator configuration otherwise, speakers must not advertise them and must treat received updates containing them as withdrawn. Ordered AS_SEQUENCE remains distinct. This lesson names the change but does not construct segments, validate AS4_PATH or simulate a transition policy.",
    "Return to actual observations before changing policy. Compare received route context with locally assigned preference and intended export, then inspect next-hop resolution, installed route and the original exchange independently. Classification is evidence interpretation, not an installation or traffic test."
  ],
  "flow": [
    [
      "Declare the attribute",
      "Match type, observer and address-family scope to its specification."
    ],
    [
      "Decode the FLAGS octet",
      "Read Optional, Transitive, Partial, Extended Length and reserved bits."
    ],
    [
      "Check class and handling",
      "Compare known-type bits; keep unknown optional handling conditional."
    ],
    [
      "Corroborate the route",
      "Separate local display, policy, next-hop resolution and original exchange."
    ]
  ],
  "comparison": [
    [
      "Mandatory / discretionary",
      "Specification presence classes",
      "Both use well-known flags; the byte cannot distinguish them."
    ],
    [
      "Optional transitive / nontransitive",
      "Handling of optional information",
      "An unrecognized optional transitive attribute can travel with an accepted path; an unrecognized optional nontransitive attribute is ignored. Recognized optional attributes still follow their defined rules."
    ],
    [
      "LOCAL_PREF / Weight",
      "Internal-AS wire attribute / local preference",
      "Weight is not transmitted as a BGP path attribute."
    ],
    [
      "LOCAL_PREF / MED",
      "Internal preference / neighboring-AS exit hint",
      "Their comparison and propagation rules differ; do not derive a full best path here."
    ],
    [
      "COMMUNITIES / LARGE_COMMUNITIES",
      "Four-octet / twelve-octet values",
      "Both are optional transitive; matching policy and value validation follow separately."
    ],
    [
      "Extended Length / extended messages",
      "Attribute length-field width / message capability",
      "Setting 0x10 does not negotiate RFC 8654."
    ],
    [
      "ATOMIC_AGGREGATE / AGGREGATOR",
      "Aggregation signal / aggregation origin context",
      "They are separate types with different classifications."
    ]
  ],
  "example": "Select Large communities with FLAGS 208. Record type 32, optional transitive, zero Partial and a two-octet attribute length field. Change only FLAGS to 224: Partial is now one and length field width is one octet, even though the declared type remains unchanged. Select MED with conflicting Transitive bit to see that a plausible optional-transitive byte can disagree with the known type. Then compare ORIGIN and LOCAL_PREF at FLAGS 64: the byte is identical while their defined mandatory/discretionary classes differ. Finally select the reserved-bit community case; distinguish sender nonconformance from the mandated receiver behavior. These are supplied declarations, with no capture or router execution.",
  "ports": "Attributes travel inside BGP UPDATE control messages over the BGP TCP connection, commonly using service port 179. Attribute Type Code is not a TCP port or IP protocol number. The worksheet opens no connection.",
  "commands": [
    {
      "code": "show bgp ipv4 unicast json",
      "platform": "Prepared isolated FRR 8.4 IPv4-unicast context · guided, not executed",
      "explanation": "Preserve the selected observer's BGP route records and displayed path attributes.",
      "expected": "GUIDED, NOT EXECUTED: compare ORIGIN, AS_PATH, NEXT_HOP and any preference/community fields present in actual output. Displayed Weight is local; ordinary route JSON need not expose raw wire FLAGS or unfiltered input history."
    },
    {
      "code": "show bgp ipv4 unicast neighbors 203.0.113.2 routes\nshow bgp ipv4 unicast neighbors 203.0.113.2 advertised-routes",
      "platform": "Separately prepared FRR 8.4 observer with mapped documentation peer · guided, not executed",
      "explanation": "Compare accepted routes from the mapped peer with routes permitted and advertised toward that peer.",
      "expected": "GUIDED, NOT EXECUTED: verify peer/family/table and command support on the owned target. These views answer different directions and policy stages; they do not by themselves prove raw byte encoding or original traffic. Replace the example peer only with the recorded owned peer."
    },
    {
      "code": "show running-config\nshow ip route bgp json",
      "platform": "Prepared isolated FRR 8.4 context · guided, not executed",
      "explanation": "Read attribute-setting intent separately from installed BGP source context.",
      "expected": "GUIDED, NOT EXECUTED: preserve configuration privately and compare applicable policy with actual route observations. A configured preference is not proof of received wire contents, and a route-table marker is not a measured service result."
    },
    {
      "code": "ip -j route get 203.0.113.2",
      "platform": "Prepared owned Linux router namespace and applicable table · guided, not executed",
      "explanation": "Inspect a lookup toward the supplied external-next-hop example in the observer's actual routing context.",
      "expected": "GUIDED, NOT EXECUTED: record table, destination, egress and gateway from actual output. This read-only lookup cannot validate a BGP attribute value, live neighbor state, hardware forwarding or the original endpoint exchange. A host-table result is not router-namespace evidence."
    }
  ],
  "configuration": "This tabletop worksheet has no router configuration, peer clear, attribute rewrite, packet injection or persistent service. Optional target inspection requires an already prepared isolated observer with known peer/family/table scope and supported FRR syntax. Preserve exact prior intent and sensitive configuration before any separately authorized policy experiment. Do not copy the example type/flags into a crafted UPDATE to a live peer.",
  "production": "Document each attribute's producer, intended receiver, policy meaning and propagation scope. Compare vendor display conventions with supported wire behavior and the applicable family/extension specification. For a preference or community policy change, test actual import/export effects and affected prefix ownership in a separate isolated exercise before review. A classification table cannot accept a route leak, best-path result or failover design.",
  "troubleshooting": [
    [
      "Flags do not reveal mandatory status",
      "Read the declared type's specification; ORIGIN and LOCAL_PREF can share the same byte."
    ],
    [
      "MED has Transitive set",
      "Compare type and Optional/Transitive rules. Preserve actual UPDATE context and the release's RFC 7606 handling; do not claim every conflict resets the session."
    ],
    [
      "Reserved low bits are nonzero",
      "Record sender nonconformance while retaining the requirement to ignore those bits on reception."
    ],
    [
      "Weight absent at another speaker",
      "Weight is local. Inspect LOCAL_PREF or actual exported attributes rather than expecting a Weight wire type."
    ],
    [
      "Community present, policy outcome absent",
      "Verify the intended matching policy and observation direction; a label alone does not execute an action."
    ],
    [
      "Attribute looks valid, route unusable",
      "Continue to next-hop resolution, route eligibility, selected installation and independent return/service evidence."
    ],
    [
      "Input rejected",
      "Choose a listed declared type and enter decimal integer FLAGS from 0 to 255. Invalid scenario identity keeps results hidden even after editing FLAGS; Reset restores a valid declaration."
    ]
  ],
  "security": "Community values and other received policy labels are not authenticated instructions or proof of route ownership. RFC 8092 explicitly warns that intermediate speakers can add, remove or alter large community values. Bound which peers may influence local preference or export behavior and preserve configuration privately. This model uses inert text output and makes no networking or policy changes; it does not test session security or origin/path validation.",
  "performance": "A small FLAGS field controls encoding and handling, not bandwidth or convergence. AS_PATH length is an AS-level property; LOCAL_PREF, MED and Weight are preferences with implementation/context rules. Large community sets and updates can affect control-plane work, but this worksheet has no table scale, parser cost, CPU, convergence or throughput measurement.",
  "mistakes": [
    "Looking for a mandatory/discretionary FLAGS bit.",
    "Calling Weight a vendor-specific wire attribute.",
    "Assuming well-known means LOCAL_PREF crosses ordinary eBGP boundaries.",
    "Equating Extended Length with extended BGP message negotiation.",
    "Rejecting an entire route solely because an unknown optional nontransitive attribute is ignored.",
    "Claiming all malformed attributes force a session reset.",
    "Treating nonzero reserved received bits as a reset trigger.",
    "Teaching AS_SET as the current default aggregation design despite RFC 9774.",
    "Calling displayed attributes proof of forwarding or of raw FLAGS bytes."
  ],
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g3-t2"
  ],
  "related": [
    "s3-g4-t0",
    "s3-g4-t1",
    "s3-g4-t2",
    "s3-g4-t3"
  ],
  "lab": {
    "objective": "Classify declared BGP attributes, decode one numeric FLAGS octet and identify where specification, policy and actual route evidence are still needed.",
    "requirements": "Browser only for the tabletop exercise. Optional read-only commands need a separately prepared supported isolated FRR/Linux observer; this page does not provision or execute it.",
    "topologyKind": "shared",
    "topology": [
      "Declared type → defined attribute class",
      "FLAGS octet → top four bits and reserved nibble",
      "Known-type comparison → bounded diagnostics",
      "Actual route/policy/forwarding evidence → separate investigation"
    ],
    "steps": [
      "Compare ORIGIN and LOCAL_PREF at decimal 64 and explain why their FLAGS classes agree while required presence differs.",
      "Compare MED, ORIGINATOR_ID and CLUSTER_LIST at decimal 128 with AGGREGATOR and COMMUNITIES at decimal 192.",
      "Select large communities at decimal 208, identify each bit and distinguish attribute length-field width from message capability.",
      "Compare hypothetical unrecognized transitive, partial transitive and nontransitive scenarios; state conditional forwarding behavior without inferring full route acceptance.",
      "Read MED flag conflict, forbidden ORIGIN Partial and reserved-bit examples as three separate diagnostics.",
      "Enter 0, 255, a fraction, an empty value and an out-of-range value. Valid byte decoding is distinct from known-type consistency; invalid input hides prior output.",
      "Keyboard-focus and horizontally scroll both named tables, then Reset to ORIGIN 64. Optional target investigation uses only the guided read-only commands with independently recorded scope."
    ],
    "verification": "The companion model tests check the declared class matrix, all 256 flag bytes for each supported type, boundary/rejection cases, preset independence and mounted invalid-context/reset behavior. These tests exercise a deterministic worksheet contract. No BGP session, malformed UPDATE, packet capture, router policy or original service is executed by this topic.",
    "troubleshooting": "First separate an invalid form from a valid numeric byte that conflicts with its declared type. Then separate reserved-bit sender rules from receiver behavior. Read the scope note before interpreting any classification as whole-message or live-protocol evidence.",
    "challenge": "Explain why FLAGS 64 fits both ORIGIN and LOCAL_PREF, why FLAGS 192 conflicts with MED, and why FLAGS 193 does not justify a receive-side session reset. Identify the additional evidence needed to prove what was actually sent to a peer.",
    "cleanup": "Reset restores the supplied ORIGIN declaration. The worksheet owns no actual routers, namespaces, daemons, captures or policies. Any separately authorized target exercise must reconcile its own exact prior baseline and ownership."
  },
  "glossary": {
    "Attribute Type Code": "Wire identifier selecting a path attribute's defined semantics.",
    "FLAGS": "One octet describing optional/transitive/partial and length-field properties plus reserved bits.",
    "Well-known mandatory": "Recognized base attribute with specified mandatory presence in its applicable reachability context.",
    "Well-known discretionary": "Recognized attribute whose presence follows its specific rules rather than a separate flag bit.",
    "Optional transitive": "Optional information with defined propagation behavior, including unrecognized-attribute handling.",
    "Optional nontransitive": "Optional information that an unrecognizing recipient ignores rather than propagates.",
    "Partial": "Flag describing partial optional transitive information; not packet fragmentation.",
    "Extended Length": "Flag selecting two rather than one octet for Attribute Length.",
    "Weight": "Local implementation preference absent from BGP wire path attributes.",
    "Treat-as-withdraw": "RFC 7606 handling that treats affected reachability as withdrawn, subject to complete error context."
  },
  "exams": [
    {
      "testedConcept": "Mandatory distinction",
      "question": "ORIGIN and LOCAL_PREF both have FLAGS 64 (0x40). What distinguishes their mandatory/discretionary classification?",
      "answer": "Their attribute specifications, not another FLAGS bit.",
      "explanation": "Optional zero and Transitive one identify well-known handling only.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Their attribute specifications, not another FLAGS bit.",
        "The Partial bit selects mandatory status.",
        "The lowest reserved bit marks discretionary attributes.",
        "The lower numeric type is always mandatory."
      ]
    },
    {
      "testedConcept": "Numeric decoding",
      "question": "What does FLAGS 208 (0xD0) declare?",
      "answer": "Optional transitive, Partial zero, two-octet attribute length field.",
      "explanation": "208 sets masks 128, 64 and 16 while leaving 32 and the low nibble clear.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Well-known mandatory with one-octet length.",
        "Optional nontransitive with Partial one.",
        "Optional transitive, Partial zero, two-octet attribute length field.",
        "A negotiated 65535-octet BGP message limit."
      ]
    },
    {
      "testedConcept": "Known-type conflict",
      "question": "A declared MED has FLAGS 192 (0xC0). Which bounded diagnosis is justified?",
      "answer": "Its Transitive bit conflicts with MED's defined optional nontransitive class.",
      "explanation": "The byte is numerically valid but known-type consistency fails; complete UPDATE handling needs actual context.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "MED is well-known discretionary.",
        "Its Transitive bit conflicts with MED's defined optional nontransitive class.",
        "Every peer must immediately reset its TCP connection.",
        "The byte proves MED is preferred over LOCAL_PREF."
      ]
    },
    {
      "testedConcept": "Partial constraint",
      "question": "ORIGIN is supplied with FLAGS 96 (0x60). Which bit violates the scoped rule?",
      "answer": "Partial is set even though the attribute is well-known.",
      "explanation": "Partial must be zero for well-known and optional nontransitive attributes.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Transitive is set, which ORIGIN forbids.",
        "Extended Length is set, which every mandatory attribute forbids.",
        "Optional is set, making ORIGIN unknown.",
        "Partial is set even though the attribute is well-known."
      ]
    },
    {
      "testedConcept": "Unknown transitive handling",
      "question": "An accepted path carries an unrecognized optional transitive attribute and is passed onward. What does RFC 4271 require for that attribute?",
      "answer": "Pass it with the path and set Partial to one.",
      "explanation": "The condition matters: this does not override policy or validate a complete UPDATE.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Pass it with the path and set Partial to one.",
        "Remove it and preserve only the NLRI.",
        "Convert its type to LOCAL_PREF.",
        "Reset every session because it is unrecognized."
      ]
    },
    {
      "testedConcept": "Unknown nontransitive handling",
      "question": "What does ignoring an unrecognized optional nontransitive attribute imply by itself?",
      "answer": "The attribute is not propagated; this alone does not reject the entire route.",
      "explanation": "Attribute handling and route admission are different questions.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "The whole route must always be withdrawn.",
        "The attribute is not propagated; this alone does not reject the entire route.",
        "The attribute becomes mandatory at the next AS.",
        "Every received optional attribute is malformed."
      ]
    },
    {
      "testedConcept": "Local versus wire",
      "question": "A local FRR route display includes Weight. Which description is correct?",
      "answer": "Weight is a local implementation preference, not a BGP wire path attribute.",
      "explanation": "Do not expect a Weight Type Code in a peer UPDATE.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "Weight is the standard type 5 wire attribute.",
        "Weight is the sum of IP router hops.",
        "Weight is a local implementation preference, not a BGP wire path attribute.",
        "Weight is encoded in the reserved FLAGS bits."
      ]
    },
    {
      "testedConcept": "Reserved receive rule",
      "question": "COMMUNITIES has FLAGS 193 (0xC1), including a nonzero reserved bit. What conclusion follows from that bit alone?",
      "answer": "The sender violates zero-on-send; the receiver must ignore the reserved bits.",
      "explanation": "The worksheet must not infer malformed handling or session reset solely from the reserved nibble.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "The community value has been authenticated.",
        "Partial must be forced to zero and the route rejected.",
        "The receiver must reset the session.",
        "The sender violates zero-on-send; the receiver must ignore the reserved bits."
      ]
    },
    {
      "testedConcept": "Current AS_SET guidance",
      "question": "Under RFC 9774, absent explicit operator configuration otherwise, how are AS_SET and AS_CONFED_SET handled?",
      "answer": "Do not advertise them; treat received updates containing them as withdrawn.",
      "explanation": "RFC 9774 deprecates those segment types and preserves an explicit transition exception.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Do not advertise them; treat received updates containing them as withdrawn.",
        "Always create an AS_SET for every aggregate.",
        "Replace all AS_SEQUENCE segments with AS_SET.",
        "Accept them only when the Extended Length bit is zero."
      ]
    },
    {
      "testedConcept": "Community classes",
      "question": "Which comparison of standard and large communities is accurate?",
      "answer": "Both are optional transitive; individual values occupy four and twelve octets respectively.",
      "explanation": "Their value formats differ while both need policy meaning and separate value validation.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Standard communities are mandatory and large communities nontransitive.",
        "Both are optional transitive; individual values occupy four and twelve octets respectively.",
        "Both are local-only display values like Weight.",
        "Large communities use twelve bits while standard communities use four bits."
      ]
    }
  ],
  "quick": [
    {
      "testedConcept": "Presence classification",
      "question": "Can the FLAGS byte alone distinguish well-known mandatory from discretionary?",
      "answer": "No; read the attribute specification.",
      "explanation": "Both share Optional zero and Transitive one.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Length scope",
      "question": "What does the Extended Length bit change?",
      "answer": "Attribute Length field width from one octet to two.",
      "explanation": "It does not negotiate extended BGP messages or prove an attribute's actual length.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Evidence boundary",
      "question": "Does a matching known type and FLAGS byte prove that an original endpoint exchange works?",
      "answer": "No; route, next-hop, forwarding and return/service evidence are separate.",
      "explanation": "The deterministic byte worksheet sends no updates or packets.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "sources": [
    {
      "title": "RFC 4271 sections 4.3 and 5: flags, attribute classes and conditional unrecognized handling",
      "url": "https://www.rfc-editor.org/rfc/rfc4271",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 7606: revised UPDATE error handling and flag conflicts",
      "url": "https://www.rfc-editor.org/rfc/rfc7606",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 9774: deprecation of AS_SET and AS_CONFED_SET",
      "url": "https://www.rfc-editor.org/rfc/rfc9774",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 1997: standard COMMUNITIES attribute",
      "url": "https://www.rfc-editor.org/rfc/rfc1997",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 8092: type 32, large community format and trust limits",
      "url": "https://www.rfc-editor.org/rfc/rfc8092",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 4456 section 8: ORIGINATOR_ID and CLUSTER_LIST types and classes",
      "url": "https://www.rfc-editor.org/rfc/rfc4456",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable 8.4: local Weight, attribute context and route inspection syntax",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g4-t0",
  "batch": "09",
  "title": "BGP Local Preference",
  "subtitle": "Use an internal preference to express which eligible exit your AS should favor.",
  "level": "Intermediate → Advanced",
  "minutes": 35,
  "definition": "LOCAL_PREF is a well-known discretionary BGP path attribute expressing a speaker’s degree of preference for a route inside its AS. It is a four-octet unsigned integer. RFC 4271 says higher preference MUST be preferred and requires the attribute on UPDATEs to internal peers. Ordinary UPDATEs to external peers MUST omit it, except in the BGP confederation case.",
  "purpose": "Use LOCAL_PREF to coordinate which eligible external exit your AS prefers for outbound traffic to a destination. Set policy where route ownership and scope are clear, distribute preference over iBGP, and inspect selected BGP path separately from system RIB installation and actual forwarding. This guides the local AS outbound exit preference. A preference value expresses policy; it does not make an unusable path usable.",
  "mental": "Imagine two doors to the same prefix. First ask whether each door is admitted and its next hop usable. Among the remaining candidates, higher LOCAL_PREF wins this lesson’s scoped stage. Equal values leave later BGP selection stages to decide. Then inspect system RIB selection and the actual forward and return paths separately.",
  "components": [
    "LOCAL_PREF is carried inside the AS to communicate route preference. It is well-known discretionary; ordinary eBGP UPDATEs omit it, with confederations as the specified exception.",
    "RFC 4271 requires the higher degree of preference to be preferred. LOCAL_PREF is not bandwidth, link cost, distance, or proof of reachability.",
    "A rejected route or one failing applicable resolvability cannot win because its supplied value is high.",
    "Equal eligible values require later BGP selection rules. The scoped comparison assumes earlier implementation-local factors, such as FRR Weight, do not distinguish the candidates. This page does not calculate those criteria or promise a universal complete best-path order.",
    "A BGP-stage choice can be displaced in the system routing table. Installation and original forward/return exchange are separate questions."
  ],
  "mechanism": [
    "Bound the AS, AFI/SAFI, exact prefix and two candidates. Identify route sources and local import policy. This worksheet fixes both candidates to IPv4 198.51.100.0/24.",
    "Record admission, next-hop resolvability and LOCAL_PREF for each. The worksheet accepts booleans and integers 0 through 4294967295; it does not infer facts from a configured line.",
    "Exclude candidates that are not admitted or resolvable. One remaining candidate wins this scoped stage. With two, higher LOCAL_PREF wins; equal values remain tied for later stages. Earlier implementation-local factors, including vendor Weight and any local-origination distinction, are held equal or excluded.",
    "Check system RIB selection independently, then record forward and return readiness. These declarations do not change preference comparison and do not measure packet delivery.",
    "Compare intended policy with actual FRR BGP and system route observations on the exact target. Preserve baseline and follow target-specific change control before editing."
  ],
  "flow": [
    [
      "Admit candidates",
      "Record import-policy admission for each exact-prefix route."
    ],
    [
      "Check resolution",
      "Exclude an unresolvable candidate from this scoped comparison."
    ],
    [
      "Compare LOCAL_PREF",
      "Higher eligible value wins this scoped stage under the stated earlier-factor assumption; equal values need later BGP criteria."
    ],
    [
      "Check installation and exchange",
      "Inspect system RIB selection, then verify original forward and return paths independently."
    ]
  ],
  "comparison": [
    [
      "LOCAL_PREF / MED",
      "Within-AS preference / attribute with a different policy role",
      "Do not compare their numbers as a shared metric."
    ],
    [
      "LOCAL_PREF / system route preference",
      "BGP path attribute / competition among routing sources in the local system RIB",
      "A BGP winner need not be the installed system route."
    ],
    [
      "Higher / reachable",
      "Preference ordering / candidate usability",
      "A high value cannot repair rejected policy or unresolved next hop."
    ],
    [
      "Equal values / tie-break",
      "Same scoped preference / later BGP selection stages",
      "This worksheet does not invent a tie winner."
    ],
    [
      "iBGP / eBGP advertisement",
      "LOCAL_PREF is distributed internally / ordinarily omitted externally",
      "Confederation behavior is an exception."
    ],
    [
      "BGP selection / forwarding",
      "Control-plane path decision / packet path and return",
      "Neither an installed route nor a BGP winner proves service."
    ]
  ],
  "example": "Both supplied candidates represent 198.51.100.0/24 and are admitted and resolvable. A has LOCAL_PREF 200; B has 100, so A wins this worksheet’s scoped stage. If A becomes unresolved, B is the only eligible candidate despite A’s higher number. Equal values leave later selection unresolved. The comparison assumes earlier implementation-local factors such as vendor Weight and local-origination distinctions are equal; it does not calculate a complete best-path sequence. Even when A wins the BGP stage, the system RIB may select another source; forward and return prerequisites remain independent. FRR stable 8.4 documents a default local preference of 100; 200 here is an illustrative policy override, not a universal recommendation.",
  "commands": [
    {
      "code": "vtysh -c 'show bgp ipv4 unicast summary'",
      "explanation": "Inspect the IPv4 unicast BGP peer summary on the named FRR instance.",
      "expected": "GUIDED, NOT EXECUTED: record peer state and AFI/SAFI. This does not prove exact-prefix preference or forwarding.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show bgp ipv4 unicast 198.51.100.0/24'",
      "explanation": "Inspect FRR BGP paths and displayed LOCAL_PREF for the fixed prefix.",
      "expected": "GUIDED, NOT EXECUTED: inspect paths, validity, best marker, next hop and LOCAL_PREF. Actual output depends on the instance; no sample output is asserted.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show bgp ipv4 unicast neighbors PEER routes'",
      "explanation": "Inspect routes accepted from one named peer after inbound policy; replace PEER with its observed address.",
      "expected": "GUIDED, NOT EXECUTED: confirm peer, AFI/SAFI, accepted prefix and attributes. FRR documents this as accepted routes; it does not show all rejected pre-policy input.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show ip route 198.51.100.0/24'",
      "explanation": "Inspect the system IPv4 route choice separately from BGP path selection.",
      "expected": "GUIDED, NOT EXECUTED: record route source, next hop and table/VRF. A BGP best path may be displaced in the system RIB; neither view proves the original transaction.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    }
  ],
  "configuration": "Prepared isolated FRR stable 8.4 policy example: an inbound route-map entry matching an owned prefix-list could apply set local-preference 200 to the permitted exact prefix. Record existing route-map order and implicit deny behavior first, permit only intended routes and attach the map to the intended neighbor and IPv4-unicast direction. A route-map existing in configuration alone is not proof that a peer uses it. Capture baseline accepted paths and system RIB, apply a reviewed target-specific update method, inspect resulting post-policy attributes and reverse only the intended change if scope differs. No configuration change or policy refresh was executed here; the four command blocks are read-only observation guidance.",
  "ports": "BGP uses TCP port 179. The worksheet opens no sockets and does not establish or inspect a BGP session.",
  "production": "Choose values from documented within-AS exit policy, apply consistent import policy across intended speakers, and verify what iBGP peers receive. Preserve peer, VRF, AFI/SAFI and routing-source context. Confirm BGP selection, system installation, next-hop resolution and original traffic in separate evidence sources.",
  "troubleshooting": [
    [
      "Symptom",
      "The intended exit does not appear as the selected path."
    ],
    [
      "Hypotheses",
      "A candidate was rejected, has unresolved next hop, has lower LOCAL_PREF, ties at this stage or is displaced in the system RIB."
    ],
    [
      "Test",
      "Inspect exact-prefix BGP paths and accepted peer routes, then the system route for the same prefix."
    ],
    [
      "Observation",
      "Record actual admission, LOCAL_PREF, next hop, BGP best status and system route source. Do not assume missing output proves protocol failure."
    ],
    [
      "Conclusion / next test",
      "Identify which layer differs from intent. If values tie, inspect later target-specific selection evidence rather than choosing a winner."
    ],
    [
      "Fix and verify",
      "After reviewing ownership and baseline, change only intended policy through target change control, then repeat BGP, RIB and original exchange observations."
    ]
  ],
  "security": "Treat routing policy and route outputs as sensitive. Redact peer addresses, internal prefixes, communities, ASNs and topology details before external sharing. Enforce who may change import policy and which exact prefixes may receive an override. Do not let an untrusted customer tag trigger a privileged preference without a documented matching contract and boundary filter. A preference change can redirect traffic while all sessions remain established; verify its intended scope and rollback.",
  "performance": "LOCAL_PREF is a policy input, not a throughput metric. Measure selected path, forwarding behavior, loss and application latency under the relevant workload; a higher value alone establishes none of these.",
  "mistakes": [
    "Treating a larger value as proof a route is admitted or reachable.",
    "Assuming equal values have a universal winner or calculating unspecified later stages here.",
    "Conflating BGP selected path with system RIB installation.",
    "Assuming LOCAL_PREF is ordinarily sent to eBGP peers.",
    "Treating route output or a readiness checkbox as a packet or service test.",
    "Presenting FRR’s default 100 as universal or example 200 as a recommendation.",
    "Ignoring an implementation-specific factor that precedes LOCAL_PREF; this worksheet assumes any such factor is equal for both candidates."
  ],
  "interactive": "local-preference",
  "lab": {
    "objective": "Compare two supplied candidates for one exact IPv4 prefix at the LOCAL_PREF stage and separate that result from system route selection and end-to-end readiness.",
    "requirements": "Worksheet uses supplied declarations and sends no BGP messages or packets. Guided FRR 8.4 commands are read-only examples and were not executed. Replace PEER and confirm AFI/SAFI, VRF, ownership and target version before use.",
    "topology": [
      "Candidate A → 198.51.100.0/24",
      "Candidate B → 198.51.100.0/24",
      "One local BGP speaker and system RIB",
      "Independent original forward and return declarations"
    ],
    "steps": [
      "Load baseline. Record admission, resolution and preference for each candidate; explain why A wins the modeled stage.",
      "Load equal. Record that later-stage tie resolution remains open.",
      "Load higher-unresolved and rejected. Explain why B may win despite A having the higher number. The model assumes any earlier implementation-specific factors, such as Weight or local-origination preference, are equal.",
      "Load none, zero and max to inspect eligibility and numeric boundaries.",
      "Load system-displaced, return-missing and forward-missing. Explain how each independent declaration changes output without changing the LOCAL_PREF comparison.",
      "On a prepared FRR stable 8.4 target, run the four guided read-only commands after confirming peer and table context. Record only actual observations."
    ],
    "verification": "Report admitted/resolvable candidates, the scoped LOCAL_PREF winner or unresolved tie, system RIB installation and original forward/return readiness separately. The scoped comparison holds earlier implementation-local factors such as Weight and local-origination preference equal. Cite actual output for live-target claims; label worksheet results as supplied declarations.",
    "troubleshooting": "If no candidate is eligible, identify admission and resolution separately. If tied, inspect later BGP stages on target. If BGP and system route views differ, record separate decisions. If a command is unavailable, record target version and exact error; do not invent output.",
    "challenge": "Can candidate A’s higher preference make it win when unresolved? What evidence explains an equal-value tie on a live FRR router?",
    "cleanup": "Worksheet changes only browser-local controls. Guided commands are show-only. No device configuration, session, route, namespace, packet or learner progress is changed.",
    "topologyKind": "shared"
  },
  "quick": [
    {
      "testedConcept": "Preference direction",
      "question": "When both candidates are admitted and resolvable and their values differ, which LOCAL_PREF wins this stage?",
      "answer": "The higher value.",
      "explanation": "RFC 4271 requires the higher degree of preference to be preferred.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Eligibility",
      "question": "A has LOCAL_PREF 500 but is unresolved; B is eligible at 100. Which wins this scoped comparison?",
      "answer": "Candidate B.",
      "explanation": "The unresolved candidate is excluded before preference comparison.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Tie handling",
      "question": "Both eligible candidates have LOCAL_PREF 100. Does this worksheet pick one?",
      "answer": "No; later BGP selection stages remain unresolved.",
      "explanation": "The model does not invent a tie winner.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    }
  ],
  "exams": [
    {
      "options": [
        "Candidate A",
        "Candidate B",
        "Neither; the lower value wins",
        "Both must be installed"
      ],
      "testedConcept": "Preference direction",
      "explanation": "The higher eligible LOCAL_PREF wins the modeled stage.",
      "question": "Both admitted, resolvable candidates represent 198.51.100.0/24. A has LOCAL_PREF 150 and B has 120. Which candidate wins this scoped stage?",
      "type": "multiple-choice",
      "difficulty": "Beginner",
      "answer": "Candidate A"
    },
    {
      "options": [
        "Candidate A wins because 900 is largest",
        "Candidate B is the only eligible candidate",
        "The system necessarily installs Candidate B",
        "The values are added"
      ],
      "testedConcept": "Eligibility before preference",
      "explanation": "A high value does not reinstate a rejected route.",
      "question": "A has LOCAL_PREF 900 but is rejected by import policy. B is admitted and resolvable at 100. What is the result?",
      "type": "multiple-choice",
      "difficulty": "Intermediate",
      "answer": "Candidate B is the only eligible candidate"
    },
    {
      "options": [
        "Candidate A wins alphabetically",
        "Candidate B wins because it is listed second",
        "Tie remains unresolved for later BGP stages",
        "The system necessarily installs both"
      ],
      "testedConcept": "Tie handling",
      "explanation": "The model does not invent a tie winner or calculate the full best-path sequence.",
      "question": "Two eligible candidates have equal LOCAL_PREF. What does this worksheet report?",
      "type": "multiple-choice",
      "difficulty": "Intermediate",
      "answer": "Tie remains unresolved for later BGP stages"
    },
    {
      "options": [
        "A wins this BGP stage but is not declared installed",
        "A is removed from the BGP table",
        "B wins the LOCAL_PREF comparison",
        "A packet test proved installation"
      ],
      "testedConcept": "System installation",
      "explanation": "BGP path choice and system route selection are separate.",
      "question": "A is the scoped BGP winner, but systemSelectsBgpWinner is false. What is reported?",
      "type": "multiple-choice",
      "difficulty": "Advanced",
      "answer": "A wins this BGP stage but is not declared installed"
    },
    {
      "options": [
        "Yes, to every eBGP peer",
        "No, except for BGP confederations",
        "Only when its value is 100",
        "Only after a packet test"
      ],
      "testedConcept": "Attribute scope",
      "explanation": "RFC 4271 describes it for internal peers and specifies the confederation exception.",
      "question": "Is LOCAL_PREF ordinarily included in UPDATEs sent to external BGP peers?",
      "type": "multiple-choice",
      "difficulty": "Intermediate",
      "answer": "No, except for BGP confederations"
    },
    {
      "options": [
        "0 through 65535",
        "1 through 4294967295",
        "0 through 4294967295",
        "Any decimal or text value"
      ],
      "testedConcept": "Unsigned width",
      "explanation": "Four octets encode an unsigned 32-bit integer.",
      "question": "What numeric range does the four-octet unsigned LOCAL_PREF attribute allow?",
      "type": "multiple-choice",
      "difficulty": "Advanced",
      "answer": "0 through 4294967295"
    },
    {
      "options": [
        "Every BGP router uses 100",
        "100 is required by RFC 4271",
        "Nothing universal; check the target implementation",
        "The example override 200 is recommended everywhere"
      ],
      "testedConcept": "Default interpretation",
      "explanation": "An implementation default is not a universal recommendation.",
      "question": "FRR stable 8.4 documents a default LOCAL_PREF of 100. What does that establish about every router?",
      "type": "multiple-choice",
      "difficulty": "Intermediate",
      "answer": "Nothing universal; check the target implementation"
    },
    {
      "options": [
        "A wins because 700 is larger",
        "B wins because A is excluded as unresolved",
        "The route values are averaged",
        "A must be installed in the system RIB"
      ],
      "testedConcept": "Resolution",
      "explanation": "The scoped model excludes unresolvable candidates before comparing preference.",
      "question": "A has LOCAL_PREF 700 but is unresolved; B is admitted, resolvable and has 100. What does this worksheet report?",
      "type": "multiple-choice",
      "difficulty": "Intermediate",
      "answer": "B wins because A is excluded as unresolved"
    },
    {
      "options": [
        "The exchange is proven successful",
        "Exchange prerequisites are incomplete; no traffic result is measured",
        "LOCAL_PREF changes to zero",
        "The system route is withdrawn"
      ],
      "testedConcept": "End-to-end evidence",
      "explanation": "The reverse path is independent and the worksheet does not send packets.",
      "question": "The winner is installed and the forward declaration is ready, but returnReady is false. What does the worksheet report?",
      "type": "multiple-choice",
      "difficulty": "Advanced",
      "answer": "Exchange prerequisites are incomplete; no traffic result is measured"
    },
    {
      "options": [
        "Ping only the destination",
        "Inspect the exact-prefix BGP table and system route table separately",
        "Read only the route-map configuration",
        "Assume the higher LOCAL_PREF proves both"
      ],
      "testedConcept": "Operational observation",
      "explanation": "Each view answers a different selection question.",
      "question": "Which observations distinguish BGP path choice from system route installation?",
      "type": "multiple-choice",
      "difficulty": "Advanced",
      "answer": "Inspect the exact-prefix BGP table and system route table separately"
    }
  ],
  "glossary": {
    "LOCAL_PREF": "Four-octet BGP attribute expressing degree of route preference inside an AS.",
    "Eligible candidate": "Supplied route that passes this model’s admission and resolvability declarations.",
    "BGP-stage winner": "Candidate that wins this worksheet’s limited comparison; ties remain unresolved.",
    "System RIB": "Routing information base selecting among route sources independently of this BGP-stage result.",
    "AFI/SAFI": "Address Family Identifier and Subsequent Address Family Identifier, which scope BGP exchange.",
    "Confederation": "BGP extension that is an exception to ordinary eBGP LOCAL_PREF handling."
  },
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g3-t2",
    "s3-g3-t3"
  ],
  "related": [
    "s3-g4-t1",
    "s3-g4-t2",
    "s3-g4-t3"
  ],
  "sources": [
    {
      "title": "RFC 4271: LOCAL_PREF attribute and route-selection preference",
      "url": "https://www.rfc-editor.org/rfc/rfc4271",
      "checked": "2026-10-09"
    },
    {
      "title": "FRRouting stable 8.4 BGP documentation: LOCAL_PREF default and show commands",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g4-t1",
  "batch": "09",
  "title": "MED",
  "subtitle": "Check whether a two-path comparison reaches MED before preferring the lower value.",
  "level": "Intermediate → Advanced",
  "minutes": 70,
  "interactive": "med",
  "definition": "MULTI_EXIT_DISC (MED) is an optional non-transitive BGP attribute carrying a four-octet unsigned metric. It can express a neighboring AS's preference among entry or exit points. Lower is preferred when the comparison reaches MED and the routes are comparable. The browser is a deliberately bounded worksheet for two supplied IPv4-unicast candidates covering exactly 198.51.100.0/24. It checks admission and next-hop resolution, equality of three supplied earlier dimensions, the ordinary neighboring-AS comparison scope and effective MED. It does not implement all BGP bestpath stages, choose among different prefix lengths or measure traffic.",
  "purpose": "Use this lesson to answer a precise question: did MED actually distinguish these two otherwise comparable candidates at this observer? Start with the receiving router's post-policy attributes and selection context. An advertising AS may use different MED values at two connections to suggest where its neighbor should send traffic toward it, but the receiver's policy and earlier decisions can override that suggestion. An inbound traffic objective needs cooperation and actual observation; setting a low MED does not guarantee that another AS honors it or that every remote sender uses that link.",
  "mental": "Give a receiving AS two destination cards for one exact prefix. First discard cards that cannot be used. Then ask whether the earlier comparison dimensions tie and whether the two neighboring AS labels permit this MED comparison. Only then compare the MED numbers. A blank number has a documented target-specific interpretation, not an invitation to guess. If the numbers tie or comparison is skipped, leave the decision unfinished until the real later stages are inspected. Put system installation and the actual forward/reply exchange on separate sheets.",
  "components": [
    "One observer and one prefix: the fixed worksheet is IPv4 unicast in a declared destination table, with exactly two supplied candidates for 198.51.100.0/24. It never compares a /24 against a /25 or selects a packet's longest matching prefix.",
    "Usable candidate gates: admitted represents supplied import and ordinary route eligibility checks; resolved represents supplied NEXT_HOP resolution. Neither gate performs a live policy evaluation, AS-loop analysis, ARP lookup or underlay recursion.",
    "Earlier dimensions: supplied LOCAL_PREF, ordinary AS_SEQUENCE length and ORIGIN must be equal for the MED-only contest. Weight and local-origination differences are held equal or excluded, as are specialized bestpath policy knobs. Unequal supplied dimensions produce an explicit scope boundary without a fabricated earlier-stage winner.",
    "Neighboring AS declaration: for the nonempty ordinary AS_SEQUENCE used here, each candidate supplies its leftmost ASN. That ASN can describe an external neighbor from which an iBGP-distributed route was learned; it is not automatically the local iBGP session peer's AS. Empty paths, AS_SET and confederations are excluded. The numeric input admits 1..4294967294 and excludes the reserved last four-octet ASN; it does not verify assignment or authorize operational ASN use.",
    "Metric presence and value: null means MED absent; numeric zero means an explicit MED attribute of zero. The pinned FRR 8.4.4 source uses effective zero by default and 4294967295 with explicit missing-as-worst. An explicit maximum value ties that effective maximum; the worksheet does not invent an infinity beyond the unsigned range.",
    "Independent outcomes: a known BGP candidate choice can be displaced by another system route source. Even a system-selected route needs forwarding, neighbor, policy and return/service evidence. The worksheet supplies readiness declarations only and does not transmit packets."
  ],
  "mechanism": [
    "Record the receiving observer, AFI/SAFI, table/VRF and exact prefix. Capture both candidate records after the applicable input policy, including MED presence rather than just a display column that might render absent values as zero. Keep the advertising direction and intended traffic direction explicit. RFC 4271 permits eBGP-received MED distribution via iBGP within the receiving AS; that received neighboring-AS MED must not be propagated to other neighboring ASes. Deliberate local attribute policy is separate.",
    "Check the declared admission and resolution gates before a MED contest. With no usable candidate, report no BGP choice in this fixture. With exactly one usable candidate, report that sole choice without claiming its lower MED beat the unusable route. Admission and resolution are required even when the unusable candidate's metric is attractive.",
    "For two usable candidates, compare the supplied earlier dimensions for equality. If LOCAL_PREF, AS_SEQUENCE length or ORIGIN differs, stop this worksheet at the boundary. Real FRR has additional earlier stages and policy context; use the actual observer's decision evidence to identify a winner rather than borrowing a MED answer from this narrow tool.",
    "Check neighboring-AS scope. Under the default ordinary case, different declared leftmost ASNs skip MED. Selecting explicit always-compare permits the numeric contest across those ASNs. Values set by different administrators may have different meanings, so this option needs reviewed policy rather than an assumption that all providers use a common quality scale.",
    "Obtain each effective MED under the selected pinned target mode. Compare only if the gates above allow it. A lower effective value distinguishes the two candidates; equal effective values leave later bestpath stages unresolved. The model never supplies router ID, peer address or an arbitrary alphabetical winner to break the tie.",
    "Distinguish always-compare-med from deterministic-med. FRR documents deterministic-med as arranging local route evaluation by neighboring AS; it does not mean compare all neighboring ASes. This two-candidate worksheet does not execute deterministic-MED processing, reconstruct three-or-more-path ordering or establish network convergence. A local deterministic decision is not a general proof that multiple speakers cannot oscillate.",
    "Read the BGP choice separately from the system route table and forwarding context. In the tool, the system-select declaration applies only after a choice is known. When later or earlier unmodeled stages are needed, installation and exchange prerequisite agreement remain undetermined rather than being shown as failed or successful measurements.",
    "Finish with actual original-service and return evidence if operating a real prepared lab. Configuration and a route-table best marker explain parts of the control decision; they do not prove packet delivery, bandwidth, symmetric routing or an upstream's inbound behavior. This lesson's tabletop has no actual routing lab execution or performance evidence."
  ],
  "flow": [
    [
      "Scope and admit",
      "One observer, one exact IPv4-unicast prefix and two admitted/resolvable declarations."
    ],
    [
      "Reach the MED gate",
      "Earlier dimensions must tie; default comparison needs the same ordinary neighboring AS."
    ],
    [
      "Compare effective values",
      "Lower wins this contest; ties or skipped comparison require stages outside the model."
    ],
    [
      "Verify separate outcomes",
      "Inspect system route and forwarding/return evidence independently of the BGP choice."
    ]
  ],
  "comparison": [
    [
      "MED / LOCAL_PREF",
      "Neighbor's handoff suggestion / local AS preference",
      "A lower MED is insufficient when earlier selection differs."
    ],
    [
      "Same neighbor / different neighbors",
      "Default comparable group / default skipped MED",
      "Leftmost ordinary AS_SEQUENCE ASN is the scoped neighboring-AS declaration."
    ],
    [
      "Always compare / deterministic MED",
      "Broader comparison scope / local evaluation arrangement",
      "The two options solve different selection questions."
    ],
    [
      "Absent / explicit zero",
      "No received attribute / present attribute value 0",
      "Default effective values may tie while attribute presence differs."
    ],
    [
      "BGP choice / system installation",
      "Protocol candidate selection / routing-source selection",
      "Another system source can displace the BGP choice."
    ],
    [
      "Lower metric / better service",
      "Policy comparison / observed transaction",
      "MED is not latency, bandwidth or a delivery guarantee."
    ]
  ],
  "example": "A and B advertise the same 198.51.100.0/24 to the receiving AS through two handoffs. Their declared leftmost ASN is 65002, LOCAL_PREF is 100, ordinary sequence length is 2 and ORIGIN is IGP. Both are admitted and resolvable; A MED 100 beats B MED 200 in the scoped contest. Change B's neighboring ASN to 65003: default comparison stops at different-neighbor and no later-stage winner is invented. Enable always-compare and the same numbers again distinguish A. Reset, then make A unresolved: B becomes the sole usable candidate even though its MED is larger. Finally leave A selected and turn return readiness off; the BGP answer remains A while declared exchange prerequisites fail. These are authored tabletop states, not captured UPDATEs or measured traffic.",
  "ports": "MED is an attribute within BGP's existing control exchange over TCP 179; it adds no application port and is not carried as a per-packet forwarding instruction. This worksheet does not open a socket. Original-service evidence must identify its own transport, source/destination, family and table.",
  "commands": [
    {
      "code": "show bgp ipv4 unicast summary json",
      "platform": "Prepared FRR 8.4 CLI · default table · guided read-only, not executed",
      "explanation": "Record observer, local/peer AS identities and IPv4-unicast session context before interpreting candidate attributes.",
      "expected": "A session summary identifies the control scope. Established alone does not show which MED was received, which path is usable or which route forwards traffic. If the target uses a VRF, use its reviewed supported VRF scope; this example is default-table only."
    },
    {
      "code": "show bgp ipv4 unicast json",
      "platform": "Prepared FRR 8.4 CLI · default table · guided read-only, not executed",
      "explanation": "Inspect both actual candidate records for the exact owned test prefix and compare post-policy path, LOCAL_PREF, ORIGIN, metric presence/value and selected/valid metadata.",
      "expected": "Retain the actual output and isolate 198.51.100.0/24 for analysis. Two displayed paths do not automatically mean two eligible comparable paths. JSON fields and presence must be read from the target output; the worksheet does not parse or reproduce this output."
    },
    {
      "code": "show running-config",
      "platform": "Prepared FRR 8.4 CLI · guided read-only, not executed",
      "explanation": "Review exact BGP instance, neighbor/family policy attachments and whether always-compare-med, deterministic-med or bestpath med missing-as-worst is configured.",
      "expected": "Record the target release and effective owned configuration. The three knobs have distinct meaning. Inspect referenced policy objects for attribute changes; configuration intent is separate from a settled post-policy route observation. Preserve output according to the lab's access rules."
    },
    {
      "code": "show ip route 198.51.100.0/24",
      "platform": "Prepared FRR 8.4 Zebra CLI · default table · guided read-only, not executed",
      "explanation": "Compare the actual system routing record for the exact test prefix with the BGP candidate choice.",
      "expected": "Record source selection and next-hop/installation metadata in the actual table. A system routing view alone does not prove hardware programming or the original exchange. Forwarding and return/service observations remain separate; no probe or device change is executed by this page."
    }
  ],
  "configuration": "This lesson is a read-only tabletop and supplies no configuration recipe. For an independently prepared isolated FRR 8.4 lab, the owner must map the observer, two peer handoffs, AFI/SAFI, exact prefix ownership, import/export attachments, next-hop dependencies and baseline attributes before inspection. The mode shown as missing-as-worst is the pinned FRR 8.4.4 command bgp bestpath med missing-as-worst in router-BGP configuration, source-checked but not run here. The always-compare option changes comparison scope; deterministic-med is separate. Do not toggle a live global BGP knob to reproduce a checkbox. A separately authorized policy experiment needs its own exact old attachments/values, re-evaluation method, independent management, traffic baseline and rollback review.",
  "production": "Document who sets each metric, which prefixes and handoffs it covers, and whether the receiving AS agrees to use it. Interpret attributes after local policy, keeping default comparison scope explicit. Changing comparison scope across independently administered neighbors can change path choices well beyond one demonstration prefix. A sender's preference can influence its neighbor's ingress behavior, but independent local preference, origin/path selection, filters and topology constrain that influence. The toy observer has no route history, reflector topology or scale evidence; review full production behavior and convergence separately.",
  "troubleshooting": [
    [
      "Lower MED is not selected",
      "First check exact-prefix/table scope, admission, next-hop resolution and earlier selection evidence. Then check neighboring-AS scope and effective metric handling before considering later stages."
    ],
    [
      "Different peers but same MED group",
      "Compare each path's leftmost ordinary neighboring AS, not the physical connection name or local iBGP peer AS. Confirm excluded path forms before applying the shortcut."
    ],
    [
      "Metric appears as zero",
      "Determine whether the MED attribute is present or absent and confirm effective target mode. The pinned default can give an absent attribute effective zero; display appearance alone cannot prove presence."
    ],
    [
      "Equal effective MED",
      "Preserve both candidates and inspect later bestpath context. Do not label A preferred simply because it occupies the first row."
    ],
    [
      "BGP best differs from installed route",
      "Inspect the destination table's other route sources, system selection and actual forwarding state. Keep the protocol decision distinct from a successful service."
    ],
    [
      "Inbound traffic ignores the suggestion",
      "Review the receiving neighbor's agreed policy and actual observations. A sender controls its advertisement, not every independent AS's decision."
    ],
    [
      "More paths or oscillation suspected",
      "Stop extending the two-candidate answer. Collect the full candidate set, update history and topology; deterministic-MED and network convergence require a separate review."
    ]
  ],
  "security": "MED does not authenticate a path or prove prefix ownership. Admission and permitted propagation remain explicit boundary decisions, with session, origin-validation and administrative protections reviewed in their own scope. Accepting a neighbor's metric is a policy choice; broad changes to path preference can move traffic to an unintended handoff even when sessions remain up. The tabletop has no access to peers or devices.",
  "performance": "A MED number is not a measurement of throughput, delay or packet loss. The comparison performs fixed two-candidate arithmetic; it does not benchmark route processing, FIB programming, convergence, failover loss or multipath distribution. FRR's guide describes a processing cost for deterministic-med with many candidates, but this worksheet executes neither that algorithm nor a scale test. Use measured workload and actual candidate/topology scope for capacity conclusions.",
  "mistakes": [
    "Comparing MED before verifying eligibility and earlier dimensions.",
    "Comparing different neighboring ASes by default.",
    "Using the local iBGP session ASN as the external neighboring-AS label.",
    "Treating always-compare-med and deterministic-med as the same option.",
    "Assuming an absent MED is always least preferred.",
    "Picking an arbitrary winner on equal effective MED.",
    "Calling a lower metric an inbound-control or service guarantee.",
    "Extending a two-path worksheet to three-or-more-path ordering or convergence."
  ],
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g3-t2",
    "s3-g3-t3",
    "s3-g4-t0"
  ],
  "related": [
    "s3-g4-t2",
    "s3-g4-t3"
  ],
  "artifacts": [],
  "lab": {
    "objective": "Explain whether two supplied candidates reach MED, distinguish missing-attribute handling and keep route choice separate from installation and traffic.",
    "requirements": "A browser for the authored tabletop; no daemon, credentials, root privilege or network access required. Optional read-only target inspection requires a separately prepared authorized isolated FRR 8.4 observer and its actual table/peer/prefix mapping.",
    "topologyKind": "shared",
    "topology": [
      "Neighbor AS65002 handoff A → receiving observer",
      "Neighbor AS65002 handoff B → receiving observer",
      "Two candidates / IPv4-unicast 198.51.100.0/24",
      "BGP decision → separate system source → original forward and return context"
    ],
    "steps": [
      "Load same-as and record the two candidate attributes and usable declarations. Predict A from effective 100 versus 200 and explain the tied earlier dimensions.",
      "Load different-as, then always-compare. Explain the comparison gate change without claiming providers' metric scales are inherently comparable.",
      "Load equal-med, local-pref-boundary, path-boundary and origin-boundary. Leave the winner undetermined when this scope cannot resolve it.",
      "Load a-unresolved, b-rejected and none-usable. Distinguish sole candidate choice and no choice from a MED victory.",
      "Load missing-default, missing-worst, missing-max-tie and both-missing. Compare presence with effective value and verify that explicit maximum can tie absent-as-worst.",
      "Load system-other and return-missing. Explain which layer changes while the BGP comparison stays the same.",
      "Enter an invalid ASN or out-of-range MED, confirm outcome hiding, then reset. Use keyboard focus to inspect the locally scrollable table on a narrow screen.",
      "If separately prepared, run only the four read-only observer commands in the exact default-table context and write which real records support each candidate declaration. Record uncertain dimensions instead of filling them from the toy baseline."
    ],
    "verification": "For each authored state, write eligibility, earlier equality, neighboring-AS scope, effective MED, comparison status, candidate choice and separate installation/exchange declarations. The model test suite checks independent expected outcomes and strict invalid inputs. Actual browser rendering, live FRR parser acceptance, UPDATE propagation, forwarding and packet service require separately reported evidence; no actual lab claim is made by this lesson.",
    "troubleshooting": "Identify the first applicable scope or prerequisite boundary. A hidden result after invalid input protects against displaying stale conclusions; reset restores declared baseline. A real observer with additional earlier differences or nonordinary paths is outside the fixture.",
    "challenge": "A is an iBGP-distributed path originally learned through AS65002, while B is eBGP-learned through AS65002; both earlier dimensions tie and are usable. Why may their MED comparison still be scoped to the same neighbor? What additional real stages and installation/service evidence would be needed if their MED values tie?",
    "cleanup": "Reset only the local worksheet. The supplied commands change no router state and create no namespaces, daemons or routes. Close optional read-only sessions according to lab ownership; any separately authorized configuration experiment must restore its own exact baseline and original service evidence."
  },
  "glossary": {
    "MED": "Unsigned optional non-transitive MULTI_EXIT_DISC metric used at its applicable comparison stage.",
    "Neighboring AS": "The declared leftmost ASN of the nonempty ordinary AS_SEQUENCE in this fixture.",
    "Effective MED": "The comparison value after the selected target-specific absent-attribute interpretation.",
    "Always compare MED": "Explicit comparison across different neighboring AS declarations.",
    "Deterministic MED": "FRR local evaluation arrangement by neighboring AS; outside this two-candidate arithmetic model.",
    "Earlier-stage boundary": "A supplied earlier dimension differs; the MED-only worksheet stops without a winner.",
    "System installation": "Separate routing-source selection after a BGP choice, represented here by a declaration.",
    "Tabletop evidence": "Authored input and calculated outcome, not live routing or measured traffic."
  },
  "exams": [
    {
      "testedConcept": "Comparable lower MED",
      "question": "Two usable same-prefix candidates have tied earlier dimensions and the same ordinary neighboring AS. A MED is 100; B MED is 200. Which outcome does this contest provide?",
      "answer": "A is preferred at MED.",
      "explanation": "The comparison gates hold and A has the lower effective value.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "B because a larger number is preferred.",
        "A is preferred at MED.",
        "Both are rejected.",
        "A because it appears first in the table."
      ]
    },
    {
      "testedConcept": "Default comparison scope",
      "question": "Both candidates are usable and earlier dimensions tie, but their leftmost ordinary ASNs differ. Always-compare is off. What does the worksheet report?",
      "answer": "MED skipped; later stages are needed.",
      "explanation": "The default scoped comparison needs the same neighboring AS.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "The lower MED always wins.",
        "The shorter interface name wins.",
        "MED skipped; later stages are needed.",
        "Both candidates become unusable."
      ]
    },
    {
      "testedConcept": "Earlier-stage boundary",
      "question": "A and B have different supplied LOCAL_PREF values. Can this MED-only worksheet identify the final winner from their MED values?",
      "answer": "No; it reports an earlier-stage scope boundary.",
      "explanation": "It requires equality at supplied earlier dimensions and does not compute an earlier-stage winner.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Yes, the lower MED overrides LOCAL_PREF.",
        "No; it reports an earlier-stage scope boundary.",
        "Yes, B always wins.",
        "No, BGP ignores LOCAL_PREF."
      ]
    },
    {
      "testedConcept": "Eligibility before metric",
      "question": "A has MED 0 but its NEXT_HOP does not resolve. B is admitted, resolved and has MED 200. What is the fixture's outcome?",
      "answer": "B is sole usable; no MED contest occurs.",
      "explanation": "An unusable route is excluded before the comparison.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "A wins because zero is lowest.",
        "Neither can be used because metrics differ.",
        "B is sole usable; no MED contest occurs.",
        "A installs but B forwards."
      ]
    },
    {
      "testedConcept": "Ties",
      "question": "Comparable candidates have equal effective MED. Which answer is valid in this scope?",
      "answer": "The worksheet leaves later bestpath stages unresolved.",
      "explanation": "Equal MED supplies no arbitrary winner.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Candidate A wins by row order.",
        "The worksheet leaves later bestpath stages unresolved.",
        "Both original traffic directions are proven.",
        "Always-compare makes A win."
      ]
    },
    {
      "testedConcept": "Default absent attribute",
      "question": "In the pinned FRR 8.4.4 default mode, A has no MED attribute and B has explicit MED 50; all comparison gates hold. What effective value is used for A?",
      "answer": "0.",
      "explanation": "The pinned source returns zero for absent MED unless missing-as-worst is set.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "50.",
        "Infinity outside the integer range.",
        "0.",
        "It cannot have a usable route."
      ]
    },
    {
      "testedConcept": "Unsigned maximum edge case",
      "question": "In the pinned missing-as-worst mode, A's MED is absent and B's MED is explicitly 4294967295. All comparison gates hold. What happens at MED?",
      "answer": "The effective values tie.",
      "explanation": "FRR 8.4.4 maps absent-as-worst to UINT32_MAX, equal to this explicit maximum.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "B always wins because it is present.",
        "A always wins because it is absent.",
        "The effective values tie.",
        "The maximum numeric input is invalid."
      ]
    },
    {
      "testedConcept": "Different option meanings",
      "question": "Which statement correctly distinguishes the two documented options?",
      "answer": "Always-compare broadens comparison scope; deterministic-med arranges local evaluation by neighbor AS.",
      "explanation": "Deterministic local evaluation is distinct from comparing across different neighboring ASes.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Both options guarantee network convergence.",
        "Always-compare broadens comparison scope; deterministic-med arranges local evaluation by neighbor AS.",
        "Deterministic-med proves forwarding throughput.",
        "Always-compare makes all earlier attributes irrelevant."
      ]
    },
    {
      "testedConcept": "External influence boundary",
      "question": "An AS advertises a lower MED on its preferred handoff. What can it conclude without observing the receiving policy and traffic?",
      "answer": "It has expressed a preference, with no guaranteed inbound traffic result.",
      "explanation": "The receiving AS's admission and selection policy remain independent.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Every remote source must use that handoff.",
        "The metric measures the handoff's bandwidth.",
        "It has expressed a preference, with no guaranteed inbound traffic result.",
        "The received MED must be propagated unchanged to every adjacent AS."
      ]
    },
    {
      "testedConcept": "Selection versus service",
      "question": "The fixture chooses A, system-select is true and return-ready is false. Which conclusion is supported?",
      "answer": "A remains the BGP choice, while declared exchange prerequisites do not agree.",
      "explanation": "Return readiness does not rerank BGP, and the fixture has not sent traffic.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "B becomes the BGP winner.",
        "A remains the BGP choice, while declared exchange prerequisites do not agree.",
        "An actual packet capture proved loss.",
        "MED automatically repairs the return path."
      ]
    }
  ],
  "quick": [
    {
      "testedConcept": "Comparison gates",
      "question": "Name the prerequisites for this two-candidate MED-only comparison.",
      "answer": "Both candidates admitted and resolvable, supplied earlier dimensions equal, and same ordinary neighboring AS or explicit always-compare.",
      "explanation": "The fixture excludes additional earlier differences and specialized path forms.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Neighboring-AS identity",
      "question": "For a nonempty ordinary AS_SEQUENCE in this fixture, which ASN defines the MED neighbor group?",
      "answer": "Its declared leftmost ASN.",
      "explanation": "It is not automatically the local iBGP peer's AS.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Evidence limit",
      "question": "The tabletop chooses A and all installation/service declarations agree. Which actual traffic measurement did it perform?",
      "answer": "None.",
      "explanation": "It calculated supplied declarations; real route, forwarding and service evidence is separate.",
      "difficulty": "Advanced",
      "type": "short-answer"
    }
  ],
  "sources": [
    {
      "title": "RFC 4271 §§5.1.4 and 9.1.2.2: MED propagation and same-neighbor comparison",
      "url": "https://www.rfc-editor.org/rfc/rfc4271.html#section-5.1.4",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable 8.4 BGP: Route Selection and Multi-Exit Discriminator",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html#multi-exit-discriminator",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR 8.4.4 bgp_route.c: bgp_med_value and comparison implementation",
      "url": "https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_route.c",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR 8.4.4 bgp_vty.c: exact bestpath med missing-as-worst command",
      "url": "https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_vty.c",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR 8.4.4 bgp_attr.h: BGP_MED_MAX equals UINT32_MAX",
      "url": "https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_attr.h",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable 8.4 Zebra: system route show commands",
      "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 7300: last four-octet ASN 4294967295 is reserved",
      "url": "https://www.rfc-editor.org/rfc/rfc7300.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g4-t2",
  "batch": "09",
  "title": "AS Path",
  "subtitle": "Read ordinary AS sequences without mistaking policy length for physical distance.",
  "level": "Intermediate → Advanced",
  "minutes": 75,
  "interactive": "as-path",
  "definition": "AS_PATH records AS-level routing information carried with a BGP route. In an ordinary AS_SEQUENCE, entries are ordered ASN occurrences; repeated entries remain part of the sequence. An external advertisement normally adds the advertising AS, while ordinary internal propagation does not add an ASN for every internal router. This lesson compares two supplied nonempty ordinary AS_SEQUENCE candidates for the same IPv4 unicast prefix, 198.51.100.0/24. It checks ordinary local-AS loop exclusion and independently declared policy admission and NEXT_HOP resolution before a bounded length comparison. The worksheet is not a general AS_PATH decoder or full BGP implementation.",
  "purpose": "Use the path attribute to explain AS-level loop rejection, count sequence length and recognize deliberate prepending. Read it alongside earlier local preference and later selection criteria. A short path may be ineligible or less preferred by earlier policy; a chosen BGP route can also lose system source selection or lack the original forward and return prerequisites. The worksheet exposes these boundaries without claiming actual device convergence or traffic success.",
  "mental": "Treat each candidate as a destination card with an ordered row of ASN stamps. An ordinary local-AS stamp already on the card blocks acceptance in this scope. Count every stamp, including repeated stamps, only after admission and next-hop checks. If earlier policy is equal, fewer sequence stamps can decide this selection stage. The stamps are not a map of individual routers, a stopwatch or authenticated evidence of every network actually traversed. Installation and the reply journey require separate pages.",
  "components": [
    "Scope: both candidates cover exactly 198.51.100.0/24 in one declared IPv4 unicast table. No longest-prefix comparison occurs.",
    "AS_SEQUENCE: a nonempty ordered sequence of decimal ASN strings, with every occurrence counted. Prepending repeats increase length rather than creating distinct new AS identities.",
    "Ordinary loop guard: a candidate containing the local ASN is excluded before comparison. allowas-in, alternate local-AS behavior and confederation semantics are outside this worksheet.",
    "Eligibility: supplied policy admission and independently supplied NEXT_HOP resolution are required. A short rejected or unresolved route cannot defeat an eligible route.",
    "Earlier selection boundary: weight and local origination are held equal. Equal LOCAL_PREF is required for comparing two eligible sequences; unequal values produce an explicit boundary, not a fabricated length winner.",
    "Outcome layers: bounded BGP choice, system source selection, original forward declaration and independent original return declaration. Equal lengths leave later BGP stages unresolved."
  ],
  "mechanism": [
    "Fix speaker, local ASN, family, exact prefix, routing table and observation point. The worksheet supplies two candidates and does not reconstruct peer UPDATE history. Its default paths are A: 65002 65003 and B: 65004 65005 65003, with local AS 65001.",
    "Parse only ordinary nonempty sequences. Tokens and local ASN must be strings of decimal digits in 1 through 4294967294, excluding reserved 65535; 4294967295 is also reserved and outside the range. Surrounding spaces are trimmed and space-separated tokens are accepted, with a teaching cap of 64 tokens. Dotted ASN notation, braces, commas, exponent syntax, negatives and numeric coercion are rejected. This is syntax/range validation, not ASN assignment or authorization validation.",
    "Check whether either supplied sequence contains the ordinary local ASN. Exclude that candidate before selecting, even if its sequence is shortest. RFC4271 places ordinary AS-loop handling in route selection; acceptance exceptions require separate deliberate configuration and are not simulated here.",
    "Apply the supplied policy and NEXT_HOP resolution declarations independently. An eligible candidate must pass all three checks. If neither remains, there is no choice. If only one remains, identify it as the sole eligible candidate rather than crediting its length.",
    "For two eligible candidates, compare the declared LOCAL_PREF only to determine whether this lesson reaches the length stage. FRR8.4 documents weight, local preference and local route checks before AS path length. The worksheet holds weight and local origination equal. Unequal LOCAL_PREF stops this comparison and supplies no computed overall winner; the Local Preference lesson handles that policy stage.",
    "With equal earlier policy, prefer the shorter ordinary sequence at this stage. A repeated prepend such as 65002 65002 65002 65003 has length four. It does not have length two merely because it contains two distinct ASN values. Equal lengths leave later stages unresolved; the worksheet does not invent a router-ID tie-break, ECMP or a complete best path.",
    "Interpret four-byte ASNs as a single decimal token each. RFC6793 describes four-octet support, AS_TRANS 23456 and AS4_PATH transition information between old and new speakers. The worksheet accepts 23456 as a range-valid token without treating it as proof of a normal assigned AS, and never reconstructs legacy AS_PATH plus AS4_PATH. Real evidence must preserve encoding and capability context.",
    "Keep set and confederation semantics separate. RFC9774 deprecates AS_SET and AS_CONFED_SET; this lesson rejects set notation rather than extending an ordinary sequence count to it. It also excludes AS_CONFED_SEQUENCE and all confederation behavior. Do not generalize this teaching parser to every path segment in historical device output.",
    "Apply independent system selection only after a computed bounded BGP choice. Then inspect actual FIB/adjacency, forwarding and the original opposite direction separately. A shorter sequence does not measure latency, bandwidth, individual IP router hops or authenticated provenance. Browser declarations are not packets or a repair certificate.",
    "Preserve actual prefix attributes and owned peer/table context before considering a change. In a separately prepared isolated target, investigate one demonstrated failure and restore exact prior policy and attachments after verification. The guided commands here are read-only references and were not executed on a BGP target."
  ],
  "flow": [
    [
      "Fix prefix and ordinary sequence scope",
      "Record local ASN, family, table and supplied candidates."
    ],
    [
      "Exclude unusable candidates",
      "Check ordinary own-AS loop, policy admission and NEXT_HOP resolution."
    ],
    [
      "Reach the length stage deliberately",
      "Require equal earlier policy; count every sequence occurrence and leave ties unresolved."
    ],
    [
      "Verify installation and original exchange",
      "Inspect system source, actual forwarding and independent return evidence."
    ]
  ],
  "comparison": [
    [
      "Sequence length / distinct AS count",
      "Occurrences / unique identities",
      "Repeated prepends count repeatedly."
    ],
    [
      "AS-level path / IP router hops",
      "Control attribute / physical forwarding observations",
      "Internal routers are not individual sequence entries."
    ],
    [
      "Earlier policy / AS length",
      "Selection boundary / later comparison stage",
      "A shorter sequence does not override unequal LOCAL_PREF."
    ],
    [
      "Own-AS exclusion / shortest sequence",
      "Eligibility check / preference stage",
      "Looped candidates are removed first."
    ],
    [
      "BGP choice / system installation",
      "Protocol decision / cross-source decision",
      "A competing system source may displace the BGP candidate."
    ],
    [
      "AS_PATH / authenticated provenance",
      "Advertised path information / separately secured evidence",
      "The attribute alone is not cryptographic proof."
    ]
  ],
  "example": "With equal LOCAL_PREF and eligible defaults, A length two reaches the shorter-sequence choice against B length three. Choose Shortest A contains own ASN: A is excluded and B is the sole eligible candidate. Choose repeated prepends: A has four occurrences and B has three. Unequal LOCAL_PREF reports an earlier-policy boundary, and equal lengths report unresolved later stages. Finally remove system selection or return readiness while retaining the same path comparison to expose distinct outcome layers.",
  "ports": "AS_PATH is a BGP attribute exchanged over the BGP control connection, conventionally TCP179, not a new data-plane service port. The worksheet creates no TCP socket or live peer and supports only its fixed IPv4 unicast candidate scope.",
  "commands": [
    {
      "code": "show bgp ipv4 unicast json",
      "platform": "Prepared FRR8.4 speaker; guided not executed",
      "explanation": "Preserve exact prefix candidate attributes, next hops, validity and selected BGP indicators in the appropriate table.",
      "expected": "Read the 198.51.100.0/24 candidates and their paths; table output is not proof of complete unfiltered Adj-RIB-In history or packet forwarding."
    },
    {
      "code": "show bgp ipv4 unicast summary json\nshow bgp neighbors json",
      "platform": "Prepared FRR8.4 speaker; guided not executed",
      "explanation": "Establish observer, local/remote ASN, family and capability context before interpreting decimal or transition path information.",
      "expected": "Peer/control information supports scope; Established alone does not prove destination eligibility, installation or original service."
    },
    {
      "code": "show bgp as-path-access-list json\nshow running-config",
      "platform": "Prepared FRR8.4 speaker; guided not executed",
      "explanation": "Inspect actual path filtering, earlier policy and any configured exceptions before explaining a loop or length observation.",
      "expected": "Review relevant owned policy and preserve sensitive configuration securely. No prepend, clear, save, reload or policy mutation is executed."
    },
    {
      "code": "show ip route 198.51.100.0/24",
      "platform": "Prepared FRR8.4 system route context; guided not executed",
      "explanation": "Compare BGP path information with exact-prefix system route selection and competing sources in the actual family/table context.",
      "expected": "A system routing observation must be supplemented by actual FIB/adjacency and original forward/return service evidence; this command does not measure the exchange."
    }
  ],
  "configuration": "The controls are declarations only. Any optional isolated prepend exercise needs separately prepared FRR8.4 peers, reviewed prefix ownership, baseline policy and management access. Record exact route-map attachments and paths, review release-specific syntax, change one exclusively owned advertisement policy and preserve receiving-side earlier policy. Restore the precise original attachment and sequence behavior before deleting exclusive unused objects. This lesson performs no device configuration or router process execution.",
  "production": "Use prepend policy with a clear external traffic objective and independent observations at intended receivers. A remote AS can apply higher-priority policy and ignore the intended length influence. ASN range validity does not establish an allocation or business relationship. Validate path filtering, relevant capabilities, route visibility and selection before relying on the attribute, and measure the original traffic separately. Avoid changing path policy merely because a sequence looks long.",
  "troubleshooting": [
    [
      "Shortest route is not selected",
      "Check admission, ordinary own-AS exclusion, NEXT_HOP resolution and earlier policy before counting length."
    ],
    [
      "Prepending seems ineffective",
      "Read receiving-side earlier policy and actual observed path; repeating ASNs does not override LOCAL_PREF."
    ],
    [
      "Repeated ASNs counted once",
      "Count every ordinary AS_SEQUENCE occurrence; distinct identity counting answers a different question."
    ],
    [
      "Equal lengths show no winner",
      "Inspect later actual BGP criteria; the worksheet intentionally leaves them unresolved."
    ],
    [
      "Four-byte output looks inconsistent",
      "Preserve capabilities and AS_PATH/AS4_PATH context; do not flatten AS_TRANS into assumed real provenance."
    ],
    [
      "Selected BGP path does not carry service",
      "Compare actual system/FIB/adjacency plus original source/destination return and service evidence."
    ]
  ],
  "security": "AS_PATH alone is advertised information, not authenticated path provenance. Transport/session protections and route-origin validation answer separate questions and do not automatically authenticate every sequence occurrence. Treat filtering, reserved identifiers, ASN assignment, authorized prefix import and change ownership as distinct operational evidence. No authentication, RPKI or path validation protocol is simulated.",
  "performance": "Sequence length expresses an AS-level selection input, not delay, bandwidth, load or IP hop count. A path with more AS occurrences can be faster than a shorter one; repeated prepends are policy inflation rather than measured physical distance. The worksheet has no convergence timers, UPDATE workload, hardware programming, throughput or measured latency model.",
  "mistakes": [
    "Counting unique ASNs instead of occurrences.",
    "Selecting a shortest own-AS-looped or unresolved candidate.",
    "Treating shorter length as an override for earlier policy.",
    "Reading ASN strings as IP router hops or latency.",
    "Treating an AS_TRANS token as authenticated assigned-AS evidence.",
    "Applying sequence counting to rejected set/confederation syntax.",
    "Calling supplied forwarding declarations measured service."
  ],
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g3-t2",
    "s3-g3-t3",
    "s3-g4-t0"
  ],
  "related": [
    "s3-g4-t1",
    "s3-g4-t3"
  ],
  "lab": {
    "objective": "Separate ordinary AS-loop and eligibility checks from equal-policy sequence comparison, system installation and original exchange prerequisites.",
    "requirements": "Browser only. Guided real commands require a separately prepared owned FRR8.4 speaker and known family/table/peer context; none was executed for this lesson.",
    "topologyKind": "shared",
    "topology": [
      "Local AS 65001 receives candidate A and candidate B",
      "Both candidates: IPv4 unicast 198.51.100.0/24",
      "Independent supplied policy and NEXT_HOP resolution per candidate",
      "Bounded BGP choice → system selection → original forward and return declarations"
    ],
    "steps": [
      "Compare shorter A, shorter B and equal lengths with equal earlier policy.",
      "Compare one own-AS loop, both loops, policy rejection, missing resolution and no eligible candidates.",
      "Count every repeated ASN in the prepending scenario; compare four-byte decimal ASNs.",
      "Select unequal LOCAL_PREF and explain why the length stage supplies no winner.",
      "Displace the system route and remove only return readiness in separate scenarios.",
      "Enter malformed/reserved/out-of-range/over-cap tokens, observe hidden stale output, then reset using the keyboard.",
      "For an optional prepared target, collect the four read-only command groups in exact scope and separately inspect forwarding and return evidence. Preserve precise baseline before any separately authorized mutation."
    ],
    "verification": "Independent model tests check ordinary loop/eligibility combinations, occurrence lengths, strict inputs, transition-token scope and invalid/reset UI behavior. Separate integrated browser checks verify rendering and keyboard interaction. The guided commands are target observation procedures; no actual FRR, UPDATE or packet execution is claimed by this worksheet.",
    "troubleshooting": "An invalid scenario must keep output hidden through field changes until a valid scenario or reset is chosen. Diagnose exclusion, earlier-policy boundary and equal-length later-stage boundary independently.",
    "challenge": "Make A one token containing the local ASN and B three valid tokens. Explain why B survives without a shortest-path competition. Then remove the loop but make LOCAL_PREF unequal and explain why the worksheet cannot supply a length-stage winner.",
    "cleanup": "Reset restores the default declarations. The worksheet owns no daemons, namespace or device objects and changes no learner progress. Any separately authorized isolated policy experiment must restore exact original attachments, verify baseline paths and original service, then delete only exclusively owned unused resources."
  },
  "glossary": {
    "AS_SEQUENCE": "Ordered ASN occurrences in the scoped path segment.",
    "Prepending": "Adding ASN occurrences to an advertised path, often to influence later length selection.",
    "Own-AS loop": "The ordinary local ASN already appears in the received path.",
    "AS_TRANS": "Reserved transition identifier 23456 described by RFC6793; not assignment proof.",
    "AS4_PATH": "Transition attribute used with legacy four-octet interoperability; not reconstructed here.",
    "Eligibility": "Supplied policy admission, resolution and ordinary loop exclusion all pass."
  },
  "exams": [
    {
      "testedConcept": "Occurrence counting",
      "question": "What is the length of ordinary AS_SEQUENCE 65002 65002 65003?",
      "answer": "Three occurrences.",
      "explanation": "Repeated ASN entries each contribute to ordinary sequence length.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Two distinct ASNs.",
        "Three occurrences.",
        "One network hop.",
        "Unknown because repeats never count."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q01"
    },
    {
      "testedConcept": "Ordinary loop exclusion",
      "question": "Local AS is 65001. A has path 65001; B has path 65002 65003 65004. Both are admitted and resolved. What does this scope choose?",
      "answer": "B as the only eligible candidate.",
      "explanation": "A is excluded before length selection due to the ordinary own-AS check.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "A because one is shorter than three.",
        "Both because policy admits both.",
        "B as the only eligible candidate.",
        "Neither because long paths are invalid."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q02"
    },
    {
      "testedConcept": "Earlier policy boundary",
      "question": "Two eligible candidates have unequal LOCAL_PREF. What does this length worksheet report?",
      "answer": "An earlier-policy boundary with no computed length-stage winner.",
      "explanation": "Its bounded task does not compute the LOCAL_PREF winner or reach length comparison.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Always choose the shorter sequence.",
        "An earlier-policy boundary with no computed length-stage winner.",
        "Always choose the lowest ASN.",
        "An AS-loop error."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q03"
    },
    {
      "testedConcept": "Equal length boundary",
      "question": "Two eligible candidates have equal earlier policy and equal sequence lengths. What follows in this worksheet?",
      "answer": "Later selection stages remain unresolved.",
      "explanation": "The model has no full tie-breaking or ECMP computation.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Candidate A automatically wins.",
        "Both are guaranteed installed.",
        "The smallest ASN wins.",
        "Later selection stages remain unresolved."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q04"
    },
    {
      "testedConcept": "Resolution",
      "question": "Shorter A has unresolved NEXT_HOP; longer B is eligible. Which result is justified?",
      "answer": "B is the sole eligible candidate.",
      "explanation": "Length cannot make an unresolved candidate usable.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "A wins on length.",
        "B is the sole eligible candidate.",
        "A becomes resolved automatically.",
        "Both prove service success."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q05"
    },
    {
      "testedConcept": "Performance distinction",
      "question": "What does a shorter ordinary AS_SEQUENCE prove about latency?",
      "answer": "No measured latency result.",
      "explanation": "AS occurrences are a routing selection input, not delay measurements.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Guaranteed lower latency.",
        "Exactly that many IP router hops.",
        "No measured latency result.",
        "Guaranteed higher bandwidth."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q06"
    },
    {
      "testedConcept": "Four-byte notation",
      "question": "How many scoped sequence entries does decimal ASN 4200000001 contribute?",
      "answer": "One occurrence.",
      "explanation": "A four-byte decimal ASN is a single ASN token.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "Four occurrences.",
        "One occurrence.",
        "Zero because only two-byte ASNs exist.",
        "A number of entries equal to its digits."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q07"
    },
    {
      "testedConcept": "Transition scope",
      "question": "What does this worksheet do with AS4_PATH transition information?",
      "answer": "Source-describe it without reconstructing transition paths.",
      "explanation": "RFC6793 provides transition semantics; the model only reads supplied ordinary sequences.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Automatically reconstruct every legacy path.",
        "Treat AS_TRANS as authenticated provenance.",
        "Source-describe it without reconstructing transition paths.",
        "Reject every ASN above 65535."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q08"
    },
    {
      "testedConcept": "System selection",
      "question": "A computed BGP choice exists but systemSelected is false. What remains true?",
      "answer": "The bounded BGP choice can remain while system installation is false.",
      "explanation": "Protocol choice and cross-source system choice are separate layers.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "The bounded BGP choice can remain while system installation is false.",
        "AS_PATH must be empty.",
        "All peer sessions necessarily failed.",
        "Return readiness creates installation."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q09"
    },
    {
      "testedConcept": "Provenance",
      "question": "Does an AS_PATH string alone authenticate the actual traversed path?",
      "answer": "No; authentication and authorization need separate evidence.",
      "explanation": "The advertised attribute alone is not cryptographic path validation.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Yes, by counting length.",
        "Yes, whenever NEXT_HOP resolves.",
        "Yes, for four-byte ASNs only.",
        "No; authentication and authorization need separate evidence."
      ],
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-Q10"
    }
  ],
  "quick": [
    {
      "testedConcept": "Prepending",
      "question": "Does repeating the same ASN increase ordinary sequence length?",
      "answer": "Yes, every occurrence counts.",
      "explanation": "Distinct ASN count is a different measure.",
      "difficulty": "Beginner",
      "type": "short-answer",
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-QC1"
    },
    {
      "testedConcept": "Assignment scope",
      "question": "Does passing the decimal ASN parser prove an actual authorized ASN assignment?",
      "answer": "No.",
      "explanation": "Range and notation validation are separate from allocation and policy authorization.",
      "difficulty": "Intermediate",
      "type": "short-answer",
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-QC2"
    },
    {
      "testedConcept": "Return scope",
      "question": "Does a selected shorter BGP sequence create the original return path?",
      "answer": "No; return requires independent evidence.",
      "explanation": "Control-plane comparison does not verify the original exchange.",
      "difficulty": "Advanced",
      "type": "short-answer",
      "topicId": "s3-g4-t2",
      "questionId": "s3-g4-t2-QC3"
    }
  ],
  "sources": [
    {
      "title": "RFC4271 sections 5.1.2 and 9.1.2: AS_PATH, loop and resolution checks, sequence tie breaking",
      "url": "https://www.rfc-editor.org/rfc/rfc4271.html",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC6793: four-octet ASNs, AS_TRANS and AS4_PATH transition handling",
      "url": "https://www.rfc-editor.org/rfc/rfc6793.html",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC9774: deprecation of AS_SET and AS_CONFED_SET",
      "url": "https://www.rfc-editor.org/rfc/rfc9774.html",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC7300: reserved last two-octet and four-octet ASNs",
      "url": "https://datatracker.ietf.org/doc/html/rfc7300",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable8.4: selection order, AS path policy and read-only display commands",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    },
    {
      "title": "FRR stable8.4 Zebra: exact-prefix system route display",
      "url": "https://docs.frrouting.org/en/stable-8.4/zebra.html",
      "checked": "2026-10-09"
    }
  ]
},
{
  "id": "s3-g4-t3",
  "batch": "09",
  "title": "BGP Communities",
  "subtitle": "Read route tags as sets, apply a documented local contract, and inspect export boundaries separately.",
  "level": "Intermediate → Advanced",
  "minutes": 40,
  "definition": "BGP communities attach policy labels to routes. Standard communities are four-octet values, commonly written ASN:value with two unsigned 16-bit components. Large communities are twelve-octet values written GlobalAdmin:Local1:Local2 with three unsigned 32-bit components. Both attributes are optional transitive. Their sets express labels; an ordinary label receives its action from a documented operator policy.",
  "purpose": "Group routes for consistent import and export policy without assigning a universal meaning to an arbitrary number. Distinguish the local matching contract from standard well-known export restrictions, then inspect actual received and advertised attributes on the intended peer and address family.",
  "mental": "Think of a route carrying a set of labels. A local rule checks for one exact label and applies its documented action. A separate export check respects well-known boundaries and local permission. Reordering the same set changes no membership; losing a label can remove its matching action.",
  "components": [
    "The standard ASN:value notation uses two 16-bit components. An ASN greater than 65535 cannot be placed in the first component; large communities provide a 32-bit global-administrator field.",
    "A large tag contains three 32-bit components. Its global-administrator field normally provides administrative scope, but accepting a numeric value here does not validate ASN assignment or route ownership.",
    "This worksheet compares canonical decimal sets: leading zeros normalize, duplicates collapse and order has no meaning. It accepts at most 32 supplied entries across both families before deduplication; this is a teaching input limit, not a BGP protocol maximum.",
    "The illustrative local contract maps standard 65001:200 or large 4200000001:200:0 to declared LOCAL_PREF 200 instead of 100 only when that exact family policy is enabled and the route is admitted. These tags and values have no universal preference meaning.",
    "NO_EXPORT (65535:65281), NO_ADVERTISE (65535:65282) and NO_EXPORT_SUBCONFED (65535:65283) impose distinct standard-community export boundaries. The worksheet invents no large-community equivalents.",
    "Local export permission and the target session declaration remain separate gates. No supplied tag proves route eligibility, best-path selection, installation or delivery.",
    "Numeric width is separate from allocation guidance: RFC 1997 reserves standard values 0x00000000 through 0x0000FFFF and 0xFFFF0000 through 0xFFFFFFFF, with defined well-known values in the latter block. RFC 8092 discourages reserved ASNs 0, 65535 and 4294967295 as Global Administrator, while explicitly forbidding treating a large attribute as malformed solely for an unallocated or reserved administrator. The numeric-boundary preset decodes component widths and does not recommend or authorize production labels."
  ],
  "mechanism": [
    "Identify the exact route, peer, VRF and AFI/SAFI. Record standard and large sets independently, including any import stripping or rewriting.",
    "Validate each component against its family width and normalize valid decimal values. The model rejects malformed syntax, coercions and more than 32 supplied entries rather than silently dropping them.",
    "Select the documented local contract. Exact canonical membership changes the declared preference only if policy is enabled and admission is true; a neighboring value or the other tag family cannot match it.",
    "Evaluate the target boundary: NO_ADVERTISE blocks every other BGP speaker; NO_EXPORT blocks outside the confederation, including ordinary external peers of a standalone AS; NO_EXPORT_SUBCONFED blocks eBGP peers even inside the same confederation.",
    "Combine those restrictions with declared admission, export permission and target session readiness. The resulting worksheet permission describes supplied gates, not an observed advertisement or complete BGP export pipeline.",
    "Inspect real accepted and advertised route attributes separately on the prepared target. Preserve evidence before considering a target-specific policy change."
  ],
  "flow": [
    [
      "Read the sets",
      "Validate standard and large component widths, then canonicalize and deduplicate."
    ],
    [
      "Match the local contract",
      "Apply the declared preference action only for an enabled, admitted exact tag match."
    ],
    [
      "Check the export boundary",
      "Interpret the three standard well-known restrictions against the selected target."
    ],
    [
      "Inspect actual evidence",
      "Compare declared export/session gates with real peer and route observations; assess forwarding separately."
    ]
  ],
  "comparison": [
    [
      "Standard / large",
      "Two 16-bit components / three 32-bit components",
      "An ASN value above 65535 does not fit the standard first component."
    ],
    [
      "Ordinary label / well-known restriction",
      "Local operator contract / specified standard export boundary",
      "An arbitrary tag does not universally raise preference."
    ],
    [
      "Exact membership / set equality",
      "One tag is present / the whole set is equal",
      "This worksheet checks membership, not equality of all tags."
    ],
    [
      "NO_EXPORT / NO_EXPORT_SUBCONFED",
      "Outside-confederation restriction / all eBGP targets including confederation members",
      "Keep the confederation boundary explicit."
    ],
    [
      "NO_ADVERTISE / NO_EXPORT",
      "Every other BGP speaker / outside the confederation",
      "NO_ADVERTISE also prevents iBGP advertisement."
    ],
    [
      "Declared export permission / observed UPDATE",
      "Supplied gate result / actual target evidence",
      "The worksheet sends no BGP messages."
    ]
  ],
  "example": "An admitted route carries standard 65001:200, and this operator's enabled exact rule sets declared LOCAL_PREF to 200. Adding 65001:100 or reversing their order does not remove that match. Disabling the rule or stripping 65001:200 leaves the worksheet baseline 100. If the same route also carries NO_EXPORT, an iBGP target passes that restriction while an external target outside the confederation fails it. An independent export deny still blocks the iBGP declaration. No example decides whether the route wins best-path selection or forwards packets.",
  "commands": [
    {
      "code": "vtysh -c 'show bgp ipv4 unicast summary'",
      "explanation": "Inspect peer state and IPv4-unicast context on the named FRR instance.",
      "expected": "GUIDED, NOT EXECUTED: record actual peer state and AFI/SAFI. An established peer alone does not establish tag matching or export.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show bgp ipv4 unicast 198.51.100.0/24'",
      "explanation": "Inspect BGP paths and displayed standard/large communities for the exact demonstration prefix.",
      "expected": "GUIDED, NOT EXECUTED: record actual tags, path attributes and selection markers. Missing tags require investigation of receipt, propagation and policy; no output is invented.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show bgp ipv4 unicast neighbors PEER routes'",
      "explanation": "Inspect routes accepted from the observed inbound peer after policy; substitute its address for PEER.",
      "expected": "GUIDED, NOT EXECUTED: compare accepted tags with the documented local matching contract. Accepted routes do not expose all rejected pre-policy input.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    },
    {
      "code": "vtysh -c 'show bgp ipv4 unicast neighbors PEER advertised-routes'",
      "explanation": "Inspect routes advertised to the chosen target peer after outbound policy; substitute its observed address for PEER.",
      "expected": "GUIDED, NOT EXECUTED: record actual exact-prefix presence and attributes in the target context. This control-plane view does not prove remote installation or application delivery.",
      "platform": "FRRouting stable 8.4 · read-only guided command; not executed here"
    }
  ],
  "configuration": "For a prepared isolated FRR stable 8.4 target, document an inbound route-map using a standard community-list or large-community-list to match the owned tag and prefix, with an intended set local-preference action. Distinguish ordinary member matching from a list's exact-match semantics; the worksheet requires one exact numeric tag to be present, not equality of the whole set. Review rule order, permit/deny behavior, peer attachment, address family and any tag deletion or replacement. Inspect actual accepted tags and outbound policy. No device configuration or refresh is executed by this lesson; all four commands are show-only guidance.",
  "ports": "BGP commonly exchanges UPDATEs over TCP port 179. Community tags are path attributes, not ports. This local worksheet opens no connection.",
  "production": "Maintain an operator community dictionary naming each tag's owner, scope, permitted source and action. Validate the exact receiving peer and route context, enforce boundary filters for customer-controlled tags, and observe both inbound acceptance and intended outbound advertisement. Track where tags are preserved, rewritten or removed.",
  "troubleshooting": [
    [
      "Symptom",
      "A tagged route receives an unexpected local action or appears at an unintended export target."
    ],
    [
      "Hypotheses",
      "The tag is absent, malformed, in the wrong family, nonmatching, stripped, or associated with a disabled/unattached policy; export boundaries or independent permits differ from intent."
    ],
    [
      "Test",
      "Read exact-prefix attributes and accepted peer routes, then inspect advertised routes to the named target."
    ],
    [
      "Observation",
      "Record actual canonical tag values, local policy attachment, admission, target boundary and export evidence. Avoid assuming configuration proves the rule was exercised."
    ],
    [
      "Conclusion / next test",
      "Separate local matching from well-known restrictions and local export permission. Investigate the first layer whose actual evidence differs from the contract."
    ],
    [
      "Fix and verify",
      "Through target change control, adjust only the owned matching or filtering rule, then repeat inbound and outbound observations and an independent original traffic test."
    ]
  ],
  "security": "Communities supplied by an untrusted neighbor can request privileged routing actions. Restrict which peer and prefix may invoke each local contract, filter unauthorized labels, and protect documented export boundaries. Treat community dictionaries and route outputs as sensitive topology information. A syntactically valid tag proves neither authorization nor ASN ownership.",
  "performance": "Tags can influence a policy action that changes routing, but no tag number measures throughput or latency. Inspect resulting selection and actual traffic performance separately; this worksheet evaluates only supplied sets and declarations.",
  "mistakes": [
    "Giving standard 65001:200 or large 4200000001:200:0 a universal LOCAL_PREF meaning.",
    "Putting a four-byte ASN in the 16-bit standard first component.",
    "Treating community order or duplicates as additional policy weight.",
    "Confusing exact tag membership with whole-set exact matching.",
    "Treating NO_EXPORT as a ban on iBGP, or ignoring the stricter NO_EXPORT_SUBCONFED confederation behavior.",
    "Inventing large well-known communities by copying standard numeric values.",
    "Assuming a preserved tag proves route admission, full best path, export, installation or service.",
    "Describing the worksheet's 32-entry limit as a BGP protocol limit."
  ],
  "interactive": "communities",
  "lab": {
    "objective": "Evaluate canonical standard and large sets against one declared exact local contract, then distinguish well-known restrictions from independent export gates.",
    "requirements": "Browser-local tabletop exercise using supplied declarations only. Optional FRR stable 8.4 observations require a prepared authorized target and known peer, VRF and AFI/SAFI. Guided commands were not executed.",
    "topology": [
      "Supplied route → one local community set",
      "One selected standard or large local contract",
      "Target: iBGP, same-confederation eBGP or outside-confederation eBGP",
      "Independent admission, export permission and session declarations"
    ],
    "steps": [
      "Load exact-standard and exact-large. Record the exact selected tag, matching result and declared 100-to-200 contract action.",
      "Load disabled-policy, nonmatching-standard, nonmatching-large, wrong-family and not-admitted. Explain why tag presence alone cannot apply the contract.",
      "Compare duplicates with order-permuted. Record the same canonical standard set and unchanged matching result. Load numeric-boundaries; distinguish valid syntax from actual assigned/authorized values.",
      "Compare noexport-ibgp, noexport-confed and noexport-external. Identify the confederation boundary rather than assuming all external peers have the same scope.",
      "Load noadvertise, subconfed and subconfed-ibgp. Explain each stricter restriction in relation to the target. Then test export-denied and session-down independently.",
      "Load stripped and identify the removed exact trigger. Enter a malformed tag or out-of-range component and observe that the result hides until input is valid. Use keyboard reset to restore the baseline.",
      "On a prepared FRR 8.4 target only, run the four read-only guided commands in the confirmed context. Record actual accepted and advertised tags; label absent target evidence explicitly."
    ],
    "verification": "Report canonical sets, selected exact contract, match and application separately from target restriction and export/session declarations. Name the inputs behind each worksheet conclusion. Provide actual target output for any live-router claim; no eligibility, complete best path or traffic result is inferred here.",
    "troubleshooting": "If a local action is missing, check exact family, normalized membership, policy enablement and admission. If export is blocked, identify the applicable well-known restriction and each independent gate. If a guided command fails, preserve the exact error and target version without inventing output.",
    "challenge": "Can the same NO_EXPORT route pass a same-confederation eBGP declaration yet fail outside the confederation? What changes if NO_EXPORT_SUBCONFED is added? Why can a stripped ordinary trigger remove a local action without changing route ownership?",
    "cleanup": "Reset affects only local worksheet controls. No router policy, BGP session, route, packet exchange or learner progress is changed. Guided commands are read-only.",
    "topologyKind": "shared"
  },
  "quick": [
    {
      "testedConcept": "Local contract",
      "question": "Does standard 65001:200 universally set LOCAL_PREF to 200?",
      "answer": "No; an enabled documented local policy assigns the action.",
      "explanation": "The numeric label does not define a universal preference action.",
      "difficulty": "Beginner",
      "type": "short-answer"
    },
    {
      "testedConcept": "Component width",
      "question": "Can ASN 4200000001 fit in the first component of standard ASN:value notation?",
      "answer": "No; each standard component is unsigned 16-bit.",
      "explanation": "Large communities provide three unsigned 32-bit components.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    },
    {
      "testedConcept": "Export boundary",
      "question": "Which modeled well-known standard community blocks every other BGP speaker, including iBGP?",
      "answer": "NO_ADVERTISE (65535:65282).",
      "explanation": "NO_EXPORT instead names the outside-confederation boundary.",
      "difficulty": "Intermediate",
      "type": "short-answer"
    }
  ],
  "exams": [
    {
      "testedConcept": "Exact local contract",
      "question": "An admitted route has 65001:200 and the worksheet's standard contract is enabled. What does it declare?",
      "answer": "LOCAL_PREF 200 under this local contract",
      "explanation": "All three contract conditions hold: admission, enabled policy and exact canonical membership.",
      "difficulty": "Beginner",
      "type": "multiple-choice",
      "options": [
        "LOCAL_PREF 200 under this local contract",
        "A universal BGP preference of 200",
        "A guaranteed installed route",
        "An observed packet path"
      ]
    },
    {
      "testedConcept": "Disabled policy",
      "question": "The exact trigger is present but local policy is disabled. What preference does this worksheet declare?",
      "answer": "The baseline 100",
      "explanation": "An ordinary tag has no automatic local action when the declared contract is disabled.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "The baseline 100",
        "200 because the number is encoded in the tag",
        "Zero because the route is withdrawn",
        "A full best-path winner"
      ]
    },
    {
      "testedConcept": "Standard width",
      "question": "Which standard tag is outside this worksheet's valid 16-bit component range?",
      "answer": "4200000001:200",
      "explanation": "A standard first component cannot exceed 65535; a large global administrator has a different width.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "4200000001:200",
        "65001:200",
        "0:0",
        "65535:65535"
      ]
    },
    {
      "testedConcept": "Large width",
      "question": "What is the component range for a large community?",
      "answer": "0 through 4294967295 for each of three components",
      "explanation": "Each component is an unsigned 32-bit value; valid numeric syntax does not verify assignment.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "0 through 4294967295 for each of three components",
        "0 through 65535 for each of two components",
        "Any signed number",
        "Only assigned ASN values for all fields"
      ]
    },
    {
      "testedConcept": "Set semantics",
      "question": "How does repeating and reordering the same valid tags affect exact membership in this worksheet?",
      "answer": "It does not change membership after canonical deduplication",
      "explanation": "The worksheet treats the labels as a set rather than a sequence or score.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "It does not change membership after canonical deduplication",
        "It doubles the preference action",
        "The first label always wins",
        "Duplicates cause an automatic export"
      ]
    },
    {
      "testedConcept": "NO_EXPORT boundary",
      "question": "A route carries NO_EXPORT. Which modeled target is blocked by that restriction?",
      "answer": "eBGP outside the confederation",
      "explanation": "The restriction names the confederation boundary; a standalone AS is treated as its own boundary.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "eBGP outside the confederation",
        "Every iBGP target",
        "Only an unavailable session",
        "No target"
      ]
    },
    {
      "testedConcept": "NO_ADVERTISE",
      "question": "Which target can a route carrying NO_ADVERTISE pass under the modeled restriction?",
      "answer": "None of the three other-speaker targets",
      "explanation": "The restriction covers other BGP speakers, including iBGP.",
      "difficulty": "Intermediate",
      "type": "multiple-choice",
      "options": [
        "None of the three other-speaker targets",
        "Every iBGP target",
        "Every same-confederation eBGP target",
        "Only an outside-confederation target"
      ]
    },
    {
      "testedConcept": "Confederation restriction",
      "question": "NO_EXPORT_SUBCONFED is present and the target is eBGP inside the same confederation. What does the worksheet report?",
      "answer": "That well-known restriction blocks the target",
      "explanation": "It covers external peers including peers in other confederation member ASes.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "That well-known restriction blocks the target",
        "The confederation target bypasses every restriction",
        "The community becomes a large community",
        "A packet test succeeded"
      ]
    },
    {
      "testedConcept": "Independent export gate",
      "question": "The route is admitted, no modeled restriction applies and the session is declared ready, but exportPermit is false. What is the result?",
      "answer": "Declared export gates do not permit advertisement",
      "explanation": "An independent local export deny remains effective even when a tag restriction is absent.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "Declared export gates do not permit advertisement",
        "The tag automatically overrides the deny",
        "The router necessarily withdraws the route",
        "The preference becomes a throughput metric"
      ]
    },
    {
      "testedConcept": "Missing tag and evidence",
      "question": "The local triggering tag has been stripped. What can this worksheet conclude?",
      "answer": "The exact local action does not apply; live forwarding remains unmeasured",
      "explanation": "Missing membership removes this modeled action and establishes no installation or traffic outcome.",
      "difficulty": "Advanced",
      "type": "multiple-choice",
      "options": [
        "The exact local action does not apply; live forwarding remains unmeasured",
        "The route is necessarily rejected by every router",
        "All well-known restrictions disappear from every network",
        "The original application succeeded"
      ]
    }
  ],
  "glossary": {
    "Standard community": "Four-octet BGP label commonly written using two unsigned 16-bit components.",
    "Large community": "Twelve-octet BGP label with three unsigned 32-bit components.",
    "Exact membership": "Presence of one canonical tag in the selected family set, independent of other labels.",
    "Local contract": "An operator's documented mapping from a permitted exact label to a local policy action.",
    "Confederation boundary": "Boundary relevant to NO_EXPORT; distinct from a member AS's eBGP boundary.",
    "Declared export gates": "Supplied admission, permission, session and restriction inputs, without an observed UPDATE."
  },
  "prerequisites": [
    "s3-g3-t0",
    "s3-g3-t1",
    "s3-g3-t2",
    "s3-g3-t3",
    "s3-g4-t0"
  ],
  "related": [
    "s3-g4-t1",
    "s3-g4-t2"
  ],
  "sources": [
    {
      "title": "RFC 1997: standard community attribute and well-known export boundaries",
      "url": "https://www.rfc-editor.org/rfc/rfc1997",
      "checked": "2026-10-09"
    },
    {
      "title": "RFC 8092: large community structure and canonical set semantics",
      "url": "https://www.rfc-editor.org/rfc/rfc8092",
      "checked": "2026-10-09"
    },
    {
      "title": "FRRouting stable 8.4: community policy and BGP show commands",
      "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
      "checked": "2026-10-09"
    }
  ]
}
];
for(const l of lessons){l.exams.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-Q${String(i+1).padStart(2,'0')}`}));l.quick.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-QC${i+1}`}));}
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['09']=lessons;
})();
