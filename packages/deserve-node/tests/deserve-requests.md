# store key

curl 'http://localhost:3355/deserve' \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -H 'Host: localhost:3355' \
    -H 'Origin: http://localhost:3355' \
    -H 'Deserve-Token: 123' \
    --data-binary '{"query":"mutation StoreKey($input: InputStoreKey!) {\n  storeKey(input: $input) {\n    status\n    data {\n      id\n    }\n  }\n}","variables":{"input":{"data":"{\"b\":123,\"c\":{\"d\":true}}"}}}' \
    --compressed \
    | json_pp



# delete key

curl 'http://localhost:3355/deserve' \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -H 'Host: localhost:3355' \
    -H 'Origin: http://localhost:3355' \
    -H 'Deserve-Token: 123' \
    --data-binary '{"query":"mutation DeleteKey($input: InputDeleteKey!) {\n  deleteKey(input: $input) {\n    status\n  }\n}\n","variables":{"input":{"id":"$VALUE"}}}' \
    --compressed \
    | json_pp
