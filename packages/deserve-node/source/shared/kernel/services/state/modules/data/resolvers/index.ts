// #region imports
    // #region libraries
    import {
        objects,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
const getUniqueFromArray = <T = any>(
    array: T[],
) => {
    const result = [];
    const map = new Map();

    for (const item of array.reverse()) {
        if (!map.has((item as any).id)) {
            map.set((item as any).id, true);
            result.push({
                ...item,
            });
        }
    }

    return result.reverse();
}


export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
    } = action.payload;

    const newState = objects.clone(state, 'any');

    let cores = [
        ...newState.cores,
    ];

    switch (type) {
        case 'core':
            cores = [
                ...cores,
                {
                    ...data,
                },
            ];
            break;
    }

    return {
        ...newState,
        cores: [
            ...cores,
        ],
    };
}


export const removeEntity = (
    state: Types.State,
    action: Types.RemoveEntityAction,
): Types.State => {
    const {
        id,
        type,
    } = action.payload;

    const newState = objects.clone(state, 'any');

    let cores = [
        ...newState.cores,
    ];

    switch (type) {
        case 'core':
            cores = cores.filter(
                core => core.id !== id
            );
            break;
    }

    return {
        ...newState,
        cores: [
            ...cores,
        ],
    };
}


export const setCores = (
    state: Types.State,
    action: Types.SetCoresAction,
): Types.State => {
    const newState = objects.clone(state, 'any');

    return {
        ...newState,
        cores: [
            ...action.payload,
        ],
    };
}


export const activateCore = (
    state: Types.State,
    action: Types.ActivateCoreAction,
): Types.State => {
    const {
        payload: {
            id,
            value,
        },
    } = action;

    const newState = objects.clone(state, 'any');

    const cores = newState.cores.map(core => {
        if (core.id !== id) {
            return {
                ...core,
            };
        }

        return {
            ...core,
            active: value,
        };
    });

    return {
        ...newState,
        cores: [
            ...cores,
        ],
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    const newState = objects.clone(initialState, 'any');

    return {
        ...newState,
    };
}


export const pushData = (
    state: Types.State,
    action: Types.PushDataAction,
): Types.State => {
    const {
        type,
        coreID,
        data,
    } = action.payload;

    const newState = objects.clone(state, 'any');

    const coreData = newState[type][coreID] || [];
    const newCoreData = [
        ...coreData,
        ...data,
    ];
    newState[type][coreID] = getUniqueFromArray(newCoreData);

    return newState;
}


export const removeData = (
    state: Types.State,
    action: Types.RemoveDataAction,
): Types.State => {
    const {
        type,
        coreID,
        id,
    } = action.payload;

    const newState = objects.clone(state, 'any');

    const coreData = newState[type][coreID] || [];
    const newCoreData = coreData.filter(core => core.id !== id);
    newState[type][coreID] = newCoreData;

    return newState;
}


export const updateFunctionData = (
    state: Types.State,
    action: Types.UpdateFunctionDataAction,
): Types.State => {
    const {
        coreID,
        functionID,
        data,
    } = action.payload;

    const newState = objects.clone(state, 'any');

    const functions = newState.functions[coreID] || [];
    const newFunctions = functions.map(functionData => {
        const currentFunctionData = {
            ...functionData,
        };

        if (functionData.id === functionID) {
            for (const [key, value] of Object.entries(data)) {
                currentFunctionData[key] = value;
            }
        }

        return currentFunctionData;
    });
    newState.functions[coreID] = newFunctions;

    return newState;
}



const resolvers = {
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
export default resolvers;
// #endregion exports
