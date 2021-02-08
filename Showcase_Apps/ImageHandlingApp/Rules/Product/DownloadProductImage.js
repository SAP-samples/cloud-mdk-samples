import { fileExists } from './FileUtils/FileExists';
import { imageToPath } from './FileUtils/ImageToPath';
import { pathToFile } from './FileUtils/PathToFile';
import { writeSync } from './FileUtils/WriteSync';

/**
 * 
 * @param {IClientAPI} context 
 */

export default function DownloadOrReturnProductImage(context) {
	let pageProxy = context.getPageProxy();
	var bindingObject = pageProxy.getActionBinding();
	
	if (!bindingObject) {
		alert("Can't get ActionBinding from PageProxy");
		return;
	}
	
	// first we need to decide if the media exists locally or needs to be downloaded
	const fileName = imageToPath(bindingObject, 'ProductId', 'ProductImagesForOpenDoc');

	if (fileExists(fileName)) {
		// media is local and can be opened
		 pageProxy.setActionBinding({
		 	'FileName': fileName,
		 });
		 return context.executeAction("/ProductListApp/Actions/Products/OpenProductImage.action");
	} else {
		pageProxy.setActionBinding(bindingObject);
		return context.executeAction("/ProductListApp/Actions/Products/DownloadProductImage.action").then((result) => {
			// success case
			const file = pathToFile(fileName);
			writeSync(pageProxy, file, result.data);
			section.setIndicatorState("open", pressedItem);
		}, (error) => {
			// error case
			console.log('Error downloading image: ' + error);
			section.setIndicatorState("toDownload", pressedItem);
		});
	}
}