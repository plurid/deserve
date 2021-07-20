// #region imports
    // #region libraries
    import {
        EventEmitter,
    } from 'events';
    import fs from 'fs';
    import net from 'net';
    import tls from 'tls';
    // #endregion libraries


    // #region external
    import HeaderHostTransformer from '../HeaderHostTransformer';
    // #endregion external
// #endregion imports



// #region module
/**
 * Manages groups of tunnels.
 *
 */
class TunnelCluster extends EventEmitter {
    private opts: any;


    constructor(opts: any = {}) {
        super(opts);
        this.opts = opts;
    }


    public open() {
        const opt = this.opts;

        // Prefer IP if returned by the server
        const remoteHostOrIp = opt.remote_ip || opt.remote_host;
        const remotePort = opt.remote_port;
        const localHost = opt.local_host || 'localhost';
        const localPort = opt.local_port;
        const localProtocol = opt.local_https ? 'https' : 'http';
        const allowInvalidCert = opt.allow_invalid_cert;

        // console.log(
        //     'establishing tunnel %s://%s:%s <> %s:%s',
        //     localProtocol,
        //     localHost,
        //     localPort,
        //     remoteHostOrIp,
        //     remotePort
        // );

        // connection to localtunnel server
        const remote = net.connect({
            host: remoteHostOrIp,
            port: remotePort,
        });
        // console.log('remote', remote);

        remote.setKeepAlive(true);

        remote.on('error', (err: any) => {
            // console.log('got remote connection error', err.message);

            // emit connection refused errors immediately, because they
            // indicate that the tunnel can't be established.
            if (err.code === 'ECONNREFUSED') {
                this.emit(
                    'error',
                    new Error(
                        `connection refused: ${remoteHostOrIp}:${remotePort} (check your firewall settings)`
                    ),
                );
            }

            remote.end();
        });

        const connLocal = () => {
            if (remote.destroyed) {
                console.log('remote destroyed');
                this.emit('dead');
                return;
            }

            // console.log('connecting locally to %s://%s:%d', localProtocol, localHost, localPort);
            remote.pause();

            if (allowInvalidCert) {
                console.log('allowing invalid certificates');
            }

            const getLocalCertOpts = () =>
                allowInvalidCert
                    ? { rejectUnauthorized: false }
                    : {
                        cert: fs.readFileSync(opt.local_cert),
                        key: fs.readFileSync(opt.local_key),
                        ca: opt.local_ca ? [fs.readFileSync(opt.local_ca)] : undefined,
                    };

            // connection to local http server
            const local = opt.local_https
                ? tls.connect({ host: localHost, port: localPort, ...getLocalCertOpts() })
                : net.connect({ host: localHost, port: localPort });

            const remoteClose = () => {
                // console.log('remote close');
                this.emit('dead');
                local.end();
            };

            remote.once('close', remoteClose);

            // TODO some languages have single threaded servers which makes opening up
            // multiple local connections impossible. We need a smarter way to scale
            // and adjust for such instances to avoid beating on the door of the server
            local.once('error', err => {
                // console.log('local error %s', err.message);
                local.end();

                remote.removeListener('close', remoteClose);

                if (err.code !== 'ECONNREFUSED') {
                    return remote.end();
                }

                // retrying connection to local server
                setTimeout(connLocal, 1000);
            });

            local.once('connect', () => {
                // console.log('connected locally');
                remote.resume();

                let stream: any = remote;

                // if user requested specific local host
                // then we use host header transform to replace the host header
                if (opt.local_host) {
                    // console.log('transform Host header to %s', opt.local_host);
                    stream = remote.pipe(new HeaderHostTransformer({ host: opt.local_host }));
                }

                stream.pipe(local).pipe(remote);

                // when local closes, also get a new remote
                local.once('close', hadError => {
                    // console.log('local connection closed [%s]', hadError);
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

            connLocal();
        });
    }
}
// #endregion module



// #region exports
export default TunnelCluster;
// #endregion exports
