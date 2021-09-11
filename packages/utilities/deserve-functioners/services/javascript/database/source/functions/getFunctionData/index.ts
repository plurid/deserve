// #region imports
    // #region external
    import client from '~services/graphql/client';
    import {
        QUERY_GET_FUNCTION_DATA,
    } from '~services/graphql/query';
    // #endregion external
// #endregion imports



// #region module
const getFunctionData = async () => {
    try {
        const query = await client.query({
            query: QUERY_GET_FUNCTION_DATA,
        });

        const response = query.data.functionerDatabaseGetFunctionData;

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
export default getFunctionData;
// #endregion exports
