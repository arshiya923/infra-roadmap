window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["30"] = [
  {
    "id": "ADD-LINUX-001",
    "subtitle": "Resolve the path and acting identity before changing permissions.",
    "minutes": 45,
    "definition": "Linux access combines process credentials, path traversal, filesystem permissions and additional policy. User and group databases describe identities; package metadata describes installed software. These are distinct sources of evidence when a service cannot read a file or launch a program.",
    "purpose": "Diagnose access failures without broad permission changes. Identify the effective service user, each directory in the path, the file owner/mode and any ACL or security-module restriction. Then use package metadata to determine which software supplied a file and whether a version change belongs in a controlled maintenance plan.",
    "mental": "A file path is a sequence of gates. Permission on the final file cannot bypass a locked parent directory. Mode bits are only one set of gates: ACLs, capabilities, mount restrictions and security modules may change the answer. A successful test as your login user or root is not proof that the service identity has the same access.",
    "components": [
      "Process credentials: effective UID and supplementary groups, which can differ from a fresh login after group changes.",
      "Directory search permission: traversal of every parent before reaching the target.",
      "Owner/group/other mode classes: select the applicable class; do not combine classes or fall back to a more permissive one.",
      "ACLs and security policy: additional rules and masks that require their own inspection.",
      "Package state: installed version, origin, files and update plan; installation does not imply a service is running."
    ],
    "mechanism": [
      "Start with the exact operation: reading bytes, replacing a file, creating an entry or executing a program. These require different permissions. Deleting an entry is primarily a parent-directory operation, subject to sticky-bit and other restrictions.",
      "Resolve the intended path and service credentials. Symlinks can change the target; parent traversal and the service working directory matter. Inspect ownership and mode before making a scoped correction.",
      "Evaluate the applicable ordinary mode class, then check ACLs, security-module policy and mount options. Root or capabilities may bypass ordinary discretionary checks, so the local exercise refuses root.",
      "Make the smallest repair to the owned object and preserve its previous mode/owner. Do not use recursive 777 as a diagnostic shortcut: it exposes data and can hide the original boundary. Verify using the original operation and identity.",
      "Treat package operations as separate changes. Query installed state read-only first, review origin and dependencies, test in a disposable environment and account for service restarts or data migrations. Reverting a package version is not guaranteed to reverse its side effects."
    ],
    "flow": [
      [
        "Identify",
        "Capture effective identity and intended file operation."
      ],
      [
        "Trace",
        "Inspect parent directories, target mode and additional policy."
      ],
      [
        "Repair narrowly",
        "Restore only the owned file mode in the local exercise."
      ],
      [
        "Repeat",
        "Read the original bytes as the same user and verify cleanup."
      ]
    ],
    "comparison": [
      [
        "File read",
        "Access to file contents",
        "Directory traversal must also succeed"
      ],
      [
        "Directory read/search",
        "List names / traverse known entries",
        "Read and search are distinct permissions"
      ],
      [
        "Installed package",
        "Package manager records a version",
        "It need not be running or configured"
      ],
      [
        "sudo",
        "Runs a permitted command under another identity",
        "Authorization must remain scoped and attributable"
      ]
    ],
    "example": "The Linux companion creates a config file on the Linux temporary filesystem under your ordinary UID. It reads at mode 640, changes the owned file to 000, observes PermissionError, restores 640 in a finally block and confirms identical bytes. It does not test another user, an ACL, sudo policy or an application sandbox.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+ / project root",
        "code": "python3 labs/linux-operations.py --case access",
        "explanation": "Run the bounded exercise as an ordinary Linux user; only its new temporary directory and children are changed.",
        "expected": "Read the baseline/fault/recovery fields and require cleanupVerified=true. Root and non-Linux execution are rejected."
      },
      {
        "filename": "Lab notebook",
        "platform": "Ubuntu 24.04 / read-only shell",
        "code": "id\ndpkg-query -W python3",
        "explanation": "Inspect current credentials and installed Python package metadata without installing or changing permissions.",
        "expected": "Record UID/groups and package version separately; a missing package produces a diagnostic."
      }
    ],
    "configuration": "For a disposable service, record the exact target path, owning package, owner/group and mode before a change. Review needed read/write/search rights with the service identity. Restore the captured values on failed validation; do not recursively modify a shared tree. Edit sudo policy only through its validated administrative workflow on an explicitly owned target, not as part of this companion.",
    "production": "Use dedicated service identities, predictable paths and package sources your organization trusts. Document writable data separately from read-only application code. Plan access after account/group changes and restart only the affected process when required for new credentials to take effect.",
    "troubleshooting": [
      [
        "File is readable in the terminal but not by service",
        "Compare effective UID/groups, parent traversal, sandbox and working directory."
      ],
      [
        "chmod appears correct but denial persists",
        "Inspect ACL masks, security policy and mount state; avoid repeatedly widening mode bits."
      ],
      [
        "Permission changes do not apply in WSL mounted Windows files",
        "Use the Linux temporary filesystem for this lab; DrvFs metadata and Windows ACL behavior differ."
      ],
      [
        "Binary exists but will not execute",
        "Check execute permission, mount options, interpreter path and architecture; existence alone is insufficient."
      ]
    ],
    "security": "Keep secrets inaccessible to unrelated users and avoid placing passwords in command arguments or logs. The lab uses nonsensitive synthetic JSON. A writable executable or config on a privileged search path can let a lower-privilege user influence a higher-privilege process.",
    "performance": "Avoid scanning an entire filesystem when an exact failing path is known. Package updates can consume I/O and trigger restarts; schedule them against capacity and rollback constraints. Permission checks do not diagnose storage latency.",
    "mistakes": [
      "Using root to validate access intended for an unprivileged service.",
      "Confusing directory listing with traversal.",
      "Applying recursive 777.",
      "Equating installed software with healthy service."
    ],
    "ports": "Local file permissions and package metadata queries need no listening port. Package downloads, directory services and remote management have separate configured network dependencies.",
    "prerequisites": [
      "s0-g1-t2",
      "ADD-INFRA-003"
    ],
    "related": [
      "s0-g1-t3",
      "ADD-LINUX-002"
    ],
    "artifacts": [
      {
        "title": "Unprivileged Linux operations companion",
        "path": "labs/linux-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Ubuntu Server: user management",
        "url": "https://ubuntu.com/server/docs/how-to/security/user-management/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Observe a real ordinary-user read failure and exact mode/content recovery.",
      "requirements": "Linux, Python 3.10+, ordinary non-root user and the companion; it creates its files in the Linux temporary filesystem.",
      "topology": [
        "Effective UID",
        "Private parent directory",
        "Owned config at 640 → 000 → 640",
        "Read operation"
      ],
      "steps": [
        "Run id and record the acting UID without exposing unrelated account details.",
        "Predict the read outcome at modes 640 and 000 for the owner.",
        "Run the access case; require a real denial, restored mode and matching content.",
        "Explain why root is rejected and why this does not test another user.",
        "Write a guided service-access procedure including parent traversal, ACL and sandbox checks.",
        "Query the installed Python package and distinguish package state from this process execution."
      ],
      "verification": "denied=true, restored=true, mode=0o640 and cleanupVerified=true. No other file permissions or accounts change.",
      "troubleshooting": "A root run must stop. If denial is not observed, keep the error; do not call it a passing Linux permission test. Use a native Linux temporary filesystem.",
      "challenge": "Explain why write permission on a file does not by itself grant deletion of its directory entry.",
      "cleanup": "The program restores its file mode before deleting its owned temporary directory. It never accepts a caller-supplied path or changes users/groups."
    },
    "glossary": {
      "UID": "Numeric user identity used by the kernel.",
      "Search permission": "Directory permission needed to traverse a known name.",
      "umask": "Mask applied to requested creation modes, not a retroactive permission repair.",
      "Package origin": "Repository or source from which installed software was obtained."
    },
    "rehearsal": {
      "scope": "Authored access observations corresponding to the actual ordinary-user Linux exercise.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "Owner UID is the running ordinary user",
            "Private config mode 640; bytes readable"
          ],
          "interpretation": "The owner has read access through the private parent.",
          "next": "Record bytes and mode before changing them."
        },
        {
          "name": "Fault",
          "evidence": [
            "Owned file mode 000",
            "Read raises PermissionError"
          ],
          "interpretation": "Ordinary owner read was denied; no ACL or service-user claim follows.",
          "next": "Restore the saved mode in the same controlled scope."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Mode 640 restored",
            "Bytes equal baseline; directory removed"
          ],
          "interpretation": "The intended local read and cleanup are verified.",
          "next": "For a real service, repeat using its actual identity and policy."
        }
      ]
    },
    "quick": [
      {
        "question": "Does file read permission bypass a parent with no search permission?",
        "answer": "No.",
        "explanation": "The kernel must traverse the path before opening the target.",
        "testedConcept": "Path traversal",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-QC1",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "Why reject root in this exercise?",
        "answer": "It may bypass the ordinary mode denial being tested.",
        "explanation": "The experiment needs the same unprivileged access boundary in every phase.",
        "testedConcept": "Acting identity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-QC2",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "What does dpkg-query establish?",
        "answer": "Installed package metadata, not running service health.",
        "explanation": "Package state and process behavior are different observations.",
        "testedConcept": "Package evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-QC3",
        "topicId": "ADD-LINUX-001"
      }
    ],
    "exams": [
      {
        "question": "Owner mode is 0 while other mode permits read. Can the owner fall back to other?",
        "answer": "No in the ordinary mode-class model.",
        "explanation": "The applicable owner class is selected; more permissive classes are not combined.",
        "testedConcept": "Mode selection",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX1",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "A service fails after its file is moved. What path evidence is needed?",
        "answer": "Exact resolved path, each parent’s search rights, service identity and any sandbox restriction.",
        "explanation": "The final file mode alone does not describe the new access path.",
        "testedConcept": "Path diagnosis",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX2",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "Why is chmod -R 777 an unsafe repair?",
        "answer": "It grants broad rights across unrelated objects and can expose or alter executable/configuration state.",
        "explanation": "It also destroys useful baseline evidence.",
        "testedConcept": "Least privilege",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX3",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "What operation mainly governs unlinking a file?",
        "answer": "Permissions on its parent directory, with sticky-bit and other policy checks.",
        "explanation": "Deletion changes a directory entry rather than writing the file contents.",
        "testedConcept": "Directory semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX4",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "Why might an existing process not see a new group membership?",
        "answer": "Its credentials were established earlier and may need a controlled restart or new session.",
        "explanation": "Account database changes do not universally rewrite running process groups.",
        "testedConcept": "Credential lifetime",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX5",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "A script is executable but launch says interpreter missing. What differs from a read denial?",
        "answer": "The executable’s interpreter path cannot be resolved.",
        "explanation": "Check the shebang and installed runtime instead of widening file permissions.",
        "testedConcept": "Execution chain",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX6",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "What should be saved before a permission repair?",
        "answer": "Exact path, owner/group, mode, relevant ACL/policy and intended operation.",
        "explanation": "Recovery requires more than remembering an octal guess.",
        "testedConcept": "Baseline",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX7",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "Why can a WSL Windows-mounted file differ from this lab?",
        "answer": "Its access semantics involve mount metadata and Windows ACLs.",
        "explanation": "The companion deliberately uses the native Linux temporary filesystem.",
        "testedConcept": "Platform scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX8",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "Does downgrading a package guarantee application rollback?",
        "answer": "No; configuration, schema and persistent data changes may remain.",
        "explanation": "Plan compatibility and recovery separately.",
        "testedConcept": "Package lifecycle",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX9",
        "topicId": "ADD-LINUX-001"
      },
      {
        "question": "What proves the local exercise recovered?",
        "answer": "The same ordinary user reads identical bytes at restored mode 640, followed by verified cleanup.",
        "explanation": "A printed chmod command without the read result would not prove recovery.",
        "testedConcept": "Observed postconditions",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-001-EX10",
        "topicId": "ADD-LINUX-001"
      }
    ],
    "batch": "30",
    "title": "Linux files, identities, permissions and packages",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-LINUX-002",
    "subtitle": "Separate process state, service readiness and scheduled work.",
    "minutes": 50,
    "definition": "A Linux process is an executing program with credentials and resources. A service manager supervises processes using declared unit behavior, while timers schedule activation and journals record observations. None of these alone establishes that the user-facing operation is correct.",
    "purpose": "Learn to investigate an application that exits, restarts or appears active without serving users. Correlate unit configuration, process exit status and scoped logs before modifying restart policy. Then reason about timer execution, overlapping work and recovery from a missed or failed scheduled job.",
    "mental": "A supervisor is a stage manager: it can start a performer and observe departure, but it cannot infer that the performance met the audience’s needs. Readiness requires an explicit signal or service probe. Repeated restarts can conceal a persistent configuration error and increase load without fixing it.",
    "components": [
      "Process state and exit status: whether a bounded command finished successfully, not whether its whole service is healthy.",
      "Service unit: execution identity, command, environment, dependencies, lifecycle type and restart policy.",
      "Journal evidence: filtered by unit, boot and time, with redaction and retention limits.",
      "Timer unit: activation schedule and persistence behavior; the triggered service still needs idempotency and failure handling.",
      "Readiness probe: the original useful operation rather than only an existing PID."
    ],
    "mechanism": [
      "Start with the unit definition and its effective overrides. Ordering such as After= controls sequence when units are activated; it does not alone pull in the other unit or prove that its application is ready.",
      "Distinguish a process spawned from an executable successfully started, and both from an application ready to serve. Unit Type changes what the manager considers startup complete. Use a type supported by the actual application rather than copying a notify setting into software that never sends readiness.",
      "Read bounded journal entries around the failure with the exit status and effective configuration. Avoid dumping all logs into a shared report. A clean exit can be expected for a oneshot job, while a long-running service may require continued operation.",
      "Use restart policy with backoff and rate limits suited to the service. A loop caused by invalid configuration needs a configuration repair; clearing counters or restarting repeatedly does not address the cause.",
      "For scheduled work, identify the timezone, trigger, missed-run policy and concurrency/locking behavior. Design the job so a retry does not duplicate external side effects. After recovery verify the intended output and job history, not just the next scheduled time."
    ],
    "flow": [
      [
        "Inspect intent",
        "Read unit command, identity, environment and expected lifecycle."
      ],
      [
        "Observe exit",
        "Correlate status and scoped logs with the user operation."
      ],
      [
        "Repair cause",
        "Restore validated configuration before another launch."
      ],
      [
        "Verify output",
        "Require the intended result and a bounded successful execution."
      ]
    ],
    "comparison": [
      [
        "Active process",
        "An execution exists",
        "May be blocked or unready"
      ],
      [
        "Ready service",
        "Can perform its declared operation",
        "Requires application-aware evidence"
      ],
      [
        "Enabled unit",
        "Configured for activation through dependencies/boot",
        "Not synonymous with currently running"
      ],
      [
        "Timer fired",
        "An activation was attempted",
        "Does not establish completed job output"
      ]
    ],
    "example": "The companion launches an owned Python child with enabled=true and records exit 0 plus READY. It writes enabled=false in its private configuration and records exit 3 plus DISABLED. Restoring true produces exit 0 again. This is actual process/exit evidence, deliberately not a systemd restart, journal or timer experiment.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+ / project root",
        "code": "python3 labs/linux-operations.py --case process",
        "explanation": "Run the bounded exercise as an ordinary Linux user; only its new temporary directory and children are changed.",
        "expected": "Read the baseline/fault/recovery fields and require cleanupVerified=true. Root and non-Linux execution are rejected."
      },
      {
        "filename": "Lab notebook",
        "platform": "Ubuntu 24.04 with systemd / read-only",
        "code": "systemctl --no-pager --failed\nsystemctl list-timers --all --no-pager\njournalctl -b -n 5 --no-pager",
        "explanation": "Inspect failed units, timer scheduling and a bounded current-boot journal sample. Do not publish raw sensitive logs.",
        "expected": "Output depends on the local manager and access rights; no failed units is an observation, not a service-wide health certificate."
      }
    ],
    "configuration": "On a disposable systemd target, capture unit content and drop-ins first. Validate the proposed unit, reload manager definitions only after a reviewed file change, then start/restart the owned service and test its real operation. Restore prior files and reload definitions on rollback. A daemon-reload changes the manager’s definitions; it does not by itself restart the service. These administrative steps are guided, not executed by the companion.",
    "production": "Separate startup ordering, required dependencies and readiness. Keep service credentials and environment explicit; do not rely on interactive shell state. For jobs, retain a last successful completion marker and protect against overlapping work. Log enough to connect exit status to a particular configuration revision.",
    "troubleshooting": [
      [
        "Active but unavailable",
        "Probe the application endpoint and inspect waits, dependencies and listener state."
      ],
      [
        "Repeated exit 3",
        "Use the program’s documented meaning and stderr/config evidence; exit numbers are application-specific."
      ],
      [
        "Timer visible but no output",
        "Check activation history, triggered service result, working directory, permissions and missed-run behavior."
      ],
      [
        "No journal records",
        "Check boot/time scope, permissions, retention and whether the program writes to the journal at all."
      ]
    ],
    "security": "Use a dedicated low-privilege identity and restrict writable paths. Do not print environment secrets during diagnostics. A service manager configuration that invokes a shell or writable executable can expand the authority of anyone able to modify that input.",
    "performance": "Watch restart frequency, concurrent jobs and blocked work as well as CPU usage. Bound diagnostic output and avoid launching duplicate scheduled jobs during an incident. A fast exit with no useful work is not a performance improvement.",
    "mistakes": [
      "Equating enabled with active.",
      "Equating active with ready.",
      "Using restart loops to mask invalid configuration.",
      "Assuming After= alone starts a dependency.",
      "Treating a timer schedule as proof of successful work."
    ],
    "ports": "Process supervision and local journal inspection have no application port requirement. A supervised network service has its own listener and readiness protocol.",
    "prerequisites": [
      "ADD-LINUX-001"
    ],
    "related": [
      "ADD-INFRA-002",
      "ADD-LINUX-003"
    ],
    "artifacts": [
      {
        "title": "Unprivileged Linux operations companion",
        "path": "labs/linux-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Ubuntu 24.04: systemd.service",
        "url": "https://manpages.ubuntu.com/manpages/noble/man5/systemd.service.5.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Ubuntu 24.04: journalctl",
        "url": "https://manpages.ubuntu.com/manpages/noble/man1/journalctl.1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Ubuntu 24.04: systemd.timer",
        "url": "https://manpages.ubuntu.com/manpages/noble/man5/systemd.timer.5.html",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Correlate controlled configuration with actual child outputs and exit codes, then design a supervised-service investigation.",
      "requirements": "Ordinary Linux user and Python 3.10+. systemd commands are optional read-only observations when that manager is available.",
      "topology": [
        "Private JSON configuration",
        "Bounded child execution",
        "stdout/stderr and exit status",
        "Restored configuration"
      ],
      "steps": [
        "Predict the three child exit statuses before execution.",
        "Run the process case and record 0/3/0 with READY/DISABLED/READY.",
        "Explain why the child result is narrower than service readiness.",
        "On an owned systemd machine, inspect failed units/timers and a small journal sample without changing them.",
        "Write a guided plan for an invalid service configuration: capture revision, validate repair, reload definitions if changed and verify the original operation.",
        "Specify how a scheduled job avoids duplicate effects when retried."
      ],
      "verification": "The child returns the predicted outputs and statuses; all children finish within the five-second bound and cleanupVerified is true. No new systemd service/timer is installed.",
      "troubleshooting": "A subprocess timeout or unexpected stderr is a failed run to investigate. Do not reinterpret it as the intended disabled case. Lack of a systemd manager limits optional observations only.",
      "challenge": "A oneshot task exits 0 but creates no receipt because it used the wrong working directory. Define an output-based acceptance check.",
      "cleanup": "Each bounded child exits before the program removes its private directory. Read-only manager queries need no rollback."
    },
    "glossary": {
      "Exit status": "Program-defined completion code observed by the caller.",
      "Readiness": "Ability to perform the declared service operation.",
      "Drop-in": "Additional unit configuration that can override or extend a base unit.",
      "Idempotency": "Repeating an operation has no additional unintended effect."
    },
    "rehearsal": {
      "scope": "Authored child-process records reproduced by the companion; no systemd lifecycle is claimed.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "enabled=true",
            "Child exits 0 and prints READY"
          ],
          "interpretation": "The specific bounded child succeeded.",
          "next": "A network service would additionally need an application probe."
        },
        {
          "name": "Fault",
          "evidence": [
            "enabled=false",
            "Child exits 3 and prints DISABLED"
          ],
          "interpretation": "The supplied configuration causes an intentional program failure.",
          "next": "Fix the configuration instead of launching an unbounded restart loop."
        },
        {
          "name": "Recovery",
          "evidence": [
            "enabled=true restored",
            "Child exits 0; no remaining owned child"
          ],
          "interpretation": "The bounded execution returns to its baseline.",
          "next": "Verify intended output and retain the failed observation."
        }
      ]
    },
    "quick": [
      {
        "question": "Does enabled mean running?",
        "answer": "No.",
        "explanation": "Enablement concerns activation configuration, not current execution.",
        "testedConcept": "Lifecycle state",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-QC1",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "What does exit 3 mean here?",
        "answer": "The companion child read enabled=false.",
        "explanation": "Exit-code meaning belongs to this program, not every Linux command.",
        "testedConcept": "Exit interpretation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-QC2",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "Does daemon-reload restart the service?",
        "answer": "No.",
        "explanation": "It reloads unit definitions; service lifecycle actions are separate.",
        "testedConcept": "Manager definitions",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-QC3",
        "topicId": "ADD-LINUX-002"
      }
    ],
    "exams": [
      {
        "question": "Why can a PID exist while the service is unavailable?",
        "answer": "The process may be initializing, blocked, misconfigured or unable to reach a dependency.",
        "explanation": "Readiness must test useful behavior.",
        "testedConcept": "Process vs service",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX1",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "What should accompany a failed exit code?",
        "answer": "Relevant stderr/logs, command, effective configuration, target and observation time.",
        "explanation": "The number alone rarely identifies the cause.",
        "testedConcept": "Correlated evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX2",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "Does After= alone require the named unit to start?",
        "answer": "No; ordering and requirement/activation relationships are distinct.",
        "explanation": "A sequence rule is not a dependency pull-in rule.",
        "testedConcept": "Unit dependencies",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX3",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "Why must Type=notify match application support?",
        "answer": "The application must send the expected readiness notification.",
        "explanation": "Unsupported readiness contracts can leave startup waiting or fail.",
        "testedConcept": "Readiness contract",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX4",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "What risk comes from aggressive restarts on bad config?",
        "answer": "Repeated failure, resource churn and possible overload of dependencies.",
        "explanation": "Repair the cause and use bounded policies.",
        "testedConcept": "Restart control",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX5",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "A timer fired twice and duplicated a transfer. What design is missing?",
        "answer": "Idempotency or a durable deduplication/locking scheme tied to the job.",
        "explanation": "Scheduling alone cannot prevent duplicate external effects.",
        "testedConcept": "Scheduled side effects",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX6",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "Why filter journal output by boot and time?",
        "answer": "To relate evidence to the current event and avoid irrelevant or stale records.",
        "explanation": "Historical failures may not describe the current process.",
        "testedConcept": "Log scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX7",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "A oneshot exits successfully and becomes inactive. Is that necessarily a fault?",
        "answer": "No; it may have completed its bounded work correctly.",
        "explanation": "Evaluate lifecycle type and intended output.",
        "testedConcept": "Oneshot semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX8",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "How do you roll back a bad unit override?",
        "answer": "Restore the recorded owned override, reload definitions and revalidate the service operation.",
        "explanation": "Removing an arbitrary override could erase unrelated operator intent.",
        "testedConcept": "Scoped rollback",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX9",
        "topicId": "ADD-LINUX-002"
      },
      {
        "question": "What does this lab fail to establish about systemd?",
        "answer": "It does not install units, verify restart policy, collect journal records for its child or execute timers.",
        "explanation": "A subprocess test must not be renamed a service-manager test.",
        "testedConcept": "Evidence scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-002-EX10",
        "topicId": "ADD-LINUX-002"
      }
    ],
    "batch": "30",
    "title": "Processes, systemd, journals and scheduling",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-LINUX-003",
    "subtitle": "Keep block capacity, filesystem capacity and service pressure separate.",
    "minutes": 50,
    "definition": "Linux storage presents several layers: block devices, optional volume management, filesystems and mounted paths. Resource pressure describes time tasks wait for CPU, memory or I/O, which differs from capacity and utilization. Recovery requires identifying the failing layer before changing it.",
    "purpose": "Investigate full filesystems, missing mounts and slow services using scoped observations. Distinguish free extents in a volume group from free blocks and inodes in a mounted filesystem. Plan a safe recovery that restores useful service and data integrity instead of merely making a capacity graph look better.",
    "mental": "Storage resembles nested containers with labels: making the outer container larger does not automatically change every inner layer. A mount can also cover files already present at the mountpoint, so the visible path depends on the mounted source. This analogy omits thin provisioning, snapshots and shared allocation; inspect the actual stack before using arithmetic.",
    "components": [
      "Block source: the device or logical volume holding data, identified by stable metadata rather than a guessed name.",
      "LVM: physical volumes contribute extents to volume groups; logical volumes consume them under a selected layout.",
      "Filesystem: allocates blocks and inodes and has its own supported growth/repair behavior.",
      "Mount: associates a filesystem with a path and options; a missing mount can redirect writes into the parent filesystem.",
      "Pressure: CPU/memory/I/O stall observations, interpreted over time with workload and error evidence."
    ],
    "mechanism": [
      "Begin at the application path and resolve its current mount source. Compare the observed source and options with the intended baseline. A directory existing is not proof that the expected filesystem is mounted there.",
      "Check both filesystem bytes and inode availability. A workload producing many small files can exhaust inodes with byte capacity remaining. An unlinked file held open can consume space that a directory-size scan does not explain.",
      "For LVM growth, inspect allocation, free extents, redundancy layout and filesystem type before proposing changes. Increasing a logical volume and growing its filesystem are separate operations unless a supported tool coordinates them. Do not assume shrinking reverses growth safely.",
      "Inspect pressure as waiting time, not merely percent busy. PSI some indicates at least some tasks stalled; full concerns all non-idle tasks within the relevant scope. Interpret kernel/version and cgroup context rather than deriving a root cause from one sample.",
      "Recover the identified service boundary with a protected backup and explicit stop conditions. Recheck mount identity, capacity, application write/read behavior and data integrity. The local companion only corrupts and restores one owned file; it never fills or resizes a disk."
    ],
    "flow": [
      [
        "Resolve path",
        "Find the actual source and options of the application mount."
      ],
      [
        "Separate layers",
        "Inspect volume allocation, filesystem bytes/inodes and workload pressure."
      ],
      [
        "Repair safely",
        "Use a supported target-specific plan with backup and stop conditions."
      ],
      [
        "Verify service",
        "Check the original write/read operation and restored data, not only free space."
      ]
    ],
    "comparison": [
      [
        "VG free extents",
        "Unallocated volume-group capacity",
        "Not the free space reported by the mounted filesystem"
      ],
      [
        "Filesystem bytes/inodes",
        "Data and metadata allocation capacity",
        "Either can constrain new files"
      ],
      [
        "Utilization",
        "How busy a resource appears",
        "Not a direct measure of task waiting"
      ],
      [
        "PSI",
        "Time workloads are stalled on resources",
        "A symptom signal requiring workload correlation"
      ]
    ],
    "example": "In a supplied thick-volume example, a volume group has 12 GiB unallocated and an 8 GiB growth request leaves 4 GiB before layout overhead. That arithmetic does not resize a filesystem. Separately, the companion really changes an owned receipt file to corrupt bytes and restores the saved bytes, verifying exact equality and cleanup.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Linux / Python 3.10+ / project root",
        "code": "python3 labs/linux-operations.py --case storage",
        "explanation": "Run the bounded exercise as an ordinary Linux user; only its new temporary directory and children are changed.",
        "expected": "Read the baseline/fault/recovery fields and require cleanupVerified=true. Root and non-Linux execution are rejected."
      },
      {
        "filename": "Lab notebook",
        "platform": "Ubuntu 24.04 / read-only",
        "code": "findmnt -T /tmp\ndf -h /tmp\ndf -i /tmp\ncat /proc/pressure/io",
        "explanation": "Inspect the actual mount, byte/inode capacity and an I/O-pressure sample without changing storage.",
        "expected": "Record source/type/options and counters. PSI availability depends on kernel configuration; a sample is not proof of a particular bottleneck."
      }
    ],
    "configuration": "A guided disposable LVM exercise must identify an owned spare virtual disk, create a tested backup, record device identity and use commands verified for its filesystem/layout. Confirm enough extents before growth and recheck both LV and filesystem afterward. Stop on ambiguous device identity or unexpected metadata. Restore from a tested backup if reversal is needed; do not assume lvreduce is a safe undo. No LVM mutation is part of this companion.",
    "production": "Separate application data, logs and recovery copies according to their failure and capacity needs. Alert on trends and usable headroom, including inode or thin-pool metadata pressure where relevant. A backup stored on the same failing filesystem is not an independent recovery copy.",
    "troubleshooting": [
      [
        "No space with bytes apparently free",
        "Inspect inodes, quotas, reserved capacity and the filesystem receiving the actual write."
      ],
      [
        "Space stays used after deleting a log",
        "An open file may retain allocation; identify the owner and use a controlled rotation/reopen procedure."
      ],
      [
        "Data disappears after a mount",
        "Files may be hidden beneath the mounted filesystem; preserve evidence and inspect the intended source instead of deleting paths."
      ],
      [
        "I/O pressure rises",
        "Correlate task waits with workload, latency, error logs and storage path health before choosing a repair."
      ]
    ],
    "security": "Do not weaken mount or access controls to mask a storage fault. Protect backups and recovery credentials separately from the source workload. Treat device names and mount identities as safety-critical inputs before any destructive administration.",
    "performance": "Use representative time intervals and correlate pressure with request latency. A full queue can raise latency before throughput collapses. Do not run a destructive benchmark or fill the host filesystem to demonstrate pressure; the lesson uses read-only observations and supplied capacity.",
    "mistakes": [
      "Growing the LV and assuming filesystem capacity already changed.",
      "Ignoring inodes or open-deleted files.",
      "Treating a mountpoint directory as proof of correct source.",
      "Shrinking a volume as an automatic rollback.",
      "Calling one PSI sample a root cause."
    ],
    "ports": "Local mounts and LVM have no required TCP/UDP port. NFS, iSCSI and other remote storage add their own network, authentication and timeout dependencies.",
    "prerequisites": [
      "ADD-LINUX-001",
      "ADD-LINUX-002"
    ],
    "related": [
      "s8-g0-t0",
      "ADD-INFRA-003"
    ],
    "artifacts": [
      {
        "title": "Unprivileged Linux operations companion",
        "path": "labs/linux-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Ubuntu 24.04: lvextend",
        "url": "https://manpages.ubuntu.com/manpages/noble/man8/lvextend.8.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux kernel: Pressure Stall Information",
        "url": "https://docs.kernel.org/accounting/psi.html",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Separate supplied volume arithmetic from actual owned-file recovery and read-only host observations.",
      "requirements": "Ordinary Linux user, Python 3.10+ and read-only mount/capacity utilities. No spare disk or root permission is needed for the executed path.",
      "topology": [
        "Application path",
        "Mounted filesystem",
        "Optional LV/VG",
        "Underlying block source"
      ],
      "steps": [
        "Record which mount receives /tmp and inspect byte/inode availability.",
        "Read an I/O PSI sample if exposed; state its scope and that no stress load was created.",
        "Calculate 12 minus 8 GiB in the supplied thick-volume example and list the unmodeled layout/filesystem constraints.",
        "Run the storage case and compare corrupt and restored receipt bytes.",
        "Draft a guided growth plan with stable target identity, backup, prechecks, filesystem-specific validation and a recovery stop condition.",
        "Explain why the local backup is useful for this exercise but not independently protected disaster recovery."
      ],
      "verification": "Actual file fault differs and restoration matches; cleanupVerified is true. Supplied remaining capacity is 4 GiB. No mount, LV, partition or host-pressure mutation occurs.",
      "troubleshooting": "Unexpected mount identity must stop a real storage change. If an observation utility is unavailable, record the gap; do not invent output or install packages solely to imitate a result.",
      "challenge": "A service writes into an empty mountpoint after its data mount fails. Explain how that can fill the root filesystem while the intended data volume remains empty.",
      "cleanup": "The program removes only its private directory and restores no shared mounts because it changes none. Keep read-only observations sanitized."
    },
    "glossary": {
      "Inode": "Filesystem metadata object identifying a file, with finite allocation limits on many filesystems.",
      "Mountpoint": "Path where a filesystem is attached to the directory tree.",
      "Extent": "Allocation unit used by a volume manager.",
      "PSI": "Pressure Stall Information: measurements of task stalls on resources."
    },
    "rehearsal": {
      "scope": "Authored storage diagnosis with a separate actual file-restore exercise; no disk-full or LVM execution.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "Intended data source mounted",
            "Supplied VG free=12 GiB; proposed growth=8 GiB"
          ],
          "interpretation": "The simple allocation envelope leaves 4 GiB before additional layout constraints.",
          "next": "Inspect real filesystem support and required free extents before changing a target."
        },
        {
          "name": "Fault",
          "evidence": [
            "Application reports no space",
            "Directory byte totals alone do not explain it"
          ],
          "interpretation": "Inodes, quotas, wrong mount or open-deleted files remain hypotheses.",
          "next": "Inspect actual mount source and allocation evidence."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Owned receipt restored byte-for-byte in companion",
            "No disks or mounts changed"
          ],
          "interpretation": "The local restore is verified; storage-layer repairs remain guided.",
          "next": "On a real target, repeat application write/read and integrity checks."
        }
      ]
    },
    "quick": [
      {
        "question": "Are VG free extents equal to filesystem free bytes?",
        "answer": "No.",
        "explanation": "They describe different layers of allocation.",
        "testedConcept": "Storage layers",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-QC1",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "What can exhaust before file data capacity?",
        "answer": "Inodes, quotas or other allocation limits.",
        "explanation": "Free bytes alone do not guarantee new-file creation.",
        "testedConcept": "Allocation limits",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-QC2",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Does the lab resize an LV?",
        "answer": "No.",
        "explanation": "It calculates supplied capacity and restores an owned file only.",
        "testedConcept": "Execution boundary",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-QC3",
        "topicId": "ADD-LINUX-003"
      }
    ],
    "exams": [
      {
        "question": "An LV grows but df shows no increase. What layer needs checking?",
        "answer": "The filesystem and whether it was grown successfully using a supported procedure.",
        "explanation": "Block-device capacity and filesystem allocation are distinct.",
        "testedConcept": "Growth sequence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX1",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Why inspect findmnt for the application path?",
        "answer": "To establish the actual source/options receiving its I/O.",
        "explanation": "An existing directory can be a missing mountpoint.",
        "testedConcept": "Mount identity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX2",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Why can deleted logs still consume space?",
        "answer": "A running process may retain an open reference to the unlinked file.",
        "explanation": "Allocation can persist until references are released.",
        "testedConcept": "Open-deleted files",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX3",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Calculate free extents after an 8 GiB allocation from 12 GiB in the supplied simple case.",
        "answer": "4 GiB.",
        "explanation": "This excludes layout overhead and does not prove filesystem growth.",
        "testedConcept": "Capacity envelope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX4",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "What distinguishes PSI from utilization?",
        "answer": "PSI describes task stall time; utilization describes resource activity.",
        "explanation": "A resource can be active without the same amount of user-visible waiting.",
        "testedConcept": "Pressure interpretation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX5",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Why not induce a disk-full condition on the host?",
        "answer": "It can disrupt unrelated services and evidence collection.",
        "explanation": "Use a disposable bounded target or the supplied exercise.",
        "testedConcept": "Fault isolation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX6",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "What is unsafe about treating volume shrink as growth rollback?",
        "answer": "Filesystem and data-layout constraints can make shrink unsupported or destructive.",
        "explanation": "Recovery must be planned for the exact stack before mutation.",
        "testedConcept": "Recovery planning",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX7",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "A mounted volume covers earlier files. Were those files necessarily deleted?",
        "answer": "No; they can be hidden beneath the mount.",
        "explanation": "Visibility and storage existence are different facts.",
        "testedConcept": "Mount semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX8",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "What extra evidence is needed after capacity repair?",
        "answer": "Correct mount identity, application write/read behavior, data integrity and stable pressure/capacity observations.",
        "explanation": "Free space is only one recovery condition.",
        "testedConcept": "Service verification",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX9",
        "topicId": "ADD-LINUX-003"
      },
      {
        "question": "Why is the companion backup not disaster protection?",
        "answer": "It resides in the same local temporary scope as the source file.",
        "explanation": "It demonstrates restoration mechanics without independent failure protection.",
        "testedConcept": "Backup scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-LINUX-003-EX10",
        "topicId": "ADD-LINUX-003"
      }
    ],
    "batch": "30",
    "title": "Mounts, LVM, pressure and service recovery",
    "level": "Operational foundations / applied practice"
  }
];
