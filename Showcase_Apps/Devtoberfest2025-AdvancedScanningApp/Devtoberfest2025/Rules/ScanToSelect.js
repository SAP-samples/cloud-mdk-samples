/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function EventReceived(context) {
    console.log('Customers Page Event Received');

    let logger = context.getLogger();
    logger.log('Customers Page Event Received');
    
    let pageProxy = context.getPageProxy();
    const eventData = context.getAppEventData();
    var filterList = [];
    
    if (eventData.EventType == 'ScanEvent') {
        let scanVal = eventData.Data.ScanValue;
        let format = eventData.Data.ScanFormat;

        if (!isNaN(scanVal)) {
            // Scanned Value is a number so check against the ID as well
            filterList.push(`SupplierID eq ${Number(scanVal)}`);
        }
        filterList.push(`substringof(tolower('${scanVal}'),tolower(SupplierName))`);
        filterList.push(`substringof(tolower('${scanVal}'),tolower(City))`);
        filterList.push(`substringof(tolower('${scanVal}'),tolower(Street))`);

        logger.log(`Scan Event Received: ${format} - ${scanVal}`, 'Debug');
        // Look for a matching suppplier id, name, city, or street and open the detail page if only one record found
        const entitySet = 'Suppliers';
        const serviceName = '/Devtoberfest/Services/SampleServiceV4.service';
        const queryOptions = `$filter=${filterList.join(' or ')}&$expand=PurchaseOrders,Products`;

        return context.read(serviceName, entitySet, [], queryOptions).then(result => {
            if (result && result.length > 0) {
                logger.log(`Found ${result.length} Supplier records matching scan value ${scanVal}`, `Debug`);
                if (result.length == 1) {
                    // Found exactly one match, open the detail page
                    pageProxy.setActionBinding(result.getItem(0));
                    return pageProxy.executeAction('/Devtoberfest/Actions/SampleServiceV4/Suppliers/NavToSuppliers_Detail.action');
                } else {
                    // More than one match display message to the user
                    pageProxy.executeAction({
                        "Name": "/Devtoberfest/Actions/GenericToastMessage.action",
                        "Properties": {
                            "Message": `Multiple Suppliers found matching the scan value (${scanVal}).`
                        }
                    });
                    // Set the serach value to the scan value
                    let sectionTable = context.getPageProxy().getControl('SectionedTable');
                    sectionTable.searchString = scanVal;
                }
            } else {
                return pageProxy.executeAction({
                    "Name": '/Devtoberfest/Actions/GenericToastMessage.action',
                    "Properties": {
                        "Message": `No Supplier found matching '${scanVal}'`
                    }
                });
            }
        });
    } else {
        logger.log(`Unhandled Event: ${eventData.EventType} - Data: ${JSON.stringify(eventData.Data)}`);
    }
}