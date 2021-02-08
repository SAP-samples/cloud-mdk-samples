import GenerateQRCode from './GenerateQRCode';
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GetQRCodeImage(context) {
		let pageProxy = context.getPageProxy();
		let clientData = pageProxy.getClientData();
		if (!clientData.QRCodeImageSource) {
				clientData.QRCodeImageSource = GenerateQRCode(context);
		}
		var base64Str = clientData.QRCodeImageSource.toBase64String();
		return "data:image/png;base64," + base64Str;
}