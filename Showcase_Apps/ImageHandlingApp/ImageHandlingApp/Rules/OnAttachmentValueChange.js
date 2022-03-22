/**
* Describe this function...
* @param {IAttachmentFormCellProxy} clientAPI
*/
export default function OnAttachmentValueChange(clientAPI) {
    var attachments = clientAPI.getValue();
    if (attachments.length > 1){
        var message = "Max. 1 image allowed for the product";
        attachments.splice(1);
        clientAPI.setValue(attachments);
        clientAPI.redraw();
        return clientAPI.executeAction({
			"Name": "/ImageHandlingApp/Actions/Generic/ToastMessage.action",
			"Properties": {
				"Message": message,
				"Duration": 6
			}
		});
    }
}