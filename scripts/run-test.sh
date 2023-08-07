#!/bin/bash

docker-compose up -d

sh ./scripts/wait-for-it.sh localhost:3307 -t 15
echo -e "(●ˇ∀ˇ●) 도커 세팅중..."
sleep 20

jest --setupFiles dotenv/config

docker-compose down
