# Enterprise architecture design rehearsal

Original objective: design and document the complete enterprise capstone. Use version-controlled automation, validation and rollback to reproduce the infrastructure.

This workbook retains that design objective. The executable companion proves only local validation, rendering and file restoration. A complete physical or virtual enterprise deployment is a guided extension requiring an owned compatible lab; it is not performed by this course.

## Proposed service and topology

Two sites serve an internal application through explicit zones. Each site has edge connectivity, management, application and data scopes. Administrators enter through a controlled management path; guests have only the public application path. Identity, DNS, time, observability and recovery keys are listed dependencies with owners. Determine whether each is independent of a failed site; a duplicate icon is not proof of independence.

```text
approved Git revision -> schema -> rendered artifact + digest -> reviewed diff
                                                             |
                                                canary -> verify -> expand
                                                             |
                  Site A <---- declared replication ----> Site B
             management / app / data                    management / app / data
                  |                                           |
                  +---- independent recovery access ----------+
```

Replication mode, routing, storage and HA products are decisions the learner must justify against the application consistency contract. The local script does not select or configure a vendor implementation.

## Authority and policy matrices

| Fact | Authority | Observation | Change path |
|---|---|---|---|
| Allowed flows | Security owner and reviewed intent | Controlled source-zone tests | Reviewed policy diff |
| Address reservations | IPAM owner | Interface and conflict observations | Atomic reservation before provisioning |
| Rendered configuration | Approved revision and pinned renderer | Digest and post-read | Canary then expansion |
| Runtime health | Service owner defines acceptance | Client probe, metrics, logs and traces | Incident procedure |
| Recovery objective | Business owner | Timed restore and data reconciliation | Reviewed recovery design |

| Source | Destination | Service | Decision |
|---|---|---|---|
| Guest | App | HTTPS | Allow |
| App | Data | Database | Allow |
| Admin | App or Data | SSH | Allow |
| Any other tuple | Any | Any | Deny |

These labels define a teaching relation. Real implementation needs addresses, identity controls, routing, transport details, return traffic and enforcement on alternate paths. The browser evaluates the relation; it sends no packets.

## Capacity and recovery acceptance

Three homogeneous nodes each provide 100 abstract units and reserve 20. With one node unavailable, two survivors provide 160 units for a 140-unit demand. This aggregate envelope omits placement, quorum, replication and latency. Repeat the calculation for two failures and explain why the same demand no longer fits.

For the worked site placement, put two nodes in Site A and one in Site B. Losing Site B leaves 160 units; losing Site A leaves only 80. Therefore this initial design does not satisfy full site-loss capacity for 140 units, even though it passes the one-node envelope. A proposed symmetric two-node-per-site design would leave 160 units after either site loss, before considering data, quorum and network constraints. Record the added resource cost and test those remaining constraints rather than treating the arithmetic as deployment evidence.

The serial recovery budget is detection 10 + decision 10 + restoration 30 + validation 20 = 70 minutes. Against a 60-minute RTO this has a 10-minute gap. A usable recovery point 40 minutes old exceeds the 15-minute RPO by 25 minutes. These deliberate failures must remain visible in the design review. Reduce the critical path and point age with justified changes, then measure a real exercise before claiming that the objectives are met.

## Executable local procedure

From the course root with Python 3.10+:

```text
python labs/automation-lab.py --run
python labs/automation-lab.py --run --inject-failure applied
```

The normal command validates two device records, rejects a boolean VLAN, renders a deterministic local plan, changes the owned file, proves a second application is a no-op, injects file drift, rejects a stale write, restores original bytes and removes its owned temporary directory. It returns JSON with `PASS`, `changed: true`, `secondChanged: false`, `staleRejected: true`, `restored: true` and `cleaned: true`.

The second command intentionally returns exit code 2 and `INTERRUPTED`; restoration and cleanup must still be true. Other supported interruption phases are `validated`, `drifted` and `restored`. Running without `--run` prints help. No user-supplied deletion path is accepted. The digest guard is a single-process demonstration, not a filesystem lock or distributed compare-and-swap. The local plan format is deliberately not vendor CLI.

## Guided platform and version-control extension

1. Create an owned disposable repository and record intent, templates, schema, tests and this design. Keep secrets in an appropriate external mechanism. Inspect the working and staged diffs before recording a revision.
2. Pin supported tool, collection, provider and platform versions. Record exact model or API capabilities and the device ownership boundary.
3. Generate a concrete artifact from the reviewed revision. Preserve its digest; do not rebuild silently during promotion. Validate syntax, schema, intended targets and destructive changes.
4. Collect baseline state and an independently tested restore path. Ensure a management path survives the failure to be tested.
5. Execute one canary operation, collect per-target results and verify intended and denied flows from their real source zones. Stop on unexpected identity, state or scope.
6. Test one specified node or site failure in the owned platform. Observe application consistency, client success, survivor capacity and recovery time; account for detection and validation. Restore the captured baseline before the next fault.
7. Re-run the same intended change and inspect whether it has additional effects. Idempotence must be established for the actual module or API operation, not inferred from declarative syntax.
8. Review drift, stale-plan and interrupted-run behavior. Use supported locking or preconditions where available; plan compensating actions for partial application.
9. Restore owned resources, remove temporary credentials and reconcile inventory. Preserve sanitized evidence and list every untested requirement.

## Required submission

Submit physical, logical and policy views; address and authority tables; application dependency map; common failure domains; capacity calculations; RTO/RPO definitions; upgrade and retirement considerations; alert ownership; a rollback runbook; exact revision/artifact identity; and baseline/fault/recovery evidence. Label actual local operations, supplied calculations, authored scenarios and optional platform observations separately. A local PASS does not certify the enterprise design or close its deliberate recovery-budget gaps.
