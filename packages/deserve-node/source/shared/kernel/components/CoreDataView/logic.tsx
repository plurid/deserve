// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        size as sizeUtility,
        strings,
    } from '@plurid/plurid-functions';

    import {
        PluridLink,
    } from '@plurid/plurid-react';

    import {
        PluridIconInfo,
        PluridIconObliterate,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Blob,
        Key,
    } from '~server/data/interfaces';

    import {
        PluridCopyableLine,
    } from '~kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledInlineItem,
    } from './styled';

    import {
        dataViewing,
    } from './data';
    // #endregion internal
// #endregion imports



// #region module
export const blobRowRenderer = (
    blob: Blob,
    coreID: string,
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

    const linkRoute = `/blob/${coreID}/${id.replace('/', '-')}`;

    return (
        <>
            <PluridCopyableLine
                data={id}
                viewData={strings.trimMiddle(id)}
            />

            <div>
                {new Date(storedAt).toLocaleString()}
            </div>

            <div>
                {mimetype}
            </div>

            <div>
                {sizeUtility.humanFormat(size)}
            </div>

            <StyledInlineItem>
                <PluridLink
                    route={linkRoute}
                    devisible={true}
                >
                    <PluridIconInfo
                        theme={theme}
                    />
                </PluridLink>

                <pre>
                    {metadata}
                </pre>
            </StyledInlineItem>

            <PluridIconObliterate
                atClick={() => {
                    toggleObliterate(
                        dataViewing.blobs,
                        id,
                    );
                }}
                theme={theme}
            />
        </>
    );
}


export const keyRowRenderer = (
    key: Key,
    coreID: string,
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
        deleted,
    } = key;

    const linkRoute = `/key/${coreID}/${id.replace('/', '-')}`;

    return (
        <>
            <PluridCopyableLine
                data={id}
                viewData={strings.trimMiddle(id)}
            />

            <div>
                {new Date(storedAt).toLocaleString()}
            </div>

            <div>
                {updatedAt ? new Date(updatedAt).toLocaleString() : ''}
            </div>

            <StyledInlineItem>
                <PluridLink
                    route={linkRoute}
                    devisible={true}
                >
                    <PluridIconInfo
                        theme={theme}
                    />
                </PluridLink>

                <pre>
                    {value}
                </pre>
            </StyledInlineItem>

            {!deleted && (
                <PluridIconObliterate
                    atClick={() => {
                        toggleObliterate(
                            dataViewing.keys,
                            id,
                        );
                    }}
                    theme={theme}
                />
            )}

            {deleted && (
                <div>
                    deleted
                </div>
            )}
        </>
    );
}
// #endregion module
