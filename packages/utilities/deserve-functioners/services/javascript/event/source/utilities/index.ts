// #region module
export const stringedDataOrDefault = (
    data: any,
) => {
    if (typeof data === 'undefined') {
        return undefined;
    }

    if (typeof data === 'string') {
        return data;
    }

    return JSON.stringify(
        data,
        (_, value) => typeof value === 'undefined' ? null : value,
    );
}
// #endregion module
