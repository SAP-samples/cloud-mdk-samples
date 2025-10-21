import ScannerManager from './ScannerManager';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ScannerOnResume(context) {
    let logger = context.getLogger();
    logger.log('ScannerOnResume');

    let scanner = new ScannerManager(context);
    scanner.OnResume();
}
