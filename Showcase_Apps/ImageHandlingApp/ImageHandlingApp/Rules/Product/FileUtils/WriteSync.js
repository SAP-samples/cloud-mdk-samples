const fs = require('@nativescript/core/file-system');

export function writeSync(clientPageAPI, file, data) {
	file.writeSync(data, err => {
		console.log('Problem Saving File');
	});
}