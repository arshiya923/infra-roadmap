# Automation & Infrastructure Architecture — Batch 24

The incident statements are authored teaching cases. The inspector reads these cases; it does not execute vendor operations. Python 3.10+ runs the separate local architecture lab with only standard-library dependencies. External packages and device procedures require a separately pinned, supported disposable environment.

## Evidence procedure

1. Identify the intended operation, authoritative input and observer.
2. Predict a baseline result and a discriminating fault observation.
3. Compare the authored case with the model scope; do not label either as captured device evidence.
4. Record the narrow repair, positive postcondition, negative test and rollback.
5. Run the local lab where relevant and preserve its actual JSON evidence separately.

## s9-g6-t0 — High Availability

High availability keeps a service usable through specified component failures using redundancy, detection and controlled failover; shared dependencies bound its protection.

Baseline: Two service nodes each support 100 requests/s and normal demand is 140.

Fault: One node fails and the survivor is overloaded despite redundancy.

Acceptance: Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.

Mechanism:
- Define the protected service and failure set.
- Provide independent required dependencies and surviving capacity.
- Inject one bounded failure and measure client-visible recovery and integrity.

Companion limit: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t0`

## s9-g6-t1 — Disaster Recovery

Disaster recovery restores an accepted service state after a major disruption using protected data, configuration, dependencies and a tested recovery procedure.

Baseline: Database backups exist but encryption keys are absent at the recovery site.

Fault: Restore cannot produce usable application data.

Acceptance: Include protected key recovery and dependency ownership, then repeat an isolated full service restore.

Mechanism:
- Define loss and outage objectives for the service.
- Retain recoverable data and the configuration needed to use it.
- Restore into an isolated target and verify application consistency and access before cutover.

Companion limit: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t1`

## s9-g6-t2 — Business Continuity

Business continuity sustains prioritized business activities through disruption, including people, facilities, suppliers and temporary manual workarounds.

Baseline: A restored order system is inaccessible because staff cannot reach the site.

Fault: Technical recovery is reported as full business recovery.

Acceptance: Validate staffed access, communications and the manual-order reconciliation path with the business owner.

Mechanism:
- Identify activities, owners and tolerable disruption.
- Map technical and nontechnical dependencies.
- Exercise the workaround and the return to normal, including data reconciliation.

Companion limit: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t2`

## s9-g6-t3 — RTO

Recovery Time Objective is the target maximum interruption for a defined service and acceptance criterion; measured recovery time must include the agreed start and finish boundaries.

Baseline: A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation.

Fault: Only the 30-minute restore is reported against the objective.

Acceptance: Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.

Mechanism:
- Define when the outage clock starts and the required service test.
- Budget detection, decision, restore and validation time.
- Measure an exercise end-to-end and compare with the objective.

Companion limit: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t3`

## s9-g6-t4 — RPO

Recovery Point Objective is the target tolerance for loss of recent data, measured relative to an accepted recoverable point and the incident reference time.

Baseline: Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old.

Fault: The team reports a 15-minute RPO as achieved from the schedule alone.

Acceptance: Use the actual usable point age, report the 25-minute gap and repair the failed protection process.

Mechanism:
- Define which transactions and reference time matter.
- Verify the most recent consistent recoverable point.
- Measure its age and reconcile missing acknowledged work.

Companion limit: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t4`

## s9-g6-t5 — Redundant Data Centers

Redundant data centers protect against specified site failures only when capacity, data, connectivity and operational dependencies remain usable at the survivor.

Baseline: Two sites share one identity service hosted only at site A.

Fault: Site B has compute and data but users cannot authenticate after A fails.

Acceptance: Provide a supported identity recovery or redundancy design and include it in the site-loss test.

Mechanism:
- Map which dependencies survive a site loss.
- Budget replication behavior and remaining service capacity.
- Exercise site isolation with fencing, traffic control and application validation.

Companion limit: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t5`

## s9-g6-t6 — Active/Active

