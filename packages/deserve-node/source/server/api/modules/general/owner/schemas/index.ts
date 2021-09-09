// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getCurrentOwner: ResponseOwner!
        getGlobalData: ResponseGlobalData!
    }
`;


export const mutations = gql`
    extend type Mutation {
        registerOwner(input: InputRegisterOwner!): ResponseOwner!
        login(input: InputLogin!): ResponseOwner!
        logout: Response!
    }
`;


export const types = gql`
    type ResponseOwner {
        status: Boolean!
        error: Error
        data: Owner
    }

    type Owner {
        id: ID!
        identonym: String!
    }


    type ResponseGlobalData {
        status: Boolean!
        error: Error
        data: GlobalData
    }

    type GlobalData {
        registration: Boolean!
    }
`;


export const input = gql`
    input InputRegisterOwner {
        identonym: String!
        key: String!
    }

    input InputLogin {
        identonym: String!
        key: String!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${input}
`;
// #endregion exports
