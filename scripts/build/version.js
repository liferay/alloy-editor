'use strict';
const version = require('../../package.json').version;

module.exports = () => {
	return {
		code: `module.exports = ${JSON.stringify(version)};`,
	};
};
