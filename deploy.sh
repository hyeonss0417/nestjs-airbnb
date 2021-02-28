#!/bin/bash
REPOSITORY=/home/ubuntu/nestjs-airbnb/zip
ZIP_FILENAME=app.tar.gz
CONTAINER_NAME=nestbnb-pm2
CONTAINER_WORKDIR=/usr/src/app
APP_NAME=nestbnb-api
IMAGE_NAME=nestbnb
PORT=3000

cd $REPOSITORY

echo "> Dockerfile 가져오기"
tar xvfzp ./$ZIP_FILENAME ./Dockerfile

echo "> Env file 가져오기"
cp ../.env.* ./

#cp -r $REPOSITORY/zip/* $REPOSITORY/

echo "> 도커 이미지가 존재하는지 확인"
IMAGE_ID=$(docker images | grep $IMAGE_NAME | awk '{print $3}')
echo "> 도커 이미지 id: $CONTAINER_ID"

echo "> 현재 구동중인 컨테이너 확인"
CONTAINER_ID=$(docker ps | grep $CONTAINER_NAME | awk '{print $1}')
echo "> 현재 구동 중인 컨테이너 id: $CONTAINER_ID"

# 컨테이너가 Stop 상태이거나 없는 경우 컨테이너 실행
if [ -z "$CONTAINER_ID" ]; then
    echo "> 컨테이너 실행"
    docker rm -f $CONTAINER_NAME
    docker build -t $IMAGE_NAME:latest .
    docker rmi -f $(docker images -f "dangling=true" -q)
    docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME
# 컨테이너가 실행중인 경우 무중단 배포
else
    echo "> 무중단 배포 시작"
    docker cp $REPOSITORY/$ZIP_FILENAME $CONTAINER_NAME:$CONTAINER_WORKDIR/../
    docker exec -it bnb tar -xvzf $CONTAINER_WORKDIR/../$ZIP_FILENAME -C $CONTAINER_WORKDIR/ > /dev/null 2>&1

    #docker cp $REPOSITORY/node_modules/. $CONTAINER_NAME:$CONTAINER_WORKDIR/node_modules
    #docker cp $REPOSITORY/dist/. $CONTAINER_NAME:$CONTAINER_WORKDIR/dist
    #docker cp $REPOSITORY/package.json $CONTAINER_NAME:$CONTAINER_WORKDIR/package.json
    #docekr exec -it $CONTAINER_NAME npm install
    #docekr exec -it $CONTAINER_NAME pm2 reload $APP_NAME
fi

echo "> 배포 상태 확인"
docker exec -it $CONTAINER_NAME pm2 list | grep $APP_NAME

echo "> 배포 완료"
