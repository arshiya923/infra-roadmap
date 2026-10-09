'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['13']=[
  {
    "id": "s5-g0-t0",
    "batch": "13",
    "title": "Security Fundamentals",
    "subtitle": "Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-fundamentals",
    "definition": "Network security protects assets and intended operations against unauthorized disclosure, modification and disruption. Begin with a service objective, the identities that need it and the paths that cross trust boundaries. A vulnerability is a weakness; a threat is a potential cause of harm; risk combines context, likelihood and consequence. Buying a control without defining the protected transaction leaves its benefit untestable.",
    "purpose": "Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application.",
    "mental": "Inventory the management, user, server and third-party paths, including maintenance access. Attach an accountable owner to each asset and describe the consequence of failure rather than assigning every asset the same priority. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Independent declared CIA consequences, without risk scoring or likelihood estimation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Asset: What must remain trustworthy or usable. Prioritize from business consequence.",
      "Threat: Potential cause of an unwanted event. State the actor and reachable path.",
      "Residual risk: Exposure after chosen controls. Assign an owner and review date.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Inventory the management, user, server and third-party paths, including maintenance access. Attach an accountable owner to each asset and describe the consequence of failure rather than assigning every asset the same priority.",
      "Choose preventive controls for the intended abuse path, detective observations for attempts and corrective actions for recovery. A log entry is useful only if someone can interpret it and act within the service objective.",
      "Verify the intended user transaction and a narrowly chosen prohibited transaction from the same boundary. Document the remaining exposure, decision owner and review trigger; a passed classroom case never establishes that no other attack exists."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Network security protects assets and intended operations against unauthorized disclosure, modification and disruption. Begin with a service objective, the identities that need it and the paths that cross trust boundaries. A vulnerability is a weakness; a threat is a potential cause of harm; risk combines context, likelihood and consequence. Buying a control without defining the protected transaction leaves its benefit untestable."
      ],
      [
        "Identify the consuming boundary",
        "Inventory the management, user, server and third-party paths, including maintenance access. Attach an accountable owner to each asset and describe the consequence of failure rather than assigning every asset the same priority."
      ],
      [
        "Follow the actual decision",
        "Choose preventive controls for the intended abuse path, detective observations for attempts and corrective actions for recovery. A log entry is useful only if someone can interpret it and act within the service objective."
      ],
      [
        "Verify limits and recovery",
        "Verify the intended user transaction and a narrowly chosen prohibited transaction from the same boundary. Document the remaining exposure, decision owner and review trigger; a passed classroom case never establishes that no other attack exists."
      ]
    ],
    "comparison": [
      [
        "Asset",
        "What must remain trustworthy or usable",
        "Prioritize from business consequence."
      ],
      [
        "Threat",
        "Potential cause of an unwanted event",
        "State the actor and reachable path."
      ],
      [
        "Residual risk",
        "Exposure after chosen controls",
        "Assign an owner and review date."
      ]
    ],
    "example": "An inventory omits the management interface; what remains unknown? An administrative attack surface. The application service inventory does not cover every privileged path. Compare this with a different operational question: A deny rule stops both abuse and payroll; is it accepted? No; verify the intended service objective. Security and operational acceptance need positive and negative tests. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Risk principles have no intrinsic transport port; inventory the actual protected operations.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "ss -lnt",
        "explanation": "Observe the installed context for Security Fundamentals. Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Retest the required flow and prohibited flow from the original observers. A configuration listing alone does not demonstrate enforcement. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "A deny rule stops both abuse and payroll; is it accepted?",
        "No; verify the intended service objective. Security and operational acceptance need positive and negative tests."
      ],
      [
        "Why preserve a separate console path?",
        "To recover safely from an access-policy mistake. Recovery must not depend on the path being deliberately denied."
      ],
      [
        "What should trigger reassessment after acceptance?",
        "A changed asset, dependency, threat or policy. Risk context changes when the protected system changes."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Limit administrative identities, protect secrets and patch supported components. Recovery access must be tightly controlled and tested rather than becoming an undocumented universal bypass.",
    "performance": "Measure service latency, policy lookup cost and log volume at equivalent loads. An overly broad log rule can create an availability problem without improving the quality of detection.",
    "mistakes": [
      "The application service inventory does not cover every privileged path.",
      "The weakness differs from the actor that could exploit it.",
      "A worksheet result cannot authorize organizational risk acceptance.",
      "Detection and prevention are different observations."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g0-t1"
    ],
    "lab": {
      "objective": "Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Security Fundamentals boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Draw the user, server and management boundaries on paper; list one required transaction and one forbidden transaction.",
        "Fault: remove the documented management restriction from the tabletop design and identify the newly exposed asset.",
        "Restore the exact restriction; retain both allowed-service and denied-management evidence requirements.",
        "Predict the baseline Security Fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Record a permitted user-to-server HTTPS flow, a prohibited user-to-management flow and a separate recovery console. Review dependencies before enforcing a deny policy; DNS, time, certificate validation and logging can fail independently of the application. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Retest the required flow and prohibited flow from the original observers. A configuration listing alone does not demonstrate enforcement. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Asset → Threat → Residual risk. Security and operational acceptance need positive and negative tests. Recovery must not depend on the path being deliberately denied.",
      "challenge": "What should trigger reassessment after acceptance? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Asset": "What must remain trustworthy or usable. Prioritize from business consequence.",
      "Threat": "Potential cause of an unwanted event. State the actor and reachable path.",
      "Residual risk": "Exposure after chosen controls. Assign an owner and review date."
    },
    "sources": [
      {
        "title": "NIST SP 800-30 Rev. 1 risk assessment",
        "url": "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST information system security risk glossary",
        "url": "https://csrc.nist.gov/glossary/term/information_system_related_security_risks",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g0-t0-QC2",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does installing a firewall remove all risk?",
        "answer": "No; residual risk remains.",
        "explanation": "Policy mistakes, compromised endpoints and uninspected paths can survive the control.",
        "testedConcept": "Does installing a firewall remove all risk?"
      },
      {
        "questionId": "s5-g0-t0-QC4",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A deny rule stops both abuse and payroll; is it accepted?",
        "answer": "No; verify the intended service objective.",
        "explanation": "Security and operational acceptance need positive and negative tests.",
        "testedConcept": "A deny rule stops both abuse and payroll; is it accepted?"
      },
      {
        "questionId": "s5-g0-t0-QC8",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should trigger reassessment after acceptance?",
        "answer": "A changed asset, dependency, threat or policy.",
        "explanation": "Risk context changes when the protected system changes.",
        "testedConcept": "What should trigger reassessment after acceptance?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g0-t0-Q01",
        "topicId": "s5-g0-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An inventory omits the management interface; what remains unknown?",
        "answer": "An administrative attack surface.",
        "explanation": "The application service inventory does not cover every privileged path.",
        "testedConcept": "An inventory omits the management interface; what remains unknown?",
        "options": [
          "An administrative attack surface.",
          "Yes; the appliance eliminates all remaining exposure.",
          "Only the firewall vendor can identify assets.",
          "A permitted packet proves every service is secure."
        ]
      },
      {
        "questionId": "s5-g0-t0-Q02",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does installing a firewall remove all risk?",
        "answer": "No; residual risk remains.",
        "explanation": "Policy mistakes, compromised endpoints and uninspected paths can survive the control.",
        "testedConcept": "Does installing a firewall remove all risk?"
      },
      {
        "questionId": "s5-g0-t0-Q03",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which item is a vulnerability: attacker or unsupported firmware?",
        "answer": "Unsupported firmware.",
        "explanation": "The weakness differs from the actor that could exploit it.",
        "testedConcept": "Which item is a vulnerability: attacker or unsupported firmware?"
      },
      {
        "questionId": "s5-g0-t0-Q04",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A deny rule stops both abuse and payroll; is it accepted?",
        "answer": "No; verify the intended service objective.",
        "explanation": "Security and operational acceptance need positive and negative tests.",
        "testedConcept": "A deny rule stops both abuse and payroll; is it accepted?"
      },
      {
        "questionId": "s5-g0-t0-Q05",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Who accepts the remaining exposure?",
        "answer": "The accountable risk owner.",
        "explanation": "A worksheet result cannot authorize organizational risk acceptance.",
        "testedConcept": "Who accepts the remaining exposure?"
      },
      {
        "questionId": "s5-g0-t0-Q06",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve a separate console path?",
        "answer": "To recover safely from an access-policy mistake.",
        "explanation": "Recovery must not depend on the path being deliberately denied.",
        "testedConcept": "Why preserve a separate console path?"
      },
      {
        "questionId": "s5-g0-t0-Q07",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is a logged attempt proof of prevented damage?",
        "answer": "No; correlate enforcement and outcome.",
        "explanation": "Detection and prevention are different observations.",
        "testedConcept": "Is a logged attempt proof of prevented damage?"
      },
      {
        "questionId": "s5-g0-t0-Q08",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should trigger reassessment after acceptance?",
        "answer": "A changed asset, dependency, threat or policy.",
        "explanation": "Risk context changes when the protected system changes.",
        "testedConcept": "What should trigger reassessment after acceptance?"
      },
      {
        "questionId": "s5-g0-t0-Q09",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why can logging every packet hurt availability?",
        "answer": "It can overwhelm processing and storage.",
        "explanation": "Choose actionable bounded observations rather than unbounded noise.",
        "testedConcept": "Why can logging every packet hurt availability?"
      },
      {
        "questionId": "s5-g0-t0-Q10",
        "topicId": "s5-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify a restored restriction?",
        "answer": "Retest the required flow and prohibited flow from the original observers.",
        "explanation": "A configuration listing alone does not demonstrate enforcement.",
        "testedConcept": "How do you verify a restored restriction?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g0-t1",
    "batch": "13",
    "title": "CIA Triad",
    "subtitle": "For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-cia",
    "definition": "The CIA triad separates confidentiality, integrity and availability. Confidentiality restricts disclosure; integrity protects against unauthorized alteration; availability preserves timely authorized use. These are independent requirements: a reachable server may return altered data, and an encrypted backup may be unreadable during recovery. Use the triad to classify consequences and select evidence, not to collapse security into a single score.",
    "purpose": "For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process.",
    "mental": "Name the information and operation before assigning an impact. Exposing a key affects confidentiality and can enable later integrity damage; the second consequence must be reasoned about separately. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Independent declared CIA consequences, without risk scoring or likelihood estimation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Confidentiality: Authorized disclosure only. Encryption needs identity and key control.",
      "Integrity: Authorized changes and trustworthy content. Authenticate the reference as well as the data.",
      "Availability: Timely authorized use. Test recovery rather than count replicas.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Name the information and operation before assigning an impact. Exposing a key affects confidentiality and can enable later integrity damage; the second consequence must be reasoned about separately.",
      "Map controls to the property they actually establish. Encryption can conceal content; authenticated integrity checks reveal unauthorized changes; redundancy supports availability only if failover and recovery work.",
      "Design a positive and negative observation for each required property. Record authorization for reading, an independently checked expected content value and a bounded recovery-time goal. Passing one observation does not stand in for the other two."
    ],
    "flow": [
      [
        "Define the protected operation",
        "The CIA triad separates confidentiality, integrity and availability. Confidentiality restricts disclosure; integrity protects against unauthorized alteration; availability preserves timely authorized use. These are independent requirements: a reachable server may return altered data, and an encrypted backup may be unreadable during recovery. Use the triad to classify consequences and select evidence, not to collapse security into a single score."
      ],
      [
        "Identify the consuming boundary",
        "Name the information and operation before assigning an impact. Exposing a key affects confidentiality and can enable later integrity damage; the second consequence must be reasoned about separately."
      ],
      [
        "Follow the actual decision",
        "Map controls to the property they actually establish. Encryption can conceal content; authenticated integrity checks reveal unauthorized changes; redundancy supports availability only if failover and recovery work."
      ],
      [
        "Verify limits and recovery",
        "Design a positive and negative observation for each required property. Record authorization for reading, an independently checked expected content value and a bounded recovery-time goal. Passing one observation does not stand in for the other two."
      ]
    ],
    "comparison": [
      [
        "Confidentiality",
        "Authorized disclosure only",
        "Encryption needs identity and key control."
      ],
      [
        "Integrity",
        "Authorized changes and trustworthy content",
        "Authenticate the reference as well as the data."
      ],
      [
        "Availability",
        "Timely authorized use",
        "Test recovery rather than count replicas."
      ]
    ],
    "example": "A public service returns a tampered balance; which property failed? Integrity. Reachability did not establish trustworthy content. Compare this with a different operational question: An unauthorized user reads a valid configuration; classify the direct harm. Confidentiality loss. The file can be unchanged and available while disclosure is unauthorized. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Risk principles have no intrinsic transport port; inventory the actual protected operations.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "sha256sum labs/network-security-workbook.md",
        "explanation": "Observe the installed context for CIA Triad. For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Authorized access, trusted content and timely recovery. All required properties need their own evidence. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "An unauthorized user reads a valid configuration; classify the direct harm.",
        "Confidentiality loss. The file can be unchanged and available while disclosure is unauthorized."
      ],
      [
        "Two replicas share one power feed; is availability assured?",
        "No. A common dependency can fail every copy together."
      ],
      [
        "What is a useful availability acceptance target?",
        "A defined authorized operation within a stated recovery time. A green process icon does not establish the service objective."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "A public hash does not authenticate an attacker-controlled file when the attacker can replace both file and hash. Use a trusted signature or separately protected expected digest.",
    "performance": "Integrity validation and replication have measurable costs. Evaluate the recovery path under realistic load rather than inferring availability from the number of copies.",
    "mistakes": [
      "Reachability did not establish trustworthy content.",
      "Confidentiality and source/content authentication require distinct evidence.",
      "An attacker-controlled reference does not establish authenticity.",
      "The properties are distinct but consequences can interact."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g0-t2"
    ],
    "lab": {
      "objective": "For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "CIA Triad boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Define three acceptance observations for an owned configuration backup.",
        "Fault: replace the expected-content declaration while leaving reachability and read restrictions true.",
        "Restore the content declaration and explain why availability alone never resolved the integrity failure.",
        "Predict the baseline CIA Triad result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. For a configuration backup, define who may read it, how changes are authenticated and how quickly it must be restored. Keep the recovery key accessible through a controlled independent process. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Authorized access, trusted content and timely recovery. All required properties need their own evidence. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Confidentiality → Integrity → Availability. The file can be unchanged and available while disclosure is unauthorized. A common dependency can fail every copy together.",
      "challenge": "What is a useful availability acceptance target? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Confidentiality": "Authorized disclosure only. Encryption needs identity and key control.",
      "Integrity": "Authorized changes and trustworthy content. Authenticate the reference as well as the data.",
      "Availability": "Timely authorized use. Test recovery rather than count replicas."
    },
    "sources": [
      {
        "title": "NIST information system security risk glossary",
        "url": "https://csrc.nist.gov/glossary/term/information_system_related_security_risks",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-30 Rev. 1 risk assessment",
        "url": "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g0-t1-QC2",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A backup is encrypted but the only key is lost; which property is threatened?",
        "answer": "Availability.",
        "explanation": "Protected content must still be recoverable by authorized operators.",
        "testedConcept": "A backup is encrypted but the only key is lost; which property is threatened?"
      },
      {
        "questionId": "s5-g0-t1-QC4",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An unauthorized user reads a valid configuration; classify the direct harm.",
        "answer": "Confidentiality loss.",
        "explanation": "The file can be unchanged and available while disclosure is unauthorized.",
        "testedConcept": "An unauthorized user reads a valid configuration; classify the direct harm."
      },
      {
        "questionId": "s5-g0-t1-QC8",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a useful availability acceptance target?",
        "answer": "A defined authorized operation within a stated recovery time.",
        "explanation": "A green process icon does not establish the service objective.",
        "testedConcept": "What is a useful availability acceptance target?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g0-t1-Q01",
        "topicId": "s5-g0-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A public service returns a tampered balance; which property failed?",
        "answer": "Integrity.",
        "explanation": "Reachability did not establish trustworthy content.",
        "testedConcept": "A public service returns a tampered balance; which property failed?",
        "options": [
          "Availability only.",
          "Confidentiality only.",
          "No property failed because the service is reachable.",
          "Integrity."
        ]
      },
      {
        "questionId": "s5-g0-t1-Q02",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A backup is encrypted but the only key is lost; which property is threatened?",
        "answer": "Availability.",
        "explanation": "Protected content must still be recoverable by authorized operators.",
        "testedConcept": "A backup is encrypted but the only key is lost; which property is threatened?"
      },
      {
        "questionId": "s5-g0-t1-Q03",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does encryption alone prove the file is authentic?",
        "answer": "No.",
        "explanation": "Confidentiality and source/content authentication require distinct evidence.",
        "testedConcept": "Does encryption alone prove the file is authentic?"
      },
      {
        "questionId": "s5-g0-t1-Q04",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An unauthorized user reads a valid configuration; classify the direct harm.",
        "answer": "Confidentiality loss.",
        "explanation": "The file can be unchanged and available while disclosure is unauthorized.",
        "testedConcept": "An unauthorized user reads a valid configuration; classify the direct harm."
      },
      {
        "questionId": "s5-g0-t1-Q05",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What makes a hash comparison meaningful?",
        "answer": "A separately trusted expected digest.",
        "explanation": "An attacker-controlled reference does not establish authenticity.",
        "testedConcept": "What makes a hash comparison meaningful?"
      },
      {
        "questionId": "s5-g0-t1-Q06",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two replicas share one power feed; is availability assured?",
        "answer": "No.",
        "explanation": "A common dependency can fail every copy together.",
        "testedConcept": "Two replicas share one power feed; is availability assured?"
      },
      {
        "questionId": "s5-g0-t1-Q07",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can an integrity incident later cause an outage?",
        "answer": "Yes.",
        "explanation": "The properties are distinct but consequences can interact.",
        "testedConcept": "Can an integrity incident later cause an outage?"
      },
      {
        "questionId": "s5-g0-t1-Q08",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a useful availability acceptance target?",
        "answer": "A defined authorized operation within a stated recovery time.",
        "explanation": "A green process icon does not establish the service objective.",
        "testedConcept": "What is a useful availability acceptance target?"
      },
      {
        "questionId": "s5-g0-t1-Q09",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How should replica overhead be evaluated?",
        "answer": "Measure equivalent workloads and the recovery path.",
        "explanation": "Nominal replica count supplies no throughput guarantee.",
        "testedConcept": "How should replica overhead be evaluated?"
      },
      {
        "questionId": "s5-g0-t1-Q10",
        "topicId": "s5-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must be retested after restoring a backup?",
        "answer": "Authorized access, trusted content and timely recovery.",
        "explanation": "All required properties need their own evidence.",
        "testedConcept": "What must be retested after restoring a backup?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g0-t2",
    "batch": "13",
    "title": "Attack surfaces",
    "subtitle": "Build a local listener list, then compare it with the documented service owner list.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-surfaces",
    "definition": "An attack surface is the collection of reachable interfaces and interactions through which a system may be affected. Include listeners, management APIs, credentials, dependencies, local attachment and human workflows. Reachability is contextual: an interface hidden from the Internet can remain exposed to an internal compromised endpoint. An open port is an inventory observation, not a vulnerability verdict.",
    "purpose": "Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable.",
    "mental": "Enumerate interfaces at the relevant observers: public client, ordinary user segment and management segment. Include outbound integrations and remote update paths because inbound-listener discovery alone misses them. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Independent declared CIA consequences, without risk scoring or likelihood estimation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Listener: Local endpoint accepting traffic. Confirm ownership and bind address.",
      "Reachability: A source can reach an endpoint. State source, path and protocol.",
      "Vulnerability: An exploitable weakness in context. Inventory alone cannot establish it.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Enumerate interfaces at the relevant observers: public client, ordinary user segment and management segment. Include outbound integrations and remote update paths because inbound-listener discovery alone misses them.",
      "For each entry record identity requirements, exposed data, permitted operations and owner. Distinguish configured service, local listener, remotely reachable endpoint and successful authorized operation.",
      "Reduce unnecessary exposure by disabling unused owned services or restricting consuming paths. Repeat the same inventory after one change; an empty result from one source does not prove absence from every source."
    ],
    "flow": [
      [
        "Define the protected operation",
        "An attack surface is the collection of reachable interfaces and interactions through which a system may be affected. Include listeners, management APIs, credentials, dependencies, local attachment and human workflows. Reachability is contextual: an interface hidden from the Internet can remain exposed to an internal compromised endpoint. An open port is an inventory observation, not a vulnerability verdict."
      ],
      [
        "Identify the consuming boundary",
        "Enumerate interfaces at the relevant observers: public client, ordinary user segment and management segment. Include outbound integrations and remote update paths because inbound-listener discovery alone misses them."
      ],
      [
        "Follow the actual decision",
        "For each entry record identity requirements, exposed data, permitted operations and owner. Distinguish configured service, local listener, remotely reachable endpoint and successful authorized operation."
      ],
      [
        "Verify limits and recovery",
        "Reduce unnecessary exposure by disabling unused owned services or restricting consuming paths. Repeat the same inventory after one change; an empty result from one source does not prove absence from every source."
      ]
    ],
    "comparison": [
      [
        "Listener",
        "Local endpoint accepting traffic",
        "Confirm ownership and bind address."
      ],
      [
        "Reachability",
        "A source can reach an endpoint",
        "State source, path and protocol."
      ],
      [
        "Vulnerability",
        "An exploitable weakness in context",
        "Inventory alone cannot establish it."
      ]
    ],
    "example": "An open TCP port is found; is a vulnerability proven? No. Reachable service and exploitable weakness are different claims. Compare this with a different operational question: Why record the bind address? It helps identify which local interfaces expose the service. Loopback and all-interface bindings have different intended boundaries. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Risk principles have no intrinsic transport port; inventory the actual protected operations.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "ss -lnt",
        "explanation": "Observe the installed context for Attack surfaces. Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. The restricted endpoint stays restricted while required services still work. Retest both negative and positive objectives. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why record the bind address?",
        "It helps identify which local interfaces expose the service. Loopback and all-interface bindings have different intended boundaries."
      ],
      [
        "Is IPv4 inventory sufficient for a dual-stack host?",
        "No. IPv6 can expose a separately controlled path."
      ],
      [
        "Does hiding an API URL establish authorization?",
        "No. Knowledge of a path is not protected identity or permission."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Include IPv6, wireless/remote access and emergency accounts. A hidden interface is not protected merely because it is absent from a diagram.",
    "performance": "Discovery rate affects target load and interpretation. This lab uses local read-only inventory and performs no remote scanning or exploitation.",
    "mistakes": [
      "Reachable service and exploitable weakness are different claims.",
      "Binding, routing and policy still determine the remote path.",
      "Attack surface includes supplied content and outbound relationships.",
      "Unknown ownership calls for investigation before disruption."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g0-t3"
    ],
    "lab": {
      "objective": "Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Attack surfaces boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Capture the owned host listener inventory and label each endpoint with its service owner.",
        "Fault: add an undocumented management path to the paper inventory; identify missing authorization and logging.",
        "Restore the restriction in the plan and describe which source-specific observation would confirm it.",
        "Predict the baseline Attack surfaces result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build a local listener list, then compare it with the documented service owner list. On an optional isolated VM disable only an owned unused listener, verify its absence and verify required services remain usable. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "The restricted endpoint stays restricted while required services still work. Retest both negative and positive objectives. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Listener → Reachability → Vulnerability. Loopback and all-interface bindings have different intended boundaries. IPv6 can expose a separately controlled path.",
      "challenge": "Does hiding an API URL establish authorization? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Listener": "Local endpoint accepting traffic. Confirm ownership and bind address.",
      "Reachability": "A source can reach an endpoint. State source, path and protocol.",
      "Vulnerability": "An exploitable weakness in context. Inventory alone cannot establish it."
    },
    "sources": [
      {
        "title": "NIST SP 800-30 Rev. 1 risk assessment",
        "url": "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-41 Rev. 1 firewall policy",
        "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g0-t2-QC2",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Only Internet-facing interfaces were inventoried; what is missing?",
        "answer": "Internal and management paths.",
        "explanation": "Compromised internal sources can reach interfaces unavailable publicly.",
        "testedConcept": "Only Internet-facing interfaces were inventoried; what is missing?"
      },
      {
        "questionId": "s5-g0-t2-QC4",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the bind address?",
        "answer": "It helps identify which local interfaces expose the service.",
        "explanation": "Loopback and all-interface bindings have different intended boundaries.",
        "testedConcept": "Why record the bind address?"
      },
      {
        "questionId": "s5-g0-t2-QC8",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does hiding an API URL establish authorization?",
        "answer": "No.",
        "explanation": "Knowledge of a path is not protected identity or permission.",
        "testedConcept": "Does hiding an API URL establish authorization?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g0-t2-Q01",
        "topicId": "s5-g0-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An open TCP port is found; is a vulnerability proven?",
        "answer": "No.",
        "explanation": "Reachable service and exploitable weakness are different claims.",
        "testedConcept": "An open TCP port is found; is a vulnerability proven?",
        "options": [
          "Yes; TCP always exposes credentials.",
          "No; open ports can never be vulnerable.",
          "No.",
          "Yes; every listener is exploitable."
        ]
      },
      {
        "questionId": "s5-g0-t2-Q02",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Only Internet-facing interfaces were inventoried; what is missing?",
        "answer": "Internal and management paths.",
        "explanation": "Compromised internal sources can reach interfaces unavailable publicly.",
        "testedConcept": "Only Internet-facing interfaces were inventoried; what is missing?"
      },
      {
        "questionId": "s5-g0-t2-Q03",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a local listener prove remote reachability?",
        "answer": "No.",
        "explanation": "Binding, routing and policy still determine the remote path.",
        "testedConcept": "Does a local listener prove remote reachability?"
      },
      {
        "questionId": "s5-g0-t2-Q04",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the bind address?",
        "answer": "It helps identify which local interfaces expose the service.",
        "explanation": "Loopback and all-interface bindings have different intended boundaries.",
        "testedConcept": "Why record the bind address?"
      },
      {
        "questionId": "s5-g0-t2-Q05",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An outbound update channel is absent from the map; why care?",
        "answer": "It crosses a trust boundary into a dependency.",
        "explanation": "Attack surface includes supplied content and outbound relationships.",
        "testedConcept": "An outbound update channel is absent from the map; why care?"
      },
      {
        "questionId": "s5-g0-t2-Q06",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is IPv4 inventory sufficient for a dual-stack host?",
        "answer": "No.",
        "explanation": "IPv6 can expose a separately controlled path.",
        "testedConcept": "Is IPv4 inventory sufficient for a dual-stack host?"
      },
      {
        "questionId": "s5-g0-t2-Q07",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Who should approve removing an unexplained listener?",
        "answer": "The responsible service owner after dependency review.",
        "explanation": "Unknown ownership calls for investigation before disruption.",
        "testedConcept": "Who should approve removing an unexplained listener?"
      },
      {
        "questionId": "s5-g0-t2-Q08",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does hiding an API URL establish authorization?",
        "answer": "No.",
        "explanation": "Knowledge of a path is not protected identity or permission.",
        "testedConcept": "Does hiding an API URL establish authorization?"
      },
      {
        "questionId": "s5-g0-t2-Q09",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why avoid an unbounded discovery rate?",
        "answer": "It can disrupt the target and corrupt observations.",
        "explanation": "Choose a scoped read-only method for this exercise.",
        "testedConcept": "Why avoid an unbounded discovery rate?"
      },
      {
        "questionId": "s5-g0-t2-Q10",
        "topicId": "s5-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What demonstrates recovery after an exposure change?",
        "answer": "The restricted endpoint stays restricted while required services still work.",
        "explanation": "Retest both negative and positive objectives.",
        "testedConcept": "What demonstrates recovery after an exposure change?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g0-t3",
    "batch": "13",
    "title": "Segmentation",
    "subtitle": "Use users 192.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-segmentation",
    "definition": "Segmentation separates groups of systems and controls the flows that cross their boundaries. A VLAN separates a Layer 2 broadcast domain, while routing and policy determine inter-VLAN communication. A separate subnet with unrestricted routing is organizational separation without enforced access restriction. Start from a directional flow matrix rather than treating every connection inside a segment as trusted.",
    "purpose": "Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target.",
    "mental": "Identify source identity/segment, destination service and required protocol. Document support flows such as DNS and logging separately from application access so a broad permit does not conceal them. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "VLAN: Layer 2 broadcast separation. Routing can reconnect the domains.",
      "ACL boundary: Directional stateless filtering. Evaluate return traffic separately.",
      "Stateful boundary: Flow context under a policy. Validate path symmetry and expiry.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify source identity/segment, destination service and required protocol. Document support flows such as DNS and logging separately from application access so a broad permit does not conceal them.",
      "Place enforcement at a boundary that every relevant path crosses. Check alternate routing, IPv6, tunnels and host-local paths; a rule is ineffective if traffic bypasses its consuming attachment.",
      "Test required initiation and response paths, plus a prohibited cross-boundary transaction. Stateless ACLs do not remember a forward permit. Stateful devices can admit matching established responses under their own supported policy."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Segmentation separates groups of systems and controls the flows that cross their boundaries. A VLAN separates a Layer 2 broadcast domain, while routing and policy determine inter-VLAN communication. A separate subnet with unrestricted routing is organizational separation without enforced access restriction. Start from a directional flow matrix rather than treating every connection inside a segment as trusted."
      ],
      [
        "Identify the consuming boundary",
        "Identify source identity/segment, destination service and required protocol. Document support flows such as DNS and logging separately from application access so a broad permit does not conceal them."
      ],
      [
        "Follow the actual decision",
        "Place enforcement at a boundary that every relevant path crosses. Check alternate routing, IPv6, tunnels and host-local paths; a rule is ineffective if traffic bypasses its consuming attachment."
      ],
      [
        "Verify limits and recovery",
        "Test required initiation and response paths, plus a prohibited cross-boundary transaction. Stateless ACLs do not remember a forward permit. Stateful devices can admit matching established responses under their own supported policy."
      ]
    ],
    "comparison": [
      [
        "VLAN",
        "Layer 2 broadcast separation",
        "Routing can reconnect the domains."
      ],
      [
        "ACL boundary",
        "Directional stateless filtering",
        "Evaluate return traffic separately."
      ],
      [
        "Stateful boundary",
        "Flow context under a policy",
        "Validate path symmetry and expiry."
      ]
    ],
    "example": "Two VLANs route freely; is least-privilege segmentation enforced? No. Layer 2 separation does not restrict the routed flow matrix. Compare this with a different operational question: Should DNS be hidden in permit-any? No; document its required source and destination. Named dependencies support narrow explainable rules. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for Segmentation. Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Required HTTPS works and prohibited management initiation remains denied. Restoring a permit must not silently broaden the boundary. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Should DNS be hidden in permit-any?",
        "No; document its required source and destination. Named dependencies support narrow explainable rules."
      ],
      [
        "Why review IPv6 separately?",
        "An independently routed IPv6 path can bypass IPv4 policy. An IPv4 worksheet is not dual-stack enforcement evidence."
      ],
      [
        "Does an established stateful return admit a new reverse connection?",
        "No. A response belongs to the admitted flow; new initiation needs policy."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Segment management and sensitive services with independent identity controls. Avoid treating every member of a shared VLAN as equally authorized.",
    "performance": "Policy scale, logging and asymmetric paths affect enforcement cost. The worksheet performs one IPv4 tuple lookup; it makes no hardware throughput claim.",
    "mistakes": [
      "Layer 2 separation does not restrict the routed flow matrix.",
      "Configured intent cannot filter a bypass path.",
      "A service-specific permit is narrower than unrestricted routing.",
      "Location and identity are separate access inputs."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g0-t4"
    ],
    "lab": {
      "objective": "Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Segmentation boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Write the users-to-application HTTPS permit and an explicit prohibited users-to-management objective.",
        "Fault: move the broad deny above the required permit in the worksheet; predict the first match.",
        "Restore the exact order and separately test the prohibited flow and return-path requirement.",
        "Predict the baseline Segmentation result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use users 192.0.2.0/24, an application 198.51.100.10 and separate management. Permit only required HTTPS in the worksheet; plan reverse traffic explicitly on a stateless target. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Required HTTPS works and prohibited management initiation remains denied. Restoring a permit must not silently broaden the boundary. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "VLAN → ACL boundary → Stateful boundary. Named dependencies support narrow explainable rules. An IPv4 worksheet is not dual-stack enforcement evidence.",
      "challenge": "Does an established stateful return admit a new reverse connection? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "VLAN": "Layer 2 broadcast separation. Routing can reconnect the domains.",
      "ACL boundary": "Directional stateless filtering. Evaluate return traffic separately.",
      "Stateful boundary": "Flow context under a policy. Validate path symmetry and expiry."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-41 Rev. 1 firewall policy",
        "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g0-t3-QC2",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is the flow matrix directional?",
        "answer": "Initiation and return may meet different policy.",
        "explanation": "A forward permit alone does not establish a stateless reply permit.",
        "testedConcept": "Why is the flow matrix directional?"
      },
      {
        "questionId": "s5-g0-t3-QC4",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should DNS be hidden in permit-any?",
        "answer": "No; document its required source and destination.",
        "explanation": "Named dependencies support narrow explainable rules.",
        "testedConcept": "Should DNS be hidden in permit-any?"
      },
      {
        "questionId": "s5-g0-t3-QC8",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does an established stateful return admit a new reverse connection?",
        "answer": "No.",
        "explanation": "A response belongs to the admitted flow; new initiation needs policy.",
        "testedConcept": "Does an established stateful return admit a new reverse connection?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g0-t3-Q01",
        "topicId": "s5-g0-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two VLANs route freely; is least-privilege segmentation enforced?",
        "answer": "No.",
        "explanation": "Layer 2 separation does not restrict the routed flow matrix.",
        "testedConcept": "Two VLANs route freely; is least-privilege segmentation enforced?",
        "options": [
          "Yes; a gateway cannot route between VLANs.",
          "No.",
          "Yes; different VLAN numbers enforce every routed restriction.",
          "Yes; subnet names authenticate users."
        ]
      },
      {
        "questionId": "s5-g0-t3-Q02",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is the flow matrix directional?",
        "answer": "Initiation and return may meet different policy.",
        "explanation": "A forward permit alone does not establish a stateless reply permit.",
        "testedConcept": "Why is the flow matrix directional?"
      },
      {
        "questionId": "s5-g0-t3-Q03",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An ACL exists but traffic takes another interface; what failed?",
        "answer": "The consuming enforcement boundary.",
        "explanation": "Configured intent cannot filter a bypass path.",
        "testedConcept": "An ACL exists but traffic takes another interface; what failed?"
      },
      {
        "questionId": "s5-g0-t3-Q04",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should DNS be hidden in permit-any?",
        "answer": "No; document its required source and destination.",
        "explanation": "Named dependencies support narrow explainable rules.",
        "testedConcept": "Should DNS be hidden in permit-any?"
      },
      {
        "questionId": "s5-g0-t3-Q05",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Users need HTTPS to one application; what should be permitted?",
        "answer": "The intended source range, application address and TCP destination 443.",
        "explanation": "A service-specific permit is narrower than unrestricted routing.",
        "testedConcept": "Users need HTTPS to one application; what should be permitted?"
      },
      {
        "questionId": "s5-g0-t3-Q06",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review IPv6 separately?",
        "answer": "An independently routed IPv6 path can bypass IPv4 policy.",
        "explanation": "An IPv4 worksheet is not dual-stack enforcement evidence.",
        "testedConcept": "Why review IPv6 separately?"
      },
      {
        "questionId": "s5-g0-t3-Q07",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can two hosts in one VLAN be differently authorized?",
        "answer": "Yes.",
        "explanation": "Location and identity are separate access inputs.",
        "testedConcept": "Can two hosts in one VLAN be differently authorized?"
      },
      {
        "questionId": "s5-g0-t3-Q08",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does an established stateful return admit a new reverse connection?",
        "answer": "No.",
        "explanation": "A response belongs to the admitted flow; new initiation needs policy.",
        "testedConcept": "Does an established stateful return admit a new reverse connection?"
      },
      {
        "questionId": "s5-g0-t3-Q09",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What scale observation is useful?",
        "answer": "Policy evaluation, logging and service latency under equivalent load.",
        "explanation": "Rule count alone does not predict target capacity.",
        "testedConcept": "What scale observation is useful?"
      },
      {
        "questionId": "s5-g0-t3-Q10",
        "topicId": "s5-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify segmentation recovery?",
        "answer": "Required HTTPS works and prohibited management initiation remains denied.",
        "explanation": "Restoring a permit must not silently broaden the boundary.",
        "testedConcept": "How do you verify segmentation recovery?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g0-t4",
    "batch": "13",
    "title": "Defense in depth",
    "subtitle": "Design a service with an ACL, application role check and protected backup.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-depth",
    "definition": "Defense in depth combines controls across different failure boundaries so one mistake does not expose the entire objective. Examples include identity checks, directional network policy, host authorization, authenticated transport, detection and tested recovery. Several appliances managed by the same compromised account may represent one common failure domain rather than independent layers.",
    "purpose": "Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan.",
    "mental": "Trace one concrete abuse path from source through network boundary to application and data. For each step identify what stops, detects or repairs the event and what evidence would show that control being consumed. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Independent declared CIA consequences, without risk scoring or likelihood estimation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Preventive control: Stops a specified event. Show actual consuming attachment.",
      "Detective control: Produces actionable evidence. Assign an observer and response owner.",
      "Corrective control: Restores the objective. Test trusted recovery artifacts.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Trace one concrete abuse path from source through network boundary to application and data. For each step identify what stops, detects or repairs the event and what evidence would show that control being consumed.",
      "Analyze shared dependencies: administrator identities, signing keys, central policy, power and logging. Two controls fail together when their apparent independence relies on the same compromised input.",
      "Rehearse one control failure while retaining the other declared protections. Explain the remaining exposure instead of multiplying assumed failure probabilities or declaring the entire design safe."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Defense in depth combines controls across different failure boundaries so one mistake does not expose the entire objective. Examples include identity checks, directional network policy, host authorization, authenticated transport, detection and tested recovery. Several appliances managed by the same compromised account may represent one common failure domain rather than independent layers."
      ],
      [
        "Identify the consuming boundary",
        "Trace one concrete abuse path from source through network boundary to application and data. For each step identify what stops, detects or repairs the event and what evidence would show that control being consumed."
      ],
      [
        "Follow the actual decision",
        "Analyze shared dependencies: administrator identities, signing keys, central policy, power and logging. Two controls fail together when their apparent independence relies on the same compromised input."
      ],
      [
        "Verify limits and recovery",
        "Rehearse one control failure while retaining the other declared protections. Explain the remaining exposure instead of multiplying assumed failure probabilities or declaring the entire design safe."
      ]
    ],
    "comparison": [
      [
        "Preventive control",
        "Stops a specified event",
        "Show actual consuming attachment."
      ],
      [
        "Detective control",
        "Produces actionable evidence",
        "Assign an observer and response owner."
      ],
      [
        "Corrective control",
        "Restores the objective",
        "Test trusted recovery artifacts."
      ]
    ],
    "example": "Two firewalls share an administrator credential; are they independent? Not against compromise of that credential. Shared control ownership can create a common failure domain. Compare this with a different operational question: Why trace a concrete abuse path? To connect each control to a relevant boundary. Counting products does not establish coverage. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Risk principles have no intrinsic transport port; inventory the actual protected operations.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "sha256sum labs/network-security-workbook.md",
        "explanation": "Observe the installed context for Defense in depth. Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. The unchanged independent controls and explicit residual exposure. Do not disable every protection to test one failure. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why trace a concrete abuse path?",
        "To connect each control to a relevant boundary. Counting products does not establish coverage."
      ],
      [
        "May probabilities be multiplied without independence evidence?",
        "No. Correlated failures invalidate that shortcut."
      ],
      [
        "Does a valid backup prove recovery time?",
        "No. Restore and original-service verification are required."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect the control-management path and recovery credentials. Do not let a monitoring or backup account inherit unrestricted production administration.",
    "performance": "Additional controls add policy, latency and operational work. Measure the protected transaction and recovery time; remove duplicated noise rather than a required independent boundary.",
    "mistakes": [
      "Shared control ownership can create a common failure domain.",
      "A configured log destination alone does not prove useful detection.",
      "The remaining exposure must still be assessed explicitly.",
      "A shared admin path can defeat apparent depth."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g1-t0"
    ],
    "lab": {
      "objective": "Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Defense in depth boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Map three independent boundaries for the same protected data operation.",
        "Fault: mark the ACL unavailable but retain the application authorization; identify which exposure remains.",
        "Restore the ACL declaration and preserve the application-denial and recovery requirements.",
        "Predict the baseline Defense in depth result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Design a service with an ACL, application role check and protected backup. Assign separate control owners and a recovery procedure; include an intentional denied read in the acceptance plan. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "The unchanged independent controls and explicit residual exposure. Do not disable every protection to test one failure. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Preventive control → Detective control → Corrective control. Counting products does not establish coverage. Correlated failures invalidate that shortcut.",
      "challenge": "Does a valid backup prove recovery time? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Preventive control": "Stops a specified event. Show actual consuming attachment.",
      "Detective control": "Produces actionable evidence. Assign an observer and response owner.",
      "Corrective control": "Restores the objective. Test trusted recovery artifacts."
    },
    "sources": [
      {
        "title": "NIST SP 800-30 Rev. 1 risk assessment",
        "url": "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-207 zero trust",
        "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g0-t4-QC2",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a backup prevent an unauthorized read?",
        "answer": "No.",
        "explanation": "Recovery capability does not enforce confidentiality at access time.",
        "testedConcept": "Can a backup prevent an unauthorized read?"
      },
      {
        "questionId": "s5-g0-t4-QC4",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why trace a concrete abuse path?",
        "answer": "To connect each control to a relevant boundary.",
        "explanation": "Counting products does not establish coverage.",
        "testedConcept": "Why trace a concrete abuse path?"
      },
      {
        "questionId": "s5-g0-t4-QC8",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a valid backup prove recovery time?",
        "answer": "No.",
        "explanation": "Restore and original-service verification are required.",
        "testedConcept": "Does a valid backup prove recovery time?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g0-t4-Q01",
        "topicId": "s5-g0-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two firewalls share an administrator credential; are they independent?",
        "answer": "Not against compromise of that credential.",
        "explanation": "Shared control ownership can create a common failure domain.",
        "testedConcept": "Two firewalls share an administrator credential; are they independent?",
        "options": [
          "Not against compromise of that credential.",
          "Yes; the appliance count proves independence.",
          "Yes; different IP addresses eliminate shared failures.",
          "Yes; a common credential protects both equally."
        ]
      },
      {
        "questionId": "s5-g0-t4-Q02",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a backup prevent an unauthorized read?",
        "answer": "No.",
        "explanation": "Recovery capability does not enforce confidentiality at access time.",
        "testedConcept": "Can a backup prevent an unauthorized read?"
      },
      {
        "questionId": "s5-g0-t4-Q03",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which evidence supports a detective control?",
        "answer": "An actionable observed event with an assigned response path.",
        "explanation": "A configured log destination alone does not prove useful detection.",
        "testedConcept": "Which evidence supports a detective control?"
      },
      {
        "questionId": "s5-g0-t4-Q04",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why trace a concrete abuse path?",
        "answer": "To connect each control to a relevant boundary.",
        "explanation": "Counting products does not establish coverage.",
        "testedConcept": "Why trace a concrete abuse path?"
      },
      {
        "questionId": "s5-g0-t4-Q05",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One ACL fails but application roles hold; is risk zero?",
        "answer": "No.",
        "explanation": "The remaining exposure must still be assessed explicitly.",
        "testedConcept": "One ACL fails but application roles hold; is risk zero?"
      },
      {
        "questionId": "s5-g0-t4-Q06",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "May probabilities be multiplied without independence evidence?",
        "answer": "No.",
        "explanation": "Correlated failures invalidate that shortcut.",
        "testedConcept": "May probabilities be multiplied without independence evidence?"
      },
      {
        "questionId": "s5-g0-t4-Q07",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect the management plane of controls?",
        "answer": "Compromise can disable multiple protective layers.",
        "explanation": "A shared admin path can defeat apparent depth.",
        "testedConcept": "Why protect the management plane of controls?"
      },
      {
        "questionId": "s5-g0-t4-Q08",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a valid backup prove recovery time?",
        "answer": "No.",
        "explanation": "Restore and original-service verification are required.",
        "testedConcept": "Does a valid backup prove recovery time?"
      },
      {
        "questionId": "s5-g0-t4-Q09",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What operational cost grows with more layers?",
        "answer": "Policy coordination, latency and maintenance.",
        "explanation": "Evaluate the service rather than assuming more layers are free.",
        "testedConcept": "What operational cost grows with more layers?"
      },
      {
        "questionId": "s5-g0-t4-Q10",
        "topicId": "s5-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a one-layer-failure rehearsal retain?",
        "answer": "The unchanged independent controls and explicit residual exposure.",
        "explanation": "Do not disable every protection to test one failure.",
        "testedConcept": "What should a one-layer-failure rehearsal retain?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g1-t0",
    "batch": "13",
    "title": "ACL",
    "subtitle": "Build the whole owned list before attachment and preserve an independent console.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-acl",
    "definition": "An IPv4 packet-filter ACL is an ordered list of match/action entries consumed at a specified attachment. The first matching entry decides permit or deny; a later specific entry cannot override an earlier broad match. A nonempty conventional IP filtering ACL ends with implicit deny. This worksheet assumes an attached nonempty list; absent/empty lists and other consumers have platform-specific semantics.",
    "purpose": "Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny.",
    "mental": "Record ingress or egress attachment, actual packet source/destination and protocol before matching. NAT, tunnels and locally generated traffic can change which tuple the chosen observer sees. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "First match: Earliest matching entry decides. A later permit cannot override it.",
      "Wildcard: Zero compare, one ignore. Do not assume contiguous prefix bits.",
      "Implicit deny: No matching permit in this nonempty list. Attachment and consumer must be known.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Record ingress or egress attachment, actual packet source/destination and protocol before matching. NAT, tunnels and locally generated traffic can change which tuple the chosen observer sees.",
      "For each entry, compare only fields that type supports. A wildcard bit zero requires equality and a wildcard bit one ignores that bit; noncontiguous wildcards are valid bit patterns and are not necessarily prefixes.",
      "Stop at the first match and retain its sequence/action as the evidence. If no entry matches, show implicit deny. A permit is one policy decision, not proof of routing, response delivery or application authorization."
    ],
    "flow": [
      [
        "Define the protected operation",
        "An IPv4 packet-filter ACL is an ordered list of match/action entries consumed at a specified attachment. The first matching entry decides permit or deny; a later specific entry cannot override an earlier broad match. A nonempty conventional IP filtering ACL ends with implicit deny. This worksheet assumes an attached nonempty list; absent/empty lists and other consumers have platform-specific semantics."
      ],
      [
        "Identify the consuming boundary",
        "Record ingress or egress attachment, actual packet source/destination and protocol before matching. NAT, tunnels and locally generated traffic can change which tuple the chosen observer sees."
      ],
      [
        "Follow the actual decision",
        "For each entry, compare only fields that type supports. A wildcard bit zero requires equality and a wildcard bit one ignores that bit; noncontiguous wildcards are valid bit patterns and are not necessarily prefixes."
      ],
      [
        "Verify limits and recovery",
        "Stop at the first match and retain its sequence/action as the evidence. If no entry matches, show implicit deny. A permit is one policy decision, not proof of routing, response delivery or application authorization."
      ]
    ],
    "comparison": [
      [
        "First match",
        "Earliest matching entry decides",
        "A later permit cannot override it."
      ],
      [
        "Wildcard",
        "Zero compare, one ignore",
        "Do not assume contiguous prefix bits."
      ],
      [
        "Implicit deny",
        "No matching permit in this nonempty list",
        "Attachment and consumer must be known."
      ]
    ],
    "example": "Deny-any precedes a specific permit; which wins? Deny-any. First match terminates evaluation. Compare this with a different operational question: Does a permit establish application success? No. Routing, reply policy and application authorization are separate. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for ACL. Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Repeat the original tuple and the prohibited tuple at the same attachment. A reordered configuration alone does not prove consumed filtering. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does a permit establish application success?",
        "No. Routing, reply policy and application authorization are separate."
      ],
      [
        "Are all wildcard masks contiguous subnet inverses?",
        "No. Noncontiguous ignored bits are supported by bit matching."
      ],
      [
        "An absent named ACL is referenced; assume deny-all?",
        "No; inspect actual platform/consumer semantics. This worksheet deliberately excludes absent and empty list behavior."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Use the narrow required tuple. ACLs are stateless; the TCP established keyword checks certain flag bits and does not replace a stateful connection tracker.",
    "performance": "Hardware offload, rule capacity and logging differ by platform. This ordered worksheet proves bit/tuple selection only and never measures target TCAM capacity.",
    "mistakes": [
      "First match terminates evaluation.",
      "The worksheet models ordinary packet-filter ACL semantics.",
      "An unattached rule has no filtering effect.",
      "A flag check is not stateful tracking or protected identity."
    ],
    "prerequisites": [
      "s5-g0-t3"
    ],
    "related": [
      "s5-g1-t1"
    ],
    "lab": {
      "objective": "Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "ACL boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the selected tuple and all ordered entries; predict the matching sequence before running the worksheet.",
        "Fault: put deny-any before the HTTPS permit and repeat the same tuple.",
        "Restore the original order; keep denied alternate-service and separate return-path evidence.",
        "Predict the baseline ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build the whole owned list before attachment and preserve an independent console. Review explicit deny counters and a bounded permitted transaction; an empty/absent named ACL must never be assumed to enforce implicit deny. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Repeat the original tuple and the prohibited tuple at the same attachment. A reordered configuration alone does not prove consumed filtering. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "First match → Wildcard → Implicit deny. Routing, reply policy and application authorization are separate. Noncontiguous ignored bits are supported by bit matching.",
      "challenge": "An absent named ACL is referenced; assume deny-all? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "First match": "Earliest matching entry decides. A later permit cannot override it.",
      "Wildcard": "Zero compare, one ignore. Do not assume contiguous prefix bits.",
      "Implicit deny": "No matching permit in this nonempty list. Attachment and consumer must be known."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g1-t0-QC2",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a wildcard zero bit require?",
        "answer": "The corresponding address bit must match.",
        "explanation": "One bits are ignored; zero bits compare.",
        "testedConcept": "What does a wildcard zero bit require?"
      },
      {
        "questionId": "s5-g1-t0-QC4",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a permit establish application success?",
        "answer": "No.",
        "explanation": "Routing, reply policy and application authorization are separate.",
        "testedConcept": "Does a permit establish application success?"
      },
      {
        "questionId": "s5-g1-t0-QC8",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "An absent named ACL is referenced; assume deny-all?",
        "answer": "No; inspect actual platform/consumer semantics.",
        "explanation": "This worksheet deliberately excludes absent and empty list behavior.",
        "testedConcept": "An absent named ACL is referenced; assume deny-all?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g1-t0-Q01",
        "topicId": "s5-g1-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Deny-any precedes a specific permit; which wins?",
        "answer": "Deny-any.",
        "explanation": "First match terminates evaluation.",
        "testedConcept": "Deny-any precedes a specific permit; which wins?",
        "options": [
          "The later specific permit.",
          "Both entries are combined.",
          "The longest source prefix always wins.",
          "Deny-any."
        ]
      },
      {
        "questionId": "s5-g1-t0-Q02",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a wildcard zero bit require?",
        "answer": "The corresponding address bit must match.",
        "explanation": "One bits are ignored; zero bits compare.",
        "testedConcept": "What does a wildcard zero bit require?"
      },
      {
        "questionId": "s5-g1-t0-Q03",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "No entry matches in the attached nonempty list; result?",
        "answer": "Implicit deny.",
        "explanation": "The worksheet models ordinary packet-filter ACL semantics.",
        "testedConcept": "No entry matches in the attached nonempty list; result?"
      },
      {
        "questionId": "s5-g1-t0-Q04",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a permit establish application success?",
        "answer": "No.",
        "explanation": "Routing, reply policy and application authorization are separate.",
        "testedConcept": "Does a permit establish application success?"
      },
      {
        "questionId": "s5-g1-t0-Q05",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record ingress or egress direction?",
        "answer": "It identifies which packets consume the list.",
        "explanation": "An unattached rule has no filtering effect.",
        "testedConcept": "Why record ingress or egress direction?"
      },
      {
        "questionId": "s5-g1-t0-Q06",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Are all wildcard masks contiguous subnet inverses?",
        "answer": "No.",
        "explanation": "Noncontiguous ignored bits are supported by bit matching.",
        "testedConcept": "Are all wildcard masks contiguous subnet inverses?"
      },
      {
        "questionId": "s5-g1-t0-Q07",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does TCP established authenticate a connection?",
        "answer": "No.",
        "explanation": "A flag check is not stateful tracking or protected identity.",
        "testedConcept": "Does TCP established authenticate a connection?"
      },
      {
        "questionId": "s5-g1-t0-Q08",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "An absent named ACL is referenced; assume deny-all?",
        "answer": "No; inspect actual platform/consumer semantics.",
        "explanation": "This worksheet deliberately excludes absent and empty list behavior.",
        "testedConcept": "An absent named ACL is referenced; assume deny-all?"
      },
      {
        "questionId": "s5-g1-t0-Q09",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why log a broad deny cautiously?",
        "answer": "Logging can add processing and storage load.",
        "explanation": "Counter and selective-event evidence can be more useful than every packet.",
        "testedConcept": "Why log a broad deny cautiously?"
      },
      {
        "questionId": "s5-g1-t0-Q10",
        "topicId": "s5-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify an ACL repair?",
        "answer": "Repeat the original tuple and the prohibited tuple at the same attachment.",
        "explanation": "A reordered configuration alone does not prove consumed filtering.",
        "testedConcept": "How do you verify an ACL repair?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g1-t1",
    "batch": "13",
    "title": "Standard ACL",
    "subtitle": "Use a disposable destination-side boundary; permit 192.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-standard-acl",
    "definition": "A standard IPv4 ACL primarily matches packet source addresses. It cannot express a destination-specific HTTPS exception with a port match. This narrower match vocabulary makes consuming context crucial: the same permitted source may access many destinations if the list sits before a broad routed domain. Standard ACL placement close to the destination is a design heuristic, not a substitute for path analysis.",
    "purpose": "Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope.",
    "mental": "Select the packet source as observed at the consuming interface. Source matching can identify a network location but does not authenticate the person or device using it. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Attached nonempty source-only IPv4 list; destination/protocol/port are context, not matched. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Source address: Standard-list match input. Location is not authenticated identity.",
      "Destination context: Not matched by standard ACL. Placement controls the affected services.",
      "Extended list: Additional tuple fields. Use when destination/protocol/port matter.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Select the packet source as observed at the consuming interface. Source matching can identify a network location but does not authenticate the person or device using it.",
      "Evaluate ordered source/wildcard entries. Destination, protocol and transport port remain visible in the worksheet as context but do not participate in a standard-list decision.",
      "Compare the desired service matrix with what source-only filtering can actually express. If two destinations need different permissions at one attachment, choose an appropriate extended or identity-aware control."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A standard IPv4 ACL primarily matches packet source addresses. It cannot express a destination-specific HTTPS exception with a port match. This narrower match vocabulary makes consuming context crucial: the same permitted source may access many destinations if the list sits before a broad routed domain. Standard ACL placement close to the destination is a design heuristic, not a substitute for path analysis."
      ],
      [
        "Identify the consuming boundary",
        "Select the packet source as observed at the consuming interface. Source matching can identify a network location but does not authenticate the person or device using it."
      ],
      [
        "Follow the actual decision",
        "Evaluate ordered source/wildcard entries. Destination, protocol and transport port remain visible in the worksheet as context but do not participate in a standard-list decision."
      ],
      [
        "Verify limits and recovery",
        "Compare the desired service matrix with what source-only filtering can actually express. If two destinations need different permissions at one attachment, choose an appropriate extended or identity-aware control."
      ]
    ],
    "comparison": [
      [
        "Source address",
        "Standard-list match input",
        "Location is not authenticated identity."
      ],
      [
        "Destination context",
        "Not matched by standard ACL",
        "Placement controls the affected services."
      ],
      [
        "Extended list",
        "Additional tuple fields",
        "Use when destination/protocol/port matter."
      ]
    ],
    "example": "Can a standard ACL match TCP destination 443? No. Its modeled decision uses source address only. Compare this with a different operational question: Does permitting 192.0.2.0/24 authenticate its users? No. Address location and protected identity are different. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for Standard ACL. Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Same source to two different services. Both tuples should get the same list decision in this worksheet. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does permitting 192.0.2.0/24 authenticate its users?",
        "No. Address location and protected identity are different."
      ],
      [
        "Why retain destination fields in the trace?",
        "To show what the decision deliberately ignores. Visible context must not be mistaken for a matched field."
      ],
      [
        "What attachment evidence is required?",
        "The actual interface direction consuming the list. Creating a standard list does not apply it."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Source spoofing protections and identity controls are separate. A standard ACL must not be described as user authentication.",
    "performance": "A shorter match vocabulary is not a universal performance guarantee. Confirm the actual forwarding/offload path and required policy expressiveness.",
    "mistakes": [
      "Its modeled decision uses source address only.",
      "Actual paths still determine whether the heuristic is suitable.",
      "The source-only nonempty list has no matching permit.",
      "Source-only rules cannot encode that requirement."
    ],
    "prerequisites": [
      "s5-g0-t3"
    ],
    "related": [
      "s5-g1-t2"
    ],
    "lab": {
      "objective": "Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Standard ACL boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Choose the standard-list worksheet and vary destination port while preserving the source.",
        "Fault: change source to 203.0.113.8 and observe implicit deny.",
        "Restore 192.0.2.8; state why both HTTPS and SSH from that permitted source receive the same list decision.",
        "Predict the baseline Standard ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable destination-side boundary; permit 192.0.2.0/24 and deny other sources. Test two destinations from the same source to expose the intentionally limited match scope. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Same source to two different services. Both tuples should get the same list decision in this worksheet. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Source address → Destination context → Extended list. Address location and protected identity are different. Visible context must not be mistaken for a matched field.",
      "challenge": "What attachment evidence is required? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Source address": "Standard-list match input. Location is not authenticated identity.",
      "Destination context": "Not matched by standard ACL. Placement controls the affected services.",
      "Extended list": "Additional tuple fields. Use when destination/protocol/port matter."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g1-t1-QC2",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Same source, different destination: can this list distinguish them?",
        "answer": "No.",
        "explanation": "Destination context belongs to a different match vocabulary or attachment.",
        "testedConcept": "Same source, different destination: can this list distinguish them?"
      },
      {
        "questionId": "s5-g1-t1-QC4",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does permitting 192.0.2.0/24 authenticate its users?",
        "answer": "No.",
        "explanation": "Address location and protected identity are different.",
        "testedConcept": "Does permitting 192.0.2.0/24 authenticate its users?"
      },
      {
        "questionId": "s5-g1-t1-QC8",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What attachment evidence is required?",
        "answer": "The actual interface direction consuming the list.",
        "explanation": "Creating a standard list does not apply it.",
        "testedConcept": "What attachment evidence is required?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g1-t1-Q01",
        "topicId": "s5-g1-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Can a standard ACL match TCP destination 443?",
        "answer": "No.",
        "explanation": "Its modeled decision uses source address only.",
        "testedConcept": "Can a standard ACL match TCP destination 443?",
        "options": [
          "Yes; it matches every tuple field.",
          "Only when the destination is a server.",
          "No.",
          "Yes; naming enables destination ports."
        ]
      },
      {
        "questionId": "s5-g1-t1-Q02",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Same source, different destination: can this list distinguish them?",
        "answer": "No.",
        "explanation": "Destination context belongs to a different match vocabulary or attachment.",
        "testedConcept": "Same source, different destination: can this list distinguish them?"
      },
      {
        "questionId": "s5-g1-t1-Q03",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is destination-side placement often suggested?",
        "answer": "To reduce unintended blocking across other destinations.",
        "explanation": "Actual paths still determine whether the heuristic is suitable.",
        "testedConcept": "Why is destination-side placement often suggested?"
      },
      {
        "questionId": "s5-g1-t1-Q04",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does permitting 192.0.2.0/24 authenticate its users?",
        "answer": "No.",
        "explanation": "Address location and protected identity are different.",
        "testedConcept": "Does permitting 192.0.2.0/24 authenticate its users?"
      },
      {
        "questionId": "s5-g1-t1-Q05",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Source changes outside the permitted range; what happens here?",
        "answer": "Implicit deny.",
        "explanation": "The source-only nonempty list has no matching permit.",
        "testedConcept": "Source changes outside the permitted range; what happens here?"
      },
      {
        "questionId": "s5-g1-t1-Q06",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why retain destination fields in the trace?",
        "answer": "To show what the decision deliberately ignores.",
        "explanation": "Visible context must not be mistaken for a matched field.",
        "testedConcept": "Why retain destination fields in the trace?"
      },
      {
        "questionId": "s5-g1-t1-Q07",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Need different TCP ports for the same source; choose what?",
        "answer": "An extended or other service-aware policy.",
        "explanation": "Source-only rules cannot encode that requirement.",
        "testedConcept": "Need different TCP ports for the same source; choose what?"
      },
      {
        "questionId": "s5-g1-t1-Q08",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What attachment evidence is required?",
        "answer": "The actual interface direction consuming the list.",
        "explanation": "Creating a standard list does not apply it.",
        "testedConcept": "What attachment evidence is required?"
      },
      {
        "questionId": "s5-g1-t1-Q09",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is standard filtering always faster?",
        "answer": "No such universal claim is justified.",
        "explanation": "Implementation/offload governs target performance.",
        "testedConcept": "Is standard filtering always faster?"
      },
      {
        "questionId": "s5-g1-t1-Q10",
        "topicId": "s5-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What pair of tests exposes source-only scope?",
        "answer": "Same source to two different services.",
        "explanation": "Both tuples should get the same list decision in this worksheet.",
        "testedConcept": "What pair of tests exposes source-only scope?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g1-t2",
    "batch": "13",
    "title": "Extended ACL",
    "subtitle": "Permit users 192.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-extended-acl",
    "definition": "An extended IPv4 ACL can express source, destination, protocol and supported protocol-specific fields such as TCP or UDP ports. Ordered selection remains the same as for a standard list. Richer matching enables narrow service policy but requires the operator to know the tuple at the attachment, including translations and direction. This worksheet handles whole TCP/UDP/ICMP packets, not fragments or vendor-specific options.",
    "purpose": "Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result.",
    "mental": "Translate the requirement into the observed source range, destination address, protocol and destination service port. A client ephemeral source port is different from the server listening port. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Destination port: Server service number in this forward tuple. Do not confuse client ephemeral ports.",
      "Protocol: TCP and UDP are separate matches. A shared numeric port does not merge transports.",
      "Direction: Tuple as consumed at one attachment. Response traffic requires separate analysis.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Translate the requirement into the observed source range, destination address, protocol and destination service port. A client ephemeral source port is different from the server listening port.",
      "Match all configured fields in each entry, then stop at the first matching action. A UDP packet to numeric port 443 does not match a TCP-only rule even though the number is equal.",
      "Evaluate response and new reverse initiation separately. Stateless permits do not allocate connection state; add the required scoped response treatment or select a supported stateful boundary."
    ],
    "flow": [
      [
        "Define the protected operation",
        "An extended IPv4 ACL can express source, destination, protocol and supported protocol-specific fields such as TCP or UDP ports. Ordered selection remains the same as for a standard list. Richer matching enables narrow service policy but requires the operator to know the tuple at the attachment, including translations and direction. This worksheet handles whole TCP/UDP/ICMP packets, not fragments or vendor-specific options."
      ],
      [
        "Identify the consuming boundary",
        "Translate the requirement into the observed source range, destination address, protocol and destination service port. A client ephemeral source port is different from the server listening port."
      ],
      [
        "Follow the actual decision",
        "Match all configured fields in each entry, then stop at the first matching action. A UDP packet to numeric port 443 does not match a TCP-only rule even though the number is equal."
      ],
      [
        "Verify limits and recovery",
        "Evaluate response and new reverse initiation separately. Stateless permits do not allocate connection state; add the required scoped response treatment or select a supported stateful boundary."
      ]
    ],
    "comparison": [
      [
        "Destination port",
        "Server service number in this forward tuple",
        "Do not confuse client ephemeral ports."
      ],
      [
        "Protocol",
        "TCP and UDP are separate matches",
        "A shared numeric port does not merge transports."
      ],
      [
        "Direction",
        "Tuple as consumed at one attachment",
        "Response traffic requires separate analysis."
      ]
    ],
    "example": "TCP 443 is permitted; does UDP 443 match? No. The protocol field is a separate condition. Compare this with a different operational question: Same source/port but different server; permitted here? No. The destination address must also match. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for Extended ACL. Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore the intended protocol and repeat allowed and denied tuples. Do not broaden every protocol to hide the mismatch. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Same source/port but different server; permitted here?",
        "No. The destination address must also match."
      ],
      [
        "Does this whole-packet worksheet model noninitial fragments?",
        "No. Transport fields may be absent and target fragment behavior needs separate review."
      ],
      [
        "Need to permit only one service; is permit-ip-any appropriate?",
        "No. It broadens the policy beyond the required tuple."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Exclude fragments, TCP flag options and NAT processing from this arithmetic worksheet. Do not export its result as effective production firewall policy.",
    "performance": "More specific fields improve expressiveness but do not establish hardware capacity. Review logging and target parser/offload behavior at the selected release.",
    "mistakes": [
      "The protocol field is a separate condition.",
      "Match the tuple actually consumed by this list.",
      "Extended matching does not change first-match order.",
      "The ACL is stateless."
    ],
    "prerequisites": [
      "s5-g0-t3"
    ],
    "related": [
      "s5-g1-t3"
    ],
    "lab": {
      "objective": "Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Extended ACL boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the exact required TCP tuple and permit scope in the worksheet.",
        "Fault: change only protocol to UDP while keeping port 443.",
        "Restore TCP; test destination port 22 and explain its denied result without claiming the application was attacked.",
        "Predict the baseline Extended ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Restore the intended protocol and repeat allowed and denied tuples. Do not broaden every protocol to hide the mismatch. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Destination port → Protocol → Direction. The destination address must also match. Transport fields may be absent and target fragment behavior needs separate review.",
      "challenge": "Need to permit only one service; is permit-ip-any appropriate? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Destination port": "Server service number in this forward tuple. Do not confuse client ephemeral ports.",
      "Protocol": "TCP and UDP are separate matches. A shared numeric port does not merge transports.",
      "Direction": "Tuple as consumed at one attachment. Response traffic requires separate analysis."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g1-t2-QC2",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which port is normally 443 in the forward client request?",
        "answer": "The destination service port.",
        "explanation": "The client source port is usually ephemeral.",
        "testedConcept": "Which port is normally 443 in the forward client request?"
      },
      {
        "questionId": "s5-g1-t2-QC4",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Same source/port but different server; permitted here?",
        "answer": "No.",
        "explanation": "The destination address must also match.",
        "testedConcept": "Same source/port but different server; permitted here?"
      },
      {
        "questionId": "s5-g1-t2-QC8",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Need to permit only one service; is permit-ip-any appropriate?",
        "answer": "No.",
        "explanation": "It broadens the policy beyond the required tuple.",
        "testedConcept": "Need to permit only one service; is permit-ip-any appropriate?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g1-t2-Q01",
        "topicId": "s5-g1-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "TCP 443 is permitted; does UDP 443 match?",
        "answer": "No.",
        "explanation": "The protocol field is a separate condition.",
        "testedConcept": "TCP 443 is permitted; does UDP 443 match?",
        "options": [
          "Only if the client source port is 443.",
          "No.",
          "Yes; equal port numbers merge protocols.",
          "Yes; UDP inherits TCP permissions."
        ]
      },
      {
        "questionId": "s5-g1-t2-Q02",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which port is normally 443 in the forward client request?",
        "answer": "The destination service port.",
        "explanation": "The client source port is usually ephemeral.",
        "testedConcept": "Which port is normally 443 in the forward client request?"
      },
      {
        "questionId": "s5-g1-t2-Q03",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect NAT relative to the attachment?",
        "answer": "The observed addresses may differ before and after translation.",
        "explanation": "Match the tuple actually consumed by this list.",
        "testedConcept": "Why inspect NAT relative to the attachment?"
      },
      {
        "questionId": "s5-g1-t2-Q04",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Same source/port but different server; permitted here?",
        "answer": "No.",
        "explanation": "The destination address must also match.",
        "testedConcept": "Same source/port but different server; permitted here?"
      },
      {
        "questionId": "s5-g1-t2-Q05",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A specific permit follows a broad deny; result?",
        "answer": "The earlier deny.",
        "explanation": "Extended matching does not change first-match order.",
        "testedConcept": "A specific permit follows a broad deny; result?"
      },
      {
        "questionId": "s5-g1-t2-Q06",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does this whole-packet worksheet model noninitial fragments?",
        "answer": "No.",
        "explanation": "Transport fields may be absent and target fragment behavior needs separate review.",
        "testedConcept": "Does this whole-packet worksheet model noninitial fragments?"
      },
      {
        "questionId": "s5-g1-t2-Q07",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does forward permit create response state?",
        "answer": "No.",
        "explanation": "The ACL is stateless.",
        "testedConcept": "Does forward permit create response state?"
      },
      {
        "questionId": "s5-g1-t2-Q08",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Need to permit only one service; is permit-ip-any appropriate?",
        "answer": "No.",
        "explanation": "It broadens the policy beyond the required tuple.",
        "testedConcept": "Need to permit only one service; is permit-ip-any appropriate?"
      },
      {
        "questionId": "s5-g1-t2-Q09",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What proves platform support for a match option?",
        "answer": "The selected release documentation and target parser/behavior check.",
        "explanation": "A browser trace cannot validate device syntax.",
        "testedConcept": "What proves platform support for a match option?"
      },
      {
        "questionId": "s5-g1-t2-Q10",
        "topicId": "s5-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How should a protocol mismatch be repaired?",
        "answer": "Restore the intended protocol and repeat allowed and denied tuples.",
        "explanation": "Do not broaden every protocol to hide the mismatch.",
        "testedConcept": "How should a protocol mismatch be repaired?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g1-t3",
    "batch": "13",
    "title": "Named ACL",
    "subtitle": "Use an owned USERS-HTTPS list and record its full order.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-named-acl",
    "definition": "A named ACL gives a standard or extended list a readable identifier and supports deliberate editing workflows. Naming does not add statefulness, change first-match semantics or turn a standard list into extended matching. Sequence numbers support insertion and review, but change safety depends on the consuming attachment and exact entry state, not on the readability of the name.",
    "purpose": "Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list.",
    "mental": "Choose a name that communicates purpose and scope, then choose the actual standard or extended type. Record all consuming attachments because one shared object change can affect several paths. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Attached nonempty ordered IPv4 whole-packet filter: TCP/UDP/ICMP, wildcard matching, no fragments, NAT or connection tracking. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Name: Readable object identity. No change to match algorithm.",
      "Sequence: Explicit entry order. Insert before the broad terminating match.",
      "Consumer: Attachment using the object. Shared edits can affect multiple paths.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Choose a name that communicates purpose and scope, then choose the actual standard or extended type. Record all consuming attachments because one shared object change can affect several paths.",
      "Review sequence order before editing. Insert a specific exception before the intended broad deny, then confirm the selected sequence for allowed and prohibited tuples.",
      "Preserve exact baseline entries and attachment before the change. A named list referenced while empty/absent can have permissive consumer behavior; build and verify the owned object before applying it."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A named ACL gives a standard or extended list a readable identifier and supports deliberate editing workflows. Naming does not add statefulness, change first-match semantics or turn a standard list into extended matching. Sequence numbers support insertion and review, but change safety depends on the consuming attachment and exact entry state, not on the readability of the name."
      ],
      [
        "Identify the consuming boundary",
        "Choose a name that communicates purpose and scope, then choose the actual standard or extended type. Record all consuming attachments because one shared object change can affect several paths."
      ],
      [
        "Follow the actual decision",
        "Review sequence order before editing. Insert a specific exception before the intended broad deny, then confirm the selected sequence for allowed and prohibited tuples."
      ],
      [
        "Verify limits and recovery",
        "Preserve exact baseline entries and attachment before the change. A named list referenced while empty/absent can have permissive consumer behavior; build and verify the owned object before applying it."
      ]
    ],
    "comparison": [
      [
        "Name",
        "Readable object identity",
        "No change to match algorithm."
      ],
      [
        "Sequence",
        "Explicit entry order",
        "Insert before the broad terminating match."
      ],
      [
        "Consumer",
        "Attachment using the object",
        "Shared edits can affect multiple paths."
      ]
    ],
    "example": "Does naming an ACL make it stateful? No. The name identifies an object; it does not create connection tracking. Compare this with a different operational question: Where should a narrow exception precede a deny? Earlier in the ordered list. First match prevents later entries from overriding a deny. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for Named ACL. Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Retest relevant allowed/denied tuples at each affected consumer. One working client cannot validate every attachment. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Where should a narrow exception precede a deny?",
        "Earlier in the ordered list. First match prevents later entries from overriding a deny."
      ],
      [
        "Why preserve exact sequence state?",
        "It makes rollback precise and reviewable. Removing a newly inserted rule is safer than reconstructing from memory."
      ],
      [
        "What is a shadowed rule?",
        "An entry whose intended traffic already matches an earlier terminating rule. Readable names do not eliminate order mistakes."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Do not infer protection from an object name. Review shadowed entries, unintended broad permits and shared consumers separately.",
    "performance": "Sequence spacing improves maintainability rather than packet performance. Hardware updates can have platform-specific atomicity and resource limits.",
    "mistakes": [
      "The name identifies an object; it does not create connection tracking.",
      "A local-looking edit may have a wider enforcement scope.",
      "Actual entries and attachment determine the behavior.",
      "Inspect consumer-specific absent/empty semantics."
    ],
    "prerequisites": [
      "s5-g0-t3"
    ],
    "related": [
      "s5-g2-t0"
    ],
    "lab": {
      "objective": "Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Named ACL boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Label the worksheet list USERS-HTTPS in the evidence notebook and record its consumers.",
        "Fault: move the broad deny ahead of the permit; identify the now-shadowed entry.",
        "Restore exact order, then compare the permitted tuple and prohibited service without adding permit-any.",
        "Predict the baseline Named ACL result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an owned USERS-HTTPS list and record its full order. Plan an insertion/removal by sequence on a release that supports it, with console access and exact rollback; do not modify a shared production list. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Retest relevant allowed/denied tuples at each affected consumer. One working client cannot validate every attachment. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Name → Sequence → Consumer. First match prevents later entries from overriding a deny. Removing a newly inserted rule is safer than reconstructing from memory.",
      "challenge": "What is a shadowed rule? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Name": "Readable object identity. No change to match algorithm.",
      "Sequence": "Explicit entry order. Insert before the broad terminating match.",
      "Consumer": "Attachment using the object. Shared edits can affect multiple paths."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g1-t3-QC2",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a named standard list match ports?",
        "answer": "No.",
        "explanation": "The list type still governs available fields.",
        "testedConcept": "Can a named standard list match ports?"
      },
      {
        "questionId": "s5-g1-t3-QC4",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where should a narrow exception precede a deny?",
        "answer": "Earlier in the ordered list.",
        "explanation": "First match prevents later entries from overriding a deny.",
        "testedConcept": "Where should a narrow exception precede a deny?"
      },
      {
        "questionId": "s5-g1-t3-QC8",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a shadowed rule?",
        "answer": "An entry whose intended traffic already matches an earlier terminating rule.",
        "explanation": "Readable names do not eliminate order mistakes.",
        "testedConcept": "What is a shadowed rule?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g1-t3-Q01",
        "topicId": "s5-g1-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Does naming an ACL make it stateful?",
        "answer": "No.",
        "explanation": "The name identifies an object; it does not create connection tracking.",
        "testedConcept": "Does naming an ACL make it stateful?",
        "options": [
          "No.",
          "Yes; readable names create session tracking.",
          "Yes; names replace implicit deny.",
          "Yes; names authorize every reverse flow."
        ]
      },
      {
        "questionId": "s5-g1-t3-Q02",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a named standard list match ports?",
        "answer": "No.",
        "explanation": "The list type still governs available fields.",
        "testedConcept": "Can a named standard list match ports?"
      },
      {
        "questionId": "s5-g1-t3-Q03",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inventory all consumers before editing?",
        "answer": "One shared object can affect several attachments.",
        "explanation": "A local-looking edit may have a wider enforcement scope.",
        "testedConcept": "Why inventory all consumers before editing?"
      },
      {
        "questionId": "s5-g1-t3-Q04",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where should a narrow exception precede a deny?",
        "answer": "Earlier in the ordered list.",
        "explanation": "First match prevents later entries from overriding a deny.",
        "testedConcept": "Where should a narrow exception precede a deny?"
      },
      {
        "questionId": "s5-g1-t3-Q05",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is the label USERS-HTTPS proof of a narrow policy?",
        "answer": "No.",
        "explanation": "Actual entries and attachment determine the behavior.",
        "testedConcept": "Is the label USERS-HTTPS proof of a narrow policy?"
      },
      {
        "questionId": "s5-g1-t3-Q06",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve exact sequence state?",
        "answer": "It makes rollback precise and reviewable.",
        "explanation": "Removing a newly inserted rule is safer than reconstructing from memory.",
        "testedConcept": "Why preserve exact sequence state?"
      },
      {
        "questionId": "s5-g1-t3-Q07",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should an empty referenced list be assumed deny-all?",
        "answer": "No.",
        "explanation": "Inspect consumer-specific absent/empty semantics.",
        "testedConcept": "Should an empty referenced list be assumed deny-all?"
      },
      {
        "questionId": "s5-g1-t3-Q08",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a shadowed rule?",
        "answer": "An entry whose intended traffic already matches an earlier terminating rule.",
        "explanation": "Readable names do not eliminate order mistakes.",
        "testedConcept": "What is a shadowed rule?"
      },
      {
        "questionId": "s5-g1-t3-Q09",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does leaving gaps in sequences improve forwarding speed?",
        "answer": "No.",
        "explanation": "The gaps aid editing; forwarding implementation is separate.",
        "testedConcept": "Does leaving gaps in sequences improve forwarding speed?"
      },
      {
        "questionId": "s5-g1-t3-Q10",
        "topicId": "s5-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept a repaired shared list?",
        "answer": "Retest relevant allowed/denied tuples at each affected consumer.",
        "explanation": "One working client cannot validate every attachment.",
        "testedConcept": "How do you accept a repaired shared list?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t0",
    "batch": "13",
    "title": "Dynamic ARP Inspection",
    "subtitle": "Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-dai",
    "definition": "Dynamic ARP Inspection checks ARP received on untrusted switch attachments against accepted IP-to-MAC evidence. Dynamic bindings commonly come from DHCP snooping; static-address designs require an appropriate explicit policy. DAI is an ingress ARP control, not user authentication, routed IP filtering or an IPv6 neighbor-discovery defense. Trusting a port bypasses this validation and therefore requires a justified upstream trust boundary.",
    "purpose": "Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port.",
    "mental": "Establish VLAN and interface scope, the claimed sender IP/MAC and the origin of the binding. Compare a host observation with the binding database before enabling enforcement. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. One declared ARP sender binding and ingress trust, without static ARP ACL precedence, optional validation or rate limits. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Untrusted ingress: Validate the supplied ARP claim. Collect binding and drop evidence.",
      "Trusted ingress: Bypasses this DAI validation. A trust decision is not identity proof.",
      "Static policy: Explicit non-DHCP evidence. Review precedence and platform support.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Establish VLAN and interface scope, the claimed sender IP/MAC and the origin of the binding. Compare a host observation with the binding database before enabling enforcement.",
      "On an untrusted attachment validate the ARP claim under the supported binding/static-ARP policy. A configured ARP ACL can take priority over snooping evidence; optional header/IP validation and rate limits add separate checks.",
      "Retain ingress, VLAN, binding and drop-counter evidence for one harmless owned claim. A trusted ingress bypass result is not a validated claim, and successful ARP resolution does not prove later IP service delivery."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Dynamic ARP Inspection checks ARP received on untrusted switch attachments against accepted IP-to-MAC evidence. Dynamic bindings commonly come from DHCP snooping; static-address designs require an appropriate explicit policy. DAI is an ingress ARP control, not user authentication, routed IP filtering or an IPv6 neighbor-discovery defense. Trusting a port bypasses this validation and therefore requires a justified upstream trust boundary."
      ],
      [
        "Identify the consuming boundary",
        "Establish VLAN and interface scope, the claimed sender IP/MAC and the origin of the binding. Compare a host observation with the binding database before enabling enforcement."
      ],
      [
        "Follow the actual decision",
        "On an untrusted attachment validate the ARP claim under the supported binding/static-ARP policy. A configured ARP ACL can take priority over snooping evidence; optional header/IP validation and rate limits add separate checks."
      ],
      [
        "Verify limits and recovery",
        "Retain ingress, VLAN, binding and drop-counter evidence for one harmless owned claim. A trusted ingress bypass result is not a validated claim, and successful ARP resolution does not prove later IP service delivery."
      ]
    ],
    "comparison": [
      [
        "Untrusted ingress",
        "Validate the supplied ARP claim",
        "Collect binding and drop evidence."
      ],
      [
        "Trusted ingress",
        "Bypasses this DAI validation",
        "A trust decision is not identity proof."
      ],
      [
        "Static policy",
        "Explicit non-DHCP evidence",
        "Review precedence and platform support."
      ]
    ],
    "example": "A valid IP carries the wrong sender MAC on untrusted ingress; result here? Reject the ARP claim. Both IP and MAC must agree with the supplied binding. Compare this with a different operational question: Does DAI filter every routed IP packet? No. It validates ARP at its Layer 2 ingress boundary. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "ARP is a Layer 2 protocol (EtherType 0x0806), with no TCP/UDP port; IPv6 ND is separate.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip arp inspection\nshow ip dhcp snooping binding",
        "explanation": "Observe the installed context for Dynamic ARP Inspection. Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore the owned correct evidence and retest, retaining untrusted edge policy. Trusting every host attachment hides the original defect. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does DAI filter every routed IP packet?",
        "No. It validates ARP at its Layer 2 ingress boundary."
      ],
      [
        "Does DAI protect IPv6 Neighbor Discovery?",
        "No. IPv6 requires appropriate separate first-hop controls."
      ],
      [
        "What observations support a real rejection?",
        "Correct ingress/VLAN, claim, binding and relevant drop evidence. A silent ping failure is not enough to identify the cause."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "The worksheet models one declared binding and trust decision only. Static ARP ACL precedence, header validation, rate limits and error-disable are taught but excluded from its lookup.",
    "performance": "ARP bursts and enforcement rates can affect legitimate failover. Measure the target packet rate and counters; the worksheet performs no traffic generation.",
    "mistakes": [
      "Both IP and MAC must agree with the supplied binding.",
      "Static addressing alone does not populate snooping evidence.",
      "Static policy precedence must be reviewed separately.",
      "A correct host can fail when the policy database is absent."
    ],
    "prerequisites": [
      "s5-g2-t1"
    ],
    "related": [
      "s5-g2-t1"
    ],
    "lab": {
      "objective": "Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Dynamic ARP Inspection boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the owned VLAN 20 host IP/MAC/port binding and the ARP sender claim.",
        "Fault: change only the worksheet sender MAC; predict rejection on untrusted ingress.",
        "Restore the exact MAC and compare counters/ARP state on an optional target without emitting a forged production packet.",
        "Predict the baseline Dynamic ARP Inspection result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Wait for known bindings or create supported owned static policy before enforcing an isolated VLAN. Preserve console access, ARP policy attachment and rate/error-disable recovery settings. Do not repair a host mismatch by trusting every edge port. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Restore the owned correct evidence and retest, retaining untrusted edge policy. Trusting every host attachment hides the original defect. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Untrusted ingress → Trusted ingress → Static policy. It validates ARP at its Layer 2 ingress boundary. IPv6 requires appropriate separate first-hop controls.",
      "challenge": "What observations support a real rejection? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Untrusted ingress": "Validate the supplied ARP claim. Collect binding and drop evidence.",
      "Trusted ingress": "Bypasses this DAI validation. A trust decision is not identity proof.",
      "Static policy": "Explicit non-DHCP evidence. Review precedence and platform support."
    },
    "sources": [
      {
        "title": "Cisco IOS XE dynamic ARP inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/dynamic-arp-inspection.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t0-QC2",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does trusted ingress prove the ARP identity was checked?",
        "answer": "No; it bypasses this validation.",
        "explanation": "Trust moves the security obligation upstream.",
        "testedConcept": "Does trusted ingress prove the ARP identity was checked?"
      },
      {
        "questionId": "s5-g2-t0-QC4",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does DAI filter every routed IP packet?",
        "answer": "No.",
        "explanation": "It validates ARP at its Layer 2 ingress boundary.",
        "testedConcept": "Does DAI filter every routed IP packet?"
      },
      {
        "questionId": "s5-g2-t0-QC8",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What observations support a real rejection?",
        "answer": "Correct ingress/VLAN, claim, binding and relevant drop evidence.",
        "explanation": "A silent ping failure is not enough to identify the cause.",
        "testedConcept": "What observations support a real rejection?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t0-Q01",
        "topicId": "s5-g2-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A valid IP carries the wrong sender MAC on untrusted ingress; result here?",
        "answer": "Reject the ARP claim.",
        "explanation": "Both IP and MAC must agree with the supplied binding.",
        "testedConcept": "A valid IP carries the wrong sender MAC on untrusted ingress; result here?",
        "options": [
          "Permit because IP alone agrees.",
          "Trust the host automatically.",
          "Reject every packet including trusted ingress.",
          "Reject the ARP claim."
        ]
      },
      {
        "questionId": "s5-g2-t0-Q02",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does trusted ingress prove the ARP identity was checked?",
        "answer": "No; it bypasses this validation.",
        "explanation": "Trust moves the security obligation upstream.",
        "testedConcept": "Does trusted ingress prove the ARP identity was checked?"
      },
      {
        "questionId": "s5-g2-t0-Q03",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A static host has no DHCP binding; what is needed?",
        "answer": "A supported explicit static ARP policy.",
        "explanation": "Static addressing alone does not populate snooping evidence.",
        "testedConcept": "A static host has no DHCP binding; what is needed?"
      },
      {
        "questionId": "s5-g2-t0-Q04",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does DAI filter every routed IP packet?",
        "answer": "No.",
        "explanation": "It validates ARP at its Layer 2 ingress boundary.",
        "testedConcept": "Does DAI filter every routed IP packet?"
      },
      {
        "questionId": "s5-g2-t0-Q05",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a snooping match override an explicit ARP ACL denial?",
        "answer": "Not under the documented ACL-priority behavior.",
        "explanation": "Static policy precedence must be reviewed separately.",
        "testedConcept": "Can a snooping match override an explicit ARP ACL denial?"
      },
      {
        "questionId": "s5-g2-t0-Q06",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does DAI protect IPv6 Neighbor Discovery?",
        "answer": "No.",
        "explanation": "IPv6 requires appropriate separate first-hop controls.",
        "testedConcept": "Does DAI protect IPv6 Neighbor Discovery?"
      },
      {
        "questionId": "s5-g2-t0-Q07",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why enable binding collection before enforcement?",
        "answer": "To avoid rejecting intended hosts lacking evidence.",
        "explanation": "A correct host can fail when the policy database is absent.",
        "testedConcept": "Why enable binding collection before enforcement?"
      },
      {
        "questionId": "s5-g2-t0-Q08",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What observations support a real rejection?",
        "answer": "Correct ingress/VLAN, claim, binding and relevant drop evidence.",
        "explanation": "A silent ping failure is not enough to identify the cause.",
        "testedConcept": "What observations support a real rejection?"
      },
      {
        "questionId": "s5-g2-t0-Q09",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review rate limits during failover?",
        "answer": "Legitimate ARP bursts can trigger enforcement limits.",
        "explanation": "Packet rate and address validity are separate checks.",
        "testedConcept": "Why review rate limits during failover?"
      },
      {
        "questionId": "s5-g2-t0-Q10",
        "topicId": "s5-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a safe repair for a binding mismatch?",
        "answer": "Restore the owned correct evidence and retest, retaining untrusted edge policy.",
        "explanation": "Trusting every host attachment hides the original defect.",
        "testedConcept": "What is a safe repair for a binding mismatch?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t1",
    "batch": "13",
    "title": "DHCP Snooping",
    "subtitle": "Use an isolated client VLAN and one intended server path.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-snooping",
    "definition": "DHCP snooping distinguishes client and server attachment trust and learns scoped lease bindings for downstream controls. Trusted ports are the intended paths for server/relay messages; ordinary host ports remain untrusted. It is not a DHCP server and does not by itself authenticate every client. VLAN enablement, relay information, persistence and switch topology must be designed before enforcement.",
    "purpose": "Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement.",
    "mental": "Observe which interface receives server replies and enable snooping for the intended VLAN. A server message arriving from an untrusted edge is rejected under the declared worksheet policy. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared message direction, VLAN enablement and ingress trust only; no DHCP parser or lease allocation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Trusted server path: May deliver declared server messages. Identify the actual ingress interface.",
      "Binding: Scoped lease evidence. Required by dependent first-hop controls.",
      "Option 82: Relay/attachment metadata. Define insertion and server acceptance policy.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Observe which interface receives server replies and enable snooping for the intended VLAN. A server message arriving from an untrusted edge is rejected under the declared worksheet policy.",
      "Correlate accepted DHCP exchanges with IP, MAC, VLAN, interface and lease evidence. The worksheet declares message direction and trust; it does not parse packets or allocate leases.",
      "Inspect learned bindings before applying DAI or IP Source Guard. Review restart persistence and Option 82/server compatibility because a correct address with missing binding can fail a dependent control."
    ],
    "flow": [
      [
        "Define the protected operation",
        "DHCP snooping distinguishes client and server attachment trust and learns scoped lease bindings for downstream controls. Trusted ports are the intended paths for server/relay messages; ordinary host ports remain untrusted. It is not a DHCP server and does not by itself authenticate every client. VLAN enablement, relay information, persistence and switch topology must be designed before enforcement."
      ],
      [
        "Identify the consuming boundary",
        "Observe which interface receives server replies and enable snooping for the intended VLAN. A server message arriving from an untrusted edge is rejected under the declared worksheet policy."
      ],
      [
        "Follow the actual decision",
        "Correlate accepted DHCP exchanges with IP, MAC, VLAN, interface and lease evidence. The worksheet declares message direction and trust; it does not parse packets or allocate leases."
      ],
      [
        "Verify limits and recovery",
        "Inspect learned bindings before applying DAI or IP Source Guard. Review restart persistence and Option 82/server compatibility because a correct address with missing binding can fail a dependent control."
      ]
    ],
    "comparison": [
      [
        "Trusted server path",
        "May deliver declared server messages",
        "Identify the actual ingress interface."
      ],
      [
        "Binding",
        "Scoped lease evidence",
        "Required by dependent first-hop controls."
      ],
      [
        "Option 82",
        "Relay/attachment metadata",
        "Define insertion and server acceptance policy."
      ]
    ],
    "example": "Server reply arrives on an untrusted host edge; result in this model? Reject the server message. Server attachment trust is separate from client permission. Compare this with a different operational question: Should every trunk be trusted automatically? No. Trust depends on the intended server path and upstream controls. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "DHCPv4 commonly uses UDP server 67/client 68; snooping is an ingress policy, not a server.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip dhcp snooping\nshow ip dhcp snooping binding",
        "explanation": "Observe the installed context for DHCP Snooping. Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Obtain an intended lease and matching scoped binding from the original client. A trust configuration listing alone is incomplete. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Should every trunk be trusted automatically?",
        "No. Trust depends on the intended server path and upstream controls."
      ],
      [
        "Why review Option 82 with the server?",
        "Insertion and acceptance policy can affect the exchange. Transport reachability alone does not prove server acceptance."
      ],
      [
        "Why review persistence on restart?",
        "Lost bindings can disrupt dependent enforcement. Configuration persistence and runtime database persistence differ."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Do not trust host edges or all inter-switch links by habit. Trust must follow the upstream server path and the assumptions enforced there.",
    "performance": "DHCP bursts, rate limits and binding persistence influence availability. Size and test them on the actual platform rather than assuming every reconnect storm is malicious.",
    "mistakes": [
      "Server attachment trust is separate from client permission.",
      "An IP-only list misses the attachment boundary.",
      "Dependent enforcement requires valid evidence first.",
      "It is address/attachment evidence rather than protected user identity."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g2-t2"
    ],
    "lab": {
      "objective": "Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "DHCP Snooping boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Select a declared server reply on the intended trusted worksheet attachment.",
        "Fault: make that attachment untrusted and predict server-message rejection.",
        "Restore its exact trust setting and require a completed client lease plus scoped binding, not merely a configured pool.",
        "Predict the baseline DHCP Snooping result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated client VLAN and one intended server path. Capture baseline lease/binding; change only that lab path trust for a negative rehearsal, then restore it before enabling dependent enforcement. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Obtain an intended lease and matching scoped binding from the original client. A trust configuration listing alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Trusted server path → Binding → Option 82. Trust depends on the intended server path and upstream controls. Transport reachability alone does not prove server acceptance.",
      "challenge": "Why review persistence on restart? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Trusted server path": "May deliver declared server messages. Identify the actual ingress interface.",
      "Binding": "Scoped lease evidence. Required by dependent first-hop controls.",
      "Option 82": "Relay/attachment metadata. Define insertion and server acceptance policy."
    },
    "sources": [
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t1-QC2",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does snooping allocate a lease?",
        "answer": "No.",
        "explanation": "Allocation belongs to the DHCP server.",
        "testedConcept": "Does snooping allocate a lease?"
      },
      {
        "questionId": "s5-g2-t1-QC4",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should every trunk be trusted automatically?",
        "answer": "No.",
        "explanation": "Trust depends on the intended server path and upstream controls.",
        "testedConcept": "Should every trunk be trusted automatically?"
      },
      {
        "questionId": "s5-g2-t1-QC8",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review persistence on restart?",
        "answer": "Lost bindings can disrupt dependent enforcement.",
        "explanation": "Configuration persistence and runtime database persistence differ.",
        "testedConcept": "Why review persistence on restart?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t1-Q01",
        "topicId": "s5-g2-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Server reply arrives on an untrusted host edge; result in this model?",
        "answer": "Reject the server message.",
        "explanation": "Server attachment trust is separate from client permission.",
        "testedConcept": "Server reply arrives on an untrusted host edge; result in this model?",
        "options": [
          "Allocate a new lease locally.",
          "Trust the host port automatically.",
          "Reject the server message.",
          "Accept because every DHCP reply is trusted."
        ]
      },
      {
        "questionId": "s5-g2-t1-Q02",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does snooping allocate a lease?",
        "answer": "No.",
        "explanation": "Allocation belongs to the DHCP server.",
        "testedConcept": "Does snooping allocate a lease?"
      },
      {
        "questionId": "s5-g2-t1-Q03",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which fields should a binding record include?",
        "answer": "IP, MAC, VLAN, interface and lease context.",
        "explanation": "An IP-only list misses the attachment boundary.",
        "testedConcept": "Which fields should a binding record include?"
      },
      {
        "questionId": "s5-g2-t1-Q04",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should every trunk be trusted automatically?",
        "answer": "No.",
        "explanation": "Trust depends on the intended server path and upstream controls.",
        "testedConcept": "Should every trunk be trusted automatically?"
      },
      {
        "questionId": "s5-g2-t1-Q05",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "DAI enabled before bindings exist; what may happen?",
        "answer": "Intended host ARP may be rejected.",
        "explanation": "Dependent enforcement requires valid evidence first.",
        "testedConcept": "DAI enabled before bindings exist; what may happen?"
      },
      {
        "questionId": "s5-g2-t1-Q06",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review Option 82 with the server?",
        "answer": "Insertion and acceptance policy can affect the exchange.",
        "explanation": "Transport reachability alone does not prove server acceptance.",
        "testedConcept": "Why review Option 82 with the server?"
      },
      {
        "questionId": "s5-g2-t1-Q07",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a snooping binding authenticate a user?",
        "answer": "No.",
        "explanation": "It is address/attachment evidence rather than protected user identity.",
        "testedConcept": "Does a snooping binding authenticate a user?"
      },
      {
        "questionId": "s5-g2-t1-Q08",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review persistence on restart?",
        "answer": "Lost bindings can disrupt dependent enforcement.",
        "explanation": "Configuration persistence and runtime database persistence differ.",
        "testedConcept": "Why review persistence on restart?"
      },
      {
        "questionId": "s5-g2-t1-Q09",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should reconnect burst limits accommodate?",
        "answer": "Expected legitimate client behavior on the target.",
        "explanation": "A nominal rate is not a measured capacity result.",
        "testedConcept": "What should reconnect burst limits accommodate?"
      },
      {
        "questionId": "s5-g2-t1-Q10",
        "topicId": "s5-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify restored server-path trust?",
        "answer": "Obtain an intended lease and matching scoped binding from the original client.",
        "explanation": "A trust configuration listing alone is incomplete.",
        "testedConcept": "How do you verify restored server-path trust?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t2",
    "batch": "13",
    "title": "IP Source Guard",
    "subtitle": "Build DHCP/static binding evidence before enabling the owned access-port filter.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-ipsg",
    "definition": "IP Source Guard restricts host-originated IP traffic at supported Layer 2 attachments using dynamic or supported static source bindings. The binding includes source address and attachment context; optional IP-and-MAC mode adds the MAC condition. It differs from DAI because the protected traffic is IP rather than ARP. A manually configured host address is not automatically a valid source binding.",
    "purpose": "Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst.",
    "mental": "Inventory host source IP, ingress VLAN and interface, then verify its accepted binding exists. Record whether the selected mode checks IP alone or IP plus MAC. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. One supplied source binding and IP-only/IP-and-MAC mode; no actual device tracking or hardware filtering. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Source binding: Accepted IP and attachment context. Static host configuration alone is insufficient.",
      "IP-only mode: Compare source IP and scope. MAC identity is not established.",
      "IP-and-MAC mode: Also compare supplied source MAC. Still not cryptographic authentication.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Inventory host source IP, ingress VLAN and interface, then verify its accepted binding exists. Record whether the selected mode checks IP alone or IP plus MAC.",
      "Compare the observed source with the binding under the enabled port policy. A correct IP on the wrong VLAN or attachment fails this worksheet; additional platform prerequisites remain external.",
      "Retest the intended host transaction and a declared mismatched source, then restore only the owned binding/settings. DAI may separately affect address resolution before the guarded IP packet is even sent."
    ],
    "flow": [
      [
        "Define the protected operation",
        "IP Source Guard restricts host-originated IP traffic at supported Layer 2 attachments using dynamic or supported static source bindings. The binding includes source address and attachment context; optional IP-and-MAC mode adds the MAC condition. It differs from DAI because the protected traffic is IP rather than ARP. A manually configured host address is not automatically a valid source binding."
      ],
      [
        "Identify the consuming boundary",
        "Inventory host source IP, ingress VLAN and interface, then verify its accepted binding exists. Record whether the selected mode checks IP alone or IP plus MAC."
      ],
      [
        "Follow the actual decision",
        "Compare the observed source with the binding under the enabled port policy. A correct IP on the wrong VLAN or attachment fails this worksheet; additional platform prerequisites remain external."
      ],
      [
        "Verify limits and recovery",
        "Retest the intended host transaction and a declared mismatched source, then restore only the owned binding/settings. DAI may separately affect address resolution before the guarded IP packet is even sent."
      ]
    ],
    "comparison": [
      [
        "Source binding",
        "Accepted IP and attachment context",
        "Static host configuration alone is insufficient."
      ],
      [
        "IP-only mode",
        "Compare source IP and scope",
        "MAC identity is not established."
      ],
      [
        "IP-and-MAC mode",
        "Also compare supplied source MAC",
        "Still not cryptographic authentication."
      ]
    ],
    "example": "Correct IP arrives on the wrong VLAN; permitted in the scoped model? No. Attachment context is part of the binding. Compare this with a different operational question: IP-only mode sees another MAC with the correct IP/scope; what does this model do? Permit the source check. The modeled mode intentionally does not compare MAC. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "IP source filtering has no intrinsic service port; this model is a supplied IPv4 binding check.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip source binding\nshow ip verify source",
        "explanation": "Observe the installed context for IP Source Guard. Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Matching source/scope evidence and the original host operation. A table entry alone is not end-to-end recovery. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "IP-only mode sees another MAC with the correct IP/scope; what does this model do?",
        "Permit the source check. The modeled mode intentionally does not compare MAC."
      ],
      [
        "Does a binding grant access to a sensitive application?",
        "No. Address validation and application authorization are distinct."
      ],
      [
        "No accepted binding exists; expected guarded result?",
        "Reject the source check. A correct-looking address cannot substitute for policy evidence."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "The worksheet covers a single binding and selected IP/MAC mode; it excludes device tracking, multiple bindings, IPv6 and hardware programming. Source binding does not grant application permission.",
    "performance": "Binding churn and hardware table limits can affect forwarding. Measure updates and legitimate access recovery rather than infer scalability from one model row.",
    "mistakes": [
      "Attachment context is part of the binding.",
      "They operate on different packet classes.",
      "The additional supplied MAC condition fails.",
      "A browser calculation cannot certify platform features."
    ],
    "prerequisites": [
      "s5-g2-t1"
    ],
    "related": [
      "s5-g2-t3"
    ],
    "lab": {
      "objective": "Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "IP Source Guard boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record IP 192.0.2.8, VLAN 20 and the owned port binding in the worksheet.",
        "Fault: change only VLAN to 30 while leaving IP unchanged.",
        "Restore VLAN 20, compare optional IP-and-MAC mode and require the original host transaction after target recovery.",
        "Predict the baseline IP Source Guard result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Build DHCP/static binding evidence before enabling the owned access-port filter. Check release support for trunks, EtherChannel, PVLAN and authentication integration; do not assume the same features on every Catalyst. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Matching source/scope evidence and the original host operation. A table entry alone is not end-to-end recovery. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Source binding → IP-only mode → IP-and-MAC mode. The modeled mode intentionally does not compare MAC. Address validation and application authorization are distinct.",
      "challenge": "No accepted binding exists; expected guarded result? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Source binding": "Accepted IP and attachment context. Static host configuration alone is insufficient.",
      "IP-only mode": "Compare source IP and scope. MAC identity is not established.",
      "IP-and-MAC mode": "Also compare supplied source MAC. Still not cryptographic authentication."
    },
    "sources": [
      {
        "title": "Cisco IOS XE IP source guard",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/ip-source-guard.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t2-QC2",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is configuring a static IP on the host sufficient?",
        "answer": "No.",
        "explanation": "Accepted static source binding is a separate switch policy.",
        "testedConcept": "Is configuring a static IP on the host sufficient?"
      },
      {
        "questionId": "s5-g2-t2-QC4",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "IP-only mode sees another MAC with the correct IP/scope; what does this model do?",
        "answer": "Permit the source check.",
        "explanation": "The modeled mode intentionally does not compare MAC.",
        "testedConcept": "IP-only mode sees another MAC with the correct IP/scope; what does this model do?"
      },
      {
        "questionId": "s5-g2-t2-QC8",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "No accepted binding exists; expected guarded result?",
        "answer": "Reject the source check.",
        "explanation": "A correct-looking address cannot substitute for policy evidence.",
        "testedConcept": "No accepted binding exists; expected guarded result?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t2-Q01",
        "topicId": "s5-g2-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Correct IP arrives on the wrong VLAN; permitted in the scoped model?",
        "answer": "No.",
        "explanation": "Attachment context is part of the binding.",
        "testedConcept": "Correct IP arrives on the wrong VLAN; permitted in the scoped model?",
        "options": [
          "Only if the host address was typed manually.",
          "No.",
          "Yes; IP alone overrides attachment scope.",
          "Yes; VLAN does not participate."
        ]
      },
      {
        "questionId": "s5-g2-t2-Q02",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is configuring a static IP on the host sufficient?",
        "answer": "No.",
        "explanation": "Accepted static source binding is a separate switch policy.",
        "testedConcept": "Is configuring a static IP on the host sufficient?"
      },
      {
        "questionId": "s5-g2-t2-Q03",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "How does IPSG differ from DAI?",
        "answer": "IPSG filters source IP traffic; DAI validates ARP claims.",
        "explanation": "They operate on different packet classes.",
        "testedConcept": "How does IPSG differ from DAI?"
      },
      {
        "questionId": "s5-g2-t2-Q04",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "IP-only mode sees another MAC with the correct IP/scope; what does this model do?",
        "answer": "Permit the source check.",
        "explanation": "The modeled mode intentionally does not compare MAC.",
        "testedConcept": "IP-only mode sees another MAC with the correct IP/scope; what does this model do?"
      },
      {
        "questionId": "s5-g2-t2-Q05",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Switch to IP-and-MAC mode with mismatched MAC; result?",
        "answer": "Reject.",
        "explanation": "The additional supplied MAC condition fails.",
        "testedConcept": "Switch to IP-and-MAC mode with mismatched MAC; result?"
      },
      {
        "questionId": "s5-g2-t2-Q06",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a binding grant access to a sensitive application?",
        "answer": "No.",
        "explanation": "Address validation and application authorization are distinct.",
        "testedConcept": "Does a binding grant access to a sensitive application?"
      },
      {
        "questionId": "s5-g2-t2-Q07",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect mode and interface support?",
        "answer": "Filtering prerequisites and supported attachments vary.",
        "explanation": "A browser calculation cannot certify platform features.",
        "testedConcept": "Why inspect mode and interface support?"
      },
      {
        "questionId": "s5-g2-t2-Q08",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "No accepted binding exists; expected guarded result?",
        "answer": "Reject the source check.",
        "explanation": "A correct-looking address cannot substitute for policy evidence.",
        "testedConcept": "No accepted binding exists; expected guarded result?"
      },
      {
        "questionId": "s5-g2-t2-Q09",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What capacity concern follows rapid host moves?",
        "answer": "Binding updates and hardware programming churn.",
        "explanation": "Measure the target rather than count worksheet rows.",
        "testedConcept": "What capacity concern follows rapid host moves?"
      },
      {
        "questionId": "s5-g2-t2-Q10",
        "topicId": "s5-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What confirms a repaired binding?",
        "answer": "Matching source/scope evidence and the original host operation.",
        "explanation": "A table entry alone is not end-to-end recovery.",
        "testedConcept": "What confirms a repaired binding?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t3",
    "batch": "13",
    "title": "Private VLAN",
    "subtitle": "Rehearse two communities and an isolated host with one mapped gateway in a disposable lab.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-pvlan",
    "definition": "Private VLANs divide a Layer 2 domain into primary and secondary roles. An isolated host communicates with a properly mapped promiscuous attachment, while community hosts can also communicate within their own community. Different communities and isolated peers are separated at this modeled Layer 2 boundary. Routing through a promiscuous gateway can reconnect hosts unless Layer 3 policy restricts that path.",
    "purpose": "Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions.",
    "mental": "Record primary/secondary VLAN association and host/promiscuous mappings on supported switches. A role label without the required mapping does not establish forwarding. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared mapped PVLAN roles for distinct endpoint attachments; no routing or MAC-learning simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Isolated: No direct host-peer access in this model. Mapped promiscuous access is separate.",
      "Community: Direct peers in the same community. Other communities remain separated.",
      "Promiscuous: Mapped access to secondary roles. Routed policy still controls higher-layer paths.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Record primary/secondary VLAN association and host/promiscuous mappings on supported switches. A role label without the required mapping does not establish forwarding.",
      "For two distinct endpoint attachments, compare roles: a mapped promiscuous endpoint permits the modeled path; community peers need the same community; isolated-to-isolated and isolated-to-community are denied.",
      "Test direct peer delivery separately from routed access through the gateway. A failed Layer 2 peer path does not establish that higher-layer communication is impossible through every route."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Private VLANs divide a Layer 2 domain into primary and secondary roles. An isolated host communicates with a properly mapped promiscuous attachment, while community hosts can also communicate within their own community. Different communities and isolated peers are separated at this modeled Layer 2 boundary. Routing through a promiscuous gateway can reconnect hosts unless Layer 3 policy restricts that path."
      ],
      [
        "Identify the consuming boundary",
        "Record primary/secondary VLAN association and host/promiscuous mappings on supported switches. A role label without the required mapping does not establish forwarding."
      ],
      [
        "Follow the actual decision",
        "For two distinct endpoint attachments, compare roles: a mapped promiscuous endpoint permits the modeled path; community peers need the same community; isolated-to-isolated and isolated-to-community are denied."
      ],
      [
        "Verify limits and recovery",
        "Test direct peer delivery separately from routed access through the gateway. A failed Layer 2 peer path does not establish that higher-layer communication is impossible through every route."
      ]
    ],
    "comparison": [
      [
        "Isolated",
        "No direct host-peer access in this model",
        "Mapped promiscuous access is separate."
      ],
      [
        "Community",
        "Direct peers in the same community",
        "Other communities remain separated."
      ],
      [
        "Promiscuous",
        "Mapped access to secondary roles",
        "Routed policy still controls higher-layer paths."
      ]
    ],
    "example": "Two isolated host ports: direct Layer 2 path here? Denied. They are separated under the declared mapped PVLAN roles. Compare this with a different operational question: An isolated host reaches the mapped promiscuous gateway; expected? Permitted in this model. Promiscuous access is distinct from host-peer access. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Private VLAN roles are Layer 2 forwarding policy, with no intrinsic TCP/UDP port.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show vlan private-vlan\nshow interfaces switchport",
        "explanation": "Observe the installed context for Private VLAN. Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Verify intended gateway access and prohibited direct/routed peer objectives separately. One successful gateway ping does not validate isolation. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "An isolated host reaches the mapped promiscuous gateway; expected?",
        "Permitted in this model. Promiscuous access is distinct from host-peer access."
      ],
      [
        "Can routing through a gateway reconnect separated hosts?",
        "Yes, unless Layer 3 policy prevents it. Layer 2 separation is not universal communication isolation."
      ],
      [
        "Why inspect trunk propagation?",
        "The role/association scope must persist across intended switches. A local map does not prove fabric-wide enforcement."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Restrict gateway hairpin/routed policy where isolation is required. Verify trunk propagation and switch support rather than assuming one local role protects the entire fabric.",
    "performance": "Platform VLAN, trunk and feature-combination limits matter. The truth table models declared roles and mapping, not MAC learning or physical forwarding capacity.",
    "mistakes": [
      "They are separated under the declared mapped PVLAN roles.",
      "Different communities remain separated.",
      "Role labels cannot replace the consuming map.",
      "It evaluates supplied roles for distinct endpoints only."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g2-t4"
    ],
    "lab": {
      "objective": "Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Private VLAN boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Select two distinct isolated endpoints, then compare same-community and different-community pairs.",
        "Fault: remove the declared promiscuous mapping and predict gateway-path rejection.",
        "Restore the mapping and retain a separate routed-policy test so gateway access does not erase the intended isolation.",
        "Predict the baseline Private VLAN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Rehearse two communities and an isolated host with one mapped gateway in a disposable lab. Preserve maps before changing one host role; inspect both peer and gateway transactions. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Verify intended gateway access and prohibited direct/routed peer objectives separately. One successful gateway ping does not validate isolation. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Isolated → Community → Promiscuous. Promiscuous access is distinct from host-peer access. Layer 2 separation is not universal communication isolation.",
      "challenge": "Why inspect trunk propagation? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Isolated": "No direct host-peer access in this model. Mapped promiscuous access is separate.",
      "Community": "Direct peers in the same community. Other communities remain separated.",
      "Promiscuous": "Mapped access to secondary roles. Routed policy still controls higher-layer paths."
    },
    "sources": [
      {
        "title": "Catalyst 9300 IOS XE 17.3 private VLANs",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-3/configuration_guide/vlan/b_173_vlan_9300_cg/configuring_private_vlans.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t3-QC2",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two hosts in community 10: direct path?",
        "answer": "Permitted in this model.",
        "explanation": "Same-community peers can communicate.",
        "testedConcept": "Two hosts in community 10: direct path?"
      },
      {
        "questionId": "s5-g2-t3-QC4",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An isolated host reaches the mapped promiscuous gateway; expected?",
        "answer": "Permitted in this model.",
        "explanation": "Promiscuous access is distinct from host-peer access.",
        "testedConcept": "An isolated host reaches the mapped promiscuous gateway; expected?"
      },
      {
        "questionId": "s5-g2-t3-QC8",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect trunk propagation?",
        "answer": "The role/association scope must persist across intended switches.",
        "explanation": "A local map does not prove fabric-wide enforcement.",
        "testedConcept": "Why inspect trunk propagation?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t3-Q01",
        "topicId": "s5-g2-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two isolated host ports: direct Layer 2 path here?",
        "answer": "Denied.",
        "explanation": "They are separated under the declared mapped PVLAN roles.",
        "testedConcept": "Two isolated host ports: direct Layer 2 path here?",
        "options": [
          "Denied.",
          "Permitted because the primary VLAN is shared.",
          "Permitted because isolated means unrestricted.",
          "Permitted only because both endpoints use IP."
        ]
      },
      {
        "questionId": "s5-g2-t3-Q02",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two hosts in community 10: direct path?",
        "answer": "Permitted in this model.",
        "explanation": "Same-community peers can communicate.",
        "testedConcept": "Two hosts in community 10: direct path?"
      },
      {
        "questionId": "s5-g2-t3-Q03",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Communities 10 and 11: direct peer path?",
        "answer": "Denied.",
        "explanation": "Different communities remain separated.",
        "testedConcept": "Communities 10 and 11: direct peer path?"
      },
      {
        "questionId": "s5-g2-t3-Q04",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An isolated host reaches the mapped promiscuous gateway; expected?",
        "answer": "Permitted in this model.",
        "explanation": "Promiscuous access is distinct from host-peer access.",
        "testedConcept": "An isolated host reaches the mapped promiscuous gateway; expected?"
      },
      {
        "questionId": "s5-g2-t3-Q05",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Promiscuous role is declared but mapping is absent; result?",
        "answer": "Denied by the mapping requirement.",
        "explanation": "Role labels cannot replace the consuming map.",
        "testedConcept": "Promiscuous role is declared but mapping is absent; result?"
      },
      {
        "questionId": "s5-g2-t3-Q06",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can routing through a gateway reconnect separated hosts?",
        "answer": "Yes, unless Layer 3 policy prevents it.",
        "explanation": "Layer 2 separation is not universal communication isolation.",
        "testedConcept": "Can routing through a gateway reconnect separated hosts?"
      },
      {
        "questionId": "s5-g2-t3-Q07",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this truth table learn MAC addresses?",
        "answer": "No.",
        "explanation": "It evaluates supplied roles for distinct endpoints only.",
        "testedConcept": "Does this truth table learn MAC addresses?"
      },
      {
        "questionId": "s5-g2-t3-Q08",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect trunk propagation?",
        "answer": "The role/association scope must persist across intended switches.",
        "explanation": "A local map does not prove fabric-wide enforcement.",
        "testedConcept": "Why inspect trunk propagation?"
      },
      {
        "questionId": "s5-g2-t3-Q09",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What platform limits should be checked?",
        "answer": "VLAN/trunk capacity and supported feature combinations.",
        "explanation": "The worksheet makes no hardware scale claim.",
        "testedConcept": "What platform limits should be checked?"
      },
      {
        "questionId": "s5-g2-t3-Q10",
        "topicId": "s5-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept a restored PVLAN map?",
        "answer": "Verify intended gateway access and prohibited direct/routed peer objectives separately.",
        "explanation": "One successful gateway ping does not validate isolation.",
        "testedConcept": "How do you accept a restored PVLAN map?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t4",
    "batch": "13",
    "title": "802.1X",
    "subtitle": "Use a disposable authenticated client and explicit restricted role.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-dot1x",
    "definition": "IEEE 802.1X controls network attachment using a supplicant, authenticator and authentication server. The endpoint exchanges EAP over LAN with the authenticator; the authenticator commonly carries EAP to the server using RADIUS. Identity validation, returned authorization and enforcement of the assigned role are separate stages. This later lesson deepens policy failure and recovery rather than repeating the earlier services introduction.",
    "purpose": "Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault.",
    "mental": "The supplicant participates in the selected EAP method and must validate the authentication-server identity where the method requires it. The switch relays the exchange without becoming the user identity store. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Supplicant: Endpoint participating in EAP. Validate server trust for the selected method.",
      "Authenticator: Enforces attachment policy. Returned authorization must be consumed.",
      "Authentication server: Evaluates method and identity. Success differs from assigned permission.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "The supplicant participates in the selected EAP method and must validate the authentication-server identity where the method requires it. The switch relays the exchange without becoming the user identity store.",
      "A successful server result is followed by authorization policy such as a role, VLAN or downloadable ACL. Verify the selected result was actually consumed at the correct attachment and host mode.",
      "Inspect the session and original permitted/denied service operations. MAB and critical/outage access are separately designed exceptions, not equivalent proof of certificate-backed identity."
    ],
    "flow": [
      [
        "Define the protected operation",
        "IEEE 802.1X controls network attachment using a supplicant, authenticator and authentication server. The endpoint exchanges EAP over LAN with the authenticator; the authenticator commonly carries EAP to the server using RADIUS. Identity validation, returned authorization and enforcement of the assigned role are separate stages. This later lesson deepens policy failure and recovery rather than repeating the earlier services introduction."
      ],
      [
        "Identify the consuming boundary",
        "The supplicant participates in the selected EAP method and must validate the authentication-server identity where the method requires it. The switch relays the exchange without becoming the user identity store."
      ],
      [
        "Follow the actual decision",
        "A successful server result is followed by authorization policy such as a role, VLAN or downloadable ACL. Verify the selected result was actually consumed at the correct attachment and host mode."
      ],
      [
        "Verify limits and recovery",
        "Inspect the session and original permitted/denied service operations. MAB and critical/outage access are separately designed exceptions, not equivalent proof of certificate-backed identity."
      ]
    ],
    "comparison": [
      [
        "Supplicant",
        "Endpoint participating in EAP",
        "Validate server trust for the selected method."
      ],
      [
        "Authenticator",
        "Enforces attachment policy",
        "Returned authorization must be consumed."
      ],
      [
        "Authentication server",
        "Evaluates method and identity",
        "Success differs from assigned permission."
      ]
    ],
    "example": "Which link carries EAPOL? Supplicant to authenticator on the local attachment. RADIUS is a separate authenticator-to-server exchange. Compare this with a different operational question: Valid identity but forbidden role: expected decision here? Deny authorization. Authentication is not permission for every operation. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "802.1X EAPOL uses Layer 2 EtherType 0x888e. Classic RADIUS commonly uses UDP 1812 for authentication/authorization and 1813 for accounting; TACACS+ uses TCP 49. Select the actual topic/protocol and transport policy.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show authentication sessions",
        "explanation": "Observe the installed context for 802.1X. Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Correct session/role consumption and original permitted/denied operations. A server log alone misses enforcement and application outcomes. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Valid identity but forbidden role: expected decision here?",
        "Deny authorization. Authentication is not permission for every operation."
      ],
      [
        "Why inspect host mode?",
        "Multiple endpoints and voice/data handling affect session scope. One authenticated endpoint need not authorize every attached device."
      ],
      [
        "What recovery path is required before a policy fault?",
        "Independent console-local access. The test must not lock out all administrative recovery."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect EAP server trust and credentials. Classic RADIUS transport limits are separate from the chosen EAP method; do not describe an Access-Accept as unlimited network authorization.",
    "performance": "Reauthentication, host modes and server latency affect access continuity. Test bursts and server unavailability under the actual policy; this declaration trace runs no EAP exchange.",
    "mistakes": [
      "RADIUS is a separate authenticator-to-server exchange.",
      "Method protection depends on the configured trust boundary.",
      "It must not be reported as equivalent certificate-backed identity.",
      "It consumes declarations of stage results."
    ],
    "prerequisites": [
      "s4-g2-t0"
    ],
    "related": [
      "s5-g2-t5"
    ],
    "lab": {
      "objective": "Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "802.1X boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record a declared authenticated session with a consumed restricted role.",
        "Fault: leave identity valid but remove role attachment in the worksheet.",
        "Restore the attachment declaration; require session identity plus both an intended permitted and prohibited application operation on an optional target.",
        "Predict the baseline 802.1X result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable authenticated client and explicit restricted role. Record method, server trust, session identity and policy attachment. Keep console access independent before testing a single owned policy fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Correct session/role consumption and original permitted/denied operations. A server log alone misses enforcement and application outcomes. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Supplicant → Authenticator → Authentication server. Authentication is not permission for every operation. One authenticated endpoint need not authorize every attached device.",
      "challenge": "What recovery path is required before a policy fault? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Supplicant": "Endpoint participating in EAP. Validate server trust for the selected method.",
      "Authenticator": "Enforces attachment policy. Returned authorization must be consumed.",
      "Authentication server": "Evaluates method and identity. Success differs from assigned permission."
    },
    "sources": [
      {
        "title": "RFC 3748 EAP",
        "url": "https://www.rfc-editor.org/rfc/rfc3748.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2865 classic RADIUS",
        "url": "https://www.rfc-editor.org/rfc/rfc2865.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t4-QC2",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Access-Accept received; is role enforcement proven?",
        "answer": "No.",
        "explanation": "The returned result must be consumed at the attachment.",
        "testedConcept": "Access-Accept received; is role enforcement proven?"
      },
      {
        "questionId": "s5-g2-t4-QC4",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid identity but forbidden role: expected decision here?",
        "answer": "Deny authorization.",
        "explanation": "Authentication is not permission for every operation.",
        "testedConcept": "Valid identity but forbidden role: expected decision here?"
      },
      {
        "questionId": "s5-g2-t4-QC8",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What recovery path is required before a policy fault?",
        "answer": "Independent console-local access.",
        "explanation": "The test must not lock out all administrative recovery.",
        "testedConcept": "What recovery path is required before a policy fault?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t4-Q01",
        "topicId": "s5-g2-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Which link carries EAPOL?",
        "answer": "Supplicant to authenticator on the local attachment.",
        "explanation": "RADIUS is a separate authenticator-to-server exchange.",
        "testedConcept": "Which link carries EAPOL?",
        "options": [
          "Authenticator to authentication server over RADIUS.",
          "Server to application over HTTPS.",
          "Every routed transit hop.",
          "Supplicant to authenticator on the local attachment."
        ]
      },
      {
        "questionId": "s5-g2-t4-Q02",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Access-Accept received; is role enforcement proven?",
        "answer": "No.",
        "explanation": "The returned result must be consumed at the attachment.",
        "testedConcept": "Access-Accept received; is role enforcement proven?"
      },
      {
        "questionId": "s5-g2-t4-Q03",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why validate EAP server identity?",
        "answer": "To avoid trusting an unintended authentication endpoint.",
        "explanation": "Method protection depends on the configured trust boundary.",
        "testedConcept": "Why validate EAP server identity?"
      },
      {
        "questionId": "s5-g2-t4-Q04",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid identity but forbidden role: expected decision here?",
        "answer": "Deny authorization.",
        "explanation": "Authentication is not permission for every operation.",
        "testedConcept": "Valid identity but forbidden role: expected decision here?"
      },
      {
        "questionId": "s5-g2-t4-Q05",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does MAB establish compared with protected EAP identity?",
        "answer": "A different weaker exception based on MAC identification.",
        "explanation": "It must not be reported as equivalent certificate-backed identity.",
        "testedConcept": "What does MAB establish compared with protected EAP identity?"
      },
      {
        "questionId": "s5-g2-t4-Q06",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect host mode?",
        "answer": "Multiple endpoints and voice/data handling affect session scope.",
        "explanation": "One authenticated endpoint need not authorize every attached device.",
        "testedConcept": "Why inspect host mode?"
      },
      {
        "questionId": "s5-g2-t4-Q07",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this trace perform EAP negotiation?",
        "answer": "No.",
        "explanation": "It consumes declarations of stage results.",
        "testedConcept": "Does this trace perform EAP negotiation?"
      },
      {
        "questionId": "s5-g2-t4-Q08",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What recovery path is required before a policy fault?",
        "answer": "Independent console-local access.",
        "explanation": "The test must not lock out all administrative recovery.",
        "testedConcept": "What recovery path is required before a policy fault?"
      },
      {
        "questionId": "s5-g2-t4-Q09",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which load concern accompanies reauthentication storms?",
        "answer": "Server and authenticator request capacity/latency.",
        "explanation": "A single successful session does not establish scale.",
        "testedConcept": "Which load concern accompanies reauthentication storms?"
      },
      {
        "questionId": "s5-g2-t4-Q10",
        "topicId": "s5-g2-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies restored access?",
        "answer": "Correct session/role consumption and original permitted/denied operations.",
        "explanation": "A server log alone misses enforcement and application outcomes.",
        "testedConcept": "What verifies restored access?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t5",
    "batch": "13",
    "title": "AAA",
    "subtitle": "Use a test administrator restricted to read-only commands.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-aaa",
    "definition": "AAA separates authentication of an identity, authorization of an operation and accounting of activity. A successful login does not imply permission to change configuration; a completed command does not imply its accounting record was retained. This Network Security occurrence focuses on failover boundaries, command policy and independent administrative recovery.",
    "purpose": "Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal.",
    "mental": "Attach the intended login and authorization method lists to the correct lines/session context. A defined server group or method list that is never consumed establishes no enforcement. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared classic authentication/authorization/accounting stages; unavailable-only fallback; no EAP, RADIUS or device execution. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Authentication: Identity result. Success does not grant every command.",
      "Authorization: Allowed operation and consumed policy. Verify actual command/service scope.",
      "Accounting: Recorded activity. Retention is independent of access success.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Attach the intended login and authorization method lists to the correct lines/session context. A defined server group or method list that is never consumed establishes no enforcement.",
      "Distinguish explicit rejection from unavailable/error behavior. In classic method-list reasoning a rejection stops access, while an unavailable method may lead to a configured next method; the actual platform and server result handling must be checked.",
      "Correlate identity, authorized operation and retained accounting from the same session. Test one harmless prohibited command and preserve console-local recovery without letting fallback silently bypass an explicit denial."
    ],
    "flow": [
      [
        "Define the protected operation",
        "AAA separates authentication of an identity, authorization of an operation and accounting of activity. A successful login does not imply permission to change configuration; a completed command does not imply its accounting record was retained. This Network Security occurrence focuses on failover boundaries, command policy and independent administrative recovery."
      ],
      [
        "Identify the consuming boundary",
        "Attach the intended login and authorization method lists to the correct lines/session context. A defined server group or method list that is never consumed establishes no enforcement."
      ],
      [
        "Follow the actual decision",
        "Distinguish explicit rejection from unavailable/error behavior. In classic method-list reasoning a rejection stops access, while an unavailable method may lead to a configured next method; the actual platform and server result handling must be checked."
      ],
      [
        "Verify limits and recovery",
        "Correlate identity, authorized operation and retained accounting from the same session. Test one harmless prohibited command and preserve console-local recovery without letting fallback silently bypass an explicit denial."
      ]
    ],
    "comparison": [
      [
        "Authentication",
        "Identity result",
        "Success does not grant every command."
      ],
      [
        "Authorization",
        "Allowed operation and consumed policy",
        "Verify actual command/service scope."
      ],
      [
        "Accounting",
        "Recorded activity",
        "Retention is independent of access success."
      ]
    ],
    "example": "Login succeeds; may the user change every setting? No. Command authorization is an independent decision. Compare this with a different operational question: An accounting destination exists; is retention proven? No. The record must actually arrive and be retained. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "802.1X EAPOL uses Layer 2 EtherType 0x888e. Classic RADIUS commonly uses UDP 1812 for authentication/authorization and 1813 for accounting; TACACS+ uses TCP 49. Select the actual topic/protocol and transport policy.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show aaa servers",
        "explanation": "Observe the installed context for AAA. Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Identity, allowed/denied command behavior and retained accounting correlate in one session. Three separate configured objects are incomplete evidence. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "An accounting destination exists; is retention proven?",
        "No. The record must actually arrive and be retained."
      ],
      [
        "Why test a read-only identity?",
        "To demonstrate permitted observation and prohibited change separately. Successful login alone misses least-privilege enforcement."
      ],
      [
        "Does classic shared-secret transport equal TLS?",
        "No. Legacy protection has distinct documented limits."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect central transport and recovery credentials. RADIUS and TACACS+ roles/security differ; legacy shared-secret/body protection must not be equated with modern authenticated transport.",
    "performance": "Central policy availability and accounting queues affect management access. Decide fail-open/fail-closed behavior explicitly per operation; the worksheet does not contact AAA servers.",
    "mistakes": [
      "Command authorization is an independent decision.",
      "Availability failure is distinct from explicit rejection.",
      "The consuming session/line attachment matters.",
      "Emergency access is a protected independent control."
    ],
    "prerequisites": [
      "s4-g2-t0"
    ],
    "related": [
      "s5-g2-t6"
    ],
    "lab": {
      "objective": "Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "AAA boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Declare successful authentication and read-only authorization in the worksheet.",
        "Fault: set the authentication result to reject, then unavailable; explain why only the latter is eligible for the declared local fallback.",
        "Restore central acceptance and verify forbidden-command denial plus accounting retention without disclosing credentials.",
        "Predict the baseline AAA result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a test administrator restricted to read-only commands. Preserve method-list attachments and a separately tested recovery identity before a single owned unavailable-server or denied-command rehearsal. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Identity, allowed/denied command behavior and retained accounting correlate in one session. Three separate configured objects are incomplete evidence. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Authentication → Authorization → Accounting. The record must actually arrive and be retained. Successful login alone misses least-privilege enforcement.",
      "challenge": "Does classic shared-secret transport equal TLS? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Authentication": "Identity result. Success does not grant every command.",
      "Authorization": "Allowed operation and consumed policy. Verify actual command/service scope.",
      "Accounting": "Recorded activity. Retention is independent of access success."
    },
    "sources": [
      {
        "title": "RFC 2865 classic RADIUS",
        "url": "https://www.rfc-editor.org/rfc/rfc2865.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t5-QC2",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Central authentication explicitly rejects; use local fallback here?",
        "answer": "No.",
        "explanation": "The modeled rejection stops the chain.",
        "testedConcept": "Central authentication explicitly rejects; use local fallback here?"
      },
      {
        "questionId": "s5-g2-t5-QC4",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An accounting destination exists; is retention proven?",
        "answer": "No.",
        "explanation": "The record must actually arrive and be retained.",
        "testedConcept": "An accounting destination exists; is retention proven?"
      },
      {
        "questionId": "s5-g2-t5-QC8",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does classic shared-secret transport equal TLS?",
        "answer": "No.",
        "explanation": "Legacy protection has distinct documented limits.",
        "testedConcept": "Does classic shared-secret transport equal TLS?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t5-Q01",
        "topicId": "s5-g2-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Login succeeds; may the user change every setting?",
        "answer": "No.",
        "explanation": "Command authorization is an independent decision.",
        "testedConcept": "Login succeeds; may the user change every setting?",
        "options": [
          "Yes; accounting assigns permission.",
          "Only if the server is remote.",
          "No.",
          "Yes; login grants all command privileges."
        ]
      },
      {
        "questionId": "s5-g2-t5-Q02",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Central authentication explicitly rejects; use local fallback here?",
        "answer": "No.",
        "explanation": "The modeled rejection stops the chain.",
        "testedConcept": "Central authentication explicitly rejects; use local fallback here?"
      },
      {
        "questionId": "s5-g2-t5-Q03",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Central method is unavailable and local fallback is allowed; what next?",
        "answer": "Evaluate the local identity and operation under the declared policy.",
        "explanation": "Availability failure is distinct from explicit rejection.",
        "testedConcept": "Central method is unavailable and local fallback is allowed; what next?"
      },
      {
        "questionId": "s5-g2-t5-Q04",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An accounting destination exists; is retention proven?",
        "answer": "No.",
        "explanation": "The record must actually arrive and be retained.",
        "testedConcept": "An accounting destination exists; is retention proven?"
      },
      {
        "questionId": "s5-g2-t5-Q05",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A method list is defined but unattached; is enforcement established?",
        "answer": "No.",
        "explanation": "The consuming session/line attachment matters.",
        "testedConcept": "A method list is defined but unattached; is enforcement established?"
      },
      {
        "questionId": "s5-g2-t5-Q06",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why test a read-only identity?",
        "answer": "To demonstrate permitted observation and prohibited change separately.",
        "explanation": "Successful login alone misses least-privilege enforcement.",
        "testedConcept": "Why test a read-only identity?"
      },
      {
        "questionId": "s5-g2-t5-Q07",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should recovery credentials be shared with all users?",
        "answer": "No.",
        "explanation": "Emergency access is a protected independent control.",
        "testedConcept": "Should recovery credentials be shared with all users?"
      },
      {
        "questionId": "s5-g2-t5-Q08",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does classic shared-secret transport equal TLS?",
        "answer": "No.",
        "explanation": "Legacy protection has distinct documented limits.",
        "testedConcept": "Does classic shared-secret transport equal TLS?"
      },
      {
        "questionId": "s5-g2-t5-Q09",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which failover design question must be explicit?",
        "answer": "Whether each operation fails open or closed on unavailable policy.",
        "explanation": "Availability policy must not accidentally override a denial.",
        "testedConcept": "Which failover design question must be explicit?"
      },
      {
        "questionId": "s5-g2-t5-Q10",
        "topicId": "s5-g2-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How is AAA recovery accepted?",
        "answer": "Identity, allowed/denied command behavior and retained accounting correlate in one session.",
        "explanation": "Three separate configured objects are incomplete evidence.",
        "testedConcept": "How is AAA recovery accepted?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g2-t6",
    "batch": "13",
    "title": "Port Security",
    "subtitle": "Use an isolated access attachment and a spare owned test endpoint.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-port-security",
    "definition": "Port Security limits accepted source MAC addresses on supported switch attachments using configured or learned secure-address state. Sticky learning can simplify persistence, but a learned MAC is not cryptographic identity. Protect, restrict and shutdown violation modes produce different operational evidence; the device release and interface mode constrain support.",
    "purpose": "Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration.",
    "mental": "Record the maximum secure-address count, accepted addresses and learning/persistence behavior before the test. A phone plus workstation or host replacement can legitimately need more than one address. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. One accepted-address/count/mode boundary; no frame learning or actual switch state change. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Protect: Drop violating traffic in the model. Keep accepted sources distinct.",
      "Restrict: Drop with violation evidence. Inspect supported counters/logging.",
      "Shutdown: Model error-disabled attachment. Restore policy and port state safely.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Record the maximum secure-address count, accepted addresses and learning/persistence behavior before the test. A phone plus workstation or host replacement can legitimately need more than one address.",
      "When a new source exceeds the declared maximum, protect drops the violating traffic, restrict also exposes violation evidence and shutdown places the attachment into the modeled error-disabled state. Actual counter/log behavior requires platform verification.",
      "Restore the correct owned address/count and the supported port recovery state, then verify the original allowed host and prohibited extra source. Removing every learned address or disabling enforcement is not a precise repair."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Port Security limits accepted source MAC addresses on supported switch attachments using configured or learned secure-address state. Sticky learning can simplify persistence, but a learned MAC is not cryptographic identity. Protect, restrict and shutdown violation modes produce different operational evidence; the device release and interface mode constrain support."
      ],
      [
        "Identify the consuming boundary",
        "Record the maximum secure-address count, accepted addresses and learning/persistence behavior before the test. A phone plus workstation or host replacement can legitimately need more than one address."
      ],
      [
        "Follow the actual decision",
        "When a new source exceeds the declared maximum, protect drops the violating traffic, restrict also exposes violation evidence and shutdown places the attachment into the modeled error-disabled state. Actual counter/log behavior requires platform verification."
      ],
      [
        "Verify limits and recovery",
        "Restore the correct owned address/count and the supported port recovery state, then verify the original allowed host and prohibited extra source. Removing every learned address or disabling enforcement is not a precise repair."
      ]
    ],
    "comparison": [
      [
        "Protect",
        "Drop violating traffic in the model",
        "Keep accepted sources distinct."
      ],
      [
        "Restrict",
        "Drop with violation evidence",
        "Inspect supported counters/logging."
      ],
      [
        "Shutdown",
        "Model error-disabled attachment",
        "Restore policy and port state safely."
      ]
    ],
    "example": "Does a secure MAC authenticate its owner cryptographically? No. A MAC address can be spoofed. Compare this with a different operational question: Which mode models dropping with violation evidence? Restrict. The affected traffic is denied while the attachment remains usable for accepted sources. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Source-MAC security is Layer 2 policy, with no intrinsic TCP/UDP port.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show port-security\nshow port-security interface GigabitEthernet1/0/1",
        "explanation": "Observe the installed context for Port Security. Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Correct secure policy, restored port state and original allowed/denied source observations. Policy restoration alone may leave the port unusable. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Which mode models dropping with violation evidence?",
        "Restrict. The affected traffic is denied while the attachment remains usable for accepted sources."
      ],
      [
        "Why review phone plus workstation topology?",
        "It can require multiple legitimate source addresses. A count chosen without endpoint context can break intended access."
      ],
      [
        "Is disabling all Port Security a precise violation repair?",
        "No. Restore the intended address/count and supported port state."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "MAC spoofing can impersonate an allowed address; Port Security does not replace 802.1X or application identity. Sticky learned addresses can become stale after legitimate equipment replacement.",
    "performance": "Maximum counts and churn affect moves and recovery. The worksheet models one count/mode boundary and does not learn real frames or modify a switch port.",
    "mistakes": [
      "A MAC address can be spoofed.",
      "Reporting differences remain platform-specific in real operation.",
      "Recovery includes port state as well as the corrected policy.",
      "Do not clear unrelated secure entries."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g3-t0"
    ],
    "lab": {
      "objective": "Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Port Security boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Set the worksheet maximum to one and accepted count to one.",
        "Fault: present a new unaccepted source; compare protect, restrict and shutdown outputs.",
        "Restore the original accepted-source declaration and explain the separate target error-disable recovery required after shutdown.",
        "Predict the baseline Port Security result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated access attachment and a spare owned test endpoint. Preserve secure-address entries and violation mode; rehearse only one additional address and restore the baseline before saving any configuration. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Correct secure policy, restored port state and original allowed/denied source observations. Policy restoration alone may leave the port unusable. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Protect → Restrict → Shutdown. The affected traffic is denied while the attachment remains usable for accepted sources. A count chosen without endpoint context can break intended access.",
      "challenge": "Is disabling all Port Security a precise violation repair? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Protect": "Drop violating traffic in the model. Keep accepted sources distinct.",
      "Restrict": "Drop with violation evidence. Inspect supported counters/logging.",
      "Shutdown": "Model error-disabled attachment. Restore policy and port state safely."
    },
    "sources": [
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g2-t6-QC2",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One accepted MAC, maximum one, new source: what triggers?",
        "answer": "A violation under the declared count limit.",
        "explanation": "The new source would exceed the accepted-address allowance.",
        "testedConcept": "One accepted MAC, maximum one, new source: what triggers?"
      },
      {
        "questionId": "s5-g2-t6-QC4",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which mode models dropping with violation evidence?",
        "answer": "Restrict.",
        "explanation": "The affected traffic is denied while the attachment remains usable for accepted sources.",
        "testedConcept": "Which mode models dropping with violation evidence?"
      },
      {
        "questionId": "s5-g2-t6-QC8",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is disabling all Port Security a precise violation repair?",
        "answer": "No.",
        "explanation": "Restore the intended address/count and supported port state.",
        "testedConcept": "Is disabling all Port Security a precise violation repair?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g2-t6-Q01",
        "topicId": "s5-g2-t6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Does a secure MAC authenticate its owner cryptographically?",
        "answer": "No.",
        "explanation": "A MAC address can be spoofed.",
        "testedConcept": "Does a secure MAC authenticate its owner cryptographically?",
        "options": [
          "Only when maximum is one.",
          "No.",
          "Yes; source MAC is a signed identity.",
          "Yes; sticky learning prevents spoofing."
        ]
      },
      {
        "questionId": "s5-g2-t6-Q02",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One accepted MAC, maximum one, new source: what triggers?",
        "answer": "A violation under the declared count limit.",
        "explanation": "The new source would exceed the accepted-address allowance.",
        "testedConcept": "One accepted MAC, maximum one, new source: what triggers?"
      },
      {
        "questionId": "s5-g2-t6-Q03",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which mode models dropping without added violation reporting?",
        "answer": "Protect.",
        "explanation": "Reporting differences remain platform-specific in real operation.",
        "testedConcept": "Which mode models dropping without added violation reporting?"
      },
      {
        "questionId": "s5-g2-t6-Q04",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which mode models dropping with violation evidence?",
        "answer": "Restrict.",
        "explanation": "The affected traffic is denied while the attachment remains usable for accepted sources.",
        "testedConcept": "Which mode models dropping with violation evidence?"
      },
      {
        "questionId": "s5-g2-t6-Q05",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which mode models error-disable?",
        "answer": "Shutdown.",
        "explanation": "Recovery includes port state as well as the corrected policy.",
        "testedConcept": "Which mode models error-disable?"
      },
      {
        "questionId": "s5-g2-t6-Q06",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review phone plus workstation topology?",
        "answer": "It can require multiple legitimate source addresses.",
        "explanation": "A count chosen without endpoint context can break intended access.",
        "testedConcept": "Why review phone plus workstation topology?"
      },
      {
        "questionId": "s5-g2-t6-Q07",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Sticky address remains after host replacement; what should be checked?",
        "answer": "Owned learned-state and persistence before precise replacement.",
        "explanation": "Do not clear unrelated secure entries.",
        "testedConcept": "Sticky address remains after host replacement; what should be checked?"
      },
      {
        "questionId": "s5-g2-t6-Q08",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is disabling all Port Security a precise violation repair?",
        "answer": "No.",
        "explanation": "Restore the intended address/count and supported port state.",
        "testedConcept": "Is disabling all Port Security a precise violation repair?"
      },
      {
        "questionId": "s5-g2-t6-Q09",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What churn cost should be measured?",
        "answer": "Legitimate moves and replacement recovery on the target.",
        "explanation": "A worksheet cannot predict actual learning capacity.",
        "testedConcept": "What churn cost should be measured?"
      },
      {
        "questionId": "s5-g2-t6-Q10",
        "topicId": "s5-g2-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies recovery after shutdown mode?",
        "answer": "Correct secure policy, restored port state and original allowed/denied source observations.",
        "explanation": "Policy restoration alone may leave the port unusable.",
        "testedConcept": "What verifies recovery after shutdown mode?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g3-t0",
    "batch": "13",
    "title": "Control Plane Protection",
    "subtitle": "Observe the installed control-plane policy on a supported owned device.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-control-plane",
    "definition": "Control-plane protection preserves the processes that maintain routing, management and protocol state. Distinguish ordinary hardware-forwarded transit traffic from traffic to the device or punted for CPU handling. A transit packet may still be punted because of an exception, so destination address alone is insufficient for classifying every CPU path. Protection combines exposed-service reduction, admission policy, policing and monitoring.",
    "purpose": "Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router.",
    "mental": "Inventory routing neighbors, management sources and exception traffic that the selected platform sends to CPU. Identify the supported queue/class mapping before changing a policer. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Transit path: Ordinary forwarding across the device. Exceptions can still cause a CPU punt.",
      "To-device path: Management/protocol destination. Apply an appropriate control-plane boundary.",
      "Protection evidence: Class actions plus service continuity. Counter changes alone are insufficient.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Inventory routing neighbors, management sources and exception traffic that the selected platform sends to CPU. Identify the supported queue/class mapping before changing a policer.",
      "Separate required protocol/management traffic from unneeded or excessive input. Restrict sources where possible and preserve sufficient policy for legitimate protocol bursts and recovery.",
      "Correlate class counters, CPU behavior, neighbor/session continuity and original service observations. A drop counter demonstrates a class action, not that every required control protocol remains healthy."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Control-plane protection preserves the processes that maintain routing, management and protocol state. Distinguish ordinary hardware-forwarded transit traffic from traffic to the device or punted for CPU handling. A transit packet may still be punted because of an exception, so destination address alone is insufficient for classifying every CPU path. Protection combines exposed-service reduction, admission policy, policing and monitoring."
      ],
      [
        "Identify the consuming boundary",
        "Inventory routing neighbors, management sources and exception traffic that the selected platform sends to CPU. Identify the supported queue/class mapping before changing a policer."
      ],
      [
        "Follow the actual decision",
        "Separate required protocol/management traffic from unneeded or excessive input. Restrict sources where possible and preserve sufficient policy for legitimate protocol bursts and recovery."
      ],
      [
        "Verify limits and recovery",
        "Correlate class counters, CPU behavior, neighbor/session continuity and original service observations. A drop counter demonstrates a class action, not that every required control protocol remains healthy."
      ]
    ],
    "comparison": [
      [
        "Transit path",
        "Ordinary forwarding across the device",
        "Exceptions can still cause a CPU punt."
      ],
      [
        "To-device path",
        "Management/protocol destination",
        "Apply an appropriate control-plane boundary."
      ],
      [
        "Protection evidence",
        "Class actions plus service continuity",
        "Counter changes alone are insufficient."
      ]
    ],
    "example": "Does every transit packet avoid CPU processing? No. Exceptions can punt traffic to the control plane. Compare this with a different operational question: Which load units must be distinguished? Packets per second and bits per second. Packet size changes their relationship. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Control-plane classes can carry routing and management protocols; CoPP itself has no intrinsic port. Keep pps, bit/s and accounted packet size distinct.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show policy-map control-plane",
        "explanation": "Observe the installed context for Control Plane Protection. Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Policy/class evidence, neighbor continuity and original management/service observations. A single counter or configuration line does not establish recovery. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Which load units must be distinguished?",
        "Packets per second and bits per second. Packet size changes their relationship."
      ],
      [
        "Should a live router be flooded for this lesson?",
        "No. Use the declaration worksheet and owned bounded observations."
      ],
      [
        "Does a source ACL replace every CPU protection measure?",
        "No. Permitted sources can still send excessive or expensive traffic."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "An overly aggressive default class can disable routing and administrative recovery. Platform-installed system policies must be reviewed in their documented supported form.",
    "performance": "Packet rate, byte rate and burst behavior differ. The worksheet computes a declared constant-size offered load only; it does not model punts, CPU scheduling or real drops.",
    "mistakes": [
      "Exceptions can punt traffic to the control plane.",
      "Protocol continuity must be checked separately.",
      "Platform punt reasons and queues also matter.",
      "Recovery cannot rely solely on the affected class."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g3-t1"
    ],
    "lab": {
      "objective": "Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Control Plane Protection boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Inventory intended management and routing traffic with the installed class policy.",
        "Fault: raise the supplied worksheet packet rate above the configured envelope; calculate the offered byte rate.",
        "Restore the rate declaration and specify CPU, neighbor and original-management observations needed for a real recovery claim.",
        "Predict the baseline Control Plane Protection result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Observe the installed control-plane policy on a supported owned device. Baseline routing/management continuity before one bounded declaration-only excess-load case; do not flood a live router. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Policy/class evidence, neighbor continuity and original management/service observations. A single counter or configuration line does not establish recovery. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Transit path → To-device path → Protection evidence. Packet size changes their relationship. Use the declaration worksheet and owned bounded observations.",
      "challenge": "Does a source ACL replace every CPU protection measure? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Transit path": "Ordinary forwarding across the device. Exceptions can still cause a CPU punt.",
      "To-device path": "Management/protocol destination. Apply an appropriate control-plane boundary.",
      "Protection evidence": "Class actions plus service continuity. Counter changes alone are insufficient."
    },
    "sources": [
      {
        "title": "IOS XE 17 management/control plane protection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/qos/b-quality-of-service/m_qos-plcshp-mgt-plane-prt.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9600 IOS XE 17.17 CoPP",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/sec/b_1717_sec_9600_cg/configuring_control_plane_policing.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g3-t0-QC2",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inventory routing and management before policing?",
        "answer": "They must remain usable under the protective policy.",
        "explanation": "A broad drop can harm the objective it protects.",
        "testedConcept": "Why inventory routing and management before policing?"
      },
      {
        "questionId": "s5-g3-t0-QC4",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which load units must be distinguished?",
        "answer": "Packets per second and bits per second.",
        "explanation": "Packet size changes their relationship.",
        "testedConcept": "Which load units must be distinguished?"
      },
      {
        "questionId": "s5-g3-t0-QC8",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a source ACL replace every CPU protection measure?",
        "answer": "No.",
        "explanation": "Permitted sources can still send excessive or expensive traffic.",
        "testedConcept": "Does a source ACL replace every CPU protection measure?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g3-t0-Q01",
        "topicId": "s5-g3-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Does every transit packet avoid CPU processing?",
        "answer": "No.",
        "explanation": "Exceptions can punt traffic to the control plane.",
        "testedConcept": "Does every transit packet avoid CPU processing?",
        "options": [
          "No.",
          "Yes; transit can never be punted.",
          "Yes; only destination IP decides CPU handling.",
          "Only encrypted transit reaches CPU."
        ]
      },
      {
        "questionId": "s5-g3-t0-Q02",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inventory routing and management before policing?",
        "answer": "They must remain usable under the protective policy.",
        "explanation": "A broad drop can harm the objective it protects.",
        "testedConcept": "Why inventory routing and management before policing?"
      },
      {
        "questionId": "s5-g3-t0-Q03",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Drop counters rise; are neighbors necessarily healthy?",
        "answer": "No.",
        "explanation": "Protocol continuity must be checked separately.",
        "testedConcept": "Drop counters rise; are neighbors necessarily healthy?"
      },
      {
        "questionId": "s5-g3-t0-Q04",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which load units must be distinguished?",
        "answer": "Packets per second and bits per second.",
        "explanation": "Packet size changes their relationship.",
        "testedConcept": "Which load units must be distinguished?"
      },
      {
        "questionId": "s5-g3-t0-Q05",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can destination address classify every CPU exception?",
        "answer": "No.",
        "explanation": "Platform punt reasons and queues also matter.",
        "testedConcept": "Can destination address classify every CPU exception?"
      },
      {
        "questionId": "s5-g3-t0-Q06",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should a live router be flooded for this lesson?",
        "answer": "No.",
        "explanation": "Use the declaration worksheet and owned bounded observations.",
        "testedConcept": "Should a live router be flooded for this lesson?"
      },
      {
        "questionId": "s5-g3-t0-Q07",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why keep an independent console?",
        "answer": "A policing mistake can deny the management path.",
        "explanation": "Recovery cannot rely solely on the affected class.",
        "testedConcept": "Why keep an independent console?"
      },
      {
        "questionId": "s5-g3-t0-Q08",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a source ACL replace every CPU protection measure?",
        "answer": "No.",
        "explanation": "Permitted sources can still send excessive or expensive traffic.",
        "testedConcept": "Does a source ACL replace every CPU protection measure?"
      },
      {
        "questionId": "s5-g3-t0-Q09",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this envelope calculate CPU utilization?",
        "answer": "No.",
        "explanation": "Offered arithmetic is not a CPU scheduler or throughput measurement.",
        "testedConcept": "Does this envelope calculate CPU utilization?"
      },
      {
        "questionId": "s5-g3-t0-Q10",
        "topicId": "s5-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What supports recovery after a protection change?",
        "answer": "Policy/class evidence, neighbor continuity and original management/service observations.",
        "explanation": "A single counter or configuration line does not establish recovery.",
        "testedConcept": "What supports recovery after a protection change?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g3-t1",
    "batch": "13",
    "title": "CoPP",
    "subtitle": "Use the documented installed system policy rather than replacing it with a generic example.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-copp",
    "definition": "Control Plane Policing classifies traffic reaching the control-plane path and applies supported rate/action policy. Platform hardware queues and system policy differ from general router MQC examples. A nominal rate alone is incomplete: units, burst allowance, packet accounting and the action for conforming/exceeding input determine the behavior. This worksheet compares a constant-size offered load with a declared envelope, without simulating a token bucket.",
    "purpose": "Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change.",
    "mental": "Identify the traffic class and actual attachment in the installed policy. An ACL used for classification selects a class; its permit/deny does not automatically equal an interface packet-filter action. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Constant-size offered-load conversion and nominal-rate comparison; no token bucket, burst, per-packet conformance, CPU or actual drop simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Class match: Selects the control-plane class. ACL classification differs from filtering.",
      "Rate envelope: Nominal pps or bit/s threshold. Keep units and size assumptions explicit.",
      "Burst/action: Per-packet state and enforcement. Not inferred from an average rate comparison.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify the traffic class and actual attachment in the installed policy. An ACL used for classification selects a class; its permit/deny does not automatically equal an interface packet-filter action.",
      "Record whether the policy rate is pps or bit/s. Convert constant declared packet size using eight bits per byte, while retaining that wire overhead and hardware accounting can differ from the worksheet.",
      "Compare the offered average with the rate, then review bursts and required protocol behavior separately. At exactly the nominal rate the arithmetic is within the envelope; that does not predict per-packet conformance, drop counts or real CPU availability."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Control Plane Policing classifies traffic reaching the control-plane path and applies supported rate/action policy. Platform hardware queues and system policy differ from general router MQC examples. A nominal rate alone is incomplete: units, burst allowance, packet accounting and the action for conforming/exceeding input determine the behavior. This worksheet compares a constant-size offered load with a declared envelope, without simulating a token bucket."
      ],
      [
        "Identify the consuming boundary",
        "Identify the traffic class and actual attachment in the installed policy. An ACL used for classification selects a class; its permit/deny does not automatically equal an interface packet-filter action."
      ],
      [
        "Follow the actual decision",
        "Record whether the policy rate is pps or bit/s. Convert constant declared packet size using eight bits per byte, while retaining that wire overhead and hardware accounting can differ from the worksheet."
      ],
      [
        "Verify limits and recovery",
        "Compare the offered average with the rate, then review bursts and required protocol behavior separately. At exactly the nominal rate the arithmetic is within the envelope; that does not predict per-packet conformance, drop counts or real CPU availability."
      ]
    ],
    "comparison": [
      [
        "Class match",
        "Selects the control-plane class",
        "ACL classification differs from filtering."
      ],
      [
        "Rate envelope",
        "Nominal pps or bit/s threshold",
        "Keep units and size assumptions explicit."
      ],
      [
        "Burst/action",
        "Per-packet state and enforcement",
        "Not inferred from an average rate comparison."
      ]
    ],
    "example": "100 packets/s of 100 bytes gives what modeled load? 80000 bit/s. Multiply packets by bytes and eight; wire overhead is excluded. Compare this with a different operational question: Why do pps and bit/s policies differ? Byte load depends on packet size. Equal packet rates can carry very different bit rates. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Control-plane classes can carry routing and management protocols; CoPP itself has no intrinsic port. Keep pps, bit/s and accounted packet size distinct.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show policy-map control-plane",
        "explanation": "Observe the installed context for CoPP. Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore the exact supported baseline and verify the original control operations. Do not remove all protection to hide the failure. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why do pps and bit/s policies differ?",
        "Byte load depends on packet size. Equal packet rates can carry very different bit rates."
      ],
      [
        "Why inspect the installed system policy?",
        "Supported classes/queues differ by platform. Generic router configuration may not apply to a Catalyst system policy."
      ],
      [
        "Does this calculator include Ethernet wire overhead?",
        "No. It uses explicitly supplied accounted packet bytes."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect routing and AAA/authentication classes as well as user-facing management. Do not make an unbounded permit class for traffic merely because its protocol is legitimate.",
    "performance": "A fixed 1000 pps envelope represents very different byte loads for 64-byte and 1500-byte packets. Burst state and platform accounting are excluded, so no calculated excess is presented as measured loss.",
    "mistakes": [
      "Multiply packets by bytes and eight; wire overhead is excluded.",
      "Burst state and actual drops remain unknown.",
      "A token bucket, burst and action would need actual state.",
      "Required control bursts and continuity must be preserved."
    ],
    "prerequisites": [
      "s2-g0-t1",
      "s0-g1-t3"
    ],
    "related": [
      "s5-g4-t0"
    ],
    "lab": {
      "objective": "Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "CoPP boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the installed class, rate units and supported action before using the calculator.",
        "Fault: change only declared packet size while holding pps constant; compare bit/s envelopes.",
        "Restore the original size/rate and specify target class counters plus management/routing continuity for acceptance.",
        "Predict the baseline CoPP result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use the documented installed system policy rather than replacing it with a generic example. Preserve supported policer rates/class mappings and an independent management recovery route before an owned change. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Restore the exact supported baseline and verify the original control operations. Do not remove all protection to hide the failure. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Class match → Rate envelope → Burst/action. Equal packet rates can carry very different bit rates. Generic router configuration may not apply to a Catalyst system policy.",
      "challenge": "Does this calculator include Ethernet wire overhead? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Class match": "Selects the control-plane class. ACL classification differs from filtering.",
      "Rate envelope": "Nominal pps or bit/s threshold. Keep units and size assumptions explicit.",
      "Burst/action": "Per-packet state and enforcement. Not inferred from an average rate comparison."
    },
    "sources": [
      {
        "title": "Catalyst 9600 IOS XE 17.17 CoPP",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/sec/b_1717_sec_9600_cg/configuring_control_plane_policing.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 management/control plane protection",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/qos/b-quality-of-service/m_qos-plcshp-mgt-plane-prt.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g3-t1-QC2",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An ACL permit selects a CoPP class; does it automatically forward the packet?",
        "answer": "No.",
        "explanation": "The class policy action still determines enforcement.",
        "testedConcept": "An ACL permit selects a CoPP class; does it automatically forward the packet?"
      },
      {
        "questionId": "s5-g3-t1-QC4",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why do pps and bit/s policies differ?",
        "answer": "Byte load depends on packet size.",
        "explanation": "Equal packet rates can carry very different bit rates.",
        "testedConcept": "Why do pps and bit/s policies differ?"
      },
      {
        "questionId": "s5-g3-t1-QC8",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this calculator include Ethernet wire overhead?",
        "answer": "No.",
        "explanation": "It uses explicitly supplied accounted packet bytes.",
        "testedConcept": "Does this calculator include Ethernet wire overhead?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g3-t1-Q01",
        "topicId": "s5-g3-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "100 packets/s of 100 bytes gives what modeled load?",
        "answer": "80000 bit/s.",
        "explanation": "Multiply packets by bytes and eight; wire overhead is excluded.",
        "testedConcept": "100 packets/s of 100 bytes gives what modeled load?",
        "options": [
          "10000 bit/s.",
          "800 bit/s.",
          "800000 bit/s.",
          "80000 bit/s."
        ]
      },
      {
        "questionId": "s5-g3-t1-Q02",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An ACL permit selects a CoPP class; does it automatically forward the packet?",
        "answer": "No.",
        "explanation": "The class policy action still determines enforcement.",
        "testedConcept": "An ACL permit selects a CoPP class; does it automatically forward the packet?"
      },
      {
        "questionId": "s5-g3-t1-Q03",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Offered average equals rate; what may this worksheet conclude?",
        "answer": "Within the declared nominal envelope.",
        "explanation": "Burst state and actual drops remain unknown.",
        "testedConcept": "Offered average equals rate; what may this worksheet conclude?"
      },
      {
        "questionId": "s5-g3-t1-Q04",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why do pps and bit/s policies differ?",
        "answer": "Byte load depends on packet size.",
        "explanation": "Equal packet rates can carry very different bit rates.",
        "testedConcept": "Why do pps and bit/s policies differ?"
      },
      {
        "questionId": "s5-g3-t1-Q05",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does calculated excess equal measured dropped packets?",
        "answer": "No.",
        "explanation": "A token bucket, burst and action would need actual state.",
        "testedConcept": "Does calculated excess equal measured dropped packets?"
      },
      {
        "questionId": "s5-g3-t1-Q06",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect the installed system policy?",
        "answer": "Supported classes/queues differ by platform.",
        "explanation": "Generic router configuration may not apply to a Catalyst system policy.",
        "testedConcept": "Why inspect the installed system policy?"
      },
      {
        "questionId": "s5-g3-t1-Q07",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a low policer break legitimate routing?",
        "answer": "Yes.",
        "explanation": "Required control bursts and continuity must be preserved.",
        "testedConcept": "Can a low policer break legitimate routing?"
      },
      {
        "questionId": "s5-g3-t1-Q08",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this calculator include Ethernet wire overhead?",
        "answer": "No.",
        "explanation": "It uses explicitly supplied accounted packet bytes.",
        "testedConcept": "Does this calculator include Ethernet wire overhead?"
      },
      {
        "questionId": "s5-g3-t1-Q09",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What evidence should accompany a rate change?",
        "answer": "Class counters, CPU context and original routing/management continuity.",
        "explanation": "A configured nominal value is not service proof.",
        "testedConcept": "What evidence should accompany a rate change?"
      },
      {
        "questionId": "s5-g3-t1-Q10",
        "topicId": "s5-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How should a bad rate be restored?",
        "answer": "Restore the exact supported baseline and verify the original control operations.",
        "explanation": "Do not remove all protection to hide the failure.",
        "testedConcept": "How should a bad rate be restored?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  }
];
