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
    // } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const dataRowRenderer = (
    data: any,
    handleProjectObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name
    } = data;

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
    datas: any[],
) => {
    const searchTerms = datas.map(
        data => {
            const {
                id,
                name
            } = data;

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
