// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const MUTATION_SET = gql`
    query FunctionerDatabaseSet($input: InputFunctionerDatabaseSet!) {
        functionerDatabaseSet(input: $input) {
            status
        }
    }
`;


export const MUTATION_REMOVE = gql`
    query FunctionerDatabaseRemove($input: InputFunctionerDatabaseRemove!) {
        functionerDatabaseRemove(input: $input) {
            status
        }
    }
`;
// #endregion module
