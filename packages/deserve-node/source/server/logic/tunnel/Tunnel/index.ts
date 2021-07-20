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
class Tunnel extends EventEmitter {
    private opts: any;
    private closed: any;
    private tunnelCluster: any;
    private clientId: any;
    private url: any;
    private cachedUrl: any;


    constructor(opts: any = {}) {
        super(opts);
        this.opts = opts;
        this.closed = false;

        if (!this.opts.host) {
            this.opts.host = DEFAULT_TUNNEL_HOST;
        }
    }


    private _getInfo(
        body: any,
    ) {
        const { id, ip, port, url, cached_url, max_conn_count } = body;
        const { host, port: local_port, local_host } = this.opts;
        const { local_https, local_cert, local_key, local_ca, allow_invalid_cert } = this.opts;

        return {
            name: id,
            url,
            cached_url,
            max_conn: max_conn_count || 1,
            remote_host: new URL(host).hostname,
            remote_ip: ip,
            remote_port: port,
            local_port,
            local_host,
            local_https,
            local_cert,
            local_key,
            local_ca,
            allow_invalid_cert,
        };
    }

    // initialize connection
    // callback with connection info
    private _init(
        cb: any,
    ) {
        const opt = this.opts;
        const getInfo = this._getInfo.bind(this);

        const params: any = {
            responseType: 'json',
        };

        const baseUri = `${opt.host}/register`;

        // no subdomain at first, maybe use requested domain
        const assignedDomain = opt.subdomain;
        // where to quest
        const uri = baseUri + (assignedDomain || '?new');

        (function getUrl() {
            axios
                .post(
                    uri,
                    {
                        token: opt.token,
                    },
                    params,
                )
                .then((res: any) => {
                    const body = res.data;
                    // console.log('got tunnel information', res.data);
                    if (res.status !== 200) {
                        const err = new Error(
                            (body && body.message) || 'localtunnel server returned an error, please try again'
                        );
                        return cb(err);
                    }
                    cb(null, getInfo(body));
                })
                .catch((error: any) => {
                    delog({
                        text: `tunnel server offline ${error.message}`,
                        level: 'error',
                        error,
                    });

                    return setTimeout(getUrl, 1000);
                });
        })();
    }

    private _establish(
        info: any,
    ) {
        // console.log('_establish info', info);

        // increase max event listeners so that localtunnel consumers don't get
        // warning messages as soon as they setup even one listener. See #71
        this.setMaxListeners(info.max_conn + (EventEmitter.defaultMaxListeners || 10));

        this.tunnelCluster = new TunnelCluster(info);

        // only emit the url the first time
        this.tunnelCluster.once('open', () => {
            this.emit('url', info.url);
        });

        // re-emit socket error
        this.tunnelCluster.on('error', (error: any) => {
            delog({
                text: `got socket error ${error.message}`,
                level: 'error',
                error,
            });

            tunnelsManager.remove(this.opts.id);
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

        // establish as many tunnels as allowed
        for (let count = 0; count < info.max_conn; ++count) {
            this.tunnelCluster.open();
        }
    }


    public open(
        cb: any,
    ) {
        this._init((
            err: any,
            info: any,
        ) => {
            if (err) {
                return cb(err);
            }

            this.clientId = info.name;
            this.url = info.url;

            // `cached_url` is only returned by proxy servers that support resource caching.
            if (info.cached_url) {
                this.cachedUrl = info.cached_url;
            }

            this._establish(info);
            cb();
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
