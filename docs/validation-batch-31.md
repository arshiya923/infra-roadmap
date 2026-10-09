# Batch 31 — Application delivery, TLS and reverse proxies

Accepted by the primary assistant on 9 October 2026, after direct implementation
under the user's instruction not to use GapCode.

Three full lessons, 30 original written exam questions, nine quick checks, three
four-step visual/static mechanisms, comparisons and three-phase incident desks.
Written answers use self-assessment. Study progress is separate from editorial status.

## Review and evidence

Reviewed 39 questions, lesson mechanisms, commands and distinct evidence scopes. Inspected mobile dark evidence desk. Fresh HTTP results are 200/503/200 with expected bodies; TLS failure explicitly reports hostname mismatch before successful fresh recovery. Pool equality, oversubscription and invalid inputs are checked. Nginx syntax validation is labelled guided because Nginx is absent.

- [Browser checks](browser-expansion-31.json): all three routes, keyboard phases,
  reset, reduced motion, answer reveals, exact clipboard and downloads, direct files,
  separate persistent progress and 1440/768/390/320 widths in light and dark.
- [Local lab checks](expansion-lab-31.json): actual results and declared model scope.
- [Acceptance hashes](acceptance-batch-31.json) bind this reviewed checkpoint.

## Scope and limits

Actual owned loopback HTTP forwarding with controlled origin 503 and actual TLS expected-hostname rejection/recovery. The test certificate is temporary and trusted only by the client context. Pool sizing is supplied arithmetic; Nginx, ACME renewal, expiry faults and real load-balancer/database execution remain guided or unexecuted.

The evidence desks are authored scenarios, not captured vendor terminal output.
Automated accessible-name/structure checks and inspected screenshots do not constitute
a complete screen-reader or external WCAG audit.

## Reproduce

From the project root, with the local server at 127.0.0.1:8765 and the documented
Playwright/Edge runtime:

```text
node tests/content.cjs
node tests/browser-expansion.cjs 31
```

The lab report records its execution platform and scope. Follow the commands in the
lesson rather than treating guided platform operations as previously executed.
