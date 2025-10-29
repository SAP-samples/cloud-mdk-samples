/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function EventReceived(context) {
    console.log('Product Page Event Received');

    let logger = context.getLogger();
    logger.log('Product Page Event Received');

    const eventData = context.getAppEventData();
    if (eventData.EventType == 'ScanEvent') {
        let scanVal = eventData.Data.ScanValue;
        let format = eventData.Data.ScanFormat;

        logger.log(`Scan Event Received: ${format} - ${scanVal}`, 'Debug');
        // Set the serach value to the scan value
        let sectionTable = context.getPageProxy().getControl('SectionedTable');
        sectionTable.searchString = scanVal;
    } else {
        logger.log(`Unhandled Event: ${eventData.EventType} - Data: ${JSON.stringify(eventData.Data)}`);
    }
}