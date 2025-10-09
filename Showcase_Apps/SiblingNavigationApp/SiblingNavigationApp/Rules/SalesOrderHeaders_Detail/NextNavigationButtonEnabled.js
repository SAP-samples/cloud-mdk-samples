/**
 * @param {IClientAPI} clientAPI
 */
export default function NextNavigationButtonEnabled(clientAPI) {
    return clientAPI.getPageProxy().binding.Index < clientAPI.getPageProxy().binding.Total;
}
