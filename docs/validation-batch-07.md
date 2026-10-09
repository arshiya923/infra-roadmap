# Batch 07 acceptance - 2026-10-09

**Accepted: all 21 Batch 07 lessons. Overall editorial progress: 82/442 original nodes; 820 exams and 246 quick checks.** Batch 08 is next, beginning with STP (`s2-g4-t0`); it has no accepted or authored lessons yet.

The original 22-item Topic Completion Definition and all 13 Batch gates are recorded in [the acceptance matrix](acceptance-batch-07.json). Technical/prose/lab review, source applicability and manual inspection of all flow diagrams and lab paths are recorded in [the review](review-batch-07.json). All 210 exam answers/explanations were reviewed; 42 prompts were revised while retaining IDs.

The final accepted-state `node tests/verify-batch-07.cjs` run passed **21 suites**, including all 21 animation/pause/reset/reduced-motion/static-sequence/connection routes and all 21 Batch 07 mobile flow routes plus CPU in both zoom states. Existing focused suites test the seven slices at four widths and now verify editorial review complete and 82/442. The full 82-route quality audit and original hash/ID contracts pass. The initial expanded flow test hit the default subprocess buffer limit; an explicit bounded 8 MiB buffer fixed the test harness before this passing run.

Review improvements include correct EXEC exit/disable behavior, exact switch bootloader help context, active-step visibility on narrow screens, local hash exit outcomes, a worked RPO/RTO recovery timeline, 802.1Q field decoding and a guided two-peer LACP preparation/activation sequence. Manual inspection includes scrolling lab endpoints and narrow command/example views.

Actual local byte comparison and isolated Linux VLAN membership/fault/recovery/cleanup are verified. **Actual Cisco parser, firmware, boot/install/recovery, control protocols, aggregation, physical phone/QoS, vendor hashing, throughput and convergence remain unexecuted.** Vendor commands are guided, with prerequisites and rollback. Appropriate guided/model/tabletop labs meet the original specification within their stated scope; they do not establish real device behavior. Automated accessibility checks supplement manual views and do not certify WCAG compliance.

## Historical draft checkpoints

The records below retain their counts and pending status at the time of each checkpoint; the acceptance decision above supersedes them.

# Batch 07 validation checkpoint

Reviewed 2026-10-09. **Twenty-one draft nodes, no Batch 07 editorial acceptance.** Overall: 82 authored units, 820 original exam questions, 246 quick checks; 61 accepted original nodes out of 442. All 21 Batch 07 nodes are authored. Next: full Batch 07 technical/editorial review against the original Topic and Batch Definitions of Done. Do not start Batch 08 yet.

Drafts cover IOS/IOS XE, CLI structure, running/startup configuration, configuration register, ROMMON, boot process, file systems, flash management, IOS images, install/bundle and device backup/recovery, VLAN, access/trunk ports, DTP, VTP, voice VLAN, EtherChannel, LACP and PAgP. Each has ten sections, three quick checks, ten distinct exams, sources, diagrams and a scoped lab. Original source/IDs and independent learner storage are preserved.

## Executed evidence

Latest review checkpoint: `docs/review-batch-07.json` records technical/lab review of the first seven units and the remaining fourteen-unit and complete manual-render review scope. After the CLI/session, bootstrap-label and shared flow fixes, `node tests/verify-batch-07.cjs` passed all twenty suites with exit code zero. Per-suite output is saved in `batch-07-regression-results.json`. This supersedes the earlier nineteen-suite regression checkpoint below without changing accepted coverage.

The CLI regression failed before correction: privileged EXEC `exit` incorrectly changed the represented level. It now gives a session-ending explanation while retaining the browser exercise; `disable` changes the level. The lesson and lab teach that distinction. The mobile flow regression also failed before correction: the highlighted step could lie outside the viewport. Step changes and zoom now keep it visible. Eight selected routes pass forward/backward keyboard and bounding-box checks at 320 pixels in both zoom states. Representative screenshots were inspected; complete manual review remains pending.

