# Roadmap Batch Plan

Every original progress-bearing ID is assigned exactly once. Sequence is editorial order; lesson prerequisites will be precise links, not blanket stage gates.
Batch 01 is deliberately seven substantial hardware topics. Later batch scopes may be split without changing original IDs.
Complete audit → research → design → implementation → visualization → labs → questions → tests → Astra review → progress update before advancing.
Run a broad consistency/accessibility/performance audit after batches 04, 08, 12 and every fourth batch thereafter.

## Batch 01 — Computer Hardware
Status: complete
Dependencies: none
Topics:
- `s0-g0-t0` — CPU
- `s0-g0-t1` — RAM
- `s0-g0-t2` — Storage
- `s0-g0-t3` — PCIe
- `s0-g0-t4` — NICs
- `s0-g0-t5` — RAID
- `s0-g0-t6` — Server architecture
Planned visuals: annotated component/dependency map; step-by-step mechanism; relevant comparison table.
Planned labs: isolated inventory/configuration exercise, a controlled failure, recovery verification and evidence record.
Planned interactions: stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 02 — Operating Systems
Status: complete
Dependencies: 01
Topics:
- `s0-g1-t0` — Windows
- `s0-g1-t1` — Windows Server
- `s0-g1-t2` — Linux fundamentals
- `s0-g1-t3` — CLI fundamentals
Planned visuals: Windows identity/process flow; server role lifecycle; Linux path checks; shell execution flow; four comparison tables; permission explorer.
Planned labs: Windows read-only evidence baseline; Windows Server role/dependency tabletop or optional isolated VM; Linux runtime/permission interpretation; Bash pipeline status and PowerShell object-pipeline practice.
Planned interactions: Four steppers with static explanations; Linux rwx/octal and selected-class explorer; 12 quick checks and 40 exam questions; cross-batch indexed search and navigation.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 03 — Networking Basics
Status: complete
Dependencies: 02
Topics:
- `s0-g2-t0` — LAN
- `s0-g2-t1` — WAN
- `s0-g2-t2` — WLAN
- `s0-g2-t3` — Ethernet
- `s0-g2-t4` — MAC addresses
- `s0-g2-t5` — Frames
- `s0-g2-t6` — Packets
- `s0-g2-t7` — MTU
- `s0-g2-t8` — Bandwidth
- `s0-g2-t9` — Latency
- `s0-g2-t10` — Duplex
Planned visuals: Eleven mechanism steppers and comparison tables; routed packet journey with field changes; MTU, serialization and bandwidth-delay calculator.
Planned labs: Eleven read-only, browser or explicitly synthetic diagnostic labs; no network configuration changes or external traffic-generator tests.
Planned interactions: 110 original exam questions, 33 quick checks, field-by-field packet stepping, IPv4/IPv6 payload budgets and independent rate/delay controls.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 04 — Binary & Subnetting
Status: complete
Dependencies: 03
Topics:
- `s0-g3-t0` — Binary
- `s0-g3-t1` — Decimal
- `s0-g3-t2` — Hexadecimal
- `s0-g3-t3` — IPv4
- `s0-g3-t4` — IPv6
- `s0-g3-t5` — CIDR
- `s0-g3-t6` — VLSM
- `s0-g3-t7` — subnet calculation
- `lab-0` — IT & Infrastructure Foundation Lab
Planned visuals: Nine mechanism steppers and comparison tables; octet bits/base conversion, IPv4 prefix boundary grid, IPv6 hextet expansion and VLSM allocation table.
Planned labs: Eight calculation/inspection exercises plus executable isolated two-PC Linux bridge lab with subnet fault, recovery and scoped cleanup.
Planned interactions: 90 original exam questions, 27 quick checks; validated /0–/32 subnet arithmetic, canonical IPv6 text and largest-first conventional VLSM planner.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 05 — Network models / Ethernet & resolution / Transport & services / Layer 2 fundamentals / Routing fundamentals
Status: complete
Dependencies: 04
Topics:
- `s1-g0-t0` — OSI Model
- `s1-g0-t1` — TCP/IP Model
- `s1-g1-t0` — Ethernet
- `s1-g1-t1` — ARP
- `s1-g1-t2` — ICMP
- `s1-g2-t0` — TCP vs UDP
- `s1-g2-t1` — DNS
- `s1-g2-t2` — DHCP
- `s1-g2-t3` — NAT / PAT
- `s1-g3-t0` — VLAN
- `s1-g3-t1` — 802.1Q
- `s1-g3-t2` — Trunking
- `s1-g3-t3` — STP concepts
- `s1-g3-t4` — MAC address tables
- `s1-g4-t0` — Routing tables
- `s1-g4-t1` — Default gateways
- `s1-g4-t2` — Static routes
- `s1-g4-t3` — IPv6 fundamentals
Planned visuals: Protocol-layer explorer; ARP/ICMP evidence flows; DNS recursion/cache and DHCP lease sequences; NAT mapping, VLAN forwarding and route-selection models.
Planned labs: Bounded protocol inspection, original synthetic incident cases and isolated Linux bridge/routing experiments where supported.
Planned interactions: Per-topic quick checks and ten original exam questions; layer selection, DNS/lease state exploration, VLAN/MAC and longest-prefix forwarding exercises.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 06 — Diagnostic tools
Status: complete
Dependencies: 05
Topics:
- `s1-g5-t0` — ping
- `s1-g5-t1` — traceroute
- `s1-g5-t2` — nslookup
- `s1-g5-t3` — dig
- `s1-g5-t4` — ipconfig
- `s1-g5-t5` — ip
- `s1-g5-t6` — arp
- `s1-g5-t7` — netstat
- `s1-g5-t8` — ss
- `s1-g5-t9` — tcpdump
- `s1-g5-t10` — Wireshark
- `lab-1` — Networking Fundamentals Lab
Planned visuals: Diagnostic case explorers, packet category inspector and integrated baseline/fault/recovery evidence explorer.
Planned labs: Bounded Windows/Linux diagnostics, owned loopback DNS/socket fixtures, offline PCAP analysis and isolated five-protocol routed lab.
Planned interactions: Separate supported conclusions from observations; retain timing uncertainty and original application evidence.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 07 — IOS & configuration / Boot & recovery / Switching & VLANs / Link aggregation
Status: complete
Dependencies: 06
Topics:
- `s2-g0-t0` — Cisco IOS / IOS XE
- `s2-g0-t1` — Cisco CLI structure
- `s2-g0-t2` — Running configuration
- `s2-g0-t3` — Startup configuration
- `s2-g1-t0` — Configuration register
- `s2-g1-t1` — ROMMON
- `s2-g1-t2` — Boot process
- `s2-g1-t3` — Cisco file systems
- `s2-g1-t4` — Flash management
- `s2-g1-t5` — IOS images
- `s2-g1-t6` — Install Mode vs Bundle Mode
- `s2-g1-t7` — Device backup and recovery
- `s2-g2-t0` — VLAN
- `s2-g2-t1` — Access ports
- `s2-g2-t2` — Trunk ports
- `s2-g2-t3` — DTP
- `s2-g2-t4` — VTP
- `s2-g2-t5` — Voice VLAN
- `s2-g3-t0` — EtherChannel
- `s2-g3-t1` — LACP
- `s2-g3-t2` — PAgP
Planned visuals: Bounded CLI/configuration explorer, selected register-field decoder, boot-checkpoint cases and dry-run storage planner. Install dependency and recovery-evidence explorers. Ordinary access/trunk frame classification path. DTP endpoint role table and VTP/voice evidence cases. EtherChannel member/capacity/threshold/traffic/path evidence explorer. LACP/PAgP scoped protocol-mode and prerequisite checker.
Planned labs: isolated inventory/configuration exercise, a controlled failure, recovery verification and evidence record.
Planned interactions: stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 08 — Spanning tree / Edge protection / Traffic mirroring
Status: complete
Dependencies: 07
Topics:
- `s2-g4-t0` — STP
- `s2-g4-t1` — RSTP
- `s2-g4-t2` — MST
- `s2-g5-t0` — PortFast
- `s2-g5-t1` — BPDU Guard
- `s2-g5-t2` — Root Guard
- `s2-g5-t3` — Loop Guard
- `s2-g5-t4` — Storm Control
- `s2-g5-t5` — Port Security
- `s2-g6-t0` — SPAN
- `s2-g6-t1` — RSPAN
- `s2-g6-t2` — ERSPAN
- `lab-2` — Cisco Enterprise Networking Lab
Planned visuals: Stable triangle, rapid evidence, MST maps, edge/guard scope, storm thresholds, source persistence, local/RSPAN copy selection and declared ERSPAN tuple/size review. Integrated three-switch VLAN/component tree, logical bundle and independent service-evidence worksheet.
Planned labs: Scoped model/guided switch exercises and later integrated switching fault/recovery lab.
Planned interactions: stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 09 — Routing policy / OSPF / EIGRP / BGP / BGP policy
Status: complete
Dependencies: 08
Topics:
- `s3-g0-t0` — Static Routing
- `s3-g0-t1` — Floating Static Routes
- `s3-g0-t2` — Policy-Based Routing
- `s3-g1-t0` — OSPF
- `s3-g1-t1` — OSPF Areas
- `s3-g1-t2` — OSPF DR / BDR
- `s3-g1-t3` — OSPF LSA basics
- `s3-g1-t4` — OSPF troubleshooting
- `s3-g2-t0` — EIGRP
- `s3-g2-t1` — EIGRP metrics
- `s3-g2-t2` — EIGRP neighbors
- `s3-g2-t3` — EIGRP topology
- `s3-g3-t0` — BGP fundamentals
- `s3-g3-t1` — eBGP
- `s3-g3-t2` — iBGP
- `s3-g3-t3` — BGP attributes
- `s3-g4-t0` — Local Preference
- `s3-g4-t1` — MED
- `s3-g4-t2` — AS Path
- `s3-g4-t3` — Communities
Planned visuals: Static installation/LPM, parallel floating paths, ingress PBR trace, directed SPF graph, two-area topology/reachability, broadcast election-history explorer and per-lesson flows. LSA fixed-header map, ordered freshness trace and separately scoped actual snapshot inspector. Troubleshooting investigation workflow, per-layer actual observations and raw-record viewer. EIGRP distance comparison and four-step control-to-traffic flow. EIGRP metrics vector/rounding table and four-step scoped calculation flow. EIGRP neighbor observer/checkpoint table, separate startup transport headers and scoped investigation flow. Topology candidate/history/selection flow and literal path versus independent RIB/kernel table. BGP four-step session/policy/installation/service flow and twelve actual prefix views; eBGP ordered prefix-admission gate trace and independent forward/return declarations. iBGP per-observer distribution/next-hop/selection table and four-step same-AS mechanism. Attribute FLAGS, LOCAL_PREF, conditional MED, ordinary AS_SEQUENCE and community contract tables plus five labelled flows.
Planned labs: Actual isolated Linux static/dual-stack, single-area FRR, multi-area ABR/mismatch/recovery and four-router broadcast DR/BDR labs; IOS XE guidance remains unexecuted. Actual single-transit FRR EIGRP peer/topology/RIB/kernel/capture/fault and combined recovery.
Planned interactions: Twenty reviewed lessons;200 exams/60 quick checks. Actual fixture inspectors and declared policy worksheets retain separate evidence scopes.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 10 — Route control / VRF segmentation / Gateway redundancy / Multicast / Quality of service
Status: complete
Dependencies: 09
Topics:
- `s3-g5-t0` — Route filtering
- `s3-g5-t1` — Route redistribution
- `s3-g5-t2` — Route maps
- `s3-g5-t3` — Prefix lists
- `s3-g5-t4` — Access lists
- `s3-g6-t0` — VRF
- `s3-g6-t1` — VRF-Lite
- `s3-g7-t0` — HSRP
- `s3-g7-t1` — VRRP
- `s3-g7-t2` — GLBP
- `s3-g8-t0` — Multicast fundamentals
- `s3-g8-t1` — PIM
- `s3-g8-t2` — IGMP
- `s3-g9-t0` — QoS fundamentals
- `s3-g9-t1` — Classification
- `s3-g9-t2` — Marking
- `s3-g9-t3` — Policing
- `s3-g9-t4` — Shaping
- `s3-g9-t5` — Queuing
- `lab-3` — Advanced Routing & Switching Lab
Planned visuals: annotated component/dependency map; step-by-step mechanism; relevant comparison table.
Planned labs: isolated inventory/configuration exercise, a controlled failure, recovery verification and evidence record.
Planned interactions: Twenty accepted lessons,200 reviewed exams/60 quick checks; bounded route-control, VRF, FHRP, multicast, QoS and original-path worksheets. Guided target lab remains unexecuted.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 11 — Address & time services / Observability protocols / Identity & AAA / Traffic & availability / Discovery & file transfer
Status: complete
Dependencies: 10
Topics:
- `s4-g0-t0` — DHCP Server
- `s4-g0-t1` — DHCP Relay
- `s4-g0-t2` — DNS architecture
- `s4-g0-t3` — NTP
- `s4-g1-t0` — SNMP
- `s4-g1-t1` — Syslog
- `s4-g2-t0` — AAA
- `s4-g2-t1` — RADIUS
- `s4-g2-t2` — TACACS+
- `s4-g3-t0` — NetFlow
- `s4-g3-t1` — Flexible NetFlow
- `s4-g3-t2` — IP SLA
- `s4-g3-t3` — Object Tracking
- `s4-g4-t0` — Cisco Discovery Protocol
- `s4-g4-t1` — LLDP
- `s4-g4-t2` — SSH
- `s4-g4-t3` — SFTP
- `s4-g4-t4` — TFTP
- `s4-g4-t5` — FTP
- `s4-g4-t6` — HTTP / HTTPS
Planned visuals: Topic-specific prerequisite/evidence worksheets and four-step mechanisms with static equivalents.
Planned labs: Downloadable guided Network Services workbook with one-fault/restore/evidence records; synthetic browser declarations are separate from actual service observations.
Planned interactions: 20 lesson steppers, native worksheet controls, 200 exams and 60 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 12 — Trust & access / Monitoring platforms
Status: complete
Dependencies: 11
Topics:
- `s4-g5-t0` — PKI fundamentals
- `s4-g5-t1` — Certificates
- `s4-g5-t2` — 802.1X fundamentals
- `s4-g5-t3` — Network monitoring fundamentals
- `s4-g6-t0` — PRTG
- `s4-g6-t1` — Zabbix
- `s4-g6-t2` — LibreNMS
- `s4-g6-t3` — Grafana
- `s4-g6-t4` — Prometheus
- `lab-4` — Network Services Lab
Planned visuals: Topic-specific prerequisite/evidence worksheets and four-step mechanisms with static equivalents.
Planned labs: Downloadable guided Network Services workbook with one-fault/restore/evidence records; synthetic browser declarations are separate from actual service observations.
Planned interactions: 10 lesson steppers, native worksheet controls, 100 exams and 30 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 13 — Security principles / Access control lists / Layer 2 security / Control plane defense
Status: completed
Dependencies: 12
Topics:
- `s5-g0-t0` — Security Fundamentals
- `s5-g0-t1` — CIA Triad
- `s5-g0-t2` — Attack surfaces
- `s5-g0-t3` — Segmentation
- `s5-g0-t4` — Defense in depth
- `s5-g1-t0` — ACL
- `s5-g1-t1` — Standard ACL
- `s5-g1-t2` — Extended ACL
- `s5-g1-t3` — Named ACL
- `s5-g2-t0` — Dynamic ARP Inspection
- `s5-g2-t1` — DHCP Snooping
- `s5-g2-t2` — IP Source Guard
- `s5-g2-t3` — Private VLAN
- `s5-g2-t4` — 802.1X
- `s5-g2-t5` — AAA
- `s5-g2-t6` — Port Security
- `s5-g3-t0` — Control Plane Protection
- `s5-g3-t1` — CoPP
Planned visuals: Topic-specific native decision traces and annotated four-step mechanisms with static equivalents.
Planned labs: Guided owned one-fault/exact-restore workbook; model results distinguished from measured evidence.
Planned interactions: 18 interactive decision worksheets; 180 original exams and 54 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 14 — VPN & cryptography / Firewalls & inspection / Identity & Zero Trust
Status: completed
Dependencies: 13
Topics:
- `s5-g4-t0` — VPN concepts
- `s5-g4-t1` — IPsec
- `s5-g4-t2` — IKE
- `s5-g4-t3` — Site-to-Site VPN
- `s5-g4-t4` — Remote Access VPN
- `s5-g5-t0` — Firewall fundamentals
- `s5-g5-t1` — Zone Based Firewall
- `s5-g5-t2` — Cisco ASA fundamentals
- `s5-g5-t3` — Cisco Firepower concepts
- `s5-g5-t4` — IDS / IPS
- `s5-g5-t5` — WAF concepts
- `s5-g6-t0` — Zero Trust overview
- `s5-g6-t1` — Network Access Control
- `s5-g6-t2` — Cisco ISE concepts
- `lab-5` — Network Security Lab
Planned visuals: Topic-specific native decision traces and annotated four-step mechanisms with static equivalents.
Planned labs: Guided owned one-fault/exact-restore workbook; model results distinguished from measured evidence.
Planned interactions: 15 interactive decision worksheets; 150 original exams and 45 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 15 — Server architecture / RAID & resilience / Disk media
Status: completed
Dependencies: 14
Topics:
- `s6-g0-t0` — Server Hardware
- `s6-g0-t1` — Rack Servers
- `s6-g0-t2` — Blade Servers
- `s6-g0-t3` — CPU architecture
- `s6-g0-t4` — Memory channels
- `s6-g0-t5` — NUMA
- `s6-g0-t6` — NIC
- `s6-g0-t7` — HBA
- `s6-g0-t8` — PCIe
- `s6-g1-t0` — RAID
- `s6-g1-t1` — Hardware RAID
- `s6-g1-t2` — Software RAID
- `s6-g1-t3` — RAID 0
- `s6-g1-t4` — RAID 1
- `s6-g1-t5` — RAID 5
- `s6-g1-t6` — RAID 6
- `s6-g1-t7` — RAID 10
- `s6-g1-t8` — Hot Spare
- `s6-g2-t0` — Disk Backplane
- `s6-g2-t1` — SAS
- `s6-g2-t2` — SATA
- `s6-g2-t3` — NVMe
Planned visuals: Native bounded capacity/failure worksheets and four-step annotated mechanisms.
Planned labs: Read-only observations and guided supported hardware/facility recovery; integrated three-rack offline design rehearsal.
Planned interactions: 22 worksheets, 220 original exams, 66 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 16 — Fabric fundamentals / Facility design / Out-of-band management
Status: completed
Dependencies: 15
Topics:
- `s6-g3-t0` — Top of Rack
- `s6-g3-t1` — End of Row
- `s6-g3-t2` — Leaf-Spine
- `s6-g3-t3` — East-West Traffic
- `s6-g3-t4` — North-South Traffic
- `s6-g3-t5` — Oversubscription
- `s6-g3-t6` — Redundancy
- `s6-g3-t7` — High Availability
- `s6-g4-t0` — Rack design
- `s6-g4-t1` — Power distribution
- `s6-g4-t2` — UPS
- `s6-g4-t3` — PDU
- `s6-g4-t4` — Cooling
- `s6-g4-t5` — Airflow
- `s6-g4-t6` — Hot aisle
- `s6-g4-t7` — Cold aisle
- `s6-g4-t8` — Cable management
- `s6-g5-t0` — Out-of-band management
- `s6-g5-t1` — iLO
- `s6-g5-t2` — iDRAC
- `s6-g5-t3` — CIMC
- `lab-6` — Data Center Foundations Lab
Planned visuals: Native bounded capacity/failure worksheets and four-step annotated mechanisms.
Planned labs: Read-only observations and guided supported hardware/facility recovery; integrated three-rack offline design rehearsal.
Planned interactions: 22 worksheets, 220 original exams, 66 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 17 — Nexus & NX-OS / Virtual port channels / Classic fabric technologies / VXLAN overlays / EVPN control plane
Status: completed
Dependencies: 16
Topics:
- `s7-g0-t0` — Cisco Nexus
- `s7-g0-t1` — NX-OS
- `s7-g0-t2` — Nexus CLI
- `s7-g0-t3` — Nexus architecture
- `s7-g0-t4` — Nexus 3000
- `s7-g0-t5` — Nexus 5000
- `s7-g0-t6` — Nexus 7000
- `s7-g0-t7` — Nexus 9000
- `s7-g1-t0` — vPC
- `s7-g1-t1` — vPC Peer Link
- `s7-g1-t2` — Keepalive
- `s7-g1-t3` — Orphan ports
- `s7-g2-t0` — FabricPath concepts
- `s7-g2-t1` — FEX
- `s7-g2-t2` — Cisco Fabric Extender
- `s7-g2-t3` — Data Center Interconnect
- `s7-g3-t0` — VXLAN
- `s7-g3-t1` — VXLAN VNI
- `s7-g3-t2` — VTEP
- `s7-g4-t0` — EVPN
- `s7-g4-t1` — MP-BGP EVPN
- `s7-g4-t2` — Leaf-Spine Architecture
Planned visuals: Four-step mechanisms, comparison tables and incident workbenches with scoped calculations.
Planned labs: Guided vendor observation and offline evidence rehearsal; no physical Cisco execution.
Planned interactions: 22 incident workbenches; 220 original written exams and 66 quick checks with self-assessment.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 18 — Application Centric Infrastructure
Status: completed
Dependencies: 17
Topics:
- `s7-g5-t0` — Cisco ACI fundamentals
- `s7-g5-t1` — APIC
- `s7-g5-t2` — Spine
- `s7-g5-t3` — Leaf
- `s7-g5-t4` — Endpoint Groups
- `s7-g5-t5` — Bridge Domains
- `s7-g5-t6` — Contracts
- `s7-g5-t7` — Application Profiles
- `s7-g5-t8` — Tenants
- `lab-7` — Cisco Data Center Lab
Planned visuals: Four-step mechanisms, comparison tables and incident workbenches with scoped calculations.
Planned labs: Guided vendor observation and offline evidence rehearsal; no physical Cisco execution.
Planned interactions: 10 incident workbenches; 100 original written exams and 30 quick checks with self-assessment.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 19 — Storage models / Storage protocols / SAN fundamentals
Status: completed
Dependencies: 18
Topics:
- `s8-g0-t0` — Storage Fundamentals
- `s8-g0-t1` — DAS
- `s8-g0-t2` — NAS
- `s8-g0-t3` — SAN
- `s8-g0-t4` — Block Storage
- `s8-g0-t5` — File Storage
- `s8-g0-t6` — Object Storage
- `s8-g1-t0` — NFS
- `s8-g1-t1` — SMB
- `s8-g1-t2` — iSCSI
- `s8-g1-t3` — Fibre Channel
- `s8-g1-t4` — FCoE
- `s8-g1-t5` — NVMe-oF
- `s8-g2-t0` — HBA
- `s8-g2-t1` — WWN
- `s8-g2-t2` — WWPN
- `s8-g2-t3` — Zoning
- `s8-g2-t4` — LUN
- `s8-g2-t5` — Multipathing
- `s8-g2-t6` — SAN Switch
- `s8-g2-t7` — Brocade fundamentals
- `s8-g2-t8` — Cisco MDS fundamentals
Planned visuals: Four-step mechanism, comparison table and incident workbench per lesson; scoped arithmetic and access models.
Planned labs: Offline authored incident inspection; optional guided vendor observation. Integrated lab adds synthetic topology and actual owned file restore.
Planned interactions: 22 incident panels, 220 written exams and 66 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 20 — Storage arrays / Hypervisors / VMware operations
Status: completed
Dependencies: 19
Topics:
- `s8-g3-t0` — Storage arrays
- `s8-g3-t1` — HPE MSA
- `s8-g3-t2` — Dell EMC concepts
- `s8-g3-t3` — NetApp concepts
- `s8-g4-t0` — Hypervisor
- `s8-g4-t1` — Type 1 Hypervisor
- `s8-g4-t2` — Type 2 Hypervisor
- `s8-g5-t0` — VMware ESXi
- `s8-g5-t1` — vCenter
- `s8-g5-t2` — Datastore
- `s8-g5-t3` — vSwitch
- `s8-g5-t4` — Distributed Switch
- `s8-g5-t5` — VMkernel
- `s8-g5-t6` — vMotion
- `s8-g5-t7` — HA
- `s8-g5-t8` — DRS
- `s8-g5-t9` — Snapshots
- `s8-g5-t10` — Templates
- `s8-g5-t11` — Clusters
Planned visuals: Four-step mechanism, comparison table and incident workbench per lesson; scoped arithmetic and access models.
Planned labs: Offline authored incident inspection; optional guided vendor observation. Integrated lab adds synthetic topology and actual owned file restore.
Planned interactions: 19 incident panels, 190 written exams and 57 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 21 — Alternative platforms
Status: completed
Dependencies: 20
Topics:
- `s8-g6-t0` — Microsoft Hyper-V
- `s8-g6-t1` — KVM
- `s8-g6-t2` — Containers fundamentals
- `s8-g6-t3` — Docker basics
- `s8-g6-t4` — Kubernetes overview
- `lab-8` — Storage & Virtualization Lab
Planned visuals: Four-step mechanism, comparison table and incident workbench per lesson; scoped arithmetic and access models.
Planned labs: Offline authored incident inspection; optional guided vendor observation. Integrated lab adds synthetic topology and actual owned file restore.
Planned interactions: 6 incident panels, 60 written exams and 18 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 22 — Python & data / APIs & models
Status: completed
Dependencies: 21
Topics:
- `s9-g0-t0` — Python Fundamentals
- `s9-g0-t1` — Python for Network Engineers
- `s9-g0-t2` — Data types
- `s9-g0-t3` — Loops
- `s9-g0-t4` — Functions
- `s9-g0-t5` — Files
- `s9-g0-t6` — JSON
- `s9-g0-t7` — YAML
- `s9-g0-t8` — Regex
- `s9-g1-t0` — APIs
- `s9-g1-t1` — REST APIs
- `s9-g1-t2` — HTTP methods
- `s9-g1-t3` — Authentication
- `s9-g1-t4` — Cisco APIs
- `s9-g1-t5` — NETCONF
- `s9-g1-t6` — RESTCONF
- `s9-g1-t7` — YANG
- `s9-g1-t8` — SNMP automation
- `s9-g1-t9` — SSH automation
Planned visuals: Four-step mechanism, concept comparison, incident rehearsal and one scoped companion model per topic.
Planned labs: Read-only authored evidence inspector; integrated local validation/render/change/rollback lab and guided enterprise architecture extension.
Planned interactions: 19 incident panels; 190 exams and 57 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 23 — Python libraries / Ansible & templates / Version control & IaC / Documentation & source of truth
Status: completed
Dependencies: 22
Topics:
- `s9-g2-t0` — Netmiko
- `s9-g2-t1` — Paramiko
- `s9-g2-t2` — NAPALM
- `s9-g2-t3` — Requests
- `s9-g3-t0` — Ansible
- `s9-g3-t1` — Ansible Inventory
- `s9-g3-t2` — Ansible Playbooks
- `s9-g3-t3` — Cisco Ansible modules
- `s9-g3-t4` — Templates
- `s9-g3-t5` — Jinja2
- `s9-g4-t0` — Git
- `s9-g4-t1` — GitHub / GitLab
- `s9-g4-t2` — Version control
- `s9-g4-t3` — Infrastructure as Code
- `s9-g4-t4` — Terraform fundamentals
- `s9-g5-t0` — Infrastructure documentation
- `s9-g5-t1` — Network diagrams
- `s9-g5-t2` — IP Address Management
- `s9-g5-t3` — NetBox
- `s9-g5-t4` — Configuration management
- `s9-g5-t5` — Source of truth
- `s9-g5-t6` — CI/CD concepts
Planned visuals: Four-step mechanism, concept comparison, incident rehearsal and one scoped companion model per topic.
Planned labs: Read-only authored evidence inspector; integrated local validation/render/change/rollback lab and guided enterprise architecture extension.
Planned interactions: 22 incident panels; 220 exams and 66 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 24 — Resilience architecture / Infrastructure planes / Observability & lifecycle
Status: completed
Dependencies: 23
Topics:
- `s9-g6-t0` — High Availability
- `s9-g6-t1` — Disaster Recovery
- `s9-g6-t2` — Business Continuity
- `s9-g6-t3` — RTO
- `s9-g6-t4` — RPO
- `s9-g6-t5` — Redundant Data Centers
- `s9-g6-t6` — Active/Active
- `s9-g6-t7` — Active/Passive
- `s9-g6-t8` — Load Balancing
- `s9-g7-t0` — Network segmentation
- `s9-g7-t1` — Management Plane
- `s9-g7-t2` — Control Plane
- `s9-g7-t3` — Data Plane
- `s9-g8-t0` — Observability
- `s9-g8-t1` — Monitoring
- `s9-g8-t2` — Logging
- `s9-g8-t3` — Metrics
- `s9-g8-t4` — Tracing
- `s9-g8-t5` — Capacity Planning
- `s9-g8-t6` — Infrastructure Lifecycle Management
- `lab-9` — Architecture design rehearsal
Planned visuals: Four-step mechanism, concept comparison, incident rehearsal and one scoped companion model per topic.
Planned labs: Read-only authored evidence inspector; integrated local validation/render/change/rollback lab and guided enterprise architecture extension.
Planned interactions: 21 incident panels; 210 exams and 63 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 25 — Cisco Device Mastery
Status: completed
Dependencies: 24
Topics:
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
Planned visuals: 17 four-step mechanisms, component comparisons and incident worksheets.
Planned labs: 17 authored fault/recovery cases with guided target extensions and a local three-valued evidence worksheet.
Planned interactions: 17 keyboard-operable incident panels; 170 original exams and 51 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 26 — Physical Hardware
Status: completed
Dependencies: 25
Topics:
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
Planned visuals: Twenty incident-specific four-step flows and reused scoped foundation worksheets.
Planned labs: Twenty dedicated guided tabletop incidents with downloadable evidence workbook; no physical execution claimed.
Planned interactions: stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 27 — Troubleshooting Mastery
Status: completed
Dependencies: 26
Topics:
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
Planned visuals: 21 diagnostic flows, comparison tables and staged incident desks with static evidence alternatives.
Planned labs: 21 synthetic incident workbooks; one executable isolated local-file fault/recovery rehearsal. Vendor and physical operations are guided only.
Planned interactions: 21 baseline/fault/recovery desks, 210 self-assessed exams and 63 quick checks.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 28 — Enterprise architecture capstone
Status: completed
Dependencies: 27
Topics:
- `capstone-final` — Enterprise Data Center Architecture Capstone
Planned visuals: Four-step mechanism/static equivalent, distinct attachment map and four incident cases with capacity/recovery worksheet.
Planned labs: Owned SQLite corruption/restore with acknowledged-data loss and verified cleanup; all 15 design deliverables and guided target extensions.
Planned interactions: stepper with static explanation; quick checks and separate 10-question exam per substantial topic; collapsible advanced material.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 29 — Infrastructure concepts and service objectives
Status: completed
Dependencies: 28
Topics:
- `ADD-INFRA-001` — Infrastructure and service dependency maps
- `ADD-INFRA-002` — Availability, reliability and service objectives
- `ADD-INFRA-003` — Change control, incidents and evidence
Planned visuals: Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.
Planned labs: Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.
Planned interactions: Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 30 — Linux administration depth
Status: completed
Dependencies: 29
Topics:
- `ADD-LINUX-001` — Linux files, identities, permissions and packages
- `ADD-LINUX-002` — Processes, systemd, journals and scheduling
- `ADD-LINUX-003` — Mounts, LVM, pressure and service recovery
Planned visuals: Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.
Planned labs: Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.
Planned interactions: Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 31 — Application delivery, TLS and reverse proxies
Status: completed
Dependencies: 30
Topics:
- `ADD-APP-001` — HTTP request lifecycle and reverse proxies
- `ADD-APP-002` — TLS trust, certificate renewal and Nginx changes
- `ADD-APP-003` — Load balancing, health checks and connection pools
Planned visuals: Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.
Planned labs: Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.
Planned interactions: Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 32 — Container and Kubernetes operations
Status: completed
Dependencies: 31
Topics:
- `ADD-CONT-001` — Container isolation, images and Docker Compose
- `ADD-CONT-002` — Kubernetes scheduling, networking, storage and RBAC
- `ADD-CONT-003` — Kubernetes deployment, debugging, backup and upgrades
Planned visuals: Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.
Planned labs: Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.
Planned interactions: Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Batch 33 — Cloud architecture and cost controls
Status: completed
Dependencies: 32
Topics:
- `ADD-CLOUD-001` — Cloud responsibility, IAM and networking
- `ADD-CLOUD-002` — Cloud compute, storage and availability zones
- `ADD-CLOUD-003` — Cloud budgets, tagging, IaC and recovery
Planned visuals: Four-step visual/static mechanism, concept comparison and three-phase incident evidence desk per lesson.
Planned labs: Scoped local companion plus lesson-specific investigation and guided target extension; see batch validation.
Planned interactions: Three evidence desks, 30 original written exams and nine quick checks; keyboard controls and static equivalents.
Acceptance: user Topic and Batch Definition of Done; validated sources, links, diagrams, responsive layouts, no console errors, honest editorial status.

## Supporting material
All 84 original supporting items have individual editorial reviews in content/supporting-review.json and supporting.html; the immutable inventory remains a historical snapshot.

# Next Work
All 33 planned batches are accepted. No planned lesson remains unfinished. Maintain source/version currency and retain the documented execution limits.
