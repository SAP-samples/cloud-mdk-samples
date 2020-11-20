export default function ResetFilter(context) {
	let formCellContainer = context.getPageProxy().getControl('FormCellContainer0');
    let controls = formCellContainer.getControls();
	    
    if (controls && controls.length > 0) {
        for (let i = 0; i < controls.length; i++) {
            if (controls[i].getName() === 'SortBy') {
            	// Reset the sort control to the first sort option in the group
            	// Assumes the first sort option is the default sort order for the list
            	controls[i].setValue(controls[i].getCollection()[0].ReturnValue);
            } else {
            	// Clear any filter selections
            	controls[i].setValue('');
            }
        }
    }
}