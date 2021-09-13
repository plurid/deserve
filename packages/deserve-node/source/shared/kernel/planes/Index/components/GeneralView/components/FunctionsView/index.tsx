// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import EntityView from '~kernel-components/EntityView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        functionRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface FunctionsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required
}

export interface FunctionsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    // stateFunctions: ClientFunction[];
}

export interface FunctionsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
}

export type FunctionsViewProperties =
    & FunctionsViewOwnProperties
    & FunctionsViewStateProperties
    & FunctionsViewDispatchProperties;


const FunctionsView: React.FC<FunctionsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        // stateFunctions,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        []
        // stateFunctions.map(
        //     fn => functionRowRenderer(
        //         fn,
        //         stateGeneralTheme,
        //     ),
        // ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
    }
    // #endregion handlers


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
            noRows="no functions"

            filterUpdate={filterUpdate}
            refresh={() => {
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): FunctionsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    // stateFunctions: selectors.data.getFunctions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): FunctionsViewDispatchProperties => ({
    dispatch,
});


const ConnectedFunctionsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(FunctionsView);
// #endregion module



// #region exports
export default ConnectedFunctionsView;
// #endregion exports
