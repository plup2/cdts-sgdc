#!/bin/bash -ex
GH_RUNNER_VERSION=$1
TARGETPLATFORM=$2
GITHUB_REPO_URL=$3
GITHUB_RUNNER_NAME=$4
GITHUB_RUNNER_TOKEN=$5
GITHUB_RUNNER_LABELS=$6

_RUNNER_NAME=${GITHUB_RUNNER_NAME:-${GITHUB_RUNNER_NAME_PREFIX:-github-runner}-$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13 ; echo '')}
_RUNNER_WORKDIR=/tmp/_work
_LABELS=${GITHUB_RUNNER_LABELS:-default}

export TARGET_ARCH="x64"
if [[ $TARGETPLATFORM == "linux/arm/v7" ]]; then
  export TARGET_ARCH="arm"
elif [[ $TARGETPLATFORM == "linux/arm64" ]]; then
  export TARGET_ARCH="arm64"
fi

curl -L "https://github.com/actions/runner/releases/download/v${GH_RUNNER_VERSION}/actions-runner-linux-${TARGET_ARCH}-${GH_RUNNER_VERSION}.tar.gz" > actions.tar.gz
tar -zxf actions.tar.gz
rm -f actions.tar.gz
#./bin/installdependencies.sh

mkdir -pv "${_RUNNER_WORKDIR}"

./config.sh --url "${GITHUB_REPO_URL}" --token "${GITHUB_RUNNER_TOKEN}" --name "${_RUNNER_NAME}" --work "${_RUNNER_WORKDIR}" --labels "${_LABELS}" --unattended --replace
unset GITHUB_RUNNER_TOKEN

