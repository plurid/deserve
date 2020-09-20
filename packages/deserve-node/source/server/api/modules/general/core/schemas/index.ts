// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getCores: ResponseCores!
    }
`;


export const mutations = gql`
    extend type Mutation {
        registerCore(input: InputRegisterCore!): ResponseCore!
        deregisterCore(input: InputDeregisterCore!): Response!
        activateCore(input: InputValueString!): Response!
        deactivateCore(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseCore {
        status: Boolean!
        error: Error
        data: Core
    }

    type ResponseCores {
        status: Boolean!
        error: Error
        data: [Core!]
    }

    type Core {
        id: ID!
        domain: String!
        identonym: String!
        active: Boolean!
    }

    extend type Owner {
        cores: [Core!]
    }
`;


export const inputs = gql`
    input InputRegisterCore {
        domain: String!
        identonym: String!
        key: String!
    }

    input InputDeregisterCore {
        id: ID!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${inputs}
    ${types}
`;
// #endregion exports
