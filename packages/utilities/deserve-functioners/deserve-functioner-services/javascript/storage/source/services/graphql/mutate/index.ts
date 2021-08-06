// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const MUTATION_STORAGE_REMOVE = gql`
    mutation FunctionerStorageRemove($input: InputFunctionerStorageRemove!) {
        functionerStorageRemove(input: $input) {
            status
        }
    }
`;
// #endregion module
