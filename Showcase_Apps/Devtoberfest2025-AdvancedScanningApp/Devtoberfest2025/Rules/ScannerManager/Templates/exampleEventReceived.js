/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function EventReceived(context) {
    let logger = context.getLogger();
    logger.log('Event Received');

    const eventData = context.getAppEventData();
    if (eventData.EventType == 'ScanEvent') {
        let scanVal = eventData.Data.ScanValue;
        let format = eventData.Data.ScanFormat;

        logger.log(`Scan Event Received: ${format} - ${scanVal}`, 'Debug');
        // Do something with the scan value here. For example,
        // - Insert into a table
        // - Set as search string
        // - Populate an input field
    } else {
        logger.log(`Unhandled Event: ${eventData.EventType} - Data: ${JSON.stringify(eventData.Data)}`);
    }
}