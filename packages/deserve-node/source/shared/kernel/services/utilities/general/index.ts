// #region module
const cleanDomainName = (
    domain: string,
) => {
    return domain.replace(/^https?:\/\//, '');
}


const formatJSON = (
    data: string,
) => {
    try {
        const parsed = JSON.parse(data);

        return JSON.stringify(parsed, null, 4);
    } catch (error) {
        return data;
    }
}
// #endregion module



// #region exports
export {
    cleanDomainName,
    formatJSON,
};
// #endregion exports
