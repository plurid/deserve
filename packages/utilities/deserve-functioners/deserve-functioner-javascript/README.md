# Deserve Functioner Javascript


The `functioner`'s code is the basis upon which owner/service functions are executed by a `deserve node`.

The `deserve node` provides to the `functioner` access to

    + database,
    + storage,
    + events

through the environment variables

    + `DESERVE_DATABASE_TOKEN`,
    + `DESERVE_STORAGE_TOKEN`,
    + `DESERVE_EVENT_TOKEN`,

respectively. These tokens grant limited, temporary access.

Before calling the `functioner` with arbitrary arguments, the `functioner` must be prepared by running it with at least an adequate `DESERVE_DATABASE_TOKEN` to be able to request `functionData` using the `database.getFunctionData` method. The container will use the `functionData` to write the `function.js` file from the function `text` and to generate the `index.js` file from the `index.template.js`.

Once prepared, a new imagene, `functioner-ready` is generated from the container.

The `functioner-ready` imagene will run at function call, and it will be provided with at least an adequate `DESERVE_DATABASE_TOKEN` to be able to request `functionArguments` using the `database.getFunctionArguments` method.

An advanced use-case can provide through `functionData.json` various other `add-ins`, functions which will be written at the same level as `function.js` and which can enhance the utility of the main function (e.g. a custom operation on the database, using the provided token).



``` typescript
// functionData signature
interface FunctionData {
    name: string;
    text: string;
    addins: FunctionData[];
}
```

``` typescript
// functionArguments signature
interface FunctionArguments {
    data: any[];
}
```
