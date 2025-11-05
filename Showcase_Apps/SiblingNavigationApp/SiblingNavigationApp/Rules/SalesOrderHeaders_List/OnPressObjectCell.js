/**
 * @param {IClientAPI} clientAPI
 */
export default async function OnPressObjectCell(clientAPI) {
    let actionBinding = clientAPI.getPageProxy().getActionBinding();
    actionBinding.Index = clientAPI.getIndex() + 1;
    actionBinding.Total = await clientAPI.count('/SiblingNavigationApp/Services/com_sap_edm_sampleservice_v4.service', 'SalesOrderHeaders');
    clientAPI.getPageProxy().setActionBinding(actionBinding);
    return clientAPI.executeAction('/SiblingNavigationApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action');
}