- `tests/content.cjs`: PASS, 82/820/246 contracts, 442 IDs and 69 groups. Original SHA-256 remains `ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25`.
- CLI/register model evidence covers 28 command steps and all 65,536 selected-field values. Authored teaching behavior only, no Cisco parser or firmware execution.
- `tests/storage-models.cjs`: PASS, independent arithmetic, protected dependencies/retention, duplicates, unknown requirements, invalid input and isolated results.
- `tests/image-audit.py`: PASS on Windows and WSL Linux. Multi-block independent bytes, uppercase expectation, same-size mutation/mismatch exit, invalid/access cases, binary read-only access, unchanged input bytes/mtime, inert help and cleanup after normal/injected failure. Linux also rejects a FIFO before blocking. Saved in `image-audit-results.json`.
- `tests/browser-storage.cjs`: PASS, six checks across three routes: contracts, draft/61 accepted state, four widths (1440/768/390/320), keyboard controls, protected categories, unknown estimates/reset, direct-file operation, exact downloaded script bytes and quiz feedback. Mobile light/dark screenshots visually inspected.
- `tests/browser-batch-07.cjs`: PASS, 17 checks for CLI/boot behavior and original adjacency into newly authored storage.
- `tests/browser.cjs`: PASS, 18 general regressions; pending fixture is now STP.
- `tests/quality-audit.cjs`: PASS, nine checks across 82 routes: prerequisite graph, distinct exams, named controls, unique DOM IDs/anchors, original footer adjacency, core contrast, selected-bundle loading and no page exceptions. Local search 140 ms. Scoped local audit, not full accessibility certification.

Concurrent browser execution initially produced a 320-pixel overflow assertion in an existing CLI route and a connection-refused failure. Both affected suites passed fresh sequential runs. Do not report concurrent execution as passing. A documentation extraction command failed on Windows default decoding; explicit UTF-8 fixed extraction before saved evidence.

## Technical boundaries

VLAN/control review checkpoint: eighteen of twenty-one lessons now have technical/lab review records. EtherChannel, LACP and PAgP plus complete batch visual/acceptance review remain. The shared switching command helper no longer repeats its guided scope. The trunk lesson now shows the single-tag field order and a worked TPID 0x8100 / TCI 0xA00A decode: PCP 5, DEI 0, VID 10. Its arithmetic was checked independently; this adds teaching detail without changing the forwarding model.

Fresh checks after those edits: 4,608 ordinary-frame model cases, 72 DTP role/context states, fifteen isolated evidence cases, six port-browser checks, seven control-browser checks, real isolated Linux VLAN baseline/isolation/fault/recovery and normal/injected cleanup, and the nine-check audit across 82 routes all passed. Host interfaces and IPv4/IPv6 routes remained unchanged. Search measured 151 ms. Six flow diagrams, six lab paths (including scrolled long-path ends), the tag table/example and representative mobile controls were manually inspected. Actual Cisco protocol, phone and native-tag behavior remain unexecuted.

Storage/image/install/recovery review checkpoint: the first twelve lessons now have technical/lab review records in `review-batch-07.json`. Nine switching/aggregation lessons and complete batch manual visual/Definition of Done review remain. No new editorial acceptance.

The image lab now asks learners to classify the actual 0/1/2 result rather than assuming a trusted comparison always mismatches. The recovery lesson adds a worked tabletop: 09:56 configuration snapshot, 10:00 failure, 10:08 prompt and 10:18 successful service probe. A four-minute configuration-state loss window meets the authored five-minute RPO; eighteen-minute service recovery misses the fifteen-minute RTO by three minutes. The case does not establish protection of application data or actual Cisco restoration.

After these content edits, content contracts, six storage browser checks, six lifecycle browser checks and the nine-check audit across all 82 routes passed. Search measured 158 ms. The unchanged lifecycle model and Windows hash CLI also passed during this review. Five flow diagrams, five lab paths and the mobile worked example were visually inspected from screenshots in `screenshots/batch-07/review/`. This is separate from the preceding twenty-suite full regression run; no new full-suite run is claimed for this copy-only checkpoint.

CLI exercises support a limited mode/configuration subset with explicit merge/save behavior. The register decoder interprets bits 3-0 and bit 6 only and declines router interpretation for Catalyst 9000/8000V. Boot cases separate artifacts, policy, configuration and services. No model measures boot time or convergence.

The synthetic planner uses 3,200 decimal MB total and 2,301 MB occupied, leaving 899 MB. Its authored peak additional estimate is 1,100 MB. Only a reviewed 400 MB stale copy is eligible, yielding 1,299 hypothetical MB. Active manifest/packages, rollback, unexported evidence and unknown dependencies remain protected. Unknown requirements suppress readiness. No real files are inspected/deleted and no deletion commands are generated. These are not Cisco platform requirements.

The Python lab hashes temporary teaching bytes or a learner-selected regular file read-only. A match establishes agreement with the supplied SHA-512 expectation under observed metadata checks. It does not authenticate Cisco, establish compatibility, guarantee an immutable snapshot, inspect runtime memory or execute software. Expected-value trust, supported signature validation, installation, running identity and services remain separate.

