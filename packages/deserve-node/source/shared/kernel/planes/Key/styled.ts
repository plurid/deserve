// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledKey {
    theme: Theme;
}

export const StyledKey = styled.div<IStyledKey>`
    font-family: ${
        ({
            theme,
        }: IStyledKey) => theme.fontFamilySansSerif
    };
`;
// #region module
