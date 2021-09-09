// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconSpace,
        PluridIconApps,
        PluridIconBrainCircuits,
        PluridIconInfo,
        PluridIconSettings,

        PluridIconArrowRight,
        PluridIconDocuments,
        PluridIconExternalLink,
        PluridIconExit,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import deserveLogo from '../../assets/deserve-logo.png';

    import Core from '~kernel-components/Core';
    // #endregion external


    // #region internal
    import CoresView from './components/CoresView';
    import DataView from './components/DataView';
    import FunctionsView from './components/FunctionsView';
    import RecordsView from './components/RecordsView';
    import SettingsView from './components/SettingsView';

    import {
        StyledGeneralView,
        StyledGeneralSelectors,
        StyledGeneralSelectorItem,
        StyledGeneralPeformer,
        StyledGeneralHelp,
        StyledGeneralHelpItem,
        StyledGeneralSelected,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export const generalSelectors = [
    'cores',
    'data',
    'functions',
    // 'records',
    // 'settings',
];

export const generalSelectorsIcons = {
    cores: PluridIconSpace,
    data: PluridIconApps,
    functions: PluridIconBrainCircuits,
    records: PluridIconInfo,
    settings: PluridIconSettings,
};


export const renderSelectedView = (
    stateIndexGeneralSelector: any,
    setGeneralView: any,
) => {
    switch (stateIndexGeneralSelector) {
        case 'cores':
            return (
                <CoresView
                    setGeneralView={setGeneralView}
                />
            );
        case 'data':
            return (
                <DataView
                    setGeneralView={setGeneralView}
                />
            );
        case 'functions':
            return (
                <FunctionsView
                    setGeneralView={setGeneralView}
                />
            );
        case 'records':
            return (
                <RecordsView
                    setGeneralView={setGeneralView}
                />
            );
        case 'settings':
            return (
                <SettingsView
                    setGeneralView={setGeneralView}
                />
            );
        default:
            return (<></>);
    }
}


export const renderGeneralView = (
    stateGeneralTheme: any,
    stateInteractionTheme: any,
    stateIndexGeneralView: any,
    stateIndexGeneralSelector: any,
    stateViewCompactSelectors: any,
    stateViewOwnerIdentonym: string,
    openManual: any,
    logout: any,
    mouseOverSelectors: any,
    setMouseOverSelectors: any,
    setCompactSelectors: any,
    selectedView: any,
    setSelectedView: any,
    setGeneralView: any,
    dispatchAddEntity: any,
) => {
    switch (stateIndexGeneralView) {
        case 'general':
            return (
                <StyledGeneralView
                    compactSelectors={stateViewCompactSelectors}
                >
                    <StyledGeneralSelectors
                        onMouseEnter={() => setMouseOverSelectors(true)}
                        onMouseLeave={() => setMouseOverSelectors(false)}
                        theme={stateGeneralTheme}
                        compactSelectors={stateViewCompactSelectors}
                        viewUsageType={'private'}
                    >
                        <StyledGeneralPeformer
                            compactSelectors={stateViewCompactSelectors}
                        >
                            {!stateViewCompactSelectors && (
                                <>
                                    <div>
                                        <img
                                            src={deserveLogo}
                                            alt="deserve"
                                            height={30}
                                            onClick={() => setCompactSelectors(true)}
                                        />
                                    </div>

                                    <div>
                                        deserve
                                    </div>
                                </>
                            )}

                            {stateViewCompactSelectors
                            && mouseOverSelectors
                            && (
                                <PluridIconArrowRight
                                    atClick={() => setCompactSelectors(false)}
                                />
                            )}
                        </StyledGeneralPeformer>

                        <ul>
                            {generalSelectors.map(selector => {
                                const Icon = generalSelectorsIcons[selector];

                                return (
                                    <StyledGeneralSelectorItem
                                        key={selector}
                                        onClick={() => setSelectedView(selector)}
                                        theme={stateGeneralTheme}
                                        selected={selector === stateIndexGeneralSelector}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <Icon />

                                        {!stateViewCompactSelectors && (
                                            <div>
                                                {selector}
                                            </div>
                                        )}
                                    </StyledGeneralSelectorItem>
                                );
                            })}
                        </ul>

                        <StyledGeneralHelp>
                            {mouseOverSelectors && (
                                <ul>
                                    <StyledGeneralHelpItem
                                        onClick={() => openManual()}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <PluridIconDocuments />

                                        {!stateViewCompactSelectors && (
                                            <>
                                                <div>
                                                    manual
                                                </div>

                                                <PluridIconExternalLink/>
                                            </>
                                        )}
                                    </StyledGeneralHelpItem>

                                    <StyledGeneralHelpItem
                                        onClick={() => logout()}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <PluridIconExit />

                                        {!stateViewCompactSelectors && (
                                            <>
                                                <div>
                                                    logout ({stateViewOwnerIdentonym})
                                                </div>

                                                <div />
                                            </>
                                        )}
                                    </StyledGeneralHelpItem>
                                </ul>
                            )}
                        </StyledGeneralHelp>
                    </StyledGeneralSelectors>

                    <StyledGeneralSelected>
                        {selectedView}
                    </StyledGeneralSelected>
                </StyledGeneralView>
            );
        case 'register-core':
            return (
                <Core
                    theme={stateInteractionTheme}
                    action={(core) => {
                        dispatchAddEntity({
                            type: 'core',
                            data: core,
                        });

                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        default:
            return (
                <></>
            );
    }
}
// #endregion module
