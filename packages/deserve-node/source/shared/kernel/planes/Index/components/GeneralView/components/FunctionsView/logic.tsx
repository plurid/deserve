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
        PluridIconCopy,
        PluridIconInfo,
    } from '@plurid/plurid-icons-react';

    import {
        clipboard,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        ClientCore,
    } from '~server/data/interfaces';

    import {
        PluridSwitch,
    } from '~kernel-services/styled';

    import {
        cleanDomainName,
    } from '~kernel-services/utilities';
    // #endregion external
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

    const functionRoute = `/function/${encodeURIComponent(coreID)}/${encodeURIComponent(id)}`;

    return (
        <>
            <div>
                {name}
            </div>

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
