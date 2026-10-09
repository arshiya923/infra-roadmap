# OSPF LSA draft and header inspector — 2026-10-09

Open [OSPF LSA basics](../learn.html#lesson=s3-g1-t3). The original topic now has ten reader sections, a four-step mechanism, eighteen comparison cases, seven preserved actual database views, scoped lab instructions, ten exams and three quick checks. There are 103 authored lessons, 1,030 exams, 309 quick checks and 95 accepted original nodes. Eight Batch 09 drafts are reviewed; twelve topics and all thirteen full-batch gates remain pending. Next authoring is EIGRP.

## Comparison contract

`scripts/ospf-lsa-models.js` exports `scenario`, `compare`, `describe`, `html` and `mount`. It accepts otherwise valid ordinary OSPFv2 headers in one assumed process. Supported types are 1/2/3/4/5/7. Canonical IPv4 identity fields, eight hexadecimal sequence digits, four nonzero hexadecimal checksum digits and integer ages 0–3600 are required. Sequence 80000000 is reserved. Area-specific objects require the same area; type 5 uses domain scope.

Identity and scope must match before signed sequence, unsigned checksum, exactly-one-MaxAge and age dispersion greater than 900 seconds are evaluated, in that order. A 900-second difference is equivalent freshness; 901 can decide. Maximum sequence requires protocol flushing and acknowledgment before restarting. The result does not compute a checksum, validate a body, transmit an LSA, simulate flooding or timers, select a route or prove service delivery. MaxAge can win recency while being excluded from route calculations. DoNotAge, opaque extensions and OSPFv3 are outside this exercise.

The primary review checked [RFC 2328 sections 12–14 and Appendix A/B](https://www.rfc-editor.org/rfc/rfc2328), [RFC 3101 NSSA scope](https://www.rfc-editor.org/rfc/rfc3101) and [Cisco database inspection syntax](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-s1.html), on 2026-10-09. The source-based type-4/5/7 descriptions are separate from actual type-1/2/3 evidence.

## Preserved actual evidence

`tools/build-ospf-lsa-evidence.py` reads passing [Areas reports](ospf-areas-lab-results.json) and [broadcast reports](ospf-dr-bdr-lab-results.json), records their SHA-256 hashes and copies observed header fields into `content/ospf-lsa-evidence.js`. Four Areas observer/area views and three broadcast phase views retain separate experiment identity. Fixed router IDs shared across those experiments do not form one combined database. Header count can change when an old network LSA remains retained; it is not a fixed protocol requirement.

The [evidence verifier](ospf-lsa-evidence-results.json) checks each copied field against raw reports, source hashes, foreign-area exclusions, opposite-LAN summaries and current-DR detailed network-LSA identity. Snapshot ages are collection observations, not an aging trace. Existing lab verifiers independently check routes, kernel forwarding, settled ICMP, capture scope and normal/partial-start cleanup. No new network experiment or external/NSSA/MaxAge injection is claimed.

Five Cisco inspection blocks are guided and unexecuted. The private preparation reference and two actual lab references reuse existing verified experiments, run sequentially. See [Areas runtime](ospf-areas-runtime-foundation.md) and [broadcast runtime](ospf-dr-bdr-runtime-foundation.md) for requirements and exact owned cleanup.

## Verification

The [model report](ospf-lsa-model-results.json) records 279,936 comparisons against an independent binary signed/unsigned oracle and eighteen authored cases. The [browser report](browser-ospf-lsa-results.json) records nine checks covering cases, strict controls, invalid/stale output, snapshots, downloads, navigation, exam feedback, four widths, both themes, keyboard scrolling, mechanism motion and direct-file execution. Twelve screenshots were manually inspected. Wide header/trace/evidence/lab content stays inside named scrolling regions.

Run `python tools/regression-batch-09.py` with the documented Playwright Node module path. It runs actual labs sequentially, rebuilds the fixture from fresh reports and checks every authored route. See [regression evidence](batch-09-regression-results.json), [topic review](review-batch-09.json), [question review](exam-review-batch-09.json), [command classifications](commands-results-batch-09.json) and [checkpoint checks](ospf-lsa-checkpoint-results.json). Full Batch 09 acceptance remains pending; learner checkmarks are independent. No GapCode was used.
