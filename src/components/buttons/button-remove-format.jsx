/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonRemoveFormat class removes style formatting.
 *
 * @class ButtonRemoveFormat
 * @uses ButtonCommand
 */
class ButtonRemoveFormat extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonRemoveFormat
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'removeFormat',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default removeFormat
	 * @memberof ButtonRemoveFormat
	 * @property {String} key
	 * @static
	 */
	static key = 'removeFormat';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonRemoveFormat
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.removeformat}
				className="ae-button"
				data-type="button-removeformat"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.removeformat}>
				<ButtonIcon symbol="remove-style" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonRemoveFormat);
