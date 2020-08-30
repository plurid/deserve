// #region module
export const getFilterIDs = (
    filterTerms: any[],
    value: string,
) => {
    const filterIDs: string[] = [];

    for (const filterTerm of filterTerms) {
        let added = false;
        for (const filterTermData of filterTerm.data) {
            if (filterTermData.includes(value)) {
                if (!added) {
                    filterIDs.push(filterTerm.id);
                    added = true;
                }
            }
        }
    }

    return filterIDs;
}


export const removeDuplicates = (
    arr: any[],
    prop: string,
) => {
    return arr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

// #endregion module
