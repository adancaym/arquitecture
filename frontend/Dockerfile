FROM node
RUN apt-get update
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY webpack-rtl.config.js /app/webpack-rtl.config.js
COPY src /app/src
COPY public /app/public
COPY .env /app/.env

RUN yarn install
RUN yarn add react-scripts -g

