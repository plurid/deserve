// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client/core';
    // #endregion libraries
// #endregion imports



// #region module
export const MUTATION_EVENT_EMIT = gql`
    mutation FunctionerEventEmit($input: InputFunctionerEventEmit!) {
        functionerEventEmit(input: $input) {
            status
        }
    }
`;
// #endregion module
