# Roadmap Content Audit

Historical baseline audit from 3 October 2026. Its original gap descriptions are not current completion status. All 442 original and 15 expansion lessons are now accepted; see ROADMAP_ENRICHMENT_PROGRESS.md and docs/validation-expansion-final.md. Supporting reviews are in content/supporting-review.json.

Audit date: 2026-10-03. This is a complete structural/content-gap audit, not a claim that all vendor statements have been researched. Each batch must perform its own technical review.

## Baseline and counts
Original SHA-256: `ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25`
One HTML file, 100,327 bytes, no dependencies/build tooling. Inline data, styles and event handlers. Ten stages, 69 group nodes, 373 stage topic occurrences, ten stage labs, 17 device nodes, 20 hardware nodes, 21 troubleshooting nodes and one final capstone = 442 progress-bearing nodes.

## Existing strengths
Hierarchical roadmap, local learner status, JSON progress import/export, keyboard-accessible buttons, native dialogs, reduced-motion CSS, mobile navigation, skill matrix, a conceptual architecture SVG and explicit lab suggestions. Preserve these.

## Systemic gaps
Only 42 named brief entries exist. Other nodes fall back to generic group concepts and stage lab text. No node meets the requested enriched-topic definition yet. No structured question bank, lesson-specific ten-question exams, quick checks, internal-flow animations, lab verification/cleanup procedures or full text lesson search exist. Configuration rollback, command output interpretation, security and performance treatment are inconsistent or absent.
The original recommendation algorithm uses prior groups/stage labs as broad gates. It can force unrelated topics and hides missing conceptual dependencies. byName chooses the first repeated title, making precise cross-links ambiguous. Keep occurrence IDs and write explicit lesson links.
Original learner dashboard counts are not editorial progress. Existing completion may be self-reported without evidence. The UI must distinguish those meanings.

## Technical corrections and review queue
- CPU: clock frequency and logical CPU count do not determine application throughput. SMT shares resources; virtual topology may be synthetic.
- RAM: free RAM is not the same as available RAM; page cache is useful. ECC is fault detection/correction, not a backup. NUMA placement affects access latency.
- Storage: capacity, bandwidth, IOPS and latency differ; page cache can distort tests. Durability depends on the full flush/power-loss path.
- RAID and snapshots: neither substitutes for an independent, tested backup. RAID 0 provides no redundancy; RAID 10 tolerance depends on which mirror members fail.
- PCIe/NIC: slot length differs from negotiated lane width. Link-up alone does not prove IP reachability; virtual interfaces and offloads change observable counters/captures.
- Original capstone places SAN and Ethernet elements in one conceptual drawing. Explain FC fabric separation and actual attachment paths before treating it as a wiring design.
- IPv6 must use Neighbor Discovery rather than ARP; do not carry IPv4 broadcast assumptions into IPv6. Subnet host counts need /31 and /32 exceptions.
- TCP reliability is not application transaction success. ICMP failure does not prove a host is down. DNS commonly uses both UDP and TCP; NAT is not a security policy.
- VLAN, STP, EtherChannel and vPC are distinct mechanisms; explicitly cover loop prevention, peer failures and per-flow hashing limits.
- Cisco boot registers, image modes, recovery, routing features and security commands vary by platform and release. Do not generalize IOS procedures to IOS XE/NX-OS.
- Legacy platform families and protocols (2960/3750, Aironet, Nexus 5000/7000, FabricPath, DTP/VTP/PAgP, TFTP/FTP) need dated lifecycle/context checks; inclusion is not a current purchase recommendation.
- Existing certification cards explicitly describe approximate alignment. Verify current provider objectives before updating; do not imply exam coverage or certification from completion.
- VMware licensing, supported hardware and version features require current vendor verification in their batch. Avoid presenting trial or free-tier availability as permanent.

## Missing curriculum and dependency decisions
- ADD-INFRA-001 infrastructure/client-server/dependency maps; ADD-INFRA-002 availability vs reliability, SLI/SLO/SLA and error budgets; ADD-INFRA-003 change control, incident response and evidence handling.
- ADD-LINUX-001 filesystems, permissions, users, sudo and packages; ADD-LINUX-002 processes, systemd, journald and scheduling; ADD-LINUX-003 mounts/LVM, pressure diagnostics and service recovery.
- ADD-APP-001 HTTP request lifecycle and proxies; ADD-APP-002 TLS trust/renewal and Nginx validation/rollback; ADD-APP-003 load balancing, health checks and connection pools.
- ADD-CONT-001 namespaces/cgroups/images and Docker/Compose; ADD-CONT-002 Kubernetes scheduling/network/storage/RBAC; ADD-CONT-003 deployment/debugging/backup and cluster upgrade practice.
- ADD-CLOUD-001 shared responsibility/IAM and cloud networking; ADD-CLOUD-002 compute/storage/availability-zone architecture; ADD-CLOUD-003 cost budgets, tagging, IaC and recovery.
- Add cross-domain capstones after networking, Linux/application delivery and observability. Explain TLS/DNS/time dependencies of identity and automation. Backup restoration must precede claims of disaster-recovery readiness.

## Complete original hierarchy and per-node gap disposition
Every row below was extracted from the original DATA object. Initial disposition for every original node: inspected structurally, enrichment pending. Each topic requires its own mechanism, example, troubleshooting, security/performance, sources, practice and assessment. Repeated nodes are retained, not silently deduplicated.

### Stage 1: IT & Infrastructure Foundation
Domain: Networking
Original purpose: Physical components, operating systems and addressing determine what a network can carry and how it fails.

#### g-0-0 — Computer Hardware
| ID | Original topic | Existing content |
|---|---|---|
| s0-g0-t0 | CPU | Named brief; expand and verify |
| s0-g0-t1 | RAM | Named brief; expand and verify |
| s0-g0-t2 | Storage | Named brief; expand and verify |
| s0-g0-t3 | PCIe | Named brief; expand and verify |
| s0-g0-t4 | NICs | Named brief; expand and verify |
| s0-g0-t5 | RAID | Named brief; expand and verify |
| s0-g0-t6 | Server architecture | Generic/heuristic brief; author full lesson |

#### g-0-1 — Operating Systems
| ID | Original topic | Existing content |
|---|---|---|
| s0-g1-t0 | Windows | Named brief; expand and verify |
| s0-g1-t1 | Windows Server | Named brief; expand and verify |
| s0-g1-t2 | Linux fundamentals | Named brief; expand and verify |
| s0-g1-t3 | CLI fundamentals | Named brief; expand and verify |

#### g-0-2 — Networking Basics
| ID | Original topic | Existing content |
|---|---|---|
| s0-g2-t0 | LAN | Generic/heuristic brief; author full lesson |
| s0-g2-t1 | WAN | Generic/heuristic brief; author full lesson |
| s0-g2-t2 | WLAN | Generic/heuristic brief; author full lesson |
| s0-g2-t3 | Ethernet | Generic/heuristic brief; author full lesson |
| s0-g2-t4 | MAC addresses | Generic/heuristic brief; author full lesson |
| s0-g2-t5 | Frames | Generic/heuristic brief; author full lesson |
| s0-g2-t6 | Packets | Generic/heuristic brief; author full lesson |
| s0-g2-t7 | MTU | Generic/heuristic brief; author full lesson |
| s0-g2-t8 | Bandwidth | Generic/heuristic brief; author full lesson |
| s0-g2-t9 | Latency | Generic/heuristic brief; author full lesson |
| s0-g2-t10 | Duplex | Generic/heuristic brief; author full lesson |

