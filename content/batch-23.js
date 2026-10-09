window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["23"] = [
  {
    "id": "s9-g2-t0",
    "batch": "23",
    "title": "Netmiko",
    "subtitle": "A configuration set contains one valid and one invalid command.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g2-t0",
    "definition": "Netmiko provides platform-aware SSH CLI interactions for network devices; it simplifies sessions without turning textual commands into guaranteed transactions.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A configuration set contains one valid and one invalid command. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Device type, Command result, Configuration set. Select the driver for the actual supported platform and verify host identity. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Wrong selection can break prompt handling. Error detection remains necessary. Partial application is possible. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Device type: Driver selection. Wrong selection can break prompt handling.",
      "Command result: Returned CLI text. Error detection remains necessary.",
      "Configuration set: Sequence of CLI changes. Partial application is possible."
    ],
    "mechanism": [
      "Select the driver for the actual supported platform and verify host identity.",
      "Send a bounded read operation and inspect command output.",
      "Apply only a reviewed small change and collect post-state independently."
    ],
    "flow": [
      [
        "Operation and scope",
        "A configuration set contains one valid and one invalid command."
      ],
      [
        "Device type",
        "Select the driver for the actual supported platform and verify host identity."
      ],
      [
        "Command result",
        "Send a bounded read operation and inspect command output."
      ],
      [
        "Configuration set",
        "Apply only a reviewed small change and collect post-state independently."
      ]
    ],
    "comparison": [
      [
        "Device type",
        "Driver selection",
        "Wrong selection can break prompt handling"
      ],
      [
        "Command result",
        "Returned CLI text",
        "Error detection remains necessary"
      ],
      [
        "Configuration set",
        "Sequence of CLI changes",
        "Partial application is possible"
      ]
    ],
    "example": "Worked incident: A configuration set contains one valid and one invalid command. Failure: The connection remains open and the first command stays applied after the second fails. Recovery: Report partial application, compare the captured baseline and restore only the changed owned setting. The key distinction is illustrated by this question: Does send_config_set imply atomicity? No. Commands can succeed individually before another fails. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g2-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Select the driver for the actual supported platform and verify host identity. Send a bounded read operation and inspect command output. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The connection remains open and the first command stays applied after the second fails. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Report partial application, compare the captured baseline and restore only the changed owned setting.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Apply only a reviewed small change and collect post-state independently. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Wrong selection can break prompt handling. Partial application is possible. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Send a bounded read operation and inspect command output. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The connection remains open and the first command stays applied after the second fails.",
        "Report partial application, compare the captured baseline and restore only the changed owned setting."
      ],
      [
        "Why select device_type accurately?",
        "Drivers handle platform-specific session behavior. A generic prompt assumption may hang or truncate."
      ],
      [
        "What should a timeout record contain?",
        "Target identity, phase and unknown completion status without secrets. Do not treat silence as a rejected change."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Commands can succeed individually before another fails.",
      "A generic prompt assumption may hang or truncate.",
      "Do not treat silence as a rejected change.",
      "CLI convenience does not add them.",
      "Wrong selection can break prompt handling.",
      "Partial application is possible."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t9"
    ],
    "related": [
      "s9-g2-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Netmiko failure with an explicit evidence boundary. A configuration set contains one valid and one invalid command.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Device type → Driver selection",
        "Command result → Returned CLI text",
        "Configuration set → Sequence of CLI changes"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A configuration set contains one valid and one invalid command.",
        "Write a prediction before revealing the baseline explanation. Select the driver for the actual supported platform and verify host identity.",
        "Select Fault and locate the first broken handoff. The connection remains open and the first command stays applied after the second fails.",
        "Propose one observation that could disprove your diagnosis. Why select device_type accurately?",
        "Select Recovery and compare with the required result. Report partial application, compare the captured baseline and restore only the changed owned setting.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Report partial application, compare the captured baseline and restore only the changed owned setting. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The connection remains open and the first command stays applied after the second fails. When it supplies supported schemas and transaction features needed by the task.",
      "challenge": "When is structured API preferable? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Device type": "Driver selection. Wrong selection can break prompt handling.",
      "Command result": "Returned CLI text. Error detection remains necessary.",
      "Configuration set": "Sequence of CLI changes. Partial application is possible."
    },
    "sources": [
      {
        "title": "Netmiko project documentation",
        "url": "https://ktbyers.github.io/netmiko/",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4253 SSH transport",
        "url": "https://www.rfc-editor.org/rfc/rfc4253.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g2-t0-QC1",
        "topicId": "s9-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Netmiko.",
        "answer": "Netmiko provides platform-aware SSH CLI interactions for network devices; it simplifies sessions without turning textual commands into guaranteed transactions.",
        "explanation": "Select the driver for the actual supported platform and verify host identity.",
        "testedConcept": "Device type"
      },
      {
        "questionId": "s9-g2-t0-QC2",
        "topicId": "s9-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Send a bounded read operation and inspect command output.",
        "explanation": "Error detection remains necessary.",
        "testedConcept": "Command result"
      },
      {
        "questionId": "s9-g2-t0-QC3",
        "topicId": "s9-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Report partial application, compare the captured baseline and restore only the changed owned setting.",
        "explanation": "Apply only a reviewed small change and collect post-state independently.",
        "testedConcept": "Configuration set"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g2-t0-Q1",
        "topicId": "s9-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does send_config_set imply atomicity?",
        "answer": "No.",
        "explanation": "Commands can succeed individually before another fails.",
        "testedConcept": "Device type"
      },
      {
        "questionId": "s9-g2-t0-Q2",
        "topicId": "s9-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why select device_type accurately?",
        "answer": "Drivers handle platform-specific session behavior.",
        "explanation": "A generic prompt assumption may hang or truncate.",
        "testedConcept": "Command result"
      },
      {
        "questionId": "s9-g2-t0-Q3",
        "topicId": "s9-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a timeout record contain?",
        "answer": "Target identity, phase and unknown completion status without secrets.",
        "explanation": "Do not treat silence as a rejected change.",
        "testedConcept": "Configuration set"
      },
      {
        "questionId": "s9-g2-t0-Q4",
        "topicId": "s9-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "When is structured API preferable?",
        "answer": "When it supplies supported schemas and transaction features needed by the task.",
        "explanation": "CLI convenience does not add them.",
        "testedConcept": "Device type"
      },
      {
        "questionId": "s9-g2-t0-Q5",
        "topicId": "s9-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Netmiko case.",
        "answer": "The connection remains open and the first command stays applied after the second fails.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g2-t0-Q6",
        "topicId": "s9-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Netmiko incident?",
        "answer": "Report partial application, compare the captured baseline and restore only the changed owned setting.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g2-t0-Q7",
        "topicId": "s9-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Device type with Command result.",
        "answer": "Driver selection. Returned CLI text.",
        "explanation": "Wrong selection can break prompt handling. Error detection remains necessary.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g2-t0-Q8",
        "topicId": "s9-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Configuration set not establish the entire outcome?",
        "answer": "Partial application is possible.",
        "explanation": "Apply only a reviewed small change and collect post-state independently.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g2-t0-Q9",
        "topicId": "s9-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A configuration set contains one valid and one invalid command. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g2-t0-Q10",
        "topicId": "s9-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A configuration set contains one valid and one invalid command.",
      "fault": "The connection remains open and the first command stays applied after the second fails.",
      "restore": "Report partial application, compare the captured baseline and restore only the changed owned setting.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g2-t1",
    "batch": "23",
    "title": "Paramiko",
    "subtitle": "A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g2-t1",
    "definition": "Paramiko exposes SSH client, transport and channel primitives; callers own command framing, host-key policy and output handling.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between SSHClient, Known hosts, Exit status. Load approved host keys and keep a rejecting policy for unknown peers. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Explicitly close owned sessions. Automatic acceptance weakens identity checks. Interactive network shells may differ. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "SSHClient: High-level SSH client object. Explicitly close owned sessions.",
      "Known hosts: Approved server keys. Automatic acceptance weakens identity checks.",
      "Exit status: Remote process result. Interactive network shells may differ."
    ],
    "mechanism": [
      "Load approved host keys and keep a rejecting policy for unknown peers.",
      "Connect with bounded timeouts and run a command suited to the remote system.",
      "Read output and errors, inspect completion and close the session."
    ],
    "flow": [
      [
        "Operation and scope",
        "A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully."
      ],
      [
        "SSHClient",
        "Load approved host keys and keep a rejecting policy for unknown peers."
      ],
      [
        "Known hosts",
        "Connect with bounded timeouts and run a command suited to the remote system."
      ],
      [
        "Exit status",
        "Read output and errors, inspect completion and close the session."
      ]
    ],
    "comparison": [
      [
        "SSHClient",
        "High-level SSH client object",
        "Explicitly close owned sessions"
      ],
      [
        "Known hosts",
        "Approved server keys",
        "Automatic acceptance weakens identity checks"
      ],
      [
        "Exit status",
        "Remote process result",
        "Interactive network shells may differ"
      ]
    ],
    "example": "Worked incident: A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully. Failure: The script reads stdout only and claims a successful empty result. Recovery: Collect stderr and exit status, preserve failure and close the client even when processing raises. The key distinction is illustrated by this question: Is AutoAddPolicy peer verification? It accepts an unknown key rather than confirming an approved identity. Use a deliberate enrollment path. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g2-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Load approved host keys and keep a rejecting policy for unknown peers. Connect with bounded timeouts and run a command suited to the remote system. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The script reads stdout only and claims a successful empty result. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Collect stderr and exit status, preserve failure and close the client even when processing raises.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Read output and errors, inspect completion and close the session. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Explicitly close owned sessions. Interactive network shells may differ. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Connect with bounded timeouts and run a command suited to the remote system. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The script reads stdout only and claims a successful empty result.",
        "Collect stderr and exit status, preserve failure and close the client even when processing raises."
      ],
      [
        "Why collect stderr?",
        "Failure detail may be separate from stdout. Empty stdout is not success."
      ],
      [
        "Can exec_command be assumed on every network device?",
        "No; remote shell behavior varies. A platform-aware library may be more suitable."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Use a deliberate enrollment path.",
      "Empty stdout is not success.",
      "A platform-aware library may be more suitable.",
      "Garbage collection is not an execution lifecycle policy.",
      "Explicitly close owned sessions.",
      "Interactive network shells may differ."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g2-t0"
    ],
    "related": [
      "s9-g2-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Paramiko failure with an explicit evidence boundary. A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "SSHClient → High-level SSH client object",
        "Known hosts → Approved server keys",
        "Exit status → Remote process result"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully.",
        "Write a prediction before revealing the baseline explanation. Load approved host keys and keep a rejecting policy for unknown peers.",
        "Select Fault and locate the first broken handoff. The script reads stdout only and claims a successful empty result.",
        "Propose one observation that could disprove your diagnosis. Why collect stderr?",
        "Select Recovery and compare with the required result. Collect stderr and exit status, preserve failure and close the client even when processing raises.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Collect stderr and exit status, preserve failure and close the client even when processing raises. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The script reads stdout only and claims a successful empty result. To release network resources predictably.",
      "challenge": "Why explicitly close? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "SSHClient": "High-level SSH client object. Explicitly close owned sessions.",
      "Known hosts": "Approved server keys. Automatic acceptance weakens identity checks.",
      "Exit status": "Remote process result. Interactive network shells may differ."
    },
    "sources": [
      {
        "title": "Paramiko SSHClient contract",
        "url": "https://docs.paramiko.org/en/stable/api/client.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g2-t1-QC1",
        "topicId": "s9-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Paramiko.",
        "answer": "Paramiko exposes SSH client, transport and channel primitives; callers own command framing, host-key policy and output handling.",
        "explanation": "Load approved host keys and keep a rejecting policy for unknown peers.",
        "testedConcept": "SSHClient"
      },
      {
        "questionId": "s9-g2-t1-QC2",
        "topicId": "s9-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Connect with bounded timeouts and run a command suited to the remote system.",
        "explanation": "Automatic acceptance weakens identity checks.",
        "testedConcept": "Known hosts"
      },
      {
        "questionId": "s9-g2-t1-QC3",
        "topicId": "s9-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Collect stderr and exit status, preserve failure and close the client even when processing raises.",
        "explanation": "Read output and errors, inspect completion and close the session.",
        "testedConcept": "Exit status"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g2-t1-Q1",
        "topicId": "s9-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is AutoAddPolicy peer verification?",
        "answer": "It accepts an unknown key rather than confirming an approved identity.",
        "explanation": "Use a deliberate enrollment path.",
        "testedConcept": "SSHClient"
      },
      {
        "questionId": "s9-g2-t1-Q2",
        "topicId": "s9-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why collect stderr?",
        "answer": "Failure detail may be separate from stdout.",
        "explanation": "Empty stdout is not success.",
        "testedConcept": "Known hosts"
      },
      {
        "questionId": "s9-g2-t1-Q3",
        "topicId": "s9-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can exec_command be assumed on every network device?",
        "answer": "No; remote shell behavior varies.",
        "explanation": "A platform-aware library may be more suitable.",
        "testedConcept": "Exit status"
      },
      {
        "questionId": "s9-g2-t1-Q4",
        "topicId": "s9-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why explicitly close?",
        "answer": "To release network resources predictably.",
        "explanation": "Garbage collection is not an execution lifecycle policy.",
        "testedConcept": "SSHClient"
      },
      {
        "questionId": "s9-g2-t1-Q5",
        "topicId": "s9-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Paramiko case.",
        "answer": "The script reads stdout only and claims a successful empty result.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g2-t1-Q6",
        "topicId": "s9-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Paramiko incident?",
        "answer": "Collect stderr and exit status, preserve failure and close the client even when processing raises.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g2-t1-Q7",
        "topicId": "s9-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast SSHClient with Known hosts.",
        "answer": "High-level SSH client object. Approved server keys.",
        "explanation": "Explicitly close owned sessions. Automatic acceptance weakens identity checks.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g2-t1-Q8",
        "topicId": "s9-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Exit status not establish the entire outcome?",
        "answer": "Interactive network shells may differ.",
        "explanation": "Read output and errors, inspect completion and close the session.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g2-t1-Q9",
        "topicId": "s9-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g2-t1-Q10",
        "topicId": "s9-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A controlled Linux SSH endpoint writes to stderr and exits unsuccessfully.",
      "fault": "The script reads stdout only and claims a successful empty result.",
      "restore": "Collect stderr and exit status, preserve failure and close the client even when processing raises.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g2-t2",
    "batch": "23",
    "title": "NAPALM",
    "subtitle": "A merge-only change is accidentally prepared as a full replacement.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g2-t2",
    "definition": "NAPALM offers a common driver interface for network getters and configuration operations; actual feature support and semantics depend on the driver and device.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A merge-only change is accidentally prepared as a full replacement. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Getter, Candidate diff, Commit. Check driver support for the required operation. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Coverage varies by driver. A diff is not applied state. Rollback guarantees are platform-specific. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Getter: Normalized operational read. Coverage varies by driver.",
      "Candidate diff: Proposed configuration comparison. A diff is not applied state.",
      "Commit: Apply supported candidate. Rollback guarantees are platform-specific."
    ],
    "mechanism": [
      "Check driver support for the required operation.",
      "Load a merge or replacement candidate into the supported workflow and inspect the diff.",
      "Commit only a reviewed candidate, verify state and use the supported recovery operation if needed."
    ],
    "flow": [
      [
        "Operation and scope",
        "A merge-only change is accidentally prepared as a full replacement."
      ],
      [
        "Getter",
        "Check driver support for the required operation."
      ],
      [
        "Candidate diff",
        "Load a merge or replacement candidate into the supported workflow and inspect the diff."
      ],
      [
        "Commit",
        "Commit only a reviewed candidate, verify state and use the supported recovery operation if needed."
      ]
    ],
    "comparison": [
      [
        "Getter",
        "Normalized operational read",
        "Coverage varies by driver"
      ],
      [
        "Candidate diff",
        "Proposed configuration comparison",
        "A diff is not applied state"
      ],
      [
        "Commit",
        "Apply supported candidate",
        "Rollback guarantees are platform-specific"
      ]
    ],
    "example": "Worked incident: A merge-only change is accidentally prepared as a full replacement. Failure: The diff includes removal of unrelated management configuration. Recovery: Discard the candidate; select the intended mode and accept only the bounded diff before any commit. The key distinction is illustrated by this question: Why distinguish merge from replace? Replace may remove configuration omitted from the candidate. Intent must cover the replacement scope. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g2-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Check driver support for the required operation. Load a merge or replacement candidate into the supported workflow and inspect the diff. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The diff includes removal of unrelated management configuration. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Discard the candidate; select the intended mode and accept only the bounded diff before any commit.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Commit only a reviewed candidate, verify state and use the supported recovery operation if needed. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Coverage varies by driver. Rollback guarantees are platform-specific. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Load a merge or replacement candidate into the supported workflow and inspect the diff. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The diff includes removal of unrelated management configuration.",
        "Discard the candidate; select the intended mode and accept only the bounded diff before any commit."
      ],
      [
        "Does normalized output mean identical device features?",
        "No. An absent field or unsupported getter needs explicit handling."
      ],
      [
        "What should happen to an unexpected diff?",
        "Stop and discard or revise the candidate. Do not approve based on its filename."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Intent must cover the replacement scope.",
      "An absent field or unsupported getter needs explicit handling.",
      "Do not approve based on its filename.",
      "A common method name is not a universal guarantee.",
      "Coverage varies by driver.",
      "Rollback guarantees are platform-specific."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g2-t1"
    ],
    "related": [
      "s9-g2-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated NAPALM failure with an explicit evidence boundary. A merge-only change is accidentally prepared as a full replacement.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Getter → Normalized operational read",
        "Candidate diff → Proposed configuration comparison",
        "Commit → Apply supported candidate"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A merge-only change is accidentally prepared as a full replacement.",
        "Write a prediction before revealing the baseline explanation. Check driver support for the required operation.",
        "Select Fault and locate the first broken handoff. The diff includes removal of unrelated management configuration.",
        "Propose one observation that could disprove your diagnosis. Does normalized output mean identical device features?",
        "Select Recovery and compare with the required result. Discard the candidate; select the intended mode and accept only the bounded diff before any commit.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Discard the candidate; select the intended mode and accept only the bounded diff before any commit. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The diff includes removal of unrelated management configuration. No; verify support and test it.",
      "challenge": "Can rollback be assumed for every driver? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Getter": "Normalized operational read. Coverage varies by driver.",
      "Candidate diff": "Proposed configuration comparison. A diff is not applied state.",
      "Commit": "Apply supported candidate. Rollback guarantees are platform-specific."
    },
    "sources": [
      {
        "title": "NAPALM NetworkDriver contract; verify installed driver support",
        "url": "https://napalm.readthedocs.io/en/latest/base.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g2-t2-QC1",
        "topicId": "s9-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of NAPALM.",
        "answer": "NAPALM offers a common driver interface for network getters and configuration operations; actual feature support and semantics depend on the driver and device.",
        "explanation": "Check driver support for the required operation.",
        "testedConcept": "Getter"
      },
      {
        "questionId": "s9-g2-t2-QC2",
        "topicId": "s9-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Load a merge or replacement candidate into the supported workflow and inspect the diff.",
        "explanation": "A diff is not applied state.",
        "testedConcept": "Candidate diff"
      },
      {
        "questionId": "s9-g2-t2-QC3",
        "topicId": "s9-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Discard the candidate; select the intended mode and accept only the bounded diff before any commit.",
        "explanation": "Commit only a reviewed candidate, verify state and use the supported recovery operation if needed.",
        "testedConcept": "Commit"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g2-t2-Q1",
        "topicId": "s9-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why distinguish merge from replace?",
        "answer": "Replace may remove configuration omitted from the candidate.",
        "explanation": "Intent must cover the replacement scope.",
        "testedConcept": "Getter"
      },
      {
        "questionId": "s9-g2-t2-Q2",
        "topicId": "s9-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does normalized output mean identical device features?",
        "answer": "No.",
        "explanation": "An absent field or unsupported getter needs explicit handling.",
        "testedConcept": "Candidate diff"
      },
      {
        "questionId": "s9-g2-t2-Q3",
        "topicId": "s9-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should happen to an unexpected diff?",
        "answer": "Stop and discard or revise the candidate.",
        "explanation": "Do not approve based on its filename.",
        "testedConcept": "Commit"
      },
      {
        "questionId": "s9-g2-t2-Q4",
        "topicId": "s9-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can rollback be assumed for every driver?",
        "answer": "No; verify support and test it.",
        "explanation": "A common method name is not a universal guarantee.",
        "testedConcept": "Getter"
      },
      {
        "questionId": "s9-g2-t2-Q5",
        "topicId": "s9-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this NAPALM case.",
        "answer": "The diff includes removal of unrelated management configuration.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g2-t2-Q6",
        "topicId": "s9-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the NAPALM incident?",
        "answer": "Discard the candidate; select the intended mode and accept only the bounded diff before any commit.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g2-t2-Q7",
        "topicId": "s9-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Getter with Candidate diff.",
        "answer": "Normalized operational read. Proposed configuration comparison.",
        "explanation": "Coverage varies by driver. A diff is not applied state.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g2-t2-Q8",
        "topicId": "s9-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Commit not establish the entire outcome?",
        "answer": "Rollback guarantees are platform-specific.",
        "explanation": "Commit only a reviewed candidate, verify state and use the supported recovery operation if needed.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g2-t2-Q9",
        "topicId": "s9-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A merge-only change is accidentally prepared as a full replacement. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g2-t2-Q10",
        "topicId": "s9-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A merge-only change is accidentally prepared as a full replacement.",
      "fault": "The diff includes removal of unrelated management configuration.",
      "restore": "Discard the candidate; select the intended mode and accept only the bounded diff before any commit.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g2-t3",
    "batch": "23",
    "title": "Requests",
    "subtitle": "An endpoint returns an HTML error page with status 503.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g2-t3",
    "definition": "Requests is an HTTP client library; a correct automation client still specifies timeouts, validates status and schema, and handles uncertain write outcomes.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An endpoint returns an HTML error page with status 503. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Timeout, Response, Session. Set explicit connection/read timeouts and retain TLS verification. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Not necessarily a total end-to-end deadline. JSON decoding does not imply success. Credentials must stay within intended origins. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Timeout: Bound on socket waiting behavior. Not necessarily a total end-to-end deadline.",
      "Response: Status headers and body. JSON decoding does not imply success.",
      "Session: Reusable client state. Credentials must stay within intended origins."
    ],
    "mechanism": [
      "Set explicit connection/read timeouts and retain TLS verification.",
      "Check status before interpreting the expected body schema.",
      "Handle pagination and retry only with documented operation semantics."
    ],
    "flow": [
      [
        "Operation and scope",
        "An endpoint returns an HTML error page with status 503."
      ],
      [
        "Timeout",
        "Set explicit connection/read timeouts and retain TLS verification."
      ],
      [
        "Response",
        "Check status before interpreting the expected body schema."
      ],
      [
        "Session",
        "Handle pagination and retry only with documented operation semantics."
      ]
    ],
    "comparison": [
      [
        "Timeout",
        "Bound on socket waiting behavior",
        "Not necessarily a total end-to-end deadline"
      ],
      [
        "Response",
        "Status headers and body",
        "JSON decoding does not imply success"
      ],
      [
        "Session",
        "Reusable client state",
        "Credentials must stay within intended origins"
      ]
    ],
    "example": "Worked incident: An endpoint returns an HTML error page with status 503. Failure: The client calls json and masks the original HTTP failure. Recovery: Check the status and content contract, report sanitized server context and retry only within the read budget. The key distinction is illustrated by this question: Does requests set a default timeout? Not for ordinary calls unless supplied. An omitted timeout can wait indefinitely. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g2-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Set explicit connection/read timeouts and retain TLS verification. Check status before interpreting the expected body schema. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The client calls json and masks the original HTTP failure. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Check the status and content contract, report sanitized server context and retry only within the read budget.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Handle pagination and retry only with documented operation semantics. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Not necessarily a total end-to-end deadline. Credentials must stay within intended origins. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Check status before interpreting the expected body schema. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The client calls json and masks the original HTTP failure.",
        "Check the status and content contract, report sanitized server context and retry only within the read budget."
      ],
      [
        "Does r.json prove a 2xx result?",
        "No. Error responses can contain valid JSON."
      ],
      [
        "What does raise_for_status address?",
        "HTTP error statuses. It does not validate application fields."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "An omitted timeout can wait indefinitely.",
      "Error responses can contain valid JSON.",
      "It does not validate application fields.",
      "Repair trust or endpoint configuration instead.",
      "Not necessarily a total end-to-end deadline.",
      "Credentials must stay within intended origins."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g2-t2"
    ],
    "related": [
      "s9-g3-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Requests failure with an explicit evidence boundary. An endpoint returns an HTML error page with status 503.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Timeout → Bound on socket waiting behavior",
        "Response → Status headers and body",
        "Session → Reusable client state"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An endpoint returns an HTML error page with status 503.",
        "Write a prediction before revealing the baseline explanation. Set explicit connection/read timeouts and retain TLS verification.",
        "Select Fault and locate the first broken handoff. The client calls json and masks the original HTTP failure.",
        "Propose one observation that could disprove your diagnosis. Does r.json prove a 2xx result?",
        "Select Recovery and compare with the required result. Check the status and content contract, report sanitized server context and retry only within the read budget.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Check the status and content contract, report sanitized server context and retry only within the read budget. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The client calls json and masks the original HTTP failure. It removes server certificate verification.",
      "challenge": "Why not set verify false to fix TLS errors? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Timeout": "Bound on socket waiting behavior. Not necessarily a total end-to-end deadline.",
      "Response": "Status headers and body. JSON decoding does not imply success.",
      "Session": "Reusable client state. Credentials must stay within intended origins."
    },
    "sources": [
      {
        "title": "Requests client behavior",
        "url": "https://requests.readthedocs.io/en/latest/user/quickstart/",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9110 HTTP semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g2-t3-QC1",
        "topicId": "s9-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Requests.",
        "answer": "Requests is an HTTP client library; a correct automation client still specifies timeouts, validates status and schema, and handles uncertain write outcomes.",
        "explanation": "Set explicit connection/read timeouts and retain TLS verification.",
        "testedConcept": "Timeout"
      },
      {
        "questionId": "s9-g2-t3-QC2",
        "topicId": "s9-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Check status before interpreting the expected body schema.",
        "explanation": "JSON decoding does not imply success.",
        "testedConcept": "Response"
      },
      {
        "questionId": "s9-g2-t3-QC3",
        "topicId": "s9-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Check the status and content contract, report sanitized server context and retry only within the read budget.",
        "explanation": "Handle pagination and retry only with documented operation semantics.",
        "testedConcept": "Session"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g2-t3-Q1",
        "topicId": "s9-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does requests set a default timeout?",
        "answer": "Not for ordinary calls unless supplied.",
        "explanation": "An omitted timeout can wait indefinitely.",
        "testedConcept": "Timeout"
      },
      {
        "questionId": "s9-g2-t3-Q2",
        "topicId": "s9-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does r.json prove a 2xx result?",
        "answer": "No.",
        "explanation": "Error responses can contain valid JSON.",
        "testedConcept": "Response"
      },
      {
        "questionId": "s9-g2-t3-Q3",
        "topicId": "s9-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does raise_for_status address?",
        "answer": "HTTP error statuses.",
        "explanation": "It does not validate application fields.",
        "testedConcept": "Session"
      },
      {
        "questionId": "s9-g2-t3-Q4",
        "topicId": "s9-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why not set verify false to fix TLS errors?",
        "answer": "It removes server certificate verification.",
        "explanation": "Repair trust or endpoint configuration instead.",
        "testedConcept": "Timeout"
      },
      {
        "questionId": "s9-g2-t3-Q5",
        "topicId": "s9-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Requests case.",
        "answer": "The client calls json and masks the original HTTP failure.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g2-t3-Q6",
        "topicId": "s9-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Requests incident?",
        "answer": "Check the status and content contract, report sanitized server context and retry only within the read budget.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g2-t3-Q7",
        "topicId": "s9-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Timeout with Response.",
        "answer": "Bound on socket waiting behavior. Status headers and body.",
        "explanation": "Not necessarily a total end-to-end deadline. JSON decoding does not imply success.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g2-t3-Q8",
        "topicId": "s9-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Session not establish the entire outcome?",
        "answer": "Credentials must stay within intended origins.",
        "explanation": "Handle pagination and retry only with documented operation semantics.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g2-t3-Q9",
        "topicId": "s9-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An endpoint returns an HTML error page with status 503. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g2-t3-Q10",
        "topicId": "s9-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "An endpoint returns an HTML error page with status 503.",
      "fault": "The client calls json and masks the original HTTP failure.",
      "restore": "Check the status and content contract, report sanitized server context and retry only within the read budget.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t0",
    "batch": "23",
    "title": "Ansible",
    "subtitle": "A network task is intended for a single lab group.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t0",
    "definition": "Ansible coordinates declared tasks over an inventory using connection plugins and modules; repeatability depends on module semantics and controlled input.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A network task is intended for a single lab group. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Inventory, Module, Check mode. Resolve inventory, variables and connection settings. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Group scope can widen a change. Not all modules are idempotent. It is not universal execution proof. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Inventory: Selected managed hosts. Group scope can widen a change.",
      "Module: Task implementation. Not all modules are idempotent.",
      "Check mode: Prediction when supported. It is not universal execution proof."
    ],
    "mechanism": [
      "Resolve inventory, variables and connection settings.",
      "Preview supported changes on one owned canary.",
      "Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately."
    ],
    "flow": [
      [
        "Operation and scope",
        "A network task is intended for a single lab group."
      ],
      [
        "Inventory",
        "Resolve inventory, variables and connection settings."
      ],
      [
        "Module",
        "Preview supported changes on one owned canary."
      ],
      [
        "Check mode",
        "Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately."
      ]
    ],
    "comparison": [
      [
        "Inventory",
        "Selected managed hosts",
        "Group scope can widen a change"
      ],
      [
        "Module",
        "Task implementation",
        "Not all modules are idempotent"
      ],
      [
        "Check mode",
        "Prediction when supported",
        "It is not universal execution proof"
      ]
    ],
    "example": "Worked incident: A network task is intended for a single lab group. Failure: The play targets all and changes unrelated devices. Recovery: Resolve and inspect the host set before execution, constrain the play and retain a canary gate. The key distinction is illustrated by this question: Does YAML make a task idempotent? No; the module and operation determine behavior. Repeated shell commands may append repeatedly. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Resolve inventory, variables and connection settings. Preview supported changes on one owned canary. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The play targets all and changes unrelated devices. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Resolve and inspect the host set before execution, constrain the play and retain a canary gate.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Group scope can widen a change. It is not universal execution proof. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Preview supported changes on one owned canary. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The play targets all and changes unrelated devices.",
        "Resolve and inspect the host set before execution, constrain the play and retain a canary gate."
      ],
      [
        "Are failed and unreachable identical?",
        "No; failure and inability to reach a host have different causes. Both prevent complete acceptance."
      ],
      [
        "What does check mode miss?",
        "Unsupported behavior and effects requiring actual execution. Read the module support notes."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Repeated shell commands may append repeatedly.",
      "Both prevent complete acceptance.",
      "Read the module support notes.",
      "Record tested versions with the automation.",
      "Group scope can widen a change.",
      "It is not universal execution proof."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g2-t3"
    ],
    "related": [
      "s9-g3-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Ansible failure with an explicit evidence boundary. A network task is intended for a single lab group.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Inventory → Selected managed hosts",
        "Module → Task implementation",
        "Check mode → Prediction when supported"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A network task is intended for a single lab group.",
        "Write a prediction before revealing the baseline explanation. Resolve inventory, variables and connection settings.",
        "Select Fault and locate the first broken handoff. The play targets all and changes unrelated devices.",
        "Propose one observation that could disprove your diagnosis. Are failed and unreachable identical?",
        "Select Recovery and compare with the required result. Resolve and inspect the host set before execution, constrain the play and retain a canary gate.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Resolve and inspect the host set before execution, constrain the play and retain a canary gate. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The play targets all and changes unrelated devices. Module behavior and dependencies evolve.",
      "challenge": "Why pin collections? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Inventory": "Selected managed hosts. Group scope can widen a change.",
      "Module": "Task implementation. Not all modules are idempotent.",
      "Check mode": "Prediction when supported. It is not universal execution proof."
    },
    "sources": [
      {
        "title": "Ansible network automation guide",
        "url": "https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t0-QC1",
        "topicId": "s9-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Ansible.",
        "answer": "Ansible coordinates declared tasks over an inventory using connection plugins and modules; repeatability depends on module semantics and controlled input.",
        "explanation": "Resolve inventory, variables and connection settings.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g3-t0-QC2",
        "topicId": "s9-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Preview supported changes on one owned canary.",
        "explanation": "Not all modules are idempotent.",
        "testedConcept": "Module"
      },
      {
        "questionId": "s9-g3-t0-QC3",
        "topicId": "s9-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Resolve and inspect the host set before execution, constrain the play and retain a canary gate.",
        "explanation": "Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately.",
        "testedConcept": "Check mode"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t0-Q1",
        "topicId": "s9-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does YAML make a task idempotent?",
        "answer": "No; the module and operation determine behavior.",
        "explanation": "Repeated shell commands may append repeatedly.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g3-t0-Q2",
        "topicId": "s9-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Are failed and unreachable identical?",
        "answer": "No; failure and inability to reach a host have different causes.",
        "explanation": "Both prevent complete acceptance.",
        "testedConcept": "Module"
      },
      {
        "questionId": "s9-g3-t0-Q3",
        "topicId": "s9-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does check mode miss?",
        "answer": "Unsupported behavior and effects requiring actual execution.",
        "explanation": "Read the module support notes.",
        "testedConcept": "Check mode"
      },
      {
        "questionId": "s9-g3-t0-Q4",
        "topicId": "s9-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why pin collections?",
        "answer": "Module behavior and dependencies evolve.",
        "explanation": "Record tested versions with the automation.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g3-t0-Q5",
        "topicId": "s9-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Ansible case.",
        "answer": "The play targets all and changes unrelated devices.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t0-Q6",
        "topicId": "s9-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Ansible incident?",
        "answer": "Resolve and inspect the host set before execution, constrain the play and retain a canary gate.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t0-Q7",
        "topicId": "s9-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Inventory with Module.",
        "answer": "Selected managed hosts. Task implementation.",
        "explanation": "Group scope can widen a change. Not all modules are idempotent.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t0-Q8",
        "topicId": "s9-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Check mode not establish the entire outcome?",
        "answer": "It is not universal execution proof.",
        "explanation": "Run a bounded batch, verify state and record changed, failed and unreachable outcomes separately.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t0-Q9",
        "topicId": "s9-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A network task is intended for a single lab group. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t0-Q10",
        "topicId": "s9-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A network task is intended for a single lab group.",
      "fault": "The play targets all and changes unrelated devices.",
      "restore": "Resolve and inspect the host set before execution, constrain the play and retain a canary gate.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t1",
    "batch": "23",
    "title": "Ansible Inventory",
    "subtitle": "edge-1 is an alias whose ansible_host should identify a disposable device.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t1",
    "definition": "Ansible inventory maps host identities, groups and variables to connection targets; reviewing the resolved inventory prevents accidental scope expansion.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. edge-1 is an alias whose ansible_host should identify a disposable device. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Alias, Group, Variable precedence. Load the approved inventory source. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. May differ from connection address. Membership can overlap. A visible file is not necessarily the final value. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Alias: Inventory host name. May differ from connection address.",
      "Group: Set of hosts. Membership can overlap.",
      "Variable precedence: Resolution of competing values. A visible file is not necessarily the final value."
    ],
    "mechanism": [
      "Load the approved inventory source.",
      "Resolve aliases, groups and effective variables.",
      "Compare the resulting host set with the authorized change scope."
    ],
    "flow": [
      [
        "Operation and scope",
        "edge-1 is an alias whose ansible_host should identify a disposable device."
      ],
      [
        "Alias",
        "Load the approved inventory source."
      ],
      [
        "Group",
        "Resolve aliases, groups and effective variables."
      ],
      [
        "Variable precedence",
        "Compare the resulting host set with the authorized change scope."
      ]
    ],
    "comparison": [
      [
        "Alias",
        "Inventory host name",
        "May differ from connection address"
      ],
      [
        "Group",
        "Set of hosts",
        "Membership can overlap"
      ],
      [
        "Variable precedence",
        "Resolution of competing values",
        "A visible file is not necessarily the final value"
      ]
    ],
    "example": "Worked incident: edge-1 is an alias whose ansible_host should identify a disposable device. Failure: A group variable points the alias at a production address. Recovery: Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts. The key distinction is illustrated by this question: Is inventory_hostname always an IP address? No; it can be an alias. Connection variables supply the actual target. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Load the approved inventory source. Resolve aliases, groups and effective variables. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A group variable points the alias at a production address. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Compare the resulting host set with the authorized change scope. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. May differ from connection address. A visible file is not necessarily the final value. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Resolve aliases, groups and effective variables. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A group variable points the alias at a production address.",
        "Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts."
      ],
      [
        "Can a host belong to multiple groups?",
        "Yes. Overlapping variables need deliberate resolution."
      ],
      [
        "Why inspect effective values?",
        "Precedence can override a nearby declaration. Reading one file is insufficient."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Connection variables supply the actual target.",
      "Overlapping variables need deliberate resolution.",
      "Reading one file is insufficient.",
      "Use a supported secret mechanism and redact inventory evidence.",
      "May differ from connection address.",
      "A visible file is not necessarily the final value."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t0"
    ],
    "related": [
      "s9-g3-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Ansible Inventory failure with an explicit evidence boundary. edge-1 is an alias whose ansible_host should identify a disposable device.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Alias → Inventory host name",
        "Group → Set of hosts",
        "Variable precedence → Resolution of competing values"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. edge-1 is an alias whose ansible_host should identify a disposable device.",
        "Write a prediction before revealing the baseline explanation. Load the approved inventory source.",
        "Select Fault and locate the first broken handoff. A group variable points the alias at a production address.",
        "Propose one observation that could disprove your diagnosis. Can a host belong to multiple groups?",
        "Select Recovery and compare with the required result. Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A group variable points the alias at a production address. No.",
      "challenge": "Should secrets live in an unencrypted inventory? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Alias": "Inventory host name. May differ from connection address.",
      "Group": "Set of hosts. Membership can overlap.",
      "Variable precedence": "Resolution of competing values. A visible file is not necessarily the final value."
    },
    "sources": [
      {
        "title": "Ansible network automation guide",
        "url": "https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t1-QC1",
        "topicId": "s9-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Ansible Inventory.",
        "answer": "Ansible inventory maps host identities, groups and variables to connection targets; reviewing the resolved inventory prevents accidental scope expansion.",
        "explanation": "Load the approved inventory source.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s9-g3-t1-QC2",
        "topicId": "s9-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Resolve aliases, groups and effective variables.",
        "explanation": "Membership can overlap.",
        "testedConcept": "Group"
      },
      {
        "questionId": "s9-g3-t1-QC3",
        "topicId": "s9-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.",
        "explanation": "Compare the resulting host set with the authorized change scope.",
        "testedConcept": "Variable precedence"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t1-Q1",
        "topicId": "s9-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is inventory_hostname always an IP address?",
        "answer": "No; it can be an alias.",
        "explanation": "Connection variables supply the actual target.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s9-g3-t1-Q2",
        "topicId": "s9-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can a host belong to multiple groups?",
        "answer": "Yes.",
        "explanation": "Overlapping variables need deliberate resolution.",
        "testedConcept": "Group"
      },
      {
        "questionId": "s9-g3-t1-Q3",
        "topicId": "s9-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect effective values?",
        "answer": "Precedence can override a nearby declaration.",
        "explanation": "Reading one file is insufficient.",
        "testedConcept": "Variable precedence"
      },
      {
        "questionId": "s9-g3-t1-Q4",
        "topicId": "s9-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should secrets live in an unencrypted inventory?",
        "answer": "No.",
        "explanation": "Use a supported secret mechanism and redact inventory evidence.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s9-g3-t1-Q5",
        "topicId": "s9-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Ansible Inventory case.",
        "answer": "A group variable points the alias at a production address.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t1-Q6",
        "topicId": "s9-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Ansible Inventory incident?",
        "answer": "Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t1-Q7",
        "topicId": "s9-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Alias with Group.",
        "answer": "Inventory host name. Set of hosts.",
        "explanation": "May differ from connection address. Membership can overlap.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t1-Q8",
        "topicId": "s9-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Variable precedence not establish the entire outcome?",
        "answer": "A visible file is not necessarily the final value.",
        "explanation": "Compare the resulting host set with the authorized change scope.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t1-Q9",
        "topicId": "s9-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "edge-1 is an alias whose ansible_host should identify a disposable device. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t1-Q10",
        "topicId": "s9-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "edge-1 is an alias whose ansible_host should identify a disposable device.",
      "fault": "A group variable points the alias at a production address.",
      "restore": "Inspect resolved variables and correct the source; verify that the target list contains only the intended owned hosts.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t2",
    "batch": "23",
    "title": "Ansible Playbooks",
    "subtitle": "A service update should notify a restart only when its configuration changes.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t2",
    "definition": "A playbook orders plays and tasks over selected hosts, with explicit failure handling and notifications; successful syntax is not successful change execution.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A service update should notify a restart only when its configuration changes. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Play, Handler, Serial batch. Validate syntax and the resolved host list. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Host selection is part of the change. Its execution depends on notifications and run behavior. Limits blast radius but not shared dependencies. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Play: Tasks bound to a host set. Host selection is part of the change.",
      "Handler: Notified deferred task. Its execution depends on notifications and run behavior.",
      "Serial batch: Bounded host subset. Limits blast radius but not shared dependencies."
    ],
    "mechanism": [
      "Validate syntax and the resolved host list.",
      "Execute a canary with clear preconditions and postconditions.",
      "Expand only after acceptance and keep rollback separate from cleanup."
    ],
    "flow": [
      [
        "Operation and scope",
        "A service update should notify a restart only when its configuration changes."
      ],
      [
        "Play",
        "Validate syntax and the resolved host list."
      ],
      [
        "Handler",
        "Execute a canary with clear preconditions and postconditions."
      ],
      [
        "Serial batch",
        "Expand only after acceptance and keep rollback separate from cleanup."
      ]
    ],
    "comparison": [
      [
        "Play",
        "Tasks bound to a host set",
        "Host selection is part of the change"
      ],
      [
        "Handler",
        "Notified deferred task",
        "Its execution depends on notifications and run behavior"
      ],
      [
        "Serial batch",
        "Bounded host subset",
        "Limits blast radius but not shared dependencies"
      ]
    ],
    "example": "Worked incident: A service update should notify a restart only when its configuration changes. Failure: A task always reports changed and triggers unnecessary restarts. Recovery: Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart. The key distinction is illustrated by this question: Why distinguish cleanup from rollback? Cleanup removes temporary artifacts; rollback restores prior service state. Both may be needed after failure. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Validate syntax and the resolved host list. Execute a canary with clear preconditions and postconditions. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A task always reports changed and triggers unnecessary restarts. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Expand only after acceptance and keep rollback separate from cleanup. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Host selection is part of the change. Limits blast radius but not shared dependencies. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Execute a canary with clear preconditions and postconditions. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A task always reports changed and triggers unnecessary restarts.",
        "Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart."
      ],
      [
        "What is a handler for?",
        "A task triggered by change notification. It is not proof the service became healthy."
      ],
      [
        "What does serial control?",
        "The number or proportion of hosts processed per batch. A shared database can still affect everyone."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Both may be needed after failure.",
      "It is not proof the service became healthy.",
      "A shared database can still affect everyone.",
      "The first success cannot establish idempotence.",
      "Host selection is part of the change.",
      "Limits blast radius but not shared dependencies."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t1"
    ],
    "related": [
      "s9-g3-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Ansible Playbooks failure with an explicit evidence boundary. A service update should notify a restart only when its configuration changes.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Play → Tasks bound to a host set",
        "Handler → Notified deferred task",
        "Serial batch → Bounded host subset"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A service update should notify a restart only when its configuration changes.",
        "Write a prediction before revealing the baseline explanation. Validate syntax and the resolved host list.",
        "Select Fault and locate the first broken handoff. A task always reports changed and triggers unnecessary restarts.",
        "Propose one observation that could disprove your diagnosis. What is a handler for?",
        "Select Recovery and compare with the required result. Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A task always reports changed and triggers unnecessary restarts. To check repeatability and unintended repeated effects.",
      "challenge": "Why test a second run? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Play": "Tasks bound to a host set. Host selection is part of the change.",
      "Handler": "Notified deferred task. Its execution depends on notifications and run behavior.",
      "Serial batch": "Bounded host subset. Limits blast radius but not shared dependencies."
    },
    "sources": [
      {
        "title": "Ansible network automation guide",
        "url": "https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t2-QC1",
        "topicId": "s9-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Ansible Playbooks.",
        "answer": "A playbook orders plays and tasks over selected hosts, with explicit failure handling and notifications; successful syntax is not successful change execution.",
        "explanation": "Validate syntax and the resolved host list.",
        "testedConcept": "Play"
      },
      {
        "questionId": "s9-g3-t2-QC2",
        "topicId": "s9-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Execute a canary with clear preconditions and postconditions.",
        "explanation": "Its execution depends on notifications and run behavior.",
        "testedConcept": "Handler"
      },
      {
        "questionId": "s9-g3-t2-QC3",
        "topicId": "s9-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.",
        "explanation": "Expand only after acceptance and keep rollback separate from cleanup.",
        "testedConcept": "Serial batch"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t2-Q1",
        "topicId": "s9-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why distinguish cleanup from rollback?",
        "answer": "Cleanup removes temporary artifacts; rollback restores prior service state.",
        "explanation": "Both may be needed after failure.",
        "testedConcept": "Play"
      },
      {
        "questionId": "s9-g3-t2-Q2",
        "topicId": "s9-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is a handler for?",
        "answer": "A task triggered by change notification.",
        "explanation": "It is not proof the service became healthy.",
        "testedConcept": "Handler"
      },
      {
        "questionId": "s9-g3-t2-Q3",
        "topicId": "s9-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does serial control?",
        "answer": "The number or proportion of hosts processed per batch.",
        "explanation": "A shared database can still affect everyone.",
        "testedConcept": "Serial batch"
      },
      {
        "questionId": "s9-g3-t2-Q4",
        "topicId": "s9-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test a second run?",
        "answer": "To check repeatability and unintended repeated effects.",
        "explanation": "The first success cannot establish idempotence.",
        "testedConcept": "Play"
      },
      {
        "questionId": "s9-g3-t2-Q5",
        "topicId": "s9-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Ansible Playbooks case.",
        "answer": "A task always reports changed and triggers unnecessary restarts.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t2-Q6",
        "topicId": "s9-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Ansible Playbooks incident?",
        "answer": "Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t2-Q7",
        "topicId": "s9-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Play with Handler.",
        "answer": "Tasks bound to a host set. Notified deferred task.",
        "explanation": "Host selection is part of the change. Its execution depends on notifications and run behavior.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t2-Q8",
        "topicId": "s9-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Serial batch not establish the entire outcome?",
        "answer": "Limits blast radius but not shared dependencies.",
        "explanation": "Expand only after acceptance and keep rollback separate from cleanup.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t2-Q9",
        "topicId": "s9-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A service update should notify a restart only when its configuration changes. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t2-Q10",
        "topicId": "s9-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A service update should notify a restart only when its configuration changes.",
      "fault": "A task always reports changed and triggers unnecessary restarts.",
      "restore": "Use a module or condition that reflects actual change; test a second run and verify no unnecessary restart.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t3",
    "batch": "23",
    "title": "Cisco Ansible modules",
    "subtitle": "An interface task intends to merge a description on one port.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t3",
    "definition": "Cisco Ansible modules live in platform collections with defined resource states and connection requirements; module choice must match the device family and supported release.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An interface task intends to merge a description on one port. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Collection, Resource state, Connection plugin. Identify the collection, module documentation and platform support. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. IOS and NX-OS are distinct families. Overridden or replaced can remove existing entries. Device prerequisites remain necessary. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Collection: Versioned module distribution. IOS and NX-OS are distinct families.",
      "Resource state: Declared operation mode. Overridden or replaced can remove existing entries.",
      "Connection plugin: Transport integration. Device prerequisites remain necessary."
    ],
    "mechanism": [
      "Identify the collection, module documentation and platform support.",
      "Inspect the desired resource data and predicted diff where supported.",
      "Run against one owned device and verify resource state and unrelated settings."
    ],
    "flow": [
      [
        "Operation and scope",
        "An interface task intends to merge a description on one port."
      ],
      [
        "Collection",
        "Identify the collection, module documentation and platform support."
      ],
      [
        "Resource state",
        "Inspect the desired resource data and predicted diff where supported."
      ],
      [
        "Connection plugin",
        "Run against one owned device and verify resource state and unrelated settings."
      ]
    ],
    "comparison": [
      [
        "Collection",
        "Versioned module distribution",
        "IOS and NX-OS are distinct families"
      ],
      [
        "Resource state",
        "Declared operation mode",
        "Overridden or replaced can remove existing entries"
      ],
      [
        "Connection plugin",
        "Transport integration",
        "Device prerequisites remain necessary"
      ]
    ],
    "example": "Worked incident: An interface task intends to merge a description on one port. Failure: A broad replacement removes other interface settings. Recovery: Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope. The key distinction is illustrated by this question: Can cisco.ios and cisco.nxos be exchanged? No. They represent different platform contracts. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Identify the collection, module documentation and platform support. Inspect the desired resource data and predicted diff where supported. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A broad replacement removes other interface settings. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Run against one owned device and verify resource state and unrelated settings. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. IOS and NX-OS are distinct families. Device prerequisites remain necessary. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Inspect the desired resource data and predicted diff where supported. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A broad replacement removes other interface settings.",
        "Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope."
      ],
      [
        "Why inspect state semantics?",
        "Some states remove unspecified configuration. A name such as replaced needs its documented scope."
      ],
      [
        "Is gathered state a deployment?",
        "No; it collects structured data. Keep observation separate from mutation."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "They represent different platform contracts.",
      "A name such as replaced needs its documented scope.",
      "Keep observation separate from mutation.",
      "Replaying a generic default is not restoration.",
      "IOS and NX-OS are distinct families.",
      "Device prerequisites remain necessary."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t2"
    ],
    "related": [
      "s9-g3-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Cisco Ansible modules failure with an explicit evidence boundary. An interface task intends to merge a description on one port.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Collection → Versioned module distribution",
        "Resource state → Declared operation mode",
        "Connection plugin → Transport integration"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An interface task intends to merge a description on one port.",
        "Write a prediction before revealing the baseline explanation. Identify the collection, module documentation and platform support.",
        "Select Fault and locate the first broken handoff. A broad replacement removes other interface settings.",
        "Propose one observation that could disprove your diagnosis. Why inspect state semantics?",
        "Select Recovery and compare with the required result. Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A broad replacement removes other interface settings. The exact affected settings and their baseline values.",
      "challenge": "What must a rollback include? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Collection": "Versioned module distribution. IOS and NX-OS are distinct families.",
      "Resource state": "Declared operation mode. Overridden or replaced can remove existing entries.",
      "Connection plugin": "Transport integration. Device prerequisites remain necessary."
    },
    "sources": [
      {
        "title": "cisco.ios interfaces resource module; reviewed collection 11.5.1 page",
        "url": "https://docs.ansible.com/projects/ansible/latest/collections/cisco/ios/ios_interfaces_module.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Ansible network automation guide",
        "url": "https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t3-QC1",
        "topicId": "s9-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Cisco Ansible modules.",
        "answer": "Cisco Ansible modules live in platform collections with defined resource states and connection requirements; module choice must match the device family and supported release.",
        "explanation": "Identify the collection, module documentation and platform support.",
        "testedConcept": "Collection"
      },
      {
        "questionId": "s9-g3-t3-QC2",
        "topicId": "s9-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Inspect the desired resource data and predicted diff where supported.",
        "explanation": "Overridden or replaced can remove existing entries.",
        "testedConcept": "Resource state"
      },
      {
        "questionId": "s9-g3-t3-QC3",
        "topicId": "s9-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.",
        "explanation": "Run against one owned device and verify resource state and unrelated settings.",
        "testedConcept": "Connection plugin"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t3-Q1",
        "topicId": "s9-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can cisco.ios and cisco.nxos be exchanged?",
        "answer": "No.",
        "explanation": "They represent different platform contracts.",
        "testedConcept": "Collection"
      },
      {
        "questionId": "s9-g3-t3-Q2",
        "topicId": "s9-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inspect state semantics?",
        "answer": "Some states remove unspecified configuration.",
        "explanation": "A name such as replaced needs its documented scope.",
        "testedConcept": "Resource state"
      },
      {
        "questionId": "s9-g3-t3-Q3",
        "topicId": "s9-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is gathered state a deployment?",
        "answer": "No; it collects structured data.",
        "explanation": "Keep observation separate from mutation.",
        "testedConcept": "Connection plugin"
      },
      {
        "questionId": "s9-g3-t3-Q4",
        "topicId": "s9-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must a rollback include?",
        "answer": "The exact affected settings and their baseline values.",
        "explanation": "Replaying a generic default is not restoration.",
        "testedConcept": "Collection"
      },
      {
        "questionId": "s9-g3-t3-Q5",
        "topicId": "s9-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Cisco Ansible modules case.",
        "answer": "A broad replacement removes other interface settings.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t3-Q6",
        "topicId": "s9-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Cisco Ansible modules incident?",
        "answer": "Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t3-Q7",
        "topicId": "s9-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Collection with Resource state.",
        "answer": "Versioned module distribution. Declared operation mode.",
        "explanation": "IOS and NX-OS are distinct families. Overridden or replaced can remove existing entries.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t3-Q8",
        "topicId": "s9-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Connection plugin not establish the entire outcome?",
        "answer": "Device prerequisites remain necessary.",
        "explanation": "Run against one owned device and verify resource state and unrelated settings.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t3-Q9",
        "topicId": "s9-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An interface task intends to merge a description on one port. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t3-Q10",
        "topicId": "s9-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "An interface task intends to merge a description on one port.",
      "fault": "A broad replacement removes other interface settings.",
      "restore": "Choose the documented merge behavior and explicit target interface; reject diffs outside the intended scope.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t4",
    "batch": "23",
    "title": "Templates",
    "subtitle": "A VLAN template needs an integer ID and a description.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t4",
    "definition": "Templates turn validated variables into text artifacts; deterministic rendering and explicit missing-variable behavior are prerequisites for reviewable configuration.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A VLAN template needs an integer ID and a description. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Template, Input contract, Rendered artifact. Validate required variables and allowed values. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. It does not validate device syntax. Missing data should stop rendering. Review this output rather than only the template. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Template: Text with substitution logic. It does not validate device syntax.",
      "Input contract: Required typed variables. Missing data should stop rendering.",
      "Rendered artifact: Concrete output for review. Review this output rather than only the template."
    ],
    "mechanism": [
      "Validate required variables and allowed values.",
      "Render deterministically without contacting a target.",
      "Lint the result and compare a narrow diff before applying."
    ],
    "flow": [
      [
        "Operation and scope",
        "A VLAN template needs an integer ID and a description."
      ],
      [
        "Template",
        "Validate required variables and allowed values."
      ],
      [
        "Input contract",
        "Render deterministically without contacting a target."
      ],
      [
        "Rendered artifact",
        "Lint the result and compare a narrow diff before applying."
      ]
    ],
    "comparison": [
      [
        "Template",
        "Text with substitution logic",
        "It does not validate device syntax"
      ],
      [
        "Input contract",
        "Required typed variables",
        "Missing data should stop rendering"
      ],
      [
        "Rendered artifact",
        "Concrete output for review",
        "Review this output rather than only the template"
      ]
    ],
    "example": "Worked incident: A VLAN template needs an integer ID and a description. Failure: A missing value renders an incomplete command that is still sent. Recovery: Fail rendering on missing input and require inspection of the complete artifact before deployment. The key distinction is illustrated by this question: Does successful rendering prove valid configuration? No. A template engine does not implement the target parser. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Validate required variables and allowed values. Render deterministically without contacting a target. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A missing value renders an incomplete command that is still sent. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Fail rendering on missing input and require inspection of the complete artifact before deployment.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Lint the result and compare a narrow diff before applying. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. It does not validate device syntax. Review this output rather than only the template. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Render deterministically without contacting a target. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A missing value renders an incomplete command that is still sent.",
        "Fail rendering on missing input and require inspection of the complete artifact before deployment."
      ],
      [
        "Why separate render and apply?",
        "To review the exact proposed bytes. Templates alone conceal resolved values."
      ],
      [
        "How prevent injected newlines in a description?",
        "Validate the allowed input characters and length. Escaping depends on the target language."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A template engine does not implement the target parser.",
      "Templates alone conceal resolved values.",
      "Escaping depends on the target language.",
      "Stable review reduces accidental approval.",
      "It does not validate device syntax.",
      "Review this output rather than only the template."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t3"
    ],
    "related": [
      "s9-g3-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Templates failure with an explicit evidence boundary. A VLAN template needs an integer ID and a description.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Template → Text with substitution logic",
        "Input contract → Required typed variables",
        "Rendered artifact → Concrete output for review"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A VLAN template needs an integer ID and a description.",
        "Write a prediction before revealing the baseline explanation. Validate required variables and allowed values.",
        "Select Fault and locate the first broken handoff. A missing value renders an incomplete command that is still sent.",
        "Propose one observation that could disprove your diagnosis. Why separate render and apply?",
        "Select Recovery and compare with the required result. Fail rendering on missing input and require inspection of the complete artifact before deployment.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Fail rendering on missing input and require inspection of the complete artifact before deployment. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A missing value renders an incomplete command that is still sent. Unrelated ordering changes obscure meaningful diffs.",
      "challenge": "Why deterministic output? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Template": "Text with substitution logic. It does not validate device syntax.",
      "Input contract": "Required typed variables. Missing data should stop rendering.",
      "Rendered artifact": "Concrete output for review. Review this output rather than only the template."
    },
    "sources": [
      {
        "title": "Jinja 3.1 API and StrictUndefined",
        "url": "https://jinja.palletsprojects.com/en/stable/api/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t4-QC1",
        "topicId": "s9-g3-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Templates.",
        "answer": "Templates turn validated variables into text artifacts; deterministic rendering and explicit missing-variable behavior are prerequisites for reviewable configuration.",
        "explanation": "Validate required variables and allowed values.",
        "testedConcept": "Template"
      },
      {
        "questionId": "s9-g3-t4-QC2",
        "topicId": "s9-g3-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Render deterministically without contacting a target.",
        "explanation": "Missing data should stop rendering.",
        "testedConcept": "Input contract"
      },
      {
        "questionId": "s9-g3-t4-QC3",
        "topicId": "s9-g3-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Fail rendering on missing input and require inspection of the complete artifact before deployment.",
        "explanation": "Lint the result and compare a narrow diff before applying.",
        "testedConcept": "Rendered artifact"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t4-Q1",
        "topicId": "s9-g3-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful rendering prove valid configuration?",
        "answer": "No.",
        "explanation": "A template engine does not implement the target parser.",
        "testedConcept": "Template"
      },
      {
        "questionId": "s9-g3-t4-Q2",
        "topicId": "s9-g3-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why separate render and apply?",
        "answer": "To review the exact proposed bytes.",
        "explanation": "Templates alone conceal resolved values.",
        "testedConcept": "Input contract"
      },
      {
        "questionId": "s9-g3-t4-Q3",
        "topicId": "s9-g3-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How prevent injected newlines in a description?",
        "answer": "Validate the allowed input characters and length.",
        "explanation": "Escaping depends on the target language.",
        "testedConcept": "Rendered artifact"
      },
      {
        "questionId": "s9-g3-t4-Q4",
        "topicId": "s9-g3-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why deterministic output?",
        "answer": "Unrelated ordering changes obscure meaningful diffs.",
        "explanation": "Stable review reduces accidental approval.",
        "testedConcept": "Template"
      },
      {
        "questionId": "s9-g3-t4-Q5",
        "topicId": "s9-g3-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Templates case.",
        "answer": "A missing value renders an incomplete command that is still sent.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t4-Q6",
        "topicId": "s9-g3-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Templates incident?",
        "answer": "Fail rendering on missing input and require inspection of the complete artifact before deployment.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t4-Q7",
        "topicId": "s9-g3-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Template with Input contract.",
        "answer": "Text with substitution logic. Required typed variables.",
        "explanation": "It does not validate device syntax. Missing data should stop rendering.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t4-Q8",
        "topicId": "s9-g3-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Rendered artifact not establish the entire outcome?",
        "answer": "Review this output rather than only the template.",
        "explanation": "Lint the result and compare a narrow diff before applying.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t4-Q9",
        "topicId": "s9-g3-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A VLAN template needs an integer ID and a description. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t4-Q10",
        "topicId": "s9-g3-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A VLAN template needs an integer ID and a description.",
      "fault": "A missing value renders an incomplete command that is still sent.",
      "restore": "Fail rendering on missing input and require inspection of the complete artifact before deployment.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g3-t5",
    "batch": "23",
    "title": "Jinja2",
    "subtitle": "A template expects interface.description in every input record.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g3-t5",
    "definition": "Jinja evaluates templates with variables, filters and control structures; strict undefined handling and a controlled environment prevent missing data from disappearing silently.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A template expects interface.description in every input record. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Environment, Filter, StrictUndefined. Create a controlled rendering environment. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Set explicit undefined behavior. It is not automatic domain validation. Defaults can still hide missing intent. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Environment: Rendering configuration. Set explicit undefined behavior.",
      "Filter: Value transformation. It is not automatic domain validation.",
      "StrictUndefined: Error on missing variable use. Defaults can still hide missing intent."
    ],
    "mechanism": [
      "Create a controlled rendering environment.",
      "Provide validated data and reject missing required fields.",
      "Inspect the rendered text and test representative edge cases."
    ],
    "flow": [
      [
        "Operation and scope",
        "A template expects interface.description in every input record."
      ],
      [
        "Environment",
        "Create a controlled rendering environment."
      ],
      [
        "Filter",
        "Provide validated data and reject missing required fields."
      ],
      [
        "StrictUndefined",
        "Inspect the rendered text and test representative edge cases."
      ]
    ],
    "comparison": [
      [
        "Environment",
        "Rendering configuration",
        "Set explicit undefined behavior"
      ],
      [
        "Filter",
        "Value transformation",
        "It is not automatic domain validation"
      ],
      [
        "StrictUndefined",
        "Error on missing variable use",
        "Defaults can still hide missing intent"
      ]
    ],
    "example": "Worked incident: A template expects interface.description in every input record. Failure: An absent description becomes empty output under permissive undefined handling. Recovery: Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values. The key distinction is illustrated by this question: What does StrictUndefined change? Use of an undefined variable raises an error. The error belongs before deployment. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g3-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Create a controlled rendering environment. Provide validated data and reject missing required fields. Preserve a baseline and review the smallest concrete diff. In this case the failure is: An absent description becomes empty output under permissive undefined handling. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Inspect the rendered text and test representative edge cases. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Set explicit undefined behavior. Defaults can still hide missing intent. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Provide validated data and reject missing required fields. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "An absent description becomes empty output under permissive undefined handling.",
        "Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values."
      ],
      [
        "Is HTML autoescape suitable for network CLI?",
        "Not as a general CLI quoting rule. Validate according to the target grammar."
      ],
      [
        "Should templates receive secrets unnecessarily?",
        "No. Rendered artifacts are often retained for review."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "The error belongs before deployment.",
      "Validate according to the target grammar.",
      "Rendered artifacts are often retained for review.",
      "Empty intent needs an explicit meaning.",
      "Set explicit undefined behavior.",
      "Defaults can still hide missing intent."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t4"
    ],
    "related": [
      "s9-g4-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Jinja2 failure with an explicit evidence boundary. A template expects interface.description in every input record.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Environment → Rendering configuration",
        "Filter → Value transformation",
        "StrictUndefined → Error on missing variable use"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A template expects interface.description in every input record.",
        "Write a prediction before revealing the baseline explanation. Create a controlled rendering environment.",
        "Select Fault and locate the first broken handoff. An absent description becomes empty output under permissive undefined handling.",
        "Propose one observation that could disprove your diagnosis. Is HTML autoescape suitable for network CLI?",
        "Select Recovery and compare with the required result. Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "An absent description becomes empty output under permissive undefined handling. An empty collection can remove all generated configuration.",
      "challenge": "Why test loops with empty input? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Environment": "Rendering configuration. Set explicit undefined behavior.",
      "Filter": "Value transformation. It is not automatic domain validation.",
      "StrictUndefined": "Error on missing variable use. Defaults can still hide missing intent."
    },
    "sources": [
      {
        "title": "Jinja 3.1 API and StrictUndefined",
        "url": "https://jinja.palletsprojects.com/en/stable/api/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g3-t5-QC1",
        "topicId": "s9-g3-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Jinja2.",
        "answer": "Jinja evaluates templates with variables, filters and control structures; strict undefined handling and a controlled environment prevent missing data from disappearing silently.",
        "explanation": "Create a controlled rendering environment.",
        "testedConcept": "Environment"
      },
      {
        "questionId": "s9-g3-t5-QC2",
        "topicId": "s9-g3-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Provide validated data and reject missing required fields.",
        "explanation": "It is not automatic domain validation.",
        "testedConcept": "Filter"
      },
      {
        "questionId": "s9-g3-t5-QC3",
        "topicId": "s9-g3-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.",
        "explanation": "Inspect the rendered text and test representative edge cases.",
        "testedConcept": "StrictUndefined"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g3-t5-Q1",
        "topicId": "s9-g3-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does StrictUndefined change?",
        "answer": "Use of an undefined variable raises an error.",
        "explanation": "The error belongs before deployment.",
        "testedConcept": "Environment"
      },
      {
        "questionId": "s9-g3-t5-Q2",
        "topicId": "s9-g3-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is HTML autoescape suitable for network CLI?",
        "answer": "Not as a general CLI quoting rule.",
        "explanation": "Validate according to the target grammar.",
        "testedConcept": "Filter"
      },
      {
        "questionId": "s9-g3-t5-Q3",
        "topicId": "s9-g3-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should templates receive secrets unnecessarily?",
        "answer": "No.",
        "explanation": "Rendered artifacts are often retained for review.",
        "testedConcept": "StrictUndefined"
      },
      {
        "questionId": "s9-g3-t5-Q4",
        "topicId": "s9-g3-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test loops with empty input?",
        "answer": "An empty collection can remove all generated configuration.",
        "explanation": "Empty intent needs an explicit meaning.",
        "testedConcept": "Environment"
      },
      {
        "questionId": "s9-g3-t5-Q5",
        "topicId": "s9-g3-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Jinja2 case.",
        "answer": "An absent description becomes empty output under permissive undefined handling.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g3-t5-Q6",
        "topicId": "s9-g3-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Jinja2 incident?",
        "answer": "Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g3-t5-Q7",
        "topicId": "s9-g3-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Environment with Filter.",
        "answer": "Rendering configuration. Value transformation.",
        "explanation": "Set explicit undefined behavior. It is not automatic domain validation.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g3-t5-Q8",
        "topicId": "s9-g3-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does StrictUndefined not establish the entire outcome?",
        "answer": "Defaults can still hide missing intent.",
        "explanation": "Inspect the rendered text and test representative edge cases.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g3-t5-Q9",
        "topicId": "s9-g3-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A template expects interface.description in every input record. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g3-t5-Q10",
        "topicId": "s9-g3-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A template expects interface.description in every input record.",
      "fault": "An absent description becomes empty output under permissive undefined handling.",
      "restore": "Use StrictUndefined and make optional fields explicit; test both missing required and intentional empty values.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g4-t0",
    "batch": "23",
    "title": "Git",
    "subtitle": "An operator fixes a template but forgets to stage it.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g4-t0",
    "definition": "Git records content snapshots and relationships between commits; the working tree, staging area and committed history are distinct states.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An operator fixes a template but forgets to stage it. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Working tree, Index, Commit. Inspect working changes and preserve unrelated edits. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Uncommitted changes are not in a commit. A commit uses staged content. A commit does not deploy infrastructure. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Working tree: Editable files. Uncommitted changes are not in a commit.",
      "Index: Staged snapshot. A commit uses staged content.",
      "Commit: Recorded snapshot and parents. A commit does not deploy infrastructure."
    ],
    "mechanism": [
      "Inspect working changes and preserve unrelated edits.",
      "Stage only the intended files and review the staged diff.",
      "Create a traceable commit, test that revision and retain the deployment evidence separately."
    ],
    "flow": [
      [
        "Operation and scope",
        "An operator fixes a template but forgets to stage it."
      ],
      [
        "Working tree",
        "Inspect working changes and preserve unrelated edits."
      ],
      [
        "Index",
        "Stage only the intended files and review the staged diff."
      ],
      [
        "Commit",
        "Create a traceable commit, test that revision and retain the deployment evidence separately."
      ]
    ],
    "comparison": [
      [
        "Working tree",
        "Editable files",
        "Uncommitted changes are not in a commit"
      ],
      [
        "Index",
        "Staged snapshot",
        "A commit uses staged content"
      ],
      [
        "Commit",
        "Recorded snapshot and parents",
        "A commit does not deploy infrastructure"
      ]
    ],
    "example": "Worked incident: An operator fixes a template but forgets to stage it. Failure: The tested working file differs from the committed version used by CI. Recovery: Review staged and unstaged diffs; test the exact committed artifact that will be deployed. The key distinction is illustrated by this question: Does git commit include every edited file? No; normally it records the index. Review staged content. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g4-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Inspect working changes and preserve unrelated edits. Stage only the intended files and review the staged diff. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The tested working file differs from the committed version used by CI. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Review staged and unstaged diffs; test the exact committed artifact that will be deployed.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Create a traceable commit, test that revision and retain the deployment evidence separately. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Uncommitted changes are not in a commit. A commit does not deploy infrastructure. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Stage only the intended files and review the staged diff. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The tested working file differs from the committed version used by CI.",
        "Review staged and unstaged diffs; test the exact committed artifact that will be deployed."
      ],
      [
        "How differs revert from reset?",
        "Revert records an inverse change; reset moves local references and can alter index or files. Choose based on history and preservation needs."
      ],
      [
        "Why avoid secrets even in deleted commits?",
        "History may retain them. Rotate exposed secrets rather than trusting deletion."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Review staged content.",
      "Choose based on history and preservation needs.",
      "Rotate exposed secrets rather than trusting deletion.",
      "It only describes synchronization with the index and commit.",
      "Uncommitted changes are not in a commit.",
      "A commit does not deploy infrastructure."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g3-t5"
    ],
    "related": [
      "s9-g4-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Git failure with an explicit evidence boundary. An operator fixes a template but forgets to stage it.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Working tree → Editable files",
        "Index → Staged snapshot",
        "Commit → Recorded snapshot and parents"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An operator fixes a template but forgets to stage it.",
        "Write a prediction before revealing the baseline explanation. Inspect working changes and preserve unrelated edits.",
        "Select Fault and locate the first broken handoff. The tested working file differs from the committed version used by CI.",
        "Propose one observation that could disprove your diagnosis. How differs revert from reset?",
        "Select Recovery and compare with the required result. Review staged and unstaged diffs; test the exact committed artifact that will be deployed.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Review staged and unstaged diffs; test the exact committed artifact that will be deployed. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The tested working file differs from the committed version used by CI. No.",
      "challenge": "Does a clean working tree prove correct code? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Working tree": "Editable files. Uncommitted changes are not in a commit.",
      "Index": "Staged snapshot. A commit uses staged content.",
      "Commit": "Recorded snapshot and parents. A commit does not deploy infrastructure."
    },
    "sources": [
      {
        "title": "Pro Git 2nd edition",
        "url": "https://git-scm.com/book/en/v2",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g4-t0-QC1",
        "topicId": "s9-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Git.",
        "answer": "Git records content snapshots and relationships between commits; the working tree, staging area and committed history are distinct states.",
        "explanation": "Inspect working changes and preserve unrelated edits.",
        "testedConcept": "Working tree"
      },
      {
        "questionId": "s9-g4-t0-QC2",
        "topicId": "s9-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Stage only the intended files and review the staged diff.",
        "explanation": "A commit uses staged content.",
        "testedConcept": "Index"
      },
      {
        "questionId": "s9-g4-t0-QC3",
        "topicId": "s9-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Review staged and unstaged diffs; test the exact committed artifact that will be deployed.",
        "explanation": "Create a traceable commit, test that revision and retain the deployment evidence separately.",
        "testedConcept": "Commit"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g4-t0-Q1",
        "topicId": "s9-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does git commit include every edited file?",
        "answer": "No; normally it records the index.",
        "explanation": "Review staged content.",
        "testedConcept": "Working tree"
      },
      {
        "questionId": "s9-g4-t0-Q2",
        "topicId": "s9-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs revert from reset?",
        "answer": "Revert records an inverse change; reset moves local references and can alter index or files.",
        "explanation": "Choose based on history and preservation needs.",
        "testedConcept": "Index"
      },
      {
        "questionId": "s9-g4-t0-Q3",
        "topicId": "s9-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid secrets even in deleted commits?",
        "answer": "History may retain them.",
        "explanation": "Rotate exposed secrets rather than trusting deletion.",
        "testedConcept": "Commit"
      },
      {
        "questionId": "s9-g4-t0-Q4",
        "topicId": "s9-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a clean working tree prove correct code?",
        "answer": "No.",
        "explanation": "It only describes synchronization with the index and commit.",
        "testedConcept": "Working tree"
      },
      {
        "questionId": "s9-g4-t0-Q5",
        "topicId": "s9-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Git case.",
        "answer": "The tested working file differs from the committed version used by CI.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g4-t0-Q6",
        "topicId": "s9-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Git incident?",
        "answer": "Review staged and unstaged diffs; test the exact committed artifact that will be deployed.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g4-t0-Q7",
        "topicId": "s9-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Working tree with Index.",
        "answer": "Editable files. Staged snapshot.",
        "explanation": "Uncommitted changes are not in a commit. A commit uses staged content.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g4-t0-Q8",
        "topicId": "s9-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Commit not establish the entire outcome?",
        "answer": "A commit does not deploy infrastructure.",
        "explanation": "Create a traceable commit, test that revision and retain the deployment evidence separately.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g4-t0-Q9",
        "topicId": "s9-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An operator fixes a template but forgets to stage it. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g4-t0-Q10",
        "topicId": "s9-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "An operator fixes a template but forgets to stage it.",
      "fault": "The tested working file differs from the committed version used by CI.",
      "restore": "Review staged and unstaged diffs; test the exact committed artifact that will be deployed.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g4-t1",
    "batch": "23",
    "title": "GitHub / GitLab",
    "subtitle": "A reviewed branch receives a new commit after approval.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g4-t1",
    "definition": "GitHub and GitLab add collaboration and pipeline controls around Git repositories; branch reviews, runner trust and deployment permissions are separate controls.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A reviewed branch receives a new commit after approval. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Review request, Runner, Protected environment. Submit a bounded diff with validation evidence. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Approval must apply to the tested revision. Untrusted changes can execute code. Repository write access need not imply deployment access. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Review request: Proposed revision for collaboration. Approval must apply to the tested revision.",
      "Runner: Environment executing pipeline code. Untrusted changes can execute code.",
      "Protected environment: Deployment policy boundary. Repository write access need not imply deployment access."
    ],
    "mechanism": [
      "Submit a bounded diff with validation evidence.",
      "Run untrusted contributions without privileged deployment credentials.",
      "Approve the tested revision and promote the same artifact under environment controls."
    ],
    "flow": [
      [
        "Operation and scope",
        "A reviewed branch receives a new commit after approval."
      ],
      [
        "Review request",
        "Submit a bounded diff with validation evidence."
      ],
      [
        "Runner",
        "Run untrusted contributions without privileged deployment credentials."
      ],
      [
        "Protected environment",
        "Approve the tested revision and promote the same artifact under environment controls."
      ]
    ],
    "comparison": [
      [
        "Review request",
        "Proposed revision for collaboration",
        "Approval must apply to the tested revision"
      ],
      [
        "Runner",
        "Environment executing pipeline code",
        "Untrusted changes can execute code"
      ],
      [
        "Protected environment",
        "Deployment policy boundary",
        "Repository write access need not imply deployment access"
      ]
    ],
    "example": "Worked incident: A reviewed branch receives a new commit after approval. Failure: A deployment uses an untested artifact built from the changed head. Recovery: Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest. The key distinction is illustrated by this question: Does a green pipeline prove runner trust? No. The runner and credential boundaries need separate controls. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g4-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Submit a bounded diff with validation evidence. Run untrusted contributions without privileged deployment credentials. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A deployment uses an untested artifact built from the changed head. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Approve the tested revision and promote the same artifact under environment controls. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Approval must apply to the tested revision. Repository write access need not imply deployment access. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Run untrusted contributions without privileged deployment credentials. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A deployment uses an untested artifact built from the changed head.",
        "Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest."
      ],
      [
        "Why bind evidence to a revision?",
        "Branches can move. A status from an older commit may not cover the deployment."
      ],
      [
        "Should fork code receive deployment secrets?",
        "No. Review code before crossing the privileged boundary."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "The runner and credential boundaries need separate controls.",
      "A status from an older commit may not cover the deployment.",
      "Review code before crossing the privileged boundary.",
      "The same person or permission need not control both.",
      "Approval must apply to the tested revision.",
      "Repository write access need not imply deployment access."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g4-t0"
    ],
    "related": [
      "s9-g4-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated GitHub / GitLab failure with an explicit evidence boundary. A reviewed branch receives a new commit after approval.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Review request → Proposed revision for collaboration",
        "Runner → Environment executing pipeline code",
        "Protected environment → Deployment policy boundary"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A reviewed branch receives a new commit after approval.",
        "Write a prediction before revealing the baseline explanation. Submit a bounded diff with validation evidence.",
        "Select Fault and locate the first broken handoff. A deployment uses an untested artifact built from the changed head.",
        "Propose one observation that could disprove your diagnosis. Why bind evidence to a revision?",
        "Select Recovery and compare with the required result. Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A deployment uses an untested artifact built from the changed head. One governs code collaboration; the other governs deployment.",
      "challenge": "What differs between repository and environment approval? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Review request": "Proposed revision for collaboration. Approval must apply to the tested revision.",
      "Runner": "Environment executing pipeline code. Untrusted changes can execute code.",
      "Protected environment": "Deployment policy boundary. Repository write access need not imply deployment access."
    },
    "sources": [
      {
        "title": "GitHub Actions secure use",
        "url": "https://docs.github.com/en/actions/reference/security/secure-use",
        "checked": "2026-10-09"
      },
      {
        "title": "GitLab protected environments",
        "url": "https://docs.gitlab.com/ci/environments/protected_environments/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g4-t1-QC1",
        "topicId": "s9-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of GitHub / GitLab.",
        "answer": "GitHub and GitLab add collaboration and pipeline controls around Git repositories; branch reviews, runner trust and deployment permissions are separate controls.",
        "explanation": "Submit a bounded diff with validation evidence.",
        "testedConcept": "Review request"
      },
      {
        "questionId": "s9-g4-t1-QC2",
        "topicId": "s9-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Run untrusted contributions without privileged deployment credentials.",
        "explanation": "Untrusted changes can execute code.",
        "testedConcept": "Runner"
      },
      {
        "questionId": "s9-g4-t1-QC3",
        "topicId": "s9-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.",
        "explanation": "Approve the tested revision and promote the same artifact under environment controls.",
        "testedConcept": "Protected environment"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g4-t1-Q1",
        "topicId": "s9-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a green pipeline prove runner trust?",
        "answer": "No.",
        "explanation": "The runner and credential boundaries need separate controls.",
        "testedConcept": "Review request"
      },
      {
        "questionId": "s9-g4-t1-Q2",
        "topicId": "s9-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why bind evidence to a revision?",
        "answer": "Branches can move.",
        "explanation": "A status from an older commit may not cover the deployment.",
        "testedConcept": "Runner"
      },
      {
        "questionId": "s9-g4-t1-Q3",
        "topicId": "s9-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should fork code receive deployment secrets?",
        "answer": "No.",
        "explanation": "Review code before crossing the privileged boundary.",
        "testedConcept": "Protected environment"
      },
      {
        "questionId": "s9-g4-t1-Q4",
        "topicId": "s9-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What differs between repository and environment approval?",
        "answer": "One governs code collaboration; the other governs deployment.",
        "explanation": "The same person or permission need not control both.",
        "testedConcept": "Review request"
      },
      {
        "questionId": "s9-g4-t1-Q5",
        "topicId": "s9-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this GitHub / GitLab case.",
        "answer": "A deployment uses an untested artifact built from the changed head.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g4-t1-Q6",
        "topicId": "s9-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the GitHub / GitLab incident?",
        "answer": "Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g4-t1-Q7",
        "topicId": "s9-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Review request with Runner.",
        "answer": "Proposed revision for collaboration. Environment executing pipeline code.",
        "explanation": "Approval must apply to the tested revision. Untrusted changes can execute code.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g4-t1-Q8",
        "topicId": "s9-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Protected environment not establish the entire outcome?",
        "answer": "Repository write access need not imply deployment access.",
        "explanation": "Approve the tested revision and promote the same artifact under environment controls.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g4-t1-Q9",
        "topicId": "s9-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A reviewed branch receives a new commit after approval. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g4-t1-Q10",
        "topicId": "s9-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A reviewed branch receives a new commit after approval.",
      "fault": "A deployment uses an untested artifact built from the changed head.",
      "restore": "Revalidate the new revision, refresh required review and bind promotion to the tested artifact digest.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g4-t2",
    "batch": "23",
    "title": "Version control",
    "subtitle": "A restored configuration is said to be last week’s version.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g4-t2",
    "definition": "Version control preserves the history and review context of infrastructure intent, templates and tests; state external to the repository still needs reconciliation.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A restored configuration is said to be last week’s version. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Revision, Diff, Provenance. Record intent and its rationale in a bounded revision. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A branch name is movable. Large unrelated changes weaken review. Timestamps alone do not identify content. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Revision: Identified content state. A branch name is movable.",
      "Diff: Change between states. Large unrelated changes weaken review.",
      "Provenance: Link from intent to artifact and run. Timestamps alone do not identify content."
    ],
    "mechanism": [
      "Record intent and its rationale in a bounded revision.",
      "Build reproducible artifacts from that revision.",
      "Attach observed deployment and rollback evidence to the same content identity."
    ],
    "flow": [
      [
        "Operation and scope",
        "A restored configuration is said to be last week’s version."
      ],
      [
        "Revision",
        "Record intent and its rationale in a bounded revision."
      ],
      [
        "Diff",
        "Build reproducible artifacts from that revision."
      ],
      [
        "Provenance",
        "Attach observed deployment and rollback evidence to the same content identity."
      ]
    ],
    "comparison": [
      [
        "Revision",
        "Identified content state",
        "A branch name is movable"
      ],
      [
        "Diff",
        "Change between states",
        "Large unrelated changes weaken review"
      ],
      [
        "Provenance",
        "Link from intent to artifact and run",
        "Timestamps alone do not identify content"
      ]
    ],
    "example": "Worked incident: A restored configuration is said to be last week’s version. Failure: No commit or artifact digest identifies which bytes were restored. Recovery: Record the exact revision and rendered digest; compare post-state with that captured baseline. The key distinction is illustrated by this question: Why is a commit hash useful? It identifies a specific recorded content state. A branch label can later point elsewhere. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g4-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Record intent and its rationale in a bounded revision. Build reproducible artifacts from that revision. Preserve a baseline and review the smallest concrete diff. In this case the failure is: No commit or artifact digest identifies which bytes were restored. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Record the exact revision and rendered digest; compare post-state with that captured baseline.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Attach observed deployment and rollback evidence to the same content identity. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A branch name is movable. Timestamps alone do not identify content. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Build reproducible artifacts from that revision. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "No commit or artifact digest identifies which bytes were restored.",
        "Record the exact revision and rendered digest; compare post-state with that captured baseline."
      ],
      [
        "Does Git track live device drift automatically?",
        "No. A collection and comparison process is needed."
      ],
      [
        "What belongs in a change record?",
        "Intent, scope, revision, validation, executor and observed result. A ticket number alone lacks technical evidence."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A branch label can later point elsewhere.",
      "A collection and comparison process is needed.",
      "A ticket number alone lacks technical evidence.",
      "State migrations or external side effects may require compensating actions.",
      "A branch name is movable.",
      "Timestamps alone do not identify content."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g4-t1"
    ],
    "related": [
      "s9-g4-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Version control failure with an explicit evidence boundary. A restored configuration is said to be last week’s version.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Revision → Identified content state",
        "Diff → Change between states",
        "Provenance → Link from intent to artifact and run"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A restored configuration is said to be last week’s version.",
        "Write a prediction before revealing the baseline explanation. Record intent and its rationale in a bounded revision.",
        "Select Fault and locate the first broken handoff. No commit or artifact digest identifies which bytes were restored.",
        "Propose one observation that could disprove your diagnosis. Does Git track live device drift automatically?",
        "Select Recovery and compare with the required result. Record the exact revision and rendered digest; compare post-state with that captured baseline.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Record the exact revision and rendered digest; compare post-state with that captured baseline. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "No commit or artifact digest identifies which bytes were restored. No.",
      "challenge": "Can reverting a template undo all runtime effects? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Revision": "Identified content state. A branch name is movable.",
      "Diff": "Change between states. Large unrelated changes weaken review.",
      "Provenance": "Link from intent to artifact and run. Timestamps alone do not identify content."
    },
    "sources": [
      {
        "title": "Pro Git 2nd edition",
        "url": "https://git-scm.com/book/en/v2",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g4-t2-QC1",
        "topicId": "s9-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Version control.",
        "answer": "Version control preserves the history and review context of infrastructure intent, templates and tests; state external to the repository still needs reconciliation.",
        "explanation": "Record intent and its rationale in a bounded revision.",
        "testedConcept": "Revision"
      },
      {
        "questionId": "s9-g4-t2-QC2",
        "topicId": "s9-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Build reproducible artifacts from that revision.",
        "explanation": "Large unrelated changes weaken review.",
        "testedConcept": "Diff"
      },
      {
        "questionId": "s9-g4-t2-QC3",
        "topicId": "s9-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Record the exact revision and rendered digest; compare post-state with that captured baseline.",
        "explanation": "Attach observed deployment and rollback evidence to the same content identity.",
        "testedConcept": "Provenance"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g4-t2-Q1",
        "topicId": "s9-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is a commit hash useful?",
        "answer": "It identifies a specific recorded content state.",
        "explanation": "A branch label can later point elsewhere.",
        "testedConcept": "Revision"
      },
      {
        "questionId": "s9-g4-t2-Q2",
        "topicId": "s9-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does Git track live device drift automatically?",
        "answer": "No.",
        "explanation": "A collection and comparison process is needed.",
        "testedConcept": "Diff"
      },
      {
        "questionId": "s9-g4-t2-Q3",
        "topicId": "s9-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What belongs in a change record?",
        "answer": "Intent, scope, revision, validation, executor and observed result.",
        "explanation": "A ticket number alone lacks technical evidence.",
        "testedConcept": "Provenance"
      },
      {
        "questionId": "s9-g4-t2-Q4",
        "topicId": "s9-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can reverting a template undo all runtime effects?",
        "answer": "No.",
        "explanation": "State migrations or external side effects may require compensating actions.",
        "testedConcept": "Revision"
      },
      {
        "questionId": "s9-g4-t2-Q5",
        "topicId": "s9-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Version control case.",
        "answer": "No commit or artifact digest identifies which bytes were restored.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g4-t2-Q6",
        "topicId": "s9-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Version control incident?",
        "answer": "Record the exact revision and rendered digest; compare post-state with that captured baseline.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g4-t2-Q7",
        "topicId": "s9-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Revision with Diff.",
        "answer": "Identified content state. Change between states.",
        "explanation": "A branch name is movable. Large unrelated changes weaken review.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g4-t2-Q8",
        "topicId": "s9-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Provenance not establish the entire outcome?",
        "answer": "Timestamps alone do not identify content.",
        "explanation": "Attach observed deployment and rollback evidence to the same content identity.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g4-t2-Q9",
        "topicId": "s9-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A restored configuration is said to be last week’s version. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g4-t2-Q10",
        "topicId": "s9-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A restored configuration is said to be last week’s version.",
      "fault": "No commit or artifact digest identifies which bytes were restored.",
      "restore": "Record the exact revision and rendered digest; compare post-state with that captured baseline.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g4-t3",
    "batch": "23",
    "title": "Infrastructure as Code",
    "subtitle": "A manually changed firewall object differs from the stored definition.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g4-t3",
    "definition": "Infrastructure as Code expresses infrastructure intent as reviewable machine-readable definitions, then reconciles it with observed resources through controlled execution.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A manually changed firewall object differs from the stored definition. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Desired state, Drift, Plan. Read authoritative intent and current resource state. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Not proof of deployed state. May be an emergency change requiring review. Can become stale before execution. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Desired state: Approved target definition. Not proof of deployed state.",
      "Drift: Difference from approved intent. May be an emergency change requiring review.",
      "Plan: Proposed actions. Can become stale before execution."
    ],
    "mechanism": [
      "Read authoritative intent and current resource state.",
      "Produce and review a bounded plan with destructive actions explicit.",
      "Apply with concurrency control, verify outcomes and reconcile remaining drift."
    ],
    "flow": [
      [
        "Operation and scope",
        "A manually changed firewall object differs from the stored definition."
      ],
      [
        "Desired state",
        "Read authoritative intent and current resource state."
      ],
      [
        "Drift",
        "Produce and review a bounded plan with destructive actions explicit."
      ],
      [
        "Plan",
        "Apply with concurrency control, verify outcomes and reconcile remaining drift."
      ]
    ],
    "comparison": [
      [
        "Desired state",
        "Approved target definition",
        "Not proof of deployed state"
      ],
      [
        "Drift",
        "Difference from approved intent",
        "May be an emergency change requiring review"
      ],
      [
        "Plan",
        "Proposed actions",
        "Can become stale before execution"
      ]
    ],
    "example": "Worked incident: A manually changed firewall object differs from the stored definition. Failure: An unattended apply overwrites the emergency fix. Recovery: Classify the drift with its owner, update or restore intent deliberately and regenerate the plan. The key distinction is illustrated by this question: Is IaC only a script? No; it includes intent, review and reconciliation practices. A command list alone may not model state. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g4-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Read authoritative intent and current resource state. Produce and review a bounded plan with destructive actions explicit. Preserve a baseline and review the smallest concrete diff. In this case the failure is: An unattended apply overwrites the emergency fix. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Apply with concurrency control, verify outcomes and reconcile remaining drift. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Not proof of deployed state. Can become stale before execution. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Produce and review a bounded plan with destructive actions explicit. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "An unattended apply overwrites the emergency fix.",
        "Classify the drift with its owner, update or restore intent deliberately and regenerate the plan."
      ],
      [
        "Why can a plan become stale?",
        "Other actors or resources can change after observation. Revalidate before execution."
      ],
      [
        "Should all drift be erased immediately?",
        "No; investigate its cause and authority. An emergency repair may need incorporation."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A command list alone may not model state.",
      "Revalidate before execution.",
      "An emergency repair may need incorporation.",
      "A correct declaration can still request a destructive operation.",
      "Not proof of deployed state.",
      "Can become stale before execution."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g4-t2"
    ],
    "related": [
      "s9-g4-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Infrastructure as Code failure with an explicit evidence boundary. A manually changed firewall object differs from the stored definition.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Desired state → Approved target definition",
        "Drift → Difference from approved intent",
        "Plan → Proposed actions"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A manually changed firewall object differs from the stored definition.",
        "Write a prediction before revealing the baseline explanation. Read authoritative intent and current resource state.",
        "Select Fault and locate the first broken handoff. An unattended apply overwrites the emergency fix.",
        "Propose one observation that could disprove your diagnosis. Why can a plan become stale?",
        "Select Recovery and compare with the required result. Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Classify the drift with its owner, update or restore intent deliberately and regenerate the plan. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "An unattended apply overwrites the emergency fix. No.",
      "challenge": "Does declarative syntax guarantee safety? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Desired state": "Approved target definition. Not proof of deployed state.",
      "Drift": "Difference from approved intent. May be an emergency change requiring review.",
      "Plan": "Proposed actions. Can become stale before execution."
    },
    "sources": [
      {
        "title": "Terraform workflow and providers",
        "url": "https://developer.hashicorp.com/terraform/intro",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g4-t3-QC1",
        "topicId": "s9-g4-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Infrastructure as Code.",
        "answer": "Infrastructure as Code expresses infrastructure intent as reviewable machine-readable definitions, then reconciles it with observed resources through controlled execution.",
        "explanation": "Read authoritative intent and current resource state.",
        "testedConcept": "Desired state"
      },
      {
        "questionId": "s9-g4-t3-QC2",
        "topicId": "s9-g4-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Produce and review a bounded plan with destructive actions explicit.",
        "explanation": "May be an emergency change requiring review.",
        "testedConcept": "Drift"
      },
      {
        "questionId": "s9-g4-t3-QC3",
        "topicId": "s9-g4-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.",
        "explanation": "Apply with concurrency control, verify outcomes and reconcile remaining drift.",
        "testedConcept": "Plan"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g4-t3-Q1",
        "topicId": "s9-g4-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is IaC only a script?",
        "answer": "No; it includes intent, review and reconciliation practices.",
        "explanation": "A command list alone may not model state.",
        "testedConcept": "Desired state"
      },
      {
        "questionId": "s9-g4-t3-Q2",
        "topicId": "s9-g4-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can a plan become stale?",
        "answer": "Other actors or resources can change after observation.",
        "explanation": "Revalidate before execution.",
        "testedConcept": "Drift"
      },
      {
        "questionId": "s9-g4-t3-Q3",
        "topicId": "s9-g4-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should all drift be erased immediately?",
        "answer": "No; investigate its cause and authority.",
        "explanation": "An emergency repair may need incorporation.",
        "testedConcept": "Plan"
      },
      {
        "questionId": "s9-g4-t3-Q4",
        "topicId": "s9-g4-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does declarative syntax guarantee safety?",
        "answer": "No.",
        "explanation": "A correct declaration can still request a destructive operation.",
        "testedConcept": "Desired state"
      },
      {
        "questionId": "s9-g4-t3-Q5",
        "topicId": "s9-g4-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Infrastructure as Code case.",
        "answer": "An unattended apply overwrites the emergency fix.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g4-t3-Q6",
        "topicId": "s9-g4-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Infrastructure as Code incident?",
        "answer": "Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g4-t3-Q7",
        "topicId": "s9-g4-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Desired state with Drift.",
        "answer": "Approved target definition. Difference from approved intent.",
        "explanation": "Not proof of deployed state. May be an emergency change requiring review.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g4-t3-Q8",
        "topicId": "s9-g4-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Plan not establish the entire outcome?",
        "answer": "Can become stale before execution.",
        "explanation": "Apply with concurrency control, verify outcomes and reconcile remaining drift.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g4-t3-Q9",
        "topicId": "s9-g4-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A manually changed firewall object differs from the stored definition. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g4-t3-Q10",
        "topicId": "s9-g4-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A manually changed firewall object differs from the stored definition.",
      "fault": "An unattended apply overwrites the emergency fix.",
      "restore": "Classify the drift with its owner, update or restore intent deliberately and regenerate the plan.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g4-t4",
    "batch": "23",
    "title": "Terraform fundamentals",
    "subtitle": "Two operators plan against the same resource state.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g4-t4",
    "definition": "Terraform combines configuration, provider operations and state mappings to plan resource changes; state is sensitive operational data and not merely a cache.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two operators plan against the same resource state. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Provider, State, Saved plan. Initialize the approved provider and backend configuration. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Version affects schema and behavior. May contain sensitive values. Protect and apply under the intended state context. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Provider: Resource API integration. Version affects schema and behavior.",
      "State: Mapping from addresses to remote resources. May contain sensitive values.",
      "Saved plan: Concrete proposed action artifact. Protect and apply under the intended state context."
    ],
    "mechanism": [
      "Initialize the approved provider and backend configuration.",
      "Inspect the plan, including replacements and deletions.",
      "Apply with supported locking and verify real resource outcomes and state consistency."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two operators plan against the same resource state."
      ],
      [
        "Provider",
        "Initialize the approved provider and backend configuration."
      ],
      [
        "State",
        "Inspect the plan, including replacements and deletions."
      ],
      [
        "Saved plan",
        "Apply with supported locking and verify real resource outcomes and state consistency."
      ]
    ],
    "comparison": [
      [
        "Provider",
        "Resource API integration",
        "Version affects schema and behavior"
      ],
      [
        "State",
        "Mapping from addresses to remote resources",
        "May contain sensitive values"
      ],
      [
        "Saved plan",
        "Concrete proposed action artifact",
        "Protect and apply under the intended state context"
      ]
    ],
    "example": "Worked incident: Two operators plan against the same resource state. Failure: Concurrent writes produce conflicting state or an obsolete plan. Recovery: Use a backend with appropriate locking support, serialize changes and replan after state changes. The key distinction is illustrated by this question: Does sensitive hide a value from state storage? Not generally. Protect the backend and access controls. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g4-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Initialize the approved provider and backend configuration. Inspect the plan, including replacements and deletions. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Concurrent writes produce conflicting state or an obsolete plan. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use a backend with appropriate locking support, serialize changes and replan after state changes.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Apply with supported locking and verify real resource outcomes and state consistency. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Version affects schema and behavior. Protect and apply under the intended state context. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Inspect the plan, including replacements and deletions. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Concurrent writes produce conflicting state or an obsolete plan.",
        "Use a backend with appropriate locking support, serialize changes and replan after state changes."
      ],
      [
        "What does replacement imply?",
        "A resource may be destroyed and recreated. Review identity, data and outage effects."
      ],
      [
        "Is every backend lock-capable?",
        "No; behavior is backend-specific. Verify the selected backend."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Protect the backend and access controls.",
      "Review identity, data and outage effects.",
      "Verify the selected backend.",
      "It proposes actions; apply and post-verification are separate.",
      "Version affects schema and behavior.",
      "Protect and apply under the intended state context."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g4-t3"
    ],
    "related": [
      "s9-g5-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Terraform fundamentals failure with an explicit evidence boundary. Two operators plan against the same resource state.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Provider → Resource API integration",
        "State → Mapping from addresses to remote resources",
        "Saved plan → Concrete proposed action artifact"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two operators plan against the same resource state.",
        "Write a prediction before revealing the baseline explanation. Initialize the approved provider and backend configuration.",
        "Select Fault and locate the first broken handoff. Concurrent writes produce conflicting state or an obsolete plan.",
        "Propose one observation that could disprove your diagnosis. What does replacement imply?",
        "Select Recovery and compare with the required result. Use a backend with appropriate locking support, serialize changes and replan after state changes.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use a backend with appropriate locking support, serialize changes and replan after state changes. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Concurrent writes produce conflicting state or an obsolete plan. No.",
      "challenge": "Does a successful plan deploy anything? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Provider": "Resource API integration. Version affects schema and behavior.",
      "State": "Mapping from addresses to remote resources. May contain sensitive values.",
      "Saved plan": "Concrete proposed action artifact. Protect and apply under the intended state context."
    },
    "sources": [
      {
        "title": "Terraform workflow and providers",
        "url": "https://developer.hashicorp.com/terraform/intro",
        "checked": "2026-10-09"
      },
      {
        "title": "Terraform state and operational mapping",
        "url": "https://developer.hashicorp.com/terraform/language/state",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g4-t4-QC1",
        "topicId": "s9-g4-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Terraform fundamentals.",
        "answer": "Terraform combines configuration, provider operations and state mappings to plan resource changes; state is sensitive operational data and not merely a cache.",
        "explanation": "Initialize the approved provider and backend configuration.",
        "testedConcept": "Provider"
      },
      {
        "questionId": "s9-g4-t4-QC2",
        "topicId": "s9-g4-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Inspect the plan, including replacements and deletions.",
        "explanation": "May contain sensitive values.",
        "testedConcept": "State"
      },
      {
        "questionId": "s9-g4-t4-QC3",
        "topicId": "s9-g4-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use a backend with appropriate locking support, serialize changes and replan after state changes.",
        "explanation": "Apply with supported locking and verify real resource outcomes and state consistency.",
        "testedConcept": "Saved plan"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g4-t4-Q1",
        "topicId": "s9-g4-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does sensitive hide a value from state storage?",
        "answer": "Not generally.",
        "explanation": "Protect the backend and access controls.",
        "testedConcept": "Provider"
      },
      {
        "questionId": "s9-g4-t4-Q2",
        "topicId": "s9-g4-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does replacement imply?",
        "answer": "A resource may be destroyed and recreated.",
        "explanation": "Review identity, data and outage effects.",
        "testedConcept": "State"
      },
      {
        "questionId": "s9-g4-t4-Q3",
        "topicId": "s9-g4-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is every backend lock-capable?",
        "answer": "No; behavior is backend-specific.",
        "explanation": "Verify the selected backend.",
        "testedConcept": "Saved plan"
      },
      {
        "questionId": "s9-g4-t4-Q4",
        "topicId": "s9-g4-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a successful plan deploy anything?",
        "answer": "No.",
        "explanation": "It proposes actions; apply and post-verification are separate.",
        "testedConcept": "Provider"
      },
      {
        "questionId": "s9-g4-t4-Q5",
        "topicId": "s9-g4-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Terraform fundamentals case.",
        "answer": "Concurrent writes produce conflicting state or an obsolete plan.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g4-t4-Q6",
        "topicId": "s9-g4-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Terraform fundamentals incident?",
        "answer": "Use a backend with appropriate locking support, serialize changes and replan after state changes.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g4-t4-Q7",
        "topicId": "s9-g4-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Provider with State.",
        "answer": "Resource API integration. Mapping from addresses to remote resources.",
        "explanation": "Version affects schema and behavior. May contain sensitive values.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g4-t4-Q8",
        "topicId": "s9-g4-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Saved plan not establish the entire outcome?",
        "answer": "Protect and apply under the intended state context.",
        "explanation": "Apply with supported locking and verify real resource outcomes and state consistency.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g4-t4-Q9",
        "topicId": "s9-g4-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two operators plan against the same resource state. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g4-t4-Q10",
        "topicId": "s9-g4-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "Two operators plan against the same resource state.",
      "fault": "Concurrent writes produce conflicting state or an obsolete plan.",
      "restore": "Use a backend with appropriate locking support, serialize changes and replan after state changes.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t0",
    "batch": "23",
    "title": "Infrastructure documentation",
    "subtitle": "A recovery runbook names a retired management endpoint.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t0",
    "definition": "Infrastructure documentation records intent, dependencies and operating procedures with ownership and revision context so another operator can act without guessing.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A recovery runbook names a retired management endpoint. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Design record, Runbook, Evidence. Describe service goals and dependency ownership. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A diagram alone omits rationale. Requires prerequisites and stop conditions. An expected result is not observation. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Design record: Decision and tradeoff explanation. A diagram alone omits rationale.",
      "Runbook: Executable operational procedure. Requires prerequisites and stop conditions.",
      "Evidence: Observed result tied to time and identity. An expected result is not observation."
    ],
    "mechanism": [
      "Describe service goals and dependency ownership.",
      "Write baseline, failure, recovery and validation procedures.",
      "Exercise the document with another operator and update it from observed gaps."
    ],
    "flow": [
      [
        "Operation and scope",
        "A recovery runbook names a retired management endpoint."
      ],
      [
        "Design record",
        "Describe service goals and dependency ownership."
      ],
      [
        "Runbook",
        "Write baseline, failure, recovery and validation procedures."
      ],
      [
        "Evidence",
        "Exercise the document with another operator and update it from observed gaps."
      ]
    ],
    "comparison": [
      [
        "Design record",
        "Decision and tradeoff explanation",
        "A diagram alone omits rationale"
      ],
      [
        "Runbook",
        "Executable operational procedure",
        "Requires prerequisites and stop conditions"
      ],
      [
        "Evidence",
        "Observed result tied to time and identity",
        "An expected result is not observation"
      ]
    ],
    "example": "Worked incident: A recovery runbook names a retired management endpoint. Failure: The standby operator cannot reach the control interface during an outage. Recovery: Replace the endpoint with verified inventory references and test the independent management route. The key distinction is illustrated by this question: Why assign an owner and review date? So drift has an accountable correction path. Undated prose becomes hard to trust. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Describe service goals and dependency ownership. Write baseline, failure, recovery and validation procedures. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The standby operator cannot reach the control interface during an outage. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Replace the endpoint with verified inventory references and test the independent management route.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Exercise the document with another operator and update it from observed gaps. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A diagram alone omits rationale. An expected result is not observation. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Write baseline, failure, recovery and validation procedures. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The standby operator cannot reach the control interface during an outage.",
        "Replace the endpoint with verified inventory references and test the independent management route."
      ],
      [
        "What makes a runbook executable?",
        "Specific prerequisites, actions, expected evidence, stop rules and recovery. A high-level goal is not a procedure."
      ],
      [
        "Should expected output be labelled observed?",
        "No. Evidence provenance matters during incidents."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Undated prose becomes hard to trust.",
      "A high-level goal is not a procedure.",
      "Evidence provenance matters during incidents.",
      "Future maintainers need the tradeoff.",
      "A diagram alone omits rationale.",
      "An expected result is not observation."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g4-t4"
    ],
    "related": [
      "s9-g5-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Infrastructure documentation failure with an explicit evidence boundary. A recovery runbook names a retired management endpoint.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Design record → Decision and tradeoff explanation",
        "Runbook → Executable operational procedure",
        "Evidence → Observed result tied to time and identity"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A recovery runbook names a retired management endpoint.",
        "Write a prediction before revealing the baseline explanation. Describe service goals and dependency ownership.",
        "Select Fault and locate the first broken handoff. The standby operator cannot reach the control interface during an outage.",
        "Propose one observation that could disprove your diagnosis. What makes a runbook executable?",
        "Select Recovery and compare with the required result. Replace the endpoint with verified inventory references and test the independent management route.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Replace the endpoint with verified inventory references and test the independent management route. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The standby operator cannot reach the control interface during an outage. Alternatives, constraints and the reason for the choice.",
      "challenge": "What should a decision record preserve? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Design record": "Decision and tradeoff explanation. A diagram alone omits rationale.",
      "Runbook": "Executable operational procedure. Requires prerequisites and stop conditions.",
      "Evidence": "Observed result tied to time and identity. An expected result is not observation."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t0-QC1",
        "topicId": "s9-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Infrastructure documentation.",
        "answer": "Infrastructure documentation records intent, dependencies and operating procedures with ownership and revision context so another operator can act without guessing.",
        "explanation": "Describe service goals and dependency ownership.",
        "testedConcept": "Design record"
      },
      {
        "questionId": "s9-g5-t0-QC2",
        "topicId": "s9-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Write baseline, failure, recovery and validation procedures.",
        "explanation": "Requires prerequisites and stop conditions.",
        "testedConcept": "Runbook"
      },
      {
        "questionId": "s9-g5-t0-QC3",
        "topicId": "s9-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Replace the endpoint with verified inventory references and test the independent management route.",
        "explanation": "Exercise the document with another operator and update it from observed gaps.",
        "testedConcept": "Evidence"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t0-Q1",
        "topicId": "s9-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why assign an owner and review date?",
        "answer": "So drift has an accountable correction path.",
        "explanation": "Undated prose becomes hard to trust.",
        "testedConcept": "Design record"
      },
      {
        "questionId": "s9-g5-t0-Q2",
        "topicId": "s9-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What makes a runbook executable?",
        "answer": "Specific prerequisites, actions, expected evidence, stop rules and recovery.",
        "explanation": "A high-level goal is not a procedure.",
        "testedConcept": "Runbook"
      },
      {
        "questionId": "s9-g5-t0-Q3",
        "topicId": "s9-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should expected output be labelled observed?",
        "answer": "No.",
        "explanation": "Evidence provenance matters during incidents.",
        "testedConcept": "Evidence"
      },
      {
        "questionId": "s9-g5-t0-Q4",
        "topicId": "s9-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a decision record preserve?",
        "answer": "Alternatives, constraints and the reason for the choice.",
        "explanation": "Future maintainers need the tradeoff.",
        "testedConcept": "Design record"
      },
      {
        "questionId": "s9-g5-t0-Q5",
        "topicId": "s9-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Infrastructure documentation case.",
        "answer": "The standby operator cannot reach the control interface during an outage.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t0-Q6",
        "topicId": "s9-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Infrastructure documentation incident?",
        "answer": "Replace the endpoint with verified inventory references and test the independent management route.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t0-Q7",
        "topicId": "s9-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Design record with Runbook.",
        "answer": "Decision and tradeoff explanation. Executable operational procedure.",
        "explanation": "A diagram alone omits rationale. Requires prerequisites and stop conditions.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t0-Q8",
        "topicId": "s9-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Evidence not establish the entire outcome?",
        "answer": "An expected result is not observation.",
        "explanation": "Exercise the document with another operator and update it from observed gaps.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t0-Q9",
        "topicId": "s9-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A recovery runbook names a retired management endpoint. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t0-Q10",
        "topicId": "s9-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A recovery runbook names a retired management endpoint.",
      "fault": "The standby operator cannot reach the control interface during an outage.",
      "restore": "Replace the endpoint with verified inventory references and test the independent management route.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t1",
    "batch": "23",
    "title": "Network diagrams",
    "subtitle": "Two WAN lines appear redundant on a logical diagram.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t1",
    "definition": "Network diagrams show selected relationships at an explicit layer; physical links, logical reachability and security policy need distinct labels.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two WAN lines appear redundant on a logical diagram. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Physical view, Logical view, Policy view. Choose the question and layer before drawing. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A line does not imply independent power. May hide physical dependencies. Reachability alone is not authorization. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Physical view: Devices links and failure domains. A line does not imply independent power.",
      "Logical view: Addressing and forwarding relationships. May hide physical dependencies.",
      "Policy view: Allowed communication paths. Reachability alone is not authorization."
    ],
    "mechanism": [
      "Choose the question and layer before drawing.",
      "Label identities, interfaces, zones and shared dependencies.",
      "Cross-check the diagram against inventory and a representative observed path."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two WAN lines appear redundant on a logical diagram."
      ],
      [
        "Physical view",
        "Choose the question and layer before drawing."
      ],
      [
        "Logical view",
        "Label identities, interfaces, zones and shared dependencies."
      ],
      [
        "Policy view",
        "Cross-check the diagram against inventory and a representative observed path."
      ]
    ],
    "comparison": [
      [
        "Physical view",
        "Devices links and failure domains",
        "A line does not imply independent power"
      ],
      [
        "Logical view",
        "Addressing and forwarding relationships",
        "May hide physical dependencies"
      ],
      [
        "Policy view",
        "Allowed communication paths",
        "Reachability alone is not authorization"
      ]
    ],
    "example": "Worked incident: Two WAN lines appear redundant on a logical diagram. Failure: Both enter the same conduit and fail together. Recovery: Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path. The key distinction is illustrated by this question: Can one diagram answer every operational question? Usually not; use explicit views. Overloaded lines become ambiguous. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Choose the question and layer before drawing. Label identities, interfaces, zones and shared dependencies. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Both enter the same conduit and fail together. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Cross-check the diagram against inventory and a representative observed path. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A line does not imply independent power. Reachability alone is not authorization. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Label identities, interfaces, zones and shared dependencies. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Both enter the same conduit and fail together.",
        "Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path."
      ],
      [
        "Why label line direction?",
        "It distinguishes initiation, forwarding or dependency direction. An arrow needs a defined meaning."
      ],
      [
        "What demonstrates diversity?",
        "Evidence of separate relevant failure domains. Different colors are not evidence."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Overloaded lines become ambiguous.",
      "An arrow needs a defined meaning.",
      "Different colors are not evidence.",
      "Screenshots without source ownership age quickly.",
      "A line does not imply independent power.",
      "Reachability alone is not authorization."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t0"
    ],
    "related": [
      "s9-g5-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Network diagrams failure with an explicit evidence boundary. Two WAN lines appear redundant on a logical diagram.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Physical view → Devices links and failure domains",
        "Logical view → Addressing and forwarding relationships",
        "Policy view → Allowed communication paths"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two WAN lines appear redundant on a logical diagram.",
        "Write a prediction before revealing the baseline explanation. Choose the question and layer before drawing.",
        "Select Fault and locate the first broken handoff. Both enter the same conduit and fail together.",
        "Propose one observation that could disprove your diagnosis. Why label line direction?",
        "Select Recovery and compare with the required result. Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Both enter the same conduit and fail together. Tie objects to stable inventory IDs and review changes.",
      "challenge": "How prevent diagram drift? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Physical view": "Devices links and failure domains. A line does not imply independent power.",
      "Logical view": "Addressing and forwarding relationships. May hide physical dependencies.",
      "Policy view": "Allowed communication paths. Reachability alone is not authorization."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t1-QC1",
        "topicId": "s9-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Network diagrams.",
        "answer": "Network diagrams show selected relationships at an explicit layer; physical links, logical reachability and security policy need distinct labels.",
        "explanation": "Choose the question and layer before drawing.",
        "testedConcept": "Physical view"
      },
      {
        "questionId": "s9-g5-t1-QC2",
        "topicId": "s9-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Label identities, interfaces, zones and shared dependencies.",
        "explanation": "May hide physical dependencies.",
        "testedConcept": "Logical view"
      },
      {
        "questionId": "s9-g5-t1-QC3",
        "topicId": "s9-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.",
        "explanation": "Cross-check the diagram against inventory and a representative observed path.",
        "testedConcept": "Policy view"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t1-Q1",
        "topicId": "s9-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can one diagram answer every operational question?",
        "answer": "Usually not; use explicit views.",
        "explanation": "Overloaded lines become ambiguous.",
        "testedConcept": "Physical view"
      },
      {
        "questionId": "s9-g5-t1-Q2",
        "topicId": "s9-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why label line direction?",
        "answer": "It distinguishes initiation, forwarding or dependency direction.",
        "explanation": "An arrow needs a defined meaning.",
        "testedConcept": "Logical view"
      },
      {
        "questionId": "s9-g5-t1-Q3",
        "topicId": "s9-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What demonstrates diversity?",
        "answer": "Evidence of separate relevant failure domains.",
        "explanation": "Different colors are not evidence.",
        "testedConcept": "Policy view"
      },
      {
        "questionId": "s9-g5-t1-Q4",
        "topicId": "s9-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How prevent diagram drift?",
        "answer": "Tie objects to stable inventory IDs and review changes.",
        "explanation": "Screenshots without source ownership age quickly.",
        "testedConcept": "Physical view"
      },
      {
        "questionId": "s9-g5-t1-Q5",
        "topicId": "s9-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Network diagrams case.",
        "answer": "Both enter the same conduit and fail together.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t1-Q6",
        "topicId": "s9-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Network diagrams incident?",
        "answer": "Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t1-Q7",
        "topicId": "s9-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Physical view with Logical view.",
        "answer": "Devices links and failure domains. Addressing and forwarding relationships.",
        "explanation": "A line does not imply independent power. May hide physical dependencies.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t1-Q8",
        "topicId": "s9-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Policy view not establish the entire outcome?",
        "answer": "Reachability alone is not authorization.",
        "explanation": "Cross-check the diagram against inventory and a representative observed path.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t1-Q9",
        "topicId": "s9-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two WAN lines appear redundant on a logical diagram. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t1-Q10",
        "topicId": "s9-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "Two WAN lines appear redundant on a logical diagram.",
      "fault": "Both enter the same conduit and fail together.",
      "restore": "Add the shared physical dependency and revise the resilience claim or obtain a genuinely separate path.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t2",
    "batch": "23",
    "title": "IP Address Management",
    "subtitle": "Two provisioning jobs select the same free address in one VRF.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t2",
    "definition": "IP Address Management records address-space allocation, ownership and scope so provisioning can prevent conflicts before activation.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two provisioning jobs select the same free address in one VRF. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Prefix, Reservation, VRF scope. Locate the authoritative prefix and tenant or VRF. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Overlap must be interpreted within routing scope. It does not prove active use. The same address may be valid in different contexts. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Prefix: Allocated address range. Overlap must be interpreted within routing scope.",
      "Reservation: Planned assignment. It does not prove active use.",
      "VRF scope: Independent routing context. The same address may be valid in different contexts."
    ],
    "mechanism": [
      "Locate the authoritative prefix and tenant or VRF.",
      "Check overlap and uniqueness under that scope, then reserve the intended address.",
      "Reconcile allocation with observed use and release only confirmed retired assignments."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two provisioning jobs select the same free address in one VRF."
      ],
      [
        "Prefix",
        "Locate the authoritative prefix and tenant or VRF."
      ],
      [
        "Reservation",
        "Check overlap and uniqueness under that scope, then reserve the intended address."
      ],
      [
        "VRF scope",
        "Reconcile allocation with observed use and release only confirmed retired assignments."
      ]
    ],
    "comparison": [
      [
        "Prefix",
        "Allocated address range",
        "Overlap must be interpreted within routing scope"
      ],
      [
        "Reservation",
        "Planned assignment",
        "It does not prove active use"
      ],
      [
        "VRF scope",
        "Independent routing context",
        "The same address may be valid in different contexts"
      ]
    ],
    "example": "Worked incident: Two provisioning jobs select the same free address in one VRF. Failure: Both read availability before either reservation is recorded. Recovery: Use an atomic reservation or serialized allocation and detect the conflict before configuring either target. The key distinction is illustrated by this question: Is ping silence proof an address is free? No. A host may be offline or filter probes. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Locate the authoritative prefix and tenant or VRF. Check overlap and uniqueness under that scope, then reserve the intended address. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Both read availability before either reservation is recorded. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Reconcile allocation with observed use and release only confirmed retired assignments. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Overlap must be interpreted within routing scope. The same address may be valid in different contexts. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Check overlap and uniqueness under that scope, then reserve the intended address. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Both read availability before either reservation is recorded.",
        "Use an atomic reservation or serialized allocation and detect the conflict before configuring either target."
      ],
      [
        "Can duplicate addresses exist across VRFs?",
        "Yes when routing scopes remain separate. Global uniqueness is not always the right rule."
      ],
      [
        "Why model reservations?",
        "Intent can precede activation. A free-looking address may already be promised."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A host may be offline or filter probes.",
      "Global uniqueness is not always the right rule.",
      "A free-looking address may already be promised.",
      "Deleting a record does not remove runtime use.",
      "Overlap must be interpreted within routing scope.",
      "The same address may be valid in different contexts."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t1"
    ],
    "related": [
      "s9-g5-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated IP Address Management failure with an explicit evidence boundary. Two provisioning jobs select the same free address in one VRF.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Prefix → Allocated address range",
        "Reservation → Planned assignment",
        "VRF scope → Independent routing context"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two provisioning jobs select the same free address in one VRF.",
        "Write a prediction before revealing the baseline explanation. Locate the authoritative prefix and tenant or VRF.",
        "Select Fault and locate the first broken handoff. Both read availability before either reservation is recorded.",
        "Propose one observation that could disprove your diagnosis. Can duplicate addresses exist across VRFs?",
        "Select Recovery and compare with the required result. Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use an atomic reservation or serialized allocation and detect the conflict before configuring either target. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Both read availability before either reservation is recorded. Confirmation that dependent interfaces, DNS and ownership records are retired.",
      "challenge": "What precedes release? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Prefix": "Allocated address range. Overlap must be interpreted within routing scope.",
      "Reservation": "Planned assignment. It does not prove active use.",
      "VRF scope": "Independent routing context. The same address may be valid in different contexts."
    },
    "sources": [
      {
        "title": "NetBox documentation and intended role",
        "url": "https://netboxlabs.com/docs/netbox/",
        "checked": "2026-10-09"
      },
      {
        "title": "Python 3.12 ipaddress",
        "url": "https://docs.python.org/3.12/library/ipaddress.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t2-QC1",
        "topicId": "s9-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of IP Address Management.",
        "answer": "IP Address Management records address-space allocation, ownership and scope so provisioning can prevent conflicts before activation.",
        "explanation": "Locate the authoritative prefix and tenant or VRF.",
        "testedConcept": "Prefix"
      },
      {
        "questionId": "s9-g5-t2-QC2",
        "topicId": "s9-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Check overlap and uniqueness under that scope, then reserve the intended address.",
        "explanation": "It does not prove active use.",
        "testedConcept": "Reservation"
      },
      {
        "questionId": "s9-g5-t2-QC3",
        "topicId": "s9-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.",
        "explanation": "Reconcile allocation with observed use and release only confirmed retired assignments.",
        "testedConcept": "VRF scope"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t2-Q1",
        "topicId": "s9-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is ping silence proof an address is free?",
        "answer": "No.",
        "explanation": "A host may be offline or filter probes.",
        "testedConcept": "Prefix"
      },
      {
        "questionId": "s9-g5-t2-Q2",
        "topicId": "s9-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can duplicate addresses exist across VRFs?",
        "answer": "Yes when routing scopes remain separate.",
        "explanation": "Global uniqueness is not always the right rule.",
        "testedConcept": "Reservation"
      },
      {
        "questionId": "s9-g5-t2-Q3",
        "topicId": "s9-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why model reservations?",
        "answer": "Intent can precede activation.",
        "explanation": "A free-looking address may already be promised.",
        "testedConcept": "VRF scope"
      },
      {
        "questionId": "s9-g5-t2-Q4",
        "topicId": "s9-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What precedes release?",
        "answer": "Confirmation that dependent interfaces, DNS and ownership records are retired.",
        "explanation": "Deleting a record does not remove runtime use.",
        "testedConcept": "Prefix"
      },
      {
        "questionId": "s9-g5-t2-Q5",
        "topicId": "s9-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this IP Address Management case.",
        "answer": "Both read availability before either reservation is recorded.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t2-Q6",
        "topicId": "s9-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the IP Address Management incident?",
        "answer": "Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t2-Q7",
        "topicId": "s9-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Prefix with Reservation.",
        "answer": "Allocated address range. Planned assignment.",
        "explanation": "Overlap must be interpreted within routing scope. It does not prove active use.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t2-Q8",
        "topicId": "s9-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does VRF scope not establish the entire outcome?",
        "answer": "The same address may be valid in different contexts.",
        "explanation": "Reconcile allocation with observed use and release only confirmed retired assignments.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t2-Q9",
        "topicId": "s9-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two provisioning jobs select the same free address in one VRF. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t2-Q10",
        "topicId": "s9-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "Two provisioning jobs select the same free address in one VRF.",
      "fault": "Both read availability before either reservation is recorded.",
      "restore": "Use an atomic reservation or serialized allocation and detect the conflict before configuring either target.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t3",
    "batch": "23",
    "title": "NetBox",
    "subtitle": "A device record has the intended management IP but the actual interface differs.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t3",
    "definition": "NetBox models infrastructure intent and inventory relationships, including devices and IPAM; it requires governance and reconciliation with observed infrastructure.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A device record has the intended management IP but the actual interface differs. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Object ID, Relationship, Custom field. Define authoritative fields and ownership rules. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A human name may change. A valid link can still describe stale reality. Needs a documented schema and owner. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Object ID: Stable record identity. A human name may change.",
      "Relationship: Modeled association. A valid link can still describe stale reality.",
      "Custom field: Local extension. Needs a documented schema and owner."
    ],
    "mechanism": [
      "Define authoritative fields and ownership rules.",
      "Read records with filters and complete pagination.",
      "Validate relationships and reconcile intended records with independent observations."
    ],
    "flow": [
      [
        "Operation and scope",
        "A device record has the intended management IP but the actual interface differs."
      ],
      [
        "Object ID",
        "Define authoritative fields and ownership rules."
      ],
      [
        "Relationship",
        "Read records with filters and complete pagination."
      ],
      [
        "Custom field",
        "Validate relationships and reconcile intended records with independent observations."
      ]
    ],
    "comparison": [
      [
        "Object ID",
        "Stable record identity",
        "A human name may change"
      ],
      [
        "Relationship",
        "Modeled association",
        "A valid link can still describe stale reality"
      ],
      [
        "Custom field",
        "Local extension",
        "Needs a documented schema and owner"
      ]
    ],
    "example": "Worked incident: A device record has the intended management IP but the actual interface differs. Failure: Automation treats the inventory record as proof of live connectivity. Recovery: Separate intended and observed values, investigate drift and update only through the designated owner. The key distinction is illustrated by this question: Is NetBox a packet monitor? No. Its intended role is not continuous live forwarding verification. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define authoritative fields and ownership rules. Read records with filters and complete pagination. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Automation treats the inventory record as proof of live connectivity. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Separate intended and observed values, investigate drift and update only through the designated owner.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Validate relationships and reconcile intended records with independent observations. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A human name may change. Needs a documented schema and owner. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Read records with filters and complete pagination. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Automation treats the inventory record as proof of live connectivity.",
        "Separate intended and observed values, investigate drift and update only through the designated owner."
      ],
      [
        "Why use IDs in updates?",
        "To avoid ambiguity from renames. Confirm the record still represents the target."
      ],
      [
        "How handle custom fields?",
        "Document type, ownership and validation. Uncontrolled extensions become competing schemas."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Its intended role is not continuous live forwarding verification.",
      "Confirm the record still represents the target.",
      "Uncontrolled extensions become competing schemas.",
      "Provisioning and observation remain separate.",
      "A human name may change.",
      "Needs a documented schema and owner."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t2"
    ],
    "related": [
      "s9-g5-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated NetBox failure with an explicit evidence boundary. A device record has the intended management IP but the actual interface differs.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Object ID → Stable record identity",
        "Relationship → Modeled association",
        "Custom field → Local extension"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A device record has the intended management IP but the actual interface differs.",
        "Write a prediction before revealing the baseline explanation. Define authoritative fields and ownership rules.",
        "Select Fault and locate the first broken handoff. Automation treats the inventory record as proof of live connectivity.",
        "Propose one observation that could disprove your diagnosis. Why use IDs in updates?",
        "Select Recovery and compare with the required result. Separate intended and observed values, investigate drift and update only through the designated owner.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Separate intended and observed values, investigate drift and update only through the designated owner. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Automation treats the inventory record as proof of live connectivity. No; it may only update the record.",
      "challenge": "Does an API success prove the network changed? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Object ID": "Stable record identity. A human name may change.",
      "Relationship": "Modeled association. A valid link can still describe stale reality.",
      "Custom field": "Local extension. Needs a documented schema and owner."
    },
    "sources": [
      {
        "title": "NetBox documentation and intended role",
        "url": "https://netboxlabs.com/docs/netbox/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t3-QC1",
        "topicId": "s9-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of NetBox.",
        "answer": "NetBox models infrastructure intent and inventory relationships, including devices and IPAM; it requires governance and reconciliation with observed infrastructure.",
        "explanation": "Define authoritative fields and ownership rules.",
        "testedConcept": "Object ID"
      },
      {
        "questionId": "s9-g5-t3-QC2",
        "topicId": "s9-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Read records with filters and complete pagination.",
        "explanation": "A valid link can still describe stale reality.",
        "testedConcept": "Relationship"
      },
      {
        "questionId": "s9-g5-t3-QC3",
        "topicId": "s9-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Separate intended and observed values, investigate drift and update only through the designated owner.",
        "explanation": "Validate relationships and reconcile intended records with independent observations.",
        "testedConcept": "Custom field"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t3-Q1",
        "topicId": "s9-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is NetBox a packet monitor?",
        "answer": "No.",
        "explanation": "Its intended role is not continuous live forwarding verification.",
        "testedConcept": "Object ID"
      },
      {
        "questionId": "s9-g5-t3-Q2",
        "topicId": "s9-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why use IDs in updates?",
        "answer": "To avoid ambiguity from renames.",
        "explanation": "Confirm the record still represents the target.",
        "testedConcept": "Relationship"
      },
      {
        "questionId": "s9-g5-t3-Q3",
        "topicId": "s9-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How handle custom fields?",
        "answer": "Document type, ownership and validation.",
        "explanation": "Uncontrolled extensions become competing schemas.",
        "testedConcept": "Custom field"
      },
      {
        "questionId": "s9-g5-t3-Q4",
        "topicId": "s9-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does an API success prove the network changed?",
        "answer": "No; it may only update the record.",
        "explanation": "Provisioning and observation remain separate.",
        "testedConcept": "Object ID"
      },
      {
        "questionId": "s9-g5-t3-Q5",
        "topicId": "s9-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this NetBox case.",
        "answer": "Automation treats the inventory record as proof of live connectivity.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t3-Q6",
        "topicId": "s9-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the NetBox incident?",
        "answer": "Separate intended and observed values, investigate drift and update only through the designated owner.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t3-Q7",
        "topicId": "s9-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Object ID with Relationship.",
        "answer": "Stable record identity. Modeled association.",
        "explanation": "A human name may change. A valid link can still describe stale reality.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t3-Q8",
        "topicId": "s9-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Custom field not establish the entire outcome?",
        "answer": "Needs a documented schema and owner.",
        "explanation": "Validate relationships and reconcile intended records with independent observations.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t3-Q9",
        "topicId": "s9-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A device record has the intended management IP but the actual interface differs. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t3-Q10",
        "topicId": "s9-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A device record has the intended management IP but the actual interface differs.",
      "fault": "Automation treats the inventory record as proof of live connectivity.",
      "restore": "Separate intended and observed values, investigate drift and update only through the designated owner.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t4",
    "batch": "23",
    "title": "Configuration management",
    "subtitle": "A device has an emergency DNS fix not yet reflected in intent.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t4",
    "definition": "Configuration management maintains approved settings through baselines, drift detection, controlled changes and verified restoration.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A device has an emergency DNS fix not yet reflected in intent. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Baseline, Drift report, Reconciliation. Collect and sanitize current state. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Must be tied to scope and revision. Not every difference is unauthorized. Blind overwrite can remove a valid repair. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Baseline: Approved known configuration. Must be tied to scope and revision.",
      "Drift report: Observed difference. Not every difference is unauthorized.",
      "Reconciliation: Decision and action to resolve difference. Blind overwrite can remove a valid repair."
    ],
    "mechanism": [
      "Collect and sanitize current state.",
      "Compare relevant settings with the approved baseline.",
      "Authorize the smallest reconciliation and verify both desired state and protected unrelated settings."
    ],
    "flow": [
      [
        "Operation and scope",
        "A device has an emergency DNS fix not yet reflected in intent."
      ],
      [
        "Baseline",
        "Collect and sanitize current state."
      ],
      [
        "Drift report",
        "Compare relevant settings with the approved baseline."
      ],
      [
        "Reconciliation",
        "Authorize the smallest reconciliation and verify both desired state and protected unrelated settings."
      ]
    ],
    "comparison": [
      [
        "Baseline",
        "Approved known configuration",
        "Must be tied to scope and revision"
      ],
      [
        "Drift report",
        "Observed difference",
        "Not every difference is unauthorized"
      ],
      [
        "Reconciliation",
        "Decision and action to resolve difference",
        "Blind overwrite can remove a valid repair"
      ]
    ],
    "example": "Worked incident: A device has an emergency DNS fix not yet reflected in intent. Failure: Nightly automation restores the broken baseline without investigation. Recovery: Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback. The key distinction is illustrated by this question: Why compare relevant fields? Volatile counters can create meaningless diffs. Noise obscures actual configuration drift. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Collect and sanitize current state. Compare relevant settings with the approved baseline. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Nightly automation restores the broken baseline without investigation. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Authorize the smallest reconciliation and verify both desired state and protected unrelated settings. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Must be tied to scope and revision. Blind overwrite can remove a valid repair. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Compare relevant settings with the approved baseline. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Nightly automation restores the broken baseline without investigation.",
        "Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback."
      ],
      [
        "What distinguishes backup from baseline?",
        "Backup is captured state; baseline is approved state. A backup may preserve a fault."
      ],
      [
        "Why test unrelated settings?",
        "A broad update can have unintended effects. Success on one field is insufficient."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Noise obscures actual configuration drift.",
      "A backup may preserve a fault.",
      "Success on one field is insufficient.",
      "A dismissed alert is not reconciliation.",
      "Must be tied to scope and revision.",
      "Blind overwrite can remove a valid repair."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t3"
    ],
    "related": [
      "s9-g5-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Configuration management failure with an explicit evidence boundary. A device has an emergency DNS fix not yet reflected in intent.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Baseline → Approved known configuration",
        "Drift report → Observed difference",
        "Reconciliation → Decision and action to resolve difference"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A device has an emergency DNS fix not yet reflected in intent.",
        "Write a prediction before revealing the baseline explanation. Collect and sanitize current state.",
        "Select Fault and locate the first broken handoff. Nightly automation restores the broken baseline without investigation.",
        "Propose one observation that could disprove your diagnosis. What distinguishes backup from baseline?",
        "Select Recovery and compare with the required result. Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Nightly automation restores the broken baseline without investigation. An approved decision plus verified resulting state.",
      "challenge": "What closes a drift incident? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Baseline": "Approved known configuration. Must be tied to scope and revision.",
      "Drift report": "Observed difference. Not every difference is unauthorized.",
      "Reconciliation": "Decision and action to resolve difference. Blind overwrite can remove a valid repair."
    },
    "sources": [
      {
        "title": "Ansible network automation guide",
        "url": "https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Terraform workflow and providers",
        "url": "https://developer.hashicorp.com/terraform/intro",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t4-QC1",
        "topicId": "s9-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Configuration management.",
        "answer": "Configuration management maintains approved settings through baselines, drift detection, controlled changes and verified restoration.",
        "explanation": "Collect and sanitize current state.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s9-g5-t4-QC2",
        "topicId": "s9-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Compare relevant settings with the approved baseline.",
        "explanation": "Not every difference is unauthorized.",
        "testedConcept": "Drift report"
      },
      {
        "questionId": "s9-g5-t4-QC3",
        "topicId": "s9-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.",
        "explanation": "Authorize the smallest reconciliation and verify both desired state and protected unrelated settings.",
        "testedConcept": "Reconciliation"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t4-Q1",
        "topicId": "s9-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why compare relevant fields?",
        "answer": "Volatile counters can create meaningless diffs.",
        "explanation": "Noise obscures actual configuration drift.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s9-g5-t4-Q2",
        "topicId": "s9-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What distinguishes backup from baseline?",
        "answer": "Backup is captured state; baseline is approved state.",
        "explanation": "A backup may preserve a fault.",
        "testedConcept": "Drift report"
      },
      {
        "questionId": "s9-g5-t4-Q3",
        "topicId": "s9-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test unrelated settings?",
        "answer": "A broad update can have unintended effects.",
        "explanation": "Success on one field is insufficient.",
        "testedConcept": "Reconciliation"
      },
      {
        "questionId": "s9-g5-t4-Q4",
        "topicId": "s9-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What closes a drift incident?",
        "answer": "An approved decision plus verified resulting state.",
        "explanation": "A dismissed alert is not reconciliation.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s9-g5-t4-Q5",
        "topicId": "s9-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Configuration management case.",
        "answer": "Nightly automation restores the broken baseline without investigation.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t4-Q6",
        "topicId": "s9-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Configuration management incident?",
        "answer": "Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t4-Q7",
        "topicId": "s9-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Baseline with Drift report.",
        "answer": "Approved known configuration. Observed difference.",
        "explanation": "Must be tied to scope and revision. Not every difference is unauthorized.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t4-Q8",
        "topicId": "s9-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Reconciliation not establish the entire outcome?",
        "answer": "Blind overwrite can remove a valid repair.",
        "explanation": "Authorize the smallest reconciliation and verify both desired state and protected unrelated settings.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t4-Q9",
        "topicId": "s9-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A device has an emergency DNS fix not yet reflected in intent. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t4-Q10",
        "topicId": "s9-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A device has an emergency DNS fix not yet reflected in intent.",
      "fault": "Nightly automation restores the broken baseline without investigation.",
      "restore": "Pause the affected reconciliation, record the emergency rationale and approve an updated baseline or deliberate rollback.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t5",
    "batch": "23",
    "title": "Source of truth",
    "subtitle": "Git defines VLAN intent while discovery records actual interfaces.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t5",
    "definition": "A source of truth assigns authority for specific facts and a controlled update path; it does not imply one system knows every intended and observed value.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Git defines VLAN intent while discovery records actual interfaces. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Authority, Observation, Reconciliation policy. Map each field to an authoritative owner. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Different fields may have different owners. Can disagree with approved intent. Last writer wins is often unsafe. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Authority: Right to define a field. Different fields may have different owners.",
      "Observation: Measured current value. Can disagree with approved intent.",
      "Reconciliation policy: Rule for resolving differences. Last writer wins is often unsafe."
    ],
    "mechanism": [
      "Map each field to an authoritative owner.",
      "Collect observations separately with timestamps.",
      "Resolve conflicts through a documented policy and record provenance."
    ],
    "flow": [
      [
        "Operation and scope",
        "Git defines VLAN intent while discovery records actual interfaces."
      ],
      [
        "Authority",
        "Map each field to an authoritative owner."
      ],
      [
        "Observation",
        "Collect observations separately with timestamps."
      ],
      [
        "Reconciliation policy",
        "Resolve conflicts through a documented policy and record provenance."
      ]
    ],
    "comparison": [
      [
        "Authority",
        "Right to define a field",
        "Different fields may have different owners"
      ],
      [
        "Observation",
        "Measured current value",
        "Can disagree with approved intent"
      ],
      [
        "Reconciliation policy",
        "Rule for resolving differences",
        "Last writer wins is often unsafe"
      ]
    ],
    "example": "Worked incident: Git defines VLAN intent while discovery records actual interfaces. Failure: A sync loop copies observations into intent and then deploys them back, erasing review. Recovery: Make synchronization directional per field, preserve provenance and require review for intent changes. The key distinction is illustrated by this question: Must there be one database for everything? No; authority can be partitioned by field. Ambiguous ownership is the problem. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Map each field to an authoritative owner. Collect observations separately with timestamps. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A sync loop copies observations into intent and then deploys them back, erasing review. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Make synchronization directional per field, preserve provenance and require review for intent changes.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Resolve conflicts through a documented policy and record provenance. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Different fields may have different owners. Last writer wins is often unsafe. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Collect observations separately with timestamps. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A sync loop copies observations into intent and then deploys them back, erasing review.",
        "Make synchronization directional per field, preserve provenance and require review for intent changes."
      ],
      [
        "Why avoid bidirectional blind sync?",
        "It can create feedback loops and overwrite intent. Define conflict rules."
      ],
      [
        "Does latest timestamp imply correctness?",
        "No. Clock accuracy and authority matter."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Ambiguous ownership is the problem.",
      "Define conflict rules.",
      "Clock accuracy and authority matter.",
      "Discarding one value hides the cause.",
      "Different fields may have different owners.",
      "Last writer wins is often unsafe."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t4"
    ],
    "related": [
      "s9-g5-t6"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Source of truth failure with an explicit evidence boundary. Git defines VLAN intent while discovery records actual interfaces.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Authority → Right to define a field",
        "Observation → Measured current value",
        "Reconciliation policy → Rule for resolving differences"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Git defines VLAN intent while discovery records actual interfaces.",
        "Write a prediction before revealing the baseline explanation. Map each field to an authoritative owner.",
        "Select Fault and locate the first broken handoff. A sync loop copies observations into intent and then deploys them back, erasing review.",
        "Propose one observation that could disprove your diagnosis. Why avoid bidirectional blind sync?",
        "Select Recovery and compare with the required result. Make synchronization directional per field, preserve provenance and require review for intent changes.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Make synchronization directional per field, preserve provenance and require review for intent changes. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A sync loop copies observations into intent and then deploys them back, erasing review. Both values, their sources, times and responsible owners.",
      "challenge": "What evidence should a conflict retain? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Authority": "Right to define a field. Different fields may have different owners.",
      "Observation": "Measured current value. Can disagree with approved intent.",
      "Reconciliation policy": "Rule for resolving differences. Last writer wins is often unsafe."
    },
    "sources": [
      {
        "title": "NetBox documentation and intended role",
        "url": "https://netboxlabs.com/docs/netbox/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t5-QC1",
        "topicId": "s9-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Source of truth.",
        "answer": "A source of truth assigns authority for specific facts and a controlled update path; it does not imply one system knows every intended and observed value.",
        "explanation": "Map each field to an authoritative owner.",
        "testedConcept": "Authority"
      },
      {
        "questionId": "s9-g5-t5-QC2",
        "topicId": "s9-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Collect observations separately with timestamps.",
        "explanation": "Can disagree with approved intent.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "s9-g5-t5-QC3",
        "topicId": "s9-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Make synchronization directional per field, preserve provenance and require review for intent changes.",
        "explanation": "Resolve conflicts through a documented policy and record provenance.",
        "testedConcept": "Reconciliation policy"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t5-Q1",
        "topicId": "s9-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Must there be one database for everything?",
        "answer": "No; authority can be partitioned by field.",
        "explanation": "Ambiguous ownership is the problem.",
        "testedConcept": "Authority"
      },
      {
        "questionId": "s9-g5-t5-Q2",
        "topicId": "s9-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why avoid bidirectional blind sync?",
        "answer": "It can create feedback loops and overwrite intent.",
        "explanation": "Define conflict rules.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "s9-g5-t5-Q3",
        "topicId": "s9-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does latest timestamp imply correctness?",
        "answer": "No.",
        "explanation": "Clock accuracy and authority matter.",
        "testedConcept": "Reconciliation policy"
      },
      {
        "questionId": "s9-g5-t5-Q4",
        "topicId": "s9-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence should a conflict retain?",
        "answer": "Both values, their sources, times and responsible owners.",
        "explanation": "Discarding one value hides the cause.",
        "testedConcept": "Authority"
      },
      {
        "questionId": "s9-g5-t5-Q5",
        "topicId": "s9-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Source of truth case.",
        "answer": "A sync loop copies observations into intent and then deploys them back, erasing review.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t5-Q6",
        "topicId": "s9-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Source of truth incident?",
        "answer": "Make synchronization directional per field, preserve provenance and require review for intent changes.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t5-Q7",
        "topicId": "s9-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Authority with Observation.",
        "answer": "Right to define a field. Measured current value.",
        "explanation": "Different fields may have different owners. Can disagree with approved intent.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t5-Q8",
        "topicId": "s9-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Reconciliation policy not establish the entire outcome?",
        "answer": "Last writer wins is often unsafe.",
        "explanation": "Resolve conflicts through a documented policy and record provenance.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t5-Q9",
        "topicId": "s9-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Git defines VLAN intent while discovery records actual interfaces. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t5-Q10",
        "topicId": "s9-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "Git defines VLAN intent while discovery records actual interfaces.",
      "fault": "A sync loop copies observations into intent and then deploys them back, erasing review.",
      "restore": "Make synchronization directional per field, preserve provenance and require review for intent changes.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g5-t6",
    "batch": "23",
    "title": "CI/CD concepts",
    "subtitle": "A validated configuration artifact is rebuilt during deployment.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g5-t6",
    "definition": "CI/CD links a revision to automated checks and controlled promotion; infrastructure delivery must handle state, credentials and partial changes explicitly.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A validated configuration artifact is rebuilt during deployment. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between CI, Artifact, Promotion. Validate schema, render and test the proposed revision. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Passing tests have a defined coverage limit. Rebuilding can produce different bytes. Requires environment-specific gates. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "CI: Integration validation. Passing tests have a defined coverage limit.",
      "Artifact: Immutable deployable output. Rebuilding can produce different bytes.",
      "Promotion: Move tested output toward deployment. Requires environment-specific gates."
    ],
    "mechanism": [
      "Validate schema, render and test the proposed revision.",
      "Store the exact artifact and review its plan.",
      "Promote to a canary, verify and either expand or restore the captured baseline."
    ],
    "flow": [
      [
        "Operation and scope",
        "A validated configuration artifact is rebuilt during deployment."
      ],
      [
        "CI",
        "Validate schema, render and test the proposed revision."
      ],
      [
        "Artifact",
        "Store the exact artifact and review its plan."
      ],
      [
        "Promotion",
        "Promote to a canary, verify and either expand or restore the captured baseline."
      ]
    ],
    "comparison": [
      [
        "CI",
        "Integration validation",
        "Passing tests have a defined coverage limit"
      ],
      [
        "Artifact",
        "Immutable deployable output",
        "Rebuilding can produce different bytes"
      ],
      [
        "Promotion",
        "Move tested output toward deployment",
        "Requires environment-specific gates"
      ]
    ],
    "example": "Worked incident: A validated configuration artifact is rebuilt during deployment. Failure: A changed dependency produces different bytes from the tested artifact. Recovery: Promote the stored digest-identified artifact and fail if its identity differs from the approved one. The key distinction is illustrated by this question: Why separate build from promotion? To preserve the tested artifact. A second build is new evidence scope. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g5-t6",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Validate schema, render and test the proposed revision. Store the exact artifact and review its plan. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A changed dependency produces different bytes from the tested artifact. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Promote the stored digest-identified artifact and fail if its identity differs from the approved one.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Promote to a canary, verify and either expand or restore the captured baseline. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Passing tests have a defined coverage limit. Requires environment-specific gates. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Store the exact artifact and review its plan. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A changed dependency produces different bytes from the tested artifact.",
        "Promote the stored digest-identified artifact and fail if its identity differs from the approved one."
      ],
      [
        "What should a failed canary do?",
        "Stop expansion and invoke the tested recovery path. Do not continue to meet a schedule."
      ],
      [
        "Does continuous delivery require automatic production deployment?",
        "No. Approval can remain a deployment gate."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A second build is new evidence scope.",
      "Do not continue to meet a schedule.",
      "Approval can remain a deployment gate.",
      "A pipeline exit code alone hides resource state.",
      "Passing tests have a defined coverage limit.",
      "Requires environment-specific gates."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t5"
    ],
    "related": [
      "s9-g6-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated CI/CD concepts failure with an explicit evidence boundary. A validated configuration artifact is rebuilt during deployment.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "CI → Integration validation",
        "Artifact → Immutable deployable output",
        "Promotion → Move tested output toward deployment"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A validated configuration artifact is rebuilt during deployment.",
        "Write a prediction before revealing the baseline explanation. Validate schema, render and test the proposed revision.",
        "Select Fault and locate the first broken handoff. A changed dependency produces different bytes from the tested artifact.",
        "Propose one observation that could disprove your diagnosis. What should a failed canary do?",
        "Select Recovery and compare with the required result. Promote the stored digest-identified artifact and fail if its identity differs from the approved one.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Promote the stored digest-identified artifact and fail if its identity differs from the approved one. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A changed dependency produces different bytes from the tested artifact. Record per-target state and reconcile before retry.",
      "challenge": "How handle partial application? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "CI": "Integration validation. Passing tests have a defined coverage limit.",
      "Artifact": "Immutable deployable output. Rebuilding can produce different bytes.",
      "Promotion": "Move tested output toward deployment. Requires environment-specific gates."
    },
    "sources": [
      {
        "title": "GitHub Actions secure use",
        "url": "https://docs.github.com/en/actions/reference/security/secure-use",
        "checked": "2026-10-09"
      },
      {
        "title": "GitLab protected environments",
        "url": "https://docs.gitlab.com/ci/environments/protected_environments/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g5-t6-QC1",
        "topicId": "s9-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of CI/CD concepts.",
        "answer": "CI/CD links a revision to automated checks and controlled promotion; infrastructure delivery must handle state, credentials and partial changes explicitly.",
        "explanation": "Validate schema, render and test the proposed revision.",
        "testedConcept": "CI"
      },
      {
        "questionId": "s9-g5-t6-QC2",
        "topicId": "s9-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Store the exact artifact and review its plan.",
        "explanation": "Rebuilding can produce different bytes.",
        "testedConcept": "Artifact"
      },
      {
        "questionId": "s9-g5-t6-QC3",
        "topicId": "s9-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Promote the stored digest-identified artifact and fail if its identity differs from the approved one.",
        "explanation": "Promote to a canary, verify and either expand or restore the captured baseline.",
        "testedConcept": "Promotion"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g5-t6-Q1",
        "topicId": "s9-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why separate build from promotion?",
        "answer": "To preserve the tested artifact.",
        "explanation": "A second build is new evidence scope.",
        "testedConcept": "CI"
      },
      {
        "questionId": "s9-g5-t6-Q2",
        "topicId": "s9-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should a failed canary do?",
        "answer": "Stop expansion and invoke the tested recovery path.",
        "explanation": "Do not continue to meet a schedule.",
        "testedConcept": "Artifact"
      },
      {
        "questionId": "s9-g5-t6-Q3",
        "topicId": "s9-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does continuous delivery require automatic production deployment?",
        "answer": "No.",
        "explanation": "Approval can remain a deployment gate.",
        "testedConcept": "Promotion"
      },
      {
        "questionId": "s9-g5-t6-Q4",
        "topicId": "s9-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How handle partial application?",
        "answer": "Record per-target state and reconcile before retry.",
        "explanation": "A pipeline exit code alone hides resource state.",
        "testedConcept": "CI"
      },
      {
        "questionId": "s9-g5-t6-Q5",
        "topicId": "s9-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this CI/CD concepts case.",
        "answer": "A changed dependency produces different bytes from the tested artifact.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g5-t6-Q6",
        "topicId": "s9-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the CI/CD concepts incident?",
        "answer": "Promote the stored digest-identified artifact and fail if its identity differs from the approved one.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g5-t6-Q7",
        "topicId": "s9-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast CI with Artifact.",
        "answer": "Integration validation. Immutable deployable output.",
        "explanation": "Passing tests have a defined coverage limit. Rebuilding can produce different bytes.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g5-t6-Q8",
        "topicId": "s9-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Promotion not establish the entire outcome?",
        "answer": "Requires environment-specific gates.",
        "explanation": "Promote to a canary, verify and either expand or restore the captured baseline.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g5-t6-Q9",
        "topicId": "s9-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A validated configuration artifact is rebuilt during deployment. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g5-t6-Q10",
        "topicId": "s9-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A validated configuration artifact is rebuilt during deployment.",
      "fault": "A changed dependency produces different bytes from the tested artifact.",
      "restore": "Promote the stored digest-identified artifact and fail if its identity differs from the approved one.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 23 evidence workbook",
        "path": "labs/automation-23-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  }
];
