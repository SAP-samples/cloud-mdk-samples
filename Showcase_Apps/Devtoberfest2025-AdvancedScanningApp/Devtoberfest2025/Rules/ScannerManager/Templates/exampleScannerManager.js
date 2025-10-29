// Add Imports For Any Plugins Needed

let _singleton = null

export default class ScannerManager {
    
    // Pass the MDK Context so the class can access the Logger methods
    constructor (mdkContext) {
        if (!mdkContext) {
            throw "Missing MDK Context";
        }

        if (_singleton) {
            return _singleton;
        }

        // Initialize Class Variables
        this._platform = mdkContext.nativescript.platformModule;
        this._application = mdkContext.nativescript.applicationModule;
        this._isInitialized = false;

        // Store the mdkContext
        this._mdkContext = mdkContext;

        // Grab the Logger Reference
        this._logger = mdkContext.getLogger();
        
        // For Android, grab the Android application context
        if (platform.isAndroid) {
            this._appContext = mdkContext.nativescript.utilsModule.ad.getApplicationContext();
        }
        
        _singleton = this;
    }

    // Initialize / Register your scanner and any callbacks 
    InitializeScanner() {
        // Only Initialize if not currently Initialized
        if (!_isInitialized) {
            this._isInitialized = true;
            this._logger.log('Scanner Initialization Complete');
        } else {
            this._logger.log('Scanner Already Initialized','Info');
        }
    }

    // Call this method from your application OnSuspend 
    // to pause scanning while the application is suspended
    OnSuspend() {
        this._logger.log('Scanner Manager: OnSuspend', 'Debug');
        if (this._isInitialized) {
            // Scanner specific code to suspend

            // Set the initialized flag to false
            this._isInitialized = false;
        } else {
            this._logger.log('Scanner Not Initialized');
        } 
    }

    // Call this method from your application OnResume
    // to re-enable the scanner
    OnResume() {
        this._logger.log('Scanner Manager: OnResume', 'Debug');
        if (!this._isInitialized) {
            // Scanner specific code to resume

            // Set the initialized flag to true
            this._isInitialized = true;
        } else {
            this._logger.log('Scanner Already Initialized');
        } 
    }

    // Call this method to return any scanner specific classes
    get Scanner() {
        // return the scanner object if needed
        return null;
    }

    // Call this method to get the current state of the Scanner Manager
    get isScannerInitialized() {
        // return if the scanner is initialized
        return this._isInitialized;        
    }

    // Add any additional methods needed to control the scanner
}