# BGP Communities staged evidence

Date: 2026-10-09. Owned writes: `staging/communities/**` only. No integration, router configuration, BGP session or packet operation was performed.

## Delivered contract

- `lesson.json`: existing batch-09 key schema, lesson `s3-g4-t3`, interactive `communities`, exactly 10 MCQs with four options and answers equal to option strings, 3 quick checks, 4 guided read-only commands and 4 flow pairs. Includes the full tabletop lab, the supplied prerequisites and related lessons.
- `model.js`: CommonJS export and browser `window.CommunitiesModels`; API `fields`, `catalog()`, `preset(id)`, `evaluate(scenario)`, `html('communities')`, `mount('communities')`. Other interactive kinds return empty HTML/do not mount.
- Scenario fields are exactly `standard`, `large`, `policyKind`, `policyEnabled`, `admitted`, `target`, `exportPermit`, `sessionReady`. Standard/large are arrays of decimal tag strings. The four gates are strict booleans; contract and target are closed enums.
- All standard components must fit unsigned 16 bits; all large components must fit unsigned 32 bits. Input leading zeros are accepted for normalization; output has canonical decimal components without leading zeros. Signs, floats, exponents, hex, whitespace inside API tag strings, numeric coercions, malformed widths, sparse arrays and out-of-range values are rejected. The worksheet caps supplied entries at 32 across both families, before deduplication, and tag text at 128 characters. These are local teaching limits.
- The exact local contract uses standard `65001:200` or large `4200000001:200:0`. Membership, enabled policy and declared admission are all necessary for declared LOCAL_PREF 200; otherwise the declared baseline is 100. Neither value is a universal tag meaning.
- Standard NO_ADVERTISE, NO_EXPORT and NO_EXPORT_SUBCONFED are modeled independently of that operator contract and of declared export/session gates. Large tags do not acquire invented well-known effects. Numeric acceptance does not establish ASN assignment or authorization, or authorize reserved-tag use. The lesson identifies RFC 1997 reserved blocks `0x00000000..0x0000FFFF` and `0xFFFF0000..0xFFFFFFFF` and RFC 8092 guidance against reserved Global Administrator values 0, 65535 and 4294967295. Numeric-boundary fixtures decode widths only, not recommended or allocated production labels.
- `style.css`: scoped worksheet controls and wide table; named focusable `.en-scroll` region. Dynamic cells and output use `textContent`. Invalid input clears table rows and hides output. An invalid selected scenario stays invalid on later control changes. The reset is a native button; parent browser review must confirm actual keyboard activation and responsive layout.

## Fresh executed checks

Executed from the workspace with Node.js v25.2.1:

```text
node staging/communities/model.test.cjs
PASS: 19 preset oracles; 3072 independent target/gate/family/membership cases; strict range, syntax, coercion, sparse array and 32-entry checks; exact lesson schema; DOM error persistence/reset and text rendering contract.
```

The independent cases cross 3 target classes × 8 well-known combinations × 16 declaration combinations × 2 contract families × 4 exact-tag memberships. A literal target restriction table supplies expected results independently of the implementation conditionals. Fixed per-preset outcomes provide a second oracle. Other checks cover fresh preset arrays, canonical sets/order/duplicates, valid extrema, total-entry limits before deduplication, large-family non-equivalence and invalid schemas.

The DOM harness exercises browser-export registration, initial rendering, invalid scenario selection followed by another control change, reset recovery and malformed markup input. This is a minimal DOM contract test, not evidence of an actual browser screenshot, layout or keyboard event.

## Primary sources inspected

Browser-opened on 2026-10-09:

- [RFC 1997](https://www.rfc-editor.org/rfc/rfc1997), sections COMMUNITIES attribute, Well-known Communities and Operation: standard set representation, local policy context and the three distinct export boundaries.
- [RFC 8092](https://www.rfc-editor.org/rfc/rfc8092), sections 3 and 5: three 32-bit fields, administrator scope, order independence, duplicate handling and canonical decimal notation. Boundary fixtures include reserved numbers strictly as syntax/range checks; these are not assigned-value recommendations.
- [FRRouting stable 8.4 BGP documentation](https://docs.frrouting.org/en/stable-8.4/bgp.html), community policy and Displaying BGP routes sections: `show bgp [afi] [safi] summary`, prefix inspection and peer route views. `routes` describes accepted inbound routes; `advertised-routes` describes routes permitted by outbound policy and advertised to that peer. The selected documentation URL is stable 8.4, even though the browser renderer labels its page “latest documentation.”

All four lesson command blocks are explicitly GUIDED, NOT EXECUTED. They are proposed observations for a prepared FRR stable 8.4 target. No FRR output, route eligibility, complete best path, RIB installation, UPDATE, convergence, remote route or service result is claimed. Final integration, full browser checks and source acceptance belong to the primary assistant.
