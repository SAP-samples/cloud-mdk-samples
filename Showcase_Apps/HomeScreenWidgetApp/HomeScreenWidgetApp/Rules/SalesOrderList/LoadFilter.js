/**
 * @param {IClientAPI} clientAPI
 */
export default function LoadFilter(clientAPI) {
    let appClientData = clientAPI.getAppClientData();
    if (appClientData.hasOwnProperty('SalesOrderListFilter')) {
        let filter = clientAPI.convertJSONStringToFilterCriteriaArray(appClientData.SalesOrderListFilter);

        // Remove SalesOrderListFilter string 
        delete appClientData.SalesOrderListFilter;

        return filter;
    } else {
        // Return no filter
        return;
    }
}
