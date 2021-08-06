// #region imports
    // #region external
    import {
        DatabaseGet,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        QUERY_GET,
    } from '~services/graphql/query';
    // #endregion external
// #endregion imports



// #region module
const get: DatabaseGet = async (
    id,
) => {
    try {
        const query = await client.query({
            query: QUERY_GET,
            variables: {
                input: {
                    id,
                },
            },
        });

        const response = query.data.functionerDatabaseGet;

        if (!response.status) {
            return;
        }

        return response.data;
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
