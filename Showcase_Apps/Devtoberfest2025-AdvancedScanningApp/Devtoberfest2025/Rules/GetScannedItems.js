/**
* Retrieve scanned items from client data
* @param {IClientAPI} clientAPI
* @returns {Array} ScannedItems
*/
export default function GetScannedItems(clientAPI) {
    const scannedItems = clientAPI.getAppClientData().ScannedItems || [];
    const searchString = clientAPI.searchString;
    
    let filteredItems = scannedItems;

    if (searchString) {
        const lowerCaseSearchString = searchString.toLowerCase();
        filteredItems = scannedItems.filter(item => 
            item.Name.toLowerCase().includes(lowerCaseSearchString) ||
            item.Category.toLowerCase().includes(lowerCaseSearchString) ||
            item.Supplier.toLowerCase().includes(lowerCaseSearchString)
        );
    }

    return filteredItems.sort((a, b) => new Date(b.LastScanned) - new Date(a.LastScanned));
}