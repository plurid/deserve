// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
const GET_CURRENT_OWNER = gql`
    query GetCurrentOwner {
        getCurrentOwner {
            status
            error {
                path
                type
                message
            }
            data {
                id
                identonym
                cores {
                    id
                    link
                    register
                    identonym
                    active
                }
            }
        }
    }
`;


const GET_GLOBAL_DATA = gql`
    query GetGlobalData {
        getGlobalData {
            status
            error {
                path
                type
                message
            }
            data {
                registration
            }
        }
    }
`;


const QUERY_BLOBS = gql`
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


const QUERY_KEYS = gql`
    query QueryKeys($input: InputQueryKeys!) {
        queryKeys(input: $input) {
            status
            data {
                id
                value
                storedAt
                updatedAt
                sha
                deleted
                deletedAt
            }
        }
    }
`;


const GET_FUNCTIONS = gql`
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


const GET_EXECUTIONS = gql`
    query GetExecutions($input: InputGetExecutions!) {
        getExecutions(input: $input) {
            status
            data {
                id
                result
                arguments
                error
                startedAt
                finishedAt
                coreID
                functionID
            }
        }
    }
`;
// #endregion module



// #region exports
export {
    GET_CURRENT_OWNER,
    GET_GLOBAL_DATA,
    QUERY_BLOBS,
    QUERY_KEYS,
    GET_FUNCTIONS,
    GET_EXECUTIONS,
};
// #endregion exports
