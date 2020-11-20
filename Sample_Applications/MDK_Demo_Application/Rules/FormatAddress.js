// Helper function to return if the value passed into the function is empty
function isValEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val === 'undefined');
}

export default function FormatAddress(context) {
	var addrBlock = '';

	// If the house number has a value include it in the address block
	if (!isValEmpty(context.binding.HouseNumber)) {
		addrBlock = addrBlock + context.binding.HouseNumber + ' ' + context.binding.AddrStreet;
	}

	// If at least one of (city, state or postal code) is populated add that to the address block
	if (!isValEmpty(context.binding.City) || !isValEmpty(context.binding.AddrPostalCode)) {
		// Add a new line if there is something already in the address block	
		if (addrBlock.length > 0) {
			addrBlock = addrBlock + '\n'
		}
		// If the city has a value include it in the address block
		if (!isValEmpty(context.binding.City)) {
			addrBlock = addrBlock + context.binding.City;
		}
		// If the post caode has a value include it in the address block		
		if (!isValEmpty(context.binding.PostalCode)) {
			addrBlock = addrBlock + ", " + context.binding.PostalCode;
		}
	}
	
	// If the country has a value include it in the address block	
	if (!isValEmpty(context.binding.Country)) {
		// Add a new line if there is something already in the address block
		if (addrBlock.length > 0) {
			addrBlock = addrBlock + '\n'
		}
		addrBlock = addrBlock + context.binding.Country;
	}

	return addrBlock;
}