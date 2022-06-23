FROM alpine:latest
WORKDIR /app
COPY my_bash /bin/my_bash
COPY my_script /bin/my_script
COPY package.json /app/package.json
COPY request_placement.js /app/request_placement.js
COPY request_outbidt.js /app/request_outbidt.js
COPY request_collection.js /app/request_collection.js

COPY root /var/spool/cron/crontabs/root

RUN apk add --update nodejs npm
RUN npm install yarn -g
RUN npm install
RUN chmod +x /bin/my_bash
RUN chmod +x /bin/my_script
RUN chmod +x /app/request_placement.js
RUN chmod +x /app/request_outbidt.js
RUN chmod +x /app/request_collection.js

CMD crond -l 2 -f
