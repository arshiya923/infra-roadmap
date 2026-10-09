window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["22"] = [
  {
    "id": "s9-g0-t0",
    "batch": "22",
    "title": "Python Fundamentals",
    "subtitle": "A three-device inventory must produce three validation records before any deployment.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t0",
    "definition": "Python executes statements using objects, names and control flow; an automation program turns validated input into an explicit result or a reported failure.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A three-device inventory must produce three validation records before any deployment. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Name, Exception, Module. Parse the inventory before selecting any target. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Assignment does not copy a mutable object. Catching everything can hide a failed change. Import-time side effects make tests hazardous. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Name: Binding to an object. Assignment does not copy a mutable object.",
      "Exception: Reported failure in execution. Catching everything can hide a failed change.",
      "Module: Importable namespace. Import-time side effects make tests hazardous."
    ],
    "mechanism": [
      "Parse the inventory before selecting any target.",
      "Validate required values and compute a proposed result in a function.",
      "Return structured evidence; catch expected errors at the command boundary."
    ],
    "flow": [
      [
        "Operation and scope",
        "A three-device inventory must produce three validation records before any deployment."
      ],
      [
        "Name",
        "Parse the inventory before selecting any target."
      ],
      [
        "Exception",
        "Validate required values and compute a proposed result in a function."
      ],
      [
        "Module",
        "Return structured evidence; catch expected errors at the command boundary."
      ]
    ],
    "comparison": [
      [
        "Name",
        "Binding to an object",
        "Assignment does not copy a mutable object"
      ],
      [
        "Exception",
        "Reported failure in execution",
        "Catching everything can hide a failed change"
      ],
      [
        "Module",
        "Importable namespace",
        "Import-time side effects make tests hazardous"
      ]
    ],
    "example": "Worked incident: A three-device inventory must produce three validation records before any deployment. Failure: A broad exception handler prints success after a missing hostname. Recovery: Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output. The key distinction is illustrated by this question: Why separate parsing from deployment? Invalid input must fail before side effects. A pure validation step is easier to inspect and repeat. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "def validate_name(record):\n    name = record.get(\"name\")\n    if not isinstance(name, str) or not name:\n        raise ValueError(\"name is required\")\n    return {\"name\": name, \"valid\": True}\n\nprint(validate_name({\"name\": \"edge-1\"}))\ntry:\n    validate_name({})\nexcept ValueError as error:\n    print(\"Rejected:\", error)\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Parse the inventory before selecting any target. Validate required values and compute a proposed result in a function. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A broad exception handler prints success after a missing hostname. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Return structured evidence; catch expected errors at the command boundary. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Assignment does not copy a mutable object. Import-time side effects make tests hazardous. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Validate required values and compute a proposed result in a function. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A broad exception handler prints success after a missing hostname.",
        "Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output."
      ],
      [
        "Does b = a copy a list?",
        "No; both names reference the same list. Mutating through either name affects the shared object."
      ],
      [
        "Why use a main guard?",
        "Keep CLI execution out of imports. Tests can import functions without starting a change."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A pure validation step is easier to inspect and repeat.",
      "Mutating through either name affects the shared object.",
      "Tests can import functions without starting a change.",
      "Do not mislabel incomplete execution as success.",
      "Assignment does not copy a mutable object.",
      "Import-time side effects make tests hazardous."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "lab-8"
    ],
    "related": [
      "s9-g0-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Python Fundamentals failure with an explicit evidence boundary. A three-device inventory must produce three validation records before any deployment.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Name → Binding to an object",
        "Exception → Reported failure in execution",
        "Module → Importable namespace"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A three-device inventory must produce three validation records before any deployment.",
        "Write a prediction before revealing the baseline explanation. Parse the inventory before selecting any target.",
        "Select Fault and locate the first broken handoff. A broad exception handler prints success after a missing hostname.",
        "Propose one observation that could disprove your diagnosis. Does b = a copy a list?",
        "Select Recovery and compare with the required result. Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A broad exception handler prints success after a missing hostname. Propagate or produce a clear failure with context.",
      "challenge": "What should an unexpected exception do? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Name": "Binding to an object. Assignment does not copy a mutable object.",
      "Exception": "Reported failure in execution. Catching everything can hide a failed change.",
      "Module": "Importable namespace. Import-time side effects make tests hazardous."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t0-QC1",
        "topicId": "s9-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Python Fundamentals.",
        "answer": "Python executes statements using objects, names and control flow; an automation program turns validated input into an explicit result or a reported failure.",
        "explanation": "Parse the inventory before selecting any target.",
        "testedConcept": "Name"
      },
      {
        "questionId": "s9-g0-t0-QC2",
        "topicId": "s9-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Validate required values and compute a proposed result in a function.",
        "explanation": "Catching everything can hide a failed change.",
        "testedConcept": "Exception"
      },
      {
        "questionId": "s9-g0-t0-QC3",
        "topicId": "s9-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.",
        "explanation": "Return structured evidence; catch expected errors at the command boundary.",
        "testedConcept": "Module"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t0-Q1",
        "topicId": "s9-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why separate parsing from deployment?",
        "answer": "Invalid input must fail before side effects.",
        "explanation": "A pure validation step is easier to inspect and repeat.",
        "testedConcept": "Name"
      },
      {
        "questionId": "s9-g0-t0-Q2",
        "topicId": "s9-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does b = a copy a list?",
        "answer": "No; both names reference the same list.",
        "explanation": "Mutating through either name affects the shared object.",
        "testedConcept": "Exception"
      },
      {
        "questionId": "s9-g0-t0-Q3",
        "topicId": "s9-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use a main guard?",
        "answer": "Keep CLI execution out of imports.",
        "explanation": "Tests can import functions without starting a change.",
        "testedConcept": "Module"
      },
      {
        "questionId": "s9-g0-t0-Q4",
        "topicId": "s9-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should an unexpected exception do?",
        "answer": "Propagate or produce a clear failure with context.",
        "explanation": "Do not mislabel incomplete execution as success.",
        "testedConcept": "Name"
      },
      {
        "questionId": "s9-g0-t0-Q5",
        "topicId": "s9-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Python Fundamentals case.",
        "answer": "A broad exception handler prints success after a missing hostname.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t0-Q6",
        "topicId": "s9-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Python Fundamentals incident?",
        "answer": "Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t0-Q7",
        "topicId": "s9-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Name with Exception.",
        "answer": "Binding to an object. Reported failure in execution.",
        "explanation": "Assignment does not copy a mutable object. Catching everything can hide a failed change.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t0-Q8",
        "topicId": "s9-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Module not establish the entire outcome?",
        "answer": "Import-time side effects make tests hazardous.",
        "explanation": "Return structured evidence; catch expected errors at the command boundary.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t0-Q9",
        "topicId": "s9-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A three-device inventory must produce three validation records before any deployment. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t0-Q10",
        "topicId": "s9-g0-t0",
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
      "baseline": "A three-device inventory must produce three validation records before any deployment.",
      "fault": "A broad exception handler prints success after a missing hostname.",
      "restore": "Reject the malformed record with its index and exit unsuccessfully; valid records still produce deterministic output.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t1",
    "batch": "22",
    "title": "Python for Network Engineers",
    "subtitle": "Two lab routers have distinct management addresses and the same intended NTP server.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t1",
    "definition": "Network automation combines inventory, protocol adapters and verification; Python is the coordinator, while device behavior remains platform-specific.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two lab routers have distinct management addresses and the same intended NTP server. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Inventory, Adapter, Postcondition. Resolve approved stable identities and normalize addresses. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Reachability is not ownership. Text commands are not a portable schema. Command delivery alone is insufficient. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Inventory: Identified targets and intent. Reachability is not ownership.",
      "Adapter: Platform-specific operation boundary. Text commands are not a portable schema.",
      "Postcondition: Required observable result. Command delivery alone is insufficient."
    ],
    "mechanism": [
      "Resolve approved stable identities and normalize addresses.",
      "Collect current state with bounded timeouts and authenticate the remote peer.",
      "Compare intended and observed state after a small canary change."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two lab routers have distinct management addresses and the same intended NTP server."
      ],
      [
        "Inventory",
        "Resolve approved stable identities and normalize addresses."
      ],
      [
        "Adapter",
        "Collect current state with bounded timeouts and authenticate the remote peer."
      ],
      [
        "Postcondition",
        "Compare intended and observed state after a small canary change."
      ]
    ],
    "comparison": [
      [
        "Inventory",
        "Identified targets and intent",
        "Reachability is not ownership"
      ],
      [
        "Adapter",
        "Platform-specific operation boundary",
        "Text commands are not a portable schema"
      ],
      [
        "Postcondition",
        "Required observable result",
        "Command delivery alone is insufficient"
      ]
    ],
    "example": "Worked incident: Two lab routers have distinct management addresses and the same intended NTP server. Failure: A loop uses a display name as an address and silently skips an unreachable target. Recovery: Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked. The key distinction is illustrated by this question: Why normalize addresses? To compare actual address values instead of textual formatting. IPv6 has multiple equivalent textual forms. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "from ipaddress import ip_address\n\ninventory = [\"192.0.2.10\", \"2001:db8::10\", \"999.1.1.1\"]\nfor raw in inventory:\n    try:\n        print({\"input\": raw, \"normalized\": str(ip_address(raw))})\n    except ValueError:\n        print({\"input\": raw, \"result\": \"invalid address\"})\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Resolve approved stable identities and normalize addresses. Collect current state with bounded timeouts and authenticate the remote peer. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A loop uses a display name as an address and silently skips an unreachable target. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Compare intended and observed state after a small canary change. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Reachability is not ownership. Command delivery alone is insufficient. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Collect current state with bounded timeouts and authenticate the remote peer. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A loop uses a display name as an address and silently skips an unreachable target.",
        "Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked."
      ],
      [
        "What does an SSH session prove?",
        "Transport authentication and connection, not the requested configuration. A post-read must test intent."
      ],
      [
        "How should partial success be represented?",
        "One outcome per target plus an overall incomplete result. A single success string loses the failed device."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "IPv6 has multiple equivalent textual forms.",
      "A post-read must test intent.",
      "A single success string loses the failed device.",
      "Fast execution can amplify an inventory error.",
      "Reachability is not ownership.",
      "Command delivery alone is insufficient."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t0"
    ],
    "related": [
      "s9-g0-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Python for Network Engineers failure with an explicit evidence boundary. Two lab routers have distinct management addresses and the same intended NTP server.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Inventory → Identified targets and intent",
        "Adapter → Platform-specific operation boundary",
        "Postcondition → Required observable result"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two lab routers have distinct management addresses and the same intended NTP server.",
        "Write a prediction before revealing the baseline explanation. Resolve approved stable identities and normalize addresses.",
        "Select Fault and locate the first broken handoff. A loop uses a display name as an address and silently skips an unreachable target.",
        "Propose one observation that could disprove your diagnosis. What does an SSH session prove?",
        "Select Recovery and compare with the required result. Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A loop uses a display name as an address and silently skips an unreachable target. To bound device load and the size of a mistaken change.",
      "challenge": "Why limit concurrency? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Inventory": "Identified targets and intent. Reachability is not ownership.",
      "Adapter": "Platform-specific operation boundary. Text commands are not a portable schema.",
      "Postcondition": "Required observable result. Command delivery alone is insufficient."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      },
      {
        "title": "Python 3.12 ipaddress",
        "url": "https://docs.python.org/3.12/library/ipaddress.html",
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
        "questionId": "s9-g0-t1-QC1",
        "topicId": "s9-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Python for Network Engineers.",
        "answer": "Network automation combines inventory, protocol adapters and verification; Python is the coordinator, while device behavior remains platform-specific.",
        "explanation": "Resolve approved stable identities and normalize addresses.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g0-t1-QC2",
        "topicId": "s9-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Collect current state with bounded timeouts and authenticate the remote peer.",
        "explanation": "Text commands are not a portable schema.",
        "testedConcept": "Adapter"
      },
      {
        "questionId": "s9-g0-t1-QC3",
        "topicId": "s9-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.",
        "explanation": "Compare intended and observed state after a small canary change.",
        "testedConcept": "Postcondition"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t1-Q1",
        "topicId": "s9-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why normalize addresses?",
        "answer": "To compare actual address values instead of textual formatting.",
        "explanation": "IPv6 has multiple equivalent textual forms.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g0-t1-Q2",
        "topicId": "s9-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does an SSH session prove?",
        "answer": "Transport authentication and connection, not the requested configuration.",
        "explanation": "A post-read must test intent.",
        "testedConcept": "Adapter"
      },
      {
        "questionId": "s9-g0-t1-Q3",
        "topicId": "s9-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How should partial success be represented?",
        "answer": "One outcome per target plus an overall incomplete result.",
        "explanation": "A single success string loses the failed device.",
        "testedConcept": "Postcondition"
      },
      {
        "questionId": "s9-g0-t1-Q4",
        "topicId": "s9-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why limit concurrency?",
        "answer": "To bound device load and the size of a mistaken change.",
        "explanation": "Fast execution can amplify an inventory error.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s9-g0-t1-Q5",
        "topicId": "s9-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Python for Network Engineers case.",
        "answer": "A loop uses a display name as an address and silently skips an unreachable target.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t1-Q6",
        "topicId": "s9-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Python for Network Engineers incident?",
        "answer": "Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t1-Q7",
        "topicId": "s9-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Inventory with Adapter.",
        "answer": "Identified targets and intent. Platform-specific operation boundary.",
        "explanation": "Reachability is not ownership. Text commands are not a portable schema.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t1-Q8",
        "topicId": "s9-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Postcondition not establish the entire outcome?",
        "answer": "Command delivery alone is insufficient.",
        "explanation": "Compare intended and observed state after a small canary change.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t1-Q9",
        "topicId": "s9-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two lab routers have distinct management addresses and the same intended NTP server. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t1-Q10",
        "topicId": "s9-g0-t1",
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
      "baseline": "Two lab routers have distinct management addresses and the same intended NTP server.",
      "fault": "A loop uses a display name as an address and silently skips an unreachable target.",
      "restore": "Validate addresses with ipaddress, retain per-target failures and withhold overall success until both postconditions are checked.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t2",
    "batch": "22",
    "title": "Data types",
    "subtitle": "Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t2",
    "definition": "Data types constrain what values mean and which operations are valid; infrastructure schemas must distinguish text, numbers, booleans, sequences and keyed records.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between String, Boolean, Dictionary. Read raw data without assuming the decoder validated the business schema. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A numeric-looking string is still text. Nonempty text false is truthy in Python. Missing and null are different states. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "String: Text value. A numeric-looking string is still text.",
      "Boolean: True or false value. Nonempty text false is truthy in Python.",
      "Dictionary: Keyed mapping. Missing and null are different states."
    ],
    "mechanism": [
      "Read raw data without assuming the decoder validated the business schema.",
      "Check exact types and allowed ranges for each field.",
      "Normalize once and pass the typed result to later steps."
    ],
    "flow": [
      [
        "Operation and scope",
        "Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094."
      ],
      [
        "String",
        "Read raw data without assuming the decoder validated the business schema."
      ],
      [
        "Boolean",
        "Check exact types and allowed ranges for each field."
      ],
      [
        "Dictionary",
        "Normalize once and pass the typed result to later steps."
      ]
    ],
    "comparison": [
      [
        "String",
        "Text value",
        "A numeric-looking string is still text"
      ],
      [
        "Boolean",
        "True or false value",
        "Nonempty text false is truthy in Python"
      ],
      [
        "Dictionary",
        "Keyed mapping",
        "Missing and null are different states"
      ]
    ],
    "example": "Worked incident: Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094. Failure: The string false enables a branch because it is nonempty. Recovery: Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value. The key distinction is illustrated by this question: Why is bool checked separately from int? Python booleans are instances of int. A naive integer test accepts True as VLAN 1. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "def valid_vlan(value):\n    return type(value) is int and 1 <= value <= 4094\n\nfor value in [20, \"20\", True, 4095]:\n    print(repr(value), valid_vlan(value))\nprint(\"Nonempty text is truthy:\", bool(\"false\"))\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Read raw data without assuming the decoder validated the business schema. Check exact types and allowed ranges for each field. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The string false enables a branch because it is nonempty. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Normalize once and pass the typed result to later steps. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A numeric-looking string is still text. Missing and null are different states. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Check exact types and allowed ranges for each field. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The string false enables a branch because it is nonempty.",
        "Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value."
      ],
      [
        "Can a set replace a device list?",
        "Only when uniqueness matters and ordering is irrelevant. Deployment order needs an explicit sequence."
      ],
      [
        "What differs between missing and null?",
        "Missing omits the field; null supplies an empty value. Defaulting rules must define both cases."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A naive integer test accepts True as VLAN 1.",
      "Deployment order needs an explicit sequence.",
      "Defaulting rules must define both cases.",
      "Arithmetic convenience must not weaken validation.",
      "A numeric-looking string is still text.",
      "Missing and null are different states."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t1"
    ],
    "related": [
      "s9-g0-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Data types failure with an explicit evidence boundary. Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "String → Text value",
        "Boolean → True or false value",
        "Dictionary → Keyed mapping"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094.",
        "Write a prediction before revealing the baseline explanation. Read raw data without assuming the decoder validated the business schema.",
        "Select Fault and locate the first broken handoff. The string false enables a branch because it is nonempty.",
        "Propose one observation that could disprove your diagnosis. Can a set replace a device list?",
        "Select Recovery and compare with the required result. Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The string false enables a branch because it is nonempty. Identifiers require exact integers in a bounded range.",
      "challenge": "Why avoid floats for VLANs? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "String": "Text value. A numeric-looking string is still text.",
      "Boolean": "True or false value. Nonempty text false is truthy in Python.",
      "Dictionary": "Keyed mapping. Missing and null are different states."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t2-QC1",
        "topicId": "s9-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Data types.",
        "answer": "Data types constrain what values mean and which operations are valid; infrastructure schemas must distinguish text, numbers, booleans, sequences and keyed records.",
        "explanation": "Read raw data without assuming the decoder validated the business schema.",
        "testedConcept": "String"
      },
      {
        "questionId": "s9-g0-t2-QC2",
        "topicId": "s9-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Check exact types and allowed ranges for each field.",
        "explanation": "Nonempty text false is truthy in Python.",
        "testedConcept": "Boolean"
      },
      {
        "questionId": "s9-g0-t2-QC3",
        "topicId": "s9-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.",
        "explanation": "Normalize once and pass the typed result to later steps.",
        "testedConcept": "Dictionary"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t2-Q1",
        "topicId": "s9-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is bool checked separately from int?",
        "answer": "Python booleans are instances of int.",
        "explanation": "A naive integer test accepts True as VLAN 1.",
        "testedConcept": "String"
      },
      {
        "questionId": "s9-g0-t2-Q2",
        "topicId": "s9-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can a set replace a device list?",
        "answer": "Only when uniqueness matters and ordering is irrelevant.",
        "explanation": "Deployment order needs an explicit sequence.",
        "testedConcept": "Boolean"
      },
      {
        "questionId": "s9-g0-t2-Q3",
        "topicId": "s9-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What differs between missing and null?",
        "answer": "Missing omits the field; null supplies an empty value.",
        "explanation": "Defaulting rules must define both cases.",
        "testedConcept": "Dictionary"
      },
      {
        "questionId": "s9-g0-t2-Q4",
        "topicId": "s9-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid floats for VLANs?",
        "answer": "Identifiers require exact integers in a bounded range.",
        "explanation": "Arithmetic convenience must not weaken validation.",
        "testedConcept": "String"
      },
      {
        "questionId": "s9-g0-t2-Q5",
        "topicId": "s9-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Data types case.",
        "answer": "The string false enables a branch because it is nonempty.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t2-Q6",
        "topicId": "s9-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Data types incident?",
        "answer": "Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t2-Q7",
        "topicId": "s9-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast String with Boolean.",
        "answer": "Text value. True or false value.",
        "explanation": "A numeric-looking string is still text. Nonempty text false is truthy in Python.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t2-Q8",
        "topicId": "s9-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Dictionary not establish the entire outcome?",
        "answer": "Missing and null are different states.",
        "explanation": "Normalize once and pass the typed result to later steps.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t2-Q9",
        "topicId": "s9-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t2-Q10",
        "topicId": "s9-g0-t2",
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
      "baseline": "Inventory requires enabled as a boolean and vlan as an integer from 1 through 4094.",
      "fault": "The string false enables a branch because it is nonempty.",
      "restore": "Reject string booleans and reject bool values where an integer VLAN is required; preserve false as an explicit value.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t3",
    "batch": "22",
    "title": "Loops",
    "subtitle": "Three devices may each receive at most two read attempts.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t3",
    "definition": "Loops repeat a bounded operation over a collection; safe automation also defines stop conditions, per-item outcomes and retry limits.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Three devices may each receive at most two read attempts. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Iteration, Retry budget, Termination. Freeze the approved target sequence and attempt budget. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. An item failure needs its own record. Retries can repeat side effects. An unbounded loop can overload a target. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Iteration: One pass over an item. An item failure needs its own record.",
      "Retry budget: Maximum repeated attempts. Retries can repeat side effects.",
      "Termination: Condition that ends work. An unbounded loop can overload a target."
    ],
    "mechanism": [
      "Freeze the approved target sequence and attempt budget.",
      "Record each attempt and distinguish retryable transport faults from invalid intent.",
      "Stop on exhausted budget or unsafe state and report unprocessed targets."
    ],
    "flow": [
      [
        "Operation and scope",
        "Three devices may each receive at most two read attempts."
      ],
      [
        "Iteration",
        "Freeze the approved target sequence and attempt budget."
      ],
      [
        "Retry budget",
        "Record each attempt and distinguish retryable transport faults from invalid intent."
      ],
      [
        "Termination",
        "Stop on exhausted budget or unsafe state and report unprocessed targets."
      ]
    ],
    "comparison": [
      [
        "Iteration",
        "One pass over an item",
        "An item failure needs its own record"
      ],
      [
        "Retry budget",
        "Maximum repeated attempts",
        "Retries can repeat side effects"
      ],
      [
        "Termination",
        "Condition that ends work",
        "An unbounded loop can overload a target"
      ]
    ],
    "example": "Worked incident: Three devices may each receive at most two read attempts. Failure: A while loop retries an authentication rejection indefinitely. Recovery: Classify credential rejection as terminal, cap attempts and report the failed identity without its secret. The key distinction is illustrated by this question: How many maximum calls for three targets and two attempts? Six. Count attempts rather than retries to avoid an off-by-one. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "# Synthetic read outcomes; no network calls.\noutcomes = {\"edge-a\": [\"timeout\", \"ok\"], \"edge-b\": [\"denied\", \"ok\"]}\nfor host, replies in outcomes.items():\n    for attempt, reply in enumerate(replies, start=1):\n        print(host, attempt, reply)\n        if reply in (\"ok\", \"denied\"):\n            break\n    else:\n        print(host, \"attempt budget exhausted\")\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Freeze the approved target sequence and attempt budget. Record each attempt and distinguish retryable transport faults from invalid intent. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A while loop retries an authentication rejection indefinitely. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Stop on exhausted budget or unsafe state and report unprocessed targets. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. An item failure needs its own record. An unbounded loop can overload a target. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Record each attempt and distinguish retryable transport faults from invalid intent. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "A while loop retries an authentication rejection indefinitely.",
        "Classify credential rejection as terminal, cap attempts and report the failed identity without its secret."
      ],
      [
        "Should every error be retried?",
        "No; invalid input and authorization rejection need correction. Waiting does not repair policy."
      ],
      [
        "Why avoid removing list items during iteration?",
        "It changes positions and may skip later entries. Build a separate result list."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Count attempts rather than retries to avoid an off-by-one.",
      "Waiting does not repair policy.",
      "Build a separate result list.",
      "Outer target processing needs an explicit policy.",
      "An item failure needs its own record.",
      "An unbounded loop can overload a target."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t2"
    ],
    "related": [
      "s9-g0-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Loops failure with an explicit evidence boundary. Three devices may each receive at most two read attempts.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Iteration → One pass over an item",
        "Retry budget → Maximum repeated attempts",
        "Termination → Condition that ends work"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Three devices may each receive at most two read attempts.",
        "Write a prediction before revealing the baseline explanation. Freeze the approved target sequence and attempt budget.",
        "Select Fault and locate the first broken handoff. A while loop retries an authentication rejection indefinitely.",
        "Propose one observation that could disprove your diagnosis. Should every error be retried?",
        "Select Recovery and compare with the required result. Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Classify credential rejection as terminal, cap attempts and report the failed identity without its secret. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A while loop retries an authentication rejection indefinitely. The innermost enclosing loop.",
      "challenge": "What does break affect? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Iteration": "One pass over an item. An item failure needs its own record.",
      "Retry budget": "Maximum repeated attempts. Retries can repeat side effects.",
      "Termination": "Condition that ends work. An unbounded loop can overload a target."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t3-QC1",
        "topicId": "s9-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Loops.",
        "answer": "Loops repeat a bounded operation over a collection; safe automation also defines stop conditions, per-item outcomes and retry limits.",
        "explanation": "Freeze the approved target sequence and attempt budget.",
        "testedConcept": "Iteration"
      },
      {
        "questionId": "s9-g0-t3-QC2",
        "topicId": "s9-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Record each attempt and distinguish retryable transport faults from invalid intent.",
        "explanation": "Retries can repeat side effects.",
        "testedConcept": "Retry budget"
      },
      {
        "questionId": "s9-g0-t3-QC3",
        "topicId": "s9-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.",
        "explanation": "Stop on exhausted budget or unsafe state and report unprocessed targets.",
        "testedConcept": "Termination"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t3-Q1",
        "topicId": "s9-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many maximum calls for three targets and two attempts?",
        "answer": "Six.",
        "explanation": "Count attempts rather than retries to avoid an off-by-one.",
        "testedConcept": "Iteration"
      },
      {
        "questionId": "s9-g0-t3-Q2",
        "topicId": "s9-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Should every error be retried?",
        "answer": "No; invalid input and authorization rejection need correction.",
        "explanation": "Waiting does not repair policy.",
        "testedConcept": "Retry budget"
      },
      {
        "questionId": "s9-g0-t3-Q3",
        "topicId": "s9-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid removing list items during iteration?",
        "answer": "It changes positions and may skip later entries.",
        "explanation": "Build a separate result list.",
        "testedConcept": "Termination"
      },
      {
        "questionId": "s9-g0-t3-Q4",
        "topicId": "s9-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does break affect?",
        "answer": "The innermost enclosing loop.",
        "explanation": "Outer target processing needs an explicit policy.",
        "testedConcept": "Iteration"
      },
      {
        "questionId": "s9-g0-t3-Q5",
        "topicId": "s9-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Loops case.",
        "answer": "A while loop retries an authentication rejection indefinitely.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t3-Q6",
        "topicId": "s9-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Loops incident?",
        "answer": "Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t3-Q7",
        "topicId": "s9-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Iteration with Retry budget.",
        "answer": "One pass over an item. Maximum repeated attempts.",
        "explanation": "An item failure needs its own record. Retries can repeat side effects.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t3-Q8",
        "topicId": "s9-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Termination not establish the entire outcome?",
        "answer": "An unbounded loop can overload a target.",
        "explanation": "Stop on exhausted budget or unsafe state and report unprocessed targets.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t3-Q9",
        "topicId": "s9-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Three devices may each receive at most two read attempts. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t3-Q10",
        "topicId": "s9-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "Three devices may each receive at most two read attempts.",
      "fault": "A while loop retries an authentication rejection indefinitely.",
      "restore": "Classify credential rejection as terminal, cap attempts and report the failed identity without its secret.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t4",
    "batch": "22",
    "title": "Functions",
    "subtitle": "A planner compares current VLAN 10 with desired VLAN 20 and returns a delta.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t4",
    "definition": "A function gives a named operation explicit inputs and outputs; separating pure planning from side effects makes infrastructure changes testable.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A planner compares current VLAN 10 with desired VLAN 20 and returns a delta. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Parameter, Return value, Side effect. Define the input schema and failure behavior. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Mutable defaults can survive across calls. Printing is not a data contract. Network writes need separate control. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Parameter: Input named by a function. Mutable defaults can survive across calls.",
      "Return value: Explicit function result. Printing is not a data contract.",
      "Side effect: Change outside the function result. Network writes need separate control."
    ],
    "mechanism": [
      "Define the input schema and failure behavior.",
      "Compute a plan without changing the source objects.",
      "Pass the reviewed plan to a separate executor and return evidence."
    ],
    "flow": [
      [
        "Operation and scope",
        "A planner compares current VLAN 10 with desired VLAN 20 and returns a delta."
      ],
      [
        "Parameter",
        "Define the input schema and failure behavior."
      ],
      [
        "Return value",
        "Compute a plan without changing the source objects."
      ],
      [
        "Side effect",
        "Pass the reviewed plan to a separate executor and return evidence."
      ]
    ],
    "comparison": [
      [
        "Parameter",
        "Input named by a function",
        "Mutable defaults can survive across calls"
      ],
      [
        "Return value",
        "Explicit function result",
        "Printing is not a data contract"
      ],
      [
        "Side effect",
        "Change outside the function result",
        "Network writes need separate control"
      ]
    ],
    "example": "Worked incident: A planner compares current VLAN 10 with desired VLAN 20 and returns a delta. Failure: A default list accumulates changes from earlier calls. Recovery: Use a fresh list per call and verify two independent calls return the same single change. The key distinction is illustrated by this question: Why avoid a default list argument? It is created once and can retain mutations. Use None and create a new list inside. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "def plan(current, desired):\n    return {key: value for key, value in desired.items()\n            if key not in current or current[key] != value}\n\nbaseline = {\"vlan\": 10, \"enabled\": True}\ndesired = {\"vlan\": 20, \"enabled\": True}\nprint(plan(baseline, desired))\nprint(plan(desired, desired))\nassert baseline[\"vlan\"] == 10\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define the input schema and failure behavior. Compute a plan without changing the source objects. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A default list accumulates changes from earlier calls. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use a fresh list per call and verify two independent calls return the same single change.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Pass the reviewed plan to a separate executor and return evidence. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Mutable defaults can survive across calls. Network writes need separate control. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Compute a plan without changing the source objects. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A default list accumulates changes from earlier calls.",
        "Use a fresh list per call and verify two independent calls return the same single change."
      ],
      [
        "What makes a planner deterministic?",
        "Equivalent validated inputs yield equivalent plans. Hidden clocks or network calls break this property."
      ],
      [
        "Why return a record rather than print only?",
        "Callers and tests can inspect structured fields. Presentation belongs at the boundary."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Use None and create a new list inside.",
      "Hidden clocks or network calls break this property.",
      "Presentation belongs at the boundary.",
      "Preserving the baseline allows reliable comparison.",
      "Mutable defaults can survive across calls.",
      "Network writes need separate control."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t3"
    ],
    "related": [
      "s9-g0-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Functions failure with an explicit evidence boundary. A planner compares current VLAN 10 with desired VLAN 20 and returns a delta.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Parameter → Input named by a function",
        "Return value → Explicit function result",
        "Side effect → Change outside the function result"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A planner compares current VLAN 10 with desired VLAN 20 and returns a delta.",
        "Write a prediction before revealing the baseline explanation. Define the input schema and failure behavior.",
        "Select Fault and locate the first broken handoff. A default list accumulates changes from earlier calls.",
        "Propose one observation that could disprove your diagnosis. What makes a planner deterministic?",
        "Select Recovery and compare with the required result. Use a fresh list per call and verify two independent calls return the same single change.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use a fresh list per call and verify two independent calls return the same single change. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A default list accumulates changes from earlier calls. No.",
      "challenge": "Must a pure function mutate its input? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Parameter": "Input named by a function. Mutable defaults can survive across calls.",
      "Return value": "Explicit function result. Printing is not a data contract.",
      "Side effect": "Change outside the function result. Network writes need separate control."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t4-QC1",
        "topicId": "s9-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Functions.",
        "answer": "A function gives a named operation explicit inputs and outputs; separating pure planning from side effects makes infrastructure changes testable.",
        "explanation": "Define the input schema and failure behavior.",
        "testedConcept": "Parameter"
      },
      {
        "questionId": "s9-g0-t4-QC2",
        "topicId": "s9-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Compute a plan without changing the source objects.",
        "explanation": "Printing is not a data contract.",
        "testedConcept": "Return value"
      },
      {
        "questionId": "s9-g0-t4-QC3",
        "topicId": "s9-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use a fresh list per call and verify two independent calls return the same single change.",
        "explanation": "Pass the reviewed plan to a separate executor and return evidence.",
        "testedConcept": "Side effect"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t4-Q1",
        "topicId": "s9-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why avoid a default list argument?",
        "answer": "It is created once and can retain mutations.",
        "explanation": "Use None and create a new list inside.",
        "testedConcept": "Parameter"
      },
      {
        "questionId": "s9-g0-t4-Q2",
        "topicId": "s9-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What makes a planner deterministic?",
        "answer": "Equivalent validated inputs yield equivalent plans.",
        "explanation": "Hidden clocks or network calls break this property.",
        "testedConcept": "Return value"
      },
      {
        "questionId": "s9-g0-t4-Q3",
        "topicId": "s9-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why return a record rather than print only?",
        "answer": "Callers and tests can inspect structured fields.",
        "explanation": "Presentation belongs at the boundary.",
        "testedConcept": "Side effect"
      },
      {
        "questionId": "s9-g0-t4-Q4",
        "topicId": "s9-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Must a pure function mutate its input?",
        "answer": "No.",
        "explanation": "Preserving the baseline allows reliable comparison.",
        "testedConcept": "Parameter"
      },
      {
        "questionId": "s9-g0-t4-Q5",
        "topicId": "s9-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Functions case.",
        "answer": "A default list accumulates changes from earlier calls.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t4-Q6",
        "topicId": "s9-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Functions incident?",
        "answer": "Use a fresh list per call and verify two independent calls return the same single change.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t4-Q7",
        "topicId": "s9-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Parameter with Return value.",
        "answer": "Input named by a function. Explicit function result.",
        "explanation": "Mutable defaults can survive across calls. Printing is not a data contract.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t4-Q8",
        "topicId": "s9-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Side effect not establish the entire outcome?",
        "answer": "Network writes need separate control.",
        "explanation": "Pass the reviewed plan to a separate executor and return evidence.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t4-Q9",
        "topicId": "s9-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A planner compares current VLAN 10 with desired VLAN 20 and returns a delta. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t4-Q10",
        "topicId": "s9-g0-t4",
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
      "baseline": "A planner compares current VLAN 10 with desired VLAN 20 and returns a delta.",
      "fault": "A default list accumulates changes from earlier calls.",
      "restore": "Use a fresh list per call and verify two independent calls return the same single change.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t5",
    "batch": "22",
    "title": "Files",
    "subtitle": "An owned UTF-8 intent file contains a site name with non-ASCII characters.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t5",
    "definition": "File handling converts persistent bytes into application data; encoding, ownership and replacement behavior are part of the automation contract.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An owned UTF-8 intent file contains a site name with non-ASCII characters. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Encoding, Context manager, Atomic replacement. Open an explicitly owned file with a declared encoding. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Platform defaults can corrupt non-ASCII text. Closing a file does not undo writes. Filesystem and durability guarantees differ. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Encoding: Mapping between text and bytes. Platform defaults can corrupt non-ASCII text.",
      "Context manager: Guaranteed resource cleanup scope. Closing a file does not undo writes.",
      "Atomic replacement: Single-name replacement step. Filesystem and durability guarantees differ."
    ],
    "mechanism": [
      "Open an explicitly owned file with a declared encoding.",
      "Validate the complete content before staging a replacement.",
      "Replace only the owned destination, then read back and retain rollback bytes."
    ],
    "flow": [
      [
        "Operation and scope",
        "An owned UTF-8 intent file contains a site name with non-ASCII characters."
      ],
      [
        "Encoding",
        "Open an explicitly owned file with a declared encoding."
      ],
      [
        "Context manager",
        "Validate the complete content before staging a replacement."
      ],
      [
        "Atomic replacement",
        "Replace only the owned destination, then read back and retain rollback bytes."
      ]
    ],
    "comparison": [
      [
        "Encoding",
        "Mapping between text and bytes",
        "Platform defaults can corrupt non-ASCII text"
      ],
      [
        "Context manager",
        "Guaranteed resource cleanup scope",
        "Closing a file does not undo writes"
      ],
      [
        "Atomic replacement",
        "Single-name replacement step",
        "Filesystem and durability guarantees differ"
      ]
    ],
    "example": "Worked incident: An owned UTF-8 intent file contains a site name with non-ASCII characters. Failure: A partial write leaves invalid JSON after an interruption. Recovery: Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven. The key distinction is illustrated by this question: Why specify UTF-8? So the byte contract is independent of the host default. Correct display on one machine is not portability. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\n\nwith TemporaryDirectory(prefix=\"infra-file-example-\") as owned:\n    path = Path(owned) / \"intent.txt\"\n    path.write_text(\"site=Tehran\\n\", encoding=\"utf-8\")\n    baseline = path.read_bytes()\n    path.write_text(\"site=Lab\\n\", encoding=\"utf-8\")\n    path.write_bytes(baseline)\n    print(\"restored\", path.read_bytes() == baseline)\nprint(\"cleaned\", not Path(owned).exists())\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Open an explicitly owned file with a declared encoding. Validate the complete content before staging a replacement. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A partial write leaves invalid JSON after an interruption. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Replace only the owned destination, then read back and retain rollback bytes. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Platform defaults can corrupt non-ASCII text. Filesystem and durability guarantees differ. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Validate the complete content before staging a replacement. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A partial write leaves invalid JSON after an interruption.",
        "Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven."
      ],
      [
        "Does with roll back changed bytes?",
        "No; it closes the resource. Rollback requires retained content or another recovery mechanism."
      ],
      [
        "Why validate before replacement?",
        "To avoid installing malformed intent. A successful write can contain unusable data."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Correct display on one machine is not portability.",
      "Rollback requires retained content or another recovery mechanism.",
      "A successful write can contain unusable data.",
      "It does not prove semantic correctness or backup independence.",
      "Platform defaults can corrupt non-ASCII text.",
      "Filesystem and durability guarantees differ."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t4"
    ],
    "related": [
      "s9-g0-t6"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Files failure with an explicit evidence boundary. An owned UTF-8 intent file contains a site name with non-ASCII characters.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Encoding → Mapping between text and bytes",
        "Context manager → Guaranteed resource cleanup scope",
        "Atomic replacement → Single-name replacement step"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An owned UTF-8 intent file contains a site name with non-ASCII characters.",
        "Write a prediction before revealing the baseline explanation. Open an explicitly owned file with a declared encoding.",
        "Select Fault and locate the first broken handoff. A partial write leaves invalid JSON after an interruption.",
        "Propose one observation that could disprove your diagnosis. Does with roll back changed bytes?",
        "Select Recovery and compare with the required result. Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A partial write leaves invalid JSON after an interruption. Byte identity relative to the compared digest.",
      "challenge": "What does a hash prove? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Encoding": "Mapping between text and bytes. Platform defaults can corrupt non-ASCII text.",
      "Context manager": "Guaranteed resource cleanup scope. Closing a file does not undo writes.",
      "Atomic replacement": "Single-name replacement step. Filesystem and durability guarantees differ."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t5-QC1",
        "topicId": "s9-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Files.",
        "answer": "File handling converts persistent bytes into application data; encoding, ownership and replacement behavior are part of the automation contract.",
        "explanation": "Open an explicitly owned file with a declared encoding.",
        "testedConcept": "Encoding"
      },
      {
        "questionId": "s9-g0-t5-QC2",
        "topicId": "s9-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Validate the complete content before staging a replacement.",
        "explanation": "Closing a file does not undo writes.",
        "testedConcept": "Context manager"
      },
      {
        "questionId": "s9-g0-t5-QC3",
        "topicId": "s9-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.",
        "explanation": "Replace only the owned destination, then read back and retain rollback bytes.",
        "testedConcept": "Atomic replacement"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t5-Q1",
        "topicId": "s9-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why specify UTF-8?",
        "answer": "So the byte contract is independent of the host default.",
        "explanation": "Correct display on one machine is not portability.",
        "testedConcept": "Encoding"
      },
      {
        "questionId": "s9-g0-t5-Q2",
        "topicId": "s9-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does with roll back changed bytes?",
        "answer": "No; it closes the resource.",
        "explanation": "Rollback requires retained content or another recovery mechanism.",
        "testedConcept": "Context manager"
      },
      {
        "questionId": "s9-g0-t5-Q3",
        "topicId": "s9-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why validate before replacement?",
        "answer": "To avoid installing malformed intent.",
        "explanation": "A successful write can contain unusable data.",
        "testedConcept": "Atomic replacement"
      },
      {
        "questionId": "s9-g0-t5-Q4",
        "topicId": "s9-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does a hash prove?",
        "answer": "Byte identity relative to the compared digest.",
        "explanation": "It does not prove semantic correctness or backup independence.",
        "testedConcept": "Encoding"
      },
      {
        "questionId": "s9-g0-t5-Q5",
        "topicId": "s9-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Files case.",
        "answer": "A partial write leaves invalid JSON after an interruption.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t5-Q6",
        "topicId": "s9-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Files incident?",
        "answer": "Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t5-Q7",
        "topicId": "s9-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Encoding with Context manager.",
        "answer": "Mapping between text and bytes. Guaranteed resource cleanup scope.",
        "explanation": "Platform defaults can corrupt non-ASCII text. Closing a file does not undo writes.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t5-Q8",
        "topicId": "s9-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Atomic replacement not establish the entire outcome?",
        "answer": "Filesystem and durability guarantees differ.",
        "explanation": "Replace only the owned destination, then read back and retain rollback bytes.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t5-Q9",
        "topicId": "s9-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An owned UTF-8 intent file contains a site name with non-ASCII characters. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t5-Q10",
        "topicId": "s9-g0-t5",
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
      "baseline": "An owned UTF-8 intent file contains a site name with non-ASCII characters.",
      "fault": "A partial write leaves invalid JSON after an interruption.",
      "restore": "Stage and validate a sibling file, replace the owned path and test exact restoration; document that crash durability is not proven.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t6",
    "batch": "22",
    "title": "JSON",
    "subtitle": "A JSON device record declares hostname edge-1 and VLAN 20.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t6",
    "definition": "JSON represents objects, arrays and scalar values; decoding valid JSON is only the first stage of validating infrastructure intent.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A JSON device record declares hostname edge-1 and VLAN 20. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Object, Array, Schema. Decode JSON with a defined duplicate-key policy. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Duplicate keys need an explicit rejection policy. Ordering may or may not be semantically meaningful. Syntax alone does not enforce it. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Object: String-keyed mapping. Duplicate keys need an explicit rejection policy.",
      "Array: Ordered values. Ordering may or may not be semantically meaningful.",
      "Schema: Allowed shape and values. Syntax alone does not enforce it."
    ],
    "mechanism": [
      "Decode JSON with a defined duplicate-key policy.",
      "Reject unknown fields, wrong types and out-of-range values.",
      "Serialize normalized data predictably for review and compare semantic state."
    ],
    "flow": [
      [
        "Operation and scope",
        "A JSON device record declares hostname edge-1 and VLAN 20."
      ],
      [
        "Object",
        "Decode JSON with a defined duplicate-key policy."
      ],
      [
        "Array",
        "Reject unknown fields, wrong types and out-of-range values."
      ],
      [
        "Schema",
        "Serialize normalized data predictably for review and compare semantic state."
      ]
    ],
    "comparison": [
      [
        "Object",
        "String-keyed mapping",
        "Duplicate keys need an explicit rejection policy"
      ],
      [
        "Array",
        "Ordered values",
        "Ordering may or may not be semantically meaningful"
      ],
      [
        "Schema",
        "Allowed shape and values",
        "Syntax alone does not enforce it"
      ]
    ],
    "example": "Worked incident: A JSON device record declares hostname edge-1 and VLAN 20. Failure: Two vlan keys hide conflicting intent under a last-value-wins decoder. Recovery: Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics. The key distinction is illustrated by this question: Is valid JSON necessarily valid inventory? No; the required schema may still be violated. A list of strings can be valid JSON but wrong for a device record. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t6",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "import json\n\ndef unique(pairs):\n    result = {}\n    for key, value in pairs:\n        if key in result:\n            raise ValueError(\"duplicate key: \" + key)\n        result[key] = value\n    return result\n\nprint(json.loads('{\"vlan\": 20}', object_pairs_hook=unique))\ntry:\n    json.loads('{\"vlan\": 10, \"vlan\": 20}', object_pairs_hook=unique)\nexcept ValueError as error:\n    print(\"Rejected:\", error)\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Decode JSON with a defined duplicate-key policy. Reject unknown fields, wrong types and out-of-range values. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Two vlan keys hide conflicting intent under a last-value-wins decoder. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Serialize normalized data predictably for review and compare semantic state. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Duplicate keys need an explicit rejection policy. Syntax alone does not enforce it. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Reject unknown fields, wrong types and out-of-range values. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Two vlan keys hide conflicting intent under a last-value-wins decoder.",
        "Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics."
      ],
      [
        "How does JSON null map to Python?",
        "None. It is not the string null."
      ],
      [
        "Why sort keys for evidence?",
        "To make equivalent mapping output easier to compare. Array order still needs a contract."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "A list of strings can be valid JSON but wrong for a device record.",
      "It is not the string null.",
      "Array order still needs a contract.",
      "Reject ambiguity at the boundary.",
      "Duplicate keys need an explicit rejection policy.",
      "Syntax alone does not enforce it."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t5"
    ],
    "related": [
      "s9-g0-t7"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated JSON failure with an explicit evidence boundary. A JSON device record declares hostname edge-1 and VLAN 20.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Object → String-keyed mapping",
        "Array → Ordered values",
        "Schema → Allowed shape and values"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A JSON device record declares hostname edge-1 and VLAN 20.",
        "Write a prediction before revealing the baseline explanation. Decode JSON with a defined duplicate-key policy.",
        "Select Fault and locate the first broken handoff. Two vlan keys hide conflicting intent under a last-value-wins decoder.",
        "Propose one observation that could disprove your diagnosis. How does JSON null map to Python?",
        "Select Recovery and compare with the required result. Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Two vlan keys hide conflicting intent under a last-value-wins decoder. One consumer may use a different value than another.",
      "challenge": "What is unsafe about permissive duplicate keys? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Object": "String-keyed mapping. Duplicate keys need an explicit rejection policy.",
      "Array": "Ordered values. Ordering may or may not be semantically meaningful.",
      "Schema": "Allowed shape and values. Syntax alone does not enforce it."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g0-t6-QC1",
        "topicId": "s9-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of JSON.",
        "answer": "JSON represents objects, arrays and scalar values; decoding valid JSON is only the first stage of validating infrastructure intent.",
        "explanation": "Decode JSON with a defined duplicate-key policy.",
        "testedConcept": "Object"
      },
      {
        "questionId": "s9-g0-t6-QC2",
        "topicId": "s9-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Reject unknown fields, wrong types and out-of-range values.",
        "explanation": "Ordering may or may not be semantically meaningful.",
        "testedConcept": "Array"
      },
      {
        "questionId": "s9-g0-t6-QC3",
        "topicId": "s9-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.",
        "explanation": "Serialize normalized data predictably for review and compare semantic state.",
        "testedConcept": "Schema"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t6-Q1",
        "topicId": "s9-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is valid JSON necessarily valid inventory?",
        "answer": "No; the required schema may still be violated.",
        "explanation": "A list of strings can be valid JSON but wrong for a device record.",
        "testedConcept": "Object"
      },
      {
        "questionId": "s9-g0-t6-Q2",
        "topicId": "s9-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How does JSON null map to Python?",
        "answer": "None.",
        "explanation": "It is not the string null.",
        "testedConcept": "Array"
      },
      {
        "questionId": "s9-g0-t6-Q3",
        "topicId": "s9-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why sort keys for evidence?",
        "answer": "To make equivalent mapping output easier to compare.",
        "explanation": "Array order still needs a contract.",
        "testedConcept": "Schema"
      },
      {
        "questionId": "s9-g0-t6-Q4",
        "topicId": "s9-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is unsafe about permissive duplicate keys?",
        "answer": "One consumer may use a different value than another.",
        "explanation": "Reject ambiguity at the boundary.",
        "testedConcept": "Object"
      },
      {
        "questionId": "s9-g0-t6-Q5",
        "topicId": "s9-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this JSON case.",
        "answer": "Two vlan keys hide conflicting intent under a last-value-wins decoder.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t6-Q6",
        "topicId": "s9-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the JSON incident?",
        "answer": "Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t6-Q7",
        "topicId": "s9-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Object with Array.",
        "answer": "String-keyed mapping. Ordered values.",
        "explanation": "Duplicate keys need an explicit rejection policy. Ordering may or may not be semantically meaningful.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t6-Q8",
        "topicId": "s9-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Schema not establish the entire outcome?",
        "answer": "Syntax alone does not enforce it.",
        "explanation": "Serialize normalized data predictably for review and compare semantic state.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t6-Q9",
        "topicId": "s9-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A JSON device record declares hostname edge-1 and VLAN 20. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t6-Q10",
        "topicId": "s9-g0-t6",
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
      "baseline": "A JSON device record declares hostname edge-1 and VLAN 20.",
      "fault": "Two vlan keys hide conflicting intent under a last-value-wins decoder.",
      "restore": "Reject duplicate keys before planning; round-trip the normalized record and verify unchanged semantics.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t7",
    "batch": "22",
    "title": "YAML",
    "subtitle": "A playbook inventory contains a text site code and a boolean enabled field.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t7",
    "definition": "YAML is a serialization language with mappings, sequences and scalars; parser version and schema determine how unquoted scalars are interpreted.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A playbook inventory contains a text site code and a boolean enabled field. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Mapping, Scalar, Safe loader. Choose a supported parser and declare its YAML schema behavior. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Indentation changes structure. Implicit typing varies across schemas. Safe loading is not business validation. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Mapping: Key-value collection. Indentation changes structure.",
      "Scalar: Single value. Implicit typing varies across schemas.",
      "Safe loader: Restricted construction policy. Safe loading is not business validation."
    ],
    "mechanism": [
      "Choose a supported parser and declare its YAML schema behavior.",
      "Load without arbitrary object construction and inspect resulting types.",
      "Validate inventory fields and reject ambiguous or duplicate definitions."
    ],
    "flow": [
      [
        "Operation and scope",
        "A playbook inventory contains a text site code and a boolean enabled field."
      ],
      [
        "Mapping",
        "Choose a supported parser and declare its YAML schema behavior."
      ],
      [
        "Scalar",
        "Load without arbitrary object construction and inspect resulting types."
      ],
      [
        "Safe loader",
        "Validate inventory fields and reject ambiguous or duplicate definitions."
      ]
    ],
    "comparison": [
      [
        "Mapping",
        "Key-value collection",
        "Indentation changes structure"
      ],
      [
        "Scalar",
        "Single value",
        "Implicit typing varies across schemas"
      ],
      [
        "Safe loader",
        "Restricted construction policy",
        "Safe loading is not business validation"
      ]
    ],
    "example": "Worked incident: A playbook inventory contains a text site code and a boolean enabled field. Failure: A parser coerces an unquoted identifier into a boolean or number. Recovery: Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser. The key distinction is illustrated by this question: Why quote textual identifiers? To preserve their intended string meaning. Do not rely on all YAML versions sharing implicit typing. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t7",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Choose a supported parser and declare its YAML schema behavior. Load without arbitrary object construction and inspect resulting types. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A parser coerces an unquoted identifier into a boolean or number. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Validate inventory fields and reject ambiguous or duplicate definitions. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Indentation changes structure. Safe loading is not business validation. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Load without arbitrary object construction and inspect resulting types. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A parser coerces an unquoted identifier into a boolean or number.",
        "Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser."
      ],
      [
        "Does indentation matter?",
        "Yes; it determines nesting. A visually nearby variable may belong to another host."
      ],
      [
        "Does safe loading validate VLAN ranges?",
        "No. Construction safety and schema validity are separate."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Do not rely on all YAML versions sharing implicit typing.",
      "A visually nearby variable may belong to another host.",
      "Construction safety and schema validity are separate.",
      "Serialization provides no secrecy.",
      "Indentation changes structure.",
      "Safe loading is not business validation."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t6"
    ],
    "related": [
      "s9-g0-t8"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated YAML failure with an explicit evidence boundary. A playbook inventory contains a text site code and a boolean enabled field.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Mapping → Key-value collection",
        "Scalar → Single value",
        "Safe loader → Restricted construction policy"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A playbook inventory contains a text site code and a boolean enabled field.",
        "Write a prediction before revealing the baseline explanation. Choose a supported parser and declare its YAML schema behavior.",
        "Select Fault and locate the first broken handoff. A parser coerces an unquoted identifier into a boolean or number.",
        "Propose one observation that could disprove your diagnosis. Does indentation matter?",
        "Select Recovery and compare with the required result. Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A parser coerces an unquoted identifier into a boolean or number. No; store references or use an appropriate secret workflow.",
      "challenge": "Should secrets be plain YAML in Git? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Mapping": "Key-value collection. Indentation changes structure.",
      "Scalar": "Single value. Implicit typing varies across schemas.",
      "Safe loader": "Restricted construction policy. Safe loading is not business validation."
    },
    "sources": [
      {
        "title": "YAML 1.2.2 specification",
        "url": "https://yaml.org/spec/1.2.2/",
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
        "questionId": "s9-g0-t7-QC1",
        "topicId": "s9-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of YAML.",
        "answer": "YAML is a serialization language with mappings, sequences and scalars; parser version and schema determine how unquoted scalars are interpreted.",
        "explanation": "Choose a supported parser and declare its YAML schema behavior.",
        "testedConcept": "Mapping"
      },
      {
        "questionId": "s9-g0-t7-QC2",
        "topicId": "s9-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Load without arbitrary object construction and inspect resulting types.",
        "explanation": "Implicit typing varies across schemas.",
        "testedConcept": "Scalar"
      },
      {
        "questionId": "s9-g0-t7-QC3",
        "topicId": "s9-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.",
        "explanation": "Validate inventory fields and reject ambiguous or duplicate definitions.",
        "testedConcept": "Safe loader"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t7-Q1",
        "topicId": "s9-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why quote textual identifiers?",
        "answer": "To preserve their intended string meaning.",
        "explanation": "Do not rely on all YAML versions sharing implicit typing.",
        "testedConcept": "Mapping"
      },
      {
        "questionId": "s9-g0-t7-Q2",
        "topicId": "s9-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does indentation matter?",
        "answer": "Yes; it determines nesting.",
        "explanation": "A visually nearby variable may belong to another host.",
        "testedConcept": "Scalar"
      },
      {
        "questionId": "s9-g0-t7-Q3",
        "topicId": "s9-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does safe loading validate VLAN ranges?",
        "answer": "No.",
        "explanation": "Construction safety and schema validity are separate.",
        "testedConcept": "Safe loader"
      },
      {
        "questionId": "s9-g0-t7-Q4",
        "topicId": "s9-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should secrets be plain YAML in Git?",
        "answer": "No; store references or use an appropriate secret workflow.",
        "explanation": "Serialization provides no secrecy.",
        "testedConcept": "Mapping"
      },
      {
        "questionId": "s9-g0-t7-Q5",
        "topicId": "s9-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this YAML case.",
        "answer": "A parser coerces an unquoted identifier into a boolean or number.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t7-Q6",
        "topicId": "s9-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the YAML incident?",
        "answer": "Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t7-Q7",
        "topicId": "s9-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Mapping with Scalar.",
        "answer": "Key-value collection. Single value.",
        "explanation": "Indentation changes structure. Implicit typing varies across schemas.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t7-Q8",
        "topicId": "s9-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Safe loader not establish the entire outcome?",
        "answer": "Safe loading is not business validation.",
        "explanation": "Validate inventory fields and reject ambiguous or duplicate definitions.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t7-Q9",
        "topicId": "s9-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A playbook inventory contains a text site code and a boolean enabled field. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t7-Q10",
        "topicId": "s9-g0-t7",
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
      "baseline": "A playbook inventory contains a text site code and a boolean enabled field.",
      "fault": "A parser coerces an unquoted identifier into a boolean or number.",
      "restore": "Quote textual identifiers, use actual booleans for flags and test the parsed types with the deployed parser.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g0-t8",
    "batch": "22",
    "title": "Regex",
    "subtitle": "A parser extracts an IPv4-looking field from a synthetic interface line.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g0-t8",
    "definition": "Regular expressions match textual patterns; they are useful for constrained extraction but do not replace semantic validation or structured data models.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A parser extracts an IPv4-looking field from a synthetic interface line. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Anchor, Capture group, Semantic parser. Define the expected whole line or bounded field. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Partial matches may accept extra text. Group success does not validate meaning. An IP-shaped string may be invalid. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Anchor: Constraint on match position. Partial matches may accept extra text.",
      "Capture group: Extracted subexpression. Group success does not validate meaning.",
      "Semantic parser: Validator of a domain value. An IP-shaped string may be invalid."
    ],
    "mechanism": [
      "Define the expected whole line or bounded field.",
      "Match with a small reviewed expression and reject unexpected structure.",
      "Validate captured values with a domain parser before using them."
    ],
    "flow": [
      [
        "Operation and scope",
        "A parser extracts an IPv4-looking field from a synthetic interface line."
      ],
      [
        "Anchor",
        "Define the expected whole line or bounded field."
      ],
      [
        "Capture group",
        "Match with a small reviewed expression and reject unexpected structure."
      ],
      [
        "Semantic parser",
        "Validate captured values with a domain parser before using them."
      ]
    ],
    "comparison": [
      [
        "Anchor",
        "Constraint on match position",
        "Partial matches may accept extra text"
      ],
      [
        "Capture group",
        "Extracted subexpression",
        "Group success does not validate meaning"
      ],
      [
        "Semantic parser",
        "Validator of a domain value",
        "An IP-shaped string may be invalid"
      ]
    ],
    "example": "Worked incident: A parser extracts an IPv4-looking field from a synthetic interface line. Failure: The pattern accepts 999.1.1.1 because it only checks digit groups. Recovery: Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields. The key distinction is illustrated by this question: Why use fullmatch for an entire identifier? It requires the entire string to match. Search can accept an unwanted surrounding payload. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g0-t8",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      },
      {
        "filename": "example.py",
        "platform": "Python 3.10+ standard library; standalone local example",
        "code": "import re\nfrom ipaddress import ip_address\n\nfor line in [\"address=192.0.2.10\", \"address=999.1.1.1\", \"unexpected\"]:\n    match = re.fullmatch(r\"address=([0-9.]+)\", line)\n    try:\n        if not match:\n            raise ValueError(\"unexpected line format\")\n        print(ip_address(match.group(1)))\n    except ValueError:\n        print(\"Rejected:\", line)\n",
        "explanation": "Save as example.py and run python example.py. This executes only local Python operations with synthetic input; the Files example owns and removes a temporary directory.",
        "expected": "Printed valid results and deliberate rejection or restoration evidence. No remote service is contacted."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define the expected whole line or bounded field. Match with a small reviewed expression and reject unexpected structure. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The pattern accepts 999.1.1.1 because it only checks digit groups. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Validate captured values with a domain parser before using them. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Partial matches may accept extra text. An IP-shaped string may be invalid. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Match with a small reviewed expression and reject unexpected structure. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The pattern accepts 999.1.1.1 because it only checks digit groups.",
        "Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields."
      ],
      [
        "Does a dot match a literal dot by default?",
        "No; escape it for that meaning. Metacharacters alter the accepted language."
      ],
      [
        "Why bound input length?",
        "To limit resource use and pathological matching. Untrusted huge input is not a normal fixture."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Search can accept an unwanted surrounding payload.",
      "Metacharacters alter the accepted language.",
      "Untrusted huge input is not a normal fixture.",
      "Human CLI layout can change across releases.",
      "Partial matches may accept extra text.",
      "An IP-shaped string may be invalid."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t7"
    ],
    "related": [
      "s9-g1-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Regex failure with an explicit evidence boundary. A parser extracts an IPv4-looking field from a synthetic interface line.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Anchor → Constraint on match position",
        "Capture group → Extracted subexpression",
        "Semantic parser → Validator of a domain value"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A parser extracts an IPv4-looking field from a synthetic interface line.",
        "Write a prediction before revealing the baseline explanation. Define the expected whole line or bounded field.",
        "Select Fault and locate the first broken handoff. The pattern accepts 999.1.1.1 because it only checks digit groups.",
        "Propose one observation that could disprove your diagnosis. Does a dot match a literal dot by default?",
        "Select Recovery and compare with the required result. Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The pattern accepts 999.1.1.1 because it only checks digit groups. When the device provides a supported schema.",
      "challenge": "When prefer structured output? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Anchor": "Constraint on match position. Partial matches may accept extra text.",
      "Capture group": "Extracted subexpression. Group success does not validate meaning.",
      "Semantic parser": "Validator of a domain value. An IP-shaped string may be invalid."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
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
        "questionId": "s9-g0-t8-QC1",
        "topicId": "s9-g0-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Regex.",
        "answer": "Regular expressions match textual patterns; they are useful for constrained extraction but do not replace semantic validation or structured data models.",
        "explanation": "Define the expected whole line or bounded field.",
        "testedConcept": "Anchor"
      },
      {
        "questionId": "s9-g0-t8-QC2",
        "topicId": "s9-g0-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Match with a small reviewed expression and reject unexpected structure.",
        "explanation": "Group success does not validate meaning.",
        "testedConcept": "Capture group"
      },
      {
        "questionId": "s9-g0-t8-QC3",
        "topicId": "s9-g0-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.",
        "explanation": "Validate captured values with a domain parser before using them.",
        "testedConcept": "Semantic parser"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g0-t8-Q1",
        "topicId": "s9-g0-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why use fullmatch for an entire identifier?",
        "answer": "It requires the entire string to match.",
        "explanation": "Search can accept an unwanted surrounding payload.",
        "testedConcept": "Anchor"
      },
      {
        "questionId": "s9-g0-t8-Q2",
        "topicId": "s9-g0-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a dot match a literal dot by default?",
        "answer": "No; escape it for that meaning.",
        "explanation": "Metacharacters alter the accepted language.",
        "testedConcept": "Capture group"
      },
      {
        "questionId": "s9-g0-t8-Q3",
        "topicId": "s9-g0-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why bound input length?",
        "answer": "To limit resource use and pathological matching.",
        "explanation": "Untrusted huge input is not a normal fixture.",
        "testedConcept": "Semantic parser"
      },
      {
        "questionId": "s9-g0-t8-Q4",
        "topicId": "s9-g0-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "When prefer structured output?",
        "answer": "When the device provides a supported schema.",
        "explanation": "Human CLI layout can change across releases.",
        "testedConcept": "Anchor"
      },
      {
        "questionId": "s9-g0-t8-Q5",
        "topicId": "s9-g0-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Regex case.",
        "answer": "The pattern accepts 999.1.1.1 because it only checks digit groups.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g0-t8-Q6",
        "topicId": "s9-g0-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Regex incident?",
        "answer": "Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g0-t8-Q7",
        "topicId": "s9-g0-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Anchor with Capture group.",
        "answer": "Constraint on match position. Extracted subexpression.",
        "explanation": "Partial matches may accept extra text. Group success does not validate meaning.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g0-t8-Q8",
        "topicId": "s9-g0-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Semantic parser not establish the entire outcome?",
        "answer": "An IP-shaped string may be invalid.",
        "explanation": "Validate captured values with a domain parser before using them.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g0-t8-Q9",
        "topicId": "s9-g0-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A parser extracts an IPv4-looking field from a synthetic interface line. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g0-t8-Q10",
        "topicId": "s9-g0-t8",
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
      "baseline": "A parser extracts an IPv4-looking field from a synthetic interface line.",
      "fault": "The pattern accepts 999.1.1.1 because it only checks digit groups.",
      "restore": "Use regex for extraction and ipaddress for validity; test missing, extra and malformed fields.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t0",
    "batch": "22",
    "title": "APIs",
    "subtitle": "An inventory endpoint returns two pages of approved devices.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t0",
    "definition": "An API is a contract for requests, responses and failures between components; automation depends on its version, identity model and state semantics.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An inventory endpoint returns two pages of approved devices. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Contract, Pagination, Rate limit. Discover the supported endpoint contract and authentication scope. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Undocumented behavior is not a guarantee. One page may omit targets. Concurrency must respect it. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Contract: Inputs outputs and errors. Undocumented behavior is not a guarantee.",
      "Pagination: Partial collection retrieval. One page may omit targets.",
      "Rate limit: Service request budget. Concurrency must respect it."
    ],
    "mechanism": [
      "Discover the supported endpoint contract and authentication scope.",
      "Read all required pages with bounded requests and schema checks.",
      "Apply a reviewed operation and reconcile the returned state with the resource."
    ],
    "flow": [
      [
        "Operation and scope",
        "An inventory endpoint returns two pages of approved devices."
      ],
      [
        "Contract",
        "Discover the supported endpoint contract and authentication scope."
      ],
      [
        "Pagination",
        "Read all required pages with bounded requests and schema checks."
      ],
      [
        "Rate limit",
        "Apply a reviewed operation and reconcile the returned state with the resource."
      ]
    ],
    "comparison": [
      [
        "Contract",
        "Inputs outputs and errors",
        "Undocumented behavior is not a guarantee"
      ],
      [
        "Pagination",
        "Partial collection retrieval",
        "One page may omit targets"
      ],
      [
        "Rate limit",
        "Service request budget",
        "Concurrency must respect it"
      ]
    ],
    "example": "Worked incident: An inventory endpoint returns two pages of approved devices. Failure: Only the first page is processed and the run claims full coverage. Recovery: Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page. The key distinction is illustrated by this question: Why use stable IDs? Names may change or collide. Updates must identify the intended resource. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Discover the supported endpoint contract and authentication scope. Read all required pages with bounded requests and schema checks. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Only the first page is processed and the run claims full coverage. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Apply a reviewed operation and reconcile the returned state with the resource. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Undocumented behavior is not a guarantee. Concurrency must respect it. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Read all required pages with bounded requests and schema checks. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Only the first page is processed and the run claims full coverage.",
        "Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page."
      ],
      [
        "What does a 2xx response establish?",
        "The meaning defined by that status and endpoint. Accepted work may still be asynchronous."
      ],
      [
        "How handle unknown fields?",
        "Follow a versioned schema policy. Silently treating them as instructions is unsafe."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Updates must identify the intended resource.",
      "Accepted work may still be asynchronous.",
      "Silently treating them as instructions is unsafe.",
      "It is more useful than logging a secret token.",
      "Undocumented behavior is not a guarantee.",
      "Concurrency must respect it."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g0-t8"
    ],
    "related": [
      "s9-g1-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated APIs failure with an explicit evidence boundary. An inventory endpoint returns two pages of approved devices.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Contract → Inputs outputs and errors",
        "Pagination → Partial collection retrieval",
        "Rate limit → Service request budget"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An inventory endpoint returns two pages of approved devices.",
        "Write a prediction before revealing the baseline explanation. Discover the supported endpoint contract and authentication scope.",
        "Select Fault and locate the first broken handoff. Only the first page is processed and the run claims full coverage.",
        "Propose one observation that could disprove your diagnosis. What does a 2xx response establish?",
        "Select Recovery and compare with the required result. Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Only the first page is processed and the run claims full coverage. To correlate a client action with server evidence.",
      "challenge": "Why record a request ID? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Contract": "Inputs outputs and errors. Undocumented behavior is not a guarantee.",
      "Pagination": "Partial collection retrieval. One page may omit targets.",
      "Rate limit": "Service request budget. Concurrency must respect it."
    },
    "sources": [
      {
        "title": "RFC 9110 HTTP semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t0-QC1",
        "topicId": "s9-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of APIs.",
        "answer": "An API is a contract for requests, responses and failures between components; automation depends on its version, identity model and state semantics.",
        "explanation": "Discover the supported endpoint contract and authentication scope.",
        "testedConcept": "Contract"
      },
      {
        "questionId": "s9-g1-t0-QC2",
        "topicId": "s9-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Read all required pages with bounded requests and schema checks.",
        "explanation": "One page may omit targets.",
        "testedConcept": "Pagination"
      },
      {
        "questionId": "s9-g1-t0-QC3",
        "topicId": "s9-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.",
        "explanation": "Apply a reviewed operation and reconcile the returned state with the resource.",
        "testedConcept": "Rate limit"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t0-Q1",
        "topicId": "s9-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why use stable IDs?",
        "answer": "Names may change or collide.",
        "explanation": "Updates must identify the intended resource.",
        "testedConcept": "Contract"
      },
      {
        "questionId": "s9-g1-t0-Q2",
        "topicId": "s9-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does a 2xx response establish?",
        "answer": "The meaning defined by that status and endpoint.",
        "explanation": "Accepted work may still be asynchronous.",
        "testedConcept": "Pagination"
      },
      {
        "questionId": "s9-g1-t0-Q3",
        "topicId": "s9-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How handle unknown fields?",
        "answer": "Follow a versioned schema policy.",
        "explanation": "Silently treating them as instructions is unsafe.",
        "testedConcept": "Rate limit"
      },
      {
        "questionId": "s9-g1-t0-Q4",
        "topicId": "s9-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record a request ID?",
        "answer": "To correlate a client action with server evidence.",
        "explanation": "It is more useful than logging a secret token.",
        "testedConcept": "Contract"
      },
      {
        "questionId": "s9-g1-t0-Q5",
        "topicId": "s9-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this APIs case.",
        "answer": "Only the first page is processed and the run claims full coverage.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t0-Q6",
        "topicId": "s9-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the APIs incident?",
        "answer": "Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t0-Q7",
        "topicId": "s9-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Contract with Pagination.",
        "answer": "Inputs outputs and errors. Partial collection retrieval.",
        "explanation": "Undocumented behavior is not a guarantee. One page may omit targets.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t0-Q8",
        "topicId": "s9-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Rate limit not establish the entire outcome?",
        "answer": "Concurrency must respect it.",
        "explanation": "Apply a reviewed operation and reconcile the returned state with the resource.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t0-Q9",
        "topicId": "s9-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An inventory endpoint returns two pages of approved devices. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t0-Q10",
        "topicId": "s9-g1-t0",
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
      "baseline": "An inventory endpoint returns two pages of approved devices.",
      "fault": "Only the first page is processed and the run claims full coverage.",
      "restore": "Follow the documented next-page token, deduplicate stable IDs and report total coverage and any incomplete page.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t1",
    "batch": "22",
    "title": "REST APIs",
    "subtitle": "Two operators edit the same interface description.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t1",
    "definition": "REST-style APIs expose resources through representations and HTTP semantics; resource state and transport success must be interpreted separately.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two operators edit the same interface description. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Resource, Representation, Validator. Read the resource representation and its version marker. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. URL shape alone does not prove REST constraints. May be partial or stale. Preconditions prevent lost updates. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Resource: Identified service object. URL shape alone does not prove REST constraints.",
      "Representation: Transferred view of state. May be partial or stale.",
      "Validator: Version marker such as ETag. Preconditions prevent lost updates."
    ],
    "mechanism": [
      "Read the resource representation and its version marker.",
      "Compute a minimal intended change against that observed version.",
      "Send the documented conditional operation and re-read after success."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two operators edit the same interface description."
      ],
      [
        "Resource",
        "Read the resource representation and its version marker."
      ],
      [
        "Representation",
        "Compute a minimal intended change against that observed version."
      ],
      [
        "Validator",
        "Send the documented conditional operation and re-read after success."
      ]
    ],
    "comparison": [
      [
        "Resource",
        "Identified service object",
        "URL shape alone does not prove REST constraints"
      ],
      [
        "Representation",
        "Transferred view of state",
        "May be partial or stale"
      ],
      [
        "Validator",
        "Version marker such as ETag",
        "Preconditions prevent lost updates"
      ]
    ],
    "example": "Worked incident: Two operators edit the same interface description. Failure: The second writer overwrites a change based on a stale representation. Recovery: Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry. The key distinction is illustrated by this question: Why distinguish resource from representation? A response may expose only part of the resource. Replacing it blindly can erase unobserved fields. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Read the resource representation and its version marker. Compute a minimal intended change against that observed version. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The second writer overwrites a change based on a stale representation. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Send the documented conditional operation and re-read after success. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. URL shape alone does not prove REST constraints. Preconditions prevent lost updates. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Compute a minimal intended change against that observed version. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The second writer overwrites a change based on a stale representation.",
        "Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry."
      ],
      [
        "What does 412 indicate for If-Match?",
        "The supplied precondition failed. Refresh state before proposing a new write."
      ],
      [
        "Is every JSON-over-HTTP endpoint RESTful?",
        "No. Encoding is independent of architectural constraints."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Replacing it blindly can erase unobserved fields.",
      "Refresh state before proposing a new write.",
      "Encoding is independent of architectural constraints.",
      "A transport response may not capture eventual convergence.",
      "URL shape alone does not prove REST constraints.",
      "Preconditions prevent lost updates."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t0"
    ],
    "related": [
      "s9-g1-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated REST APIs failure with an explicit evidence boundary. Two operators edit the same interface description.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Resource → Identified service object",
        "Representation → Transferred view of state",
        "Validator → Version marker such as ETag"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two operators edit the same interface description.",
        "Write a prediction before revealing the baseline explanation. Read the resource representation and its version marker.",
        "Select Fault and locate the first broken handoff. The second writer overwrites a change based on a stale representation.",
        "Propose one observation that could disprove your diagnosis. What does 412 indicate for If-Match?",
        "Select Recovery and compare with the required result. Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The second writer overwrites a change based on a stale representation. To confirm the intended observable state.",
      "challenge": "Why re-read after a write? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Resource": "Identified service object. URL shape alone does not prove REST constraints.",
      "Representation": "Transferred view of state. May be partial or stale.",
      "Validator": "Version marker such as ETag. Preconditions prevent lost updates."
    },
    "sources": [
      {
        "title": "RFC 9110 HTTP semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t1-QC1",
        "topicId": "s9-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of REST APIs.",
        "answer": "REST-style APIs expose resources through representations and HTTP semantics; resource state and transport success must be interpreted separately.",
        "explanation": "Read the resource representation and its version marker.",
        "testedConcept": "Resource"
      },
      {
        "questionId": "s9-g1-t1-QC2",
        "topicId": "s9-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Compute a minimal intended change against that observed version.",
        "explanation": "May be partial or stale.",
        "testedConcept": "Representation"
      },
      {
        "questionId": "s9-g1-t1-QC3",
        "topicId": "s9-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.",
        "explanation": "Send the documented conditional operation and re-read after success.",
        "testedConcept": "Validator"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t1-Q1",
        "topicId": "s9-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why distinguish resource from representation?",
        "answer": "A response may expose only part of the resource.",
        "explanation": "Replacing it blindly can erase unobserved fields.",
        "testedConcept": "Resource"
      },
      {
        "questionId": "s9-g1-t1-Q2",
        "topicId": "s9-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does 412 indicate for If-Match?",
        "answer": "The supplied precondition failed.",
        "explanation": "Refresh state before proposing a new write.",
        "testedConcept": "Representation"
      },
      {
        "questionId": "s9-g1-t1-Q3",
        "topicId": "s9-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is every JSON-over-HTTP endpoint RESTful?",
        "answer": "No.",
        "explanation": "Encoding is independent of architectural constraints.",
        "testedConcept": "Validator"
      },
      {
        "questionId": "s9-g1-t1-Q4",
        "topicId": "s9-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why re-read after a write?",
        "answer": "To confirm the intended observable state.",
        "explanation": "A transport response may not capture eventual convergence.",
        "testedConcept": "Resource"
      },
      {
        "questionId": "s9-g1-t1-Q5",
        "topicId": "s9-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this REST APIs case.",
        "answer": "The second writer overwrites a change based on a stale representation.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t1-Q6",
        "topicId": "s9-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the REST APIs incident?",
        "answer": "Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t1-Q7",
        "topicId": "s9-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Resource with Representation.",
        "answer": "Identified service object. Transferred view of state.",
        "explanation": "URL shape alone does not prove REST constraints. May be partial or stale.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t1-Q8",
        "topicId": "s9-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Validator not establish the entire outcome?",
        "answer": "Preconditions prevent lost updates.",
        "explanation": "Send the documented conditional operation and re-read after success.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t1-Q9",
        "topicId": "s9-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two operators edit the same interface description. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t1-Q10",
        "topicId": "s9-g1-t1",
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
      "baseline": "Two operators edit the same interface description.",
      "fault": "The second writer overwrites a change based on a stale representation.",
      "restore": "Use a supported If-Match precondition; on conflict re-read and review a new plan rather than blindly retry.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t2",
    "batch": "22",
    "title": "HTTP methods",
    "subtitle": "A resource-creation POST times out after the server may have accepted it.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t2",
    "definition": "HTTP methods have defined semantics for reading, replacing and processing resource representations; retry safety depends on both those semantics and the endpoint contract.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A resource-creation POST times out after the server may have accepted it. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Safe, Idempotent, Conditional request. Select the method prescribed by the endpoint. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Incidental logging can still occur. Responses can differ. Support must be confirmed. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Safe: Intended read-only semantics. Incidental logging can still occur.",
      "Idempotent: Repeated intended effect is equivalent. Responses can differ.",
      "Conditional request: Operation guarded by a validator. Support must be confirmed."
    ],
    "mechanism": [
      "Select the method prescribed by the endpoint.",
      "Distinguish a received failure from a lost response with unknown outcome.",
      "Retry only under an appropriate idempotency or reconciliation strategy."
    ],
    "flow": [
      [
        "Operation and scope",
        "A resource-creation POST times out after the server may have accepted it."
      ],
      [
        "Safe",
        "Select the method prescribed by the endpoint."
      ],
      [
        "Idempotent",
        "Distinguish a received failure from a lost response with unknown outcome."
      ],
      [
        "Conditional request",
        "Retry only under an appropriate idempotency or reconciliation strategy."
      ]
    ],
    "comparison": [
      [
        "Safe",
        "Intended read-only semantics",
        "Incidental logging can still occur"
      ],
      [
        "Idempotent",
        "Repeated intended effect is equivalent",
        "Responses can differ"
      ],
      [
        "Conditional request",
        "Operation guarded by a validator",
        "Support must be confirmed"
      ]
    ],
    "example": "Worked incident: A resource-creation POST times out after the server may have accepted it. Failure: Blind retry creates a duplicate device record. Recovery: Reconcile by stable identity or use a documented idempotency key before resubmission. The key distinction is illustrated by this question: Are GET and HEAD safe? Yes under HTTP semantics. Do not design state-changing actions behind them. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Select the method prescribed by the endpoint. Distinguish a received failure from a lost response with unknown outcome. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Blind retry creates a duplicate device record. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Reconcile by stable identity or use a documented idempotency key before resubmission.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Retry only under an appropriate idempotency or reconciliation strategy. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Incidental logging can still occur. Support must be confirmed. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Distinguish a received failure from a lost response with unknown outcome. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "Blind retry creates a duplicate device record.",
        "Reconcile by stable identity or use a documented idempotency key before resubmission."
      ],
      [
        "Is PUT idempotent?",
        "Its intended effect is idempotent. The second response need not be identical."
      ],
      [
        "Is PATCH universally idempotent?",
        "No; it depends on the patch operation. Incrementing a value differs from assigning one."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Do not design state-changing actions behind them.",
      "The second response need not be identical.",
      "Incrementing a value differs from assigning one.",
      "Observe state before another non-idempotent request.",
      "Incidental logging can still occur.",
      "Support must be confirmed."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t1"
    ],
    "related": [
      "s9-g1-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated HTTP methods failure with an explicit evidence boundary. A resource-creation POST times out after the server may have accepted it.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Safe → Intended read-only semantics",
        "Idempotent → Repeated intended effect is equivalent",
        "Conditional request → Operation guarded by a validator"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A resource-creation POST times out after the server may have accepted it.",
        "Write a prediction before revealing the baseline explanation. Select the method prescribed by the endpoint.",
        "Select Fault and locate the first broken handoff. Blind retry creates a duplicate device record.",
        "Propose one observation that could disprove your diagnosis. Is PUT idempotent?",
        "Select Recovery and compare with the required result. Reconcile by stable identity or use a documented idempotency key before resubmission.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Reconcile by stable identity or use a documented idempotency key before resubmission. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Blind retry creates a duplicate device record. The server may have acted before the response was lost.",
      "challenge": "Why is timeout not proof of failure? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Safe": "Intended read-only semantics. Incidental logging can still occur.",
      "Idempotent": "Repeated intended effect is equivalent. Responses can differ.",
      "Conditional request": "Operation guarded by a validator. Support must be confirmed."
    },
    "sources": [
      {
        "title": "RFC 9110 HTTP semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t2-QC1",
        "topicId": "s9-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of HTTP methods.",
        "answer": "HTTP methods have defined semantics for reading, replacing and processing resource representations; retry safety depends on both those semantics and the endpoint contract.",
        "explanation": "Select the method prescribed by the endpoint.",
        "testedConcept": "Safe"
      },
      {
        "questionId": "s9-g1-t2-QC2",
        "topicId": "s9-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Distinguish a received failure from a lost response with unknown outcome.",
        "explanation": "Responses can differ.",
        "testedConcept": "Idempotent"
      },
      {
        "questionId": "s9-g1-t2-QC3",
        "topicId": "s9-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Reconcile by stable identity or use a documented idempotency key before resubmission.",
        "explanation": "Retry only under an appropriate idempotency or reconciliation strategy.",
        "testedConcept": "Conditional request"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t2-Q1",
        "topicId": "s9-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Are GET and HEAD safe?",
        "answer": "Yes under HTTP semantics.",
        "explanation": "Do not design state-changing actions behind them.",
        "testedConcept": "Safe"
      },
      {
        "questionId": "s9-g1-t2-Q2",
        "topicId": "s9-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is PUT idempotent?",
        "answer": "Its intended effect is idempotent.",
        "explanation": "The second response need not be identical.",
        "testedConcept": "Idempotent"
      },
      {
        "questionId": "s9-g1-t2-Q3",
        "topicId": "s9-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is PATCH universally idempotent?",
        "answer": "No; it depends on the patch operation.",
        "explanation": "Incrementing a value differs from assigning one.",
        "testedConcept": "Conditional request"
      },
      {
        "questionId": "s9-g1-t2-Q4",
        "topicId": "s9-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is timeout not proof of failure?",
        "answer": "The server may have acted before the response was lost.",
        "explanation": "Observe state before another non-idempotent request.",
        "testedConcept": "Safe"
      },
      {
        "questionId": "s9-g1-t2-Q5",
        "topicId": "s9-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this HTTP methods case.",
        "answer": "Blind retry creates a duplicate device record.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t2-Q6",
        "topicId": "s9-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the HTTP methods incident?",
        "answer": "Reconcile by stable identity or use a documented idempotency key before resubmission.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t2-Q7",
        "topicId": "s9-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Safe with Idempotent.",
        "answer": "Intended read-only semantics. Repeated intended effect is equivalent.",
        "explanation": "Incidental logging can still occur. Responses can differ.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t2-Q8",
        "topicId": "s9-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Conditional request not establish the entire outcome?",
        "answer": "Support must be confirmed.",
        "explanation": "Retry only under an appropriate idempotency or reconciliation strategy.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t2-Q9",
        "topicId": "s9-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A resource-creation POST times out after the server may have accepted it. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t2-Q10",
        "topicId": "s9-g1-t2",
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
      "baseline": "A resource-creation POST times out after the server may have accepted it.",
      "fault": "Blind retry creates a duplicate device record.",
      "restore": "Reconcile by stable identity or use a documented idempotency key before resubmission.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t3",
    "batch": "22",
    "title": "Authentication",
    "subtitle": "A read-only service identity requests inventory over verified TLS.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t3",
    "definition": "Authentication establishes an identity; authorization controls that identity’s actions, while transport security protects the channel and authenticates its peer.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A read-only service identity requests inventory over verified TLS. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Credential, Scope, Peer validation. Retrieve a short-lived least-privilege credential through the approved secret path. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Never place it in evidence logs. A valid token can still lack permission. Encryption alone is insufficient. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Credential: Proof used to establish identity. Never place it in evidence logs.",
      "Scope: Permitted operation set. A valid token can still lack permission.",
      "Peer validation: Checking the remote identity. Encryption alone is insufficient."
    ],
    "mechanism": [
      "Retrieve a short-lived least-privilege credential through the approved secret path.",
      "Validate server identity and send credentials only to the intended endpoint.",
      "Handle expiry and authorization denial distinctly and redact diagnostic records."
    ],
    "flow": [
      [
        "Operation and scope",
        "A read-only service identity requests inventory over verified TLS."
      ],
      [
        "Credential",
        "Retrieve a short-lived least-privilege credential through the approved secret path."
      ],
      [
        "Scope",
        "Validate server identity and send credentials only to the intended endpoint."
      ],
      [
        "Peer validation",
        "Handle expiry and authorization denial distinctly and redact diagnostic records."
      ]
    ],
    "comparison": [
      [
        "Credential",
        "Proof used to establish identity",
        "Never place it in evidence logs"
      ],
      [
        "Scope",
        "Permitted operation set",
        "A valid token can still lack permission"
      ],
      [
        "Peer validation",
        "Checking the remote identity",
        "Encryption alone is insufficient"
      ]
    ],
    "example": "Worked incident: A read-only service identity requests inventory over verified TLS. Failure: A troubleshooting change disables certificate verification and logs the bearer token. Recovery: Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data. The key distinction is illustrated by this question: Does authentication imply write access? No; authorization is separate. Avoid widening scope to conceal a denied operation. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Retrieve a short-lived least-privilege credential through the approved secret path. Validate server identity and send credentials only to the intended endpoint. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A troubleshooting change disables certificate verification and logs the bearer token. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Handle expiry and authorization denial distinctly and redact diagnostic records. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Never place it in evidence logs. Encryption alone is insufficient. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Validate server identity and send credentials only to the intended endpoint. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A troubleshooting change disables certificate verification and logs the bearer token.",
        "Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data."
      ],
      [
        "How differ 401 and 403?",
        "401 concerns authentication requirements; 403 means the server refuses the request. The endpoint may intentionally hide details."
      ],
      [
        "Why rotate after exposure?",
        "Deleting a log does not invalidate a copied credential. Revoke the old capability."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Avoid widening scope to conceal a denied operation.",
      "The endpoint may intentionally hide details.",
      "Revoke the old capability.",
      "A successful read alone cannot verify least privilege.",
      "Never place it in evidence logs.",
      "Encryption alone is insufficient."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t2"
    ],
    "related": [
      "s9-g1-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Authentication failure with an explicit evidence boundary. A read-only service identity requests inventory over verified TLS.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Credential → Proof used to establish identity",
        "Scope → Permitted operation set",
        "Peer validation → Checking the remote identity"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A read-only service identity requests inventory over verified TLS.",
        "Write a prediction before revealing the baseline explanation. Retrieve a short-lived least-privilege credential through the approved secret path.",
        "Select Fault and locate the first broken handoff. A troubleshooting change disables certificate verification and logs the bearer token.",
        "Propose one observation that could disprove your diagnosis. How differ 401 and 403?",
        "Select Recovery and compare with the required result. Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A troubleshooting change disables certificate verification and logs the bearer token. The identity cannot perform the excluded write.",
      "challenge": "What should a negative test demonstrate? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Credential": "Proof used to establish identity. Never place it in evidence logs.",
      "Scope": "Permitted operation set. A valid token can still lack permission.",
      "Peer validation": "Checking the remote identity. Encryption alone is insufficient."
    },
    "sources": [
      {
        "title": "RFC 9110 HTTP semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
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
        "questionId": "s9-g1-t3-QC1",
        "topicId": "s9-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Authentication.",
        "answer": "Authentication establishes an identity; authorization controls that identity’s actions, while transport security protects the channel and authenticates its peer.",
        "explanation": "Retrieve a short-lived least-privilege credential through the approved secret path.",
        "testedConcept": "Credential"
      },
      {
        "questionId": "s9-g1-t3-QC2",
        "topicId": "s9-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Validate server identity and send credentials only to the intended endpoint.",
        "explanation": "A valid token can still lack permission.",
        "testedConcept": "Scope"
      },
      {
        "questionId": "s9-g1-t3-QC3",
        "topicId": "s9-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.",
        "explanation": "Handle expiry and authorization denial distinctly and redact diagnostic records.",
        "testedConcept": "Peer validation"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t3-Q1",
        "topicId": "s9-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does authentication imply write access?",
        "answer": "No; authorization is separate.",
        "explanation": "Avoid widening scope to conceal a denied operation.",
        "testedConcept": "Credential"
      },
      {
        "questionId": "s9-g1-t3-Q2",
        "topicId": "s9-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differ 401 and 403?",
        "answer": "401 concerns authentication requirements; 403 means the server refuses the request.",
        "explanation": "The endpoint may intentionally hide details.",
        "testedConcept": "Scope"
      },
      {
        "questionId": "s9-g1-t3-Q3",
        "topicId": "s9-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why rotate after exposure?",
        "answer": "Deleting a log does not invalidate a copied credential.",
        "explanation": "Revoke the old capability.",
        "testedConcept": "Peer validation"
      },
      {
        "questionId": "s9-g1-t3-Q4",
        "topicId": "s9-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a negative test demonstrate?",
        "answer": "The identity cannot perform the excluded write.",
        "explanation": "A successful read alone cannot verify least privilege.",
        "testedConcept": "Credential"
      },
      {
        "questionId": "s9-g1-t3-Q5",
        "topicId": "s9-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Authentication case.",
        "answer": "A troubleshooting change disables certificate verification and logs the bearer token.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t3-Q6",
        "topicId": "s9-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Authentication incident?",
        "answer": "Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t3-Q7",
        "topicId": "s9-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Credential with Scope.",
        "answer": "Proof used to establish identity. Permitted operation set.",
        "explanation": "Never place it in evidence logs. A valid token can still lack permission.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t3-Q8",
        "topicId": "s9-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Peer validation not establish the entire outcome?",
        "answer": "Encryption alone is insufficient.",
        "explanation": "Handle expiry and authorization denial distinctly and redact diagnostic records.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t3-Q9",
        "topicId": "s9-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A read-only service identity requests inventory over verified TLS. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t3-Q10",
        "topicId": "s9-g1-t3",
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
      "baseline": "A read-only service identity requests inventory over verified TLS.",
      "fault": "A troubleshooting change disables certificate verification and logs the bearer token.",
      "restore": "Restore trust verification, revoke the exposed token and retain only sanitized status and correlation data.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t4",
    "batch": "22",
    "title": "Cisco APIs",
    "subtitle": "An IOS XE lab target is intended to expose model-driven interface data.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t4",
    "definition": "Cisco programmability spans product-specific APIs and model-driven interfaces; IOS XE, NX-OS and controllers must be treated as distinct supported contracts.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An IOS XE lab target is intended to expose model-driven interface data. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Platform, Capability, Model revision. Record product, release and supported API family. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A brand name is not an API schema. Presence must be verified on the target. Paths can vary across revisions. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Platform: Product and software release. A brand name is not an API schema.",
      "Capability: Advertised supported feature. Presence must be verified on the target.",
      "Model revision: Specific data contract. Paths can vary across revisions."
    ],
    "mechanism": [
      "Record product, release and supported API family.",
      "Discover capabilities and model revisions before selecting a request.",
      "Test one read and one denied operation, then validate any proposed change in an owned lab."
    ],
    "flow": [
      [
        "Operation and scope",
        "An IOS XE lab target is intended to expose model-driven interface data."
      ],
      [
        "Platform",
        "Record product, release and supported API family."
      ],
      [
        "Capability",
        "Discover capabilities and model revisions before selecting a request."
      ],
      [
        "Model revision",
        "Test one read and one denied operation, then validate any proposed change in an owned lab."
      ]
    ],
    "comparison": [
      [
        "Platform",
        "Product and software release",
        "A brand name is not an API schema"
      ],
      [
        "Capability",
        "Advertised supported feature",
        "Presence must be verified on the target"
      ],
      [
        "Model revision",
        "Specific data contract",
        "Paths can vary across revisions"
      ]
    ],
    "example": "Worked incident: An IOS XE lab target is intended to expose model-driven interface data. Failure: A request copied from a controller API returns an unknown resource. Recovery: Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication. The key distinction is illustrated by this question: Can an APIC path be assumed on IOS XE? No. Product APIs are not interchangeable. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Record product, release and supported API family. Discover capabilities and model revisions before selecting a request. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A request copied from a controller API returns an unknown resource. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Test one read and one denied operation, then validate any proposed change in an owned lab. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A brand name is not an API schema. Paths can vary across revisions. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Discover capabilities and model revisions before selecting a request. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A request copied from a controller API returns an unknown resource.",
        "Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication."
      ],
      [
        "Why record software release?",
        "Feature and model availability vary. A sample from another release is only a hypothesis."
      ],
      [
        "Does enabling an API authorize all users?",
        "No. Service exposure and access control are separate."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Product APIs are not interchangeable.",
      "A sample from another release is only a hypothesis.",
      "Service exposure and access control are separate.",
      "A working GET is only one prerequisite.",
      "A brand name is not an API schema.",
      "Paths can vary across revisions."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t3"
    ],
    "related": [
      "s9-g1-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Cisco APIs failure with an explicit evidence boundary. An IOS XE lab target is intended to expose model-driven interface data.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Platform → Product and software release",
        "Capability → Advertised supported feature",
        "Model revision → Specific data contract"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An IOS XE lab target is intended to expose model-driven interface data.",
        "Write a prediction before revealing the baseline explanation. Record product, release and supported API family.",
        "Select Fault and locate the first broken handoff. A request copied from a controller API returns an unknown resource.",
        "Propose one observation that could disprove your diagnosis. Why record software release?",
        "Select Recovery and compare with the required result. Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A request copied from a controller API returns an unknown resource. Capabilities, target identity, baseline and a supported rollback path.",
      "challenge": "What evidence precedes a write? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Platform": "Product and software release. A brand name is not an API schema.",
      "Capability": "Advertised supported feature. Presence must be verified on the target.",
      "Model revision": "Specific data contract. Paths can vary across revisions."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 release-specific configuration guides",
        "url": "https://www.cisco.com/c/en/us/support/ios-nx-os-software/ios-xe-17/products-installation-and-configuration-guides-list.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 6241 NETCONF",
        "url": "https://www.rfc-editor.org/rfc/rfc6241.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8040 RESTCONF",
        "url": "https://www.rfc-editor.org/rfc/rfc8040.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t4-QC1",
        "topicId": "s9-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Cisco APIs.",
        "answer": "Cisco programmability spans product-specific APIs and model-driven interfaces; IOS XE, NX-OS and controllers must be treated as distinct supported contracts.",
        "explanation": "Record product, release and supported API family.",
        "testedConcept": "Platform"
      },
      {
        "questionId": "s9-g1-t4-QC2",
        "topicId": "s9-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Discover capabilities and model revisions before selecting a request.",
        "explanation": "Presence must be verified on the target.",
        "testedConcept": "Capability"
      },
      {
        "questionId": "s9-g1-t4-QC3",
        "topicId": "s9-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.",
        "explanation": "Test one read and one denied operation, then validate any proposed change in an owned lab.",
        "testedConcept": "Model revision"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t4-Q1",
        "topicId": "s9-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can an APIC path be assumed on IOS XE?",
        "answer": "No.",
        "explanation": "Product APIs are not interchangeable.",
        "testedConcept": "Platform"
      },
      {
        "questionId": "s9-g1-t4-Q2",
        "topicId": "s9-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why record software release?",
        "answer": "Feature and model availability vary.",
        "explanation": "A sample from another release is only a hypothesis.",
        "testedConcept": "Capability"
      },
      {
        "questionId": "s9-g1-t4-Q3",
        "topicId": "s9-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does enabling an API authorize all users?",
        "answer": "No.",
        "explanation": "Service exposure and access control are separate.",
        "testedConcept": "Model revision"
      },
      {
        "questionId": "s9-g1-t4-Q4",
        "topicId": "s9-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence precedes a write?",
        "answer": "Capabilities, target identity, baseline and a supported rollback path.",
        "explanation": "A working GET is only one prerequisite.",
        "testedConcept": "Platform"
      },
      {
        "questionId": "s9-g1-t4-Q5",
        "topicId": "s9-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Cisco APIs case.",
        "answer": "A request copied from a controller API returns an unknown resource.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t4-Q6",
        "topicId": "s9-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Cisco APIs incident?",
        "answer": "Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t4-Q7",
        "topicId": "s9-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Platform with Capability.",
        "answer": "Product and software release. Advertised supported feature.",
        "explanation": "A brand name is not an API schema. Presence must be verified on the target.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t4-Q8",
        "topicId": "s9-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Model revision not establish the entire outcome?",
        "answer": "Paths can vary across revisions.",
        "explanation": "Test one read and one denied operation, then validate any proposed change in an owned lab.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t4-Q9",
        "topicId": "s9-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An IOS XE lab target is intended to expose model-driven interface data. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t4-Q10",
        "topicId": "s9-g1-t4",
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
      "baseline": "An IOS XE lab target is intended to expose model-driven interface data.",
      "fault": "A request copied from a controller API returns an unknown resource.",
      "restore": "Consult the exact IOS XE release guide and advertised model; fix the contract rather than weakening authentication.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t5",
    "batch": "22",
    "title": "NETCONF",
    "subtitle": "A lab server advertises candidate and confirmed-commit capabilities.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t5",
    "definition": "NETCONF uses structured RPCs and capability-advertised datastore operations to manage network configuration; transactional features are optional capabilities.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A lab server advertises candidate and confirmed-commit capabilities. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between RPC, Candidate, Confirmed commit. Exchange hello capabilities and identify the available datastores. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Inspect rpc-error rather than transport alone. Not every server supports it. Support and timeout behavior must be checked. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "RPC: Structured remote procedure call. Inspect rpc-error rather than transport alone.",
      "Candidate: Editable staging datastore. Not every server supports it.",
      "Confirmed commit: Commit requiring confirmation. Support and timeout behavior must be checked."
    ],
    "mechanism": [
      "Exchange hello capabilities and identify the available datastores.",
      "Lock and edit only according to supported operations; validate the candidate where available.",
      "Commit with an appropriate recovery strategy and verify running and operational state."
    ],
    "flow": [
      [
        "Operation and scope",
        "A lab server advertises candidate and confirmed-commit capabilities."
      ],
      [
        "RPC",
        "Exchange hello capabilities and identify the available datastores."
      ],
      [
        "Candidate",
        "Lock and edit only according to supported operations; validate the candidate where available."
      ],
      [
        "Confirmed commit",
        "Commit with an appropriate recovery strategy and verify running and operational state."
      ]
    ],
    "comparison": [
      [
        "RPC",
        "Structured remote procedure call",
        "Inspect rpc-error rather than transport alone"
      ],
      [
        "Candidate",
        "Editable staging datastore",
        "Not every server supports it"
      ],
      [
        "Confirmed commit",
        "Commit requiring confirmation",
        "Support and timeout behavior must be checked"
      ]
    ],
    "example": "Worked incident: A lab server advertises candidate and confirmed-commit capabilities. Failure: An automation assumes those capabilities on a server that only offers writable-running. Recovery: Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence. The key distinction is illustrated by this question: What does get-config retrieve? Configuration from the selected supported datastore. It is different from a combined operational data read. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Exchange hello capabilities and identify the available datastores. Lock and edit only according to supported operations; validate the candidate where available. Preserve a baseline and review the smallest concrete diff. In this case the failure is: An automation assumes those capabilities on a server that only offers writable-running. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Commit with an appropriate recovery strategy and verify running and operational state. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Inspect rpc-error rather than transport alone. Support and timeout behavior must be checked. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Lock and edit only according to supported operations; validate the candidate where available. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "An automation assumes those capabilities on a server that only offers writable-running.",
        "Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence."
      ],
      [
        "Does an SSH connection prove RPC success?",
        "No; inspect the RPC reply. A structured error can travel over a healthy session."
      ],
      [
        "Why use a lock?",
        "To coordinate concurrent configuration changes. It does not guarantee application correctness."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "It is different from a combined operational data read.",
      "A structured error can travel over a healthy session.",
      "It does not guarantee application correctness.",
      "Verify the intended state before confirming.",
      "Inspect rpc-error rather than transport alone.",
      "Support and timeout behavior must be checked."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t4"
    ],
    "related": [
      "s9-g1-t6"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated NETCONF failure with an explicit evidence boundary. A lab server advertises candidate and confirmed-commit capabilities.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "RPC → Structured remote procedure call",
        "Candidate → Editable staging datastore",
        "Confirmed commit → Commit requiring confirmation"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A lab server advertises candidate and confirmed-commit capabilities.",
        "Write a prediction before revealing the baseline explanation. Exchange hello capabilities and identify the available datastores.",
        "Select Fault and locate the first broken handoff. An automation assumes those capabilities on a server that only offers writable-running.",
        "Propose one observation that could disprove your diagnosis. Does an SSH connection prove RPC success?",
        "Select Recovery and compare with the required result. Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "An automation assumes those capabilities on a server that only offers writable-running. No; it provides a recovery mechanism.",
      "challenge": "Can confirmed commit replace verification? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "RPC": "Structured remote procedure call. Inspect rpc-error rather than transport alone.",
      "Candidate": "Editable staging datastore. Not every server supports it.",
      "Confirmed commit": "Commit requiring confirmation. Support and timeout behavior must be checked."
    },
    "sources": [
      {
        "title": "RFC 6241 NETCONF",
        "url": "https://www.rfc-editor.org/rfc/rfc6241.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t5-QC1",
        "topicId": "s9-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of NETCONF.",
        "answer": "NETCONF uses structured RPCs and capability-advertised datastore operations to manage network configuration; transactional features are optional capabilities.",
        "explanation": "Exchange hello capabilities and identify the available datastores.",
        "testedConcept": "RPC"
      },
      {
        "questionId": "s9-g1-t5-QC2",
        "topicId": "s9-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Lock and edit only according to supported operations; validate the candidate where available.",
        "explanation": "Not every server supports it.",
        "testedConcept": "Candidate"
      },
      {
        "questionId": "s9-g1-t5-QC3",
        "topicId": "s9-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.",
        "explanation": "Commit with an appropriate recovery strategy and verify running and operational state.",
        "testedConcept": "Confirmed commit"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t5-Q1",
        "topicId": "s9-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does get-config retrieve?",
        "answer": "Configuration from the selected supported datastore.",
        "explanation": "It is different from a combined operational data read.",
        "testedConcept": "RPC"
      },
      {
        "questionId": "s9-g1-t5-Q2",
        "topicId": "s9-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an SSH connection prove RPC success?",
        "answer": "No; inspect the RPC reply.",
        "explanation": "A structured error can travel over a healthy session.",
        "testedConcept": "Candidate"
      },
      {
        "questionId": "s9-g1-t5-Q3",
        "topicId": "s9-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use a lock?",
        "answer": "To coordinate concurrent configuration changes.",
        "explanation": "It does not guarantee application correctness.",
        "testedConcept": "Confirmed commit"
      },
      {
        "questionId": "s9-g1-t5-Q4",
        "topicId": "s9-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can confirmed commit replace verification?",
        "answer": "No; it provides a recovery mechanism.",
        "explanation": "Verify the intended state before confirming.",
        "testedConcept": "RPC"
      },
      {
        "questionId": "s9-g1-t5-Q5",
        "topicId": "s9-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this NETCONF case.",
        "answer": "An automation assumes those capabilities on a server that only offers writable-running.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t5-Q6",
        "topicId": "s9-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the NETCONF incident?",
        "answer": "Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t5-Q7",
        "topicId": "s9-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast RPC with Candidate.",
        "answer": "Structured remote procedure call. Editable staging datastore.",
        "explanation": "Inspect rpc-error rather than transport alone. Not every server supports it.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t5-Q8",
        "topicId": "s9-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Confirmed commit not establish the entire outcome?",
        "answer": "Support and timeout behavior must be checked.",
        "explanation": "Commit with an appropriate recovery strategy and verify running and operational state.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t5-Q9",
        "topicId": "s9-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A lab server advertises candidate and confirmed-commit capabilities. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t5-Q10",
        "topicId": "s9-g1-t5",
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
      "baseline": "A lab server advertises candidate and confirmed-commit capabilities.",
      "fault": "An automation assumes those capabilities on a server that only offers writable-running.",
      "restore": "Discover capabilities first and select a supported workflow; do not issue an unsupported commit sequence.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t6",
    "batch": "22",
    "title": "RESTCONF",
    "subtitle": "A client requests a keyed interface using the server’s supported module.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t6",
    "definition": "RESTCONF maps YANG-modeled data and operations onto HTTP resources using defined media types and protocol semantics.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A client requests a keyed interface using the server’s supported module. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between YANG resource, Media type, HTTP status. Discover the RESTCONF root and supported model modules. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Not an arbitrary JSON endpoint. Ordinary JSON labels may be insufficient. Model errors still require interpretation. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "YANG resource: Modeled data addressed through RESTCONF. Not an arbitrary JSON endpoint.",
      "Media type: Encoding contract for modeled data. Ordinary JSON labels may be insufficient.",
      "HTTP status: Protocol result. Model errors still require interpretation."
    ],
    "mechanism": [
      "Discover the RESTCONF root and supported model modules.",
      "Address the correct keyed resource with the required encoding.",
      "Use the documented operation and evaluate status, errors and a follow-up read."
    ],
    "flow": [
      [
        "Operation and scope",
        "A client requests a keyed interface using the server’s supported module."
      ],
      [
        "YANG resource",
        "Discover the RESTCONF root and supported model modules."
      ],
      [
        "Media type",
        "Address the correct keyed resource with the required encoding."
      ],
      [
        "HTTP status",
        "Use the documented operation and evaluate status, errors and a follow-up read."
      ]
    ],
    "comparison": [
      [
        "YANG resource",
        "Modeled data addressed through RESTCONF",
        "Not an arbitrary JSON endpoint"
      ],
      [
        "Media type",
        "Encoding contract for modeled data",
        "Ordinary JSON labels may be insufficient"
      ],
      [
        "HTTP status",
        "Protocol result",
        "Model errors still require interpretation"
      ]
    ],
    "example": "Worked incident: A client requests a keyed interface using the server’s supported module. Failure: The client assumes a guessed path and ignores an error body because TLS succeeded. Recovery: Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource. The key distinction is illustrated by this question: How differs RESTCONF from generic REST? It has standardized YANG-related resource and encoding rules. JSON alone does not provide those rules. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t6",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Discover the RESTCONF root and supported model modules. Address the correct keyed resource with the required encoding. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The client assumes a guessed path and ignores an error body because TLS succeeded. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Use the documented operation and evaluate status, errors and a follow-up read. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Not an arbitrary JSON endpoint. Model errors still require interpretation. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Address the correct keyed resource with the required encoding. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The client assumes a guessed path and ignores an error body because TLS succeeded.",
        "Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource."
      ],
      [
        "Does RESTCONF guarantee candidate transactions?",
        "No. Do not copy NETCONF capability assumptions."
      ],
      [
        "Why escape path keys?",
        "Keys can contain characters with URL meaning. Incorrect encoding selects a different or missing resource."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "JSON alone does not provide those rules.",
      "Do not copy NETCONF capability assumptions.",
      "Incorrect encoding selects a different or missing resource.",
      "Verify effect and policy together.",
      "Not an arbitrary JSON endpoint.",
      "Model errors still require interpretation."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t5"
    ],
    "related": [
      "s9-g1-t7"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated RESTCONF failure with an explicit evidence boundary. A client requests a keyed interface using the server’s supported module.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "YANG resource → Modeled data addressed through RESTCONF",
        "Media type → Encoding contract for modeled data",
        "HTTP status → Protocol result"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A client requests a keyed interface using the server’s supported module.",
        "Write a prediction before revealing the baseline explanation. Discover the RESTCONF root and supported model modules.",
        "Select Fault and locate the first broken handoff. The client assumes a guessed path and ignores an error body because TLS succeeded.",
        "Propose one observation that could disprove your diagnosis. Does RESTCONF guarantee candidate transactions?",
        "Select Recovery and compare with the required result. Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The client assumes a guessed path and ignores an error body because TLS succeeded. Post-read plus an intentionally denied identity or field.",
      "challenge": "What should a write test include? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "YANG resource": "Modeled data addressed through RESTCONF. Not an arbitrary JSON endpoint.",
      "Media type": "Encoding contract for modeled data. Ordinary JSON labels may be insufficient.",
      "HTTP status": "Protocol result. Model errors still require interpretation."
    },
    "sources": [
      {
        "title": "RFC 8040 RESTCONF",
        "url": "https://www.rfc-editor.org/rfc/rfc8040.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 7950 YANG 1.1",
        "url": "https://www.rfc-editor.org/rfc/rfc7950.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t6-QC1",
        "topicId": "s9-g1-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of RESTCONF.",
        "answer": "RESTCONF maps YANG-modeled data and operations onto HTTP resources using defined media types and protocol semantics.",
        "explanation": "Discover the RESTCONF root and supported model modules.",
        "testedConcept": "YANG resource"
      },
      {
        "questionId": "s9-g1-t6-QC2",
        "topicId": "s9-g1-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Address the correct keyed resource with the required encoding.",
        "explanation": "Ordinary JSON labels may be insufficient.",
        "testedConcept": "Media type"
      },
      {
        "questionId": "s9-g1-t6-QC3",
        "topicId": "s9-g1-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.",
        "explanation": "Use the documented operation and evaluate status, errors and a follow-up read.",
        "testedConcept": "HTTP status"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t6-Q1",
        "topicId": "s9-g1-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs RESTCONF from generic REST?",
        "answer": "It has standardized YANG-related resource and encoding rules.",
        "explanation": "JSON alone does not provide those rules.",
        "testedConcept": "YANG resource"
      },
      {
        "questionId": "s9-g1-t6-Q2",
        "topicId": "s9-g1-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does RESTCONF guarantee candidate transactions?",
        "answer": "No.",
        "explanation": "Do not copy NETCONF capability assumptions.",
        "testedConcept": "Media type"
      },
      {
        "questionId": "s9-g1-t6-Q3",
        "topicId": "s9-g1-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why escape path keys?",
        "answer": "Keys can contain characters with URL meaning.",
        "explanation": "Incorrect encoding selects a different or missing resource.",
        "testedConcept": "HTTP status"
      },
      {
        "questionId": "s9-g1-t6-Q4",
        "topicId": "s9-g1-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a write test include?",
        "answer": "Post-read plus an intentionally denied identity or field.",
        "explanation": "Verify effect and policy together.",
        "testedConcept": "YANG resource"
      },
      {
        "questionId": "s9-g1-t6-Q5",
        "topicId": "s9-g1-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this RESTCONF case.",
        "answer": "The client assumes a guessed path and ignores an error body because TLS succeeded.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t6-Q6",
        "topicId": "s9-g1-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the RESTCONF incident?",
        "answer": "Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t6-Q7",
        "topicId": "s9-g1-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast YANG resource with Media type.",
        "answer": "Modeled data addressed through RESTCONF. Encoding contract for modeled data.",
        "explanation": "Not an arbitrary JSON endpoint. Ordinary JSON labels may be insufficient.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t6-Q8",
        "topicId": "s9-g1-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does HTTP status not establish the entire outcome?",
        "answer": "Model errors still require interpretation.",
        "explanation": "Use the documented operation and evaluate status, errors and a follow-up read.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t6-Q9",
        "topicId": "s9-g1-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A client requests a keyed interface using the server’s supported module. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t6-Q10",
        "topicId": "s9-g1-t6",
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
      "baseline": "A client requests a keyed interface using the server’s supported module.",
      "fault": "The client assumes a guessed path and ignores an error body because TLS succeeded.",
      "restore": "Use the discovered root, exact module and key encoding; preserve sanitized error detail and verify the resource.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t7",
    "batch": "22",
    "title": "YANG",
    "subtitle": "A keyed interface entry contains an enabled boolean and a bounded MTU.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t7",
    "definition": "YANG describes the structure, types and constraints of management data; it is a modeling language, not the transport used to read or change that data.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A keyed interface entry contains an enabled boolean and a bounded MTU. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Leaf, List key, Constraint. Identify module name, namespace and revision. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Its constraints still need validation. Display order is not identity. Syntactic JSON can violate it. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Leaf: Single typed data value. Its constraints still need validation.",
      "List key: Identity of a list entry. Display order is not identity.",
      "Constraint: Rule such as range or must. Syntactic JSON can violate it."
    ],
    "mechanism": [
      "Identify module name, namespace and revision.",
      "Resolve the list keys, leaf types and enabled features.",
      "Validate a candidate instance and compare configuration with operational observations."
    ],
    "flow": [
      [
        "Operation and scope",
        "A keyed interface entry contains an enabled boolean and a bounded MTU."
      ],
      [
        "Leaf",
        "Identify module name, namespace and revision."
      ],
      [
        "List key",
        "Resolve the list keys, leaf types and enabled features."
      ],
      [
        "Constraint",
        "Validate a candidate instance and compare configuration with operational observations."
      ]
    ],
    "comparison": [
      [
        "Leaf",
        "Single typed data value",
        "Its constraints still need validation"
      ],
      [
        "List key",
        "Identity of a list entry",
        "Display order is not identity"
      ],
      [
        "Constraint",
        "Rule such as range or must",
        "Syntactic JSON can violate it"
      ]
    ],
    "example": "Worked incident: A keyed interface entry contains an enabled boolean and a bounded MTU. Failure: A client sends a string boolean and an out-of-range MTU. Recovery: Inspect the model and reject the instance before sending; use the exact supported types and ranges. The key distinction is illustrated by this question: Does YANG transmit data? No; protocols such as NETCONF and RESTCONF carry it. Model and transport are separate layers. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t7",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Identify module name, namespace and revision. Resolve the list keys, leaf types and enabled features. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A client sends a string boolean and an out-of-range MTU. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Inspect the model and reject the instance before sending; use the exact supported types and ranges.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Validate a candidate instance and compare configuration with operational observations. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Its constraints still need validation. Syntactic JSON can violate it. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Resolve the list keys, leaf types and enabled features. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A client sends a string boolean and an out-of-range MTU.",
        "Inspect the model and reject the instance before sending; use the exact supported types and ranges."
      ],
      [
        "Why preserve list keys?",
        "They identify the exact entry being managed. Position-based updates are unreliable."
      ],
      [
        "What does config false mean?",
        "The node is state data rather than configurable data. Do not try to write it as intent."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Model and transport are separate layers.",
      "Position-based updates are unreliable.",
      "Do not try to write it as intent.",
      "A model name alone is not a complete contract.",
      "Its constraints still need validation.",
      "Syntactic JSON can violate it."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t6"
    ],
    "related": [
      "s9-g1-t8"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated YANG failure with an explicit evidence boundary. A keyed interface entry contains an enabled boolean and a bounded MTU.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Leaf → Single typed data value",
        "List key → Identity of a list entry",
        "Constraint → Rule such as range or must"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A keyed interface entry contains an enabled boolean and a bounded MTU.",
        "Write a prediction before revealing the baseline explanation. Identify module name, namespace and revision.",
        "Select Fault and locate the first broken handoff. A client sends a string boolean and an out-of-range MTU.",
        "Propose one observation that could disprove your diagnosis. Why preserve list keys?",
        "Select Recovery and compare with the required result. Inspect the model and reject the instance before sending; use the exact supported types and ranges.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Inspect the model and reject the instance before sending; use the exact supported types and ranges. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A client sends a string boolean and an out-of-range MTU. The available schema can change.",
      "challenge": "Why track revisions? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Leaf": "Single typed data value. Its constraints still need validation.",
      "List key": "Identity of a list entry. Display order is not identity.",
      "Constraint": "Rule such as range or must. Syntactic JSON can violate it."
    },
    "sources": [
      {
        "title": "RFC 7950 YANG 1.1",
        "url": "https://www.rfc-editor.org/rfc/rfc7950.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t7-QC1",
        "topicId": "s9-g1-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of YANG.",
        "answer": "YANG describes the structure, types and constraints of management data; it is a modeling language, not the transport used to read or change that data.",
        "explanation": "Identify module name, namespace and revision.",
        "testedConcept": "Leaf"
      },
      {
        "questionId": "s9-g1-t7-QC2",
        "topicId": "s9-g1-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Resolve the list keys, leaf types and enabled features.",
        "explanation": "Display order is not identity.",
        "testedConcept": "List key"
      },
      {
        "questionId": "s9-g1-t7-QC3",
        "topicId": "s9-g1-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Inspect the model and reject the instance before sending; use the exact supported types and ranges.",
        "explanation": "Validate a candidate instance and compare configuration with operational observations.",
        "testedConcept": "Constraint"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t7-Q1",
        "topicId": "s9-g1-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does YANG transmit data?",
        "answer": "No; protocols such as NETCONF and RESTCONF carry it.",
        "explanation": "Model and transport are separate layers.",
        "testedConcept": "Leaf"
      },
      {
        "questionId": "s9-g1-t7-Q2",
        "topicId": "s9-g1-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why preserve list keys?",
        "answer": "They identify the exact entry being managed.",
        "explanation": "Position-based updates are unreliable.",
        "testedConcept": "List key"
      },
      {
        "questionId": "s9-g1-t7-Q3",
        "topicId": "s9-g1-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does config false mean?",
        "answer": "The node is state data rather than configurable data.",
        "explanation": "Do not try to write it as intent.",
        "testedConcept": "Constraint"
      },
      {
        "questionId": "s9-g1-t7-Q4",
        "topicId": "s9-g1-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why track revisions?",
        "answer": "The available schema can change.",
        "explanation": "A model name alone is not a complete contract.",
        "testedConcept": "Leaf"
      },
      {
        "questionId": "s9-g1-t7-Q5",
        "topicId": "s9-g1-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this YANG case.",
        "answer": "A client sends a string boolean and an out-of-range MTU.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t7-Q6",
        "topicId": "s9-g1-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the YANG incident?",
        "answer": "Inspect the model and reject the instance before sending; use the exact supported types and ranges.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t7-Q7",
        "topicId": "s9-g1-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Leaf with List key.",
        "answer": "Single typed data value. Identity of a list entry.",
        "explanation": "Its constraints still need validation. Display order is not identity.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t7-Q8",
        "topicId": "s9-g1-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Constraint not establish the entire outcome?",
        "answer": "Syntactic JSON can violate it.",
        "explanation": "Validate a candidate instance and compare configuration with operational observations.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t7-Q9",
        "topicId": "s9-g1-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A keyed interface entry contains an enabled boolean and a bounded MTU. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t7-Q10",
        "topicId": "s9-g1-t7",
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
      "baseline": "A keyed interface entry contains an enabled boolean and a bounded MTU.",
      "fault": "A client sends a string boolean and an out-of-range MTU.",
      "restore": "Inspect the model and reject the instance before sending; use the exact supported types and ranges.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t8",
    "batch": "22",
    "title": "SNMP automation",
    "subtitle": "An interface octet counter is sampled twice sixty seconds apart.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t8",
    "definition": "SNMP automation queries or receives management data identified by OIDs; secure collection requires explicit security level, access views and counter interpretation.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An interface octet counter is sampled twice sixty seconds apart. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between OID, Counter, AuthPriv. Select an approved read view and authenticated encrypted SNMPv3 profile. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Numeric identity needs MIB context. Wraps and resets affect rates. Access authorization is still separate. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "OID: Identifier in a management information tree. Numeric identity needs MIB context.",
      "Counter: Cumulative measurement. Wraps and resets affect rates.",
      "AuthPriv: Authentication and privacy security level. Access authorization is still separate."
    ],
    "mechanism": [
      "Select an approved read view and authenticated encrypted SNMPv3 profile.",
      "Collect timestamped values and track discontinuities.",
      "Compute rates only over compatible samples and alert on missing evidence."
    ],
    "flow": [
      [
        "Operation and scope",
        "An interface octet counter is sampled twice sixty seconds apart."
      ],
      [
        "OID",
        "Select an approved read view and authenticated encrypted SNMPv3 profile."
      ],
      [
        "Counter",
        "Collect timestamped values and track discontinuities."
      ],
      [
        "AuthPriv",
        "Compute rates only over compatible samples and alert on missing evidence."
      ]
    ],
    "comparison": [
      [
        "OID",
        "Identifier in a management information tree",
        "Numeric identity needs MIB context"
      ],
      [
        "Counter",
        "Cumulative measurement",
        "Wraps and resets affect rates"
      ],
      [
        "AuthPriv",
        "Authentication and privacy security level",
        "Access authorization is still separate"
      ]
    ],
    "example": "Worked incident: An interface octet counter is sampled twice sixty seconds apart. Failure: A device reboot resets the counter and produces a negative naive rate. Recovery: Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline. The key distinction is illustrated by this question: Does an OID value explain its unit? Not alone; consult its MIB definition. Bytes and packets are different quantities. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t8",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Select an approved read view and authenticated encrypted SNMPv3 profile. Collect timestamped values and track discontinuities. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A device reboot resets the counter and produces a negative naive rate. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Compute rates only over compatible samples and alert on missing evidence. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Numeric identity needs MIB context. Access authorization is still separate. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Collect timestamped values and track discontinuities. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "A device reboot resets the counter and produces a negative naive rate.",
        "Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline."
      ],
      [
        "What is the basic rate formula?",
        "Counter delta divided by elapsed time after checking continuity. A reboot invalidates ordinary subtraction."
      ],
      [
        "Are traps guaranteed delivery evidence?",
        "No; delivery and processing need their own monitoring. Silence is ambiguous."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Bytes and packets are different quantities.",
      "A reboot invalidates ordinary subtraction.",
      "Silence is ambiguous.",
      "Keep collection identity limited to required views.",
      "Numeric identity needs MIB context.",
      "Access authorization is still separate."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t7"
    ],
    "related": [
      "s9-g1-t9"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated SNMP automation failure with an explicit evidence boundary. An interface octet counter is sampled twice sixty seconds apart.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "OID → Identifier in a management information tree",
        "Counter → Cumulative measurement",
        "AuthPriv → Authentication and privacy security level"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An interface octet counter is sampled twice sixty seconds apart.",
        "Write a prediction before revealing the baseline explanation. Select an approved read view and authenticated encrypted SNMPv3 profile.",
        "Select Fault and locate the first broken handoff. A device reboot resets the counter and produces a negative naive rate.",
        "Propose one observation that could disprove your diagnosis. What is the basic rate formula?",
        "Select Recovery and compare with the required result. Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A device reboot resets the counter and produces a negative naive rate. Monitoring rarely needs them.",
      "challenge": "Why avoid unrestricted writes? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "OID": "Identifier in a management information tree. Numeric identity needs MIB context.",
      "Counter": "Cumulative measurement. Wraps and resets affect rates.",
      "AuthPriv": "Authentication and privacy security level. Access authorization is still separate."
    },
    "sources": [
      {
        "title": "RFC 3414 SNMPv3 USM",
        "url": "https://www.rfc-editor.org/rfc/rfc3414.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t8-QC1",
        "topicId": "s9-g1-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of SNMP automation.",
        "answer": "SNMP automation queries or receives management data identified by OIDs; secure collection requires explicit security level, access views and counter interpretation.",
        "explanation": "Select an approved read view and authenticated encrypted SNMPv3 profile.",
        "testedConcept": "OID"
      },
      {
        "questionId": "s9-g1-t8-QC2",
        "topicId": "s9-g1-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Collect timestamped values and track discontinuities.",
        "explanation": "Wraps and resets affect rates.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g1-t8-QC3",
        "topicId": "s9-g1-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.",
        "explanation": "Compute rates only over compatible samples and alert on missing evidence.",
        "testedConcept": "AuthPriv"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t8-Q1",
        "topicId": "s9-g1-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an OID value explain its unit?",
        "answer": "Not alone; consult its MIB definition.",
        "explanation": "Bytes and packets are different quantities.",
        "testedConcept": "OID"
      },
      {
        "questionId": "s9-g1-t8-Q2",
        "topicId": "s9-g1-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the basic rate formula?",
        "answer": "Counter delta divided by elapsed time after checking continuity.",
        "explanation": "A reboot invalidates ordinary subtraction.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g1-t8-Q3",
        "topicId": "s9-g1-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Are traps guaranteed delivery evidence?",
        "answer": "No; delivery and processing need their own monitoring.",
        "explanation": "Silence is ambiguous.",
        "testedConcept": "AuthPriv"
      },
      {
        "questionId": "s9-g1-t8-Q4",
        "topicId": "s9-g1-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid unrestricted writes?",
        "answer": "Monitoring rarely needs them.",
        "explanation": "Keep collection identity limited to required views.",
        "testedConcept": "OID"
      },
      {
        "questionId": "s9-g1-t8-Q5",
        "topicId": "s9-g1-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this SNMP automation case.",
        "answer": "A device reboot resets the counter and produces a negative naive rate.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t8-Q6",
        "topicId": "s9-g1-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the SNMP automation incident?",
        "answer": "Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t8-Q7",
        "topicId": "s9-g1-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast OID with Counter.",
        "answer": "Identifier in a management information tree. Cumulative measurement.",
        "explanation": "Numeric identity needs MIB context. Wraps and resets affect rates.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t8-Q8",
        "topicId": "s9-g1-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does AuthPriv not establish the entire outcome?",
        "answer": "Access authorization is still separate.",
        "explanation": "Compute rates only over compatible samples and alert on missing evidence.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t8-Q9",
        "topicId": "s9-g1-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An interface octet counter is sampled twice sixty seconds apart. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t8-Q10",
        "topicId": "s9-g1-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "An interface octet counter is sampled twice sixty seconds apart.",
      "fault": "A device reboot resets the counter and produces a negative naive rate.",
      "restore": "Use discontinuity and uptime evidence; discard the invalid interval and resume with a new baseline.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g1-t9",
    "batch": "22",
    "title": "SSH automation",
    "subtitle": "A lab router returns a prompt after rejecting one command.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g1-t9",
    "definition": "SSH automation operates over an authenticated encrypted channel, but interactive CLI framing, privilege and command semantics remain application concerns.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A lab router returns a prompt after rejecting one command. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Host key, Channel, Privilege. Verify the host key against an approved baseline. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Trust on first sight needs an explicit workflow. Prompt completion is not command correctness. Login and enable contexts can differ. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Host key: Server identity key. Trust on first sight needs an explicit workflow.",
      "Channel: Logical stream inside SSH. Prompt completion is not command correctness.",
      "Privilege: Allowed command context. Login and enable contexts can differ."
    ],
    "mechanism": [
      "Verify the host key against an approved baseline.",
      "Use bounded connection and read behavior with a platform-aware command boundary.",
      "Capture sanitized results, inspect device errors and verify the original operation."
    ],
    "flow": [
      [
        "Operation and scope",
        "A lab router returns a prompt after rejecting one command."
      ],
      [
        "Host key",
        "Verify the host key against an approved baseline."
      ],
      [
        "Channel",
        "Use bounded connection and read behavior with a platform-aware command boundary."
      ],
      [
        "Privilege",
        "Capture sanitized results, inspect device errors and verify the original operation."
      ]
    ],
    "comparison": [
      [
        "Host key",
        "Server identity key",
        "Trust on first sight needs an explicit workflow"
      ],
      [
        "Channel",
        "Logical stream inside SSH",
        "Prompt completion is not command correctness"
      ],
      [
        "Privilege",
        "Allowed command context",
        "Login and enable contexts can differ"
      ]
    ],
    "example": "Worked incident: A lab router returns a prompt after rejecting one command. Failure: The script marks success merely because the prompt reappears. Recovery: Parse the error and compare post-state; keep the rejected command visible as a failure. The key distinction is illustrated by this question: Why reject unknown host keys by default? To avoid trusting an unverified peer. Encryption to an attacker is still unsafe. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g1-t9",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Verify the host key against an approved baseline. Use bounded connection and read behavior with a platform-aware command boundary. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The script marks success merely because the prompt reappears. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Parse the error and compare post-state; keep the rejected command visible as a failure.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Capture sanitized results, inspect device errors and verify the original operation. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Trust on first sight needs an explicit workflow. Login and enable contexts can differ. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Use bounded connection and read behavior with a platform-aware command boundary. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The script marks success merely because the prompt reappears.",
        "Parse the error and compare post-state; keep the rejected command visible as a failure."
      ],
      [
        "Why is a shell prompt insufficient?",
        "It signals readiness, not successful intent. A failed command can return the same prompt."
      ],
      [
        "Should credentials appear in transcripts?",
        "No. Redact sensitive commands and authentication material."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Encryption to an attacker is still unsafe.",
      "A failed command can return the same prompt.",
      "Redact sensitive commands and authentication material.",
      "A slow command may already have executed.",
      "Trust on first sight needs an explicit workflow.",
      "Login and enable contexts can differ."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g1-t8"
    ],
    "related": [
      "s9-g2-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated SSH automation failure with an explicit evidence boundary. A lab router returns a prompt after rejecting one command.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Host key → Server identity key",
        "Channel → Logical stream inside SSH",
        "Privilege → Allowed command context"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A lab router returns a prompt after rejecting one command.",
        "Write a prediction before revealing the baseline explanation. Verify the host key against an approved baseline.",
        "Select Fault and locate the first broken handoff. The script marks success merely because the prompt reappears.",
        "Propose one observation that could disprove your diagnosis. Why is a shell prompt insufficient?",
        "Select Recovery and compare with the required result. Parse the error and compare post-state; keep the rejected command visible as a failure.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Parse the error and compare post-state; keep the rejected command visible as a failure. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The script marks success merely because the prompt reappears. Record unknown completion and inspect state before retrying a write.",
      "challenge": "How handle a read timeout? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Host key": "Server identity key. Trust on first sight needs an explicit workflow.",
      "Channel": "Logical stream inside SSH. Prompt completion is not command correctness.",
      "Privilege": "Allowed command context. Login and enable contexts can differ."
    },
    "sources": [
      {
        "title": "RFC 4253 SSH transport",
        "url": "https://www.rfc-editor.org/rfc/rfc4253.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Paramiko SSHClient contract",
        "url": "https://docs.paramiko.org/en/stable/api/client.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g1-t9-QC1",
        "topicId": "s9-g1-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of SSH automation.",
        "answer": "SSH automation operates over an authenticated encrypted channel, but interactive CLI framing, privilege and command semantics remain application concerns.",
        "explanation": "Verify the host key against an approved baseline.",
        "testedConcept": "Host key"
      },
      {
        "questionId": "s9-g1-t9-QC2",
        "topicId": "s9-g1-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Use bounded connection and read behavior with a platform-aware command boundary.",
        "explanation": "Prompt completion is not command correctness.",
        "testedConcept": "Channel"
      },
      {
        "questionId": "s9-g1-t9-QC3",
        "topicId": "s9-g1-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Parse the error and compare post-state; keep the rejected command visible as a failure.",
        "explanation": "Capture sanitized results, inspect device errors and verify the original operation.",
        "testedConcept": "Privilege"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g1-t9-Q1",
        "topicId": "s9-g1-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why reject unknown host keys by default?",
        "answer": "To avoid trusting an unverified peer.",
        "explanation": "Encryption to an attacker is still unsafe.",
        "testedConcept": "Host key"
      },
      {
        "questionId": "s9-g1-t9-Q2",
        "topicId": "s9-g1-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is a shell prompt insufficient?",
        "answer": "It signals readiness, not successful intent.",
        "explanation": "A failed command can return the same prompt.",
        "testedConcept": "Channel"
      },
      {
        "questionId": "s9-g1-t9-Q3",
        "topicId": "s9-g1-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should credentials appear in transcripts?",
        "answer": "No.",
        "explanation": "Redact sensitive commands and authentication material.",
        "testedConcept": "Privilege"
      },
      {
        "questionId": "s9-g1-t9-Q4",
        "topicId": "s9-g1-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How handle a read timeout?",
        "answer": "Record unknown completion and inspect state before retrying a write.",
        "explanation": "A slow command may already have executed.",
        "testedConcept": "Host key"
      },
      {
        "questionId": "s9-g1-t9-Q5",
        "topicId": "s9-g1-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this SSH automation case.",
        "answer": "The script marks success merely because the prompt reappears.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g1-t9-Q6",
        "topicId": "s9-g1-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the SSH automation incident?",
        "answer": "Parse the error and compare post-state; keep the rejected command visible as a failure.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g1-t9-Q7",
        "topicId": "s9-g1-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Host key with Channel.",
        "answer": "Server identity key. Logical stream inside SSH.",
        "explanation": "Trust on first sight needs an explicit workflow. Prompt completion is not command correctness.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g1-t9-Q8",
        "topicId": "s9-g1-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Privilege not establish the entire outcome?",
        "answer": "Login and enable contexts can differ.",
        "explanation": "Capture sanitized results, inspect device errors and verify the original operation.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g1-t9-Q9",
        "topicId": "s9-g1-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A lab router returns a prompt after rejecting one command. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g1-t9-Q10",
        "topicId": "s9-g1-t9",
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
      "baseline": "A lab router returns a prompt after rejecting one command.",
      "fault": "The script marks success merely because the prompt reappears.",
      "restore": "Parse the error and compare post-state; keep the rejected command visible as a failure.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 22 evidence workbook",
        "path": "labs/automation-22-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  }
];
