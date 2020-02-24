/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';

/**
 * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
 * a list as an item, with a string representation of its behaviour.
 *
 * @class ButtonCommandListItem
 * @uses ButtonCommand
 */
class ButtonCommandListItem extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default buttonCommandListItem
	 * @memberof ButtonCommandListItem
	 * @property {String} key
	 * @static
	 */
	static key = 'buttonCommandListItem';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonCommandListItem
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<button
				aria-label={this.props.description}
				className={this._getClassName()}
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}>
				{this.props.description}
			</button>
		);
	}

	/**
	 * Returns the class name of Widget.
	 *
	 * @instance
	 * @memberof ButtonCommandListItem
	 * @method _getClassName
	 * @protected
	 * @return {String} The class name of the Widget.
	 */
	_getClassName() {
		const className = 'ae-container ae-toolbar-element';

		return className;
	}
}

export default ButtonCommand(ButtonCommandListItem);
