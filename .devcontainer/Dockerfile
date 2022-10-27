ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
    && dpkgArch="$(dpkg --print-architecture)" \
    && case "$dpkgArch" in amd64) coArch= ;; arm64) coArch=-arm64 ;; *) echo >&2 "unsupported architecture: $dpkgArch"; exit 1 ;; esac \
    && curl -Lo /usr/local/bin/copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux$coArch \
    && chmod +x /usr/local/bin/copilot
