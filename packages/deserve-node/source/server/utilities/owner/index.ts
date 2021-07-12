// #region imports
    // #region external
    import {
        Owner,
        ClientOwner,
    } from '~server/data/interfaces';

    import tunnelsManager from '~server/services/tunnelsManager';

    import database, {
        getDeserveCoresCollection,
    } from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getClientCores = async (
    owner: Owner,
) => {
    const deserveCoresCollection = await getDeserveCoresCollection();
    if (!deserveCoresCollection) {
        return;
    }

    const cores: any[] = await database.getAllBy(
        deserveCoresCollection,
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
