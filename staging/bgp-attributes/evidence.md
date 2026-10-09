# BGP attributes bounded draft evidence

Draft topic: `s3-g3-t3`, batch `09`. Checked on 2026-10-09. All writes in this worker assignment are inside `staging/bgp-attributes/`.

Delivered files: `lesson.json`, `model.js`, `model.test.cjs`, `style.css`, this evidence record and test-generated `model-results.json`. The primary integration/review work is separate. No shared content bundle, app loader, stylesheet, package manifest or progress file was changed.

The lesson uses the schema read from `content/batch-09.js` through `tools/read-content.cjs` for `s3-g3-t0`, `s3-g3-t1` and `s3-g3-t2`. The existing iBGP CommonJS/browser model and tests supplied API conventions. Question IDs are intentionally omitted for the bundle's assignment step.

## Primary sources actually inspected

| Source | Checked sections and use |
| --- | --- |
| [RFC 4271](https://www.rfc-editor.org/rfc/rfc4271) | Sections 4.3, 5 and 5.1: top FLAGS masks, reserved send/receive rule, mandatory/discretionary distinction, known types, conditional unrecognized optional handling and attribute propagation scope. |
| [RFC 7606](https://www.rfc-editor.org/rfc/rfc7606) | Revised UPDATE handling, especially Optional/Transitive conflicts and different treat-as-withdraw/attribute-discard actions. No universal reset claim. |
| [RFC 9774](https://www.rfc-editor.org/rfc/rfc9774) | Section 3: AS_SET/AS_CONFED_SET deprecation, default no-advertisement and receive treat-as-withdraw, including explicit operator configuration exception. |
| [RFC 1997](https://www.rfc-editor.org/rfc/rfc1997) | COMMUNITIES attribute: type 8, optional transitive, four-octet values and policy use. This draft leaves well-known community policy details to the related communities topic. |
| [RFC 8092](https://www.rfc-editor.org/rfc/rfc8092) | Sections 3, 5, 7 and 8: optional transitive large communities, twelve-octet format, three-field display, trust limitations and type 32. |
| [RFC 4456](https://www.rfc-editor.org/rfc/rfc4456) | Section 8: type 9 ORIGINATOR_ID and type 10 CLUSTER_LIST are optional nontransitive. Added this primary source specifically to support the type9/10 reference. |
| [FRR stable 8.4 BGP manual](https://docs.frrouting.org/en/stable-8.4/bgp.html) | Route Selection local Weight, neighbor default weight, MED scope, Displaying BGP Routes and peer accepted/advertised views. CLI display is distinguished from raw wire encoding. |

No long verbatim source passages were copied. The lesson's quoted identifiers and terms name protocol fields. The RFC 8654 distinction is a scope exclusion: Extended Length controls the per-attribute length-field width, not message negotiation. This draft does not implement or teach extended-message capability negotiation.

## Executed development commands and outcomes

- `node -e ... execFileSync(process.execPath,['tools/read-content.cjs'],{maxBuffer:20*1024*1024}) ...` — read/serialized the existing topic objects successfully. An initial call without the enlarged output buffer failed with ENOBUFS; the successful bounded topic filter followed. No source edits resulted from that failure.
- `node staging/bgp-attributes/model.test.cjs` — PASS: 17 presets, 3072 independent type/byte cases, rejection boundaries and mounted invalid-context/reset tests. It wrote only the local `model-results.json`.
- `node --check staging/bgp-attributes/model.js` — exited successfully without syntax diagnostics. The model test was repeated after the lesson LOCAL_PREF context clarification and stylesheet token correction and still passed.
- Read `model-results.json` to confirm PASS details. A `git status --short -- staging/bgp-attributes` inspection failed because this workspace is not a Git repository; no Git-state claims are made.

## Tested contract

Independent specification matrix checks the eleven known types, plus explicit hypothetical unrecognized type, for all 256 numeric flag bytes. Expected bit values derive from an independent binary representation, not the implementation's bit-mask constants. Numeric strings, boxed values, fractional/nonfinite/out-of-range values, unknown declarations, missing fields and extra fields reject. Presets return fresh declarations.

Stub DOM tests execute `mount`, changing scenarios/types/FLAGS, checking empty, malformed and injection-like strings, output clearing, unknown scenario remaining hidden after a flags edit, and Reset. Rendering uses `textContent` and constructed cells. Both tables have named keyboard-focusable scroll regions. These checks validate interactions and structural accessibility hooks; they are not real-browser visual, contrast, focus-order or responsive-layout verification.

## Substantive limitations for acceptance

The worksheet decodes declarations; it does not parse lengths or values, full UPDATE structure, NLRI, AS4_PATH, MP_REACH_NLRI, AS segments, route selection, admission/export policy, reflection history, error actions or packets. Valid byte input can still disagree with the selected known type. Reserved bits produce a bounded note rather than a receive-error verdict. Unknown handling is conditional and does not promise route acceptance. The reference has eleven known types, not an exhaustive IANA catalog. Weight is shown only as explanatory local context, never offered as a wire type.

The four FRR/Linux command objects are guided read-only examples, never executed against a router by this task. They contain expected observations without invented command output. No routing runtime, namespaces, peer sessions, packet captures, convergence or original-service results exist for this draft. Primary must integrate loader/styles/questions and perform real-browser acceptance before claiming the topic is shipped.
