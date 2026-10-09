# Batch 04 source and correction ledger

Checked 4 October 2026. Primary specifications, upstream manuals and Python documentation were opened during research. Questions, calculation cases and failure scenarios are original.

## Interpretation boundaries

- RFC 4632 supplies classless prefix/aggregation context. Conventional subnet candidate formulas are not universal assignability rules.
- RFC 3021 is specifically IPv4 point-to-point /31 behavior; /32 is represented as one address. Python object interval properties are not confused with protocol broadcast semantics.
- RFC 4291/5952 provide IPv6 structure and preferred text representation; RFC 4862 covers SLAAC, RFC 6164 scoped /127 inter-router use, and RFC 4193 ULA structure.
- The widget’s pure-hextet parser is intentionally narrower than all accepted IPv6 forms. Excluded zone IDs, dotted tails and prefix suffixes are explained rather than declared globally invalid.
- IANA special-purpose classifications and RFC 1918 private allocation are different scopes. Python is_private semantics are not presented as an RFC 1918-only test.
- Exact executable examples corrected the decimal IPv4 integer to 3221225985 for 192.0.2.1. Independent Python vectors validate model boundaries without using the model itself as its oracle.
- Linux namespace/veth manuals support the isolated topology. The script creates only its own resources, has no uplink and verifies normal/failure cleanup; this is not evidence for a physical managed-switch configuration.

## Reference map

| Source | Lessons |
|---|---|
| [Python: integer conversion and formatting](https://docs.python.org/3/library/functions.html) | Binary, Decimal, Hexadecimal |
| [RFC 4632: CIDR](https://www.rfc-editor.org/rfc/rfc4632) | Binary, Decimal, CIDR, VLSM, subnet calculation |
| [Python: ipaddress (version-specific parser behavior)](https://docs.python.org/3/library/ipaddress.html) | Binary, Decimal, IPv4, IPv6, CIDR, VLSM, subnet calculation, IT & Infrastructure Foundation Lab |
| [RFC 5952: IPv6 text representation](https://www.rfc-editor.org/rfc/rfc5952) | Hexadecimal, IPv6 |
| [RFC 4291: IPv6 addressing architecture](https://www.rfc-editor.org/rfc/rfc4291) | Hexadecimal, IPv6 |
| [RFC 1918: private IPv4 allocations](https://www.rfc-editor.org/rfc/rfc1918) | IPv4 |
| [IANA: IPv4 special-purpose registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml) | IPv4, subnet calculation |
| [RFC 3021: IPv4 /31 point-to-point links](https://www.rfc-editor.org/rfc/rfc3021) | IPv4, VLSM, subnet calculation |
| [iproute2: route inspection](https://man7.org/linux/man-pages/man8/ip-route.8.html) | IPv4, CIDR, IT & Infrastructure Foundation Lab |
| [RFC 4862: IPv6 stateless autoconfiguration](https://www.rfc-editor.org/rfc/rfc4862) | IPv6 |
| [RFC 6164: /127 inter-router links](https://www.rfc-editor.org/rfc/rfc6164) | IPv6 |
| [RFC 4193: unique local IPv6 addresses](https://www.rfc-editor.org/rfc/rfc4193) | IPv6 |
| [iproute2: link inspection](https://man7.org/linux/man-pages/man8/ip-link.8.html) | IT & Infrastructure Foundation Lab |
| [iproute2: network namespaces](https://man7.org/linux/man-pages/man8/ip-netns.8.html) | IT & Infrastructure Foundation Lab |
| [Linux: veth pairs](https://man7.org/linux/man-pages/man4/veth.4.html) | IT & Infrastructure Foundation Lab |
