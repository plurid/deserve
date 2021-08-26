// #region imports
    // #region external
    import {
        bluefigDataFile,
        deserverDataFile,
        deserveDataFile,
    } from './data/constants';

    import {
        readDeonFile,
        writeDeonFile,

        hashKey,

        getWifiList,
        connectToWifi,
    } from './utilities';
    // #endregion external
// #endregion imports



// #region module
const views = {
    '/': {
        title: 'deserver',
        elements: [
            {
                type: 'list',
                elements: async () => {
                    // compute dynamic elements
                    return [];
                },
            },
            {
                type: 'button',
                title: 'Settings',
                action: 'settings',
            },
        ],
        actions: {
            settings: async () => {
                return views['/settings'];
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
                    // check if rootKey is correct

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
                    if (adminKey !== adminKeyRetyped) {
                        return views['/admin-registration'];
                    }

                    const deserverData = await readDeonFile(
                        deserverDataFile,
                    );
                    const adminKeyHash = await hashKey(adminKey);
                    if (!adminKeyHash) {
                        return views['/admin-registration'];
                    }
                    const deserverNewData = {
                        ...deserverData,
                        adminKeyHash,
                    };

                    await writeDeonFile(
                        deserverDataFile,
                        deserverNewData,
                    );

                    return views['/wifi-selection'];
                },
            },
        },
    },

    '/admin-reset': {
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
                    // check currentAdminKey
                    // set newAdminKey
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
                    // generate owner with identonym and key
                },
            },
        },
    },


    '/settings': {
        title: 'settings',
        elements: [
            {
                type: 'input-select',
                options: [],
                store: 'activeRegistration',
                action: 'toggleRegistration',
            },
            {
                type: 'button',
                title: 'Disable Bluefig',
                action: 'disableBluefig',
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
                    // toggle
                },
            },
            disableBluefig: async () => {
                // disableBluefig
            },
            cancel: async () => {
                // view /
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
                    // check root key
                    // disable bluefig
                },
            },
        },
    },
};
// #endregion module



// #region exports
module.exports = views;
// #endregion exports
