// #region imports
    // #region external
    import {
        Owner,
        ClientOwner,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const clientOwner = (
    owner: Owner,
) => {
    const clientOwnerData: any = {
        ...owner,
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
