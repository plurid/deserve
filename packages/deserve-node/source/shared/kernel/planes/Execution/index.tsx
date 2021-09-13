// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledExecution,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ExecutionOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface ExecutionStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    // stateExecution: Record<string, any[] | undefined>;
}

export interface ExecutionDispatchProperties {
}

export type ExecutionProperties =
    & ExecutionOwnProperties
    & ExecutionStateProperties
    & ExecutionDispatchProperties;


const Execution: React.FC<ExecutionProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        // stateExecution,
        // #endregion state
    } = properties;

    const {
        parameters,
    } = plurid.plane;

    const coreID = decodeURIComponent(parameters.core || '');
    const functionID = decodeURIComponent(parameters.function || '');
    const executionID = decodeURIComponent(parameters.id || '');
    // #endregion properties


    // #region render
    return (
        <StyledExecution
            theme={stateGeneralTheme}
        >

        </StyledExecution>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ExecutionStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    // stateExecution: selectors.data.getExecution(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ExecutionDispatchProperties => ({
});


const ConnectedExecution = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Execution);
// #endregion module



// #region exports
export default ConnectedExecution;
// #endregion exports
