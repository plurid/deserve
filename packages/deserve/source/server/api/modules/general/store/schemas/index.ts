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

    }
`;


export const types = gql`

`;


export const inputs = gql`

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
