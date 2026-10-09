# Automation & Infrastructure Architecture — Batch 23

The incident statements are authored teaching cases. The inspector reads these cases; it does not execute vendor operations. Python 3.10+ runs the separate local architecture lab with only standard-library dependencies. External packages and device procedures require a separately pinned, supported disposable environment.

## Evidence procedure

1. Identify the intended operation, authoritative input and observer.
2. Predict a baseline result and a discriminating fault observation.
3. Compare the authored case with the model scope; do not label either as captured device evidence.
4. Record the narrow repair, positive postcondition, negative test and rollback.
5. Run the local lab where relevant and preserve its actual JSON evidence separately.

## s9-g2-t0 — Netmiko

Netmiko provides platform-aware SSH CLI interactions for network devices; it simplifies sessions without turning textual commands into guaranteed transactions.

Baseline: A configuration set contains one valid and one invalid command.

Fault: The connection remains open and the first command stays applied after the second fails.

Acceptance: Report partial application, compare the captured baseline and restore only the changed owned setting.

Mechanism:
- Select the driver for the actual supported platform and verify host identity.
- Send a bounded read operation and inspect command output.
- Apply only a reviewed small change and collect post-state independently.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g2-t0`

## s9-g2-t1 — Paramiko

Paramiko exposes SSH client, transport and channel primitives; callers own command framing, host-key policy and output handling.

Baseline: A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully.

Fault: The script reads stdout only and claims a successful empty result.

Acceptance: Collect stderr and exit status, preserve failure and close the client even when processing raises.

Mechanism:
- Load approved host keys and keep a rejecting policy for unknown peers.
- Connect with bounded timeouts and run a command suited to the remote system.
- Read output and errors, inspect completion and close the session.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g2-t1`

## s9-g2-t2 — NAPALM

NAPALM offers a common driver interface for network getters and configuration operations; actual feature support and semantics depend on the driver and device.

Baseline: A merge-only change is accidentally prepared as a full replacement.

Fault: The diff includes removal of unrelated management configuration.

Acceptance: Discard the candidate; select the intended mode and accept only the bounded diff before any commit.

Mechanism:
- Check driver support for the required operation.
- Load a merge or replacement candidate into the supported workflow and inspect the diff.
- Commit only a reviewed candidate, verify state and use the supported recovery operation if needed.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g2-t2`

## s9-g2-t3 — Requests

Requests is an HTTP client library; a correct automation client still specifies timeouts, validates status and schema, and handles uncertain write outcomes.

Baseline: An endpoint returns an HTML error page with status 503.

Fault: The client calls json and masks the original HTTP failure.

Acceptance: Check the status and content contract, report sanitized server context and retry only within the read budget.

Mechanism:
- Set explicit connection/read timeouts and retain TLS verification.
- Check status before interpreting the expected body schema.
- Handle pagination and retry only with documented operation semantics.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g2-t3`

## s9-g3-t0 — Ansible

Ansible coordinates declared tasks over an inventory using connection plugins and modules; repeatability depends on module semantics and controlled input.

Baseline: A network task is intended for a single lab group.

Fault: The play targets all and changes unrelated devices.

Acceptance: Resolve and inspect the host set before execution, constrain the play and retain a canary gate.

Mechanism:
- Resolve inventory, variables and connection settings.
- Preview supported changes on one owned canary.
- Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t0`

## s9-g3-t1 — Ansible Inventory

Ansible inventory maps host identities, groups and variables to connection targets; reviewing the resolved inventory prevents accidental scope expansion.

Baseline: edge-1 is an alias whose ansible_host should identify a disposable device.

Fault: A group variable points the alias at a production address.

Acceptance: Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.

Mechanism:
- Load the approved inventory source.
- Resolve aliases, groups and effective variables.
- Compare the resulting host set with the authorized change scope.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t1`

## s9-g3-t2 — Ansible Playbooks

A playbook orders plays and tasks over selected hosts, with explicit failure handling and notifications; successful syntax is not successful change execution.

Baseline: A service update should notify a restart only when its configuration changes.

