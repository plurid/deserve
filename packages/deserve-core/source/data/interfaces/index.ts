// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export type DeserveRequest = Request & {
    deserveCoreLogic: DeserveCoreLogic;
}


export interface DeserveCoreLogic {
    verifyToken: (
        /**
         * The `coreID` is set at the `deserve core` startup.
         */
        coreID: string,

        /**
         * The `token` is received from the `deserve router`.
         */
        token: string,
    ) => Promise<boolean>;
}
// #endregion module
