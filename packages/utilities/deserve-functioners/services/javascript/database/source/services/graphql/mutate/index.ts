// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client/core';
    // #endregion libraries
// #endregion imports



// #region module
export const MUTATION_SET = gql`
    mutation FunctionerDatabaseSet($input: InputFunctionerDatabaseSet!) {
        functionerDatabaseSet(input: $input) {
            status
        }
    }
`;


export const MUTATION_REMOVE = gql`
    mutation FunctionerDatabaseRemove($input: InputFunctionerDatabaseRemove!) {
        functionerDatabaseRemove(input: $input) {
            status
        }
    }
`;
// #endregion module
