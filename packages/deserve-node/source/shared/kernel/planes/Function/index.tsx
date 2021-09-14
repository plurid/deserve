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
    // #endregion libraries


    // #region external
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledFunction,
    } from './styled';

    import Explorer from './components/Explorer';
    import View from './components/View';
    // #endregion internal
// #endregion imports



// #region module
export interface FunctionOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface FunctionStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateFunctions: Record<string, any[] | undefined>;
}

export interface FunctionDispatchProperties {
    dispatchUpdateFunctionData: typeof actions.data.updateFunctionData;
}

export type FunctionProperties =
    & FunctionOwnProperties
    & FunctionStateProperties
    & FunctionDispatchProperties;


const Function: React.FC<FunctionProperties> = (
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
        stateFunctions,
        // #endregion state

        // #region dispatch
        dispatchUpdateFunctionData,
        // #endregion dispatch
    } = properties;

    const coreID = decodeURIComponent(plurid.plane.parameters.core || '');
    const functionID = decodeURIComponent(plurid.plane.parameters.id || '');

    const coreStateFunctions = stateFunctions[coreID] || [];
    const functionData = coreStateFunctions.find(stateFunction => stateFunction.id === functionID);

    if (!functionData) {
        return (
            <StyledFunction
                theme={stateGeneralTheme}
            >
                function not found
            </StyledFunction>
        );
    }

    const {
        text,
        externals,
        database,
        storage,
        language,
    } = functionData;
    // #endregion properties


    // #region state
    const [
        viewText,
        setViewText,
    ] = useState(text);

    const [
        view,
        setView,
    ] = useState('function');
    // #endregion state


    // #region handlers
    const changeView = (
        view: string,
    ) => {
        setView(view);
    }

    const newAddin = () => {

    }


    const updateFunction = (
        text: string,
    ) => {
        dispatchUpdateFunctionData({
            coreID,
            functionID,
            data: {
                text,
            },
        });
    }

    const updateExternals = (
        text: string,
    ) => {
        dispatchUpdateFunctionData({
            coreID,
            functionID,
            data: {
                externals: text,
            },
        });
    }

    const updateDatabase = (
        text: string,
    ) => {
        dispatchUpdateFunctionData({
            coreID,
            functionID,
            data: {
                database: text,
            },
        });
    }

    const updateStorage = (
        text: string,
    ) => {
        dispatchUpdateFunctionData({
            coreID,
            functionID,
            data: {
                storage: text,
            },
        });
    }

    const updateAddin = (
        text: string,
    ) => {

    }

    const handleViewTextChange = (
        value: string,
    ) => {
        switch (view) {
            case 'function':
                updateFunction(value);
                break;
            case 'externals':
                updateExternals(value);
                break;
            case 'database':
                updateDatabase(value);
                break;
            case 'storage':
                updateStorage(value);
                break;
            default:
                updateAddin(value);
                break;
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        switch (view) {
            case 'function':
                setViewText(text);
                break;
            case 'externals':
                setViewText(externals);
                break;
            case 'database':
                setViewText(database);
                break;
            case 'storage':
                setViewText(storage);
                break;
            default:
                // check for addin
                break;
        }
    }, [
        view,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledFunction
            theme={stateGeneralTheme}
        >
            <Explorer
                view={view}
                data={functionData}

                changeView={changeView}
                newAddin={newAddin}
            />

            <View
                view={view}
                text={viewText}
                language={language}

                atChange={handleViewTextChange}
            />
        </StyledFunction>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): FunctionStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateFunctions: selectors.data.getFunctions(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): FunctionDispatchProperties => ({
    dispatchUpdateFunctionData: (
        payload,
    ) => dispatch(
        actions.data.updateFunctionData(payload),
    ),
});


const ConnectedFunction = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Function);
// #endregion module



// #region exports
export default ConnectedFunction;
// #endregion exports
