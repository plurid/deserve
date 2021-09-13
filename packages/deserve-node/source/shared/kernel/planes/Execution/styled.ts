// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledExecution {
    theme: Theme;
}

export const StyledExecution = styled.div<IStyledExecution>`
    padding: 2rem;
    font-family: ${
        ({
            theme,
        }: IStyledExecution) => theme.fontFamilySansSerif
    };
`;
// #region module
