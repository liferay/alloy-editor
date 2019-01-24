module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['liferay', 'prettier'],
	plugins: ['no-for-of-loops'],
	rules: {
		'no-for-of-loops/no-for-of-loops': 2,
	},
	globals: {
		CKEDITOR: true,
	},
};
