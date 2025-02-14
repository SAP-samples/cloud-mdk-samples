/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function OnSelectionModeChanged(context) {
	var section = context.getSection("SalesOrdersTable");
	var mode = section.getSelectionMode();
	var pageProxy = context.getPageProxy();
	let fioriToolbar = pageProxy.getFioriToolbar();
	if (mode == "None") {
		pageProxy.setActionBarItemVisible(0, false);
		pageProxy.setActionBarItemVisible(1, false);
		pageProxy.setActionBarItemVisible(2, true);
		pageProxy.setActionBarItemVisible(3, true);
		var total = context.formatCurrency(0, "EUR"); //For the purpose of sample, we'll hard code the currency to EUR
		let newValue = context.localizeText("TotalLabel", [total]);
		 fioriToolbar.setHelperText(newValue);
	} else {
		pageProxy.setActionBarItemVisible(0, true);
		pageProxy.setActionBarItemVisible(1, true);
		pageProxy.setActionBarItemVisible(2, false);
		pageProxy.setActionBarItemVisible(3, false);
	}
}