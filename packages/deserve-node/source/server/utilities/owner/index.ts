// #region imports
    // #region external
    import {
        Owner,
        ClientOwner,
    } from '~server/data/interfaces';

    import tunnelsManager from '~server/services/tunnelsManager';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getClientCores = async (
    owner: Owner,
) => {
    const cores = await database.query(
        'cores',
        'ownerID',
        owner.id,
    );

    const activeCores = tunnelsManager.list();

    const coresResults = cores.results.map(coreResult => {
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
