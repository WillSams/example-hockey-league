# Abandoned Branch - Example Site - SECJHL Hockey League

Started working on a framework for the site back in November 2018, abandoned in (much of) current state in February 2019.  This repository using KeystoneJS 4.0, a CMS that uses ExpressJS and MongoDB.  This branch is totally abandoned but I may do further clean up for clarity in the coming weeks.

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

With Docker install, execute `docker-compose pull && docker-compose up -d` and then do the following:

#### MongoDB

```bash
# Access the command-line of the MongoDB Ubuntu Linux container for the database
docker exec -it sejchl-db bash

#Now execute:
mongo -u sejchl-dev-user -p 'passw0rd123' localhost:27017/sejchl-dev \
    --authenticationDatabase admin \
    --eval "db.getSiblingDB('sejchl-dev').createUser({'user':'sejchl-dev-user','pwd':'passw0rd123','roles':[{ 'role': 'dbOwner','db':'sejchl-dev'}]})"
```

You can then exit the container by executing the `exit` command.

#### Memcached

```bash
# Access the command-line of the Memcached Alpine Linux container
docker exec -it --user root sejchl-cache /bin/sh

# execute the following to create a configuration file
echo " 
-vv   #very verbose logging
-U 0  #disable UDP to mitigate DoS attacks" >> /etc/memcached.conf
```

Again, you can then exit a container by executing the `exit` command.

## Getting Site Up & Running

I developed the original site using the [KeystoneJS version 4](https://github.com/keystonejs/keystone-classic) web framework at the end of it's lifeycle.  Poor choice but it was fun nonetheless; I love [ExpressJS](https://expressjs.com/) and [Pug](https://pugjs.org) templates.  After you have the Docker containers executing and the pre-requisite Node Version Manager installed:

```bash
# Export some needed environment variables
cp .envrc.example .envrc && direnv allow

nvm use                  # use the version of NodeJS listed in .nvmrc
npm i                    # install the packages listed in package.json
npm run start            # starts executing website on http://localhost:8080
```

The default username and password for the Admin CMS is `admin@keystonejs.com` and `admin`, respectively.  When making changes to pages, you may want to either turn the cache server off by executing `docker-compose stop cache` or clear the cache at `http://localhost:8080/cache`.  You can alternatively just start only the mongodb service listed in your `docker-compose.yml` file by just executing `docker-compose up -d mongodb`.

If you want to poke around or customize, consult the [Keystone "classic" docs](https://v4.keystonejs.com/).  You can also change the username/password for the MongoDB's database but be sure to change the values in your .envrc file as well.
