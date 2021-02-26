#!/bin/bash
REPOSITORY=/home/ubuntu/nestjs-airbnb/dist
PROJECT_NAME=springboot-webservice

echo "> Build 파일 복사"

cp -r $REPOSITORY/zip/* $REPOSITORY/

CURRENT_=$(pgrep -fl $PROJECT_NAME | grep jar | awk '{print $1}')

CONTAINER_NAME=nestbnb-pm2
APP_NAME=nestbnb-api
WORDDIR=/usr/src/app
APP_PATH=/home/ubuntu/nestjs-airbnb

cd ${ APP_PATH }
git pull


scp ./dist ${ APP_PATH }

ssh ~~ 
docker cp ./dist $CONTAINER_NAME:$REPOSITORY
docekr exec -it ${CONTAINER_NAME} pm2 reload ${APP_NAME}
