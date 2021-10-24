/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function OnSelectionModeChanged(context) {
	var section = context.getSection("SalesOrdersTable");
	var mode = section.getSelectionMode();
	var pageProxy = context.getPageProxy();
	if (mode == "None") {
		pageProxy.setActionBarItemVisible(0, false);
		pageProxy.setActionBarItemVisible(1, false);
		pageProxy.setActionBarItemVisible(2, true);
		var total = context.formatCurrency(0, "EUR"); //For the purpose of sample, we'll hard code the currency to EUR
		pageProxy.setToolbarItemCaption("ToolBarItem1",context.localizeText("TotalLabel", [total]));
	} else {
		pageProxy.setActionBarItemVisible(0, true);
		pageProxy.setActionBarItemVisible(1, true);
		pageProxy.setActionBarItemVisible(2, false);
	}
}