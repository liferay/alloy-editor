module.exports = {
	extends: ['plugin:react/recommended', 'liferay'],
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
	},
	globals: {
		Babel: true,
	},
	rules: {
		'react/display-name': 'warn',
		'react/prop-types': 'warn',
		'react/no-string-refs': 'warn',
	},
};