Vendor commands remain GUIDED_NOT_EXECUTED in `commands-results-batch-07.json`. Actual Cisco storage, digital signatures, cleanup, installation, boot/recovery and forwarding remain unexecuted; no image download or remote discovery was performed. Full source/content/lab review remains required for batch acceptance. Vendor execution stays an explicit evidence limit. Sources/applicability are in `research-batch-07.md`. Continue directly without GapCode under the active usage-bounded goal.

## Install and backup slice — 2026-10-09

`tests/lifecycle-models.cjs`: PASS for all 64 independent mode/reference/presence states, five isolated recovery cases and invalid states. `tests/browser-lifecycle.cjs`: PASS, six checks across both new routes, contracts, four widths, keyboard changes/reset, scoped reveal/hide, quiz, original next-pending VLAN navigation, direct-file behavior and mobile screenshots (visually inspected). General browser and storage suites pass fresh sequential runs after integration.

Dependency completeness is not real boot success. A staged .bin does not identify current mode; a manifest needs referenced packages. Recovery cases separate local persistence, failed retrieval validation, merge residue, service failure and a successful scoped synthetic drill. Actual Cisco install/export/replacement/restore remains unexecuted. The lesson identifies externally retained dependencies, protected transfer/storage, independent access, restoration semantics and original service verification.

The bundle bulletin's generic introduction-history statement conflicts with older exact-platform install procedures. No universal introduction date is taught. The announced lifecycle transition is scoped to current notice/product/release applicability. Source ledger records the discrepancy and the backup-specific primary references. Next authoring: VLAN, access/trunk ports and switching control protocols.

## VLAN/access/trunk slice - 2026-10-09

`tests/port-models.cjs`: PASS for 4,608 selected ordinary-frame states against independent wire/classification/membership/destination expectations, including native reclassification and shared native-tag policy; invalid contexts rejected. `tests/browser-ports.cjs`: PASS, six checks for the three draft contracts, four widths, keyboard/reset, both membership checkpoints, native-mismatch warning even with unintended eligible delivery, quiz, direct-file operation and exact LF shell download. Light/dark mobile screenshots visually inspected.

`tests/vlan-lab.cjs`: fresh PASS for real Linux same-domain delivery and cross-domain isolation with deliberately matching IP prefixes; missing trunk VLAN with link UP; repair; normal and injected early-failure cleanup; unchanged host interface and IPv4/IPv6 route inventory. It reuses the reviewed runner unchanged. Actual Cisco VLAN database, access/trunk parser, tag policy, DTP/VTP and physical hardware remain unexecuted.

The browser assumes active VLANs, a known eligible destination and forwarding ports. It excludes control-protocol inconsistency handling; real switches can block a native/PVID inconsistency. A model's possible cross-domain eligibility is a segmentation defect under its assumptions, not a prediction that every Cisco mismatch forwards. Source applicability is retained in the research ledger. General browser and lifecycle regressions pass after integration; original adjacent navigation now reaches pending DTP.

## DTP/VTP/voice slice - 2026-10-09

`tests/vlan-control-models.cjs`: PASS for all 72 valid fixed/dynamic mode, suppression and established-domain combinations against an independent expected-role table; ten isolated authored cases; unsupported dynamic suppression and invalid selectors rejected. `tests/browser-vlan-control.cjs`: PASS, seven checks across the three routes, contracts, four widths, keyboard, disabled flags/reset, scoped case disclosure, quizzes, original next-pending EtherChannel navigation, direct-file behavior and mobile screenshots (visually inspected). Global 79-route audit passes; general browser and preceding port suite pass after integration.

DTP fixed local role is separate from negotiation and peer agreement. A matching established-domain context is modeled as a dynamic-negotiation prerequisite, without claiming real domain learning. VTP legacy revision-risk cases are explicitly VTP 2 under matching accepted context; VTP 3 primary authority is not reduced to a generic highest-revision rule. Transparent forwarding is scoped to an eligible matching case and version/platform rules; off is distinct. Database consistency does not establish data carriage.

Voice examples distinguish ordinary PC data, separate tagged phone traffic, unavailable VLAN/path, policy not learned and alternate/priority framing outside the exercise. Phone power, CDP/LLDP-MED, QoS, provisioning, registration and media are not executed. Guided voice configuration is partial role intent and references the supported prerequisites. No actual DTP/VTP frame, database update, pruning, takeover or Cisco device command is claimed. Three aggregation nodes remain before full Batch 07 draft review.

## EtherChannel slice - 2026-10-09

One additional draft makes 80 authored units and nineteen Batch 07 drafts. `tests/vlan-control-models.cjs` now passes 72 independent DTP role/domain states and fifteen isolated evidence cases, including five aggregation cases. `tests/browser-channel.cjs` passes five checks: complete draft contracts and four widths, keyboard selection/disclosure/reset, quiz and original adjacency into pending LACP, direct-file operation and mobile layout. Current channel and DTP mobile screenshots were visually inspected. The general 18-check browser suite, seven-check VLAN-control suite and nine-check global audit across all 80 routes passed sequentially. Search measured 145 ms locally.

