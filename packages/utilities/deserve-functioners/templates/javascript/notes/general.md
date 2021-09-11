Build a new imagene

```
docker build \
    -f ./configurations/production.dockerfile \
    -t deserve-functioner-javascript \
    .
```


Run the imagene with the appropriate token for deserve function access

```
docker run \
    --network host \
    --env DESERVE_DATABASE_ENDPOINT= \
    --env DESERVE_DATABASE_TOKEN= \
    deserve-functioner-javascript
```


Generate a new imagene from the running container with the deserve function environment

```
docker commit <deserve-functioner-javascript-id>
```
