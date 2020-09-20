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


const REGISTER_CORE = gql`
    mutation RegisterCore($input: InputRegisterCore!) {
        registerCore(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                id
                domain
                identonym
            }
        }
    }
`;


const DEREGISTER_CORE = gql`
    mutation DeregisterCore($input: InputDeregisterCore!) {
        deregisterCore(input: $input) {
            status
            error {
                path
                type
                message
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
    REGISTER_CORE,
    DEREGISTER_CORE,
    LOGIN,
    LOGOUT,
};
// #endregion exports
