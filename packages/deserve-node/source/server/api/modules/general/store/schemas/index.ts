// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        requestKey(input: InputRequestKey!): ResponseRequestedKey!
        requestKeys(input: InputRequestKeys!): ResponseRequestedKeys!

        queryKeys(input: InputQueryKeys!): ResponseQueriedKeys!
    }
`;


export const mutations = gql`
    extend type Mutation {
        storeKey(input: InputStoreKey!): ResponseStoredKey!

        updateKey(input: InputUpdateKey!): Response!

        deleteBlob(input: InputDeleteBlob!): Response!
        deleteKey(input: InputDeleteBlob!): Response!
    }
`;


export const types = gql`
    type ResponseRequestedKey {
        status: Boolean!
        error: Error
        data: Key
    }

    type ResponseRequestedKeys {
        status: Boolean!
        error: Error
        data: [Key!]
    }


    type ResponseQueriedKeys {
        status: Boolean!
        error: Error
        data: [Key!]
    }


    type ResponseStoredKey {
        status: Boolean!
        error: Error
        data: StoredKey
    }


    type Key {
        id: ID!
        # The value can be an actual string, or any other kind of value
        # (boolean, number, object, array). The consumer must ensure
        # that the correct type is consumed.
        value: String!
        storedAt: Float!
        sha: String!
        updatedAt: Float
    }

    type StoredKey {
        id: String!
    }
`;


export const inputs = gql`
    input InputRequestKey {
        id: ID!
        # entity: String!
        # data: String!
    }

    input InputRequestKeys {
        ids: [String!]!
    }


    input InputQueryKeys {
        filter: String!
        count: Int
        start: String
    }


    input InputStoreKey {
        data: String!
    }


    input InputUpdateKey {
        id: ID!
        data: String!
        field: String
    }


    input InputDeleteBlob {
        id: ID!
    }

    input InputDeleteKey {
        id: ID!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
// #endregion exports
