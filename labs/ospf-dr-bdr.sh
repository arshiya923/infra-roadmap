#!/usr/bin/env bash
# Actual FRR 8.4 OSPFv2 in five owned network namespaces on a broadcast segment. Default is inert.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo FRR_ROOT=/path/to/extracted/frr/root bash labs/ospf-dr-bdr.sh --run' 'Requires FRR 8.4 zebra/ospfd/vtysh and their libraries; never installs or starts a system service.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { echo 'Root namespace capability is required.' >&2; exit 1; }
: "${FRR_ROOT:?Supply an extracted FRR 8.4 root directory}"
FRR_ROOT=$(realpath "$FRR_ROOT")
export LD_LIBRARY_PATH="$FRR_ROOT/usr/lib/x86_64-linux-gnu/frr:$FRR_ROOT/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
zebra="$FRR_ROOT/usr/lib/frr/zebra"; ospfd="$FRR_ROOT/usr/lib/frr/ospfd"; vtysh="$FRR_ROOT/usr/bin/vtysh"
for program in ip ping sysctl python3 unshare mount getent tshark; do command -v "$program" >/dev/null; done
for binary in "$zebra" "$ospfd" "$vtysh"; do [[ -x $binary ]]; done
"$ospfd" --version | head -n 1
prefix="fb09d-${BASHPID}"; fabric="${prefix}-f"; r1="${prefix}-r1"; r2="${prefix}-r2"; r3="${prefix}-r3"; r4="${prefix}-r4"
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
for ns in "$fabric" "$r1" "$r2" "$r3" "$r4"; do
  if ip netns list | awk '{print $1}' | grep -Fxq "$ns"; then echo "Refusing existing namespace $ns" >&2; exit 1; fi
