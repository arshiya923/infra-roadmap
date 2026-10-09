# Enterprise Data Center Architecture Capstone

Worked reference and submission workbook · 2026-10-09 · Batch 28

This is a fictional design for an order-entry service. All sizing, dates within scenarios, budgets and addresses are supplied teaching assumptions. The local Python companion executes database recovery only. Device, power, SAN, hypervisor and site operations below are guided exercises requiring an owned test environment; none is represented as deployed.

## Brief and acceptance contract

Serve 500 office users and external HTTPS clients at a supplied peak demand of 140 abstract compute units. Protect against one host, Ethernet link, firewall member or FC fabric failure at Site A, with surviving capacity and policy intact. A whole-site incident permits a declared recovery workflow to Site B. Targets: service RTO 60 minutes and RPO 15 minutes. These are approved fictional requirements, not measured capabilities. Availability percentages cannot be inferred from these targets or from a single successful drill.

The accountable service owner accepts business loss; the network, compute, storage and security owners sign their boundaries; the incident commander authorizes cutover after fencing and recovery evidence. Scope excludes real purchasing, licensing, electrical engineering, vendor command execution and production cutover. Pin exact supported versions and compatibility matrices before implementing this reference. Accept no requirement on a diagram alone.

Submit the following 15 original engineering deliverables. Each needs an owner, revision, assumption list, decision rationale, observed evidence or an explicit guided/unexecuted label, and a rollback criterion. The worked values are a starting point; changing a dependency requires updating every affected artifact.

## 1. Logical network diagram

```text
Internet: ISP A / ISP B
        -> edge routers A/B -> firewall HA pair -> redundant routed core
        -> two spines -> four leaves -> host Ethernet NICs -> guest app/data
Campus distribution/access + wireless -> core -> explicit zone policy

Host HBA A -> SAN A -> supported array target ports (FC path A)
Host HBA B -> SAN B -> supported array target ports (FC path B)
Protected admin entry -> OOB switches -> console / management ports
Backup service -> separately administered protected copies -> Site B restore
```

Every leaf has a routed link to each spine; spines do not imply direct host attachment. EVPN supplies an overlay control plane if VXLAN is selected; it is not a synonym for the IP underlay. This design selects a routed fabric with a guided EVPN/VXLAN extension. ACI would be a separate operating-model decision, not an extra protocol to stack onto it. Draw actual northbound border connections and southbound NIC bonding for the chosen platform before installation; do not assume vPC is supported everywhere.

There is no FC cable from an Ethernet leaf to SAN A/B in this native FC design. Two FC fabrics reduce fabric failure exposure; a shared array, software release or power dependency remains a shared risk. The original roadmap diagram remains an immutable conceptual reference; this attachment map clarifies its workload-dependency line to storage.

## 2. Physical network diagram

```text
SITE A (reference layout; cable identities in the schedule below)
N1 network rack             C1 compute rack             D1 storage rack
S1 ---- routed ---- L1 ----- NIC1 H1 HBA1 --------------- SAN-A -- array targets
 |                  |            H2 HBA1 ---------------   |
 |                  |            H3 HBA1 ---------------   |
S2 ---- routed ---- L2 ----- NIC2 H1 HBA2 --------------- SAN-B -- array targets
                                 H2 HBA2 ---------------   |
                                 H3 HBA2 ---------------   |
L1 and L2 each uplink to BOTH S1 and S2 (cross-links omitted for legibility).
NIC1/NIC2 paths repeat for H2/H3. L3/L4 reserve the next host group.
Each dual-PSU device: PSU1 -> PDU-A -> circuit A; PSU2 -> PDU-B -> circuit B.
Each console/management port -> protected OOB (separate from client/FC paths).
SITE B repeats the design with distinct device/cable IDs and recovery capacity.
```

Sample port schedule (all labels are design identifiers, not vendor CLI):

| Endpoint | A path | B path | Check |
|---|---|---|---|
| H1/H2/H3 Ethernet | NIC1 → L1 ports 11/12/13 | NIC2 → L2 ports 11/12/13 | Driver, VLAN, bonding and supported multi-chassis behavior |
| Each L1–L4 | uplink1 → S1 ports 1–4 | uplink2 → S2 ports 1–4 | Optic, polarity, speed, MTU and routed adjacency |
| Each H1–H3 FC | HBA1 → SAN-A ports 1–3 | HBA2 → SAN-B ports 1–3 | WWPN, zoning, masking and host multipath |
| Array targets | supported targets → SAN-A ports 20/21 | supported targets → SAN-B ports 20/21 | Controller compatibility and path ownership |
| Each managed device | dedicated management → OOB-A/B where supported | console recovery entry | No guest access to OOB |
| Dual power devices | PSU1 → PDU-A circuit A | PSU2 → PDU-B circuit B | Trace upstream sources, capacity and shared bypass |

