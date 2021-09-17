// #region module
export const dataOrDefault = (
    value: string,
) => {
    try {
        const data = JSON.parse(value);
        return data;
    } catch (error) {
        return value;
    }
}
// #endregion module
