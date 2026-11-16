#!/bin/sh
# Fails if anything in the repository could bind or publish beyond this machine's loopback.
#
# Nothing binds every interface, not even inside the container. A server binds 127.0.0.1, or,
# when a published port must reach it, `mythos`: the Taskfile gives every container that
# hostname, podman resolves it to the container's own address, and that address is reached
# only through a 127.0.0.1:HOST:CONTAINER publication. Host networking is banned outright.
# Runs before every image build (Taskfile `loopback`, a dependency of `image`).
set -eu
cd "$(dirname "$0")/.."

any='0''\.0\.0\.0' # split so this file does not contain the literal it bans

found=$(git ls-files --cached --others --exclude-standard \
    | grep -v -e '^scripts/check-loopback.sh$' -e '^package-lock.json$' \
        -e '\.\(png\|jpe\?g\|webp\|gif\|pdf\|woff2\?\|ttf\)$' \
    | xargs grep -n -I -E \
        -e "$any" \
        -e "([\"'])::\\1|\[::\]" \
        -e '(-p|--publish)[ =]+[^ ]*[0-9}]+:[0-9]+' \
        -e '--(network|net)[ =]+host' \
        -e '--host([ =]|$|["'"'"'])' \
        -e '\.listen\( *[A-Za-z0-9_]+ *\)' \
        2>/dev/null \
    | sed -E -e 's/(-p|--publish)[ =]+127\.0\.0\.1:[^ ]+//g' \
        -e 's/--host[ =]+(127\.0\.0\.1|mythos)//g' \
    | grep -E \
        -e "$any" \
        -e "([\"'])::\\1|\[::\]" \
        -e '(-p|--publish)[ =]+[^ ]*[0-9}]+:[0-9]+' \
        -e '--(network|net)[ =]+host' \
        -e '--host([ =]|$|["'"'"'])' \
        -e '\.listen\( *[A-Za-z0-9_]+ *\)' || true)

if [ -n "$found" ]; then
    echo "LOOPBACK CHECK FAILED: bind 127.0.0.1 (or mythos in the container), publish -p 127.0.0.1:HOST:CONTAINER" >&2
    echo "$found" >&2
    exit 1
fi
