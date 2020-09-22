// #region imports
    // #region libraries
    import {
        Request,
        Response as ExpressResponse,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export type DeserveRequest = Request & {
    deserveLogic: DeserveRouterLogic;
}


export interface InputIdentonymKey {
    identonym: string,
    key: string,
}


export interface CoreTokenData {
    core: string;
    token: string;
}


export interface Response<T> {
    status: boolean;
    data?: T;
}


export type VerifyIdentonymKey = (
    input: InputIdentonymKey
) => Promise<Response<CoreTokenData>>;


export type HandleGetPath = (
    request: DeserveRequest,
    response: ExpressResponse,
) => Promise<void>;


export interface DeserveRouterLogic {
    verifyIdentonymKey: VerifyIdentonymKey;
    handleGetPath: HandleGetPath;
}
// #endregion module
