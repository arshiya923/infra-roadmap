# Batch 22 — Python & data / APIs & models

Accepted 2026-10-09 by the primary assistant, without GapCode. This batch contains 19 original lessons, 190 exams and 57 quick checks. Course acceptance at this checkpoint: 340/442. Learner checkmarks are independent.

## Evidence

- [Primary lesson and assessment review](automation-primary-review-22.json): hashes bind every reviewed lesson and question to its current content.
- [Content and executable inspector checks](automation-content-22-results.json): all topic commands execute; standalone Python examples are also executed where present.
- [Focused browser checks](browser-automation-22-results.json): all 19 routes, all 247 assessment reveals, three incident stages, model changes, reset, command copy, workbook download, learner/editorial separation and file URLs.
- [Course-wide audit](quality-audit-batch-22.json): original adjacency, prerequisite consistency, named controls, DOM identity, core contrast, loading and local search.
- [Model checks](automation-model-results.json): 2,476 independent gate, policy, arithmetic and invalid-input checks.
- [Local lab checks](automation-lab-results.json): 4,159 checks including normal execution, four interruption points, actual file hashes and owned-directory cleanup.
- [Acceptance record](acceptance-batch-22.json) and [primary source review](research-automation-architecture.md).

Browser review covers widths 1440, 768, 390 and 320 in light and dark themes. Desktop incident, mechanism and mobile incident captures are retained for every lesson in `screenshots/automation/`; the primary review lists the inspected contact sheets. Scrollable result tables preserve their full contents on narrow screens. The tests exercise native keyboard activation and reduced-motion behavior; they are not a complete accessibility certification.

## Scope and reproduction

The incident inspector returns authored scenarios, not captured target output. Five browser models calculate declared change gates, work budgets, survivor capacity, serial recovery budgets and a default-deny policy relation. No remote requests, device writes, VM operations or real failover occur through these controls.

The [local architecture lab](../labs/automation-lab.py) executes standard-library validation, deterministic rendering, owned-file change, repeat-apply no-op, stale-baseline rejection, byte restoration and cleanup. Its digest guard is a single-process teaching example, not a distributed transaction. See the [enterprise design workbook](../labs/automation-architecture.md) for the original architecture objective and guided platform extension. The supplied 70-minute recovery budget exceeds its 60-minute RTO, and its 40-minute recoverable-point age exceeds the 15-minute RPO; local execution success does not close those design gaps.

```text
node tests/automation-models.cjs
python tests/automation-lab.py
python tests/automation-content.py 22
node tests/browser-automation.cjs 22
```

Python 3.10+ is sufficient for local exercises. Browser tests need the established Playwright dependency path, Microsoft Edge and the course server on port 8765. External packages and platforms remain guided and require their own pinned supported environment and evidence. The unchanged original source hash remains `ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25`.
