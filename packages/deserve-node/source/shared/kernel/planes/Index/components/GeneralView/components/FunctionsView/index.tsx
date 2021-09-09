// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    // import {
    //     ClientFunction,
    // } from '~server/data/interfaces';

    // import CoreFunctionView from '~kernel-components/CoreFunctionView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
export interface FunctionsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required
}

export interface FunctionsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    // stateFunctions: ClientFunction[];
}

export interface FunctionsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
}

export type FunctionsViewProperties =
    & FunctionsViewOwnProperties
    & FunctionsViewStateProperties
    & FunctionsViewDispatchProperties;


const FunctionsView: React.FC<FunctionsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        // stateFunctions,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region render
    // if (stateFunctions.length === 0) {
    //     return (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //             }}
    //         >
    //             no functions
    //         </div>
    //     );
    // }

    return (
        <div>

        </div>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): FunctionsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    // stateFunctions: selectors.data.getFunctions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): FunctionsViewDispatchProperties => ({
    dispatch,
});


const ConnectedFunctionsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(FunctionsView);
// #endregion module



// #region exports
export default ConnectedFunctionsView;
// #endregion exports
