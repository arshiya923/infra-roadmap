# Automation & Infrastructure Architecture — Batch 22

The incident statements are authored teaching cases. The inspector reads these cases; it does not execute vendor operations. Python 3.10+ runs the separate local architecture lab with only standard-library dependencies. External packages and device procedures require a separately pinned, supported disposable environment.

## Evidence procedure

1. Identify the intended operation, authoritative input and observer.
2. Predict a baseline result and a discriminating fault observation.
3. Compare the authored case with the model scope; do not label either as captured device evidence.
4. Record the narrow repair, positive postcondition, negative test and rollback.
5. Run the local lab where relevant and preserve its actual JSON evidence separately.

## s9-g0-t0 — Python Fundamentals

Python executes statements using objects, names and control flow; an automation program turns validated input into an explicit result or a reported failure.

Baseline: A three-device inventory must produce three validation records before any deployment.

Fault: A broad exception handler prints success after a missing hostname.

Acceptance: Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.

Mechanism:
- Parse the inventory before selecting any target.
- Validate required values and compute a proposed result in a function.
- Return structured evidence; catch expected errors at the command boundary.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t0`

## s9-g0-t1 — Python for Network Engineers

Network automation combines inventory, protocol adapters and verification; Python is the coordinator, while device behavior remains platform-specific.

Baseline: Two lab routers have distinct management addresses and the same intended NTP server.

Fault: A loop uses a display name as an address and silently skips an unreachable target.

Acceptance: Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.

Mechanism:
- Resolve approved stable identities and normalize addresses.
- Collect current state with bounded timeouts and authenticate the remote peer.
- Compare intended and observed state after a small canary change.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t1`

## s9-g0-t2 — Data types

Data types constrain what values mean and which operations are valid; infrastructure schemas must distinguish text, numbers, booleans, sequences and keyed records.

Baseline: Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094.

Fault: The string false enables a branch because it is nonempty.

Acceptance: Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.

Mechanism:
- Read raw data without assuming the decoder validated the business schema.
- Check exact types and allowed ranges for each field.
- Normalize once and pass the typed result to later steps.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t2`

## s9-g0-t3 — Loops

Loops repeat a bounded operation over a collection; safe automation also defines stop conditions, per-item outcomes and retry limits.

Baseline: Three devices may each receive at most two read attempts.

Fault: A while loop retries an authentication rejection indefinitely.

Acceptance: Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.

Mechanism:
- Freeze the approved target sequence and attempt budget.
- Record each attempt and distinguish retryable transport faults from invalid intent.
- Stop on exhausted budget or unsafe state and report unprocessed targets.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t3`

## s9-g0-t4 — Functions

A function gives a named operation explicit inputs and outputs; separating pure planning from side effects makes infrastructure changes testable.

Baseline: A planner compares current VLAN 10 with desired VLAN 20 and returns a delta.

Fault: A default list accumulates changes from earlier calls.

Acceptance: Use a fresh list per call and verify two independent calls return the same single change.

Mechanism:
- Define the input schema and failure behavior.
- Compute a plan without changing the source objects.
- Pass the reviewed plan to a separate executor and return evidence.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t4`

## s9-g0-t5 — Files

File handling converts persistent bytes into application data; encoding, ownership and replacement behavior are part of the automation contract.

Baseline: An owned UTF-8 intent file contains a site name with non-ASCII characters.

Fault: A partial write leaves invalid JSON after an interruption.

Acceptance: Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.

Mechanism:
- Open an explicitly owned file with a declared encoding.
- Validate the complete content before staging a replacement.
- Replace only the owned destination, then read back and retain rollback bytes.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t5`

## s9-g0-t6 — JSON

JSON represents objects, arrays and scalar values; decoding valid JSON is only the first stage of validating infrastructure intent.

Baseline: A JSON device record declares hostname edge-1 and VLAN 20.

Fault: Two vlan keys hide conflicting intent under a last-value-wins decoder.

Acceptance: Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.

Mechanism:
- Decode JSON with a defined duplicate-key policy.
- Reject unknown fields, wrong types and out-of-range values.
- Serialize normalized data predictably for review and compare semantic state.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t6`

## s9-g0-t7 — YAML

YAML is a serialization language with mappings, sequences and scalars; parser version and schema determine how unquoted scalars are interpreted.

Baseline: A playbook inventory contains a text site code and a boolean enabled field.

Fault: A parser coerces an unquoted identifier into a boolean or number.

Acceptance: Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.

Mechanism:
- Choose a supported parser and declare its YAML schema behavior.
- Load without arbitrary object construction and inspect resulting types.
- Validate inventory fields and reject ambiguous or duplicate definitions.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t7`

## s9-g0-t8 — Regex

Regular expressions match textual patterns; they are useful for constrained extraction but do not replace semantic validation or structured data models.

Baseline: A parser extracts an IPv4-looking field from a synthetic interface line.

Fault: The pattern accepts 999.1.1.1 because it only checks digit groups.

Acceptance: Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.

