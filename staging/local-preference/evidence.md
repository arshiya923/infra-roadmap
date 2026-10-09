# Local Preference draft evidence

Checked 2026-10-09.

## Source basis

- RFC 4271 section 5.1.5: https://www.rfc-editor.org/rfc/rfc4271 defines LOCAL_PREF as a four-octet unsigned attribute, requires it in UPDATEs to internal peers, says higher preference MUST be preferred, and prohibits ordinary external advertisement except for confederations.
- FRRouting stable 8.4 BGP documentation: https://docs.frrouting.org/en/stable-8.4/bgp.html documents the default local preference of 100, route-map policy examples and the BGP show-command forms used here.
- The four commands in lesson.json are guided, read-only examples. They were not run and no live router output is claimed.

## Model boundary

Exactly two candidates share IPv4 prefix 198.51.100.0/24. Each has strict admitted and resolvable booleans and an integer LOCAL_PREF from 0 through 4294967295. Ineligible candidates are excluded. A higher value wins only this scoped stage. Equal values remain unresolved for later BGP selection stages.

The comparison assumes earlier implementation-local factors, including vendor Weight or local-origination preference, do not distinguish the two candidates. It does not calculate a universal or complete best-path sequence. System RIB selection and original forward/return readiness are separate declarations; none of these declarations sends packets.

LOCAL_PREF is described as an own-AS outbound-exit preference distributed through iBGP. Ordinary eBGP advertisement is omitted except for the confederation exception. FRR’s documented default of 100 is implementation-specific; the value 200 is only an illustrative override.

## Verification

The command node staging/local-preference/model.test.cjs passed on 2026-10-09. It checks 11 independently expected presets, strict schemas and bounds, no-coercion validation, eligibility-before-preference, ties, zero and maximum values, system displacement, independent forward/return gates, fresh preset copies, the HTML contract, and UI contract. The primary separately checks lesson question and command counts. All 10 MCQ answers exactly match an option. Node syntax checks passed for model.js and model.test.cjs; lesson.json parsed successfully.

No router, BGP session, route, packet, convergence behavior or service outcome was exercised or inferred.

Primary corrections before integration: exactly three quick checks, removed invalid non-lab artifact links, added shared topology accessibility, precise scenario id and substantive policy-security/configuration context.
