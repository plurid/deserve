// #region imports
    // #region libraries
    import React, {
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        PluridReactComponent,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        getGlobalData,
        getCurrentOwner,
    } from '~kernel-services/logic/queries';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    // import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        GlobalStyle,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ShellOwnProperties {
    children: React.ReactNode;
}

export interface ShellStateProperties {
}

export interface ShellDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchSetViewLoading: typeof actions.view.setViewLoading;
    dispatchSetViewType: typeof actions.view.setViewType;
}

export type ShellProperties =
    & ShellOwnProperties
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

        // #region dispatch
        dispatch,
        dispatchSetViewLoading,
        dispatchSetViewType,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        try {
            const loadOwner = async () => {
                await getGlobalData(
                    dispatch,
                );


                const ownerSet = await getCurrentOwner(
                    dispatch,
                );

                dispatchSetViewLoading(false);

                if (!ownerSet) {
                    dispatchSetViewType({
                        type: 'indexView',
                        value: 'login',
                    });
                    return;
                }

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
    dispatch,
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
});


const ConnectedShell = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Shell);


const shell: PluridReactComponent = ConnectedShell;
// #endregion module



// #region exports
export default shell;
// #endregion exports
