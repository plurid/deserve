# Deserver Bluefig


The `scripts` are to be copied into the `/.bluefig` folder on the deserver machine.

The `@plurid/bluefig-server` is then started as a forever process.


```
.deserve
    admin.deon # root-only access, binded in the deserve node docker
        {
            rootKey         // hash
            mongoUser       // encrypted with rootKey
            mongoPassword   // encrypted with rootKey
            minioUser       // encrypted with rootKey
            minioPassword   // encrypted with rootKey
        }
    owners.deon # root-only access, binded in the deserve node docker
        [
            {
                identonym
                key         // hash
            }
        ]
```
