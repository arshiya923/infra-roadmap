# Batch 17 validation — Cisco Data Center

Accepted 2026-10-09: 22 original units, 220 exam questions and 66 quick checks. This checkpoint brought the course to 264 accepted units. Batch 18 completes the stage; see [its validation](validation-batch-18.md).

The primary assistant reviewed the content, all 286 questions, source applicability and six screenshot contact sheets containing 66 captures. The lessons cover Nexus/NX-OS, vPC, FabricPath/FEX, DCI, VXLAN, VNI, VTEPs, EVPN, MP-BGP and leaf-spine design. The [workbook](../labs/cisco-dc-17-workbook.md) records distinct baseline, fault, observer and restoration procedures.

Evidence:

- [Primary review and exact content/question hashes](cisco-dc-primary-review-17.json).
- [Acceptance criteria](acceptance-batch-17.json).
- [Browser results](browser-cisco-dc-17-results.json): all 22 routes, HTTP/file loading, 286 answer reveals, model faults, invalid inputs, keyboard controls, clipboard/download, learner-state persistence, four widths and two themes.
- [Model results](cisco-dc-model-results.json): 1,827 independent state and boundary checks across the six scoped models.
- [Course audit at acceptance](quality-audit-batch-17.json): 264 authored routes, prerequisite graph, navigation, controls, contrast tokens, search and page exceptions.
- [Primary-source applicability](research-cisco-dc.md). Direct Cisco HTTP fetches returned 403; the documented web-tool readings succeeded.

Reproduce with `python tests/cisco-dc-content.py 17`, `node tests/cisco-dc-models.cjs`, and `node tests/browser-cisco-dc.cjs 17`. Browser checks require the local HTTP server, Microsoft Edge and Playwright on Node's module search path, as described in [validation setup](validation.md).

Cisco target commands, physical forwarding, FCoE login, FEX replacement and mode conversion were not executed. The browser models prove only their declared relations; they do not measure convergence or production performance. All new written answers use explicit self-assessment. Responsive, keyboard and token-contrast checks do not constitute full WCAG certification.
