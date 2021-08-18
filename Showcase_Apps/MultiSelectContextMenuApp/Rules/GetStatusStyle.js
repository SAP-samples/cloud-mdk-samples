/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GetStatusStyle(context) {
	let binding = context.binding;

	if (binding){
		let lifeCycleStatus = binding.LifeCycleStatus;
		switch(lifeCycleStatus) {
			case 'P':
				return "InProcessStatus";
			case 'H':
				return "OnHoldStatus";
			case 'R':
				return "RefundedStatus";
			case 'C':
				return "CompletedStatus";
			default: // if unknown, Assume it's new for this sample
				return "";

		}
	}
}