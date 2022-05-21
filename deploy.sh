sudo grep -qxF '127.0.0.1       production-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       production-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       app-development-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       app-development-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       development-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       development-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mongo-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       mongo-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mail-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       mail-caym-server.com' >> /etc/hosts
docker volume create mongo_data
docker network create  shvl-net
docker-compose up -d