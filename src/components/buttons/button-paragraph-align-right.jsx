/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonCommandActive from '../base/button-command-active';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonParagraphAlignRight class provides functionality for aligning a paragraph on right.
 *
 * @class ButtonParagraphAlignRight
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonParagraphAlignRight extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonParagraphAlignRight
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'justifyright',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default paragraphRight
	 * @memberof ButtonParagraphAlignRight
	 * @property {String} key
	 * @static
	 */
	static key = 'paragraphRight';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonParagraphAlignRight
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.alignRight}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-paragraph-align-right"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.alignRight}>
				<ButtonIcon symbol="align-right" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonCommandActive(ButtonStateClasses(ButtonParagraphAlignRight))
);
