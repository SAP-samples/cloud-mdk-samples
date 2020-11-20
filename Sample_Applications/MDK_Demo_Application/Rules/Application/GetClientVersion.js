export default function GetClientVersion(context) {
	let versionInfo = context.getVersionInfo();
	if (versionInfo.hasOwnProperty('Application Version')) {
		return versionInfo['Application Version'];
	}
}