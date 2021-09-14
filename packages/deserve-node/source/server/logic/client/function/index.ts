// #region imports
    // #region external
    import {
        StoredFunction,
        ClientFunction,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const modelClientFunction = (
    data: StoredFunction,
) => {
    const {
        id,
        name,
        text,
        language,
        database,
        storage,
        externals,
        addins,
        storedAt,
        coreID,
    } = data;

    const clientFunction: ClientFunction = {
        id,
        name,
        text,
        language,
        database: typeof database === 'string' ? database : JSON.stringify(database),
        storage: typeof storage === 'string' ? storage : JSON.stringify(storage),
        externals: JSON.stringify(externals),
        addins: JSON.stringify(addins),
        storedAt,
        coreID,
    };

    return clientFunction;
}
// #endregion module
