// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledFunction {
    theme: Theme;
}

export const StyledFunction = styled.div<IStyledFunction>`
    padding: 2rem;
    font-family: ${
        ({
            theme,
        }: IStyledFunction) => theme.fontFamilySansSerif
    };
`;
// #region module
