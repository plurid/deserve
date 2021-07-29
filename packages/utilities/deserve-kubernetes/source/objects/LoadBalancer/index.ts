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
    // #endregion libraries


    // #region external
    import {
        TCP_PORT,
    } from '~data/constants';
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
    private _middleware: Record<string, any[]> = {};
    private _server;
    private _activeSessions: any;
    private _sessionExpirer;
    private _cleanupInterval: any;

    public MIDDLEWARE_CONNECTION;
    public sourcePort;
    public balancerControllerPath;
    public downgradeToUser;
    public targetDeactivationDuration;
    public sessionExpiry;
    public sessionExpiryInterval;
    public maxBufferSize;
    public stickiness;
    public balancerController: any;

    public targets: any;
    public activeTargets: any;
    public activeTargetsLookup: any;


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

        this.MIDDLEWARE_CONNECTION = 'connection';

        this._middleware[this.MIDDLEWARE_CONNECTION] = [];

        this.sourcePort = TCP_PORT;

        this.balancerControllerPath = options.balancerControllerPath;
        this.downgradeToUser = options.downgradeToUser;
        this.targetDeactivationDuration = options.targetDeactivationDuration || 60_000;
        this.sessionExpiry = options.sessionExpiry || 30_000;
        this.sessionExpiryInterval = options.sessionExpiryInterval || 1_000;
        this.maxBufferSize = options.maxBufferSize || 8192;
        this.stickiness = !!options.stickiness;

        this.setTargets(options.targets);

        this._server = net.createServer(this._handleConnection.bind(this));
        this._errorDomain.add(this._server);

        this._activeSessions = {};
        this._sessionExpirer = new ExpiryManager();

        this._start();
    }


    public addMiddleware(
        type: string,
        middleware: any,
    ) {
        this._middleware[type].push(middleware);
    };

    private _start() {
        if (this.balancerControllerPath) {
            this._errorDomain.run(() => {
                this.balancerController = require(this.balancerControllerPath);
                this.balancerController.run(this);
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
    };

    public close(
        callback: () => void,
    ) {
        this._server.close(callback);
    };

    public setTargets(
        targets: any,
    ) {
        this.targets = targets;
        this.activeTargets = targets;
        this.activeTargetsLookup = {};

        let target;
        for (let i = 0; i < targets.length; i++) {
            target = targets[i];
            this.activeTargetsLookup[target.host + ':' + target.port] = 1;
        }
    };

    public deactivateTarget(
        host: any,
        port: any,
    ) {
        const hostAndPort = host + ':' + port;

        if (this.activeTargetsLookup[hostAndPort]) {
            const target = {
                host: host,
                port: port,
            };

            this.activeTargets = this.activeTargets.filter((currentTarget: any) => {
                return currentTarget.host != host || currentTarget.port != port;
            });

            delete this.activeTargetsLookup[hostAndPort];

            // Reactivate after a while
            setTimeout(() => {
                if (!this.activeTargetsLookup[hostAndPort]) {
                    this.activeTargets.push(target);
                    this.activeTargetsLookup[hostAndPort] = 1;
                }
            }, this.targetDeactivationDuration);
        }
    };

    public isTargetActive(
        host: any,
        port: any,
    ) {
        return !!this.activeTargetsLookup[host + ':' + port];
    };

    public _hash(
        str: any,
        maxValue: any,
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
    };

    private _random(
        str: any,
        maxValue: any,
    ) {
        return Math.floor(Math.random() * maxValue);
    };

    private _chooseTarget(
        sourceSocket: any,
    ) {
        const selectorFunction = this.stickiness
            ? this._hash
            : this._random;

        const primaryTargetIndex = selectorFunction.call(this, sourceSocket.remoteAddress, this.targets.length);
        const primaryTarget = this.targets[primaryTargetIndex];
        if (this.activeTargetsLookup[primaryTarget.host + ':' + primaryTarget.port]) {
            return primaryTarget;
        }

        // If the primary target isn't active, we need to choose a secondary one
        const secondaryTargetIndex = selectorFunction.call(this, sourceSocket.remoteAddress, this.activeTargets.length);
        return this.activeTargets[secondaryTargetIndex];
    };

    private _connectToTarget(
        sourceSocket: any,
        callback: any,
        newTargetUri?: any,
    ) {
        const remoteAddress = sourceSocket.remoteAddress;
        const activeSession = this._activeSessions[remoteAddress];

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
                this.deactivateTarget(currentTargetUri.host, currentTargetUri.port);
                targetSocket.removeListener('error', connectionFailed);
                targetSocket.removeListener('connect', connectionSucceeded);

                process.nextTick(() => {
                    var latestActiveSession = this._activeSessions[remoteAddress];
                    var nextTargetUri;

                    // If there is still an active session for the current sourceSocket,
                    // try to connect to a different target
                    if (latestActiveSession) {
                        var lastChosenTargetUri = latestActiveSession.targetUri;

                        // We need to account for asynchronous cases whereby another connection from the
                        // same session (same IP address) may have already chosen a new target for the
                        // session - We need both of these connections to settle on the same target
                        if (lastChosenTargetUri.host == currentTargetUri.host &&
                            lastChosenTargetUri.port == currentTargetUri.port) {

                            nextTargetUri = this._chooseTarget(sourceSocket);
                        } else {
                            nextTargetUri = lastChosenTargetUri;
                        }

                        this._connectToTarget(sourceSocket, callback, nextTargetUri || null);
                    }
                });
            } else {
                const errorMessage = error.stack || error.message;
                callback(`Target connection failed due to error: ${errorMessage}`);
            }
        }

        const connectionSucceeded = () => {
            targetSocket.removeListener('error', connectionFailed);
            targetSocket.removeListener('connect', connectionSucceeded);
            callback(null, targetSocket, currentTargetUri);
        }

        targetSocket.on('error', connectionFailed);
        targetSocket.on('connect', connectionSucceeded);
    };

    private _verifyConnection(
        sourceSocket: any,
        callback: any,
    ) {
        async.applyEachSeries(
            this._middleware[this.MIDDLEWARE_CONNECTION],
            sourceSocket,
            (error: any) => {
                if (error) {
                    this.emit('notice', error);
                }

                callback(error, sourceSocket);
            }
        )
    };

    private _handleConnection(
        sourceSocket: any,
    ) {
        const remoteAddress = sourceSocket.remoteAddress;

        sourceSocket.on('error', (err: any) => {
            this._errorDomain.emit('error', err);
        });

        if (this._activeSessions[remoteAddress]) {
            this._activeSessions[remoteAddress].clientCount++;
            if (!this.stickiness) {
                this._activeSessions[remoteAddress].targetUri = this._chooseTarget(sourceSocket);
            }
        } else {
            this._activeSessions[remoteAddress] = {
                targetUri: this._chooseTarget(sourceSocket),
                clientCount: 1
            };
        }

        this._sessionExpirer.unexpire([remoteAddress]);

        sourceSocket.once('close', () => {
            const freshActiveSession = this._activeSessions[remoteAddress];

            if (freshActiveSession) {
                freshActiveSession.clientCount--;
                const freshTargetUri = freshActiveSession.targetUri;

                // If freshTargetUri is null, then it means that the LoadBalancer could not
                // establish a connection to any target
                if (freshTargetUri) {
                    if (freshActiveSession.clientCount < 1) {
                        if (this.isTargetActive(freshTargetUri.host, freshTargetUri.port)) {
                            this._sessionExpirer.expire([remoteAddress], Math.round(this.sessionExpiry / 1_000));
                        } else {
                            delete this._activeSessions[remoteAddress];
                        }
                    }
                } else {
                    delete this._activeSessions[remoteAddress];
                }
            }
        });

        this._verifyConnection(sourceSocket, (err: any) => {
            if (err) {
                this._rejectConnection(
                    sourceSocket,
                    err,
                );
            } else {
                this._acceptConnection(sourceSocket);
            }
        });
    };

    private _rejectConnection(
        sourceSocket: any,
        error?: any,
    ) {
        sourceSocket.end();
    };

    private _acceptConnection(
        sourceSocket: any,
    ) {
        const remoteAddress = sourceSocket.remoteAddress;
        let sourceBuffersLength = 0;
        let sourceBuffers: any[] = [];

        const bufferSourceData = (
            data: any,
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
                err: any,
                targetSocket: any,
                targetUri: any,
            ) => {
                if (err) {
                    sourceSocket.end();
                    this._errorDomain.emit('error', err);
                } else {
                    sourceSocket.removeListener('data', bufferSourceData);

                    targetSocket.on('error', (err: any) => {
                        this.deactivateTarget(targetUri.host, targetUri.port);
                        sourceSocket.unpipe(targetSocket);
                        targetSocket.unpipe(sourceSocket);
                        this._errorDomain.emit('error', err);
                    });

                    sourceSocket.on('error', (err: any) => {
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
    };

    private _cleanupSessions() {
        const expiredKeys = this._sessionExpirer.extractExpiredKeys();
        let key;

        for (let i = 0; i < expiredKeys.length; i++) {
            key = expiredKeys[i];
            delete this._activeSessions[key];
        }
    };
}
// #endregion module



// #region exports
export default LoadBalancer;
// #endregion exports
