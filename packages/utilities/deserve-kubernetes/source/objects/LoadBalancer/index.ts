// #region imports
    // #region libraries
    import net from 'net';
    import EventEmitter from 'events';
    import {
        create as createDomain,
    } from 'domain';

    import async from 'async';
    import {
        ExpiryManager,
    } from 'expirymanager';

    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        TCP_PORT,

        deserveTunnelRE,
    } from '~data/constants';

    import {
        LoadBalancerMiddleware,
        LoadBalancerTarget,
        LoadBalancerTargets,
        LoadBalancerActiveSession,
        LoadBalancerConnectToTargetCallback,
        LoadBalancerController,

        SocketData,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
/**
 * The `LoadBalancer` creates a `TCP server` which listens on the `TCP_PORT`
 * and routes the requests to the adequate `Deserve Core`s within the `Kubernetes` cluster.
 *
 * Adapted from `https://github.com/SocketCluster/loadbalancer`
 *
 */
class LoadBalancer extends EventEmitter {
    private _errorDomain;
    private _middleware: Record<string, LoadBalancerMiddleware[]> = {};
    private _server;
    private _activeSessions: Record<string, LoadBalancerActiveSession | undefined>;
    private _sessionExpirer;
    private _cleanupInterval: NodeJS.Timer | null = null;

    private sourcePort;
    private balancerControllerPath;
    private downgradeToUser;
    private targetDeactivationDuration;
    private sessionExpiry;
    private sessionExpiryInterval;
    private maxBufferSize;
    private stickiness;
    private balancerController: LoadBalancerController<LoadBalancer> | undefined;

    private targets: LoadBalancerTargets = {};
    // private activeTargets: LoadBalancerTarget[] = [];
    // private activeTargetsLookup: Record<string, number | undefined> = {};

    private sockets: Record<string, SocketData | undefined> = {};
    private _queueInterval: NodeJS.Timer | null = null;

    public MIDDLEWARE_CONNECTION = 'connection';


    constructor(
        options: any,
    ) {
        super();

        this._errorDomain = createDomain();
        this._errorDomain.on('error', (error) => {
            if (
                !error.message
                || (error.message !== 'read ECONNRESET' && error.message !== 'socket hang up')
            ) {
                this.emit('error', error);
            }
        });

        this._middleware[this.MIDDLEWARE_CONNECTION] = [];

        this.sourcePort = TCP_PORT;

        this.balancerControllerPath = options.balancerControllerPath;
        this.downgradeToUser = options.downgradeToUser;
        this.targetDeactivationDuration = options.targetDeactivationDuration || 60_000;
        this.sessionExpiry = options.sessionExpiry || 30_000;
        this.sessionExpiryInterval = options.sessionExpiryInterval || 1_000;
        this.maxBufferSize = options.maxBufferSize || 8192;
        this.stickiness = !!options.stickiness;

        this._setTargets(options.targets);

        this._server = net.createServer(this._handleConnection.bind(this));
        this._errorDomain.add(this._server);

        this._activeSessions = {};
        this._sessionExpirer = new ExpiryManager();

        this._start();
    }


    public addMiddleware(
        type: string,
        middleware: LoadBalancerMiddleware,
    ) {
        this._middleware[type].push(middleware);
    }

    public close(
        callback: () => void,
    ) {
        if (this._cleanupInterval) {
            clearInterval(this._cleanupInterval);
        }
        if (this._queueInterval) {
            clearInterval(this._queueInterval);
        }

        this._server.close(callback);
    }

    public updateTargets(
        targets: LoadBalancerTargets,
    ) {
        delog({
            text: `deserve kubernetes TCP server LoadBalancer updateTargets`,
            level: 'trace',
        });

        this._setTargets(targets);
    }


    private _start() {
        if (this.balancerControllerPath) {
            this._errorDomain.run(() => {
                this.balancerController = require(this.balancerControllerPath);
                if (this.balancerController) {
                    this.balancerController.run(this);
                }
            });
        }

        this._server.listen(this.sourcePort);

        if (this.downgradeToUser && process.setuid) {
            try {
                process.setuid(this.downgradeToUser);
            } catch (err) {
                this._errorDomain.emit('error', new Error(
                    `Could not downgrade to user "${this.downgradeToUser}" - `
                    + 'Either this user does not exist or the current process does not have the permission to switch to it.',
                ));
            }
        }

        this._cleanupInterval = setInterval(
            this._cleanupSessions.bind(this),
            this.sessionExpiryInterval,
        );

        this._queueInterval = setInterval(
            this._handleQueue.bind(this),
            1_000,
        );
    }

    private _setTargets(
        targets: LoadBalancerTargets,
    ) {
        this.targets = targets;
        // this.activeTargets = targets;
        // this.activeTargetsLookup = {};

        // let target;
        // for (let i = 0; i < targets.length; i++) {
        //     target = targets[i];
        //     this.activeTargetsLookup[target.host + ':' + target.port] = 1;
        // }

        delog({
            text: `deserve kubernetes TCP server LoadBalancer _setTargets`,
            level: 'trace',
            extradata: JSON.stringify({
                targets: this.targets,
                // activeTargets: this.activeTargets,
                // activeTargetsLookup: this.activeTargetsLookup,
            }),
        });
    }

    private _deactivateTarget(
        host: string,
        port: number,
    ) {
        // const hostAndPort = host + ':' + port;

        // if (this.activeTargetsLookup[hostAndPort]) {
        //     const target = {
        //         host: host,
        //         port: port,
        //     };

        //     this.activeTargets = this.activeTargets.filter(
        //         (currentTarget) => currentTarget.host !== host || currentTarget.port !== port,
        //     );

        //     delete this.activeTargetsLookup[hostAndPort];

        //     // Reactivate after a while
        //     setTimeout(() => {
        //         if (!this.activeTargetsLookup[hostAndPort]) {
        //             this.activeTargets.push(target);
        //             this.activeTargetsLookup[hostAndPort] = 1;
        //         }
        //     }, this.targetDeactivationDuration);
        // }
    }

    private _isTargetActive(
        host: string,
        port: number,
    ) {
        return false;
        // return !!this.activeTargetsLookup[host + ':' + port];
    }

    private _handleQueue() {
        for (const [id, data] of Object.entries(this.sockets)) {
            if (!data) {
                continue;
            }

            const {
                host,
                handling,
            } = data;

            delog({
                text: `deserve kubernetes TCP server LoadBalancer _handleQueue handling ${host}`,
                level: 'trace',
            });

            if (handling) {
                delog({
                    text: `deserve kubernetes TCP server LoadBalancer _handleQueue already handling ${host}`,
                    level: 'trace',
                });
                // Socket is being resolved.
                continue;
            }

            if (!data.host) {
                // check queued time and delete socket if past x seconds

                continue;
            }

            const target = this.targets[host];
            if (!target) {
                // Target has not yet been resolved.
                continue;
            }

            (this.sockets[id] as any).handling = true;
            this._resolveConnection(
                id,
            );
        }
    }

    private _hash(
        str: string,
        maxValue: number,
    ) {
        let ch;
        let hash = 0;

        if (str == null || str.length == 0) {
            return hash;
        }

        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }

        return Math.abs(hash) % maxValue;
    }

    private _random(
        _: string,
        maxValue: number,
    ) {
        return Math.floor(Math.random() * maxValue);
    }

    private _checkTarget(
        host: string,
    ) {
        if (!process.send) {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _checkTarget no process.send ${host}`,
                level: 'warn',
            });
            return;
        }

        delog({
            text: `deserve kubernetes TCP server LoadBalancer _checkTarget for ${host}`,
            level: 'trace',
        });

        process.send({
            type: 'coreCheck',
            data: host,
        });
    }

    private _chooseTarget(
        host: string,
    ) {
        return this.targets[host];

        // const selectorFunction = this.stickiness
        //     ? this._hash
        //     : this._random;

        // const primaryTargetIndex = selectorFunction.call(this, sourceSocket.remoteAddress, this.targets.length);
        // const primaryTarget = this.targets[primaryTargetIndex];
        // if (!primaryTarget) {
        //     return;
        // }
        // if (this.activeTargetsLookup[primaryTarget.host + ':' + primaryTarget.port]) {
        //     return primaryTarget;
        // }

        // // If the primary target isn't active, we need to choose a secondary one
        // const secondaryTargetIndex = selectorFunction.call(this, sourceSocket.remoteAddress, this.activeTargets.length);
        // return this.activeTargets[secondaryTargetIndex];
    }

    private _connectToTarget(
        sourceSocket: net.Socket,
        callback: LoadBalancerConnectToTargetCallback,
        newTargetUri?: LoadBalancerTarget,
    ) {
        const remoteAddress = sourceSocket.remoteAddress;
        if (!remoteAddress) {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _connectToTarget no address`,
                level: 'warn',
            });
            return;
        }

        const activeSession = this._activeSessions[remoteAddress];
        if (!activeSession) {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _connectToTarget no activeSession on address ${remoteAddress}`,
                level: 'warn',
            });
            return;
        }

        if (newTargetUri !== undefined) {
            activeSession.targetUri = newTargetUri;
        }

        // If null, it means that we ran out of targets
        if (activeSession.targetUri == null) {
            callback(new Error('There are no available targets'));
            return;
        }

        const currentTargetUri = activeSession.targetUri;
        const targetSocket = net.createConnection(currentTargetUri.port, currentTargetUri.host);

        const connectionFailed = (
            error: NodeJS.ErrnoException,
        ) => {
            if (error.code == 'ECONNREFUSED') {
                this._deactivateTarget(currentTargetUri.host, currentTargetUri.port);
                targetSocket.removeListener('error', connectionFailed);
                targetSocket.removeListener('connect', connectionSucceeded);

                process.nextTick(() => {
                    const latestActiveSession = this._activeSessions[remoteAddress];
                    let nextTargetUri: LoadBalancerTarget | undefined;

                    // If there is still an active session for the current sourceSocket,
                    // try to connect to a different target
                    if (latestActiveSession) {
                        const lastChosenTargetUri = latestActiveSession.targetUri;

                        // // We need to account for asynchronous cases whereby another connection from the
                        // // same session (same IP address) may have already chosen a new target for the
                        // // session - We need both of these connections to settle on the same target
                        // if (
                        //     lastChosenTargetUri.host === currentTargetUri.host
                        //     && lastChosenTargetUri.port === currentTargetUri.port
                        // ) {
                        //     nextTargetUri = this._chooseTarget(sourceSocket);
                        // } else {
                        //     nextTargetUri = lastChosenTargetUri;
                        // }

                        // this._connectToTarget(sourceSocket, callback, nextTargetUri);
                    }
                });
            } else {
                const errorMessage = error.stack || error.message;
                callback(new Error(`Target connection failed due to error: ${errorMessage}`));
            }
        }

        const connectionSucceeded = () => {
            targetSocket.removeListener('error', connectionFailed);
            targetSocket.removeListener('connect', connectionSucceeded);
            callback(null, targetSocket, currentTargetUri);
        }

        targetSocket.on('error', connectionFailed);
        targetSocket.on('connect', connectionSucceeded);
    }

    private _verifyConnection(
        sourceSocket: net.Socket,
        callback: (
            error: Error | undefined,
            sourceSocket: net.Socket,
        ) => void,
    ) {
        async.applyEachSeries(
            this._middleware[this.MIDDLEWARE_CONNECTION],
            sourceSocket,
            (error: Error | undefined) => {
                if (error) {
                    this.emit('notice', error);
                }

                callback(error, sourceSocket);
            }
        )
    }

    private _handleConnection(
        sourceSocket: net.Socket,
    ) {
        const socketID = uuid.generate();

        const remoteAddress = sourceSocket.remoteAddress;
        delog({
            text: `deserve kubernetes TCP server LoadBalancer _handleConnection for ${remoteAddress}`,
            level: 'trace',
            extradata: JSON.stringify({
                address: sourceSocket.address(),
                localAddress: sourceSocket.localAddress,
            }),
        });
        if (!remoteAddress) {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _handleConnection no address`,
                level: 'warn',
            });
            return;
        }


        this.sockets[socketID] = {
            socket: sourceSocket,
            host: '',
            buffersLength: 0,
            buffers: [],
            queuedAt: Date.now(),
        };


        const bufferSourceData = (
            data: Buffer,
        ) => {
            let cleanData = data;

            const match = cleanData.toString().match(deserveTunnelRE);
            if (match) {
                const host = match[1];
                (this.sockets[socketID] as any).host = host;

                this._checkTarget(host);

                cleanData = Buffer.from(
                    data.toString().replace(`Deserve Tunnel: ${host}`, ''),
                );
            }

            (this.sockets[socketID] as any).buffersLength += cleanData.length;
            (this.sockets[socketID] as any).buffers.push(cleanData);
        };


        sourceSocket.on('data', bufferSourceData);

        sourceSocket.on('error', (error) => {
            this._errorDomain.emit('error', error);
        });



        // const target = this._chooseTarget(host);
        // if (!target) {
        //     this._checkTarget(host);
        //     this.queue.push(sourceSocket);
        //     return;
        // }

        // if (this._activeSessions[remoteAddress]) {
        //     (this._activeSessions[remoteAddress] as LoadBalancerActiveSession).clientCount++;
        //     if (!this.stickiness) {
        //         (this._activeSessions[remoteAddress] as LoadBalancerActiveSession).targetUri = target;
        //     }
        // } else {
        //     this._activeSessions[remoteAddress] = {
        //         targetUri: target,
        //         clientCount: 1,
        //     };
        // }

        // this._sessionExpirer.unexpire([remoteAddress]);

        // sourceSocket.once('close', () => {
        //     const freshActiveSession = this._activeSessions[remoteAddress];

        //     if (freshActiveSession) {
        //         freshActiveSession.clientCount--;
        //         const freshTargetUri = freshActiveSession.targetUri;

        //         // If freshTargetUri is null, then it means that the LoadBalancer could not
        //         // establish a connection to any target
        //         if (freshTargetUri) {
        //             if (freshActiveSession.clientCount < 1) {
        //                 if (this._isTargetActive(freshTargetUri.host, freshTargetUri.port)) {
        //                     this._sessionExpirer.expire([remoteAddress], Math.round(this.sessionExpiry / 1_000));
        //                 } else {
        //                     delete this._activeSessions[remoteAddress];
        //                 }
        //             }
        //         } else {
        //             delete this._activeSessions[remoteAddress];
        //         }
        //     }
        // });

        // this._verifyConnection(sourceSocket, (error: Error | undefined) => {
        //     if (error) {
        //         this._rejectConnection(
        //             sourceSocket,
        //             error,
        //         );
        //     } else {
        //         this._acceptConnection(sourceSocket);
        //     }
        // });
    }

    private _rejectConnection(
        sourceSocket: net.Socket,
        error?: Error | undefined,
    ) {
        sourceSocket.end();
    }

    private _acceptConnection(
        sourceSocket: net.Socket,
    ) {
        const remoteAddress = sourceSocket.remoteAddress;
        if (!remoteAddress) {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _acceptConnection no address`,
                level: 'warn',
            });
            return;
        }

        let sourceBuffersLength = 0;
        let sourceBuffers: Buffer[] = [];

        const bufferSourceData = (
            data: Buffer,
        ) => {
            sourceBuffersLength += data.length;

            if (sourceBuffersLength > this.maxBufferSize) {
                const errorMessage = `sourceBuffers for remoteAddress ${remoteAddress} exceeded maxBufferSize of ${this.maxBufferSize} bytes`;
                this._errorDomain.emit('error', new Error(errorMessage));
            } else {
                sourceBuffers.push(data);
            }
        };

        sourceSocket.on('data', bufferSourceData);

        this._connectToTarget(
            sourceSocket,
            (
                error,
                targetSocket,
                targetUri,
            ) => {
                if (error) {
                    sourceSocket.end();
                    this._errorDomain.emit('error', error);
                } else {
                    if (
                        !targetSocket
                        || !targetUri
                    ) {
                        return;
                    }

                    sourceSocket.removeListener('data', bufferSourceData);

                    targetSocket.on('error', (error) => {
                        this._deactivateTarget(targetUri.host, targetUri.port);
                        sourceSocket.unpipe(targetSocket);
                        targetSocket.unpipe(sourceSocket);
                        this._errorDomain.emit('error', error);
                    });

                    sourceSocket.on('error', (error) => {
                        sourceSocket.unpipe(targetSocket);
                        targetSocket.unpipe(sourceSocket);
                    });
                    sourceSocket.once('close', () => {
                        targetSocket.end();
                    });
                    targetSocket.once('close', () => {
                        sourceSocket.end();
                    });

                    for (var i = 0; i < sourceBuffers.length; i++) {
                        targetSocket.write(sourceBuffers[i]);
                    }
                    sourceBuffers = [];
                    sourceBuffersLength = 0;

                    sourceSocket.pipe(targetSocket);
                    targetSocket.pipe(sourceSocket);
                }
            },
        );
    }

    private _resolveConnection(
        id: string,
    ) {
        delog({
            text: `deserve kubernetes TCP server LoadBalancer _resolveConnection with id ${id}`,
            level: 'trace',
        });

        const socketData = this.sockets[id];
        if (!socketData) {
            return;
        }

        const {
            host,
            socket: sourceSocket,
            buffers,
        } = socketData;

        const target = this.targets[host];
        if (!target) {
            return;
        }

        delog({
            text: `deserve kubernetes TCP server LoadBalancer _resolveConnection for host ${host} with target ${target.host}`,
            level: 'trace',
        });


        // Make the connection to target.
        const targetSocket = net.createConnection(target.port, target.host);

        targetSocket.on('error', (error) => {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _resolveConnection for host ${host} with target ${target.host}, targetSocket error`,
                level: 'error',
                error,
            });

            sourceSocket.unpipe(targetSocket);
            targetSocket.unpipe(sourceSocket);
            this._errorDomain.emit('error', error);
        });

        sourceSocket.on('error', (error) => {
            delog({
                text: `deserve kubernetes TCP server LoadBalancer _resolveConnection for host ${host} with target ${target.host}, sourceSocket error`,
                level: 'error',
                error,
            });

            sourceSocket.unpipe(targetSocket);
            targetSocket.unpipe(sourceSocket);
        });
        sourceSocket.once('close', () => {
            targetSocket.end();
        });
        targetSocket.once('close', () => {
            sourceSocket.end();
            delete this.sockets[id];
        });

        for (var i = 0; i < buffers.length; i++) {
            targetSocket.write(buffers[i]);
        }

        sourceSocket.pipe(targetSocket);
        targetSocket.pipe(sourceSocket);
    }

    private _cleanupSessions() {
        const expiredKeys = this._sessionExpirer.extractExpiredKeys();
        let key;

        for (let i = 0; i < expiredKeys.length; i++) {
            key = expiredKeys[i];
            delete this._activeSessions[key];
        }
    }
}
// #endregion module



// #region exports
export default LoadBalancer;
// #endregion exports
