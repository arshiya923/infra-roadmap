#!/usr/bin/env bash
# Two isolated hosts and one router. Forwarding changes stay inside the router namespace.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo bash labs/dual-stack-routing.sh --run' 'Tests IPv4/IPv6 forwarding, a missing IPv4 return route and recovery inside three owned namespaces.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { printf '%s\n' 'Root namespace capability is required.' >&2; exit 1; }
for program in ip ping sysctl; do command -v "$program" >/dev/null; done
prefix="fb05r-${BASHPID}"; a="${prefix}-a"; b="${prefix}-b"; router="${prefix}-r"
created=()
cleanup(){ local ns; for ns in "${created[@]}"; do ip netns delete "$ns" 2>/dev/null || true; done; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
for ns in "$a" "$b" "$router"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Refusing existing namespace %s\n' "$ns" >&2; exit 1; fi
done
for ns in "$a" "$b" "$router"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
connect(){
  local host=$1 port=$2 host4=$3 router4=$4 host6=$5 router6=$6
  ip -n "$router" link add "$port" type veth peer name peer0
  ip -n "$router" link set peer0 netns "$host"
  ip -n "$host" link set peer0 name eth0
  ip -n "$host" address add "$host4/24" dev eth0
  ip -n "$router" address add "$router4/24" dev "$port"
  ip -n "$host" -6 address add "$host6/64" dev eth0
  ip -n "$router" -6 address add "$router6/64" dev "$port"
  ip -n "$host" link set eth0 up
  ip -n "$router" link set "$port" up
}
connect "$a" left 192.0.2.10 192.0.2.1 2001:db8:10::10 2001:db8:10::1
connect "$b" right 198.51.100.20 198.51.100.1 2001:db8:20::20 2001:db8:20::1
# Wait for ordinary IPv6 address readiness, including generated link-local DAD.
for ns in "$a" "$b" "$router"; do
  ready=0
  for ((attempt=0; attempt<30; attempt++)); do
    if ! ip -n "$ns" -6 address show | grep -Eq 'tentative|dadfailed'; then ready=1; break; fi
    sleep 0.1
  done
  [[ $ready -eq 1 ]] || { printf 'IPv6 addresses did not become ready in %s\n' "$ns" >&2; exit 1; }
done
ip netns exec "$router" sysctl -qw net.ipv4.ip_forward=1
ip netns exec "$router" sysctl -qw net.ipv6.conf.all.forwarding=1
ip -n "$a" -4 route add default via 192.0.2.1
ip -n "$a" -6 route add default via 2001:db8:10::1
ip -n "$b" -4 route add 192.0.2.0/24 via 198.51.100.1
ip -n "$b" -6 route add 2001:db8:10::/64 via 2001:db8:20::1
probe(){ ip netns exec "$1" ping "-$2" -n -c 1 -W 2 "$3" >/dev/null; }
baseline(){ probe "$a" 4 198.51.100.20; probe "$b" 4 192.0.2.10; probe "$a" 6 2001:db8:20::20; probe "$b" 6 2001:db8:10::10; }
baseline
printf '%s\n' 'PASS baseline: both hosts exchange IPv4 and IPv6 traffic through the isolated router.'
ip -n "$b" -4 route del 192.0.2.0/24 via 198.51.100.1
if ip -n "$b" -4 route get 192.0.2.10 >/dev/null 2>&1; then printf '%s\n' 'Unexpected IPv4 return route.' >&2; exit 1; fi
if probe "$a" 4 198.51.100.20; then printf '%s\n' 'Unexpected IPv4 success without return route.' >&2; exit 1; fi
probe "$a" 6 2001:db8:20::20; probe "$b" 6 2001:db8:10::10
printf '%s\n' 'PASS injected fault: missing IPv4 return route breaks the exchange while IPv6 remains working.'
ip -n "$b" -4 route add 192.0.2.0/24 via 198.51.100.1
baseline
printf '%s\n' 'PASS recovery: the restored IPv4 return route recovers both directions; IPv6 still works.'
cleanup
for ns in "${created[@]}"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Cleanup failed: %s\n' "$ns" >&2; exit 1; fi
done
created=()
printf '%s\n' 'PASS cleanup: all owned routing namespaces removed.'
