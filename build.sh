#!/bin/bash

# # Variablen
GREEN='\033[0;32m'
RED='\033[0;31m'
ORANGE='\033[0;33m'
NOCOLOR='\033[0m'

# var1="$(sudo git pull)"
# var2="Already up to date."

# ALERT="5%"
# DISKSPACE=$(df -h /dev/vda1 | grep -vE '^Filesystem|tmpfs|cdrom' | awk '{ print $5 }')

# echo -e "${GREEN}## Checking for repository updates?:...${NOCOLOR}"

# if [ "$var1" = "$var2" ]; then 
#     echo -e "${GREEN}## Project up to date, no need to rebuild!${NOCOLOR}"
#     exit
# else
#     echo -e "${GREEN}## Git pull completed ... ${NOCOLOR}"
#     echo -e "${ORANGE}## Stopping docker containers... ${NOCOLOR}"
#     docker-compose down

#     echo -e "${ORANGE}## DiskSpace left on server: ${DISKSPACE}"
    
#     if ["$DISKSPACE" >= "$ALERT"]; then
#         echo -e "${RED}## Might be to much diskspace left on server."
#         echo -e "${RED}## Docker clean up advised with: docker system prune -a -f"
#         read -p "Do you want to run:docker system prune -a -f? (y/N)" decision
#         if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
#             docker-compose down
#             docker system prune -a -f
#             docker rmi $(docker images -q)
#             echo -e "${ORANGE}## Dangeling containers?"
#             docker ps
#             exit
#         fi
#     fi
    
    
#     echo -e "${GREEN}## Rebuild docker containers... ${NOCOLOR}"
#     docker-compose up --build

#     echo -e "${GREEN}## Project up to date & containers running!${NOCOLOR}"
#     exit
# fi

##  New script
# Check git update?
check_gitUpdate() {
    var1="$(sudo git pull)"
    var2="Already up to date."

    if [ "$var1" = "$var2" ]; then 
        echo -e "${GREEN}Project up to date, no need to rebuild!${NOCOLOR}"
    else 
        echo -e "${GREEN}GitHub pull done, project up to date!${NOCOLOR}"
    fi
}

echo -e "${ORANGE}Checking for repository updates ...${NOCOLOR}"
check_gitUpdate

# Update docker without downtime
reload_nginx() {
    docker exec nginx /usr/sbin/nginx -s reload
}

zero_downtime_deploy() {  
  service_name=nextjs 
  old_container_id=$(docker ps -f name=$service_name -q | tail -n1)

  # bring a new container online, running new code  
  # (nginx continues routing to the old container only)  
  docker-compose up -d --no-deps --scale $service_name=2 --no-recreate $service_name

  # wait for new container to be available  
  new_container_id=$(docker ps -f name=$service_name -q | head -n1)
  new_container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $new_container_id)
  curl --silent --include --retry-connrefused --retry 30 --retry-delay 1 --fail http://$new_container_ip:3000/ || exit 1

  # start routing requests to the new container (as well as the old)  
  reload_nginx

  # take the old container offline  
  docker stop $old_container_id
  docker rm $old_container_id

  docker-compose up -d --no-deps --scale $service_name=1 --no-recreate $service_name

  # stop routing requests to the old container  
  reload_nginx  
}

echo -e "${ORANGE}Updating docker without downtime${NOCOLOR}"
zero_downtime_deploy

# end
echo -e "${GREEN}Succesfully run script!${NOCOLOR}"