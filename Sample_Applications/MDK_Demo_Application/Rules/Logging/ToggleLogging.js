export default function ToggleLogging(context) {
    try {
        var logger = context.getLogger();
        const container = context.getPageProxy().getControl('FormCellContainer');
        const enableLogSwitch = container.getControl('EnableLogSwitch');
        const logLevelListPicker = container.getControl('LogLevelListPicker');

        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}