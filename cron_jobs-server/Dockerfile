FROM node:latest
WORKDIR /app
COPY controller.js /app/controller.js
COPY implementation.js /app/implementation.js
COPY index.js /app/index.js
COPY package.json /app/package.json
RUN apt-get install git -y

RUN yarn install
RUN npm install -g nodemon
