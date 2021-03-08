/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';
import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';
import ButtonStylesList from './button-styles-list.jsx';

/**
 * The ButtonColor class provides functionality for changing text color in a document.
 *
 *
 * @class ButtonColor
 */
class ButtonColor extends React.Component {
	static contextType = EditorContext;

	static key = 'color';

	static propTypes = {
		/**
		 * Indicates whether the styles list is expanded or not.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {Boolean} expanded
		 */
		expanded: PropTypes.bool,

		/**
		 * The label that should be used for accessibility purposes.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {String} label
		 */
		label: PropTypes.string,

		/**
		 * Indicates whether the remove styles item should appear in the styles list.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {Boolean} showRemoveStylesItem
		 */
		showRemoveStylesItem: PropTypes.bool,

		/**
		 * List of the styles the button is able to handle.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {Array} styles
		 */
		styles: PropTypes.arrayOf(PropTypes.object),

		/**
		 * The tabIndex of the button in its toolbar current state. A value other than -1
		 * means that the button has focus and is the active element.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {Number} tabIndex
		 */
		tabIndex: PropTypes.number,

		/**
		 * Callback provided by the button host to notify when the styles list has been expanded.
		 *
		 * @instance
		 * @memberof ButtonColor
		 * @property {Function} toggleDropdown
		 */
		toggleDropdown: PropTypes.func,
	};

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		let activeColor = AlloyEditor.Strings.normal;

		const colors = this._getColors();

		colors.some(item => {
			if (this._checkActive(item.style)) {
				activeColor = item.name;
			}
		});

		const {expanded, tabIndex, toggleDropdown} = this.props;

		const buttonStylesProps = {
			activeStyle: activeColor,
			onDismiss: toggleDropdown,
			showRemoveStylesItem: false,
			styles: colors,
		};

		return (
			<div className="ae-container ae-has-dropdown">
				<button
					aria-expanded={expanded}
					className="ae-toolbar-element"
					onClick={toggleDropdown}
					role="combobox"
					tabIndex={tabIndex}>
					<span>
						<ButtonIcon symbol="color-picker" />
					</span>
				</button>
				{expanded && <ButtonStylesList {...buttonStylesProps} />}
			</div>
		);
	}

	_applyStyle(className) {
		const editor = this.context.editor.get('nativeEditor');

		const styleConfig = {
			element: 'span',
			attributes: {
				class: className,
			},
		};

		const style = new CKEDITOR.style(styleConfig);

		editor.getSelection().lock();

		this._getColors().forEach(item => {
			if (this._checkActive(item.style)) {
				editor.removeStyle(new CKEDITOR.style(item.style));
			}
		});

		editor.applyStyle(style);

		editor.getSelection().unlock();

		editor.fire('actionPerformed', this);
	}

	/**
	 * Checks if the given color definition is applied to the current selection in the editor.
	 *
	 * @instance
	 * @memberof ButtonColor
	 * @method _checkActive
	 * @param {Object} styleConfig Color definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
	 * @protected
	 * @return {Boolean} Returns true if the color is applied to the selection, false otherwise.
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
	 * Returns an array of colors. Each color consists of two properties:
	 * - name - The style name, for example "default".
	 * - style - An object with one property, called `element` which value
	 *          represents the style which have to be applied to the element.
	 * - styleFn - The function that is invoked to apply the style to the element.
	 *
	 * @instance
	 * @memberof ButtonColor
	 * @method _getColor
	 * @protected
	 * @return {Array<object>} An array of objects containing the colors.
	 */
	_getColors() {
		return (
			this.props.styles || [
				{
					name: AlloyEditor.Strings.primary,
					style: {
						element: 'span',
						attributes: {
							class: 'text-primary',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-primary'),
				},
				{
					name: AlloyEditor.Strings.success,
					style: {
						element: 'span',
						attributes: {
							class: 'text-success',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-success'),
				},
				{
					name: AlloyEditor.Strings.danger,
					style: {
						element: 'span',
						attributes: {
							class: 'text-danger',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-danger'),
				},
				{
					name: AlloyEditor.Strings.warning,
					style: {
						element: 'span',
						attributes: {
							class: 'text-warning',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-warning'),
				},
				{
					name: AlloyEditor.Strings.info,
					style: {
						element: 'span',
						attributes: {
							class: 'text-info',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-info'),
				},
				{
					name: AlloyEditor.Strings.dark,
					style: {
						element: 'span',
						attributes: {
							class: 'text-dark',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-dark'),
				},
				{
					name: AlloyEditor.Strings.darkGray,
					style: {
						element: 'span',
						attributes: {
							class: 'text-gray-dark',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-gray-dark'),
				},
				{
					name: AlloyEditor.Strings.secondary,
					style: {
						element: 'span',
						attributes: {
							class: 'text-secondary',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-secondary'),
				},
				{
					name: AlloyEditor.Strings.light,
					style: {
						element: 'span',
						attributes: {
							class: 'text-dark',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-light'),
				},
				{
					name: AlloyEditor.Strings.lighter,
					style: {
						element: 'span',
						attributes: {
							class: 'text-dark',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-lighter'),
				},
				{
					name: AlloyEditor.Strings.white,
					style: {
						element: 'span',
						attributes: {
							class: 'text-dark',
						},
					},
					styleFn: this._applyStyle.bind(this, 'text-white'),
				},
			]
		);
	}
}

export default ButtonColor;