#### g-0-3 — Binary & Subnetting
| ID | Original topic | Existing content |
|---|---|---|
| s0-g3-t0 | Binary | Generic/heuristic brief; author full lesson |
| s0-g3-t1 | Decimal | Generic/heuristic brief; author full lesson |
| s0-g3-t2 | Hexadecimal | Generic/heuristic brief; author full lesson |
| s0-g3-t3 | IPv4 | Named brief; expand and verify |
| s0-g3-t4 | IPv6 | Named brief; expand and verify |
| s0-g3-t5 | CIDR | Named brief; expand and verify |
| s0-g3-t6 | VLSM | Generic/heuristic brief; author full lesson |
| s0-g3-t7 | subnet calculation | Generic/heuristic brief; author full lesson |

Stage lab `lab-0`: Build a small LAN with two PCs and a managed switch. Assign addresses, verify gateway reachability, and document the cable and port map.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 2: Networking Fundamentals
Domain: Networking
Original purpose: Packet-level understanding lets you distinguish transport failures from application and addressing problems.

#### g-1-0 — Network models
| ID | Original topic | Existing content |
|---|---|---|
| s1-g0-t0 | OSI Model | Generic/heuristic brief; author full lesson |
| s1-g0-t1 | TCP/IP Model | Generic/heuristic brief; author full lesson |

#### g-1-1 — Ethernet & resolution
| ID | Original topic | Existing content |
|---|---|---|
| s1-g1-t0 | Ethernet | Generic/heuristic brief; author full lesson |
| s1-g1-t1 | ARP | Generic/heuristic brief; author full lesson |
| s1-g1-t2 | ICMP | Generic/heuristic brief; author full lesson |

#### g-1-2 — Transport & services
| ID | Original topic | Existing content |
|---|---|---|
| s1-g2-t0 | TCP vs UDP | Generic/heuristic brief; author full lesson |
| s1-g2-t1 | DNS | Named brief; expand and verify |
| s1-g2-t2 | DHCP | Named brief; expand and verify |
| s1-g2-t3 | NAT / PAT | Named brief; expand and verify |

#### g-1-3 — Layer 2 fundamentals
| ID | Original topic | Existing content |
|---|---|---|
| s1-g3-t0 | VLAN | Named brief; expand and verify |
| s1-g3-t1 | 802.1Q | Generic/heuristic brief; author full lesson |
| s1-g3-t2 | Trunking | Generic/heuristic brief; author full lesson |
| s1-g3-t3 | STP concepts | Generic/heuristic brief; author full lesson |
| s1-g3-t4 | MAC address tables | Generic/heuristic brief; author full lesson |

#### g-1-4 — Routing fundamentals
| ID | Original topic | Existing content |
|---|---|---|
| s1-g4-t0 | Routing tables | Generic/heuristic brief; author full lesson |
| s1-g4-t1 | Default gateways | Generic/heuristic brief; author full lesson |
| s1-g4-t2 | Static routes | Generic/heuristic brief; author full lesson |
| s1-g4-t3 | IPv6 fundamentals | Generic/heuristic brief; author full lesson |

#### g-1-5 — Diagnostic tools
| ID | Original topic | Existing content |
|---|---|---|
| s1-g5-t0 | ping | Generic/heuristic brief; author full lesson |
| s1-g5-t1 | traceroute | Generic/heuristic brief; author full lesson |
| s1-g5-t2 | nslookup | Generic/heuristic brief; author full lesson |
| s1-g5-t3 | dig | Generic/heuristic brief; author full lesson |
| s1-g5-t4 | ipconfig | Generic/heuristic brief; author full lesson |
| s1-g5-t5 | ip | Generic/heuristic brief; author full lesson |
| s1-g5-t6 | arp | Generic/heuristic brief; author full lesson |
| s1-g5-t7 | netstat | Generic/heuristic brief; author full lesson |
| s1-g5-t8 | ss | Generic/heuristic brief; author full lesson |
| s1-g5-t9 | tcpdump | Generic/heuristic brief; author full lesson |
| s1-g5-t10 | Wireshark | Generic/heuristic brief; author full lesson |

Stage lab `lab-1`: Capture ARP, DHCP, DNS, a TCP handshake and ICMP. Annotate packet fields, timings, and the path from client to gateway.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 3: Cisco Enterprise Networking
Domain: Cisco Switching
Original purpose: Predictable Cisco configuration, resilient switching and recoverable boot processes underpin reliable enterprise operations.

#### g-2-0 — IOS & configuration
| ID | Original topic | Existing content |
|---|---|---|
| s2-g0-t0 | Cisco IOS / IOS XE | Generic/heuristic brief; author full lesson |
| s2-g0-t1 | Cisco CLI structure | Generic/heuristic brief; author full lesson |
| s2-g0-t2 | Running configuration | Generic/heuristic brief; author full lesson |
| s2-g0-t3 | Startup configuration | Generic/heuristic brief; author full lesson |

#### g-2-1 — Boot & recovery
| ID | Original topic | Existing content |
|---|---|---|
| s2-g1-t0 | Configuration register | Generic/heuristic brief; author full lesson |
| s2-g1-t1 | ROMMON | Generic/heuristic brief; author full lesson |
| s2-g1-t2 | Boot process | Generic/heuristic brief; author full lesson |
| s2-g1-t3 | Cisco file systems | Generic/heuristic brief; author full lesson |
| s2-g1-t4 | Flash management | Generic/heuristic brief; author full lesson |
| s2-g1-t5 | IOS images | Generic/heuristic brief; author full lesson |
| s2-g1-t6 | Install Mode vs Bundle Mode | Generic/heuristic brief; author full lesson |
| s2-g1-t7 | Device backup and recovery | Generic/heuristic brief; author full lesson |

#### g-2-2 — Switching & VLANs
| ID | Original topic | Existing content |
|---|---|---|
| s2-g2-t0 | VLAN | Named brief; expand and verify |
| s2-g2-t1 | Access ports | Generic/heuristic brief; author full lesson |
| s2-g2-t2 | Trunk ports | Generic/heuristic brief; author full lesson |
| s2-g2-t3 | DTP | Generic/heuristic brief; author full lesson |
| s2-g2-t4 | VTP | Generic/heuristic brief; author full lesson |
| s2-g2-t5 | Voice VLAN | Generic/heuristic brief; author full lesson |

#### g-2-3 — Link aggregation
| ID | Original topic | Existing content |
|---|---|---|
| s2-g3-t0 | EtherChannel | Generic/heuristic brief; author full lesson |
| s2-g3-t1 | LACP | Named brief; expand and verify |
| s2-g3-t2 | PAgP | Generic/heuristic brief; author full lesson |

#### g-2-4 — Spanning tree
| ID | Original topic | Existing content |
|---|---|---|
| s2-g4-t0 | STP | Named brief; expand and verify |
| s2-g4-t1 | RSTP | Generic/heuristic brief; author full lesson |
| s2-g4-t2 | MST | Generic/heuristic brief; author full lesson |

