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
        PluridIconObliterate,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
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
        StyledObliterateContainer,
        StyledObliterateText,
        StyledObliterateButtons,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export const blobRowRenderer = (
    blob: any,
    toggleObliterate: (
        type: 'BLOBS',
        id: string,
    ) => void,
    theme: Theme,
) => {
    const {
        id,
        storedAt,
        mimetype,
        size,
        metadata,
    } = blob;

    return (
        <>
            <div>
                {id}
            </div>

            <div>
                {storedAt}
            </div>

            <div>
                {mimetype}
            </div>

            <div>
                {size}
            </div>

            <div>
                {metadata}
            </div>

            <PluridIconObliterate
                atClick={() => {
                    toggleObliterate(
                        'BLOBS',
                        id,
                    );
                }}
                theme={theme}
            />
        </>
    );
}


export const keyRowRenderer = (
    key: any,
    toggleObliterate: (
        type: 'KEYS',
        id: string,
    ) => void,
    theme: Theme,
) => {
    const {
        id,
        value,
        storedAt,
        updatedAt,
        sha,
    } = key;

    return (
        <>
            <div>
                {id}
            </div>

            <div>
                {storedAt}
            </div>

            <div>
                {updatedAt}
            </div>

            <div>
                {value}
            </div>

            <PluridIconObliterate
                atClick={() => {
                    toggleObliterate(
                        'KEYS',
                        id,
                    );
                }}
                theme={theme}
            />
        </>
    );
}


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
    ] = useState<'BLOBS' | 'KEYS'>('BLOBS');

    const [
        activeCore,
        setActiveCore,
    ] = useState(core);

    const [
        blobs,
        setBlobs,
    ] = useState(stateBlobs[activeCore.id] || []);

    const [
        keys,
        setKeys,
    ] = useState(stateKeys[activeCore.id] || []);

    const [
        obliterateID,
        setObliterateID,
    ] = useState('');

    const [
        obliterateType,
        setObliterateType,
    ] = useState('');
    // #endregion state


    // #region handlers
    const query = async (
        type: 'BLOBS' | 'KEYS',
    ) => {
        if (type === 'BLOBS') {
            const request = await graphqlClient.query({
                query: QUERY_BLOBS,
                variables: {
                    input: {
                        coreID: activeCore.id,
                        filter: '{}',
                    },
                },
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
        });

        return request.data.queryKeys;
    }

    const toggleObliterate = (
        type: 'BLOBS' | 'KEYS',
        id: string,
    ) => {
        setObliterateType(type);
        setObliterateID(id);
    }

    const handleObliterate = () => {
        if (
            !obliterateID
            || !obliterateType
        ) {
            return;
        }

        // send obliterate request

        // remove from local state

        setObliterateType('');
        setObliterateID('');
    }
    // #endregion handlers


    // #region state
    const [
        filteredRows,
        setFilteredRows,
    ] = useState(
        blobs.map(
            blob => blobRowRenderer(
                blob,
                toggleObliterate,
                stateGeneralTheme,
            ),
        ),
    );
    // #endregion state


    // #region effects
    useEffect(() => {
        const load = async () => {
            const result = await query(dataView);

            if (dataView === 'BLOBS') {
                const newBlobs = [
                    ... new Set([
                        ...blobs,
                        ...(result.data || []),
                    ]),
                ];
                setBlobs(newBlobs);
                setFilteredRows(
                    newBlobs.map(
                        blob => blobRowRenderer(
                            blob,
                            toggleObliterate,
                            stateGeneralTheme,
                        ),
                    ),
                );
                return;
            }

            const newKeys = [
                ... new Set([
                    ...keys,
                    ...(result.data || []),
                ]),
            ];
            setKeys(newKeys);
            setFilteredRows(
                newKeys.map(
                    key => keyRowRenderer(
                        key,
                        toggleObliterate,
                        stateGeneralTheme,
                    ),
                ),
            );
        }

        load();
    }, [
        dataView,
    ]);
    // #endregion effects


    // #region render
    const blobsHeader = (
        <>
            <div>
                sha
            </div>

            <div>
                stored at
            </div>

            <div>
                type
            </div>

            <div>
                size
            </div>

            <div>
                metadata
            </div>

            <div>
                obliterate
            </div>
        </>
    );

    const keysHeader = (
        <>
            <div>
                id
            </div>

            <div>
                stored at
            </div>

            <div>
                updated at
            </div>

            <div>
                value
            </div>

            <div>
                obliterate
            </div>
        </>
    );

    if (obliterateID && obliterateType) {
        const type = obliterateType === 'BLOBS'
            ? 'blob'
            : 'key';

        return (
            <StyledObliterateContainer>
                <StyledObliterateText>
                    obliterate {type} {obliterateID}?
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

                    rowTemplate={dataView === 'BLOBS'
                        ? '1fr 1fr 1fr 1fr 1fr 100px'
                        : '1fr 1fr 1fr 1fr 100px'
                    }
                    rowsHeader={dataView === 'BLOBS'
                        ? blobsHeader
                        : keysHeader
                    }
                    rows={filteredRows}
                    noRows={dataView === 'BLOBS'
                        ? 'no blobs'
                        : 'no keys'
                    }

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