done
for ns in "$fabric" "$r1" "$r2" "$r3" "$r4"; do ip netns add "$ns"; created+=("$ns"); ip -n "$ns" link set lo up; done
ip -n "$fabric" link add br0 type bridge
ip -n "$fabric" link set br0 type bridge mcast_snooping 0
ip -n "$fabric" link set br0 up
attach(){
  local ns=$1 number=$2
  ip -n "$ns" link add lan type veth peer name peer0
  ip -n "$ns" link set peer0 netns "$fabric"
  ip -n "$fabric" link set peer0 name "p$number"
  ip -n "$fabric" link set "p$number" master br0
  ip -n "$fabric" link set "p$number" up
  ip -n "$ns" address add "192.0.2.$number/24" dev lan
  ip -n "$ns" address add "198.51.100.$number/32" dev lo
  ip -n "$ns" link set lan up
  ip netns exec "$ns" sysctl -qw net.ipv4.ip_forward=1
}
attach "$r1" 1
attach "$r2" 2
attach "$r3" 3
attach "$r4" 4
start_router(){
  local ns=$1 number=$2 priority=$3
  mkdir "$work/$ns"
  printf 'username root nopassword\n' > "$work/$ns/vtysh.conf"
  printf 'hostname %s\n' "$ns" > "$work/$ns/zebra.conf"
  printf 'hostname %s\ninterface lan\n ip ospf area 0.0.0.0\n ip ospf network broadcast\n ip ospf cost 10\n ip ospf priority %s\n ip ospf hello-interval 1\n ip ospf dead-interval 4\ninterface lo\n ip ospf area 0.0.0.0\n ip ospf passive\nrouter ospf\n ospf router-id %s.%s.%s.%s\n' "$ns" "$priority" "$number" "$number" "$number" "$number" > "$work/$ns/ospfd.conf"
  private_daemon ip netns exec "$ns" "$zebra" -u root -g root -f "$work/$ns/zebra.conf" -i "$work/$ns/zebra.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 > "$work/$ns/zebra.log" 2>&1 &
  processes+=("$!")
  for ((i=0;i<50;i++)); do [[ -S "$work/$ns/zserv.api" ]] && break; sleep .1; done
  [[ -S "$work/$ns/zserv.api" ]] || { cat "$work/$ns/zebra.log" >&2; return 1; }
  private_daemon ip netns exec "$ns" "$ospfd" -u root -g root -f "$work/$ns/ospfd.conf" -i "$work/$ns/ospfd.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 > "$work/$ns/ospfd.log" 2>&1 &
  processes+=("$!")
}
cli(){ private_frr "$vtysh" --config_dir "$work/$1" --vty_socket "$work/$1" -c "$2"; }
json_cli(){ cli "$1" "$2" | python3 -c 'import json,sys; print(json.dumps(json.load(sys.stdin),separators=(",",":")))'; }
wait_role(){
  local ns=$1 state=$2 count=$3
  for ((i=0;i<100;i++)); do
    if cli "$ns" 'show ip ospf interface lan json' 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin)["interfaces"]["lan"]; sys.exit(0 if d["state"]==sys.argv[1] and d["nbrAdjacentCount"]==int(sys.argv[2]) else 1)' "$state" "$count" 2>/dev/null; then return 0; fi
    sleep .1
  done
  cli "$ns" 'show ip ospf interface lan'; cat "$work/$ns"/*.log >&2; return 1
}
record(){
  local phase=$1 number ns
  for number in 1 2 3 4; do
    ns="${prefix}-r$number"; [[ -d "$work/$ns" ]] || continue
    printf '%sINTERFACES_R%s ' "$phase" "$number"; json_cli "$ns" 'show ip ospf interface json'
    printf '%sNEIGHBORS_R%s ' "$phase" "$number"; json_cli "$ns" 'show ip ospf neighbor json'
    printf '%sDATABASE_R%s ' "$phase" "$number"; json_cli "$ns" 'show ip ospf database json'
    printf '%sNETWORK_LSA_R%s ' "$phase" "$number"; json_cli "$ns" 'show ip ospf database network json'
    printf '%sRIB_R%s ' "$phase" "$number"; json_cli "$ns" 'show ip route ospf json'
    printf '%sKERNEL_R%s ' "$phase" "$number"; ip -n "$ns" -j route show
  done
}
wait_network(){
  local ns=$1 dr=$2 members=$3
  for ((i=0;i<100;i++)); do
    if cli "$ns" 'show ip ospf database network json' 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin)["networkLinkStates"]["areas"]["0.0.0.0"]; expected=sys.argv[2].split(","); sys.exit(0 if any(l["advertisingRouter"]==sys.argv[1] and sorted(l["attchedRouters"])==expected for l in d) else 1)' "$dr" "$members" 2>/dev/null; then return 0; fi
    sleep .1
  done
  cli "$ns" 'show ip ospf database network'; return 1
}
probe_pair(){
  ip netns exec "$r3" ping -4 -n -I 198.51.100.3 -c 1 -W 1 198.51.100.4 >/dev/null &&
  ip netns exec "$r4" ping -4 -n -I 198.51.100.4 -c 1 -W 1 198.51.100.3 >/dev/null
}
wait_pair(){
  for ((i=0;i<60;i++)); do if probe_pair 2>/dev/null; then return 0; fi; sleep .2; done
  return 1
}
start_router "$r1" 1 100
wait_role "$r1" DR 0
start_router "$r2" 2 50
wait_role "$r2" Backup 1
start_router "$r3" 3 0
wait_role "$r3" DROther 2
wait_role "$r1" DR 2
wait_role "$r2" Backup 2
for ns in "$r1" "$r2" "$r3"; do wait_network "$ns" 1.1.1.1 '1.1.1.1,2.2.2.2,3.3.3.3'; done
record 'ESTABLISHED_'
printf '%s\n' 'PASS established: R1 DR, R2 BDR and priority-zero R3 fully adjacent to both.'
# A higher-priority arrival joins an existing election; it must not preempt it.
start_router "$r4" 4 200
wait_role "$r4" DROther 2
wait_role "$r1" DR 3
wait_role "$r2" Backup 3
wait_pair
for ns in "$r1" "$r2" "$r3" "$r4"; do wait_network "$ns" 1.1.1.1 '1.1.1.1,2.2.2.2,3.3.3.3,4.4.4.4'; done
record 'LATE_'
probe_pair
# Capture only owned R3 LAN traffic, including actual direct R3/R4 loopback probes.
ip netns exec "$r3" tshark -n -i lan -a duration:3 -f 'ip proto 89 or icmp' -w "$work/dr-bdr.pcapng" > "$work/capture.log" 2>&1 &
capture_pid=$!; processes+=("$capture_pid")
for ((i=0;i<50;i++)); do grep -q 'Capturing on' "$work/capture.log" && break; sleep .1; done
grep -q 'Capturing on' "$work/capture.log"
# Repeat bounded probes during startup so the decoder can verify packets after
# the capture socket is ready; the startup message alone is not packet evidence.
for ((i=0;i<12;i++)); do probe_pair; sleep .1; done
wait "$capture_pid"; unset 'processes[-1]'
printf 'CAPTURE '
tshark -n -r "$work/dr-bdr.pcapng" -Y 'ospf || icmp' -T fields -e eth.src -e eth.dst -e ip.src -e ip.dst -e ip.proto -e ospf.msg -e ospf.hello.designated_router -e ospf.hello.backup_designated_router -e icmp.type 2>/dev/null | python3 -c 'import json,sys; rows=[line.rstrip("\n").split("\t") for line in sys.stdin]; assert rows,"No packets"; print(json.dumps(rows,separators=(",",":")))'
printf 'R3_LINK '; ip -n "$r3" -j link show lan
printf 'R4_LINK '; ip -n "$r4" -j link show lan
printf 'R3_TO_R4 '; ip -n "$r3" -j route get 198.51.100.4 from 198.51.100.3
printf '%s\n' 'PASS late: priority-200 R4 does not preempt; DROther loopback probes work directly across the LAN.'
# Take down only the owned R1 attachment. InterfaceDown resets its election state.
# Other LAN attachments and the owned bridge remain up.
ip -n "$r1" link set lan down
wait_role "$r2" DR 2
wait_role "$r4" Backup 2
wait_role "$r3" DROther 2
wait_pair
for ns in "$r2" "$r3" "$r4"; do wait_network "$ns" 2.2.2.2 '2.2.2.2,3.3.3.3,4.4.4.4'; done
record 'FAILOVER_'
printf 'FAULT_R1_LINK '; ip -n "$r1" -j link show lan
probe_pair
printf '%s\n' 'PASS failover: existing BDR R2 becomes DR; higher-priority R4 becomes BDR and R3 remains ineligible.'
ip -n "$r1" link set lan up
wait_role "$r1" DROther 2
wait_role "$r2" DR 3
wait_role "$r4" Backup 3
wait_pair
for ns in "$r1" "$r2" "$r3" "$r4"; do wait_network "$ns" 2.2.2.2 '1.1.1.1,2.2.2.2,3.3.3.3,4.4.4.4'; done
record 'RECOVERED_'
probe_pair
printf '%s\n' 'PASS recovery: R1 rejoins as DROther without displacing the current DR/BDR; original probes work.'
cleanup; trap - EXIT
printf '%s\n' 'PASS cleanup: owned processes/namespaces/runtime paths removed.'