#### g-2-5 — Edge protection
| ID | Original topic | Existing content |
|---|---|---|
| s2-g5-t0 | PortFast | Generic/heuristic brief; author full lesson |
| s2-g5-t1 | BPDU Guard | Generic/heuristic brief; author full lesson |
| s2-g5-t2 | Root Guard | Generic/heuristic brief; author full lesson |
| s2-g5-t3 | Loop Guard | Generic/heuristic brief; author full lesson |
| s2-g5-t4 | Storm Control | Generic/heuristic brief; author full lesson |
| s2-g5-t5 | Port Security | Generic/heuristic brief; author full lesson |

#### g-2-6 — Traffic mirroring
| ID | Original topic | Existing content |
|---|---|---|
| s2-g6-t0 | SPAN | Generic/heuristic brief; author full lesson |
| s2-g6-t1 | RSPAN | Generic/heuristic brief; author full lesson |
| s2-g6-t2 | ERSPAN | Generic/heuristic brief; author full lesson |

Stage lab `lab-2`: Build three Cisco switches with redundant links. Configure VLANs, trunks, LACP EtherChannel, an STP root, PortFast and BPDU Guard. Test a link failure.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 4: Advanced Routing & Switching
Domain: Routing
Original purpose: Routing policy, convergence and segmentation determine which path traffic takes during normal operation and failure.

#### g-3-0 — Routing policy
| ID | Original topic | Existing content |
|---|---|---|
| s3-g0-t0 | Static Routing | Generic/heuristic brief; author full lesson |
| s3-g0-t1 | Floating Static Routes | Generic/heuristic brief; author full lesson |
| s3-g0-t2 | Policy-Based Routing | Generic/heuristic brief; author full lesson |

#### g-3-1 — OSPF
| ID | Original topic | Existing content |
|---|---|---|
| s3-g1-t0 | OSPF | Named brief; expand and verify |
| s3-g1-t1 | OSPF Areas | Generic/heuristic brief; author full lesson |
| s3-g1-t2 | OSPF DR / BDR | Generic/heuristic brief; author full lesson |
| s3-g1-t3 | OSPF LSA basics | Generic/heuristic brief; author full lesson |
| s3-g1-t4 | OSPF troubleshooting | Generic/heuristic brief; author full lesson |

#### g-3-2 — EIGRP
| ID | Original topic | Existing content |
|---|---|---|
| s3-g2-t0 | EIGRP | Generic/heuristic brief; author full lesson |
| s3-g2-t1 | EIGRP metrics | Generic/heuristic brief; author full lesson |
| s3-g2-t2 | EIGRP neighbors | Generic/heuristic brief; author full lesson |
| s3-g2-t3 | EIGRP topology | Generic/heuristic brief; author full lesson |

#### g-3-3 — BGP
| ID | Original topic | Existing content |
|---|---|---|
| s3-g3-t0 | BGP fundamentals | Generic/heuristic brief; author full lesson |
| s3-g3-t1 | eBGP | Generic/heuristic brief; author full lesson |
| s3-g3-t2 | iBGP | Generic/heuristic brief; author full lesson |
| s3-g3-t3 | BGP attributes | Generic/heuristic brief; author full lesson |

#### g-3-4 — BGP policy
| ID | Original topic | Existing content |
|---|---|---|
| s3-g4-t0 | Local Preference | Generic/heuristic brief; author full lesson |
| s3-g4-t1 | MED | Generic/heuristic brief; author full lesson |
| s3-g4-t2 | AS Path | Generic/heuristic brief; author full lesson |
| s3-g4-t3 | Communities | Generic/heuristic brief; author full lesson |

#### g-3-5 — Route control
| ID | Original topic | Existing content |
|---|---|---|
| s3-g5-t0 | Route filtering | Generic/heuristic brief; author full lesson |
| s3-g5-t1 | Route redistribution | Generic/heuristic brief; author full lesson |
| s3-g5-t2 | Route maps | Generic/heuristic brief; author full lesson |
| s3-g5-t3 | Prefix lists | Generic/heuristic brief; author full lesson |
| s3-g5-t4 | Access lists | Generic/heuristic brief; author full lesson |

#### g-3-6 — VRF segmentation
| ID | Original topic | Existing content |
|---|---|---|
| s3-g6-t0 | VRF | Generic/heuristic brief; author full lesson |
| s3-g6-t1 | VRF-Lite | Generic/heuristic brief; author full lesson |

#### g-3-7 — Gateway redundancy
| ID | Original topic | Existing content |
|---|---|---|
| s3-g7-t0 | HSRP | Generic/heuristic brief; author full lesson |
| s3-g7-t1 | VRRP | Generic/heuristic brief; author full lesson |
| s3-g7-t2 | GLBP | Generic/heuristic brief; author full lesson |

#### g-3-8 — Multicast
| ID | Original topic | Existing content |
|---|---|---|
| s3-g8-t0 | Multicast fundamentals | Generic/heuristic brief; author full lesson |
| s3-g8-t1 | PIM | Generic/heuristic brief; author full lesson |
| s3-g8-t2 | IGMP | Generic/heuristic brief; author full lesson |

#### g-3-9 — Quality of service
| ID | Original topic | Existing content |
|---|---|---|
| s3-g9-t0 | QoS fundamentals | Generic/heuristic brief; author full lesson |
| s3-g9-t1 | Classification | Generic/heuristic brief; author full lesson |
| s3-g9-t2 | Marking | Generic/heuristic brief; author full lesson |
| s3-g9-t3 | Policing | Generic/heuristic brief; author full lesson |
| s3-g9-t4 | Shaping | Generic/heuristic brief; author full lesson |
| s3-g9-t5 | Queuing | Generic/heuristic brief; author full lesson |

Stage lab `lab-3`: Build two distribution switches and two routers. Configure HSRP, OSPF, BGP, VLAN segmentation and route filtering. Record convergence after a failure.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 5: Network Services
Domain: Networking
Original purpose: Time, identity, naming and telemetry make infrastructure manageable, auditable and observable.

#### g-4-0 — Address & time services
| ID | Original topic | Existing content |
|---|---|---|
| s4-g0-t0 | DHCP Server | Generic/heuristic brief; author full lesson |
| s4-g0-t1 | DHCP Relay | Generic/heuristic brief; author full lesson |
| s4-g0-t2 | DNS architecture | Generic/heuristic brief; author full lesson |
| s4-g0-t3 | NTP | Generic/heuristic brief; author full lesson |

#### g-4-1 — Observability protocols
| ID | Original topic | Existing content |
|---|---|---|
| s4-g1-t0 | SNMP | Named brief; expand and verify |
| s4-g1-t1 | Syslog | Generic/heuristic brief; author full lesson |

#### g-4-2 — Identity & AAA
| ID | Original topic | Existing content |
|---|---|---|
| s4-g2-t0 | AAA | Generic/heuristic brief; author full lesson |
| s4-g2-t1 | RADIUS | Generic/heuristic brief; author full lesson |
| s4-g2-t2 | TACACS+ | Generic/heuristic brief; author full lesson |

#### g-4-3 — Traffic & availability
| ID | Original topic | Existing content |
|---|---|---|
| s4-g3-t0 | NetFlow | Generic/heuristic brief; author full lesson |
| s4-g3-t1 | Flexible NetFlow | Generic/heuristic brief; author full lesson |
| s4-g3-t2 | IP SLA | Named brief; expand and verify |
| s4-g3-t3 | Object Tracking | Generic/heuristic brief; author full lesson |

