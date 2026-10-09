# Batch 04 — Binary & Subnetting acceptance evidence

Reviewed 4 October 2026. Direct implementation and review; no GapCode or other workers.

## Scope

Eight original topics (`s0-g3-t0` through `s0-g3-t7`) cover Binary, Decimal, Hexadecimal, IPv4, IPv6, CIDR, VLSM and subnet calculation. The original `lab-0` is an integrated foundation lesson with a downloadable executable virtual LAN variant. The physical two-PC/managed-switch exercise is retained as a separately authorized hardware variant, not claimed as executed.

All nine units contain the complete reusable lesson structure, platform-labelled commands, comparison tables, mechanism steppers, six-stage troubleshooting, security/performance context, labs, references and original assessments. Batch contribution: 90 exam questions, 27 quick checks and nine labs. At acceptance the course has 31 authored/reviewed original nodes, 310 exam questions, 93 quick checks and 31 labs. The original 442 progress-bearing IDs remain intact.

## Technical review

- Binary distinguishes pattern count from maximum unsigned value; decimal treats dotted IPv4 as structured octets, not a floating-point number. Hex preserves nibble/hextet meaning and distinguishes representation from protocol semantics.
- IPv4 address/prefix/route roles are separate. RFC 1918 is not equated with all non-global space; IANA special-purpose classifications remain authoritative.
- IPv6 normalization follows lowercase, longest-zero-run, first-tie and no-single-zero canonical compression rules. The widget deliberately excludes dotted IPv4 tails, zone IDs and prefix suffixes. IPv6 has no broadcast; RA/default-router discovery is distinct from DHCPv6.
- CIDR requires aligned contiguous prefixes. Longest-prefix matching is not confused with equal-prefix route preference. VLSM retains request identity and rejects an entire infeasible plan.
- Subnet arithmetic covers /0 through /32 without signed shifts. /31 has an explicit supported point-to-point interpretation; /32 is one address. Candidate counts do not claim ownership, reachability, special-purpose assignability or platform-specific usable capacity.
- Command execution caught and corrected a hand-calculated IPv4 integer: 192.0.2.1 is 3,221,225,985. The corrected lesson and expected outputs pass independent execution.

## Verification

| Check | Evidence |
|---|---|
| Preserved source, IDs, assignments, lesson/question contracts, artifacts and cross-links | `node tests/content.cjs` passes for 31 units |
| Octet model | 768 conversions across 256 values and three bases |
| IPv4 model | 4,389 deterministic vectors compared with Python `ipaddress`, covering every /0–/32 prefix |
| IPv6 model | 134 independent parser/normalizer reference vectors plus invalid-form rejection |
| Allocation model | 250 demand-size cases, exact three-subnet plan, reordering, capacity/alignment rejection |
| Invalid address/model inputs | 33 counted rejection cases, plus octet cases and browser stale-output checks |
| New lesson commands | All 16 exact calculation/read-only command blocks pass |
| New browser suite | 19 checks pass at 1440, 768, 390 and 320px, including direct-file operation |
| Earlier browser regression suites | 18 + 13 + 17 checks pass after successor/pending-route fixtures advance to OSI |
| Foundation executable lab | Seven verifier checks pass, including normal and early-failure cleanup and unchanged host routes/interfaces |
| Scheduled broader audit | Eight cross-course audit checks pass; see `quality-audit-batch-04.json` |

Machine-readable results: [address models](address-model-results.json), [commands](commands-batch-04.json), [browser](browser-results-batch-04.json), [foundation lab](foundation-lab-results.json), [broader audit](quality-audit-batch-04.json).

## Isolated LAN experiment

The actual run used Ubuntu-24.04 under WSL2 with root namespace capability. It created four uniquely named owned namespaces, a bridge and three veth pairs wholly within the lab. PC-A .10/27, PC-B .20/27 and gateway .1/27 passed bidirectional peer and gateway-address probes. Changing only PC-B to /28 made its route lookup and peer probe fail as expected. Restoring /27 recovered all four baseline paths.

The verifier compared the host link inventory, IPv4/IPv6 routes and existing named namespaces before and after; they were unchanged. It also executed an in-memory copy with an early exit after namespace creation and confirmed the EXIT trap removed those owned resources. The saved runner was not modified by this failure test. Raw host network inventory is not retained in evidence.

This validates the virtual network experiment, not physical media, hardware-switch configuration, RF behavior, external routing, DNS or throughput. The gateway namespace supplies an address to reach and has no external forwarding path. Uncatchable process termination or host failure can still prevent a shell cleanup trap from running; the lesson explains scoped recovery inspection.

## Visual and broader audit

Inspected octet, subnet, IPv6 and allocation screenshots in `screenshots/batch-04/`, including dark/mobile views. A 320px IPv6 prose overflow was fixed by allowing long address text to wrap. Input errors hide stale outputs, bit toggles have accessible names/states, prefix bits carry N/H labels, and every model has a static explanation.

The broader audit traversed all 31 authored routes: no duplicate DOM IDs, unlabeled form controls, unnamed buttons, missing section anchors or page exceptions. Prerequisites are acyclic and taught; exam prompts are distinct within each ten-question set. Core text color tokens meet 4.5:1 on the three principal backgrounds in both themes. These are scoped automated checks and screenshot review, not complete WCAG certification.

Local Edge search for “route” completed in 141 ms in the recorded run, including debounce. The catalog was approximately 252 KB uncompressed and only the selected lesson bundle loaded initially. This is a local baseline, not a slow-network/mobile-device performance guarantee. Revisit catalog partitioning as content grows; do not eagerly load all bundles.

## Continuation

After acceptance: 31 of 442 original nodes complete, 411 remaining. Supporting items (84) and expansion nodes (15) remain separately pending. Next is Batch 05, beginning `s1-g0-t0` (OSI Model). The broader audit due after Batch 04 has been performed; next planned checkpoint is after Batch 08 or sooner if growth/regressions warrant it.
