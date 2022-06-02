FROM node:latest
RUN apt-get update
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
