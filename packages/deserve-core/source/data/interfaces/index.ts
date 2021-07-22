// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export type DeserveRequest = Request & {
    deserveCoreLogic: DeserveCoreLogic;
}


export type VerifyToken = (
    /**
     * The `coreID` is set at the `deserve core` startup.
     */
    coreID: string,

    /**
     * The `token` is received from the `deserve router`.
     */
    token: string,
) => Promise<boolean>;


export type HandleNotFound = (
    request: DeserveRequest,
    response: Response,
) => Promise<void>;


export interface DeserveCoreLogic {
    verifyToken: VerifyToken;
    handleNotFound?: HandleNotFound;
}
// #endregion module
