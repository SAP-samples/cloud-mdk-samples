import { ImageSource } from "tns-core-modules/image-source";
import { QrGenerator } from "nativescript-qr-generator";

/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GenerateQRCode(context) {
    const pageProxy = context.getPageProxy();
    const sectionedTable = pageProxy.getControl("SectionedTable0");
    let text = "Hello World";
    if (sectionedTable) {
        const simpPropControl = sectionedTable.getControl("TextForQRCodeInput");
        let val = simpPropControl.getValue(); 
        if (val && val.length > 0) {
            text = val;
        }
    }
    const result = new QrGenerator().generate(text);
    return new ImageSource(result);
}