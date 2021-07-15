// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        requestBlob(input: InputRequestBlob!): ResponseRequestedBlob!
        requestBlobs(input: InputRequestBlobs!): ResponseRequestedBlobs!

        queryBlobs(input: InputQueryBlobs!): ResponseQueriedBlobs!

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
    type ResponseRequestedBlob {
        status: Boolean!
        error: Error
        data: Blob
    }

    type ResponseRequestedBlobs {
        status: Boolean!
        error: Error
        data: [Blob!]
    }

    type ResponseQueriedBlobs {
        status: Boolean!
        error: Error
        data: [Blob!]
    }


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



    type Blob {
        id: ID!
        storedAt: Float!
        mimetype: String!
        size: Float!
        metadata: String!
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
    input InputRequestBlob {
        id: ID!
    }

    input InputRequestBlobs {
        ids: [String!]!
    }

    input InputQueryBlobs {
        coreID: String
        filter: String!
        count: Int
        start: String
    }


    input InputRequestKey {
        id: ID!
    }

    input InputRequestKeys {
        ids: [String!]!
    }

    input InputQueryKeys {
        coreID: String
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
