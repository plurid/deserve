// #region imports
    // #region external
    import {
        ClientData,

        FunctionsRun,
    } from '~data/interfaces';

    import {
        MUTATION_RUN_FUNCTION,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const run = (
    clientData: ClientData,
): FunctionsRun => async (
    id,
    args,
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

        args = typeof args === 'string'
            ? args
            : typeof args !== 'undefined'
                ? JSON.stringify(
                    args,
                    (_, value) => typeof value === 'undefined' ? null : value,
                ) : undefined;

        const request = await graphqlClient.mutate({
            mutation: MUTATION_RUN_FUNCTION,
            variables: {
                input: {
                    id,
                    arguments: args,
                },
            },
        });
        const response = request.data.runFunction;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default run;
// #endregion exports
