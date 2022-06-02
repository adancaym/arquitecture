FROM alpine:latest
WORKDIR /app
COPY controller.js /app/controller.js
COPY implementation.js /app/implementation.js
COPY index.js /app/index.js
COPY my_bash /bin/my_bash
COPY package.json /app/package.json
COPY request_placement.js /app/request_placement.js

COPY root /var/spool/cron/crontabs/root

RUN apk add --update nodejs npm
RUN apk add git
RUN npm install yarn pm2 -g
RUN npm install
RUN chmod +x /bin/my_bash
RUN chmod +x /app/request_placement.js

ENTRYPOINT ["pm2-runtime", "index.js"]

ENTRYPOINT ["/bin/my_bash", "crond -l 2 -f"]

