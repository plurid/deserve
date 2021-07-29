// #region imports
    // #region libraries
    import cluster from 'cluster';
    // #endregion libraries
// #endregion imports



// #region module
const Primary = () => {
    if (!cluster.isPrimary) {
        return;
    }

    // worker code
}
// #endregion module



// #region exports
export default Primary;
// #endregion exports
