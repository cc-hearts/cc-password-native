FROM node:latest

LABEL maintainer="cc heart<ccheartszzz@gmail.com>"

WORKDIR /usr/pwd-native-services

COPY ./dist .

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install --production

EXPOSE 32342

CMD npm run build:start
