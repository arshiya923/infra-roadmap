# Batch 09 research - Static Routing, 2026-10-09

## DR/BDR draft lesson — sixth topic, 2026-10-09

Original `DATA.stages[3].groups[1].topics[2]` is the string “OSPF DR / BDR”; its original order and following LSA/troubleshooting nodes remain intact. The new draft integrates the settled-history explorer with separate actual staged broadcast evidence. Priority versus metric, RID versus interface address, local neighbor slash labels, Full versus normal two-DROther 2-Way, current-DR network-LSA identity/membership and direct data-plane next hops were reviewed. The 2n−3 Full-pair expression assumes distinct DR/BDR and settled compatible adjacencies; it is a relationship count, not a benchmark.

The actual experiment supplies staged history and attachment-reset rejoining evidence, not a simultaneous startup/tie experiment. The browser no-incumbent case assumes its entire initial participant set is available before settled calculation. Rejected passive-return observations remain separate because they retained an old conflicting declaration. A lone DR without a Full neighbor has no current network-LSA template. Old previous-DR entries can remain during change; templates do not predict retention/flushing.

Eight linked primary sources were checked on 2026-10-09: RFC 2328, FRR stable 8.4, Catalyst 9300 IOS XE 17.15 configuration, Cisco neighbor troubleshooting, IOS activation/cost/dead reference, IOS priority/network/process/RID reference, IOS operational-show reference and IOS XE default-passive guidance. Command review checked exact interface priority/network/Hello/dead no-forms, cost removal and process-scoped activation removal without an area ID. Baseline-absent exclusive processes 129/229/329/429 avoid changing a live RID or requiring a broad restart. Prepared routed attachments, addressing, loopbacks, routing support and independent management remain explicit prerequisites; cleanup preserves them.

Fourteen new command references retain twelve guided/unexecuted Cisco classifications, one shared actual preparation reference and one actual four-router FRR runner. The three preparation references across lessons share one privately extracted runtime, not three distinct environments. All ten exams and three quick checks were reviewed, including applied role history, network identity, six-participant adjacency arithmetic, forwarding evidence and fault-scope diagnosis. Totals are 101 authored lessons/1,010 exams/303 quick checks; six drafts are reviewed and 95 original nodes accepted. LSA basics is next; fourteen Batch 09 nodes and all full-batch gates remain pending.

## DR/BDR settled explorer groundwork — 2026-10-09

