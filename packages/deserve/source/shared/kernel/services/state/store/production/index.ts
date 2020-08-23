// #region imports
    // #region libraries
    import {
        createStore,
        applyMiddleware,
    } from 'redux';

    import thunk from 'redux-thunk';
    // #endregion libraries


    // #region external
    import reducers from '../reducers';
    // #endregion external
// #endregion imports



// #region module
export type AppState = ReturnType<typeof reducers>;

const store = (
    preloadedState: any,
) => {
    // const localState = localStorage.loadState();

    // const persistedState = {
    //     themes: localState?.themes,
    // };

    const _store = createStore(
        reducers,
        preloadedState,
        // persistedState || preloadedState,
        applyMiddleware(
            thunk,
        ),
    );

    // _store.subscribe(
    //     () => {
    //         const localState = localStorage.loadState();
    //         localStorage.saveState({
    //             ...localState,
    //             themes: _store.getState().themes,
    //         });
    //     },
    // );

    return _store;
}
// #endregion module



// #region exports
export default store;
// #endregion exports
