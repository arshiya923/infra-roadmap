# Roadmap Decisions

## ADR 01 — Preserve the static application

The starting project contains only index.html, inline CSS/JavaScript and embedded DATA. There is no package manifest, build system, external asset dependency or Git repository. Keep the existing roadmap and learner progress storage key. Add a static lesson reader and shared CSS/JavaScript, with per-batch content loaded on demand. This preserves direct-file use and simple HTTP hosting. A framework would introduce a build/deployment requirement without a demonstrated benefit.

## ADR 02 — Stable identities and honest status

original/index.html is a byte-for-byte baseline with a SHA-256 in content/roadmap-inventory.json. Preserve IDs s0-g0-t0 etc.; never regenerate them from changed ordering. Duplicate occurrences retain their own IDs. Future canonical lessons can serve multiple occurrences, but each occurrence needs explicit review. Group IDs are navigation summaries. There are 442 progress-bearing original nodes plus 69 group nodes, not 511 lessons. Static educational collections are separately inventoried.

Editorial completion lives in content/enrichment.json. Learner completion remains in infra-path.progress.v1. A learner checking a box never certifies authored content. Pending nodes remain useful original outlines and are labelled accordingly. Additions use ADD-domain-number IDs and never inflate original coverage.

## ADR 03 — Reusable lesson contract

Each substantial lesson has id, title, definition, purpose, mental model with limits, mechanisms, components, flow steps, practical example, commands with explanations/expected observations, production decisions, troubleshooting chain, security, performance, mistakes, prerequisites, related/next IDs, 3 quick checks, a lab, 10 structured exam questions, glossary and sources. Rendering escapes all authored text. HTML is built by components rather than inserted from content.

Sources have title, URL and checked date. Use primary manuals/standards and vendor documentation; distinguish confirmed faults from hypotheses. Commands target Ubuntu 24.04/Linux unless stated; hardware and virtual guest observations differ. Hardware concepts have no intrinsic TCP/UDP port: do not invent one. Version-specific configuration must include validation and rollback.

Question fields: questionId, topicId, difficulty, type, question, options, answer, explanation, testedConcept. Original questions test published skills; never describe them as leaked or actual exam questions. Short answers use self-assessment with model answers; automatic scoring is only for multiple-choice questions. Exam mode hides feedback until submission; learning mode exposes explanations.

Lab fields: objective, requirements, topology, steps, verification, troubleshooting, challenge, cleanup. No destructive host-device operations in introductory lessons. Advanced configuration belongs in disposable VMs or explicit simulations.

## ADR 04 — Visual language and accessibility

Use labelled HTML/CSS component flows and SVG where topology needs edges. Cyan means the active step, not successful health. Every dynamic flow has previous/next/play/pause/reset and a static ordered explanation. Motion is opt-in and respects reduced motion. Native buttons, details, labels, fieldsets and visible focus provide keyboard access. Diagrams scroll/zoom rather than becoming illegible. Avoid adding Mermaid until a lesson actually requires it.

## ADR 05 — Curriculum order

Batch 01 covers the original Computer Hardware cluster (seven lessons). It develops evidence gathering before risky configuration. RAID and server architecture are foundational treatments; later original occurrences deepen implementation. CPU → RAM → storage → PCIe → NIC → RAID → server architecture is reader order, with only necessary links as prerequisites.

The audit records missing foundational service concepts, Linux depth, application delivery, container operations and cloud architecture as added batches. These should be moved earlier if they become prerequisites; moving batch order must not change IDs. Existing stage gates are preserved in the old roadmap for compatibility but are not authoritative lesson prerequisites.

## Verification and continuity

Run python tools/inventory.py only against the preserved source. Run python tools/progress.py to regenerate human-readable progress from the reviewed manifest. Run content validation and browser tests before marking a batch completed. Inspect desktop, tablet and phone; exercise navigation, search, quiz feedback, steppers, copy, themes, progress and broken routes. Record evidence and limitations in docs/validation.md.

User steering on 2026-10-03: do not use GapCode. The initial extraction worker was interrupted before it changed project files. All subsequent work is performed directly.

# Next Work

Read ROADMAP_ENRICHMENT_PROGRESS.md for current batch and first unfinished node. No subsequent batch may start until the current batch passes its Definition of Done.

## ADR 06 — Batch-independent reader and search (2026-10-04)

The reader now obtains batch title, lesson number and availability from the generated catalog. Previous/next navigation follows authored original-node order across batches, then points explicitly to the next pending outline. Original roadmap dialogs use a neutral fieldbook link instead of hardcoded readiness rules.

tools/read-content.cjs evaluates only trusted locally authored bundle files in an isolated VM context for build-time serialization; it never executes learner text. tools/catalog.py discovers those bundles, rejects duplicate/unknown IDs, and builds a lowercase word index including commands, assessments and glossary terms. Search requires all whitespace-separated query terms to match within a lesson; it is word/substring search, not exact-phrase search. This allows searching unopened lessons without eagerly downloading their complete content. Revisit index partitioning if the catalog grows enough to affect initial loading.

Each lesson may provide its own ports note. Batch 02 labels PowerShell, Windows Server and Bash commands individually. Source check dates render from source metadata, not a hardcoded date. The reader remains compatible with direct-file use.

## ADR 07 — Permission explorer model boundary (2026-10-04)

The Linux explorer selects exactly one ordinary permission class: owner, matching group or other. It does not combine them or fall back to other when owner rights are insufficient. For directories, the create-entry operation requires both write and search in the model. The UI states that parent paths, ACLs, capabilities, root behavior, sticky/set-ID bits, security modules and mount restrictions are excluded. The result is labelled “by this model,” never a claim of complete effective access.

Batch 02's server lab supports a clearly labelled tabletop path because no Windows Server VM is available. No domain promotion, DHCP service, production ACL change or service shutdown is performed. Windows client observations and Bash examples have separate recorded execution evidence.

## ADR 08 — Networking model scope and evidence (2026-10-04)

Batch 03 preserves the eleven original Networking Basics IDs. Its prerequisites stop at NIC and CLI knowledge; upcoming subnetting/routing lessons are related depth, not hidden requirements. Brief address/prefix examples are explicitly scoped and use documentation ranges.

scripts/network-models.js contains pure functions plus native-control renderers, loaded before the reader with no external dependency. The packet journey is manual, so it requires no motion or timer cleanup; the existing lesson mechanism steppers still provide Play/Pause. It shows fixed ordinary IPv4 forwarding with a single router, no NAT/tunnels, four steps and a static equivalent. MAC addresses and IPv4 TTL/checksum description change at routing, while IP endpoints and TCP ports stay fixed. The diagram is horizontally scrollable by keyboard on small screens; the table also expresses changes in text.

