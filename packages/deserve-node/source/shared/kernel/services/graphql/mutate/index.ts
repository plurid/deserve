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
                link
                register
                identonym
                active
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


const ACTIVATE_CORE = gql`
    mutation ActivateCore($input: InputValueString!) {
        activateCore(input: $input) {
            status
            error {
                path
                type
                message
            }
        }
    }
`;


const DEACTIVATE_CORE = gql`
    mutation DeactivateCore($input: InputValueString!) {
        deactivateCore(input: $input) {
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



const DELETE_BLOB = gql`
    mutation DeleteBlob($input: InputDeleteBlob!) {
        deleteBlob(input: $input) {
            status
        }
    }
`;

const DELETE_KEY = gql`
    mutation DeleteKey($input: InputDeleteKey!) {
        deleteKey(input: $input) {
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

    ACTIVATE_CORE,
    DEACTIVATE_CORE,

    LOGIN,
    LOGOUT,

    DELETE_BLOB,
    DELETE_KEY,
};
// #endregion exports
