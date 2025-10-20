/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ClearScannedItems(context) {
    let appData = context.getAppClientData();
    appData.ScannedItems = [];
    let logger = context.getLogger();
    logger.log(`Cleared Scanned Items`, 'Info');
    return context.getPageProxy().executeAction({
        "Name": "/Devtoberfest/Actions/GenericToastMessage.action",
        "Properties": {
            "Message": "Cleared Scanned Items"
        }
    });
}