#### g-4-4 — Discovery & file transfer
| ID | Original topic | Existing content |
|---|---|---|
| s4-g4-t0 | Cisco Discovery Protocol | Generic/heuristic brief; author full lesson |
| s4-g4-t1 | LLDP | Generic/heuristic brief; author full lesson |
| s4-g4-t2 | SSH | Generic/heuristic brief; author full lesson |
| s4-g4-t3 | SFTP | Generic/heuristic brief; author full lesson |
| s4-g4-t4 | TFTP | Generic/heuristic brief; author full lesson |
| s4-g4-t5 | FTP | Generic/heuristic brief; author full lesson |
| s4-g4-t6 | HTTP / HTTPS | Generic/heuristic brief; author full lesson |

#### g-4-5 — Trust & access
| ID | Original topic | Existing content |
|---|---|---|
| s4-g5-t0 | PKI fundamentals | Generic/heuristic brief; author full lesson |
| s4-g5-t1 | Certificates | Generic/heuristic brief; author full lesson |
| s4-g5-t2 | 802.1X fundamentals | Generic/heuristic brief; author full lesson |
| s4-g5-t3 | Network monitoring fundamentals | Generic/heuristic brief; author full lesson |

#### g-4-6 — Monitoring platforms
| ID | Original topic | Existing content |
|---|---|---|
| s4-g6-t0 | PRTG | Generic/heuristic brief; author full lesson |
| s4-g6-t1 | Zabbix | Generic/heuristic brief; author full lesson |
| s4-g6-t2 | LibreNMS | Generic/heuristic brief; author full lesson |
| s4-g6-t3 | Grafana | Generic/heuristic brief; author full lesson |
| s4-g6-t4 | Prometheus | Generic/heuristic brief; author full lesson |

Stage lab `lab-4`: Centralize NTP, Syslog, SNMP and AAA. Verify timestamps, log delivery, polling, administrator authentication and a local recovery account.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 6: Network Security
Domain: Security
Original purpose: Explicit trust boundaries and verified controls reduce unauthorized access while preserving required business flows.

#### g-5-0 — Security principles
| ID | Original topic | Existing content |
|---|---|---|
| s5-g0-t0 | Security Fundamentals | Generic/heuristic brief; author full lesson |
| s5-g0-t1 | CIA Triad | Generic/heuristic brief; author full lesson |
| s5-g0-t2 | Attack surfaces | Generic/heuristic brief; author full lesson |
| s5-g0-t3 | Segmentation | Generic/heuristic brief; author full lesson |
| s5-g0-t4 | Defense in depth | Generic/heuristic brief; author full lesson |

#### g-5-1 — Access control lists
| ID | Original topic | Existing content |
|---|---|---|
| s5-g1-t0 | ACL | Generic/heuristic brief; author full lesson |
| s5-g1-t1 | Standard ACL | Generic/heuristic brief; author full lesson |
| s5-g1-t2 | Extended ACL | Generic/heuristic brief; author full lesson |
| s5-g1-t3 | Named ACL | Generic/heuristic brief; author full lesson |

#### g-5-2 — Layer 2 security
| ID | Original topic | Existing content |
|---|---|---|
| s5-g2-t0 | Dynamic ARP Inspection | Generic/heuristic brief; author full lesson |
| s5-g2-t1 | DHCP Snooping | Named brief; expand and verify |
| s5-g2-t2 | IP Source Guard | Generic/heuristic brief; author full lesson |
| s5-g2-t3 | Private VLAN | Generic/heuristic brief; author full lesson |
| s5-g2-t4 | 802.1X | Generic/heuristic brief; author full lesson |
| s5-g2-t5 | AAA | Generic/heuristic brief; author full lesson |
| s5-g2-t6 | Port Security | Generic/heuristic brief; author full lesson |

#### g-5-3 — Control plane defense
| ID | Original topic | Existing content |
|---|---|---|
| s5-g3-t0 | Control Plane Protection | Generic/heuristic brief; author full lesson |
| s5-g3-t1 | CoPP | Generic/heuristic brief; author full lesson |

#### g-5-4 — VPN & cryptography
| ID | Original topic | Existing content |
|---|---|---|
| s5-g4-t0 | VPN concepts | Generic/heuristic brief; author full lesson |
| s5-g4-t1 | IPsec | Named brief; expand and verify |
| s5-g4-t2 | IKE | Generic/heuristic brief; author full lesson |
| s5-g4-t3 | Site-to-Site VPN | Generic/heuristic brief; author full lesson |
| s5-g4-t4 | Remote Access VPN | Generic/heuristic brief; author full lesson |

#### g-5-5 — Firewalls & inspection
| ID | Original topic | Existing content |
|---|---|---|
| s5-g5-t0 | Firewall fundamentals | Named brief; expand and verify |
| s5-g5-t1 | Zone Based Firewall | Generic/heuristic brief; author full lesson |
| s5-g5-t2 | Cisco ASA fundamentals | Generic/heuristic brief; author full lesson |
| s5-g5-t3 | Cisco Firepower concepts | Generic/heuristic brief; author full lesson |
| s5-g5-t4 | IDS / IPS | Generic/heuristic brief; author full lesson |
| s5-g5-t5 | WAF concepts | Generic/heuristic brief; author full lesson |

#### g-5-6 — Identity & Zero Trust
| ID | Original topic | Existing content |
|---|---|---|
| s5-g6-t0 | Zero Trust overview | Generic/heuristic brief; author full lesson |
| s5-g6-t1 | Network Access Control | Generic/heuristic brief; author full lesson |
| s5-g6-t2 | Cisco ISE concepts | Generic/heuristic brief; author full lesson |

Stage lab `lab-5`: Design Internet, DMZ, Users, Servers, Management, Guest and Backup zones. Write explicit firewall and ACL rules; test allowed and denied flows.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 7: Data Center Foundations
Domain: Servers
Original purpose: Power, cooling, server architecture and physical redundancy constrain every logical data center design.

#### g-6-0 — Server architecture
| ID | Original topic | Existing content |
|---|---|---|
| s6-g0-t0 | Server Hardware | Generic/heuristic brief; author full lesson |
| s6-g0-t1 | Rack Servers | Generic/heuristic brief; author full lesson |
| s6-g0-t2 | Blade Servers | Generic/heuristic brief; author full lesson |
| s6-g0-t3 | CPU architecture | Generic/heuristic brief; author full lesson |
| s6-g0-t4 | Memory channels | Generic/heuristic brief; author full lesson |
| s6-g0-t5 | NUMA | Generic/heuristic brief; author full lesson |
| s6-g0-t6 | NIC | Generic/heuristic brief; author full lesson |
| s6-g0-t7 | HBA | Generic/heuristic brief; author full lesson |
| s6-g0-t8 | PCIe | Named brief; expand and verify |

