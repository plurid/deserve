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
// #endregion module



// #region exports
export {
    GET_CURRENT_OWNER,
};
// #endregion exports
