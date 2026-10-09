# Batch 10 multicast staged implementation evidence

Date: 2026-10-09. Owned multicast writes: `staging/multicast/**` only. No integration or acceptance is claimed. No routing daemon, network configuration, join/report/query, packet generator or target command was run.

## Files and interfaces

- `lessons.json`: three complete lessons `s3-g8-t0` Multicast fundamentals, `s3-g8-t1` PIM and `s3-g8-t2` IGMP. Each includes 10 four-option MCQs with exact answer strings, 3 quick checks, 4 flow pairs, three-column comparisons, four guided read-only command groups, glossary object, meaningful operational sections and full shared-topology tabletop lab.
- `lesson-source.cjs`: authored reproducible source for the JSON. Run `node staging/multicast/lesson-source.cjs` to regenerate it. No external content fetch or app runtime dependency is involved.
- Assessment option order rotates deterministically per question index modulo four; each lesson's correct-answer positions are `0,1,2,3,0,1,2,3,0,1`. Existing answers, explanations and other lesson fields are preserved. The test suite asserts the position rule.
- `model.js`: CommonJS and browser `window.MulticastModels`. API: `kinds`, `catalog(kind)`, `preset(kind,id)`, `evaluate(kind,state)`, `html(kind)` and `mount(kind)`. Kinds are `multicast-fundamentals`, `pim`, `igmp`; IDs use `mc`, `pm`, `ig` respectively. Unknown evaluate/catalog kinds or presets throw; unrelated HTML returns empty and mount does nothing.
- `model.test.cjs`: fixed preset outcomes, independent cross-product oracles, strict validation, schema/narrative/original-link checks, browser-export and mounted DOM validation/reset harness.
- `style.css`: controls scoped to the worksheet family, wide tables in named focusable `.en-scroll` regions, visible validation and hidden stale output.

## Supplied-state model limits

The source is fixed to `192.0.2.10`. ASM group is `239.1.1.1`, SSM group `232.1.1.1`; neither group is automatically allocated or authorized by the worksheet. `shared` context points RPF toward supplied RP `192.0.2.254`; `source` context points toward the source. SSM/shared input is incompatible and rejected. RPF route availability and expected ingress are declarations, not computed destination lookups. Expected ingress allows `up-a` or `up-b`; actual ingress additionally allows the two downstream names to expose wrong arrivals. TTL is a strict number/integer 0..255; this routed hop requires >1.

Fundamentals computes hypothetical copies using declared RPF, TTL, OIL membership, settled local demand and downstream readiness. The two fixed downstreams serve local attached receiver LANs. This is not the universal PIM transit OIL rule: a real transit interface can have downstream PIM demand without a local IGMP host. No PIM tree construction or forwarding installation is calculated.

PIM adds declared selected-tree state. Selected ASM shared context requires the RP readiness gate. ASM source context does not use that gate. SSM source context instead requires the declared source-specific receiver gate and does not require RP readiness. No neighbor, DR, Register, Register-Stop, Join/Prune, Assert, RP discovery, SPT transition or timer FSM is implemented. Output describes the supplied selected context rather than deriving a complete multicast forwarding state machine.

IGMP compares two supplied settled host cards on one attached LAN for the two fixed sources `192.0.2.10` and `.20`. INCLUDE accepts listed sources; EXCLUDE accepts unlisted sources. Demand is the union across usable hosts, not an intersection. Validity and timer liveness are explicit booleans. Querier absence is displayed and does not infer instant expiry. SSM requires INCLUDE reporting for the modeled demand. This is not router group/source filter-state synthesis, report processing, timer progression, querier election, compatibility, a switch snooping engine or an authorization system. The host card source list cap is eight entries before deduplication, solely a worksheet limit.

All kinds preserve independent original source and receiver application readiness. Readiness agreement does not prove source traffic, an emitted copy, router installation or service delivery. The IGMP readiness indicator specifically concerns original source `.10`; source `.20` acceptance remains a demand result with no independent transmission measurement.

## Executed evidence

Node.js v25.2.1, workspace working directory:

