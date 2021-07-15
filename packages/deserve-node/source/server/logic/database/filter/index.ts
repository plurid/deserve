// #region module
export const resolveFilter = (
    filter: string,
    base = 'value',
) => {
    try {
        const parsedFilter = JSON.parse(filter);
        const actualFilter: any = {};
        for (const [key, value] of Object.entries(parsedFilter)) {
            const filterKey = base + '.' + key;
            actualFilter[filterKey] = value;
        }

        return actualFilter;
    } catch (error) {
        return;
    }
}
// #endregion module
