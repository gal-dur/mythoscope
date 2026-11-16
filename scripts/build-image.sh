#!/bin/sh
# Every image this repository builds goes through here, so that **an image name has one image**:
# once a build lands, the image the repository held before loses its tags in that repository,
# and is removed — with the cached build steps nothing else uses — when nothing else names it.
# A rebuild therefore never leaves anything behind.
#
#   build-image.sh <name> [podman build arguments…]
#
# - A Containerfile with a stage called `build` (the cargo compile) gets that stage its own
#   repository, `<repository>-build`, replaced the same way. Unnamed, a superseded compile
#   stage stays behind on every rebuild; named, its layer cache still serves the next build.
# - A tag that changes on every build (Skaffold's content hashes) is replaced too: the old
#   image's tags in the same repository go, whatever they are.
# - Tags in other repositories are never touched, and an image a container uses stays until
#   a later build.
set -eu

name=$1
shift

# The repository: the name without its tag. A colon before the last `/` is a registry's port.
last=${name##*/}
case $last in
    *:*) repository=${name%:*} ;;
    *) repository=$name ;;
esac

# Every image the repository's tags point at now.
holding() {
    local image
    for image in $(podman images --quiet --filter "reference=$1" 2>/dev/null); do
        podman image inspect --format '{{.Id}}' "$image"
    done | sort -u
}

# Whether a full tag (podman writes `localhost/x:latest` for `x`) is in `repository`.
in_repository() {
    case $1 in
        "$2":* | "localhost/$2":*) true ;;
        *) false ;;
    esac
}

# Takes the old image out of `repository` and removes it once nothing names it.
retire() {
    local old=$1 within=$2 tag
    for tag in $(podman image inspect --format '{{range .RepoTags}}{{.}} {{end}}' "$old"); do
        if in_repository "$tag" "$within"; then
            podman untag "$old" "$tag"
        fi
    done
    if [ -z "$(podman image inspect --format '{{range .RepoTags}}{{.}}{{end}}' "$old")" ]; then
        podman rmi "$old" >/dev/null 2>&1 || true
    fi
}

# Builds with the given arguments and tag, then retires whatever the repository held before.
replace() {
    local into=$1 tag=$2 before after old
    shift 2
    before=$(holding "$into")
    podman build "$@" -t "$tag"
    after=$(podman image inspect --format '{{.Id}}' "$tag")
    for old in $before; do
        if [ "$old" != "$after" ]; then
            retire "$old" "$into"
        fi
    done
}

# The Containerfile podman will read: `-f`'s, else the context's own (the last argument).
containerfile=""
previous=""
for argument in "$@"; do
    case $previous in -f | --file) containerfile=$argument ;; esac
    previous=$argument
done
[ -n "$containerfile" ] || containerfile="$previous/Containerfile"

# The compile stage first, under its own repository; the final build finds it cached.
if [ -f "$containerfile" ] && grep -Eqi '^FROM .* AS build[[:space:]]*$' "$containerfile"; then
    # Everything but the final stage's own target, which the stage build replaces with its own.
    stage=""
    skip=false
    for argument in "$@"; do
        if $skip; then
            skip=false
        elif [ "$argument" = --target ]; then
            skip=true
        else
            stage="$stage $argument"
        fi
    done
    # shellcheck disable=SC2086 # the arguments carry no spaces
    replace "$repository-build" "$repository-build:latest" $stage --target build >/dev/null
fi

replace "$repository" "$name" "$@"
