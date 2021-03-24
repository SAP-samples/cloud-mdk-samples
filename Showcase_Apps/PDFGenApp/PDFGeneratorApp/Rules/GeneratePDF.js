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
	let pageProxy = context.getPageProxy();
	let salesOrderHeader = pageProxy.binding;
	let customer = salesOrderHeader.CustomerDetails;
	// Get Sales Order Items
	let sectionedTable = pageProxy.getControl("SectionedTable0");
	let itemsTable = sectionedTable.getSection("SalesOrderItemsTable");
	let salesOrderItems = itemsTable.binding;
	
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

	//Build the items table for the PDF content
	var salesOrderItems_TableBody = [[ 'Product Name', 'Quantity', { text: "Net Amount", alignment: 'right' }]];
	for (var i = 0; i < salesOrderItems.length; i++) {
		var salesOrderItem = salesOrderItems.getItem(i);
		var row = [
			{ text: salesOrderItem.ProductDetails.Name, bold: true },
			`${salesOrderItem.Quantity}${salesOrderItem.QuantityUnit}`,
			{ text: context.formatCurrency(salesOrderItem.NetAmount, salesOrderItem.CurrencyCode), alignment: 'right' }
		];
		salesOrderItems_TableBody.push(row);
	}
	salesOrderItems_TableBody.push(['',{ text: 'Sub Total', bold: true },{ text: context.formatCurrency(salesOrderHeader.NetAmount, salesOrderItem.CurrencyCode), alignment: 'right' }]);
	salesOrderItems_TableBody.push(['',{ text: 'Total Tax', bold: true },{ text: context.formatCurrency(salesOrderHeader.TaxAmount, salesOrderItem.CurrencyCode), alignment: 'right' }]);
	salesOrderItems_TableBody.push(['',{ text: 'Total Amount', bold: true },{ text: context.formatCurrency(salesOrderHeader.GrossAmount, salesOrderItem.CurrencyCode), alignment: 'right' }]);

	// This is where you define the content of the PDF
	var docDefinition = {
		pageOrientation: 'landscape',

		content: [
				{
					image: dataJson.images['saplogo'],
					width: 80
				},
				{ text: 'Invoice\n', fontSize: '25', alignment: 'center' },
				{
					columns: [
						{ text: `\nInvoice ID: ${salesOrderHeader.SalesOrderId}` },
						{ text: `\nDate: ${context.formatDate(salesOrderHeader.CreatedAt)}`, alignment: 'right' }
					]
				},
				{
					columns: [
						`\nBill to: ${customer.FirstName} ${customer.LastName}`,
						{ text: `\nPhone: ${customer.PhoneNumber}\n\n`, alignment: 'right' }
					]
				},
				{ text: `\nAddress:`, bold: true },
				`${customer.HouseNumber} ${customer.Street}`,
				`${customer.City}`,
				`${customer.Country} ${customer.PostalCode}`,
				`Phone: ${customer.PhoneNumber}\n\n`,
				{
					layout: 'lightHorizontalLines', // optional
					table: {
						// headers are automatically repeated if the table spans over multiple pages
						// you can declare how many rows should be treated as headers
						headerRows: 1,
						widths: [ '*', 'auto', 100],
						body: salesOrderItems_TableBody
					}
				}
		],

		defaultStyle: {
			fontSize: 12,
			alignment: 'left'
		}
	};
	
	// Now use the PDFMake to create PDF data
	pdfMake.createPdf(docDefinition, '', '', dataJson.fonts)
		.getBuffer((data) => {
			//Convert the data buffer to native data array 
			let nativeData = _bufferToNativeArray(data);
			
			//Now prepare to save the data to a file
			let filename = "Invoice.pdf";
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