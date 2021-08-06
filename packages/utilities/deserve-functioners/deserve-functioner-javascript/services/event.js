const eventToken = process.env.DESERVE_EVENT_TOKEN;


/**
 * Emit events (START, ERROR, RESULT, etc).
 */
const event = {
    emit: (
        data,
    ) => {
        if (!eventToken) {
            return;
        }
    },
};



module.exports = {
    event,
};
