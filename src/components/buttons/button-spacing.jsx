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
 * The ButtonSpacing class provides functionality for changing text spacing in a document.
 *
 * @class ButtonSpacing
 */
class ButtonSpacing extends React.Component {
	static contextType = EditorContext;

	static key = 'spacing';

	static propTypes = {
		/**
		 * Indicates whether the styles list is expanded or not.
		 *
		 * @instance
		 * @memberof Spacing
		 * @property {Boolean} expanded
		 */
		expanded: PropTypes.bool,

		/**
		 * The label that should be used for accessibility purposes.
		 *
		 * @instance
		 * @memberof Spacing
		 * @property {String} label
		 */
		label: PropTypes.string,

		/**
		 * Indicates whether the remove styles item should appear in the styles list.
		 *
		 * @instance
		 * @memberof Spacing
		 * @property {Boolean} showRemoveStylesItem
		 */
		showRemoveStylesItem: PropTypes.bool,

		/**
		 * List of the styles the button is able to handle.
		 *
		 * @instance
		 * @memberof Spacing
		 * @property {Array} styles
		 */
		styles: PropTypes.arrayOf(PropTypes.object),

		/**
		 * The tabIndex of the button in its toolbar current state. A value other than -1
		 * means that the button has focus and is the active element.
		 *
		 * @instance
		 * @memberof Spacing
		 * @property {Number} tabIndex
		 */
		tabIndex: PropTypes.number,

		/**
		 * Callback provided by the button host to notify when the styles list has been expanded.
		 *
		 * @instance
		 * @memberof Spacing
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
		let activeSpacing = '1.0x';

		const spacings = this._getSpacings();

		spacings.forEach(item => {
			if (this._checkActive(item.style)) {
				activeSpacing = item.name;
			}
		});

		const {editor, expanded, tabIndex, toggleDropdown} = this.props;

		const buttonStylesProps = {
			activeStyle: activeSpacing,
			editor,
			onDismiss: toggleDropdown,
			showRemoveStylesItem: false,
			styles: spacings,
		};

		return (
			<div className="ae-container ae-container-dropdown-small ae-has-dropdown">
				<button
					aria-expanded={expanded}
					className="ae-toolbar-element"
					onClick={toggleDropdown}
					role="combobox"
					tabIndex={tabIndex}>
					<span>
						<ButtonIcon symbol="separator" />
						&nbsp;
						{activeSpacing}
					</span>
				</button>
				{expanded && <ButtonStylesList {...buttonStylesProps} />}
			</div>
		);
	}

	_applyStyle(className) {
		const editor = this.context.editor.get('nativeEditor');

		const styleConfig = {
			element: 'div',
			attributes: {
				class: className,
			},
		};

		const style = new CKEDITOR.style(styleConfig);

		editor.getSelection().lock();

		this._getSpacings().forEach(item => {
			if (this._checkActive(item.style)) {
				editor.removeStyle(new CKEDITOR.style(item.style));
			}
		});

		editor.applyStyle(style);

		editor.getSelection().unlock();

		editor.fire('actionPerformed', this);
	}

	/**
	 * Checks if the given spacing definition is applied to the current selection in the editor.
	 *
	 * @instance
	 * @memberof Spacing
	 * @method _checkActive
	 * @param {Object} styleConfig Spacing definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
	 * @protected
	 * @return {Boolean} Returns true if the spacing is applied to the selection, false otherwise.
	 */
	_checkActive(styleConfig) {
		const nativeEditor = this.context.editor.get('nativeEditor');

		let active = true;

		const elementPath = nativeEditor.elementPath();

		if (elementPath && elementPath.lastElement) {
			styleConfig.attributes.class.split(' ').forEach(className => {
				active = active && elementPath.lastElement.hasClass(className);
			});
		} else {
			active = false;
		}

		return active;
	}

	/**
	 * Returns an array of spacings. Each spacing consists from three properties:
	 * - name - the style name, for example "default"
	 * - style - an object with one property, called `element` which value
	 * represents the style which have to be applied to the element.
	 * - styleFn - a function which applies selected style to the editor selection
	 *
	 * @instance
	 * @memberof Spacing
	 * @method _getSpacings
	 * @protected
	 * @return {Array<object>} An array of objects containing the spacings.
	 */
	_getSpacings() {
		return (
			this.props.styles || [
				{
					name: '1.0x',
					style: {
						element: 'div',
						attributes: {
							class: '',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, ''),
				},
				{
					name: '1.5x',
					style: {
						element: 'div',
						attributes: {
							class: 'mt-1 mb-1',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, 'mt-1 mb-1'),
				},
				{
					name: '2.0x',
					style: {
						element: 'div',
						attributes: {
							class: 'mt-2 mb-2',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, 'mt-2 mb-2'),
				},
				{
					name: '3.0x',
					style: {
						element: 'div',
						attributes: {
							class: 'mt-3 mb-3',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, 'mt-3 mb-3'),
				},
				{
					name: '4.0x',
					style: {
						element: 'div',
						attributes: {
							class: 'mt-4 mb-4',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, 'mt-4 mb-4'),
				},
				{
					name: '5.0x',
					style: {
						element: 'div',
						attributes: {
							class: 'mt-5 mb-5',
						},
						type: 1,
					},
					styleFn: this._applyStyle.bind(this, 'mt-5 mb-5'),
				},
			]
		);
	}
}

export default ButtonSpacing;
