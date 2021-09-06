// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysDelete,
    } from '~data/interfaces';

    import {
        MUTATION_DELETE_KEY,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const keysDelete = (
    graphqlClient: GraphqlClient,
): KeysDelete => async (
    id,
) => {
    try {
        const request = await graphqlClient.mutate({
            mutation: MUTATION_DELETE_KEY,
            variables: {
                input: {
                    id,
                },
            },
        });
        const response = request.data.deleteKey;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default keysDelete;
// #endregion exports
