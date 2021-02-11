const fs = require('tns-core-modules/file-system');

export function pathToFile(path) {
	return fs.File.fromPath(path);
}