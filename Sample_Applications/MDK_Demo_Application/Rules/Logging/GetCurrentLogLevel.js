/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function GetCurrentLogLevel(context) {
    try {
        let logger = context.getLogger();
        let level = logger.getLevel();
        return level;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}
