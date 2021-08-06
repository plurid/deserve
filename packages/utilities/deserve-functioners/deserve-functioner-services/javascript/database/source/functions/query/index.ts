// #region imports
    // #region external
    import {
        DatabaseQuery,
    } from '~data/interface';

    import client from '~services/graphql/client';
    import {
        QUERY_QUERY,
    } from '~services/graphql/query';
    // #endregion external
// #endregion imports



// #region module
const query: DatabaseQuery = async (
    filter,
    pagination,
) => {
    try {
        const query = await client.query({
            query: QUERY_QUERY,
            variables: {
                input: {
                    filter,
                    pagination,
                },
            },
        });

        const response = query.data.functionerDatabaseQuery;

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
export default query;
// #endregion exports
