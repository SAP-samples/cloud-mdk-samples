export default function GetUserFullName(context) {
	let appSettings = context.nativescript.appSettingsModule;
	let appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
	if (appSettings.hasKey(`${appId}-UserFullName`)) {
		// If we have already stored the current user info don't fetch it again
		return appSettings.getString(`${appId}-UserFullName`);
	} else {
		return '';
	}
}