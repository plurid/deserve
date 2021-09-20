// #region imports
    // #region external
    import {
        ONE_DAY,
    } from '~server/data/constants';

    import {
        DatabaseCollections,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import storage, {
        DESERVE_BLOBS,
    } from '~server/services/storage';

    import docker from '~server/logic/docker';
    // #endregion external
// #endregion imports



// #region module
const obliterableItems: (keyof DatabaseCollections)[] = [
    'blobs',
    'executions',
    'functioners',
    'functions',
    'keys',
    'tokens',
];


const getMarkedForObliteration = async (
    collections: DatabaseCollections,
    type: keyof DatabaseCollections,
    now: number,
) => {
    const obliterationHorizon = now - ONE_DAY * 30;

    const markedItems = await database.getAllWhere<any>(
        collections[type],
        {
            deleted: true,
            deletedAt: {
                $lte: obliterationHorizon,
            },
        },
    );

    return markedItems;
}


const obliterateBlobs = async (
    collections: DatabaseCollections,
    now: number,
) => {
    try {
        const markedBlobs = await getMarkedForObliteration(
            collections,
            'blobs',
            now,
        );

        for (const markedBlob of markedBlobs) {
            await storage.object.obliterate(
                DESERVE_BLOBS,
                markedBlob.id,
            );
        }
    } catch (error) {
        return;
    }
}


const obliterateFunctioners = async (
    collections: DatabaseCollections,
    now: number,
) => {
    try {
        const markedFunctioners = await getMarkedForObliteration(
            collections,
            'functioners',
            now,
        );

        for (const markedFunctioner of markedFunctioners) {
            const image = docker.getImage(markedFunctioner.imageneName);
            image.remove({
                force: true,
            });
        }
    } catch (error) {
        return;
    }
}


const obliterateDatabaseItems = async (
    collections: DatabaseCollections,
    type: keyof DatabaseCollections,
    now: number,
) => {
    try {
        const markedItems = await getMarkedForObliteration(
            collections,
            type,
            now,
        );

        for (const markedItem of markedItems) {
            await database.deleteDocument(
                collections[type],
                markedItem.id,
            );
        }
    } catch (error) {
        return;
    }
}


class Obliterator {
    private interval;
    private collections;


    constructor(
        collections: DatabaseCollections,
    ) {
        this.collections = collections;

        this.obliteration();

        this.interval = setInterval(
            this.obliteration,
            ONE_DAY,
        );
    }


    private async obliteration() {
        const now = Date.now();

        for (const obliterableItem of obliterableItems) {
            if (obliterableItem === 'blobs') {
                await obliterateBlobs(
                    this.collections,
                    now,
                );
            }

            if (obliterableItem === 'functioners') {
                await obliterateFunctioners(
                    this.collections,
                    now,
                );
            }

            await obliterateDatabaseItems(
                this.collections,
                obliterableItem,
                now,
            );
        }
    }
}
// #endregion module



// #region exports
export default Obliterator;
// #endregion exports
