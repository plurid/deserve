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
            registerOwner: async () => {
                return views['/owner-registration'];
            },
            setupWifi: async () => {
                return views['/wifi-selection'];
            },
            settings: async () => {
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
                    rootKey: string,
                    rootKeyRetyped: string,
                ) => {
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
                    rootKey: string,
                ) => {
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
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'currentRootKey',
                    'newRootKey',
                    'newRootKeyRetyped',
                ],
                execution: async (
                    currentRootKey: string,
                    newRootKey: string,
                    newRootKeyRetyped: string,
                ) => {
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
                    adminKey: string,
                    adminKeyRetyped: string,
                ) => {
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
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'currentAdminKey',
                    'newAdminKey',
                    'newAdminKeyRetyped',
                ],
                execution: async (
                    currentAdminKey: string,
                    newAdminKey: string,
                    newAdminKeyRetyped: string,
                ) => {
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
                title: 'Enter',
                action: 'enter',
            },
        ],
        actions: {
            'enter': {
                arguments: [
                    'selectedWifi',
                    'wifiKey',
                ],
                execution: async (
                    selectedWifi: [number, string],
                    wifiKey: string,
                ) => {
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
        },
    },



    '/owner-registration': {
        title: 'owner registration',
        elements: [
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
                title: 'Generate',
                action: 'generate',
            },
        ],
        actions: {
            'generate': {
                arguments: [
                    'identonym',
                    'key',
                ],
                execution: async (
                    identonym: string,
                    key: string,
                ) => {
                    if (!identonym || !key) {
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
                    activeRegistration: boolean,
                ) => {
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
                // return views['/setup-storage];
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
        ],
        actions: {
            'disableBluefig': {
                arguments: [
                    'rootKey'
                ],
                execution: async (
                    rootKey: string,
                ) => {
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
        },
    },
};
// #endregion module



// #region exports
module.exports = views;
// #endregion exports
