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
    //     Record,
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
export interface RecordsViewOwnProperties {
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

export interface RecordsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    // stateRecords: Record[];
}

export interface RecordsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    // dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type RecordsViewProperties = RecordsViewOwnProperties
    & RecordsViewStateProperties
    & RecordsViewDispatchProperties;

const RecordsView: React.FC<RecordsViewProperties> = (
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
        // stateRecords,
        // #endregion state

        // #region dispatch
        dispatch,
        // dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    const stateRecords: any[] = [];


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
        createSearchTerms(stateRecords),
    );

    const [filteredRows, setFilteredRows] = useState(
        []
        // stateRecords.map(
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

        // const filteredRecords = stateRecords.filter(stateProject => {
        //     if (filterIDs.includes(stateProject.id)) {
        //         return true;
        //     }

        //     return false;
        // });

        // const sortedRecords = filteredRecords.sort(
        //     compareValues('name'),
        // );

        // setFilteredRows(
        //     sortedRecords.map(
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
    //         stateRecords,
    //     );
    //     const filteredRows = stateRecords.map(
    //         project => coreRowRenderer(
    //             project,
    //             handleProjectObliterate,
    //         ),
    //     );

    //     setSearchTerms(searchTerms);
    //     setFilteredRows(filteredRows);
    // }, [
    //     stateRecords,
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
            noRows="no records"

            // actionButtonText="Register Record"
            // actionButtonClick={() => {
            //     setGeneralView('register-record');
            // }}

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
): RecordsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    // stateRecords: selectors.data.getRecords(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): RecordsViewDispatchProperties => ({
    dispatch,
    // dispatchRemoveEntity: (
    //     payload,
    // ) => dispatch (
    //     actions.data.removeEntity(payload),
    // ),
});


const ConnectedRecordsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(RecordsView);
// #endregion module



// #region exports
export default ConnectedRecordsView;
// #endregion exports
