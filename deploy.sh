#!/bin/bash
REPOSITORY=/home/ubuntu/nestjs-airbnb/
CONTAINER_NAME=nestbnb-pm2
CONTAINER_WORKDIR=/usr/src/app
APP_NAME=nestbnb-api
IMAGE_NAME=nestbnb
PORT=3000

cd $REPOSITORY

echo "> Build 파일 복사"
cp -r $REPOSITORY/zip/* $REPOSITORY/

echo "> 도커 이미지가 존재하는지 확인"
IMAGE_ID=$(docker images | grep $IMAGE_NAME | awk '{print $3}')
echo "도커 이미지 id: $CONTAINER_ID"

echo "> 현재 구동중인 컨테이너 확인"
CONTAINER_ID=$(docker ps | grep $CONTAINER_NAME | awk '{print $1}')
echo "현재 구동 중인 컨테이너 id: $CONTAINER_ID"

# 컨테이너가 없을경우 컨테이너 재실행
if [ -z "$CONTAINER_ID" ]; then
    echo "> 컨테이너 실행"
    docker rm -f $CONTAINER_NAME
    docker build -t $IMAGE_NAME:latest .
    docker rmi $(docker images -f "dangling=true" -q)
    docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
# 컨테이너가 실행중인 경우 무중단 배포
else
    echo "> 무중단 배포 시작"
    docker cp $REPOSITORY/dist $CONTAINER_NAME:$CONTAINER_WORKDIR/dist
    docker cp $REPOSITORY/package.json $CONTAINER_NAME:$CONTAINER_WORKDIR/package.json
    docekr exec -it $CONTAINER_NAME yarn install
    docekr exec -it $CONTAINER_NAME pm2 reload $APP_NAME
fi

echo "> 배포 완료!"

