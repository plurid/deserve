// #region imports
    // #region external
    import {
        ClientData,

        BlobsDelete,
    } from '~data/interfaces';

    import {
        MUTATION_DELETE_BLOB,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const blobsDelete = (
    clientData: ClientData,
): BlobsDelete => async (
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
            mutation: MUTATION_DELETE_BLOB,
            variables: {
                input: {
                    id,
                },
            },
        });
        const response = request.data.deleteBlob;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default blobsDelete;
// #endregion exports
