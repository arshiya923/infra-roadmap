# Cisco Device Mastery source and applicability review

Reviewed 2026-10-09 by the primary assistant. No GapCode was used.

The 25 retained references are official Cisco documents. Their URLs and teaching scopes are in [the source register](device-source-register.json) and each lesson. The research browser opened the retained HTML/PDF documents. Direct Python requests encountered Cisco access-control responses; those observations are preserved separately in [the transport check](device-source-checks.json). A 403 from that client is not represented as a successful HTTP check or a missing document.

Two obsolete developer-reference URLs were removed or replaced: the platform mapping now cites the ASR 1000 data sheet, and the MDS lesson uses the fabric configuration guide directly. A sandbox-hosted ACI overview was removed because the local client could not verify its certificate. No certificate checks were disabled.

## Scope decisions

- 2960/3560/3750 material is existing-estate instruction. X-series documentation is explicitly labelled; it does not establish support for every original non-X image.
- 9200/9300 descriptions avoid blanket stacking, power, speed and licensing promises. The PoE case is supplied arithmetic, not measured output.
- The 9500 StackWise Virtual example cites a historical 16.10 guide. It does not prescribe an upgrade or claim all family members support the same links.
- ISR control CPU and QFP observations are separate. ASR 1000 IOS XE and ASR 9000 IOS XR workflows are not conflated.
- ASA packet-tracer is a synthetic diagnostic. Threat Defense manager edits, deployment and actual new-flow behavior are separate evidence stages.
- Aironet conversion is model-specific. Catalyst AP policy tags, RF tags and site tags have different roles. The WLC lesson declares central switching before locating the VLAN fault.
- Nexus breakout capability is port-specific. Nexus 5000 Ethernet, vFC login and storage access are separate. Nexus 7000 VDCs share chassis dependencies. Nexus 9000 mode determines configuration authority.
- MDS full and active zoning databases are distinct; host LUN access also depends on array masking and host state.

## Evidence limits

All incident descriptions and expected recoveries are original authored classroom cases. The worksheet computes a predicate over supplied declarations and never connects to a device. Vendor commands remain guided and unexecuted. Real CLI parsing, firmware changes, power behavior, convergence, RF propagation, firewall deployment, SAN I/O and measured device performance are outside the acceptance claim.

No purchase recommendation, current end-of-support date, certification alignment, maximum scale or universal feature matrix is asserted. A target extension must select an exact hardware/software/mode combination and its matching command reference before configuration.
