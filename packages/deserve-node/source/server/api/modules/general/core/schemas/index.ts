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
        registerCore(input: InputRegisterCore!): Response!
        deregisterCore(input: InputDeregisterCore!): Response!
    }
`;


export const types = gql`
    type ResponseCores {
        status: Boolean!
        error: Error
        data: [Core!]
    }

    type Core {
        id: ID!
        domain: String!
    }
`;


export const inputs = gql`
    input InputRegisterCore {
        domain: String!
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
