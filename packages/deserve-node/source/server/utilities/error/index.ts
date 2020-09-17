// #region module
export const replaceErrors = (
    key: string,
    value: any,
) => {
    if (value instanceof Error) {
        const error: any = {};

        Object.getOwnPropertyNames(value).forEach((key) => {
            error[key] = (value as any)[key];
        });

        return error;
    }

    return value;
}


export const stringifyError = (
    error: Error,
) => {
    return JSON.stringify(
        error,
        replaceErrors,
    );
}
// #endregion module
