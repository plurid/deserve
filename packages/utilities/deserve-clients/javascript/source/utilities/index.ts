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
    return resolveExpirationString(header);
}


export const resolveExpirationString = (
    value: string | undefined | null,
) => {
    if (!value) {
        return;
    }

    const integer = parseInt(value);
    if (integer) {
        return integer;
    }

    const split = value.split(';');
    if (split.length === 0) {
        return;
    }

    const expirations: Record<string, number> = {};

    for (const value of split) {
        const valueSplit = value.split(':');
        if (valueSplit.length !== 2) {
            continue;
        }

        const idValue = valueSplit[0];
        const expirationValue = valueSplit[1];
        if (!idValue || !expirationValue) {
            continue;
        }

        const id = idValue.trim();
        const expiration = parseInt(expirationValue);

        if (
            id
            && typeof expiration === 'number' && !isNaN(expiration)
        ) {
            expirations[id] = expiration;
        }
    }

    return expirations;
}
// #endregion exports
