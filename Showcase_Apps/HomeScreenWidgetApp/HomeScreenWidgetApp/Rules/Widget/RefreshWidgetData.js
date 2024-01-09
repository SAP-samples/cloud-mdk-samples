/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function RefreshWidgetData(clientAPI) {
    let salesOrdersCount = await clientAPI.count('/HomeScreenWidgetApp/Services/com_sap_edm_sampleservice_v2.service', 'SalesOrderHeaders');
    let platformModule = clientAPI.nativescript.platformModule;

    if (platformModule.isIOS) {
        let defaults = NSUserDefaults.alloc().initWithSuiteName('group.' + NSBundle.mainBundle.bundleIdentifier);
        defaults.setObjectForKey(salesOrdersCount.toString(), 'salesOrdersCount');
        WidgetHelper.refreshWidgetData();
    }
}
