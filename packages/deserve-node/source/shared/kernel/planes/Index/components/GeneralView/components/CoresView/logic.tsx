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
    handleProjectObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        domain,
        identonym,
    } = core;

    return (
        <>
            <div>
                {domain}
            </div>

            <div>
                {identonym}
            </div>

            <PluridSwitch
                checked={false}
                atChange={() => {}}
                level={2}
                exclusive={true}
            />

            <PluridIconDelete
                atClick={() => handleProjectObliterate(id)}
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
