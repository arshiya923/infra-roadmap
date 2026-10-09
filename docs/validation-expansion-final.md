# Completed curriculum expansion — 9 October 2026

The primary assistant completed the work directly under the user's instruction not
to use GapCode. No worker or external project was delegated this implementation.

## Accepted scope

- 442 original lessons remain authored and editorially accepted in Batches 01–28.
- 15 added lessons are accepted in Batches 29–33, counted separately: service
  dependencies/objectives/incidents; Linux operations; HTTP/TLS/proxy and pool
  behavior; containers/Kubernetes; cloud responsibility/capacity/cost and recovery.
- The expansion adds 150 original written exam questions, 45 quick checks, 15
  visual/static mechanism sequences, comparisons and three-phase evidence desks.
  Course totals are 4,570 exam questions and 1,371 quick checks across 457 lessons.
- All 84 original supporting items have individual editorial reviews in
  [the ledger](../content/supporting-review.json) and [the companion](../supporting.html).
  This includes eight certification references, fifteen deliverables, eight method
  steps, twenty-one practice-environment entries and thirty-two diagram labels.
- [Three cross-domain exercises](../labs/expansion-capstones.md) connect network to
  application, Linux to containers, and service objectives to recovery/cost.

Original inventory and source identities were preserved. Expansion catalog and
acceptance use separate inventory/completion fields. Original learner storage stays
at `infra-path.progress.v1`; expansion study checkmarks use
`infra-path.expansion-progress.v1`. The original roadmap's import/export remains
unchanged and does not export expansion checkmarks. Neither learner state changes
editorial acceptance. Supporting inventory statuses in the immutable extraction
remain historical; the separate ledger is the current supporting review record.

## Actual observations versus guided work

| Batch | Executed evidence | Explicit boundary |
|---|---|---|
| 29 | Dependency/SLO model boundaries; owned JSON invalid-candidate rejection and exact restore | No live service availability or production change |
| 30 | Ordinary-user Ubuntu read denial/restoration, child exits 0/3/0, owned-file restoration | No account changes, systemd unit/timer deployment, LVM mutation or host pressure injection |
| 31 | Two owned loopback HTTP listeners, controlled 200/503/200; TLS hostname mismatch rejection and fresh recovery; pool arithmetic | No Nginx installation/reload, ACME renewal, expiry fault, real balancing or database benchmark |
| 32 | Cached-image non-root container file predicate fault/recovery, Compose syntax, exact-label/readiness model, actual JSON snapshot restore with acknowledged loss | No Compose deployment, Kubernetes API, cluster upgrade, RBAC, network or persistent-volume execution |
| 33 | Exact-pair permission and capacity/cost arithmetic; actual local plan restoration | Fictional rates; no cloud SDK, credentials, provider APIs, Terraform or chargeable resources |

Container execution uses the recorded local image ID with `--pull never`, UID
65534, no networking/host mounts/ports, read-only root, dropped capabilities,
no-new-privileges and bounded memory/CPU/PIDs/tmpfs. Cleanup targets only its unique
ownership label. The Nginx image supplies a shell; it does not run Nginx here.
TLS creates one temporary key/certificate and trusts it only in the client context.

The browser incident desks contain authored scenario evidence, not captured vendor
terminal output. Local restore success does not establish independent backups or
whole-site RTO/RPO. Physical/vendor/cloud validation and a complete assistive-
technology audit remain outside this educational acceptance.

## Verification

- [Full-course audit](quality-audit-expansion-final.json): all 457 authored routes,
  acyclic/authored prerequisites, unique DOM IDs, named controls, section anchors,
  adjacent navigation, substantial lesson structure, local lazy loading/search,
  core light/dark contrast and no page exceptions.
- [Shared reader regression](browser-results.json): original identities/dialogs/
  learner storage, quizzes, flow controls, clipboard, search, RAID, pending/malformed
  routes, themes, responsive layouts, reduced motion and direct-file use.
- Focused browser records: [29](browser-expansion-29.json), [30](browser-expansion-30.json),
  [31](browser-expansion-31.json), [32](browser-expansion-32.json), [33](browser-expansion-33.json).
  Every new lesson is exercised at 1440/768/390/320 in both themes, with keyboard
  evidence controls/reset, thirteen answer reveals, clipboard, downloads, independent
  persistent study state and direct-file loading.
- Local lab records: [29](expansion-lab-29.json), [30](expansion-lab-30.json),
  [31](expansion-lab-31.json), [32](expansion-lab-32.json), [33](expansion-lab-33.json).
  Negative/equality/input-boundary checks supplement the actual runs.
- [Supporting-material checks](supporting-results.json): exact 84-ID coverage,
  local references and lesson routes, keyboard/theme behavior, four widths,
  roadmap/reader navigation and direct files.
- [Final command and hash record](expansion-final-verification.json) binds the final
  implementation and reports individual command exit codes.

The primary assistant reviewed the new lesson text, all 195 question/answer pairs,
lab code, source scope and supporting notes, and inspected the saved desktop/mobile
evidence-desk and companion screenshots. This review is scoped educational
acceptance, not certification of every upstream platform behavior.

An initial Batch 32 320px check reported overflow; immediate geometry inspection and
the complete rerun did not reproduce it. Final viewport checks wait for two animation
frames after resizing and retain offender diagnostics. A shared-reader pending
fixture initially selected the newly appended expansion item; it now explicitly
selects an original identity. Both issues remain recorded rather than being counted
as passing initial runs.

## Source and maintenance notes

Each lesson contains checked primary references dated 9 October 2026. Provider
features and procedures must be rechecked for the actual target version. The upstream
systemd site returned 403, so the Ubuntu Noble packaged manuals were used. Broadcom's
certification portal exposed no detailed syllabus to the fetcher; the companion
therefore gives only the official reference and makes no requirements/alignment claim.
The Cisco, Linux Foundation and Red Hat references were checked as study-planning
entry points, not as proof of comprehensive exam coverage.

All 33 planned batches are accepted. Remaining work is ongoing source/version
maintenance and optional target-specific operational practice, not unauthored lessons
in this plan. Historical audits and dated development notes are preserved and labelled.

## Reproduce

From the project root with the documented Playwright/Edge runtime and HTTP preview:

```text
python tools/catalog.py
python tools/progress.py
node tests/content.cjs
node tests/browser.cjs
node tests/quality-audit.cjs
node tests/browser-expansion.cjs 29
node tests/browser-expansion.cjs 30
node tests/browser-expansion.cjs 31
node tests/browser-expansion.cjs 32
node tests/browser-expansion.cjs 33
node tests/supporting.cjs
```

Run `python tests/expansion-labs.py 29` and `33` on Python 3.10+. Run `30`, `31`
and `32` under ordinary-user Linux with the prerequisites in their individual labs.
The full final runner records exact platform-specific commands for this workspace.
