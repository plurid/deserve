// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledExplorer,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
const languageExtensions = {
    'go': '.go',
    'javascript': '.js',
    'python': '.py',
    'rust': '.rs',
};

const bottomButtons = [
    'externals',
    'database',
    'storage',
];


export interface ExplorerOwnProperties {
    // #region required
        // #region values
        data: any;
        view: string;
        // #endregion values

        // #region methods
        changeView: (view: string) => void;
        newAddin: () => void;
        // #endregion methods
    // #endregion required
}

export interface ExplorerStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface ExplorerDispatchProperties {
}

export type ExplorerProperties =
    & ExplorerOwnProperties
    & ExplorerStateProperties
    & ExplorerDispatchProperties;


const Explorer: React.FC<ExplorerProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            data,
            view,
            // #endregion values

            // #region methods
            changeView,
            newAddin,
            // #endregion methods
        // #endregion required

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state
    } = properties;

    const {
        name,
        language,
        storedAt,
    } = data;

    const functionName = 'function' + languageExtensions[language];
    // #endregion properties


    // #region render
    return (
        <StyledExplorer
            theme={stateGeneralTheme}
        >
            <div>
                <div>
                    <div>
                        {name}
                    </div>

                    <div>
                        {language}
                    </div>
                </div>

                <div>
                    {new Date(storedAt).toLocaleString()}
                </div>
            </div>

            <div>
                <div
                    onClick={() => changeView('function')}
                >
                    {functionName}
                </div>

                {/* addins map */}

                <div
                    onClick={() => newAddin()}
                >
                    +
                </div>
            </div>

            <div>
                {bottomButtons.map(button => {
                    return (
                        <div
                            key={button + Math.random()}
                            onClick={() => changeView(button)}
                        >
                            {button}
                        </div>
                    );
                })}
            </div>

            <div>
                <div>
                    Update
                </div>

                <div>
                    Obliterate
                </div>
            </div>
        </StyledExplorer>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ExplorerStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ExplorerDispatchProperties => ({
});


const ConnectedExplorer = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Explorer);
// #endregion module



// #region exports
export default ConnectedExplorer;
// #endregion exports
