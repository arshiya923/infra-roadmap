# DR/BDR runtime foundation — 2026-10-09

This actual lab was prepared before the original DR/BDR lesson (`s3-g1-t2`) was authored. It is now attached to that draft alongside a separate settled election-history explorer. Totals are 103 authored lessons, eight reviewed Batch 09 drafts and 95 accepted original nodes. Twelve Batch 09 nodes remain to author; LSA basics is authored; OSPF troubleshooting is authored; EIGRP is next.

A separate [election-history preview](ospf-dr-bdr-explorer.html) now replays bounded settled roles and expected neighbor/LSA templates. Its [contract and verification](ospf-dr-bdr-explorer-foundation.md) keep calculated templates distinct from the actual records below. It is integrated into the draft lesson; full batch acceptance remains pending.

## Owned broadcast network and election history

The runner uses actual FRR 8.4.4 zebra/ospfd processes in four router namespaces plus an owned fabric namespace. Four veth attachments connect to a bridge inside the fabric namespace. Bridge multicast snooping is explicitly disabled inside that namespace for this disposable broadcast exercise. No host bridge, address, route or forwarding setting is changed.

| Router | Router ID | Shared LAN | Passive loopback | LAN priority |
| --- | --- | --- | --- | --- |
| R1 | 1.1.1.1 | 192.0.2.1/24 | 198.51.100.1/32 | 100 |
| R2 | 2.2.2.2 | 192.0.2.2/24 | 198.51.100.2/32 | 50 |
| R3 | 3.3.3.3 | 192.0.2.3/24 | 198.51.100.3/32 | 0 |
| R4 | 4.4.4.4 | 192.0.2.4/24 | 198.51.100.4/32 | 200 |

Every LAN attachment is explicitly OSPF broadcast, area 0, cost ten, Hello one second and dead/wait four seconds. These are configured lab values. The observed FRR loopback cost is zero, so a peer /32 route costs ten in this experiment; this observation is not a universal hardware/default-cost promise.

The runner stages arrivals. R1 establishes DR first; R2 joins as BDR; R3 joins with priority zero and remains ineligible for DR/BDR while forming Full adjacencies to both. R4 arrives after those roles exist. Its higher priority 200 does not displace either incumbent. It joins as a DROther, Full with DR/BDR and 2-Way with R3. This demonstrates election history and nonpreemption; it does not exercise simultaneous cold-start priority/router-ID tie breaking.

The current DR originates the type-2 network LSA. In the four-router baseline its link-state ID is 192.0.2.1, its advertising router is 1.1.1.1, its mask is /24 and its attached-router list contains all four router IDs. Interface address and router identity are different fields. A BDR maintains Full adjacencies but does not originate the current DR's network LSA merely because it is the backup.

## Forwarding and packet evidence

R3 and R4 are both DROthers in the late-arrival baseline. Nevertheless, their learned peer-loopback routes use each other's directly reachable LAN IPs as next hops. Selected installed FRR RIB entries, independent Linux routes and an actual route lookup corroborate that path. Bidirectional loopback ICMP and captured Ethernet source/destination MACs show R3↔R4 traffic without a DR/BDR forwarding relay. DR/BDR organize protocol adjacency and flooding; their role does not make every data packet transit through them.

A bounded three-second capture is taken only on the owned R3 LAN. Decoded records include actual ICMP echo request/reply headers for both directions and Hellos from all four LAN IPs. Those Hellos use IP protocol 89 and AllSPFRouters 224.0.0.5, carrying elected DR/BDR interface addresses .1/.2. This capture is not a complete database-exchange/flooding history. Raw temporary capture files are removed; decoded headers remain in the actual result report.

Full adjacency alone was not a sufficient readiness gate in the initial trial: a new prefix had not yet been installed. The runner therefore waits separately for bidirectional probe success and the current network-LSA attached-router list before recording a phase. Bounded waits assert eventual expected state; they do not benchmark convergence or certify continuous delivery.

