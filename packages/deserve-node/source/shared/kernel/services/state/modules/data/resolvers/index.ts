// #region imports
    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
    } = action.payload;

    const newState = {
        ...state,
    };

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

    const newState = {
        ...state,
    };

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
    return {
        ...state,
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

    const cores = state.cores.map(core => {
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
        ...state,
        cores: [
            ...cores,
        ],
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    return {
        ...initialState,
    };
}


export const pushData = (
    state: Types.State,
    action: Types.PushDataAction,
): Types.State => {
    const {
        coreID,
        type,
        data,
    } = action.payload;

    const newState = {
        ...state,
    };

    const coreData = newState[type][coreID];
    const newCoreData = [
        ...coreData,
        ...data,
    ];
    newState[type][coreID] = newCoreData;

    return newState;
}



const resolvers = {
    addEntity,
    removeEntity,
    setCores,
    activateCore,
    clearData,
    pushData,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
