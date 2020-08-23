// #region imports
    // #region libraries
    import React from 'react';
    import ReactDOM from 'react-dom';
    // #endregion libraries

    // #region internal
    import Client from './Client';
    // #endregion internal
// #endregion imports



// #region module
/** Uncomment to use the service worker caching the static vendor.js and favicons */
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js');
// }

const performerApp = document.getElementById('performer-application');


ReactDOM.hydrate(
    <Client />,
    performerApp,
);
// #endregion module
