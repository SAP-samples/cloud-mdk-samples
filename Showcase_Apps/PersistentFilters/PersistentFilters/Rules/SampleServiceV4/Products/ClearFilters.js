/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ClearFilters(context) {
    let appSettings = context.nativescript.appSettingsModule;
    if (appSettings.hasKey('ProductFilter')) {
        appSettings.remove('ProductFilter');
    }
    context.getPageProxy().executeAction('/PersistentFilters/Actions/SampleServiceV4/Products/FiltersClearedMessage.action');
}
