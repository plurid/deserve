// #region imports
    // #region external
    import {
        StorageRemove,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        MUTATION_STORAGE_REMOVE,
    } from '~services/graphql/mutate';
    // #endregion external
// #endregion imports



// #region module
const remove: StorageRemove = async (
    id,
) => {
    return false;
}
// #endregion module



// #region exports
export default remove;
// #endregion exports
