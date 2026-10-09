# Network Services source applicability — 2026-10-09

The primary assistant checked primary standards and product documentation while authoring Batches11/12. Source links and checked dates are attached to the individual lessons. Protocol semantics are separated from release-specific command and installation support.

| Area | References and scope |
| --- | --- |
| DHCP and DNS | RFC2131, RFC3046, RFC1034 and RFC2308 cover the declared DHCPv4 relay/allocation and authoritative/recursive/cache boundaries. DHCPv6, production failover and DNSSEC deployment are not implemented by the worksheet. |
| Time and telemetry | RFC5905 provides the four-timestamp NTP estimate and source-selection context; RFC3411/3414 describe SNMP framework/security; RFC5424 defines message/priority semantics. Actual device synchronization, SNMPv3 configuration and a production Syslog daemon were not executed. |
| AAA | RFC2865 defines classic RADIUS; RFC8907 describes TACACS+ and its legacy security limits. RFC9765 is an **Experimental** RADIUS/1.1 TLS/DTLS profile, not a claim that an installed NAS supports it. Explicit rejection and unavailable-server recovery remain separate cases. |
| Flow and availability | RFC3954 scopes NetFlowv9 templates. Cisco IOS XE17 FNF, IP SLA and enhanced-tracking chapters establish record/monitor/exporter and measurement/consumer distinctions. Features/fields/parser support must be checked on the actual hardware/release. No target commands or convergence tests were executed. |
| Discovery | Cisco CDPv2 documentation and the IEEE802.1AB overview support local-link discovery semantics. Neither advertised identity nor management-address metadata establishes authenticated routed service. The IEEE reference is a foundational edition, not a claim of newest-standard alignment. |
| Sessions and transfer | OpenSSH manuals and RFC4253, RFC1350, RFC959 describe the SSH host/user boundary and TFTP/FTP transport distinctions. Guided help/file/UI commands are labelled with their prepared-target requirements. SFTP is a subsystem, not FTP with TLS. |
| Web and trust | RFC9110/9114 define HTTP semantics and HTTP3/QUIC context. RFC5280 and RFC9525 distinguish certification-path checks from reference service identity; RFC9190 provides the EAP-TLS context. Revocation behavior depends on the actual client policy. |
| Monitoring | Official PRTG, Zabbix, LibreNMS, Grafana and Prometheus documentation supports the collection/query/alert distinctions. Editions, licensing, supported integrations, sizing and installation behavior are not frozen recommendations or executed product evidence. |

Two older Cisco book links redirected to broad book contents. They were replaced with the checked IP SLA overview and CDPv2 chapters. TLS reference-name and modern RADIUS-profile references were added during review. No third-party blog was used to establish protocol truth or vendor command behavior.

Actual execution is limited to read-only local tool inspection and owned loopback fixtures. The HTTPS experiment checks a disposable trusted self-signed certificate, correct/wrong hostname, unknown root and expected HTTP response; it does not establish public PKI or revocation behavior. The UDP experiment verifies scripted marker receipt and retention, not a full production log daemon or authenticated log origin. Temporary keys/files/listeners are cleaned without changing host trust, routes, DNS, clock or server roles.
