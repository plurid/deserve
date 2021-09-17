// #region imports
    // #region external
    import client from '~services/graphql/client';
    import {
        QUERY_GET_FUNCTION_ARGUMENTS,
    } from '~services/graphql/query';

    import {
        dataOrDefault,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
const getFunctionArguments = async () => {
    try {
        const query = await client.query({
            query: QUERY_GET_FUNCTION_ARGUMENTS,
        });

        const response = query.data.functionerDatabaseGetFunctionArguments;

        if (!response.status) {
            return;
        }

        return dataOrDefault(response.data.value);
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default getFunctionArguments;
// #endregion exports
