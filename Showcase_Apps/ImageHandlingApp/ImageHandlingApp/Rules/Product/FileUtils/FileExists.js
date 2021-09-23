const fs = require('@nativescript/core/file-system');

export function fileExists(path) {
	return fs.File.exists(path);
}