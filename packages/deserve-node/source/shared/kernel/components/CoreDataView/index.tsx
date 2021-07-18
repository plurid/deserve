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
    // #endregion libraries


    // #region external
    import {
        ClientCore,
        Blob,
        Key,
    } from '~server/data/interfaces';

    import EntityView from '../EntityView';

    import {
        PluridPureButton,
        PluridLinkButton,
    } from '~kernel-services/styled';

    import graphqlClient from '~kernel-services/graphql/client';
    import {
        QUERY_BLOBS,
        QUERY_KEYS,
    } from '~kernel-services/graphql/query';
    import {
        DELETE_BLOB,
        DELETE_KEY,
    } from '~kernel-services/graphql/mutate';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledCoreDataView,
        StyledName,
        StyledDataSelect,
        StyledDataSelectItem,
        StyledData,
        StyledObliterateContainer,
        StyledObliterateText,
        StyledObliterateButtons,
    } from './styled';

    import {
        DataView,
        dataViewing,
        blobsHeader,
        keysHeader,
    } from './data';

    import {
        blobRowRenderer,
        keyRowRenderer,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface CoreDataViewOwnProperties {
    core: ClientCore;
}

export interface CoreDataViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateBlobs: Record<string, Blob[] | undefined>;
    stateKeys: Record<string, Key[] | undefined>;
}

export interface CoreDataViewDispatchProperties {
    dispatchPushData: typeof actions.data.pushData;
    dispatchRemoveData: typeof actions.data.removeData;
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

