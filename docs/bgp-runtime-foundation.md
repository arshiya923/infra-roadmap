# BGP fundamentals runtime foundation — 2026-10-09

This foundation supports upcoming original `s3-g3-t0`, BGP fundamentals. It does not mark the original outline authored or complete. The course remains at 107 authored lessons, twelve routing drafts and 95 accepted nodes. Eight original topics and thirteen full twenty-topic Batch 09 gates remain pending. Full teaching, procedures, mechanism diagram, ten original exams, three quick checks, integrated reader tests and primary review are still required before accepting even a scoped BGP lesson checkpoint. No GapCode is used.

Open the [standalone evidence inspector](bgp-explorer.html), [original outline](../learn.html#lesson=s3-g3-t0) or [actual companion](../labs/bgp-routing.sh). Browser selection only reads preserved records; it never executes a router or alters configuration.

## Actual experiment

The existing privately extracted FRR 8.4.4 runtime includes `bgpd`, `zebra` and `vtysh`. The runner creates four owned network namespaces and private mount views for each daemon/CLI invocation requiring group access; it changes forwarding only inside owned routers. It creates no global daemon service/account/configuration. The shared [private preparation](../labs/prepare-frr-runtime.sh) remains unchanged. A unique runtime path and tracked process identities bound normal/error cleanup; stopped children receive bounded TERM/KILL/reap before owned paths are removed.

Client192.0.2.10 connects through R1 LAN192.0.2.1, AS65001/RID1.1.1.1. A single transit203.0.113.0/30 connects R1.1 to R2.2. R2 LAN198.51.100.1, AS65002/RID2.2.2.2 reaches server198.51.100.20. These documentation prefixes and private ASNs belong only to the owned experiment. Both speakers explicitly require eBGP policy and activate IPv4 unicast. Exact-prefix import accepts only the peer LAN, and export permits only the owned LAN. Originating `network` entries correspond to direct installed LAN prefixes with import-check explicitly enabled in the input. Traditional defaults may be omitted from the retained running display; do not infer absence of policy from omitted default commands. Neighbor AF records independently retain inbound/outbound route-map admission.

Baseline: both observers show Established, one received remote LAN prefix, a one-AS path and a peer next hop. The remote BGP path is valid/best, selected/installed eBGP RIB distance20 has an active/FIB transit next hop, and the independent kernel has the matching BGP gateway. Local BGP origins show an empty path, literal `0.0.0.0` next-hop sentinel and ORIGIN `IGP`; that sentinel is not a usable wire gateway, and the ORIGIN value does not prove learning from OSPF/EIGRP. Direct LAN kernel routes remain separate. Both original endpoint ICMP round trips pass.

Fault: remove only R2's owned `network 198.51.100.0/24`. Both links and both observed Established sessions remain up; established/drop counters retain their baseline values. R1 loses that destination from its BGP table, selected RIB and kernel, while R2 keeps the opposite remote prefix. Both original endpoint round trips fail and local gateways pass. This shows that a usable route in one direction and a live control session do not establish a complete original transaction. There is no endpoint-arrival packet trace proving the precise location of every failed packet.

Recovery: restore only the exact R2 network statement. Baseline running configurations return exactly, remote installation and both original probes recover, and no daemon restart or session clear is used. The experiment tests this known origin withdrawal; it does not infer an unknown live incident cause or measure elapsed convergence/zero loss.

The [actual verification](bgp-routing-lab-results.json) retains eleven categories and five interrupted cleanup boundaries: after namespaces, after the first router, during capture, with a stopped owned daemon and while the origin is withdrawn. Independent host links/routes/forwarding sysctls, group/mount fingerprints, daemon inventory, existing namespaces and temporary resources remain unchanged.

## Evidence inspector

The [builder](../tools/build-bgp-evidence.py) accepts only the passing actual report and stores its exact SHA-256 with six observer/checkpoint views. The [model](../scripts/bgp.js) compares remote/local prefixes in twelve combinations. It preserves literal attributes and separates BGP candidate flags, selected RIB, kernel and phase-specific original probes. It validates fixed observer/AS/peer/prefix identities, returns fresh copies and renders dynamic values as text. Invalid context hides stale output; reset restores fault R1/remote without learner-progress or router changes.

[Independent checks](bgp-evidence-results.json) compare exact raw records and separately computed predicates. [Browser checks](browser-bgp-results.json) cover all combinations, feedback/context invalidation, inert text, exact downloads, four widths/both themes, keyboard-scrolling tables/raw records and HTTP/direct-file loading. This standalone foundation has no original full lesson mechanism/assessment yet.

Startup capture is separate from all three selected phases. Five fields retain source/destination, TCP source/destination ports and decoded comma-separated BGP message types. OPEN1, UPDATE2 and KEEPALIVE4 appear in both directions with one TCP endpoint179. A captured frame may contain multiple BGP PDUs; a type list is not one message per packet. Some type5 records may appear, but no specific refresh cause is diagnosed. There are no retained attributes/NLRI, timestamps, complete TCP/FSM history or wire bodies proving the later origin withdrawal. Attribute claims use actual router records rather than invented packet bodies.

No full best-path contest, iBGP/RR/confederation, IPv6/EVPN, RPKI/authentication, Cisco execution, application transaction, hardware forwarding or convergence benchmark is performed. These belong in later source-described teaching and separate supported experiments.

## Primary sources checked 2026-10-09

- [RFC4271](https://www.rfc-editor.org/rfc/rfc4271): BGP reachability, attributes, conceptual RIB stages, TCP and session messages.
- [RFC8212](https://datatracker.ietf.org/doc/html/rfc8212): explicit eBGP import/export policy; session establishment is not route admission.
- [RFC6793](https://www.rfc-editor.org/rfc/rfc6793.html): four-octet ASN support, distinct from this two-byte private-AS experiment.
- [RFC4760](https://www.rfc-editor.org/rfc/rfc4760.html): AFI/SAFI capability context; only IPv4 unicast is exercised here.
- [RFC7454](https://www.rfc-editor.org/rfc/rfc7454.html): operational admission/filtering and protection design; no universal hardening certification.
- [FRR stable8.4 BGP reference](https://docs.frrouting.org/en/stable-8.4/bgp.html): explicit policy requirement, network import-check and scoped JSON inspection.
- [Catalyst9300 IOS XE17.15 BGP configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_bgp.html): supported vendor configuration/inspection context; source-described and unexecuted here.

The guide's legacy two-byte ASN range is not promoted to a universal modern ASN limitation. A later full lesson must preserve current four-octet capability context and actual platform support rather than copy every legacy example unchanged.

- [RFC2918](https://www.rfc-editor.org/rfc/rfc2918.html): route-refresh message/capability context; retained type5 fields do not establish the cause of any particular refresh.


## BGP fundamentals integrated draft — 2026-10-09

BGP fundamentals now has complete original teaching, a four-step mechanism, the six-view/twelve-prefix actual-evidence inspector, scoped procedures and thirteen original assessments. Session, admission, attributes, selected RIB, kernel and original return-service remain separate; no full best-path, Cisco/application/hardware or convergence execution is claimed. Forty-four fresh sequential regression commands pass across all 108 authored lessons. Six BGP screenshots and all thirteen questions were inspected by the primary assistant.

Totals: 108 authored lessons, 1,080 exams, 324 quick checks and 95 accepted nodes. Thirteen Batch 09 drafts are reviewed; seven original topics and the full twenty-topic batch gates remain pending. Next authoring: eBGP (`s3-g3-t1`). The separate eBGP declaration worksheet has ten scenarios and 512 independently checked masks; its full lesson remains pending. No GapCode was used, following the current user instruction. See [BGP lesson checkpoint](bgp-lesson-checkpoint-results.json) and [browser evidence](browser-bgp-lesson-results.json).
