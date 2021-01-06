// #region imports
    // #region libraries
    import {
        DocumentNode,
    } from 'graphql';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import client from '~kernel-services/graphql/client';
    // #endregion external
// #endregion imports



// #region module
/**
 * Adds an entity through mutation.
 *
 * @param input
 * @param mutation
 * @param name
 */
const addEntityMutation = async <I, M>(
    input: I,
    mutation: DocumentNode,
    name: string,
): Promise<M | undefined> => {
    try {
        const mutate = await client.mutate({
            mutation,
            variables: {
                input,
            },
        });

        const response = mutate.data[name];

        if (!response.status) {
            return;
        }

        const {
            data,
        } = response;

        return graphql.deleteTypenames(data);
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    addEntityMutation,
};
// #endregion exports
