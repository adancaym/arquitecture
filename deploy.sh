sudo grep -qxF '127.0.0.1       nginx-proxy' /etc/hosts || sudo echo '127.0.0.1       nginx-proxy' >> /etc/hosts
sudo grep -qxF '127.0.0.1       cron-jobs' /etc/hosts || sudo echo '127.0.0.1       cron-jobs' >> /etc/hosts
sudo grep -qxF '127.0.0.1       frontend' /etc/hosts || sudo echo '127.0.0.1       frontend' >> /etc/hosts
sudo grep -qxF '127.0.0.1       backend' /etc/hosts || sudo echo '127.0.0.1       backend' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mail' /etc/hosts || sudo echo '127.0.0.1       mail' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mongo' /etc/hosts || sudo echo '127.0.0.1       mongo' >> /etc/hosts
sudo grep -qxF '127.0.0.1       nginx-balancer' /etc/hosts || sudo echo '127.0.0.1       nginx-balancer' >> /etc/hosts
docker volume create mongo_data
docker network create  shvl-net
docker-compose up -d