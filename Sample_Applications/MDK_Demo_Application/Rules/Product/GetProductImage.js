export default function GetProductImage(context) {
    const platform = context.nativescript.platformModule;    
	let imageData = null;
	let imageObject = context.binding;
	let pageProxy = context.getPageProxy()

    return pageProxy.executeAction({
        "Name": "/MDKDemoApp/Actions/Product/DownloadProductImage.action",
        "Properties": {
            "Target": {
                "ReadLink": imageObject['@odata.readLink']
            }
        }
    }).then((result) => {
        // success case
        //console.log('Retrieved Image');
        if (platform.isAndroid) {
            imageData = `data:image/example;base64,${android.util.Base64.encodeToString(result.data,android.util.Base64.DEFAULT)}`;	
        } else if (platform.isIOS) {
            imageData = `data:image/example;base64,${result.data.base64Encoding()}`;	
        } else {  // Assume MDK Web
            let buffer = btoa([].reduce.call(new Uint8Array(result.data),function(p,c){return p+String.fromCharCode(c)},''));
            imageData = `data:image/example;base64,${buffer.toString('base64')}`;
        }
        return imageData;
    }, (error) => {
        // error case
        console.log('Error downloading image');
    });
}