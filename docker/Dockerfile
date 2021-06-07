# Github Action Runner Image
#
# This Dockerfile does NOT create generic images, it creates images of registered github runners (ie registration happens during image build).
# Container running from this image will run only once before exiting.
#
# This is an adaptation of project https://github.com/myoung34/docker-github-actions-runner . Refer to that for an image that registers itself 
# during container startup and stays up and running accross Github action runs.
#
# To build:
#    docker build --build-arg GITHUB_REPO_URL=<repo runner url> --build-arg GITHUB_RUNNER_TOKEN=<repo runner roken> --build-arg GITHUB_RUNNER_LABELS=<csv labels> -t local/github-runner .
#    #repo URL and token as indicated at https://github.com/<user>/<repo>/settings/actions/runners/new
#
# To run:
#    docker run --detach --restart always --volume /var/run/docker.sock:/var/run/docker.sock --volume /mnt/_work:/tmp/_work --name github-runner local/github-runner

FROM ubuntu:focal
LABEL maintainer="pierre.lupien@hrsdc-rhdcc.gc.ca"

ARG NODE_VERSION="14.x"
ARG GH_RUNNER_VERSION="2.278.0"
ARG TARGET_PLATFORM="x64"
ARG GITHUB_REPO_URL
ARG GITHUB_RUNNER_NAME
ARG GITHUB_RUNNER_TOKEN
ARG GITHUB_RUNNER_LABELS

ENV USER=ghar
ENV UID=1000
ENV GID=1000

ENV LANG=en_CA.UTF-8
ENV LANGUAGE=en_CA:en
ENV LC_ALL=en_CA.UTF-8 
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    curl -sL "https://deb.nodesource.com/setup_${NODE_VERSION}" -o /nodesource_setup.sh && \
    bash /nodesource_setup.sh && \
    rm -f /nodesource_setup.sh && \
    apt-get install -y --no-install-recommends \
       build-essential locales locales-all sudo openssl openssh-client nodejs net-tools openjdk-8-jdk-headless maven ant firefox && \
    locale-gen ${LANG} && dpkg-reconfigure locales && update-locale && \
    rm -fv /usr/lib/jvm/default-java && ln -svf /usr/lib/jvm/jdk-1.8.0-openjdk-amd64 /usr/lib/jvm/default-java && \
    groupadd --gid "$GID" "$USER" && \
    useradd --create-home --shell /bin/bash --gid "$GID" --uid "$UID" "$USER"

COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh

USER $USER
WORKDIR "/home/${USER}"

COPY --chown="${USER}" install_actions.sh "/home/${USER}/"
RUN chmod 700 "/home/${USER}/install_actions.sh" && \
    mkdir runner && cd runner && \
    "/home/${USER}/install_actions.sh" ${GH_RUNNER_VERSION} ${TARGET_PLATFORM} ${GITHUB_REPO_URL} "${GITHUB_RUNNER_NAME}" ${GITHUB_RUNNER_TOKEN} "${GITHUB_RUNNER_LABELS}" && \
    cd "/home/${USER}" && \
    rm "/home/${USER}/install_actions.sh"

ENTRYPOINT ["/entrypoint.sh"]
CMD ["./runner/run.sh", "--once"]

