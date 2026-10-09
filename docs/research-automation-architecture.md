# Automation & Infrastructure Architecture source review

Reviewed 2026-10-09 by the primary assistant. No GapCode or delegated authorship was used. The source registry is in `tools/build-automation.py`; every lesson links its applicable primary references. These are source-backed teaching cases, not copied vendor transcripts.

## Contracts and versions

- Python examples use the Python 3.10+ standard library and were executed on the installed Python runtime. Python 3.12 documentation supplies the reference contract. The YAML lesson distinguishes YAML 1.2.2 from parser-specific implicit typing; no YAML engine is installed or certified by the lab.
- HTTP semantics use RFC 9110. NETCONF, RESTCONF and YANG use RFC 6241, RFC 8040 and RFC 7950 respectively. Optional NETCONF capabilities are never assumed from transport availability. SSH and SNMP security discussions use RFC 4253 and RFC 3414; algorithm selection must follow current target support and security policy.
- Netmiko, Paramiko, NAPALM and Requests project references were retrieved. Their lessons describe the supported contract and responsibility boundaries; no remote library session is claimed. The Requests documentation retrieved identifies 2.34.2; Jinja references the 3.1 documentation line. Pin and test the actual installed dependencies before optional use.
- The Ansible network guide and Cisco IOS interfaces resource-module reference were retrieved. The latter identified collection 11.5.1 and its documented test context. This does not certify an arbitrary IOS XE target or imply NX-OS interchangeability. Rendering, gathered data and deployed state remain distinct.
- Pro Git, GitHub Actions secure-use guidance, GitLab protected environments, Terraform introduction/state documentation and NetBox documentation were retrieved. Product editions and backend features vary; no current pricing, license entitlement or universal locking claim is made.
- NIST SP 800-34 Rev. 1 supplies contingency-planning context. Google SRE monitoring and OpenTelemetry signal documentation support evidence and signal distinctions. Cisco IOS XE hardening guidance supports the plane separation. A first Cisco hardening URL failed retrieval; the official `sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening` source was located instead and is the lesson link.

## Editorial checks

The lessons distinguish syntax from schema, strings from booleans, rendering from deployment, transport completion from postconditions, idempotent effects from identical responses, recovery objectives from measured recovery, and authority from observation. Cases and assessments were authored specifically for each original topic. The generated shared sections supply a consistent operating procedure, while the topic records carry mechanisms, terminology, incident diagnoses and distinct questions.

The architecture exercise deliberately fails the supplied RTO and RPO budgets. The normal local lab PASS refers to successful execution of its checks, restoration and cleanup; it does not erase those design gaps. Browser capacity and policy results are calculations over supplied assumptions. Live device configuration, service failover, external API calls and enterprise deployment remain guided extensions.

## Reproduce evidence

Run `node tests/automation-models.cjs`, `python tests/automation-lab.py`, and `python tests/automation-content.py BATCH` with BATCH 22, 23 or 24. Browser checks use the existing local reader server, Microsoft Edge and Playwright, following the same dependency setup documented for the course. Acceptance records bind the reviewed lesson and question objects to hashes; immutable source and learner self-reported progress are preserved.
