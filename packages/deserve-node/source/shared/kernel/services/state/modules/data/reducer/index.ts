// #region imports
    // #region external
    import * as Types from '../types';

    import initialState from '../initial';

    import resolvers from '../resolvers';
    // #endregion external
// #endregion imports



// #region module
const reducer = (
    state: Types.State = initialState,
    action: Types.Actions,
): Types.State => {
    switch(action.type) {
        case Types.ADD_ENTITY:
            return resolvers.addEntity(state, action);
        case Types.REMOVE_ENTITY:
            return resolvers.removeEntity(state, action);
        case Types.SET_CORES:
            return resolvers.setCores(state, action);
        case Types.ACTIVATE_CORE:
            return resolvers.activateCore(state, action);
        case Types.CLEAR_DATA:
            return resolvers.clearData(state, action);
        case Types.PUSH_DATA:
            return resolvers.pushData(state, action);
        case Types.REMOVE_DATA:
            return resolvers.removeData(state, action);
        case Types.UPDATE_FUNCTION_DATA:
            return resolvers.updateFunctionData(state, action);
        default:
            return {
                ...state,
            };
    }
}
// #endregion module



// #region exports
export default reducer;
// #endregion exports
