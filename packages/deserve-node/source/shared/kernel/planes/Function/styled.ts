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
    font-family: ${
        ({
            theme,
        }: IStyledFunction) => theme.fontFamilySansSerif
    };

    display: grid;
    grid-template-columns: 250px 1fr;
    height: 500px;
`;
// #region module
