// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
const REGISTER_OWNER = gql`
    mutation RegisterOwner($input: InputRegisterOwner!) {
        registerOwner(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                id
                identonym
            }
        }
    }
`;


const LOGIN = gql`
    mutation Login($input: InputLogin!) {
        login(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                id
                identonym
            }
        }
    }
`;


const LOGOUT = gql`
    mutation Logout {
        logout {
            status
        }
    }
`;
// #endregion module



// #region exports
export {
    REGISTER_OWNER,
    LOGIN,
    LOGOUT,
};
// #endregion exports
