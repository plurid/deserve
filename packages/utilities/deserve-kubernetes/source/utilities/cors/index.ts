// #region module
const corsOptions = {
    credentials: true,
    origin: (_: any, callback: any) => {
        return callback(null, true);
    },
}
// #endregion module



// #region exports
export default corsOptions;
// #endregion exports
