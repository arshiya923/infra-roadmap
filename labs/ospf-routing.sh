#!/usr/bin/env bash
# Actual FRR 8.4 OSPFv2 in four owned network namespaces. Default is inert.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo FRR_ROOT=/path/to/extracted/frr/root bash labs/ospf-routing.sh --run' 'Requires FRR 8.4 zebra/ospfd/vtysh and their libraries; never installs or starts a system service.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { echo 'Root namespace capability is required.' >&2; exit 1; }
: "${FRR_ROOT:?Supply an extracted FRR 8.4 root directory}"
FRR_ROOT=$(realpath "$FRR_ROOT")
export LD_LIBRARY_PATH="$FRR_ROOT/usr/lib/x86_64-linux-gnu/frr:$FRR_ROOT/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
zebra="$FRR_ROOT/usr/lib/frr/zebra"; ospfd="$FRR_ROOT/usr/lib/frr/ospfd"; vtysh="$FRR_ROOT/usr/bin/vtysh"
for program in ip ping sysctl python3 unshare mount tshark; do command -v "$program" >/dev/null; done
for binary in "$zebra" "$ospfd" "$vtysh"; do [[ -x $binary ]]; done
"$ospfd" --version | head -n 1
prefix="fb09o-${BASHPID}"; client="${prefix}-c"; r1="${prefix}-r1"; r2="${prefix}-r2"; server="${prefix}-s"
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
for ns in "$client" "$r1" "$r2" "$server"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then echo "Refusing existing namespace $ns" >&2; exit 1; fi
done
for ns in "$client" "$r1" "$r2" "$server"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
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
connect "$r1" transit 203.0.113.1 "$r2" transit 203.0.113.2 30
connect "$r2" lan 198.51.100.1 "$server" eth0 198.51.100.20 24
for ns in "$r1" "$r2"; do ip netns exec "$ns" sysctl -qw net.ipv4.ip_forward=1; done
ip -n "$client" route add 198.51.100.0/24 via 192.0.2.1
ip -n "$server" route add 192.0.2.0/24 via 198.51.100.1
start_router(){
  local ns=$1 rid=$2
  mkdir "$work/$ns"
  printf 'username root nopassword\n' > "$work/$ns/vtysh.conf"
  printf 'hostname %s\n' "$ns" > "$work/$ns/zebra.conf"
  cat > "$work/$ns/ospfd.conf" <<EOF
hostname $ns
interface transit
 ip ospf area 0.0.0.0
 ip ospf network point-to-point
 ip ospf hello-interval 1
 ip ospf dead-interval 4
interface lan
 ip ospf area 0.0.0.0
 ip ospf passive
router ospf
 ospf router-id $rid
EOF
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
probe_record(){
  local ns=$1 target=$2 label=$3 expected=$4 status
  if ip netns exec "$ns" ping -4 -n -c 1 -W 1 "$target" > "$work/probe.txt" 2>&1; then status=0; else status=$?; fi
  if [[ $expected == success ]]; then [[ $status -eq 0 ]]; else [[ $status -ne 0 ]]; fi
  printf '%s ' "$label"
  python3 - "$target" "$status" "$work/probe.txt" <<'PY'
import json,pathlib,sys
print(json.dumps(dict(target=sys.argv[1],exitCode=int(sys.argv[2]),output=pathlib.Path(sys.argv[3]).read_text()),separators=(',',':')))
PY
}
ready(){ probe "$client" 198.51.100.20 && probe "$server" 192.0.2.10; }
wait_ready(){ for ((i=0;i<30;i++)); do if ready 2>/dev/null; then return 0; fi; sleep .2; done; return 1; }
start_router "$r1" 1.1.1.1
start_router "$r2" 2.2.2.2
wait_ready || { cat "$work"/*/*.log >&2; exit 1; }
probe_record "$client" 198.51.100.20 BASELINE_PROBE_CLIENT success
probe_record "$server" 192.0.2.10 BASELINE_PROBE_SERVER success
printf '%s\n' 'PASS baseline: actual OSPF-learned forwarding works in both directions.'
printf 'NEIGHBORS_R1 '; json_cli "$r1" 'show ip ospf neighbor json'
printf 'NEIGHBORS_R2 '; json_cli "$r2" 'show ip ospf neighbor json'
printf 'INTERFACES_R1 '; json_cli "$r1" 'show ip ospf interface json'
printf 'INTERFACES_R2 '; json_cli "$r2" 'show ip ospf interface json'
printf 'ROUTES_R1 '; json_cli "$r1" 'show ip route ospf json'
printf 'ROUTES_R2 '; json_cli "$r2" 'show ip route ospf json'
printf 'KERNEL_R1 '; ip -n "$r1" -j route show
printf 'KERNEL_R2 '; ip -n "$r2" -j route show
printf 'DATABASE_R1 '; json_cli "$r1" 'show ip ospf database json'
# Capture only the owned transit. Retain decoded header metadata, not packet files.
ip netns exec "$r1" tshark -n -i transit -a duration:3 -f 'ip proto 89' -w "$work/ospf.pcapng" > "$work/capture.log" 2>&1 &
capture_pid=$!; processes+=("$capture_pid"); wait "$capture_pid"; unset 'processes[-1]'
printf 'PACKETS '
tshark -n -r "$work/ospf.pcapng" -Y ospf -T fields -e ip.src -e ip.dst -e ip.proto -e ospf.msg -e ospf.area_id 2>/dev/null | python3 -c 'import json,sys; rows=[line.rstrip("\n").split("\t") for line in sys.stdin]; assert rows, "No actual OSPF packets captured"; print(json.dumps(rows,separators=(",",":")))'
# Suppress Hellos on the owned R1 transit while preserving carrier and addressing.
cli "$r1" $'configure terminal\ninterface transit\nip ospf passive'
for ((i=0;i<40;i++)); do if ! ip -n "$r1" route show 198.51.100.0/24 | grep -q . && ! ip -n "$r2" route show 192.0.2.0/24 | grep -q .; then break; fi; sleep .2; done
[[ -z $(ip -n "$r1" route show 198.51.100.0/24) && -z $(ip -n "$r2" route show 192.0.2.0/24) ]]
if ready 2>/dev/null; then echo 'Unexpected remote exchange during passive-transit fault.' >&2; exit 1; fi
probe "$client" 192.0.2.1
printf 'FAULT_NEIGHBORS_R1 '; json_cli "$r1" 'show ip ospf neighbor json'
printf 'FAULT_NEIGHBORS_R2 '; json_cli "$r2" 'show ip ospf neighbor json'
printf 'FAULT_INTERFACES_R1 '; json_cli "$r1" 'show ip ospf interface json'
printf 'FAULT_ROUTES_R1 '; json_cli "$r1" 'show ip route ospf json'
printf 'FAULT_ROUTES_R2 '; json_cli "$r2" 'show ip route ospf json'
printf 'FAULT_KERNEL_R1 '; ip -n "$r1" -j route show
printf 'FAULT_KERNEL_R2 '; ip -n "$r2" -j route show
printf 'FAULT_TRANSIT_R1 '; ip -n "$r1" -j link show transit
printf '%s\n' 'PASS passive transit: learned remote prefixes withdrawn, remote exchange fails, client gateway remains reachable.'
cli "$r1" $'configure terminal\ninterface transit\nno ip ospf passive'
wait_ready
printf 'RECOVERED_NEIGHBORS_R1 '; json_cli "$r1" 'show ip ospf neighbor json'
printf 'RECOVERED_NEIGHBORS_R2 '; json_cli "$r2" 'show ip ospf neighbor json'
printf 'RECOVERED_ROUTES_R1 '; json_cli "$r1" 'show ip route ospf json'
printf 'RECOVERED_ROUTES_R2 '; json_cli "$r2" 'show ip route ospf json'
printf '%s\n' 'PASS recovery: restored transit adjacency and both routed directions.'
# A healthy OSPF adjacency and installed paths do not enable packet forwarding.
# Toggle only this owned router namespace; never the host forwarding setting.
ip netns exec "$r2" sysctl -qw net.ipv4.ip_forward=0
for direction in client server; do
  if [[ $direction == client ]]; then ns=$client; target=198.51.100.20; else ns=$server; target=192.0.2.10; fi
  probe_record "$ns" "$target" "FORWARD_FAULT_PROBE_${direction^^}" failure
done
probe_record "$r1" 203.0.113.2 FORWARD_FAULT_PROBE_TRANSIT success
probe_record "$client" 192.0.2.1 FORWARD_FAULT_PROBE_CLIENT_GATEWAY success
probe_record "$server" 198.51.100.1 FORWARD_FAULT_PROBE_SERVER_GATEWAY success
printf 'FORWARD_FAULT_STATE '; ip netns exec "$r2" sysctl -n net.ipv4.ip_forward | python3 -c 'import json,sys; print(json.dumps({"r2IPv4Forwarding":int(sys.stdin.read())},separators=(",",":")))'
for number in 1 2; do
  if [[ $number == 1 ]]; then ns=$r1; else ns=$r2; fi
  printf 'FORWARD_FAULT_NEIGHBORS_R%s ' "$number"; json_cli "$ns" 'show ip ospf neighbor json'
  printf 'FORWARD_FAULT_ROUTES_R%s ' "$number"; json_cli "$ns" 'show ip route ospf json'
  printf 'FORWARD_FAULT_KERNEL_R%s ' "$number"; ip -n "$ns" -j route show
done
printf 'FORWARD_FAULT_PROBES {"clientToServer":false,"serverToClient":false,"r1ToR2Transit":true,"clientGateway":true,"serverGateway":true}\n'
printf '%s\n' 'PASS forwarding fault: Full neighbors and installed OSPF routes remain, but both endpoint exchanges fail with owned R2 forwarding disabled.'
ip netns exec "$r2" sysctl -qw net.ipv4.ip_forward=1
wait_ready
probe_record "$client" 198.51.100.20 FORWARD_RECOVERED_PROBE_CLIENT success
probe_record "$server" 192.0.2.10 FORWARD_RECOVERED_PROBE_SERVER success
printf 'FORWARD_RECOVERED_STATE '; ip netns exec "$r2" sysctl -n net.ipv4.ip_forward | python3 -c 'import json,sys; print(json.dumps({"r2IPv4Forwarding":int(sys.stdin.read())},separators=(",",":")))'
printf 'FORWARD_RECOVERED_PROBES {"clientToServer":true,"serverToClient":true}\n'
for number in 1 2; do
  if [[ $number == 1 ]]; then ns=$r1; else ns=$r2; fi
  printf 'FORWARD_RECOVERED_NEIGHBORS_R%s ' "$number"; json_cli "$ns" 'show ip ospf neighbor json'
  printf 'FORWARD_RECOVERED_ROUTES_R%s ' "$number"; json_cli "$ns" 'show ip route ospf json'
  printf 'FORWARD_RECOVERED_KERNEL_R%s ' "$number"; ip -n "$ns" -j route show
done
printf '%s\n' 'PASS forwarding recovery: exact owned namespace forwarding restoration recovers both exchanges.'
# Remove only the route introduced on this owned endpoint. Router OSPF remains
# healthy; missing endpoint return selection can still break request/reply.
printf 'RETURN_BASELINE_SERVER_KERNEL '; ip -n "$server" -j route show
ip -n "$server" route del 192.0.2.0/24 via 198.51.100.1
for direction in client server; do
  if [[ $direction == client ]]; then ns=$client; target=198.51.100.20; else ns=$server; target=192.0.2.10; fi
  probe_record "$ns" "$target" "RETURN_FAULT_PROBE_${direction^^}" failure
done
probe_record "$client" 192.0.2.1 RETURN_FAULT_PROBE_CLIENT_GATEWAY success
probe_record "$server" 198.51.100.1 RETURN_FAULT_PROBE_SERVER_GATEWAY success
probe_record "$r2" 198.51.100.20 RETURN_FAULT_PROBE_SERVER_LAN success
printf 'RETURN_FAULT_SERVER_KERNEL '; ip -n "$server" -j route show
printf 'RETURN_FAULT_STATE '; ip netns exec "$r2" sysctl -n net.ipv4.ip_forward | python3 -c 'import json,sys; print(json.dumps({"r2IPv4Forwarding":int(sys.stdin.read())},separators=(",",":")))'
for number in 1 2; do
  if [[ $number == 1 ]]; then ns=$r1; else ns=$r2; fi
  printf 'RETURN_FAULT_NEIGHBORS_R%s ' "$number"; json_cli "$ns" 'show ip ospf neighbor json'
  printf 'RETURN_FAULT_ROUTES_R%s ' "$number"; json_cli "$ns" 'show ip route ospf json'
  printf 'RETURN_FAULT_KERNEL_R%s ' "$number"; ip -n "$ns" -j route show
done
printf 'RETURN_FAULT_PROBES {"clientToServer":false,"serverToClient":false,"clientGateway":true,"serverGateway":true,"r2ToServerLAN":true}\n'
printf '%s\n' 'PASS return fault: endpoint remote route absent while Full neighbors, installed OSPF paths and R2 forwarding remain; request/reply exchanges fail.'
ip -n "$server" route add 192.0.2.0/24 via 198.51.100.1
wait_ready
probe_record "$client" 198.51.100.20 RETURN_RECOVERED_PROBE_CLIENT success
probe_record "$server" 192.0.2.10 RETURN_RECOVERED_PROBE_SERVER success
printf 'RETURN_RECOVERED_SERVER_KERNEL '; ip -n "$server" -j route show
printf 'RETURN_RECOVERED_PROBES {"clientToServer":true,"serverToClient":true}\n'
for number in 1 2; do
  if [[ $number == 1 ]]; then ns=$r1; else ns=$r2; fi
  printf 'RETURN_RECOVERED_NEIGHBORS_R%s ' "$number"; json_cli "$ns" 'show ip ospf neighbor json'
  printf 'RETURN_RECOVERED_ROUTES_R%s ' "$number"; json_cli "$ns" 'show ip route ospf json'
  printf 'RETURN_RECOVERED_KERNEL_R%s ' "$number"; ip -n "$ns" -j route show
done
printf '%s\n' 'PASS return recovery: exact owned endpoint route restoration recovers both exchanges.'
cleanup; trap - EXIT
printf '%s\n' 'PASS cleanup: owned processes, namespaces and temporary runtime directory removed.'
