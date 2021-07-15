// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
    } from '~server/data/interfaces';

    import EntityView from '../EntityView';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledCoreDataView,
        StyledName,
        StyledDataSelect,
        StyledDataSelectItem,
        StyledData,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface CoreDataViewOwnProperties {
    core: ClientCore;
}

export interface CoreDataViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateBlobs: Record<string, any[] | undefined>;
    stateKeys: Record<string, any[] | undefined>;
}

export interface CoreDataViewDispatchProperties {
}

export type CoreDataViewProperties =
    & CoreDataViewOwnProperties
    & CoreDataViewStateProperties
    & CoreDataViewDispatchProperties;


const CoreDataView: React.FC<CoreDataViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        core,
        // #endregion own

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateBlobs,
        stateKeys,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        dataView,
        setDataView,
    ] = useState('BLOBS');

    const [
        blobs,
        setBlobs,
    ] = useState(stateBlobs[core.id] || []);

    const [
        keys,
        setKeys,
    ] = useState(stateKeys[core.id] || []);
    // #endregion state


    // #region render
    const rowsHeader = (
        <>
        </>
    );

    return (
        <StyledCoreDataView
            theme={stateGeneralTheme}
        >
            <StyledName>
                name
            </StyledName>

            <StyledDataSelect>
                <StyledDataSelectItem
                    theme={stateGeneralTheme}
                    active={dataView === 'BLOBS'}
                    onClick={() => {
                        setDataView('BLOBS');
                    }}
                >
                    blobs
                </StyledDataSelectItem>

                <StyledDataSelectItem
                    theme={stateGeneralTheme}
                    active={dataView === 'KEYS'}
                    onClick={() => {
                        setDataView('KEYS');
                    }}
                >
                    keys
                </StyledDataSelectItem>
            </StyledDataSelect>

            <StyledData>
                <EntityView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateInteractionTheme}

                    rowTemplate="1fr"
                    rowsHeader={rowsHeader}
                    rows={[]}
                    noRows="no blobs"

                    filterUpdate={() => {}}
                    refresh={() => {}}
                />
            </StyledData>
        </StyledCoreDataView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): CoreDataViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateBlobs: selectors.data.getBlobs(state),
    stateKeys: selectors.data.getKeys(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): CoreDataViewDispatchProperties => ({
});


const ConnectedCoreDataView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(CoreDataView);
// #endregion module



// #region exports
export default ConnectedCoreDataView;
// #endregion exports
