/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function SetSelectionMode(context) {
	var sectionedTable = context.getControl("SectionedTable0");
	var section = sectionedTable.getSection("SalesOrdersTable");
	section.setSelectionMode("Multiple");
}