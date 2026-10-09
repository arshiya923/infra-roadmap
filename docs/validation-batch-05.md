# Batch 05 acceptance — 2026-10-04

All 18 assigned lessons are accepted: OSI, TCP/IP, Ethernet, ARP, ICMP, TCP/UDP, DNS, DHCP, NAT/PAT, VLAN, 802.1Q, trunking, STP, MAC tables, routing tables, default gateways, static routes and IPv6 fundamentals. This adds 180 original exam questions and 54 quick checks. Overall: 49 of 442 original nodes accepted, 490 exams, 147 quick checks and 49 guided labs. The remaining 393 original nodes, 84 supporting items and 15 proposed expansions are not complete.

## Evidence

- Content contracts and immutable source hash: `node tests/content.cjs` PASS. All 442 IDs remain assigned exactly once across 33 batches.
- Browser suites: general 18, Batch 02 13, Batch 03 17, Batch 04 19 and Batch 05 25 checks passed. Coverage includes lesson contracts, navigation, quizzes, native keyboard controls, direct-file use, themes and 320/390/768/1440-pixel layouts. Batch 05 screenshots are under `screenshots/batch-05/`; routing mobile layout was visually reviewed.
- All 33 unique Batch 05 command examples executed successfully through the reviewed allowlist. Read-only host output is not retained. The two privileged shell labs execute inside owned isolated namespaces.
- Routing model: 1,546 default-on/off selections independently checked with Python `ipaddress`, plus 15 invalid input/type cases, terminal blackhole and connected actions, /25 boundary and returned-state independence.
- Protocol/service/switching model tests passed: DNS expiry; lease thresholds; NAT directions/expiry; 112 tag encodings; four stable-tree topologies; six complete MAC-learning snapshots. Earlier network/address model regressions also passed.
- Transport lab: six checks passed, including loopback-only endpoints, reconstructed stream, observed datagram boundaries, normal socket cleanup and cleanup after an injected failure.
- VLAN lab: seven checks passed, including preserved isolation, missing trunk membership while carrier remains up, recovery, host-state preservation and early-failure cleanup.
- Dual-stack routing lab: seven checks passed. Both directions/families work initially; deleting B's IPv4 return route breaks that exchange while IPv6 works; restoration recovers all four paths. Host links, routes, forwarding settings and pre-existing namespace names remain unchanged. Normal and injected-failure cleanup passed.
- Broader audit: all 49 routes passed prerequisite, DOM/control naming, lazy loading, core text contrast and exception checks. Local search measured 141 ms against a two-second ceiling. `quality-audit-batch-05.json` preserves this acceptance snapshot and includes every model script in asset accounting.

## Review boundaries

The routing explorer models one eligible IPv4 table, longest-prefix matching, comparable metrics and explicit discard; it does not implement policy rules, administrative distance, ECMP or live next-hop checks. The real routing lab uses static IPv4/IPv6 addresses and routes. Ordinary IPv6 DAD readiness is awaited, but no duplicate-address conflict, RA/SLAAC/DHCPv6 service, physical router, Internet path or throughput experiment is claimed. An initial tentative-address timing failure was diagnosed and corrected with a bounded readiness wait before the passing baseline.

DNS, DHCP, NAT, STP and MAC explorers label their simplified state explicitly. STP shows stable roles rather than protocol convergence. Content review preserves route selection versus delivery, next-hop MAC versus remote IP, default router discovery versus DHCPv6, and separate IPv4/IPv6 evidence. Sources and corrections are recorded in `research-batch-05.md`.

Next batch: 06, Diagnostic tools, starting at `s1-g5-t0` (ping). Historical draft checkpoints below retain their original counts and are superseded by this acceptance record.

## Historical fourteen-lesson checkpoint

Latest checkpoint: fourteen drafts through MAC address tables, 45 units authored overall and 31 accepted. Batch 05 has 140 exams and 42 quick checks. Four routing topics remain. Next: s1-g4-t0 (Routing tables). Weekly balance is now 33% remaining.

Fresh evidence: content/progress PASS (45 units, 450 exams and 135 quick checks overall); 22 Batch 05 browser checks and 18 general checks PASS; all 24 command examples PASS. Switching-model tests passed four stable-tree scenarios and six complete FDB snapshots, invalid-input rejection and replay independence. Mobile STP/MAC screenshots were reviewed; STP text was enlarged and re-rendered to improve small-screen readability.

