// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    // import {
    //     Core,
    // } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const coreRowRenderer = (
    core: any,
    handleProjectObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name
    } = core;

    return (
        <>
            <div>
                {name}
            </div>

            <PluridIconDelete
                atClick={() => handleProjectObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    cores: any[],
) => {
    const searchTerms = cores.map(
        core => {
            const {
                id,
                name
            } = core;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
