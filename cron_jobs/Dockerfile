FROM alpine:latest
COPY my_bash /bin/my_bash
COPY request_placement.js /app/request_placement.js

COPY root /var/spool/cron/crontabs/root

RUN apk add --update nodejs npm

RUN chmod +x /bin/my_bash
RUN chmod +x /app/request_placement.js

CMD crond -l 2 -f