The STP explorer computes stable roles in one equal-cost triangle with explicit bridge ordering. It makes no convergence-time, BPDU-loss, guard or live-cycle claim. The MAC model uses six fixed frames, VLAN-scoped source learning and a stated 300-second aging rule; it does not model static entries or hardware capacity. Both use native controls, text alternatives, independent pure logic and no network activity. Earlier evidence below retains its checkpoint counts.

## Historical twelve-lesson checkpoint

Latest checkpoint: twelve drafts through trunking, 43 authored units overall and 31 accepted. Batch 05 has 120 exams and 36 quick checks; six topics remain. Next: STP concepts (s1-g3-t3), MAC tables and routing. Weekly balance now 34% remaining.

Fresh checks: content/progress PASS (43 units, 430 exams, 129 quick checks overall); 19 Batch 05 browser checks and 18 general browser checks PASS; all 22 command examples PASS. Tag arithmetic passed 112 independent encodings plus nine invalid inputs. Tag mobile screenshot was visually reviewed.

The executable VLAN/trunk lab passed seven checks: inert default help, VLAN 10 delivery across two bridges, VLAN 20 isolation despite matching /24 host prefixes, a missing-trunk-VLAN fault with the link still UP, recovery with isolation retained, normal cleanup and host-state preservation, and cleanup after an injected early exit. See vlan-lab-results.json. It creates five owned namespaces and no host uplink. The harness compares host links, IPv4/IPv6 routes and pre-existing namespaces; raw host inventories are not saved. This is software-bridge evidence, not hardware throughput, wire capture or STP convergence. The shell script uses LF endings; an initial CRLF execution failure was fixed before the successful runs.

## Historical nine-lesson checkpoint

Current checkpoint: nine drafts through NAT/PAT, 40 authored units overall, 31 accepted. Batch 05 has 90 exams and 27 quick checks. Nine nodes remain to be authored. Next node is VLAN (s1-g3-t0).

Fresh extension evidence: content/progress checks passed (40 units, 400 exams, 120 quick checks overall); 17 Batch 05 browser checks passed after fixing NAT-table overflow at 320 pixels. The general browser suite passed 18 checks this turn. All 19 reviewed command examples passed. Service model tests passed 16 lease vectors, ten invalid lease inputs, five NAT scenarios and independent returned-state checks. DHCP and NAT mobile screenshots were visually reviewed. Keyboard horizontal scrolling was verified for the NAT packet table.

The lease model excludes ACK/NAK, restart, supplied timer overrides and retransmission jitter; jump buttons use the first whole second at or after the model timer. The translation model uses two fixed TCP mappings and reports absent translation separately from unmodelled firewall policy. No live DHCP service or NAT rule was created. scripts/service-models.js adds native-control models without external dependencies. Browser evidence remains browser-results-batch-05.json and command evidence commands-results-batch-05.json.

## Historical seven-lesson checkpoint

Seven drafts through DNS are now available: 38 authored units overall, 31 accepted. These seven drafts have 70 exams, 21 quick checks and seven labs. Eleven Batch 05 nodes remain. Next authoring node: DHCP (s1-g2-t2). The remainder of this document preserves earlier checkpoint evidence and counts.

Current checks: content contract PASS (38 units, 380 exams, 114 quick checks); 13 Batch 05 browser checks and 18 general browser checks PASS; all 17 reviewed WSL command examples PASS. DNS model tests passed 48 cache vectors and 11 invalid inputs. Windows Python transport-lab tests passed six checks including loopback-only sockets, byte reconstruction, datagram boundaries and socket cleanup after injected receive failure. The normal transport lab also passed in WSL. DNS mobile screenshot was visually reviewed. Evidence: browser-results-batch-05.json, commands-results-batch-05.json and transport-lab-results.json.

DNS cache behaviour is synthetic, with no serve-stale, prefetch, alias-chain or delegation-cache simulation. The negative TTL is an already-derived effective lifetime. The localhost example is a name-service lookup, not proof of a DNS query. The socket lab binds only loopback with ephemeral ports; it measures API behaviour, not wire segmentation or WAN performance. A successful UDP run is not a protocol guarantee.

