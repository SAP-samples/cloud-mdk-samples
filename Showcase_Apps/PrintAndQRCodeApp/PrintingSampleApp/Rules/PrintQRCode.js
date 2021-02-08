import {Printer} from "nativescript-printer";

/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function PrintQRCode(context) {
    let pageProxy = context.getPageProxy();
    let clientData = pageProxy.getClientData();
    if (!clientData.QRCodeImageSource) {
        alert("Can't find QR Code Image!");
    }
    else {
        // instantiate the plugin
        let printer = new Printer();
        
        printer.isSupported().then((supported) => {
            console.log(supported ? "Yep!" : "Nope :'(");
            if (supported) {
                printer.printImage({
                    imageSrc: clientData.QRCodeImageSource
                }).then((success) => {
                    alert(success ? "Printed!" : "Not printed");
                }, (error) => {
                    alert("Error: " + error);
                });
            }
            else {
                alert("Your device does not support printing");
            }

        }, (error) => {
            alert("Error: " + error);
        });
    }
}