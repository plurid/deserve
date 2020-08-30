// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {

    }
`;


export const mutations = gql`
    extend type Mutation {
        requestBlob(input: InputRequestBlob!): ResponseBlob!
        requestData(input: InputRequestData!): ResponseData!
    }
`;


export const types = gql`
    type ResponseBlob {
        status: Boolean!
        error: Error
        data: Blob
    }

    type Blob {
        # The source is a temporary URL where the blob lives
        # and is downloadable (public, or with authentication).
        source: String!
    }

    type ResponseData {
        status: Boolean!
        error: Error
        data: Data
    }

    type Data {
        # The value can be an actual string, or any other kind of value
        # (boolean, number, object, array). The consumer mut ensure
        # that the correct type is consumed.
        value: String!
    }
`;


export const inputs = gql`
    input InputRequestBlob {
        id: String!
    }

    input InputRequestData {
        entity: String!
        id: String!
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
