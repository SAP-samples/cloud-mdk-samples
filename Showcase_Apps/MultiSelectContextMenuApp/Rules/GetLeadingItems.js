/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GetLeadingItems(context) {
	let binding = context.binding;

	if (binding){
		/* IMPORTANT NOTE: 
		In Android Only 1 items can be shown on each side, 
		so only the first menu item in the array returned will be displayed
		In iOS, all the menu items in the array will be displayed.
		If you are designing for both iOS and Android, you should consider to 
		only returning 1 item in the array so that it has the same behaviour in both platforms.
		In this example, we'll return multiple items for demonstration purposes. */
		let lifeCycleStatus = binding.LifeCycleStatus;
		switch(lifeCycleStatus) {
			case 'P':
				return ["Complete", "Hold", "Refund"];
			case 'H':
				return ["Process", "Refund"];
			case 'R':
				return ["Process"];
			case 'C':
				return [];
			default: // if unknown, Assume it's new for this sample
				return ["Process", "Hold"];
		}
	}
}