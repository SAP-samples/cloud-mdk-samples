import ScannerManager from './ScannerManager';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ScannerStartScanning(context) {
    let logger = context.getLogger();
    logger.log('Scanner Start Scanning');

    let scanner = new ScannerManager(context);
    scanner.StartScan();
}
