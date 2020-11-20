export default function ResetAppSettingsAndLogout(context) {
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0,appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch(err) {
        console.log(`ERROR: AppSettings cleanup failure - ${err}`);
    } finally {
        // Logout
        return context.getPageProxy().executeAction('/MDKDemoApp/Actions/Logout.action');
    }
}