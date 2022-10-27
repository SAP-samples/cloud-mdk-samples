/**
 * Reutrns the current logger state On = true, Off = false
 * @param {IClientAPI} context
 */
export default function IsLoggerOn(context) {
    try {
        let logger = context.getLogger();
        let state = logger.isTurnedOn();
        return state;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return false;
    }    
}