```text
node staging/multicast/lesson-source.cjs
s3-g8-t0: 2242 narrative words excluding assessments/sources/glossary/links
s3-g8-t1: 2259 narrative words excluding assessments/sources/glossary/links
s3-g8-t2: 2371 narrative words excluding assessments/sources/glossary/links

node staging/multicast/model.test.cjs
PASS: 40 fixed preset oracles; 221184 independent ingress/TTL/OIL/context cases; 16384 settled filter/union cases; 3 schema/narrative/link checks; strict invalid input; mounted stale-output hiding and reset.
```

The forwarding oracle uses a literal context prerequisite bit table and independent interface masks across three valid contexts, four arrivals, four TTL boundaries, nine boolean gates and the three PIM context gates. The host oracle uses source-set bit masks to calculate settled INCLUDE/EXCLUDE acceptance and union independently across all two-host combinations, mode and readiness observations. Fixed per-preset outcomes supply a second oracle for the 13 fundamentals, 14 PIM and 13 IGMP scenarios.

Lesson checks compare required keys/shapes with existing batch 09, omitting the unrelated optional `artifacts` key rather than inventing nonexistent artifacts. They check the original inventory and require every prerequisite to have already been authored (earlier batches or the previous staged lesson). Narrative length excludes assessments and source/link/glossary fields and is comfortably over 1,000 words per topic.

Mounted minimal-DOM tests prove browser namespace registration, initial output, unknown scenario followed by later control input remaining hidden, malformed source or empty numeric input followed by later changes remaining hidden, and reset recovery. Dynamic results use `textContent`; no `innerHTML` assignments occur. Native button reset and named focusable scroll regions support accessibility. Actual keyboard activation, browser screenshots, narrow layouts and integrated lesson rendering remain primary-assistant verification work; the DOM harness is not a browser acceptance claim.

## Official source checks

Browser-opened/inspected on 2026-10-09:

- [RFC 1112](https://www.rfc-editor.org/rfc/rfc1112.html): IPv4 multicast host service and group range.
- [RFC 2365](https://www.rfc-editor.org/rfc/rfc2365.html): administratively scoped multicast context.
- [RFC 1812](https://www.rfc-editor.org/rfc/rfc1812.html), TTL sections: eight-bit field and routed decrement. Local receipt versus routed forwarding is deliberately distinguished in the lesson.
- [RFC 7761](https://www.rfc-editor.org/rfc/rfc7761), protocol overview, SSM and packet formats: shared/source context, route-information dependence and IP protocol 103/link-local all-PIM-routers address.
- [RFC 8736](https://www.rfc-editor.org/rfc/rfc8736) and [RFC 9436](https://www.rfc-editor.org/rfc/rfc9436): update history preserved; RFC 9436 obsoletes RFC 8736. Header extensions are outside this worksheet.
- [RFC 4607](https://www.rfc-editor.org/rfc/rfc4607.html): SSM channel and 232/8, source-specific receiver requirements and no shared RP-tree requirement. The initial non-HTML URL returned an internal browser error; the official `.html` URL was successfully inspected.
- [RFC 9776](https://www.rfc-editor.org/rfc/rfc9776): current IGMPv3 specification, obsoletes RFC 3376 and updates RFC 2236; host filter meanings, router timer distinctions, IP protocol 2 and v3 query/report destinations.
- [RFC 4604](https://www.rfc-editor.org/rfc/rfc4604): concrete SSM-aware IGMP source-specific reporting guidance, supplementing RFC 4607 and the current IGMPv3 reference.
- [RFC 2236](https://www.rfc-editor.org/rfc/rfc2236), message destinations: historical v2 reports to the reported group and leaves to 224.0.0.2, clearly labeled version-specific.
- [FRRouting stable 8.4 PIM documentation](https://docs.frrouting.org/en/stable-8.4/pim.html), Show PIM Information: exact documented show command groups used in all lessons. `show ip mroute` concerns kernel multicast state; `show ip multicast count` concerns per-interface packet counters; the lessons never fabricate either output. Separate `ip pim` and `ip igmp` participation and target version scope are documented.

Every command block says GUIDED, NOT EXECUTED. The commands are plain show operations; no `fill`, join, query generation, mtrace, configuration or traffic command is included. Final content/source review, integration and actual browser acceptance belong to the primary assistant.
