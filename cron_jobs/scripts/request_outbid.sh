#!/bin/sh
while true ;
do
echo "request_outbid_start"
node /app/scripts/request_outbid.js
& sleep 1; done