Active/active architecture serves work from multiple instances or sites at once; write coordination, session behavior and failure routing determine correctness.

Baseline: Two sites accept updates to the same customer record during a link partition.

Fault: Both acknowledge incompatible writes without a conflict policy.

Acceptance: Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.

Mechanism:
- Partition or coordinate mutable state explicitly.
- Route work using health and application constraints.
- Remove one active domain and verify both consistency and surviving capacity.

Companion limit: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t6`

## s9-g6-t7 — Active/Passive

Active/passive architecture keeps a standby ready to take over from a primary; promotion requires usable state, sufficient capacity and prevention of competing primaries.

Baseline: The primary loses its heartbeat network but continues writing.

Fault: The standby promotes without fencing and both write.

Acceptance: Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.

Mechanism:
- Maintain standby state and verify readiness.
- Establish that the old owner cannot conflict before promotion.
- Promote, validate client operations and plan controlled failback.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t7`

## s9-g6-t8 — Load Balancing

Load balancing distributes requests or connections among eligible backends; health checks, persistence and draining determine how safely membership changes.

Baseline: A backend accepts TCP but cannot query its database.

Fault: A port-only check keeps routing failing requests to it.

Acceptance: Use an appropriate application readiness check and validate actual client behavior after removal.

Mechanism:
- Define a health test representative of the service.
- Select among healthy backends with an appropriate algorithm.
- Drain a backend for change and verify client errors and remaining load.

Companion limit: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.

Evidence command: `python labs/automation-evidence.py --topic s9-g6-t8`

## s9-g7-t0 — Network segmentation

Network segmentation defines separate communication scopes and explicit permitted paths; a VLAN or subnet boundary alone is not a complete security policy.

Baseline: Guest clients must reach a public service but never device administration.

Fault: Routing between VLANs is enabled without a filtering policy.

Acceptance: Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.

Mechanism:
- Map required service flows and prohibited flows.
- Place enforcement on every relevant path.
- Test one allowed and one denied flow from the actual source context.

Companion limit: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.

Evidence command: `python labs/automation-evidence.py --topic s9-g7-t0`

## s9-g7-t1 — Management Plane

The management plane provides administrative access to infrastructure; it needs constrained identities, protected paths and recovery access independent of the service being repaired.

Baseline: A routing mistake removes the only path to the management interface.

Fault: The team cannot reach the device to restore the route.

Acceptance: Use the pretested independent console or management path and restore the captured route without exposing administration to guests.

Mechanism:
- Inventory management endpoints and permitted operators.
- Restrict paths and privileges while retaining a tested recovery method.
- Audit administrative actions and exercise loss of the normal in-band path.

Companion limit: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.

Evidence command: `python labs/automation-evidence.py --topic s9-g7-t1`

## s9-g7-t2 — Control Plane

The control plane learns and computes forwarding state through protocols and local logic; protecting it preserves convergence and device stability.

Baseline: OSPF adjacency is healthy but a route loses selection to another source.

Fault: Troubleshooting restarts the neighbor instead of examining route preference.

Acceptance: Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.

Mechanism:
- Identify required protocol peers and expected state.
- Inspect adjacency and route selection before assuming forwarding behavior.
- Verify installed state and protect control traffic within measured requirements.

Companion limit: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.

Evidence command: `python labs/automation-evidence.py --topic s9-g7-t2`

## s9-g7-t3 — Data Plane

The data plane forwards or drops traffic using installed state and policy; end-to-end observations must match the packet, direction and actual path.

Baseline: A route is present but an egress policy drops the required flow.

Fault: The operator treats a valid route as proof the application should work.

Acceptance: Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.

Mechanism:
- Define the source, destination, protocol and packet properties.
- Trace ingress policy, lookup and egress handling.
- Correlate counters or captures with a controlled positive and negative test.

Companion limit: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.

Evidence command: `python labs/automation-evidence.py --topic s9-g7-t3`

## s9-g8-t0 — Observability

