#!/usr/bin/env bash
# Actual FRR 8.4 OSPFv2 in five owned network namespaces. Default is inert.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo FRR_ROOT=/path/to/extracted/frr/root bash labs/ospf-areas.sh --run' 'Requires FRR 8.4 zebra/ospfd/vtysh and their libraries; never installs or starts a system service.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { echo 'Root namespace capability is required.' >&2; exit 1; }
: "${FRR_ROOT:?Supply an extracted FRR 8.4 root directory}"
FRR_ROOT=$(realpath "$FRR_ROOT")
export LD_LIBRARY_PATH="$FRR_ROOT/usr/lib/x86_64-linux-gnu/frr:$FRR_ROOT/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
zebra="$FRR_ROOT/usr/lib/frr/zebra"; ospfd="$FRR_ROOT/usr/lib/frr/ospfd"; vtysh="$FRR_ROOT/usr/bin/vtysh"
for program in ip ping sysctl python3 unshare mount; do command -v "$program" >/dev/null; done
for binary in "$zebra" "$ospfd" "$vtysh"; do [[ -x $binary ]]; done
"$ospfd" --version | head -n 1
prefix="fb09a-${BASHPID}"; client="${prefix}-c"; r1="${prefix}-r1"; r2="${prefix}-r2"; r3="${prefix}-r3"; server="${prefix}-s"
work=$(mktemp -d /tmp/infra-ospf.XXXXXXXX); created=(); processes=()
cleanup(){
  local pid ns
  # Bound shutdown even if a tracked daemon is stopped or ignores TERM.
  # Unreaped children keep their PID; still recheck the unique runtime path.
  owned_running(){
    [[ -r /proc/$1/cmdline && -r /proc/$1/stat ]] &&
      [[ $(awk '{print $3}' "/proc/$1/stat") != Z ]] &&
      grep -azFq "$work/" "/proc/$1/cmdline"
  }
  for pid in "${processes[@]}"; do
    if owned_running "$pid"; then kill -TERM "$pid" 2>/dev/null || true; fi
  done
  local attempt active
  for ((attempt=0;attempt<30;attempt++)); do
    active=0
    for pid in "${processes[@]}"; do if owned_running "$pid"; then active=1; fi; done
    [[ $active == 0 ]] && break
    sleep .1
  done
  for pid in "${processes[@]}"; do
    if owned_running "$pid"; then kill -KILL "$pid" 2>/dev/null || true; fi
  done
  for pid in "${processes[@]}"; do wait "$pid" 2>/dev/null || true; done
  for ns in "${created[@]}"; do ip netns delete "$ns" 2>/dev/null || true; done
  [[ $work == /tmp/infra-ospf.* && -d $work ]] && rm -rf -- "$work"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
# Debian/Ubuntu FRR expects this group. Supply it only inside each private mount
# namespace; never edit the host /etc/group or create a persistent account.
cat /etc/group > "$work/group"
if ! getent group frrvty >/dev/null; then
  printf 'frrvty:x:0:root\n' >> "$work/group"
fi
private_frr(){
  unshare --mount --propagation private bash -c 'groupfile=$1; shift; mount --bind "$groupfile" /etc/group; exec "$@"' _ "$work/group" "$@"
}
private_daemon(){
  exec unshare --mount --propagation private bash -c 'groupfile=$1; shift; mount --bind "$groupfile" /etc/group; exec "$@"' _ "$work/group" "$@"
}
for ns in "$client" "$r1" "$r2" "$r3" "$server"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then echo "Refusing existing namespace $ns" >&2; exit 1; fi
done
for ns in "$client" "$r1" "$r2" "$r3" "$server"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
connect(){
  local a=$1 ap=$2 aa=$3 b=$4 bp=$5 ba=$6 bits=$7
  ip -n "$a" link add "$ap" type veth peer name peer0
  ip -n "$a" link set peer0 netns "$b"
  ip -n "$b" link set peer0 name "$bp"
  ip -n "$a" address add "$aa/$bits" dev "$ap"
  ip -n "$b" address add "$ba/$bits" dev "$bp"
  ip -n "$a" link set "$ap" up; ip -n "$b" link set "$bp" up
}
connect "$client" eth0 192.0.2.10 "$r1" lan 192.0.2.1 24
connect "$r1" backbone 203.0.113.1 "$r2" backbone 203.0.113.2 30
connect "$r2" branch 203.0.113.5 "$r3" branch 203.0.113.6 30
connect "$r3" lan 198.51.100.1 "$server" eth0 198.51.100.20 24
for ns in "$r1" "$r2" "$r3"; do ip netns exec "$ns" sysctl -qw net.ipv4.ip_forward=1; done
ip -n "$client" route add 198.51.100.0/24 via 192.0.2.1
ip -n "$server" route add 192.0.2.0/24 via 198.51.100.1
start_router(){
  local ns=$1 rid=$2
  mkdir "$work/$ns"
  printf 'username root nopassword\n' > "$work/$ns/vtysh.conf"
  printf 'hostname %s\n' "$ns" > "$work/$ns/zebra.conf"
  printf 'hostname %s\n' "$ns" > "$work/$ns/ospfd.conf"
  add_interface(){
    local name=$1 area=$2 passive=$3
    printf 'interface %s\n ip ospf area %s\n ip ospf cost 10\n' "$name" "$area" >> "$work/$ns/ospfd.conf"
    if [[ $passive == yes ]]; then printf ' ip ospf passive\n' >> "$work/$ns/ospfd.conf"
    else printf ' ip ospf network point-to-point\n ip ospf hello-interval 1\n ip ospf dead-interval 4\n' >> "$work/$ns/ospfd.conf"; fi
  }
  if [[ $ns == "$r1" ]]; then add_interface backbone 0.0.0.0 no; add_interface lan 0.0.0.0 yes
  elif [[ $ns == "$r2" ]]; then add_interface backbone 0.0.0.0 no; add_interface branch 0.0.0.1 no
  else add_interface branch 0.0.0.1 no; add_interface lan 0.0.0.1 yes; fi
  printf 'router ospf\n ospf router-id %s\n ospf abr-type standard\n' "$rid" >> "$work/$ns/ospfd.conf"
  private_daemon ip netns exec "$ns" "$zebra" -u root -g root -f "$work/$ns/zebra.conf" -i "$work/$ns/zebra.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 > "$work/$ns/zebra.log" 2>&1 &
  processes+=("$!")
  for ((i=0;i<50;i++)); do [[ -S "$work/$ns/zserv.api" ]] && break; sleep .1; done
  [[ -S "$work/$ns/zserv.api" ]] || { cat "$work/$ns/zebra.log" >&2; return 1; }
  private_daemon ip netns exec "$ns" "$ospfd" -u root -g root -f "$work/$ns/ospfd.conf" -i "$work/$ns/ospfd.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 > "$work/$ns/ospfd.log" 2>&1 &
  processes+=("$!")
}
cli(){ private_frr "$vtysh" --config_dir "$work/$1" --vty_socket "$work/$1" -c "$2"; }
json_cli(){ cli "$1" "$2" | python3 -c 'import json,sys; print(json.dumps(json.load(sys.stdin),separators=(",",":")))'; }
probe(){ ip netns exec "$1" ping -4 -n -c 1 -W 1 "$2" >/dev/null; }
ready(){ probe "$client" 198.51.100.20 && probe "$server" 192.0.2.10; }
wait_ready(){ for ((i=0;i<30;i++)); do if ready 2>/dev/null; then return 0; fi; sleep .2; done; return 1; }
start_router "$r1" 1.1.1.1
start_router "$r2" 2.2.2.2
start_router "$r3" 3.3.3.3
wait_ready || { cat "$work"/*/*.log >&2; exit 1; }
record(){
  local phase=$1 key ns
  for key in R1 ABR R3; do
    case "$key" in R1) ns=$r1;; ABR) ns=$r2;; R3) ns=$r3;; esac
    printf '%sPROCESS_%s ' "$phase" "$key"; json_cli "$ns" 'show ip ospf json'
    printf '%sNEIGHBORS_%s ' "$phase" "$key"; json_cli "$ns" 'show ip ospf neighbor json'
    printf '%sDATABASE_%s ' "$phase" "$key"; json_cli "$ns" 'show ip ospf database json'
    printf '%sINTERFACES_%s ' "$phase" "$key"; json_cli "$ns" 'show ip ospf interface json'
    printf '%sOSPF_ROUTES_%s ' "$phase" "$key"; json_cli "$ns" 'show ip ospf route json'
    printf '%sRIB_%s ' "$phase" "$key"; json_cli "$ns" 'show ip route ospf json'
    printf '%sKERNEL_%s ' "$phase" "$key"; ip -n "$ns" -j route show
  done
}
record ''
printf '%s\n' 'PASS baseline: actual three-router area-0/area-1 exchange works in both directions.'
# Change only the owned R3 branch area, leaving ABR branch area 1 and carrier up.
cli "$r3" $'configure terminal\ninterface branch\nno ip ospf area 0.0.0.1\nip ospf area 0.0.0.2'
for ((i=0;i<50;i++)); do if [[ -z $(ip -n "$r1" route show 198.51.100.0/24) && -z $(ip -n "$r3" route show 192.0.2.0/24) ]]; then break; fi; sleep .2; done
[[ -z $(ip -n "$r1" route show 198.51.100.0/24) && -z $(ip -n "$r3" route show 192.0.2.0/24) ]]
if ready 2>/dev/null; then echo 'Unexpected exchange during area mismatch.' >&2; exit 1; fi
probe "$client" 192.0.2.1
probe "$r1" 203.0.113.2
record 'FAULT_'
printf 'FAULT_BRANCH_LINK '; ip -n "$r3" -j link show branch
printf '%s\n' 'PASS mismatch: branch adjacency and remote LAN routes withdrawn; backbone adjacency, client gateway and transit carrier remain.'
cli "$r3" $'configure terminal\ninterface branch\nno ip ospf area 0.0.0.2\nip ospf area 0.0.0.1'
wait_ready
record 'RECOVERED_'
printf '%s\n' 'PASS recovery: exact area restoration recovers branch adjacency and both inter-area exchanges.'
cleanup; trap - EXIT
printf '%s\n' 'PASS cleanup: owned processes/namespaces/runtime paths removed.'
