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
// #endregion module
