# MED staged draft evidence

Scope: s3-g4-t1, batch09. Files written only under `staging/med/`. Draft is stable for primary integration/review. Worker did not edit shared content, scripts, styles or lab files.

## Delivered

- `lesson.json`: plain exact lesson schema matching the existing batch09 layout, interactive `med`, 10 MCQs with exact answer options, three quick questions, four flow pairs and four read-only guided commands; no actual lab claims.
- `model.js`: CommonJS and browser `window.MedModels`, catalog/preset/evaluate/html/mount, 19 authored presets, strict numeric/boolean/enum fields and pure evaluation.
- `style.css`: local `med-` IDs, shared `en-tool` / `en-scroll`, locally scrollable focusable table region and stacked narrow-screen candidates.
- `model.test.cjs`: independent authored outcomes, invalid-input assertions, exact lesson checks and fake-DOM output/reset contracts.

## Primary sources checked 2026-10-09

1. [RFC 4271 §5.1.4](https://www.rfc-editor.org/rfc/rfc4271.html#section-5.1.4): MED type/range, lower metric, internal distribution and received-neighbor propagation boundary. [§9.1.2.2](https://www.rfc-editor.org/rfc/rfc4271.html#section-9.1.2.2): ordinary same-neighbor comparison, absent default zero and later selection stages.
2. [FRR stable 8.4 BGP guide](https://docs.frrouting.org/en/stable-8.4/bgp.html#multi-exit-discriminator): ordinary neighboring leftmost-AS comparison, earlier Route Selection dimensions, always-compare and deterministic-med distinctions, independently administered values and multi-speaker instability caveats. Guide does not contain `missing-as-worst` (explicit text search returned no match).
3. [Pinned FRR frr-8.4.4 bgp_route.c](https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_route.c#L487): `bgp_med_value` returns the present value, default absent zero or BGP_MED_MAX when the explicit flag is set. MED comparison follows origin and uses left-path comparison or the always-compare flag. Nonordinary/internal/confederation branches in real FRR are excluded by the worksheet.
4. [Pinned FRR frr-8.4.4 bgp_attr.h](https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_attr.h#L35): BGP_MED_MAX is UINT32_MAX, so absent-as-worst ties present 4294967295. The model does not substitute an unbounded infinity.
5. [Pinned FRR frr-8.4.4 bgp_vty.c](https://github.com/FRRouting/frr/blob/frr-8.4.4/bgpd/bgp_vty.c#L3523): exact `bgp bestpath med missing-as-worst` command and flag; command is discussed, not offered as an executed mutation.
6. [FRR stable 8.4 Zebra guide](https://docs.frrouting.org/en/stable-8.4/zebra.html#zebra-terminal-mode-commands): `show ip route` and detailed prefix view; route source/selected/FIB views do not alone measure original service.
7. [RFC 7300](https://www.rfc-editor.org/rfc/rfc7300.html): reserved 4294967295. Primary review requested the worksheet reject that operational declaration; input range is 1..4294967294. The RFC says reserved last ASNs remain valid from a BGP-protocol perspective, so this is a fixture restriction, not a claim of malformed BGP. Other assignment/reserved-use checks are not implemented. Four-octet preset uses 4200000001 instead.

## Executed evidence

Command: `node staging/med/model.test.cjs` on the Windows workspace Node runtime.

Result: exit 0; **315 independent assertions passed**. Output:

```
MED independent assertions: 315 passed; 19 presets, 24 authored outcome cases, 16 admission/resolution combinations, strict invalid-input and fake-DOM contracts. No actual FRR or browser-layout execution.
```

Coverage includes same/different neighbor, explicit always-compare, equal metric, all three earlier boundaries, four admission/resolution truth-table states for each candidate, no/sole usable candidate, default missing versus explicit zero, missing-as-worst, maximum tie, LP/MED numeric bounds, strict booleans/enums, absent-key versus null distinction, fresh presets and pure evaluation. Fake-DOM tests reject invalid numeric/enum/scenario states, hide and clear stale outcomes and restore baseline/error text through reset; they fail if output attempts `innerHTML`.

## Explicit limits and integration notes

- Exactly two supplied candidates for fixed IPv4-unicast 198.51.100.0/24, both ordinary nonempty AS_SEQUENCE declarations. Leftmost ASN and sequence length are supplied independent data, not parsed path strings.
- Supplied LOCAL_PREF, path length and ORIGIN must tie for MED comparison. All other earlier differences are declared equal or excluded; unequal supplied dimensions return `earlier-boundary` with no winner. No full bestpath engine, multipath, 3+ path ordering, deterministic-MED simulation, timers or convergence claim.
- A tie/skipped/unmodeled decision gives null winner and null installation/exchange state. No usable candidates give none/false; one usable gives its sole choice without MED comparison.
- System source selection and forward/return readiness are independent declarations. No device configuration, daemon, UPDATE capture, route installation, FIB, probe or actual FRR CLI parser test ran.
- UI output uses `textContent`; invalid context hides/clears results. Parent handles integrated actual-browser width/theme/keyboard/render verification. Worker fake-DOM assertions are not browser-layout evidence.
- Input MED is strict numeric uint32 or null; undefined/string/coerced booleans are rejected. ASN fixture range is 1..4294967294; LOCAL_PREF and MED retain full 0..4294967295. AS_SEQUENCE length is an abstract positive integer declaration, not a serialized BGP message-length validator.
- The bundle may assign question IDs/topic IDs on integration. `html('med')` and `mount('med')` use `med-tool`, `med-case`, `med-output`, `med-error`, `med-reset`; catalog rows have `{id,title}`.

