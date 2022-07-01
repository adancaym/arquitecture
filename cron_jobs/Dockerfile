FROM node:18-alpine3.15

# Install curlt
RUN apk add --no-cache curl
WORKDIR /app
# Copy Scripts to Docker Image
COPY scripts/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

COPY scripts/*.js /app/
RUN chmod +x /app/*.js

COPY package.json /app/package.json
RUN npm install
# Add the cron job

RUN echo ' 0 0 */1 * * /usr/local/bin/request_assets.sh' >> /etc/crontabs/root
RUN echo ' 0 0 */1 * * /usr/local/bin/request_collection.sh' >> /etc/crontabs/root
RUN echo ' */1 * * * * /usr/local/bin/request_outbid.sh' >> /etc/crontabs/root
RUN echo ' */1 * * * * /usr/local/bin/request_placement.sh' >> /etc/crontabs/root
RUN echo ' */1 * * * * /usr/local/bin/request_stats.sh' >> /etc/crontabs/root
# Run crond  -f for Foreground
CMD ["/usr/sbin/crond", "-f"]