The link calculator accepts explicit bounded inputs for ICMP Echo data, minimum IPv4/IPv6 headers, total extra tunnel overhead, underlay IP MTU, rate, independent RTT, one-way propagation and queue delay. It exposes packet fit, maximum data, one IP-unit serialization, a limited one-way subtotal and BDP. It does not present arithmetic as measured PMTU or simulated TCP performance. No Ethernet wire-time overhead is included. Invalid inputs hide stale results, and IPv6 effective budgets below 1280 produce a caution. Tests use independent vectors, boundary checks and input rejection rather than only checking the renderer’s own formulas.

Physical VLAN, RF, cable, tunnel and duplex failures are synthetic classroom records. Exact read-only commands are tested in Windows/WSL where possible; virtual-interface evidence and optional unsupported commands retain their limitations. Do not claim physical fault recovery, external PMTU or RF performance from these checks. No live configuration or external traffic-generator test is part of this batch.

The pending-route regression fixture advances to Binary (s0-g3-t0); the Batch 02 successor now correctly opens the authored LAN lesson. The next planned broader audit remains after Batch 04.

## ADR 09 — Address models and executable foundation lab (2026-10-04)

Batch 04 adds eight addressing topics and the original foundation stage lab. scripts/address-tools.js exposes pure octet, IPv4 subnet, IPv6 normalization and conventional VLSM models, with native-control renderers. IPv4 uses bounded arithmetic rather than signed bit shifts. /31 and /32 results are separately labelled; mathematical capacity never implies ownership or provider-specific assignability. IPv6 normalization supports pure hextet syntax only; the UI explicitly explains excluded valid contexts. VLSM allocates an empty aligned parent largest-first, retains original request identity and rejects infeasible requests without a partial accepted plan.

Lesson artifact links are optional trusted local files, rendered with download links and validated by the content check. lab-0 links labs/foundation-lan.sh. The runner creates two PC namespaces, one software-switch namespace and one gateway namespace, all with uniquely named owned resources. No host uplink, existing interface, host route, firewall, DNS or NAT is changed. Baseline, prefix-fault, recovery and cleanup are independently verified; an in-memory early-exit test checks cleanup after failure. This virtual variant preserves the original build/assign/gateway/port-map objectives while explicitly distinguishing untested physical hardware.

The Batch 04 broader audit covers all 31 authored routes, prerequisite cycles/availability, ten distinct exam prompts per lesson, named controls, DOM/anchor structure, core text contrast and lazy loading. Local search/asset sizes are recorded without claiming remote or mobile-device performance certification. Screenshots include small-width IPv6 wrapping. Future audits should continue technical/source review beyond automated contract checks.

The current pending-route regression fixture is s1-g0-t0 (OSI Model). Tests for earlier batches must verify their now-authored successors rather than preserve stale pending assumptions. Historical validation records retain their acceptance-time counts; the current manifest and progress file remain authoritative.

## ADR 10 — Protocol models and visible draft checkpoints (2026-10-04)

Batch 05 is authored in bounded groups without promoting the entire batch early. The first two lessons retain draft labels in the catalog and reader. The progress generator derives draft availability from actual bundles, independently of accepted IDs. The manifest records the next authoring node separately from the first unaccepted node.

The layer explorer uses native select and button controls, manual selection, text evidence and explicit scope limitations. OSI-to-Internet grouping is conceptual, not a claim that every protocol has a fixed one-layer implementation. Selecting a different model resets the selection; no timers or external dependencies are introduced.

Pending-route coverage moves to s1-g1-t0 (Ethernet); Batch 03/04 successor checks now assert a draft OSI lesson. Historical Batch 04 acceptance remains unchanged. Batch 05 is not complete and its remaining 16 lessons must still be authored and verified before acceptance.

Batch 05 extension checkpoint: Ethernet, ARP and ICMP drafts bring availability to five units without changing accepted progress. The pending-route fixture is now s1-g2-t0 (TCP vs UDP). Exact protocol commands are covered by an explicit read-only/loopback allowlist. Thirteen Batch 05 lessons remain to be authored; next is transport/services.

Batch 05 service-model checkpoint: nine drafts through NAT/PAT are available. scripts/service-models.js separates deterministic lease and translation logic from native controls. Lease limits and no-response assumptions are explicit. NAT tables are scrollable and keyboard focusable on narrow screens; missing mapping does not invent a filtering outcome. Next authoring node and pending fixture: s1-g3-t0 (VLAN).

Batch 05 VLAN checkpoint: twelve drafts through trunking. The tag model separates representable bit fields from deployable VLAN policy. labs/vlan-trunk.sh creates five isolated namespaces, explicit PVID/untagged access membership and tagged trunk membership; it tests a missing-VLAN fault with carrier up and verifies isolation after recovery. Cleanup and unchanged host networking were tested, including an injected early exit. Keep shell scripts LF. Next authoring node/pending fixture: s1-g3-t3 (STP concepts).

Batch 05 switching checkpoint: fourteen drafts. scripts/switching-models.js computes four stable triangle topologies and replays six frames through private VLAN-scoped learning/aging state. The model does not claim protocol timing, BPDU exchange or hardware testing. Full expected role/table snapshots are independently asserted. STP labels were enlarged after mobile review. Next authoring node/pending fixture: s1-g4-t0 (Routing tables).

## ADR 11 — Routing validation and Batch 05 acceptance (2026-10-04)

All 18 Batch 05 lessons are accepted after source/content review, 25 batch browser checks, command allowlist execution, independent model tests and isolated-lab fault/recovery checks. Overall accepted progress is 49/442. Historical draft notes above retain their checkpoint context.

The routing widget is a fixed eligible IPv4 table with explicit prefix/metric precedence and terminal discard, independent of host routes. Python ipaddress provides the reference for 1,546 selections. Its narrow table is a labelled keyboard-scrollable region; invalid input hides old output.

The dual-stack lab owns three namespaces, creates veth links within them, changes forwarding only in its router namespace and waits for ordinary IPv6 address readiness. The fault removes only B's IPv4 return route. IPv6 remains a working control; the restored route recovers both IPv4 directions. Tests compare host forwarding settings as well as links/routes/namespaces and inject an early exit to verify cleanup. No live RA/SLAAC/DHCPv6 service or DAD-conflict claim is made.

