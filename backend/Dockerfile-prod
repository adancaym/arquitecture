FROM node:latest
RUN apt-get update
RUN apt install -y make gcc g++ python


WORKDIR /app

COPY package.json /app/package.json
COPY .babelrc /app/.babelrc
COPY .eslintrc /app/.eslintrc
COPY .travis.yml /app/.travis.yml
COPY smtp.json /app/smtp.json
COPY vpk.json /app/vpk.json


COPY src /app/src

RUN npm install -D --legacy-peer-deps
RUN npm install  --legacy-peer-deps
RUN chmod -R 777 .
RUN npm uninstall bcrypt
RUN npm i bcrypt --unsafe-perm=true --allow-root --save
