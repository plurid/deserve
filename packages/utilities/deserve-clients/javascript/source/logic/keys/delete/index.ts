// #region imports
    // #region external
    import {
        ClientData,

        KeysDelete,
    } from '~data/interfaces';

    import {
        MUTATION_DELETE_KEY,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const keysDelete = (
    clientData: ClientData,
): KeysDelete => async (
    selector,
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


        const input = typeof selector === 'string'
            ? { id: selector }
            : { selector: JSON.stringify(selector) };

        const request = await graphqlClient.mutate({
            mutation: MUTATION_DELETE_KEY,
            variables: {
                input,
            },
        });

        const response = request.data.deleteKey;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default keysDelete;
// #endregion exports
