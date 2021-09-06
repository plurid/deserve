// #region imports
    // #region libraries
    import gql from 'graphql-tag';
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
// #endregion module
