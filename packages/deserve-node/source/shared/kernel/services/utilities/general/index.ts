// #region module
const cleanDomainName = (
    domain: string,
) => {
    return domain.replace(/^https?:\/\//, '');
}
// #endregion module



// #region exports
export {
    cleanDomainName,
};
// #endregion exports
