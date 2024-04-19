export default function GetPromoDiscount(context) {
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId, mainPage, mainPageName;
    try {
        if (platform && (platform.isIOS || platform.isAndroid)) {
            appId = context.evaluateTargetPath('#Application/#ClientData/#Property:MobileServiceAppId');
        } else {
            appId = 'WebClient';
        }
    } catch (err) {
        console.log('ERROR: Failure getting AppId');
    }    
    let cd = context.getAppClientData();
    if (cd.promoItems && cd.promoItems.hasOwnProperty(`${context.binding.ProductID}`)) {
        let discountStr = `+${context.formatPercentage(cd.promoItems[`${context.binding.ProductID}`],null,{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:true})} Off`;
        return discountStr;
    }
    return null;
}