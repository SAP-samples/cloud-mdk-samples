import { GetAvatarURL } from '../GetAvatarURL';

export default function GetLargeCustomerAvatarURL(context) {
	let name = `${context.binding.FirstName} ${context.binding.LastName}`;	
	return GetAvatarURL(context, name, 'hash', 'large');
}