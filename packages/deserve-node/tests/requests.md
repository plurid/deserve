# Request



## Blobs

### Upload

```
curl \
    -F 'blob=@<file-path>' \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    <deserve.domain>/upload
```

example:

```
curl -v \
    -F 'blob=@./image.png' \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    http://localhost:3366/upload
```


### Download

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    --output <filename> \
    <deserve.domain>/download?blob=blobID
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    --output file.example \
    http://localhost:3366/download?blob=b3fe8f49edab55b96e4f2a464f78d76fec23be20a5842b17c941e95cb885aaa86cca403a27293ba33693234ab45fe1e4
```



## Keys

### Store

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation StoreKey($input: InputStoreKey!) { storeKey(input: $input) { status data { id } }}","variables":{"input":{"data":"<JSON string>"}}}' \
    http://localhost:3366/deserve
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation StoreKey($input: InputStoreKey!) { storeKey(input: $input) { status data { id } }}","variables":{"input":{"data":"{\"b\":1,\"c\":{\"d\":true}}"}}}' \
    http://localhost:3366/deserve
```


### Update

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation UpdateKey($input: InputUpdateKey!) { updateKey(input: $input) { status }}","variables":{"input":{"data":"<value>","field":"<value>","id":"<value>"}}}' \
    http://localhost:3366/deserve
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation UpdateKey($input: InputUpdateKey!) { updateKey(input: $input) { status }}","variables":{"input":{"data":"false","field":"c.d","id":"406ee9451f6a164f4aefc1c236a2a53f/b794dd52c78c2f73db907365fc8c8b7dcec230dd7880ae3594e8325c709d265c0e3c9346a8c78a2f840d9b0b77ba01cf"}}}' \
    http://localhost:3366/deserve
```


### Delete

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation DeleteKey($input: InputDeleteKey!) { deleteKey(input: $input) {    status }}","variables":{"input":{"id":""}}}' \
    http://localhost:3366/deserve
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation DeleteKey($input: InputDeleteKey!) { deleteKey(input: $input) {    status }}","variables":{"input":{"id":"406ee9451f6a164f4aefc1c236a2a53f/b794dd52c78c2f73db907365fc8c8b7dcec230dd7880ae3594e8325c709d265c0e3c9346a8c78a2f840d9b0b77ba01cf"}}}' \
    http://localhost:3366/deserve
```



## Functions

### Store

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation StoreFunction($input: InputStoreFunction!) {  storeFunction(input: $input) { status data { id } }}","variables":{"input":{"name":"<value>","text":"<value>"}}}' \
    http://localhost:3366/deserve
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation StoreFunction($input: InputStoreFunction!) {  storeFunction(input: $input) { status data { id } }}","variables":{"input":{"name":"test","text":"const test = (\r\n    args, services,\r\n) => {\r\n    console.log(args, services);\r\n    return { args };\r\n}\r\n\r\nmodule.exports = {\r\n    test,\r\n};\r\n","language":"javascript"}}}' \
    http://localhost:3366/deserve
```


### Run

```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation RunFunction($input: InputRunFunction!) {  runFunction(input: $input) { status data }}", "variables":{"input":{"id":"<value>"}}}' \
    http://localhost:3366/deserve
```

example:

```
curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation RunFunction($input: InputRunFunction!) {  runFunction(input: $input) { status data }}", "variables":{"input":{"id":"value"}}}' \
    http://localhost:3366/deserve

curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation RunFunction($input: InputRunFunction!) {  runFunction(input: $input) { status data }}", "variables":{"input":{"id":"value", "arguments": "value"}}}' \
    http://localhost:3366/deserve
```
