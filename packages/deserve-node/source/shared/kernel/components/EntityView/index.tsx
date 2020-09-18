// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridTextline,
        PluridPureButton,
    } from '@plurid/plurid-ui-react';

    import {
        PluridIconReset,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region internal
    import {
        StyledEntityView,
        StyledEntityViewTop,
        StyledTopButtons,
        StyledEntityList,
        StyledEntityListItem,
        StyledActionButton,
        StyledNoRows,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface EntityViewProperties {
    // #region required
        // #region values
        generalTheme: Theme;
        interactionTheme: Theme;

        rowsHeader: JSX.Element;
        rowTemplate: string;
        rows: JSX.Element[];
        noRows: string;

        actionButtonText?: string;
        // #endregion values

        // #region methods
        actionButtonClick?: () => void;
        filterUpdate?: (
            value: any,
        ) => void;
        refresh?: () => void;
        // #endregion methods
    // #endregion required
}

const EntityView: React.FC<EntityViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            generalTheme,
            interactionTheme,

            rowsHeader,
            rowTemplate,
            rows,
            noRows,

            actionButtonText,
            // #endregion values

            // #region methods
            actionButtonClick,
            filterUpdate,
            refresh,
            // #endregion methods
        // #endregion required
    } = properties;
    // #endregion properties


    // #region state
    const [
        searchValue,
        setSearchValue,
    ] = useState('');
    const [
        refreshClicked,
        setRefreshClicked,
    ] = useState(false);
    // #endregion state


    // #region effects
    useEffect(() => {
        if (refreshClicked) {
            setTimeout(() => {
                setRefreshClicked(false);
            }, 1500);
        }
    }, [
        refreshClicked,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledEntityView
            theme={generalTheme}
        >
            <StyledEntityViewTop>
                <div>
                    <PluridTextline
                        text={searchValue}
                        placeholder="filter"
                        atChange={(event) => {
                            const {
                                value,
                            } = event.target;

                            setSearchValue(value);

                            if (filterUpdate) {
                                filterUpdate(value);
                            }
                        }}
                        theme={interactionTheme}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        level={2}
                        style={{
                            width: '300px',
                        }}
                    />
                </div>

                <StyledTopButtons>
                    {refresh && !refreshClicked && (
                        <PluridIconReset
                            atClick={() => {
                                setRefreshClicked(true);
                                refresh();
                            }}
                            theme={generalTheme}
                        />
                    )}
                </StyledTopButtons>
            </StyledEntityViewTop>

            {rows.length === 0 && (
                <StyledNoRows>
                    {noRows}
                </StyledNoRows>
            )}

            {rows.length !== 0 && (
                <StyledEntityList
                    theme={generalTheme}
                >
                    <ul>
                        <StyledEntityListItem
                            rowTemplate={rowTemplate}
                        >
                            {rowsHeader}
                        </StyledEntityListItem>

                        {rows.map(row => {
                            return (
                                <StyledEntityListItem
                                    key={Math.random() + ''}
                                    rowTemplate={rowTemplate}
                                >
                                    {row}
                                </StyledEntityListItem>
                            );
                        })}
                    </ul>
                </StyledEntityList>
            )}

            {actionButtonText && (
                <StyledActionButton>
                    <PluridPureButton
                        text={actionButtonText}
                        atClick={() => actionButtonClick
                            ? actionButtonClick() : undefined
                        }
                        theme={interactionTheme}
                        level={2}
                    />
                </StyledActionButton>
            )}
        </StyledEntityView>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default EntityView;
// #endregion exports
