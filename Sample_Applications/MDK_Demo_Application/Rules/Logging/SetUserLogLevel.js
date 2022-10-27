export default function SetUserLogLevel(context) {
    try {
        if (context.getValue() && context.getValue()[0]) {
            var logger = context.getLogger();
            var loggerLevel = context.getValue()[0].ReturnValue;
            logger.setLevel(loggerLevel)

            const container = context.getPageProxy().getControl('FormCellContainer');
            const CategoriesListPicker = container.getControl('CategoriesListPicker');
            let debugODataProvider = true;
            let tracingEnabled = true;
            let tracingCategories = CategoriesListPicker.getValue().map(function (cat) {
                return cat.ReturnValue;
            });
            if (loggerLevel == 'Trace') {
                CategoriesListPicker.setVisible(true);
                CategoriesListPicker.setEditable(true);
                CategoriesListPicker.redraw();
            } else {
                CategoriesListPicker.setVisible(false);
                CategoriesListPicker.setEditable(false);
                CategoriesListPicker.redraw();
                debugODataProvider = false;
                tracingEnabled = false;
                tracingCategories = [];
            }
            context.setDebugSettings(debugODataProvider, tracingEnabled, tracingCategories);
            return loggerLevel;
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}
