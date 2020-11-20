export default function GetPromoDiscount(context) {
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId, mainPage, mainPageName;
    try {
        if (platform && (platform.isIOS || platform.isAndroid)) {
            appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
        } else {
            appId = 'WindowsClient';
        }
        mainPage = appSettings.getString(`${appId}-MainPage`);
        mainPageName = mainPage.substring(mainPage.lastIndexOf('/') + 1).slice(0,-5);

        console.log(`Main Page Name: ${mainPageName}`);
    } catch (err) {
        console.log('ERROR: Failure getting AppId');
    }    
    let cd = context.evaluateTargetPathForAPI(`#Page:${mainPageName}`).getClientData();
    if (cd.promoItems && cd.promoItems.hasOwnProperty(context.binding.ProductId)) {
        let discountStr = `+${context.formatPercentage(cd.promoItems[context.binding.ProductId],null,{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:true})} Off`;
        return discountStr;
    }
    return null;
}