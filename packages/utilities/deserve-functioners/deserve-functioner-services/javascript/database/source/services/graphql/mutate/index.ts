// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const QUERY_SET = gql`
    query FunctionerDatabaseSet($input: InputFunctionerDatabaseSet!) {
        functionerDatabaseSet(input: $input) {
            status
        }
    }
`;
// #endregion module
