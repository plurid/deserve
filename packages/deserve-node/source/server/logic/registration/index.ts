// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries
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
}
// #endregion module



// #region exports
export {
    registerNodeToRouter,
    registerNodeToCore,
};
// #endregion exports
