#!/bin/bash



echo "Running MongoDB Setup"

docker pull mongo

sudo mkdir -p /deserve_node_database

DESERVE_NODE_MONGO_USERNAME=`openssl rand -base64 32`
DESERVE_NODE_MONGO_PASSWORD=`openssl rand -base64 32`

docker run -it \
    -v deserve_node_database:/data/db \
    --name deserve_node_mongodb \
    -p 33734:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=$DESERVE_NODE_MONGO_USERNAME \
    -e MONGO_INITDB_ROOT_PASSWORD=$DESERVE_NODE_MONGO_PASSWORD \
    -d \
    mongo

echo "Safely store the\nMONGO_INITDB_ROOT_USERNAME $DESERVE_NODE_MONGO_USERNAME\nand the\nMONGO_INITDB_ROOT_PASSWORD $DESERVE_NODE_MONGO_PASSWORD"

echo "--- MongoDB Setup Finished ---"




echo "Running MinIO Setup"

docker pull minio/minio

sudo mkdir -p /deserve_node_storage

DESERVE_NODE_MINIO_ACCESS_KEY=`openssl rand -base64 32`
DESERVE_NODE_MINIO_SECRET_KEY=`openssl rand -base64 32`

docker run -it \
    -v deserve_node_storage:/data \
    --name deserve_node_minio \
    -p 33735:9000 \
    -e MINIO_ROOT_USER=$DESERVE_NODE_MINIO_ACCESS_KEY \
    -e MINIO_ROOT_PASSWORD=$DESERVE_NODE_MINIO_SECRET_KEY \
    -d \
    minio/minio

echo "Safely store the\nMINIO_ROOT_USER $DESERVE_NODE_MINIO_ACCESS_KEY\nand the\nMINIO_ROOT_PASSWORD $DESERVE_NODE_MINIO_SECRET_KEY"

echo "--- MinIO Setup Finished ---"




echo "Running Deserve Node Setup"

docker pull deserve-node

docker run \
    -p 33733:33733 \
    -e DESERVE_NODE_MONGO_USERNAME=$DESERVE_NODE_MONGO_USERNAME \
    -e DESERVE_NODE_MONGO_PASSWORD=$DESERVE_NODE_MONGO_PASSWORD \
    -e DESERVE_NODE_MINIO_ACCESS_KEY=$DESERVE_NODE_MINIO_ACCESS_KEY \
    -e DESERVE_NODE_MINIO_SECRET_KEY=$DESERVE_NODE_MINIO_SECRET_KEY \
    -d \
    deserve-node

echo "--- Deserve Node Setup Finished ---"