Duplicate this schedule for Site B using unique labels. Add cable IDs, patch-panel ports, route, optic specification and length to the as-built inventory. Each leaf and spine interconnection must be listed, not just labelled redundant. Separate physical routes where the failure requirement demands it. A second cable in the same damaged tray is not independent. Single-management-port devices need documented console alternatives.

## 3. IP addressing plan

Private Site A aggregate: 10.40.0.0/16; Site B: 10.50.0.0/16. Users receive a /22 for 500 office users plus headroom; the remaining /24s are teaching allocations, not measured sizing. Use each subnet's first usable address as gateway. Reserve host addresses .2–.49 for infrastructure in each /24. Site A user DHCP spans 10.40.8.50–10.40.11.230 (949 addresses); Site B uses the equivalent 10.50 range. Exclude gateways and infrastructure reservations. No DHCP on server/OOB segments by default. A separate globally routable public prefix would require a real assignment; examples use no invented public ownership.

| Function | Site A | Site B | Allocation |
|---|---|---|---|
| Users | 10.40.8.0/22 | 10.50.8.0/22 | DHCP, DNS and default gateway options |
| DMZ proxy | 10.40.20.0/24 | 10.50.20.0/24 | Reserved static addresses |
| Application | 10.40.30.0/24 | 10.50.30.0/24 | Approved service addresses |
| Database | 10.40.40.0/24 | 10.50.40.0/24 | Restricted data tier |
| Management/OOB | 10.40.50.0/24 | 10.50.50.0/24 | Independent protected admin reachability |
| Backup | 10.40.60.0/24 | 10.50.60.0/24 | Backup endpoints only |
| Guest | 10.40.70.0/24 | 10.50.70.0/24 | Internet-only policy |
| Fabric infrastructure | 10.40.240.0/20 | 10.50.240.0/20 | Loopbacks and /31 point-to-point allocations in IPAM |

Before using any address, check overlap with VPN, cloud and acquired networks. This reference is IPv4-only; an IPv6 rollout requires its own prefix, RA/DHCPv6, routing and security design. No claim of dual-stack readiness follows from IPv4 tests.

## 4. VLAN plan

VLANs 10/20/30/40/50/60/70 correspond to the functions above. Separate VRFs/physical management paths provide the intended boundaries; VLAN IDs alone enforce no authorization. Use local layer-2 domains at each site and route between sites; do not stretch a VLAN to make an untested application appear movable. Explicitly list VLAN membership on each trunk and bind the intended routed interface to the correct VRF. Remove unused memberships after checking dependencies. Validate a guest-to-management denial and a users-to-app success after any change.

## 5. Routing design

Use OSPF area 0 in the teaching underlay with unique loopbacks, point-to-point links, passive endpoint interfaces and authenticated adjacencies where supported. Use eBGP only at the provider edge with explicit allowed prefix lists and maximum-prefix safeguards; default-route handling depends on the actual provider contract. Prevent private-site routes from leaking to the Internet. Aggregate site prefixes only where valid reachability exists, and preserve more-specific reachability needed during failures. Filter redistribution and document administrative distance interactions.

Ordinary client return traffic must traverse a compatible firewall state path. Record route, forwarding lookup, ACL/policy result and application response before/after an owned link failure. An established routing session proves neither route admission nor delivery. Record measured convergence separately from the service outage; do not supply a convergence time without a capture.

## 6. Firewall policy

Default deny between zones. The following is intent, not deployable vendor syntax. Bind each role to verified addresses/identities and log denied tests without secrets.

| Source → destination | Allowed service | Reason / negative test |
|---|---|---|
| Internet/users → DMZ proxy | TCP 443 | Order entry; deny direct database access |
| DMZ proxy → app | TCP 8443, chosen internal TLS listener | Verify peer identity; deny app admin ports |
| App → database | TCP 5432, chosen PostgreSQL listener | Production reference only; deny guest to data |
| Admin bastion → management | TCP 22/443 to named targets | MFA entry and least privilege; deny user VLAN |
| Managed clients → designated resolvers | UDP/TCP 53 | Deny arbitrary resolver paths if required by policy |
| Managed devices → time servers | UDP 123 | Restricted time sources |
| Devices → log collectors | TCP 6514, configured TLS syslog | Verify certificates and delivery |
| Backup controller → approved agents/repository | Explicit product-specific listeners | Define after product selection; no any/any placeholder |