## Fault, recovery and rejected trial

The main fault changes only the owned R1 LAN attachment:

```bash
ip -n "$r1" link set lan down
# Observe the remaining routers before restoring.
ip -n "$r1" link set lan up
```

These are internal runner commands using its created namespace variable, not commands to paste against an arbitrary interface. R1's link-down generates an interface-down condition and resets its election state. The bridge and other router attachments remain available. R2, the existing BDR with priority 50, becomes DR; R4 with priority 200 becomes BDR; R3 with priority zero remains a DROther. Current type-2 identity moves to DR interface .2/advertising router 2.2.2.2, with three attached router IDs. Old previous-DR LSAs can still be retained and are not required to disappear immediately.

Restoring only R1's link lets it rejoin as a DROther without displacing the established R2/R4 roles. Both R1 and R3 are then 2-Way with each other and Full with the current DR/BDR. The current network LSA again lists all four IDs. Peer-loopback route/probe evidence is checked at late baseline, failover and recovery; no packet-loss duration, session continuity or application result is claimed.

An earlier passive-interface trial is retained separately in [exploratory records](ospf-dr-bdr-passive-trial.json). It observed R2 promotion but failed the proposed return-role assertion: this FRR build retained R1's old DR declaration and R1 reported DR on return. That is rejected as a fixture for clean nonpreemptive rejoining. It is not main-lab recovery evidence or a universal passive-interface rule. The main experiment uses the explicit interface-down transition documented above.

## Execution and isolation verification

Use the pinned private runtime from [the OSPF preparation procedure](ospf-runtime-foundation.md). In Ubuntu 24.04 amd64, from the project directory, using the root cache on this host:

```bash
bash labs/ospf-dr-bdr.sh
FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-dr-bdr.sh --run
```

Default invocation is inert help. Explicit execution needs root network/mount capabilities and existing `ip`, `ping`, `sysctl`, `python3`, `unshare`, `mount`, `getent` and TShark. Substitute the cache path printed by preparation for another account. Eight FRR daemons use owned configuration/PID/log/UNIX socket paths and disabled TCP VTY. Private mount namespaces supply the required group-file view; host groups, mounts, PAM, FRR configuration and system services remain intact. Cleanup verifies an owned runtime path before signaling tracked processes and deletes only created namespaces and the owned temporary directory.

`node tests/ospf-dr-bdr-lab.cjs` runs the actual experiment from Windows with WSL Ubuntu-24.04 available. `INFRA_FRR_ROOT` overrides its extracted-runtime path. Independent snapshots compare host links/routes/forwarding, group/mount hashes, existing FRR/TShark/dumpcap processes, namespace names, temporary runtime directories and system FRR/PAM configuration. Normal cleanup and four partial-start failures are exercised: after namespace creation, after the first router, after three routers and after capture startup. Actual protocol/interface/LSA/RIB/kernel/packet JSON is parsed rather than trusting CLI exit status alone.

[Actual main results](ospf-dr-bdr-lab-results.json) retain twelve passing checks, environment/package hashes, phase JSON and decoded packet headers; exploratory trial status remains separate. This virtual FRR/WSL experiment supplies no Cisco parser, physical switch/ASIC, NBMA/point-to-point election, scale, application or performance evidence. The DR/BDR draft now includes prose, the visualization, scoped guided vendor procedure, ten exams and three quick checks, with topic review recorded. Full Batch 09 acceptance remains pending.

Primary references checked on 2026-10-09:

- [RFC 2328, sections 7.3–7.5 and 9.4](https://www.rfc-editor.org/rfc/rfc2328): roles, adjacency scope, election history and interface-state reset.
- [FRR stable 8.4 OSPF documentation](https://docs.frrouting.org/en/stable-8.4/ospfd.html): interface network type, priority, timers and operational database inspection.
