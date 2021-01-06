// #region imports
    // #region external
    import * as Types from '../types';

    import {
        ClientCore,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const addEntity = (
    payload: Types.AddEntityPayload,
): Types.AddEntityAction => {
    return {
        type: Types.ADD_ENTITY,
        payload,
    };
}


export const removeEntity = (
    payload: Types.RemoveEntityPayload,
): Types.RemoveEntityAction => {
    return {
        type: Types.REMOVE_ENTITY,
        payload,
    };
}


export const setCores = (
    providers: ClientCore[],
): Types.SetCoresAction => {
    return {
        type: Types.SET_CORES,
        payload: providers,
    };
}


export const activateCore = (
    payload: Types.ActivateCorePayload,
): Types.ActivateCoreAction => {
    return {
        type: Types.ACTIVATE_CORE,
        payload,
    };
}


export const clearData = (): Types.ClearDataAction => {
    return {
        type: Types.CLEAR_DATA,
        payload: undefined,
    };
}



const actions = {
    addEntity,
    removeEntity,
    setCores,
    activateCore,
    clearData,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
