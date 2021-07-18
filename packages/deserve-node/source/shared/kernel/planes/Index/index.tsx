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
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledIndex,
    } from './styled';

    import RegisterView from './components/RegisterView';
    import LoginView from './components/LoginView';
    import GeneralView from './components/GeneralView';
    // #endregion internal
// #endregion imports



// #region module
export interface IndexOwnProperties {
}

export interface IndexStateProperties {
    stateGeneralTheme: Theme;
    stateIndexView: string;
}

export interface IndexDispatchProperties {
}

export type IndexProperties = IndexOwnProperties
    & IndexStateProperties
    & IndexDispatchProperties;

const Index: React.FC<IndexProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        stateIndexView,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region render
    let renderView = (<></>);

    switch (stateIndexView) {
        case 'register':
            renderView = (<RegisterView />);
            break;
        case 'login':
            renderView = (<LoginView />);
            break;
        case 'general':
            renderView = (<GeneralView />);
            break;
    }

    return (
        <StyledIndex
            theme={stateGeneralTheme}
        >
            {renderView}
        </StyledIndex>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): IndexStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateIndexView: selectors.view.getIndexView(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): IndexDispatchProperties => ({
});


const ConnectedIndex =connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Index);
// #endregion module



// #region exports
export default ConnectedIndex;
// #endregion exports
