#!/bin/bash

# Define default .env file name
ENV_FILE=".env"

# Allow a custom .env file name to be passed as an argument
if [ $# -gt 0 ]; then
	ENV_FILE=$1
fi

# Load environment variables from the specified .env file
if [ ! -f "$ENV_FILE" ]; then
	echo "$ENV_FILE file not found! Please create it before running the script."
	exit 1
fi
source "$ENV_FILE"

# Function to check if the GridDB container is running
check_griddb_running() {
	if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" | grep -q "$CONTAINER_NAME"; then
		echo "GridDB is already running."
		exit 0
	fi
}

# Check if GridDB is running
check_griddb_running

# Create a Docker network if it doesn't exist
if ! docker network ls | grep -q "$NETWORK_NAME"; then
	echo "Creating Docker network $NETWORK_NAME..."
	docker network create "$NETWORK_NAME"
else
	echo "Docker network $NETWORK_NAME already exists."
fi

# Pull the GridDB Docker image
echo "Pulling the GridDB Docker image $IMAGE_NAME..."
docker pull "$IMAGE_NAME"

# Run the GridDB container using the .env file
echo "Starting the GridDB container $CONTAINER_NAME..."
docker run --name "$CONTAINER_NAME" \
	--network "$NETWORK_NAME" \
	--env-file "$ENV_FILE" \
	-d -t "$IMAGE_NAME"

# Check if the container started successfully
if docker ps --filter "name=$CONTAINER_NAME" --filter "status=running" | grep -q "$CONTAINER_NAME"; then
	echo "GridDB has started successfully."
else
	echo "Failed to start GridDB. Check the container logs for more details."
	exit 1
fi