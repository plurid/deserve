// #region imports
    // #region libraries
    import path from 'path';
    import fsSync, {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries
// #endregion imports



// #region module
export const readDeonFile = async <T = any>(
    filepath: string,
) => {
    try {
        const deon = new Deon();
        const data = await deon.parseFile<T>(
            filepath,
        );

        return data;
    } catch (error) {
        console.log('readDeonFile error', error);

        return;
    }
}


export const writeDeonFile = async <T= any>(
    filepath: string,
    data: T,
) => {
    try {
        const directory = path.dirname(filepath);
        if (!fsSync.existsSync(directory)) {
            fsSync.mkdirSync(
                directory,
                {
                    recursive: true,
                },
            );
        }

        const deon = new Deon();
        const deonString = deon.stringify(data);

        await fs.writeFile(
            filepath,
            deonString,
        );

        return true;
    } catch (error) {
        console.log('writeDeonFile error', error);
        return false;
    }
}
// #endregion module
