# 부모 이미지 지정
FROM node:12
# yarn 설치
RUN npm install -g yarn
# 작업 디렉토리 생성
WORKDIR /usr/src/app
# 의존성 설치
COPY package*.json ./
RUN yarn
RUN yarn global add pm2
# 소스 추가
COPY ./dist .
# 포트 매핑
EXPOSE 3000
# 실행 명령
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]