'use strict';
(() => {
const lessons = [
  {
    "id": "s4-g5-t0",
    "batch": "12",
    "title": "PKI fundamentals",
    "subtitle": "Build a trust path while keeping identity, key custody and authorization separate.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-pki",
    "definition": "A public key infrastructure binds subject identities or attributes to public keys through signed certificates and a relying-party trust policy. A certification authority signs certificates; a relying party decides whether a path to a locally trusted anchor is acceptable for its intended use. An intermediate can sign subordinate certificates only under applicable constraints. A valid signature proves a key signed data, not that every signed identity should be trusted or authorized.",
    "purpose": "Build a trust path while keeping identity, key custody and authorization separate. Define approved issuers and relying-party trust stores, controlled key generation/custody, certificate inventory and renewal owners. Preserve a disposable trust store before adding a lab CA; remove only that owned anchor after verifying restoration.",
    "mental": "Use a three-column evidence notebook for PKI fundamentals: prerequisite, observation and conclusion. Identify the root trust anchor, intermediate issuers and endpoint leaf. A self-signed certificate is not automatically trusted: local trust policy is the starting authority. The private key is distinct from the distributable certificate and must remain protected. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Anchor trusted by relying party: The declared trust anchor is permitted in the actual client policy.",
      "Path constraints valid: The supplied issuer chain meets signatures, CA and usage/time constraints.",
      "Private key custody intact: The relevant private keys remain protected under intended ownership.",
      "Observation point: Inspect the local cryptographic tool version without generating keys or changing trust.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the root trust anchor, intermediate issuers and endpoint leaf. A self-signed certificate is not automatically trusted: local trust policy is the starting authority. The private key is distinct from the distributable certificate and must remain protected.",
      "Path validation checks signatures and constraints such as CA eligibility, validity and intended usage under the actual client policy. Issuer discovery alone is not a validated chain. Missing intermediates and untrusted roots are different faults with different repairs.",
      "Plan issuance, renewal, revocation response and key compromise handling before deployment. Verify the exact service identity at the relying client, not merely a chain viewer. Restore owned trust changes without exporting private keys or trusting unrelated roots.",
      "The first decisive boundary in this worksheet is Anchor trusted by relying party. Self-signature or a downloaded root does not automatically establish trust.",
      "The later evidence boundaries are Path constraints valid and Private key custody intact. A chain assembled from names alone does not demonstrate path validation. A valid public certificate does not repair disclosure of its private key."
    ],
    "flow": [
      [
        "PKI fundamentals context",
        "Build a trust path while keeping identity, key custody and authorization separate. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Anchor trusted by relying party",
        "The declared trust anchor is permitted in the actual client policy. Self-signature or a downloaded root does not automatically establish trust."
      ],
      [
        "Path constraints valid",
        "The supplied issuer chain meets signatures, CA and usage/time constraints. A chain assembled from names alone does not demonstrate path validation."
      ],
      [
        "Private key custody intact",
        "The relevant private keys remain protected under intended ownership. A valid public certificate does not repair disclosure of its private key."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating PKI fundamentals has an apparently healthy management path. Leaf signature valid but anchor unknown; acceptance? Not under that trust policy. Cryptographic signature correctness and locally permitted trust are separate requirements. Compare that observation with the separate recovery question: How verify a restored trust path? Use the intended client policy and exact service identity, then test intended denial. A generic viewer can apply a different trust store or omit application identity checks. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "PKI is a trust framework with no single intrinsic port. Enrollment, revocation and protected application protocols use their own transports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "openssl version",
        "platform": "OpenSSL lab client; version inspection only · GUIDED NOT EXECUTED",
        "explanation": "Inspect the local cryptographic tool version without generating keys or changing trust.",
        "expected": "Tool availability is not a validated certificate chain or an authenticated application endpoint."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior PKI fundamentals settings, version and consuming attachment before any change. Define approved issuers and relying-party trust stores, controlled key generation/custody, certificate inventory and renewal owners. Preserve a disposable trust store before adding a lab CA; remove only that owned anchor after verifying restoration. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define approved issuers and relying-party trust stores, controlled key generation/custody, certificate inventory and renewal owners. Preserve a disposable trust store before adding a lab CA; remove only that owned anchor after verifying restoration.",
    "troubleshooting": [
      [
        "Anchor trusted by relying party boundary fails",
        "Self-signature or a downloaded root does not automatically establish trust. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Path constraints valid boundary fails",
        "A chain assembled from names alone does not demonstrate path validation. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Private key custody intact boundary fails",
        "A valid public certificate does not repair disclosure of its private key. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "A compromised private key requires incident handling beyond editing a certificate name. Protect CA keys more strongly than ordinary artifacts, constrain issuance and avoid indiscriminately importing roots to fix a validation error.",
    "performance": "What threatens availability during renewal? Unowned inventory, expiry gaps and incomplete deployed chains. A certificate issued successfully is not necessarily deployed to every consuming endpoint. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Certificates distribute public bindings; private keys must remain confidential and protected.",
      "Cryptographic signature correctness and locally permitted trust are separate requirements.",
      "One concerns path construction; the other concerns the relying party trust decision.",
      "A certificate issued successfully is not necessarily deployed to every consuming endpoint."
    ],
    "prerequisites": [
      "s4-g4-t6"
    ],
    "related": [
      "s4-g5-t1"
    ],
    "lab": {
      "objective": "Build a trust path while keeping identity, key custody and authorization separate. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → PKI fundamentals endpoint",
        "Boundary: Anchor trusted by relying party → Path constraints valid → Private key custody intact",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Use a disposable trust store and an owned root/intermediate/leaf test chain with constrained CA/usage policy. Keep key material private and record only public certificate metadata. Install the lab anchor only in the disposable relying client.",
        "Remove the owned trust anchor from that disposable store and verify path rejection. Restore only the intended anchor and separately test a missing intermediate or inappropriate CA constraint.",
        "Validate path under the actual intended client policy and service name, then remove owned lab trust and artifacts without replacing unrelated trust.",
        "Open the PKI fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Self-signature or a downloaded root does not automatically establish trust. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A chain assembled from names alone does not demonstrate path validation. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A valid public certificate does not repair disclosure of its private key. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define approved issuers and relying-party trust stores, controlled key generation/custody, certificate inventory and renewal owners. Preserve a disposable trust store before adding a lab CA; remove only that owned anchor after verifying restoration."
      ],
      "verification": "Tool availability is not a validated certificate chain or an authenticated application endpoint. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Self-signature or a downloaded root does not automatically establish trust. A chain assembled from names alone does not demonstrate path validation. A valid public certificate does not repair disclosure of its private key. Separate invalid inputs from a valid negative service result.",
      "challenge": "What cleanup after a lab CA? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Anchor trusted by relying party": "The declared trust anchor is permitted in the actual client policy.",
      "Path constraints valid": "The supplied issuer chain meets signatures, CA and usage/time constraints.",
      "Private key custody intact": "The relevant private keys remain protected under intended ownership."
    },
    "sources": [
      {
        "title": "RFC 5280",
        "url": "https://www.rfc-editor.org/rfc/rfc5280.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Self-signed root automatically trusted?",
        "answer": "No; trust is a relying-party policy choice.",
        "explanation": "A self-signature cannot establish an independent reason to trust its signer.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Self-signed root automatically trusted?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-QC1"
      },
      {
        "question": "Certificate and private key interchangeable artifacts?",
        "answer": "No.",
        "explanation": "Certificates distribute public bindings; private keys must remain confidential and protected.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Certificate and private key interchangeable artifacts?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-QC2"
      },
      {
        "question": "Intermediate named as issuer means chain validated?",
        "answer": "No.",
        "explanation": "Signatures, constraints and a path to a permitted trust anchor must be checked.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Intermediate named as issuer means chain validated?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "PKI fundamentals — Self-signed root automatically trusted?",
        "answer": "No; trust is a relying-party policy choice.",
        "explanation": "A self-signature cannot establish an independent reason to trust its signer.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Self-signed root automatically trusted?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q01",
        "options": [
          "No; trust is a relying-party policy choice.",
          "Yes; every self-signature creates universal trust.",
          "Yes; downloading a certificate trusts it globally.",
          "Only if the root name contains the company name."
        ]
      },
      {
        "question": "PKI fundamentals — Certificate and private key interchangeable artifacts?",
        "answer": "No.",
        "explanation": "Certificates distribute public bindings; private keys must remain confidential and protected.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Certificate and private key interchangeable artifacts?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q02"
      },
      {
        "question": "PKI fundamentals — Intermediate named as issuer means chain validated?",
        "answer": "No.",
        "explanation": "Signatures, constraints and a path to a permitted trust anchor must be checked.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Intermediate named as issuer means chain validated?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q03"
      },
      {
        "question": "PKI fundamentals — Leaf signature valid but anchor unknown; acceptance?",
        "answer": "Not under that trust policy.",
        "explanation": "Cryptographic signature correctness and locally permitted trust are separate requirements.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Leaf signature valid but anchor unknown; acceptance?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q04"
      },
      {
        "question": "PKI fundamentals — Does a valid certificate authorize every action?",
        "answer": "No.",
        "explanation": "Identity binding and application authorization remain distinct decisions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a valid certificate authorize every action?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q05"
      },
      {
        "question": "PKI fundamentals — Missing intermediate and untrusted root same fault?",
        "answer": "No.",
        "explanation": "One concerns path construction; the other concerns the relying party trust decision.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Missing intermediate and untrusted root same fault?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q06"
      },
      {
        "question": "PKI fundamentals — Private key leaked; renew same key sufficient?",
        "answer": "No; handle compromise and replace/revoke as policy requires.",
        "explanation": "A new validity period does not make a disclosed signing key secret again.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Private key leaked; renew same key sufficient?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q07"
      },
      {
        "question": "PKI fundamentals — How verify a restored trust path?",
        "answer": "Use the intended client policy and exact service identity, then test intended denial.",
        "explanation": "A generic viewer can apply a different trust store or omit application identity checks.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify a restored trust path?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q08"
      },
      {
        "question": "PKI fundamentals — What threatens availability during renewal?",
        "answer": "Unowned inventory, expiry gaps and incomplete deployed chains.",
        "explanation": "A certificate issued successfully is not necessarily deployed to every consuming endpoint.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What threatens availability during renewal?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q09"
      },
      {
        "question": "PKI fundamentals — What cleanup after a lab CA?",
        "answer": "Remove the owned lab trust anchor and revoke/remove owned artifacts under the lab plan.",
        "explanation": "Broad trust-store replacement could damage unrelated endpoint validation.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What cleanup after a lab CA?",
        "topicId": "s4-g5-t0",
        "questionId": "s4-g5-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g5-t1",
    "batch": "12",
    "title": "Certificates",
    "subtitle": "Validate a certificate for the actual hostname, time and intended use.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-certificates",
    "definition": "A certificate contains a signed public-key binding and attributes such as issuer, subject alternative names, validity and usage constraints. Client acceptance depends on path trust and application-specific identity policy, not just whether a certificate file parses. For HTTPS, the requested reference hostname must satisfy the client identity check. Expiry, wrong hostname, unsuitable usage and unknown issuer are distinct failure causes.",
    "purpose": "Validate a certificate for the actual hostname, time and intended use. Track certificate owner, names, issuer, renewal lead time and deployment targets. Preserve endpoint binding and trust configuration before one lab replacement. Verify the intended hostname with checks enabled and retain the precise failed validation reason.",
    "mental": "Use a three-column evidence notebook for Certificates: prerequisite, observation and conclusion. Read issuer, subject/SAN, validity and extensions without exposing private material. Compare the actual requested hostname with supported reference-identity rules. A familiar organization name or common-name display is not sufficient evidence of hostname validation. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Requested identity matches: The intended reference name passes applicable certificate identity policy.",
      "Time and usage acceptable: The actual client clock and intended usage pass policy.",
      "Trust and revocation policy pass: The supplied path and configured revocation behavior are accepted.",
      "Observation point: Inspect public certificate metadata without altering trust or reading a private key.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Read issuer, subject/SAN, validity and extensions without exposing private material. Compare the actual requested hostname with supported reference-identity rules. A familiar organization name or common-name display is not sufficient evidence of hostname validation.",
      "Check current client time and applicable key/extended-key usage along the validated path. An unexpired certificate is not necessarily trusted, usable for this service or associated with the intended endpoint. Server chain delivery and client trust stores can differ.",
      "Revocation processing is policy- and implementation-dependent; do not assume every client checks every revocation source or fails identically when one is unreachable. Test intended validator behavior using owned fixtures and verify renewal deployment at the original service endpoint.",
      "The first decisive boundary in this worksheet is Requested identity matches. A valid certificate for another hostname remains wrong for this request.",
      "The later evidence boundaries are Time and usage acceptable and Trust and revocation policy pass. Unexpired alone does not establish suitable usage or correct client time. Revocation checks vary; do not infer a universal check from a displayed certificate."
    ],
    "flow": [
      [
        "Certificates context",
        "Validate a certificate for the actual hostname, time and intended use. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Requested identity matches",
        "The intended reference name passes applicable certificate identity policy. A valid certificate for another hostname remains wrong for this request."
      ],
      [
        "Time and usage acceptable",
        "The actual client clock and intended usage pass policy. Unexpired alone does not establish suitable usage or correct client time."
      ],
      [
        "Trust and revocation policy pass",
        "The supplied path and configured revocation behavior are accepted. Revocation checks vary; do not infer a universal check from a displayed certificate."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Certificates has an apparently healthy management path. Parsing PEM succeeds; live TLS verified? No. File syntax and metadata do not establish endpoint presentation or relying-party validation. Compare that observation with the separate recovery question: How verify renewal deployment? Inspect and validate the certificate presented by the original endpoint/name. An issued file can remain undeployed or attached to another listener. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "A certificate has no intrinsic port; HTTPS/SSH/enrollment protocols have their own transport conventions and validation rules.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "openssl x509 -in labs/owned-server.pem -noout -issuer -subject -dates -ext subjectAltName",
        "platform": "OpenSSL with a separately prepared owned PEM fixture; guided only · GUIDED NOT EXECUTED",
        "explanation": "Inspect public certificate metadata without altering trust or reading a private key.",
        "expected": "Parsing and metadata do not prove path trust, reference identity, revocation or a live endpoint."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Certificates settings, version and consuming attachment before any change. Track certificate owner, names, issuer, renewal lead time and deployment targets. Preserve endpoint binding and trust configuration before one lab replacement. Verify the intended hostname with checks enabled and retain the precise failed validation reason. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Track certificate owner, names, issuer, renewal lead time and deployment targets. Preserve endpoint binding and trust configuration before one lab replacement. Verify the intended hostname with checks enabled and retain the precise failed validation reason.",
    "troubleshooting": [
      [
        "Requested identity matches boundary fails",
        "A valid certificate for another hostname remains wrong for this request. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Time and usage acceptable boundary fails",
        "Unexpired alone does not establish suitable usage or correct client time. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Trust and revocation policy pass boundary fails",
        "Revocation checks vary; do not infer a universal check from a displayed certificate. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Do not bypass hostname or expiry checks to hide a deployment fault. Protect private keys and issuance authority; certificate metadata can be public while its corresponding signing material must remain protected.",
    "performance": "Why alert before expiry rather than at expiry? Renewal, approval and deployment need operational lead time. Expiry detection without remediation ownership can create avoidable service outages. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Inspect applicable reference-identity rules rather than assuming a friendly subject display is enough.",
      "File syntax and metadata do not establish endpoint presentation or relying-party validation.",
      "Policy, implementation, caching and failure behavior vary and require actual validator evidence.",
      "Expiry detection without remediation ownership can create avoidable service outages."
    ],
    "prerequisites": [
      "s4-g5-t0"
    ],
    "related": [
      "s4-g5-t2"
    ],
    "lab": {
      "objective": "Validate a certificate for the actual hostname, time and intended use. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Certificates endpoint",
        "Boundary: Requested identity matches → Time and usage acceptable → Trust and revocation policy pass",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare owned public PEM fixtures with known issuer/SAN/time/usage. Inspect metadata using the guided command, then use the actual intended relying client to validate the endpoint chain and reference name.",
        "Present an owned expired or wrong-SAN fixture, one fault at a time. Keep identity/time checks enabled and restore the intended certificate binding. Do not edit the host clock to hide expiry.",
        "Verify the original endpoint presents the renewed certificate and check client-specific revocation policy/failure behavior where configured.",
        "Open the Certificates evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A valid certificate for another hostname remains wrong for this request. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Unexpired alone does not establish suitable usage or correct client time. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Revocation checks vary; do not infer a universal check from a displayed certificate. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Track certificate owner, names, issuer, renewal lead time and deployment targets. Preserve endpoint binding and trust configuration before one lab replacement. Verify the intended hostname with checks enabled and retain the precise failed validation reason."
      ],
      "verification": "Parsing and metadata do not prove path trust, reference identity, revocation or a live endpoint. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A valid certificate for another hostname remains wrong for this request. Unexpired alone does not establish suitable usage or correct client time. Revocation checks vary; do not infer a universal check from a displayed certificate. Separate invalid inputs from a valid negative service result.",
      "challenge": "What record helps repair a mismatch safely? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Requested identity matches": "The intended reference name passes applicable certificate identity policy.",
      "Time and usage acceptable": "The actual client clock and intended usage pass policy.",
      "Trust and revocation policy pass": "The supplied path and configured revocation behavior are accepted."
    },
    "sources": [
      {
        "title": "RFC 5280",
        "url": "https://www.rfc-editor.org/rfc/rfc5280.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9525",
        "url": "https://www.rfc-editor.org/rfc/rfc9525.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Unexpired certificate automatically valid for any hostname?",
        "answer": "No.",
        "explanation": "Reference identity and trust must still match the requested service.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Unexpired certificate automatically valid for any hostname?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-QC1"
      },
      {
        "question": "What field commonly carries HTTPS DNS identities?",
        "answer": "Subject alternative name.",
        "explanation": "Inspect applicable reference-identity rules rather than assuming a friendly subject display is enough.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What field commonly carries HTTPS DNS identities?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-QC2"
      },
      {
        "question": "Client clock wrong; why can validation fail?",
        "answer": "Validity is evaluated against the client time.",
        "explanation": "The certificate interval and observer clock jointly determine a time-based decision.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Client clock wrong; why can validation fail?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "Certificates — Unexpired certificate automatically valid for any hostname?",
        "answer": "No.",
        "explanation": "Reference identity and trust must still match the requested service.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Unexpired certificate automatically valid for any hostname?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q01",
        "options": [
          "Yes; expiry is the only certificate check.",
          "Yes; one trusted name covers every hostname.",
          "Only if the certificate parses as PEM.",
          "No."
        ]
      },
      {
        "question": "Certificates — What field commonly carries HTTPS DNS identities?",
        "answer": "Subject alternative name.",
        "explanation": "Inspect applicable reference-identity rules rather than assuming a friendly subject display is enough.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What field commonly carries HTTPS DNS identities?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q02"
      },
      {
        "question": "Certificates — Client clock wrong; why can validation fail?",
        "answer": "Validity is evaluated against the client time.",
        "explanation": "The certificate interval and observer clock jointly determine a time-based decision.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Client clock wrong; why can validation fail?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q03"
      },
      {
        "question": "Certificates — Parsing PEM succeeds; live TLS verified?",
        "answer": "No.",
        "explanation": "File syntax and metadata do not establish endpoint presentation or relying-party validation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Parsing PEM succeeds; live TLS verified?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q04"
      },
      {
        "question": "Certificates — Can unsuitable EKU still matter before expiry?",
        "answer": "Yes.",
        "explanation": "Allowed key usage is an independent constraint for the intended service.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can unsuitable EKU still matter before expiry?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q05"
      },
      {
        "question": "Certificates — Every client necessarily performs identical revocation checks?",
        "answer": "No.",
        "explanation": "Policy, implementation, caching and failure behavior vary and require actual validator evidence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Every client necessarily performs identical revocation checks?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q06"
      },
      {
        "question": "Certificates — Issuer name matches known CA; path necessarily trusted?",
        "answer": "No.",
        "explanation": "Names do not substitute for signatures, chain constraints and an approved trust anchor.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Issuer name matches known CA; path necessarily trusted?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q07"
      },
      {
        "question": "Certificates — How verify renewal deployment?",
        "answer": "Inspect and validate the certificate presented by the original endpoint/name.",
        "explanation": "An issued file can remain undeployed or attached to another listener.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify renewal deployment?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q08"
      },
      {
        "question": "Certificates — Why alert before expiry rather than at expiry?",
        "answer": "Renewal, approval and deployment need operational lead time.",
        "explanation": "Expiry detection without remediation ownership can create avoidable service outages.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why alert before expiry rather than at expiry?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q09"
      },
      {
        "question": "Certificates — What record helps repair a mismatch safely?",
        "answer": "Requested name, presented SAN/chain, client time and exact validation error.",
        "explanation": "That context identifies the actual cause without disabling the identity checks.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What record helps repair a mismatch safely?",
        "topicId": "s4-g5-t1",
        "questionId": "s4-g5-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g5-t2",
    "batch": "12",
    "title": "802.1X fundamentals",
    "subtitle": "Separate endpoint EAP, authenticator decisions and policy-server transport.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-dot1x",
    "definition": "802.1X controls network access through a supplicant, authenticator and authentication-server role. EAPOL carries local-link authentication exchanges between endpoint and access device; the authenticator commonly transports EAP to a RADIUS server. The controlled data port and authentication exchange have distinct states. EAP-TLS can prove certificate-based identities under configured policy, while MAC authentication bypass is a different and weaker identity mechanism.",
    "purpose": "Separate endpoint EAP, authenticator decisions and policy-server transport. Define EAP method, supplicant trust, server client mapping, assigned access policy and explicit outage behavior. Preserve the exact lab-port policy and console management before one fault. Verify authorized/denied traffic and authentication records separately.",
    "mental": "Use a three-column evidence notebook for 802.1X fundamentals: prerequisite, observation and conclusion. Identify the supplicant and the actual access-device port. Authentication frames must be permitted through the uncontrolled authentication path while ordinary data access follows controlled-port policy. Link-up alone does not imply authorized data access. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Intended EAP identity validated: The selected method and expected endpoint/server identities pass policy.",
      "Authenticator applies correct role: The consuming port installs the intended controlled access policy.",
      "Permitted and denied traffic verified: The owned tests corroborate actual intended access boundaries.",
      "Observation point: Inspect method, state and assigned policy on the intended lab port.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the supplicant and the actual access-device port. Authentication frames must be permitted through the uncontrolled authentication path while ordinary data access follows controlled-port policy. Link-up alone does not imply authorized data access.",
      "The authenticator relays EAP under a configured policy-server relationship. Verify server identity in the supplicant policy and endpoint/client identity at the server as required by the EAP method. RADIUS reachability is not successful EAP validation.",
      "Apply returned role/VLAN and separately test intended traffic. Critical-auth/fail-open and MAB fallback policies are explicit design choices, not evidence of successful EAP-TLS. Preserve independent management and test accept, reject, server outage and local recovery in an isolated access port.",
      "The first decisive boundary in this worksheet is Intended EAP identity validated. MAB or an outage exception is not successful EAP-TLS authentication.",
      "The later evidence boundaries are Authenticator applies correct role and Permitted and denied traffic verified. Server acceptance alone does not prove the desired VLAN or role. Link-up and an authorized label do not prove application policy enforcement."
    ],
    "flow": [
      [
        "802.1X fundamentals context",
        "Separate endpoint EAP, authenticator decisions and policy-server transport. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Intended EAP identity validated",
        "The selected method and expected endpoint/server identities pass policy. MAB or an outage exception is not successful EAP-TLS authentication."
      ],
      [
        "Authenticator applies correct role",
        "The consuming port installs the intended controlled access policy. Server acceptance alone does not prove the desired VLAN or role."
      ],
      [
        "Permitted and denied traffic verified",
        "The owned tests corroborate actual intended access boundaries. Link-up and an authorized label do not prove application policy enforcement."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating 802.1X fundamentals has an apparently healthy management path. MAB success equivalent to EAP-TLS identity proof? No. A copied MAC address has weaker identity assurance than validated certificate possession. Compare that observation with the separate recovery question: How verify restored port policy? Correct method/identity, role and intended allowed/denied traffic all pass. A session label alone omits the actual data-access boundary. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "EAPOL is Layer 2 and has no TCP/UDP port. Authenticator-to-server RADIUS commonly uses UDP 1812, with accounting separately1813.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show authentication sessions interface GigabitEthernet1/0/10 details",
        "platform": "Cisco IOS XE17 access device where supported; owned port placeholder · GUIDED NOT EXECUTED",
        "explanation": "Inspect method, state and assigned policy on the intended lab port.",
        "expected": "Authorized display must be corroborated with intended permitted/denied traffic and identity evidence."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior 802.1X fundamentals settings, version and consuming attachment before any change. Define EAP method, supplicant trust, server client mapping, assigned access policy and explicit outage behavior. Preserve the exact lab-port policy and console management before one fault. Verify authorized/denied traffic and authentication records separately. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define EAP method, supplicant trust, server client mapping, assigned access policy and explicit outage behavior. Preserve the exact lab-port policy and console management before one fault. Verify authorized/denied traffic and authentication records separately.",
    "troubleshooting": [
      [
        "Intended EAP identity validated boundary fails",
        "MAB or an outage exception is not successful EAP-TLS authentication. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Authenticator applies correct role boundary fails",
        "Server acceptance alone does not prove the desired VLAN or role. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Permitted and denied traffic verified boundary fails",
        "Link-up and an authorized label do not prove application policy enforcement. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Do not disable server certificate validation in supplicants. MAC addresses can be copied; MAB does not provide the same identity assurance as properly configured EAP-TLS. Contain any fail-open exception and record it as a policy exception.",
    "performance": "What can cause repeated authentication churn? Method/certificate/time or policy problems, not only link failure. Correlate authentication causes and timing before treating every retry as a physical fault. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "RADIUS transport belongs to the authenticator/server relationship rather than the endpoint EAPOL frame.",
      "A copied MAC address has weaker identity assurance than validated certificate possession.",
      "The authenticator must support and install the returned policy on the intended port.",
      "Correlate authentication causes and timing before treating every retry as a physical fault."
    ],
    "prerequisites": [
      "s4-g2-t1",
      "s4-g5-t1"
    ],
    "related": [
      "s4-g5-t3"
    ],
    "lab": {
      "objective": "Separate endpoint EAP, authenticator decisions and policy-server transport. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → 802.1X fundamentals endpoint",
        "Boundary: Intended EAP identity validated → Authenticator applies correct role → Permitted and denied traffic verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare a disposable supplicant/access-port/server path with intended EAP-TLS identity/trust and a test VLAN/role. Preserve console management and original port policy. Configure explicit MAB/outage behavior only if the lab objective requires those exceptions.",
        "Use an owned invalid endpoint certificate and verify intended rejection. Separately make the server unavailable and record any designed critical-access behavior as an exception, then restore exact port/server policy.",
        "Correlate EAP method and identities, authenticator session/assigned role, intended allowed/denied traffic and restored console management.",
        "Open the 802.1X fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: MAB or an outage exception is not successful EAP-TLS authentication. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Server acceptance alone does not prove the desired VLAN or role. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Link-up and an authorized label do not prove application policy enforcement. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define EAP method, supplicant trust, server client mapping, assigned access policy and explicit outage behavior. Preserve the exact lab-port policy and console management before one fault. Verify authorized/denied traffic and authentication records separately."
      ],
      "verification": "Authorized display must be corroborated with intended permitted/denied traffic and identity evidence. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "MAB or an outage exception is not successful EAP-TLS authentication. Server acceptance alone does not prove the desired VLAN or role. Link-up and an authorized label do not prove application policy enforcement. Separate invalid inputs from a valid negative service result.",
      "challenge": "What must remain independent during the lab? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Intended EAP identity validated": "The selected method and expected endpoint/server identities pass policy.",
      "Authenticator applies correct role": "The consuming port installs the intended controlled access policy.",
      "Permitted and denied traffic verified": "The owned tests corroborate actual intended access boundaries."
    },
    "sources": [
      {
        "title": "RFC 9190",
        "url": "https://www.rfc-editor.org/rfc/rfc9190.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Who connects supplicant EAP to the policy server?",
        "answer": "The authenticator.",
        "explanation": "The access device mediates the local EAPOL exchange and commonly carries EAP through RADIUS.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Who connects supplicant EAP to the policy server?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-QC1"
      },
      {
        "question": "EAPOL uses UDP 1812 directly on the client link?",
        "answer": "No; EAPOL is Layer 2.",
        "explanation": "RADIUS transport belongs to the authenticator/server relationship rather than the endpoint EAPOL frame.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "EAPOL uses UDP 1812 directly on the client link?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-QC2"
      },
      {
        "question": "Link-up means controlled data port authorized?",
        "answer": "No.",
        "explanation": "Carrier and identity-based data access are distinct port states.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Link-up means controlled data port authorized?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "802.1X fundamentals — Who connects supplicant EAP to the policy server?",
        "answer": "The authenticator.",
        "explanation": "The access device mediates the local EAPOL exchange and commonly carries EAP through RADIUS.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Who connects supplicant EAP to the policy server?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q01",
        "options": [
          "The authoritative DNS resolver.",
          "The passive Syslog collector.",
          "The authenticator.",
          "The flow exporter."
        ]
      },
      {
        "question": "802.1X fundamentals — EAPOL uses UDP 1812 directly on the client link?",
        "answer": "No; EAPOL is Layer 2.",
        "explanation": "RADIUS transport belongs to the authenticator/server relationship rather than the endpoint EAPOL frame.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "EAPOL uses UDP 1812 directly on the client link?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q02"
      },
      {
        "question": "802.1X fundamentals — Link-up means controlled data port authorized?",
        "answer": "No.",
        "explanation": "Carrier and identity-based data access are distinct port states.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Link-up means controlled data port authorized?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q03"
      },
      {
        "question": "802.1X fundamentals — MAB success equivalent to EAP-TLS identity proof?",
        "answer": "No.",
        "explanation": "A copied MAC address has weaker identity assurance than validated certificate possession.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "MAB success equivalent to EAP-TLS identity proof?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q04"
      },
      {
        "question": "802.1X fundamentals — Should supplicant server validation be disabled for convenience?",
        "answer": "No.",
        "explanation": "Otherwise endpoint credentials or identity can be exposed to an unintended authentication server.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Should supplicant server validation be disabled for convenience?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q05"
      },
      {
        "question": "802.1X fundamentals — Server Accept guarantees correct VLAN applied?",
        "answer": "No.",
        "explanation": "The authenticator must support and install the returned policy on the intended port.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Server Accept guarantees correct VLAN applied?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q06"
      },
      {
        "question": "802.1X fundamentals — Critical-auth permits traffic during outage; authentication proved?",
        "answer": "No; it is an explicit exception.",
        "explanation": "Fail-open behavior must be documented and tested rather than counted as EAP success.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Critical-auth permits traffic during outage; authentication proved?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q07"
      },
      {
        "question": "802.1X fundamentals — How verify restored port policy?",
        "answer": "Correct method/identity, role and intended allowed/denied traffic all pass.",
        "explanation": "A session label alone omits the actual data-access boundary.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored port policy?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q08"
      },
      {
        "question": "802.1X fundamentals — What can cause repeated authentication churn?",
        "answer": "Method/certificate/time or policy problems, not only link failure.",
        "explanation": "Correlate authentication causes and timing before treating every retry as a physical fault.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What can cause repeated authentication churn?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q09"
      },
      {
        "question": "802.1X fundamentals — What must remain independent during the lab?",
        "answer": "Console management and the saved original port policy.",
        "explanation": "Recovery must not depend on the experimental access authentication succeeding.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What must remain independent during the lab?",
        "topicId": "s4-g5-t2",
        "questionId": "s4-g5-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g5-t3",
    "batch": "12",
    "title": "Network monitoring fundamentals",
    "subtitle": "Define a measurable service objective and distinguish silence from healthy state.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-monitoring",
    "definition": "Network monitoring gathers observations and evaluates conditions to support operational decisions. Availability, latency, loss, utilization and identity-policy outcomes describe different properties. A metric value is meaningful only with units, observer, interval and provenance. No-data can reflect collection failure, an absent object or actual inactivity; it must not automatically be rendered as zero or healthy. Alert delivery and response ownership are additional dependencies beyond detection.",
    "purpose": "Define a measurable service objective and distinguish silence from healthy state. Assign metric definitions, owners, thresholds, dependency suppression and retention. Keep raw observations separate from inferred incident causes. Preserve alert policy before one lab outage/no-data test and verify expected firing, notification and resolution.",
    "mental": "Use a three-column evidence notebook for Network monitoring fundamentals: prerequisite, observation and conclusion. Define the original service, client population and intended test before selecting signals. Polling device uptime, active probes, logs and flow summaries answer different questions. Combine user-facing checks and internal evidence without treating correlation as a proven cause. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Signal matches service objective: The selected observation measures a documented service property.",
      "Samples are fresh and interpretable: Units, interval, missingness and clock provenance are recorded.",
      "Alert and response path tested: Condition, notification and owner acknowledgement are supplied as verified.",
      "Observation point: Record observer wall time; this is not proof that the clock is synchronized.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Define the original service, client population and intended test before selecting signals. Polling device uptime, active probes, logs and flow summaries answer different questions. Combine user-facing checks and internal evidence without treating correlation as a proven cause.",
      "Record sample interval, timestamp and missingness. Counters need rates and discontinuity context; gauges describe values at samples. An average can hide tail delay or brief loss, and a stale green value is not current evidence.",
      "Define warning/critical duration, recovery threshold, no-data behavior and notification ownership. Test detection, notification and acknowledgement with an owned scenario, then verify recovery and suppressions. Dashboard visibility alone does not establish an effective response process.",
      "The first decisive boundary in this worksheet is Signal matches service objective. A ping or uptime metric alone may not represent the original user workflow.",
      "The later evidence boundaries are Samples are fresh and interpretable and Alert and response path tested. No-data or stale data must not silently become healthy zero. A visible dashboard is not a tested incident notification workflow."
    ],
    "flow": [
      [
        "Network monitoring fundamentals context",
        "Define a measurable service objective and distinguish silence from healthy state. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Signal matches service objective",
        "The selected observation measures a documented service property. A ping or uptime metric alone may not represent the original user workflow."
      ],
      [
        "Samples are fresh and interpretable",
        "Units, interval, missingness and clock provenance are recorded. No-data or stale data must not silently become healthy zero."
      ],
      [
        "Alert and response path tested",
        "Condition, notification and owner acknowledgement are supplied as verified. A visible dashboard is not a tested incident notification workflow."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Network monitoring fundamentals has an apparently healthy management path. Average latency low but users report delay; what else? Tail distribution and representative client/path evidence. Aggregates can hide the slow experiences relevant to the original service objective. Compare that observation with the separate recovery question: How verify alert recovery? Observed restoration, resolved condition and expected notification/owner behavior. A cleared graph without confirmed response semantics is incomplete operational evidence. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Monitoring has no single intrinsic port; collectors, agents, queries and synthetic probes use their own protocols.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "date -u",
        "platform": "Linux read-only clock observation · GUIDED NOT EXECUTED",
        "explanation": "Record observer wall time; this is not proof that the clock is synchronized.",
        "expected": "Timestamp provenance helps interpretation but requires separate synchronization evidence."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Network monitoring fundamentals settings, version and consuming attachment before any change. Assign metric definitions, owners, thresholds, dependency suppression and retention. Keep raw observations separate from inferred incident causes. Preserve alert policy before one lab outage/no-data test and verify expected firing, notification and resolution. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Assign metric definitions, owners, thresholds, dependency suppression and retention. Keep raw observations separate from inferred incident causes. Preserve alert policy before one lab outage/no-data test and verify expected firing, notification and resolution.",
    "troubleshooting": [
      [
        "Signal matches service objective boundary fails",
        "A ping or uptime metric alone may not represent the original user workflow. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Samples are fresh and interpretable boundary fails",
        "No-data or stale data must not silently become healthy zero. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Alert and response path tested boundary fails",
        "A visible dashboard is not a tested incident notification workflow. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Restrict monitoring credentials and sensitive telemetry access. A collector is a valuable administrative target; use least privilege and log changes to thresholds and alert-routing policy.",
    "performance": "What does higher cardinality cost? More series storage, query and ingestion work. Labels should serve decisions; per-request identifiers can create uncontrolled resource growth. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "A running device can host a failing service or broken authorization policy.",
      "Aggregates can hide the slow experiences relevant to the original service objective.",
      "Rate needs a time interval, units and continuity assumptions.",
      "Labels should serve decisions; per-request identifiers can create uncontrolled resource growth."
    ],
    "prerequisites": [
      "s4-g3-t2",
      "s4-g1-t1"
    ],
    "related": [
      "s4-g6-t0"
    ],
    "lab": {
      "objective": "Define a measurable service objective and distinguish silence from healthy state. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Network monitoring fundamentals endpoint",
        "Boundary: Signal matches service objective → Samples are fresh and interpretable → Alert and response path tested",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Define one owned service objective such as expected HTTPS body with identity checks enabled and an observation interval. Pair it with independent device/metric evidence; document units, no-data behavior, thresholds and response owner.",
        "Induce one owned service fault, then a distinct collector/no-data fault. Observe detection and notification rather than turning missingness into numeric zero; restore exact check and alert settings.",
        "Record sample timestamps, firing/pending/resolved states, recipient delivery and owner acknowledgement, including recovery suppression behavior.",
        "Open the Network monitoring fundamentals evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A ping or uptime metric alone may not represent the original user workflow. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: No-data or stale data must not silently become healthy zero. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A visible dashboard is not a tested incident notification workflow. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Assign metric definitions, owners, thresholds, dependency suppression and retention. Keep raw observations separate from inferred incident causes. Preserve alert policy before one lab outage/no-data test and verify expected firing, notification and resolution."
      ],
      "verification": "Timestamp provenance helps interpretation but requires separate synchronization evidence. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A ping or uptime metric alone may not represent the original user workflow. No-data or stale data must not silently become healthy zero. A visible dashboard is not a tested incident notification workflow. Separate invalid inputs from a valid negative service result.",
      "challenge": "What should an alert rule specify? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Signal matches service objective": "The selected observation measures a documented service property.",
      "Samples are fresh and interpretable": "Units, interval, missingness and clock provenance are recorded.",
      "Alert and response path tested": "Condition, notification and owner acknowledgement are supplied as verified."
    },
    "sources": [
      {
        "title": "Prometheus overview",
        "url": "https://prometheus.io/docs/introduction/overview/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does no-data necessarily mean zero load?",
        "answer": "No.",
        "explanation": "Collection failure or absent series can also explain missing samples.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does no-data necessarily mean zero load?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-QC1"
      },
      {
        "question": "Device uptime proves application available?",
        "answer": "No.",
        "explanation": "A running device can host a failing service or broken authorization policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Device uptime proves application available?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-QC2"
      },
      {
        "question": "Why define observer and interval?",
        "answer": "They determine what the measurement represents.",
        "explanation": "Values from different source paths or sampling windows cannot be compared as if equivalent.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why define observer and interval?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-QC3"
      }
    ],
    "exams": [
      {
        "question": "Network monitoring fundamentals — Does no-data necessarily mean zero load?",
        "answer": "No.",
        "explanation": "Collection failure or absent series can also explain missing samples.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does no-data necessarily mean zero load?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q01",
        "options": [
          "Only if the dashboard is green.",
          "No.",
          "Yes; no-data always proves zero load.",
          "Yes; collectors convert every missing sample to valid zero."
        ]
      },
      {
        "question": "Network monitoring fundamentals — Device uptime proves application available?",
        "answer": "No.",
        "explanation": "A running device can host a failing service or broken authorization policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Device uptime proves application available?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q02"
      },
      {
        "question": "Network monitoring fundamentals — Why define observer and interval?",
        "answer": "They determine what the measurement represents.",
        "explanation": "Values from different source paths or sampling windows cannot be compared as if equivalent.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why define observer and interval?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q03"
      },
      {
        "question": "Network monitoring fundamentals — Average latency low but users report delay; what else?",
        "answer": "Tail distribution and representative client/path evidence.",
        "explanation": "Aggregates can hide the slow experiences relevant to the original service objective.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Average latency low but users report delay; what else?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q04"
      },
      {
        "question": "Network monitoring fundamentals — Metric correlates with outage; cause proved?",
        "answer": "No.",
        "explanation": "Correlation guides hypotheses; intervention or independent causal evidence is still needed.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Metric correlates with outage; cause proved?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q05"
      },
      {
        "question": "Network monitoring fundamentals — Counter raw value equals current rate?",
        "answer": "No.",
        "explanation": "Rate needs a time interval, units and continuity assumptions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Counter raw value equals current rate?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q06"
      },
      {
        "question": "Network monitoring fundamentals — Dashboard green but last sample old; healthy now?",
        "answer": "Insufficient evidence.",
        "explanation": "Freshness is part of a status conclusion rather than an optional decoration.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Dashboard green but last sample old; healthy now?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q07"
      },
      {
        "question": "Network monitoring fundamentals — How verify alert recovery?",
        "answer": "Observed restoration, resolved condition and expected notification/owner behavior.",
        "explanation": "A cleared graph without confirmed response semantics is incomplete operational evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify alert recovery?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q08"
      },
      {
        "question": "Network monitoring fundamentals — What does higher cardinality cost?",
        "answer": "More series storage, query and ingestion work.",
        "explanation": "Labels should serve decisions; per-request identifiers can create uncontrolled resource growth.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What does higher cardinality cost?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q09"
      },
      {
        "question": "Network monitoring fundamentals — What should an alert rule specify?",
        "answer": "Meaning, duration, no-data policy, owner and a tested response.",
        "explanation": "A threshold without ownership and failure behavior is a number rather than an operational plan.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What should an alert rule specify?",
        "topicId": "s4-g5-t3",
        "questionId": "s4-g5-t3-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g6-t0",
    "batch": "12",
    "title": "PRTG",
    "subtitle": "Map a sensor to its probe, target and notification dependency.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-prtg",
    "definition": "PRTG organizes monitoring around objects such as devices and sensors, with probes performing checks and a core handling data and user-facing management. A sensor represents a particular check or measurement, not an entire device guarantee. Probe reachability, target credentials, individual sensor behavior and notification triggers are separate dependencies. Product editions, licensing, supported sensor types and sizing guidance can change; verify them for the chosen release before deployment.",
    "purpose": "Map a sensor to its probe, target and notification dependency. Plan probe placement, sensor definition, least-privilege credentials, inheritance and dependencies. Preserve a test sensor and notification policy before one outage scenario; restore it and verify fresh results plus notification recovery.",
    "mental": "Use a three-column evidence notebook for PRTG: prerequisite, observation and conclusion. Identify the probe that runs the sensor and the exact target/interface/service it observes. A central server reaching a host does not establish that a remote probe has the same route or credentials. Sensor requirements differ by protocol and operating environment. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Intended probe can run check: Probe location and required credentials/support match the sensor.",
      "Sensor reports fresh intended data: The check is running with correct units and current results.",
      "Notification workflow verified: Trigger, recipient and recovery behavior are corroborated.",
      "Observation point: Read the actual observer, interval, channels and dependencies; no installation is performed.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the probe that runs the sensor and the exact target/interface/service it observes. A central server reaching a host does not establish that a remote probe has the same route or credentials. Sensor requirements differ by protocol and operating environment.",
      "Read sensor status, channel units, interval and last data/error. Inherited settings and dependencies can pause/suppress observations; a paused sensor is not a measured healthy service. Avoid counting missing data as a successful transaction.",
      "Test a harmless owned sensor failure, notification trigger and recovery. Compare probe result, central status and delivered notification. Verify edition/license and resource sizing against current vendor guidance rather than prescribing a universal sensor allowance.",
      "The first decisive boundary in this worksheet is Intended probe can run check. Core reachability alone does not establish the remote probe path.",
      "The later evidence boundaries are Sensor reports fresh intended data and Notification workflow verified. Paused or stale sensor state is not a fresh healthy measurement. A red sensor does not prove an alert reached its responsible operator."
    ],
    "flow": [
      [
        "PRTG context",
        "Map a sensor to its probe, target and notification dependency. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Intended probe can run check",
        "Probe location and required credentials/support match the sensor. Core reachability alone does not establish the remote probe path."
      ],
      [
        "Sensor reports fresh intended data",
        "The check is running with correct units and current results. Paused or stale sensor state is not a fresh healthy measurement."
      ],
      [
        "Notification workflow verified",
        "Trigger, recipient and recovery behavior are corroborated. A red sensor does not prove an alert reached its responsible operator."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating PRTG has an apparently healthy management path. Red sensor but no email; inspect what? Notification triggers, dependencies and delivery evidence. Detection and notification are separate operational paths. Compare that observation with the separate recovery question: How verify restored monitoring? Fresh intended sensor data plus notification/recovery behavior. A probe-online label alone misses check-specific and recipient failures. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Target-check ports depend on the sensor; probe/core and UI connections are product configuration. No universal port proves all PRTG checks.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "Open the owned sensor: Overview → latest result/error; inspect its probe and inherited settings.",
        "platform": "PRTG prepared lab UI; guided not executed · GUIDED NOT EXECUTED",
        "explanation": "Read the actual observer, interval, channels and dependencies; no installation is performed.",
        "expected": "Sensor status is scoped to that check, and notification delivery needs separate receiver evidence."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior PRTG settings, version and consuming attachment before any change. Plan probe placement, sensor definition, least-privilege credentials, inheritance and dependencies. Preserve a test sensor and notification policy before one outage scenario; restore it and verify fresh results plus notification recovery. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Plan probe placement, sensor definition, least-privilege credentials, inheritance and dependencies. Preserve a test sensor and notification policy before one outage scenario; restore it and verify fresh results plus notification recovery.",
    "troubleshooting": [
      [
        "Intended probe can run check boundary fails",
        "Core reachability alone does not establish the remote probe path. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Sensor reports fresh intended data boundary fails",
        "Paused or stale sensor state is not a fresh healthy measurement. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Notification workflow verified boundary fails",
        "A red sensor does not prove an alert reached its responsible operator. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Protect probe/core credentials and restrict administrative UI/API access. Do not reuse broad domain-administrator privileges for a narrowly scoped check; redact sensor outputs containing identity or endpoint details.",
    "performance": "Can a universal sensor count guarantee sizing? No. Check type, interval, infrastructure and current vendor guidance affect resource requirements. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Probe routing, filtering and credentials can differ from the central server.",
      "Detection and notification are separate operational paths.",
      "Release/edition/environment support and licensing must be checked in current vendor material.",
      "Check type, interval, infrastructure and current vendor guidance affect resource requirements."
    ],
    "prerequisites": [
      "s4-g5-t3"
    ],
    "related": [
      "s4-g6-t1"
    ],
    "lab": {
      "objective": "Map a sensor to its probe, target and notification dependency. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → PRTG endpoint",
        "Boundary: Intended probe can run check → Sensor reports fresh intended data → Notification workflow verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an already prepared PRTG lab installation, create an owned sensor on the intended local/remote probe for one disposable target. Set explicit units/interval and inspect inherited credentials and dependencies; verify current edition support.",
        "Make only the owned target/check fail, then separately pause the sensor or remove collection. Observe the distinction from healthy data and the actual notification trigger behavior; restore exact policy.",
        "Verify fresh same-probe sensor results, intended alert recipient and recovery handling. Remove only the owned sensor/test credential after retaining redacted evidence.",
        "Open the PRTG evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Core reachability alone does not establish the remote probe path. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Paused or stale sensor state is not a fresh healthy measurement. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A red sensor does not prove an alert reached its responsible operator. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan probe placement, sensor definition, least-privilege credentials, inheritance and dependencies. Preserve a test sensor and notification policy before one outage scenario; restore it and verify fresh results plus notification recovery."
      ],
      "verification": "Sensor status is scoped to that check, and notification delivery needs separate receiver evidence. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Core reachability alone does not establish the remote probe path. Paused or stale sensor state is not a fresh healthy measurement. A red sensor does not prove an alert reached its responsible operator. Separate invalid inputs from a valid negative service result.",
      "challenge": "What record belongs with a sensor? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Intended probe can run check": "Probe location and required credentials/support match the sensor.",
      "Sensor reports fresh intended data": "The check is running with correct units and current results.",
      "Notification workflow verified": "Trigger, recipient and recovery behavior are corroborated."
    },
    "sources": [
      {
        "title": "PRTG manual",
        "url": "https://www.paessler.com/manuals/prtg",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "A sensor represents universal device health?",
        "answer": "No; it is a particular check.",
        "explanation": "Device-wide conclusions require multiple scoped observations and an explicit service objective.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A sensor represents universal device health?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-QC1"
      },
      {
        "question": "Core reaches host, remote probe necessarily can?",
        "answer": "No.",
        "explanation": "Probe routing, filtering and credentials can differ from the central server.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Core reaches host, remote probe necessarily can?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-QC2"
      },
      {
        "question": "Paused sensor means target healthy?",
        "answer": "No.",
        "explanation": "A paused check supplies no fresh health measurement under that pause condition.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Paused sensor means target healthy?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "PRTG — A sensor represents universal device health?",
        "answer": "No; it is a particular check.",
        "explanation": "Device-wide conclusions require multiple scoped observations and an explicit service objective.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "A sensor represents universal device health?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q01",
        "options": [
          "No; it is a particular check.",
          "Yes; one sensor guarantees every device service.",
          "Yes; every sensor authenticates every application.",
          "Only when the core is reachable."
        ]
      },
      {
        "question": "PRTG — Core reaches host, remote probe necessarily can?",
        "answer": "No.",
        "explanation": "Probe routing, filtering and credentials can differ from the central server.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Core reaches host, remote probe necessarily can?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q02"
      },
      {
        "question": "PRTG — Paused sensor means target healthy?",
        "answer": "No.",
        "explanation": "A paused check supplies no fresh health measurement under that pause condition.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Paused sensor means target healthy?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q03"
      },
      {
        "question": "PRTG — Red sensor but no email; inspect what?",
        "answer": "Notification triggers, dependencies and delivery evidence.",
        "explanation": "Detection and notification are separate operational paths.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Red sensor but no email; inspect what?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q04"
      },
      {
        "question": "PRTG — Inherited credentials irrelevant to a child sensor?",
        "answer": "No.",
        "explanation": "Inheritance can determine the identity used by a check and must be inspected at its consumer.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Inherited credentials irrelevant to a child sensor?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q05"
      },
      {
        "question": "PRTG — Every sensor type supported identically in every edition?",
        "answer": "No.",
        "explanation": "Release/edition/environment support and licensing must be checked in current vendor material.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Every sensor type supported identically in every edition?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q06"
      },
      {
        "question": "PRTG — Ping sensor proves protected web content correct?",
        "answer": "No.",
        "explanation": "An echo measurement has narrower semantics than an authenticated application request.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Ping sensor proves protected web content correct?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q07"
      },
      {
        "question": "PRTG — How verify restored monitoring?",
        "answer": "Fresh intended sensor data plus notification/recovery behavior.",
        "explanation": "A probe-online label alone misses check-specific and recipient failures.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored monitoring?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q08"
      },
      {
        "question": "PRTG — Can a universal sensor count guarantee sizing?",
        "answer": "No.",
        "explanation": "Check type, interval, infrastructure and current vendor guidance affect resource requirements.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Can a universal sensor count guarantee sizing?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q09"
      },
      {
        "question": "PRTG — What record belongs with a sensor?",
        "answer": "Probe, target, check/units, credentials scope, interval, owner and dependencies.",
        "explanation": "Those fields make a sensor result operationally interpretable rather than a generic status light.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What record belongs with a sensor?",
        "topicId": "s4-g6-t0",
        "questionId": "s4-g6-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g6-t1",
    "batch": "12",
    "title": "Zabbix",
    "subtitle": "Follow an item value through trigger evaluation to an owned action.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-zabbix",
    "definition": "Zabbix collects values through configured items and evaluates trigger expressions that can create events and invoke actions. Agents, SNMP checks and other item types observe different properties. A proxy can collect and buffer data in a remote context before passing it to the server. A current item value, trigger problem and delivered action are distinct stages; an accessible frontend does not prove any of them.",
    "purpose": "Follow an item value through trigger evaluation to an owned action. Plan template inheritance, host identities, item support, proxy placement and response ownership. Preserve item/trigger/action settings before one lab fault. Verify observed data and configured expressions under the actual release instead of assuming template names prove correctness.",
    "mental": "Use a three-column evidence notebook for Zabbix: prerequisite, observation and conclusion. Identify host, item key/type, units, interval and actual collection endpoint. Passive and active agent designs differ in initiation and configuration. Unsupported item state or missing data is not automatically a zero measurement. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Item collection valid: Configured host/item type, observer and supported key match.",
      "Trigger uses current intended data: Expression, window and missing-data semantics match the objective.",
      "Action delivery corroborated: Matching event/action and responsible recipient evidence are present.",
      "Observation point: Trace item timestamps, evaluation and actual recipient delivery independently.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify host, item key/type, units, interval and actual collection endpoint. Passive and active agent designs differ in initiation and configuration. Unsupported item state or missing data is not automatically a zero measurement.",
      "Evaluate the actual trigger expression, time window and dependencies against collected data. Maintenance and suppression can alter event/notification handling. A host ping should not be substituted for an application item simply to obtain a green display.",
      "Follow a problem event through action conditions, recipient permissions and delivery. Proxy buffering can delay visibility; preserve event/data timestamps. Test one owned item fault and restoration, then verify trigger resolution and action behavior.",
      "The first decisive boundary in this worksheet is Item collection valid. An unsupported item can have no valid value even while the host is reachable.",
      "The later evidence boundaries are Trigger uses current intended data and Action delivery corroborated. An old value or wrong expression can conceal the original condition. A problem event alone does not prove the notification action completed."
    ],
    "flow": [
      [
        "Zabbix context",
        "Follow an item value through trigger evaluation to an owned action. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Item collection valid",
        "Configured host/item type, observer and supported key match. An unsupported item can have no valid value even while the host is reachable."
      ],
      [
        "Trigger uses current intended data",
        "Expression, window and missing-data semantics match the objective. An old value or wrong expression can conceal the original condition."
      ],
      [
        "Action delivery corroborated",
        "Matching event/action and responsible recipient evidence are present. A problem event alone does not prove the notification action completed."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Zabbix has an apparently healthy management path. Problem appears but recipient gets nothing; next stage? Action conditions, permissions and delivery history. Detection and notification have independently configured dependencies. Compare that observation with the separate recovery question: How demonstrate restored alerting? Fresh item values, correct trigger resolution and intended action behavior. A host availability icon alone omits the item-to-event-to-recipient chain. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Conventional agent TCP 10050 and server/proxy TCP 10051 depend on passive/active configuration; SNMP and application checks use their own transports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "Open Latest data for the owned item, then inspect its trigger event and action history.",
        "platform": "Zabbix prepared lab UI; guided not executed · GUIDED NOT EXECUTED",
        "explanation": "Trace item timestamps, evaluation and actual recipient delivery independently.",
        "expected": "Frontend login and host presence do not prove current item collection or delivered notifications."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Zabbix settings, version and consuming attachment before any change. Plan template inheritance, host identities, item support, proxy placement and response ownership. Preserve item/trigger/action settings before one lab fault. Verify observed data and configured expressions under the actual release instead of assuming template names prove correctness. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Plan template inheritance, host identities, item support, proxy placement and response ownership. Preserve item/trigger/action settings before one lab fault. Verify observed data and configured expressions under the actual release instead of assuming template names prove correctness.",
    "troubleshooting": [
      [
        "Item collection valid boundary fails",
        "An unsupported item can have no valid value even while the host is reachable. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Trigger uses current intended data boundary fails",
        "An old value or wrong expression can conceal the original condition. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Action delivery corroborated boundary fails",
        "A problem event alone does not prove the notification action completed. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Limit agent access and remote-command features, protect server/proxy credentials and use supported transport protection. Control frontend privileges and avoid exposing secret-bearing item data in shared screenshots.",
    "performance": "Why tune item interval and history retention? They affect detection granularity, collection and storage work. More samples are not automatically more useful or sustainable. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "UI access is distinct from agent, proxy, server and item processing.",
      "Detection and notification have independently configured dependencies.",
      "Their connection direction and configuration requirements differ.",
      "More samples are not automatically more useful or sustainable."
    ],
    "prerequisites": [
      "s4-g5-t3"
    ],
    "related": [
      "s4-g6-t2"
    ],
    "lab": {
      "objective": "Follow an item value through trigger evaluation to an owned action. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Zabbix endpoint",
        "Boundary: Item collection valid → Trigger uses current intended data → Action delivery corroborated",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an already prepared lab server/proxy, create one owned host/item with explicit key/type/units and one trigger expression with duration/no-data policy. Attach a bounded action to a test recipient.",
        "Cause the owned item to fail or become unsupported, separately from a valid zero. Preserve event/time and action history, then restore the item/trigger/action settings.",
        "Verify fresh item data, intended problem and resolution, action delivery and proxy timestamp context; remove only owned objects.",
        "Open the Zabbix evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: An unsupported item can have no valid value even while the host is reachable. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: An old value or wrong expression can conceal the original condition. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A problem event alone does not prove the notification action completed. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan template inheritance, host identities, item support, proxy placement and response ownership. Preserve item/trigger/action settings before one lab fault. Verify observed data and configured expressions under the actual release instead of assuming template names prove correctness."
      ],
      "verification": "Frontend login and host presence do not prove current item collection or delivered notifications. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "An unsupported item can have no valid value even while the host is reachable. An old value or wrong expression can conceal the original condition. A problem event alone does not prove the notification action completed. Separate invalid inputs from a valid negative service result.",
      "challenge": "What must a fault record name? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Item collection valid": "Configured host/item type, observer and supported key match.",
      "Trigger uses current intended data": "Expression, window and missing-data semantics match the objective.",
      "Action delivery corroborated": "Matching event/action and responsible recipient evidence are present."
    },
    "sources": [
      {
        "title": "Zabbix manual introduction",
        "url": "https://www.zabbix.com/documentation/current/en/manual/introduction",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Item and trigger the same object?",
        "answer": "No.",
        "explanation": "An item collects a value; a trigger evaluates a condition over data.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Item and trigger the same object?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-QC1"
      },
      {
        "question": "Frontend reachable proves collection healthy?",
        "answer": "No.",
        "explanation": "UI access is distinct from agent, proxy, server and item processing.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Frontend reachable proves collection healthy?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-QC2"
      },
      {
        "question": "Unsupported item should be treated as zero?",
        "answer": "No.",
        "explanation": "Unsupported or missing data needs explicit handling and is not a valid numeric sample.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Unsupported item should be treated as zero?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "Zabbix — Item and trigger the same object?",
        "answer": "No.",
        "explanation": "An item collects a value; a trigger evaluates a condition over data.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Item and trigger the same object?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q01",
        "options": [
          "Yes; an item is its notification recipient.",
          "Yes; every collected item is automatically a problem.",
          "Only when an agent is passive.",
          "No."
        ]
      },
      {
        "question": "Zabbix — Frontend reachable proves collection healthy?",
        "answer": "No.",
        "explanation": "UI access is distinct from agent, proxy, server and item processing.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Frontend reachable proves collection healthy?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q02"
      },
      {
        "question": "Zabbix — Unsupported item should be treated as zero?",
        "answer": "No.",
        "explanation": "Unsupported or missing data needs explicit handling and is not a valid numeric sample.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Unsupported item should be treated as zero?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q03"
      },
      {
        "question": "Zabbix — Problem appears but recipient gets nothing; next stage?",
        "answer": "Action conditions, permissions and delivery history.",
        "explanation": "Detection and notification have independently configured dependencies.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Problem appears but recipient gets nothing; next stage?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q04"
      },
      {
        "question": "Zabbix — Proxy buffering can affect which observation?",
        "answer": "When central data/events become visible.",
        "explanation": "Preserve sample and receive times to distinguish collection from transfer delay.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Proxy buffering can affect which observation?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q05"
      },
      {
        "question": "Zabbix — Active/passive agent initiation identical?",
        "answer": "No.",
        "explanation": "Their connection direction and configuration requirements differ.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Active/passive agent initiation identical?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q06"
      },
      {
        "question": "Zabbix — Template attached proves all items meaningful?",
        "answer": "No.",
        "explanation": "Actual supported keys, targets, credentials and data must be verified at the host.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Template attached proves all items meaningful?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q07"
      },
      {
        "question": "Zabbix — How demonstrate restored alerting?",
        "answer": "Fresh item values, correct trigger resolution and intended action behavior.",
        "explanation": "A host availability icon alone omits the item-to-event-to-recipient chain.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How demonstrate restored alerting?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q08"
      },
      {
        "question": "Zabbix — Why tune item interval and history retention?",
        "answer": "They affect detection granularity, collection and storage work.",
        "explanation": "More samples are not automatically more useful or sustainable.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why tune item interval and history retention?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q09"
      },
      {
        "question": "Zabbix — What must a fault record name?",
        "answer": "Host, item key/type, timestamp, trigger expression, event and action.",
        "explanation": "Scope prevents a generic host state being mistaken for a specific service measurement.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What must a fault record name?",
        "topicId": "s4-g6-t1",
        "questionId": "s4-g6-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g6-t2",
    "batch": "12",
    "title": "LibreNMS",
    "subtitle": "Separate inventory discovery, successful polling and retained time-series evidence.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-librenms",
    "definition": "LibreNMS provides network-device discovery, polling, historical graphs and alerting with supported device/OS integrations. Discovery can identify a device and its objects, while polling obtains current values and storage maintains history. A discovered hostname does not prove successful authenticated polling or meaningful graph continuity. Supported modules and field interpretation differ by device OS and product version.",
    "purpose": "Separate inventory discovery, successful polling and retained time-series evidence. Plan supported device inventory, SNMPv3 credentials/views, poller placement, storage and alerts. Preserve exact device settings and graph mapping before one controlled fault. Confirm OS support and deployment prerequisites using current documentation.",
    "mental": "Use a three-column evidence notebook for LibreNMS: prerequisite, observation and conclusion. Identify the actual device OS support, management endpoint and SNMP identity/view. Discovery populates inventory and object mapping; missing or misidentified interfaces can affect later graphs even if the device responds. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Device objects mapped correctly: Supported OS and intended OID/instance mapping are known.",
      "Poller obtains fresh values: The intended observer and credentials yield current data.",
      "History and alerts corroborated: Retained samples and intended alert delivery are observed.",
      "Observation point: Read discovery, polling and storage evidence as distinct stages.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the actual device OS support, management endpoint and SNMP identity/view. Discovery populates inventory and object mapping; missing or misidentified interfaces can affect later graphs even if the device responds.",
      "Inspect poller execution, last poll time and errors along with instance/counter mapping. A graph gap can result from poll failure, storage failure or a changed instance. Correlate device-side management evidence before calling every empty graph a traffic outage.",
      "Follow retained values and alert rules to recipient evidence. Distributed polling and storage design must match the chosen deployment. Test an owned view fault, restore it and verify fresh values and continuity without resetting unrelated history.",
      "The first decisive boundary in this worksheet is Device objects mapped correctly. Wrong discovery or instance mapping can mislabel later values.",
      "The later evidence boundaries are Poller obtains fresh values and History and alerts corroborated. A discovered device can still fail actual polling. Fresh polling alone does not establish stored history or recipient delivery."
    ],
    "flow": [
      [
        "LibreNMS context",
        "Separate inventory discovery, successful polling and retained time-series evidence. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Device objects mapped correctly",
        "Supported OS and intended OID/instance mapping are known. Wrong discovery or instance mapping can mislabel later values."
      ],
      [
        "Poller obtains fresh values",
        "The intended observer and credentials yield current data. A discovered device can still fail actual polling."
      ],
      [
        "History and alerts corroborated",
        "Retained samples and intended alert delivery are observed. Fresh polling alone does not establish stored history or recipient delivery."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating LibreNMS has an apparently healthy management path. Device responds, last poll stale; inspect what? Poller scheduling, credentials/view and error evidence. Reachability does not prove the collector obtained the selected objects. Compare that observation with the separate recovery question: How verify restored view? Poll intended objects, check fresh timestamps/history and intended denied scope. Widening all access can erase least privilege while making a graph populate. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "SNMP polling conventionally UDP 161; notification and UI transports are separate. Distributed poller/storage connections depend on deployment.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "Inspect the owned device last poll/error and compare interface instance mapping with graph timestamps.",
        "platform": "LibreNMS prepared lab UI; guided not executed · GUIDED NOT EXECUTED",
        "explanation": "Read discovery, polling and storage evidence as distinct stages.",
        "expected": "A discovered device or graph frame does not establish fresh values or alert delivery."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior LibreNMS settings, version and consuming attachment before any change. Plan supported device inventory, SNMPv3 credentials/views, poller placement, storage and alerts. Preserve exact device settings and graph mapping before one controlled fault. Confirm OS support and deployment prerequisites using current documentation. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Plan supported device inventory, SNMPv3 credentials/views, poller placement, storage and alerts. Preserve exact device settings and graph mapping before one controlled fault. Confirm OS support and deployment prerequisites using current documentation.",
    "troubleshooting": [
      [
        "Device objects mapped correctly boundary fails",
        "Wrong discovery or instance mapping can mislabel later values. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Poller obtains fresh values boundary fails",
        "A discovered device can still fail actual polling. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "History and alerts corroborated boundary fails",
        "Fresh polling alone does not establish stored history or recipient delivery. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Use least-privilege management access and restrict poller/UI credentials. Inventory and graphs disclose topology and traffic patterns. A successful discovery record is not endpoint authentication or permission to modify the device.",
    "performance": "What affects poller capacity? Device/object count, check cost, interval and storage design. A static device count does not establish sustainable collection latency. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "OS support and OID/instance interpretation still need verification.",
      "Reachability does not prove the collector obtained the selected objects.",
      "Discovery and polling behavior depend on maintained integrations and actual version compatibility.",
      "A static device count does not establish sustainable collection latency."
    ],
    "prerequisites": [
      "s4-g1-t0",
      "s4-g5-t3"
    ],
    "related": [
      "s4-g6-t3"
    ],
    "lab": {
      "objective": "Separate inventory discovery, successful polling and retained time-series evidence. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → LibreNMS endpoint",
        "Boundary: Device objects mapped correctly → Poller obtains fresh values → History and alerts corroborated",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an already prepared LibreNMS lab, add one supported owned device with least-privilege SNMP view and expected interface mapping. Record discovery results, last poll/error and graph timestamps.",
        "Deny only the owned test OID view while maintaining reachability. Compare discovery presence with failed fresh polling, then restore the view without resetting unrelated history.",
        "Verify exact object/instance, fresh values/history continuity and tested alert/recipient recovery. Remove only owned lab device/credentials.",
        "Open the LibreNMS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Wrong discovery or instance mapping can mislabel later values. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A discovered device can still fail actual polling. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Fresh polling alone does not establish stored history or recipient delivery. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan supported device inventory, SNMPv3 credentials/views, poller placement, storage and alerts. Preserve exact device settings and graph mapping before one controlled fault. Confirm OS support and deployment prerequisites using current documentation."
      ],
      "verification": "A discovered device or graph frame does not establish fresh values or alert delivery. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Wrong discovery or instance mapping can mislabel later values. A discovered device can still fail actual polling. Fresh polling alone does not establish stored history or recipient delivery. Separate invalid inputs from a valid negative service result.",
      "challenge": "What evidence isolates a graph gap? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Device objects mapped correctly": "Supported OS and intended OID/instance mapping are known.",
      "Poller obtains fresh values": "The intended observer and credentials yield current data.",
      "History and alerts corroborated": "Retained samples and intended alert delivery are observed."
    },
    "sources": [
      {
        "title": "LibreNMS documentation",
        "url": "https://docs.librenms.org/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Discovered hostname proves current polling?",
        "answer": "No.",
        "explanation": "Inventory discovery and repeated value collection are separate operations.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Discovered hostname proves current polling?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-QC1"
      },
      {
        "question": "SNMP success means every interface mapped correctly?",
        "answer": "No.",
        "explanation": "OS support and OID/instance interpretation still need verification.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "SNMP success means every interface mapped correctly?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-QC2"
      },
      {
        "question": "Empty graph necessarily zero traffic?",
        "answer": "No.",
        "explanation": "Missing polling or storage data can explain the gap.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Empty graph necessarily zero traffic?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "LibreNMS — Discovered hostname proves current polling?",
        "answer": "No.",
        "explanation": "Inventory discovery and repeated value collection are separate operations.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Discovered hostname proves current polling?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q01",
        "options": [
          "Yes; a hostname proves every graph current.",
          "Only when a ping responds.",
          "No.",
          "Yes; discovery continuously polls every object."
        ]
      },
      {
        "question": "LibreNMS — SNMP success means every interface mapped correctly?",
        "answer": "No.",
        "explanation": "OS support and OID/instance interpretation still need verification.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "SNMP success means every interface mapped correctly?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q02"
      },
      {
        "question": "LibreNMS — Empty graph necessarily zero traffic?",
        "answer": "No.",
        "explanation": "Missing polling or storage data can explain the gap.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Empty graph necessarily zero traffic?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q03"
      },
      {
        "question": "LibreNMS — Device responds, last poll stale; inspect what?",
        "answer": "Poller scheduling, credentials/view and error evidence.",
        "explanation": "Reachability does not prove the collector obtained the selected objects.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Device responds, last poll stale; inspect what?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q04"
      },
      {
        "question": "LibreNMS — Changing instance index can affect history?",
        "answer": "Yes.",
        "explanation": "Different object mapping can disconnect or mislabel comparisons across intervals.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Changing instance index can affect history?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q05"
      },
      {
        "question": "LibreNMS — Every network OS equally supported?",
        "answer": "No.",
        "explanation": "Discovery and polling behavior depend on maintained integrations and actual version compatibility.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Every network OS equally supported?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q06"
      },
      {
        "question": "LibreNMS — Fresh values automatically prove alert delivery?",
        "answer": "No.",
        "explanation": "Alert rule and recipient paths are separate from data collection.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Fresh values automatically prove alert delivery?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q07"
      },
      {
        "question": "LibreNMS — How verify restored view?",
        "answer": "Poll intended objects, check fresh timestamps/history and intended denied scope.",
        "explanation": "Widening all access can erase least privilege while making a graph populate.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored view?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q08"
      },
      {
        "question": "LibreNMS — What affects poller capacity?",
        "answer": "Device/object count, check cost, interval and storage design.",
        "explanation": "A static device count does not establish sustainable collection latency.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What affects poller capacity?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q09"
      },
      {
        "question": "LibreNMS — What evidence isolates a graph gap?",
        "answer": "Instance mapping, poll timestamps/errors and storage continuity.",
        "explanation": "Those records distinguish missing observation from actual zero load.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What evidence isolates a graph gap?",
        "topicId": "s4-g6-t2",
        "questionId": "s4-g6-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g6-t3",
    "batch": "12",
    "title": "Grafana",
    "subtitle": "Trace a displayed panel to its query, data source and alert failure policy.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-grafana",
    "definition": "Grafana queries configured data sources and presents results through panels, dashboards and supported alert evaluation. It is not inherently the collector that scraped every displayed metric. A panel depends on data-source connectivity/permissions, query/variables/time range and incoming data semantics. A beautiful empty chart can indicate no matching series or a failed query rather than healthy infrastructure.",
    "purpose": "Trace a displayed panel to its query, data source and alert failure policy. Define datasource access, panel query/unit/time range, alert semantics and recipient owner. Avoid exporting dashboards with secrets. Verify the actual data and an independent source query before interpreting panel colors as measured service health.",
    "mental": "Use a three-column evidence notebook for Grafana: prerequisite, observation and conclusion. Identify data source, query language, selected variables, time range and timezone. The displayed aggregation can hide tail behavior or combine unlike series. Match units and sample freshness to the documented measurement objective. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Datasource query authorized: The intended backend connection and query permissions work.",
      "Query represents current objective: Variables, units, interval and returned samples match the intended measurement.",
      "Alert failure policy and delivery tested: No-data/error behavior and recipient recovery are corroborated.",
      "Observation point: Record datasource, variables, units, time range and no-data/error policy.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify data source, query language, selected variables, time range and timezone. The displayed aggregation can hide tail behavior or combine unlike series. Match units and sample freshness to the documented measurement objective.",
      "Distinguish query error, no-data and numeric zero. Panel transformations and overrides can change display without changing stored source data. A datasource connection test does not establish that the intended query returns meaningful current results.",
      "Alert rules have their own evaluation, pending duration and no-data/error policy and may not reproduce a viewer-specific panel context. Test an owned query result, an empty/error case and recipient recovery. Preserve data-source/alert settings and restore the exact query.",
      "The first decisive boundary in this worksheet is Datasource query authorized. A loaded dashboard shell does not establish datasource access.",
      "The later evidence boundaries are Query represents current objective and Alert failure policy and delivery tested. An empty selection or stale series must not be mistaken for healthy zero. A panel threshold color is not automatically the alert rule or notification result."
    ],
    "flow": [
      [
        "Grafana context",
        "Trace a displayed panel to its query, data source and alert failure policy. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Datasource query authorized",
        "The intended backend connection and query permissions work. A loaded dashboard shell does not establish datasource access."
      ],
      [
        "Query represents current objective",
        "Variables, units, interval and returned samples match the intended measurement. An empty selection or stale series must not be mistaken for healthy zero."
      ],
      [
        "Alert failure policy and delivery tested",
        "No-data/error behavior and recipient recovery are corroborated. A panel threshold color is not automatically the alert rule or notification result."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Grafana has an apparently healthy management path. Panel and alert necessarily use identical viewer context? No. Alert evaluation has its own configuration and supported query context. Compare that observation with the separate recovery question: How verify restoration? Correct original query/data plus expected alert/error/recovery delivery. Changing to a different datasource or ignoring query errors can hide the original fault. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Grafana UI port and backend data-source transports are configurable. It has no single port that proves all displayed data or alert delivery.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "Inspect panel query and data inspection, then compare alert evaluation and notification history.",
        "platform": "Grafana prepared lab UI; guided not executed · GUIDED NOT EXECUTED",
        "explanation": "Record datasource, variables, units, time range and no-data/error policy.",
        "expected": "A rendered panel or datasource test alone is not verified measurement or recipient delivery."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Grafana settings, version and consuming attachment before any change. Define datasource access, panel query/unit/time range, alert semantics and recipient owner. Avoid exporting dashboards with secrets. Verify the actual data and an independent source query before interpreting panel colors as measured service health. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define datasource access, panel query/unit/time range, alert semantics and recipient owner. Avoid exporting dashboards with secrets. Verify the actual data and an independent source query before interpreting panel colors as measured service health.",
    "troubleshooting": [
      [
        "Datasource query authorized boundary fails",
        "A loaded dashboard shell does not establish datasource access. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Query represents current objective boundary fails",
        "An empty selection or stale series must not be mistaken for healthy zero. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Alert failure policy and delivery tested boundary fails",
        "A panel threshold color is not automatically the alert rule or notification result. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Restrict datasource credentials and dashboard/alert edit rights. A viewer should not gain broad backend query privileges merely to open one panel; inspect supported authorization behavior for the actual deployment.",
    "performance": "What influences query cost? Time range, series cardinality, aggregation and backend capability. Dashboard appearance does not certify backend resource use or responsiveness. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "No matching data and numeric zero have different semantics.",
      "Alert evaluation has its own configuration and supported query context.",
      "Collection failure can otherwise become silent or misleading status.",
      "Dashboard appearance does not certify backend resource use or responsiveness."
    ],
    "prerequisites": [
      "s4-g5-t3"
    ],
    "related": [
      "s4-g6-t4"
    ],
    "lab": {
      "objective": "Trace a displayed panel to its query, data source and alert failure policy. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Grafana endpoint",
        "Boundary: Datasource query authorized → Query represents current objective → Alert failure policy and delivery tested",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an already prepared lab, add an owned datasource using bounded credentials and create one panel with explicit query, variables, units and time range. Define a separate owned alert with documented no-data/error policy and recipient.",
        "Make the owned query match no series, then separately use a bad query or deny its datasource permission. Compare no-data/error/zero behavior and restore the exact query/access settings.",
        "Compare an independent backend query with current panel results and alert evaluation/delivery. Export only redacted owned dashboard evidence and remove owned objects.",
        "Open the Grafana evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A loaded dashboard shell does not establish datasource access. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: An empty selection or stale series must not be mistaken for healthy zero. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A panel threshold color is not automatically the alert rule or notification result. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define datasource access, panel query/unit/time range, alert semantics and recipient owner. Avoid exporting dashboards with secrets. Verify the actual data and an independent source query before interpreting panel colors as measured service health."
      ],
      "verification": "A rendered panel or datasource test alone is not verified measurement or recipient delivery. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A loaded dashboard shell does not establish datasource access. An empty selection or stale series must not be mistaken for healthy zero. A panel threshold color is not automatically the alert rule or notification result. Separate invalid inputs from a valid negative service result.",
      "challenge": "What makes a panel reviewable? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Datasource query authorized": "The intended backend connection and query permissions work.",
      "Query represents current objective": "Variables, units, interval and returned samples match the intended measurement.",
      "Alert failure policy and delivery tested": "No-data/error behavior and recipient recovery are corroborated."
    },
    "sources": [
      {
        "title": "Grafana introduction",
        "url": "https://grafana.com/docs/grafana/latest/introduction/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Grafana necessarily scrapes every shown metric itself?",
        "answer": "No.",
        "explanation": "It commonly queries data held by configured backend sources.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Grafana necessarily scrapes every shown metric itself?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-QC1"
      },
      {
        "question": "Empty panel equivalent to zero utilization?",
        "answer": "No.",
        "explanation": "No matching data and numeric zero have different semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Empty panel equivalent to zero utilization?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-QC2"
      },
      {
        "question": "Datasource test passes; intended panel guaranteed useful?",
        "answer": "No.",
        "explanation": "Query variables, time range, permissions and series semantics still matter.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Datasource test passes; intended panel guaranteed useful?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-QC3"
      }
    ],
    "exams": [
      {
        "question": "Grafana — Grafana necessarily scrapes every shown metric itself?",
        "answer": "No.",
        "explanation": "It commonly queries data held by configured backend sources.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Grafana necessarily scrapes every shown metric itself?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q01",
        "options": [
          "Only if a dashboard variable is selected.",
          "No.",
          "Yes; every panel stores and scrapes its own source metrics.",
          "Yes; datasource queries are always local scrapes."
        ]
      },
      {
        "question": "Grafana — Empty panel equivalent to zero utilization?",
        "answer": "No.",
        "explanation": "No matching data and numeric zero have different semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Empty panel equivalent to zero utilization?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q02"
      },
      {
        "question": "Grafana — Datasource test passes; intended panel guaranteed useful?",
        "answer": "No.",
        "explanation": "Query variables, time range, permissions and series semantics still matter.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Datasource test passes; intended panel guaranteed useful?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q03"
      },
      {
        "question": "Grafana — Panel and alert necessarily use identical viewer context?",
        "answer": "No.",
        "explanation": "Alert evaluation has its own configuration and supported query context.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Panel and alert necessarily use identical viewer context?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q04"
      },
      {
        "question": "Grafana — Wrong panel unit changes backend stored values?",
        "answer": "Not inherently.",
        "explanation": "Display transformations and source storage are distinct layers.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Wrong panel unit changes backend stored values?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q05"
      },
      {
        "question": "Grafana — Should an alert no-data policy be left implicit?",
        "answer": "No.",
        "explanation": "Collection failure can otherwise become silent or misleading status.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Should an alert no-data policy be left implicit?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q06"
      },
      {
        "question": "Grafana — Low average panel proves every client fast?",
        "answer": "No.",
        "explanation": "Aggregated views can hide tail delay or underrepresented users.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Low average panel proves every client fast?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q07"
      },
      {
        "question": "Grafana — How verify restoration?",
        "answer": "Correct original query/data plus expected alert/error/recovery delivery.",
        "explanation": "Changing to a different datasource or ignoring query errors can hide the original fault.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restoration?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q08"
      },
      {
        "question": "Grafana — What influences query cost?",
        "answer": "Time range, series cardinality, aggregation and backend capability.",
        "explanation": "Dashboard appearance does not certify backend resource use or responsiveness.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What influences query cost?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q09"
      },
      {
        "question": "Grafana — What makes a panel reviewable?",
        "answer": "Datasource/query, units, variables, time range and documented interpretation.",
        "explanation": "Those details establish what a value represents instead of relying on a color legend.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What makes a panel reviewable?",
        "topicId": "s4-g6-t3",
        "questionId": "s4-g6-t3-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g6-t4",
    "batch": "12",
    "title": "Prometheus",
    "subtitle": "Interpret scrape success, counter rates and label cardinality separately.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-prometheus",
    "definition": "Prometheus collects time-series data, commonly by scraping configured targets, and stores samples indexed by metric name and labels. PromQL evaluates expressions over that data; alerting rules and notification handling add further stages. The up metric indicates scrape success for a target under that scrape context, not the health of every application workflow. Unbounded labels such as per-request identifiers can create harmful series cardinality.",
    "purpose": "Interpret scrape success, counter rates and label cardinality separately. Define target ownership, scrape identity/access, metric types, labels, query range and alert response. Preserve scrape/rule configuration before a lab fault. Validate under the installed product release without assuming a universal retention or capacity recommendation.",
    "mental": "Use a three-column evidence notebook for Prometheus: prerequisite, observation and conclusion. Define the target endpoint, scrape interval and supported exposition. A successful scrape can contain an application failure metric; an unsuccessful scrape differs from a successful sample whose gauge is zero. Preserve target labels and timestamp/freshness context. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Target scrape succeeds: The intended target endpoint returns an accepted scrape.",
      "Metric semantics are correct: Type, labels, interval and reset context match the query.",
      "Service objective and alert verified: The application-specific signal and intended response are corroborated.",
      "Observation point: Compare scrape health, metric type/labels, sample freshness and alert evidence.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Define the target endpoint, scrape interval and supported exposition. A successful scrape can contain an application failure metric; an unsuccessful scrape differs from a successful sample whose gauge is zero. Preserve target labels and timestamp/freshness context.",
      "Counters accumulate and can reset; rate over a suitable range interprets increments with supported reset handling. Gauges describe current values. Never subtract unrelated label sets or treat a raw monotonically accumulated counter as current per-second load.",
      "Use bounded label dimensions, retention and rule evaluation that fit resource limits. Test an owned scrape failure, no-data condition and application-failure metric separately. Verify notification delivery and recovery, not merely that an expression returns a number.",
      "The first decisive boundary in this worksheet is Target scrape succeeds. Scrape failure differs from a collected metric value of zero.",
      "The later evidence boundaries are Metric semantics are correct and Service objective and alert verified. A raw counter is not a current rate; unrelated series cannot be subtracted safely. up=1 does not guarantee user-visible service success."
    ],
    "flow": [
      [
        "Prometheus context",
        "Interpret scrape success, counter rates and label cardinality separately. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Target scrape succeeds",
        "The intended target endpoint returns an accepted scrape. Scrape failure differs from a collected metric value of zero."
      ],
      [
        "Metric semantics are correct",
        "Type, labels, interval and reset context match the query. A raw counter is not a current rate; unrelated series cannot be subtracted safely."
      ],
      [
        "Service objective and alert verified",
        "The application-specific signal and intended response are corroborated. up=1 does not guarantee user-visible service success."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Prometheus has an apparently healthy management path. Application error metric positive while up=1; contradictory? No. A scrape can succeed while faithfully reporting application failures. Compare that observation with the separate recovery question: How verify restored collection? Fresh same-target samples plus application-specific and alert recovery evidence. A target page alone omits the actual service metric and response workflow. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Prometheus HTTP listen port is commonly9090 but configurable; scraped exporter/application endpoints use their own configured ports. No port alone proves a meaningful series.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "Inspect the owned target page, up{job=\"lab\"}, and the documented service metric over a bounded interval.",
        "platform": "Prometheus prepared lab UI; guided not executed · GUIDED NOT EXECUTED",
        "explanation": "Compare scrape health, metric type/labels, sample freshness and alert evidence.",
        "expected": "up=1 means that scrape succeeded, not that the original application transaction succeeded."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Prometheus settings, version and consuming attachment before any change. Define target ownership, scrape identity/access, metric types, labels, query range and alert response. Preserve scrape/rule configuration before a lab fault. Validate under the installed product release without assuming a universal retention or capacity recommendation. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define target ownership, scrape identity/access, metric types, labels, query range and alert response. Preserve scrape/rule configuration before a lab fault. Validate under the installed product release without assuming a universal retention or capacity recommendation.",
    "troubleshooting": [
      [
        "Target scrape succeeds boundary fails",
        "Scrape failure differs from a collected metric value of zero. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Metric semantics are correct boundary fails",
        "A raw counter is not a current rate; unrelated series cannot be subtracted safely. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Service objective and alert verified boundary fails",
        "up=1 does not guarantee user-visible service success. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Protect metrics and management endpoints; exported labels can disclose topology or user information. Keep secrets out of labels and restrict destructive administrative interfaces. Scrape access is not application authorization.",
    "performance": "What trades off in a shorter scrape interval? Detection granularity against collection/storage work. More frequent samples do not automatically remove blind spots or improve service correctness. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Rate needs an interval and appropriate counter/reset semantics.",
      "A scrape can succeed while faithfully reporting application failures.",
      "Resets require supported semantics rather than a naive arithmetic subtraction.",
      "More frequent samples do not automatically remove blind spots or improve service correctness."
    ],
    "prerequisites": [
      "s4-g5-t3"
    ],
    "related": [
      "lab-4"
    ],
    "lab": {
      "objective": "Interpret scrape success, counter rates and label cardinality separately. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Prometheus endpoint",
        "Boundary: Target scrape succeeds → Metric semantics are correct → Service objective and alert verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an already prepared lab, add an owned target exposing one bounded gauge and counter with controlled labels. Set scrape interval and documented service rule; preserve original scrape/rule files and validate supported syntax before reload.",
        "Stop only the owned target to observe up=0 or missing data under applicable semantics. Separately keep scraping successful while publishing an application-failure gauge. Restore target/rules precisely.",
        "Verify same-target fresh samples, counter-aware rate/reset behavior, bounded label cardinality and intended alert delivery/resolution. Close only the owned target process.",
        "Open the Prometheus evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Scrape failure differs from a collected metric value of zero. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A raw counter is not a current rate; unrelated series cannot be subtracted safely. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: up=1 does not guarantee user-visible service success. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define target ownership, scrape identity/access, metric types, labels, query range and alert response. Preserve scrape/rule configuration before a lab fault. Validate under the installed product release without assuming a universal retention or capacity recommendation."
      ],
      "verification": "up=1 means that scrape succeeded, not that the original application transaction succeeded. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Scrape failure differs from a collected metric value of zero. A raw counter is not a current rate; unrelated series cannot be subtracted safely. up=1 does not guarantee user-visible service success. Separate invalid inputs from a valid negative service result.",
      "challenge": "What should a query record specify? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Target scrape succeeds": "The intended target endpoint returns an accepted scrape.",
      "Metric semantics are correct": "Type, labels, interval and reset context match the query.",
      "Service objective and alert verified": "The application-specific signal and intended response are corroborated."
    },
    "sources": [
      {
        "title": "Prometheus overview",
        "url": "https://prometheus.io/docs/introduction/overview/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "up=1 proves authenticated application workflow healthy?",
        "answer": "No.",
        "explanation": "It establishes a successful scrape for that target, not all service properties.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "up=1 proves authenticated application workflow healthy?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-QC1"
      },
      {
        "question": "Raw counter value equals requests per second?",
        "answer": "No.",
        "explanation": "Rate needs an interval and appropriate counter/reset semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Raw counter value equals requests per second?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-QC2"
      },
      {
        "question": "No series and gauge zero interchangeable?",
        "answer": "No.",
        "explanation": "Missing data and an observed zero must be handled separately.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "No series and gauge zero interchangeable?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-QC3"
      }
    ],
    "exams": [
      {
        "question": "Prometheus — up=1 proves authenticated application workflow healthy?",
        "answer": "No.",
        "explanation": "It establishes a successful scrape for that target, not all service properties.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "up=1 proves authenticated application workflow healthy?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q01",
        "options": [
          "No.",
          "Yes; scrape success validates every user workflow.",
          "Yes; up=1 proves all request bodies correct.",
          "Only if the endpoint is on port 9090."
        ]
      },
      {
        "question": "Prometheus — Raw counter value equals requests per second?",
        "answer": "No.",
        "explanation": "Rate needs an interval and appropriate counter/reset semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Raw counter value equals requests per second?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q02"
      },
      {
        "question": "Prometheus — No series and gauge zero interchangeable?",
        "answer": "No.",
        "explanation": "Missing data and an observed zero must be handled separately.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "No series and gauge zero interchangeable?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q03"
      },
      {
        "question": "Prometheus — Application error metric positive while up=1; contradictory?",
        "answer": "No.",
        "explanation": "A scrape can succeed while faithfully reporting application failures.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Application error metric positive while up=1; contradictory?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q04"
      },
      {
        "question": "Prometheus — Why avoid request ID as an unrestricted label?",
        "answer": "It can create unbounded series cardinality.",
        "explanation": "Each unique label combination consumes collection/storage/query resources.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why avoid request ID as an unrestricted label?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q05"
      },
      {
        "question": "Prometheus — Counter reset means negative request rate?",
        "answer": "Not under correct counter-aware rate interpretation.",
        "explanation": "Resets require supported semantics rather than a naive arithmetic subtraction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Counter reset means negative request rate?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q06"
      },
      {
        "question": "Prometheus — Are scrape and notification success identical?",
        "answer": "No.",
        "explanation": "Rule evaluation and recipient delivery are later independent stages.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Are scrape and notification success identical?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q07"
      },
      {
        "question": "Prometheus — How verify restored collection?",
        "answer": "Fresh same-target samples plus application-specific and alert recovery evidence.",
        "explanation": "A target page alone omits the actual service metric and response workflow.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored collection?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q08"
      },
      {
        "question": "Prometheus — What trades off in a shorter scrape interval?",
        "answer": "Detection granularity against collection/storage work.",
        "explanation": "More frequent samples do not automatically remove blind spots or improve service correctness.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What trades off in a shorter scrape interval?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q09"
      },
      {
        "question": "Prometheus — What should a query record specify?",
        "answer": "Metric type, labels, range, units, reset/missingness interpretation and objective.",
        "explanation": "An expression result needs provenance to support an operational conclusion.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What should a query record specify?",
        "topicId": "s4-g6-t4",
        "questionId": "s4-g6-t4-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "lab-4",
    "batch": "12",
    "title": "Network Services Lab",
    "subtitle": "Correlate time, logging, polling and administrative policy without losing local recovery.",
    "level": "Intermediate → Advanced",
    "minutes": 120,
    "interactive": "ns-services-lab",
    "definition": "The Network Services Lab integrates the original objective: centralize NTP, Syslog, SNMP and AAA, verify timestamps, log delivery, polling, administrator authentication and a local recovery account. A guided disposable topology uses one owned managed device or service VM, separate service endpoints and an independent console. This browser rehearsal does not run those servers. It checks whether independently recorded prerequisites are complete, and deliberately refuses to infer central-service health from configuration alone.",
    "purpose": "Correlate time, logging, polling and administrative policy without losing local recovery. Use the downloadable workbook as the evidence record. For every service keep baseline, one fault, recovery, observer/time and remaining limits. The completion boundary requires all six original observations; optional DNS/PKI/monitoring dependencies deepen the exercise without replacing NTP/Syslog/SNMP/AAA.",
    "mental": "Use a three-column evidence notebook for Network Services Lab: prerequisite, observation and conclusion. Establish a secure baseline and independent console-local administrative account first. Record exact versions, addresses, source contexts, management policy and original settings. Choose one approved identity and one intentionally denied action; do not use a production device for policy fault injection. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Time and telemetry evidence complete: Synchronization, correlated collector marker and scoped SNMP observation are independently recorded.",
      "AAA acceptance and rejection verified: Approved identity/action and intended denial have correlated evidence.",
      "Independent recovery and restore verified: Console-local recovery remains usable and original transactions pass after exact restore.",
      "Observation point: Collect separate time, local-log, security-user and AAA-peer observations, then corroborate each at its intended receiver/client.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Establish a secure baseline and independent console-local administrative account first. Record exact versions, addresses, source contexts, management policy and original settings. Choose one approved identity and one intentionally denied action; do not use a production device for policy fault injection.",
      "Verify selected time source and client synchronization, then correlate an owned log marker at originator and collector with event/receive timestamps. Poll one permitted SNMP object under the intended security/view and verify an outside-view denial. Keep these observations separate instead of calling all three successful because the device answers ping.",
      "Verify approved administrator authentication, intended command denial and retained accounting. Introduce only an owned central-server unavailability scenario while preserving console access; distinguish timeout recovery from explicit rejection. Restore exact settings and verify the original transactions and local recovery before removing owned test resources.",
      "The first decisive boundary in this worksheet is Time and telemetry evidence complete. Ping and configuration displays cannot replace actual service observations.",
      "The later evidence boundaries are AAA acceptance and rejection verified and Independent recovery and restore verified. A rejection bypassed by fallback is a failure of the intended boundary. Central outage testing is unsafe without independently verified recovery."
    ],
    "flow": [
      [
        "Network Services Lab context",
        "Correlate time, logging, polling and administrative policy without losing local recovery. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Time and telemetry evidence complete",
        "Synchronization, correlated collector marker and scoped SNMP observation are independently recorded. Ping and configuration displays cannot replace actual service observations."
      ],
      [
        "AAA acceptance and rejection verified",
        "Approved identity/action and intended denial have correlated evidence. A rejection bypassed by fallback is a failure of the intended boundary."
      ],
      [
        "Independent recovery and restore verified",
        "Console-local recovery remains usable and original transactions pass after exact restore. Central outage testing is unsafe without independently verified recovery."
      ]
    ],
    "comparison": [
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
    "example": "An operator investigating Network Services Lab has an apparently healthy management path. Approved login succeeds but forbidden command allowed; pass? No. Identity acceptance must coexist with intended authorization denial. Compare that observation with the separate recovery question: What proves complete restore? Original time/log/poll/admin/denial transactions and independent recovery verified. Restored configuration text alone does not show the original services work again. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "NTP commonly UDP 123, Syslog transport per configured policy, SNMP polling UDP 161, AAA according to chosen RADIUS/TACACS+ transport. Independent console recovery has no dependency on those central ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show ntp associations\nshow logging\nshow snmp user\nshow aaa servers",
        "platform": "Cisco IOS XE17 supported disposable lab device; guided observations · GUIDED NOT EXECUTED",
        "explanation": "Collect separate time, local-log, security-user and AAA-peer observations, then corroborate each at its intended receiver/client.",
        "expected": "These displays alone do not complete synchronization, remote marker delivery, scoped OID access, user/command decisions or local recovery."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Network Services Lab settings, version and consuming attachment before any change. Use the downloadable workbook as the evidence record. For every service keep baseline, one fault, recovery, observer/time and remaining limits. The completion boundary requires all six original observations; optional DNS/PKI/monitoring dependencies deepen the exercise without replacing NTP/Syslog/SNMP/AAA. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Use the downloadable workbook as the evidence record. For every service keep baseline, one fault, recovery, observer/time and remaining limits. The completion boundary requires all six original observations; optional DNS/PKI/monitoring dependencies deepen the exercise without replacing NTP/Syslog/SNMP/AAA.",
    "troubleshooting": [
      [
        "Time and telemetry evidence complete boundary fails",
        "Ping and configuration displays cannot replace actual service observations. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "AAA acceptance and rejection verified boundary fails",
        "A rejection bypassed by fallback is a failure of the intended boundary. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Independent recovery and restore verified boundary fails",
        "Central outage testing is unsafe without independently verified recovery. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Do not expose secrets in screenshots or configuration exports. Preserve console recovery, least-privilege polling and intended rejection. A fallback that grants a rejected identity access is a policy failure even if the administrator can log in.",
    "performance": "Why inject one fault at a time? To preserve a testable causal hypothesis and bounded recovery. Simultaneous policy/path changes make negative outcomes ambiguous and rollback harder. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Time synchronization, log delivery, OID access and administrative decisions need their own observations.",
      "Identity acceptance must coexist with intended authorization denial.",
      "Successful polling alone can conceal an overly broad management view.",
      "Simultaneous policy/path changes make negative outcomes ambiguous and rollback harder."
    ],
    "prerequisites": [
      "s4-g0-t3",
      "s4-g1-t0",
      "s4-g1-t1",
      "s4-g2-t0",
      "s4-g5-t3"
    ],
    "related": [
      "s4-g0-t3",
      "s4-g1-t0",
      "s4-g1-t1",
      "s4-g2-t0"
    ],
    "lab": {
      "objective": "Correlate time, logging, polling and administrative policy without losing local recovery. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Network Services Lab endpoint",
        "Boundary: Time and telemetry evidence complete → AAA acceptance and rejection verified → Independent recovery and restore verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare one disposable managed target, separate approved NTP/log/SNMP/AAA endpoints and an independent console. Record all exact versions and baseline settings. Before central AAA attachment, verify the console-local account and define approved identity/role plus an intended denied command.",
        "Verify NTP synchronization, a uniquely correlated collector log marker, allowed/denied SNMP objects and AAA authentication/authorization/accounting independently. Inject only one owned central-service fault at a time; test explicit Reject separately from unavailability while preserving console recovery.",
        "After each fault restore exact settings and rerun the same original client/observer transactions. Final evidence must include timestamps, retained marker, scoped polling, approved action, forbidden-action denial, accounting and local recovery. Remove only owned fixtures after these pass.",
        "Open the Network Services Lab evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Ping and configuration displays cannot replace actual service observations. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A rejection bypassed by fallback is a failure of the intended boundary. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Central outage testing is unsafe without independently verified recovery. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Use the downloadable workbook as the evidence record. For every service keep baseline, one fault, recovery, observer/time and remaining limits. The completion boundary requires all six original observations; optional DNS/PKI/monitoring dependencies deepen the exercise without replacing NTP/Syslog/SNMP/AAA."
      ],
      "verification": "These displays alone do not complete synchronization, remote marker delivery, scoped OID access, user/command decisions or local recovery. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Ping and configuration displays cannot replace actual service observations. A rejection bypassed by fallback is a failure of the intended boundary. Central outage testing is unsafe without independently verified recovery. Separate invalid inputs from a valid negative service result.",
      "challenge": "What must the final lab notebook separate? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Time and telemetry evidence complete": "Synchronization, correlated collector marker and scoped SNMP observation are independently recorded.",
      "AAA acceptance and rejection verified": "Approved identity/action and intended denial have correlated evidence.",
      "Independent recovery and restore verified": "Console-local recovery remains usable and original transactions pass after exact restore."
    },
    "sources": [
      {
        "title": "RFC 5905",
        "url": "https://www.rfc-editor.org/rfc/rfc5905.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 5424",
        "url": "https://www.rfc-editor.org/rfc/rfc5424.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3411",
        "url": "https://www.rfc-editor.org/rfc/rfc3411.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8907",
        "url": "https://www.rfc-editor.org/rfc/rfc8907.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "What must be tested before central AAA changes?",
        "answer": "The independent console-local recovery account.",
        "explanation": "Recovery must not depend on the experimental authentication service remaining reachable.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What must be tested before central AAA changes?",
        "topicId": "lab-4",
        "questionId": "lab-4-QC1"
      },
      {
        "question": "Ping succeeds; all original services verified?",
        "answer": "No.",
        "explanation": "Time synchronization, log delivery, OID access and administrative decisions need their own observations.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Ping succeeds; all original services verified?",
        "topicId": "lab-4",
        "questionId": "lab-4-QC2"
      },
      {
        "question": "Local log marker enough for centralized logging?",
        "answer": "No; find its correlated retained record at the collector.",
        "explanation": "Origin generation and receiver ingestion/storage are separate evidence points.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Local log marker enough for centralized logging?",
        "topicId": "lab-4",
        "questionId": "lab-4-QC3"
      }
    ],
    "exams": [
      {
        "question": "Network Services Lab — What must be tested before central AAA changes?",
        "answer": "The independent console-local recovery account.",
        "explanation": "Recovery must not depend on the experimental authentication service remaining reachable.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "What must be tested before central AAA changes?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q01",
        "options": [
          "Only remote login through the new AAA server.",
          "Only a DHCP lease.",
          "Only the current route table.",
          "The independent console-local recovery account."
        ]
      },
      {
        "question": "Network Services Lab — Ping succeeds; all original services verified?",
        "answer": "No.",
        "explanation": "Time synchronization, log delivery, OID access and administrative decisions need their own observations.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Ping succeeds; all original services verified?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q02"
      },
      {
        "question": "Network Services Lab — Local log marker enough for centralized logging?",
        "answer": "No; find its correlated retained record at the collector.",
        "explanation": "Origin generation and receiver ingestion/storage are separate evidence points.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Local log marker enough for centralized logging?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q03"
      },
      {
        "question": "Network Services Lab — Approved login succeeds but forbidden command allowed; pass?",
        "answer": "No.",
        "explanation": "Identity acceptance must coexist with intended authorization denial.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Approved login succeeds but forbidden command allowed; pass?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q04"
      },
      {
        "question": "Network Services Lab — Server Reject followed by local permit; safe outage recovery?",
        "answer": "No.",
        "explanation": "Explicit rejection must not be treated as unreachability to bypass intended policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Server Reject followed by local permit; safe outage recovery?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q05"
      },
      {
        "question": "Network Services Lab — What SNMP negative test is needed?",
        "answer": "An intended outside-view object denial.",
        "explanation": "Successful polling alone can conceal an overly broad management view.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What SNMP negative test is needed?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q06"
      },
      {
        "question": "Network Services Lab — What time record helps compare logs?",
        "answer": "Client synchronization plus event/receive timestamps and timezone.",
        "explanation": "Formatted timestamp text without provenance can mislead correlation.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What time record helps compare logs?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q07"
      },
      {
        "question": "Network Services Lab — What proves complete restore?",
        "answer": "Original time/log/poll/admin/denial transactions and independent recovery verified.",
        "explanation": "Restored configuration text alone does not show the original services work again.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What proves complete restore?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q08"
      },
      {
        "question": "Network Services Lab — Why inject one fault at a time?",
        "answer": "To preserve a testable causal hypothesis and bounded recovery.",
        "explanation": "Simultaneous policy/path changes make negative outcomes ambiguous and rollback harder.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why inject one fault at a time?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q09"
      },
      {
        "question": "Network Services Lab — What must the final lab notebook separate?",
        "answer": "Actual output, synthetic declarations, guided procedures and untested limits.",
        "explanation": "A browser rehearsal is educational evidence and must not be relabelled as executed central services.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What must the final lab notebook separate?",
        "topicId": "lab-4",
        "questionId": "lab-4-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  }
];
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['12']=lessons;
})();
