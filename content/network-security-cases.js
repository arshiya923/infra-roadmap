'use strict';
window.NETWORK_SECURITY_CASES=[
  {
    "key": "fundamentals",
    "title": "Security Fundamentals",
    "kind": "risk",
    "fields": [
      [
        "disclosed",
        "Unauthorized disclosure declared",
        "bool",
        false
      ],
      [
        "altered",
        "Unauthorized alteration declared",
        "bool",
        false
      ],
      [
        "unavailable",
        "Required operation unavailable",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "disclosed": false,
          "altered": true,
          "unavailable": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "disclosed": true,
          "altered": false,
          "unavailable": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      }
    ],
    "scope": "Independent declared CIA consequences, without risk scoring or likelihood estimation."
  },
  {
    "key": "cia",
    "title": "CIA Triad",
    "kind": "risk",
    "fields": [
      [
        "disclosed",
        "Unauthorized disclosure declared",
        "bool",
        false
      ],
      [
        "altered",
        "Unauthorized alteration declared",
        "bool",
        false
      ],
      [
        "unavailable",
        "Required operation unavailable",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "disclosed": false,
          "altered": true,
          "unavailable": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "disclosed": true,
          "altered": false,
          "unavailable": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      }
    ],
    "scope": "Independent declared CIA consequences, without risk scoring or likelihood estimation."
  },
  {
    "key": "surfaces",
    "title": "Attack surfaces",
    "kind": "risk",
    "fields": [
      [
        "disclosed",
        "Unauthorized disclosure declared",
        "bool",
        false
      ],
      [
        "altered",
        "Unauthorized alteration declared",
        "bool",
        false
      ],
      [
        "unavailable",
        "Required operation unavailable",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "disclosed": false,
          "altered": true,
          "unavailable": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "disclosed": true,
          "altered": false,
          "unavailable": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      }
    ],
    "scope": "Independent declared CIA consequences, without risk scoring or likelihood estimation."
  },
  {
    "key": "segmentation",
    "title": "Segmentation",
    "kind": "acl",
    "fields": [
      [
        "source",
        "Packet source IPv4",
        "text",
        "192.0.2.8"
      ],
      [
        "destination",
        "Packet destination IPv4",
        "text",
        "198.51.100.10"
      ],
      [
        "protocol",
        "Packet protocol",
        "select",
        [
          "tcp",
          "udp",
          "icmp"
        ]
      ],
      [
        "port",
        "Destination port (ignored for ICMP)",
        "number",
        443
      ],
      [
        "wildcard",
        "Permitted source wildcard",
        "text",
        "0.0.0.255"
      ],
      [
        "denyFirst",
        "Place broad deny before permit",
        "bool",
        false
      ],
      [
        "explicitDeny",
        "Include explicit deny-any after permit",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": true,
          "explicitDeny": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "udp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      }
    ],
    "scope": "Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking."
  },
  {
    "key": "depth",
    "title": "Defense in depth",
    "kind": "risk",
    "fields": [
      [
        "disclosed",
        "Unauthorized disclosure declared",
        "bool",
        false
      ],
      [
        "altered",
        "Unauthorized alteration declared",
        "bool",
        false
      ],
      [
        "unavailable",
        "Required operation unavailable",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "disclosed": false,
          "altered": true,
          "unavailable": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "disclosed": true,
          "altered": false,
          "unavailable": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "disclosed": false,
          "altered": false,
          "unavailable": false
        }
      }
    ],
    "scope": "Independent declared CIA consequences, without risk scoring or likelihood estimation."
  },
  {
    "key": "acl",
    "title": "ACL",
    "kind": "acl",
    "fields": [
      [
        "source",
        "Packet source IPv4",
        "text",
        "192.0.2.8"
      ],
      [
        "destination",
        "Packet destination IPv4",
        "text",
        "198.51.100.10"
      ],
      [
        "protocol",
        "Packet protocol",
        "select",
        [
          "tcp",
          "udp",
          "icmp"
        ]
      ],
      [
        "port",
        "Destination port (ignored for ICMP)",
        "number",
        443
      ],
      [
        "wildcard",
        "Permitted source wildcard",
        "text",
        "0.0.0.255"
      ],
      [
        "denyFirst",
        "Place broad deny before permit",
        "bool",
        false
      ],
      [
        "explicitDeny",
        "Include explicit deny-any after permit",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": true,
          "explicitDeny": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "udp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      }
    ],
    "scope": "Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking."
  },
  {
    "key": "standard-acl",
    "title": "Standard ACL",
    "kind": "acl-standard",
    "fields": [
      [
        "source",
        "Packet source IPv4",
        "text",
        "192.0.2.8"
      ],
      [
        "destination",
        "Context destination IPv4 (ignored)",
        "text",
        "198.51.100.10"
      ],
      [
        "protocol",
        "Context protocol (ignored)",
        "select",
        [
          "tcp",
          "udp",
          "icmp"
        ]
      ],
      [
        "port",
        "Context destination port (ignored)",
        "number",
        443
      ],
      [
        "wildcard",
        "Permitted source wildcard",
        "text",
        "0.0.0.255"
      ],
      [
        "denyFirst",
        "Place broad deny before permit",
        "bool",
        false
      ],
      [
        "explicitDeny",
        "Include explicit deny-any after permit",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "203.0.113.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 22,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      }
    ],
    "scope": "Attached nonempty source-only IPv4 list; destination/protocol/port are context, not matched."
  },
  {
    "key": "extended-acl",
    "title": "Extended ACL",
    "kind": "acl",
    "fields": [
      [
        "source",
        "Packet source IPv4",
        "text",
        "192.0.2.8"
      ],
      [
        "destination",
        "Packet destination IPv4",
        "text",
        "198.51.100.10"
      ],
      [
        "protocol",
        "Packet protocol",
        "select",
        [
          "tcp",
          "udp",
          "icmp"
        ]
      ],
      [
        "port",
        "Destination port (ignored for ICMP)",
        "number",
        443
      ],
      [
        "wildcard",
        "Permitted source wildcard",
        "text",
        "0.0.0.255"
      ],
      [
        "denyFirst",
        "Place broad deny before permit",
        "bool",
        false
      ],
      [
        "explicitDeny",
        "Include explicit deny-any after permit",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": true,
          "explicitDeny": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "udp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      }
    ],
    "scope": "Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking."
  },
  {
    "key": "named-acl",
    "title": "Named ACL",
    "kind": "acl",
    "fields": [
      [
        "source",
        "Packet source IPv4",
        "text",
        "192.0.2.8"
      ],
      [
        "destination",
        "Packet destination IPv4",
        "text",
        "198.51.100.10"
      ],
      [
        "protocol",
        "Packet protocol",
        "select",
        [
          "tcp",
          "udp",
          "icmp"
        ]
      ],
      [
        "port",
        "Destination port (ignored for ICMP)",
        "number",
        443
      ],
      [
        "wildcard",
        "Permitted source wildcard",
        "text",
        "0.0.0.255"
      ],
      [
        "denyFirst",
        "Place broad deny before permit",
        "bool",
        false
      ],
      [
        "explicitDeny",
        "Include explicit deny-any after permit",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": true,
          "explicitDeny": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "udp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "192.0.2.8",
          "destination": "198.51.100.10",
          "protocol": "tcp",
          "port": 443,
          "wildcard": "0.0.0.255",
          "denyFirst": false,
          "explicitDeny": true
        }
      }
    ],
    "scope": "Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking."
  },
  {
    "key": "dai",
    "title": "Dynamic ARP Inspection",
    "kind": "binding",
    "fields": [
      [
        "trusted",
        "Ingress trusted (DAI bypass)",
        "bool",
        false
      ],
      [
        "present",
        "Accepted binding supplied",
        "bool",
        true
      ],
      [
        "ip",
        "Sender IP agrees",
        "bool",
        true
      ],
      [
        "mac",
        "Sender MAC agrees",
        "bool",
        true
      ],
      [
        "vlan",
        "VLAN agrees",
        "bool",
        true
      ],
      [
        "attachment",
        "Binding attachment agrees",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "trusted": false,
          "present": true,
          "ip": true,
          "mac": true,
          "vlan": true,
          "attachment": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "trusted": false,
          "present": true,
          "ip": true,
          "mac": false,
          "vlan": true,
          "attachment": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "trusted": true,
          "present": true,
          "ip": true,
          "mac": false,
          "vlan": true,
          "attachment": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "trusted": false,
          "present": true,
          "ip": true,
          "mac": true,
          "vlan": true,
          "attachment": true
        }
      }
    ],
    "scope": "One declared ARP sender binding and ingress trust, without static ARP ACL precedence, optional validation or rate limits."
  },
  {
    "key": "snooping",
    "title": "DHCP Snooping",
    "kind": "snooping",
    "fields": [
      [
        "enabled",
        "Snooping enabled for declared VLAN",
        "bool",
        true
      ],
      [
        "server",
        "Message is server-to-client",
        "bool",
        true
      ],
      [
        "trusted",
        "Ingress is intended trusted server path",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "enabled": true,
          "server": true,
          "trusted": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "enabled": true,
          "server": true,
          "trusted": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "enabled": true,
          "server": false,
          "trusted": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "enabled": true,
          "server": true,
          "trusted": true
        }
      }
    ],
    "scope": "Declared message direction, VLAN enablement and ingress trust only; no DHCP parser or lease allocation."
  },
  {
    "key": "ipsg",
    "title": "IP Source Guard",
    "kind": "binding-ip",
    "fields": [
      [
        "present",
        "Accepted source binding supplied",
        "bool",
        true
      ],
      [
        "ip",
        "Source IP agrees",
        "bool",
        true
      ],
      [
        "mac",
        "Source MAC agrees",
        "bool",
        true
      ],
      [
        "vlan",
        "VLAN agrees",
        "bool",
        true
      ],
      [
        "attachment",
        "Ingress attachment agrees",
        "bool",
        true
      ],
      [
        "mode",
        "Source-guard mode",
        "select",
        [
          "ip-and-mac",
          "ip-only"
        ]
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "present": true,
          "ip": true,
          "mac": true,
          "vlan": true,
          "attachment": true,
          "mode": "ip-and-mac"
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "present": true,
          "ip": true,
          "mac": true,
          "vlan": false,
          "attachment": true,
          "mode": "ip-and-mac"
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "present": true,
          "ip": true,
          "mac": false,
          "vlan": true,
          "attachment": true,
          "mode": "ip-only"
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "present": true,
          "ip": true,
          "mac": true,
          "vlan": true,
          "attachment": true,
          "mode": "ip-and-mac"
        }
      }
    ],
    "scope": "One supplied source binding and IP-only/IP-and-MAC mode; no actual device tracking or hardware filtering."
  },
  {
    "key": "pvlan",
    "title": "Private VLAN",
    "kind": "pvlan",
    "fields": [
      [
        "from",
        "Source role",
        "select",
        [
          "isolated",
          "community",
          "promiscuous"
        ]
      ],
      [
        "to",
        "Destination role (distinct endpoint)",
        "select",
        [
          "promiscuous",
          "community",
          "isolated"
        ]
      ],
      [
        "fromCommunity",
        "Source community ID",
        "number",
        10
      ],
      [
        "toCommunity",
        "Destination community ID",
        "number",
        10
      ],
      [
        "mapped",
        "Relevant PVLAN associations/mapping supplied",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "from": "isolated",
          "to": "promiscuous",
          "fromCommunity": 10,
          "toCommunity": 10,
          "mapped": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "from": "isolated",
          "to": "promiscuous",
          "fromCommunity": 10,
          "toCommunity": 10,
          "mapped": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "from": "community",
          "to": "community",
          "fromCommunity": 10,
          "toCommunity": 11,
          "mapped": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "from": "isolated",
          "to": "promiscuous",
          "fromCommunity": 10,
          "toCommunity": 10,
          "mapped": true
        }
      }
    ],
    "scope": "Declared mapped PVLAN roles for distinct endpoint attachments; no routing or MAC-learning simulation."
  },
  {
    "key": "dot1x",
    "title": "802.1X",
    "kind": "identity",
    "fields": [
      [
        "auth",
        "Central identity result",
        "select",
        [
          "accept",
          "reject",
          "unavailable"
        ]
      ],
      [
        "fallback",
        "Unavailable-only local fallback configured",
        "bool",
        false
      ],
      [
        "local",
        "Local identity accepted",
        "bool",
        true
      ],
      [
        "role",
        "Requested operation authorized",
        "bool",
        true
      ],
      [
        "attached",
        "Authorization consumed at attachment",
        "bool",
        true
      ],
      [
        "accounted",
        "Accounting record retained",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": false,
          "accounted": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "auth": "unavailable",
          "fallback": true,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      }
    ],
    "scope": "Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution."
  },
  {
    "key": "aaa",
    "title": "AAA",
    "kind": "identity",
    "fields": [
      [
        "auth",
        "Central identity result",
        "select",
        [
          "accept",
          "reject",
          "unavailable"
        ]
      ],
      [
        "fallback",
        "Unavailable-only local fallback configured",
        "bool",
        false
      ],
      [
        "local",
        "Local identity accepted",
        "bool",
        true
      ],
      [
        "role",
        "Requested operation authorized",
        "bool",
        true
      ],
      [
        "attached",
        "Authorization consumed at attachment",
        "bool",
        true
      ],
      [
        "accounted",
        "Accounting record retained",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": false,
          "accounted": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "auth": "unavailable",
          "fallback": true,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "auth": "accept",
          "fallback": false,
          "local": true,
          "role": true,
          "attached": true,
          "accounted": true
        }
      }
    ],
    "scope": "Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution."
  },
  {
    "key": "port-security",
    "title": "Port Security",
    "kind": "port",
    "fields": [
      [
        "maximum",
        "Secure address maximum",
        "number",
        1
      ],
      [
        "count",
        "Existing secure-address count",
        "number",
        1
      ],
      [
        "accepted",
        "Observed source already accepted",
        "bool",
        true
      ],
      [
        "mode",
        "Violation mode",
        "select",
        [
          "protect",
          "restrict",
          "shutdown"
        ]
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "maximum": 1,
          "count": 1,
          "accepted": true,
          "mode": "protect"
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "maximum": 1,
          "count": 1,
          "accepted": false,
          "mode": "protect"
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "maximum": 1,
          "count": 1,
          "accepted": false,
          "mode": "shutdown"
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "maximum": 1,
          "count": 1,
          "accepted": true,
          "mode": "protect"
        }
      }
    ],
    "scope": "One accepted-address/count/mode boundary; no frame learning or actual switch state change."
  },
  {
    "key": "control-plane",
    "title": "Control Plane Protection",
    "kind": "copp",
    "fields": [
      [
        "pps",
        "Declared offered packets/s",
        "number",
        100
      ],
      [
        "bytes",
        "Accounted bytes/packet (no wire overhead)",
        "number",
        100
      ],
      [
        "rate",
        "Nominal class rate",
        "number",
        100000
      ],
      [
        "unit",
        "Rate unit",
        "select",
        [
          "bit/s",
          "pps"
        ]
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "pps": 1000,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100,
          "unit": "pps"
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      }
    ],
    "scope": "Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation."
  },
  {
    "key": "copp",
    "title": "CoPP",
    "kind": "copp",
    "fields": [
      [
        "pps",
        "Declared offered packets/s",
        "number",
        100
      ],
      [
        "bytes",
        "Accounted bytes/packet (no wire overhead)",
        "number",
        100
      ],
      [
        "rate",
        "Nominal class rate",
        "number",
        100000
      ],
      [
        "unit",
        "Rate unit",
        "select",
        [
          "bit/s",
          "pps"
        ]
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "pps": 1000,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100,
          "unit": "pps"
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "pps": 100,
          "bytes": 100,
          "rate": 100000,
          "unit": "bit/s"
        }
      }
    ],
    "scope": "Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation."
  },
  {
    "key": "vpn",
    "title": "VPN concepts",
    "kind": "vpn",
    "fields": [
      [
        "underlay",
        "Peer underlay reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Peer identity authenticated",
        "bool",
        true
      ],
      [
        "child",
        "Matching child SA/selectors supplied",
        "bool",
        true
      ],
      [
        "route",
        "Protected source route selects intended path",
        "bool",
        true
      ],
      [
        "return",
        "Protected return route/policy ready",
        "bool",
        true
      ],
      [
        "authorized",
        "Requested application operation allowed",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "underlay": true,
          "identity": true,
          "child": false,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      }
    ],
    "scope": "Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic."
  },
  {
    "key": "ipsec",
    "title": "IPsec",
    "kind": "vpn",
    "fields": [
      [
        "underlay",
        "Peer underlay reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Peer identity authenticated",
        "bool",
        true
      ],
      [
        "child",
        "Matching child SA/selectors supplied",
        "bool",
        true
      ],
      [
        "route",
        "Protected source route selects intended path",
        "bool",
        true
      ],
      [
        "return",
        "Protected return route/policy ready",
        "bool",
        true
      ],
      [
        "authorized",
        "Requested application operation allowed",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "underlay": true,
          "identity": true,
          "child": false,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      }
    ],
    "scope": "Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic."
  },
  {
    "key": "ike",
    "title": "IKE",
    "kind": "vpn",
    "fields": [
      [
        "underlay",
        "Peer underlay reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Peer identity authenticated",
        "bool",
        true
      ],
      [
        "child",
        "Matching child SA/selectors supplied",
        "bool",
        true
      ],
      [
        "route",
        "Protected source route selects intended path",
        "bool",
        true
      ],
      [
        "return",
        "Protected return route/policy ready",
        "bool",
        true
      ],
      [
        "authorized",
        "Requested application operation allowed",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "underlay": true,
          "identity": true,
          "child": false,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      }
    ],
    "scope": "Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic."
  },
  {
    "key": "site-vpn",
    "title": "Site-to-Site VPN",
    "kind": "vpn",
    "fields": [
      [
        "underlay",
        "Peer underlay reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Peer identity authenticated",
        "bool",
        true
      ],
      [
        "child",
        "Matching child SA/selectors supplied",
        "bool",
        true
      ],
      [
        "route",
        "Protected source route selects intended path",
        "bool",
        true
      ],
      [
        "return",
        "Protected return route/policy ready",
        "bool",
        true
      ],
      [
        "authorized",
        "Requested application operation allowed",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "underlay": true,
          "identity": true,
          "child": false,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      }
    ],
    "scope": "Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic."
  },
  {
    "key": "remote-vpn",
    "title": "Remote Access VPN",
    "kind": "vpn",
    "fields": [
      [
        "underlay",
        "Peer underlay reachable",
        "bool",
        true
      ],
      [
        "identity",
        "Peer identity authenticated",
        "bool",
        true
      ],
      [
        "child",
        "Matching child SA/selectors supplied",
        "bool",
        true
      ],
      [
        "route",
        "Protected source route selects intended path",
        "bool",
        true
      ],
      [
        "return",
        "Protected return route/policy ready",
        "bool",
        true
      ],
      [
        "authorized",
        "Requested application operation allowed",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "underlay": true,
          "identity": true,
          "child": false,
          "route": true,
          "return": true,
          "authorized": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "underlay": true,
          "identity": true,
          "child": true,
          "route": true,
          "return": true,
          "authorized": true
        }
      }
    ],
    "scope": "Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic."
  },
  {
    "key": "firewall",
    "title": "Firewall fundamentals",
    "kind": "firewall",
    "fields": [
      [
        "action",
        "Forward policy action",
        "select",
        [
          "inspect",
          "pass",
          "drop"
        ]
      ],
      [
        "direction",
        "Packet role",
        "select",
        [
          "initiation",
          "response"
        ]
      ],
      [
        "forward",
        "Forward initiation admitted",
        "bool",
        true
      ],
      [
        "state",
        "Matching established state valid",
        "bool",
        true
      ],
      [
        "reverse",
        "Separate reverse-direction permit",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "action": "drop",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "action": "pass",
          "direction": "response",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      }
    ],
    "scope": "Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation."
  },
  {
    "key": "zbf",
    "title": "Zone Based Firewall",
    "kind": "firewall",
    "fields": [
      [
        "action",
        "Forward policy action",
        "select",
        [
          "inspect",
          "pass",
          "drop"
        ]
      ],
      [
        "direction",
        "Packet role",
        "select",
        [
          "initiation",
          "response"
        ]
      ],
      [
        "forward",
        "Forward initiation admitted",
        "bool",
        true
      ],
      [
        "state",
        "Matching established state valid",
        "bool",
        true
      ],
      [
        "reverse",
        "Separate reverse-direction permit",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "action": "drop",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "action": "pass",
          "direction": "response",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      }
    ],
    "scope": "Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation."
  },
  {
    "key": "asa",
    "title": "Cisco ASA fundamentals",
    "kind": "firewall",
    "fields": [
      [
        "action",
        "Forward policy action",
        "select",
        [
          "inspect",
          "pass",
          "drop"
        ]
      ],
      [
        "direction",
        "Packet role",
        "select",
        [
          "initiation",
          "response"
        ]
      ],
      [
        "forward",
        "Forward initiation admitted",
        "bool",
        true
      ],
      [
        "state",
        "Matching established state valid",
        "bool",
        true
      ],
      [
        "reverse",
        "Separate reverse-direction permit",
        "bool",
        false
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "action": "drop",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "action": "pass",
          "direction": "response",
          "forward": true,
          "state": true,
          "reverse": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "action": "inspect",
          "direction": "initiation",
          "forward": true,
          "state": true,
          "reverse": false
        }
      }
    ],
    "scope": "Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation."
  },
  {
    "key": "firepower",
    "title": "Cisco Firepower concepts",
    "kind": "detector",
    "fields": [
      [
        "mode",
        "Inspection role",
        "select",
        [
          "IDS",
          "IPS",
          "WAF"
        ]
      ],
      [
        "visible",
        "Required content visible to this control",
        "bool",
        true
      ],
      [
        "match",
        "Supplied signature/rule match",
        "bool",
        false
      ],
      [
        "blocking",
        "Blocking enforcement enabled",
        "bool",
        true
      ],
      [
        "application",
        "Application authorization independently valid",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "mode": "IPS",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "mode": "IPS",
          "visible": true,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "mode": "IPS",
          "visible": false,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "mode": "IPS",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      }
    ],
    "scope": "Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF."
  },
  {
    "key": "ids-ips",
    "title": "IDS / IPS",
    "kind": "detector",
    "fields": [
      [
        "mode",
        "Inspection role",
        "select",
        [
          "IDS",
          "IPS",
          "WAF"
        ]
      ],
      [
        "visible",
        "Required content visible to this control",
        "bool",
        true
      ],
      [
        "match",
        "Supplied signature/rule match",
        "bool",
        false
      ],
      [
        "blocking",
        "Blocking enforcement enabled",
        "bool",
        true
      ],
      [
        "application",
        "Application authorization independently valid",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "mode": "IDS",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "mode": "IDS",
          "visible": true,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "mode": "IDS",
          "visible": false,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "mode": "IDS",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      }
    ],
    "scope": "Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF."
  },
  {
    "key": "waf",
    "title": "WAF concepts",
    "kind": "detector",
    "fields": [
      [
        "mode",
        "Inspection role",
        "select",
        [
          "IDS",
          "IPS",
          "WAF"
        ]
      ],
      [
        "visible",
        "Required content visible to this control",
        "bool",
        true
      ],
      [
        "match",
        "Supplied signature/rule match",
        "bool",
        false
      ],
      [
        "blocking",
        "Blocking enforcement enabled",
        "bool",
        true
      ],
      [
        "application",
        "Application authorization independently valid",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "mode": "WAF",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "mode": "WAF",
          "visible": true,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "mode": "WAF",
          "visible": false,
          "match": true,
          "blocking": true,
          "application": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "mode": "WAF",
          "visible": true,
          "match": false,
          "blocking": true,
          "application": true
        }
      }
    ],
    "scope": "Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF."
  },
  {
    "key": "zero-trust",
    "title": "Zero Trust overview",
    "kind": "access",
    "fields": [
      [
        "identity",
        "Protected identity accepted",
        "bool",
        true
      ],
      [
        "device",
        "Required device/context policy accepted",
        "bool",
        true
      ],
      [
        "resource",
        "Requested resource operation authorized",
        "bool",
        true
      ],
      [
        "fresh",
        "Policy/session eligibility fresh under declared design",
        "bool",
        true
      ],
      [
        "enforced",
        "Decision consumed at enforcement point",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "identity": true,
          "device": false,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      }
    ],
    "scope": "Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries."
  },
  {
    "key": "nac",
    "title": "Network Access Control",
    "kind": "access",
    "fields": [
      [
        "identity",
        "Protected identity accepted",
        "bool",
        true
      ],
      [
        "device",
        "Required device/context policy accepted",
        "bool",
        true
      ],
      [
        "resource",
        "Requested resource operation authorized",
        "bool",
        true
      ],
      [
        "fresh",
        "Policy/session eligibility fresh under declared design",
        "bool",
        true
      ],
      [
        "enforced",
        "Decision consumed at enforcement point",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "identity": true,
          "device": false,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      }
    ],
    "scope": "Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries."
  },
  {
    "key": "ise",
    "title": "Cisco ISE concepts",
    "kind": "access",
    "fields": [
      [
        "identity",
        "Protected identity accepted",
        "bool",
        true
      ],
      [
        "device",
        "Required device/context policy accepted",
        "bool",
        true
      ],
      [
        "resource",
        "Requested resource operation authorized",
        "bool",
        true
      ],
      [
        "fresh",
        "Policy/session eligibility fresh under declared design",
        "bool",
        true
      ],
      [
        "enforced",
        "Decision consumed at enforcement point",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "identity": true,
          "device": false,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": false
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "identity": true,
          "device": true,
          "resource": true,
          "fresh": true,
          "enforced": true
        }
      }
    ],
    "scope": "Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries."
  },
  {
    "key": "security-lab",
    "title": "Network Security Lab",
    "kind": "zones",
    "fields": [
      [
        "source",
        "Packet source zone",
        "select",
        [
          "Users",
          "Internet",
          "DMZ",
          "Servers",
          "Management",
          "Guest",
          "Backup"
        ]
      ],
      [
        "destination",
        "Packet destination zone",
        "select",
        [
          "Servers",
          "Internet",
          "DMZ",
          "Users",
          "Management",
          "Guest",
          "Backup"
        ]
      ],
      [
        "protocol",
        "Transport",
        "select",
        [
          "tcp",
          "udp"
        ]
      ],
      [
        "port",
        "Service port (destination for initiation; source for response)",
        "number",
        443
      ],
      [
        "direction",
        "Packet role",
        "select",
        [
          "initiation",
          "response"
        ]
      ],
      [
        "state",
        "Matching response state declared valid",
        "bool",
        true
      ],
      [
        "userRule",
        "Owned Users-to-Servers HTTPS permit enabled",
        "bool",
        true
      ]
    ],
    "cases": [
      {
        "id": "baseline",
        "label": "Baseline inputs",
        "values": {
          "source": "Users",
          "destination": "Servers",
          "protocol": "tcp",
          "port": 443,
          "direction": "initiation",
          "state": true,
          "userRule": true
        }
      },
      {
        "id": "fault",
        "label": "One owned boundary fault",
        "values": {
          "source": "Users",
          "destination": "Servers",
          "protocol": "tcp",
          "port": 443,
          "direction": "initiation",
          "state": true,
          "userRule": false
        }
      },
      {
        "id": "contrast",
        "label": "Compare a different boundary",
        "values": {
          "source": "Guest",
          "destination": "Management",
          "protocol": "tcp",
          "port": 22,
          "direction": "initiation",
          "state": true,
          "userRule": true
        }
      },
      {
        "id": "restored",
        "label": "Restored baseline",
        "values": {
          "source": "Users",
          "destination": "Servers",
          "protocol": "tcp",
          "port": 443,
          "direction": "initiation",
          "state": true,
          "userRule": true
        }
      }
    ],
    "scope": "Explicit seven-zone classroom service matrix and declared matching response state; no routing, DNS/time dependencies, identity checks or deployed firewall."
  }
];
