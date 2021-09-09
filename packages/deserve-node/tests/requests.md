```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    -F 'file=@<file-path>' \
    <deserve.domain>/upload


example:

curl -v \
    -F 'blob=@./image.png' \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    http://localhost:3366/upload
```



```
curl \
    -H 'Deserve-Token: <token>' \
    -H 'Host: <host>' \
    --output <filename> \
    <deserve.domain>/download?blob=blobID


example:

curl \
    -H 'Deserve-Token: 123' \
    -H 'Host: localhost:3355' \
    --output file.example \
    http://localhost:3366/download?blob=b3fe8f49edab55b96e4f2a464f78d76fec23be20a5842b17c941e95cb885aaa86cca403a27293ba33693234ab45fe1e4
```
