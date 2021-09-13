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

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import EntityView from '~kernel-components/EntityView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import client from '~kernel-services/graphql/client';
    import {
        GET_EXECUTIONS,
    } from '~kernel-services/graphql/query';
    // #endregion external


    // #region internal
    import {
        StyledExecutions,
    } from './styled';

    import {
        executionRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface ExecutionsOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface ExecutionsStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateExecutions: Record<string, any[] | undefined>;
}

export interface ExecutionsDispatchProperties {
    dispatchPushData: typeof actions.data.pushData;
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
        stateExecutions,
        // #endregion state

        // #region dispatch
        dispatchPushData,
        // #endregion dispatch
    } = properties;

    const {
        parameters,
    } = plurid.plane;

    const coreID = decodeURIComponent(parameters.core || '');
    const functionID = decodeURIComponent(parameters.function || '');

    const coreStateExecutions = stateExecutions[coreID] || [];
    const functionExecutions = coreStateExecutions.filter(coreStateExecution=> coreStateExecution.functionID === functionID);
    // #endregion properties


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        functionExecutions.map(
            fn => executionRowRenderer(
                fn,
                stateGeneralTheme,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const load = async () => {
            try {
                const query = await client.query({
                    query: GET_EXECUTIONS,
                    variables: {
                        input: {
                            functionID,
                        },
                    },
                });
                console.log('query', query);

                const request = query.data.getExecutions;
                if (!request.status) {
                    return;
                }

                const data = graphql.deleteTypenames(request.data);
                if (data.length > 0) {
                    dispatchPushData({
                        type: 'executions',
                        coreID: data[0].coreID,
                        data,
                    });
                }
            } catch (error) {
                return;
            }
        }

        load();
    }, []);

    useEffect(() => {
        const coreStateExecutions = stateExecutions[coreID] || [];
        const functionExecutions = coreStateExecutions.filter(coreStateExecution=> coreStateExecution.functionID === functionID);

        setFilteredRows(
            functionExecutions.map(
                fn => executionRowRenderer(
                    fn,
                    stateGeneralTheme,
                ),
            ),
        );
    }, [
        coreStateExecutions.length,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                executed at
            </div>

            <div>
                duration
            </div>

            <div>
                arguments
            </div>

            <div>
                result
            </div>

            <div>
                error
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

                rowTemplate="1fr 1fr 1fr 1fr 1fr 30px"
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
    stateExecutions: selectors.data.getExecutions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ExecutionsDispatchProperties => ({
    dispatchPushData: (
        payload,
    ) => dispatch(
        actions.data.pushData(payload),
    ),
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
