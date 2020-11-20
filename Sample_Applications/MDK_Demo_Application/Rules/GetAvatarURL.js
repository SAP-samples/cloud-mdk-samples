function hashCode(str) {
	return Array.from(str)
	  .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
}

export function GetAvatarURL(context, name, colorInput = 'hash', imgSize = 'large') {
	let platform = context.nativescript.platformModule;

	// Hash / Random color options
	const bgcolors = [
		"1abc9c", "2ecc71", "3498db", "9b59b6", "16a085", "27ae60", "2980b9", 
		"8e44ad", "f1c40f", "e67e22", "e74c3c", "f39c12", "d35400", "c0392b"
	];
	var initials;
	var backgroundColor;
	var size;
	
	// Using ui-avatars.com http api
	let baseUrl = 'https://ui-avatars.com/api';
	if (name === undefined || name == null || name.length <= 0 || name === 'undefined') {
		// If no name is specified use dash
		initials = '-';
		// If no name always choose a random color
		colorInput = 'random';
	} else {
		// If a name is provided calculate the initials based on the first letter of the first and last words
		let words = name.split(' ');
		let first = words[0].substring(0,1);
		var last = '';
		if (words.length > 1) {
			last = words[words.length-1].substring(0,1);
		}
		initials = first.toUpperCase() + last.toUpperCase();
		//console.log(`Inits: ${initials}`);
	}	
	switch (colorInput) {
		case 'hash':
			let strHash = hashCode(name);
			let hashColor = Math.abs(strHash % 14);
			//console.log(`Hash: ${strHash}  Color Index: ${hashColor}`);
			backgroundColor = bgcolors[hashColor];
			break; 
		case 'random':
			let randomColor = Math.floor((Math.random() * 14));
			//console.log(`Random Index: ${randomColor}`);
			backgroundColor = bgcolors[randomColor];
			break;
		default:
			backgroundColor = colorInput;
    }
    switch (imgSize) {
        case 'large':
            size = 100;
            break;
        case 'small':
            if (platform.isIOS) {
                size = 40
            } else if (platform.isAndroid) {
                size = 60;
            } else { // Otherwise Web
                size = 60;
            }           
            break;
    }
	if (platform.isIOS) {
		size = 100
	} else if (platform.isAndroid) {
		size = 100;
	}
	let avatarUrl = `${baseUrl}/?size=${size}&rounded=true&background=${backgroundColor}&color=ffffff&name=${initials}`;
	//console.log(`Avatar: ${avatarUrl}`);
	return avatarUrl;
}
