// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconCopy,
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';

    import {
        PluridSwitch,
    } from '@plurid/plurid-ui-react';

    import {
        clipboard,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
    } from '#server/data/interfaces';

    import {
        cleanDomainName,
    } from '#kernel-services/utilities';
    // #endregion external
// #endregion imports



// #region module
export const coreRowRenderer = (
    core: ClientCore,
    handleCoreActivate: (
        id: string,
        active: boolean,
    ) => void,
    handleCoreObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        link,
        register,
        identonym,
        active,
    } = core;

    return (
        <>
            <div>
                <PluridIconCopy
                    atClick={() => {
                        clipboard.copy(
                            link,
                        );
                    }}
                    style={{
                        marginRight: '0.5rem',
                    }}
                />

                {cleanDomainName(link)}
            </div>

            <div>
                {cleanDomainName(register)}
            </div>

            <div>
                {identonym}
            </div>

            <PluridSwitch
                checked={active}
                atChange={() => {
                    handleCoreActivate(
                        id,
                        active,
                    );
                }}
                level={2}
                exclusive={true}
            />

            <PluridIconDelete
                atClick={() => handleCoreObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    cores: ClientCore[],
) => {
    const searchTerms = cores.map(
        core => {
            const {
                id,
                link,
                register,
                identonym,
            } = core;

            const searchTerm = {
                id,
                data: [
                    link.toLowerCase(),
                    register.toLowerCase(),
                    identonym.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
