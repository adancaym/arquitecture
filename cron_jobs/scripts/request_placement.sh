#!/bin/sh
while true ;
do
echo "request_placement_start"
node /app/scripts/request_placement.js
& sleep 1; done



