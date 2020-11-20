export default function GetClientSupportVersions(context) {
	let versionInfo = context.getVersionInfo();
	let versionStr = '';
	Object.keys(versionInfo).forEach(function(key,index) {
	    // key: the name of the object key
	    // index: the ordinal position of the key within the object
	    console.log(`Key: ${key}   Index: ${index}`);
	    if (key != 'Application Version') {
	    	versionStr += `${key}: ${versionInfo[key]}\n`;
	    }
	});
	return versionStr;
}