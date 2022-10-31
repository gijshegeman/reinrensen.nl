#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
ORANGE='\033[0;33m'
NOCOLOR='\033[0m'

echo -e "${GREEN}## Checking for repository updates?:...${NOCOLOR}"

var1="$(sudo git pull)"
var2="Already up to date."

if [ "$var1" = "$var2" ]; then 
    echo -e "${GREEN}## Project up to date, no need to rebuild!${NOCOLOR}"
    exit
else
    echo -e "${ORANGE}## Update availeble --> updating... ${NOCOLOR}"
    echo -e "${GREEN}## Git pull completed ... ${NOCOLOR}"

    echo -e "${RED}## Stopping docker containers... ${NOCOLOR}"
    docker-compose down
    
    echo -e "${GREEN}## Rebuild docker containers... ${NOCOLOR}"
    docker-compose up --build

    echo -e "${GREEN}## Project up to date & containers running!${NOCOLOR}"
    exit
fi