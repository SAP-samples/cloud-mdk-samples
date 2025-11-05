/**
 * @param {IClientAPI} clientAPI
 */
export default function GetCaption(clientAPI) {
    const binding = clientAPI.getPageProxy().binding;
    return `${binding.Index} of ${binding.Total}`;
}
