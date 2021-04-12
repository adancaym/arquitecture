sudo grep -qxF '127.0.0.1       production-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       production-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       development-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       development-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       test-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       test-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mongo-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       mongo-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       portainer-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       portainer-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       mail-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       mail-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       owncloud-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       owncloud-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       db-owncloud-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       db-owncloud-caym-server.com' >> /etc/hosts
sudo grep -qxF '127.0.0.1       redis-owncloud-caym-server.com' /etc/hosts || sudo echo '127.0.0.1       redis-owncloud-caym-server.com' >> /etc/hosts
docker volume create mongo_data
docker volume create portainer_data

docker-compose up -d