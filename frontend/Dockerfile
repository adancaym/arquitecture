FROM node:latest
RUN apt-get update
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY webpack-rtl.config.js /app/webpack-rtl.config.js
COPY src /app/src
COPY public /app/public

RUN npm install react-scripts -g
RUN npm install -D --legacy-peer-deps
RUN npm install --legacy-peer-deps

