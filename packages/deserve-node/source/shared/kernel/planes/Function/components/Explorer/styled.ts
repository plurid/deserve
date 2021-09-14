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
    background-color: ${
        ({
            theme,
        }: IStyledExplorer) => theme.backgroundColorTertiary
    };
    padding: 2rem;
`;
// #region module
