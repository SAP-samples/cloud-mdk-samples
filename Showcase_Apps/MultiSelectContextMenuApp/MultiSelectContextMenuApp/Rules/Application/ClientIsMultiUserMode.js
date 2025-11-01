/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}