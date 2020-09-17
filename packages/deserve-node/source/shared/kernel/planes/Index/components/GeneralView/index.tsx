// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';
    // #endregion libraries


    // #region external
    import deserveLogo from '../../assets/deserve-logo.png';

    import client from '#kernel-services/graphql/client';
    import {
        LOGIN,
    } from '#kernel-services/graphql/mutate';

    import {
        StyledPluridTextline,
    } from '#kernel-services/styled';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledGeneralView,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface GeneralViewOwnProperties {
}

export interface GeneralViewStateProperties {
}

export interface GeneralViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
    dispatchSetViewType: typeof actions.view.setViewType;
}

export type GeneralViewProperties = GeneralViewOwnProperties
    & GeneralViewStateProperties
    & GeneralViewDispatchProperties;

const GeneralView: React.FC<GeneralViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region dispatch
        dispatch,
        dispatchSetViewType,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region render
    return (
        <StyledGeneralView>
            <div>
                <img
                    src={deserveLogo}
                    alt="deserve logo"
                    height={250}
                />
            </div>

            <h1>
                deserve
            </h1>
        </StyledGeneralView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): GeneralViewStateProperties => ({
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): GeneralViewDispatchProperties => ({
    dispatch,
    dispatchSetViewType: (
        payload,
    ) => dispatch(
        actions.view.setViewType(payload),
    ),
});


const ConnectedGeneralView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(GeneralView);
// #endregion module



// #region exports
export default ConnectedGeneralView;
// #endregion exports
