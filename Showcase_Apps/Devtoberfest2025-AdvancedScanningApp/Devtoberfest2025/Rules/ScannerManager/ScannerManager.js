// Add Imports For Any Plugins Needed


let _singleton = null

// Zebra Scanner Manager Class
export default class ScannerManager {
    // Pass the MDK Context so the class can access the Logger methods
    constructor (mdkContext) {
        if (!mdkContext) {
            throw "Missing MDK Context";
        }

        // If the manager class is already initialized just return the previous instance
        if (_singleton) {
            return _singleton;
        }

        // Initialize Class Variables
        this._platform = mdkContext.nativescript.platformModule;
        this._application = mdkContext.nativescript.applicationModule;
        this._isInitialized = false;

        // Assumes that the Data Wedge application has been configured with a profile 
        // for this application bundle and the following intent values
        this._intentName = "com.zebra.hardware.SCANEVENT";
        this._softScanName = "com.symbol.datawedge.api.SOFT_SCAN_TRIGGER";
        this._actionDatawedge = "com.symbol.datawedge.api.ACTION";

        // Store the mdkContext
        this._mdkContext = mdkContext;
        
        // Grab the Logger Reference
        this._logger = mdkContext.getLogger();
        
        // For Android, grab the Android application context
        if (this._platform.isAndroid) {
            this._appContext = mdkContext.nativescript.utilsModule.ad.getApplicationContext();
        }
        
        _singleton = this;
    }

    // Initialize / Register your scanner and any callbacks 
    InitializeScanner() {
        this._logger.log('Scanner Manager: Initialize', 'Debug');
        // Only Initialize if not currently Initialized
        if (!this._isInitialized) {
            // Register Receiver
            this.registerReceiver();
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
            // Unregister the receiver while suspended
            this.unregisterReceiver();
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
            // Register to receive events again
            this.registerReceiver();
            this._isInitialized = true;
        } else {
            this._logger.log('Scanner Already Initialized');
        } 
    }

    // Call this method to turn on the scanner
    // Not all scanners may support software initialization
    StartScan() {
        this._logger.log('Scanner Manager: StartScan', 'Debug');
        
        let startScanIntent = new android.content.Intent();
        startScanIntent.setAction(this._actionDatawedge);
        startScanIntent.putExtra(this._softScanName, "TOGGLE_SCANNING");
        this._appContext.sendBroadcast(startScanIntent);
    }

    // Call this method if there is a need to return a scanner specific reference
    get Scanner() {
        //return this._scanner;
        return null;
    }

    // Call this method to get the current state of the Scanner Manager
    get isScannerInitialized() {
        // return if the scanner is initialized
        return this._isInitialized;        
    }

    // Method to register an Android Broadcast Receiver for Scan Events
    registerReceiver() {
        this._logger.log('Scanner Manager: registerReceiver', 'Debug');
        
        // Callback method that is invoked when a scan event is received
        const scanCallback = (androidContext, intent) => {
            this._logger.log('Scanner Manager: scanCallback', 'Debug');
            // Zebra Specific 
            // Get scanned value
            let scanVal = intent.getStringExtra('com.symbol.datawedge.data_string');
            // Get type of label processed
            let labelType = intent.getStringExtra('com.symbol.datawedge.label_type');
            this._logger.log(`Scan Event Received: ${labelType} - ${scanVal}`,'Debug');
            console.log(`Scan Event Received: ${labelType} - ${scanVal}`);
            
            // Set the MDK custom event type
            let customEventType = 'ScanEvent';
            // Generate an MDK Custom Event Data parameter
            let data = {
                "ScanValue": scanVal,
                "ScanFormat": labelType
            };

            // Grab a reference to the current page since context may be just ClientAPI
            //let pageProxy = this._mdkContext.evaluateTargetPathForAPI('#Page:-Current');
            let pageProxy = this._mdkContext.evaluateTargetPathForAPI(`#Page:${this._mdkContext.currentPage.id}`);
            // Trigger MDK Custom Event with scan data
            pageProxy.executeCustomEvent(customEventType, data);
            this._logger.log('Custom Event Executed', 'Debug');
        };

        // Register the broadcast intent
        if (!this._isInitialized) {
            try {
                this._application.android.unregisterBroadcastReceiver(this._intentName);
                this._application.android.registerBroadcastReceiver(
                    this._intentName,
                    scanCallback
                );
                this._logger.log('Registered Scanner Broadcast Receiver', 'Info');
            } catch (e) {
                // IllegalArgumentException
                this._logger.log(e.printStaceTrace, 'Error');
                e.printStackTrace();
            }
        }
    }

    // Method to unregister an Android Broadcast Receiver for Scan Events
    unregisterReceiver() {
        this._logger.log('Scanner Manager: unregisterReceiver', 'Debug');
        // Unregister the broadcast intent
        if (this._isInitialized) {
            this._application.android.unregisterBroadcastReceiver(this._intentName);
            this._logger.log('Scanner Broadcast Receiver Unregistered', 'Info');
        } else {
            this._logger.log('Scanner not registered','Info');
        }   
    }
}