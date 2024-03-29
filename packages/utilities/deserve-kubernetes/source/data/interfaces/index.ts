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
        data: LoadBalancerTargets;
    }
    | {
        type: 'destroy';
    };

export type MasterMessage =
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

export type LoadBalancerTargets = Record<string, LoadBalancerTarget | undefined>;


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


export interface SocketData {
    socket: net.Socket;
    host: string;
    buffersLength: number;
    buffers: Buffer[];
    queuedAt: number;
    handling?: boolean;
}



export interface CoreAddress {
    host: string;
    port: number;
}
// #endregion module
