// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridLink,
    } from '@plurid/plurid-react';

    import {
        PluridIconPlay,
        PluridIconInfo,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries
// #endregion imports



// #region module
export const functionRowRenderer = (
    fn: any,
    theme: Theme,
) => {
    const {
        id,
        coreID,
        name,
    } = fn;

    const encodedCoreID = encodeURIComponent(coreID);
    const encodedID = encodeURIComponent(id);

    const executionsRoute = `/executions/${encodedCoreID}/${encodedID}`;
    const functionRoute = `/function/${encodedCoreID}/${encodedID}`;

    return (
        <>
            <div>
                {name}
            </div>

            <PluridLink
                route={executionsRoute}
                devisible={true}
            >
                <PluridIconPlay
                    theme={theme}
                />
            </PluridLink>

            <PluridLink
                route={functionRoute}
                devisible={true}
            >
                <PluridIconInfo
                    theme={theme}
                />
            </PluridLink>
        </>
    );
}


export const createSearchTerms = (
    functions: any[],
) => {
    const searchTerms = functions.map(
        fn => {
            const {
                id,
                name,
            } = fn;

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
