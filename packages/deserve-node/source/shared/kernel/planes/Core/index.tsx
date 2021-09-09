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

    import client from '~kernel-services/graphql/client';

    import {
        DEREGISTER_CORE,
    } from '~kernel-services/graphql/mutate';

    import {
        StyledPluridPureButton,
    } from '~kernel-services/styled';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
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
    dispatchRemoveEntity: typeof actions.data.removeEntity;
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

        // #region dispatch
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;

    const coreID = plurid.plane.parameters.id;
    const core = stateCores.find(core => core.id === coreID);
    if (!core) {
        return (<></>);
    }

    const {
        id,
        link,
        origins,
    } = core;
    // #endregion properties


    // #region handlers
    const handleCoreObliterate = async () => {
        try {
            dispatchRemoveEntity({
                type: 'core',
                id,
            });

            const input = {
                id,
            };

            await client.mutate({
                mutation: DEREGISTER_CORE,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledCore
            theme={stateGeneralTheme}
        >
            <div>
                core {link}
            </div>

            <div>
                origins
            </div>

            <div>
                add origin
            </div>

            <div>
                data storage size
            </div>

            <div>
                records storage size
            </div>

            <div>
                data obliteration policy
            </div>

            <div>
                records obliteration policy
            </div>

            <div>
                keys update history
            </div>

            <StyledPluridPureButton
                text="Obliterate Core"
                atClick={handleCoreObliterate}
                theme={stateGeneralTheme}
                level={2}
            />
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
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
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