The next batch and pending-route fixture are Batch 06 / s1-g5-t0 (ping). Earlier successor tests now expect accepted OSI content. The expanded audit snapshot is docs/quality-audit-batch-05.json; the regular four-batch cadence remains unchanged.

## ADR 12 — Diagnostic evidence rather than automatic diagnosis (2026-10-04)

The first two Batch 06 drafts pair bounded local commands with a synthetic evidence explorer. Ping statistics exclude unanswered probes from RTT; all-missing samples report no timing. Trace scenarios require a separate reveal of supported conclusions and next evidence. They deliberately avoid inferring a broken router from an asterisk, a segment delay from adjacent RTTs or application health from echo success.

The module reads no host state and sends no network traffic. Windows and Linux command flags remain distinct. Six loopback commands executed successfully; absent Linux traceroute is a documented environment limit rather than a reason to install software or claim a live routed-path test.

Accepted count remains 49; two Batch 06 drafts bring authored count to 51. Next authoring node and pending-route fixture: s1-g5-t2 (nslookup). Batch 05's final lesson now navigates to a draft ping lesson. The manifest's first unfinished node remains s1-g5-t0 until the whole batch is accepted.

Batch 06 extension: six drafts through ip, 55 authored overall. The DNS fixture binds ephemeral UDP/TCP sockets only on IPv4 loopback and returns known positive/negative/server-failure responses or deliberate silence. No recursion or resolver configuration change occurs. Real BIND clients validate seven cases; tests independently inspect response fields and verify cleanup after an injected client failure. Browser DNS cases match the recorded status/exit combinations.

ipconfig and ip use read-only host inspection plus contextual interpretation. The Windows cache display exceeded Node's default capture buffer, so the harness streams and discards it instead of retaining names. Installed ipconfig help exits 1 with valid usage output; this is recorded as a scoped implementation observation. No release, renewal, cache flush or route mutation is executed. Next authoring node/pending fixture: s1-g5-t6 (arp). Batch 06 acceptance remains pending.

## ADR 13 — Socket evidence and usage-bound stopping checkpoint (2026-10-04)

ARP, netstat and ss bring Batch 06 to nine drafts and the course to 58 authored units, with 49 accepted. The socket lab uses one implementation with platform-specific inspection: Windows netstat selects owned endpoints/PID, Linux ss uses exact-port filters and local-address checks. Listener, UDP binding, accepted TCP state and the PING/OK application response are separate assertions. Context managers and injected-failure tests verify cleanup on both platforms. No policy or external bind is changed.

The usage tool reached 70% used / 30% weekly remaining. Further authoring stops at the user's requested boundary after verifying and saving this checkpoint. The curriculum itself remains incomplete. Resume at s1-g5-t9 (tcpdump), then Wireshark and lab-1; keep Batch 06 unaccepted until its remaining work and full review finish. The current outline regression fixture is s1-g5-t9.

## ADR 14 — Resume and reproducible offline packet evidence (2026-10-08)

The user resumed work after the weekly allowance reset (86% remaining). Retain the 30% stopping condition. Eleven Batch 06 drafts now bring authored availability to 60; accepted progress stays 49/442. Next authoring node: lab-1.

tcpdump and TShark were installed from the configured Ubuntu repository in WSL for real offline validation. A deterministic PCAP generator uses documentation addresses, fixed timestamps and no sockets. Ten records include one intentional truncation. The browser inspector exposes saved versus original length without pretending to be a general filter/parser. Tests compare its metadata directly with the binary and assert independent analyzer filter results. No Windows GUI installation or live host capture occurred.

The reader previously selected only authored lessons and then fell back to the next topic, skipping an unfinished stage lab. Navigation now uses adjacent original catalog nodes. The broad audit checks every authored footer against immutable inventory order; stage-lab progression no longer depends on whether the lab has been authored. The current pending-route fixture is lab-1.


## ADR 15 — Complete the original five-protocol lab before accepting diagnostics

2026-10-08. The original `lab-1` requires DHCP in addition to ARP, DNS, TCP and ICMP; the ten-record synthetic PCAP cannot stand in for that requirement. The integrated runner acquires a real isolated lease, tests a routed application, records client and fault-server capture boundaries, removes/restores one server return route, and explicitly reaps processes before namespace removal. Tests allow normal DHCP retries and repeated decoded client-identity fields while enforcing transaction/options equality. Batch 06 is accepted at 61/442; Batch 07 begins at `s2-g0-t0`.

The user's explicit “dont use gapcode” instruction governs continuation. The attempted worker was terminated; direct implementation and verification resumed. No worker output is accepted as evidence. Weekly allowance remains above the requested 30% stopping boundary; the overall goal remains active.


## ADR 16 — Model CLI state honestly while keeping vendor execution separate

2026-10-08. The first four Batch 07 drafts use one exact-command teaching model with native input, text-only output, mode context and separate running/startup snapshots. Merge preserves an extra description absent from saved commands; model reboot reconstructs only saved fields. No model result is treated as Cisco device execution. Guided device commands keep explicit platform/execution limits, and the batch remains unaccepted. Four drafts yield 65 authored units while accepted progress stays 61. Next authoring node is `s2-g1-t0`.


## ADR 17 — Keep selected register arithmetic separate from platform boot behavior

2026-10-08. Router-table selected fields do not establish Catalyst boot policy or a complete recovery outcome. The new decoder extracts only boot bits 3–0 and bit 6, reports other bits as unmodeled, rejects malformed input and declines interpretation in Catalyst/virtual contexts. Boot cases distinguish image, policy, configuration and service checkpoints without firmware emulation. Current Cisco Catalyst equivalent-control guidance prevents propagating a universal 0x2102 recipe. Three new drafts yield 68 authored units, while accepted coverage stays 61. Next authoring node is `s2-g1-t3`.
# ADR 18 — Storage planning and byte comparison have separate evidence

2026-10-09. Use an authored dry-run inventory with protected boot dependencies, recovery/evidence retention and unknown requirements. No browser host-file inspection/deletion or cleanup-command generation. Peak demand uses visible decimal-unit assumptions; a fit is narrower than deployment readiness.

Provide standard-library Python SHA-512 practice for temporary synthetic bytes and read-only regular files. Expected-value trust, signature, compatibility, running identity and services stay separate. Test multi-block input, same-size mutation, preservation, input errors and cleanup after failure on Windows/Linux. Metadata stability is not a snapshot guarantee. Cisco procedures stay guided/unexecuted without an authorized target; local model success does not promote drafts.
# ADR 19 — Installation and recovery conclusions remain scoped

