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
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledExecution,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ExecutionOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface ExecutionStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateExecutions: Record<string, any[] | undefined>;
}

export interface ExecutionDispatchProperties {
}

export type ExecutionProperties =
    & ExecutionOwnProperties
    & ExecutionStateProperties
    & ExecutionDispatchProperties;


const Execution: React.FC<ExecutionProperties> = (
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
        stateExecutions,
        // #endregion state
    } = properties;

    const {
        parameters,
    } = plurid.plane;

    const coreID = decodeURIComponent(parameters.core || '');
    const functionID = decodeURIComponent(parameters.function || '');
    const executionID = decodeURIComponent(parameters.id || '');

    const coreStateExecutions = stateExecutions[coreID] || [];
    const functionExecution = coreStateExecutions
        .find(coreStateExecution => {
            if (
                coreStateExecution.id === executionID
                && coreStateExecution.functionID === functionID
            ) {
                return true;
            }

            return false;
        });

    if (!functionExecution) {
        return (
            <StyledExecution
                theme={stateGeneralTheme}
            >
                execution not found
            </StyledExecution>
        );
    }

    const {
        result,
        arguments: args,
        error,
        startedAt,
        finishedAt,
    } = functionExecution;

    const duration = finishedAt - startedAt;
    const lessThan = duration <= 1 ? '<' : '';
    // #endregion properties


    // #region render
    return (
        <StyledExecution
            theme={stateGeneralTheme}
        >
            <div>
                <div>
                    executed at
                </div>

                <div>
                    {new Date(startedAt).toLocaleString()}
                </div>
            </div>

            <div>
                <div>
                    duration
                </div>

                <div>
                    {lessThan}{duration} ms
                </div>
            </div>

            <div>
                <div>
                    arguments
                </div>

                <div>
                    {args}
                </div>
            </div>

            <div>
                <div>
                    result
                </div>

                <div>
                    {result}
                </div>
            </div>

            <div>
                <div>
                    error
                </div>

                <div>
                    {error}
                </div>
            </div>
        </StyledExecution>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ExecutionStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateExecutions: selectors.data.getExecutions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ExecutionDispatchProperties => ({
});


const ConnectedExecution = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Execution);
// #endregion module



// #region exports
export default ConnectedExecution;
// #endregion exports
