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
		'require-jsdoc': 'warn',
		'no-for-of-loops/no-for-of-loops': 'error',
	},
	globals: {
		AlloyEditor: true,
		CKEDITOR: true,
	},
};
