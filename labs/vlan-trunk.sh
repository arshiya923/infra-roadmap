#!/usr/bin/env bash
# Isolated two-bridge VLAN/trunk exercise. No host links, routes or uplinks.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo bash labs/vlan-trunk.sh --run' 'Creates five owned namespaces; tests VLAN isolation, a missing trunk VLAN and recovery; cleans up.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { printf '%s\n' 'Root namespace capability is required.' >&2; exit 1; }
for program in ip bridge ping python3; do command -v "$program" >/dev/null; done
prefix="fb05v-${BASHPID}"
a="${prefix}-a"; b="${prefix}-b"; c="${prefix}-c"; s1="${prefix}-s1"; s2="${prefix}-s2"
created=()
cleanup(){ local ns; for ns in "${created[@]}"; do ip netns delete "$ns" 2>/dev/null || true; done; }
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
for ns in "$a" "$b" "$c" "$s1" "$s2"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Refusing existing namespace %s\n' "$ns" >&2; exit 1; fi
done
for ns in "$a" "$b" "$c" "$s1" "$s2"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
for sw in "$s1" "$s2"; do
  ip -n "$sw" link add br0 type bridge vlan_filtering 1 vlan_default_pvid 0
  ip -n "$sw" link set br0 up
done
access(){
  local sw=$1 host=$2 port=$3 vid=$4 address=$5
  ip -n "$sw" link add "$port" type veth peer name peer0
  ip -n "$sw" link set peer0 netns "$host"
  ip -n "$host" link set peer0 name eth0
  ip -n "$host" address add "$address/24" dev eth0
  ip -n "$host" link set eth0 up
  ip -n "$sw" link set "$port" master br0
  bridge -n "$sw" vlan add dev "$port" vid "$vid" pvid untagged
  ip -n "$sw" link set "$port" up
}
access "$s1" "$a" pa 10 192.0.2.10
access "$s2" "$b" pb 10 192.0.2.20
# Same IP prefix deliberately demonstrates that IP settings do not merge VLANs.
access "$s2" "$c" pc 20 192.0.2.30
ip -n "$s1" link add trunk1 type veth peer name trunk2
ip -n "$s1" link set trunk2 netns "$s2"
for tuple in "$s1:trunk1" "$s2:trunk2"; do
  sw=${tuple%:*}; port=${tuple#*:}
  ip -n "$sw" link set "$port" master br0
  bridge -n "$sw" vlan add dev "$port" vid 10
  bridge -n "$sw" vlan add dev "$port" vid 20
  ip -n "$sw" link set "$port" up
done
probe(){ ip netns exec "$1" ping -4 -n -c 1 -W 1 "$2" >/dev/null; }
deny(){ if probe "$1" "$2"; then printf 'Unexpected cross-domain delivery: %s\n' "$2" >&2; exit 1; fi; }
probe "$a" 192.0.2.20; probe "$b" 192.0.2.10
deny "$a" 192.0.2.30; deny "$c" 192.0.2.10
printf '%s\n' 'PASS baseline: VLAN 10 peers communicate both ways across tagged trunk.' 'PASS isolation: same-prefix VLAN 20 endpoint cannot exchange with VLAN 10.'
bridge -n "$s2" vlan del dev trunk2 vid 10
ip -n "$s2" -j link show dev trunk2 | python3 -c 'import json,sys; assert "UP" in json.load(sys.stdin)[0]["flags"]'
deny "$a" 192.0.2.20; deny "$b" 192.0.2.10
printf '%s\n' 'PASS injected fault: deleting trunk VLAN 10 breaks that path while the link remains UP.'
bridge -n "$s2" vlan add dev trunk2 vid 10
probe "$a" 192.0.2.20; probe "$b" 192.0.2.10
deny "$a" 192.0.2.30; deny "$c" 192.0.2.10
printf '%s\n' 'PASS recovery: VLAN 10 restored and VLAN 20 isolation retained.'
cleanup
for ns in "${created[@]}"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then printf 'Cleanup failed: %s\n' "$ns" >&2; exit 1; fi
done
created=()
printf '%s\n' 'PASS cleanup: all owned namespaces removed.'
