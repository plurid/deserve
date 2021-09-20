// #region imports
    // #region libraries
    import React from 'react';
    import ReactDOM from 'react-dom';
    // #endregion libraries


    // #region external
    import {
        APPLICATION_ROOT,
    } from '~shared/data/constants';
    // #endregion external


    // #region internal
    import Client from './Client';
    // #endregion internal
// #endregion imports



// #region module
/** Uncomment to use the service worker caching the static vendor.js and favicons */
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js');
// }

const deserveApp = document.getElementById(APPLICATION_ROOT);


ReactDOM.hydrate(
    <Client />,
    deserveApp,
);
// #endregion module
