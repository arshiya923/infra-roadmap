# Physical Hardware — Batch 26

Scope: the 20 original `hardware-0` through `hardware-19` nodes. The primary assistant performed authorship, review and verification directly, without GapCode, at the user's request on 2026-10-09. Acceptance is recorded separately in `acceptance-batch-26.json` after the checks below pass.

Each lesson has an operational incident, a four-step mechanism flow, guided investigation and recovery criteria, a downloadable workbook, ten exams and three quick checks. Foundational teaching and bounded calculation tools are intentionally reused from accepted Data Center Foundations and Storage & Virtualization lessons. The source lesson is an explicit prerequisite. Seven foundation assessment items per lesson reinforce the underlying concepts; three incident questions add operational reasoning. These are course-authored questions, not vendor exam questions.

The source IDs, original HTML and learner progress format are preserved. Physical Hardware is requested out of editorial order; it does not require completion of the separate Cisco Device Mastery section. Its actual foundation prerequisites are already accepted. Concurrent work in other batches is outside this acceptance decision.

## Verification

- `node tests/content.cjs`: complete lesson contracts, 442 original identities, unique assessment IDs, valid local artifacts and immutable source hash.
- `node tests/physical-hardware-content.cjs`: exact 20-node coverage, accepted prerequisites, 260 assessments, incident integration, content hashes and an explicit command allowlist. Nine unique local commands execute; `show zoneset active` remains guided and unexecuted.
- `node tests/data-center-models.cjs`: 68,178 model checks, including capacity arithmetic, power conditions and interval/failure boundaries.
- `node tests/storage-virtualization-models.cjs`: 6,718 model checks, including the shared array/two-fabric access predicate.
- `node tests/browser-physical-hardware.cjs`: all 20 routes, 260 answer-feedback interactions, wrong-answer feedback where multiple choice is present, keyboard controls, reduced motion, clipboard, workbook downloads, independent study/editorial state, four widths in both themes and fresh-context direct-file loading. Desktop, phone and flow screenshots are retained under `screenshots/physical-hardware/`.
- `node tests/quality-audit.cjs`: broader authored-route navigation, prerequisite graph, accessible control names, duplicate IDs, contrast, lazy bundle loading and local search. The latest report includes concurrent authored batches and does not accept them.

The first broad audit returned a NaN contrast reading; an unchanged rerun passed. The first focused browser run timed out loading the UPS worksheet in a fresh file context; an independent direct-file reproduction succeeded. Acceptance requires a complete passing rerun, not those failed attempts. The precise cause of these transient failures was not established.

## Sources and applicability

Existing primary references remain attached to the reused foundations. Additional vendor references are attached directly to ProLiant, PowerEdge, UCS, MSA, Dell EMC and NetApp lessons. The examples identify their platform scope: ProLiant DL380 Gen10, PowerEdge T550, UCS standalone/managed ownership, historical MSA 2040 configuration, PowerStore host mapping and ONTAP igroups. They do not establish support for an arbitrary newer model or release.

The Cisco ownership overview, Dell manual and PowerStore mapping page, and ONTAP igroup article were readable during research. HPE documentation pages were indexed but returned no extractable body through the browsing tool; the MSA 1060/2060/2062 PDF attempt was inaccessible. No procedure or model-specific compatibility matrix from that PDF is claimed as verified. HPE examples therefore require the exact installed-platform manual for any target work. Source dates indicate this bounded reference check, not live equipment validation.

## Execution limits

The workbook contains authored tabletop cases. Browser inputs predict conditional outcomes; they do not discover equipment or execute hardware faults. `lscpu` observes the WSL virtual CPU environment. Workbook hashes verify local bytes. Storage evidence commands print authored foundation records. These results do not establish physical inventory, SAN login, application I/O, UPS transfer/runtime, sensor calibration or cooling performance.

No server, array, SAN switch, UPS, PDU or management-controller configuration was performed. Vendor CLI/API operations, physical replacement and service recovery remain guided and unexecuted. A model reset is not a device rollback. Electrical installation and load approval remain outside the course's executed scope.
