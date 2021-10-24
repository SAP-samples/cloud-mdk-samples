const fs = require('@nativescript/core/file-system');

export function pathToFile(path) {
	return fs.File.fromPath(path);
}