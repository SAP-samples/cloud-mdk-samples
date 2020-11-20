export default function GetUserEmail(context) {
	let appSettings = context.nativescript.appSettingsModule;
	let appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
	if (appSettings.hasKey(`${appId}-UserEmail`)) {
		// If we have already stored the current user info don't fetch it again
		return appSettings.getString(`${appId}-UserEmail`);
	} else {
		return '';
	}
}