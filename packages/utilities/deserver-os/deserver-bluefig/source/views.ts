// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        bluefigInactiveFile,
        deserveDataFile,
    } from './data/constants';

    import {
        registerOwner,
    } from '~functions/deserve';

    import {
        checkRootKey,
        storeRootKey,
        checkAdminKey,
        storeAdminKey,
    } from '~functions/keys';

    import {
        readDeonFile,
        writeDeonFile,

        getWifiList,
        connectToWifi,
        getCurrentWifi,
    } from './utilities';
    // #endregion external
// #endregion imports



// #region module
const views = {
    '/': {
        title: 'deserver',
        elements: [
            {
                type: 'button',
                title: 'Register Owner',
                action: 'registerOwner',
            },
            {
                type: 'button',
                title: 'Setup Wi-Fi',
                action: 'setupWifi',
            },
            {
                type: 'button',
                title: 'Settings',
                action: 'settings',
            },
        ],
        actions: {
            'registerOwner': async () => {
                return views['/owner-registration'];
            },
            'setupWifi': async () => {
                return views['/wifi-selection'];
            },
            'settings': async () => {
                return views['/settings'];
            },
        },
    },



    '/root-registration': {
        title: 'root registration',
        elements: [
            {
                type: 'input-text',
                title: 'root key',
                store: 'rootKey',
            },
            {
                type: 'input-text',
                title: 'root key retyped',
                store: 'rootKeyRetyped',
            },
            {
                type: 'button',
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'rootKey',
                    'rootKeyRetyped',
                ],
                execution: async (
                    payload: {
                        rootKey: string;
                        rootKeyRetyped: string;
                    },
                ) => {
                    const {
                        rootKey,
                        rootKeyRetyped,
                    } = payload;

                    if (
                        !rootKey
                        || !rootKeyRetyped
                    ) {
                        return views['/root-registration'];
                    }

                    if (rootKey !== rootKeyRetyped) {
                        return views['/root-registration'];
                    }

                    const stored = await storeRootKey(rootKey);
                    if (!stored) {
                        return views['/root-registration'];
                    }

                    return views['/admin-registration'];
                },
            },
        },
    },

    '/root-login': {
        title: 'root login',
        elements: [
            {
                type: 'input-text',
                title: 'root key',
                store: 'rootKey',
            },
            {
                type: 'button',
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'rootKey',
                ],
                execution: async (
                    payload: {
                        rootKey: string;
                    },
                ) => {
                    const {
                        rootKey,
                    } = payload;

                    if (!rootKey) {
                        return views['/root-login'];
                    }

                    const validKey = await checkRootKey(rootKey);
                    if (!validKey) {
                        return views['/root-login'];
                    }

                    return views['/'];
                },
            },
        },
    },

    '/root-key-reset': {
        title: 'root key reset',
        elements: [
            {
                type: 'input-text',
                title: 'current root key',
                store: 'currentRootKey',
            },
            {
                type: 'input-text',
                title: 'new root key',
                store: 'newRootKey',
            },
            {
                type: 'input-text',
                title: 'new root key retyped',
                store: 'newRootKeyRetyped',
            },
            {
                type: 'button',
                title: 'Reset Root Key',
                action: 'resetRootKey',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'resetRootKey': {
                arguments: [
                    'currentRootKey',
                    'newRootKey',
                    'newRootKeyRetyped',
                ],
                execution: async (
                    payload: {
                        currentRootKey: string;
                        newRootKey: string;
                        newRootKeyRetyped: string;
                    },
                ) => {
                    const {
                        currentRootKey,
                        newRootKey,
                        newRootKeyRetyped,
                    } = payload;

                    if (
                        !currentRootKey
                        || !newRootKey
                        || !newRootKeyRetyped
                    ) {
                        return views['/root-key-reset'];
                    }

                    if (newRootKey !== newRootKeyRetyped) {
                        return views['/root-key-reset'];
                    }

                    const validKey = await checkRootKey(currentRootKey);
                    if (!validKey) {
                        return views['/root-key-reset'];
                    }

                    const stored = await storeRootKey(newRootKey);
                    if (!stored) {
                        return views['/root-key-reset'];
                    }

                    return views['/'];
                },
            },
            'cancel': async () => {
                return views['/settings'];
            },
        },
    },



    '/admin-registration': {
        title: 'admin registration',
        elements: [
            {
                type: 'input-text',
                title: 'admin key',
                store: 'adminKey',
            },
            {
                type: 'input-text',
                title: 'admin key retyped',
                store: 'adminKeyRetyped',
            },
            {
                type: 'button',
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'adminKey',
                    'adminKeyRetyped',
                ],
                execution: async (
                    payload: {
                        adminKey: string;
                        adminKeyRetyped: string;
                    },
                ) => {
                    const {
                        adminKey,
                        adminKeyRetyped,
                    } = payload;

                    if (!adminKey || !adminKeyRetyped) {
                        return views['/admin-registration'];
                    }

                    if (adminKey !== adminKeyRetyped) {
                        return views['/admin-registration'];
                    }

                    const stored = await storeAdminKey(adminKey);
                    if (!stored) {
                        return views['/admin-registration'];
                    }

                    return views['/wifi-selection'];
                },
            },
        },
    },

    '/admin-key-reset': {
        title: 'admin key reset',
        elements: [
            {
                type: 'input-text',
                title: 'current admin key',
                store: 'currentAdminKey',
            },
            {
                type: 'input-text',
                title: 'new admin key',
                store: 'newAdminKey',
            },
            {
                type: 'input-text',
                title: 'new admin key retyped',
                store: 'newAdminKeyRetyped',
            },
            {
                type: 'button',
                title: 'Reset Admin Key',
                action: 'resetAdminKey',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'resetAdminKey': {
                arguments: [
                    'currentAdminKey',
                    'newAdminKey',
                    'newAdminKeyRetyped',
                ],
                execution: async (
                    payload: {
                        currentAdminKey: string;
                        newAdminKey: string;
                        newAdminKeyRetyped: string;
                    },
                ) => {
                    const {
                        currentAdminKey,
                        newAdminKey,
                        newAdminKeyRetyped,
                    } = payload;

                    if (
                        !currentAdminKey
                        || !newAdminKey
                        || !newAdminKeyRetyped
                    ) {
                        return views['/admin-key-reset'];
                    }

                    if (newAdminKey !== newAdminKeyRetyped) {
                        return views['/admin-key-reset'];
                    }

                    const validKey = await checkAdminKey(currentAdminKey);
                    if (!validKey) {
                        return views['/admin-key-reset'];
                    }

                    const stored = await storeAdminKey(newAdminKey);
                    if (!stored) {
                        return views['/admin-key-reset'];
                    }

                    return views['/'];
                },
            },
            'cancel': async () => {
                return views['/settings'];
            },
        },
    },



    '/wifi-selection': {
        title: 'select wi-fi',
        elements: [
            {
                type: 'input-select',
                options: async () => {
                    const wifiList = await getWifiList();
                    if (!wifiList) {
                        return [];
                    }

                    const optionsList: string[] = [];
                    wifiList.forEach(wifi => {
                        optionsList.push(wifi.name);
                    });

                    return optionsList;
                },
                initial: async () => {
                    const currentWifi = await getCurrentWifi();
                    if (!currentWifi) {
                        return;
                    }

                    return currentWifi.ssid;
                },
                store: 'selectedWifi',
                exclusive: true,
            },
            {
                type: 'input-text',
                title: 'wi-fi key',
                store: 'wifiKey',
            },
            {
                type: 'button',
                title: 'Access Wi-Fi',
                action: 'accessWifi',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'accessWifi': {
                arguments: [
                    'selectedWifi',
                    'wifiKey',
                ],
                execution: async (
                    payload: {
                        selectedWifi: [number, string];
                        wifiKey: string;
                    },
                ) => {
                    const {
                        selectedWifi,
                        wifiKey,
                    } = payload;

                    const [
                        _, ssid,
                    ] = selectedWifi;

                    const connected = await connectToWifi(
                        ssid,
                        wifiKey,
                    );
                    if (!connected) {
                        return views['/wifi-selection'];
                    }

                    return views['/'];
                },
            },
            'cancel': async () => {
                return views['/'];
            },
        },
    },



    '/owner-registration': {
        title: 'owner registration',
        elements: [
            {
                type: 'input-text',
                title: 'admin key',
                store: 'adminKey',
            },
            {
                type: 'input-text',
                title: 'identonym',
                store: 'identonym',
            },
            {
                type: 'input-text',
                title: 'key',
                store: 'key',
            },
            {
                type: 'button',
                title: 'Register Owner',
                action: 'registerOwner',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'registerOwner': {
                arguments: [
                    'adminKey',
                    'identonym',
                    'key',
                ],
                execution: async (
                    payload: {
                        adminKey: string,
                        identonym: string,
                        key: string,
                    },
                ) => {
                    const {
                        adminKey,
                        identonym,
                        key,
                    } = payload;

                    if (
                        !adminKey
                        || !identonym
                        || !key
                    ) {
                        return views['/owner-registration'];
                    }

                    const validKey = await checkAdminKey(adminKey);
                    if (!validKey) {
                        return views['/owner-registration'];
                    }

                    const stored = await registerOwner(
                        identonym,
                        key,
                    );
                    if (!stored) {
                        return views['/owner-registration'];
                    }

                    return views['/'];
                },
            },
            'cancel': async () => {
                return views['/'];
            },
        },
    },



    '/settings': {
        title: 'settings',
        elements: [
            {
                type: 'input-switch',
                title: 'Active Registration',
                store: 'activeRegistration',
                action: 'toggleRegistration',
                initial: async () => {
                    const deserveData = await readDeonFile(
                        deserveDataFile,
                    );

                    return deserveData?.registration ?? false;
                }
            },
            {
                type: 'button',
                title: 'Setup Storage',
                action: 'setupStorage',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Root Key Reset',
                action: 'rootKeyReset',
            },
            {
                type: 'button',
                title: 'Admin Key Reset',
                action: 'adminKeyReset',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Restart Deserve',
                action: 'restartDeserve',
            },
            {
                type: 'button',
                title: 'Disable Bluefig',
                action: 'disableBluefig',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'toggleRegistration': {
                arguments: [
                    'activeRegistration',
                ],
                execution: async (
                    payload: {
                        activeRegistration: boolean,
                    },
                ) => {
                    const {
                        activeRegistration,
                    } = payload;

                    const deserveData = await readDeonFile(
                        deserveDataFile,
                    );

                    const newDeserveData = {
                        ...deserveData,
                        registration: activeRegistration,
                    };

                    await writeDeonFile(
                        deserveDataFile,
                        newDeserveData,
                    );

                    return views['/settings'];
                },
            },
            'setupStorage': async () => {
                return views['/setup-storage'];
            },
            'rootKeyReset': async () => {
                return views['/root-key-reset'];
            },
            'adminKeyReset': async () => {
                return views['/admin-key-reset'];
            },
            'restartDeserve': async () => {
                const command = `docker restart deserve_node`;
                execSync(command);

                return views['/'];
            },
            'disableBluefig': async () => {
                return views['/disable-bluefig'];
            },
            'cancel': async () => {
                return views['/'];
            },
        },
    },


    '/setup-storage': {
        title: 'setup storage',
        elements: [
            {
                type: 'text',
                value: 'This operation obliterates everything on the storage disk. Use accordingly.',
            },
            {
                type: 'input-text',
                title: 'root key',
                store: 'rootKey',
            },
            {
                type: 'input-slider',
                title: 'Gigabytes of Structured Data',
                store: 'structuredData',
                maximum: async () => {
                    // get storage
                    return 50;
                },
                minimum: async () => {
                    // get storage
                    return 1;
                },
            },
            {
                type: 'input-slider',
                title: 'Gigabytes of Binary Objects',
                store: 'binaryObjects',
                maximum: async () => {
                    // get storage
                    return 950;
                },
                minimum: async () => {
                    // get storage
                    return 1;
                },
            },
            {
                type: 'button',
                title: 'Save Storage',
                action: 'saveStorage',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'saveStorage': {
                arguments: [
                    'rootKey',
                    'structuredData',
                    'binaryObjects',
                ],
                execution: async (
                    payload: {
                        rootKey: string;
                        structuredData: number;
                        binaryObjects: number;
                    },
                ) => {
                    const {
                        rootKey,
                        structuredData,
                        binaryObjects,
                    } = payload;

                    const validKey = await checkRootKey(rootKey);
                    if (!validKey) {
                        return views['/setup-storage'];
                    }

                    // format storage

                    return views['/'];
                }
            },
            'cancel': async () => {
                return views['/settings'];
            },
        },
    },

    '/disable-bluefig': {
        title: 'disable bluefig',
        elements: [
            {
                type: 'input-text',
                title: 'root key',
                store: 'rootKey',
            },
            {
                type: 'button',
                title: 'Disable Bluefig',
                action: 'disableBluefig',
            },
            {
                type: 'divider',
            },
            {
                type: 'button',
                title: 'Cancel',
                action: 'cancel',
            },
        ],
        actions: {
            'disableBluefig': {
                arguments: [
                    'rootKey'
                ],
                execution: async (
                    payload: {
                        rootKey: string;
                    },
                ) => {
                    const {
                        rootKey,
                    } = payload;

                    const valid = await checkRootKey(
                        rootKey,
                    );
                    if (!valid) {
                        return views['/'];
                    }


                    await fs.writeFile(
                        bluefigInactiveFile,
                        'yes',
                    );

                    return views['/'];
                },
            },
            'cancel': async () => {
                return views['/settings'];
            },
        },
    },
};
// #endregion module



// #region exports
module.exports = views;
// #endregion exports
