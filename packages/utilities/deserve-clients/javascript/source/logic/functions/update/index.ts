// #region imports
    // #region external
    import {
        ClientData,

        FunctionsUpdate,
    } from '~data/interfaces';

    import {
        MUTATION_UPDATE_FUNCTION,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const update = (
    clientData: ClientData,
): FunctionsUpdate => async (
    id,
    data,
    field,
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

        data = typeof data === 'string'
            ? data as any
            : JSON.stringify(data);

        const request = await graphqlClient.mutate({
            mutation: MUTATION_UPDATE_FUNCTION,
            variables: {
                input: {
                    id,
                    data,
                    field,
                },
            },
        });
        const response = request.data.updateFunction;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default update;
// #endregion exports
