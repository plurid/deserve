// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const mutations = gql`
    extend type Mutation {
        requestBlob(input: InputRequestBlob!): ResponseRequestedBlob!
        requestKey(input: InputRequestKey!): ResponseRequestedKey!

        storeBlob(input: InputStoreBlob!): ResponseStoredBlob!
        storeKey(input: InputStoreKey!): Response!
    }
`;


export const types = gql`
    type ResponseRequestedBlob {
        status: Boolean!
        error: Error
        data: Blob
    }

    type ResponseStoredBlob {
        # Temporary URL to upload the blob to.
        upload: String!
    }

    type Blob {
        # The source is a temporary URL where the blob lives
        # and is downloadable (public, or with authentication).
        source: String!
    }

    type ResponseRequestedKey {
        status: Boolean!
        error: Error
        data: Key
    }

    type Key {
        # The value can be an actual string, or any other kind of value
        # (boolean, number, object, array). The consumer mut ensure
        # that the correct type is consumed.
        value: String!
    }
`;


export const inputs = gql`
    input InputRequestBlob {
        id: ID!
    }

    input InputRequestKey {
        entity: String!
        id: ID!
        data: String!
    }

    input InputStoreBlob {
        id: ID!
    }

    input InputStoreKey {
        id: ID!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${mutations}
    ${inputs}
    ${types}
`;
// #endregion exports
