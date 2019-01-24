module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
	},
	extends: 'liferay',
	plugins: ['no-for-of-loops'],
	rules: {
		'no-for-of-loops/no-for-of-loops': 2,
	},
};
