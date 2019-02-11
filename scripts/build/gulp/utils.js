const fs = require('fs');
const path = require('path');

const getFolders = function(dir) {
	return fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
};

module.exports = {
	getFolders,
};
