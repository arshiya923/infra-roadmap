#!/usr/bin/env bash
# Actual FRR 8.4 EIGRP IPv4 in four owned network namespaces. Default is inert.
set -euo pipefail
if [[ ${1:-} != --run ]]; then
  printf '%s\n' 'Usage: sudo FRR_ROOT=/path/to/extracted/frr/root bash labs/eigrp-routing.sh --run' 'Requires FRR 8.4 zebra/eigrpd/vtysh and their libraries; never installs or starts a system service.'
  exit 0
fi
[[ $EUID -eq 0 ]] || { echo 'Root namespace capability is required.' >&2; exit 1; }
: "${FRR_ROOT:?Supply an extracted FRR 8.4 root directory}"
FRR_ROOT=$(realpath "$FRR_ROOT")
export LD_LIBRARY_PATH="$FRR_ROOT/usr/lib/x86_64-linux-gnu/frr:$FRR_ROOT/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
zebra="$FRR_ROOT/usr/lib/frr/zebra"; eigrpd="$FRR_ROOT/usr/lib/frr/eigrpd"; vtysh="$FRR_ROOT/usr/bin/vtysh"
for program in ip ping sysctl python3 unshare mount timeout tshark; do command -v "$program" >/dev/null; done
for binary in "$zebra" "$eigrpd" "$vtysh"; do [[ -x $binary ]]; done
"$eigrpd" --version | head -n 1
prefix="fb09e-${BASHPID}"; client="${prefix}-c"; r1="${prefix}-r1"; r2="${prefix}-r2"; server="${prefix}-s"
work=$(mktemp -d /tmp/infra-eigrp.XXXXXXXX); created=(); processes=()
cleanup(){
  local pid ns
  # Bound shutdown even if a tracked daemon is stopped or ignores TERM.
  # Unreaped children keep their PID; still recheck the unique runtime path.
  owned_running(){
    [[ -r /proc/$1/cmdline && -r /proc/$1/stat ]] &&
      [[ $(awk '{print $3}' "/proc/$1/stat" 2>/dev/null) != Z ]] &&
      grep -azFq "$work/" "/proc/$1/cmdline" 2>/dev/null
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
  [[ $work == /tmp/infra-eigrp.* && -d $work ]] && rm -rf -- "$work"
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
  local ns=$1 rid=$2 lan_network
  mkdir "$work/$ns"
  printf 'username root nopassword\n' > "$work/$ns/vtysh.conf"
  printf 'hostname %s\n' "$ns" > "$work/$ns/zebra.conf"
  if [[ $ns == "$r1" ]]; then lan_network=192.0.2.0/24; else lan_network=198.51.100.0/24; fi
  cat > "$work/$ns/eigrpd.conf" <<EOF
hostname $ns
router eigrp 100
 eigrp router-id $rid
 network 203.0.113.0/30
 network $lan_network
EOF
  private_daemon ip netns exec "$ns" "$zebra" -u root -g root -f "$work/$ns/zebra.conf" -i "$work/$ns/zebra.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 > "$work/$ns/zebra.log" 2>&1 &
  processes+=("$!")
  for ((i=0;i<50;i++)); do [[ -S "$work/$ns/zserv.api" ]] && break; sleep .1; done
  [[ -S "$work/$ns/zserv.api" ]] || { cat "$work/$ns/zebra.log" >&2; return 1; }
  start_eigrp "$ns"
}
start_eigrp(){
  local ns=$1
  private_daemon ip netns exec "$ns" "$eigrpd" -u root -g root -f "$work/$ns/eigrpd.conf" -i "$work/$ns/eigrpd.pid" -z "$work/$ns/zserv.api" --vty_socket "$work/$ns" -P 0 >> "$work/$ns/eigrpd.log" 2>&1 &
  processes+=("$!")
}
restart_eigrp(){
  local ns=$1 pid attempt index found=0
  pid=$(cat "$work/$ns/eigrpd.pid")
  for index in "${!processes[@]}"; do [[ ${processes[$index]} == "$pid" ]] && found=1; done
  [[ $found == 1 && -r /proc/$pid/cmdline ]]
  grep -azFq "$work/$ns/eigrpd.conf" "/proc/$pid/cmdline"
  kill -TERM "$pid"
  for ((attempt=0;attempt<30;attempt++)); do
    [[ -r /proc/$pid/cmdline ]] || break
    grep -azFq "$work/$ns/eigrpd.conf" "/proc/$pid/cmdline" 2>/dev/null || break
    sleep .1
  done
  if [[ -r /proc/$pid/cmdline ]] && grep -azFq "$work/$ns/eigrpd.conf" "/proc/$pid/cmdline" 2>/dev/null; then kill -KILL "$pid"; fi
  wait "$pid" 2>/dev/null || true
  for index in "${!processes[@]}"; do if [[ ${processes[$index]} == "$pid" ]]; then unset 'processes[index]'; fi; done
  rm -f -- "$work/$ns/eigrpd.pid"
  start_eigrp "$ns"
}
# vtysh needs the same private group view; timeout applies to the entire invocation.
cli(){ private_frr timeout 8 "$vtysh" --config_dir "$work/$1" --vty_socket "$work/$1" -c "$2"; }
json_cli(){ cli "$1" "$2" | python3 -c 'import json,sys; print(json.dumps(json.load(sys.stdin),separators=(",",":")))'; }
text_cli(){
  cli "$1" "$2" > "$work/command.txt"
  ! grep -Eq '^%|Unknown command|Can.t find|failed|Failure' "$work/command.txt"
  python3 - "$2" "$work/command.txt" <<'PY'
import json,pathlib,sys
print(json.dumps(dict(command=sys.argv[1],output=pathlib.Path(sys.argv[2]).read_text()),separators=(',',':')))
PY
}
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
peers_ready(){
  cli "$r1" 'show ip eigrp neighbors' | grep -Eq '^[0-9]+[[:space:]]+203\.0\.113\.2[[:space:]]+transit' &&
  cli "$r2" 'show ip eigrp neighbors' | grep -Eq '^[0-9]+[[:space:]]+203\.0\.113\.1[[:space:]]+transit'
}
route_ready(){
  cli "$1" 'show ip route eigrp json' | python3 -c 'import json,sys; routes=json.load(sys.stdin).get(sys.argv[1],[]); assert any(r.get("selected") and r.get("installed") and any(n.get("active") and n.get("fib") for n in r.get("nexthops",[])) for r in routes)' "$2"
}
ready(){
  peers_ready && route_ready "$r1" 198.51.100.0/24 && route_ready "$r2" 192.0.2.0/24 &&
    probe "$client" 198.51.100.20 && probe "$server" 192.0.2.10
}
wait_ready(){ for ((i=0;i<40;i++)); do if ready 2>/dev/null; then return 0; fi; sleep .25; done; return 1; }
record(){
  local phase=$1 key ns
  for key in R1 R2; do
    if [[ $key == R1 ]]; then ns=$r1; else ns=$r2; fi
    printf '%sNEIGHBORS_%s ' "$phase" "$key"; text_cli "$ns" 'show ip eigrp neighbors'
    printf '%sINTERFACES_%s ' "$phase" "$key"; text_cli "$ns" 'show ip eigrp interfaces detail'
    printf '%sTOPOLOGY_%s ' "$phase" "$key"; text_cli "$ns" 'show ip eigrp topology all-links'
    printf '%sCONFIG_%s ' "$phase" "$key"; text_cli "$ns" 'show running-config'
    printf '%sRIB_%s ' "$phase" "$key"; json_cli "$ns" 'show ip route eigrp json'
    printf '%sKERNEL_%s ' "$phase" "$key"; ip -n "$ns" -j route show
  done
}
start_router "$r1" 1.1.1.1
# Capture is ready before the peer starts. Retain decoded metadata, not packet files.
ip netns exec "$r1" tshark -n -i transit -a duration:8 -f 'ip proto 88' -w "$work/eigrp.pcapng" > "$work/capture.log" 2>&1 &
capture_pid=$!; processes+=("$capture_pid")
for ((i=0;i<50;i++)); do grep -q 'Capturing on' "$work/capture.log" && break; sleep .1; done
grep -q 'Capturing on' "$work/capture.log"
start_router "$r2" 2.2.2.2
wait_ready || { cat "$work"/*/*.log >&2; exit 1; }
record BASELINE_
probe_record "$client" 198.51.100.20 BASELINE_PROBE_CLIENT success
probe_record "$server" 192.0.2.10 BASELINE_PROBE_SERVER success
printf '%s\n' 'PASS baseline: actual EIGRP-learned forwarding works in both directions.'
wait "$capture_pid"
# Capture is not the last process after the second router starts; retain the tracked PID.
printf 'PACKETS '
tshark -n -r "$work/eigrp.pcapng" -Y eigrp -T fields -e ip.src -e ip.dst -e ip.proto -e eigrp.opcode -e eigrp.as -e eigrp.seq -e eigrp.ack 2>/dev/null | python3 -c 'import json,sys; rows=[line.rstrip("\n").split("\t") for line in sys.stdin]; assert rows, "No actual EIGRP packets captured"; print(json.dumps(rows,separators=(",",":")))'
ip -n "$r1" link set transit down
fault_ready(){
  local first second
  first=$(cli "$r1" 'show ip eigrp neighbors'); second=$(cli "$r2" 'show ip eigrp neighbors')
  ! grep -Eq '^[0-9]+[[:space:]]+[0-9]+\.' <<< "$first" &&
    ! grep -Eq '^[0-9]+[[:space:]]+[0-9]+\.' <<< "$second" &&
    [[ -z $(ip -n "$r1" route show 198.51.100.0/24) && -z $(ip -n "$r2" route show 192.0.2.0/24) ]]
}
for ((i=0;i<100;i++)); do if fault_ready; then break; fi; sleep .25; done
fault_ready
[[ -z $(ip -n "$r1" route show 198.51.100.0/24) && -z $(ip -n "$r2" route show 192.0.2.0/24) ]]
record FAULT_
printf 'FAULT_TRANSIT_LINK '; ip -n "$r1" -j link show transit
probe_record "$client" 198.51.100.20 FAULT_PROBE_CLIENT failure
probe_record "$server" 192.0.2.10 FAULT_PROBE_SERVER failure
probe_record "$client" 192.0.2.1 FAULT_PROBE_CLIENT_GATEWAY success
probe_record "$server" 198.51.100.1 FAULT_PROBE_SERVER_GATEWAY success
printf '%s\n' 'PASS transit interruption: owned attachment down withdraws remote EIGRP paths; endpoint traffic fails and local gateways work.'
ip -n "$r1" link set transit up
# This pinned build did not reliably recover from link restoration alone.
# Retain that separate checkpoint, then explicitly reinitialize only owned daemons.
record LINK_RESTORED_
restart_eigrp "$r1"
restart_eigrp "$r2"
printf '%s\n' 'RECOVERY_ACTION owned link up followed by identity-checked restart of both owned eigrpd children with unchanged configuration'
wait_ready || { cat "$work"/*/*.log >&2; exit 1; }
record RECOVERED_
probe_record "$client" 198.51.100.20 RECOVERED_PROBE_CLIENT success
probe_record "$server" 192.0.2.10 RECOVERED_PROBE_SERVER success
printf '%s\n' 'PASS recovery: owned link restoration plus explicit owned-daemon reinitialization recovers peers, routes and endpoint probes.'
cleanup; trap - EXIT
printf '%s\n' 'PASS cleanup: owned processes/namespaces/runtime paths removed.'
