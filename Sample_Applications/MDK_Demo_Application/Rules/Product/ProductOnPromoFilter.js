export default function ProductOnPromoFilter(context) {
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;

    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
    } else {
        appId = 'WebClient';
    }
    let cd = context.getAppClientData();
    let promoItems = [];
    var filter = '';

    if (cd.promoItems) {
        for (var item of Object.keys(cd.promoItems)) {
            promoItems.push(`ProductID eq ${item}`)
        }
        if (promoItems.length > 0) {
            filter = `(${promoItems.join(' or ')})`;
        }
    }
    console.log(filter);
    return filter;
}