Fault: A task always reports changed and triggers unnecessary restarts.

Acceptance: Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.

Mechanism:
- Validate syntax and the resolved host list.
- Execute a canary with clear preconditions and postconditions.
- Expand only after acceptance and keep rollback separate from cleanup.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t2`

## s9-g3-t3 — Cisco Ansible modules

Cisco Ansible modules live in platform collections with defined resource states and connection requirements; module choice must match the device family and supported release.

Baseline: An interface task intends to merge a description on one port.

Fault: A broad replacement removes other interface settings.

Acceptance: Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.

Mechanism:
- Identify the collection, module documentation and platform support.
- Inspect the desired resource data and predicted diff where supported.
- Run against one owned device and verify resource state and unrelated settings.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t3`

## s9-g3-t4 — Templates

Templates turn validated variables into text artifacts; deterministic rendering and explicit missing-variable behavior are prerequisites for reviewable configuration.

Baseline: A VLAN template needs an integer ID and a description.

Fault: A missing value renders an incomplete command that is still sent.

Acceptance: Fail rendering on missing input and require inspection of the complete artifact before deployment.

Mechanism:
- Validate required variables and allowed values.
- Render deterministically without contacting a target.
- Lint the result and compare a narrow diff before applying.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t4`

## s9-g3-t5 — Jinja2

Jinja evaluates templates with variables, filters and control structures; strict undefined handling and a controlled environment prevent missing data from disappearing silently.

Baseline: A template expects interface.description in every input record.

Fault: An absent description becomes empty output under permissive undefined handling.

Acceptance: Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.

Mechanism:
- Create a controlled rendering environment.
- Provide validated data and reject missing required fields.
- Inspect the rendered text and test representative edge cases.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g3-t5`

## s9-g4-t0 — Git

Git records content snapshots and relationships between commits; the working tree, staging area and committed history are distinct states.

Baseline: An operator fixes a template but forgets to stage it.

Fault: The tested working file differs from the committed version used by CI.

Acceptance: Review staged and unstaged diffs; test the exact committed artifact that will be deployed.

Mechanism:
- Inspect working changes and preserve unrelated edits.
- Stage only the intended files and review the staged diff.
- Create a traceable commit, test that revision and retain the deployment evidence separately.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g4-t0`

## s9-g4-t1 — GitHub / GitLab

GitHub and GitLab add collaboration and pipeline controls around Git repositories; branch reviews, runner trust and deployment permissions are separate controls.

Baseline: A reviewed branch receives a new commit after approval.

Fault: A deployment uses an untested artifact built from the changed head.

Acceptance: Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.

Mechanism:
- Submit a bounded diff with validation evidence.
- Run untrusted contributions without privileged deployment credentials.
- Approve the tested revision and promote the same artifact under environment controls.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g4-t1`

## s9-g4-t2 — Version control

Version control preserves the history and review context of infrastructure intent, templates and tests; state external to the repository still needs reconciliation.

Baseline: A restored configuration is said to be last week’s version.

Fault: No commit or artifact digest identifies which bytes were restored.

Acceptance: Record the exact revision and rendered digest; compare post-state with that captured baseline.

Mechanism:
- Record intent and its rationale in a bounded revision.
- Build reproducible artifacts from that revision.
- Attach observed deployment and rollback evidence to the same content identity.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g4-t2`

## s9-g4-t3 — Infrastructure as Code

Infrastructure as Code expresses infrastructure intent as reviewable machine-readable definitions, then reconciles it with observed resources through controlled execution.

Baseline: A manually changed firewall object differs from the stored definition.

Fault: An unattended apply overwrites the emergency fix.

Acceptance: Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.

Mechanism:
- Read authoritative intent and current resource state.
- Produce and review a bounded plan with destructive actions explicit.
- Apply with concurrency control, verify outcomes and reconcile remaining drift.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g4-t3`

## s9-g4-t4 — Terraform fundamentals

Terraform combines configuration, provider operations and state mappings to plan resource changes; state is sensitive operational data and not merely a cache.

Baseline: Two operators plan against the same resource state.