2026-10-09. Evaluate intended mode, selected artifact and dependency presence separately. A staged .bin does not imply running bundle mode. Complete synthetic dependency presence does not establish integrity, support or actual startup. Enumerate all 64 states independently; keep actual vendor procedures unexecuted without a target.

Use distinct backup cases for local-only persistence, failed validation, merge residue, service failure and a tested scoped drill. Do not infer exact replacement from a merge or service recovery from a normal prompt. Source history conflicts are recorded rather than propagated. Current lifecycle notices require product/release applicability checks.
# ADR 20 — Trace ordinary VLAN classification without a full switch emulator

2026-10-09. A bounded two-switch path follows local access classification, trunk representation, receiver classification and destination eligibility. Assume active VLANs, a known eligible destination MAC and forwarding ports. Exclude routing, security, DTP/VTP, voice/priority/QinQ and control behavior. Native mismatch can reclassify untagged data even when it reaches a different domain; retain the segmentation-fault warning. Real inconsistency detection may block forwarding and is explicitly outside the model.

Reuse the verified isolated Linux VLAN/trunk lab for real membership/isolation and fault/recovery evidence. Do not rename that evidence as Cisco execution or native-mismatch validation. Keep actual Cisco commands guided and full batch acceptance pending. Preserve the script's LF bytes and original IDs.
# ADR 21 — Separate trunk role, database authority and voice-service evidence

2026-10-09. Model eventual compatible DTP role selection with valid fixed/dynamic suppression combinations; keep each endpoint's local role and peer agreement distinct. Do not simulate packets/timers or claim actual negotiation. VTP cases distinguish legacy accepted-revision risk, established domains, scoped transparent forwarding, VTP 3 authority and data-path failure. Do not generalize version-specific rules.

Voice cases distinguish untagged PC data, selected tagged voice, unavailable path, configured intent versus learned framing and excluded priority/alternate semantics. No phone, discovery, QoS or call execution. Keep commissioning prerequisites and configuration restrictions in primary references. All three units remain drafts pending actual vendor execution and full batch review.

## ADR 22 - Aggregation evidence before protocol detail (2026-10-09)

The EtherChannel draft reuses the native evidence-case control for five separate member/capacity/threshold/traffic/VLAN observations. Do not render synthetic Cisco command output or invent a vendor hash. Nominal capacity, operational bundling, logical carriage and original service are distinct checkpoints. Explicit LACP minimum-two behavior is a separate case; no-default threshold is asserted. Guided read-only inspections retain actual-target execution pending. LACP/PAgP follow as separate original nodes. Batch 07 remains unaccepted despite local contract/model/browser checks.

## ADR 23 - Protocol pairing without fictional operational state (2026-10-09)

LACP and PAgP retain their original separate nodes and add native mode/prerequisite controls. Use a pure four-mode table with three explicit assumptions and independent 128-state tests. Report eligibility only; do not compute Cisco member flags, key/priority selection, timers or service. PAgP normal responsive-peer assumptions exclude silent-partner behavior; distinguish its mode words from DTP. Preserve exact-platform caveats and guided read-only commands. All 21 Batch 07 nodes are drafted; review the full batch against original completion requirements before editorial acceptance or Batch 08.

## ADR 24 - Applied exam review and explicit acceptance evidence (2026-10-09)

Replace two repetitive binary/model-limit questions per Batch 07 unit with scoped applied interpretation, calculation and diagnosis; preserve ten questions and original question IDs. Record all 210-question review and 42 revised entries separately from pending full prose/source/lab/manual-render review. Centralize fresh execution of existing suites in a sequential runner to retain individual exit status/output and avoid concurrent browser interference. This runner does not accept topics. Treat real Cisco execution as an explicit evidence limit; do not invent a mandatory physical-execution gate beyond the user's original completion requirements. Full batch acceptance still requires those requirements to be reviewed and proven before Batch 08.

## 2026-10-09: Batch 08 accepted with scoped evidence

All thirteen original Batch 08 units satisfy the parsed 22 Topic items and thirteen Batch gates. Accepted count advances 82 → 95; Batch 09/Static Routing is the next frontier. Original nodes and learner storage are unchanged. No GapCode was used, honoring the user's override. The integrated lab has a complete mapped guided isolated build/fault/rollback; browser predictions and entered probes do not claim device execution. Sixty vendor blocks remain guided, two ERSPAN blocks have actual offline synthetic decoding evidence. Full regression, accepted-state UI and broader course audit are retained. Do not narrow later device/model distinctions or treat a capture declaration as original-service proof.


## ADR 25 - Route installation precedes lookup (2026-10-09)

Batch 09 begins at the original Static Routing node and builds on the accepted routing foundation. Use a distinct six-candidate model: eligible exact-prefix candidates compete by declared AD, then different installed prefixes coexist for LPM. Symbolic N1 has an external resolver declaration rather than a contradictory directly connected next-hop flag. Do not simulate actual ARP, protocol learning, recursive chains or packet success. Keep the actual four-namespace Linux static experiment and unchanged dual-stack companion separate from optional guided Cisco procedures. Every input remains strictly parsed and results text-rendered. Keep Batch 09 in progress and editorial acceptance at 95 until all twenty original nodes and batch gates are reviewed. Next authoring is Floating Static Routes. User override continues to prohibit GapCode.


## ADR 26 - Floating preference and independent health (2026-10-09)

Use a two-candidate same-prefix floating model with strict distance bounds, explicit AD 255 exclusion and no invented equal-AD tie behavior. Route availability differs from downstream health. The optional supplied tracking gate applies only to the static-primary case; declared OSPF eligibility is independent. Original-service observations are entered and invalidated when assumptions change. Parallel transits are drawn as parallel in a readable keyboard-scrolling SVG, with equivalent table and honest scope. Guided manual primary-route withdrawal/restore is distinct from link failure or configured IP SLA detection; separate R2 return intent can remain asymmetric. Do not infer Cisco AD behavior from Linux route metrics. Two topics are reviewed, but all twenty and full batch gates remain required before advancing. Next authoring: Policy-Based Routing.


## ADR 27 - PBR consumer context and target scope (2026-10-09)

Use bounded IPv4 ingress packet fixtures and three ordered route-map sequences to show ACL denial skipping a match versus matched PBR map denial terminating policy for ordinary routing. Do not import packet-filter or route-redistribution semantics. Mark unevaluated ACL/decision successors explicitly. Policy actions and ordinary RIB declarations remain separate; downstream/return health does not change untracked selection. Keep Catalyst 9300 17.15 fragmentation/adjacent-next-hop/unsupported-action limits explicit and local policy absent. Guided cleanup uses the checked IPv4 no ip policy route-map form and deletes only exclusive newly owned unreferenced objects after detachment. Three topics are reviewed; all twenty and full batch gates remain necessary. Next authoring: OSPF.

