<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/deserve/master/about/identity/deserve-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/deserve/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    deserve node
</h1>


<h3 align="center">
    Generator-Owned Data Deserver
</h3>


<br />


The `deserve node` is part of the [`deserve`](https://github.com/plurid/deserve) software.



### Contents

+ [Setup](#setup)
+ [Build](#build)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## Setup

Run the commands below or run the script in `scripts/setup.sh` (assumes `docker` is installed).


### Prerequisites

+ [Install Docker](https://docs.docker.com/engine/install)


+ Setup MongoDB

```
docker pull mongo
```

```
sudo mkdir -p /deserve_node_database
```

```
DESERVE_NODE_MONGO_USERNAME=`openssl rand -base64 32`
```

```
DESERVE_NODE_MONGO_PASSWORD=`openssl rand -base64 32`
```

```
docker run -it \
    -v deserve_node_database:/data/db \
    --name deserve_node_mongodb \
    -p 33734:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=$DESERVE_NODE_MONGO_USERNAME \
    -e MONGO_INITDB_ROOT_PASSWORD=$DESERVE_NODE_MONGO_PASSWORD \
    -d \
    mongo
```

```
echo "Safely store the\nMONGO_INITDB_ROOT_USERNAME $DESERVE_NODE_MONGO_USERNAME\nand the\nMONGO_INITDB_ROOT_PASSWORD $DESERVE_NODE_MONGO_PASSWORD"
```


+ Setup MinIO

```
docker pull minio/minio
```

```
sudo mkdir -p /deserve_node_storage
```

```
DESERVE_NODE_MINIO_ACCESS_KEY=`openssl rand -base64 32`
```

```
DESERVE_NODE_MINIO_SECRET_KEY=`openssl rand -base64 32`
```

```
docker run -it \
    -v deserve_node_storage:/data \
    --name deserve_node_minio \
    -p 33735:9000 \
    -e MINIO_ROOT_USER=$DESERVE_NODE_MINIO_ACCESS_KEY \
    -e MINIO_ROOT_PASSWORD=$DESERVE_NODE_MINIO_SECRET_KEY \
    -d \
    minio/minio
```

```
echo "Safely store the\nMINIO_ROOT_USER $DESERVE_NODE_MINIO_ACCESS_KEY\nand the\nMINIO_ROOT_PASSWORD $DESERVE_NODE_MINIO_SECRET_KEY"
```


### Deserve Node

```
docker pull deserve-node
```

```
docker run \
    -p 33733:33733 \
    -d \
    deserve-node
```



## Build

``` bash
docker build \
    -t deserve-node \
    -f ./configurations/production.dockerfile \
    .
```


``` bash
docker run \
    -p 33733:33733 \
    -d \
    deserve-node
```



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/deserve-core">
    <img src="https://img.shields.io/npm/v/@plurid/deserve-core.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/deserve-core][deserve-core] • service-side

[deserve-core]: https://github.com/plurid/deserve/tree/master/packages/deserve-core


<a target="_blank" href="https://www.npmjs.com/package/@plurid/deserve-node">
    <img src="https://img.shields.io/npm/v/@plurid/deserve-node.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/deserve-node][deserve-node] • owner-side

[deserve-node]: https://github.com/plurid/deserve/tree/master/packages/deserve-node


<a target="_blank" href="https://www.npmjs.com/package/@plurid/deserve-router">
    <img src="https://img.shields.io/npm/v/@plurid/deserve-router.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/deserve-router][deserve-router] • service-side

[deserve-router]: https://github.com/plurid/deserve/tree/master/packages/deserve-router



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
