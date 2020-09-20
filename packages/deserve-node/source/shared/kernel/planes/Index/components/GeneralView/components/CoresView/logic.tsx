// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';

    import {
        PluridSwitch,
    } from '@plurid/plurid-ui-react';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
    } from '#server/data/interfaces';
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
        domain,
        identonym,
        active,
    } = core;

    return (
        <>
            <div>
                {domain}
            </div>

            <div>
                {domain}
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
                domain,
                identonym,
            } = core;

            const searchTerm = {
                id,
                data: [
                    domain.toLowerCase(),
                    identonym.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
