/**
 * @param {IClientAPI} clientAPI
 */
export default async function RefreshWidgetData(clientAPI) {
    let newSalesOrdersCount = await clientAPI.count('/HomeScreenWidgetApp/Services/com_sap_edm_sampleservice_v2.service', 'SalesOrderHeaders', "$filter=LifeCycleStatus eq 'N'");
    let acceptedSalesOrdersCount = await clientAPI.count('/HomeScreenWidgetApp/Services/com_sap_edm_sampleservice_v2.service', 'SalesOrderHeaders', "$filter=LifeCycleStatus eq 'A'");
    let rejectedSalesOrdersCount = await clientAPI.count('/HomeScreenWidgetApp/Services/com_sap_edm_sampleservice_v2.service', 'SalesOrderHeaders', "$filter=LifeCycleStatus eq 'R'");
    let platformModule = clientAPI.nativescript.platformModule;

    if (platformModule.isIOS) {
        let defaults = NSUserDefaults.alloc().initWithSuiteName('group.' + NSBundle.mainBundle.bundleIdentifier);
        defaults.setObjectForKey({ 'New': newSalesOrdersCount.toString(), 'Accepted': acceptedSalesOrdersCount.toString(), 'Rejected': rejectedSalesOrdersCount.toString() }, 'salesOrdersCount');
        WidgetHelper.refreshWidgetData();
    }
}
