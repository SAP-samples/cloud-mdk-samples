/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CancelSelectionMode(context) {
	var sectionedTable = context.getControl("SectionedTable0");
	var section = sectionedTable.getSection("SalesOrdersTable");
	section.setSelectionMode("None");
}