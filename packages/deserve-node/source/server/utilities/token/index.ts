// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';

    import * as jsonWebToken from 'jsonwebtoken';
    // #endregion libraries


    // #region external
    import {
        Owner,
    } from '#server/data/interfaces';

    import {
        COOKIE_OWNER_TOKEN,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
const generateToken = (
    owner: Owner,
    attributes?: any,
): string => {
    return (jsonWebToken as any).sign(
        {
            id: owner.id,
            ...attributes
        },
        process.env.JWT_ENCRYPTION || '',
        {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.JWT_EXPIRATION,
            issuer: process.env.JWT_ISSUER,
        },
    );
}


const setCookieToken = (
    response: Response,
    name: string,
    token: string,
    domain: string,
) => {
    response.cookie(
        name,
        token,
        {
            domain,
            maxAge: 604800000, // in miliseconds, one week: 60 * 60 * 24 * 7 * 1000
            httpOnly: true,
            // secure: environment.production,
            // sameSite: environment.production ? 'none' : 'lax',
        }
    );

    return true;
}


const tradeTokenForOwner = async (
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
            process.env.JWT_ENCRYPTION || '',
        ) as any;

        const ownerID = tokenContent.owner.id;

        return ownerID;
    } catch (error) {
        const tokenContent = jsonWebToken.verify(
            token,
            process.env.JWT_ENCRYPTION || '',
            {
                ignoreExpiration: true,
            },
        ) as any;

        const ownerID = tokenContent.owner.id;

        if (ownerID) {
            // refresh token
        }

        return ownerID;
    }
}
// #endregion module



// #region exports
export {
    generateToken,
    setCookieToken,
    tradeTokenForOwner,
};
// #endregion exports
