FROM node
RUN apt-get update
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package.json /app/package.json
COPY frontend/tsconfig.json /app/tsconfig.json
COPY frontend/webpack-rtl.config.js /app/webpack-rtl.config.js
COPY frontend/src /app/src
COPY frontend/public /app/public
COPY frontend/.env /app/.env

RUN yarn install
RUN yarn add react-scripts -g

