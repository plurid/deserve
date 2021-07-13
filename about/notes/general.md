Test commands

```
curl -v \
    -F 'blob=@<path/to/file>' \
    -H 'Deserve-Token: test' \
    http://localhost:3366/upload
```


```
curl -v \
    -X POST \
    -H 'Deserve-Token: test' \
    http://localhost:3366/download?blob=<blobID> \
    > file.ext
```
