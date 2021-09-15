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
        DESERVE_CLIENT_PROTOCOL,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region exports
export const resolveOrigin = (
    identonym: string,
    options?: DeserveClientOptions,
) => {
    const host = options?.host || DESERVE_CLIENT_HOST;
    const clientURI = options?.origin
        ? options.origin
        : DESERVE_CLIENT_PROTOCOL + identonym + host;

    if (
        !host
        && !options?.origin
    ) {
        return;
    }

    const url = new URL(clientURI);
    return url.origin;
}
// #endregion exports
