import RefreshWidgetData from "../Widget/RefreshWidgetData";

/**
 * @param {IClientAPI} clientAPI
 */
export default async function OnPressSave(clientAPI) {
    let selectedSalesOrderStatusKey = clientAPI.evaluateTargetPath('#Control:SalesOrderStatusFormCellSegmentedControl/#SelectedValue');
    let selectedSalesOrderStatusName = '';

    switch (selectedSalesOrderStatusKey) {
        case 'A':
            selectedSalesOrderStatusName = 'Accepted';
            break;
        case 'R':
            selectedSalesOrderStatusName = 'Rejected';
            break;
    }

    await clientAPI.executeAction({
        Name: '/HomeScreenWidgetApp/Actions/Service/SalesOrderHeader/UpdateSalesOrderStatus.action',
        Properties: {
            Properties: {
                LifeCycleStatus: selectedSalesOrderStatusKey,
                LifeCycleStatusName: selectedSalesOrderStatusName
            }
        }
    });
    await clientAPI.executeAction('/HomeScreenWidgetApp/Actions/CloseModalPage_Complete.action');
    await RefreshWidgetData(clientAPI);
}
