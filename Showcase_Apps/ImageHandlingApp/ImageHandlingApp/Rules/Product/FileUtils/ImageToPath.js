let fs = require('@nativescript/core/file-system');
// This is a helper function to help generate a file name and path based on the 
//	entity object (bindingObject) + the primary key property (keyProperty) and a folder name (imageGroup)

// keyProperty is the name of the property to be used as the filename
// imageGroup is a name that will be used as a folder to keep all related images together
export function imageToPath(bindingObject, keyProperty, imageGroup) {
	let key = bindingObject[keyProperty];
	if (!key) { //If key property has no value, let's fall back to use read link
		var pattern = /.*?lodata_sys_eid=X'(.*?)'\)/i;
		var readLink = bindingObject["@odata.readLink"];
		key = readLink.replace(pattern,'$1');
	}
	// WARNING: CURRENTLY IN THIS SAMPLE WE ARE ASSUMING ALL FILES ARE PNG IMAGES
	// If you support different file types, then you must find a way to identify each files.
	let filename = `${key}.png`;
	var tempDir = fs.knownFolders.documents();
	var returnPath = ''; 
	if (imageGroup !== undefined) {
		if (!fs.Folder.exists(fs.path.join(tempDir.path, imageGroup))) {
			fs.Folder.fromPath(fs.path.join(tempDir.path, imageGroup));
		}
		returnPath = fs.path.join(tempDir.path, imageGroup, filename);
	} else {
		returnPath = fs.path.join(tempDir.path, filename);
	}
	// If the bindingObject[keyProperty] is 123 and your imageGroup is æMyImageGroup'
	// you should end up with something like /Documents/bla/bla/bla/MyImageGroup/123.png
	return returnPath;
}