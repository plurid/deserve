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
    // import {
    //     compareValues,
    // } from '#server/utilities/general';

    // import {
    //     Core,
    // } from '#server/data/interfaces';

    import EntityView from '#kernel-components/EntityView';

    import client from '#kernel-services/graphql/client';

    // import {
    //     getSetup,
    // } from '#kernel-services/logic/queries';

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
    // stateCores: Core[];
}

export interface CoresViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    // dispatchRemoveEntity: typeof actions.data.removeEntity;
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
        // stateCores,
        // #endregion state

        // #region dispatch
        dispatch,
        // dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    const stateCores: any[] = [];


    // #region handlers
    const handleProjectObliterate = async (
        id: string,
    ) => {
        try {
            // dispatchRemoveEntity({
            //     type: 'project',
            //     id,
            // });

            // const input = {
            //     value: id,
            // };

            // await client.mutate({
            //     mutation: OBLITERATE_CORE,
            //     variables: {
            //         input,
            //     },
            // });
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateCores),
    );

    const [filteredRows, setFilteredRows] = useState(
        []
        // stateCores.map(
        //     project => coreRowRenderer(
        //         project,
        //         handleProjectObliterate,
        //     ),
        // ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        // const value = rawValue.toLowerCase();

        // const filterIDs = getFilterIDs(
        //     searchTerms,
        //     value,
        // );

        // const filteredCores = stateCores.filter(stateProject => {
        //     if (filterIDs.includes(stateProject.id)) {
        //         return true;
        //     }

        //     return false;
        // });

        // const sortedCores = filteredCores.sort(
        //     compareValues('name'),
        // );

        // setFilteredRows(
        //     sortedCores.map(
        //         project => coreRowRenderer(
        //             project,
        //             handleProjectObliterate,
        //         ),
        //     ),
        // );
    }
    // #endregion handlers


    // #region effects
    // useEffect(() => {
    //     const searchTerms = createSearchTerms(
    //         stateCores,
    //     );
    //     const filteredRows = stateCores.map(
    //         project => coreRowRenderer(
    //             project,
    //             handleProjectObliterate,
    //         ),
    //     );

    //     setSearchTerms(searchTerms);
    //     setFilteredRows(filteredRows);
    // }, [
    //     stateCores,
    // ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                name
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="auto 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no cores"

            actionButtonText="Register Core"
            actionButtonClick={() => {
                setGeneralView('register-core');
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                // getSetup(dispatch);
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
    // stateCores: selectors.data.getCores(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): CoresViewDispatchProperties => ({
    dispatch,
    // dispatchRemoveEntity: (
    //     payload,
    // ) => dispatch (
    //     actions.data.removeEntity(payload),
    // ),
});


const ConnectedCoresView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(CoresView);
// #endregion module



// #region exports
export default ConnectedCoresView;
// #endregion exports
