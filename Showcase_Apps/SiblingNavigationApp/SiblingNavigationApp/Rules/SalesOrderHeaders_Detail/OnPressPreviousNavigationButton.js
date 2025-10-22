/**
 * @param {IClientAPI} clientAPI
 */
export default function OnPressPreviousNavigationButton(clientAPI) {
    let currentBinding = clientAPI.getPageProxy().binding;
    const newIndex = currentBinding.Index - 1;
    const total = currentBinding.Total;

    let newSalesOrder = clientAPI.getPageProxy().evaluateTargetPathForAPI('#Page:-Previous/#Control:SectionedTable').getSections()[0].binding.getItem(newIndex - 1);
    newSalesOrder.Index = newIndex;
    newSalesOrder.Total = total;

    clientAPI.getPageProxy().setActionBinding(newSalesOrder);
    return clientAPI.executeAction({
        Name: '/SiblingNavigationApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action',
        Properties: {
            BackStackVisible: false,
            Transition: {
                Name: 'SlideRight'
            }
        }
    });
}
