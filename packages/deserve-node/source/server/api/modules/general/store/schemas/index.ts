// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        requestBlob(input: InputRequestBlob!): ResponseRequestedBlob!
        requestKey(input: InputRequestKey!): ResponseRequestedKey!
        requestKeys(input: InputRequestKeys!): ResponseRequestedKeys!

        queryKeys(input: InputQueryKeys!): ResponseQueriedKeys!
    }
`;


export const mutations = gql`
    extend type Mutation {
        storeBlob(input: InputStoreBlob!): ResponseStoredBlob!
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


    type ResponseStoredBlob {
        status: Boolean!
        error: Error
        data: StoredBlob
    }

    type ResponseStoredKey {
        status: Boolean!
        error: Error
        data: StoredKey
    }


    type Blob {
        # The source is a temporary URL where the blob lives
        # and is downloadable (public, or with authentication).
        source: String!
    }

    type Key {
        # The value can be an actual string, or any other kind of value
        # (boolean, number, object, array). The consumer mut ensure
        # that the correct type is consumed.
        value: String!
    }

    type StoredBlob {
        # Temporary URL to upload the blob to.
        upload: String!
    }

    type StoredKey {
        id: String!
    }
`;


export const inputs = gql`
    input InputRequestBlob {
        id: ID!
    }

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
    }


    input InputStoreBlob {
        sha: String!
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
