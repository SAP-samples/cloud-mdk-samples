const fs = require('tns-core-modules/file-system');

export function fileExists(path) {
	return fs.File.exists(path);
}