#### g-6-1 — RAID & resilience
| ID | Original topic | Existing content |
|---|---|---|
| s6-g1-t0 | RAID | Named brief; expand and verify |
| s6-g1-t1 | Hardware RAID | Generic/heuristic brief; author full lesson |
| s6-g1-t2 | Software RAID | Generic/heuristic brief; author full lesson |
| s6-g1-t3 | RAID 0 | Generic/heuristic brief; author full lesson |
| s6-g1-t4 | RAID 1 | Generic/heuristic brief; author full lesson |
| s6-g1-t5 | RAID 5 | Generic/heuristic brief; author full lesson |
| s6-g1-t6 | RAID 6 | Generic/heuristic brief; author full lesson |
| s6-g1-t7 | RAID 10 | Generic/heuristic brief; author full lesson |
| s6-g1-t8 | Hot Spare | Generic/heuristic brief; author full lesson |

#### g-6-2 — Disk media
| ID | Original topic | Existing content |
|---|---|---|
| s6-g2-t0 | Disk Backplane | Generic/heuristic brief; author full lesson |
| s6-g2-t1 | SAS | Generic/heuristic brief; author full lesson |
| s6-g2-t2 | SATA | Generic/heuristic brief; author full lesson |
| s6-g2-t3 | NVMe | Generic/heuristic brief; author full lesson |

#### g-6-3 — Fabric fundamentals
| ID | Original topic | Existing content |
|---|---|---|
| s6-g3-t0 | Top of Rack | Generic/heuristic brief; author full lesson |
| s6-g3-t1 | End of Row | Generic/heuristic brief; author full lesson |
| s6-g3-t2 | Leaf-Spine | Generic/heuristic brief; author full lesson |
| s6-g3-t3 | East-West Traffic | Generic/heuristic brief; author full lesson |
| s6-g3-t4 | North-South Traffic | Generic/heuristic brief; author full lesson |
| s6-g3-t5 | Oversubscription | Generic/heuristic brief; author full lesson |
| s6-g3-t6 | Redundancy | Generic/heuristic brief; author full lesson |
| s6-g3-t7 | High Availability | Generic/heuristic brief; author full lesson |

#### g-6-4 — Facility design
| ID | Original topic | Existing content |
|---|---|---|
| s6-g4-t0 | Rack design | Generic/heuristic brief; author full lesson |
| s6-g4-t1 | Power distribution | Generic/heuristic brief; author full lesson |
| s6-g4-t2 | UPS | Generic/heuristic brief; author full lesson |
| s6-g4-t3 | PDU | Generic/heuristic brief; author full lesson |
| s6-g4-t4 | Cooling | Generic/heuristic brief; author full lesson |
| s6-g4-t5 | Airflow | Generic/heuristic brief; author full lesson |
| s6-g4-t6 | Hot aisle | Generic/heuristic brief; author full lesson |
| s6-g4-t7 | Cold aisle | Generic/heuristic brief; author full lesson |
| s6-g4-t8 | Cable management | Generic/heuristic brief; author full lesson |

#### g-6-5 — Out-of-band management
| ID | Original topic | Existing content |
|---|---|---|
| s6-g5-t0 | Out-of-band management | Generic/heuristic brief; author full lesson |
| s6-g5-t1 | iLO | Generic/heuristic brief; author full lesson |
| s6-g5-t2 | iDRAC | Generic/heuristic brief; author full lesson |
| s6-g5-t3 | CIMC | Generic/heuristic brief; author full lesson |

Stage lab `lab-6`: Design a 3-rack data center. Produce rack elevations, dual power paths, cooling and cabling plans, a capacity worksheet and an out-of-band network.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 8: Cisco Data Center
Domain: Data Center
Original purpose: Fabric underlays, overlays and endpoint policy enable scalable east-west networking and resilient server attachment.

#### g-7-0 — Nexus & NX-OS
| ID | Original topic | Existing content |
|---|---|---|
| s7-g0-t0 | Cisco Nexus | Generic/heuristic brief; author full lesson |
| s7-g0-t1 | NX-OS | Generic/heuristic brief; author full lesson |
| s7-g0-t2 | Nexus CLI | Generic/heuristic brief; author full lesson |
| s7-g0-t3 | Nexus architecture | Generic/heuristic brief; author full lesson |
| s7-g0-t4 | Nexus 3000 | Generic/heuristic brief; author full lesson |
| s7-g0-t5 | Nexus 5000 | Generic/heuristic brief; author full lesson |
| s7-g0-t6 | Nexus 7000 | Generic/heuristic brief; author full lesson |
| s7-g0-t7 | Nexus 9000 | Generic/heuristic brief; author full lesson |

#### g-7-1 — Virtual port channels
| ID | Original topic | Existing content |
|---|---|---|
| s7-g1-t0 | vPC | Named brief; expand and verify |
| s7-g1-t1 | vPC Peer Link | Generic/heuristic brief; author full lesson |
| s7-g1-t2 | Keepalive | Generic/heuristic brief; author full lesson |
| s7-g1-t3 | Orphan ports | Generic/heuristic brief; author full lesson |

#### g-7-2 — Classic fabric technologies
| ID | Original topic | Existing content |
|---|---|---|
| s7-g2-t0 | FabricPath concepts | Generic/heuristic brief; author full lesson |
| s7-g2-t1 | FEX | Generic/heuristic brief; author full lesson |
| s7-g2-t2 | Cisco Fabric Extender | Generic/heuristic brief; author full lesson |
| s7-g2-t3 | Data Center Interconnect | Generic/heuristic brief; author full lesson |

#### g-7-3 — VXLAN overlays
| ID | Original topic | Existing content |
|---|---|---|
| s7-g3-t0 | VXLAN | Named brief; expand and verify |
| s7-g3-t1 | VXLAN VNI | Generic/heuristic brief; author full lesson |
| s7-g3-t2 | VTEP | Generic/heuristic brief; author full lesson |

#### g-7-4 — EVPN control plane
| ID | Original topic | Existing content |
|---|---|---|
| s7-g4-t0 | EVPN | Named brief; expand and verify |
| s7-g4-t1 | MP-BGP EVPN | Generic/heuristic brief; author full lesson |
| s7-g4-t2 | Leaf-Spine Architecture | Generic/heuristic brief; author full lesson |

#### g-7-5 — Application Centric Infrastructure
| ID | Original topic | Existing content |
|---|---|---|
| s7-g5-t0 | Cisco ACI fundamentals | Generic/heuristic brief; author full lesson |
| s7-g5-t1 | APIC | Generic/heuristic brief; author full lesson |
| s7-g5-t2 | Spine | Generic/heuristic brief; author full lesson |
| s7-g5-t3 | Leaf | Generic/heuristic brief; author full lesson |
| s7-g5-t4 | Endpoint Groups | Generic/heuristic brief; author full lesson |
| s7-g5-t5 | Bridge Domains | Generic/heuristic brief; author full lesson |
| s7-g5-t6 | Contracts | Generic/heuristic brief; author full lesson |
| s7-g5-t7 | Application Profiles | Generic/heuristic brief; author full lesson |
| s7-g5-t8 | Tenants | Generic/heuristic brief; author full lesson |

Stage lab `lab-7`: Model 2 spines and 4 leaves with servers, storage and firewalls. Explain VXLAN encapsulation, MP-BGP EVPN routes and vPC attachment; compare an ACI policy design.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 9: Storage & Virtualization
Domain: Storage
Original purpose: Storage paths and hypervisor behavior determine workload availability, recovery and performance.

