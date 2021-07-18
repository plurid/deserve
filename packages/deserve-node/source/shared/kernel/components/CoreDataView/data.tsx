// #region imports
    // #region libraries
    import React from 'react';
    // #endregion libraries
// #endregion imports



// #region module
export type DataView = 'BLOBS' | 'KEYS';

export const dataViewing: {
    blobs: 'BLOBS';
    keys: 'KEYS';
} = {
    blobs: 'BLOBS',
    keys: 'KEYS',
};


export const blobsHeader = (
    <>
        <div>
            id
        </div>

        <div>
            stored at
        </div>

        <div>
            type
        </div>

        <div>
            size
        </div>

        <div>
            metadata
        </div>

        <div>
            obliterate
        </div>
    </>
);

export const keysHeader = (
    <>
        <div>
            id
        </div>

        <div>
            stored at
        </div>

        <div>
            updated at
        </div>

        <div>
            value
        </div>

        <div>
            obliterate
        </div>
    </>
);
// #endregion module
