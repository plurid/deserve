// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        COOKIE_OWNER_TOKEN,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
const tradeTokenForOwner = async (
    request: Request,
) => {
    const cookiesToken: string | undefined = request.cookies[COOKIE_OWNER_TOKEN];

    return {
        id: '',
    };
}
// #endregion module



// #region exports
export {
    tradeTokenForOwner,
};
// #endregion exports
