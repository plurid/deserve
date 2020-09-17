// #region imports
    // #region libraries
    import React, {
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        PluridComponent,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import client from '#kernel-services/graphql/client';
    import {
        GET_CURRENT_OWNER,
    } from '#kernel-services/graphql/query';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        GlobalStyle,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ShellOwnProperties {
}

export interface ShellStateProperties {
}

export interface ShellDispatchProperties {
    dispatchSetViewLoading: typeof actions.view.setViewLoading;
    dispatchSetViewType: typeof actions.view.setViewType;
    dispatchSetViewOwnerID: typeof actions.view.setViewOwnerID;
}

export type ShellProperties = ShellOwnProperties
    & ShellStateProperties
    & ShellDispatchProperties;

const Shell: React.FC<ShellProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            children,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region dispatch
        dispatchSetViewLoading,
        dispatchSetViewType,
        dispatchSetViewOwnerID,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        try {
            const loadOwner = async () => {
                const query = await client.query({
                    query: GET_CURRENT_OWNER,
                });

                const response = query.data.getCurrentOwner;

                dispatchSetViewLoading(false);

                if (!response.status) {
                    dispatchSetViewType({
                        type: 'indexView',
                        value: 'login',
                    });
                    return;
                }

                const owner = response.data;

                dispatchSetViewType({
                    type: 'indexView',
                    value: 'general',
                });
            }

            loadOwner();
            return;
        } catch (error) {
            return;
        }
    }, []);
    // #endregion effects


    // #region render
    return (
        <>
            <GlobalStyle />

            {children}
        </>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ShellStateProperties => ({
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ShellDispatchProperties => ({
    dispatchSetViewLoading: (
        loading,
    ) => dispatch(
        actions.view.setViewLoading(loading),
    ),
    dispatchSetViewType: (
        view,
    ) => dispatch(
        actions.view.setViewType(view),
    ),
    dispatchSetViewOwnerID: (
        owner,
    ) => dispatch(
        actions.view.setViewOwnerID(owner),
    ),
});


const ConnectedShell = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Shell);


const shell: PluridComponent = {
    kind: 'react',
    element: ConnectedShell,
};
// #endregion module



// #region exports
export default shell;
// #endregion exports
