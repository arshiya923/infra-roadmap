#!/usr/bin/env bash
# Extract pinned, APT-authenticated Ubuntu packages; no installation or service.
set -euo pipefail
if [[ ${1:-} != --prepare ]]; then
  printf '%s\n' 'Usage: bash labs/prepare-frr-runtime.sh --prepare' 'Ubuntu 24.04 amd64 only. Downloads and extracts pinned FRR/libyang packages into your private cache. Does not install packages or alter system services/accounts/configuration.'
  exit 0
fi
source /etc/os-release
[[ $ID == ubuntu && $VERSION_ID == 24.04 && $(dpkg --print-architecture) == amd64 ]] || { echo 'This pinned runtime requires Ubuntu 24.04 amd64.' >&2; exit 1; }
taskroot="${XDG_CACHE_HOME:-$HOME/.cache}/infra-fieldbook/frr-8.4.4"
mkdir -p "$taskroot/packages" "$taskroot/root"
taskroot=$(realpath "$taskroot")
cd "$taskroot/packages"
apt-get -o Acquire::http::Timeout=20 -o Acquire::Retries=1 download 'frr=8.4.4-1.1ubuntu6.7' 'libyang2t64=2.1.30-2.1ubuntu0.1'
for package in frr_8.4.4-1.1ubuntu6.7_amd64.deb libyang2t64_2.1.30-2.1ubuntu0.1_amd64.deb; do
  dpkg-deb -x "$package" "$taskroot/root"
done
sha256sum frr_8.4.4-1.1ubuntu6.7_amd64.deb libyang2t64_2.1.30-2.1ubuntu0.1_amd64.deb > "$taskroot/package-checksums.txt"
export LD_LIBRARY_PATH="$taskroot/root/usr/lib/x86_64-linux-gnu/frr:$taskroot/root/usr/lib/x86_64-linux-gnu"
"$taskroot/root/usr/lib/frr/ospfd" --version | head -n 1
printf 'Prepared extracted runtime: %s\n' "$taskroot/root"
printf 'Root lab invocation: FRR_ROOT=%q bash labs/ospf-routing.sh --run\n' "$taskroot/root"
