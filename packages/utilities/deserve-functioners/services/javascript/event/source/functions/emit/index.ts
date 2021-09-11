// #region imports
    // #region external
    import {
        EventEmit,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        MUTATION_EVENT_EMIT,
    } from '~services/graphql/mutate';
    // #endregion external
// #endregion imports



// #region module
const emit: EventEmit = async (
    data,
) => {
    try {
        const mutation = await client.mutate({
            mutation: MUTATION_EVENT_EMIT,
            variables: {
                input: {
                    data,
                },
            },
        });

        const response = mutation.data.functionerEventEmit;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default emit;
// #endregion exports