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
        GET_FUNCTIONS,
    } from '~kernel-services/graphql/query';
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
    stateFunctions: any[];
}

export interface FunctionsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
    dispatchAddEntity: typeof actions.data.addEntity;
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
        stateFunctions,
        // #endregion state

        // #region dispatch
        dispatchAddEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        stateFunctions.map(
            fn => functionRowRenderer(
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
                    query: GET_FUNCTIONS,
                    variables: {
                        input: {},
                    },
                });

                const request = query.data.getFunctions;
                if (!request.status) {
                    return;
                }

                for (const data of graphql.deleteTypenames(request.data)) {
                    dispatchAddEntity({
                        type: 'function',
                        data: {
                            ...data,
                        },
                    });
                }
            } catch (error) {
                return;
            }
        }

        load();
    }, []);

    useEffect(() => {
        setFilteredRows(
            stateFunctions.map(
                fn => functionRowRenderer(
                    fn,
                    stateGeneralTheme,
                ),
            ),
        );
    }, [
        stateFunctions.length,
    ])
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
    stateFunctions: selectors.data.getFunctions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): FunctionsViewDispatchProperties => ({
    dispatch,
    dispatchAddEntity: (
        payload,
    ) => dispatch(
        actions.data.addEntity(payload),
    ),
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
