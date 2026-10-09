# AS Path bounded draft evidence

Only `staging/as-path/` was authored by this worker. Integration remains the primary assistant's responsibility.

## Source review, 2026-10-09

- [RFC4271](https://www.rfc-editor.org/rfc/rfc4271.html), sections 5.1.2, 9.1.2 and 9.1.2.2: ordinary external/internal propagation; exclusion of unresolved NEXT_HOP and ordinary own-AS loops before selection; count AS numbers in the scoped sequence at the length stage. Historical AS_SET counting is outside this model.
- [RFC6793](https://www.rfc-editor.org/rfc/rfc6793.html), sections 3, 4 and 9: four-octet ASN encoding, AS_TRANS 23456 and AS4_PATH transition context. Source-described only; no reconstruction. Range-valid tokens are not assignment validation.
- [RFC9774](https://www.rfc-editor.org/rfc/rfc9774.html), section 3: deprecation of AS_SET and AS_CONFED_SET, including ordinary advertise/reception requirements and operator transition exception. This parser accepts neither sets nor confederation segments.
- [RFC7300](https://datatracker.ietf.org/doc/html/rfc7300), sections 1 and 6: reserved last ASNs 65535 and 4294967295. Both rejected by the bounded parser.
- [FRR stable8.4 BGP](https://docs.frrouting.org/en/stable-8.4/bgp.html), Route Selection, AS Path Access Lists, Using AS Path in Route Map and Displaying BGP Information: weight, LOCAL_PREF and local route before AS length; prepend behavior; read-only show syntax. [FRR stable8.4 Zebra](https://docs.frrouting.org/en/stable-8.4/zebra.html) supplies system routing context. All lesson CLI command groups are guided references, not executed target evidence.

## Artifacts and contract

`lesson.json` supplies the existing full lesson schema, exact ID s3-g4-t2, batch 09, interactive key as-path, five specified prerequisites, two related lessons, four flow pairs, four command groups, ten MCQs with exact-option answers, three quick checks, and full scoped lab/source fields.

`model.js` exposes CommonJS and window.AsPathModels APIs: fields, catalog, preset, evaluate, html and mount. Thirteen presets cover shorter A/B, equal lengths, one/both own-AS loops, policy rejection, unresolved NEXT_HOP, no eligible candidate, prepending, LOCAL_PREF boundary, four-byte ASNs, system displacement and missing return. Strict string/boolean declarations prevent coercion. Unknown scenario or malformed input clears rows and hides output; unknown scenario stays hidden across subsequent edits. All dynamic output uses textContent. Reset is a native type=button. Named keyboard-focusable en-scroll region and scoped CSS match the existing visual variables.

## Executed evidence

`node --check staging/as-path/model.js` exited 0.

`node --test staging/as-path/model.test.cjs` exited 0: 9 tests, 9 pass, 0 fail. Tests include independent literal preset outcome oracles, all 64 eligibility/loop combinations, all 4096 length pairs from 1–64 entries, unequal earlier policy, strict input and reserved/range checks, independent system/forward/return gates, lesson assessment counts/answers, browser export/static accessibility hooks, and mocked DOM stale-output/invalid-context/reset behavior.

## Limits requiring primary verification

No real browser rendering, four-width/light-dark visual inspection, native keyboard interaction, actual FRR CLI execution, packets, captures, hardware FIB or service results were performed by this worker. Mocked DOM checks support event/output logic but do not establish actual layout or assistive-technology behavior. The lesson states those limits. No full best-path, allowas-in/local-AS/confederation/set simulation, ASN assignment validation, authenticated provenance or AS4_PATH transition algorithm exists. Both candidates are the same fixed prefix and ordinary nonempty sequence scope.
