// #region imports
    // #region external
    import {
        ClientData,

        KeysUpdate,
    } from '~data/interfaces';

    import {
        MUTATION_UPDATE_KEY,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const update = (
    clientData: ClientData,
): KeysUpdate => async (
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
            mutation: MUTATION_UPDATE_KEY,
            variables: {
                input: {
                    id,
                    data,
                    field,
                },
            },
        });
        const response = request.data.updateKey;

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
