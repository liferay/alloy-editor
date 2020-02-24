/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonStyle from '../base/button-style';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
 *
 * @class ButtonSubscript
 *
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonSubscript extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonSubscript
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'subscript',
		style: 'coreStyles_subscript',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default subscript
	 * @memberof ButtonSubscript
	 * @property {String} key
	 * @static
	 */
	static key = 'subscript';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonSubscript
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.subscript}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-subscript"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.subscript}>
				<ButtonIcon symbol="subscript" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonStateClasses(ButtonStyle(ButtonSubscript)));
