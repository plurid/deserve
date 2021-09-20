// #region imports
    // #region libraries
    import {
        URL,
    } from 'url';

    import {
        Request,
        Response,
    } from 'express';

    import * as jsonWebToken from 'jsonwebtoken';
    // #endregion libraries


    // #region external
    import {
        DatabaseCollections,
        Owner,
        Core,
    } from '~server/data/interfaces';

    import {
        COOKIE_DOMAIN,
        COOKIE_OWNER_TOKEN,
    } from '~server/data/constants';

    import database from '~server/services/database';

    import {
        clientOwner,
    } from '../owner';

    import environment from '../environment';
    // #endregion external
// #endregion imports



// #region module
const generateToken = (
    owner: Owner,
    attributes?: Record<string, any>,
): string => {
    return (jsonWebToken as any).sign(
        {
            id: owner.id,
            ...attributes
        },
        process.env.DESERVE_NODE_JWT_ENCRYPTION || '',
        {
            algorithm: process.env.DESERVE_NODE_JWT_ALGORITHM,
            expiresIn: process.env.DESERVE_NODE_JWT_EXPIRATION,
            issuer: process.env.DESERVE_NODE_JWT_ISSUER,
        },
    );
}


const setCookieToken = (
    response: Response,
    token: string,
    domain?: string,
) => {
    response.cookie(
        COOKIE_OWNER_TOKEN,
        token,
        {
            domain: domain || COOKIE_DOMAIN,
            // in miliseconds, 52 * 604_800_000, 52 x one week, 60 * 60 * 24 * 7 * 1000
            maxAge: 31_449_600_000,
            httpOnly: true,
            secure: environment.production,
            sameSite: environment.production ? 'none' : 'lax',
        },
    );

    return true;
}


const setCookieTokens = (
    response: Response,
    token: string,
    cores: Core[],
) => {
    setCookieToken(
        response,
        token,
    );

    for (const core of cores) {
        const parsedDomain = new URL(core.link);
        const domain = parsedDomain.hostname;

        if (!domain) {
            continue;
        }

        setCookieToken(
            response,
            token,
            domain,
        );
    }
}



const refreshToken = (
    owner: Owner,
    response: Response,
) => {
    const token = generateToken(
        owner,
    );

    setCookieToken(
        response,
        token,
    );
}


const tradeTokenForOwner = async (
    collections: DatabaseCollections,
    request: Request,
    response: Response,
) => {
    const token: string | undefined = request.cookies[COOKIE_OWNER_TOKEN];
    if (!token) {
        return;
    }

    try {
        const tokenContent = jsonWebToken.verify(
            token,
            process.env.DESERVE_NODE_JWT_ENCRYPTION || '',
        ) as any;

        const ownerID = tokenContent.id;

        const owner: any = await database.getById(
            collections.owners,
            ownerID,
        );

        if (!owner) {
            return;
        }

        return await clientOwner(
            collections,
            owner,
        );
    } catch (error) {
        const tokenContent = jsonWebToken.verify(
            token,
            process.env.DESERVE_NODE_JWT_ENCRYPTION || '',
            {
                ignoreExpiration: true,
            },
        ) as any;

        const ownerID = tokenContent.id;

        if (!ownerID) {
            return;
        }

        const owner: any = await database.getById(
            collections.owners,
            ownerID,
        );

        if (!owner) {
            return;
        }

        refreshToken(
            owner,
            response,
        );

        return await clientOwner(
            collections,
            owner,
        );
    }
}
// #endregion module



// #region exports
export {
    generateToken,
    setCookieToken,
    setCookieTokens,
    tradeTokenForOwner,
};
// #endregion exports
