// #region imports
    // #region external
    import {
        ClientData,

        KeysStore,
    } from '~data/interfaces';

    import {
        MUTATION_STORE_KEY,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const store = (
    clientData: ClientData,
): KeysStore => async (
    data,
) => {
    try {
        const {
            graphqlClient,
        } = clientData;

        if (!graphqlClient) {
            return {
                status: false,
            };
        }


        const normalizedData = typeof data === 'string'
            ? data
            : JSON.stringify(data);

        const request = await graphqlClient.mutate({
            mutation: MUTATION_STORE_KEY,
            variables: {
                input: {
                    data: normalizedData,
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
