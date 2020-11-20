import StoreUserInfo from '../User/StoreUserInfo';

export default function InitializeApplication(context) {
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId, mainPage, mainPageName;
    // Store the main page of the application into app settings to be able to retrieve client data from the main page later
    try {
        if (platform && (platform.isIOS || platform.isAndroid)) {
            appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
        } else {
            appId = 'WindowsClient';
        } 
        mainPageName = '/MDKDemoApp/Pages/Dashboard/Dashboard_ImgPromos.page';
        appSettings.setString(`${appId}-MainPage`, mainPageName);
    } catch (err) {
        console.log('ERROR: Failure getting AppId');
    }    
    // Grab the user information and store it in app settings
	return StoreUserInfo(context).then(result => {
        // Initialize the data store
		return context.executeAction('/MDKDemoApp/Actions/Service/Initialize.action');
	});
}