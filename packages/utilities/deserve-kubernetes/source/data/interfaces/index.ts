// #region imports
    // #region libraries
    import net from 'net';
    // #endregion libraries
// #endregion imports



// #region module
export type WorkerMessage =
    | {
        type: 'initialize';
        data: any;
    }
    | {
        type: 'updateTargets';
        data: LoadBalancerTarget[];
    }
    | {
        type: 'destroy';
    };

export type PrimaryMessage =
    | {
        type: 'coreCheck';
        data: string;
    };


export type LoadBalancerMiddleware = (
    socket: net.Socket,
    next: () => void,
) => void;

export interface LoadBalancerTarget {
    host: string;
    port: number;
}

export interface LoadBalancerActiveSession {
    targetUri: LoadBalancerTarget;
    clientCount: number;
}

export type LoadBalancerConnectToTargetCallback = (
    error?: Error | null,
    targetSocket?: net.Socket,
    targetUri?: LoadBalancerTarget,
) => void;

export type LoadBalancerController<T> = {
    run: (balancer: T) => void,
}
// #endregion module
