// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledBlob {
    theme: Theme;
}

export const StyledBlob = styled.div<IStyledBlob>`
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    word-break: break-all;
    font-family: ${
        ({
            theme,
        }: IStyledBlob) => theme.fontFamilySansSerif
    };
`;
// #region module
