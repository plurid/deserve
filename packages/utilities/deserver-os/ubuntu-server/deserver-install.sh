#
# Expected to run on deserver0 - Raspberry Pi 4 with Ubuntu Server 20.04 LTS, 1 disk
#


# Download Raspberry Pi Imager from https://www.raspberrypi.org/software/
curl -L https://downloads.raspberrypi.org/imager/imager_latest_amd64.deb --output imager.deb
# or curl -L https://downloads.raspberrypi.org/imager/imager_latest.dmg --output imager.dmg

# Write Ubuntu Server 20.04 LTS to SD Card


# touch ssh file on SD Card's /system-boot/
touch /path/to/system-boot/ssh

# get machine's IP
DESERVER_IP=
# ssh into the machine, default password 'ubuntu', change to 'deserver'
ssh ubuntu@$DESERVER_IP



# General

# change machine name from 'ubuntu' to 'deserver'
hostnamectl set-hostname deserver

sudo adduser identonym
# default password: deserving


sudo apt-get install gcc-arm*

sudo apt-get install build-essential


# https://unix.stackexchange.com/a/399531 - if dpkg is locked



# Bluetooth setup
# https://raspberrypi.stackexchange.com/a/114588
# https://blog.skyrise.tech/bluetooth-raspberry-pi-bleno-part-1-ibeacon

sudo apt-get install pi-bluetooth

sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev



# NodeJS Setup

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

source ~/.bashrc

nvm install 14.17.6



# Bluefig setup

yarn global add pm2@latest \
    @plurid/bluefig-server \
    @plurid/deserver-bluefig

# .bashrc
export PATH="$(yarn global bin --offline):$PATH"

deserver-bluefig deploy

pm2 startup

pm2 save



# Docker Install

sudo apt-get update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu `lsb_release -cs` test"

sudo apt update

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo systemctl enable docker



# Disk Setup

sudo mkfs.ext4 /dev/sda1

sudo mkdir /data

sudo mount /dev/sda1 /data

echo "/dev/sda1               /data           ext4    defaults        1 2" | sudo tee -a /etc/fstab



# Mongo Setup

sudo docker pull mongo:bionic

sudo mkdir -p /data/deserve_node_database

DESERVE_NODE_MONGO_USERNAME=`openssl rand -hex 32`
# 62e9faf2dc4344af3fb5d7e52db58d85101d41ae62700b57253c30e801f88728

DESERVE_NODE_MONGO_PASSWORD=`openssl rand -hex 32`
# 50cee375b7c9bb6d3cfaaac3f83d79eb8c17828498d64b3f5bc6c66afe34dc3b

sudo docker run -it \
    -v /data/deserve_node_database:/data/db \
    --name deserve_node_mongodb \
    --restart=always \
    -p 33734:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=$DESERVE_NODE_MONGO_USERNAME \
    -e MONGO_INITDB_ROOT_PASSWORD=$DESERVE_NODE_MONGO_PASSWORD \
    -d \
    mongo:bionic

printf "\n\nSafely store the\nMONGO_INITDB_ROOT_USERNAME $DESERVE_NODE_MONGO_USERNAME\nand the\nMONGO_INITDB_ROOT_PASSWORD $DESERVE_NODE_MONGO_PASSWORD\n\n\n"


# Minio Setup

sudo docker pull minio/minio

sudo mkdir -p /data/deserve_node_storage

DESERVE_NODE_MINIO_ACCESS_KEY=`openssl rand -hex 32`
# 30fe8eb05b418efe04a22ffc048f4abedfe5f4aa3653cdc7b1a72228604fa947

DESERVE_NODE_MINIO_SECRET_KEY=`openssl rand -hex 32`
# 7d72bd34ec1c3cea7f880b689661ae2a45ea93b3d7202a33cb14458532f73fe6

sudo docker run \
    -v /data/deserve_node_storage:/data \
    --name deserve_node_minio \
    --restart=always \
    -p 33735:9000 \
    -p 33736:9001 \
    -e MINIO_ROOT_USER=$DESERVE_NODE_MINIO_ACCESS_KEY \
    -e MINIO_ROOT_PASSWORD=$DESERVE_NODE_MINIO_SECRET_KEY \
    -d \
    minio/minio server /data --console-address ":33736"

printf "\n\nSafely store the\nMINIO_ROOT_USER $DESERVE_NODE_MINIO_ACCESS_KEY\nand the\nMINIO_ROOT_PASSWORD $DESERVE_NODE_MINIO_SECRET_KEY\n\n\n"
