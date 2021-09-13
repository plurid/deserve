// #region imports
    // #region external
    import client from '~services/graphql/client';
    import {
        QUERY_GET_FUNCTION_ARGUMENTS,
    } from '~services/graphql/query';
    // #endregion external
// #endregion imports



// #region module
const dataOrDefault = (
    value: string,
) => {
    try {
        const data = JSON.parse(value);
        return data;
    } catch (error) {
        return value;
    }
}


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
