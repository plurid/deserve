// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Storage,
        StorageDownload,
        StorageDownloadAll,
        StorageUpload,
        StorageObliterate,
        StorageObliterateAll,
        StorageGenerateLocations,
    } from '~server/data/interfaces';

    import {
        QUIET,
        BASE_PATH,

        DATA_OWNERS,
    } from '~server/data/constants';

    import {
        makeDirectorySync,
    } from '~server/utilities/directory';
    // #endregion external
// #endregion imports



// #region module
const ownersPath = path.join(
    BASE_PATH,
    DATA_OWNERS,
);


const loadDataFromFiles = async <T>(
    filespath: string,
): Promise<T[]> => {
    try {
        const files = await fs.readdir(filespath);
        const items: T[] = [];

        for (const file of files) {
            const filepath = path.join(filespath, file);
            const data = await fs.readFile(filepath, 'utf-8');
            const item = JSON.parse(data);
            items.push(item);
        }

        return items;
    } catch (error) {
        return [];
    }
}



const storageDownload: StorageDownload = async (
    filename,
) => {
    try {
        const filepath = path.join(
            BASE_PATH,
            filename,
        );

        const data = await fs.readFile(
            filepath,
        );

        return data.toString('utf-8');
    } catch (error) {
        if (!QUIET) {
            console.log(`[Deserve Error 500] :: Filesystem could not download ${filename}.`);
        }

        return;
    }
}


const storageDownloadAll: StorageDownloadAll = async (
    directory,
) => {
    try {
        const filespath = path.join(
            BASE_PATH,
            directory,
        );

        const items: any[] = await loadDataFromFiles(filespath);

        return items;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Deserve Error 500] :: Filesystem could not download ${directory}.`);
        }

        return [];
    }
}


const storageUpload: StorageUpload = async (
    filename,
    data,
    kind?,
) => {
    try {
        const filepath = path.join(
            BASE_PATH,
            filename,
        );

        const directoryPath = path.dirname(filepath);
        makeDirectorySync(directoryPath);

        if (kind === 'append') {
            return fs.appendFile(
                filepath,
                data,
            );
        }

        await fs.writeFile(
            filepath,
            data,
        );

        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Deserve Error 500] :: Filesystem could not upload ${filename}.`);
        }

        return;
    }
}


const storageObliterate: StorageObliterate = async (
    filename,
) => {
    try {
        const filepath = path.join(
            BASE_PATH,
            filename,
        );

        await fs.unlink(filepath);

        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Deserve Error 500] :: Filesystem could not obliterate ${filename}.`);
        }

        return;
    }
}


const storageObliterateAll: StorageObliterateAll = async (
    pathway,
) => {
    try {
        const filespath = path.join(
            BASE_PATH,
            pathway,
        );

        const files = await fs.readdir(filespath);

        for (const file of files) {
            const filepath = path.join(
                filespath,
                file,
            );

            await fs.rmdir(
                filepath,
                { recursive: true },
            );
        }

        // await fs.rmdir(filespath, {recursive: true});

        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Deserve Error 500] :: Filesystem could not obliterate all ${pathway}.`);
        }

        return;
    }
}


const storageGenerateLocations: StorageGenerateLocations = async () => {
    try {
        const directories = [
            ownersPath,
        ];

        directories.forEach(directory => {
            makeDirectorySync(directory);
        });

        return true;
    } catch (error) {
        if (!QUIET) {
            console.log('[Deserve Error 500] :: Filesystem could not generate locations.');
        }

        return;
    }
}



const filesystemStorage: Storage = {
    download: storageDownload,
    downloadAll: storageDownloadAll,
    upload: storageUpload,
    obliterate: storageObliterate,
    obliterateAll: storageObliterateAll,
    generateLocations: storageGenerateLocations,
};
// #endregion module



// #region exports
export default filesystemStorage;
// #endregion exports
