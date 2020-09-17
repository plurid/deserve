// #region imports
    // #region libraries
    import styled from 'styled-components';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledGeneralView {
}

export const StyledGeneralView = styled.div<IStyledGeneralView>`
    padding: 3rem;
    display: grid;
    place-content: center;
    text-align: center;

    h1 {
        font-size: 1.3rem;
        margin: 1.5rem;
    }

    h2 {
        font-size: 1.1rem;
        margin: 1.5rem;
    }
`;
// #endregion module