Mechanism:
- Define the expected whole line or bounded field.
- Match with a small reviewed expression and reject unexpected structure.
- Validate captured values with a domain parser before using them.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g0-t8`

## s9-g1-t0 — APIs

An API is a contract for requests, responses and failures between components; automation depends on its version, identity model and state semantics.

Baseline: An inventory endpoint returns two pages of approved devices.

Fault: Only the first page is processed and the run claims full coverage.

Acceptance: Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.

Mechanism:
- Discover the supported endpoint contract and authentication scope.
- Read all required pages with bounded requests and schema checks.
- Apply a reviewed operation and reconcile the returned state with the resource.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t0`

## s9-g1-t1 — REST APIs

REST-style APIs expose resources through representations and HTTP semantics; resource state and transport success must be interpreted separately.

Baseline: Two operators edit the same interface description.

Fault: The second writer overwrites a change based on a stale representation.

Acceptance: Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.

Mechanism:
- Read the resource representation and its version marker.
- Compute a minimal intended change against that observed version.
- Send the documented conditional operation and re-read after success.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t1`

## s9-g1-t2 — HTTP methods

HTTP methods have defined semantics for reading, replacing and processing resource representations; retry safety depends on both those semantics and the endpoint contract.

Baseline: A resource-creation POST times out after the server may have accepted it.

Fault: Blind retry creates a duplicate device record.

Acceptance: Reconcile by stable identity or use a documented idempotency key before resubmission.

Mechanism:
- Select the method prescribed by the endpoint.
- Distinguish a received failure from a lost response with unknown outcome.
- Retry only under an appropriate idempotency or reconciliation strategy.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t2`

## s9-g1-t3 — Authentication

Authentication establishes an identity; authorization controls that identity’s actions, while transport security protects the channel and authenticates its peer.

Baseline: A read-only service identity requests inventory over verified TLS.

Fault: A troubleshooting change disables certificate verification and logs the bearer token.

Acceptance: Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.

Mechanism:
- Retrieve a short-lived least-privilege credential through the approved secret path.
- Validate server identity and send credentials only to the intended endpoint.
- Handle expiry and authorization denial distinctly and redact diagnostic records.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t3`

## s9-g1-t4 — Cisco APIs

Cisco programmability spans product-specific APIs and model-driven interfaces; IOS XE, NX-OS and controllers must be treated as distinct supported contracts.

Baseline: An IOS XE lab target is intended to expose model-driven interface data.

Fault: A request copied from a controller API returns an unknown resource.

Acceptance: Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.

Mechanism:
- Record product, release and supported API family.
- Discover capabilities and model revisions before selecting a request.
- Test one read and one denied operation, then validate any proposed change in an owned lab.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t4`

## s9-g1-t5 — NETCONF

NETCONF uses structured RPCs and capability-advertised datastore operations to manage network configuration; transactional features are optional capabilities.

Baseline: A lab server advertises candidate and confirmed-commit capabilities.

Fault: An automation assumes those capabilities on a server that only offers writable-running.

Acceptance: Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.

Mechanism:
- Exchange hello capabilities and identify the available datastores.
- Lock and edit only according to supported operations; validate the candidate where available.
- Commit with an appropriate recovery strategy and verify running and operational state.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t5`

## s9-g1-t6 — RESTCONF

RESTCONF maps YANG-modeled data and operations onto HTTP resources using defined media types and protocol semantics.

Baseline: A client requests a keyed interface using the server’s supported module.

Fault: The client assumes a guessed path and ignores an error body because TLS succeeded.

Acceptance: Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.

Mechanism:
- Discover the RESTCONF root and supported model modules.
- Address the correct keyed resource with the required encoding.
- Use the documented operation and evaluate status, errors and a follow-up read.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t6`

## s9-g1-t7 — YANG

YANG describes the structure, types and constraints of management data; it is a modeling language, not the transport used to read or change that data.

Baseline: A keyed interface entry contains an enabled boolean and a bounded MTU.

Fault: A client sends a string boolean and an out-of-range MTU.

Acceptance: Inspect the model and reject the instance before sending; use the exact supported types and ranges.

Mechanism:
- Identify module name, namespace and revision.
- Resolve the list keys, leaf types and enabled features.
- Validate a candidate instance and compare configuration with operational observations.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t7`

## s9-g1-t8 — SNMP automation

SNMP automation queries or receives management data identified by OIDs; secure collection requires explicit security level, access views and counter interpretation.

Baseline: An interface octet counter is sampled twice sixty seconds apart.

Fault: A device reboot resets the counter and produces a negative naive rate.

Acceptance: Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.

Mechanism:
- Select an approved read view and authenticated encrypted SNMPv3 profile.
- Collect timestamped values and track discontinuities.
- Compute rates only over compatible samples and alert on missing evidence.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t8`

## s9-g1-t9 — SSH automation

SSH automation operates over an authenticated encrypted channel, but interactive CLI framing, privilege and command semantics remain application concerns.

Baseline: A lab router returns a prompt after rejecting one command.

Fault: The script marks success merely because the prompt reappears.

Acceptance: Parse the error and compare post-state; keep the rejected command visible as a failure.

Mechanism:
- Verify the host key against an approved baseline.
- Use bounded connection and read behavior with a platform-aware command boundary.
- Capture sanitized results, inspect device errors and verify the original operation.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g1-t9`

