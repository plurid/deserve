// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledExplorer {
    theme: Theme;
}

export const StyledExplorer = styled.div<IStyledExplorer>`
    padding: 1rem;
`;


export const StyledLanguage = styled.div`
    font-size: 0.7rem;
    margin: 0.7rem 0;
`;


export const StyledDate = styled.div`
    font-size: 0.7rem;
    margin: 0.7rem 0;
`;


export const StyledNewAddin = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 0.7rem;
`;


export interface IStyledButton {
    theme: Theme;
    selected?: boolean;
}

export const StyledButton = styled.div<IStyledButton>`
    padding: 0.7rem 1.7rem;
    margin: 0 -1rem;
    cursor: pointer;
    user-select: none;

    background-color: ${
        ({
            theme,
            selected,
        }: IStyledButton) => {
            if (selected) {
                return theme.backgroundColorQuaternary;
            }

            return 'initial';
        }
    };
`;
// #region module