The aggregation exercise separates nominal two-member capacity, selected single-member flow assignment, one-member remainder without minimum-two policy, explicit LACP minimum-two failure, uneven assignment and missing VLAN carriage. Cases present authored observations; there is no simulated Cisco output, vendor hash computation, traffic measurement, control-frame transmission or actual failure timer. The lesson includes guided read-only inspection, two-peer consistency, supported role/method selection, actual member flags and service-based acceptance criteria. It does not configure or shut down a target.

Actual Cisco grouping, hardware/member eligibility, throughput and loss/convergence remain GUIDED_NOT_EXECUTED. Keep Batch 07 unaccepted. Next authoring: LACP, then PAgP, followed by full draft review with execution limits retained.

## LACP/PAgP slice - 2026-10-09

`tests/aggregation-models.cjs`: PASS for 128 independent four-mode/three-prerequisite states, isolated returned reasons and invalid input. The first test invocation had a missing regular-expression slash in the test assertion; it was repaired before the saved passing run. `tests/browser-aggregation.cjs`: PASS, six checks across both routes: complete draft contracts, four widths, keyboard mode selection/reset, protocol/initiation/prerequisite distinctions, quizzes, original adjacency to pending STP, direct-file operation and mobile light/dark screenshots. Representative LACP light and PAgP dark screenshots were visually inspected; subsequent copy-only wording clarified that no exchange is assumed to have happened, and the suite regenerated screenshots and passed again.

The checker identifies selected necessary eligibility under stated carrier, settings and partner/group assumptions. It does not implement received packets, operational keys, synchronization/mux, collecting/distributing, standby selection, timers, hardware hashing or actual service. PAgP uses a normal responsive-peer context and explicitly excludes silent/non-silent partner behavior. The lesson separates PAgP desirable/auto from DTP terminology and LACP modes. The LACP lesson uses modern IEEE 802.1AX context with the older 802.3ad association stated historically.

`tests/browser-channel.cjs`: fresh five-check PASS with adjacency into authored LACP. `tests/browser.cjs`: fresh eighteen-check PASS. `tests/quality-audit.cjs`: fresh nine-check PASS across all 82 authored routes, local search 140 ms; this audit preceded a copy-only model disclaimer correction, then the affected six-check suite and 128-state model test passed again. Original source/IDs and accepted count 61 remain unchanged. All 21 draft nodes now exist; full content/source/question/lab review remains pending and no Batch 07 node has been promoted. Actual Cisco and special/fallback behavior remain unexecuted.

## Full-batch review in progress - 2026-10-09

All 210 current exam prompts, answers and explanations were inspected. The review found repetitive binary/model-limit prompts; 42 questions (two per lesson) were replaced with applied interpretation, calculations, state transitions and troubleshooting. Ten questions per lesson and the existing original topic/question IDs remain intact. Changes include selected register masks, running/startup copy direction and merge residue, decimal-MB capacity boundaries, hash result classes, member/path context, native reclassification, distribution versus authorization and aggregation member/threshold evidence. See `exam-review-batch-07.json` for every revised question and explicit pending review scope. This is editorial review, not certification-frequency or psychometric evidence.

`node tests/verify-batch-07.cjs`: PASS for all nineteen existing suites after the revisions. The runner checks child exit status and saves each full result in `batch-07-regression-results.json`; it performs no acceptance mutation. Coverage includes all seven model suites, content contracts, Windows byte-audit checks, real isolated Linux VLAN baseline/isolation/fault/recovery and cleanup, seven focused browser suites, general browser regressions and the full 82-route quality audit. The quality audit measured 162 ms local search. Actual Cisco procedures, protocol exchanges and physical phone/aggregation behavior remain unexecuted.

Documentation guard fixes: corrected the manifest's stale eighteen-draft statement to twenty-one; source/model and actual execution remain separate. Earlier wording that absence of Cisco execution itself prevents acceptance was too broad relative to the original Topic/Batch Definitions of Done. Those definitions require coherent applicable exercises and verified claims, without mandating physical Cisco execution for every topic. Full source/prose/lab/manual-render review is still pending, and no acceptance is asserted by this clarification. Do not start Batch 08 until the remaining review proves the original requirements.

Focused primary references reopened: Catalyst configuration-files guide and the current July 2026 Catalyst register-equivalence article. Their scopes support save direction and the switch/router policy distinction already taught. This is not a claim that every source or every prose field received a fresh full review in this pass.