Return-state handling, HA session sync, NAT and policy replication must be tested on the chosen firewall. A functioning HA heartbeat does not establish policy or state equivalence. The local SQLite lab does not exercise these listeners, identities or firewall policies.

## 7. Data center rack design

Proposed 42U rack schedule: network rack N1 contains patching U40–42, S1 U38, S2 U36, edge pair U32–33, firewall pair U28–29 and protected management U24–25. Compute rack C1 has H1 U30–31, H2 U26–27, H3 U22–23 and patching U40–42. Storage rack D1 has SAN-A U38, SAN-B U36 and a 4U array U20–23. Reserve empty positions for airflow blanking, service clearance and expansion; actual equipment dimensions override these illustrative placements.

Putting three hosts in C1 protects against one host loss, not a full compute-rack loss. A C1 failure uses the site recovery workflow or requires a redesigned multi-rack placement. Trace each load's two PSU feeds to independently supportable circuits. Sum nameplate and measured worst-case load, derating and cooling requirements with qualified facilities staff. Do not turn the generic 42U schedule into an electrical capacity claim.

## 8. Server design

Three Site A hypervisor hosts each provide 100 abstract units; reserve 20 on each surviving host. One host loss leaves (3−1)×(100−20)=160 against 140 demand, leaving 20 units of aggregate headroom. CPU, RAM, datastore IOPS, NIC throughput, NUMA, affinity, licensing and restart admission require separate measured constraints. Anti-affinity places redundant application guests on different hosts. Site B has the same supplied aggregate envelope for this exercise, but restore readiness and reserved capacity must be observed before failover.

Pin firmware/driver/hypervisor combinations, secure boot posture, patch rings and maintenance rollback. A successful hypervisor restart is only an intermediate milestone; test the original client transaction and database consistency.

## 9. Storage design

Each host has two supported HBAs with paths through independent SAN A/B to supported array target ports. Maintain distinct fabric administration and zoning, use a supported minimal initiator/target zoning pattern, and present only intended LUNs to the host group. Record WWPNs, LUN IDs, path states, multipath policy and expected controller failover behavior. Never guess a WWPN or masking change from a hostname.

Working dataset is assumed 2 TiB growing 20 GiB/day; 30-day growth is 600 GiB. Snapshot churn, RAID overhead, spares, compression variability and backup retention need separate budgets; free LUN space is not backup capacity. A shared array is a residual site-level risk. Disconnecting one FC fabric in an owned lab should leave validated I/O through the other; actual corruption recovery needs an independent recovery point.

## 10. HA design

| Fault | Intended protection | Evidence required | Residual exposure |
|---|---|---|---|
| One Ethernet uplink | Other routed link | Route/forwarding + client operation | Common optic software or cable tray |
| One firewall member | Supported stateful HA | Policy/session state + new/existing flows | Shared policy defect |
| One compute host | Surviving capacity and guest restart | Placement, resource use, app operation | Rack, storage or quorum loss |
| SAN A | Verified SAN B path | Host multipath and sustained bounded I/O | Shared array corruption |
| PDU A | Independently supplied PDU B | Qualified owned-load test | Shared upstream dependency |
| Entire Site A | Fenced recovery at B | Data point, integrity and service tests | Shared credentials or compromised copy |

Fail one thing at a time in an owned environment; capture the baseline first. Abort if the expected surviving path is absent, a safety limit is reached, or state is unknown. Restore the exact fault, verify normal service, then proceed. Do not experiment on electrical paths without qualified facilities control.

## 11. Monitoring design

Observe client latency, traffic, errors and saturation separately from device reachability. Track DNS/TLS/identity/time, route and FC path changes, datastore latency, guest restart, backup age and restore tests. A synthetic order read/write uses non-production test records and a bounded rate. Page on a service symptom with a runbook, owner, timestamp, revision and evidence link; contextual dependency metrics support diagnosis. Test alert delivery through a separate channel when the primary site is unavailable. A green ICMP probe cannot certify application health.

## 12. Backup strategy

Keep encrypted copies under separate administrative control, with protected retention and an offline/immutable option appropriate to the platform. The worked schedule is a recoverable data point every 10 minutes and daily full backup, with 30 daily restore points plus business-approved longer retention. Schedule alone cannot guarantee a 15-minute RPO: queueing, failed copies, application consistency and unavailable keys may invalidate the latest point. Verify the actual last recoverable transaction timestamp at incident time. Test isolated restore and integrity, maintain separately recoverable keys and credentials, and record retention deletion authority.

