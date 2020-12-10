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

+ [Build](#build)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## Build

``` bash
docker build \
    -t deserve-node \
    -f ./configurations/production.dockerfile \
    --build-arg JWT_ENCRYPTION=$JWT_ENCRYPTION \
    .
```


``` bash
docker run \
    -d -p 8080:3366 \
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