Fault: Concurrent writes produce conflicting state or an obsolete plan.

Acceptance: Use a backend with appropriate locking support, serialize changes and replan after state changes.

Mechanism:
- Initialize the approved provider and backend configuration.
- Inspect the plan, including replacements and deletions.
- Apply with supported locking and verify real resource outcomes and state consistency.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g4-t4`

## s9-g5-t0 — Infrastructure documentation

Infrastructure documentation records intent, dependencies and operating procedures with ownership and revision context so another operator can act without guessing.

Baseline: A recovery runbook names a retired management endpoint.

Fault: The standby operator cannot reach the control interface during an outage.

Acceptance: Replace the endpoint with verified inventory references and test the independent management route.

Mechanism:
- Describe service goals and dependency ownership.
- Write baseline, failure, recovery and validation procedures.
- Exercise the document with another operator and update it from observed gaps.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t0`

## s9-g5-t1 — Network diagrams

Network diagrams show selected relationships at an explicit layer; physical links, logical reachability and security policy need distinct labels.

Baseline: Two WAN lines appear redundant on a logical diagram.

Fault: Both enter the same conduit and fail together.

Acceptance: Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.

Mechanism:
- Choose the question and layer before drawing.
- Label identities, interfaces, zones and shared dependencies.
- Cross-check the diagram against inventory and a representative observed path.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t1`

## s9-g5-t2 — IP Address Management

IP Address Management records address-space allocation, ownership and scope so provisioning can prevent conflicts before activation.

Baseline: Two provisioning jobs select the same free address in one VRF.

Fault: Both read availability before either reservation is recorded.

Acceptance: Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.

Mechanism:
- Locate the authoritative prefix and tenant or VRF.
- Check overlap and uniqueness under that scope, then reserve the intended address.
- Reconcile allocation with observed use and release only confirmed retired assignments.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t2`

## s9-g5-t3 — NetBox

NetBox models infrastructure intent and inventory relationships, including devices and IPAM; it requires governance and reconciliation with observed infrastructure.

Baseline: A device record has the intended management IP but the actual interface differs.

Fault: Automation treats the inventory record as proof of live connectivity.

Acceptance: Separate intended and observed values, investigate drift and update only through the designated owner.

Mechanism:
- Define authoritative fields and ownership rules.
- Read records with filters and complete pagination.
- Validate relationships and reconcile intended records with independent observations.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t3`

## s9-g5-t4 — Configuration management

Configuration management maintains approved settings through baselines, drift detection, controlled changes and verified restoration.

Baseline: A device has an emergency DNS fix not yet reflected in intent.

Fault: Nightly automation restores the broken baseline without investigation.

Acceptance: Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.

Mechanism:
- Collect and sanitize current state.
- Compare relevant settings with the approved baseline.
- Authorize the smallest reconciliation and verify both desired state and protected unrelated settings.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t4`

## s9-g5-t5 — Source of truth

A source of truth assigns authority for specific facts and a controlled update path; it does not imply one system knows every intended and observed value.

Baseline: Git defines VLAN intent while discovery records actual interfaces.

Fault: A sync loop copies observations into intent and then deploys them back, erasing review.

Acceptance: Make synchronization directional per field, preserve provenance and require review for intent changes.

Mechanism:
- Map each field to an authoritative owner.
- Collect observations separately with timestamps.
- Resolve conflicts through a documented policy and record provenance.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t5`

## s9-g5-t6 — CI/CD concepts

CI/CD links a revision to automated checks and controlled promotion; infrastructure delivery must handle state, credentials and partial changes explicitly.

Baseline: A validated configuration artifact is rebuilt during deployment.

Fault: A changed dependency produces different bytes from the tested artifact.

Acceptance: Promote the stored digest-identified artifact and fail if its identity differs from the approved one.

Mechanism:
- Validate schema, render and test the proposed revision.
- Store the exact artifact and review its plan.
- Promote to a canary, verify and either expand or restore the captured baseline.

Companion limit: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.

Evidence command: `python labs/automation-evidence.py --topic s9-g5-t6`

