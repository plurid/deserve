// #region module
const generateLog = (
    type: string,
    state: string,
    method: string,
    usage?: string,
) => {
    const usageString = usage
        ? ` · ${usage}`
        : '';

    const log = `[Performer ${type} : ${state}] :: ${method}` + usageString;

    return log;
}


const generateMethodLogs = (
    method: string,
) => {
    return {
        infoStart: generateLog('Info', 'Start', method),
        infoSuccess: generateLog('Info', 'Success', method),
        infoEnd: generateLog('Info', 'End', method),

        errorEnd: generateLog('Error', 'End', method),

        infoHandlePrivateUsage: generateLog('Info', 'Handle', method, 'privateUsage'),
        infoEndPrivateUsage: generateLog('Info', 'End', method, 'privateUsage'),
        infoSuccessPrivateUsage: generateLog('Info', 'Success', method, 'privateUsage'),

        infoHandleCustomLogicUsage: generateLog('Info', 'Handle', method, 'customLogicUsage'),
        infoEndCustomLogicUsage: generateLog('Info', 'End', method, 'customLogicUsage'),
        infoSuccessCustomLogicUsage: generateLog('Info', 'Success', method, 'customLogicUsage'),
    };
}
// #endregion module



// #region exports
export {
    generateLog,
    generateMethodLogs,
};
// #endregion exports
