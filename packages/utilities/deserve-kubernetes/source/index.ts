// #region imports
    // #region internal
    import Primary from './cluster/Primary';
    import Worker from './cluster/Worker';
    // #endregion internal
// #endregion imports



// #region module
const main = () => {
    Primary();
    Worker();
}

main();
// #endregion module
