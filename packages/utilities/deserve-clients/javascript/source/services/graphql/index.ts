// #region imports
    // #region libraries
    import {
        gql,
    } from '@apollo/client/core';
    // #endregion libraries
// #endregion imports



// #region module
export const QUERY_QUERY_BLOBS = gql`
    query QueryBlobs($input: InputQueryBlobs!) {
        queryBlobs(input: $input) {
            status
            data {
                id
                storedAt
                mimetype
                size
                metadata
            }
            expiration
        }
    }
`;


export const QUERY_QUERY_KEYS = gql`
    query QueryKeys($input: InputQueryKeys!) {
        queryKeys(input: $input) {
            status
            data {
                id
                value
                storedAt
                updatedAt
                sha
            }
            expiration
        }
    }
`;


export const QUERY_EXPIRATION = gql`
    query QueryExpiration {
        queryExpiration {
            status
            data {
                value
            }
        }
    }
`;


export const QUERY_QUERY_FUNCTIONS = gql`
    query QueryFunctions($input: InputQueryFunctions!) {
        queryFunctions(input: $input) {
            status
            data {
                id
                name
                text
                language
                database
                storage
                externals
                addins
                storedAt
                coreID
            }
        }
    }
`;


export const QUERY_GET_FUNCTION = gql`
    query GetFunction($input: InputGetFunction!) {
        getFunction(input: $input) {
            status
            data {
                id
                name
                text
                language
                database
                storage
                externals
                addins
                storedAt
                coreID
            }
        }
    }
`;


export const QUERY_GET_FUNCTIONS = gql`
    query GetFunctions($input: InputGetFunctions!) {
        getFunctions(input: $input) {
            status
            data {
                id
                name
                text
                language
                database
                storage
                externals
                addins
                storedAt
                coreID
            }
        }
    }
`;


export const QUERY_REQUEST_KEY = gql`
    query RequestKey($input: InputRequestKey!) {
        requestKey(input: $input) {
            status
            data {
                id
                value
                storedAt
                updatedAt
                sha
            }
            expiration
        }
    }
`;


export const QUERY_REQUEST_KEYS = gql`
    query RequestKeys($input: InputRequestKeys!) {
        requestKeys(input: $input) {
            status
            data {
                id
                value
                storedAt
                updatedAt
                sha
            }
            expiration
        }
    }
`;



export const MUTATION_DELETE_BLOB = gql`
    mutation DeleteBlob($input: InputDeleteBlob!) {
        deleteBlob(input: $input) {
            status
        }
    }
`;


export const MUTATION_DELETE_KEY = gql`
    mutation DeleteKey($input: InputDeleteKey!) {
        deleteKey(input: $input) {
            status
        }
    }
`;


export const MUTATION_STORE_KEY = gql`
    mutation StoreKey($input: InputStoreKey!) {
        storeKey(input: $input) {
            status
        }
    }
`;


export const MUTATION_UPDATE_KEY = gql`
    mutation UpdateKey($input: InputUpdateKey!) {
        updateKey(input: $input) {
            status
        }
    }
`;



export const MUTATION_DELETE_FUNCTION = gql`
    mutation DeleteFunction($input: InputDeleteFunction!) {
        deleteFunction(input: $input) {
            status
        }
    }
`;


export const MUTATION_STORE_FUNCTION = gql`
    mutation StoreFunction($input: InputStoreFunction!) {
        storeFunction(input: $input) {
            status
        }
    }
`;


export const MUTATION_RUN_FUNCTION = gql`
    mutation RunFunction($input: InputRunFunction!) {
        runFunction(input: $input) {
            status
        }
    }
`;


export const MUTATION_UPDATE_FUNCTION = gql`
    mutation UpdateFunction($input: InputUpdateFunction!) {
        updateFunction(input: $input) {
            status
        }
    }
`;
// #endregion module
