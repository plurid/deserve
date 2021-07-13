// #region module
export const dataToObjectOrDefault = (
    data: string,
) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}


export const stringFromObject = (
    data: any,
) => {
    if (typeof data === 'string') {
        return data;
    }

    return JSON.stringify(data);
}
// #endregion module
