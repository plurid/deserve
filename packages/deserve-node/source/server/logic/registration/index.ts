// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries
// #endregion imports



// #region module
const registerNode = async (
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
        },
    );

    const core = await response.json();

    return core;
}
// #endregion module



// #region exports
export {
    registerNode,
};
// #endregion exports
