// #region imports
    // #region libraries
    import cluster from 'cluster';
    // #endregion libraries
// #endregion imports



// #region module
const Worker = () => {
    if (!cluster.isWorker) {
        return;
    }

    // worker code
}
// #endregion module



// #region exports
export default Worker;
// #endregion exports
