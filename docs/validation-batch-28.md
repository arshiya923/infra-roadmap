# Batch 28 — Enterprise architecture capstone

Accepted 2026-10-09 by the primary assistant, following the explicit request to complete Capstone without GapCode. This acceptance covers `capstone-final` only. Concurrent Batches 25–27 keep their independent reviews and status.

## Delivered

- Complete lesson with mechanisms, comparison, four-step visual/static explanation, procedures, troubleshooting, security/performance guidance and glossary.
- All 15 original engineering deliverables in the [worked workbook](../labs/capstone-workbook.md), with logical and physical path diagrams, addressing, VLAN/routing/policy tables, rack and server/storage design, HA, monitoring, backups, DR, automation, documentation and a defense rubric.
- Four supplied incident cases and an interactive capacity/RTO/RPO worksheet. Invalid input hides stale output; reset restores declared assumptions.
- Three original quick checks and ten original written exam questions, each with model answer, explanation and tested concept. These are self-assessed, not automatically graded written answers.
- [Executable local recovery](../labs/capstone-recovery.py), with actual SQLite backup, post-backup acknowledged write, logical corruption, restoration, row/digest/integrity comparison and owned cleanup.

## Verification

- [763 model checks and five actual local runs](capstone-results.json): independent capacity sums, recovery boundary vectors, invalid values, normal execution and four interrupted-cleanup paths. The workbook has exactly 15 numbered deliverables.
- [Focused browser report](browser-capstone-results.json): four keyboard-operated cases, budget changes, invalid inputs/reset, all 13 answer reveals, mechanism controls, reduced motion, exact clipboard text, two byte-equivalent downloads, learner/editorial separation, file URLs and widths 1440/768/390/320 in light/dark.
- [Full-course audit snapshot](quality-audit-batch-28.json): 442 authored routes, prerequisite availability/cycles, unique DOM identities, named controls, original adjacency, core contrast, local loading/search and no page exceptions. Authorship across all routes does not imply this review accepted other batches.
- [Shared reader snapshot](browser-shared-capstone-results.json): 18 checks. The pending-page regression now uses a transient in-memory catalog fixture when no unauthored original route remains; a reload discards it.
- [Final regression](capstone-regression-results.json) records commands, exit codes and reviewed file hashes. [Acceptance](acceptance-batch-28.json) binds the reviewed lesson, workbook, local lab and interactive implementation to their content hashes.

The primary assistant inspected the desktop light worksheet, mobile dark worksheet and mechanism screenshots under `screenshots/capstone/`, and reviewed all lesson and workbook text plus all 13 questions. The attachment table intentionally scrolls horizontally and has a named keyboard-focusable region. Screenshots in the other theme combinations supplement automated viewport checks. This is not a complete assistive-technology audit.

## Evidence boundary

The workbook is a fictional design. Arithmetic uses supplied homogeneous host capacity and serial recovery durations. It does not simulate packet forwarding, placement, quorum, physical power, SAN failover, performance or whole-site recovery. The local SQLite run really restores rows 1 and 2, reports acknowledged row 3 lost, verifies integrity and removes its owned directory. Its restore/check seconds are not an enterprise RTO measurement. The backup file shares the same host and directory, so it is not an independently protected disaster-recovery copy.

Real network, firewall, hypervisor, FC, power and site procedures remain guided/unexecuted, with explicit target acceptance and stop conditions. No production configuration was changed. The immutable original source and learner storage semantics are preserved. See [source and primary review](research-capstone.md).

## Reproduce

```text
node tests/content.cjs
node tests/capstone.cjs
node tests/browser-capstone.cjs
node tests/browser.cjs
node tests/quality-audit.cjs
```

Browser checks require the existing Playwright installation, Microsoft Edge and the course HTTP server on `127.0.0.1:8765`. Local lab checks use Python 3.10+ with the standard library; this run used Python 3.12 on Windows. Syntax and final structural checks are included in `tools/verify-capstone.py`.
