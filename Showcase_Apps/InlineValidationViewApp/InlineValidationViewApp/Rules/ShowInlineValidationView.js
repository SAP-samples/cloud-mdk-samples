/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 * @param {IFormCellProxy} control
 * @param {string} errorText
 * @param {boolean} isHidden 
 */
export default function ShowInlineValidationView(clientAPI, control, errorText, isHidden = false) {
    control.setValidationProperty("ValidationMessage", errorText);
    control.setValidationProperty("ValidationViewIsHidden", isHidden);
    // no color for message text and background color required for Android
    if (!clientAPI.nativescript.platformModule.isAndroid) {
        control.setValidationProperty("ValidationMessageColor", "5b738b");
        control.setValidationProperty("ValidationViewBackgroundColor", "fbebf3");
        // no separator required for Android + Web
        if (clientAPI.nativescript.platformModule.isIOS) {
            control.setValidationProperty("SeparatorIsHidden", isHidden);
            control.setValidationProperty("SeparatorBackgroundColor", "d20a0a");
        }
    }
    control.applyFormCellValidation();
}
