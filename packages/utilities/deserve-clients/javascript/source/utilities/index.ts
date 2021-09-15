// #region imports
    // #region libraries
    import {
        URL
    } from 'url';
    // #endregion libraries


    // #region external
    import {
        DeserveClientOptions,
    } from '~data/interfaces';

    import {
        DESERVE_CLIENT_HOST,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region exports
export const resolveURI = (
    identonym: string,
    options?: DeserveClientOptions,
    origin?: boolean,
) => {
    const host = options?.host || DESERVE_CLIENT_HOST;
    const clientURI = options && options.clientURI
        ? options.clientURI
        : identonym + host;

    if (
        !host
        && !options?.clientURI
    ) {
        return;
    }

    if (origin) {
        const url = new URL(clientURI);
        return url.origin;
    }

    return clientURI;
}
// #endregion exports
