// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        PluridFormLeftRight,
        PluridTextline,
    } from '~kernel-services/styled';
    // #endregion libraries
// #endregion imports



// #region module
export const StyledSettingsView = styled.div`
    width: 400px;
    margin: 0 auto;
`;


export const StyledPluridFormLeftRight = styled(PluridFormLeftRight)`
    margin-bottom: 1rem;
    min-height: 36px;
`;


export const StyledPluridTextline = styled(PluridTextline)`
    width: 100px;
    margin-right: 10px;
`;
// #endregion module
