#!/bin/bash
source "${PWD}/.env"
docker-compose up -d

sh ./scripts/wait-for-it.sh localhost:3307 -t 15

until docker container exec -it mySQLContainer mysqladmin ping -P 3306 -u root -p$DB_PASSWORD | grep "mysqld is alive" ; do
  >&2 echo "MySQL is unavailable - waiting for it... "
  sleep 1
done

jest --setupFiles dotenv/config --runInBand

docker-compose down
