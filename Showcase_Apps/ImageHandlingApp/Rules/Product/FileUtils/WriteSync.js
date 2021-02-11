const fs = require('tns-core-modules/file-system');

export function writeSync(clientPageAPI, file, data) {
	file.writeSync(data, err => {
		console.log('Problem Saving File');
	});
}