export default function versionString(context) {
	var versionInfo = context.getVersionInfo();
	let ver = null;
	  if (versionInfo.hasOwnProperty('Application Version')) {
		  ver = 'v' + versionInfo['Application Version'];
	}
	return ver;
  }