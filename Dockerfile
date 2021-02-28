# 부모 이미지 지정
FROM node:12-slim
# 작업 디렉토리 생성
WORKDIR /usr/src/app
# 의존성 설치
RUN yarn global add pm2

ADD ./app.tar.gz ./
# 의존성 라이브러리 설치
#ADD package*.json ./
#ADD ./node_modules.zip ./node_modules
RUN npm i bcrypt

# 소스 추가
#ADD ecosystem.config.js ./
ADD .env.* ./
#ADD ./dist ./dist

# 포트 매핑
EXPOSE 3000

# 실행 명령
CMD npm run pm2:prod & pm2 logs