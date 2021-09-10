let fs = require('@nativescript/core/file-system');
import { imageToPath } from './FileUtils/ImageToPath';

export default async function DownloadOrOpenDocument(sectionedTableProxy) {
	const pageProxy = sectionedTableProxy.getPageProxy();
	const bindingObject = pageProxy.getActionBinding();
	const readLink = bindingObject["@odata.readLink"];
	if (sectionedTableProxy.downloadInProgressForReadLink(readLink)) {
		// Download is in progress, so let's get out.
		return Promise.resolve();
	}
	const serviceName = "/ImageHandlingApp/Services/SampleServiceV2.service";
	const entitySet = 'Products';
	// first we need to decide if the media exists locally or needs to be downloaded
	var mediaIsLocal = await sectionedTableProxy.isMediaLocal(serviceName, entitySet, readLink);
	
	//const tempDir = fs.knownFolders.temp();
	//const filename = bindingObject.FileName;
	//const filename = `${bindingObject["ProductId"]}.png`; //imageToPath(bindingObject, 'ProductId', 'ProductImagesForOpenDoc');
	const attachmentPath = imageToPath(bindingObject, 'ProductId', 'ProductImagesForOpenDoc'); //fs.path.join(tempDir.path, filename);
	const fileExists = fs.File.exists(attachmentPath);
	
	if (mediaIsLocal && fileExists) {
		// the media has been downloaded, we can open it -> the path needs to be provided in the action definition
		// or it should come from binding
		// persist the media data to local sandbox, so we can open it with the document viewer
		pageProxy.setActionBinding({
			'FileName': attachmentPath
		});
		return pageProxy.executeAction("/ImageHandlingApp/Actions/Products/OpenProductImage.action");
	} else if (mediaIsLocal) {
		let pressedItem = pageProxy.getPressedItem();
		let section = sectionedTableProxy.getSections()[0];
		section.setIndicatorState("inProgress", pressedItem);
		return pageProxy.executeAction("/ImageHandlingApp/Actions/Products/DownloadImage.action");
	} 
	else {
		let pressedItem = pageProxy.getPressedItem();
		let section = sectionedTableProxy.getSections()[0];
		section.setIndicatorState("inProgress", pressedItem);
		await sectionedTableProxy.executeAction("/ImageHandlingApp/Actions/Products/DownloadDocumentStreams.action").catch(error => {
			alert("DOWNLOAD STREAM ERROR: " + error);
		});
		pageProxy.setActionBinding(bindingObject);
		return pageProxy.executeAction("/ImageHandlingApp/Actions/Products/DownloadImage.action");
	}
}