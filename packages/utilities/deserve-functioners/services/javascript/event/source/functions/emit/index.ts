// #region imports
    // #region external
    import {
        EventEmit,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        MUTATION_EVENT_EMIT,
    } from '~services/graphql/mutate';

    import {
        stringedDataOrDefault,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
const emit: EventEmit = async (
    type,
    data,
) => {
    try {
        const stringedData = stringedDataOrDefault(data);

        const mutation = await client.mutate({
            mutation: MUTATION_EVENT_EMIT,
            variables: {
                input: {
                    type,
                    data: stringedData,
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