#### g-8-0 — Storage models
| ID | Original topic | Existing content |
|---|---|---|
| s8-g0-t0 | Storage Fundamentals | Generic/heuristic brief; author full lesson |
| s8-g0-t1 | DAS | Generic/heuristic brief; author full lesson |
| s8-g0-t2 | NAS | Generic/heuristic brief; author full lesson |
| s8-g0-t3 | SAN | Named brief; expand and verify |
| s8-g0-t4 | Block Storage | Generic/heuristic brief; author full lesson |
| s8-g0-t5 | File Storage | Generic/heuristic brief; author full lesson |
| s8-g0-t6 | Object Storage | Generic/heuristic brief; author full lesson |

#### g-8-1 — Storage protocols
| ID | Original topic | Existing content |
|---|---|---|
| s8-g1-t0 | NFS | Generic/heuristic brief; author full lesson |
| s8-g1-t1 | SMB | Generic/heuristic brief; author full lesson |
| s8-g1-t2 | iSCSI | Generic/heuristic brief; author full lesson |
| s8-g1-t3 | Fibre Channel | Generic/heuristic brief; author full lesson |
| s8-g1-t4 | FCoE | Generic/heuristic brief; author full lesson |
| s8-g1-t5 | NVMe-oF | Generic/heuristic brief; author full lesson |

#### g-8-2 — SAN fundamentals
| ID | Original topic | Existing content |
|---|---|---|
| s8-g2-t0 | HBA | Generic/heuristic brief; author full lesson |
| s8-g2-t1 | WWN | Generic/heuristic brief; author full lesson |
| s8-g2-t2 | WWPN | Generic/heuristic brief; author full lesson |
| s8-g2-t3 | Zoning | Generic/heuristic brief; author full lesson |
| s8-g2-t4 | LUN | Generic/heuristic brief; author full lesson |
| s8-g2-t5 | Multipathing | Generic/heuristic brief; author full lesson |
| s8-g2-t6 | SAN Switch | Generic/heuristic brief; author full lesson |
| s8-g2-t7 | Brocade fundamentals | Generic/heuristic brief; author full lesson |
| s8-g2-t8 | Cisco MDS fundamentals | Generic/heuristic brief; author full lesson |

#### g-8-3 — Storage arrays
| ID | Original topic | Existing content |
|---|---|---|
| s8-g3-t0 | Storage arrays | Generic/heuristic brief; author full lesson |
| s8-g3-t1 | HPE MSA | Generic/heuristic brief; author full lesson |
| s8-g3-t2 | Dell EMC concepts | Generic/heuristic brief; author full lesson |
| s8-g3-t3 | NetApp concepts | Generic/heuristic brief; author full lesson |

#### g-8-4 — Hypervisors
| ID | Original topic | Existing content |
|---|---|---|
| s8-g4-t0 | Hypervisor | Generic/heuristic brief; author full lesson |
| s8-g4-t1 | Type 1 Hypervisor | Generic/heuristic brief; author full lesson |
| s8-g4-t2 | Type 2 Hypervisor | Generic/heuristic brief; author full lesson |

#### g-8-5 — VMware operations
| ID | Original topic | Existing content |
|---|---|---|
| s8-g5-t0 | VMware ESXi | Named brief; expand and verify |
| s8-g5-t1 | vCenter | Generic/heuristic brief; author full lesson |
| s8-g5-t2 | Datastore | Generic/heuristic brief; author full lesson |
| s8-g5-t3 | vSwitch | Generic/heuristic brief; author full lesson |
| s8-g5-t4 | Distributed Switch | Generic/heuristic brief; author full lesson |
| s8-g5-t5 | VMkernel | Generic/heuristic brief; author full lesson |
| s8-g5-t6 | vMotion | Named brief; expand and verify |
| s8-g5-t7 | HA | Generic/heuristic brief; author full lesson |
| s8-g5-t8 | DRS | Generic/heuristic brief; author full lesson |
| s8-g5-t9 | Snapshots | Named brief; expand and verify |
| s8-g5-t10 | Templates | Generic/heuristic brief; author full lesson |
| s8-g5-t11 | Clusters | Generic/heuristic brief; author full lesson |

#### g-8-6 — Alternative platforms
| ID | Original topic | Existing content |
|---|---|---|
| s8-g6-t0 | Microsoft Hyper-V | Generic/heuristic brief; author full lesson |
| s8-g6-t1 | KVM | Generic/heuristic brief; author full lesson |
| s8-g6-t2 | Containers fundamentals | Generic/heuristic brief; author full lesson |
| s8-g6-t3 | Docker basics | Generic/heuristic brief; author full lesson |
| s8-g6-t4 | Kubernetes overview | Generic/heuristic brief; author full lesson |

Stage lab `lab-8`: Design SAN storage, 2 SAN switches, 3 virtualization hosts, redundant network switches and shared storage. Validate path failover and VM recovery.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Stage 10: Automation & Infrastructure Architecture
Domain: Automation
Original purpose: Repeatable changes, documented intent and tested recovery turn individual configurations into an operable architecture.

#### g-9-0 — Python & data
| ID | Original topic | Existing content |
|---|---|---|
| s9-g0-t0 | Python Fundamentals | Named brief; expand and verify |
| s9-g0-t1 | Python for Network Engineers | Generic/heuristic brief; author full lesson |
| s9-g0-t2 | Data types | Generic/heuristic brief; author full lesson |
| s9-g0-t3 | Loops | Generic/heuristic brief; author full lesson |
| s9-g0-t4 | Functions | Generic/heuristic brief; author full lesson |
| s9-g0-t5 | Files | Generic/heuristic brief; author full lesson |
| s9-g0-t6 | JSON | Generic/heuristic brief; author full lesson |
| s9-g0-t7 | YAML | Generic/heuristic brief; author full lesson |
| s9-g0-t8 | Regex | Generic/heuristic brief; author full lesson |

#### g-9-1 — APIs & models
| ID | Original topic | Existing content |
|---|---|---|
| s9-g1-t0 | APIs | Generic/heuristic brief; author full lesson |
| s9-g1-t1 | REST APIs | Generic/heuristic brief; author full lesson |
| s9-g1-t2 | HTTP methods | Generic/heuristic brief; author full lesson |
| s9-g1-t3 | Authentication | Generic/heuristic brief; author full lesson |
| s9-g1-t4 | Cisco APIs | Generic/heuristic brief; author full lesson |
| s9-g1-t5 | NETCONF | Named brief; expand and verify |
| s9-g1-t6 | RESTCONF | Named brief; expand and verify |
| s9-g1-t7 | YANG | Generic/heuristic brief; author full lesson |
| s9-g1-t8 | SNMP automation | Generic/heuristic brief; author full lesson |
| s9-g1-t9 | SSH automation | Generic/heuristic brief; author full lesson |

#### g-9-2 — Python libraries
| ID | Original topic | Existing content |
|---|---|---|
| s9-g2-t0 | Netmiko | Generic/heuristic brief; author full lesson |
| s9-g2-t1 | Paramiko | Generic/heuristic brief; author full lesson |
| s9-g2-t2 | NAPALM | Generic/heuristic brief; author full lesson |
| s9-g2-t3 | Requests | Generic/heuristic brief; author full lesson |

