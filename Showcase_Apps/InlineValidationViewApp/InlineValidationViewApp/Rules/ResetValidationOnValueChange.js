/**
 * @param {IFormCellProxy} formCellProxy
 */
export default function ResetValidationOnValueChange(formCellProxy) {
    formCellProxy.getValidation().setMessage('');
    formCellProxy.getValidation().setVisible(false);
    if (!formCellProxy.nativescript.platformModule.isAndroid) {
        formCellProxy.getValidation().setSeparatorVisible(false);
    }
    formCellProxy.redraw();
}
