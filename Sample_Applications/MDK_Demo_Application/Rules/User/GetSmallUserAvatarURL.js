import { GetAvatarURL } from '../GetAvatarURL';

export default function GetSmallUserAvatarURL(context) {
	let appSettings = context.nativescript.appSettingsModule;
	let platform = context.nativescript.platformModule;
	let appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
	let name = appSettings.getString(`${appId}-UserFullName`);
	
	return GetAvatarURL(context, name, 'hash', 'small');
}