/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CalculateSelection(context) {
	let pageProxy = context.getPageProxy();
	let sectionedTable = pageProxy.getControl("SectionedTable0");
	let objectTable = sectionedTable.getSection("SalesOrdersTable");
	let fioriToolbar = pageProxy.getFioriToolbar();
	const selected = objectTable.getSelectedItems();
	if (selected) {
		var total = 0;
		selected.forEach((item)=>{
			var netamt = item.binding.NetAmount;
			total += netamt;
		});
		total = context.formatCurrency(total, "EUR"); //For sample only, we'll hard code the currency to EUR
		let newValue = context.localizeText("TotalLabel", [total]);
		return fioriToolbar.setHelperText(newValue);
	}
}
