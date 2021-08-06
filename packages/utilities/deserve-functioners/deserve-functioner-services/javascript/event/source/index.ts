const eventToken = process.env.DESERVE_EVENT_TOKEN;



// #region module
/**
 * Emit events (START, ERROR, RESULT, etc).
 */
const event = {
    emit: (
        data: any,
    ) => {
        if (!eventToken) {
            return;
        }
    },
};
// #endregion module



// #region exports
export default event;
// #endregion exports
