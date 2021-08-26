// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
export const bluefigRootPath = path.join(
    os.homedir(),
    '.bluefig',
);

export const deserveRootPath = path.join(
    os.homedir(),
    '.deserve',
);
// #endregion module
