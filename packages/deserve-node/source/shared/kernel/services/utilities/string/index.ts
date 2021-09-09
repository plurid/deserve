// #region module
export const urlWithoutProtocol = (
    value: string,
) => {
    return value.replace(/https?:\/\//, '');
}
// #endregion module
