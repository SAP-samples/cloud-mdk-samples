/**
 * Describe this function...
 * @param {Icontext} context
 */
export default function OpenMaps(context) {
    let custBinding = context.binding;
    let custAddresss = `${custBinding.HouseNumber},${custBinding.Street},${custBinding.City},${custBinding.PostalCode},${custBinding.Country}`;
    let encaddr = encodeURIComponent(custAddresss);
    console.log("encoded address " + encaddr);
    // Get the Nativescript Utils Module
    const utilsModule = context.nativescript.utilsModule;
    // Get the Nativescript Platform Module
    const platformModule = context.nativescript.platformModule;
    if (platformModule.isIOS) {
      return utilsModule.openUrl(`maps://?address=${encaddr}`);
    } else if (platformModule.isAndroid) {
      return utilsModule.openUrl(`https://maps.google.com/?q=${encaddr}`);
    }
  }