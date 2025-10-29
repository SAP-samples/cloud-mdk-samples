/**
 * @param {IClientAPI} clientAPI
 */
export default async function OnPressPreviousNavigationButton(clientAPI) {
    let currentBinding = clientAPI.getPageProxy().binding;
    const newIndex = currentBinding.Index - 1;
    const total = currentBinding.Total;

    let newSalesOrderResult = await clientAPI.read('/SiblingNavigationApp/Services/com_sap_edm_sampleservice_v4.service', 'SalesOrderHeaders', [], `$top=1&$skip=${newIndex}`);
    let newSalesOrder = newSalesOrderResult.getItem(0);
    
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
