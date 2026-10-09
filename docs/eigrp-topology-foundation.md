# EIGRP topology integrated draft — 2026-10-09

Original `s3-g2-t3` is a full draft lesson with twelve mechanism steps, a four-step diagram, eight comparison rows, seven scoped command blocks, ten original exams and three quick checks. The course has 107 authored lessons and 95 accepted original nodes. Twelve routing drafts are reviewed; eight original topics and thirteen full twenty-topic Batch 09 gates remain pending. Next authoring is original BGP fundamentals (`s3-g3-t0`). No GapCode is used.

Open the [integrated lesson](../learn.html#lesson=s3-g2-t3) or [standalone inspector](eigrp-topology-explorer.html). Both load from HTTP or directly from disk. The inspector compares remote LAN, local LAN and shared transit prefixes at two observers in four preserved phases: 24 combinations. Selection does not run commands or alter routing.

The local topology table is protocol working destination/path information, separate from a global physical map, OSPF link-state database and selected system RIB. Current total/RD, historical least-known FD and a literal FD-labelled CLI field are distinct. With supplied FD100, RD90 passes strict sufficiency; RD100 fails equality despite a lower total. This frozen comparison does not execute coordinated DUAL or prove a failed candidate physically loops.

## Retained evidence and discrepancy

The inspector reuses the exact source-hashed [actual single-transit report](eigrp-routing-lab-results.json) through the [neighbor fixture](../content/eigrp-neighbor-evidence.js). It preserves each raw topology path line, candidate object and independent kernel entry. It checks a remote path against a same-address/interface peer, selected and installed RIB flags with an active/FIB next hop, and the matching kernel gateway. Missing flags are not interpreted as true. Direct kernel entry presence is displayed separately from EIGRP selection and original traffic.

Baseline/recovered remote paths show current total30720/RD28160 and agreement among recorded peer, selected RIB and kernel. In the owned transit-down phase, topology can still display `P`, a successor and the distance pair while peer/selected remote routing/kernel support is absent and both original endpoint probes fail. Some fault/intermediate via tokens differ from intended transit peers. Those strings are kept literally, without endorsing them as valid peers or diagnosing a software root cause. Duplicate Connected/transit display lines are also preserved without claiming distinct physical paths, installed ECMP or doubled throughput. Connected lines retain no total/RD pair; the inspector does not invent one from the header.

The intermediate link-restored phase contains no retained endpoint probe. Passing recovery explicitly restores the owned link and restarts both identity-checked owned eigrpd children with unchanged configurations. Keep the [rejected trials](eigrp-runtime-rejected-trials.json) separate; the result does not prove automatic link-only convergence. The actual runner verifies twelve categories and five interrupted cleanup boundaries. It does not execute complete historical FD/DUAL, alternate successor, ACTIVE/query/SIA, custom timer/passive settings, authentication, IPv6, Cisco, application, hardware or elapsed convergence experiments.

## Verification

The [independent model checks](eigrp-topology-results.json) reconstruct all 24 source blocks and corroboration predicates, preserving duplicates, unsigned literal boundaries, absent metric pairs and missing probes. The [browser checks](browser-eigrp-topology-results.json) cover eight categories including all combinations, exact downloads, context invalidation, inert text rendering, four widths/both themes, named keyboard scrolling, mechanism/reduced motion, question feedback, separate learner/editorial progress and HTTP/direct-file use. Eleven screenshots were individually inspected; [reviewed hashes](eigrp-topology-manual-screenshot-hashes.json) identify the exact images.

The [39-command regression](batch-09-regression-results.json) and [checkpoint](eigrp-topology-checkpoint-results.json) are the final verification records. [Primary topic review](review-batch-09.json), [120 exams/36 quick checks](exam-review-batch-09.json) and [108 exact command blocks](commands-results-batch-09.json) retain the full-batch acceptance boundary. Commands comprise 85 guided/unexecuted vendor blocks, fourteen references to actual isolated Linux experiments and nine shared private-preparation references. References are not fourteen distinct EIGRP executions or nine new installations.

## Primary sources

- [RFC 7868](https://www.rfc-editor.org/rfc/rfc7868): per-destination computation, historical FD and strict sufficient feasibility.
- [Catalyst 9300 IOS XE 17.15 command reference](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/command_reference/b_1715_9300_cr/unicast_routing_commands.html): topology all-links/detail/active/prefix filtering and fields.
- [Cisco EIGRP introduction](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/13669-1.html): destination/path and computation concepts.
- [Cisco EIGRP troubleshooting](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/118974-technote-eigrp-00.html): reliable/query/ACTIVE context.
- [Exact FRR 8.4.4 topology CLI entry points](https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_vty.c) and [FSM implementation](https://raw.githubusercontent.com/FRRouting/frr/frr-8.4.4/eigrpd/eigrp_fsm.c): pinned implementation context; not proof of a specific display-defect root cause.
- [FRR stable 8.4 EIGRP context](https://docs.frrouting.org/en/stable-8.4/eigrpd.html): supported daemon/configuration context.
- [Cisco destination CEF command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch/command/isw-cr-book/isw-s1.html): destination forwarding inspection, separate from actual hardware or original application closure.

All eight lesson source links were checked on 2026-10-09. Vendor inspection remains guided and unexecuted; no new tuning, broad reset or production mutation is supplied.
