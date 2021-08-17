/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function OnSelectionModeChanged(context) {
	var section = context.getSections()[0]
	var mode = section.getSelectionMode();
	if (mode == "None") {
		context.getPageProxy().setActionBarItemVisible(0, false);
		context.getPageProxy().setActionBarItemVisible(1, false);
		context.getPageProxy().setActionBarItemVisible(2, true);
	} else {
		context.getPageProxy().setActionBarItemVisible(0, true);
		context.getPageProxy().setActionBarItemVisible(1, true);
		context.getPageProxy().setActionBarItemVisible(2, false);
	}
}