#### g-9-3 — Ansible & templates
| ID | Original topic | Existing content |
|---|---|---|
| s9-g3-t0 | Ansible | Named brief; expand and verify |
| s9-g3-t1 | Ansible Inventory | Generic/heuristic brief; author full lesson |
| s9-g3-t2 | Ansible Playbooks | Generic/heuristic brief; author full lesson |
| s9-g3-t3 | Cisco Ansible modules | Generic/heuristic brief; author full lesson |
| s9-g3-t4 | Templates | Generic/heuristic brief; author full lesson |
| s9-g3-t5 | Jinja2 | Generic/heuristic brief; author full lesson |

#### g-9-4 — Version control & IaC
| ID | Original topic | Existing content |
|---|---|---|
| s9-g4-t0 | Git | Named brief; expand and verify |
| s9-g4-t1 | GitHub / GitLab | Generic/heuristic brief; author full lesson |
| s9-g4-t2 | Version control | Generic/heuristic brief; author full lesson |
| s9-g4-t3 | Infrastructure as Code | Generic/heuristic brief; author full lesson |
| s9-g4-t4 | Terraform fundamentals | Generic/heuristic brief; author full lesson |

#### g-9-5 — Documentation & source of truth
| ID | Original topic | Existing content |
|---|---|---|
| s9-g5-t0 | Infrastructure documentation | Generic/heuristic brief; author full lesson |
| s9-g5-t1 | Network diagrams | Generic/heuristic brief; author full lesson |
| s9-g5-t2 | IP Address Management | Generic/heuristic brief; author full lesson |
| s9-g5-t3 | NetBox | Named brief; expand and verify |
| s9-g5-t4 | Configuration management | Generic/heuristic brief; author full lesson |
| s9-g5-t5 | Source of truth | Generic/heuristic brief; author full lesson |
| s9-g5-t6 | CI/CD concepts | Generic/heuristic brief; author full lesson |

#### g-9-6 — Resilience architecture
| ID | Original topic | Existing content |
|---|---|---|
| s9-g6-t0 | High Availability | Generic/heuristic brief; author full lesson |
| s9-g6-t1 | Disaster Recovery | Generic/heuristic brief; author full lesson |
| s9-g6-t2 | Business Continuity | Generic/heuristic brief; author full lesson |
| s9-g6-t3 | RTO | Named brief; expand and verify |
| s9-g6-t4 | RPO | Named brief; expand and verify |
| s9-g6-t5 | Redundant Data Centers | Generic/heuristic brief; author full lesson |
| s9-g6-t6 | Active/Active | Generic/heuristic brief; author full lesson |
| s9-g6-t7 | Active/Passive | Generic/heuristic brief; author full lesson |
| s9-g6-t8 | Load Balancing | Generic/heuristic brief; author full lesson |

#### g-9-7 — Infrastructure planes
| ID | Original topic | Existing content |
|---|---|---|
| s9-g7-t0 | Network segmentation | Generic/heuristic brief; author full lesson |
| s9-g7-t1 | Management Plane | Generic/heuristic brief; author full lesson |
| s9-g7-t2 | Control Plane | Generic/heuristic brief; author full lesson |
| s9-g7-t3 | Data Plane | Generic/heuristic brief; author full lesson |

#### g-9-8 — Observability & lifecycle
| ID | Original topic | Existing content |
|---|---|---|
| s9-g8-t0 | Observability | Generic/heuristic brief; author full lesson |
| s9-g8-t1 | Monitoring | Generic/heuristic brief; author full lesson |
| s9-g8-t2 | Logging | Generic/heuristic brief; author full lesson |
| s9-g8-t3 | Metrics | Generic/heuristic brief; author full lesson |
| s9-g8-t4 | Tracing | Generic/heuristic brief; author full lesson |
| s9-g8-t5 | Capacity Planning | Generic/heuristic brief; author full lesson |
| s9-g8-t6 | Infrastructure Lifecycle Management | Generic/heuristic brief; author full lesson |

Stage lab `lab-9`: Design and document the complete enterprise capstone. Use version-controlled automation, validation and rollback to reproduce the infrastructure.
Lab gap: add requirements, topology, exact steps, expected observations, fault/recovery, cleanup and evidence rubric.

### Device track
- `device-0` — Catalyst 2960 / 2960X
- `device-1` — Catalyst 3560 / 3750
- `device-2` — Catalyst 9200
- `device-3` — Catalyst 9300
- `device-4` — Catalyst 9500
- `device-5` — Cisco ISR 4000
- `device-6` — Cisco ASR
- `device-7` — Cisco ASA
- `device-8` — Cisco Firepower
- `device-9` — Cisco Aironet
- `device-10` — Cisco Catalyst Wireless
- `device-11` — Cisco Wireless LAN Controller
- `device-12` — Cisco Nexus 3000
- `device-13` — Cisco Nexus 5000
- `device-14` — Cisco Nexus 7000
- `device-15` — Cisco Nexus 9000
- `device-16` — Cisco MDS SAN switches

### Hardware track
- `hardware-0` — HPE ProLiant
- `hardware-1` — Dell PowerEdge
- `hardware-2` — Cisco UCS
- `hardware-3` — Rack Servers
- `hardware-4` — Blade Servers
- `hardware-5` — Storage Arrays
- `hardware-6` — HPE MSA
- `hardware-7` — Dell EMC
- `hardware-8` — NetApp
- `hardware-9` — SAN Switches
- `hardware-10` — Brocade
- `hardware-11` — Cisco MDS
- `hardware-12` — UPS
- `hardware-13` — PDU
- `hardware-14` — Rack Management
- `hardware-15` — Environmental Monitoring
- `hardware-16` — Out-of-Band Management
- `hardware-17` — iLO
- `hardware-18` — iDRAC
- `hardware-19` — CIMC

### Trouble track
- `trouble-0` — Layer 1 troubleshooting
- `trouble-1` — Interface errors
- `trouble-2` — CRC errors
- `trouble-3` — Duplex mismatch
- `trouble-4` — VLAN troubleshooting
- `trouble-5` — STP troubleshooting
- `trouble-6` — EtherChannel troubleshooting
- `trouble-7` — Routing troubleshooting
- `trouble-8` — OSPF troubleshooting
- `trouble-9` — BGP troubleshooting
- `trouble-10` — DHCP troubleshooting
- `trouble-11` — DNS troubleshooting
- `trouble-12` — NAT troubleshooting
- `trouble-13` — ACL troubleshooting
- `trouble-14` — Firewall troubleshooting
- `trouble-15` — Wireless troubleshooting
- `trouble-16` — Server hardware troubleshooting
- `trouble-17` — RAID troubleshooting
- `trouble-18` — SAN troubleshooting
- `trouble-19` — VMware troubleshooting
- `trouble-20` — Data center outage analysis

### Capstone track
- `capstone-final` — Enterprise Data Center Architecture Capstone

## Exact duplicate topic occurrences

