// #region imports
    // #region external
    import {
        DeserveClientOptions,
    } from '~data/interfaces';

    import {
        DESERVE_CLIENT_HOST,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const GraphqlClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
) => {
    const host = options?.host || DESERVE_CLIENT_HOST;
    if (!host) {
        return;
    }

    const clientRoute = identonym + host;
    // generate client from clientRoute and token
    const client = {};

    return client;
}
// #endregion module



// #region exports
export default GraphqlClient;
// #endregion exports
