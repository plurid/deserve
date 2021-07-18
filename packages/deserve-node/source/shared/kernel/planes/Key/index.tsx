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

    import {
        formatJSON,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        StyledKey,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface KeyOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface KeyStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateKeys: Record<string, any[] | undefined>;
}

export interface KeyDispatchProperties {
}

export type KeyProperties =
    & KeyOwnProperties
    & KeyStateProperties
    & KeyDispatchProperties;


const Key: React.FC<KeyProperties> = (
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
        stateKeys,
        // #endregion state
    } = properties;

    const coreID = plurid.plane.parameters.core;
    const keyID = (plurid.plane.parameters.id || '').replace('-', '/');
    const coreKeys = stateKeys[coreID];
    if (!coreKeys) {
        return (<></>);
    }

    const key = coreKeys.find(key => key.id === keyID);
    if (!key) {
        return (<></>);
    }

    const {
        value,
    } = key;
    // #endregion properties


    // #region render
    return (
        <StyledKey
            theme={stateGeneralTheme}
        >
            <div>
                {coreID} · {keyID}
            </div>

            <pre>
                {formatJSON(value)}
            </pre>
        </StyledKey>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): KeyStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateKeys: selectors.data.getKeys(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): KeyDispatchProperties => ({
});


const ConnectedKey = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Key);
// #endregion module



// #region exports
export default ConnectedKey;
// #endregion exports
