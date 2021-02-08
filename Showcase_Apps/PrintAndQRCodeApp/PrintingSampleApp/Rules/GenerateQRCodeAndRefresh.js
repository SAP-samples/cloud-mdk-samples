import GenerateQRCode from './GenerateQRCode';
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GenerateQRCodeAndRefresh(context) {
    let pageProxy = context.getPageProxy();
    let clientData = pageProxy.getClientData();
    clientData.QRCodeImageSource = GenerateQRCode(context);
    pageProxy.getControl("SectionedTable0").redraw();
}