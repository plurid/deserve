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
export const coreRowRenderer = (
    core: ClientCore,
    handleCoreActivate: (
        id: string,
        active: boolean,
    ) => void,
    theme: Theme,
) => {
    const {
        id,
        link,
        register,
        identonym,
        active,
    } = core;

    const coreRoute = `/core/${id}`;

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

            <PluridLink
                route={coreRoute}
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
