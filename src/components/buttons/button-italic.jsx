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
 * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
 *
 * @class ButtonItalic
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonItalic extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonItalic
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'italic',
		keystroke: {
			fn: 'execCommand',
			keys: CKEDITOR.CTRL + 73 /* I*/,
			name: 'italic',
		},
		style: 'coreStyles_italic',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default italic
	 * @memberof ButtonItalic
	 * @property {String} key
	 * @static
	 */
	static key = 'italic';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonItalic
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.italic}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-italic"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.italic}>
				<ButtonIcon symbol="italic" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonKeystroke(ButtonStateClasses(ButtonStyle(ButtonItalic)))
);
