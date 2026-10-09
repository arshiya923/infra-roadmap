# Batch 01 acceptance evidence

Historical Batch 01 record. For the current accepted scope, also read validation-batch-02.md, validation-batch-03.md, validation-batch-04.md and ROADMAP_ENRICHMENT_PROGRESS.md.

Reviewed by the primary assistant on 4 October 2026, after direct implementation. GapCode was stopped at the user's request before it wrote project files.

## Scope accepted

Seven original topic IDs: s0-g0-t0 through s0-g0-t6 (Computer Hardware). The original Computer Hardware group is now backed by full lessons. Stage 1's combined lab is **not** included or marked complete: it depends on later operating-system and networking batches.

| Requirement | Evidence and result |
|---|---|
| Preserve the original | SHA-256 ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25 matches original/index.html. |
| Account for every node | 442 runtime IDs and 69 group IDs match the extracted inventory; every progress-bearing ID is assigned exactly once in the batch plan. 84 supporting items/diagram labels also have stable IDs across five collections. |
| Content depth | Each of seven lessons contains definition/purpose, bounded analogy, components, mechanism, four-step visual flow, real example, inspection commands, configuration/rollback guidance, production decisions, a symptom-to-verification investigation, security/performance, mistakes, prerequisites and related links. |
| Learning levels | Foundational explanation is immediately visible; advanced configuration and pitfalls use progressive disclosure; operational sections and scenario questions develop troubleshooting/design reasoning. |
| Assessment | 70 original exam questions, 21 distinct quick checks. Unique question IDs, model answers, explanations, difficulty and tested concept validated. Multiple choice checks correctness; written response explicitly uses self-assessment. |
| Practice | Seven coherent labs, each with objective, prerequisites, topology/path, steps, verification, troubleshooting, challenge and cleanup. Read-only or simulated by design. |
| Visuals | Seven four-step mechanism diagrams with static equivalents, seven lab-path diagrams, seven comparison tables, one RAID block/failure simulator. Desktop and phone screenshots inspected. |
| Functional behavior | 18 automated browser checks passed; details in browser-results.json. Includes original dialog integration, routes, learner persistence, quiz gating, learning/exam reset, clipboard, search, anchor navigation, invalid routes, theme, flow controls and file-URL loading. |
| RAID model | All 80 combinations of five layouts and 16 four-drive failure masks verified; block copies/parity and missing-member indicators checked. |
| Responsive behavior | All seven lessons checked for page overflow at widths 1440, 768, 390 and 320. Separate screenshots of desktop/tablet/mobile/narrow layouts and the RAID panel. Detailed diagrams scroll without shrinking labels. |
| Accessibility | Semantic headings/nav/sections, native controls and fieldsets, labels, visible focus, skip link, keyboard activation and reduced-motion stepper behavior checked. No claim of a full external WCAG audit or screen-reader certification. |
| JavaScript/assets | Syntax checks and browser tests found no page errors or failed application asset responses. There is no build step. |
| Continuity | Immutable inventory, full audit, batch plan, decisions, human-readable progress and machine-readable editorial manifest are present. |

## Commands used

```powershell
python tools/inventory.py
python tools/audit.py
python tools/progress.py
python tools/catalog.py
node --check scripts/learning.js
node --check content/batch-01.js
node tests/content.cjs
$env:NODE_PATH='C:\Users\Arshiya\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
node tests/browser.cjs
```

Browser tests use a temporary headless Edge profile. They do not change the user's normal browser study progress. HTTP preview listens only on 127.0.0.1:8765. Direct-file loading was tested separately.

## Practical limits and next boundary

- This is Batch 01 acceptance, **not final course acceptance**. At this batch's acceptance, 435 original learning nodes remained unenriched; consult current progress for the updated count.
- Hardware-specific configuration and destructive failure experiments are deferred to the appropriate advanced batches. WSL read-only command checks do not certify physical server procedures.
- Current certification alignment was not established; the question bank makes no such claim. Research and unavailable-source notes are in research-batch-01.md.
- Cross-links to unfinished subjects deliberately open an explicitly labelled outline.
- The original broad stage-gate recommendation system remains for compatibility. Enriched lessons use precise ID-based prerequisites.
- Next batch: **02 — Operating Systems**, beginning at **s0-g1-t0 — Windows**. Do not regenerate or overwrite Batch 01 while continuing.

## Final completeness audit status

Not eligible yet. Original-node equality, complete question coverage across the entire course and the final cross-domain audit can only be accepted after all batches pass. No placeholder or unauthored topic is counted as complete.
