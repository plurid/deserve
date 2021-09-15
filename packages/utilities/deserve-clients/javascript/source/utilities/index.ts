// #region imports
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

    return clientURI;
}
// #endregion exports