## ADR 28 - Actual OSPF lab groundwork before lesson authoring (2026-10-09)

Use pinned Ubuntu FRR 8.4.4 packages extracted into a private cache, rather than installing a persistent routing service. Four owned network namespaces and private per-process mount namespaces keep host routes, forwarding, groups, mounts and FRR configuration intact. Actual Full adjacency, area-0 router LSAs, selected installed remote routes, bidirectional ICMP and bounded Hello capture are distinct evidence layers. A passive R1 transit fault leaves carrier up while withdrawing learned remote routes; exact reversal recovers both directions. Test normal cleanup plus early namespace/daemon-start failures independently. Parse actual CLI JSON, since this build can return exit zero after failed PAM authentication. OSPF content, questions, interactive visualization and guided Cisco branch still need authoring/review; keep the lesson pending and totals unchanged. No GapCode or worker delegation is used under the user's override.


## ADR 29 - Directed SPF candidates and actual evidence remain separate (2026-10-09)

Author OSPF around a supplied converged three-router directed graph and a separate actual two-router FRR lab. Compute both roots independently, add advertised destination stub cost and retain equal-cost mathematical paths. Keep prefix/RIB/forwarding/return prerequisites independent and do not manufacture neighbor state, flooding or convergence from graph controls. Corroborate actual lab cost/area/passive/timer assumptions with interface JSON, alongside Full/database/RIB/kernel/probe/Hello evidence. Keep target-specific Cisco process/interface examples guided, with source-checked no-forms and exclusive ownership/baseline cleanup. Four topics are reviewed; all twenty and the batch gates remain required for acceptance. Totals are 99 authored/95 accepted. Next authoring: OSPF Areas.

## ADR 30 - Multi-area evidence before Areas lesson authoring (2026-10-09)

Use three actual isolated FRR routers to distinguish area-local router topology from ABR-originated type-3 reachability. Configure Standard RFC2328 ABR behavior explicitly because the pinned FRR version documents a different default mode. Preserve /24 prefixes without implying aggregation. Corroborate protocol route class/cost separately from selected installed RIB and Linux gateway entries; kernel route priority is not OSPF path cost. Change only R3's branch area to demonstrate adjacency loss with carrier and backbone intact, then restore the exact original area. Test owned cleanup normally and at three partial-start boundaries. The lab is groundwork; keep Areas pending and lesson/question/editorial counts unchanged until full authoring and review. No GapCode is used.

## ADR 31 - Area scope templates are separate from live LSA state (2026-10-09)

Author the Areas draft with three structural router views and a fixed two-normal-area chain. Area-local topology membership remains a baseline template when declarations change; do not manufacture live retained/flushed LSAs, Full state, flooding or timing. Calculate intra-area ABR costs and both inter-area endpoint costs independently, with separate source-prefix/RIB/downstream declarations. Missing chain reachability does not predict summary origination or retention. Attach the actual Standard-mode FRR experiment as separate evidence. Preserve type-3 summary versus range aggregation, ABR versus ASBR, overlapping roles, route-class preference and RFC stub default classification; treat vendor no-summary extensions explicitly. Five topics are reviewed, 100 authored/95 accepted, with all twenty topics and batch gates still required before acceptance. Next authoring: DR/BDR. No GapCode is used.

## ADR 32 - Actual election history and interface-reset evidence (2026-10-09)

Build DR/BDR groundwork on a four-router owned broadcast LAN, with staged existing roles and a higher-priority late arrival. Record actual Full/2-Way pairs, current DR-originated type-2 identity/membership and independent forwarding/capture evidence. Do not select the highest priority again after every event or treat a DR as the data-plane gateway. Reject the passive-return trial as a clean rejoining fixture because it retained R1's prior DR declaration. Use an owned R1 link down/up transition to reset interface election state; observe existing BDR promotion and nonpreemptive return. Separate neighbor readiness from installed-prefix/probe/network-LSA readiness. Require decoded packet evidence rather than a capture startup message. Test normal plus four partial-start/capture cleanup paths independently. Keep the lesson pending and counts unchanged until full authoring/review. No GapCode is used.

## ADR 33 - Settled event replay before DR/BDR lesson integration (2026-10-09)

Use fixed router IDs, bounded priorities and explicit consecutive presence sets to teach election history. Preserve eligible incumbent roles, promote an existing BDR before filling vacancies and reset an absent attachment's declaration before return. Document consistent bidirectional settled-segment assumptions; exclude old conflicting declarations, partitions, live priority mutation and protocol timers/FSM. Check the shortcut against an independent per-router RFC declaration calculation, not another copy of the shortcut. Corroborate four phases against actual interfaces, neighbor pairs and current network-LSA records. Expected Full/2-Way and current-DR templates are not live CLI output; a lone DR has no network-LSA template. Independent readiness declarations never alter election history. Keep the preview separate until the full lesson, questions, guided procedures and topic review are finished. Totals remain 100 authored/95 accepted and DR/BDR remains next. No GapCode is used.

## ADR 34 - Integrate DR/BDR with explicit role and forwarding evidence (2026-10-09)

Complete original DR/BDR draft with election-history prose, four-step mechanism, thirteen explorer cases, actual broadcast lab, prepared guided vendor branch and thirteen original questions. Keep interface-scoped role, priority/cost, RID/interface IP, local peer labels and current type-2 identities distinct. Staged nonpreemption and reset/rejoin are actual; all-participant/no-incumbent ranking and ties remain bounded model cases. Preserve rejected passive-return evidence and avoid declaring it equivalent to an attachment-down reset. Scoped shared-attachment lab labels omit inherited chain arrows and retain keyboard scrolling. Use exclusive new guided processes and exact baseline reconciliation, with no global routing, addressing, interface-role, clear/reload/save mutation. Six topics are reviewed, 101 lessons authored/95 nodes accepted; all twenty topics and full-batch gates remain required. Next authoring: LSA basics. No GapCode is used.

## ADR 35 - LSA identity before freshness and separate actual provenance (2026-10-09)

Integrate LSA basics with ordinary OSPFv2 header comparison and seven preserved observer/area/phase views. Match identity and scope first; compare signed sequence, unsigned checksum, exactly-one-MaxAge and strictly greater-than-900 age dispersion in order. Validate input format without claiming checksum/body validation. Keep maximum-sequence flush/restart and MaxAge unusability explicit. Preserve separate Areas/broadcast experiments and raw source hashes; regenerate only from passing reports. Types 4/5/7 and flooding/lifecycle remain source-described, not new execution evidence. Reuse actual owned lab references sequentially. Seven drafts/102 authored/95 accepted; thirteen topics and full-batch gates remain required. Next is OSPF troubleshooting. No GapCode is used.

