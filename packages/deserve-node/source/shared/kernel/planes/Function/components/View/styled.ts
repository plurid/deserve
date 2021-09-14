// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledView {
    theme: Theme;
}

export const StyledView = styled.div<IStyledView>`
`;
// #region module
