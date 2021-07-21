// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledCore {
    theme: Theme;
}

export const StyledCore = styled.div<IStyledCore>`
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    word-break: break-all;
    font-family: ${
        ({
            theme,
        }: IStyledCore) => theme.fontFamilySansSerif
    };
`;
// #region module
