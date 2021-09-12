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

        getFunctions(input: InputGetFunctions!): ResponseGetFunctions!
    }
`;


export const mutations = gql`
    extend type Mutation {
        storeKey(input: InputStoreKey!): ResponseStoredKey!

        updateKey(input: InputUpdateKey!): Response!

        deleteBlob(input: InputDeleteBlob!): Response!
        deleteKey(input: InputDeleteKey!): Response!

        storeFunction(input: InputStoreFunction!): ResponseStoredFunction!
        updateFunction(input: InputUpdateFunction!): ResponseUpdatedFunction!
        deleteFunction(input: InputDeleteFunction!): Response!

        runFunction(input: InputRunFunction!): ResponseRunFunction!
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


    type ResponseStoredFunction {
        status: Boolean!
        error: Error
        data: StoredFunction
    }

    type ResponseUpdatedFunction {
        status: Boolean!
        error: Error
        data: StoredFunction
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
        id: ID!
    }

    type StoredFunction {
        id: ID!
        name: String!
        text: String!
        database: String
        storage: String
        externals: [String!]
        sha: String!
        storedAt: Float!
    }



    type ResponseGetFunctions {
        status: Boolean!
        error: Error
        data: [ResponseFunction!]
    }

    type ResponseFunction {
        id: ID!
        name: String!
        text: String!
        database: String!
        storage: String!
        externals: [String!]!
    }

    type ResponseRunFunction {
        status: Boolean!
        error: Error
        data: String
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
        coreID: String
        id: ID!
    }

    input InputDeleteKey {
        coreID: String
        id: ID!
    }



    input InputGetFunctions {
        coreID: String
    }


    input InputStoreFunction {
        name: String!
        text: String!
        language: String!
        database: String
        storage: String
        externals: String
        addins: String
    }

    input InputUpdateFunction {
        id: ID!
        name: String
        text: String
        database: String
        storage: String
        externals: String
        addins: String
    }

    input InputDeleteFunction {
        id: ID!
    }


    input InputRunFunction {
        id: ID!
        # JSON array of arguments to be passed to the deserve function
        arguments: String
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
