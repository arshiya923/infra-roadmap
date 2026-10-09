# Classification and marking draft evidence

Source checks: 2026-10-09.

## Standards and command sources

- RFC 2474, https://www.rfc-editor.org/rfc/rfc2474 — the DSCP field is six bits and selects a configured per-hop behavior. A codepoint by itself does not implement a scheduler.
- RFC 3168, https://www.rfc-editor.org/rfc/rfc3168 — ECN is a separate two-bit field with four codepoints; the DS field retains six DSCP bits plus two ECN bits.
- RFC 3246, https://www.rfc-editor.org/rfc/rfc3246 — recommends DSCP 101110 (decimal 46) for EF. The lesson cites this codepoint only as a standards-referenced example; it does not claim EF service.
- RFC 2597, https://www.rfc-editor.org/rfc/rfc2597 — lists AF21 as 010010 (decimal 18). The class-map value is a local example with no universal priority order.
- Linux tc(8), https://man7.org/linux/man-pages/man8/tc.8.html — documents read-only show forms for qdiscs, classes and filters, including statistics options.
- Linux kernel interface-statistics documentation, https://www.kernel.org/doc/html/latest/networking/statistics.html — documents ip -s -s link show and the scope of link statistics.

The tc and ip command examples are guided and were not run. Interface names and target releases must be confirmed by an operator; no real configuration, counter, packet or service output is asserted.

## Model limits

Classification consumes only the fixed protocol and port declarations plus DSCP/ECN. Its ordered rules are UDP destination 16384–32767 to voice, then TCP destination 443 to interactive, else default. ICMP requires port fields of zero. Source port is recorded but unused; headers do not authenticate application identity. It does not inspect payload, fragmentation, counters or real packets.

Marking consumes a supplied class, trust boolean, input DSCP/ECN and one of three policies. trusted-preserve requires trustBoundary=true. untrusted-zero sets DSCP to zero. class-map sets voice=46, interactive=18, default=0. Each policy preserves ECN and uses DSField=DSCP×4+ECN. This is arithmetic only. It does not update an IPv4 checksum, propagate fields through tunnels, mark CE, invoke TCP congestion response, schedule packets, map 802.1Q PCP or guarantee forwarding.

## Verification

On 2026-10-09, node staging/qos-labels/model.test.cjs passed. It independently checked all TCP/UDP destination-port values from 0–65535, all 64×4 DSCP/ECN combinations for preserve, zero and every class-map class, strict malformed/out-of-range inputs, 11 classification presets and 12 marking presets, exact MCQ answer-option matches, DOM invalid-state hiding and reset behavior, and the browser-global model API. Node syntax checks passed for model.js and model.test.cjs. lessons.json parsed with two lessons; each has 10 MCQs, 3 quick questions, four flow pairs and four guided commands. Narrative word checks excluding assessments were above 1,000 words per lesson.
