# Batch 02 — Operating Systems acceptance evidence

Review date: 4 October 2026. Work performed directly; GapCode was not used.

## Reviewed scope

| Original ID | Lesson | Assessment | Practice and visual treatment |
|---|---|---|---|
| s0-g1-t0 | Windows | 3 quick checks; 10 original exam questions | Identity/process/service flow; read-only evidence lab; service-identity troubleshooting |
| s0-g1-t1 | Windows Server | 3 quick checks; 10 original exam questions | Role deployment/operation flow; dependency checklist and explicitly labelled tabletop DNS scenario |
| s0-g1-t2 | Linux fundamentals | 3 quick checks; 10 original exam questions | Path/access flow; interactive permission model; distribution/process/service inspection |
| s0-g1-t3 | CLI fundamentals | 3 quick checks; 10 original exam questions | Parser/pipeline/status flow; Bash failure fixture and PowerShell object-pipeline lab |

Each lesson includes a bounded mental model, components, mechanism, practical example, commands with platform/expected-result notes, configuration validation/rollback guidance, a troubleshooting chain, production/security/performance treatment, mistakes, prerequisites, related links, glossary and dated sources. Four comparison tables, four mechanism steppers and four lab-path diagrams reuse the existing components.

All four lessons were reviewed for technical consistency. Key distinctions: process versus service; installed role versus service readiness; active versus enabled; owner/group/other selection; file versus directory permissions; PowerShell objects versus Bash streams; native exit codes versus cmdlet error semantics. No current certification blueprint or copied exam content is claimed.

## Verification results

- Content validation: 11 total authored lessons, 110 exam questions, 33 quick checks, 11 labs. Original 442 IDs and preserved-source hash remain valid; all question IDs and related links resolve.
- Existing regression suite: 18 checks passed after the reader was generalized for multiple batches.
- Batch 02 browser suite: 13 checks passed, including unopened-lesson search without bundle loading, all routes, next/previous links, learner-progress compatibility, quiz behavior, clipboard text, themes and direct-file loading.
- Permission model: 9,216 cases checked (512 modes × three identity classes × three operations × two object types), plus UI scenarios for owner non-fallback, directory create requiring write/search, reset and keyboard input.
- Layout: each new lesson checked at widths 1440, 768, 390 and 320. Desktop, dark and mobile lesson/permission screenshots inspected; no page overflow detected.
- Browser: headless Microsoft Edge/Chromium. The new suite checks console errors as well as uncaught errors. An automatically requested missing favicon was detected and fixed with a shared local SVG icon.
- Clipboard test accounts for Windows CRLF normalization while checking that multiline command content is unchanged. Route waits tolerate the intentional asynchronous loading state.

Evidence files: browser-results-batch-02.json, browser-results.json, commands-batch-02.json and screenshots/batch-02/.

## Actual command execution and limits

Four Windows observation examples ran under Windows PowerShell without changing services or permissions. Event/process output was not persisted in the evidence file to avoid retaining unnecessary host details. Ubuntu 24.04/WSL2 inspection confirmed the distribution/kernel distinction and active systemd environment. The exact authored Bash examples produced line count 2, previous status 1, default pipeline status 0 and pipefail status 1.

No Windows Server VM was available. ServerManager/Get-WindowsFeature syntax was checked against Microsoft documentation; role installation, domain promotion, DNS reconfiguration and server restoration were not executed. The lesson's tabletop branch explicitly reflects this limit. No live ACLs, service identities, permissions or network settings were changed.

## Continuation

After acceptance, 11 of 442 original learning nodes are enriched; 431 remain. Next: Batch 03 — Networking Basics, beginning with s0-g2-t0 (LAN). The original combined Stage 1 lab remains pending until its OS and networking prerequisites are covered. Keep the 84 supporting items and 15 planned added nodes separate from original lesson completion.
