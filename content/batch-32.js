window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["32"] = [
  {
    "id": "ADD-CONT-001",
    "subtitle": "Understand the isolation contract and the lifetime of data.",
    "minutes": 50,
    "definition": "A Linux container runs processes with configured isolation and resource controls while sharing the host kernel. An image provides filesystem content and launch metadata; a running container adds runtime state. Docker Compose describes a set of services and their relationships, but declared startup order is not the same as application readiness.",
    "purpose": "Build a reproducible and bounded container exercise without giving it unnecessary host authority. Separate image identity, process identity, writable state, resource limits and network exposure. Use this distinction to decide what must survive replacement and what can be discarded.",
    "mental": "An image is a sealed recipe and a container is one execution of it. The seal can identify bytes, but it does not prove the recipe is safe. Runtime mounts, credentials and privileges can radically change the isolation boundary. Containers are not independent-kernel virtual machines, and a writable container layer is not a backup strategy.",
    "components": [
      "Image identity: content digest/ID versus a mutable human-readable tag.",
      "Namespaces: scoped views of process, network and other kernel resources, depending on runtime configuration.",
      "Cgroups: resource accounting and limits; they do not replace authorization or guarantee service latency.",
      "Runtime authority: user, capabilities, seccomp/security policy, mounts and access to the engine socket.",
      "Compose service intent: image, command, health checks, dependencies, networks, volumes and project scope."
    ],
    "mechanism": [
      "Resolve and record the exact locally available image before execution. A tag can later refer to different content; reproducible work should retain a digest and the build/source provenance needed to assess it.",
      "Choose the least authority required by the exercise. The companion runs as UID 65534, drops capabilities, disables networking, makes the root filesystem read-only and supplies a one-MiB temporary writable directory. These settings narrow exposure without proving a complete container security boundary.",
      "Run the intended foreground process and observe its exit and output. The companion uses a shell to write a ready marker, introduce a broken marker and restore it. It does not launch the Nginx service contained in the cached image.",
      "Decide data lifetime explicitly. Temporary writable state disappears with removal; persistent volumes outlive some lifecycle operations and need separate backup and deletion rules. Do not store the only copy of important data in a disposable layer.",
      "For Compose, validate the effective configuration and define readiness-aware dependencies where needed. A created or running dependency can still reject requests. Applications should tolerate transient dependency loss after startup instead of relying exclusively on initial ordering."
    ],
    "flow": [
      [
        "Resolve image",
        "Record cached content identity; do not silently pull a different version."
      ],
      [
        "Bound authority",
        "Select user, resources, mounts and network scope."
      ],
      [
        "Exercise state",
        "Observe a controlled marker fault and exact recovery inside temporary storage."
      ],
      [
        "Remove owned work",
        "Delete only the uniquely labelled exercise and verify its absence."
      ]
    ],
    "comparison": [
      [
        "Image",
        "Filesystem/metadata used to create containers",
        "A tag is mutable; preserve content identity"
      ],
      [
        "Container",
        "Runtime execution and writable state",
        "Replacement can discard nonpersistent data"
      ],
      [
        "Volume",
        "Separately managed persistent storage",
        "Lifecycle and backup must be explicit"
      ],
      [
        "Compose dependency",
        "Declared relationship/startup condition",
        "Not a guarantee against later runtime failure"
      ]
    ],
    "example": "The companion records the ID of a cached nginx:alpine image, overrides its entrypoint with /bin/sh and runs a non-root marker exercise. No Nginx listener starts. The output is ready, not-ready, ready and UID 65534. It also runs Compose configuration validation against a temporary JSON Compose file, without deploying that project.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+; container case also needs an owned Docker engine",
        "code": "python3 labs/container-operations.py --case container",
        "explanation": "Run only the selected scoped exercise. Container mode requires Docker, Compose and an already cached nginx:alpine image; it never pulls.",
        "expected": "Read the explicit scope and postconditions. Missing tools/image are blockers, not passing substitutes."
      }
    ],
    "configuration": "For a new owned Compose project, review the fully rendered configuration, image identities, published ports, mounts and secrets before up. Define an exact project name and data-retention policy. On a bad rollout, restore the reviewed image/configuration and validate application/data compatibility. Do not use global prune or delete volumes as a routine rollback. The companion scopes cleanup to one random ownership label.",
    "production": "Keep application processes non-root where supported, minimize host mounts and protect engine access. Maintain image provenance and patch/rebuild practices. Resource ceilings must be tested against the workload; an arbitrary memory cap can produce kills rather than graceful backpressure.",
    "troubleshooting": [
      [
        "Container exits immediately",
        "Inspect the intended foreground command, exit status and bounded logs before adding restart loops."
      ],
      [
        "Read-only filesystem error",
        "Determine whether the application needs an explicitly writable path instead of disabling the entire protection."
      ],
      [
        "Service starts before database is usable",
        "Add a meaningful readiness condition and application retry policy; process startup alone is insufficient."
      ],
      [
        "Data missing after replacement",
        "Check whether it lived in the disposable layer, tmpfs or an intentionally persistent volume."
      ]
    ],
    "security": "Control of a privileged container engine can grant extensive host authority. Never mount the engine socket or host root merely for convenience. No such mounts are used here; no existing application image or container is modified.",
    "performance": "Inspect throttling, memory events and application latency together. Limits constrain resource use but do not prove throughput or fairness for every workload. The marker exercise is not a cgroup stress test or performance benchmark.",
    "mistakes": [
      "Calling a container a separate kernel.",
      "Relying on latest-style tags for reproducibility.",
      "Publishing ports unnecessarily.",
      "Treating tmpfs as durable storage.",
      "Using broad cleanup against unrelated workloads."
    ],
    "ports": "Container isolation has no intrinsic port. This exercise uses network=none and publishes none. Application ports are exposed only through explicit runtime networking and publication choices.",
    "prerequisites": [
      "ADD-LINUX-001",
      "ADD-LINUX-002"
    ],
    "related": [
      "s8-g6-t3",
      "ADD-CONT-002"
    ],
    "artifacts": [
      {
        "title": "Scoped container, selector and recovery companion",
        "path": "labs/container-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Docker Engine security",
        "url": "https://docs.docker.com/engine/security/",
        "checked": "2026-10-09"
      },
      {
        "title": "Docker Compose startup order",
        "url": "https://docs.docker.com/compose/how-tos/startup-order/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Run and remove one bounded cached-image container, while separating Compose syntax from deployment.",
      "requirements": "Python 3.10+, access to an owned Docker engine, Docker Compose and a cached nginx:alpine image. No download or cloud account is required.",
      "topology": [
        "Recorded local image ID",
        "Non-root isolated container",
        "One-MiB /work tmpfs",
        "Exact ownership-label cleanup"
      ],
      "steps": [
        "Read the companion’s run options and predict which paths are writable and whether networking is possible.",
        "Run the container case; record the immutable image ID and four observations.",
        "Confirm the program did not launch Nginx, publish ports or mount host paths.",
        "Require containerRemoved, composeSyntaxValidated and cleanupVerified.",
        "Write an owned Compose design separating persistent database data from disposable application state.",
        "Explain the difference between valid Compose syntax, service startup and application readiness."
      ],
      "verification": "Marker phases are ready/not-ready/ready under UID 65534. The exact owned container is absent and the temporary Compose file is removed. No existing project is stopped.",
      "troubleshooting": "Missing cached image or engine access must stop the run. Do not pull an arbitrary replacement or broaden daemon permissions to hide the blocker.",
      "challenge": "A replacement image changes the process UID. Explain how that can affect an existing volume even when the image starts successfully.",
      "cleanup": "Automatic --rm is supplemented by a cleanup limited to the unique ownership label. The exercise creates no persistent Docker volume or network."
    },
    "glossary": {
      "Namespace": "Kernel mechanism for scoped resource views.",
      "Cgroup": "Kernel mechanism for accounting and controlling grouped resources.",
      "tmpfs": "Memory-backed temporary filesystem whose data is not persistent across this container removal.",
      "Image digest": "Content identity used to distinguish image versions independently of tags."
    },
    "rehearsal": {
      "scope": "Authored summary of an actual shell exercise inside a restricted cached-image container; no web service.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "UID 65534; network none; read-only root",
            "Private tmpfs marker = ready"
          ],
          "interpretation": "The specific process and writable scope are established.",
          "next": "Record image ID and runtime authority."
        },
        {
          "name": "Fault",
          "evidence": [
            "Marker changed to broken",
            "Readiness test fails as expected"
          ],
          "interpretation": "This is a controlled file predicate, not Docker health monitoring.",
          "next": "Restore only the owned marker."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Marker ready; check passes",
            "Unique container removed; Compose syntax passes"
          ],
          "interpretation": "The local exercise and cleanup succeed.",
          "next": "A real deployment still needs service and persistent-data checks."
        }
      ]
    },
    "quick": [
      {
        "question": "Does a container have a separate Linux kernel?",
        "answer": "Ordinarily no; it shares the host kernel.",
        "explanation": "Namespaces and resource controls are not a VM kernel boundary.",
        "testedConcept": "Isolation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-QC1",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Can an image tag move?",
        "answer": "Yes.",
        "explanation": "Record a content identity for reproducibility.",
        "testedConcept": "Image identity",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-QC2",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Does Compose syntax validation start containers?",
        "answer": "No.",
        "explanation": "Configuration validation and deployment are separate actions.",
        "testedConcept": "Execution scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-QC3",
        "topicId": "ADD-CONT-001"
      }
    ],
    "exams": [
      {
        "question": "Why override the cached Nginx image entrypoint here?",
        "answer": "To run only the bounded shell exercise rather than a network service.",
        "explanation": "The image content is reused without claiming Nginx runtime verification.",
        "testedConcept": "Process intent",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX1",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Which writable storage does the exercise allow?",
        "answer": "Its one-MiB /work tmpfs.",
        "explanation": "The root filesystem is read-only and there are no host mounts.",
        "testedConcept": "Writable boundary",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX2",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Why is a mounted Docker socket powerful?",
        "answer": "It can give the process control over container creation and potentially host-level access through engine features.",
        "explanation": "Socket access is an authority boundary, not just another file.",
        "testedConcept": "Engine security",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX3",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "What happens to the marker after container removal?",
        "answer": "It disappears with temporary storage.",
        "explanation": "No durability or backup claim follows from successful writes.",
        "testedConcept": "Data lifetime",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX4",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Can a memory limit prove good latency?",
        "answer": "No.",
        "explanation": "A workload can throttle, queue or be killed within configured limits.",
        "testedConcept": "Resource semantics",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX5",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Why can depends_on still leave an application failing?",
        "answer": "Startup conditions do not guarantee continuing dependency availability; readiness and retries need explicit design.",
        "explanation": "Dependencies can fail after initial ordering.",
        "testedConcept": "Lifecycle dependencies",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX6",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "What makes cleanup safe for neighboring projects?",
        "answer": "A unique name/label, no shared volumes and removal limited to that ownership scope.",
        "explanation": "Global prune would cross the exercise boundary.",
        "testedConcept": "Owned cleanup",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX7",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "What should be recorded before a container rollout?",
        "answer": "Image identity, configuration, authority, data compatibility and a tested rollback path.",
        "explanation": "A tag name alone cannot reconstruct runtime behavior.",
        "testedConcept": "Release evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX8",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "Why can a new UID break an existing volume?",
        "answer": "The new process may lack access to files owned under the prior identity/policy.",
        "explanation": "Image startup and persistent data permissions are distinct.",
        "testedConcept": "Identity migration",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX9",
        "topicId": "ADD-CONT-001"
      },
      {
        "question": "What was actually validated about Compose?",
        "answer": "Only the temporary configuration’s syntax using the local Compose tool.",
        "explanation": "No Compose services or readiness gates were executed.",
        "testedConcept": "Honest validation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-001-EX10",
        "topicId": "ADD-CONT-001"
      }
    ],
    "batch": "32",
    "title": "Container isolation, images and Docker Compose",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-CONT-002",
    "subtitle": "Trace a workload from scheduling to authorized service delivery.",
    "minutes": 55,
    "definition": "Kubernetes reconciles declared resources into workloads running on nodes. A functioning application depends on scheduling, process startup, readiness, Service selection, networking, persistent storage and authorization. Each controller or policy contributes a different part of the result.",
    "purpose": "Diagnose a Pending Pod, an empty service endpoint set or a forbidden API request without treating all failures as networking problems. Follow the declared selector and readiness state, then identify the real cluster evidence needed at each boundary. Keep storage and RBAC decisions visible alongside compute scheduling.",
    "mental": "Kubernetes is a set of cooperating control loops, not one command that immediately makes the desired state true. An accepted manifest is a request for reconciliation. Controllers observe and act asynchronously; a resource existing in the API does not prove that application traffic or persistent data is ready.",
    "components": [
      "Scheduler: places unscheduled Pods using resource requests and scheduling constraints.",
      "Node/runtime: starts containers with images, mounts and configured probes.",
      "Service and EndpointSlices: identify eligible backends under selection/readiness rules and expose a stable service abstraction.",
      "Storage: PVC requests, PV binding, provisioner/topology and access-mode constraints.",
      "RBAC: subjects receive verbs on API resources within a defined scope; application network authorization is separate."
    ],
    "mechanism": [
      "Read the Pod state and events before changing limits or labels. Resource requests, node selectors/affinity, taints/tolerations and storage topology can prevent placement even while aggregate cluster capacity appears available.",
      "After placement, separate image/config/mount startup failures from readiness. Startup, liveness and readiness probes serve different lifecycle purposes; a readiness failure can remove traffic eligibility without requiring a restart.",
      "Trace a Service’s selector to matching Pods and inspect EndpointSlices and ports. The offline model selects only exact-label matches declared ready. It intentionally omits selectorless Services, publishNotReadyAddresses, controllers and data-plane implementation.",
      "Verify persistence independently. A bound PVC is not proof that the application can mount, write, flush and recover its data. Access modes, node/zone placement and provider behavior constrain movement during failure.",
      "Evaluate API authorization using the intended identity, verb, resource and namespace. A RoleBinding does not itself open a network port, and a NetworkPolicy is not an RBAC rule. Require both the appropriate control-plane authority and the intended data path."
    ],
    "flow": [
      [
        "Schedule",
        "Check requests, constraints and storage placement."
      ],
      [
        "Start and qualify",
        "Inspect container state and probe outcomes."
      ],
      [
        "Select and route",
        "Follow Service selectors, EndpointSlices and target ports."
      ],
      [
        "Authorize and persist",
        "Validate scoped API rights and the original durable operation."
      ]
    ],
    "comparison": [
      [
        "Pending",
        "Pod not yet running through required preparation",
        "Inspect events and constraints before assuming no CPU"
      ],
      [
        "Ready",
        "Pod satisfies its current readiness conditions",
        "Does not prove every client path or transaction"
      ],
      [
        "Service selector",
        "Chooses labelled backends",
        "Wrong labels can produce zero endpoints"
      ],
      [
        "RBAC / NetworkPolicy",
        "API permission / network traffic policy",
        "Neither substitutes for the other"
      ]
    ],
    "example": "Two supplied Pods share app=web. web-a is ready; web-b is not. A selector app=web yields only web-a in the teaching model. Changing the selector to app=api yields an empty set even though the Pods remain present. Restoring app=web recovers the selected set. No Kubernetes cluster is contacted.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+; container case also needs an owned Docker engine",
        "code": "python3 labs/container-operations.py --case selectors",
        "explanation": "Run only the selected scoped exercise. Container mode requires Docker, Compose and an already cached nginx:alpine image; it never pulls.",
        "expected": "Read the explicit scope and postconditions. Missing tools/image are blockers, not passing substitutes."
      },
      {
        "filename": "Lab notebook",
        "platform": "Configured kubectl client / guided",
        "code": "kubectl config current-context",
        "explanation": "On an already configured owned client, inspect the selected context before any cluster request. This command is a guided precheck.",
        "expected": "Confirm the exact context belongs to the disposable target; do not proceed when it is unknown."
      }
    ],
    "configuration": "For an owned disposable namespace, pin image versions, state requests and health probes, use a narrowly scoped service account and review Service selectors/ports against Pod labels. Inspect the diff and admission result before rollout. Preserve prior manifests and persistent-data assumptions. Rollback should restore only owned resources and must not delete a namespace containing unrelated work.",
    "production": "Use failure-domain-aware placement, scoped RBAC and a tested network policy design. Treat secrets as sensitive API data rather than harmless base64 strings. Keep service discovery, controller health, storage and application readiness in the dependency map.",
    "troubleshooting": [
      [
        "Pod Pending",
        "Inspect events, per-node fit, affinity/taints and PVC binding/topology rather than summing free CPU globally."
      ],
      [
        "Service has no usable backend",
        "Compare exact selector labels and readiness, then inspect actual EndpointSlices."
      ],
      [
        "Pod Ready but clients fail",
        "Check service/target port, DNS, policy and the real client path."
      ],
      [
        "API says Forbidden",
        "Inspect acting subject, namespace, resource and verb; do not grant cluster-admin as a diagnostic shortcut."
      ]
    ],
    "security": "Grant only needed verbs/resources, scope bindings appropriately and avoid exposing service-account tokens. API permission to read Secrets can reveal credentials. Network isolation requires its own supported policy implementation and tests.",
    "performance": "Requests influence scheduling; limits and runtime behavior influence execution. A ready set with one endpoint may have insufficient survivor capacity. Measure actual workload latency, throttling and storage behavior before asserting resilience.",
    "mistakes": [
      "Equating an accepted manifest with healthy service.",
      "Diagnosing every Pending Pod as aggregate CPU shortage.",
      "Ignoring readiness when checking labels.",
      "Confusing RBAC with network reachability."
    ],
    "ports": "Kubernetes Service port and targetPort can differ; inspect both. Pod-to-service networking, API access and storage protocols are configured separately. The selector companion opens no sockets.",
    "prerequisites": [
      "ADD-CONT-001",
      "ADD-APP-003"
    ],
    "related": [
      "s8-g6-t4",
      "ADD-CONT-003"
    ],
    "artifacts": [
      {
        "title": "Scoped container, selector and recovery companion",
        "path": "labs/container-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Kubernetes Pod scheduling",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
        "checked": "2026-10-09"
      },
      {
        "title": "Kubernetes Services",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/",
        "checked": "2026-10-09"
      },
      {
        "title": "Kubernetes persistent volumes",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
        "checked": "2026-10-09"
      },
      {
        "title": "Kubernetes RBAC good practices",
        "url": "https://kubernetes.io/docs/concepts/security/rbac-good-practices/",
        "checked": "2026-10-09"
      },
      {
        "title": "Kubernetes probes",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/probes/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Predict an endpoint-selection fault and construct a layered cluster investigation.",
      "requirements": "Python 3.10+ for the offline case. The optional target plan requires a separately owned disposable cluster/namespace; no cluster is used by the companion.",
      "topology": [
        "Service selector app=web",
        "web-a: matching and ready",
        "web-b: matching but not ready",
        "Selected model endpoint set"
      ],
      "steps": [
        "Predict the baseline endpoint set before running the command.",
        "Run the selectors case and record web-a / empty / web-a.",
        "Explain why web-b is absent despite matching labels.",
        "Write a guided cluster investigation from current context through Pod events, EndpointSlices, ports and client probe.",
        "Add a PVC topology mismatch and an RBAC denial to the notebook; identify the evidence needed for each.",
        "State which Kubernetes behaviors the exact-label model intentionally excludes."
      ],
      "verification": "The model returns [web-a], [], [web-a]. Your investigation distinguishes scheduling, readiness, discovery, networking, storage and authorization rather than inferring a complete diagnosis from one status.",
      "troubleshooting": "An empty selector is rejected by this teaching model because real selectorless Service semantics require another workflow. Do not use it as an API validator.",
      "challenge": "Three ready replicas share one zone and one zonal volume. Explain why replica count alone does not prove zone-failure recovery.",
      "cleanup": "The offline case changes no cluster or local configuration. A guided target extension must delete only its explicitly owned resources after preserving required data."
    },
    "glossary": {
      "Reconciliation": "Repeatedly comparing declared and observed state and acting toward the declaration.",
      "EndpointSlice": "API representation of service endpoint information.",
      "PVC": "PersistentVolumeClaim: a workload request for persistent storage.",
      "RBAC": "Role-based authorization for Kubernetes API operations."
    },
    "rehearsal": {
      "scope": "Authored exact-label/readiness model, not Kubernetes API or packet evidence.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "Selector app=web",
            "web-a ready; web-b not ready",
            "Selected: web-a"
          ],
          "interpretation": "Matching labels and readiness both affect this supplied set.",
          "next": "Inspect real EndpointSlices on an owned cluster."
        },
        {
          "name": "Fault",
          "evidence": [
            "Selector changed to app=api",
            "Pod records unchanged",
            "Selected: none"
          ],
          "interpretation": "A selector mismatch explains the model’s empty set.",
          "next": "Compare exact labels before changing network policy."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Selector restored to app=web",
            "Selected: web-a"
          ],
          "interpretation": "The selected set recovers in the model only.",
          "next": "Validate target ports, client traffic and data separately."
        }
      ]
    },
    "quick": [
      {
        "question": "Does API acceptance prove a Pod serves traffic?",
        "answer": "No.",
        "explanation": "Reconciliation, startup and readiness occur afterward.",
        "testedConcept": "Desired vs observed",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-QC1",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "Why is web-b excluded?",
        "answer": "It is declared not ready despite matching labels.",
        "explanation": "The model requires both conditions.",
        "testedConcept": "Endpoint eligibility",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-QC2",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "Does RBAC allow a network flow?",
        "answer": "It controls API operations, not packet policy.",
        "explanation": "NetworkPolicy and application authorization have separate roles.",
        "testedConcept": "Policy boundaries",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-QC3",
        "topicId": "ADD-CONT-002"
      }
    ],
    "exams": [
      {
        "question": "A Pod is Pending with spare cluster CPU. What else can prevent placement?",
        "answer": "Per-node fit, affinity/selectors, taints or storage constraints.",
        "explanation": "Aggregate capacity is not the scheduler’s complete decision.",
        "testedConcept": "Scheduling",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX1",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "What set does selector app=api produce in the supplied records?",
        "answer": "An empty set.",
        "explanation": "Both supplied Pod labels are app=web.",
        "testedConcept": "Exact matching",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX2",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "Why inspect EndpointSlices rather than only Pod names?",
        "answer": "They show service endpoint information after relevant selection/readiness processing.",
        "explanation": "A Pod existing does not guarantee service eligibility.",
        "testedConcept": "Discovery evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX3",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "A Pod is Ready and a Service still fails. Name three next checks.",
        "answer": "Service/target ports, DNS resolution and network policy/client path.",
        "explanation": "Readiness tests a narrower boundary than every consumer route.",
        "testedConcept": "Layered diagnosis",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX4",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "What does a bound PVC fail to prove?",
        "answer": "Successful mounting, application access, durable writes and recovery.",
        "explanation": "Binding is one control-plane step.",
        "testedConcept": "Storage verification",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX5",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "A service account receives Forbidden for list secrets. What is a narrow response?",
        "answer": "Verify whether that operation is needed and inspect its exact binding scope instead of granting cluster-admin.",
        "explanation": "Use minimum necessary authority.",
        "testedConcept": "Least privilege",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX6",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "Why is base64 not protection for a Secret?",
        "answer": "It is reversible encoding rather than confidentiality.",
        "explanation": "Access control, encryption and handling policy remain necessary.",
        "testedConcept": "Secret handling",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX7",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "What does readiness failure usually change?",
        "answer": "Whether the Pod should receive service traffic under the configured behavior.",
        "explanation": "It is distinct from liveness-triggered restart.",
        "testedConcept": "Probe roles",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX8",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "Why does this model reject an empty selector?",
        "answer": "Selectorless Services are outside its deliberately narrow matching contract.",
        "explanation": "The model is not a general Kubernetes schema validator.",
        "testedConcept": "Model boundary",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX9",
        "topicId": "ADD-CONT-002"
      },
      {
        "question": "How do you prove zone resilience for a stateful workload?",
        "answer": "Verify placement, storage availability, ownership, survivor capacity and application recovery under that failure.",
        "explanation": "Three replicas alone omit several critical dependencies.",
        "testedConcept": "Failure domains",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-002-EX10",
        "topicId": "ADD-CONT-002"
      }
    ],
    "batch": "32",
    "title": "Kubernetes scheduling, networking, storage and RBAC",
    "level": "Operational foundations / applied practice"
  },
  {
    "id": "ADD-CONT-003",
    "subtitle": "Separate rollout reversal from data recovery and cluster maintenance.",
    "minutes": 60,
    "definition": "Kubernetes operations reconcile deployments, diagnose failed workloads and maintain the cluster while protecting application state. A rollout rollback changes workload configuration history; backup restoration recovers selected state; an upgrade changes platform versions. These operations have different prerequisites and failure boundaries.",
    "purpose": "Develop a recovery plan that keeps acknowledged data, control-plane state and application compatibility distinct. Practice reading baseline/fault/recovery records, then prepare an upgrade rehearsal with supported version paths, protected backups, capacity during drain and explicit stop conditions.",
    "mental": "A Deployment revision is a recipe for running workloads, not a time machine for all data they wrote. Restoring an older recipe may leave newer schema or transactions intact. Likewise, an etcd snapshot captures cluster control state, not every application volume or external database.",
    "components": [
      "Rollout state: desired/available replicas, image identity, probe behavior and failure events.",
      "Debug evidence: container logs, previous exits, events and actual user operations with bounded scope.",
      "Backup set: API/control state, persistent volumes, external databases, keys and restoration procedures.",
      "Upgrade plan: supported version/skew rules, components, add-ons, node order and recovery compatibility.",
      "Maintenance capacity: disruption budgets, placement and spare capacity for drained workloads."
    ],
    "mechanism": [
      "Diagnose the failed layer before rolling back: image pull, configuration, crash, readiness, service selection or data incompatibility. Preserve the failed revision and relevant logs so the mitigation does not erase all explanation.",
      "A rollout undo can restore an earlier workload template but cannot automatically reverse schema or external side effects. Validate the old application against current data before deciding it is a safe reversal.",
      "Back up each required state source under an application-consistent policy and test restoration to an isolated target. Keep encryption keys and access credentials recoverable independently; an inaccessible snapshot is not operational recovery.",
      "For a kubeadm-managed cluster, read the version-specific supported upgrade and skew guidance at execution time. Managed services have different workflows. Plan control-plane/add-on/node order, drain capacity and stop conditions; do not improvise a skipped-version jump.",
      "After maintenance, validate control-plane health, workload placement, storage, discovery, policy and original transactions. Record recovery-point age and acknowledged loss separately from elapsed restoration time. Restore/fail back only under a known writer-ownership plan."
    ],
    "flow": [
      [
        "Capture",
        "Save revision, data point and bounded failure evidence."
      ],
      [
        "Choose action",
        "Separate template rollback, data restore and platform upgrade."
      ],
      [
        "Rehearse",
        "Use isolated restore and supported maintenance order with stop conditions."
      ],
      [
        "Validate",
        "Check application transactions, acknowledged loss and stable workload state."
      ]
    ],
    "comparison": [
      [
        "Rollout rollback",
        "Restores a prior workload template revision",
        "Does not undo database writes"
      ],
      [
        "etcd snapshot",
        "Captures Kubernetes control-plane state",
        "Does not include all PV or external database data"
      ],
      [
        "Application backup",
        "Retains a usable data recovery point",
        "Requires consistency, keys and tested restore"
      ],
      [
        "Node drain",
        "Moves/removes eligible workloads for maintenance",
        "Needs spare capacity and disruption-aware planning"
      ]
    ],
    "example": "The companion writes a local record for revision v1 with order-1 and order-2, saves its bytes, then writes revision v2 and acknowledged order-3. Restoring the saved file returns exactly to v1 and explicitly loses order-3. This is an actual JSON restore, not an etcd snapshot, Kubernetes rollback or measured cluster RPO.",
    "commands": [
      {
        "filename": "Lab notebook",
        "platform": "Python 3.10+; container case also needs an owned Docker engine",
        "code": "python3 labs/container-operations.py --case recovery",
        "explanation": "Run only the selected scoped exercise. Container mode requires Docker, Compose and an already cached nginx:alpine image; it never pulls.",
        "expected": "Read the explicit scope and postconditions. Missing tools/image are blockers, not passing substitutes."
      }
    ],
    "configuration": "Before an owned cluster rollout, retain image digests and manifests plus a compatible data recovery plan. Use a disposable namespace for rehearsal, validate the intended context and observe rollout progress with application probes. For upgrades, capture component versions, review supported paths and test restores before draining. Restore only the known owned baseline; never delete all workloads to force a clean-looking state.",
    "production": "Rehearse recovery regularly with protected backups outside the immediate failure domain. Track which components are provider-managed and which your team upgrades. Ensure add-ons, storage drivers and policy implementations remain compatible with the chosen version. Maintenance budgets and application capacity must be evaluated together.",
    "troubleshooting": [
      [
        "CrashLoopBackOff after rollout",
        "Inspect previous container exit/logs and changed configuration; the backoff label is a symptom, not a cause."
      ],
      [
        "Undo completes but data errors remain",
        "Compare schema and persistent state compatibility with the restored template."
      ],
      [
        "Drain cannot evict workloads",
        "Inspect disruption constraints, unavailable replicas and capacity before overriding protections."
      ],
      [
        "Control plane restores but application is empty",
        "Check PV/external database restore, keys and data consistency; etcd alone may be insufficient."
      ]
    ],
    "security": "Backups can contain Secrets, credentials and personal data. Protect them with restricted access and recoverable encryption keys, and test restore access with the intended operator identity. Do not paste kubeconfig credentials or raw Secret values into a public incident record.",
    "performance": "Reserve capacity for surge and maintenance; a rollout can temporarily create more replicas or reduce available capacity. Measure recovery time from the agreed incident boundary through application validation, not merely the duration of a restore command.",
    "mistakes": [
      "Assuming rollout undo reverses data.",
      "Treating an etcd snapshot as a complete application backup.",
      "Forcing drain without understanding availability constraints.",
      "Skipping version compatibility checks."
    ],
    "ports": "Cluster API, node, storage and application paths have deployment-specific endpoints. The local recovery companion opens no network connection and uses no kubeconfig.",
    "prerequisites": [
      "ADD-CONT-002",
      "ADD-INFRA-003"
    ],
    "related": [
      "capstone-final",
      "s9-g6-t1"
    ],
    "artifacts": [
      {
        "title": "Scoped container, selector and recovery companion",
        "path": "labs/container-operations.py"
      }
    ],
    "sources": [
      {
        "title": "Kubernetes probes",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/probes/",
        "checked": "2026-10-09"
      },
      {
        "title": "Upgrading kubeadm clusters",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/",
        "checked": "2026-10-09"
      },
      {
        "title": "Operating etcd clusters",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/",
        "checked": "2026-10-09"
      }
    ],
    "lab": {
      "objective": "Observe explicit acknowledged-data loss in a local restore and prepare a defensible cluster recovery/upgrade plan.",
      "requirements": "Python 3.10+ for the executed local case. Cluster upgrade and restore steps are guided planning for a separately owned disposable target.",
      "topology": [
        "v1 record: order-1/order-2",
        "Saved local snapshot",
        "v2 adds acknowledged order-3",
        "Restore v1 and reconcile loss"
      ],
      "steps": [
        "Predict restored revision and order IDs before execution.",
        "Run the recovery case; require restoredExact=true and lostAcknowledged=[order-3].",
        "List the separate backup sources a real application would need: API state, volumes, database, keys and external dependencies.",
        "Draft a controlled rollout failure rehearsal with image/config evidence and a compatible undo decision.",
        "Draft an upgrade plan using the target’s actual distribution/version guidance, drain capacity and stop conditions.",
        "Define post-upgrade application and data checks, and record unexecuted target steps honestly."
      ],
      "verification": "The local file matches the saved snapshot and acknowledged order-3 is explicitly lost; cleanupVerified=true. The plan does not label this as a Kubernetes or etcd recovery test.",
      "troubleshooting": "If the restored IDs differ, treat it as a failed local restore. On a real target, stop when writer ownership, backup usability or version compatibility is unknown.",
      "challenge": "A database migration is irreversible while the new image fails readiness. Compare forward repair with restoring a protected data point and explain the data-loss decision.",
      "cleanup": "The local temporary directory is removed. Guided cluster work needs its own exact resource ownership, restoration and cleanup record."
    },
    "glossary": {
      "Rollout": "Transition of workload configuration toward a new declared revision.",
      "Disruption budget": "Constraint used to limit certain voluntary disruptions of workloads.",
      "Recovery point": "The state/time to which data can actually be restored.",
      "Version skew": "Difference between component versions, allowed only within supported rules."
    },
    "rehearsal": {
      "scope": "Authored local snapshot record; no Kubernetes rollout, etcd, volume or upgrade execution.",
      "states": [
        {
          "name": "Baseline",
          "evidence": [
            "Revision v1; acknowledged order-1 and order-2",
            "Snapshot bytes retained"
          ],
          "interpretation": "The local restore point contains two acknowledged records.",
          "next": "Protect and test all real application backup sources separately."
        },
        {
          "name": "Fault",
          "evidence": [
            "Revision v2; acknowledged order-3 added",
            "Decision to restore older point"
          ],
          "interpretation": "Restoration may lose acknowledged work newer than the snapshot.",
          "next": "Obtain the agreed data-loss decision before a real restore."
        },
        {
          "name": "Recovery",
          "evidence": [
            "Exact v1 bytes restored",
            "Lost acknowledged ID: order-3"
          ],
          "interpretation": "Integrity with the snapshot does not mean zero data loss.",
          "next": "Verify actual client state and ownership before real cutover."
        }
      ]
    },
    "quick": [
      {
        "question": "Does Deployment rollback undo database writes?",
        "answer": "No.",
        "explanation": "It restores workload template state, not all persistent side effects.",
        "testedConcept": "Rollback scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-QC1",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "Does etcd back up every PV?",
        "answer": "No.",
        "explanation": "Control-plane state and application data need separate recovery planning.",
        "testedConcept": "Backup coverage",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-QC2",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "What does the local restore lose?",
        "answer": "Acknowledged order-3.",
        "explanation": "It was written after the saved recovery point.",
        "testedConcept": "Data reconciliation",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-QC3",
        "topicId": "ADD-CONT-003"
      }
    ],
    "exams": [
      {
        "question": "Why preserve previous container logs before replacement?",
        "answer": "They can contain the evidence explaining the failed execution.",
        "explanation": "A new healthy process may hide the prior failure context.",
        "testedConcept": "Debug evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX1",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "What must be checked before running an older image against current data?",
        "answer": "Schema and behavior compatibility plus any irreversible side effects.",
        "explanation": "Image rollback alone does not reverse migration.",
        "testedConcept": "Data compatibility",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX2",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "Name four elements beyond etcd that a backup plan may require.",
        "answer": "Application volumes, external databases, encryption keys and recovery credentials/dependencies.",
        "explanation": "A complete service spans more than the Kubernetes API store.",
        "testedConcept": "Recovery set",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX3",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "Why can drain be blocked legitimately?",
        "answer": "Disruption constraints or insufficient available replicas/capacity protect service availability.",
        "explanation": "A blocked operation is not automatically a reason to force it.",
        "testedConcept": "Maintenance safety",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX4",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "Should this lesson specify one upgrade command for every cluster?",
        "answer": "No; distribution, ownership model and supported version path determine the procedure.",
        "explanation": "Managed and kubeadm clusters have different workflows.",
        "testedConcept": "Version scope",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX5",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "What starts and ends an RTO measurement?",
        "answer": "The agreed disruption boundary through restored and validated service.",
        "explanation": "A restore command’s runtime omits detection, preparation and application verification.",
        "testedConcept": "Recovery timing",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX6",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "Can a backup be intact yet unusable?",
        "answer": "Yes, if keys, credentials, dependencies or application consistency are missing.",
        "explanation": "Recovery requires operational access and a valid state.",
        "testedConcept": "Usable backups",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX7",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "What does restoredExact prove in the companion?",
        "answer": "The local JSON record equals the saved baseline.",
        "explanation": "It does not prove zero data loss or a functioning cluster.",
        "testedConcept": "Restore evidence",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX8",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "How should a failed upgrade rehearsal be handled?",
        "answer": "Stop at the declared gate, retain evidence and use the tested recovery procedure for the actual target.",
        "explanation": "Continuing through unknown compatibility can compound failures.",
        "testedConcept": "Stop conditions",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX9",
        "topicId": "ADD-CONT-003"
      },
      {
        "question": "When can an incident close after restoring state?",
        "answer": "After ownership, data-loss acceptance, original transactions and required dependencies are verified.",
        "explanation": "Control-plane responsiveness alone is insufficient.",
        "testedConcept": "Service recovery",
        "difficulty": "applied",
        "type": "short-answer",
        "questionId": "ADD-CONT-003-EX10",
        "topicId": "ADD-CONT-003"
      }
    ],
    "batch": "32",
    "title": "Kubernetes deployment, debugging, backup and upgrades",
    "level": "Operational foundations / applied practice"
  }
];
