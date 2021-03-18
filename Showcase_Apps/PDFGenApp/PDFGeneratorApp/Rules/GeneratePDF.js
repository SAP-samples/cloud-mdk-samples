import * as pdfMake from "pdfmake/build/pdfmake";
import * as fs from 'tns-core-modules/file-system';
import { isAndroid } from "tns-core-modules/platform";
//data.json is taken from the github sample from the tutorial:
// https://github.com/kumarandena/nativescript-pdf-generation/
// It contains base64 of the fonts
// This is meant as example only.
import dataJson from "./data.json";

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function GenerateQRCode(context) {
	// This is helper function to convert data buffer to native byte array
	let _bufferToNativeArray = function (byteArray) {
		let array;

		if (isAndroid) {
			array = Array.create("byte", byteArray.byteLength);
			for (let i = 0; i < byteArray.length; i++) {
				array[i] = new java.lang.Byte(byteArray[i]);
			}
		} else {
			array = NSData.dataWithBytesLength(byteArray, byteArray.byteLength);
		}
		return array;
	}

	// This is where you define the content of the PDF
	var docDefinition = {
		pageOrientation: 'landscape',

		content: [
				{ text: 'Certificate', fontSize: '25', italics: true, alignment: 'center' },
				{ text: 'of', fontSize: '25', italics: true, alignment: 'center' },
				{ text: '\nTRAINING COMPLETION', fontSize: '30', alignment: 'center' },
				{ text: '\n\nThis certifies that', fontSize: '18', alignment: 'center' },
				{ text: '\n' + "John Doe", fontSize: '30', alignment: 'center' },
				{ text: '\nhas successfully completed the training in', fontSize: '18', alignment: 'center' },
				{ text: '\n' + "Computer Science", fontSize: '30', alignment: 'center' },
				{ text: '\nOn ' + "16th Feb 2021" + '\n\n', fontSize: '18', alignment: 'center' },
				{
						columns: [
								{
										width: 150,
										text: ''
								},
								{
										image: dataJson.images['nscripting'],
										width: 100
								},
								{},
								{
										image: dataJson.images['nslogojpeg'],
										width: 80
								}
						]
				},
				{
						"canvas": [{
								"type": "line",
								"x1": 400,
								"y1": 0,
								"x2": 0,
								"y2": 0,
								"lineWidth": 0.5,
								"lineColor": "#000000"
						}]
				}
		]
	};
	
	// Now use the PDFMake to create PDF data
	pdfMake.createPdf(docDefinition, '', '', dataJson.fonts)
		.getBuffer((data) => {
			//Convert the data buffer to native data array 
			let nativeData = _bufferToNativeArray(data);
			
			//Now prepare to save the data to a file
			let filename = "generated.pdf";
			var tempDir = fs.knownFolders.documents();
			var folder = "PDFFiles";
			if (!fs.Folder.exists(fs.path.join(tempDir.path, folder))) {
				fs.Folder.fromPath(fs.path.join(tempDir.path, folder));
			}
			var filePath = fs.path.join(tempDir.path, folder, filename);
			var attachmentFile = fs.File.fromPath(filePath);
			console.log("Saving the file at: " + filePath);
			
			//Writing the pdf data to file
			attachmentFile.writeSync(nativeData, err => {
				attachmentFile.remove();
				alert("WRITE SYNC FAILED: " + err)
			});

			//Once the file is saved, try to open it
			// Note if the write failed, this action will fail too.
			context.executeAction({
				"Name": "/PDFGeneratorApp/Actions/OpenDocument.action",
				"Properties": {
					"Path": filePath
				}
			});
		});
}