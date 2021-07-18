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
    font-family: ${
        ({
            theme,
        }: IStyledBlob) => theme.fontFamilySansSerif
    };
`;
// #region module
