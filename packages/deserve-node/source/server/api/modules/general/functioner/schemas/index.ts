// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        functionerDatabaseGet(input: InputFunctionerDatabaseGet!): ResponseFunctionerDatabaseGet!
        functionerDatabaseQuery(input: InputFunctionerDatabaseQuery!): ResponseFunctionerDatabaseQuery!
        functionerDatabaseGetFunctionArguments: ResponseFunctionerDatabaseGetFunctionArguments!
        functionerDatabaseGetFunctionData: ResponseFunctionerDatabaseGetFunctionData!

        functionerEventEmit(input: InputFunctionerEventEmit!): Response!
    }
`;


export const mutations = gql`
    extend type Mutation {
        functionerDatabaseSet(input: InputFunctionerDatabaseSet!): Response!
        functionerDatabaseRemove(input: InputFunctionerDatabaseRemove!): Response!

        functionerStorageRemove(input: InputFunctionerStorageRemove!): Response!
    }
`;


export const types = gql`
    type ResponseFunctionerDatabaseGet {
        status: Boolean!
        error: Error
        data: ResponseFunctionerDatabaseGetData
    }

    type ResponseFunctionerDatabaseGetData {
        value: String!
    }


    type ResponseFunctionerDatabaseQuery {
        status: Boolean!
        error: Error
        data: ResponseFunctionerDatabaseQueryData
    }

    type ResponseFunctionerDatabaseQueryData {
        value: String!
    }


    type ResponseFunctionerDatabaseGetFunctionArguments {
        status: Boolean!
        error: Error
        data: ResponseFunctionerDatabaseGetFunctionArgumentsData
    }

    type ResponseFunctionerDatabaseGetFunctionArgumentsData {
        value: String!
    }


    type ResponseFunctionerDatabaseGetFunctionData {
        status: Boolean!
        error: Error
        data: ResponseFunctionerDatabaseGetFunctionDataData
    }

    type ResponseFunctionerDatabaseGetFunctionDataData {
        name: String!
        text: String!
        externals: String
        addins: String
    }
`;


export const inputs = gql`
    input InputFunctionerDatabaseGet {
        id: String
    }

    input InputFunctionerDatabaseQuery {
        filter: String
        pagination: String
    }


    input InputFunctionerEventEmit {
        type: String!
        data: String
    }



    input InputFunctionerDatabaseSet {
        id: String!
        data: String!
    }

    input InputFunctionerDatabaseRemove {
        id: ID!
    }


    input InputFunctionerStorageRemove {
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
