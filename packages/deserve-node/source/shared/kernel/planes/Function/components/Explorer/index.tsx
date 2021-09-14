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
    import {
        PluridPureButton,
    } from '~kernel-services/styled';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledExplorer,
        StyledLanguage,
        StyledDate,
        StyledButton,
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
        view: string;
        data: any;
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
            view,
            data,
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

                    <StyledLanguage>
                        {language}
                    </StyledLanguage>
                </div>

                <StyledDate>
                    {new Date(storedAt).toLocaleString()}
                </StyledDate>
            </div>

            <div>
                <StyledButton
                    onClick={() => changeView('function')}
                    theme={stateGeneralTheme}
                    selected={view === 'function'}
                >
                    {functionName}
                </StyledButton>

                {/* addins map */}

                <StyledButton
                    onClick={() => newAddin()}
                    theme={stateGeneralTheme}
                >
                    +
                </StyledButton>
            </div>

            <div>
                {bottomButtons.map(button => {
                    return (
                        <StyledButton
                            key={button + Math.random()}
                            onClick={() => changeView(button)}
                            theme={stateGeneralTheme}
                            selected={view === button}
                        >
                            {button}
                        </StyledButton>
                    );
                })}
            </div>

            <div>
                <PluridPureButton
                    text="Update"
                    atClick={() => {}}
                    style={{
                        margin: '0.7rem 0',
                    }}
                />

                <PluridPureButton
                    text="Obliterate"
                    atClick={() => {}}
                    style={{
                        margin: '0.7rem 0',
                    }}
                />
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
