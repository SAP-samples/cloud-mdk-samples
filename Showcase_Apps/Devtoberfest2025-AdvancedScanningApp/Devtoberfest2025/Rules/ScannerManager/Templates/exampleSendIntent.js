/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function exampleSendIntent(context) {
    let appContext = context.nativescript.utilsModule.ad.getApplicationContext();
    let startScanIntent = new android.content.Intent();
    startScanIntent.setAction("my.action.here");
    startScanIntent.putExtra("my.extra.key.here", "extra.value");
    appContext.sendBroadcast(startScanIntent);
}