Observability is the ability to investigate system behavior from emitted evidence; metrics, logs and traces answer complementary questions with known coverage limits.

Baseline: Latency rises after a dependency change while CPU remains normal.

Fault: Investigation stops because the infrastructure dashboard is green.

Acceptance: Trace slow requests to the dependency and compare latency and error signals with the change window.

Mechanism:
- Start from a user-visible symptom and time window.
- Correlate metrics, logs and traces by service and request context.
- Test a causal hypothesis and record remaining blind spots.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t0`

## s9-g8-t1 — Monitoring

Monitoring evaluates selected signals against operational expectations and routes actionable alerts to owners; alert quality depends on user impact and response design.

Baseline: A probe stops reporting and the dashboard shows its last green value.

Fault: The absence of new samples is treated as continued health.

Acceptance: Add freshness detection, mark unknown state explicitly and test the notification path.

Mechanism:
- Define a meaningful service signal and evaluation window.
- Set actionable conditions and test missing-data behavior.
- Exercise notification, diagnosis and recovery before relying on the alert.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t1`

## s9-g8-t2 — Logging

Logs are timestamped event records that support investigation and audit; structure, correlation, retention and redaction determine their usefulness.

Baseline: An API failure log includes the entire Authorization header.

Fault: An operational log becomes a credential exposure.

Acceptance: Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.

Mechanism:
- Emit events with severity, identity and sanitized context.
- Transport and store them with loss and freshness monitoring.
- Query a bounded incident window and correlate with other evidence.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t2`

## s9-g8-t3 — Metrics

Metrics summarize measured quantities over time; type, units, aggregation and label cardinality determine whether the resulting calculations are meaningful.

Baseline: A service labels every metric with a unique request ID.

Fault: Series count grows with each request and exhausts the monitoring budget.

Acceptance: Keep bounded dimensions on metrics and use logs or traces for per-request identity.

Mechanism:
- Define units, labels and the measurement population.
- Collect with explicit intervals and reset behavior.
- Aggregate compatible series and compare distributions as well as averages.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t3`

## s9-g8-t4 — Tracing

Distributed tracing records spans of work linked by propagated context, allowing a request’s path and dependency timing to be investigated.

Baseline: An inbound request calls a database through an uninstrumented client.

Fault: The trace shows unexplained parent time without a dependency span.

Acceptance: Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.

Mechanism:
- Create spans around meaningful operations.
- Propagate context through supported service boundaries.
- Inspect slow and failed traces while accounting for sampling and clock limits.

Companion limit: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t4`

## s9-g8-t5 — Capacity Planning

Capacity planning forecasts required resources under growth and failure scenarios using measured workload behavior, headroom and provisioning lead time.

Baseline: A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure.

Fault: A six-month procurement starts only when utilization reaches the limit.

Acceptance: Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.

Mechanism:
- Measure the bottleneck resource and representative peaks.
- Project demand under an explicit growth assumption and failure state.
- Trigger expansion early enough to test capacity before the limit is reached.

Companion limit: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t5`

## s9-g8-t6 — Infrastructure Lifecycle Management

Infrastructure lifecycle management plans acquisition, operation, upgrades and retirement with support, security, dependency and data-handling responsibilities.

Baseline: An old appliance is powered off but its credentials and DNS remain active.

Fault: A replacement or reused address inherits stale access assumptions.

Acceptance: Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.

Mechanism:
- Inventory versions, owners and dependencies with support evidence.
- Test an upgrade and its recovery path before a staged rollout.
- Retire data, access, addresses and records under the approved retention policy.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g8-t6`

## lab-9 — Architecture design rehearsal

An architecture rehearsal connects approved intent, generated configuration, policy, capacity and recovery evidence into one reproducible service design.

Baseline: A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO.

Fault: A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step.

Acceptance: Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims.

Mechanism:
- Design two sites with management, application and data zones and explicit owners.
- Validate intent, render a deterministic plan and rehearse a guarded change in owned local files.
- Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-lab.py --run`

