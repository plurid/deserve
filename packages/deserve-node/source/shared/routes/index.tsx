// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridRoute,
    } from '@plurid/plurid-data';
    // #endregion libraries


    // #region external
    import IndexPlane from '#kernel-planes/Index';
    import NotFoundPlane from '#kernel-planes/NotFound';

    import Head from '#kernel-components/Head';

    import Home from '#kernel-containers/Home';
    // #endregion external
// #endregion imports



// #region module
const indexRoute: PluridRoute = {
    value: '/',
    exterior: {
        kind: 'react',
        element: Home,
    },
    planes: [
        {
            value: '/dashboard',
            component: {
                kind: 'react',
                element: IndexPlane,
            },
        },
    ],
    view: [
        '/dashboard',
    ],
    defaultConfiguration: {
        elements: {
            plane: {
                controls: {
                    show: false,
                },
                // width: 0.7,
            },
        },
    },
}


const notFoundRoute: PluridRoute = {
    value: '/not-found',
    exterior: {
        kind: 'react',
        element: () => (
            <Head
                title="not found · performer"
            />
        ),
    },
    spaces: [
        {
            value: 'default',
            universes: [
                {
                    value: 'default',
                    clusters: [
                        {
                            value: 'default',
                            planes: [
                                {
                                    value: '/',
                                    component: {
                                        kind: 'react',
                                        element: NotFoundPlane,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};


const routes: PluridRoute[] = [
    indexRoute,
    notFoundRoute,
];
// #endregion module



// #region exports
export default routes;
// #endregion exports
