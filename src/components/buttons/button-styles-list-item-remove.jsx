/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';

/**
 * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
 * inside a list and applying it to the current editor selection.
 *
 * @class ButtonStylesListItemRemove
 */
class ButtonStylesListItemRemove extends React.Component {
	static contextType = EditorContext;

	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonStylesListItemRemove
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'],
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default buttonStylesListItemRemove
	 * @memberof ButtonStylesListItemRemove
	 * @property {String} key
	 * @static
	 */
	static key = 'buttonStylesListItemRemove';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonStylesListItemRemove
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<li role="option">
				<button
					className="ae-toolbar-element"
					onClick={this._removeStyles}
					tabIndex={this.props.tabIndex}>
					{AlloyEditor.Strings.normal}
				</button>
			</li>
		);
	}

	/**
	 * Removes all inline styles and configured block elements applied to the current selection.
	 *
	 * @instance
	 * @memberof ButtonStylesListItemRemove
	 * @method _removeStyles
	 * @protected
	 */
	_removeStyles = () => {
		const editor = this.context.editor.get('nativeEditor');

		editor.execCommand('removeFormat');

		this.props.removeBlocks.forEach(blockItem => {
			const blockStyle = new CKEDITOR.style({element: blockItem});

			editor.removeStyle(blockStyle);
		});

		editor.fire('actionPerformed', this);
	};
}

export default ButtonStylesListItemRemove;
