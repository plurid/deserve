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
        StyledFunction,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface FunctionOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface FunctionStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateFunctions: Record<string, any[] | undefined>;
}

export interface FunctionDispatchProperties {
}

export type FunctionProperties =
    & FunctionOwnProperties
    & FunctionStateProperties
    & FunctionDispatchProperties;


const Function: React.FC<FunctionProperties> = (
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
        stateFunctions,
        // #endregion state
    } = properties;

    const coreID = decodeURIComponent(plurid.plane.parameters.core || '');
    const functionID = decodeURIComponent(plurid.plane.parameters.id || '');

    const coreStateFunctions = stateFunctions[coreID] || [];
    const functionData = coreStateFunctions.find(stateFunction => stateFunction.id === functionID);
    // #endregion properties


    // #region render
    if (!functionData) {
        return (
            <StyledFunction
                theme={stateGeneralTheme}
            >
                function not found
            </StyledFunction>
        );
    }


    const {
        name,
        text,
    } = functionData;

    return (
        <StyledFunction
            theme={stateGeneralTheme}
        >
            <div>
                name {name}
            </div>

            <pre>
                {text}
            </pre>
        </StyledFunction>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): FunctionStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateFunctions: selectors.data.getFunctions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): FunctionDispatchProperties => ({
});


const ConnectedFunction = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Function);
// #endregion module



// #region exports
export default ConnectedFunction;
// #endregion exports
