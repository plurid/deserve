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
    selector,
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


        const normalizedData = typeof data === 'string'
            ? data
            : JSON.stringify(data);

        const selectorInput = typeof selector === 'string'
            ? { id: selector }
            : { selector: JSON.stringify(selector) };

        const request = await graphqlClient.mutate({
            mutation: MUTATION_UPDATE_KEY,
            variables: {
                input: {
                    ...selectorInput,
                    data: normalizedData,
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
