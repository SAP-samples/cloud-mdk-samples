let fs = require('tns-core-modules/file-system');
import { fileExists } from './FileUtils/FileExists';
import { imageToPath } from './FileUtils/ImageToPath';
import { pathToFile } from './FileUtils/PathToFile';
import { writeSync } from './FileUtils/WriteSync';

/**
 * 
 * @param {IClientAPI} context 
 */

export default function GetProductImageStatus(context) {
	let pageProxy = context.getPageProxy();
	var bindingObject;
	
	if (context.binding) {
		bindingObject = context.binding;
	} else if (context.getActionBinding()) {
		bindingObject = context.getActionBinding();
	}
	
	// first we need to decide if the media exists locally or needs to be downloaded
	//const fileName = imageToPath(bindingObject, 'ProductId', 'ProductImagesForOpenDoc');
	const tempDir = fs.knownFolders.temp();
	const fileName = imageToPath(bindingObject, 'ProductId', 'ProductImagesForOpenDoc');
	//const filenameOnly = `${bindingObject["ProductId"]}.png`;
	//const fileName = fs.path.join(tempDir.path, filenameOnly);

	if (fileExists(fileName)) {
		// media is local and can be opened
		// pageProxy.setActionBinding({
		// 	'FileName': fileName,
		// });
		return "open";
	} else {
		return "toDownload";
	}
}