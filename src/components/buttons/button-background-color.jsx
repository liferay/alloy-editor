/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';
import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';
import ButtonStylesList from './button-styles-list.jsx';

class ButtonBackgroundColor extends React.Component {
	static contextType = EditorContext;

	static key = 'backgroundColor';

	static propTypes = {
		/**
		 * Indicates whether the styles list is expanded or not.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
		 * @property {Boolean} expanded
		 */
		expanded: PropTypes.bool,

		/**
		 * The label that should be used for accessibility purposes.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
		 * @property {String} label
		 */
		label: PropTypes.string,

		/**
		 * Indicates whether the remove styles item should appear in the styles list.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
		 * @property {Boolean} showRemoveStylesItem
		 */
		showRemoveStylesItem: PropTypes.bool,

		/**
		 * List of the styles the button is able to handle.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
		 * @property {Array} styles
		 */
		styles: PropTypes.arrayOf(PropTypes.object),

		/**
		 * The tabIndex of the button in its toolbar current state. A value other than -1
		 * means that the button has focus and is the active element.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
		 * @property {Number} tabIndex
		 */
		tabIndex: PropTypes.number,

		/**
		 * Callback provided by the button host to notify when the styles list has been expanded.
		 *
		 * @instance
		 * @memberof ButtonBackgroundColor
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

		let activeColorClass = '';

		const colors = this._getColors();

		const itemStyle = {
			element: 'span',
			attributes: {
				class: '',
			},
		};

		colors.forEach(item => {
			itemStyle.attributes.class = item.styleClass;

			if (this._checkActive(itemStyle)) {
				activeColor = item.name;

				activeColorClass = item.style.attributes.class;
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
					<span className={activeColorClass}>
						<ButtonIcon symbol="textbox" />
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

		editor.getSelection().lock();

		this._getColors().forEach(item => {
			styleConfig.attributes.class = item.styleClass;

			if (this._checkActive(styleConfig)) {
				editor.removeStyle(new CKEDITOR.style(styleConfig));
			}
		});

		styleConfig.attributes.class = className;

		const style = new CKEDITOR.style(styleConfig);

		editor.applyStyle(style);

		editor.getSelection().unlock();

		editor.fire('actionPerformed', this);
	}

	/**
	 * Checks if the given color definition is applied to the current selection in the editor.
	 *
	 * @instance
	 * @memberof ButtonBackgroundColor
	 * @method _checkActive
	 * @param {Object} styleConfig color definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
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
	 * - name - the style name, for example "default"
	 * - style - an object with one property, called `element` which value
	 * represents the style which have to be applied to the element.
	 *
	 * @instance
	 * @memberof ButtonBackgroundColor
	 * @method _getColor
	 * @protected
	 * @return {Array<object>} An array of objects containing the colors.
	 */
	_getColors() {
		return (
			this.props.styles || [
				{
					name: AlloyEditor.Strings.normal,
					style: {
						element: 'span',
						attributes: {
							class: 'text-body',
						},
					},
					styleClass: '',
					styleFn: this._applyStyle.bind(this, ''),
				},
				{
					name: AlloyEditor.Strings.primary,
					style: {
						element: 'span',
						attributes: {
							class: 'text-primary',
						},
					},
					styleClass: 'bg-primary',
					styleFn: this._applyStyle.bind(this, 'bg-primary'),
				},
				{
					name: AlloyEditor.Strings.disabled,
					style: {
						element: 'span',
						attributes: {
							class: 'text-secondary',
						},
					},
					styleClass: 'bg-secondary',
					styleFn: this._applyStyle.bind(this, 'bg-secondary'),
				},
				{
					name: AlloyEditor.Strings.success,
					style: {
						element: 'span',
						attributes: {
							class: 'text-success',
						},
					},
					styleClass: 'bg-success',
					styleFn: this._applyStyle.bind(this, 'bg-success'),
				},
				{
					name: AlloyEditor.Strings.danger,
					style: {
						element: 'span',
						attributes: {
							class: 'text-danger',
						},
					},
					styleClass: 'bg-danger',
					styleFn: this._applyStyle.bind(this, 'bg-danger'),
				},
				{
					name: AlloyEditor.Strings.warning,
					style: {
						element: 'span',
						attributes: {
							class: 'text-warning',
						},
					},
					styleClass: 'bg-warning',
					styleFn: this._applyStyle.bind(this, 'bg-warning'),
				},
				{
					name: AlloyEditor.Strings.info,
					style: {
						element: 'span',
						attributes: {
							class: 'text-info',
						},
					},
					styleClass: 'bg-info',
					styleFn: this._applyStyle.bind(this, 'bg-info'),
				},
			]
		);
	}
}

export default ButtonBackgroundColor;