## ADR 36 - Actual traffic faults beyond healthy OSPF (2026-10-09)

Extend the existing owned two-router runner with namespace forwarding disabled and endpoint return route removed, independently restored. Retain actual Full neighbors, selected/installed routes, kernel paths, namespace setting, endpoint route lists and raw bounded probes. Include failure cleanup while each new fault is active. Preserve ten selected views from three separate passing experiments with hashes; do not merge fixed RIDs into one topology. Exercise answers use known controlled interventions, not automatic root-cause inference from a symptom. Keep invalid-view reset accessible and dynamic records text-only. MTU/authentication/exchange cases remain source-described and the full troubleshooting lesson stays pending. Counts and batch acceptance remain unchanged. No GapCode is used.

## ADR 37 - Integrate troubleshooting around independent evidence boundaries (2026-10-09)

Author the original troubleshooting node with state-specific investigation, compatibility, applicable database/calculation, same-prefix installation and longest-prefix lookup, independent forwarding/endpoint return and original-source closure. Integrate ten source-hashed views from three separate actual experiments without merging repeated RIDs or inventing captures. Known interventions explain the exercise; symptoms do not become universal root causes. Retain Linux forwarding-default reset and failed-return packet-arrival limits. All Cisco blocks remain read-only guided procedures; source-described MTU/authentication/exchange cases remain unexecuted. Kind guards preserve adjacent reader tools. Review thirteen exact questions, ten commands and twelve rendered screenshots. Eight drafts/103 authored/95 accepted; twelve topics and full-batch gates remain required. Next authoring is EIGRP. No GapCode is used.

## ADR 38 - Escalate owned lab shutdown before child reaping (2026-10-09)

An Areas interrupted-start test returned no exit status because cleanup waited indefinitely after TERM; one owned daemon and its namespaces remained. Remove only the positively identified failed-run resources. Apply the same short TERM polling, unique runtime-path/non-zombie identity recheck, KILL escalation and wait/reap ordering to all three OSPF runners. Add a deterministic stopped-daemon Areas interruption, where TERM cannot be handled, and independently compare the full baseline. Retain the failed regression report and require a fresh full suite and regenerated source-hash fixtures before the troubleshooting checkpoint passes. This is process-shutdown evidence, not protocol convergence or an uninterruptible-kernel guarantee. No GapCode is used.

## ADR 39 - EIGRP feasibility history and actual implementation boundaries (2026-10-09)

Build a supplied-distance worksheet around one prefix and explicit completed historical FD; apply strict RD<FD and keep current best total separate from history. Equality fails a sufficient condition but does not prove a loop or permanent unreachability. Stop before coordinated DUAL computation, variance or installed-multipath claims; readiness declarations are separate. Corroborate basic peer/topology/RIB/kernel/traffic/transport concepts in an owned two-router IPv4 FRR lab, not the worksheet's alternate paths. Reject accepted-looking interface/passive/timer syntax without effective configuration/behavior evidence. Preserve link-restored observations and explicitly restart only identity-checked owned eigrpd children because this build did not reliably recover from link-up alone. Verify original endpoints, startup packet headers, normal and five partial-cleanup boundaries. Keep original EIGRP lesson and counts pending until full teaching, procedures, questions and review are finished. No GapCode is used.

## ADR 40 — Integrate EIGRP with separate protocol, worksheet and runtime evidence

2026-10-09: Original `s3-g2-t0` now has a full draft overview, exact assessed questions, scoped commands and integrated worksheet. The single-transit actual lab cannot certify worksheet alternate-path decisions or full DUAL behavior. Preserve FD history semantics, strict sufficient condition, actual combined link/owned-daemon recovery and rejected configuration trials. Classic guided AS creation/removal requires a recorded absent-AS baseline; named and IPv6 modes remain separate. Nine reviewed drafts/104 authored routes remain distinct from 95 accepted nodes and pending twenty-topic batch acceptance. Next authoring is original EIGRP metrics `s3-g2-t1`.


## ADR 41 — Explicit metric vectors, rounding and representation boundaries (2026-10-09)

Integrate the original metrics node with two supplied two-link outgoing vectors and fixed default classic weights. Preserve minimum bandwidth, cumulative ten-microsecond delay and neighbor suffix separately. Show RFC truncate-first versus scale-first arithmetic on the same vector without claiming full pinned FRR aggregation/nondefault/saturation parity. Keep historical FD and actual path installation outside the calculator. Wide units and assumed RIB scaling remain source-described; no universal conversion or wide execution is claimed. Scope optional delay metadata tuning to a prepared supported owned interface and exact prior value. Retain unchanged actual observations and rejected settings. Review thirteen exact questions, seven commands and eleven screenshots. Ten drafts/105 authored/95 accepted; ten topics and thirteen full-batch gates remain pending. Next authoring is EIGRP neighbors. No GapCode is used.


## ADR 42 — Neighbor state, reliable transport and phase-specific evidence (2026-10-09)

Integrate the original neighbors node using eight source-hashed observations from two actual observers and four checkpoints. Separate the startup capture from each selected phase; retain seven header fields and overlapping UPDATE/ACK filters without invented INIT flags, timing or completeness. Keep hold, raw uptime, control SRTT/RTO and queue distinct from metric delay/application latency and route PASSIVE distinct from interface suppression. Preserve contradictory pinned timer displays, rejected settings and absent intermediate endpoint probes. Passing recovery explicitly includes both owned daemon restarts. Cisco passive tuning remains guided with prior nonpassive owned interface and exact restoration. Independently compare all 32 view/filter combinations, review thirteen questions/nine commands and eleven screenshots, then require full regression. Eleven drafts/106 authored/95 accepted; nine topics and thirteen full-batch gates pending. Next is EIGRP topology. No GapCode is used.

## ADR 43 — Corroborate literal topology display independently (2026-10-09)

Integrate original EIGRP topology with remote/local/transit prefix inspection across eight source-hashed observer/checkpoint views. Keep current total/RD, historical least-known FD and literal displayed FD separate. Preserve anomalous fault/intermediate via tokens and duplicate Connected lines without valid-peer, software-root-cause or physical-multipath claims. Require separate recorded peer, selected/installed active-FIB RIB and kernel gateway agreement for the remote snapshot, then retain phase-specific original probe evidence. Connected pairs remain absent and intermediate probes unfilled. No full DUAL, ACTIVE/query/SIA or historical reconstruction is implemented. Review thirteen questions, seven commands and eleven screenshots, then require 39 fresh regression commands. Twelve drafts/107 authored/95 accepted; eight topics and thirteen batch gates pending. Next original node is BGP fundamentals. No GapCode.

