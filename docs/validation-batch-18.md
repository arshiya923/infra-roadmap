# Batch 18 validation — ACI and integrated Cisco Data Center lab

Accepted 2026-10-09: ten original units, 100 exam questions and 30 quick checks. Together with [Batch 17](validation-batch-17.md), all 32 Cisco Data Center units are accepted. Course total: 274 of 442 original units, 2,740 exams and 822 quick checks. Next: Batch 19, Storage, starting at `s8-g0-t0`.

The primary assistant reviewed ACI fundamentals, APIC, spines, leaves, EPGs, bridge domains, contracts, application profiles, tenants and the integrated lab. The [workbook](../labs/cisco-dc-18-workbook.md) defines two spines, four leaves, eight 100-Gb/s declared links, endpoint attachments and separate NX-OS overlay and ACI policy exercises. The topology is visible in the lesson and scrolls horizontally on narrow screens.

Evidence:

- [Primary review and exact content/question hashes](cisco-dc-primary-review-18.json): ten lessons, 130 questions, three contact sheets containing 30 captures, plus three final topology captures inspected directly.
- [Acceptance criteria](acceptance-batch-18.json).
- [Focused browser results](browser-cisco-dc-18-results.json): all ten routes and their incident states, questions, invalid inputs, keyboard use, downloads, responsive themes and learner/editorial separation.
- [Final browser checks](cisco-dc-final-browser.json): desktop topology fit, both mobile scroll ends, exact Python download, flow controls and all 32 accepted routes.
- [Model checks](cisco-dc-model-results.json): 1,827 passing state/boundary checks.
- [Offline lab checks](cisco-dc-fabric-results.json): 302 passing checks including all 256 fabric-link availability combinations, MTU boundaries, route withdrawal/import, tenant isolation, policy predicates and byte-identical restoration/cleanup after three injected interruptions.
- [Full-course audit](quality-audit-batch-18.json): all 274 authored routes, acyclic prerequisites, original adjacency, named controls, core contrast tokens, local loading/search and no page exceptions. An earlier concurrent browser run timed out; the successful audit ran serially. Prerequisite traversal now memoizes fully checked nodes while retaining active-chain cycle detection.

Run the standalone lab with `python labs/cisco-dc-fabric.py --run`. Without `--run`, it displays help. It uses only the Python standard library and an owned temporary directory; it opens no network connections. `--inject-failure baseline`, `--inject-failure fault` and `--inject-failure restored` exercise interruption cleanup when combined with `--run`.

Reproduce checks with `python tests/cisco-dc-fabric.py`, `python tests/cisco-dc-content.py 18`, `node tests/cisco-dc-models.cjs`, `node tests/browser-cisco-dc.cjs 18`, `node tests/cisco-dc-final-browser.cjs --accepted`, `node tests/content.cjs` and `node tests/quality-audit.cjs`. Browser dependencies and the local HTTP server are documented in [validation setup](validation.md).

Cisco/APIC target procedures remain guided and unexecuted. The offline lab evaluates synthetic topology, route, MTU and policy records; it does not transmit traffic or establish BGP sessions, and does not verify firewall HA, storage I/O or measured throughput. The ACI worksheet covers only its stated inter-EPG predicate, excluding statefulness and policy exceptions. APIC management reachability is separate from already deployed forwarding state. Written answers are self-assessed. These checks are not a certification-alignment or full WCAG claim.
