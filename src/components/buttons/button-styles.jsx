/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';
import ButtonStylesList from './button-styles-list.jsx';

/**
 * The ButtonStyles class provides functionality for styling a selection with a list of
 * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
 * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
 *
 * @class ButtonStyles
 */
class ButtonStyles extends React.Component {
	static contextType = EditorContext;

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default styles
	 * @memberof ButtonStyles
	 * @property {String} key
	 * @static
	 */
	static key = 'styles';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonStyles
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		let activeStyle = AlloyEditor.Strings.normal;

		const styles = this._getStyles();

		styles.forEach(item => {
			if (this._checkActive(item.style)) {
				activeStyle = item.name;
			}
		});

		let buttonStylesList;

		if (this.props.expanded) {
			buttonStylesList = (
				<ButtonStylesList
					activeStyle={activeStyle}
					onDismiss={this.props.toggleDropdown}
					showRemoveStylesItem={this.props.showRemoveStylesItem}
					styles={styles}
				/>
			);
		}

		return (
			<div className="ae-container-dropdown ae-has-dropdown">
				<button
					aria-expanded={this.props.expanded}
					aria-label={AlloyEditor.Strings.styles + ' ' + activeStyle}
					className="ae-toolbar-element"
					onClick={this.props.toggleDropdown}
					role="combobox"
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.styles + ' ' + activeStyle}>
					<div className="ae-container">
						<span className="ae-container-dropdown-selected-item">
							{activeStyle}
						</span>
						<ButtonIcon symbol="caret-bottom" />
					</div>
				</button>
				{buttonStylesList}
			</div>
		);
	}

	/**
	 * Checks if the given style definition is applied to the current selection in the editor.
	 *
	 * @instance
	 * @memberof ButtonStyles
	 * @method _checkActive
	 * @param {Object} styleConfig Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
	 * @protected
	 * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
	 */
	_checkActive(styleConfig) {
		const nativeEditor = this.context.editor.get('nativeEditor');

		// Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
		// to a 'span' element works for most of those cases with no defined element.

		styleConfig = CKEDITOR.tools.merge({element: 'span'}, styleConfig);

		const style = new CKEDITOR.style(styleConfig);

		return style.checkActive(nativeEditor.elementPath(), nativeEditor);
	}

	/**
	 * Returns an array of styles. Each style consists from two properties:
	 * - name - the style name, for example "h1"
	 * - style - an object with one property, called `element` which value
	 * represents the style which have to be applied to the element.
	 *
	 * @instance
	 * @memberof ButtonStyles
	 * @method _getStyles
	 * @protected
	 * @return {Array<object>} An array of objects containing the styles.
	 */
	_getStyles() {
		return (
			this.props.styles || [
				{
					name: AlloyEditor.Strings.h1,
					style: {
						element: 'h1',
					},
				},
				{
					name: AlloyEditor.Strings.h2,
					style: {
						element: 'h2',
					},
				},
				{
					name: AlloyEditor.Strings.formatted,
					style: {
						element: 'pre',
					},
				},
				{
					name: AlloyEditor.Strings.cite,
					style: {
						element: 'cite',
					},
				},
				{
					name: AlloyEditor.Strings.code,
					style: {
						element: 'code',
					},
				},
			]
		);
	}
}

export default ButtonStyles;
