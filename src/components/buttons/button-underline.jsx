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
 * The ButtonUnderline class provides functionality for underlying a text selection.
 *
 * @class ButtonUnderline
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonUnderline extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonUnderline
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'underline',
		keystroke: {
			fn: 'execCommand',
			keys: CKEDITOR.CTRL + 85 /* U*/,
			name: 'underline',
		},
		style: 'coreStyles_underline',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default underline
	 * @memberof ButtonUnderline
	 * @property {String} key
	 * @static
	 */
	static key = 'underline';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonUnderline
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.underline}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-underline"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.underline}>
				<ButtonIcon symbol="underline" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonKeystroke(ButtonStateClasses(ButtonStyle(ButtonUnderline)))
);
