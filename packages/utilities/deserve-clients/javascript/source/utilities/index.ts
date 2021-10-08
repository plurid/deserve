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
        DESERVE_CLIENT_ROUTER,
        DESERVE_CLIENT_PROTOCOL,
        DESERVE_CLIENT_HOST,

        HEADER_DESERVE_EXPIRATION,

        ONE_DAY,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region exports
export const resolveOrigin = (
    identonym: string,
    options?: DeserveClientOptions,
) => {
    const router = options?.router || DESERVE_CLIENT_ROUTER;
    const clientURI = options?.origin
        ? options.origin
        : DESERVE_CLIENT_PROTOCOL + identonym + router;

    if (
        !router
        && !options?.origin
    ) {
        return;
    }

    const url = new URL(clientURI);
    return url.origin;
}


export const resolveHost = (
    clientOrigin: string | undefined,
    options?: DeserveClientOptions,
) => {
    if (options?.host) {
        return options.host;
    }

    if (DESERVE_CLIENT_HOST) {
        return DESERVE_CLIENT_HOST;
    }

    if (!clientOrigin) {
        return '';
    }

    const url = new URL(clientOrigin);
    return url.host;
}


export const checkExpired = (
    now: number,
    value: number,
) => {
    if (now > value) {
        return true;
    }

    return false;
}



export const resolveExpiration = (
    response: Response,
) => {
    const header = response.headers.get(HEADER_DESERVE_EXPIRATION);
    if (!header) {
        return ONE_DAY;
    }

    const expiration = parseInt(header) || ONE_DAY;

    return expiration;
}
// #endregion exports
