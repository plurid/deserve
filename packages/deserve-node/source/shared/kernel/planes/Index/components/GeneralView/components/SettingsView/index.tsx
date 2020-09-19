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
        PluridDropdown,
    } from '@plurid/plurid-ui-react';
    // #endregion libraries


    // #region external
    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledSettingsView,
        StyledPluridFormLeftRight,
        StyledPluridTextline,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface SettingsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface SettingsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface SettingsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    // dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type SettingsViewProperties = SettingsViewOwnProperties
    & SettingsViewStateProperties
    & SettingsViewDispatchProperties;

const SettingsView: React.FC<SettingsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        // stateSettings,
        // #endregion state

        // #region dispatch
        dispatch,
        // dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    return (
        <StyledSettingsView>
            <StyledPluridFormLeftRight>
                <div>
                    data storage size
                </div>

                <div>
                    <StyledPluridTextline
                        text="100"
                        placeholder="size"
                        atChange={() => {}}
                        level={2}
                        style={{
                            textAlign: 'right',
                        }}
                    />

                    GB
                </div>
            </StyledPluridFormLeftRight>


            <StyledPluridFormLeftRight>
                <div>
                    records storage size
                </div>

                <div>
                    <StyledPluridTextline
                        text="10"
                        placeholder="size"
                        atChange={() => {}}
                        level={2}
                        style={{
                            textAlign: 'right',
                        }}
                    />

                    GB
                </div>
            </StyledPluridFormLeftRight>


            <StyledPluridFormLeftRight>
                <div>
                    data obliteration policy
                </div>

                <PluridDropdown
                    selected={'never'}
                    selectables={[
                        'never',
                        '30 days',
                        '90 days',
                        '180 days',
                    ]}
                    atSelect={() => {}}
                    style={{
                        fontSize: '1rem',
                    }}
                    width={120}
                />
            </StyledPluridFormLeftRight>


            <StyledPluridFormLeftRight>
                <div>
                    records obliteration policy
                </div>

                <PluridDropdown
                    selected={'never'}
                    selectables={[
                        'never',
                        '30 days',
                        '90 days',
                        '180 days',
                    ]}
                    atSelect={() => {}}
                    style={{
                        fontSize: '1rem',
                    }}
                    width={120}
                />
            </StyledPluridFormLeftRight>
        </StyledSettingsView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): SettingsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SettingsViewDispatchProperties => ({
    dispatch,
    // dispatchRemoveEntity: (
    //     payload,
    // ) => dispatch (
    //     actions.data.removeEntity(payload),
    // ),
});


const ConnectedSettingsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(SettingsView);
// #endregion module



// #region exports
export default ConnectedSettingsView;
// #endregion exports
