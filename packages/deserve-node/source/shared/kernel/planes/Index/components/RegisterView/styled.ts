// #region imports
    // #region libraries
    import styled from 'styled-components';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledRegisterView {
}

export const StyledRegisterView = styled.div<IStyledRegisterView>`
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


export const StyledRegisterButtons = styled.div`
    margin: 50px auto;
    display: grid;
`;


export const StyledRegisterButton = styled.div`
    width: 200px;
    margin: 0 auto;
    margin-bottom: 30px;
`;
// #endregion module
