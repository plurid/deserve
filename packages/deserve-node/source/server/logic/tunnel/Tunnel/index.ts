// #region imports
    // #region libraries
    import {
        URL,
    } from 'url';

    import {
        EventEmitter,
    } from 'events';

    import axios from 'axios';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DEFAULT_TUNNEL_HOST,
    } from '~server/data/constants';

    import tunnelsManager from '~server/services/tunnelsManager';
    // #endregion external


    // #region internal
    import TunnelCluster from '../TunnelCluster';
    // #endregion internal
// #endregion imports



// #region module
export interface TunnelBody {
    id: string;
    port: number;
    maxConnections: number;

    ip?: string;
    url?: string;
    cachedURL?: string;
}

export interface TunnelOptions {
    host: string;
    id: string;
    port: number;
    token: string;

    localHost?: string;
    localHttps?: boolean;
    localCert?: string;
    localKey?: string;
    localCA?: string;
    allowInvalidCert?: boolean;
}

export interface TunnelInfo {
    name: string;
    maxConnections: number;
    remoteHost: string;
    remotePort: number;
    localPort: number;

    remoteIP?: string;
    url?: string;
    cachedURL?: string;

    localHost?: string;
    localHttps?: boolean;
    localCert?: string;
    localKey?: string;
    localCA?: string;
    allowInvalidCert?: boolean;
}


class Tunnel extends EventEmitter {
    private options: TunnelOptions;
    private closed: any;
    private tunnelCluster: any;
    private clientId: any;
    private url: any;
    private cachedURL: any;


    constructor(
        options: TunnelOptions,
    ) {
        super();
        this.options = options;
        this.closed = false;

        if (!this.options.host) {
            this.options.host = DEFAULT_TUNNEL_HOST;
        }
    }


    private _getInfo(
        body: TunnelBody,
    ) {
        const {
            id,
            port,
            maxConnections,

            ip: remoteIP,
            url,
            cachedURL,
        } = body;

        const {
            host,
            port: localPort,

            localHost,
            localHttps,
            localCert,
            localKey,
            localCA,
            allowInvalidCert,
        } = this.options;

        const info: TunnelInfo = {
            name: id,
            maxConnections: maxConnections || 1,
            remoteHost: new URL(host).hostname,
            remotePort: port,
            localPort,

            remoteIP,
            url,
            cachedURL,

            localHost,
            localHttps,
            localCert,
            localKey,
            localCA,
            allowInvalidCert,
        };

        return info;
    }

    // initialize connection
    // callback with connection info
    private _init(
        callback: any,
    ) {
        const {
            host,
            token,
        } = this.options;

        // const getInfo = this._getInfo.bind(this);

        const params: any = {
            responseType: 'json',
        };

        const baseUri = `${host}/register`;

        // no subdomain at first, maybe use requested domain
        // const assignedDomain = opt.subdomain;
        const assignedDomain = '';
        // // where to quest
        const uri = baseUri + (assignedDomain || '?new');

        const getURL = async () => {
            axios
                .post(
                    uri,
                    {
                        token,
                    },
                    params,
                )
                .then((response) => {
                    const body = response.data;
                    console.log('got tunnel information', response.data);
                    if (response.status !== 200) {
                        const errorMessage = (body && body.message) || 'localtunnel server returned an error, please try again';
                        const error = new Error(errorMessage);
                        return callback(error);
                    }

                    callback(null, this._getInfo(body));
                })
                .catch((error) => {
                    delog({
                        text: `tunnel server offline ${error.message}`,
                        level: 'error',
                        error,
                    });

                    return setTimeout(getURL, 1_000);
                });
        }

        getURL();
    }

    private _establish(
        info: TunnelInfo,
    ) {
        const {
            maxConnections,
        } = info;
        // console.log('_establish info', info);

        // Increase max event listeners so that localtunnel consumers don't get
        // warning messages as soon as they setup even one listener.
        this.setMaxListeners(maxConnections + (EventEmitter.defaultMaxListeners || 10));

        this.tunnelCluster = new TunnelCluster(info);

        // // only emit the url the first time
        // this.tunnelCluster.once('open', () => {
        //     this.emit('url', info.url);
        // });

        // re-emit socket error
        this.tunnelCluster.on('error', (error: any) => {
            delog({
                text: `got socket error ${error.message}`,
                level: 'error',
                error,
            });

            tunnelsManager.remove(this.options.id);
            // this.emit('error', error);
        });

        let tunnelCount = 0;

        // track open count
        this.tunnelCluster.on('open', (tunnel: any) => {
            tunnelCount++;

            delog({
                text: `tunnel open total ${tunnelCount}`,
                level: 'trace',
            });

            const closeHandler = () => {
                tunnel.destroy();
            };

            if (this.closed) {
                return closeHandler();
            }

            this.once('close', closeHandler);
            tunnel.once('close', () => {
                this.removeListener('close', closeHandler);
            });
        });

        // when a tunnel dies, open a new one
        this.tunnelCluster.on('dead', () => {
            tunnelCount--;

            delog({
                text: `tunnel dead total ${tunnelCount}`,
                level: 'trace',
            });

            if (this.closed) {
                return;
            }
            this.tunnelCluster.open();
        });

        this.tunnelCluster.on('request', (request: any) => {
            this.emit('request', request);
        });

        // Establish as many tunnels as allowed.
        for (let count = 0; count < maxConnections; ++count) {
            this.tunnelCluster.open();
        }
    }


    public open(
        callback: any,
    ) {
        this._init((
            error: any,
            info: TunnelInfo,
        ) => {
            if (error) {
                return callback(error);
            }

            this.clientId = info.name;
            // this.url = info.url;

            // // `cachedURL` is only returned by proxy servers that support resource caching.
            // if (info.cachedURL) {
            //     this.cachedURL = info.cachedURL;
            // }

            this._establish(info);
            callback();
        });
    }

    public close() {
        this.closed = true;
        this.emit('close');
    }
}
// #endregion module



// #region exports
export default Tunnel;
// #endregion exports