## ADR 44 — BGP session and prefix evidence before full original authoring (2026-10-09)

Reuse the pinned private FRR runtime for one direct IPv4 eBGP relationship AS65001/65002 with explicit exact-prefix import/export and network import-check. Withdraw only the R2 local network origin while preserving links and observed Established/connection counters; keep the asymmetric prefix state and failing original round trips visible. Restore exactly that statement without process/session clear. Independently inspect protocol attributes, selected RIB/kernel, local origin/connected distinctions and actual probes in six checkpoints/twelve prefix comparisons. Startup TCP/message-type fields remain incomplete and may include multiple PDUs per frame; they do not prove fault wire bodies. Preserve host/owned cleanup at five interrupted boundaries. This is evidence groundwork, not the full BGP lesson or Batch 09 acceptance. Full authoring, thirteen assessments, mechanism diagram and integrated primary review remain next; counts stay107 authored/95 accepted. No GapCode.


## ADR 43 — BGP prefix evidence integrated without inventing service

The full BGP draft reuses the actual explicit-policy single-transit origin withdrawal/repair. Keep conceptual BGP stores, candidate selection, system installation, local-origin sentinel, ORIGIN classification and bidirectional original probes separate. Startup type lists are not a phase withdrawal wire trace. The exact runner invocation supplies its privately prepared FRR_ROOT; guided CLI forms match retained capture commands. Reader hooks and original topology/BGP/eBGP adjacency work over HTTP and disk. Keep 95 accepted nodes until all twenty routing topics and full batch gates pass. The latest user instruction prohibits GapCode; all subsequent work is direct. Next: eBGP.


## ADR44 — External-prefix prerequisites are declared, with separate actual provenance

Use one ordinary external IPv4 candidate and independent origin/export/session/import/own-AS/resolution/system-selection declarations. Stop the ordered trace at the first failure; forwarding/return never alter admission. Explicitly exclude cached routes, full FSM/best-path, loop exceptions/confederations and route servers. Invalid scenario remains hidden after input changes. Source-described multihop and next-hop policy need actual underlay/target design. The separate real companion still only performs its known origin withdrawal/repair; never claim every supplied scenario was injected. Fourteen drafts are reviewed,95 accepted nodes unchanged; iBGP next. Direct work only, following the current no-GapCode instruction.


## ADR45 — Internal distribution does not manufacture next-hop or traffic evidence

Use one fixed external candidate at E with three same-AS speakers. Ordinary iBGP relay remains forbidden; A reflects only a selected eligible BGP choice through the client/non-client rule and supplied advertisement/session gates. Keep system-source displacement separate from default BGP advertisement, and model E next-hop-self with independent recipient resolution for each selected address. Preserve unchanged internal AS_PATH and distinguish RR control role from physical forwarding. ORIGINATOR_ID/CLUSTER_LIST, full path contest and actual iBGP/RR execution remain source-described or excluded. Fifteen drafts reviewed,95 accepted unchanged; BGP attributes next. Direct work only.


## ADR46 — Accept routing with explicit evidence boundaries

Keep attribute classification, conditional candidate comparisons, local tag contracts, system installation and original traffic declarations distinct. Primary repaired stale MED input handling, reviewed all13 questions per policy topic and35 current renders, and required58 fresh regression checks. Batch09 all20 nodes accepted;115 course originals accepted. Reuse five native agents in separate staging paths for Batch10, with primary design/review/acceptance. No GapCode.


## ADR47 — Accept Advanced Routing & Switching with scoped evidence

Accept all20 Batch10 originals after primary technical/assessment/workbook review,40 inspected visual sheets,14 passing regression commands and20,508 independent model expectations. Preserve admission, selection, installation, forwarding, return and original service declarations separately; retain bounded multicast and QoS contracts. Target configuration/fault/restore is guided and unexecuted. Course acceptance advances to135/442 and Batch11 (`s4-g0-t0`), without changing learner progress or claiming the whole roadmap complete. Latest user instruction prohibits GapCode; primary performed the changes and verification directly.


## Network Services acceptance and current user steering — 2026-10-09

The user explicitly said not to use GapCode after its quota blocked implementation. The primary assistant therefore performed this section directly, including design, authorship, tests, source review, acceptance and final verification. This steering supersedes the earlier GapCode preference for this work; historical decisions remain as dated records.

Batches11/12 preserve all30 stage4 identities and the original integrated NTP/Syslog/SNMP/AAA/recovery scope. A single native worksheet module exposes topic-specific evidence boundaries with explicit synthetic limitations; five arithmetic tools supplement the shared steppers. The section is editorially accepted only within guided/model/owned-loopback evidence, without claiming target-device or platform deployment. The broader Batch12 audit covers165 routes. Next: Batch13 Network Security.


## Network Security acceptance and user steering — 2026-10-09

After GapCode usage limits blocked both installed models, the user explicitly instructed not to use GapCode. The primary assistant directly designed, authored, implemented, reviewed and verified this section. That steering supersedes the earlier worker preference for this work. Batch 13 was accepted before authoring Batch 14. All 33 original identities are preserved, with 330 exams and 99 quick checks. The original seven-zone integrated lab remains explicit; its browser policy relation, guided device workbook and actual owned HTTP application fixture are distinct evidence scopes. No network-zone/vendor/VPN deployment is inferred from loopback behavior. Nine fresh regression commands, independent model expectations, all new browser routes, 99 inspected renders and the full 198-route audit support acceptance. Learner progress stays separate. Next: Batch 15 Data Center Foundations.


## Data Center Foundations acceptance — 2026-10-09

The primary assistant directly authored, implemented, reviewed and verified the requested 44 original units without GapCode. Batch 15 was accepted before Batch 16 authoring. IDs, immutable source and learner storage are retained. The original three-rack objective has elevations, A/B full-load rack/site budgets, sensible cooling/airflow, six-leaf/two-spine cabling, management addresses/policy and a standard-library owned offline one-fault/exact-restore rehearsal. Physical/electrical/thermal/vendor operations remain guided; offline JSON and supplied-input worksheets do not establish deployed hardware or original service behavior. Nine serial regressions and the periodic 242-route audit pass; final topic, assessment and visual review evidence is retained. Course acceptance: 242/442. Next: Batch 17 Cisco Data Center, s7-g0-t0.