- PCIe: `s0-g0-t3`, `s6-g0-t8`
- RAID: `s0-g0-t5`, `s6-g1-t0`
- Ethernet: `s0-g2-t3`, `s1-g1-t0`
- ARP: `s1-g1-t1`, `s1-g5-t6`
- VLAN: `s1-g3-t0`, `s2-g2-t0`
- Port Security: `s2-g5-t5`, `s5-g2-t6`
- OSPF troubleshooting: `s3-g1-t4`, `trouble-8`
- AAA: `s4-g2-t0`, `s5-g2-t5`
- Rack Servers: `s6-g0-t1`, `hardware-3`
- Blade Servers: `s6-g0-t2`, `hardware-4`
- HBA: `s6-g0-t7`, `s8-g2-t0`
- High Availability: `s6-g3-t7`, `s9-g6-t0`
- UPS: `s6-g4-t2`, `hardware-12`
- PDU: `s6-g4-t3`, `hardware-13`
- Out-of-band management: `s6-g5-t0`, `hardware-16`
- iLO: `s6-g5-t1`, `hardware-17`
- iDRAC: `s6-g5-t2`, `hardware-18`
- CIMC: `s6-g5-t3`, `hardware-19`
- Storage arrays: `s8-g3-t0`, `hardware-5`
- HPE MSA: `s8-g3-t1`, `hardware-6`
- Templates: `s8-g5-t10`, `s9-g3-t4`

Near-duplicates also need canonical linking: NIC/NICs, CPU/CPU architecture, STP/STP concepts, IPv6/IPv6 fundamentals, FEX/Cisco Fabric Extender, HBA/storage attachment, snapshots/templates and platform families. Keep introductory and operational treatments distinct.

## Supporting collections
Preserved in inventory: certification cards; capstone deliverables; diagnostic method; lab-environment HTML; capstone HTML/SVG. They are not silently counted as enriched lessons. Each item/diagram label also has its own stable supporting ID:

- `support-certs-0` — Cisco CCNA
- `support-certs-1` — Cisco CCNP Enterprise
- `support-certs-2` — Cisco CCNP Data Center
- `support-certs-3` — Cisco CCIE Enterprise Infrastructure
- `support-certs-4` — Cisco CCIE Data Center
- `support-certs-5` — VMware certifications
- `support-certs-6` — Linux certifications
- `support-certs-7` — Ansible / Red Hat Automation
- `support-deliverables-0` — Logical network diagram
- `support-deliverables-1` — Physical network diagram
- `support-deliverables-2` — IP addressing plan
- `support-deliverables-3` — VLAN plan
- `support-deliverables-4` — Routing design
- `support-deliverables-5` — Firewall policy
- `support-deliverables-6` — Data center rack design
- `support-deliverables-7` — Server design
- `support-deliverables-8` — Storage design
- `support-deliverables-9` — HA design
- `support-deliverables-10` — Monitoring design
- `support-deliverables-11` — Backup strategy
- `support-deliverables-12` — DR plan
- `support-deliverables-13` — Automation strategy
- `support-deliverables-14` — Documentation
- `support-method-0` — Define the problem
- `support-method-1` — Gather evidence
- `support-method-2` — Identify the affected layer
- `support-method-3` — Build hypotheses
- `support-method-4` — Test safely
- `support-method-5` — Apply corrective action
- `support-method-6` — Validate
- `support-method-7` — Document root cause
- `support-lab-environment-0` — Learn packet behavior
- `support-lab-environment-1` — Cisco Packet Tracer
- `support-lab-environment-2` — GNS3 or EVE-NG
- `support-lab-environment-3` — Wireshark
- `support-lab-environment-4` — Linux VM
- `support-lab-environment-5` — Windows Server VM
- `support-lab-environment-6` — Operate an enterprise lab
- `support-lab-environment-7` — Cisco IOSv / IOSvL2
- `support-lab-environment-8` — CSR1000v / Catalyst 8000V
- `support-lab-environment-9` — NX-OSv
- `support-lab-environment-10` — FortiGate VM or equivalent firewall
- `support-lab-environment-11` — Windows Server / Ubuntu Server
- `support-lab-environment-12` — VMware ESXi or equivalent hypervisor
- `support-lab-environment-13` — Test real dependencies
- `support-lab-environment-14` — Catalyst 2960X / 9200
- `support-lab-environment-15` — Cisco ISR4331
- `support-lab-environment-16` — Nexus 3K / 5K / 9K
- `support-lab-environment-17` — Access point + wireless controller
- `support-lab-environment-18` — HPE DL380 Gen9 / Gen10
- `support-lab-environment-19` — SAN storage + Brocade or Cisco SAN switch
- `support-lab-environment-20` — UPS + managed PDU
- `support-capstone-0` — Internet
- `support-capstone-1` — ISP A
- `support-capstone-2` — ISP B
- `support-capstone-3` — Edge router A
- `support-capstone-4` — Edge router B
- `support-capstone-5` — Firewall A
- `support-capstone-6` — Firewall B
- `support-capstone-7` — HA / state sync
- `support-capstone-8` — Redundant core pair
- `support-capstone-9` — Spine 1
- `support-capstone-10` — Spine 2
- `support-capstone-11` — Leaf 1
- `support-capstone-12` — Leaf 2
- `support-capstone-13` — Leaf 3
- `support-capstone-14` — Leaf 4
- `support-capstone-15` — Server farm / VMware
- `support-capstone-16` — dual NIC attachment · vPC where supported
- `support-capstone-17` — SAN A + SAN B
- `support-capstone-18` — host HBAs → FC fabrics → storage
- `support-capstone-19` — Distribution / access
- `support-capstone-20` — campus + wireless
- `support-capstone-21` — Management / OOB
- `support-capstone-22` — AAA · DNS · DHCP · NTP
- `support-capstone-23` — Monitoring · Syslog
- `support-capstone-24` — Automation server
- `support-capstone-25` — NetBox · Ansible · Git
- `support-capstone-26` — Backup / recovery
- `support-capstone-27` — independent copies
- `support-capstone-28` — DR site
- `support-capstone-29` — tested RTO / RPO
- `support-capstone-30` — Logical reference only. EVPN controls a VXLAN overlay over the routed leaf-spine underlay. ACI is an alternative fabric operating model. Fibre Channel storage uses separate SAN paths from host HBAs; the storage attachment above represents workload dependency.
- `support-capstone-31` — Your engineering deliverables

## Acceptance record
No topics were marked completed by the initial audit. The reviewed completion manifest records subsequent acceptance.

## Networking Basics review
Batch 03 corrections and source scope are recorded in [docs/research-batch-03.md](docs/research-batch-03.md), with acceptance evidence in [docs/validation-batch-03.md](docs/validation-batch-03.md). Key distinctions: VLAN versus IP subnet; next-hop MAC versus endpoint IP; frame length versus IP MTU; IPv4 versus IPv6 fragmentation; capacity versus goodput versus delay; legacy duplex behavior versus modern PHY-specific rules. See the manifest for current editorial status.

## Binary and Subnetting review
Batch 04 reviews all eight addressing nodes and the original foundation lab. [Source/correction ledger](docs/research-batch-04.md) and [acceptance evidence](docs/validation-batch-04.md) record strict parsing, /31-/32 semantics, IPv6 normalization, aligned VLSM and the executed isolated virtual LAN. The physical managed-switch variant remains explicitly unexecuted. The scheduled cross-course audit is recorded in docs/quality-audit-batch-04.json.

## Protocols, switching and routing review
Batch 05 accepts 18 lessons with bounded protocol models and executed loopback transport, isolated VLAN and dual-stack routing labs. [Source ledger](docs/research-batch-05.md) and [acceptance evidence](docs/validation-batch-05.md) distinguish synthetic state from live behavior, prefix selection from delivery, stable STP roles from convergence and static IPv6 from automatic configuration. The additional cross-course audit is docs/quality-audit-batch-05.json.
