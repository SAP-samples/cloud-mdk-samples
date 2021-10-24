/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function GetAvatarName(context) {
	let firstName = context.binding.CustomerDetails.FirstName;
	let lastName = context.binding.CustomerDetails.LastName;
	return firstName.substring(0,1) + lastName.substring(0, 1);
}