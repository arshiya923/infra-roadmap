# Batch 03 primary-source ledger

Checked: 4 October 2026. References were read through the browser research tool; this file records source scope and curriculum corrections, not a copy of the references. All questions and scenarios are original.

## Editorial decisions

- Use RFC 894 for IPv4-over-Ethernet framing, with its errata: the historical “minimum” 1500 wording is not repeated as a current minimum. The course distinguishes IP MTU, MAC-frame size, FCS-stripped capture length and wire-time overhead. [RFC 894 errata](https://www.rfc-editor.org/errata/rfc894).
- RFC 791 is the foundational IPv4 specification; IPv6 forwarding/fragmentation is checked against RFC 8200 and PMTU against RFC 8201. Do not transplant IPv4 router fragmentation into IPv6.
- RFC 1191/4821 provide classical and packetization-layer size-discovery context. The illustrative 60-byte tunnel overhead is an explicit synthetic input, not a claim about every VPN.
- The Cisco duplex guide supplies a legacy 10/100 parallel-detection example, not universal advice to force modern interfaces. PHY- and platform-specific behavior must be verified before configuration.
- Cisco WLAN overview pages contain older security wording. This course does not recommend WEP or MAC filtering as strong authentication. The high-density design guide is used for durable airtime/coverage principles, not its old hardware prescriptions.
- Capacity, throughput, useful data and delay use separate units and measurement boundaries. RFC 6349 is a testing framework, not a promise that BDP alone determines application speed.
- Route lookup is local computation. Loopback probes test only the local stack. WSL adapter observations are labelled virtual; no network path is claimed from these commands.

## References

| Primary reference | Used in |
|---|---|
| [Cisco: local area networks](https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-lan-local-area-network.html) | LAN |
| [RFC 826: address resolution](https://www.rfc-editor.org/rfc/rfc826) | LAN, MAC addresses |
| [iproute2: ip link manual](https://man7.org/linux/man-pages/man8/ip-link.8.html) | LAN, WAN, WLAN, Ethernet, Frames, MTU, Bandwidth, Duplex |
| [iproute2: ip route manual](https://man7.org/linux/man-pages/man8/ip-route.8.html) | LAN, WAN, Packets |
| [iproute2: ip neighbour manual](https://man7.org/linux/man-pages/man8/ip-neighbour.8.html) | LAN, MAC addresses |
| [RFC 6349: TCP throughput testing framework](https://www.rfc-editor.org/rfc/rfc6349) | WAN, Bandwidth, Latency |
| [RFC 1191: IPv4 Path MTU Discovery](https://www.rfc-editor.org/rfc/rfc1191) | WAN, MTU |
| [Cisco: wide area networks](https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-wan-wide-area-network.html) | WAN |
| [Cisco: wireless LANs](https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-wireless-lan.html) | WLAN |
| [Cisco: high-density wireless design (principles; older platform examples)](https://www.cisco.com/c/en/us/td/docs/wireless/controller/technotes/8-7/b_wireless_high_client_density_design_guide.html) | WLAN |
| [Microsoft: netsh wlan inspection commands](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-wlan) | WLAN |
| [RFC 894: IPv4 over Ethernet (historical standard; see errata)](https://www.rfc-editor.org/rfc/rfc894) | Ethernet, Frames |
| [Cisco: Ethernet negotiation and legacy duplex mismatch](https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html) | Ethernet, Duplex |
| [ethtool manual](https://man7.org/linux/man-pages/man8/ethtool.8.html) | Ethernet, Frames, Duplex |
| [RFC 7042: IEEE 802 identifiers and documentation usage](https://www.rfc-editor.org/rfc/rfc7042) | Ethernet, MAC addresses, Frames |
| [Microsoft: Get-NetAdapter](https://learn.microsoft.com/en-us/powershell/module/netadapter/get-netadapter?view=windowsserver2025-ps) | MAC addresses, Bandwidth |
| [RFC 791: IPv4](https://www.rfc-editor.org/rfc/rfc791) | Packets |
| [RFC 8200: IPv6](https://www.rfc-editor.org/rfc/rfc8200) | Packets, MTU |
| [iputils: ping manual](https://man7.org/linux/man-pages/man8/ping.8.html) | Packets, MTU, Latency |
| [RFC 9293: TCP](https://www.rfc-editor.org/rfc/rfc9293) | Packets |
| [RFC 768: UDP](https://www.rfc-editor.org/rfc/rfc768) | Packets |
| [RFC 4821: packetization-layer PMTU discovery](https://www.rfc-editor.org/rfc/rfc4821) | MTU |
| [RFC 8201: IPv6 Path MTU Discovery](https://www.rfc-editor.org/rfc/rfc8201) | MTU |
| [RFC 5136: network capacity definitions](https://www.rfc-editor.org/rfc/rfc5136) | Bandwidth |
| [RFC 2681: round-trip delay metric](https://www.rfc-editor.org/rfc/rfc2681) | Latency |

## Evidence gaps

No physical switch/router/AP test environment was supplied. All live inspection remained read-only, with bounded local ICMP. Hardware, RF, WAN, tunnel and policy change acceptance must be done in a later authorized lab environment; synthetic classroom scenarios are not claimed as executed infrastructure changes.
