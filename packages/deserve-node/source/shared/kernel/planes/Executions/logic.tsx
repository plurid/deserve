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
        PluridIconInfo,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries
// #endregion imports



// #region module
export const executionRowRenderer = (
    execution: any,
    theme: Theme,
) => {
    const {
        id,
        coreID,
        result,
        arguments: args,
        error,
        startedAt,
        finishedAt,
    } = execution;

    const encodedCoreID = encodeURIComponent(coreID);
    const encodedID = encodeURIComponent(id);

    const executionRoute = `/execution/${encodedCoreID}/${encodedID}`;

    const duration = finishedAt - startedAt;
    const lessThan = duration <= 1 ? '<' : '';

    return (
        <>
            <div>
                {new Date(startedAt).toLocaleString()}
            </div>

            <div>
                {lessThan}{duration} s
            </div>

            <div>
                {args}
            </div>

            <div>
                {result}
            </div>

            <div>
                {error}
            </div>

            <PluridLink
                route={executionRoute}
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
