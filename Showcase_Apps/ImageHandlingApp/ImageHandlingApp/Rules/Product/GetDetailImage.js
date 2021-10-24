import { fileExists } from './FileUtils/FileExists';
import { imageToPath } from './FileUtils/ImageToPath';
import { pathToFile } from './FileUtils/PathToFile';
import { writeSync } from './FileUtils/WriteSync';

export default async function GetDetailImage(context, folderName) {
	let pageProxy = context.getPageProxy();
	let prod = context.binding;
	console.log(prod.ProductId);
	console.log(prod["@odata.readLink"]);

	let targetFolderName = folderName ? folderName : 'ProductImages';
	
	//Get the filename based on the ProductId's value
	const fileName = imageToPath(prod, 'ProductId', targetFolderName);
	if (fileExists(fileName)) {
		//If the file exist, just return the file name
		return fileName;
	}
	else {
		return context.executeAction({
			"Name": "/ImageHandlingApp/Actions/Products/DownloadProductImage.action",
			"Properties": {
				"Target": {
					"ReadLink": prod["@odata.readLink"]
				}
			}
		}).then(result => {
			if (result && result.data) {
				console.log("Downloaded: " + fileName);
				const file = pathToFile(fileName);
				console.log("Downloaded data: " + result.data);
				writeSync(this, file, result.data);
				return fileName;
			}
			else {
				//This shouldn't really happen unless something is wrong with the data.
				console.log("NO DATA!!!!!!!");
			}
		});
	}
	//Otherwise you can maybe return a placeholder image path, if you wish
	
}