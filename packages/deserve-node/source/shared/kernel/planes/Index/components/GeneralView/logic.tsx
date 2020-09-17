// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconSpace,

        PluridIconArrowRight,
        PluridIconDocuments,
        PluridIconExternalLink,
        PluridIconExit,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import deserveLogo from '../../assets/deserve-logo.png';
    // #endregion external


    // #region internal
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
];

export const generalSelectorsIcons = {
    cores: PluridIconSpace,
};


export const renderSelectedView = (
    stateIndexGeneralSelector: any,
    setGeneralView: any,
) => {
    switch (stateIndexGeneralSelector) {
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
    stateViewOwnerID: any,
    openManual: any,
    logout: any,
    mouseOverSelectors: any,
    setMouseOverSelectors: any,
    setCompactSelectors: any,
    selectedView: any,
    setSelectedView: any,
    setGeneralView: any,
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
                                                    logout ({stateViewOwnerID})
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
        default:
            return (
                <></>
            );
    }
}
// #endregion module
