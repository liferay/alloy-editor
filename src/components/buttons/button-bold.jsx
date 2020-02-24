/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonKeystroke from '../base/button-keystroke';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonStyle from '../base/button-style';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonBold class provides functionality for styling an selection with strong (bold) style.
 *
 * @class ButtonBold
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonBold extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonBold
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'bold',
		keystroke: {
			fn: 'execCommand',
			keys: CKEDITOR.CTRL + 66 /* B*/,
			name: 'bold',
		},
		style: 'coreStyles_bold',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default bold
	 * @memberof ButtonBold
	 * @property {String} key
	 * @static
	 */
	static key = 'bold';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonBold
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button  ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.bold}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-bold"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.bold}>
				<ButtonIcon symbol="bold" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonKeystroke(ButtonStateClasses(ButtonStyle(ButtonBold)))
);
