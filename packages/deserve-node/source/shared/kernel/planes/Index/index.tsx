// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';
    // #endregion libraries


    // #region external
    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    // import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledIndex,
    } from './styled';

    import RegisterView from './components/RegisterView';
    import LoginView from './components/LoginView';
    // #endregion internal
// #endregion imports



// #region module
export interface IndexOwnProperties {
}

export interface IndexStateProperties {
    // stateIndexView: string;
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
        // stateIndexView,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        view,
        setView,
    ] = useState('register');
    // #endregion state


    // #region render
    let renderView = (<></>);

    switch (view) {
        case 'register':
            renderView = (<RegisterView />);
            break;
        case 'login':
            renderView = (<LoginView />);
            break;
    }

    return (
        <StyledIndex>
            {renderView}
        </StyledIndex>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): IndexStateProperties => ({
    // stateIndexView: selectors.view.getIndexView(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): IndexDispatchProperties => ({
});


const ConnectedIndex =connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Index);
// #endregion module



// #region exports
export default ConnectedIndex;
// #endregion exports
