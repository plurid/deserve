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
    graphqlClient: GraphqlClient | undefined,
): KeysStore => async (
    data,
) => {
    try {
        if (!graphqlClient) {
            return {
                status: false,
            };
        }

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

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default store;
// #endregion exports
