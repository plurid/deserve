// #region imports
    // #region external
    import {
        ClientData,

        KeysGet,
    } from '~data/interfaces';

    import {
        QUERY_REQUEST_KEY,
        QUERY_REQUEST_KEYS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const get = (
    clientData: ClientData,
): KeysGet => async (
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


        if (Array.isArray(selector)) {
            const request = await graphqlClient.query({
                query: QUERY_REQUEST_KEYS,
                variables: {
                    input: {
                        ids: selector,
                    },
                },
            });

            const response = request.data.requestKeys;

            return response;
        }


        const input = typeof selector === 'string'
            ? { id: selector }
            : { selector: JSON.stringify(selector) };

        const request = await graphqlClient.query({
            query: QUERY_REQUEST_KEY,
            variables: {
                input: {
                    ...input,
                },
            },
        });

        const response = request.data.requestKey;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
