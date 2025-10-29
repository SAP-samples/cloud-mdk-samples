import ScannerManager from './ScannerManager';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function GetScannerInitializationState(context) {
    let logger = context.getLogger();
    logger.log('GetScannerState');

    let scanner = new ScannerManager(context);
    let curState = scanner.isScannerInitialized;

    return curState;
}
