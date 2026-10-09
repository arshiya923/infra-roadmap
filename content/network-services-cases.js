'use strict';
window.NETWORK_SERVICE_CASES=[
  {
    "key": "dhcp-server",
    "title": "DHCP Server",
    "gates": [
      [
        "Scope matches client subnet",
        "The allocatable pool corresponds to this client segment.",
        "A wrong scope must be repaired at subnet selection; increasing its size does not fix selection."
      ],
      [
        "Usable capacity remains",
        "At least one nonexcluded usable address is available.",
        "Exhaustion can suppress allocation despite a healthy server process."
      ],
      [
        "Options match intended services",
        "Supplied gateway and DNS options match the lab design.",
        "A valid address with a wrong gateway or DNS still breaks the intended client experience."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "dhcp-relay",
    "title": "DHCP Relay",
    "gates": [
      [
        "Correct relay subnet context",
        "giaddr maps to the intended client subnet.",
        "An incorrect giaddr can select the wrong pool even when the server is reachable."
      ],
      [
        "Server accepts relay policy",
        "Relay information is accepted under the defined trust policy.",
        "A policy rejection is not the same as packet loss or an exhausted pool."
      ],
      [
        "Reply reaches client segment",
        "Server-to-relay and relay-to-client paths are supplied as ready.",
        "Forward delivery does not prove the reply returned to the original client."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "dns-architecture",
    "title": "DNS architecture",
    "gates": [
      [
        "Authority has intended record",
        "The responsible zone contains the intended name/type data.",
        "Flushing a client cache cannot repair incorrect authoritative publication."
      ],
      [
        "Resolver can obtain valid answer",
        "The resolver path and applicable validation policy are supplied as ready.",
        "A working authority does not ensure the client resolver can reach or validate it."
      ],
      [
        "Client cache is current",
        "The supplied client observation is not an old eligible cached result.",
        "TTL and negative caching can explain different answers without an authoritative outage."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "ntp",
    "title": "NTP",
    "gates": [
      [
        "Source is synchronized",
        "The declared source provides usable synchronized time.",
        "A replying unsynchronized source must not be treated as a valid reference."
      ],
      [
        "Sample passes acceptance policy",
        "The declared sample meets configured clock-selection bounds.",
        "Low stratum alone does not override unsuitable delay or uncertainty."
      ],
      [
        "Observer confirms synchronization",
        "The actual client synchronization observation is supplied.",
        "Configured source intent is not evidence that the client selected or synchronized to it."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "snmp",
    "title": "SNMP",
    "gates": [
      [
        "Security processing succeeds",
        "The declared version/identity/security level is accepted.",
        "An authentication failure is not resolved by widening an object view."
      ],
      [
        "Requested OID is permitted",
        "The exact object and instance are allowed by the supplied view.",
        "A valid identity does not automatically authorize every OID."
      ],
      [
        "Observation has continuity",
        "Counter interval, instance and discontinuity context are valid.",
        "A reset or changed instance invalidates a naive counter-difference rate."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "syslog",
    "title": "Syslog",
    "gates": [
      [
        "Sender filter admits marker",
        "The test facility/severity is admitted by sender policy.",
        "A dropped-by-filter event need never leave the originator."
      ],
      [
        "Transport and framing match",
        "The supplied collector transport/framing agrees with the sender.",
        "A TCP connection alone does not establish correctly framed or accepted messages."
      ],
      [
        "Collector stores correlated marker",
        "The intended owned marker is observed in searchable storage.",
        "Received bytes without retained searchable evidence do not complete this logging objective."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "aaa",
    "title": "AAA",
    "gates": [
      [
        "Authentication accepted",
        "The supplied identity is authenticated for this service.",
        "Explicit authentication rejection must not be relabelled as a server outage."
      ],
      [
        "Requested action authorized",
        "The supplied command or service is permitted for this identity.",
        "Login success does not confer every administrative action."
      ],
      [
        "Accounting record observed",
        "A correlated record is retained at the intended observer.",
        "Authorization success alone does not establish an audit trail."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "radius",
    "title": "RADIUS",
    "gates": [
      [
        "NAS peer and response trusted",
        "Declared client/server context and response validation are correct.",
        "An untrusted response must not be treated as an authorized Access-Accept."
      ],
      [
        "Access policy accepts identity",
        "The supplied access decision is Accept for the intended service.",
        "Reject is explicit denial; timeout cannot be silently substituted for it."
      ],
      [
        "Returned policy is applied",
        "The NAS applies the intended authorized policy attributes.",
        "Server acceptance alone does not prove the desired access VLAN or role took effect."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "tacacs",
    "title": "TACACS+",
    "gates": [
      [
        "Administration session authenticated",
        "The declared administrator identity has been accepted.",
        "A TCP connection is not an authenticated administrator session."
      ],
      [
        "Command authorization permits action",
        "The actual command/argument request is permitted.",
        "An authenticated session may correctly be denied a configuration command."
      ],
      [
        "Accounting corroborates action",
        "A correlated action record is observed at the accounting receiver.",
        "A permitted command without a retained record leaves this audit objective incomplete."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "netflow",
    "title": "NetFlow",
    "gates": [
      [
        "Observation covers intended traffic",
        "The selected interface/direction actually observes the traffic.",
        "No matching observation can result from wrong attachment rather than absent application traffic."
      ],
      [
        "Matching template available",
        "The collector has the record schema for this exporter/source context.",
        "Received data cannot be reliably decoded using another exporter template with the same numeric ID."
      ],
      [
        "Sampling context recorded",
        "The supplied counters have known sampling and interval semantics.",
        "Unknown sampling prevents a defensible total-traffic estimate."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "fnf",
    "title": "Flexible NetFlow",
    "gates": [
      [
        "Record supported and appropriate",
        "Selected match/collect fields are supported and reflect intended aggregation.",
        "Unsupported fields or unintended keys invalidate the planned aggregation."
      ],
      [
        "Monitor attached at observer",
        "The monitor is applied to the intended supported interface/direction.",
        "Configured monitor objects do not observe traffic before attachment."
      ],
      [
        "Exporter and decoder ready",
        "Supplied export and matching collector schema are ready.",
        "A populated local cache alone does not prove decoded collector visibility."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "ip-sla",
    "title": "IP SLA",
    "gates": [
      [
        "Operation represents intended path",
        "Type, source and routing context match the desired measurement.",
        "A probe from another source or VRF may observe a different path."
      ],
      [
        "Schedule and sample current",
        "The operation runs and the supplied result is current.",
        "A defined but unscheduled operation has no fresh measurement."
      ],
      [
        "Measured operation succeeds",
        "The supplied result code indicates this operation succeeded.",
        "This failure is scoped to the probe; this success is not general application proof."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "tracking",
    "title": "Object Tracking",
    "gates": [
      [
        "Underlying observation valid",
        "The supplied measurement belongs to the intended object and context.",
        "A mismatched probe cannot safely govern the intended route."
      ],
      [
        "Delay policy satisfied",
        "The new condition has persisted through the configured transition delay.",
        "One changed sample may not immediately change the accepted track state."
      ],
      [
        "Consumer and recovery path valid",
        "The consumer is attached and measurement can still detect recovery.",
        "A route withdrawn by its own dependent probe can prevent later recovery observations."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "cdp",
    "title": "Cisco Discovery Protocol",
    "gates": [
      [
        "Local discovery enabled",
        "The receiving lab interface participates in CDP.",
        "No entry with discovery disabled does not establish physical link failure."
      ],
      [
        "Advertisement is current",
        "The supplied entry remains valid in its holdtime context.",
        "A stale cached advertisement can survive a failed attachment temporarily."
      ],
      [
        "Attachment corroborated independently",
        "Port mapping is compared with separate owned topology evidence.",
        "Advertised identity alone is not authenticated physical or service evidence."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "lldp",
    "title": "LLDP",
    "gates": [
      [
        "Participation matches direction",
        "The relevant transmitter and receiver participate.",
        "A disabled receive path can hide a healthy link advertisement."
      ],
      [
        "Neighbor TTL is current",
        "The advertised state is valid at this observation time.",
        "An aged or stale entry is not a fresh attachment observation."
      ],
      [
        "Identifier context understood",
        "Chassis/port subtype and separate topology evidence are supplied.",
        "Assuming every ID is a MAC address can misidentify the neighbor."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "ssh",
    "title": "SSH",
    "gates": [
      [
        "Host identity verified",
        "The expected host key or host certificate passes trusted policy.",
        "An encrypted channel to an unverified key does not identify the intended server."
      ],
      [
        "User authentication accepted",
        "The supplied administrative user proves an accepted credential.",
        "Trusted server identity does not automatically authenticate a user."
      ],
      [
        "Requested channel permitted",
        "The server policy permits the intended shell/action/subsystem.",
        "A successful login need not permit forwarding or every command."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "sftp",
    "title": "SFTP",
    "gates": [
      [
        "SSH identity path accepted",
        "Host verification and user authentication succeed under intended policy.",
        "Do not bypass host trust merely to obtain a transfer connection."
      ],
      [
        "Subsystem and path authorized",
        "The SFTP subsystem and exact remote operation/path are allowed.",
        "Shell access or directory listing does not establish write permission to the intended destination."
      ],
      [
        "Transferred artifact verified",
        "Destination path, length and independent content hash match.",
        "Successful login or partial upload is not verified final file delivery."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "tftp",
    "title": "TFTP",
    "gates": [
      [
        "Initial request reaches intended root",
        "The owned operation/filename maps to the allowed server root.",
        "Reachability to UDP 69 alone does not establish allowed file access."
      ],
      [
        "Transfer identifiers accepted",
        "The negotiated data/acknowledgement tuples are permitted and correlated.",
        "A UDP 69-only rule can admit requests but break later data packets."
      ],
      [
        "Artifact independently verified",
        "Final content matches a trusted expected length/hash or signature.",
        "Completed transport alone does not authenticate the transferred image."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "ftp",
    "title": "FTP",
    "gates": [
      [
        "Control identity accepted",
        "The intended control server/user policy is supplied as accepted.",
        "A working control connection is not a completed data transfer."
      ],
      [
        "Negotiated data path ready",
        "The active/passive tuple and firewall/NAT context are correct.",
        "A blocked data connection can prevent listings despite successful login."
      ],
      [
        "Intended transfer verified",
        "Owned destination content and transport-protection policy are verified.",
        "An FTP completion reply alone does not replace independent integrity or channel-policy checks."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "http",
    "title": "HTTP / HTTPS",
    "gates": [
      [
        "Intended origin and route",
        "URL hostname/method and observer represent the original request.",
        "A changed hostname or proxy path can test a different application."
      ],
      [
        "TLS identity validation accepted",
        "The actual policy accepts chain, hostname, time and usage where applicable.",
        "An open port or disabled verification is not authenticated HTTPS identity."
      ],
      [
        "Expected application result observed",
        "The specific status/content/action matches the test objective.",
        "HTTP200 alone does not guarantee correct application behavior."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "pki",
    "title": "PKI fundamentals",
    "gates": [
      [
        "Anchor trusted by relying party",
        "The declared trust anchor is permitted in the actual client policy.",
        "Self-signature or a downloaded root does not automatically establish trust."
      ],
      [
        "Path constraints valid",
        "The supplied issuer chain meets signatures, CA and usage/time constraints.",
        "A chain assembled from names alone does not demonstrate path validation."
      ],
      [
        "Private key custody intact",
        "The relevant private keys remain protected under intended ownership.",
        "A valid public certificate does not repair disclosure of its private key."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "certificates",
    "title": "Certificates",
    "gates": [
      [
        "Requested identity matches",
        "The intended reference name passes applicable certificate identity policy.",
        "A valid certificate for another hostname remains wrong for this request."
      ],
      [
        "Time and usage acceptable",
        "The actual client clock and intended usage pass policy.",
        "Unexpired alone does not establish suitable usage or correct client time."
      ],
      [
        "Trust and revocation policy pass",
        "The supplied path and configured revocation behavior are accepted.",
        "Revocation checks vary; do not infer a universal check from a displayed certificate."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "dot1x",
    "title": "802.1X fundamentals",
    "gates": [
      [
        "Intended EAP identity validated",
        "The selected method and expected endpoint/server identities pass policy.",
        "MAB or an outage exception is not successful EAP-TLS authentication."
      ],
      [
        "Authenticator applies correct role",
        "The consuming port installs the intended controlled access policy.",
        "Server acceptance alone does not prove the desired VLAN or role."
      ],
      [
        "Permitted and denied traffic verified",
        "The owned tests corroborate actual intended access boundaries.",
        "Link-up and an authorized label do not prove application policy enforcement."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "monitoring",
    "title": "Network monitoring fundamentals",
    "gates": [
      [
        "Signal matches service objective",
        "The selected observation measures a documented service property.",
        "A ping or uptime metric alone may not represent the original user workflow."
      ],
      [
        "Samples are fresh and interpretable",
        "Units, interval, missingness and clock provenance are recorded.",
        "No-data or stale data must not silently become healthy zero."
      ],
      [
        "Alert and response path tested",
        "Condition, notification and owner acknowledgement are supplied as verified.",
        "A visible dashboard is not a tested incident notification workflow."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "prtg",
    "title": "PRTG",
    "gates": [
      [
        "Intended probe can run check",
        "Probe location and required credentials/support match the sensor.",
        "Core reachability alone does not establish the remote probe path."
      ],
      [
        "Sensor reports fresh intended data",
        "The check is running with correct units and current results.",
        "Paused or stale sensor state is not a fresh healthy measurement."
      ],
      [
        "Notification workflow verified",
        "Trigger, recipient and recovery behavior are corroborated.",
        "A red sensor does not prove an alert reached its responsible operator."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "zabbix",
    "title": "Zabbix",
    "gates": [
      [
        "Item collection valid",
        "Configured host/item type, observer and supported key match.",
        "An unsupported item can have no valid value even while the host is reachable."
      ],
      [
        "Trigger uses current intended data",
        "Expression, window and missing-data semantics match the objective.",
        "An old value or wrong expression can conceal the original condition."
      ],
      [
        "Action delivery corroborated",
        "Matching event/action and responsible recipient evidence are present.",
        "A problem event alone does not prove the notification action completed."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "librenms",
    "title": "LibreNMS",
    "gates": [
      [
        "Device objects mapped correctly",
        "Supported OS and intended OID/instance mapping are known.",
        "Wrong discovery or instance mapping can mislabel later values."
      ],
      [
        "Poller obtains fresh values",
        "The intended observer and credentials yield current data.",
        "A discovered device can still fail actual polling."
      ],
      [
        "History and alerts corroborated",
        "Retained samples and intended alert delivery are observed.",
        "Fresh polling alone does not establish stored history or recipient delivery."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "grafana",
    "title": "Grafana",
    "gates": [
      [
        "Datasource query authorized",
        "The intended backend connection and query permissions work.",
        "A loaded dashboard shell does not establish datasource access."
      ],
      [
        "Query represents current objective",
        "Variables, units, interval and returned samples match the intended measurement.",
        "An empty selection or stale series must not be mistaken for healthy zero."
      ],
      [
        "Alert failure policy and delivery tested",
        "No-data/error behavior and recipient recovery are corroborated.",
        "A panel threshold color is not automatically the alert rule or notification result."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "prometheus",
    "title": "Prometheus",
    "gates": [
      [
        "Target scrape succeeds",
        "The intended target endpoint returns an accepted scrape.",
        "Scrape failure differs from a collected metric value of zero."
      ],
      [
        "Metric semantics are correct",
        "Type, labels, interval and reset context match the query.",
        "A raw counter is not a current rate; unrelated series cannot be subtracted safely."
      ],
      [
        "Service objective and alert verified",
        "The application-specific signal and intended response are corroborated.",
        "up=1 does not guarantee user-visible service success."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  },
  {
    "key": "services-lab",
    "title": "Network Services Lab",
    "gates": [
      [
        "Time and telemetry evidence complete",
        "Synchronization, correlated collector marker and scoped SNMP observation are independently recorded.",
        "Ping and configuration displays cannot replace actual service observations."
      ],
      [
        "AAA acceptance and rejection verified",
        "Approved identity/action and intended denial have correlated evidence.",
        "A rejection bypassed by fallback is a failure of the intended boundary."
      ],
      [
        "Independent recovery and restore verified",
        "Console-local recovery remains usable and original transactions pass after exact restore.",
        "Central outage testing is unsafe without independently verified recovery."
      ]
    ],
    "scope": "Synthetic prerequisite worksheet; supplied declarations only. No live protocol, packet exchange, device validation, clock discipline or application measurement."
  }
];
