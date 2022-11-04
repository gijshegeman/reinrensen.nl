#!/bin/bash

# Variablen
GREEN='\033[0;32m'
RED='\033[0;31m'
ORANGE='\033[0;33m'
NOCOLOR='\033[0m'

var1="$(sudo git pull)"
var2="Already up to date."

ALERT="5%"
DISKSPACE=$(df -h /dev/vda1 | grep -vE '^Filesystem|tmpfs|cdrom' | awk '{ print $5 }')

echo -e "${GREEN}## Checking for repository updates?:...${NOCOLOR}"

if [ "$var1" = "$var2" ]; then 
    echo -e "${GREEN}## Project up to date, no need to rebuild!${NOCOLOR}"
    exit
else
    echo -e "${GREEN}## Git pull completed ... ${NOCOLOR}"
    echo -e "${ORANGE}## Stopping docker containers... ${NOCOLOR}"
    docker-compose down

    echo -e "${ORANGE}## DiskSpace left on server: ${DISKSPACE}"
    
    if ["$DISKSPACE" >= "$ALERT"]; then
        echo -e "${RED}## Might be to much diskspace left on server."
        echo -e "${RED}## Docker clean up advised with: docker system prune -a -f"
        read -p "Do you want to run:docker system prune -a -f? (y/N)" decision
        if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
            docker-compose down
            docker system prune -a -f
            docker rmi $(docker images -q)
            echo -e "${ORANGE}## Dangeling containers?"
            docker ps
            exit
        fi
    fi
    
    
    echo -e "${GREEN}## Rebuild docker containers... ${NOCOLOR}"
    docker-compose up --build

    echo -e "${GREEN}## Project up to date & containers running!${NOCOLOR}"
    exit
fi