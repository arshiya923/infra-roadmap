# Batch 02 primary-source research

Checked 4 October 2026. Sources verify the mechanisms and command contracts used in the lessons; examples and questions are original. No current exam-blueprint alignment is asserted.

| Source | Use in review |
|---|---|
| [Microsoft user/kernel modes](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode) | OS/application boundaries and driver context |
| [Microsoft UAC](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works) | Administrator membership versus a process's elevation context |
| [Get-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service?view=powershell-7.5) | Service observations; state is not client readiness |
| [Get-Process](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process?view=powershell-7.5) | Process objects and memory-property units |
| [Get-WinEvent](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent?view=powershell-7.5) | Time-bounded queries and visibility limitations |
| [Server Core](https://learn.microsoft.com/en-us/windows-server/administration/server-core/what-is-server-core) | Installation-option tradeoffs and workload support |
| [Get-WindowsFeature](https://learn.microsoft.com/en-us/powershell/module/servermanager/get-windowsfeature?view=windowsserver2025-ps) | ServerManager inventory semantics; not a universal client command |
| [Get-DnsClientServerAddress](https://learn.microsoft.com/en-us/powershell/module/dnsclient/get-dnsclientserveraddress?view=windowsserver2025-ps) | Configured resolver addresses versus a hosted DNS service |
| [DNS and AD DS](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds) | Name resolution dependencies for domain-controller discovery |
| [Linux pathname resolution](https://man7.org/linux/man-pages/man7/path_resolution.7.html) | Parent-directory traversal and permissions |
| [chmod](https://man7.org/linux/man-pages/man1/chmod.1.html) | Symbolic/octal mode interpretation and model boundaries |
| [systemctl](https://man7.org/linux/man-pages/man1/systemctl.1.html) | Unit state, enablement and daemon-reload distinctions |
| [PowerShell pipelines](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines?view=powershell-7.5) | Objects versus presentation data |
| [PowerShell quoting](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules?view=powershell-7.5) | Literal versus interpolated arguments |
| [PowerShell automatic variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables?view=powershell-7.5) | Native exit codes and status scope |
| [GNU Bash manual](https://man7.org/linux/man-pages/man1/bash.1.html) | Pipeline status, quoting and pipefail |

The upstream freedesktop systemctl page and GNU web pipeline page did not load through the research tool; maintainer-authored manual pages hosted by man7 supplied the relevant references instead. Windows Server 2022/2025 examples are explicitly labelled for Windows PowerShell 5.1 and the required modules; ordinary Windows observations were also executed locally. Browser simulation does not claim to implement full POSIX/Windows effective-access evaluation.
