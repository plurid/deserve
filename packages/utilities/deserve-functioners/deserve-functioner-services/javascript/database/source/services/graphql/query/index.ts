// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client/core';
    // #endregion libraries
// #endregion imports



// #region module
export const QUERY_GET = gql`
    query FunctionerDatabaseGet($input: InputFunctionerDatabaseGet!) {
        functionerDatabaseGet(input: $input) {
            status
            data {
                value
            }
        }
    }
`;


export const QUERY_QUERY = gql`
    query FunctionerDatabaseQuery($input: InputFunctionerDatabaseQuery!) {
        functionerDatabaseQuery(input: $input) {
            status
            data {
                value
            }
        }
    }
`;


export const QUERY_GET_FUNCTION_ARGUMENTS = gql`
    query FunctionerDatabaseGetFunctionArguments($input: InputFunctionerDatabaseGetFunctionArguments!) {
        functionerDatabaseGetFunctionArguments(input: $input) {
            status
            data {
                value
            }
        }
    }
`;


export const QUERY_GET_FUNCTION_DATA = gql`
    query FunctionerDatabaseGetFunctionData($input: InputFunctionerDatabaseGetFunctionData!) {
        functionerDatabaseGetFunctionData(input: $input) {
            status
            data {
                name
                text
                externals

            }
        }
    }
`;
// #endregion module
