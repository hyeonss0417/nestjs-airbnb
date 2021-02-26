#!/bin/bash
REPOSITORY=/home/ubuntu/nestjs-airbnb/
CONTAINER_NAME=nestbnb-pm2
CONTAINER_APP_PATH=/

echo "> Build 파일 복사"

cp -r $REPOSITORY/zip/* $REPOSITORY/

cd $REPOSITORY/

docker cp ./dist $CONTAINER_NAME:$REPOSITORY


APP_NAME=nestbnb-api
WORDDIR=/usr/src/app
APP_PATH=/home/ubuntu/nestjs-airbnb



docekr exec -it ${CONTAINER_NAME} pm2 reload ${APP_NAME}