        // #region dispatch
        dispatchPushData,
        dispatchRemoveData,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        dataView,
        setDataView,
    ] = useState<DataView>(dataViewing.blobs);

    const [
        activeCore,
        setActiveCore,
    ] = useState(core);

    const [
        obliterateID,
        setObliterateID,
    ] = useState('');

    const [
        obliterateType,
        setObliterateType,
    ] = useState<DataView | ''>('');
    // #endregion state


    // #region handlers
    const query = async (
        type: DataView,
    ) => {
        if (type === dataViewing.blobs) {
            const request = await graphqlClient.query({
                query: QUERY_BLOBS,
                variables: {
                    input: {
                        coreID: activeCore.id,
                        filter: '{}',
                    },
                },
                fetchPolicy: 'no-cache',
            });

            return request.data.queryBlobs;
        }

        const request = await graphqlClient.query({
            query: QUERY_KEYS,
            variables: {
                input: {
                    coreID: activeCore.id,
                    filter: '{}',
                },
            },
            fetchPolicy: 'no-cache',
        });

        return request.data.queryKeys;
    }

    const toggleObliterate = (
        type: DataView,
        id: string,
    ) => {
        setObliterateType(type);
        setObliterateID(id);
    }

    const handleObliterate = async () => {
        if (
            !obliterateID
            || !obliterateType
        ) {
            return;
        }

        dispatchRemoveData({
            type: obliterateType.toLowerCase() as any,
            coreID: activeCore.id,
            id: obliterateID,
        });


        if (obliterateType === dataViewing.blobs) {
            const filteredBlobs = (stateBlobs[activeCore.id] || []).filter(blob => blob.id !== obliterateID);
            setFilteredRows(
                filteredBlobs.map(
                    blob => blobRowRenderer(
                        blob,
                        activeCore.id,
                        toggleObliterate,
                        stateGeneralTheme,
                    ),
                ),
            );
        } else {
            const filteredKeys = (stateKeys[activeCore.id] || []).filter(key => key.id !== obliterateID);
            setFilteredRows(
                filteredKeys.map(
                    key => keyRowRenderer(
                        key,
                        activeCore.id,
                        toggleObliterate,
                        stateGeneralTheme,
                    ),
                ),
            );
        }


        setObliterateType('');
        setObliterateID('');

        const mutation = obliterateType === dataViewing.blobs
            ? DELETE_BLOB
            : DELETE_KEY;

        await graphqlClient.mutate({
            mutation,
            variables: {
                input: {
                    coreID: activeCore.id,
                    id: obliterateID,
                },
            },
        });
    }

    const loadData = async () => {
        setLoading(true);

        const result = await query(dataView);
        if (result.status) {
            dispatchPushData({
                coreID: activeCore.id,
                data: result.data,
                type: dataView.toLowerCase() as any,
            });
        }

        setLoading(false);
    }
    // #endregion handlers


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        (stateBlobs[activeCore.id] || []).map(
            blob => blobRowRenderer(
                blob,
                activeCore.id,
                toggleObliterate,
                stateGeneralTheme,
            ),
        ),
    );
    // #endregion state


    // #region effects
    useEffect(() => {
        if (dataView === dataViewing.blobs) {
            setFilteredRows(
                (stateBlobs[activeCore.id] || []).map(
                    blob => blobRowRenderer(
                        blob,
                        activeCore.id,
                        toggleObliterate,
                        stateGeneralTheme,
                    ),
                ),
            );
            setLoading(false);
            return;
        }

        setFilteredRows(
            (stateKeys[activeCore.id] || []).map(
                key => keyRowRenderer(
                    key,
                    activeCore.id,
                    toggleObliterate,
                    stateGeneralTheme,
                ),
            ),
        );
        setLoading(false);
    }, [
        dataView,
        JSON.stringify(stateBlobs[activeCore.id]),
        JSON.stringify(stateKeys[activeCore.id]),
    ]);

    useEffect(() => {
        loadData();
    }, [
        dataView,
    ]);
    // #endregion effects


    // #region render
    if (
        obliterateID
        && obliterateType
    ) {
        const type = obliterateType === dataViewing.blobs
            ? 'blob'
            : 'key';

        return (
            <StyledObliterateContainer>
                <StyledObliterateText>
                    <div>
                        obliterate {type}
                    </div>

                    <div>
                        {obliterateID}
                    </div>
                </StyledObliterateText>

                <StyledObliterateButtons>
                    <PluridPureButton
                        text="Obliterate"
                        atClick={handleObliterate}
                        theme={stateGeneralTheme}
                        level={2}
                    />

                    <PluridLinkButton
                        text="cancel"
                        atClick={() => {
                            setObliterateType('');
                            setObliterateID('');
                        }}
                        theme={stateGeneralTheme}
                    />
                </StyledObliterateButtons>
            </StyledObliterateContainer>
        );
    }

    return (
        <StyledCoreDataView
            theme={stateGeneralTheme}
        >
            <StyledName>
                {activeCore.link}
            </StyledName>

            <StyledDataSelect>
                <StyledDataSelectItem
                    theme={stateGeneralTheme}
                    active={dataView === dataViewing.blobs}
                    onClick={() => {
                        if (dataView === dataViewing.blobs) {
                            return;
                        }

                        setLoading(true);
                        setDataView(dataViewing.blobs);
                    }}
                >
                    blobs
                </StyledDataSelectItem>

                <StyledDataSelectItem
                    theme={stateGeneralTheme}
                    active={dataView === dataViewing.keys}
                    onClick={() => {
                        if (dataView === dataViewing.keys) {
                            return;
                        }

                        setLoading(true);
                        setDataView(dataViewing.keys);
                    }}
                >
                    keys
                </StyledDataSelectItem>
            </StyledDataSelect>

            <StyledData>
                <EntityView
                    generalTheme={stateGeneralTheme}
                    interactionTheme={stateInteractionTheme}

                    loading={loading}
                    rowTemplate={dataView === dataViewing.blobs
                        ? '1fr 1fr 1fr 1fr 1fr 100px'
                        : '1fr 1fr 1fr 1fr 100px'
                    }
                    rowsHeader={dataView === dataViewing.blobs
                        ? blobsHeader
                        : keysHeader
                    }
                    rows={filteredRows}
                    noRows={dataView === dataViewing.blobs
                        ? 'no blobs'
                        : 'no keys'
                    }

                    filterUpdate={() => {}}
                    refresh={() => loadData()}
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
    dispatchPushData: (
        payload,
    ) => dispatch(
        actions.data.pushData(payload),
    ),
    dispatchRemoveData: (
        payload,
    ) => dispatch(
        actions.data.removeData(payload),
    ),
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
