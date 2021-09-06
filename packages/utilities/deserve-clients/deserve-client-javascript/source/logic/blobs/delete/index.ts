// #region imports
    // #region external
    import {
        GraphqlClient,

        BlobsDelete,
    } from '~data/interfaces';

    import {
        MUTATION_DELETE_BLOB,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const blobsDelete = (
    graphqlClient: GraphqlClient,
): BlobsDelete => async (
    id,
) => {
    try {
        const request = await graphqlClient.mutate({
            mutation: MUTATION_DELETE_BLOB,
            variables: {
                input: {
                    id,
                },
            },
        });
        const response = request.data.deleteBlob;

        return response.status;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default blobsDelete;
// #endregion exports