The Python lab's second SQLite file shares the same host and temporary directory. It demonstrates the backup API and logical recovery; it is deliberately NOT an independent disaster-recovery copy. Its acknowledged order 3 is absent after restore, making data loss visible.

## 13. DR plan

1. Detect service failure and start the incident clock (supplied budget 5 minutes).
2. Declare scope, authorize recovery, and fence the old writer to prevent concurrent ownership (10 minutes).
3. Establish Site B OOB access, network/time/DNS/identity and storage; restore a verified application-consistent point and start dependencies in order (25 minutes supplied in total).
4. Check integrity, read/write behavior, required allowed/denied flows and external client resolution/cutover (15 minutes).
5. Record actual end-to-end interruption and recoverable-point age. The serial worked budget is 55 minutes versus RTO 60; a point aged 10 minutes fits RPO 15. Increasing restore to 40 gives 70 minutes and fails RTO. A 20-minute point fails RPO regardless of restore speed.

Stop if fencing, integrity, keys or point identity are uncertain. Do not blindly fail back: reconcile writes made at Site B, create a new backup, arrange a reviewed maintenance window, test reverse replication and fence before switching ownership back. Rollback during a failed cutover must preserve the sole authoritative writer. Actual platform timing and this whole workflow remain unexecuted.

## 14. Automation strategy

Source of truth holds device/port/IP/zone intent. Validate uniqueness, address overlap, required allow and deny tests, capacity assumptions and recovery readiness. Render deterministic configuration, review a diff against the exact baseline, then use a canary with least-privilege credentials and a tested recovery path. Reject a stale baseline; do not retry an unknown outcome blindly. Keep secrets outside Git and rendered examples. Record revision, target identity, actor, pre/post checks and per-target outcomes.

The runnable companion uses only Python standard-library SQLite backup and temporary-directory cleanup. Run `python labs/capstone-recovery.py --run`. Save stdout through your terminal if desired; the program writes only into its own new temporary directory and prints structured evidence. Run `python labs/capstone-recovery.py --run --interrupt fault` to observe intentional nonzero exit and verified cleanup. There are four supported interruption points: baseline, backup, fault and restored. Running without `--run` prints help.

## 15. Documentation and defense

Deliver an indexed package containing this brief, the 14 artifacts above, decision log, as-built inventory, sanitized evidence and operating handover. Record each evidence item as supplied/model/actual-local/guided-target. Include source revision, observer, command, timestamp, expected result, actual result, limitation and cleanup. Store no credentials or production exports in the learner package.

Defense prompts: Which two devices still share a failure domain? Which first dependency blocks a successful client write? Which observation would disprove your diagnosis? What is the oldest recoverable acknowledged transaction? How do you keep one writer during site recovery? What stops a canary rollout? What changed between logical intent and as-built wiring?

### Rubric

Score each of the 15 deliverables 0 (missing), 1 (intent only), 2 (consistent worked design with risks), or 3 (independently reproduced evidence for its declared scope). Maximum 45. For curriculum submission require at least 30, no missing artifact, no contradiction in addressing/policy/attachment maps, correct RTO/RPO calculations, a visible data-loss boundary and verified local cleanup. A model-based submission may satisfy learning acceptance; operational acceptance additionally requires the target environment's observed end-to-end tests and accountable owner approval. Never translate the educational score into production certification.

## Reproduce the local experiment

Predict baseline rows 1 and 2, backup rows 1 and 2, acknowledged rows 1–3, fault rows empty, and restored rows 1 and 2. Check row 3 is reported lost, baseline/backup/restored logical digests match, SQLite integrity is `ok`, and `cleanupVerified` is true. The reported local restore/check seconds exclude detection, declaration, remote transfers and cutover. They are not the 55-minute design budget or an enterprise RTO measurement.

For an independent challenge, write down what happens if the latest backup is older than 15 minutes, or if every protected copy carries the corruption. Explain why the local PASS would not rescue those unmet requirements. Do not modify the lab to operate on an existing database path.

## Primary references and applicability

- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final): business impact, recovery objectives, exercises and plan maintenance. Historical planning reference, not a product configuration guide.
- [Cisco reliable FC SAN design](https://www.cisco.com/c/dam/en/us/td/docs/dcn/whitepapers/design-a-reliable-and-highly-available-fibre-channel.pdf): independent fabric architecture. Product support and current interoperability still require exact-version verification.
- [Google SRE monitoring](https://sre.google/sre-book/monitoring-distributed-systems/): service symptoms and signals.
- [Python sqlite3 backup API](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup): local companion backup behavior.

Checked 2026-10-09. This workbook supplies original fictional numbers and policies; the references do not certify them.