The [working preview](ospf-dr-bdr-explorer.html) supplies bounded event histories independently of curriculum authoring. Source review checked RFC 2328 [election §9.4](https://www.rfc-editor.org/rfc/rfc2328#section-9.4), [adjacency §10.4](https://www.rfc-editor.org/rfc/rfc2328#section-10.4) and [network-LSA §12.4.2](https://www.rfc-editor.org/rfc/rfc2328#section-12.4.2) on 2026-10-09. The model applies a consistent settled-segment shortcut; its independent oracle instead uses per-router declarations and local repeat/consensus. It does not implement every protocol event or conflicting declaration. See [contract, assumptions and evidence](ospf-dr-bdr-explorer-foundation.md).

The no-incumbent case assumes all supplied participants are available before initial election, not an arbitrary boot/discovery race. Departed attachments reset their old declaration before returning. That scope excludes the retained failed passive-return experiment. Network-LSA output requires a DR with at least one Full neighbor and remains a template; old-LSA retention is outside the model. Readiness declarations do not change roles or measure forwarding. The lesson remains pending, with no new curriculum question or acceptance counts.

The original first routing-policy node is Static Routing (s3-g0-t0), a generic/heuristic brief in the original audit. Its foundation prerequisite s1-g4-t2 remains intact. The advanced node separates configured intent, exact-prefix route installation and installed-prefix lookup before independent return evidence. Floating Static Routes remains the next original node.

Primary sources checked for this draft:

- [Catalyst 9300 17.15 static configuration, ordinary next-hop/interface dependencies and forwarding context](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/protocol_independent_features.html) - checked 2026-10-09.

- [Cisco AD: same-prefix installation versus longest-prefix forwarding; compare actual platform defaults](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html) - checked 2026-10-09.

- [Cisco next-hop/interface static-route design and multiaccess caveats](https://www.cisco.com/c/en/us/support/docs/dial-access/floating-static-route/118263-technote-nexthop-00.html) - checked 2026-10-09.

- [IOS XE basic routing: interface plus next-hop static syntax and monitoring](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_iri-iprouting.html) - checked 2026-10-09.

- [Catalyst 9300 17.15 IPv6 static routes and link-local next-hop interface scope](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ipv6_unicast_routing.html) - checked 2026-10-09.

The generic IOS XE static section explicitly supports interface plus next-hop syntax. Catalyst 9300 17.15 supplies target/version context, but target parser/feature support is not executed. The IPv6 guide requires an interface for link-local next-hop scope. Multiaccess design distinguishes an interface-only remote route from a reviewed interface-plus-next-hop route; next-hop-only routes are not universally invalid.

Administrative distance is installation preference for the exact same prefix; forwarding among different installed prefixes uses longest match. The Catalyst guide contains a conflicting unknown-distance entry and historical protocol examples. The lesson does not reproduce those as a universal table: 0/1/110 are the supported teaching defaults and static 200 is explicitly authored. Local static intent and actual route propagation are distinguished.

Model design review replaced a literal directly connected primary next hop plus independently unresolved flag with symbolic N1. Its resolver is outside the six-candidate fixture and explicitly declared, so it does not contradict the still-available connected LAN. Other explicit next hops use that declared LAN. No recursive-chain, adjacency, ARP, FIB, VRF, protocol learning or return simulation is claimed.

The new actual Linux runner has client/R1/R2/server in four owned namespaces and explicit forward/return IPv4 routes. Actual JSON and bounded probes verify baseline, rejected supplied unresolved gateway, /32 blackhole despite /24, exact discard removal, missing R2 return route while local gateway/R1 lookup remain available, exact repair and cleanup. Normal and injected exit after namespace creation preserve existing host links/routes/forwarding/namespaces. The unchanged dual-stack companion was re-executed; its IPv4 return fault leaves IPv6 working. Actual iproute2 6.1.0 and WSL kernel versions are retained in docs/static-routing-lab-results.json. This evidence does not establish Cisco configuration acceptance, arrival capture or application performance.

Ten exams and three quick checks were reviewed against these scopes. Eight command blocks retain six guided/unexecuted Cisco classifications and two actual Linux classifications. Full twenty-topic Batch 09 acceptance remains pending.


## Floating Static Routes - second topic

Original s3-g0-t1 is the next generic/heuristic brief. The worksheet fixes one exact /24 and separates candidate availability, preference, downstream usability, optional static tracking and return/original-service readiness. A 2,048-case independent oracle covers all seven boolean declarations, both primary sources and eight boundary distances. Ten cases include silent remote failure, supplied static track-down, wrong baseline preference, equal-AD scope and AD 255 exclusion. OSPF availability is not gated by the static track declaration.

Sources checked for this second topic:

- [Cisco same-prefix preference and floating route context](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html) - checked 2026-10-09.

- [Cisco floating route recursion failure and multiaccess next-hop design](https://www.cisco.com/c/en/us/support/docs/dial-access/floating-static-route/118263-technote-nexthop-00.html) - checked 2026-10-09.

- [IOS XE interface/next-hop/distance static syntax and operational dependencies](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_iri-iprouting.html) - checked 2026-10-09.

- [Cisco supported IP SLA/static tracking context and WAN policy considerations](https://www.cisco.com/c/en/us/support/docs/ip/ip-routing/200785-ISP-Failover-with-default-routes-using-I.html) - checked 2026-10-09.

- [Catalyst 9300 IOS XE 17.15 IP SLA operation monitoring and statistics](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/nmgmt/b_1715_nmgmt_9300_cg/configuring_service_level_agreements.html) - checked 2026-10-09.

- [Catalyst 9300 IOS XE 17.15 enhanced object tracking, state delay and static client](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/ip/b_1715_ip_9300_cg/configuring_enhanced___object_tracking.html) - checked 2026-10-09.

The next-hop technote supplies the alternate-recursion caveat and excluded distance, not a prediction that every primary link-down removes a next-hop-only route. The tracking guide supports a static-route client gate and delayed state communication; its malformed scheduling example and unrelated VTP monitoring description are not copied. IP SLA statistics inspection is independently checked against the 17.15 monitoring guide. No arbitrary timers, real probes or state transitions are fabricated.

The optional target exercise uses two prepared routers, two parallel transits, separate forward/return route pairs and an exact manual R1 primary-route removal/restore. That removal is intentionally not a physical fault or configured detector test; return can stay on the still-available primary transit. Target policy/asymmetry and original-service observations remain required. Eight new vendor blocks are unexecuted; no Linux metric experiment is mislabeled as Cisco AD/IP SLA evidence.

Manual render review confirms legible four-step mechanism, parallel P/B topology and equivalent table in both themes and narrow local scroll. The original linear lab strip was changed to explicit primary OR backup wording. Full course prompt comparison has no identical exam prompts among 970. Eighteen original Batch 09 nodes remain; next authoring is Policy-Based Routing, not Batch 10.


## Policy-Based Routing - third topic

Original s3-g0-t2 is a generic/heuristic brief. Three ordered sequences and four fixed IPv4 packet fixtures teach consumer-specific classification versus policy action. Sequence 10 ACL explicit deny skips a match; matching map deny 20 terminates policy and returns to ordinary routing; disabling 20 in the worksheet lets exception .99 reach permit 30. Selection does not rewrite the ordinary RIB or prove service.

Sources checked:

- [Catalyst 9300 IOS XE 17.15 PBR behavior, attachment, target restrictions and inspection](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/protocol_independent_features.html) - checked 2026-10-09.

- [Catalyst 9300 17.15 route-map consumer semantics and scoped deletion](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html) - checked 2026-10-09.

- [Catalyst 9300 17.15 named extended IPv4 ACL syntax and first-match classification](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/sec/b_1715_sec_9300_cg/configuring_ipv4_acls.html) - checked 2026-10-09.

- [IOS XE command reference: ingress policy attachment and no-form detachment](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-a1.html) - checked 2026-10-09.

- [Catalyst 9300 17.15 ACL inspection and named-list removal syntax](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/security_commands.html) - checked 2026-10-09.

The Catalyst 9300 17.15 documented scope specifies adjacent next hops, fragmented traffic following normal routing, unavailable recursive/verify-availability actions and feature coexistence restrictions. Those are explicitly target-specific, not generic router claims. The general IOS guide contains different features, local-traffic treatment and malformed examples; it is not copied into this switch design. Local policy is absent in the fixture, and local/control destinations are excluded from its packet set. No ACL/route-map semantics from redistribution are imported into PBR.

Command review correlated extended ACL host/wildcard syntax, map sequence/deny behavior and object cleanup with primary references. IPv4 no-form ingress detachment is no ip policy route-map, without a map-name suffix in the referenced syntax; the initial draft was corrected. Detachment remains authorized only after confirming the known owned ingress attachment. Whole-map/ACL deletion is only for newly created unreferenced owned names after detachment.

2,048 independent packet/origin/boolean combinations and eleven cases cover ordered outcomes. Successor ACL and decision cells are marked not evaluated after terminal action or bypass. All assumed policy next hops are prepared and adjacent; remote/return failure is independent of selection. Unavailable-next-hop fallback, packet emission, counters, hardware programming and health detection are not simulated. Eight actual browser checks include all independent gates, timed mechanism play/pause/reset, four widths, both themes, normal/zoomed steps, reduced-motion/static explanation, keyboard trace scroll, quiz and direct-file route. Eight screenshots were reviewed. Seven additional vendor blocks remain unexecuted. Seventeen Batch 09 nodes remain; next authoring is OSPF (s3-g1-t0).

## Historical OSPF runtime groundwork — before lesson authoring

Inspected the original OSPF node and the separate following Areas, DR/BDR, LSA basics and troubleshooting nodes. Core OSPF authoring will distinguish neighbor/adjacency, area database, SPF, selected installed routes and actual forwarding. OSPFv2 carries IP protocol 89, rather than a TCP/UDP port. Point-to-point Full adjacency in the prepared lab does not make every broadcast 2-Way relationship a failure. Router identity is distinct from a local process number. Passive LAN advertisement is distinct from sending Hellos or forming adjacency on that LAN.

The local environment initially had no FRR installation. Pinned Ubuntu 24.04 packages provide FRR 8.4.4 and libyang 2.1.30 without system installation. Actual private-cache binaries, help and operational JSON were inspected. FRR requires zebra for interface information and its compiled VTY group; private mount namespaces supply only the owned group-file view. Private per-router vtysh configuration avoids absent host PAM configuration. The primary FRR source confirms that failed vtysh PAM authentication can exit zero, so actual JSON and protocol/route evidence are required rather than exit status alone.

[Runtime preparation, tested isolation, packet evidence and primary references](ospf-runtime-foundation.md) describe the reproducible experiment. Ten actual checks cover Full adjacency, two area-0 router LSAs, selected installed FRR routes, Linux OSPF routes, bidirectional ICMP, actual Hello headers from both peers, passive-transit withdrawal with carrier up, exact recovery and independent normal/early-failure cleanup. No synthetic vendor output or convergence-time benchmark is used. The fresh Batch 09 suite includes thirteen commands, with actual output retained separately. This groundwork does not increment authored questions, topic review or editorial acceptance; seventeen original Batch 09 nodes still need authoring.


## OSPF authored draft - 2026-10-09

The original OSPF node now has a full lesson; Areas, DR/BDR, LSA basics and troubleshooting remain separate following topics. Seven checked primary sources in the lesson support RFC protocol operation, FRR 8.4 interface/passive/cost/inspection, target-specific Catalyst 17.15 behavior, generic Cisco activation/cost/network/process/router-ID no-forms, passive-default exceptions and neighbor/MTU troubleshooting. Network selector commands are not represented as arbitrary-prefix advertisements. Router IDs are unique; local process numbers can differ; peer costs need not match. Full expectation is point-to-point scoped, with broadcast DROther 2-Way explicitly distinguished.

An actual interface-JSON review was added to corroborate observed cost ten on transit and LAN, area 0, passive LAN with no neighbors, point-to-point transit and 1/4-second lab timers. Default timing/cost/throughput are not generalized from these observations. The three-router browser solver uses supplied directed edges and an independent direct/via enumerator oracle. It produces candidates and both directional paths, not packets, adjacency transitions or convergence traces. Equal-cost mathematical paths do not promise installed hardware ECMP. Prefix, forward RIB, forward data-plane and reverse/original-service declarations remain separate.

Primary command review corrected cleanup syntax: checked no ip ospf process-id area omits area ID, no ip ospf cost includes the authored value ten, and no ip ospf network returns to default. Those removals are safe only for previously absent exclusive lab settings, with other network-statement activation excluded and exact baseline restoration required. The guided processes 109/209 demonstrate local identifiers without reusing domain router identity. None is executed on Cisco.

All thirteen question/answer/explanation entries and distractors were reviewed. Ten screenshots were inspected; settled exact table/graph scroll endpoints were recaptured after keyboard animation. Fifteen actual regression commands pass, including twelve actual FRR/preparation/isolation checks and all 99 authored routes. Review records remain four-topic drafts, not full Batch 09 acceptance. Next authoring: OSPF Areas (s3-g1-t1).

## OSPF Areas runtime groundwork - 2026-10-09

The actual three-router lab retains separate area-0 and area-1 topology databases at the ABR. Internal routers retain their own area router LSAs and receive ABR-originated type-3 opposite-LAN reachability preserving /24 prefixes. No aggregation is configured. Protocol route JSON identifies inter-area endpoint cost 30 and intra-area ABR cost 20; installed FRR RIB and independent Linux gateways are corroborated separately. Linux kernel route priority is not treated as OSPF cost.

[RFC 2328](https://www.rfc-editor.org/rfc/rfc2328) supplies the area/backbone/inter-area framework. [FRR stable 8.4 documentation](https://docs.frrouting.org/en/stable-8.4/ospfd.html), checked again on 2026-10-09, documents default alternative ABR behavior. The lab explicitly configures Standard RFC2328 mode rather than assuming the default. [FRR 8.4.4 source](https://github.com/FRRouting/frr/blob/frr-8.4.4/ospfd/ospf_vty.c), checked on the same date, confirms that replacing an interface area requires removing its previous setting first. The first attempted direct replacement was rejected; the final actual runner uses the checked remove/add sequence and its exact reversal.

Only R3's branch is changed to area 2 while the ABR branch remains area 1. Backbone adjacency and branch carrier remain; opposite-LAN routes and remote exchange fail and recover after restoration. This does not test backbone partition, aggregation, stub/NSSA/external behavior or Cisco implementation. Normal cleanup and three partial-start failures preserve independently captured host state. [Runtime procedure and limits](ospf-areas-runtime-foundation.md) and [actual JSON evidence](ospf-areas-lab-results.json) retain the details. Areas lesson content, visualization, questions and vendor branch are still pending; authored and accepted counts remain unchanged.

## OSPF Areas authored draft - 2026-10-09

Original DATA.stages[3].groups[1].topics[1] is the string OSPF Areas; it now has the full draft without changing its identity/order or subsequent DR/BDR, LSA and troubleshooting nodes. Eight primary sources are retained in the lesson. Actual FRR evidence anchors the normal two-area experiment; the browser independently calculates supplied chain reachability and displays baseline structural area scopes. Missing chain edges do not predict retained LSAs or ABR summary origination. Type-3 unchanged /24 summaries are distinct from optional range aggregation.

RFC2328 section 16.2 confirms intra-area path preference for the same prefix. Sections 3.3 and 3.6 distinguish overlapping router roles and stub default reachability; the latter is a type-3 summary, despite misleading external-default wording in the Catalyst guide. RFC3101 supplies NSSA local type-7 import/translation context. Vendor no-summary extensions are labeled explicitly. No lab behavior for stub/NSSA/aggregation/virtual links is invented. The Cisco guide also contains malformed range/NSSA examples, which were not copied; the guided branch creates normal-area attachments only.

Primary command review checked area activation and its no-form (without area ID after process area), cost removal with the added value, point-to-point network removal, exclusive local process/router-ID and passive-default active exceptions. The three mapped Cisco routers use processes 119/219/319 and remain unexecuted. Existing addresses, roles, host routes, global forwarding and authentication are prerequisites rather than changes silently performed by the lesson. Cleanup reconciles exact baseline and excludes other network-statement activation.

All thirteen new question/answer/explanation entries and plausible MC distractors were reviewed. Twelve screenshots were inspected after focused browser execution. Model evidence covers 3,072 independent graph vectors and eleven cases; browser evidence covers nine checks including four widths, themes, keyboard local scrolling, mechanisms, quiz, downloads and direct-file loading. Eighteen regression commands and the full 100-route audit pass, with exact results retained. Five drafts are reviewed; totals are 100 authored/95 accepted and fifteen Batch 09 nodes remain. Next authoring: DR/BDR (s3-g1-t2).

## DR/BDR broadcast runtime groundwork - 2026-10-09

The original next node s3-g1-t2 remains unauthored. Actual FRR 8.4.4 on an owned four-router broadcast segment now supplies evidence for its future lesson. [RFC2328 sections 7.3–7.5 and 9.4](https://www.rfc-editor.org/rfc/rfc2328), checked 2026-10-09, distinguish election history, current declarations, eligible priorities, adjacency roles and interface-state reset. [FRR stable 8.4 documentation](https://docs.frrouting.org/en/stable-8.4/ospfd.html), checked on the same date, supports the authored interface broadcast/priority/timer and operational inspection commands. No simultaneous cold-start or tie-break experiment is inferred from the staged arrivals.

Staged R1 priority 100 establishes DR; R2 priority 50 establishes BDR. R3 priority zero forms Full with both while remaining ineligible. Late R4 priority 200 becomes a DROther and leaves both incumbents in place. The two DROthers are actually 2-Way with each other while Full with the DR/BDR. Current type-2 LSAs use the DR's interface IP as identity, its router ID as advertiser and the expected attached-router IDs. No immediate old-LSA disappearance is asserted.

The first readiness attempt exposed Full adjacency before a new peer prefix reached the installed table. Actual probe and network-LSA membership gates were added separately. A passive-interface fault successfully allowed R2 promotion, but its return-role assertion failed: FRR retained R1's old DR declaration and R1 returned as DR. [Exploratory passive records](ospf-dr-bdr-passive-trial.json) remain explicitly rejected as a clean rejoining fixture. The final main fault uses only the owned R1 link down/up transition, resetting interface election state. Existing BDR R2 promotes, R4 becomes BDR and restored R1 rejoins as DROther. This is a controlled virtual attachment failure, not physical hardware or timing evidence.

Actual peer-loopback RIB/kernel/lookup next hops and bidirectional ICMP Ethernet headers show direct R3/R4 forwarding while both are DROthers; DR/BDR are not mandatory data-path relays. A bounded capture includes Hellos from all four peers to 224.0.0.5, IP protocol 89 and elected DR/BDR interface-address fields. An initial capture check exposed that a startup message alone did not supply the required probe packets. Bounded repeated probes now require actual decoded echo request/reply evidence. TShark field names were checked against the installed field inventory rather than guessed.

Twelve independent actual checks cover interface/role/matrix/network-LSA/route/packet/fault/return and cleanup. Normal plus four partial-start/capture failures preserve host route/link/forwarding/group/mount/process/namespace/runtime state, including pre-existing TShark/dumpcap processes. [Runtime procedure](ospf-dr-bdr-runtime-foundation.md) and [main JSON evidence](ospf-dr-bdr-lab-results.json) retain version and scope. DR/BDR teaching content, visualization, ten exams, three quick checks and guided vendor branch still need authoring; lesson/question/accepted counts do not advance from this groundwork.

## OSPF LSA basics source review - 2026-10-09

Primary review checked RFC2328 sections 12–14, Appendix A header/packet formats and Appendix B ordinary constants; RFC3101 NSSA scope and selected translation; Cisco OSPF database command syntax; and FRR 8.4 inspection context. Exact URLs are retained in the lesson and [LSA foundation](ospf-lsa-foundation.md). Signed sequence and reserved/max boundaries, checksum excluding age, MaxAge priority after sequence/checksum and strictly greater-than-900 age comparison match normative rules. Body-mask/overlapping-ID interpretation and process/area scope remain explicit. Seven raw-header views reuse separate passing experiments with source hashes; types 4/5/7 are not actual lab claims.

## OSPF troubleshooting primary review - 2026-10-09

Reviewed RFC2328 §10.5 Hello mask acceptance exceptions, §10.6 advertised DBD MTU rejection, and state/adjacency/database-calculation boundaries. Cisco neighbor and ExStart/Exchange references support bidirectional Hello interpretation, expected broadcast 2-Way and bounded MTU investigation; they do not make each state a unique diagnosis. Cisco OSPF operational reference supports interface/database/neighbor detail; protocol-independent `show ip route ip-address` and switching `show ip cef network` references support destination inspection. FRR stable 8.4 and Linux ip-sysctl semantics are kept within actual runtime scope. All ten primary links and checked dates are retained in the lesson sources and command review. No Cisco command or additional exchange/authentication fault execution is asserted.

Exact question/answer/explanation/distractor review retains ten exams and three quick checks; no identical prompts among the 1,030 authored course exams. Actual forwarding and endpoint-return faults, area mismatch and healthy broadcast 2-Way are corroborated independently by source hashes and copied raw fields. Failed request/reply does not establish server arrival. Forwarding-flag reversal does not prove universal custom-sysctl restoration. Full state and installed paths do not certify application, hardware, zero-loss or convergence behavior.

## EIGRP groundwork research - 2026-10-09

RFC7868 is an informational independent submission, not an Internet Standard; it defines distance-vector/DUAL behavior, historical least-known FD, neighbor-reported distance and strict sufficient feasibility. Cisco Catalyst 9300 IOS XE 17.15 remains the version-scoped vendor teaching reference; no Cisco execution or general multi-vendor parity is claimed. FRR stable8.4 documentation and exact8.4.4 CLI sources were checked against actual installed behavior. Interface timers/metric/passive requests were absent from effective retained evidence; that trial is rejected. Link-only recovery also failed a bounded trial; passing recovery explicitly restores the link then restarts both owned eigrpd children with unchanged configuration. Preserve these limitations rather than silently converting them into normal protocol behavior. Primary links and actual procedures are retained in docs/eigrp-runtime-foundation.md.

Model review: reported distance must be strictly below supplied historical FD, not current candidate total; failed equality does not prove a loop. Existing feasible choice and immediate local selection stop before full diffusing computation. Ties and readiness are declarations, not installed ECMP or service tests. Actual single-path lab supports peer/route/traffic/packet/isolation evidence only; it does not validate alternate-successor/variance/active/query/SIA cases. Full EIGRP lesson, ten exams and three quick checks remain next.

## Full EIGRP draft review — 2026-10-09

Original `s3-g2-t0` had no named brief; its generic group context was preserved while a complete lesson was authored. Rechecked RFC 7868, Catalyst 9300 IOS XE 17.15 EIGRP guide/IP command reference, Cisco destination CEF reference and exact FRR 8.4.4 CLI sources. Configuration examples use documented classic router/network wildcard/no-router syntax only in a prepared new owned absent-AS branch. Named instance labels are local; address-family AS compatibility is separate. A wildcard selects the local interface rather than imposing an advertised host prefix. Unlike OSPF, equal Hello/hold values are not a peering requirement; supported compatibility and effective acceptance still matter. Primary documentation defaults do not overrule actual rejected timer/passive/metric attempts in the pinned lab.

Reviewed thirteen question keys individually and all eight exact commands against source/runtime boundaries. The draft retains informational RFC status, distance-vector/DUAL, historical FD and strict sufficient comparison, route ACTIVE/PASSIVE versus interface passive, ACK-bearing opcode-5 distinction, protocol information versus installed lookup and original service proof. Actual single-transit IPv4 peer/route/packet/ICMP evidence and explicit combined link/daemon recovery remain separate from authored alternatives. No certification alignment, Cisco execution, authentication/IPv6/metric/SIA experiment, application, hardware or convergence guarantee is inferred.

## Next original topic: EIGRP metrics research preparation — 2026-10-09

EIGRP metrics (s3-g2-t1) remains unauthored. Rechecked [RFC 7868 section 5.6](https://www.rfc-editor.org/rfc/rfc7868#section-5.6) and [Catalyst 9300 IOS XE 17.15 metric-weights reference](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html). The next lesson should explicitly bound a default-classic calculation: inverse minimum configured bandwidth in kbps, truncation before scaling, outgoing delay sum in tens of microseconds and 256 scaling. Do not sum bandwidth or use measured RTT/goodput as the configured inputs. MTU is carried information rather than a composite term. K5 zero requires its documented special branch, rather than multiplying the default metric by zero. Named/wide units, precision and RIB scaling need their own context; do not feed wide values into the classic arithmetic.

Existing actual R1 remote topology shows current total 30720 and neighbor RD 28160 with displayed bandwidth 100000/delay 10. These are retained observations, not proof that requested metric commands took effect. A future arithmetic comparison can reconcile recorded defaults without claiming a metric-mutation experiment; effective configuration/operational records must establish any new actual intervention. No new lesson, question or acceptance count is promoted by this research preparation.

Next-topic implementation caution: inspected [exact FRR 8.4.4 metric source](https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_metric.c). Its bandwidth helper multiplies by 256 before division, while the cited RFC classic conversion note truncates the inverse bandwidth before scaling; these differ at nondivisible inputs. Its total-metric bandwidth vector selection and nondefault K4/K5 branches also require implementation-specific scrutiny. Therefore a source-defined calculator must state its arithmetic convention and cannot claim pinned FRR parity across arbitrary paths/K values from the current uniform-link experiment. The actual 100000-kbps/delay-10 records reconcile to connected 28160 and remote 30720 under default classic arithmetic; this independently checked equality is arithmetic reconciliation only, with no new metric configuration executed.


## EIGRP metrics primary review — 2026-10-09

The eight checked references and explicit limitations are recorded in [metrics foundation](eigrp-metrics-foundation.md). RFC 7868 describes default coefficient terms, the K5-zero exception, minimum outgoing bandwidth, cumulative outgoing delay and truncate-before-scaling conversion. Exact FRR 8.4.4 helper code instead scales before division; complete vector aggregation/nondefault/saturation behavior is not reproduced. Independent reference arithmetic verifies the 175-point difference for 1544 kbps and 2000 ten-microsecond units.

Cisco's interface reference makes delay a tens-of-microseconds metadata argument; no delay returns a platform default, not necessarily a prior explicit value. Target support must be checked before optional guided changes. The wide feature guide's below-1-Gbps conversion yields the declared 7864320 example, and a declared factor 128 yields 61440. The RIB-scale reference documents route clearing/replacement. Generic feature-guide coefficient ranges differ from the 17.15 release reference; only fixed defaults are computed here, with no copied universal range. Historical FD and current total/RD remain distinct. Existing actual uniform-default observations establish reconciliation only, not metric mutation or arbitrary implementation parity.


## EIGRP neighbors primary review — 2026-10-09

Eight checked sources are recorded in [neighbor foundation](eigrp-neighbors-foundation.md). RFC discovery/advertised hold/reliable initialization context is cross-checked with the release command field reference, Cisco troubleshooting and passive-interface behavior. Default timer-equality assumptions from OSPF are excluded. Source-described retry/MTU/static/IPv6/authentication/graceful-restart context stays separate from execution. No broad debug, new routing protocol or multicast-ping diagnostic proof is supplied.

Exact FRR 8.4.4 neighbor/display source and retained raw observations preserve actual units/presentation without turning zero SRTT/tiny RTO into universal defaults or physical latency. Interface timer display discrepancies and rejected requested settings stay explicit. Seven startup fields show Hello/UPDATE/ACK context, including UPDATE/ACK overlap, but omit INIT flags/TLVs/timestamps/completeness. Four phases remain separate, with no endpoint probe borrowed into the intermediate link-restored phase. Actual combined repair and independent host cleanup remain the evidence boundary.

## EIGRP topology — 2026-10-09

Original node `s3-g2-t3` integrates eight checked primary sources listed in [topology foundation](eigrp-topology-foundation.md). RFC history/strict sufficiency, Cisco command filtering/query context and pinned FRR entry-point/FSM code are separated from actual retained display. The actual fault can retain a successor-labelled topology line despite absent peer/selected remote RIB/kernel and failed original probes; raw via anomalies and duplicate Connected lines remain literal without software-cause or physical-path inference. Independent 24-combination parsing and eight browser categories preserve those limits. Next original topic is BGP fundamentals.

## BGP fundamentals foundation — 2026-10-09

Eight checked primary references are listed in [runtime foundation](bgp-runtime-foundation.md): RFC4271/8212/6793/4760/7454/2918, FRR8.4 and Catalyst9300 IOS XE17.15. Preserve RFC8212 explicit route admission separately from an established TCP/BGP relationship. The vendor guide's legacy ASN range is not a universal modern four-octet limitation. Actual path/origin/next-hop records are separate from incomplete startup message-type fields; no complete selection contest or fault packet body is invented. Full original lesson authoring/review remains pending.
