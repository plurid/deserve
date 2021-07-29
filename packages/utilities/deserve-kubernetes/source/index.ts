// #region imports
    // #region internal
    import Master from './cluster/Master';
    import Worker from './cluster/Worker';
    // #endregion internal
// #endregion imports



// #region module
const main = () => {
    Master();
    Worker();
}

main();
// #endregion module
