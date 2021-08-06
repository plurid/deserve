// #region imports
    // #region external
    import {
        DatabaseRemove,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        MUTATION_REMOVE,
    } from '~services/graphql/mutate';
    // #endregion external
// #endregion imports



// #region module
const remove: DatabaseRemove = async (
    id,
) => {
    try {
        const mutation = await client.mutate({
            mutation: MUTATION_REMOVE,
            variables: {
                input: {
                    id,
                },
            },
        });

        const response = mutation.data.functionerDatabaseRemove;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default remove;
// #endregion exports
