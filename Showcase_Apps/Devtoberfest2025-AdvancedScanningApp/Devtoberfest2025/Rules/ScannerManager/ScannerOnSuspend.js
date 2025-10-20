import ScannerManager from './ScannerManager';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function ScannerOnSuspend(context) {
    let logger = context.getLogger();
    logger.log('ScannerOnSuspend');

    let scanner = new ScannerManager(context);
    scanner.OnSuspend();    
}
