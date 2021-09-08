// #region imports
    // #region libraries
    import {
        URL,
    } from 'url';

    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        PORT,
    } from '../../data/constants';

    import Tunnel from '../tunnel/Tunnel';
    // #endregion external
// #endregion imports



// #region module
const registerNodeToRouter = async (
    url: string,
    identonym: string,
    key: string,
) => {
    const data = {
        identonym,
        key,
    };

    const response = await fetch(
        url,
        {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    const core = await response.json();

    return core;
}


const registerNodeToCore = async (
    id: string,
    url: string,
    token: string,
    sendHost: boolean | undefined,
) => {
    const parsedURL = new URL(url);

    const host = parsedURL.protocol + '//' + parsedURL.host;

    const client = new Tunnel({
        id,
        port: PORT,
        host,
        token,
        sendHost,
    });

    return {
        client,
    };
}
// #endregion module



// #region exports
export {
    registerNodeToRouter,
    registerNodeToCore,
};
// #endregion exports