## 2026-10-09 — Cisco Data Center accepted

The user explicitly instructed “dont use gapcode”; the primary assistant performed implementation, content review and final verification directly. Batch 17 was accepted before Batch 18 authoring. All 32 original stage-7 units now have full lessons, 320 exams and 96 quick checks; IDs and the original source are preserved.

Six bounded browser models cover vPC, VXLAN byte budgets, VLAN/VNI mapping, EVPN import eligibility, aggregate fabric capacity and a narrow ACI policy predicate. Cisco/APIC procedures are explicitly guided and unexecuted. The standard-library offline lab evaluates synthetic intent and verifies byte-identical restoration and owned-directory cleanup, including injected interruptions. It makes no live forwarding, hardware support, HA or performance claim.

Acceptance uses primary content/question hashes, focused browser evidence, 1,827 model checks, 302 offline-lab checks and the 274-route course audit. See docs/validation-batch-17.md and docs/validation-batch-18.md. Editorial total is 274/442; next is Batch 19 (s8-g0-t0). Learner progress remains separate.

## Storage & Virtualization acceptance — 2026-10-09

Batches 19–21 preserve all 47 original stage IDs and the original integrated lab objective. Teaching incidents and six bounded browser calculations are explicitly authored/synthetic. The executable lab models two fabrics, three hosts, two guest-network switches and one shared array; file corruption detection and restore run only inside a fresh owned temporary directory. Synthetic workload placement is never described as actual VM restart. Real vendor procedures remain a guided extension with separate evidence requirements. All 611 new assessment answers and 141 contact-sheet renders were reviewed directly. Editorial completion is 321/442; learner progress remains independent. Next is Batch 22. User instruction for this task was direct work without GapCode.


## Automation & Infrastructure Architecture acceptance — 2026-10-09

The user explicitly instructed direct work without GapCode. The primary assistant authored, implemented, reviewed and verified all 62 original stage-9 units. Batches 22 and 23 were accepted before building their dependents. All 806 new assessment answers and 186 desktop/mobile/mechanism renders were reviewed. Five supplied-input models remain separate from actual standard-library examples and owned local-file execution. The original enterprise design objective is preserved in a topology, authority/policy matrices, capacity and recovery budgets, and a guided version-controlled platform extension. Deliberate site-loss capacity and RTO/RPO gaps remain visible; a local PASS does not certify deployed architecture. Editorial total is 383/442; learner progress is unchanged. Next: Batch 25, device-0.


## Physical Hardware acceptance — 2026-10-09

The user explicitly requested completion of Physical Hardware without GapCode. The primary assistant performed this work directly. This request overrides the usual batch sequence for Batch 26; its individual prerequisites are accepted foundation lessons. Twenty dedicated original hardware IDs now have incident-specific teaching, assessment and workbook guidance, with transparently reused Data Center and Storage foundation material and tested worksheets. No new vendor emulator is implied. The primary reviewed sixty renders, the assessments, local-command evidence and complete passing browser rerun. Physical and vendor procedures remain guided/unexecuted. Acceptance is recorded in docs/acceptance-batch-26.json; concurrent work in Batches 25 and 27 was preserved and is outside this decision.


## Cisco Device Mastery acceptance boundary — 2026-10-09

Batch 25 retains all 17 original device IDs and the existing static reader. Exact platform identity precedes syntax: ASR OS family, firewall image/manager, wireless switching location, Nexus mode and MDS active zoning are explicit boundaries. Device-specific four-step mechanisms and authored incidents reuse the shared accessible reader. A separate three-valued checklist treats unknown as blocking and never claims automatic compatibility discovery. The Python worksheet has no persistent resources or network activity.

Primary content, question and visual review plus passing browser, model and shared-route checks support editorial acceptance. No Cisco device execution is claimed. Direct HTTP access restrictions are recorded separately from successful research-browser document reads. Concurrent section edits were preserved; only Batch 25 IDs were promoted by this task. The current manifest, not a fixed historical total, remains authoritative. No GapCode was used.


## Requested Troubleshooting Mastery completion — 2026-10-09

The user explicitly requested starting and finishing Batch 27 without GapCode, overriding the usual sequential batch order for this scope. The primary assistant authored and reviewed all 21 trouble IDs directly. Existing original IDs, learner progress semantics and immutable source are preserved. Technical prerequisites point to existing foundation lessons; incident explanations are specific to the new cases rather than references to unrelated widgets. The batch is accepted for teaching, synthetic case practice and actual isolated local-file recovery, with real platform repairs unclaimed. Source-client access refusals are retained in the evidence. See docs/validation-batch-27.md and docs/acceptance-batch-27.json. Other batch states and continuation pointers are preserved by the acceptance script.

## Capstone sequence exception — 2026-10-09

The user explicitly requested starting and finishing Capstone without GapCode. Batch 28 was therefore authored ahead of pending batch acceptance. Its lesson prerequisites point to already authored integrated labs; its original batch dependency remains documented. Only capstone-final is promoted by this review. Concurrent Batches 25–27 retain their own content and reviews. Worksheet arithmetic, actual local SQLite recovery and guided enterprise execution are separate evidence scopes.


## ADR — Complete the separately counted expansion (2026-10-09)

The user requested completion without GapCode. Direct implementation completed
Batches 29–33 in sequence, with focused checks and primary review before acceptance.
The original 442-node inventory and source remain unchanged. A separate expansion
inventory adds 15 stable ADD-* IDs; the catalog, validation and progress tools now
check the combined curriculum while keeping original and expansion totals distinct.
Expansion study state uses its own key so the original roadmap import/export cannot
silently discard it. The original export still covers original study data only.

The new reader reuses the existing lesson structure and provides keyboard-operated
incident phases with a complete static alternative. Evidence is explicitly authored;
actual local execution is linked separately. The lab scope includes ordinary-user
Linux, owned-file restoration, loopback HTTP/TLS and a restricted cached-image
container. Kubernetes/cloud operations remain guided or offline models. No actual
cloud resource or production configuration was changed.

All 84 supporting items are reconciled in a separate review ledger and learner-facing
companion. Previously completed capstone deliverables map to the existing workbook;
certification and hardware names remain scoped historical study references, not
exam alignment or buying recommendations. Three cross-domain practice exercises
connect the new material to the existing course.

See docs/validation-expansion-final.md for acceptance, initial test failures and
repairs, verification limits and final evidence. Source/version maintenance remains
an ongoing task; no planned original or expansion lesson remains unfinished.
