import ScannerManager from './ScannerManager';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ScannerInitialize(context) {
    let logger = context.getLogger();
    logger.log('ScannerInitialize');

    let scanner = new ScannerManager(context);
    scanner.InitializeScanner();
    if (scanner.isScannerInitialized) {
        return context.getPageProxy().executeAction({
            "Name": '/Devtoberfest/Actions/GenericBannerMessage.action',
            "Properties": {
                "Message": "Scanner Initialized",
                "Duration": 3,
                "Semantic": "Positive"
            }
        });
    }
}
