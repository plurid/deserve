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

export const bluefigDataFile = path.join(
    bluefigRootPath,
    'data.deon',
);


export const deserverRootPath = path.join(
    os.homedir(),
    '.deserver',
);

export const deserverDataFile = path.join(
    deserverRootPath,
    'data.deon',
);


export const deserveRootPath = path.join(
    os.homedir(),
    '.deserve',
);

export const deserveDataFile = path.join(
    deserveRootPath,
    'data.deon',
);
// #endregion module
