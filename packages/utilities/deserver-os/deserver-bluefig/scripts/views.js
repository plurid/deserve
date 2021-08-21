// #region imports
    // #region libraries
    const os = require('os');
    const path = require('path');
    const {
        promises: fs,
    } = require('fs');
    // #endregion libraries
// #endregion imports



// #region module
const bluefigRootPath = path.join(
    os.homedir(),
    '.bluefig',
);

const deserveRootPath = path.join(
    os.homedir(),
    '.deserve',
);



const views = {
    '/': {
        title: 'deserver',
        elements: [
            {
                type: 'button',
                title: 'Settings',
                action: 'settings',
            },
        ],
        actions: {
            settings: async () => {
                // view /settings
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
                    rootKey,
                ) => {
                    // check if rootKey is correct
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
                    adminKey,
                    adminKeyRetyped,
                ) => {
                    // set adminKey
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
                    currentAdminKey,
                    newAdminKey,
                    newAdminKeyRetyped,
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
                    // get available wi-fis list
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
                    selectedWifi,
                    wifiKey,
                ) => {
                    // connect to selectedWifi based on wifiKey
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
                    identonym,
                    key,
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
                    activeRegistration,
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
                    rootKey,
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
