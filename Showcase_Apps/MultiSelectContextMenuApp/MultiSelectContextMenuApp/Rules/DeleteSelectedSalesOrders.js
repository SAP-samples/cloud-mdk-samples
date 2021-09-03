import CalculateSelection from './CalculateSelection';
/**
* Describe this function...
* @param {IClientAPI} context
*/
export default async function DeleteSelectedProducts(context) {
	var sectionedTable = context.getControl("SectionedTable0");
	var section = sectionedTable.getSection("SalesOrdersTable");
	var selectedItems = section.getSelectedItems();	
	if (!selectedItems  || selectedItems.length === 0) {
		context.executeAction({
			"Name": "/MultiSelectContextMenuApp/Actions/BasicToast.action",
			"Properties": {
				"Message": "Nothing is selected"
			}
		});
	}
	let result = null;
	if (selectedItems.length == 1) {
		result = await context.executeAction({
			"Name": "/MultiSelectContextMenuApp/Actions/ConfirmAction.action",
			"Properties":{
				"Message": "$(L, ConfirmDeleteSingleMessage)"
			}
		});
	} else {
		result = await context.executeAction({
			"Name": "/MultiSelectContextMenuApp/Actions/ConfirmAction.action",
			"Properties":{
				"Message": "$(L, ConfirmDeleteMultipleMessage)"
			}
		});
	}
	if (result && result.data) {
		for (var i = 0; selectedItems && i < selectedItems.length; i++ ) {
			var selectedItem = selectedItems[i];
			await context.executeAction({
				"Name": "/MultiSelectContextMenuApp/Actions/DeleteSalesOrder.action",
				"Properties":{
					"Target": {
						"ReadLink" : selectedItem.binding["@odata.readLink"]
					}
				}
			});
		}
		section.setSelectionMode("None");
	}
	CalculateSelection(context);
}