The six-step DNS mechanism is supported by the reader. The generic audit now permits 3–12 steps rather than forcing four. Weekly usage at this turn's start was 35% remaining; the build goal stays active.

The broader audit was also rerun: eight checks passed over all 38 routes, including prerequisite consistency, distinct exam prompts, named controls, DOM/anchor structure, core contrast, lazy bundle loading and local search (144 ms). Current evidence is quality-audit-latest.json; the historical Batch 04 evidence is preserved.

## Historical five-lesson checkpoint

This is evidence for the first five draft lessons, not acceptance of Batch 05.

Available drafts: `s1-g0-t0` (OSI Model) and `s1-g0-t1` (TCP/IP Model). The additional drafts are s1-g1-t0 (Ethernet), s1-g1-t1 (ARP) and s1-g1-t2 (ICMP). Together they contain five labs, 15 quick checks and 50 original exam questions. The course contains 36 authored units, of which 31 remain editorially accepted. The other 13 Batch 05 topics are not yet authored.

## Evidence

- `node tests/content.cjs`: PASS; 442 original IDs, 69 groups, 36 authored lessons, 360 exam questions, 108 quick checks, all references and question identifiers valid. Original source SHA-256 remains `ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25`.
- `python tools/progress.py`: PASS; all 442 original IDs assigned exactly once, 31 accepted. Draft labels are derived from actual authored bundles.
- `node tests/browser-batch-05.cjs`: nine checks passed, including draft status, lesson contracts, all seven OSI selections, four-layer switching, keyboard selection, reset, successor states, quiz feedback, 1440/768/390/320 widths and direct file usage. No page or HTTP errors. See `browser-results-batch-05.json`.
- Regression suites: `browser.cjs` 18 checks, `browser-batch-03.cjs` 17 checks and `browser-batch-04.cjs` 19 checks passed. Successor assertions were updated to expect a draft OSI lesson; the preserved-outline fixture now uses the still-unwritten TCP vs UDP node `s1-g2-t0`.
- Six exact read-only commands ran under Ubuntu-24.04 in WSL, all exit code zero with nonempty output: `ip -brief link show`, `ip -4 route get 127.0.0.1`, `ss -ltn`, `ss -tan`, `ss -uan`, `ip -6 route get ::1`. See `commands-results-batch-05.json`. Raw host endpoint inventories were not saved in the evidence document.
- Screenshots `screenshots/batch-05/layers-mobile.png` and `layers-dark.png` were visually inspected for readable content and usable controls.

## Review boundaries

The model grouping is explicitly conceptual. It does not claim seven mandatory headers, equate an application login session with an OSI session protocol, or infer application health from ping/listener evidence. TCP stream semantics, separate address-family checks, next-hop MAC scope and proxy/backend distinctions are included. The synthetic incident cases are labelled, and local inspection does not claim external reachability or physical fault reproduction.

The widget uses native controls, one selected button per model and text explanations rather than colour alone. Model switches and reset reconstruct a valid selection. Existing lesson steppers provide the mechanism sequences separately from the manual evidence explorer.

## Remaining work

Continue authoring at `s1-g2-t0` (TCP vs UDP), followed by DNS, DHCP and NAT/PAT. Then finish switching and routing topics in the current batch. Re-run the content, new-batch and affected regression checks after changes. Extend command evidence to each added example. Perform full editorial acceptance only after all 18 Batch 05 nodes meet the lesson contract. Do not add these drafts to completedNodeIds early.

The weekly Codex reading at this checkpoint is 64% used / 36% remaining; the active user goal continues until 30% remains. No usage reset was invoked.

## Five-lesson extension evidence

Fresh checks for the Ethernet/ARP/ICMP extension: content contract PASS (36 units), nine Batch 05 browser checks and 18 general browser checks PASS. All three new routes were checked at 1440/768/390/320 widths with functioning mechanism steppers. The earlier Batch 03/04 results above belong to the first draft checkpoint; those suites were not rerun for content-only additions.

`node tests/commands-batch-05.cjs` ran all 14 reviewed commands successfully. It loads exact commands from the authored bundle, rejects commands outside its explicit allowlist, verifies local route and socket expectations, accepts valid empty bridge/neighbour listings, and verifies both bounded loopback probes returned two replies. Evidence is saved without raw host inventories. Physical VLAN and MTU incident cases remain synthetic.
