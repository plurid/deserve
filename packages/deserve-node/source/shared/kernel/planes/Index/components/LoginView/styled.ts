// #region imports
    // #region libraries
    import styled from 'styled-components';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledLoginView {
}

export const StyledLoginView = styled.div<IStyledLoginView>`
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


export const StyledLoginButtons = styled.div`
    margin: 50px auto;
    display: grid;
`;


export const StyledLoginButton = styled.div`
    width: 200px;
    margin: 0 auto;
`;
// #endregion module
