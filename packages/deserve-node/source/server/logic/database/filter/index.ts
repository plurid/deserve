// #region module
export const resolveFilter = (
    filter: string,
) => {
    try {
        const parsedFilter = JSON.parse(filter);
        const actualFilter: any = {};
        for (const [key, value] of Object.entries(parsedFilter)) {
            const filterKey = 'value.' + key;
            actualFilter[filterKey] = value;
        }

        return actualFilter;
    } catch (error) {
        return;
    }
}
// #endregion module
