// #region imports
    // #region external
    import {
        Owner,
        ClientOwner,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getClientCores = async (
    owner: Owner,
) => {
    const cores = await database.query(
        'core',
        'ownerID',
        owner.id,
    );

    return cores.results;
}


const clientOwner = async (
    owner: Owner,
) => {
    const cores = await getClientCores(owner);

    const clientOwnerData: any = {
        ...owner,
        cores,
    };

    delete clientOwnerData.key;

    return clientOwnerData as ClientOwner;
}
// #endregion module



// #region exports
export {
    clientOwner,
};
// #endregion exports
