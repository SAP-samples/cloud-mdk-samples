/**
* @param {IClientAPI} clientAPI
*/
export default function Caption(clientAPI) {
    return clientAPI.formatDate(new Date());
}