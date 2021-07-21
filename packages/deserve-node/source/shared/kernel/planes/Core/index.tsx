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
    import {
        ClientCore,
    } from '~server/data/interfaces';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledCore,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface CoreOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface CoreStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateCores: ClientCore[];
}

export interface CoreDispatchProperties {
}

export type CoreProperties =
    & CoreOwnProperties
    & CoreStateProperties
    & CoreDispatchProperties;


const Core: React.FC<CoreProperties> = (
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
        stateCores,
        // #endregion state
    } = properties;

    const coreID = plurid.plane.parameters.id;
    const core = stateCores.find(core => core.id === coreID);
    if (!core) {
        return (<></>);
    }

    const {
        link,
        origins,
    } = core;
    // #endregion properties


    // #region render
    return (
        <StyledCore
            theme={stateGeneralTheme}
        >
            <div>
                Core {link}
            </div>

            <div>
                origins
            </div>

            <div>
                add origin
            </div>

            <div>
                obliterate core
            </div>
        </StyledCore>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): CoreStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateCores: selectors.data.getCores(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): CoreDispatchProperties => ({
});


const ConnectedCore = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Core);
// #endregion module



// #region exports
export default ConnectedCore;
// #endregion exports
