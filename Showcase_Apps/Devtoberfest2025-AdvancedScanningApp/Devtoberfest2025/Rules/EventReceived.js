/**
* Describe this function...
* @param {IClientAPI} context
*/
export default async function EventReceived(context) {
    console.log('Scanner Test Event Received');

    let logger = context.getLogger();
    logger.log('Scanner Test Event Received');
    
    const eventData = context.getAppEventData();
    if (eventData.EventType == 'ScanEvent') {
        let scanVal = eventData.Data.ScanValue;
        let format = eventData.Data.ScanFormat;

        logger.log(`Scan Event Received: ${format} - ${scanVal}`, 'Debug');
        // Store / Update the Scan Value list / table
        let appData = context.getPageProxy().getAppClientData();
        let scanList = [];
        // See if we already have a scanned value
        if (appData.ScannedItems) {
            scanList = appData.ScannedItems;
        }
        // Check if the value already exists
        let existing = scanList.find(item => item.ID == scanVal);
        if (existing != undefined) {
            existing.ScanQty += 1;
            existing.LastScanned = new Date().toISOString();
        } else {
            // New Product found, add to the list
            let product = await context.read('/Devtoberfest/Services/SampleServiceV4.service','Products',[],`$expand=Stock,Supplier&$filter=ProductID eq ${scanVal}`);
            if (product && product.length == 1) {
                let prod = product.getItem(0);
                let newItem = {
                    "ID": scanVal,
                    "Name": prod.Name,
                    "Category": prod.CategoryName,
                    "Supplier": prod.Supplier.Name,
                    "ExpectedStock": prod.Stock.Quantity,
                    "ScanQty": 1,
                    "LastScanned": new Date().toISOString()
                }
                scanList.push(newItem);
                
            } else {
                // No Product found matching the scan value
                context.getPageProxy().executeAction({
                    "Name": "/Devtoberfest/Actions/GenericBannerMessage.action",
                    "Properties": {
                        "Message": `No Product found matching scan value ${scanVal}`,
                        "Semantic": "Negative",
                        "Duration": "2"
                    }
                });
            }
        }
        // Save the updated list
        appData.ScannedItems = scanList;

        // Redraw the scan list
        let scanTable = context.getPageProxy().getControl('SectionedTable0');
        scanTable.redraw();
    } else {
        logger.log(`Unhandled Event: ${eventData.EventType} - Data: ${JSON.stringify(eventData.Data)}`);
    }
}