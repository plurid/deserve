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

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';
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
        StyledExecutions,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ExecutionsOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface ExecutionsStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    // stateExecutions: Record<string, any[] | undefined>;
}

export interface ExecutionsDispatchProperties {
}

export type ExecutionsProperties =
    & ExecutionsOwnProperties
    & ExecutionsStateProperties
    & ExecutionsDispatchProperties;


const Executions: React.FC<ExecutionsProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        // stateExecutions,
        // #endregion state
    } = properties;

    const {
        parameters,
    } = plurid.plane;

    const coreID = decodeURIComponent(parameters.core || '');
    const functionID = decodeURIComponent(parameters.function || '');
    // #endregion properties


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        [],
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
                executed at
            </div>

            <div />
        </>
    );

    return (
        <StyledExecutions
            theme={stateGeneralTheme}
        >
            <EntityView
                generalTheme={stateGeneralTheme}
                interactionTheme={stateInteractionTheme}

                rowTemplate="auto 30px"
                rowsHeader={rowsHeader}
                rows={filteredRows}
                noRows="no executions"

                filterUpdate={filterUpdate}
                refresh={() => {
                }}
            />
        </StyledExecutions>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ExecutionsStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    // stateExecutions: selectors.data.getExecutions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ExecutionsDispatchProperties => ({
});


const ConnectedExecutions = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Executions);
// #endregion module



// #region exports
export default ConnectedExecutions;
// #endregion exports
