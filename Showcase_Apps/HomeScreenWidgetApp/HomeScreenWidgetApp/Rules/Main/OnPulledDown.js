import RefreshWidgetData from "../Widget/RefreshWidgetData";

/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function OnPulledDown(clientAPI) {
    await clientAPI.executeAction('/HomeScreenWidgetApp/Actions/Service/Refresh.action');
    await RefreshWidgetData(clientAPI);
}
