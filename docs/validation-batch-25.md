# Cisco Device Mastery — Batch 25 verification

Scope: all 17 original `device-0` through `device-16` lessons, written directly without GapCode. The editorial acceptance record is [acceptance-batch-25.json](acceptance-batch-25.json); learner study checkmarks remain independent.

## Delivered material

Each device family has a scoped definition, component comparison, four-step mechanism with static explanation, original incident, guided observations, configuration and rollback guidance, security/performance discussion, lab procedure, three quick checks and ten original written-response exams. The 170 exams and 51 quick checks use explicit self-assessment, not automatic grading of free text.

The [downloadable workbook](../labs/device-mastery-workbook.md) preserves all 17 baseline/fault/recovery cases. Browser incident controls reveal authored reasoning. The separate [Python worksheet](../labs/device-preflight.py) evaluates five supplied evidence gates with pass/fail/unknown values; it does not discover compatibility or access a device.

## Verification evidence

- `node tests/device-mastery.cjs`: 508 checks, including all 243 three-valued gate combinations in JavaScript, 243 Python comparisons, rejected malformed inputs and 17 lesson contracts. See [results](device-mastery-results.json).
- `node tests/browser-devices.cjs`: all 17 routes, all 221 assessment feedback paths, baseline/fault/recovery controls, unknown/failure blocking, reset, keyboard activation, reduced-motion behavior, clipboard, downloaded workbook bytes and direct-file loading. Layout checks cover 1440, 768, 390 and 320 pixels in both themes. See [browser results](browser-devices-results.json).
- `node tools/audit-devices.cjs`: the existing shared course audit with route diagnostics and a dedicated report path. It checks prerequisites, distinct exam prompts, content structure, lazy loading, every authored route, navigation, labelled controls, core contrast tokens and search. See [full-course audit](quality-audit-devices.json).
- `node tests/content.cjs`: original ID coverage, immutable source hash, lesson/question contracts, local artifacts and catalog consistency.
- Six contact sheets contain 51 actual desktop, mobile and mechanism captures. Primary inspection and content fingerprints are recorded in [the primary review](device-primary-review.json). The first visual pass prompted larger, vertically aligned controls and device-specific diagram labels; the final captures reflect those changes.

The first broad runs and final device route encountered transient missing-module errors while other work in the shared checkout was adding reader modules. Fresh runs after those modules were present provide the acceptance evidence; the earlier failures are not counted as passes.

## Source and execution limits

[Research notes](research-batch-25.md) explain reference versions, stale-link replacements and direct-client Cisco 403 responses. The research browser opened the retained official documents. Historical manuals are explicitly scoped and are not current lifecycle or procurement recommendations.

No Cisco target was executed. CLI parsing, real device configuration/rollback, stack failover, PoE delivery, RF propagation, firewall deployment, convergence, throughput and SAN I/O remain guided and unverified. The offline worksheet is a calculation over declarations, not an emulator. Local Edge checks are not a full screen-reader or WCAG certification. Acceptance covers this teaching scope only.
