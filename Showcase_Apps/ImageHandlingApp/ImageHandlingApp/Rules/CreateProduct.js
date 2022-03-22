import { ImageSource } from '@nativescript/core/image-source';
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CreateProduct(context) {
	var attachments = context.evaluateTargetPath("#Control:ProductImage/#Value");
	var shouldCompressImage = context.evaluateTargetPath("#Control:CompressImage/#Value");
	if (attachments.length !== 1) {
		var message = attachments.length < 1 ? "Please add 1 product image" : "Max. 1 image allowed for the product";
		return context.executeAction({
			"Name": "/ImageHandlingApp/Actions/Generic/ToastMessage.action",
			"Properties": {
				"Message": message,
				"Duration": 6
			}
		});
	}

	var attachment = attachments[0]; // We'll take only first attachment because each media entity can only store 1 media.
	// Do this only for image files and only if "Reduce Large Image Size" is enabled
	if (shouldCompressImage && attachment.contentType.startsWith("image/")) { 
		// The NativeScript's ImageSource API will scale the image to your specified max dimension size while keeping the aspect ration intact
		// See https://v7.docs.nativescript.org/api-reference/classes/imagesource.html#resize for details
		let maxImageSize = 1024; //This is max size in pixels (not in bytes)
		var platform = context.nativescript.platformModule;
		if (platform.isAndroid) {
			// For Android, we have to concert content which is a byte array to an InputStream first
			var data = new java.io.ByteArrayInputStream(attachment.content);
			var img = ImageSource.fromDataSync(data);
			// Only resize if one of the image's dimension is larger than maxImageSize
			if (img.width > maxImageSize || img.height > maxImageSize) {
				var imgResized = img.resize(maxImageSize, { "filter" : true});
				var scaledBitmap = imgResized.android;
				var outputStream = new java.io.ByteArrayOutputStream();
				//Maybe add check for which type here?
				scaledBitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 0 , outputStream);
				attachment.content = outputStream.toByteArray()
			}
		}
		else {
			// For iOS, just use the content as it's already NSData
			var data = attachment.content; //NSData
			var img = ImageSource.fromDataSync(data);
			// Only resize if one of the image's dimension is larger than maxImageSize
			if (img.width > maxImageSize || img.height > maxImageSize) {
				var imgResized = img.resize(maxImageSize);
				attachment.content = UIImagePNGRepresentation(imgResized.ios)
			}
		}
	}
	return context.executeAction({
		"Name": "/ImageHandlingApp/Actions/Products/CreateProduct.action",
		"Properties": {
			"Media": attachments
		}
	});
}
