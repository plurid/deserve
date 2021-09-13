// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledExecutions {
    theme: Theme;
}

export const StyledExecutions = styled.div<IStyledExecutions>`
    padding: 2rem;
    font-family: ${
        ({
            theme,
        }: IStyledExecutions) => theme.fontFamilySansSerif
    };
`;
// #region module
