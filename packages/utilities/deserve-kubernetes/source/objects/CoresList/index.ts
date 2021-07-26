// #region imports
    // #region libraries
    import http from 'http';

    import {
        Request,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        TUNNEL_PORT,

        HOST_PATTERN,
        CORE_PATTERN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
/**
 * Obtains `identonym` from `host`.
 *
 * e.g. from the `host` `'one.data.domain.com'` obtains the `identonym` `'one'`,
 * given that the `HOST_PATTERN` is `'.data.domain.com'`
 *
 * @param host
 * @returns
 */
const identonymFromHost = (
    host: string,
) => {
    return host.replace(HOST_PATTERN, '');;
}

const serviceQuery = async (
    identonym: string,
) => {
    const serviceName = CORE_PATTERN.replace('#IDENTONYM', identonym);

    return '';
}


class CoresList {
    private addresses: Record<string, string> = {};


    private async getAddress(
        host: string,
    ) {
        if (this.addresses[host]) {
            return this.addresses[host];
        }

        const identonym = identonymFromHost(host);
        if (!identonym) {
            return;
        }

        const address = await serviceQuery(identonym);
        if (!address) {
            return;
        }

        this.addresses[host] = address;
        return address;
    }


    public async get(
        request: Request,
    ) {
        const host = request.header('host');
        if (!host) {
            return;
        }

        const serviceAddress = await this.getAddress(host);
        if (!serviceAddress) {
            return;
        }

        const options = {
            host: serviceAddress,
            port: TUNNEL_PORT,
            path: request.path,
            method: request.method,
            headers: request.headers,
        };

        return http.request(options);
    }
}
// #endregion module



// #region exports
export default CoresList;
// #endregion exports
