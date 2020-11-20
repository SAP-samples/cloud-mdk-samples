export default function SetUserLogLevel(context) {
    try {
        if (context.getValue() && context.getValue()[0]) {
            var logger = context.getLogger();
            var listPickerValue = context.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}
