// #region imports
    // #region libraries
    import {
        Request
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export interface Context {
}


export interface DeserveLogic {
}


export type DeserveRequest = Request;




export interface DeserveEntity {
    type: 'file' | 'field';
    id: string;
}





// #endregion module
