/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function LoadFilter(context) {
    let appSettings = context.nativescript.appSettingsModule;
    if (appSettings.hasKey('ProductFilter')) {
        // Saved Product Filter exists so set it as the default for the list
        let filterString = appSettings.getString('ProductFilter');
        let currentFilter = context.convertJSONStringToFilterCriteriaArray(filterString);

        return currentFilter;
    } else {
        // No saved filter so just return
        return;
    }
}
