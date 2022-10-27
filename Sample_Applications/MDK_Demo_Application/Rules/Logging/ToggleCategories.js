/**
 * Show / Hide the Categories picker based on the current log level
 * @param {IClientAPI} context
 */
export default function ToggleCategories(context) {
    try {
        const container = context.getPageProxy().getControl('FormCellContainer');
        const LogLevelListPicker = container.getControl('CategoriesListPicker');
        let logLevel = LogLevelListPicker.getValue()[0].ReturnValue;
        let debugODataProvider = true;
        let tracingEnabled = true;
        let tracingCategories = CategoriesListPicker.getValue().map(function (cat) {
            return cat.ReturnValue;
        });
        if (logLevel != 'Trace') {
            debugODataProvider = false;
            tracingEnabled = false;
            tracingCategories = [];
        }
        context.setDebugSettings(debugODataProvider, tracingEnabled, tracingCategories);
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }    
}
