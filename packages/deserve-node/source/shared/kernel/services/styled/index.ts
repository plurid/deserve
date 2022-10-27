// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries
// #endregion imports



// #region module
const {
    buttons: {
        PureButton: PluridPureButton,
        LinkButton: PluridLinkButton,
    },
    inputs: {
        Textline: PluridTextline,
        Switch: PluridSwitch,
        Dropdown: PluridDropdown,
    },
    form: {
        FormLeftRight: PluridFormLeftRight,
    },
    varia: {
        CopyableLine: PluridCopyableLine,
    },
} = universal;



export const StyledPluridTextline = styled(PluridTextline)`
    margin: 20px auto;
    width: 350px;
`;


export const StyledPluridPureButton = styled(PluridPureButton)`
    margin: 20px auto;
    width: 250px;
`;


export const StyledPluridLinkButton = styled(PluridLinkButton)`
    display: grid;
    place-content: center;
    margin: 30px auto;
`;



export {
    PluridPureButton,
    PluridLinkButton,

    PluridSwitch,
    PluridTextline,
    PluridDropdown,

    PluridFormLeftRight,

    PluridCopyableLine,
};
// #endregion module
