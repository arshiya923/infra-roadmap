# Cisco Data Center source and scope review — 2026-10-09

The primary assistant checked Cisco and RFC material before writing Batches 17–18. The lesson sources carry their exact URLs and release scopes. NX-OS 10.5(x) and ACI 6.0(x) are teaching references, not claims that every Nexus supports those releases or features. Nexus 3000/5500/7000 and FabricPath material is explicitly historical. No lifecycle recommendation or certification alignment is asserted.

## Evidence boundaries applied

- Cisco vPC 10.5(x): distinguish peer-link coordination/data from keepalive liveness. The browser covers only a consistent, powered two-peer steady state. Both paths down returns indeterminate; event order, reloads, auto-recovery and orphan policy are excluded. A member-port result is never applied to every orphan.
- RFC 7348: the calculator compares outer IP length with IP MTU. Inner Ethernet is included, original FCS and outer Ethernet are excluded. An optional retained inner tag is an explicit input. Encapsulation does not imply confidentiality, support for every possible VNI, or measured path MTU.
- RFC 7432 and NX-OS EVPN guidance: RD uniqueness differs from RT import. A received or imported route is not proof of hardware installation or delivery. RFC 7432's baseline is MPLS; NX-OS VXLAN guidance supplies the deployment context.
- Cisco FEX matrix and [FEX architecture overview](https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus2000/sw/configuration/guide/b_Configuring_the_Cisco_Nexus_2000_Series_Fabric_Extender_rel_8_x/b_Configuring_the_Cisco_Nexus_2000_Series_Fabric_Extender_rel_6_0_chapter_01.html): exact compatibility is distinct from the conventional remote-line-card architecture. Introductory FEX and replacement operations have different outcomes and retain both original IDs.
- ACI fundamentals, bridging and design references: APIC is a policy/controller dependency, not a per-packet transit hop. EPG classification, BD forwarding and contracts are separate concepts. The exercise deliberately excludes policy exceptions and does not model controller failure as immediately deleting already deployed forwarding policy.

## Access record

The direct Python HTTP checker successfully retrieved the two RFCs but Cisco returned HTTP 403. Those results remain unchanged in `cisco-dc-source-checks.json`; they are not labelled successful HTTP checks. The same Cisco pages were read through the web tool: vPC, VXLAN/EVPN, FEX matrix/architecture, the historical 3000 switching-mode guide, 5500 overview, 7000 VDC overview, FabricPath interfaces, 9000 upgrade PDF, ACI forwarding, bridge domains and design guide. This distinction records an access-method limitation rather than hiding a failed check.

All commands are classified in the lessons as guided, release-scoped observations. No Cisco device, APIC cluster, physical forwarding, FEX replacement, FCoE session or mode conversion was executed. Pure functions, browser interactions and the later integrated offline artifact have separate local test evidence.

Additional APIC role reference: [Cisco fabric overview](https://sandboxapicdc.cisco.com/help/content/c_aci-fabric-overview.html) explicitly distinguishes management functions from the data path. The lesson only claims that losing controller reachability does not by itself prove immediate loss of all existing forwarding; it makes no cluster-quorum or remote-leaf failure prediction.
