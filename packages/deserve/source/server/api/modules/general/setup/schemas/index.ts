// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
    }
`;


export const types = gql`
    type ResponseSetup {
        status: Boolean!
        error: Error
        data: Setup
    }

    type Setup {
        _: Boolean
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${types}
`;
// #endregion exports
