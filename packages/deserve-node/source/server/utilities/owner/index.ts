// #region imports
    // #region external
    import {
        DatabaseCollections,
        Owner,
        ClientOwner,
    } from '~server/data/interfaces';

    import tunnelsManager from '~server/services/tunnelsManager';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getClientCores = async (
    collections: DatabaseCollections,
    owner: Owner,
) => {
    const cores: any[] = await database.getAllBy(
        collections.cores,
        'ownerID',
        owner.id,
    );

    const activeCores = tunnelsManager.list();

    const coresResults = cores.map((coreResult: any) => {
        let active = false;

        if (activeCores.includes(coreResult.id)) {
            active = true;
        }

        return {
            ...coreResult,
            active,
        };
    });

    return coresResults;
}


const clientOwner = async (
    collections: DatabaseCollections,
    owner: Owner,
) => {
    const cores = await getClientCores(
        collections,
        owner,
    );

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
