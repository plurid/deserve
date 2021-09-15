// #region imports
    // #region external
    import {
        ClientData,

        FunctionsDelete,
    } from '~data/interfaces';

    import {
        MUTATION_DELETE_FUNCTION,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const functionsDelete = (
    clientData: ClientData,
): FunctionsDelete => async (
    id,
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

        const request = await graphqlClient.mutate({
            mutation: MUTATION_DELETE_FUNCTION,
            variables: {
                input: {
                    id,
                },
            },
        });
        const response = request.data.deleteFunction;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default functionsDelete;
// #endregion exports
