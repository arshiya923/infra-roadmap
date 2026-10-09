# OSPF Areas runtime foundation — 2026-10-09

This actual lab was prepared before the original OSPF Areas lesson (`s3-g1-t1`) was authored. It is now attached to that draft alongside a separate structural area-scope and candidate-cost explorer. There are 103 authored lessons, eight Batch 09 drafts and 95 accepted original nodes. Twelve Batch 09 nodes remain to author; LSA basics is authored; OSPF troubleshooting is authored; EIGRP is next. This evidence does not accept the full batch.

## Topology and observations

Five owned network namespaces contain two hosts and three actual FRR 8.4.4 routers. R1 and the ABR share area 0; the ABR and R3 share area 1. R1's 192.0.2.0/24 LAN is passive in area 0, and R3's 198.51.100.0/24 LAN is passive in area 1. Hosts have only prepared remote-LAN routes to their local gateways; the routers learn those remote LANs through OSPF.

```text
Client — R1 — area 0 — ABR — area 1 — R3 — Server
         RID 1.1.1.1  RID 2.2.2.2     RID 3.3.3.3
         passive LAN                 passive LAN
         192.0.2.0/24                198.51.100.0/24
```

The backbone transit is 203.0.113.0/30 (.1 on R1, .2 on the ABR); the branch transit is 203.0.113.4/30 (.5 on the ABR, .6 on R3). All router interfaces have explicit cost ten. Transits are point-to-point with explicitly configured 1-second Hello and 4-second dead intervals. These values belong to this disposable lab.

The ABR reports two attached areas, one Full neighbor per area and two separate area databases. R1's area-0 router LSAs describe R1 and the ABR; R3's area-1 router LSAs describe R3 and the ABR. Each internal router sees ABR-originated type-3 reachability summaries for the opposite LAN, preserving its original /24. A type-3 summary LSA does not imply prefix aggregation: no range aggregation is configured here.

The endpoints calculate inter-area opposite-LAN routes with cost 30. The ABR calculates intra-area LAN routes with cost 20. FRR's selected installed RIB entries corroborate those costs and active forwarding next hops; independent Linux route JSON corroborates OSPF origin and gateways. Linux route priority (`metric`) is a different field from OSPF path cost and is not compared numerically. Actual bidirectional ICMP crosses both areas.

## Explicit ABR behavior and controlled fault

Every router explicitly uses `ospf abr-type standard`. The ABR reports `Standard (RFC2328)`. FRR 8.4 documents a different default ABR mode with alternative behavior when backbone connectivity fails; this experiment must not be generalized to that default or to other implementations.

The controlled fault changes only R3's branch interface from area 1 to area 2, leaving its LAN in area 1 and the ABR branch in area 1. This requires first removing the previous interface area setting. FRR rejects an attempt to overwrite it directly.

```text
configure terminal
interface branch
no ip ospf area 0.0.0.1
ip ospf area 0.0.0.2
```

The branch loses its adjacency while R1 and the ABR remain Full on the backbone. Actual link flags retain UP and LOWER_UP. Opposite-LAN OSPF calculations and kernel entries disappear; remote ICMP fails while the client's gateway and backbone connected probe still work. Reversing exactly those two area commands restores Full neighbors, remote routes and both ICMP directions. This is an area-mismatch experiment, not a backbone-partition or convergence-time benchmark. Stale LSAs need not disappear immediately and are not used as a failure assertion.

## Reproduction, isolation and retained evidence

Use the pinned private runtime prepared by [the OSPF runtime procedure](ospf-runtime-foundation.md). No system routing package or service is installed. From the project directory in Ubuntu 24.04 amd64, using the root cache on this host:

```bash
bash labs/ospf-areas.sh
FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-areas.sh --run
```

The first command is inert help. Execution requires root namespace capabilities and existing `ip`, `ping`, `sysctl`, `python3`, `unshare`, `mount` and `getent`. Each router owns its configuration, UNIX sockets, PID files and logs. Forwarding is changed only inside router namespaces. Private mount namespaces supply the runtime's required group-file view without editing host groups or mounts. TCP VTY listeners are disabled. Cleanup verifies an owned runtime path before signaling tracked daemons and removes only created namespaces and the owned temporary directory.

Run `node tests/ospf-areas-lab.cjs` from Windows with WSL Ubuntu-24.04 available. `INFRA_FRR_ROOT` overrides the test's private-runtime path. Twelve checks parse actual protocol/interface/database/RIB/kernel JSON and independently compare before/after host links, IPv4/IPv6 routes, forwarding, groups, mounts, pre-existing daemons, namespaces, runtime directories and system FRR/PAM configuration. Cleanup is exercised normally, after three deliberate failures (namespace creation, first-router daemon startup and ABR daemon startup), and after deliberately stopping an owned OSPF daemon before interruption. Each runner gives owned processes a short TERM grace period, rechecks the unique runtime-path identity, escalates survivors with KILL and reaps children before namespace/runtime removal. Endpoint LAN passive flags, zero LAN neighbors, interface areas, transit type and lab timers are asserted at baseline and recovery.

[Actual results](ospf-areas-lab-results.json) retain package hashes, environment, baseline/fault/recovery records and output. This evidence concerns virtual FRR/Linux forwarding on a shared WSL kernel. It does not execute Cisco commands, applications, hardware forwarding, aggregation, external routes, stub/NSSA areas or virtual links. The attached Areas draft adds an interactive teaching tool, guided vendor branch, ten exams and three quick checks. The browser uses a fixed structural scope template and supplied converged chain; it does not predict retained/flushed LSAs during a fault. Full Batch 09 acceptance remains pending.

Primary references checked on 2026-10-09:

- [RFC 2328](https://www.rfc-editor.org/rfc/rfc2328): area structure, backbone and inter-area route calculation.
- [FRR stable 8.4 OSPF documentation](https://docs.frrouting.org/en/stable-8.4/ospfd.html): ABR modes, interface areas and area range behavior.
- [FRR 8.4.4 interface area command implementation](https://github.com/FRRouting/frr/blob/frr-8.4.4/ospfd/ospf_vty.c): previous-area removal before replacement and the matching no-form.
