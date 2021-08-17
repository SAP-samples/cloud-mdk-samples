/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CalculateSelection(context) {
	let pageProxy = context.getPageProxy();
	let sectionedTable = pageProxy.getControl("SectionedTable0");
	let objectTable = sectionedTable.getSection("SalesOrdersTable");
	const selected = objectTable.getSelectedItems();
	if (selected) {
		var total = 0;
		selected.forEach((item)=>{
			var netamt = item.binding.NetAmount;
			total += netamt;
		});

		return pageProxy.setToolbarItemCaption("ToolBarItem1",context.localizeText("TotalLabel", [total]));
	}
}