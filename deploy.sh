sudo grep -qxF '127.0.0.1       nginx-proxy.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       nginx-proxy.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       cron-jobs.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       cron-jobs.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       frontend.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       frontend.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       backend.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       backend.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mail.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       mail.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mongo.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       mongo.shvl.ia' >> /etc/hosts
sudo grep -qxF '127.0.0.1       nginx-balancer.shvl.ia' /etc/hosts || sudo echo '127.0.0.1       nginx-balancer.shvl.ia' >> /etc/hosts
#docker volume create mongo_data
#docker network create  shvl-net
#docker-compose up -d