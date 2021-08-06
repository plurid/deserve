// #region imports
    // #region external
    import {
        DatabaseSet,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        MUTATION_SET,
    } from '~services/graphql/mutate';
    // #endregion external
// #endregion imports



// #region module
const set: DatabaseSet = async (
    id,
    data,
) => {
    try {
        const query = await client.query({
            query: MUTATION_SET,
            variables: {
                input: {
                    id,
                    data,
                },
            },
        });

        const response = query.data.functionerDatabaseSet;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default set;
// #endregion exports
