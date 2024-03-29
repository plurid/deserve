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


export const pushData = (
    payload: Types.PushDataPayload,
): Types.PushDataAction => {
    return {
        type: Types.PUSH_DATA,
        payload,
    };
}


export const removeData = (
    payload: Types.RemoveDataPayload,
): Types.RemoveDataAction => {
    return {
        type: Types.REMOVE_DATA,
        payload,
    };
}


export const updateFunctionData = (
    payload: Types.UpdateFunctionDataPayload,
): Types.UpdateFunctionDataAction => {
    return {
        type: Types.UPDATE_FUNCTION_DATA,
        payload,
    };
}



const actions = {
    addEntity,
    removeEntity,
    setCores,
    activateCore,
    clearData,
    pushData,
    removeData,
    updateFunctionData,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
