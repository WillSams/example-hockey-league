# Example Site - SEJCHL Hockey League

A full-stack application using React, GraphQL, & AWS DynamoDb.

WIP

For an abandoned KeystoneJS 4.0 example from 3 years ago, see the `abandoned` branch.

## Pre-requisites

First of all, these instructions will only be targeting Debian-based distros (Ubuntu, Linux Mint, etc.) but they can also work under [Windows using the Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about).  The following tools need to be installed:

- Install [direnv](https://direnv.net).
- Install [Docker](https://www.docker.com).
- Install [NodeJS](https://nodejs.org/en/download/).

### Installing Node Version Manager (NVM)

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
echo 'export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.bashrc
source ~/.bashrc
nvm install lts/* 
```

### Working with Docker Containers for Development

With Docker installed, execute `docker-compose pull && docker-compose up -d`.

## Getting Site Up & Running

In the root of the repository:

```bash
# Export some needed environment variables
cp .envrc.example .envrc && direnv allow

nvm use                  # use the version of NodeJS listed in .nvmrc
npm i                    # install the packages listed in package.json
npm run dev              # concurrently starts both the frontend web site and backend api.
```
