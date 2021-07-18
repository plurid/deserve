// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledIndex {
    theme: Theme;
}

export const StyledIndex = styled.div<IStyledIndex>`
    font-family: ${
        ({
            theme,
        }: IStyledIndex) => theme.fontFamilySansSerif
    };
`;
// #endregion module
