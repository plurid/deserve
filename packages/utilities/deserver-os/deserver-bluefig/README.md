<p align="center">
    <a target="_blank" href="https://deserve.plurid.cloud">
        <img src="https://raw.githubusercontent.com/plurid/deserve/master/about/identity/deserve-logo.png" height="250px">
    </a>
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/deserve/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    deserver bluefig
</h1>


<h3 align="center">
    Deserver Configuration for Bluefig
</h3>



The `./distribution` `hooks.js`, `views.js`, and `services.js` files are to be copied into the `~/.bluefig` folder on the deserver machine.

The `@plurid/bluefig-server` is then started as a forever process.



## CLI

```
deserver-bluefig <command>

Available commands:

deploy      - copy the views and hooks to '~/.bluefig';
update      - update deserver bluefig;
version     - print version;
help        - print help.
```



## Folders

Configurations folders

```
~/.deserver/data.deon

{
    rootKeyHash string
    adminKeyHash string
}
```

```
~/.deserve/data.deon

{
    admin {
        mongoUser       string encrypted with rootKey
        mongoPassword   string encrypted with rootKey
        minioUser       string encrypted with rootKey
        minioPassword   string encrypted with rootKey
    }
    owners [
        {
            identonym string
            key string
        }
    ]
    registration boolean
}
```
