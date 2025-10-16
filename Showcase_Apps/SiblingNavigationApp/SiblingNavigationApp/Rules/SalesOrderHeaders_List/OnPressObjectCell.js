/**
 * @param {IClientAPI} clientAPI
 */
export default function OnPressObjectCell(clientAPI) {
    let actionBinding = clientAPI.getPageProxy().getActionBinding();
    actionBinding.Index = clientAPI.getIndex() + 1;
    actionBinding.Total = clientAPI.getPageProxy().evaluateTargetPathForAPI('#Page:-Current/#Control:SectionedTable').getSections()[0].binding.length;
    clientAPI.getPageProxy().setActionBinding(actionBinding);
    return clientAPI.executeAction('/SiblingNavigationApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action');
}
