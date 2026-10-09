# Batch 03 — Networking Basics acceptance evidence

Review date: 4 October 2026. Work performed directly; no GapCode or delegated workers.

## Reviewed scope

| Original ID | Lesson | Practical treatment |
|---|---|---|
| s0-g2-t0 | LAN | Local versus routed forwarding; VLAN/address mismatch |
| s0-g2-t1 | WAN | Underlay/overlay, capacity and return-path diagnosis |
| s0-g2-t2 | WLAN | Association versus IP service; RF contention evidence |
| s0-g2-t3 | Ethernet | Physical/link state and controlled cable-fault reasoning |
| s0-g2-t4 | MAC addresses | Local/unicast bits, neighbor versus switch tables, duplicate VM addresses |
| s0-g2-t5 | Frames | Header/FCS/tag/padding accounting and capture limitations |
| s0-g2-t6 | Packets | IP versus frame fields; routed TTL change and loop diagnosis |
| s0-g2-t7 | MTU | IPv4/IPv6 header budgets, tunnel overhead and PMTU black holes |
| s0-g2-t8 | Bandwidth | Bits/bytes, goodput, counter deltas and BDP |
| s0-g2-t9 | Latency | Serialization, propagation, queueing, RTT and transaction delay |
| s0-g2-t10 | Duplex | Scoped legacy mismatch, both-partner evidence and per-direction capacity |

Every lesson has a definition, purpose, bounded mental model, components, four-step mechanism/visual sequence, comparison table, realistic example, two platform-labelled command blocks, configuration/rollback guidance, production context, six-stage diagnosis, security/performance discussion, mistakes, prerequisites/related links, glossary and checked references. Each has one complete lab, three quick checks and ten original exam questions with answers/explanations. Batch contribution: 11 lessons, 110 exams, 33 quick checks, 11 labs. Whole-course authored totals at acceptance: 22 lessons, 220 exams, 66 quick checks, 22 labs.

## Interactive model review

The packet journey is a fixed, explicit ordinary IPv4/TCP path: client → Layer 2 switch → one router → server. IP endpoints and TCP ports remain constant; the router changes source/destination MAC and TTL 64 to 63, with a qualitative IPv4 header-checksum update. No numerical checksum is fabricated. There is no NAT, tunnel, VLAN tagging, TCP connection state, loss or failed-neighbor simulation. Step state is highlighted with text as well as color, Previous/Next/Reset controls and a complete static alternative. The SVG has a title/description and a keyboard-scrollable container on narrow screens.

The calculator models minimum IPv4/IPv6 headers plus ICMP Echo, user-entered tunnel overhead, a local underlay size budget, one IP-unit serialization event, independent RTT for BDP, and separate one-way propagation/queue inputs. It labels oversized serialization as hypothetical and flags IPv6 effective budgets below 1280. It does not infer RTT from one-way inputs, count Ethernet wire overhead, measure PMTU, simulate fragmentation or predict real TCP throughput. Invalid/empty/fractional-byte entries hide stale output and explain the input requirement.

## Verification evidence

- `node tests/content.cjs`: original 442 IDs, 69 groups, assignments and immutable-source SHA-256 preserved; 22 lesson contracts, all assessment IDs/answers, source metadata and related links pass.
- `node tests/network-models.cjs`: independent example vectors, 88 size-boundary cases, 96 rate/RTT/queue relationships, 43 rejected invalid inputs, four journey states and invalid step rejection. See [machine-readable results](network-model-results.json).
- `node tests/browser-batch-03.cjs`: 17 checks covering lazy search, all 11 lesson routes, four viewport widths, cross-batch navigation/pending Binary, steppers, packet field changes, keyboard/static alternatives, exact MTU boundaries, independent timing inputs, invalid values/reset, quizzes, clipboard, shared learner progress, direct-file use and clean console/HTTP output. See [browser results](browser-results-batch-03.json).
- Existing suites: 18 hardware/general and 13 operating-system checks pass. Their pending/successor expectations now point to the correct authored/unauthored nodes; older lessons were not removed or marked incomplete.
- `node tests/commands-batch-03.cjs`: 15 distinct read-only or bounded local examples pass; two ethtool observations execute with WSL virtual-interface limitations. Windows WLAN inventory executes, but no RF/roaming test is claimed. Three ping examples target only 127.0.0.1; documentation-address route lookups send no external probe. Raw network identities/output are deliberately not persisted. See [command evidence](commands-batch-03.json).
- Visual review: packet journey and calculator inspected on desktop and 390px mobile, calculator in dark theme; every new lesson checked for page overflow at 1440, 768, 390 and 320px. Mobile SVG labels retain readable scale with horizontal scrolling and an equivalent field table. Screenshots are in `screenshots/batch-03/`.

All tests use the local preview at `http://127.0.0.1:8765`, Microsoft Edge through bundled Playwright, and direct-file smoke checks. There is no build step or external runtime CDN. JavaScript syntax checks cover the new bundle, model module and modified reader.

## Limits and continuation

Physical switch/router/AP changes, live tunnel PMTU, cable replacement, RF surveys, performance load tests and real duplex mismatch recovery were not performed. Those labs explicitly use synthetic evidence, browser arithmetic or optional read-only observation. WSL values are not presented as physical NIC measurements. The preserved original remains unchanged. Study checkmarks are independent of editorial acceptance.

Sources and editorial corrections are recorded in [research-batch-03.md](research-batch-03.md). No real exam questions or current certification-alignment claims are used.

At this batch boundary, 22 of 442 original nodes are complete; 420 remain. The 84 supporting items and 15 expansion nodes remain separately pending. Next: Batch 04, Binary & Subnetting, beginning `s0-g3-t0` (Binary), including the original stage lab. Run the planned broader consistency/accessibility/performance audit after Batch 04.
