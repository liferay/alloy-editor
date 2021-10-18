/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const path = require('path');

module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	extends: ['plugin:@liferay/react'],
	globals: {
		AlloyEditor: true,
		CKEDITOR: true,
		Liferay: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
	},
	plugins: ['@liferay'],
	rules: {
		'@liferay/empty-line-between-elements': 'off',
		'@liferay/no-abbreviations': 'off',
		'lines-around-comment': 'off',
		'new-cap': [
			'error',
			{
				capIsNewExceptions: [
					'ButtonActionStyle',
					'ButtonProps',
					'ButtonCommand',
					'ButtonCommandActive',
					'ButtonKeystroke',
					'ButtonProps',
					'ButtonStateClasses',
					'ButtonStyle',
					'ToolbarButtons',
					'WidgetArrowBox',
					'WidgetDropdown',
					'WidgetExclusive',
					'WidgetFocusManager',
					'WidgetPosition',
				],
				newIsCapExceptions: [
					'CKEDITOR.command',
					'CKEDITOR.dom.comment',
					'CKEDITOR.dom.documentFragment',
					'CKEDITOR.dom.element',
					'CKEDITOR.dom.elementPath',
					'CKEDITOR.dom.event',
					'CKEDITOR.dom.node',
					'CKEDITOR.dom.nodeList',
					'CKEDITOR.dom.range',
					'CKEDITOR.dom.rangeList',
					'CKEDITOR.dom.selection',
					'CKEDITOR.dom.text',
					'CKEDITOR.dom.walker',
					'CKEDITOR.dom.window',
					'CKEDITOR.htmlParser.basicWriter',
					'CKEDITOR.htmlParser.element',
					'CKEDITOR.htmlParser.filter',
					'CKEDITOR.htmlParser.fragment.fromHtml',
					'CKEDITOR.style',
					'CKEDITOR.template',
				],
			},
		],
		'no-for-of-loops/no-for-of-loops': 'error',
		'no-inner-declarations': 'off',
		'no-invalid-this': 'warn',
		'notice/notice': [
			'error',
			{
				templateFile: path.join(__dirname, 'copyright.js'),
			},
		],
		'react/display-name': 'warn',
		'react/no-find-dom-node': 'warn',
		'react/no-string-refs': 'warn',
		'react/prop-types': 'warn',
		'sort-keys': 'warn',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
