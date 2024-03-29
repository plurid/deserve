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

        getFunction(input: InputGetFunction!): ResponseGetFunction!
        getFunctions(input: InputGetFunctions!): ResponseGetFunctions!

        getExecutions(input: InputGetExecutions!): ResponseGetExecutions!
        getExecution(input: InputGetExecution!): ResponseGetExecution!
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
        expiration: String
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
        data: Key
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
        deleted: Boolean
        deletedAt: Float
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
        deleted: Boolean
        deletedAt: Float
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
        deleted: Boolean
        deletedAt: Float
    }

    type Functioner {
        id: ID!
        functionID: String!
        imageneName: String
        deleted: Boolean
        deletedAt: Float
    }



    type ResponseGetFunction {
        status: Boolean!
        error: Error
        data: ResponseFunction
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
        language: String!
        database: String!
        storage: String!
        externals: String
        addins: String
        storedAt: Float!
        coreID: String!
    }

    type ResponseRunFunction {
        status: Boolean!
        error: Error
        data: String
    }




    type ResponseGetExecutions {
        status: Boolean!
        error: Error
        data: [ResponseExecution!]
    }

    type ResponseGetExecution {
        status: Boolean!
        error: Error
        data: ResponseExecution
    }

    type ResponseExecution {
        id: ID!
        result: String!
        arguments: String
        error: String
        startedAt: Float!
        finishedAt: Float!
        functionID: String!
        coreID: String!
        deleted: Boolean
        deletedAt: Float
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
        id: ID
        selector: String
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
        id: ID
        selector: String
        data: String!
        field: String
    }


    input InputDeleteBlob {
        coreID: String
        id: ID!
    }

    input InputDeleteKey {
        coreID: String
        id: ID
        selector: String
    }



    input InputGetFunction {
        coreID: String
        id: String!
        type: String
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


    input InputGetExecutions {
        functionID: String!
    }

    input InputGetExecution {
        functionID: String!
        executionID: String!
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
