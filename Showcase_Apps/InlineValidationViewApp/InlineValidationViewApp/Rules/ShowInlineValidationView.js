/**
 * @param {IClientAPI} clientAPI
 * @param {IFormCellProxy} control
 * @param {string} errorText
 * @param {boolean} isHidden 
 */
export default function ShowInlineValidationView(clientAPI, control, errorText, isHidden = false) {
    control.getValidation().setMessage(errorText);
    control.getValidation().setVisible(!isHidden);
    if (!clientAPI.nativescript.platformModule.isAndroid) {
        control.getValidation().setSeparatorVisible(!isHidden);
    }
    control.redraw();
}
