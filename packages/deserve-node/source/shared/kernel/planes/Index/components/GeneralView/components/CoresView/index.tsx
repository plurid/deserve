// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '#server/utilities/general';

    import {
        ClientCore,
    } from '#server/data/interfaces';

    import EntityView from '#kernel-components/EntityView';

    import client from '#kernel-services/graphql/client';

    import {
        DEREGISTER_CORE,
        ACTIVATE_CORE,
        DEACTIVATE_CORE,
    } from '#kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '#kernel-services/logic/queries';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        coreRowRenderer,
        createSearchTerms,
    } from './logic';
import e from 'express';
    // #endregion internal
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

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface CoresViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateCores: ClientCore[];
}

export interface CoresViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
    dispatchActivateCore: typeof actions.data.activateCore;
}

export type CoresViewProperties = CoresViewOwnProperties
    & CoresViewStateProperties
    & CoresViewDispatchProperties;

const CoresView: React.FC<CoresViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateCores,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        dispatchActivateCore,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleCoreActivate = async (
        id: string,
        active: boolean,
    ) => {
        try {
            const input = {
                value: id,
            };

            const mutation = active
                ? DEACTIVATE_CORE
                : ACTIVATE_CORE;

            dispatchActivateCore({
                id,
                value: !active,
            });

            await client.mutate({
                mutation,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }

    const handleCoreObliterate = async (
        id: string,
    ) => {
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


    // #region state
    const [
        searchTerms,
        setSearchTerms,
    ] = useState(
        createSearchTerms(stateCores),
    );

    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        stateCores.map(
            core => coreRowRenderer(
                core,
                handleCoreActivate,
                handleCoreObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredCores = stateCores.filter(stateCore => {
            if (filterIDs.includes(stateCore.id)) {
                return true;
            }

            return false;
        });

        const sortedCores = filteredCores.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedCores.map(
                core => coreRowRenderer(
                    core,
                    handleCoreActivate,
                    handleCoreObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateCores,
        );
        const filteredRows = stateCores.map(
            core => coreRowRenderer(
                core,
                handleCoreActivate,
                handleCoreObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateCores,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                link
            </div>

            <div>
                register
            </div>

            <div>
                identonym
            </div>

            <div>
                active
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 2fr 1fr 80px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no cores"

            actionButtonText="Register Core"
            actionButtonClick={() => {
                setGeneralView('register-core');
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                getCurrentOwner(dispatch);
            }}
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
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
    dispatchActivateCore: (
        payload,
    ) => dispatch (
        actions.data.activateCore(payload),
    ),
});


const ConnectedCoresView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(CoresView);
// #endregion module



// #region exports
export default ConnectedCoresView;
// #endregion exports
