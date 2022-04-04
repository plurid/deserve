// #region imports
    // #region libraries
    import {
        EventEmitter,
    } from 'events';
    import fs from 'fs';
    import net from 'net';
    import tls from 'tls';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import HeaderHostTransformer from '../HeaderHostTransformer';
    // #endregion external
// #endregion imports



// #region module
export interface TunnelClusterOptionsConstructor {
    remoteIP?: string;
    remoteHost: string;
    remotePort: number;
    localHost?: string;
    localPort: number;
    localCert?: string;
    localKey?: string;
    localCA?: string;
    localHttps?: boolean;
    allowInvalidCert?: boolean;
    sendHost?: boolean;
}

export interface TunnelClusterOptions {
    remoteHostOrIp: string;
    remotePort: number;
    localHost: string;
    localPort: number;
    localHttps: boolean;
    localProtocol: string;
    localCert: string;
    localKey: string;
    localCA: string;
    allowInvalidCert: boolean;
    sendHost: boolean;
}

/**
 * Manages groups of tunnels.
 *
 */
class TunnelCluster extends EventEmitter {
    private options: TunnelClusterOptions;


    constructor(
        options: TunnelClusterOptionsConstructor,
    ) {
        super();

        // Prefer IP if returned by the server
        const remoteHostOrIp = options.remoteIP || options.remoteHost;
        const remotePort = options.remotePort;
        const localHost = options.localHost || 'localhost';
        const localPort = options.localPort;
        const localHttps = !!options.localHttps;
        const localProtocol = localHttps ? 'https' : 'http';
        const allowInvalidCert = !!options.allowInvalidCert;
        const localCert = options.localCert || '';
        const localKey = options.localKey || '';
        const localCA = options.localCA || '';
        const sendHost = options.sendHost ?? false;

        this.options = {
            remoteHostOrIp,
            remotePort,
            localHost,
            localPort,
            localHttps,
            localProtocol,
            localCert,
            localKey,
            localCA,
            allowInvalidCert,
            sendHost,
        };
    }


    private sendHost(
        remote: net.Socket,
        remoteHostOrIp: string,
    ) {
        remote.write(`Deserve Tunnel: ${remoteHostOrIp}`);
    }


    public open() {
        const {
            remoteHostOrIp,
            remotePort,
            localHost,
            localPort,
            localHttps,
            localProtocol,
            localCert,
            localKey,
            localCA,
            allowInvalidCert,
        } = this.options;


        delog({
            text: `establishing tunnel ${localProtocol}://${localHost}:${localPort} <> ${remoteHostOrIp}:${remotePort}`,
            level: 'trace',
        });

        // connection to deserve core tunnel
        const remote = net.connect({
            host: remoteHostOrIp,
            port: remotePort,
        });

        remote.setKeepAlive(true);

        if (this.options.sendHost) {
            this.sendHost(
                remote,
                remoteHostOrIp,
            );
        }

        remote.on('error', (error: NodeJS.ErrnoException) => {
            delog({
                text: `remote connection error ${error.message}`,
                level: 'error',
                error,
            });

            // emit connection refused errors immediately, because they
            // indicate that the tunnel can't be established.
            if (error.code === 'ECONNREFUSED') {
                this.emit(
                    'error',
                    new Error(
                        `connection refused: ${remoteHostOrIp}:${remotePort} (check your firewall settings)`
                    ),
                );
            }

            remote.end();
        });


        const connectLocal = () => {
            if (remote.destroyed) {
                delog({
                    text: 'remote destroyed',
                    level: 'trace',
                });
                this.emit('dead');
                return;
            }

            delog({
                text: `connecting locally to ${localProtocol}://${localHost}:${localPort}`,
                level: 'trace',
            });
            remote.pause();

            if (allowInvalidCert) {
                delog({
                    text: `allowing invalid certificates`,
                    level: 'trace',
                });
            }

            const getLocalCertOptions = () => {
                if (allowInvalidCert) {
                    return {
                        rejectUnauthorized: false,
                    };
                } else {
                    return {
                        cert: fs.readFileSync(localCert),
                        key: fs.readFileSync(localKey),
                        ca: localCA ? [fs.readFileSync(localCA)] : undefined,
                    };
                }
            }

            // connection to local http server
            const local = localHttps
                ? tls.connect({ host: localHost, port: localPort, ...getLocalCertOptions() })
                : net.connect({ host: localHost, port: localPort });

            const remoteClose = () => {
                delog({
                    text: `remote close`,
                    level: 'info',
                });
                this.emit('dead');
                local.end();
            };

            remote.once('close', remoteClose);

            // TODO some languages have single threaded servers which makes opening up
            // multiple local connections impossible. We need a smarter way to scale
            // and adjust for such instances to avoid beating on the door of the server
            local.once('error', (error) => {
                delog({
                    text: `local error ${error.message}`,
                    level: 'error',
                    error,
                });
                local.end();

                remote.removeListener('close', remoteClose);

                if (error.code !== 'ECONNREFUSED') {
                    return remote.end();
                }

                // retrying connection to local server
                setTimeout(connectLocal, 1_000);

                return;
            });

            local.once('connect', () => {
                delog({
                    text: `connected locally`,
                    level: 'trace',
                });
                remote.resume();

                let stream: any = remote;

                // if user requested specific local host
                // then we use host header transform to replace the host header
                if (localHost) {
                    // console.log('transform Host header to %s', localHost);
                    stream = remote.pipe(
                        new HeaderHostTransformer(
                            {
                                host: localHost,
                            },
                        ),
                    );
                }

                stream.pipe(local).pipe(remote);

                // when local closes, also get a new remote
                local.once('close', error => {
                    if (error) {
                        delog({
                            text: `local connection closed`,
                            level: 'error',
                            error,
                        });
                    }
                });
            });
        };

        remote.on('data', data => {
            const match = data.toString().match(/^(\w+) (\S+)/);

            if (match) {
                this.emit('request', {
                    method: match[1],
                    path: match[2],
                });
            }
        });

        // tunnel is considered open when remote connects
        remote.once('connect', () => {
            this.emit('open', remote);

            connectLocal();
        });
    }
}
// #endregion module



// #region exports
export default TunnelCluster;
// #endregion exports
