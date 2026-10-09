#!/usr/bin/env bash
# Isolated LAN lab: two PC namespaces, a bridge namespace and a gateway namespace.
# Nothing attaches to an existing host interface, network, route or firewall.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo bash labs/foundation-lan.sh --run' 'Creates temporary isolated namespaces, tests a prefix fault and recovery, then removes its own resources.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { printf '%s\n' 'Root is required to create isolated network namespaces.' >&2; exit 1; }
command -v ip >/dev/null
command -v ping >/dev/null
prefix="fb04-${BASHPID}"
pc_a="${prefix}-a"; pc_b="${prefix}-b"; sw="${prefix}-sw"; gw="${prefix}-gw"
created=()
cleanup() {
  local ns
  for ns in "${created[@]}"; do ip netns delete "$ns" 2>/dev/null || true; done
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
for ns in "$pc_a" "$pc_b" "$sw" "$gw"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then
    printf 'Refusing to reuse existing namespace %s\n' "$ns" >&2
    exit 1
  fi
done
for ns in "$pc_a" "$pc_b" "$sw" "$gw"; do
  ip netns add "$ns"; created+=("$ns")
  ip -n "$ns" link set lo up
done
ip -n "$sw" link add br0 type bridge
ip -n "$sw" link set br0 up
# Create both veth ends inside the switch namespace, then move the PC end.
# No temporary link is created in the host network namespace.
connect() {
  local ns=$1 port=$2
  ip -n "$sw" link add "$port" type veth peer name peer0
  ip -n "$sw" link set peer0 netns "$ns"
  ip -n "$ns" link set peer0 name eth0
  ip -n "$ns" link set eth0 up
  ip -n "$sw" link set "$port" master br0
  ip -n "$sw" link set "$port" up
}
connect "$pc_a" pa
connect "$pc_b" pb
connect "$gw" pg
ip -n "$pc_a" address add 192.0.2.10/27 dev eth0
ip -n "$pc_b" address add 192.0.2.20/27 dev eth0
ip -n "$gw" address add 192.0.2.1/27 dev eth0
printf '%s\n' 'TOPOLOGY: PC-A eth0 <-> switch pa; PC-B eth0 <-> switch pb; gateway eth0 <-> switch pg; switch ports share br0.'
printf '%s\n' 'SCOPE: isolated virtual Ethernet; no host uplink, NAT, DNS or external forwarding.'
probe() { ip netns exec "$1" ping -n -c 2 -W 1 "$2" >/dev/null; }
probe "$pc_a" 192.0.2.20
probe "$pc_b" 192.0.2.10
probe "$pc_a" 192.0.2.1
probe "$pc_b" 192.0.2.1
printf '%s\n' 'PASS baseline: peers in both directions and gateway address reachable.'
printf '%s\n' 'INJECT: PC-B prefix changes from /27 to /28; it has no default route.'
ip -n "$pc_b" address del 192.0.2.20/27 dev eth0
ip -n "$pc_b" address add 192.0.2.20/28 dev eth0
if ip -n "$pc_b" route get 192.0.2.10 >/dev/null 2>&1; then
  printf '%s\n' 'FAIL fault expectation: PC-B unexpectedly has a route to PC-A.' >&2
  exit 1
fi
if probe "$pc_b" 192.0.2.10 2>/dev/null; then
  printf '%s\n' 'FAIL fault expectation: PC-B unexpectedly reached PC-A.' >&2
  exit 1
fi
printf '%s\n' 'PASS injected fault: PC-B /28 excludes PC-A; route lookup and peer ping fail as expected.'
ip -n "$pc_b" address del 192.0.2.20/28 dev eth0
ip -n "$pc_b" address add 192.0.2.20/27 dev eth0
probe "$pc_a" 192.0.2.20
probe "$pc_b" 192.0.2.10
probe "$pc_a" 192.0.2.1
probe "$pc_b" 192.0.2.1
printf '%s\n' 'PASS recovery: restored /27, bidirectional peer and gateway probes succeed.'
cleanup
for ns in "$pc_a" "$pc_b" "$sw" "$gw"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then
    printf 'FAIL cleanup: namespace remains %s\n' "$ns" >&2
    exit 1
  fi
done
created=()
printf '%s\n' 'PASS cleanup: all four owned namespaces removed.'
