#!/usr/bin/env bash
# Four owned IPv4 namespaces; no host route/forwarding changes, Internet or persistent service.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo bash labs/static-routing.sh --run' 'Builds client-R1-R2-server namespaces; tests static next hops, a more-specific discard, missing return route and cleanup.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { printf '%s\n' 'Root namespace capability is required.' >&2; exit 1; }
for program in ip ping sysctl; do command -v "$program" >/dev/null; done
prefix="fb09s-${BASHPID}"; client="${prefix}-c"; r1="${prefix}-r1"; r2="${prefix}-r2"; server="${prefix}-s"
created=()
cleanup(){ local ns; for ns in "${created[@]}"; do ip netns delete "$ns" 2>/dev/null || true; done; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
for ns in "$client" "$r1" "$r2" "$server"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Refusing existing namespace %s\n' "$ns" >&2; exit 1; fi
done
for ns in "$client" "$r1" "$r2" "$server"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
connect(){
  local a=$1 ap=$2 aa=$3 b=$4 bp=$5 ba=$6 bits=$7
  ip -n "$a" link add "$ap" type veth peer name peer0
  ip -n "$a" link set peer0 netns "$b"
  ip -n "$b" link set peer0 name "$bp"
  ip -n "$a" address add "$aa/$bits" dev "$ap"
  ip -n "$b" address add "$ba/$bits" dev "$bp"
  ip -n "$a" link set "$ap" up
  ip -n "$b" link set "$bp" up
}
connect "$client" eth0 192.0.2.10 "$r1" left 192.0.2.1 24
connect "$r1" transit 203.0.113.1 "$r2" transit 203.0.113.2 30
connect "$r2" right 198.51.100.1 "$server" eth0 198.51.100.20 24
for ns in "$r1" "$r2"; do ip netns exec "$ns" sysctl -qw net.ipv4.ip_forward=1; done
ip -n "$client" route add 198.51.100.0/24 via 192.0.2.1 dev eth0
ip -n "$r1" route add 198.51.100.0/24 via 203.0.113.2 dev transit
ip -n "$r2" route add 192.0.2.0/24 via 203.0.113.1 dev transit
ip -n "$server" route add 192.0.2.0/24 via 198.51.100.1 dev eth0
probe(){ ip netns exec "$1" ping -4 -n -c 1 -W 2 "$2" >/dev/null; }
baseline(){ probe "$client" 198.51.100.20; probe "$server" 192.0.2.10; }
baseline
printf '%s\n' 'PASS baseline: both IPv4 directions cross two isolated routers with explicit static next hops.'
printf 'FORWARD_BASELINE '; ip -n "$r1" -j route get 198.51.100.20 from 192.0.2.10 iif left
printf 'RETURN_BASELINE '; ip -n "$r2" -j route get 192.0.2.10 from 198.51.100.20 iif right
# This Linux validation failure is not a Cisco configuration/RIB-installation simulation.
if ip -n "$r1" route add 198.51.100.128/25 via 203.0.113.6 dev transit 2>/dev/null; then
  printf '%s\n' 'Unexpected route accepted through a gateway outside the prepared directly connected /30.' >&2; exit 1
fi
baseline
printf '%s\n' 'PASS gateway validation: Linux rejected the unresolved supplied gateway; the original static path still works.'
ip -n "$r1" route add blackhole 198.51.100.20/32
printf 'DISCARD_TABLE '; ip -n "$r1" -j route show table main
if probe "$client" 198.51.100.20; then printf '%s\n' 'Unexpected success through the more-specific discard.' >&2; exit 1; fi
ip -n "$r1" route del blackhole 198.51.100.20/32
baseline
printf '%s\n' 'PASS prefix discard: the /32 blackhole overrides the installed /24; exact owned removal restores the exchange.'
ip -n "$r2" route del 192.0.2.0/24 via 203.0.113.1 dev transit
if ip -n "$r2" route get 192.0.2.10 >/dev/null 2>&1; then printf '%s\n' 'Unexpected return route.' >&2; exit 1; fi
printf 'FORWARD_DURING_RETURN_FAULT '; ip -n "$r1" -j route get 198.51.100.20 from 192.0.2.10 iif left
if probe "$client" 198.51.100.20; then printf '%s\n' 'Unexpected exchange without return route.' >&2; exit 1; fi
probe "$client" 192.0.2.1
printf '%s\n' 'PASS return fault: remote exchange fails while the client gateway and R1 forward lookup remain available.'
ip -n "$r2" route add 192.0.2.0/24 via 203.0.113.1 dev transit
baseline
printf '%s\n' 'PASS recovery: the exact owned return route restores both IPv4 directions.'
cleanup
for ns in "${created[@]}"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Cleanup failed: %s\n' "$ns" >&2; exit 1; fi
done
created=()
printf '%s\n' 'PASS cleanup: four owned namespaces removed; no persistent route or service created.'
