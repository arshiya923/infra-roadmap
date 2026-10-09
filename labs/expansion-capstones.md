# Cross-domain practice workbook

9 October 2026. These three exercises connect existing lessons; they add no new
progress-bearing IDs. Use supplied assumptions unless a section explicitly asks
for a measured local observation. Real vendor/cloud operations remain separate
owned-target extensions. No purchase or production configuration is required.

## A. Network to application: follow one receipt

Prerequisites: original network lab `lab-1`, dependency mapping `ADD-INFRA-001`,
HTTP `ADD-APP-001` and TLS `ADD-APP-002`.

Objective: explain why a working link or route is weaker evidence than a correct,
authenticated application receipt.

Topology: client → naming/trust → frontend → origin → stored receipt. The executed
HTTP companion uses two loopback listeners. Its separate TLS case uses one local
TLS listener and an explicitly trusted temporary certificate. Do not merge these
two experiments into a claim that the proxy performed TLS.

Run from the project root on Linux with Python 3.10+ and OpenSSL:

```text
python3 labs/application-delivery.py --case http
python3 labs/application-delivery.py --case tls
```

Submit six artifacts:

1. Dependency diagram showing the two actual HTTP connections and separate TLS test.
2. Baseline/fault/recovery table: HTTP status/body and TLS expected-name result.
3. Fault hypothesis: backend 503 versus hostname mismatch, with evidence that
   distinguishes them from route loss, certificate expiry or Nginx failure.
4. Recovery evidence: original receipt after restoring the controlled condition.
5. Policy statement: keep certificate verification enabled; do not retry an unknown
   state-changing request without idempotency or reconciliation.
6. Cleanup and limits: listener threads closed, TLS temporary directory removed,
   no DNS/Nginx/external-network execution claimed.

Worked expectations: HTTP yields 200 receipt-17, 503 maintenance, 200 receipt-17.
TLS accepts localhost, rejects wrong.invalid specifically for hostname mismatch,
then accepts a fresh localhost request. A packet path cannot by itself prove that
receipt content is correct. Diagnose each controlled intervention separately.

Challenge: the client times out after an origin commits an order. Write a safe
reconciliation procedure keyed by transaction ID. Do not propose blind POST retries.

Acceptance: all six artifacts distinguish actual observations from supplied design,
and both local recovery conditions and cleanup are observed. No performance claim.

## B. Linux to container: recover the intended process

Prerequisites: `ADD-LINUX-001` through `003`, `ADD-CONT-001`.

Objective: connect identity, file access, process exit and container data lifetime.
Run as an ordinary Linux user; never use root to bypass the intended permission test.

```text
python3 labs/linux-operations.py --case access
python3 labs/linux-operations.py --case process
python3 labs/container-operations.py --case container
```

Container prerequisites: owned Docker engine, Compose and an already cached
nginx:alpine image. The script never pulls, mounts host paths or exposes ports.
If these prerequisites are absent, record that execution as unavailable; do not
substitute an offline result and call it a container run.

Submit: acting UID/mode table; actual read denial/recovery; process exit/stdout table;
image ID and runtime authority; writable/persistent-state map; cleanup record.

Worked expectations: owner access changes 640 → 000 → 640 with a real denial and
byte equality after restore. The child exits 0/3/0 with READY/DISABLED/READY. The
container runs UID 65534 and its private marker changes ready/not-ready/ready.
The Nginx image supplies a shell; no Nginx service is launched. Docker health checks,
Compose deployment, systemd units and cgroup stress are not part of these results.

Challenge: a new image UID cannot read an old persistent volume. List identity,
ownership, ACL and runtime-policy observations before proposing a narrow repair.
Do not change an unrelated real volume to reproduce the exercise.

Acceptance: no broad permission changes, no root workaround, no shared-service
restart and no leftover labelled container. Explain why temporary marker writes
are not durable application data or independently protected backups.

## C. Observe, budget and defend recovery

Prerequisites: `ADD-INFRA-002`, `ADD-CONT-003`, `ADD-CLOUD-001` through `003` and
the existing enterprise capstone.

Objective: connect service objectives, survivor capacity, data loss and fictional
cost without claiming that one successful local test certifies a cloud design.

```text
python labs/infrastructure-rehearsal.py --case objectives
python labs/container-operations.py --case recovery
python labs/cloud-planning.py --case capacity
python labs/cloud-planning.py --case cost
```

Submit a one-page design defense with these explicitly separate observations:

| Dimension | Supplied or actual evidence | Acceptance question |
|---|---|---|
| Service objective | Supplied 10,000 requests, 20 bad, target 99.9% | Why does -10 budget remain after the sample? |
| Data | Actual local snapshot restore loses acknowledged order-3 | Who accepts that loss and what data point was restored? |
| Capacity | Three supplied zones × 60 units; demand 100 | Which one/two-zone losses fit? |
| Cost | Fictional 123.50 baseline, 233.00 fault, budget 150 | Which quantities changed and which charges are excluded? |
| Recovery authority | Written identity/key/ownership plan | Can the intended operator use the protected recovery copy? |
| Cleanup | Local owned-file cleanup | What additional resource/billing evidence would a real cloud drill need? |

Worked answers: 20 bad exceeds the ten-event allowance by ten. Restoration matches
the saved bytes but excludes the post-snapshot order. One zone loss leaves 120
units, while two leave 60. Doubling instances adds 109.50 fictional units and
exceeds the budget by 83. No provider rate, availability or billing-stop claim follows.

Challenge: propose a cost reduction and show that survivor capacity, data protection
and service objectives still hold. If evidence is absent, label the requirement
unverified rather than replacing it with an optimistic assumption.

## Reusable evidence form and review rubric

Record: exercise/revision; owned scope; operator; platform/version; hypothesis;
baseline; exact command; exit status; observed fault; recovery action; original
operation after recovery; acknowledged-data difference; cleanup; limitations.
Keep secret values out of the shared form. Preserve uncertainty in timing and cause.

Accept the educational submission only when every required artifact is present,
calculations are independently checked, actual outputs support the claimed local
scope and unexecuted platform work is labelled. A failed or unavailable execution
remains visible. Operational deployment additionally requires supported targets,
approved changes and target-specific evidence; this workbook does not provide it.
