import { FilterType, FilterCriteria } from "mdk-core/controls/IFilterable";

/**
 * @param {IClientAPI} clientAPI
 */
export default function OnLinkDataReceived(clientAPI) {
    let data = JSON.parse(clientAPI.getAppEventData());
    // Check for url path
    if (data.hasOwnProperty('URL') && data.URL === 'widgetdemo/salesorders') {
        // Check for sales order status parameter
        if (data.hasOwnProperty('Parameters') && data.Parameters.hasOwnProperty('status')) {
            let status = data.Parameters.status;
            var filter;
            // Create FilterCriteria
            switch(status) {
                case 'New':
                    filter = new FilterCriteria(FilterType.Filter, 'LifeCycleStatus', 'New', ['N']);
                    break;
                case 'Accepted':
                    filter = new FilterCriteria(FilterType.Filter, 'LifeCycleStatus', 'Accepted', ['A']);
                    break;
                case 'Rejected':
                    filter = new FilterCriteria(FilterType.Filter, 'LifeCycleStatus', 'Rejected', ['R']);
                    break;
            }

            // Store filter as JSON string in Application ClientData
            if (filter) {
                let filterString = clientAPI.convertFilterCriteriaArrayToJSONString([filter]);
                if (filterString) {
                    let appClientData = clientAPI.getAppClientData();
                    appClientData.SalesOrderListFilter = filterString;
                    return clientAPI.executeAction('/HomeScreenWidgetApp/Actions/Navigation/NavToSalesOrderList.action');
                }
            }
        }
    }
}
