# Node.js + GridDB Docker on Apple Silicon

Make sure to check out this [blog](https://griddb.net/en/blog/griddb-on-arm-with-docker/) for instructions on how to install GridDB using Docker on ARM machines.

## Get Start

Clone this repository:

```shell
git clone https://github.com/junwatu/nodejs-griddb-arm.git
```

This app is a sample on how to connect to GridDB database.

## Build the Sample App

Build the sample app with docker:

```shell
docker build -t node-griddb-arm .
```

## Running the GridDB server

Create `.env` file in the project folder with this content:

```ini
GRIDDB_CLUSTER_NAME=myCluster
GRIDDB_PASSWORD=admin
NOTIFICATION_MEMBER=1
CONTAINER_NAME=griddb-server
NETWORK_NAME=griddb-net
IMAGE_NAME=griddbnet/griddb:arm-5.5.0
```

Start the GridDB Server:

```shell
./start-griddb.sh
```

## Running the Sample App

```shell
docker run --name nodejs-griddb-demo \        
    --network griddb-net \
    --env-file .env \
    -p 3000:3000 node-griddb-arm
```
