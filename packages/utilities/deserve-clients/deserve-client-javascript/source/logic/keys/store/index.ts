// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysStore,
    } from '~data/interfaces';

    import {
        MUTATION_STORE_KEY,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const store = (
    graphqlClient: GraphqlClient,
): KeysStore => async (
    data,
) => {
    try {
        data = typeof data === 'string'
            ? data as any
            : JSON.stringify(data);

        const request = await graphqlClient.mutate({
            mutation: MUTATION_STORE_KEY,
            variables: {
                input: {
                    data,
                },
            },
        });
        const response = request.data.storeKey;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default store;
// #endregion exports
