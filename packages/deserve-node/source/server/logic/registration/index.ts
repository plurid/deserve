// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
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
    url: string,
    token: string,
) => {
    const data = {
        token,
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

    const responseData = await response.json();
    console.log('responseData', responseData);

    const client = new Tunnel({
        port: 3366,
        host: 'http://localhost:' + responseData.port,
    });
    console.log('client', client);

    return client;
}
// #endregion module



// #region exports
export {
    registerNodeToRouter,
    registerNodeToCore,
};
// #endregion exports
