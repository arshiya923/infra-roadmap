# Batch 20 — Arrays and hypervisors accepted, 2026-10-09

Nineteen original lessons are accepted: array concepts and HPE/Dell/NetApp scopes, hypervisor types, and all twelve VMware operations topics. They add 190 exams and 57 quick checks; course total at this checkpoint is 315/442. The integrated storage/virtualization stage lab follows in Batch 21.

The [primary review](storage-virtualization-primary-review-20.json) records direct review of all 247 answers and five contact sheets containing 57 desktop/mobile/mechanism renders. [Focused browser checks](browser-storage-virtualization-20-results.json) cover every new route, three incident states, self-assessment answers, keyboard controls, reduced motion, clipboard, downloads, learner/editorial separation, four widths, two themes and file URLs. The [315-route audit](quality-audit-batch-20.json), [content/inspector results](storage-virtualization-content-20-results.json), [model results](storage-virtualization-model-results.json) and [acceptance](acceptance-batch-20.json) retain evidence.

The first responsive run sampled a transient layout and reported overflow; a fresh passing run waits for the actual viewport-width condition. The calculator now enforces its stated whole-GiB input scope. No unresolved failure is concealed by the successful report.

Reproduce with `python tests/storage-virtualization-content.py 20`, `node tests/browser-storage-virtualization.cjs 20`, `node tests/storage-virtualization-models.cjs`, `node tests/content.cjs` and `node tests/quality-audit.cjs`, using the [local browser setup](validation.md).

The [workbook](../labs/storage-virtualization-20-workbook.md) separates authored incidents from actual platform work. ESXCLI blocks are read-only, source-checked guidance and were not run on a host. No actual array change, VM migration, HA event, DRS action or snapshot operation is claimed. The models cover aggregate memory, declared shared-storage migration gates and linear snapshot growth; they do not solve arbitrary placement, guarantee snapshot allocation or measure application continuity. No GapCode or delegated agents were used.
