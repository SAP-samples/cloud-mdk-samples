/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function SaveCurrentFilter(context) {
    let sectionTable = context.getPageProxy().getControl('SectionedTable');
    let currentFilter = sectionTable.filters;
    let filterString = context.convertFilterCriteriaArrayToJSONString(currentFilter);

    // If there is a filter set save it to app settings
    if (filterString) {
        let appSettings = context.nativescript.appSettingsModule;
        appSettings.setString('ProductFilter', filterString);
    }
}
