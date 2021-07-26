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
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
class CoresList {
    private addresses: Record<string, string> = {};


    private async getAddress(
        host: string,
    ) {
        if (this.addresses[host]) {
            return this.addresses[host];
        }

        return;
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
