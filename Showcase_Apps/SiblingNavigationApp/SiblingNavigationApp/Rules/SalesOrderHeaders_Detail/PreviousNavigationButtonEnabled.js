/**
 * @param {IClientAPI} clientAPI
 */
export default function PreviousNavigationButtonEnabled(clientAPI) {
    return clientAPI.getPageProxy().binding.Index > 1;
}
