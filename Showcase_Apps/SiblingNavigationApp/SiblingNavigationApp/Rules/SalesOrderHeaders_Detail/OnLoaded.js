/**
 * @param {IClientAPI} clientAPI
 */
export default function OnLoaded(clientAPI) {
    alert(JSON.stringify(clientAPI.getPageProxy().binding));
}
