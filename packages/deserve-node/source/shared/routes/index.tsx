// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridReactRoute,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import IndexPlane from '~kernel-planes/Index';
    import CorePlane from '~kernel-planes/Core';
    import BlobPlane from '~kernel-planes/Blob';
    import KeyPlane from '~kernel-planes/Key';
    import FunctionPlane from '~kernel-planes/Function';
    import ExecutionsPlane from '~kernel-planes/Executions';
    import ExecutionPlane from '~kernel-planes/Execution';
    import NotFoundPlane from '~kernel-planes/NotFound';

    import Head from '~kernel-components/Head';

    import Home from '~kernel-containers/Home';
    // #endregion external
// #endregion imports



// #region module
const indexRoute: PluridReactRoute = {
    value: '/',
    exterior: Home,
    planes: [
        {
            value: '/dashboard',
            component: IndexPlane,
        },
        {
            value: '/core/:id',
            component: CorePlane,
        },
        {
            value: '/blob/:core/:id',
            component: BlobPlane,
        },
        {
            value: '/key/:core/:id',
            component: KeyPlane,
        },
        {
            value: '/function/:core/:id',
            component: FunctionPlane,
        },
        {
            value: '/executions/:core/:function',
            component: ExecutionsPlane,
        },
        {
            value: '/execution/:core/:function/:id',
            component: ExecutionPlane,
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


const notFoundRoute: PluridReactRoute = {
    value: '/not-found',
    exterior: () => (
        <Head
            title="not found · deserve"
        />
    ),
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
                                    component: NotFoundPlane,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};


const routes: PluridReactRoute[] = [
    indexRoute,
    notFoundRoute,
];
// #endregion module



// #region exports
export default routes;
// #endregion exports
