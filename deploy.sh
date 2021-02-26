#!/bin/bash
REPOSITORY=/home/ubuntu/app/nestbnb
PROJECT_NAME=springboot-webservice

echo "> Build 파일 복사"

cp -r $REPOSITORY/zip/* $REPOSITORY/


CONTAINER_NAME=nestbnb-api
APP_NAME=nestbnb-api
WORDDIR=/usr/src/app
APP_PATH=/home/ubuntu/nestjs-airbnb

cd ${ APP_PATH }
git pull


scp ./dist ${ APP_PATH }

ssh ~~ 
docker cp ./dist ${CONTAINER_NAME}:${WORDDIR}
docekr exec -it ${CONTAINER_NAME} pm2 reload ${APP_NAME}
