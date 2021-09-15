// #region imports
    // #region external
    import {
        GraphqlClient,

        FunctionsStore,
    } from '~data/interfaces';

    import {
        MUTATION_STORE_FUNCTION,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const store = (
    graphqlClient: GraphqlClient | undefined,
): FunctionsStore => async (
    data,
) => {
    try {
        if (!graphqlClient) {
            return {
                status: false,
            };
        }

        const {
            name,
            text,
            language,
            database,
            storage,
            externals,
            addins,
        } = data;

        const request = await graphqlClient.mutate({
            mutation: MUTATION_STORE_FUNCTION,
            variables: {
                input: {
                    name,
                    text,
                    language,
                    database,
                    storage,
                    externals,
                    addins,
                },
            },
        });
        const response = request.data.storeFunction;

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
