/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonHline class provides inserts horizontal line.
 *
 * @class ButtonHline
 * @uses ButtonCommand
 */
class ButtonHline extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonHline
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'horizontalrule',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default hline
	 * @memberof ButtonHline
	 * @property {String} key
	 * @static
	 */
	static key = 'hline';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonHline
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.horizontalrule}
				className="ae-button"
				data-type="button-hline"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.horizontalrule}>
				<ButtonIcon symbol="hr" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonHline);
