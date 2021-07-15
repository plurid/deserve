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
    import {
        ClientCore,
    } from '~server/data/interfaces';

    import CoreDataView from '~kernel-components/CoreDataView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
export interface CoresViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required
}

export interface CoresViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateCores: ClientCore[];
}

export interface CoresViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
}

export type CoresViewProperties =
    & CoresViewOwnProperties
    & CoresViewStateProperties
    & CoresViewDispatchProperties;


const CoresView: React.FC<CoresViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateCores,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region render
    if (stateCores.length === 0) {
        return (
            <div
                style={{
                    textAlign: 'center',
                }}
            >
                no data
            </div>
        );
    }

    return (
        <CoreDataView
            core={stateCores[0]}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): CoresViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateCores: selectors.data.getCores(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): CoresViewDispatchProperties => ({
    dispatch,
});


const ConnectedCoresView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(CoresView);
// #endregion module



// #region exports
export default ConnectedCoresView;
// #endregion exports
