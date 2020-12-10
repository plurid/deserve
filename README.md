<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/deserve/master/about/identity/deserve-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/deserve/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    deserve
</h1>


<h3 align="center">
    Generator-Owned Data Deserver
</h3>


<br />


`deserve` is a conception of <i>generator-owned data inter-transfer</i>† and an implementation of such a data server to be queried by network services for data owned by one or <i>few</i>† entities.


† <i>generator-owned data</i> means that the entity which generated a piece of data is ultimately the entity which controls, owns that data; <i>data inter-transfer</i> means that the data is ultimately meant to be used, shared in a network of entities and services;

‡ the <i>few</i> should always be entities that know and meet each other on a near-daily basis; a `deserve` server loses its meaning when 'shared' by thousands or more of mutually unknown, unrelated entities; as a general heuristic, it is better to have thousands of `deserve`s with few entities each than few servers with thousands entities each.



### Contents

+ [The Why](#the-why)
+ [The What](#the-what)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## The Why

Metaphysics has been trying for 2,500 years, at least formally, leaving a paper trace, to establish an essence to this matter-arrived-at/arisen-to/fallen-into-being that we call ourselves. And the debate will and should go on for a few more thousands of years, since we are merely at the beginning.

However, some issues do seem to be clear. We generate information, data, and in some sense we are data. We-I am this pattern of information modifying itself and being modified through self-perceived/interpreted interaction, data pattern which rests upon a substrate of carbon-based cells.

Since you cannot access directly the data pattern from the inside, then, to some extent, there is nothing that is more intimately you than the externalized data that you output. In this sense, a thought is still externalized data, even if not excraniated data, since it never leaves one's casing. However, if we were to glance at the way that data is handled after being outputted one would consider that it is completely worthless, less than trash. As soon as data is generated it is being given to a completely different entity, the generator remaining, in most cases, without any kind of access to it. Monetary issue aside, this is a problem of control. You, the generator of the data, ought to have control over the data regardless of what service you wish to borrow it to. And the data transaction ought to be a borrow from the generator to the service, with or without any kind of additional mono/bi-directional monetary transaction, and not a mere irreversible giving.

Although the state of data is a political problem (as in dealing with <i>res publica</i>, public things), it has appeared actually due to a technical shortcut: the [client-server architecture](https://en.wikipedia.org/wiki/Client%E2%80%93server_model).

The client-server architecture, and the underlying infrastructure, is meant to surpass two problems: the [Byzantine generals problem](https://en.wikipedia.org/wiki/Byzantine_fault), correction of transmission, and the [broadcasting problem](https://en.wikipedia.org/wiki/Broadcasting_(networking)), multiplicity/dissipation of transmission. Simply put, the client-server architecture is the easiest way to establish a network between providers and consumers. And this has worked until now, given the somewhat impersonal nature of the data handled by computers: general documents, extensions of the paper-as-book metaphor into a digital space. However, if we are to generate a personal computing space, the client-server architecture reveals it's grounding in the [master-slave dialectic](https://en.wikipedia.org/wiki/Master%E2%80%93slave_dialectic) and with it the inadequacy of assuring the control of the data into the generator's grasp, if you will, a master-master dialectic.

This grounding of a `why` must happen at this depth, if not even deeper, since data will become ultimately the final material, and its flows ought to concern everyone and everything. However, very simply put, regarding the problem of data ownership there is only one solution: you must become your own server.


## The What

The topology of a `deserve` environment is comprised of the `owner` and the network `service`.

The `owner`'s server is the `node`. A `node` can run on any machine, it will connect to a `core` through the `router` provided by the network `service`. The `service` operates on the `core` through the `operator`. A `node` has only one `core` on a `service`. A `service` can operate with an indefinite number of `operators` on the `core` of the `node`, and can have an indefinite number of `cores`-`nodes` connections.

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/deserve/master/about/diagrams/topology.png" width="800px">
</p>

The `relater` is the evolution of the browser from a mere exploratory tool to one with direct dataflow control.

The `owner` runs the `node` on a separate machine. It is best if the `owner` actually owns that particular machine, however pooled datacenters can be deployed.

On a `dent`, or on any of the legacy devices (laptops, tablets), the `owner` runs the `relater` software.

Through the `relater` the `owner` controls the data in the owner's `node` and connects to `service`s on the network.



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
