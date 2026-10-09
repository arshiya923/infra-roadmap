# OSPF runtime foundation — 2026-10-09

This lab was prepared before the original OSPF node `s3-g1-t0` was authored. It is now attached to that draft lesson alongside a separate directed-cost browser graph. The course has 103 authored lessons, eight Batch 09 drafts and 95 accepted original nodes. OSPF Areas and DR/BDR are authored with separate actual labs; LSA basics is authored; OSPF troubleshooting is authored; EIGRP is next and twelve Batch 09 nodes remain to author. This lab evidence does not accept the full batch.

The lab uses actual FRR 8.4.4 OSPFv2 processes. Two routers exchange link-state information over an owned point-to-point transit in area 0. Their LANs are enabled in OSPF but passive. Client and server host routes point toward their local router; the routers have no static remote-LAN routes. Evidence separates Full neighbor state, area database, FRR-selected installed routes, Linux kernel entries and bidirectional ICMP exchange.

```text
Client                 R1                          R2                 Server
192.0.2.10/24 — LAN .1 | transit .1 — 203.0.113.0/30 — .2 | LAN .1 — 198.51.100.20/24
                        RID 1.1.1.1                   RID 2.2.2.2
                        area 0; passive LANs; point-to-point transit
```

The R1 LAN is 192.0.2.0/24; the R2 LAN is 198.51.100.0/24. Both routers use 1-second Hello and 4-second dead intervals only for the disposable exercise. These are configured lab values, not a claim about platform defaults or production suitability. No elapsed convergence benchmark is claimed.

## Preparation and execution

Run from the project directory in Ubuntu 24.04 amd64. The preparation script requires existing APT package indexes, `apt-get`, `dpkg-deb` and the system libraries required by the extracted binaries. It downloads exactly `frr=8.4.4-1.1ubuntu6.7` and `libyang2t64=2.1.30-2.1ubuntu0.1` through the configured APT repositories. If those pinned packages are unavailable, preparation fails rather than silently changing releases. It extracts packages under the invoking user's cache and records package checksums. It does not install packages, run their maintainer scripts or start a system service.

```bash
bash labs/prepare-frr-runtime.sh
bash labs/prepare-frr-runtime.sh --prepare
```

The first invocation prints help only. The second prints the extracted runtime path and the corresponding lab command. Namespace execution needs root, `ip`, `ping`, `sysctl`, `python3`, `unshare`, `mount`, `getent` and TShark. On this host, preparation and the lab were run as WSL root, so the actual invocation is:

```bash
FRR_ROOT=/root/.cache/infra-fieldbook/frr-8.4.4/root bash labs/ospf-routing.sh --run
```

Use the path printed by preparation when another account prepares the cache. `ospf-routing.sh` without `--run` is inert help. Both scripts are standalone downloads in the OSPF lesson. The scripts target this Ubuntu/FRR environment; they are not Cisco CLI or a portable all-distribution installer.

## Isolation and failure behavior

Four uniquely named owned network namespaces contain all protocol and probe traffic. Router IPv4 forwarding changes occur only inside those namespaces. Each router runs its own zebra and ospfd with owned configuration, PID, UNIX socket and log paths. TCP VTY listeners are disabled with `-P 0`. Zebra starts before ospfd because the OSPF process needs its interface information.

The extracted Ubuntu binary expects the `frrvty` group normally created by installation. Each FRR invocation uses a private mount namespace with an owned group-file view. The host `/etc/group` is untouched. The temporary per-router `vtysh.conf` permits the root lab operator without PAM; no host PAM file, account or system FRR configuration is created. VTY control uses owned UNIX sockets. The background launcher uses `exec`, so cleanup tracks the actual daemon process rather than abandoning its child. Cleanup checks the owned runtime path in a process command line before signaling it.

The first controlled fault makes only R1's transit interface passive. The link and addressing remain up. The lab waits for both learned remote-LAN routes to disappear, verifies neighbor loss on both routers, checks the failed remote exchange and verifies the client's local gateway still works. Removing that exact passive setting restores Full neighbors, installed remote routes and both ICMP directions. This first fault tests OSPF adjacency rather than physical carrier. Additional faults below test independent forwarding and endpoint route behavior.

After adjacency recovery, two more owned faults run sequentially. Disabling only R2 namespace IPv4 forwarding leaves both neighbors Full and remote OSPF routes selected/installed in FRR and the kernel, while both raw endpoint probes fail and connected controls succeed. Restoring forwarding to 1 recovers both probes. Removing only the introduced server route to the client LAN then breaks both exchanges with healthy OSPF and R2 forwarding; restoring that exact route reproduces the endpoint kernel baseline and recovers both probes. Actual probe targets, exit codes and output are retained. Changing Linux `ip_forward` also resets namespace IPv4 host/router defaults; this fixture verifies restoration of the flag and documented protocol/route/probe conditions, not every possible custom sysctl parameter. These are settled bounded ICMP observations, not application-health, packet-arrival, zero-loss or convergence measurements. See [troubleshooting groundwork](ospf-troubleshooting-foundation.md).

A bounded three-second capture on the owned transit retains decoded actual packet headers. The check requires Hello messages from both transit addresses with destination 224.0.0.5, IP protocol 89 and area 0. It does not claim to capture every database synchronization exchange or retain a complete protocol history. The temporary packet file is removed during cleanup.

## Verification and scope

Run `node tests/ospf-routing-lab.cjs` from Windows with WSL Ubuntu-24.04 available. `INFRA_FRR_ROOT` can override the test's local extracted-runtime default. The test independently compares host links, IPv4/IPv6 routes, forwarding settings, group-file hash, host mount table, existing zebra/ospfd processes, namespace names, temporary runtime directories and absence/presence of system FRR/PAM configuration. It checks normal cleanup and deliberate interruptions after creating namespaces, starting the first router's daemons, disabling owned forwarding and removing the owned endpoint route. The test also parses actual JSON rather than trusting CLI exit status alone: this FRR build can exit zero on a PAM authentication failure.

Actual evidence is retained in `docs/ospf-routing-lab-results.json`. Interface JSON additionally records actual area, cost, passive LAN state and transit network type/timers. Private package preparation is re-executed and its output retained. The evidence covers virtual Linux forwarding and FRR state on the shared WSL kernel. It supplies no Cisco parser, hardware forwarding, application transaction, certification alignment, throughput or convergence-time evidence. The browser graph is a supplied already-converged three-router topology; it does not replay the actual two-router lab or simulate protocol timing. Full Batch 09 acceptance still requires all twenty original nodes and the batch gates.

Primary references checked on 2026-10-09:

- [RFC 2328, OSPF Version 2](https://www.rfc-editor.org/rfc/rfc2328): link-state operation, Hello/adjacency, flooding, SPF and IP protocol context.
- [FRR stable 8.4 OSPFv2 documentation](https://docs.frrouting.org/en/stable-8.4/ospfd.html): zebra dependency, interface area/network/passive/timer configuration and operational inspection.
- [FRR 8.4.4 vtysh invocation source](https://github.com/FRRouting/frr/blob/frr-8.4.4/vtysh/vtysh_main.c): private configuration-directory and socket options.
- [FRR 8.4.4 vtysh authentication source](https://github.com/FRRouting/frr/blob/frr-8.4.4/vtysh/vtysh_user.c): scoped root lab configuration and the authentication-failure exit-status limitation.
- [Catalyst 9300 IOS XE 17.15 OSPF guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html): a separate source for the lesson's guided vendor branch; no Cisco command has been executed here.
